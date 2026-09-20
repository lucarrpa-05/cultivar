/**
 * Getting an EngineState out of an event log.
 *
 * Preferred path: the real engine (`replay` from src/engine/index.ts) — same code
 * the phone runs, so the brief describes exactly what the reader experiences.
 *
 * Fallback path: a compact fold implementing ENGINE.md §3–§6, §9, §14, §17 closely
 * enough for analysis. It exists so `npm run analyze` still works when the engine
 * module is missing or broken; the brief always says which path was used.
 */
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import type {
  BanditArm,
  CardMeta,
  EngineDeps,
  EngineState,
  Event,
  ReaderQuestion,
  TopicId,
  TopicState,
} from '../../src/types.ts';
import { Nodes, priorFor } from './refresh-data.ts';
import { at, DAY_MS, dayStart, daysBetween, localDay, warn } from './refresh-io.mjs';

export interface StateResult {
  state: EngineState;
  source: 'engine' | 'fallback';
  note: string;
}

export const FALLBACK_PARAMS = {
  discountGamma: 0.985,
  backfillThreshold: 0.35,
  revisitMinDays: 3,
  prereqUnlock: 0.25,
  fastPassMs: 2500,
  goalMinutes: 10,
  recentWindow: 40,
  zoneShare: 0.45,
  zonePositiveRate: 0.6,
};

export async function loadEngineModule(): Promise<Record<string, unknown> | null> {
  const file = at('src', 'engine', 'index.ts');
  if (!existsSync(file)) return null;
  try {
    return (await import(pathToFileURL(file).href)) as Record<string, unknown>;
  } catch (err) {
    warn('src/engine/index.ts failed to import:', (err as Error).message);
    return null;
  }
}

export async function buildState(deps: EngineDeps, events: Event[]): Promise<StateResult> {
  const mod = await loadEngineModule();
  const replay = mod?.replay as ((d: EngineDeps, e: Event[]) => { state(): EngineState }) | undefined;
  if (typeof replay === 'function') {
    try {
      const engine = replay(deps, events);
      const state = typeof engine?.state === 'function' ? engine.state() : (engine as unknown as EngineState);
      if (state && state.topics) {
        return { state, source: 'engine', note: 'replayed with src/engine (the same code the phone runs)' };
      }
    } catch (err) {
      warn('engine replay threw:', (err as Error).message);
    }
  }
  return {
    state: fallbackReplay(deps, events),
    source: 'fallback',
    note: mod
      ? 'src/engine did not export a usable replay(); used the analysis fold (approximate)'
      : 'src/engine not present; used the analysis fold (approximate)',
  };
}

// ───────────────────────────── the fallback fold ─────────────────────────────

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function emptyArm(a = 1, b = 1): BanditArm {
  return { a, b, n: 0, last: 0 };
}

export function fallbackReplay(deps: EngineDeps, events: Event[]): EngineState {
  const nodes = new Nodes(deps.taxonomy, deps.index);
  const meta = new Map<string, CardMeta>(deps.index.cards.map((c) => [c.id, c]));
  const now = deps.now ? deps.now() : Date.now();
  const state = emptyState(now);

  // Events cancelled by an `undo` never happened, which also removes the backfill
  // and revisit items a too_hard would have created (ENGINE §19.12).
  const undone = new Set<string>();
  for (const ev of events) if (ev.type === 'undo' && ev.data && ev.data.of) undone.add(String(ev.data.of));

  const actionsByCard = new Map<string, Set<string>>();
  for (const ev of events) {
    if (!ev.card || undone.has(ev.id) || ev.type === 'view') continue;
    const set = actionsByCard.get(ev.card) || new Set<string>();
    set.add(ev.type);
    actionsByCard.set(ev.card, set);
  }

  const dayMinutes = new Map<string, number>();
  const activeDays = new Set<string>();
  const sessionMinutes: { t: number; minutes: number }[] = [];
  const valenced: { t: number; area: TopicId; r: number }[] = [];
  let lastDay = '';
  let firstT = 0;

  const topic = (id: TopicId): TopicState => touchTopic(state, nodes, deps, id);

  for (const ev of events) {
    if (undone.has(ev.id) || ev.type === 'undo') continue;
    if (!firstT) firstT = ev.t;
    const day = localDay(ev.t);
    if (lastDay && day !== lastDay) {
      decayAll(state, daysBetween(dayStart(lastDay), dayStart(day)));
    }
    lastDay = day;
    activeDays.add(day);

    const card = ev.card ? meta.get(ev.card) : undefined;
    const topicId = ev.topic || card?.topic || '';
    const k = card ? card.difficulty : 3;

    switch (ev.type) {
      case 'session_start':
        state.metrics.sessions += 1;
        break;
      case 'session_end': {
        const minutes = num(ev.data?.minutes, 0);
        state.metrics.totalMinutes += minutes;
        if (minutes >= 25) state.metrics.binges += 1;
        dayMinutes.set(day, (dayMinutes.get(day) || 0) + minutes);
        sessionMinutes.push({ t: ev.t, minutes });
        break;
      }
      case 'focus':
        state.focus = (ev.data?.topic as TopicId) || ev.topic || undefined;
        break;
      case 'settings':
        Object.assign(state.settings, (ev.data?.patch as object) || {});
        break;
      case 'milestone': {
        const id = String(ev.data?.id || '');
        if (id && !state.milestones.includes(id)) state.milestones.push(id);
        break;
      }
      case 'question': {
        const q: ReaderQuestion = {
          id: String(ev.data?.id || `q-${day}-${ev.id.slice(-4)}`),
          t: ev.t,
          card: ev.card,
          topic: topicId || undefined,
          text: String(ev.data?.text || ''),
          status: 'open',
        };
        if (!state.questions.some((x) => x.id === q.id)) state.questions.push(q);
        break;
      }
      case 'wire': {
        const action = String(ev.data?.action || 'view');
        const r = action === 'like' ? 1 : action === 'open' ? 0.9 : action === 'skip' ? 0.1 : 0.4;
        const src = String(ev.data?.source || '');
        if (src) bump((state.sources[src] = state.sources[src] || emptyArm()), r, 1);
        bump((state.formats.news = state.formats.news || emptyArm()), r, 1);
        break;
      }
      default:
        break;
    }

    const outcome = cardOutcome(ev, card, actionsByCard.get(ev.card || '') || new Set());
    if (!outcome) continue;

    const { r, pts } = outcome;
    const scaledPts = pts * (0.6 + 0.2 * k);

    // seen bookkeeping
    if (ev.card) {
      const s = (state.seen[ev.card] = state.seen[ev.card] || { first: ev.t, last: ev.t, views: 0 });
      s.last = ev.t;
      if (ev.type === 'view') {
        s.views += 1;
        const dwell = num(ev.data?.dwellMs, 0);
        s.dwellMs = (s.dwellMs || 0) + dwell;
      }
      if (ev.type === 'like') s.liked = true;
      if (ev.type === 'unlike') s.liked = false;
      if (ev.type === 'save') s.saved = true;
      if (ev.type === 'skip') s.skipped = true;
      if (ev.type === 'too_hard') s.tooHard = true;
      if (ev.type === 'too_easy') s.tooEasy = true;
      if (ev.type === 'rigor_open') s.rigorOpened = true;
      state.recent = [ev.card, ...state.recent.filter((c) => c !== ev.card)].slice(0, FALLBACK_PARAMS.recentWindow);
    }

    // metrics
    if (ev.type === 'like') state.metrics.likes += 1;
    if (ev.type === 'save') {
      state.metrics.saves += 1;
      if (ev.card && !state.saved.includes(ev.card)) state.saved.push(ev.card);
    }
    if (ev.type === 'unsave' && ev.card) state.saved = state.saved.filter((c) => c !== ev.card);
    if (ev.type === 'skip') state.metrics.skips += 1;
    if (ev.type === 'too_hard') state.metrics.tooHard += 1;
    if (ev.type === 'too_easy') state.metrics.tooEasy += 1;
    if (ev.type === 'recall') {
      state.metrics.recallAnswered += 1;
      const grade = num(ev.data?.grade, 3);
      if (ev.data?.correct === true || grade >= 3) state.metrics.recallCorrect += 1;
      if (ev.card) {
        const f = (state.fsrs[ev.card] = state.fsrs[ev.card] || {
          due: ev.t + DAY_MS,
          stability: 1,
          difficulty: 5,
          reps: 0,
          lapses: 0,
          state: 1 as const,
          lastReview: ev.t,
        });
        f.reps += 1;
        f.lastReview = ev.t;
        if (grade <= 1) {
          f.lapses += 1;
          f.stability = Math.max(0.5, f.stability * 0.5);
        } else {
          f.stability = f.stability * (grade >= 4 ? 2.6 : grade === 3 ? 2 : 1.2);
        }
        f.due = ev.t + f.stability * DAY_MS;
        f.state = 2;
      }
    }
    if (ev.type === 'series_next' && card?.series) {
      const sp = (state.series[card.series.id] = state.series[card.series.id] || {
        lastIndex: 0,
        lastAt: 0,
        paused: false,
        finished: false,
      });
      sp.lastIndex = Math.max(sp.lastIndex, card.series.index);
      sp.lastAt = ev.t;
      sp.finished = sp.lastIndex >= card.series.total;
    }

    if (!topicId) continue;

    // interest arms: topic 1.0, area 0.5, domain 0.25 (secondary topics 0.4x)
    applyTopicChain(state, nodes, deps, topicId, r, scaledPts, ev.t, 1);
    for (const sec of card?.topics || []) applyTopicChain(state, nodes, deps, sec, r, scaledPts * 0.4, ev.t, 0.4);

    // format + angle arms
    if (card) {
      bump((state.formats[card.format] = state.formats[card.format] || emptyArm()), r, 1);
      for (const a of (card.angles || []).slice(0, 3)) {
        bump((state.angles[a] = state.angles[a] || emptyArm()), r, 1);
      }
    }

    // difficulty targets
    const ts = topic(topicId);
    const area = nodes.area(topicId);
    const dom = nodes.domain(topicId);
    if (ev.type === 'like' || ev.type === 'save' || ev.type === 'rigor_open') {
      ts.difficulty = clamp(ts.difficulty + 0.15 * (k + 0.4 - ts.difficulty), 1, 5);
    } else if (ev.type === 'skip' && k >= ts.difficulty + 1) {
      ts.difficulty = clamp(ts.difficulty - 0.1, 1, 5);
    } else if (ev.type === 'too_hard') {
      ts.difficulty = clamp(ts.difficulty - 0.6, 1, 5);
      if (area !== topicId) topic(area).difficulty = clamp(topic(area).difficulty - 0.3, 1, 5);
      if (dom !== topicId) topic(dom).difficulty = clamp(topic(dom).difficulty - 0.1, 1, 5);
      ts.tooHard += 1;
      pushBackfillAndRevisit(state, nodes, deps, ev, card, topicId);
    } else if (ev.type === 'too_easy') {
      ts.difficulty = clamp(ts.difficulty + 0.5, 1, 5);
      if (area !== topicId) topic(area).difficulty = clamp(topic(area).difficulty + 0.25, 1, 5);
      if (dom !== topicId) topic(dom).difficulty = clamp(topic(dom).difficulty + 0.1, 1, 5);
    } else if (ev.type === 'recall' && num(ev.data?.grade, 3) >= 3) {
      ts.difficulty = clamp(ts.difficulty + 0.05, 1, 5);
    }

    valenced.push({ t: ev.t, area, r });
  }

  // ── derived: mastery, metrics, streak, zone ──
  for (const [id, ts] of Object.entries(state.topics)) {
    const S = scale(nodes, id);
    const stale = ts.lastServed ? daysBetween(ts.lastServed, now) : 0;
    const pts = stale > 30 ? ts.points * Math.pow(0.995, stale - 30) : ts.points;
    ts.mastery = clamp(1 - Math.exp(-Math.max(0, pts) / S), 0, 1);
  }

  state.eventCount = events.length;
  state.updatedAt = events.length ? events[events.length - 1].t : now;
  state.lastEventId = events.length ? events[events.length - 1].id : undefined;
  state.metrics.cardsSeen = Object.keys(state.seen).length;
  state.metrics.daysActive = activeDays.size;
  state.metrics.firstDay = firstT ? localDay(firstT) : '';
  state.metrics.rolling = rolling(events, sessionMinutes, activeDays, now);
  state.streak = streak(dayMinutes, state.metrics.firstDay, localDay(now), state.settings.goalMinutes);

  const recent = valenced.slice(-25);
  if (recent.length >= 10) {
    const byArea = new Map<TopicId, { n: number; pos: number; last: number }>();
    for (const v of recent) {
      const e = byArea.get(v.area) || { n: 0, pos: 0, last: 0 };
      e.n += 1;
      if (v.r >= 0.6) e.pos += 1;
      e.last = Math.max(e.last, v.t);
      byArea.set(v.area, e);
    }
    const [area, agg] = [...byArea.entries()].sort((a, b) => b[1].n - a[1].n)[0];
    if (
      agg.n / recent.length >= FALLBACK_PARAMS.zoneShare &&
      agg.pos / agg.n >= FALLBACK_PARAMS.zonePositiveRate &&
      daysBetween(agg.last, now) < 2
    ) {
      state.zone = { area, since: recent[0].t, boost: 1 };
    }
  }

  return state;
}

function cardOutcome(
  ev: Event,
  card: CardMeta | undefined,
  otherActions: Set<string>,
): { r: number; pts: number } | null {
  switch (ev.type) {
    case 'view': {
      const expected = card ? Math.max(8000, (card.words?.body || 120) / 3.3 * 1000) : 40000;
      const dwell = num(ev.data?.dwellMs, 0);
      const frac = num(ev.data?.readFraction, 0);
      if (frac >= 0.6 || dwell >= 0.5 * expected) return { r: 0.6, pts: 1 };
      if (dwell < FALLBACK_PARAMS.fastPassMs && otherActions.size === 0) return { r: 0.05, pts: 0 };
      return { r: 0.3, pts: 0 };
    }
    case 'like':
      return { r: 1, pts: 1 };
    case 'unlike':
      return { r: 0.3, pts: -1 };
    case 'save':
      return { r: 1, pts: 1 };
    case 'skip':
      return { r: 0.1, pts: 0 };
    case 'too_hard':
      return { r: 0.7, pts: 0 };
    case 'too_easy':
      return { r: 0.5, pts: 2 };
    case 'rigor_open':
      return { r: 0.9, pts: 2 };
    case 'source_open':
      return { r: 0.9, pts: 0.5 };
    case 'series_next':
      return { r: 0.8, pts: 0 };
    case 'question':
      return { r: 0.9, pts: 0 };
    case 'recall': {
      const g = num(ev.data?.grade, 3);
      return { r: 0.6, pts: g <= 1 ? -1 : g === 2 ? 1 : g === 3 ? 3 : 4 };
    }
    default:
      return null;
  }
}

function applyTopicChain(
  state: EngineState,
  nodes: Nodes,
  deps: EngineDeps,
  topicId: TopicId,
  r: number,
  pts: number,
  t: number,
  scale = 1,
): void {
  const chain = nodes.chain(topicId);
  const weights = [1, 0.5, 0.25];
  chain.forEach((id, i) => {
    const ts = touchTopic(state, nodes, deps, id);
    const w = (weights[Math.min(i, weights.length - 1)] || 0.25) * scale;
    bump(ts.interest, r, w);
    ts.lastServed = Math.max(ts.lastServed, t);
    if (i === 0) {
      ts.points += pts;
      ts.seen += 1;
      if (r >= 0.6) ts.positives += 1;
      else if (r <= 0.15) ts.negatives += 1;
    }
  });
}

function bump(arm: BanditArm, r: number, w: number): void {
  arm.a += r * w;
  arm.b += (1 - r) * w;
  arm.n += w;
}

function scale(nodes: Nodes, id: TopicId): number {
  return 8 + 2 * Math.min(nodes.cards(id), 12);
}

function touchTopic(state: EngineState, nodes: Nodes, deps: EngineDeps, id: TopicId): TopicState {
  const existing = state.topics[id];
  if (existing) return existing;
  const S = scale(nodes, id);
  const m0 = clamp(Number(priorFor(deps.priors.mastery, id, nodes) ?? 0), 0, 0.95);
  const prior = deps.priors.interest?.[id];
  const ts: TopicState = {
    mastery: m0,
    points: -S * Math.log(1 - m0),
    difficulty: clamp(Number(priorFor(deps.priors.difficulty, id, nodes) ?? 3), 1, 5),
    interest: prior ? emptyArm(prior[0], prior[1]) : emptyArm(),
    seen: 0,
    positives: 0,
    negatives: 0,
    tooHard: 0,
    lastServed: 0,
  };
  state.topics[id] = ts;
  return ts;
}

function decayAll(state: EngineState, days: number): void {
  if (days <= 0) return;
  const g = Math.pow(FALLBACK_PARAMS.discountGamma, days);
  const pull = (arm: BanditArm) => {
    arm.a = 1 + (arm.a - 1) * g;
    arm.b = 1 + (arm.b - 1) * g;
  };
  for (const ts of Object.values(state.topics)) pull(ts.interest);
  for (const m of [state.formats, state.angles, state.sources, state.surprise]) {
    for (const arm of Object.values(m)) pull(arm);
  }
}

/** ENGINE §9 steps 2 and 4: find the gap, promise to come back. */
function pushBackfillAndRevisit(
  state: EngineState,
  nodes: Nodes,
  deps: EngineDeps,
  ev: Event,
  card: CardMeta | undefined,
  topicId: TopicId,
): void {
  const prereqs = new Set<TopicId>([...(card?.prerequisites || []), ...nodes.prereqs(topicId)]);
  const gaps = [...prereqs]
    .filter((p) => (state.topics[p]?.mastery ?? Number(priorFor(deps.priors.mastery, p, nodes) ?? 0)) < FALLBACK_PARAMS.backfillThreshold)
    .sort(
      (a, b) =>
        (state.topics[a]?.mastery ?? 0) - (state.topics[b]?.mastery ?? 0),
    );
  for (const p of gaps) {
    const target = touchTopic(state, nodes, deps, p).difficulty + 0.5;
    const available = deps.index.cards.some(
      (c) =>
        (c.topic === p || (c.topics || []).includes(p)) &&
        c.difficulty <= target &&
        c.layer !== 'rigor' &&
        !state.seen[c.id],
    );
    if (!available) continue;
    if (state.backfill.some((b) => b.topic === p && !b.done)) continue;
    state.backfill.push({ topic: p, because: ev.card || '', created: ev.t, served: 0, done: false });
  }
  if (ev.card && !state.revisit.some((r) => r.card === ev.card && !r.resolved)) {
    state.revisit.push({
      card: ev.card,
      flaggedAt: ev.t,
      prereqs: [...prereqs],
      threshold: FALLBACK_PARAMS.backfillThreshold,
      resolved: false,
    });
  }
}

function rolling(
  events: Event[],
  sessions: { t: number; minutes: number }[],
  activeDays: Set<string>,
  now: number,
): EngineState['metrics']['rolling'] {
  const since = now - 14 * DAY_MS;
  const recent = events.filter((e) => e.t >= since);
  const views = recent.filter((e) => e.type === 'view').length;
  const likes = recent.filter((e) => e.type === 'like').length;
  const skips = recent.filter((e) => e.type === 'skip').length;
  const mins = sessions.filter((s) => s.t >= since).map((s) => s.minutes).sort((a, b) => a - b);
  const days = [...activeDays].filter((d) => dayStart(d) >= since).length;
  return {
    likeRate: views ? round(likes / views) : 0,
    skipRate: views ? round(skips / views) : 0,
    medianSession: mins.length ? round(mins[Math.floor(mins.length / 2)]) : 0,
    returnRate: round(Math.min(1, days / 14)),
  };
}

function streak(
  dayMinutes: Map<string, number>,
  firstDay: string,
  today: string,
  goal: number,
): EngineState['streak'] {
  const out: EngineState['streak'] = {
    current: 0,
    best: 0,
    lastGoalDay: '',
    freezes: 0,
    goalMinutes: goal,
    todayMinutes: dayMinutes.get(today) || 0,
    todayDay: today,
  };
  if (!firstDay) return out;
  let counted = 0;
  let light = 0;
  for (let t = dayStart(firstDay); t <= dayStart(today); t += DAY_MS) {
    const day = localDay(t + 60_000);
    const m = dayMinutes.get(day) || 0;
    if (m >= goal) {
      out.current += 1;
      counted += 1;
      out.lastGoalDay = day;
      out.best = Math.max(out.best, out.current);
      if (counted % 7 === 0) out.freezes = Math.min(2, out.freezes + 1);
    } else if (m >= 3 && light < 2) {
      light += 1;
    } else if (out.freezes > 0) {
      out.freezes -= 1;
      out.freezeUsedOn = day;
    } else {
      out.current = 0;
      light = 0;
    }
  }
  return out;
}

function num(v: unknown, def: number): number {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : def;
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

export function emptyState(now: number): EngineState {
  return {
    version: 1,
    deviceId: 'refresh-analysis',
    updatedAt: now,
    eventCount: 0,
    topics: {},
    formats: {},
    angles: {},
    sources: {},
    surprise: {},
    seen: {},
    fsrs: {},
    backfill: [],
    revisit: [],
    series: {},
    saved: [],
    questions: [],
    streak: {
      current: 0,
      best: 0,
      lastGoalDay: '',
      freezes: 0,
      goalMinutes: FALLBACK_PARAMS.goalMinutes,
      todayMinutes: 0,
      todayDay: localDay(now),
    },
    metrics: {
      sessions: 0,
      binges: 0,
      totalMinutes: 0,
      cardsSeen: 0,
      likes: 0,
      saves: 0,
      skips: 0,
      tooHard: 0,
      tooEasy: 0,
      recallAnswered: 0,
      recallCorrect: 0,
      daysActive: 0,
      firstDay: '',
      rolling: { likeRate: 0, skipRate: 0, medianSession: 0, returnRate: 0 },
    },
    settings: {
      spanishShare: 0.12,
      quizFrequency: 'auto',
      theme: 'dark',
      goalMinutes: FALLBACK_PARAMS.goalMinutes,
      reduceMotion: false,
      showWhy: true,
    },
    milestones: [],
    recent: [],
  };
}
