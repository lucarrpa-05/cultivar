/**
 * The fold (ENGINE.md §3, §9, §14, §15).
 *
 * `state = fold(events)`. Every number in `EngineState` is produced here and
 * nowhere else, which is what makes sync a union of event logs and the refresh
 * analysis a replay in Node.
 *
 * The fold mutates `state` in place and returns it — `Engine.apply` is allowed
 * to do that, and folding 5,000 events has to stay under 200 ms.
 */

import type {
  BackfillItem, CardId, CardMeta, Event, EngineState, ReaderQuestion,
  RevisitItem, SeenInfo, SessionState, TopicId,
} from '../types.ts';
import { discountAll, reverseArm, updateArm } from './bandit.ts';
import { dayKey, dayKeyDiff, type EngineContext } from './context.ts';
import { driftTowardCard, nudge, targetOf, undriftTowardCard } from './difficulty.ts';
import { enterFsrs, gradeFsrs } from './fsrs.ts';
import { createMasteryView, masteryFromPoints, saturation } from './mastery.ts';
import { adaptRecallInterval, today, updateRolling } from './metrics.ts';
import { earn, record, sweepCounters, sweepTopic } from './milestones.ts';
import { PARAMS } from './params.ts';
import { clamp, hashString } from './rng.ts';
import { addMinutes, rollDays } from './streak.ts';
import { expireZone, recordValence, updateZone } from './zone.ts';

// ── small typed accessors over `Event.data` ─────────────────────────────────

function num(data: Record<string, unknown> | undefined, key: string, fallback: number): number {
  if (!data) return fallback;
  const v = data[key];
  return typeof v === 'number' && isFinite(v) ? v : fallback;
}
function str(data: Record<string, unknown> | undefined, key: string, fallback: string): string {
  if (!data) return fallback;
  const v = data[key];
  return typeof v === 'string' ? v : fallback;
}
function bool(data: Record<string, unknown> | undefined, key: string): boolean {
  if (!data) return false;
  return data[key] === true;
}

function seenOf(state: EngineState, id: CardId, t: number): SeenInfo {
  let s = state.seen[id];
  if (!s) {
    s = { first: t, last: t, views: 0, best: 0 };
    state.seen[id] = s;
  }
  return s;
}

function topicState(state: EngineState, id: TopicId) {
  return state.topics[id];
}

// ── valence, points, hierarchy ──────────────────────────────────────────────

function touch(state: EngineState, ctx: EngineContext, id: TopicId, t: number): void {
  for (const anc of ctx.graph.ancestors(id)) {
    const ts = topicState(state, anc);
    if (ts) ts.lastEvent = t;
  }
}

/**
 * ENGINE.md §3: `a += r`, `b += 1 − r` on the topic arm, ×0.5 on the area,
 * ×0.25 on the domain; the same `r` on the format arm and each angle arm;
 * secondary topics get 0.4× of everything.
 */
function applyValence(state: EngineState, ctx: EngineContext, card: CardMeta, r: number, t: number, slot: string, sign: 1 | -1): void {
  const apply = (id: TopicId, weight: number) => {
    const ts = topicState(state, id);
    if (!ts) return;
    if (sign > 0) updateArm(ts.interest, r, weight, t);
    else reverseArm(ts.interest, r, weight);
  };
  const chain = (topic: TopicId, scale: number) => {
    const areaId = ctx.graph.area(topic);
    const domainId = ctx.graph.domain(topic);
    apply(topic, scale);
    if (areaId && areaId !== topic) apply(areaId, scale * PARAMS.areaArmWeight);
    if (domainId && domainId !== topic && domainId !== areaId) apply(domainId, scale * PARAMS.domainArmWeight);
  };

  chain(card.topic, 1);
  if (card.topics) for (const t2 of card.topics) chain(t2, PARAMS.secondaryWeight);

  const fmt = state.formats[card.format];
  if (fmt) {
    if (sign > 0) updateArm(fmt, r, 1, t);
    else reverseArm(fmt, r, 1);
  }
  const angles = (card.angles || []).slice(0, PARAMS.maxAngles);
  for (const a of angles) {
    const arm = state.angles[a];
    if (!arm) continue;
    if (sign > 0) updateArm(arm, r, 1, t);
    else reverseArm(arm, r, 1);
  }
  if (slot === 'serendipity') {
    const arm = state.surprise[card.domain];
    if (arm) {
      if (sign > 0) updateArm(arm, r, 1, t);
      else reverseArm(arm, r, 1);
    }
  }

  const positive = r >= PARAMS.zonePositiveValence;
  const negative = r <= 0.2;
  for (const anc of ctx.graph.ancestors(card.topic)) {
    const ts = topicState(state, anc);
    if (!ts) continue;
    if (sign > 0) {
      if (positive) ts.positives += 1;
      if (negative) ts.negatives += 1;
      ts.lastEvent = t;
    } else {
      if (positive) ts.positives = Math.max(0, ts.positives - 1);
      if (negative) ts.negatives = Math.max(0, ts.negatives - 1);
    }
  }

  if (sign > 0) {
    recordValence(state, ctx.cards.area(card.id) || ctx.graph.area(card.topic), r, t);
    updateZone(state, ctx.cards.area(card.id) || ctx.graph.area(card.topic), r, t);
    // §12 counts consecutive negative *cards*: a skip fires both a fast-pass
    // view and a skip event, and one card must not count twice.
    if (positive) {
      state.negStreak = 0;
      state.negCard = '';
    } else if (negative && state.negCard !== card.id) {
      state.negStreak = (state.negStreak || 0) + 1;
      state.negCard = card.id;
      // Three in a row arm two forced light cards, then a serendipity slot.
      // Resetting the counter stops it re-arming on every later event.
      if ((state.negStreak || 0) >= PARAMS.cleanserNegStreak) {
        state.negStreak = 0;
        state.negCard = '';
        if (state.session) {
          state.session.cleanser = PARAMS.cleanserCards;
          state.session.cleanserSerendipity = true;
        }
      }
    }
  } else {
    const marks = state.valence || [];
    for (let i = marks.length - 1; i >= 0; i--) {
      if (marks[i].t === t && marks[i].r === r) {
        marks.splice(i, 1);
        break;
      }
    }
  }
}

/** Points are scaled by `0.6 + 0.2·k` — harder cards count more (§3). */
function pointScale(k: number): number {
  return PARAMS.pointScaleBase + PARAMS.pointScalePerK * k;
}

function applyPoints(state: EngineState, ctx: EngineContext, card: CardMeta, raw: number, t: number): void {
  if (raw === 0) return;
  const delta = raw * pointScale(card.difficulty);
  const bump = (id: TopicId, scale: number) => {
    const ts = topicState(state, id);
    if (!ts) return;
    ts.points = Math.max(0, ts.points + delta * scale);
    ts.mastery = masteryFromPoints(ts.points, saturation(ctx, id));
    ts.lastEvent = t;
    sweepTopic(state, id, ts.mastery);
  };
  bump(card.topic, 1);
  if (card.topics) for (const t2 of card.topics) bump(t2, PARAMS.secondaryWeight);
}

// ── §9 the "too advanced" protocol ──────────────────────────────────────────

function tooHardProtocol(state: EngineState, ctx: EngineContext, card: CardMeta, t: number): void {
  const mv = createMasteryView(state, ctx, t);
  const topic = card.topic;

  const pool: TopicId[] = [];
  const push = (id: TopicId) => {
    if (id && pool.indexOf(id) < 0) pool.push(id);
  };
  for (const p of card.prerequisites || []) push(p);
  for (const p of ctx.graph.prereqs(topic)) push(p);

  const gaps = pool
    .filter((p) => mv.of(p) < PARAMS.backfillThreshold)
    .sort((a, b) => mv.of(a) - mv.of(b));

  const added: TopicId[] = [];
  const hasUnseenAt = (id: TopicId, maxK: number): boolean => {
    for (const c of ctx.cards.under(id)) {
      if (state.seen[c.id]) continue;
      if (c.layer === 'rigor') continue;
      if (c.difficulty <= maxK) return true;
    }
    return false;
  };

  for (const p of gaps) {
    const target = targetOf(state, ctx, p) + PARAMS.backfillSlack;
    if (!hasUnseenAt(p, target)) continue;
    if (state.backfill.some((b) => b.topic === p && !b.done)) {
      added.push(p);
      continue;
    }
    state.backfill.push({ topic: p, because: card.id, created: t, served: 0, done: false, positives: 0 });
    added.push(p);
  }

  if (gaps.length === 0) {
    // Everything upstream is known: back off inside the topic itself, then its area.
    const fallbacks: TopicId[] = [topic];
    const areaId = ctx.graph.area(topic);
    if (areaId && areaId !== topic) fallbacks.push(areaId);
    for (const f of fallbacks) {
      if (!hasUnseenAt(f, card.difficulty - 1)) continue;
      if (!state.backfill.some((b) => b.topic === f && !b.done)) {
        state.backfill.push({ topic: f, because: card.id, created: t, served: 0, done: false, positives: 0 });
      }
      added.push(f);
      break;
    }
  }

  const item: RevisitItem = {
    card: card.id,
    flaggedAt: t,
    prereqs: gaps.length ? gaps : added,
    threshold: PARAMS.backfillThreshold,
    resolved: false,
  };
  if (!state.revisit.some((r) => r.card === card.id && !r.resolved)) state.revisit.push(item);

  // The next card is a light palate cleanser from somewhere else, then a
  // backfill slot within the next 2–4 cards (§9.3).
  if (state.session) {
    state.session.cleanser = Math.max(state.session.cleanser, 1);
    state.session.cleanserSerendipity = false;
    state.session.backfillAt = state.session.index + PARAMS.backfillFirstMin
      + (hashString(card.id + t) % (PARAMS.backfillFirstMax - PARAMS.backfillFirstMin + 1));
  }
}

function undoTooHard(state: EngineState, ctx: EngineContext, card: CardMeta): void {
  state.backfill = state.backfill.filter((b) => b.because !== card.id);
  state.revisit = state.revisit.filter((r) => r.card !== card.id);
  const areaId = ctx.graph.area(card.topic);
  const domainId = ctx.graph.domain(card.topic);
  nudge(state, card.topic, PARAMS.tooHardDrop.topic);
  if (areaId && areaId !== card.topic) nudge(state, areaId, PARAMS.tooHardDrop.area);
  if (domainId && domainId !== areaId) nudge(state, domainId, PARAMS.tooHardDrop.domain);
  const ts = topicState(state, card.topic);
  if (ts) ts.tooHard = Math.max(0, ts.tooHard - 1);
  state.metrics.tooHard = Math.max(0, state.metrics.tooHard - 1);
  const seen = state.seen[card.id];
  if (seen) seen.tooHard = false;
}

/** Credit a backfill item when one of its cards is served and lands (§9.3). */
function creditBackfill(state: EngineState, ctx: EngineContext, card: CardMeta, r: number): void {
  const chain = ctx.graph.ancestors(card.topic);
  for (const b of state.backfill) {
    if (b.done) continue;
    if (chain.indexOf(b.topic) < 0) continue;
    b.served += 1;
    if (r >= PARAMS.zonePositiveValence) b.positives = (b.positives || 0) + 1;
    if (b.served >= PARAMS.backfillServeTarget) b.done = true;
  }
}

/** A revisit item becomes ready at `session_start` (§9.4). */
function refreshRevisits(state: EngineState, ctx: EngineContext, now: number): void {
  const mv = createMasteryView(state, ctx, now);
  for (const item of state.revisit) {
    if (item.resolved || item.readyAt) continue;
    if (now < item.flaggedAt + PARAMS.revisitMinDays * 86400000) continue;
    let prereqsOk = item.prereqs.length > 0;
    for (const p of item.prereqs) if (mv.of(p) < item.threshold) prereqsOk = false;
    const spawned = state.backfill.filter((b) => b.because === item.card);
    let backfillOk = spawned.length > 0;
    for (const b of spawned) {
      if (b.served < PARAMS.backfillServeTarget || (b.positives || 0) < PARAMS.backfillServeTarget) backfillOk = false;
    }
    if (prereqsOk || backfillOk) item.readyAt = now;
  }
}

function resolveRevisit(state: EngineState, cardId: CardId, r: number, t: number): void {
  if (r < PARAMS.zonePositiveValence) return;
  for (const item of state.revisit) {
    if (item.card !== cardId || item.resolved) continue;
    item.resolved = true;
    earn(state, 'first-revisit-solved');
  }
  for (const b of state.backfill) if (b.because === cardId) b.done = true;
}

// ── sessions ────────────────────────────────────────────────────────────────

function newSession(state: EngineState, ctx: EngineContext, id: string, t: number): SessionState {
  rollDays(state, t);
  const day = today(state, t);
  const goal = state.settings.goalMinutes || PARAMS.goalMinutes;
  const firstOfDay = day.sessions.length === 0;
  const goalReached = state.streak.todayMinutes >= goal;
  const mode: 'daily' | 'binge' = firstOfDay && !goalReached ? 'daily' : 'binge';
  const ordinal = state.metrics.sessions + 1;
  return {
    id,
    startedAt: t,
    mode,
    goalReached,
    minutes: 0,
    cards: 0,
    index: 0,
    slots: {},
    sinceRecall: 0,
    sinceWire: 0,
    lastSlot: '',
    cleanser: 0,
    cleanserSerendipity: false,
    first: state.metrics.sessions === 0,
    ordinal,
    onThisDay: '',
  };
}

function startSession(state: EngineState, ctx: EngineContext, id: string, t: number): void {
  if (state.session && state.session.id === id) return;
  state.session = newSession(state, ctx, id, t);
  state.metrics.sessions += 1;
  if (!state.metrics.firstDay) state.metrics.firstDay = dayKey(t);
  if ((state.widen || 0) > 0) state.widen = (state.widen || 0) - 1;
  if ((state.widen || 0) <= 0 && state.widenFrom) delete state.widenFrom;
  expireZone(state, t);
  adaptRecallInterval(state, t);
  refreshRevisits(state, ctx, t);
}

function endSession(state: EngineState, t: number, minutes: number, cards: number): void {
  const day = today(state, t);
  if (minutes > 0) {
    addMinutes(state, t, minutes);
    day.sessions.push(minutes);
  }
  if (cards > 0) day.cards += cards;
  if (minutes >= PARAMS.bingeMinutes) state.metrics.binges += 1;
  updateRolling(state, t);
  delete state.session;
}

function ensureSession(state: EngineState, ctx: EngineContext, ev: Event): SessionState {
  if (!state.session || state.session.id !== ev.s) startSession(state, ctx, ev.s || 's', ev.t);
  return state.session as SessionState;
}

// ── the dispatcher ──────────────────────────────────────────────────────────

const ACTIONABLE: Record<string, true> = {
  view: true, like: true, unlike: true, save: true, unsave: true, skip: true,
  too_hard: true, too_easy: true, rigor_open: true, source_open: true,
  series_next: true, recall: true, question: true, wire: true,
};

export function foldEvent(state: EngineState, ev: Event, ctx: EngineContext): EngineState {
  // Daily discounting: at the first event of a new local day every arm decays
  // toward Beta(1,1) (§3). This is what lets obsessions cool.
  if (state.updatedAt > 0) {
    const elapsed = dayKeyDiff(dayKey(state.updatedAt), dayKey(ev.t));
    if (elapsed > 0) {
      discountAll(state, elapsed);
      rollDays(state, ev.t);
    }
  }

  if (ACTIONABLE[ev.type]) ensureSession(state, ctx, ev);

  switch (ev.type) {
    case 'view': onView(state, ctx, ev); break;
    case 'like': onLike(state, ctx, ev, 1); break;
    case 'unlike': onLike(state, ctx, ev, -1); break;
    case 'save': onSave(state, ctx, ev, 1); break;
    case 'unsave': onSave(state, ctx, ev, -1); break;
    case 'skip': onSkip(state, ctx, ev); break;
    case 'too_hard': onTooHard(state, ctx, ev); break;
    case 'too_easy': onTooEasy(state, ctx, ev); break;
    case 'rigor_open': onRigorOpen(state, ctx, ev); break;
    case 'source_open': onSourceOpen(state, ctx, ev); break;
    case 'series_next': onSeriesNext(state, ctx, ev); break;
    case 'recall': onRecall(state, ctx, ev); break;
    case 'question': onQuestion(state, ctx, ev); break;
    case 'wire': onWire(state, ctx, ev); break;
    case 'focus': onFocus(state, ev); break;
    case 'settings': onSettings(state, ev); break;
    case 'session_start': startSession(state, ctx, ev.s || 's', ev.t); break;
    case 'session_end':
      endSession(state, ev.t, num(ev.data, 'minutes', 0), num(ev.data, 'cards', 0));
      break;
    case 'milestone': {
      const id = str(ev.data, 'id', ev.card || '');
      record(state, id);
      if (state.session) {
        state.session.lastSlot = 'milestone';
        state.session.slots['milestone'] = (state.session.slots['milestone'] || 0) + 1;
        state.session.slots['m:' + id] = 1;
        // §10.10: after the goal-reached card, the session becomes a binge.
        if (id === 'goal-reached') state.session.mode = 'binge';
      }
      break;
    }
    case 'undo': onUndo(state, ctx, ev); break;
    default: break;
  }

  state.eventCount += 1;
  state.lastEventId = ev.id;
  state.updatedAt = ev.t;
  if (ev.type !== 'undo') {
    if (!state.log) state.log = [];
    state.log.push(ev);
    const overflow = state.log.length - PARAMS.undoWindow;
    if (overflow > 0) state.log.splice(0, overflow);
  }
  sweepCounters(state, ev.t, ctx.graph.domainIds.length);
  return state;
}

// ── handlers ────────────────────────────────────────────────────────────────

function cardOf(ctx: EngineContext, ev: Event): CardMeta | null {
  return ev.card ? ctx.cards.byId(ev.card) : null;
}

function onView(state: EngineState, ctx: EngineContext, ev: Event): void {
  const card = cardOf(ctx, ev);
  if (!card) return;
  const slot = str(ev.data, 'slot', 'progress');
  const info = seenOf(state, card.id, ev.t);
  // Actions (like, skip, too_hard…) arrive before the view that closes the
  // card and already create the `seen` entry, so "first view" is views === 0.
  const fresh = info.views === 0;
  const dwell = num(ev.data, 'dwellMs', 0);
  const frac = num(ev.data, 'readFraction', 0);
  const expected = ctx.cards.expectedReadMs(card, !!info.rigorOpened);

  const otherAction = !!(info.liked || info.saved || info.skipped || info.tooHard || info.tooEasy || info.rigorOpened);
  let r: number;
  let points = 0;
  if (frac >= PARAMS.readFraction || dwell >= PARAMS.readDwellRatio * expected) {
    r = PARAMS.valence.viewRead;
    points = PARAMS.points.viewRead;
  } else if (dwell < PARAMS.fastPassMs && !otherAction) {
    r = PARAMS.valence.viewFast;
  } else {
    r = PARAMS.valence.viewPartial;
  }

  info.views += 1;
  info.last = ev.t;
  info.dwellMs = (info.dwellMs || 0) + dwell;
  if (r > (info.best || 0)) info.best = r;

  applyValence(state, ctx, card, r, ev.t, slot, 1);
  applyPoints(state, ctx, card, points, ev.t);
  touch(state, ctx, card.topic, ev.t);

  for (const anc of ctx.graph.ancestors(card.topic)) {
    const ts = topicState(state, anc);
    if (ts) {
      if (fresh) ts.seen += 1;
      ts.lastServed = ev.t;
    }
  }

  if (fresh) {
    state.metrics.cardsSeen += 1;
    const day = today(state, ev.t);
    day.cards += 1;
    earn(state, 'domain-touched:' + card.domain);
    if (card.format === 'callback') earn(state, 'first-callback');
  }
  today(state, ev.t).views += 1;

  if (r >= PARAMS.zonePositiveValence && card.hasRecall && !state.fsrs[card.id]) {
    state.fsrs[card.id] = enterFsrs(ev.t);
  }

  pushRecent(state, card.id);
  const session = state.session;
  if (session) {
    session.index += 1;
    session.cards += 1;
    session.slots[slot] = (session.slots[slot] || 0) + 1;
    session.lastSlot = slot;
    session.sinceRecall = slot === 'recall' ? 0 : session.sinceRecall + 1;
    session.sinceWire = slot === 'wire' || slot === 'news' ? 0 : session.sinceWire + 1;
    if (session.cleanser > 0 && slot === 'light') session.cleanser -= 1;
    // The serendipity slot that follows the forced cleansers has now been paid.
    if (slot === 'serendipity') session.cleanserSerendipity = false;
    // Live active-reading minutes, so the `close` slot can fire mid-session
    // (§10.10). `session_end` is still the authoritative number for the streak.
    session.minutes += dwell / 60000;
    const goal = state.settings.goalMinutes || PARAMS.goalMinutes;
    if (state.streak.todayMinutes + session.minutes >= goal) session.goalReached = true;
  }

  if (card.series) {
    const prog = state.series[card.series.id] || { lastIndex: 0, lastAt: 0, paused: false, finished: false };
    if (card.series.index >= prog.lastIndex) prog.lastIndex = card.series.index;
    prog.lastAt = ev.t;
    prog.pending = false;
    prog.paused = false;
    prog.warm = r >= PARAMS.zonePositiveValence;
    prog.finished = card.series.index >= card.series.total;
    prog.atIndex = session ? session.index : 0;
    state.series[card.series.id] = prog;
  }

  if (slot === 'backfill') {
    creditBackfill(state, ctx, card, r);
    if (session) {
      session.backfillAt = session.index + PARAMS.backfillEveryMin
        + (hashString(card.id + ev.t) % (PARAMS.backfillEveryMax - PARAMS.backfillEveryMin + 1));
    }
  }
  if (slot === 'revisit') resolveRevisit(state, card.id, r, ev.t);
  const reread = state.reread || [];
  const ri = reread.indexOf(card.id);
  if (ri >= 0) reread.splice(ri, 1);
}

function pushRecent(state: EngineState, id: string): void {
  const i = state.recent.indexOf(id);
  if (i >= 0) state.recent.splice(i, 1);
  state.recent.push(id);
  const overflow = state.recent.length - PARAMS.recentWindow;
  if (overflow > 0) state.recent.splice(0, overflow);
}

function onLike(state: EngineState, ctx: EngineContext, ev: Event, sign: 1 | -1): void {
  const card = cardOf(ctx, ev);
  if (!card) return;
  const info = seenOf(state, card.id, ev.t);
  if (sign > 0) {
    applyValence(state, ctx, card, PARAMS.valence.like, ev.t, str(ev.data, 'slot', ''), 1);
    applyPoints(state, ctx, card, PARAMS.points.like, ev.t);
    driftTowardCard(state, card.topic, card.difficulty);
    info.liked = true;
    info.best = Math.max(info.best || 0, PARAMS.valence.like);
    state.metrics.likes += 1;
    today(state, ev.t).likes += 1;
    resolveRevisit(state, card.id, PARAMS.valence.like, ev.t);
  } else {
    // "reverses like (r 0.3, −1 point)": undo the like, then record the weaker signal.
    applyValence(state, ctx, card, PARAMS.valence.like, ev.t, '', -1);
    applyPoints(state, ctx, card, PARAMS.points.unlike, ev.t);
    undriftTowardCard(state, card.topic, card.difficulty);
    applyValence(state, ctx, card, PARAMS.valence.unlike, ev.t, '', 1);
    info.liked = false;
    state.metrics.likes = Math.max(0, state.metrics.likes - 1);
  }
  touch(state, ctx, card.topic, ev.t);
}

function onSave(state: EngineState, ctx: EngineContext, ev: Event, sign: 1 | -1): void {
  const card = cardOf(ctx, ev);
  if (!card) return;
  const info = seenOf(state, card.id, ev.t);
  if (sign > 0) {
    applyValence(state, ctx, card, PARAMS.valence.save, ev.t, str(ev.data, 'slot', ''), 1);
    applyPoints(state, ctx, card, PARAMS.points.save, ev.t);
    driftTowardCard(state, card.topic, card.difficulty);
    info.saved = true;
    info.best = Math.max(info.best || 0, PARAMS.valence.save);
    if (state.saved.indexOf(card.id) < 0) state.saved.push(card.id);
    state.metrics.saves += 1;
  } else {
    const i = state.saved.indexOf(card.id);
    if (i >= 0) state.saved.splice(i, 1);
    info.saved = false;
    state.metrics.saves = Math.max(0, state.metrics.saves - 1);
  }
  touch(state, ctx, card.topic, ev.t);
}

function onSkip(state: EngineState, ctx: EngineContext, ev: Event): void {
  const card = cardOf(ctx, ev);
  if (!card) return;
  const info = seenOf(state, card.id, ev.t);
  applyValence(state, ctx, card, PARAMS.valence.skip, ev.t, str(ev.data, 'slot', ''), 1);
  const d = targetOf(state, ctx, card.topic);
  if (card.difficulty >= d + PARAMS.skipGap) nudge(state, card.topic, -PARAMS.skipDrop);
  info.skipped = true;
  state.metrics.skips += 1;
  today(state, ev.t).skips += 1;
  if (card.series) {
    const prog = state.series[card.series.id] || { lastIndex: card.series.index, lastAt: ev.t, paused: false, finished: false };
    prog.paused = true;
    prog.warm = false;
    prog.pending = false;
    prog.lastAt = ev.t;
    prog.lastIndex = Math.max(1, card.series.index - 1);
    state.series[card.series.id] = prog;
  }
  if (str(ev.data, 'slot', '') === 'recall') today(state, ev.t).recallSkipped += 1;
  touch(state, ctx, card.topic, ev.t);
}

function onTooHard(state: EngineState, ctx: EngineContext, ev: Event): void {
  const card = cardOf(ctx, ev);
  if (!card) return;
  const info = seenOf(state, card.id, ev.t);
  applyValence(state, ctx, card, PARAMS.valence.tooHard, ev.t, str(ev.data, 'slot', ''), 1);
  const areaId = ctx.graph.area(card.topic);
  const domainId = ctx.graph.domain(card.topic);
  nudge(state, card.topic, -PARAMS.tooHardDrop.topic);
  if (areaId && areaId !== card.topic) nudge(state, areaId, -PARAMS.tooHardDrop.area);
  if (domainId && domainId !== areaId) nudge(state, domainId, -PARAMS.tooHardDrop.domain);
  info.tooHard = true;
  const ts = topicState(state, card.topic);
  if (ts) ts.tooHard += 1;
  state.metrics.tooHard += 1;
  touch(state, ctx, card.topic, ev.t);
  tooHardProtocol(state, ctx, card, ev.t);
}

function onTooEasy(state: EngineState, ctx: EngineContext, ev: Event): void {
  const card = cardOf(ctx, ev);
  if (!card) return;
  const info = seenOf(state, card.id, ev.t);
  applyValence(state, ctx, card, PARAMS.valence.tooEasy, ev.t, str(ev.data, 'slot', ''), 1);
  applyPoints(state, ctx, card, PARAMS.points.tooEasy, ev.t);
  const areaId = ctx.graph.area(card.topic);
  const domainId = ctx.graph.domain(card.topic);
  nudge(state, card.topic, PARAMS.tooEasyRise.topic);
  if (areaId && areaId !== card.topic) nudge(state, areaId, PARAMS.tooEasyRise.area);
  if (domainId && domainId !== areaId) nudge(state, domainId, PARAMS.tooEasyRise.domain);
  info.tooEasy = true;
  state.metrics.tooEasy += 1;
  touch(state, ctx, card.topic, ev.t);
}

function onRigorOpen(state: EngineState, ctx: EngineContext, ev: Event): void {
  const card = cardOf(ctx, ev);
  if (!card) return;
  const info = seenOf(state, card.id, ev.t);
  applyValence(state, ctx, card, PARAMS.valence.rigorOpen, ev.t, str(ev.data, 'slot', ''), 1);
  applyPoints(state, ctx, card, PARAMS.points.rigorOpen, ev.t);
  driftTowardCard(state, card.topic, card.difficulty);
  info.rigorOpened = true;
  info.best = Math.max(info.best || 0, PARAMS.valence.rigorOpen);
  earn(state, 'first-rigor');
  touch(state, ctx, card.topic, ev.t);
}

function onSourceOpen(state: EngineState, ctx: EngineContext, ev: Event): void {
  const card = cardOf(ctx, ev);
  if (!card) return;
  const info = seenOf(state, card.id, ev.t);
  applyValence(state, ctx, card, PARAMS.valence.sourceOpen, ev.t, str(ev.data, 'slot', ''), 1);
  applyPoints(state, ctx, card, PARAMS.points.sourceOpen, ev.t);
  info.best = Math.max(info.best || 0, PARAMS.valence.sourceOpen);
  touch(state, ctx, card.topic, ev.t);
}

function onSeriesNext(state: EngineState, ctx: EngineContext, ev: Event): void {
  const card = cardOf(ctx, ev);
  if (!card) return;
  applyValence(state, ctx, card, PARAMS.valence.seriesNext, ev.t, str(ev.data, 'slot', ''), 1);
  const info = seenOf(state, card.id, ev.t);
  info.best = Math.max(info.best || 0, PARAMS.valence.seriesNext);
  if (card.series) {
    const prog = state.series[card.series.id] || { lastIndex: card.series.index, lastAt: ev.t, paused: false, finished: false };
    prog.lastIndex = Math.max(prog.lastIndex, card.series.index);
    prog.lastAt = ev.t;
    prog.pending = true;
    prog.paused = false;
    prog.warm = true;
    state.series[card.series.id] = prog;
  }
  touch(state, ctx, card.topic, ev.t);
}

function onRecall(state: EngineState, ctx: EngineContext, ev: Event): void {
  const card = cardOf(ctx, ev);
  if (!card) return;
  const day = today(state, ev.t);
  const grade = Math.round(num(ev.data, 'grade', 0));
  if (grade <= 0 || bool(ev.data, 'skipped')) {
    day.recallSkipped += 1;
    return;
  }
  const answerMs = num(ev.data, 'answerMs', NaN);
  const correct = ev.data && typeof ev.data.correct === 'boolean' ? ev.data.correct === true : grade >= 3;
  let effective = grade;
  if (ev.data && typeof ev.data.correct === 'boolean') {
    effective = correct ? (isFinite(answerMs) && answerMs < PARAMS.recallEasyMs ? 4 : 3) : 1;
  }

  applyValence(state, ctx, card, PARAMS.valence.recall, ev.t, 'recall', 1);
  const pts = effective <= 1 ? PARAMS.points.recallAgain
    : effective === 2 ? PARAMS.points.recallHard
      : effective === 3 ? PARAMS.points.recallGood
        : PARAMS.points.recallEasy;
  applyPoints(state, ctx, card, pts, ev.t);
  if (effective >= 3) nudge(state, card.topic, PARAMS.recallRise);

  const existing = state.fsrs[card.id] || enterFsrs(ev.t);
  state.fsrs[card.id] = gradeFsrs(existing, effective, ev.t);

  state.metrics.recallAnswered += 1;
  day.recallAnswered += 1;
  if (correct) {
    state.metrics.recallCorrect += 1;
    day.recallCorrect += 1;
    state.recallStreak = (state.recallStreak || 0) + 1;
  } else {
    state.recallStreak = 0;
    if (!state.reread) state.reread = [];
    if (state.reread.indexOf(card.id) < 0) state.reread.push(card.id);
  }
  const info = seenOf(state, card.id, ev.t);
  info.best = Math.max(info.best || 0, PARAMS.valence.recall);
  touch(state, ctx, card.topic, ev.t);
}

function onQuestion(state: EngineState, ctx: EngineContext, ev: Event): void {
  const text = str(ev.data, 'text', '');
  const q: ReaderQuestion = {
    id: str(ev.data, 'id', 'q-' + dayKey(ev.t) + '-' + ev.id.slice(-4)),
    t: ev.t,
    text,
    status: 'open',
  };
  if (ev.card) q.card = ev.card;
  const topic = ev.topic || (ev.card ? (ctx.cards.byId(ev.card) || { topic: '' }).topic : '');
  if (topic) q.topic = topic;
  if (!state.questions.some((existing) => existing.id === q.id)) state.questions.push(q);
  const card = cardOf(ctx, ev);
  if (card) {
    applyValence(state, ctx, card, PARAMS.valence.question, ev.t, str(ev.data, 'slot', ''), 1);
    touch(state, ctx, card.topic, ev.t);
  }
}

function onWire(state: EngineState, ctx: EngineContext, ev: Event): void {
  const action = str(ev.data, 'action', 'view');
  const r = action === 'like' ? PARAMS.valence.wireLike
    : action === 'skip' ? PARAMS.valence.wireSkip
      : action === 'open' ? PARAMS.valence.wireOpen
        : PARAMS.valence.wireView;
  const wireId = str(ev.data, 'wire', ev.card || '');
  let source = str(ev.data, 'source', '');
  if (!source && wireId) {
    for (const item of ctx.wire) if (item.id === wireId) source = item.source;
  }
  if (source) {
    if (!state.sources[source]) state.sources[source] = { a: 1, b: 1, n: 0, last: ev.t };
    updateArm(state.sources[source], r, 1, ev.t);
  }
  const news = state.formats['news'];
  if (news) updateArm(news, r, 1, ev.t);
  if (action === 'view') {
    pushRecent(state, 'wire:' + wireId);
    if (state.session) {
      state.session.index += 1;
      state.session.sinceWire = 0;
      state.session.lastSlot = 'wire';
      state.session.slots['wire'] = (state.session.slots['wire'] || 0) + 1;
    }
  }
}

function onFocus(state: EngineState, ev: Event): void {
  const topic = ev.topic || str(ev.data, 'topic', '');
  if (topic) state.focus = topic;
  else delete state.focus;
  const context = str(ev.data, 'context', '');
  if (context) state.context = context;
}

function onSettings(state: EngineState, ev: Event): void {
  const patch = ev.data && typeof ev.data.patch === 'object' && ev.data.patch
    ? (ev.data.patch as Record<string, unknown>)
    : (ev.data as Record<string, unknown>) || {};
  const s = state.settings as unknown as Record<string, unknown>;
  for (const key of Object.keys(patch)) {
    if (key === 'context') {
      const v = patch[key];
      if (typeof v === 'string' && v) state.context = v;
      else delete state.context;
      continue;
    }
    if (patch[key] !== undefined) s[key] = patch[key];
  }
  if (typeof state.settings.goalMinutes === 'number') state.streak.goalMinutes = state.settings.goalMinutes;
  state.settings.spanishShare = clamp(state.settings.spanishShare, 0, 0.3);
}

function onUndo(state: EngineState, ctx: EngineContext, ev: Event): void {
  const target = str(ev.data, 'of', '');
  const log = state.log || [];
  let original: Event | null = null;
  for (let i = log.length - 1; i >= 0; i--) {
    if (log[i].id === target) {
      original = log[i];
      log.splice(i, 1);
      break;
    }
  }
  if (!original) return;
  const card = original.card ? ctx.cards.byId(original.card) : null;
  if (!card) return;
  const slot = str(original.data, 'slot', '');

  switch (original.type) {
    case 'like': {
      applyValence(state, ctx, card, PARAMS.valence.like, original.t, slot, -1);
      applyPoints(state, ctx, card, -PARAMS.points.like, original.t);
      undriftTowardCard(state, card.topic, card.difficulty);
      const info = state.seen[card.id];
      if (info) info.liked = false;
      state.metrics.likes = Math.max(0, state.metrics.likes - 1);
      break;
    }
    case 'save': {
      applyValence(state, ctx, card, PARAMS.valence.save, original.t, slot, -1);
      applyPoints(state, ctx, card, -PARAMS.points.save, original.t);
      undriftTowardCard(state, card.topic, card.difficulty);
      const i = state.saved.indexOf(card.id);
      if (i >= 0) state.saved.splice(i, 1);
      const info = state.seen[card.id];
      if (info) info.saved = false;
      state.metrics.saves = Math.max(0, state.metrics.saves - 1);
      break;
    }
    case 'skip': {
      applyValence(state, ctx, card, PARAMS.valence.skip, original.t, slot, -1);
      const d = targetOf(state, ctx, card.topic);
      if (card.difficulty >= d + PARAMS.skipGap) nudge(state, card.topic, PARAMS.skipDrop);
      const info = state.seen[card.id];
      if (info) info.skipped = false;
      state.metrics.skips = Math.max(0, state.metrics.skips - 1);
      if (card.series && state.series[card.series.id]) state.series[card.series.id].paused = false;
      break;
    }
    case 'too_hard': {
      applyValence(state, ctx, card, PARAMS.valence.tooHard, original.t, slot, -1);
      undoTooHard(state, ctx, card);
      break;
    }
    case 'too_easy': {
      applyValence(state, ctx, card, PARAMS.valence.tooEasy, original.t, slot, -1);
      applyPoints(state, ctx, card, -PARAMS.points.tooEasy, original.t);
      const areaId = ctx.graph.area(card.topic);
      const domainId = ctx.graph.domain(card.topic);
      nudge(state, card.topic, -PARAMS.tooEasyRise.topic);
      if (areaId && areaId !== card.topic) nudge(state, areaId, -PARAMS.tooEasyRise.area);
      if (domainId && domainId !== areaId) nudge(state, domainId, -PARAMS.tooEasyRise.domain);
      const info = state.seen[card.id];
      if (info) info.tooEasy = false;
      state.metrics.tooEasy = Math.max(0, state.metrics.tooEasy - 1);
      break;
    }
    default:
      break;
  }
}
