/**
 * The zero state (ENGINE.md §4–§6, §13): everything the reader would have if
 * they had never opened the app, seeded from `content/priors.json` so the very
 * first card already knows they are a mid-undergrad mathematician who has never
 * touched biology.
 *
 * Invariant: the result survives `JSON.parse(JSON.stringify(s))` byte for byte.
 * That means plain objects and arrays only — no `Map`, `Set`, `Date`, and no
 * key ever assigned `undefined`.
 */

import type { BanditArm, EngineDeps, EngineState, TopicState } from '../types.ts';
import { newArm } from './bandit.ts';
import { ANGLES, createContext, FORMATS, type EngineContext } from './context.ts';
import { priorDifficulty } from './difficulty.ts';
import { masteryFromPoints, priorPoints, saturation } from './mastery.ts';
import { PARAMS } from './params.ts';

function armFromPrior(pair: [number, number] | undefined): BanditArm {
  if (!pair) return newArm(1, 1, 0);
  return newArm(Math.max(pair[0], 0.05), Math.max(pair[1], 0.05), 0);
}

export function initialStateFrom(ctx: EngineContext): EngineState {
  const topics: Record<string, TopicState> = {};
  for (const id of ctx.graph.ids) {
    const points = priorPoints(ctx, id);
    const ts: TopicState = {
      mastery: masteryFromPoints(points, saturation(ctx, id)),
      points,
      difficulty: priorDifficulty(ctx, id),
      // §6: only the ids listed in priors.interest are seeded; everything else
      // starts at Beta(1,1) and inherits through shrinkage.
      interest: armFromPrior(ctx.priors.interest[id]),
      seen: 0,
      positives: 0,
      negatives: 0,
      tooHard: 0,
      lastServed: 0,
      lastEvent: 0,
    };
    topics[id] = ts;
  }

  const formats: Record<string, BanditArm> = {};
  for (const f of FORMATS) formats[f] = armFromPrior(ctx.priors.formats[f]);

  const angles: Record<string, BanditArm> = {};
  for (const a of ANGLES) angles[a] = armFromPrior(ctx.priors.angles[a]);

  const surprise: Record<string, BanditArm> = {};
  for (const d of ctx.graph.domainIds) surprise[d] = newArm(1, 1, 0);

  const spanish = ctx.priors.language && typeof ctx.priors.language.es === 'number'
    ? ctx.priors.language.es
    : PARAMS.spanishShare;

  return {
    version: PARAMS.stateVersion,
    deviceId: '',
    updatedAt: 0,
    eventCount: 0,
    topics,
    formats,
    angles,
    sources: {},
    surprise,
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
      goalMinutes: PARAMS.goalMinutes,
      todayMinutes: 0,
      todayDay: '',
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
      spanishShare: spanish,
      quizFrequency: 'auto',
      theme: 'system',
      goalMinutes: PARAMS.goalMinutes,
      reduceMotion: false,
      showWhy: true,
    },
    milestones: [],
    recent: [],
    valence: [],
    days: [],
    negStreak: 0,
    recallK: PARAMS.recallIntervalStart,
    reread: [],
    widen: 0,
    pendingMilestones: [],
    log: [],
  };
}

/** `initialState(deps)` — the public entry point. */
export function initialState(deps: EngineDeps): EngineState {
  return initialStateFrom(createContext(deps));
}

/** Deep structural clone that keeps the JSON-roundtrip invariant honest. */
export function cloneState(s: EngineState): EngineState {
  return JSON.parse(JSON.stringify(s)) as EngineState;
}
