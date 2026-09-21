/**
 * A trivial Engine used when `src/engine` is missing or `createEngine` throws.
 *
 * It keeps the app usable: unseen cards in a sensible mixed order (round-robin
 * across domains, easy and light first), never a recall slot, `why: ['fallback']`.
 * It folds the handful of events the UI needs to stay honest (seen, saved,
 * settings, streak minutes, milestones) so Saved/You/Settings still work.
 */
import type {
  Engine,
  EngineDeps,
  EngineState,
  Event,
  KnowledgeMapNode,
  ServedCard,
  SessionPlan,
  Settings,
  TopicId,
  TopicState,
} from '@/types';
import { dayKey, interleave, sessionIdFor } from './util';

export const DEFAULT_SETTINGS: Settings = {
  spanishShare: 0.12,
  quizFrequency: 'auto',
  theme: 'dark',
  goalMinutes: 10,
  reduceMotion: false,
  showWhy: true,
  textSize: 'M',
};

export function blankState(deviceId: string, now = Date.now()): EngineState {
  return {
    version: 1,
    deviceId,
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
      goalMinutes: DEFAULT_SETTINGS.goalMinutes,
      todayMinutes: 0,
      todayDay: dayKey(now),
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
      firstDay: dayKey(now),
      rolling: { likeRate: 0, skipRate: 0, medianSession: 0, returnRate: 0 },
    },
    settings: { ...DEFAULT_SETTINGS },
    milestones: [],
    recent: [],
  };
}

const WEIGHT_ORDER = { light: 0, medium: 1, heavy: 2 } as const;

export function createFallbackEngine(deps: EngineDeps, initial?: EngineState): Engine {
  const now = deps.now ?? (() => Date.now());
  const state: EngineState = initial ?? blankState('fallback', now());
  let session: SessionPlan = { id: sessionIdFor(state.deviceId, now()), startedAt: now(), mode: 'daily', goalReached: false };

  const topic = (id: TopicId): TopicState => {
    const t = state.topics[id];
    if (t) return t;
    const fresh: TopicState = {
      mastery: 0,
      points: 0,
      difficulty: 2,
      interest: { a: 1, b: 1, n: 0, last: 0 },
      seen: 0,
      positives: 0,
      negatives: 0,
      tooHard: 0,
      lastServed: 0,
    };
    state.topics[id] = fresh;
    return fresh;
  };

  const seenInfo = (card: string) => (state.seen[card] ??= { first: now(), last: now(), views: 0 });

  const byId = new Map(deps.index.cards.map((c) => [c.id, c]));

  function apply(ev: Event): void {
    state.eventCount++;
    state.lastEventId = ev.id;
    state.updatedAt = Math.max(state.updatedAt, ev.t);
    const meta = ev.card ? byId.get(ev.card) : undefined;
    const t = meta?.topic ?? ev.topic;

    switch (ev.type) {
      case 'pass':
        if (ev.card) {
          state.recent = [ev.card, ...state.recent.filter((id) => id !== ev.card)].slice(0, 40);
          if (t && ev.data?.signaled !== true) topic(t).negatives++;
        }
        break;
      case 'view': {
        if (!ev.card) break;
        const info = seenInfo(ev.card);
        info.views++;
        info.last = ev.t;
        info.dwellMs = (info.dwellMs ?? 0) + Number(ev.data?.dwellMs ?? 0);
        state.metrics.cardsSeen++;
        if (t) {
          const ts = topic(t);
          ts.seen++;
          ts.lastServed = ev.t;
          ts.points += 1;
          ts.mastery = Math.min(1, ts.points / 24);
        }
        if (!state.recent.includes(ev.card)) state.recent = [ev.card, ...state.recent].slice(0, 40);
        break;
      }
      case 'like':
        if (ev.card) seenInfo(ev.card).liked = true;
        state.metrics.likes++;
        if (t) topic(t).positives++;
        break;
      case 'unlike':
        if (ev.card) seenInfo(ev.card).liked = false;
        break;
      case 'save':
        if (ev.card && !state.saved.includes(ev.card)) state.saved.push(ev.card);
        if (ev.card) seenInfo(ev.card).saved = true;
        state.metrics.saves++;
        break;
      case 'unsave':
        state.saved = state.saved.filter((id) => id !== ev.card);
        if (ev.card) seenInfo(ev.card).saved = false;
        break;
      case 'skip':
        if (ev.card) seenInfo(ev.card).skipped = true;
        state.metrics.skips++;
        if (t) topic(t).negatives++;
        break;
      case 'too_hard':
        if (ev.card) seenInfo(ev.card).tooHard = true;
        state.metrics.tooHard++;
        if (t) topic(t).difficulty = Math.max(1, topic(t).difficulty - 0.5);
        break;
      case 'too_easy':
        if (ev.card) seenInfo(ev.card).tooEasy = true;
        state.metrics.tooEasy++;
        if (t) topic(t).difficulty = Math.min(5, topic(t).difficulty + 0.5);
        break;
      case 'rigor_open':
        if (ev.card) seenInfo(ev.card).rigorOpened = true;
        break;
      case 'recall':
        state.metrics.recallAnswered++;
        if (Number(ev.data?.grade ?? 0) >= 3) state.metrics.recallCorrect++;
        break;
      case 'question':
        state.questions.push({
          id: String(ev.data?.id ?? ev.id),
          t: ev.t,
          card: ev.card,
          topic: ev.topic,
          text: String(ev.data?.text ?? ''),
          status: 'open',
        });
        break;
      case 'focus':
        if (ev.data?.available !== false) state.focus = (ev.data?.topic as TopicId | undefined) ?? undefined;
        break;
      case 'settings':
        Object.assign(state.settings, (ev.data?.patch ?? {}) as Partial<Settings>);
        if (state.settings.goalMinutes) state.streak.goalMinutes = state.settings.goalMinutes;
        break;
      case 'milestone': {
        const id = String(ev.data?.id ?? '');
        if (id && !state.milestones.includes(id)) state.milestones.push(id);
        break;
      }
      case 'session_start':
        state.metrics.sessions++;
        session = { id: ev.s, startedAt: ev.t, mode: 'daily', goalReached: false };
        break;
      case 'session_end': {
        const minutes = Number(ev.data?.minutes ?? 0);
        const day = dayKey(ev.t);
        if (state.streak.todayDay !== day) {
          state.streak.todayDay = day;
          state.streak.todayMinutes = 0;
        }
        state.streak.todayMinutes += minutes;
        state.metrics.totalMinutes += minutes;
        if (minutes >= 25) state.metrics.binges++;
        if (state.streak.todayMinutes >= state.streak.goalMinutes && state.streak.lastGoalDay !== day) {
          state.streak.lastGoalDay = day;
          state.streak.current++;
          state.streak.best = Math.max(state.streak.best, state.streak.current);
        }
        break;
      }
      case 'undo':
      default:
        break;
    }
    if (meta?.answersQuestion && (
      (ev.type === 'view' && ev.data?.confirmed === true)
      || ev.type === 'like' || ev.type === 'save'
      || (ev.type === 'recall' && Number(ev.data?.grade ?? 0) > 0)
    )) {
      for (const q of state.questions) {
        if (q.id === meta.answersQuestion) {
          q.status = 'answered';
          q.answerCard = meta.id;
        }
      }
    }
  }

  function candidates(): ServedCard[] {
    const pool = deps.index.cards
      .filter((c) => c.format !== 'recall')
      .filter((c) => !state.seen[c.id])
      .filter((c) => c.evergreen !== false || !c.dates.expires || Date.parse(c.dates.expires) > now());
    pool.sort(
      (a, b) =>
        a.difficulty - b.difficulty ||
        WEIGHT_ORDER[a.weight] - WEIGHT_ORDER[b.weight] ||
        a.id.localeCompare(b.id),
    );
    return interleave(pool, (c) => c.domain).map((c, i) => ({
      id: c.id,
      slot: i === 0 ? 'open' : 'progress',
      why: ['fallback'],
      score: 0,
    }));
  }

  function map(): KnowledgeMapNode[] {
    const counts = new Map<TopicId, { total: number; seen: number }>();
    for (const c of deps.index.cards) {
      for (const id of [c.topic, ...(c.topics ?? [])]) {
        const rec = counts.get(id) ?? { total: 0, seen: 0 };
        rec.total++;
        if (state.seen[c.id]) rec.seen++;
        counts.set(id, rec);
      }
    }
    const roll = (prefix: string) => {
      let total = 0;
      let seen = 0;
      for (const [id, rec] of counts) {
        if (id === prefix || id.startsWith(`${prefix}.`)) {
          total += rec.total;
          seen += rec.seen;
        }
      }
      return { total, seen };
    };
    const nodes: KnowledgeMapNode[] = [];
    for (const d of deps.taxonomy.domains) {
      const { total, seen } = roll(d.id);
      const mastery = total ? Math.min(1, seen / Math.max(6, total * 0.5)) : 0;
      nodes.push({
        id: d.id,
        kind: 'domain',
        name: d.name,
        mastery,
        level: levelOf(mastery, seen),
        unlocked: true,
        cardsTotal: total,
        cardsSeen: seen,
        prereqs: [],
        children: deps.taxonomy.nodes.filter((n) => n.parent === d.id).map((n) => n.id),
        color: d.color,
      });
    }
    for (const n of deps.taxonomy.nodes) {
      const { total, seen } = roll(n.id);
      const mastery = total ? Math.min(1, seen / Math.max(4, total * 0.6)) : 0;
      nodes.push({
        id: n.id,
        kind: n.kind,
        name: n.name,
        mastery,
        level: levelOf(mastery, seen),
        unlocked: n.prereqs.length === 0 || n.prereqs.every((p) => (state.topics[p]?.mastery ?? 0) >= 0.25),
        cardsTotal: total,
        cardsSeen: seen,
        prereqs: n.prereqs,
        children: deps.taxonomy.nodes.filter((c) => c.parent === n.id).map((c) => c.id),
        color: deps.taxonomy.domains.find((d) => n.id.startsWith(d.id))?.color,
      });
    }
    return nodes;
  }

  return {
    apply,
    next(n = 8) {
      return candidates().slice(0, n);
    },
    explain() {
      return ['fallback'];
    },
    map,
    state() {
      return state;
    },
    session() {
      return session;
    },
  };
}

function levelOf(mastery: number, seen: number): 0 | 1 | 2 | 3 | 4 {
  if (!seen) return 0;
  if (mastery >= 0.85) return 4;
  if (mastery >= 0.6) return 3;
  if (mastery >= 0.3) return 2;
  return 1;
}
