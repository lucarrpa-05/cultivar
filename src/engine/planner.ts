/**
 * Feed composition and session shape (ENGINE.md §10, §13).
 *
 * `plan()` walks forward one position at a time. At each position it asks the
 * slot rules in priority order; the first rule that both applies and can find a
 * card wins, and everything else falls through to `progress`. Crucially the
 * *trail* advances inside the loop, so `next(20)` composes a sequence with
 * rhythm and variety rather than returning twenty copies of the same argmax.
 *
 * Deviation from the numbered order in §10, deliberately: `close`, `milestone`
 * and the forced palate cleansers are evaluated before the other rules. They
 * are session transitions ("the goal just landed") rather than preferences, and
 * letting a callback pre-empt the closing card would lose the ending.
 */

import type {
  CardId, CardMeta, EngineState, ServedCard, SessionState, SlotKind, TopicId, WireItem,
} from '../types.ts';
import { createSampler, type Sampler } from './bandit.ts';
import { DAY_MS, parseDate, type EngineContext } from './context.ts';
import { fit, targetOf } from './difficulty.ts';
import { explainCard, explainMilestone, explainWire } from './explain.ts';
import { overdueDays } from './fsrs.ts';
import { createMasteryView, type MasteryView } from './mastery.ts';
import { effectiveRecallInterval } from './metrics.ts';
import { PARAMS } from './params.ts';
import { eligible, engaged, seriesReentries } from './readiness.ts';
import { hashString, randomRange } from './rng.ts';
import {
  createTrail, energyBudget, entryOf, lastEntry, novelty, pushTrail, rhythm, trailIds, wireAllowed,
} from './rhythm.ts';
import {
  likedTopicsOf, makeCandidate, openQuestionsOf, score, SCORE_BOUND, type Candidate, type PlanScope,
} from './score.ts';
import { serendipityEpsilon } from './zone.ts';

interface PlanCursor {
  index: number;
  mode: 'daily' | 'binge';
  goalReached: boolean;
  closed: boolean;
  sinceRecall: number;
  cleanser: number;
  cleanserSerendipity: boolean;
  slots: Record<string, number>;
  lastSlot: SlotKind | '';
  serendipityByTen: boolean;
  deepCutUsed: boolean;
  milestonesShown: string[];
  /** session position the next backfill slot is due at (§9.3). */
  backfillAt: number;
}

function syntheticSession(state: EngineState, now: number): SessionState {
  return {
    id: 'synthetic',
    startedAt: now,
    mode: 'daily',
    goalReached: false,
    minutes: 0,
    cards: 0,
    index: state.recent.length ? 1 : 0,
    slots: {},
    sinceRecall: 0,
    sinceWire: 0,
    lastSlot: '',
    cleanser: 0,
    cleanserSerendipity: false,
    first: state.metrics.sessions === 0,
    ordinal: Math.max(1, state.metrics.sessions),
    onThisDay: '',
  };
}

// ── cold start (§13) ────────────────────────────────────────────────────────

function coldStartDomains(index: number): string[] {
  if (index === 0) return [PARAMS.coldStartFirstDomain];
  const entry = PARAMS.coldStartShape[index - 1];
  if (!entry) return [];
  return entry.split('|');
}

function isHomeDomain(domain: string): boolean {
  return PARAMS.coldStartHomeDomains.indexOf(domain) >= 0;
}

// ── the planner ─────────────────────────────────────────────────────────────

export interface PlanResult {
  cards: ServedCard[];
  why: Record<CardId, string[]>;
}

export function plan(state: EngineState, ctx: EngineContext, n: number): PlanResult {
  const now = ctx.now();
  const mv = createMasteryView(state, ctx, now);
  const sampler = createSampler(state, ctx.graph, ctx.random);
  const trail = createTrail(state, ctx);
  const session = state.session || syntheticSession(state, now);
  const inZone = !!state.zone;
  const firstSession = session.first && session.ordinal <= 1;

  // Cards that may be served although they are in `seen` (§7).
  const allowSeen: Record<CardId, true> = {};
  const revisitReady = state.revisit.filter((r) => !r.resolved && r.readyAt);
  for (const r of revisitReady) allowSeen[r.card] = true;
  for (const id of state.reread || []) {
    const s = state.seen[id];
    if (!s || s.last < session.startedAt) allowSeen[id] = true;
  }
  for (const id of seriesReentries(state, ctx, now)) allowSeen[id] = true;

  const scope: PlanScope = {
    state,
    ctx,
    mv,
    now,
    sampler,
    trail,
    inZone,
    budget: energyBudget(session.mode, inZone),
    likedTopics: likedTopicsOf(state, ctx),
    openQuestions: openQuestionsOf(state),
    contextTag: state.context || '',
    spanishTarget: state.settings.spanishShare,
    homeBoost: firstSession ? PARAMS.coldStartHomeBoost : 1,
    zoneArea: state.zone ? state.zone.area : '',
  };

  const excluded = trailIds(trail);
  const candidates: Candidate[] = [];
  const byId: Record<string, Candidate> = {};
  for (const card of ctx.cards.all) {
    if (excluded[card.id] && !allowSeen[card.id]) continue;
    if (!eligible(card, state, ctx, mv, now, { allowSeen, sampler })) continue;
    const cand = makeCandidate(card, scope);
    candidates.push(cand);
    byId[card.id] = cand;
  }
  candidates.sort((a, b) => b.base - a.base);

  const cursor: PlanCursor = {
    index: session.index,
    mode: session.mode,
    goalReached: session.goalReached,
    closed: (session.slots['close'] || 0) > 0,
    sinceRecall: session.sinceRecall,
    cleanser: session.cleanser,
    cleanserSerendipity: session.cleanserSerendipity,
    slots: Object.assign({}, session.slots),
    lastSlot: (session.lastSlot || '') as SlotKind | '',
    serendipityByTen: (session.slots['serendipity'] || 0) > 0,
    deepCutUsed: false,
    milestonesShown: [],
    backfillAt: session.backfillAt === undefined ? session.index : session.backfillAt,
  };

  const used: Record<string, true> = {};
  const out: ServedCard[] = [];
  const why: Record<CardId, string[]> = {};
  const recallK = effectiveRecallInterval(state);
  const pending = (state.pendingMilestones || []).slice();

  for (let i = 0; i < n; i++) {
    sampler.reset();
    const served = pickOne(state, ctx, scope, cursor, {
      used,
      allowSeen,
      candidates,
      byId,
      recallK,
      pending,
      firstSession,
      session,
    });
    if (!served) break;
    out.push(served);
    why[served.id] = served.why;
    used[served.id] = true;

    // Advance the cursor and the trail exactly as a real view would.
    cursor.index += 1;
    cursor.slots[served.slot] = (cursor.slots[served.slot] || 0) + 1;
    cursor.lastSlot = served.slot;
    if (served.slot === 'recall') cursor.sinceRecall = 0;
    else cursor.sinceRecall += 1;
    if (cursor.cleanser > 0 && served.slot === 'light') cursor.cleanser -= 1;
    if (served.slot === 'serendipity') cursor.serendipityByTen = true;
    if (served.slot === 'close') cursor.closed = true;
    if (served.slot === 'milestone') {
      cursor.milestonesShown.push(served.milestone || served.id);
      cursor.slots['m:' + (served.milestone || served.id)] = 1;
      if ((served.milestone || '') === 'goal-reached') cursor.mode = 'binge';
      continue; // milestones are not cards: they do not enter the trail
    }
    const meta = ctx.cards.byId(served.id);
    if (meta) pushTrail(trail, entryOf(meta, ctx, served.slot));
    else pushTrail(trail, { id: served.id, topic: '', area: '', domain: '', format: 'news', weight: 'light', language: 'en', tags: [], cost: 1, slot: served.slot });
  }

  return { cards: out, why };
}

interface PickArgs {
  used: Record<string, true>;
  allowSeen: Record<CardId, true>;
  candidates: Candidate[];
  byId: Record<string, Candidate>;
  recallK: number;
  pending: string[];
  firstSession: boolean;
  session: SessionState;
}

type Filter = (c: Candidate) => boolean;

/**
 * argmax of §8 over a slot's pool. `args.candidates` is sorted by the static
 * half of the score, so once `base × SCORE_BOUND` can no longer beat the best
 * score found, nothing further down can either and the scan stops. That prunes
 * most of a 2,000-card index on every slot.
 */
function best(
  scope: PlanScope,
  args: PickArgs,
  cursor: PlanCursor,
  slot: SlotKind,
  filter: Filter,
  thetaOverride?: number,
  ignoreRhythm?: boolean,
): { cand: Candidate; score: number } | null {
  let top: Candidate | null = null;
  let topScore = 0;
  const list = args.candidates;
  for (let i = 0; i < list.length; i++) {
    const c = list[i];
    if (topScore > 0 && c.base * SCORE_BOUND <= topScore) break;
    if (args.used[c.card.id]) continue;
    if (!filter(c)) continue;
    const v = score(c, scope, slot, thetaOverride, ignoreRhythm);
    if (v > topScore) {
      topScore = v;
      top = c;
    }
  }
  return top ? { cand: top, score: topScore } : null;
}

function serve(cand: Candidate, slot: SlotKind, value: number, scope: PlanScope, extra?: Partial<ServedCard>): ServedCard {
  const card: ServedCard = {
    id: cand.card.id,
    slot,
    why: explainCard(cand, slot, scope, extra),
    score: value,
  };
  if (extra) {
    if (extra.revisitOf) card.revisitOf = extra.revisitOf;
    if (extra.backfillFor) card.backfillFor = extra.backfillFor;
    if (extra.series) card.series = extra.series;
    if (extra.wire) card.wire = extra.wire;
  }
  return card;
}

function pickOne(
  state: EngineState,
  ctx: EngineContext,
  scope: PlanScope,
  cursor: PlanCursor,
  args: PickArgs,
): ServedCard | null {
  const { mv, trail, now } = scope;
  const daily = cursor.mode === 'daily';
  const noHeavyNoRecall = cursor.index === 0;

  // 0 ── a milestone waiting to be announced (§15). Right after `close` it is
  //      the "Goal done ✨ — keep going?" card.
  if (cursor.lastSlot === 'close' && !cursor.slots['m:goal-reached']) {
    const card = milestoneSlot(state, ctx, cursor, args, 'goal-reached');
    if (card) return card;
  }

  // 1 ── the close of a daily session (§10.10).
  if (daily && cursor.goalReached && !cursor.closed && cursor.index > 0) {
    const closeCard = pickClose(scope, args, cursor);
    if (closeCard) return closeCard;
  }

  // 2 ── the opener (§10.1, §13).
  if (cursor.index === 0 && daily) {
    const opener = pickOpen(state, ctx, scope, args, cursor);
    if (opener) return opener;
  }

  // 3 ── forced palate cleansers, then the serendipity that follows them (§12).
  if (cursor.cleanser > 0) {
    const last = lastEntry(trail);
    const hit = best(scope, args, cursor, 'light', (c) =>
      c.card.weight === 'light' && (!last || c.card.domain !== last.domain));
    if (hit) return serve(hit.cand, 'light', hit.score, scope);
  } else if (cursor.cleanserSerendipity) {
    const hit = pickSerendipity(state, ctx, scope, args, cursor);
    if (hit) {
      cursor.cleanserSerendipity = false;
      return hit;
    }
    cursor.cleanserSerendipity = false;
  }

  // 3b ── a milestone waiting to be announced (§15). After the cleansers, so
  //       the groundwork promised by a `too_hard` still arrives next.
  if (cursor.index > 1 && cursor.lastSlot !== 'milestone'
    && (cursor.slots['milestone'] || 0) < PARAMS.milestonesPerSession) {
    const queued = args.pending.filter((m) => cursor.milestonesShown.indexOf(m) < 0);
    if (queued.length) {
      const card = milestoneSlot(state, ctx, cursor, args, queued[0]);
      if (card) return card;
    }
  }

  // 5 ── series continuation (§10.2).
  const seriesHit = pickSeries(state, ctx, scope, args, cursor);
  if (seriesHit) return seriesHit;

  // 6 ── backfill (§9.3).
  if (cursor.index >= cursor.backfillAt) {
    // §9.3: serve until the item has given 2 cards *or* the gap has closed —
    // but always at least once, since the "all prereqs known" fallback targets
    // a topic whose mastery is already above the threshold by construction.
    const open = state.backfill.filter((b) =>
      !b.done && (b.served === 0 || mv.of(b.topic) < PARAMS.backfillThreshold));
    if (open.length) {
      const item = open[0];
      const limit = targetOf(state, ctx, item.topic) + PARAMS.backfillSlack;
      const hit = best(scope, args, cursor, 'backfill', (c) =>
        ctx.graph.ancestors(c.card.topic).indexOf(item.topic) >= 0
        && c.card.difficulty <= limit
        && c.card.layer !== 'rigor', PARAMS.backfillTheta);
      if (hit) {
        cursor.backfillAt = cursor.index + randomRange(ctx.random, PARAMS.backfillEveryMin, PARAMS.backfillEveryMax);
        return serve(hit.cand, 'backfill', hit.score, scope, { backfillFor: item.because });
      }
    }
  }

  // 6b ── the cold-start shape (§13): positions 2–12 of the very first session.
  //        It yields to backfill: a promise of groundwork outranks the tour.
  if (args.firstSession && cursor.index < PARAMS.coldStartShape.length + 1) {
    const domains = coldStartDomains(cursor.index);
    if (domains.length) {
      const hit = best(scope, args, cursor, 'progress', (c) =>
        domains.indexOf(c.card.domain) >= 0 && c.card.format !== 'recall');
      if (hit) {
        const slot: SlotKind = hit.cand.card.format === 'callback' ? 'callback' : 'progress';
        return serve(hit.cand, slot, hit.score, scope);
      }
    }
  }

  // 7 ── an answer to an open question, or a context card (§10.4).
  if (cursor.index >= PARAMS.answerMinPosition - 1 && cursor.index <= PARAMS.answerMaxPosition - 1) {
    if ((cursor.slots['answer'] || 0) < PARAMS.answerPerSession) {
      const hit = best(scope, args, cursor, 'answer', (c) =>
        !!c.card.answersQuestion && !!scope.openQuestions[c.card.answersQuestion]);
      if (hit) return serve(hit.cand, 'answer', hit.score, scope);
    }
    if (scope.contextTag && (cursor.slots['context'] || 0) < 1) {
      const hit = best(scope, args, cursor, 'context', (c) => c.card.context === scope.contextTag);
      if (hit) return serve(hit.cand, 'context', hit.score, scope);
    }
  }

  // 8 ── a revisit the reader earned (§9.4).
  if (cursor.index >= PARAMS.revisitAfterPosition && (cursor.slots['revisit'] || 0) < PARAMS.revisitPerSession) {
    const ready = state.revisit.filter((r) => !r.resolved && r.readyAt);
    for (const item of ready) {
      const cand = args.byId[item.card];
      if (!cand || args.used[item.card]) continue;
      const value = score(cand, scope, 'revisit');
      if (value <= 0) continue;
      return serve(cand, 'revisit', value, scope, { revisitOf: { flaggedAt: item.flaggedAt } });
    }
  }

  // 9 ── recall (§10.1). Never at position 1, never twice running, never after a heavy.
  if (!args.firstSession && args.recallK > 0 && cursor.index > 0 && cursor.lastSlot !== 'recall') {
    const last = lastEntry(trail);
    const afterHeavy = !!last && last.weight === 'heavy';
    const firstOfSession = (cursor.slots['recall'] || 0) === 0;
    const windowOk = firstOfSession
      ? (daily
        ? cursor.index >= PARAMS.recallFirstMin - 1 && cursor.index <= PARAMS.recallFirstMax - 1
        : cursor.sinceRecall >= args.recallK)
      : cursor.sinceRecall >= args.recallK;
    if (windowOk && !afterHeavy) {
      const hit = pickRecall(state, ctx, scope, args, cursor);
      if (hit) return hit;
    }
  }

  // 10 ── callbacks (§10.7).
  if ((cursor.slots['callback'] || 0) < PARAMS.callbacksPerSession
    && (!daily || cursor.index >= PARAMS.callbackMinPosition)) {
    const zoneArea = state.zone ? state.zone.area : '';
    const focusArea = state.focus ? ctx.graph.area(state.focus) : '';
    const hit = best(scope, args, cursor, 'callback', (c) => {
      if (c.card.format !== 'callback' || !c.card.callback) return false;
      if (!zoneArea && !focusArea) return true;
      const toArea = ctx.graph.area(c.card.callback.to);
      return toArea === zoneArea || toArea === focusArea;
    }) || best(scope, args, cursor, 'callback', (c) => c.card.format === 'callback' && !!c.card.callback);
    if (hit) return serve(hit.cand, 'callback', hit.score, scope);
  }

  // 11 ── the wire (§10.8). Held back until the cold-start tour is over.
  if ((!args.firstSession || cursor.index > PARAMS.coldStartShape.length) && wireAllowed(trail)) {
    const hit = pickWire(state, ctx, scope, args, cursor);
    if (hit) return hit;
  }

  // 12 ── serendipity (§10.9).
  const eps = serendipityEpsilon(state, cursor.index);
  // "At least one in the first 10 cards of a daily session" — the last chance
  // is card 10 itself; past that the window has closed rather than become a
  // standing obligation.
  const forced = daily && !cursor.serendipityByTen && cursor.index === PARAMS.serendipityByCard - 1;
  // §10.9 calls ε a *budget*, not a coin: spend it when the running share of
  // serendipity slots this session is still under ε. Same long-run rate, far
  // less variance than a per-position roll.
  const serendipityShare = ((cursor.slots['serendipity'] || 0) + 1) / (cursor.index + 1);
  if (cursor.lastSlot !== 'serendipity' && (forced || serendipityShare <= eps)) {
    const hit = pickSerendipity(state, ctx, scope, args, cursor);
    if (hit) return hit;
  }
  if (cursor.mode === 'binge' && !cursor.deepCutUsed && ctx.random() < eps) {
    const hit = pickDeepCut(state, ctx, scope, args, cursor);
    if (hit) {
      cursor.deepCutUsed = true;
      return hit;
    }
  }

  // 13 ── a natural stopping point in a long binge (§10, binge additions).
  if (cursor.mode === 'binge' && cursor.index >= PARAMS.stoppingPointAfter
    && cursor.index % PARAMS.stoppingPointEvery === 0) {
    const hit = best(scope, args, cursor, 'progress', (c) => c.card.format === 'story' || c.card.format === 'challenge');
    if (hit) return serve(hit.cand, 'progress', hit.score, scope);
  }

  // 14 ── progress: the argmax of §8 over everything eligible.
  const hit = best(scope, args, cursor, 'progress', (c) => {
    if (c.card.format === 'recall') return false;
    if (noHeavyNoRecall && c.card.weight === 'heavy') return false;
    return true;
  });
  if (hit) return serve(hit.cand, 'progress', hit.score, scope);

  // Last resort: the energy budget can be exhausted by history the planner did
  // not choose (a restored snapshot, a burst of heavy cards). Rather than
  // return nothing, drop the rhythm constraint and prefer something light.
  const relaxed = best(scope, args, cursor, 'light', (c) => c.card.format !== 'recall' && c.card.weight === 'light', undefined, true)
    || best(scope, args, cursor, 'progress', (c) => c.card.format !== 'recall', undefined, true);
  return relaxed ? serve(relaxed.cand, relaxed.cand.card.weight === 'light' ? 'light' : 'progress', relaxed.score, scope) : null;
}

// ── individual slot pickers ─────────────────────────────────────────────────

function milestoneSlot(
  state: EngineState,
  ctx: EngineContext,
  cursor: PlanCursor,
  args: PickArgs,
  id: string,
): ServedCard | null {
  if (cursor.milestonesShown.indexOf(id) >= 0) return null;
  if (cursor.slots['m:' + id]) return null;
  if (id !== 'goal-reached' && args.pending.indexOf(id) < 0) return null;
  return {
    id,
    slot: 'milestone',
    milestone: id,
    why: explainMilestone(id, ctx, state),
    score: 1,
  };
}

function pickOpen(
  state: EngineState,
  ctx: EngineContext,
  scope: PlanScope,
  args: PickArgs,
  cursor: PlanCursor,
): ServedCard | null {
  // §13: the first card of the first session ever is a math card, difficulty 3,
  // with a paradox / beautiful / connection angle.
  if (args.firstSession) {
    const hit = best(scope, args, cursor, 'open', (c) =>
      c.card.domain === PARAMS.coldStartFirstDomain
      && c.card.weight !== 'heavy'
      && c.card.format !== 'recall'
      && Math.abs(c.card.difficulty - PARAMS.coldStartFirstDifficulty) <= 1
      && hasAny(c.card.angles, PARAMS.coldStartFirstAngles))
      || best(scope, args, cursor, 'open', (c) =>
        c.card.domain === PARAMS.coldStartFirstDomain && c.card.weight !== 'heavy' && c.card.format !== 'recall');
    if (hit) return serve(hit.cand, 'open', hit.score, scope);
  }

  const topAreas = topInterestAreas(state, ctx, scope.sampler, PARAMS.openTopAreas);
  const baseOk = (c: Candidate) =>
    c.card.weight !== 'heavy' && c.card.format !== 'recall'
    && PARAMS.openFormats.indexOf(c.card.format) >= 0;

  const hit = best(scope, args, cursor, 'open', (c) =>
    baseOk(c) && hasAny(c.card.angles, PARAMS.openAngles) && topAreas.indexOf(c.area) >= 0)
    || best(scope, args, cursor, 'open', (c) => baseOk(c) && hasAny(c.card.angles, PARAMS.openAngles))
    || best(scope, args, cursor, 'open', baseOk)
    || best(scope, args, cursor, 'open', (c) => c.card.weight !== 'heavy' && c.card.format !== 'recall');
  return hit ? serve(hit.cand, 'open', hit.score, scope) : null;
}

function pickClose(scope: PlanScope, args: PickArgs, cursor: PlanCursor): ServedCard | null {
  for (const format of PARAMS.closeFormats) {
    const hit = best(scope, args, cursor, 'close', (c) => {
      if (c.card.format !== format) return false;
      if (format === 'story') return hasAny(c.card.angles, PARAMS.closeStoryAngles);
      return true;
    });
    if (hit) return serve(hit.cand, 'close', hit.score, scope);
  }
  const any = best(scope, args, cursor, 'close', (c) => c.card.weight !== 'heavy' && c.card.format !== 'recall');
  return any ? serve(any.cand, 'close', any.score, scope) : null;
}

function pickSeries(
  state: EngineState,
  ctx: EngineContext,
  scope: PlanScope,
  args: PickArgs,
  cursor: PlanCursor,
): ServedCard | null {
  for (const sid of Object.keys(state.series)) {
    const prog = state.series[sid];
    if (prog.finished) continue;
    if (!prog.pending && !prog.warm && !prog.paused) continue;
    const wantIndex = prog.paused ? prog.lastIndex : prog.lastIndex + 1;
    let target: CardMeta | null = null;
    for (const ep of ctx.cards.series(sid)) {
      if (ep.series && ep.series.index === wantIndex) target = ep;
    }
    if (!target) continue;
    const cand = args.byId[target.id];
    if (!cand || args.used[target.id]) continue;
    if (!prog.pending && cursor.mode !== 'binge' && prog.lastAt >= args.session.startedAt) {
      // Not tapped: the episode goes within 1–3 cards, not necessarily now.
      const spread = PARAMS.seriesWithinMax - PARAMS.seriesWithinMin + 1;
      const offset = PARAMS.seriesWithinMin + (hashString(sid) % spread);
      if (cursor.index < (prog.atIndex || 0) + offset) continue;
    }
    const value = score(cand, scope, 'series');
    if (value <= 0) continue;
    return serve(cand, 'series', value, scope, { series: sid });
  }
  return null;
}

function pickRecall(
  state: EngineState,
  ctx: EngineContext,
  scope: PlanScope,
  args: PickArgs,
  cursor: PlanCursor,
): ServedCard | null {
  // Re-reads first (§10.2), then the most overdue FSRS item.
  for (const id of state.reread || []) {
    if (args.used[id]) continue;
    const s = state.seen[id];
    if (s && s.last >= args.session.startedAt) continue;
    const meta = ctx.cards.byId(id);
    if (!meta) continue;
    return {
      id,
      slot: 'recall',
      why: ['Quick re-read: you missed this one'],
      score: 1,
    };
  }

  let bestId = '';
  let bestOver = -1;
  for (const id of Object.keys(state.fsrs)) {
    if (args.used[id]) continue;
    const over = overdueDays(state.fsrs[id], scope.now);
    if (over < 0) continue;
    const meta = ctx.cards.byId(id);
    if (!meta || !meta.hasRecall) continue;
    if (over > bestOver) {
      bestOver = over;
      bestId = id;
    }
  }
  if (!bestId) return null;
  const meta = ctx.cards.byId(bestId);
  if (!meta) return null;
  const cand = args.byId[bestId] || makeCandidate(meta, scope);
  return serve(cand, 'recall', 1 + bestOver, scope);
}

function pickWire(
  state: EngineState,
  ctx: EngineContext,
  scope: PlanScope,
  args: PickArgs,
  cursor: PlanCursor,
): ServedCard | null {
  const thetaNews = scope.sampler.format('news');

  // A `news` card from the index beats a raw wire item when one is eligible.
  const newsHit = best(scope, args, cursor, 'news', (c) => {
    if (c.card.format !== 'news') return false;
    const dated = parseDate(c.card.dates.event || c.card.dates.written);
    const fresh = !isNaN(dated) && (scope.now - dated) / DAY_MS < PARAMS.newsFreshDays;
    return fresh || thetaNews >= PARAMS.newsThetaFloor;
  });
  if (newsHit) return serve(newsHit.cand, 'news', newsHit.score, scope);

  let pick: WireItem | null = null;
  let pickScore = 0;
  for (const item of ctx.wire) {
    if (item.status !== 'fresh') continue;
    const id = 'wire:' + item.id;
    if (args.used[id] || state.recent.indexOf(id) >= 0) continue;
    const dated = parseDate(item.published);
    const ageDays = isNaN(dated) ? 99 : Math.max(0, (scope.now - dated) / DAY_MS);
    const fresh = ageDays < PARAMS.newsFreshDays;
    if (!fresh && thetaNews < PARAMS.newsThetaFloor) continue;
    if (scope.sampler.source(item.source) < PARAMS.wireSourceFloor) continue;
    if (item.kind === 'onthisday') {
      if (cursor.slots['onthisday']) continue;
      if (!isToday(dated, scope.now)) continue;
    }
    const value = Math.exp(-ageDays / PARAMS.wireHalfLifeDays)
      * scope.sampler.topic(item.topicHint || item.domain)
      * scope.sampler.source(item.source)
      * (1 + PARAMS.randomJitter * ctx.random());
    if (value > pickScore) {
      pickScore = value;
      pick = item;
    }
  }
  if (!pick) return null;
  if (pick.kind === 'onthisday') cursor.slots['onthisday'] = 1;
  return {
    id: 'wire:' + pick.id,
    slot: 'wire',
    wire: pick.id,
    why: explainWire(pick, scope.now),
    score: pickScore,
  };
}

function pickSerendipity(
  state: EngineState,
  ctx: EngineContext,
  scope: PlanScope,
  args: PickArgs,
  cursor: PlanCursor,
): ServedCard | null {
  const top = topDomains(state, ctx, scope.sampler, PARAMS.serendipityTopDomains);
  const outside = ctx.graph.domainIds.filter((d) => top.indexOf(d) < 0);
  if (!outside.length) return null;

  // The domain is chosen by Thompson sampling over the *surprise* arms — taste
  // in surprises, learned separately from taste in topics (§1.5) — weighted by
  // how long the field has been absent from the feed, so the budget rotates
  // instead of pouring every surprise into the same neighbour.
  const recentDomains: Record<string, number> = {};
  const entries = scope.trail.entries;
  for (let i = Math.max(0, entries.length - PARAMS.languageWindow); i < entries.length; i++) {
    recentDomains[entries[i].domain] = (recentDomains[entries[i].domain] || 0) + 1;
  }
  let domain = outside[0];
  let bestTheta = -1;
  for (const d of outside) {
    const starved = 1 - Math.min(1, (recentDomains[d] || 0) / PARAMS.serendipityStarvation);
    const theta = scope.sampler.surprise(d) * (1 + starved);
    if (theta > bestTheta) {
      bestTheta = theta;
      domain = d;
    }
  }

  const dTarget = targetOf(state, ctx, domain);
  let top1: Candidate | null = null;
  let topScore = 0;
  for (const c of args.candidates) {
    if (args.used[c.card.id]) continue;
    if (c.card.domain !== domain) continue;
    if (rhythm(scope.trail, c.card, ctx, 'serendipity', scope.budget, scope.inZone) === 0) continue;
    const value = scope.sampler.anglesOf(c.card.angles)
      * novelty(scope.trail, c.card, ctx, 'serendipity')
      * fit(c.card.difficulty, dTarget, scope.inZone)
      * (1 + PARAMS.randomJitter * ctx.random());
    if (value > topScore) {
      topScore = value;
      top1 = c;
    }
  }
  return top1 ? serve(top1, 'serendipity', topScore, scope) : null;
}

function pickDeepCut(
  state: EngineState,
  ctx: EngineContext,
  scope: PlanScope,
  args: PickArgs,
  cursor: PlanCursor,
): ServedCard | null {
  const cutoff = scope.now - PARAMS.deepCutUntouchedDays * DAY_MS;
  const cold: Record<string, boolean> = {};
  for (const d of ctx.graph.domainIds) {
    const ts = state.topics[d];
    cold[d] = !ts || (ts.lastEvent || 0) < cutoff;
  }
  const pool = args.candidates.filter((c) =>
    cold[c.card.domain] && !args.used[c.card.id] && (c.card.hasRigor || c.card.format === 'story'));
  if (!pool.length) return null;
  const choice = pool[Math.floor(ctx.random() * pool.length) % pool.length];
  if (rhythm(scope.trail, choice.card, ctx, 'serendipity', scope.budget, scope.inZone) === 0) return null;
  return serve(choice, 'serendipity', 1, scope);
}

// ── small helpers ───────────────────────────────────────────────────────────

function hasAny(list: string[] | undefined, allowed: string[]): boolean {
  if (!list) return false;
  for (const v of list) if (allowed.indexOf(v) >= 0) return true;
  return false;
}

function isToday(dated: number, now: number): boolean {
  if (isNaN(dated)) return false;
  const a = new Date(dated);
  const b = new Date(now);
  return a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/** The reader's top interest areas right now, by Thompson draw. */
export function topInterestAreas(state: EngineState, ctx: EngineContext, sampler: Sampler, k: number): TopicId[] {
  const scored: { id: TopicId; v: number }[] = [];
  for (const a of ctx.graph.areaIds) scored.push({ id: a, v: sampler.topic(a) });
  scored.sort((x, y) => y.v - x.v);
  return scored.slice(0, k).map((s) => s.id);
}

/** The reader's top domains right now, by Thompson draw. */
export function topDomains(state: EngineState, ctx: EngineContext, sampler: Sampler, k: number): string[] {
  const scored: { id: string; v: number }[] = [];
  for (const d of ctx.graph.domainIds) scored.push({ id: d, v: sampler.topic(d) });
  scored.sort((x, y) => y.v - x.v);
  return scored.slice(0, k).map((s) => s.id);
}

export { engaged };
