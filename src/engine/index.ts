/**
 * Cultivar's recommendation engine — public surface.
 *
 *   createEngine(deps, initial?)   an Engine bound to a content index
 *   initialState(deps)             the cold-start state from priors
 *   replay(deps, events)           state = fold(events), for Node analysis
 *   foldEvent(state, ev, ctx)      one step of that fold
 *   PARAMS                         every tunable constant (ENGINE.md §20)
 *
 * Pure TypeScript: no DOM, no Node built-ins, no globals beyond `Date.now` and
 * `Math.random`, both of which are injectable through `deps`.
 */

import type {
  CardId, Engine, EngineDeps, EngineState, Event, KnowledgeMapNode, ServedCard, SessionPlan,
} from '../types.ts';
import { createContext, type EngineContext } from './context.ts';
import { foldEvent } from './fold.ts';
import { knowledgeMap } from './map.ts';
import { PARAMS } from './params.ts';
import { plan } from './planner.ts';
import { mulberry32 } from './rng.ts';
import { initialState, initialStateFrom } from './state.ts';

export { PARAMS } from './params.ts';
export { foldEvent } from './fold.ts';
export { initialState, initialStateFrom, cloneState } from './state.ts';
export { createContext, type EngineContext } from './context.ts';
export { knowledgeMap } from './map.ts';
export { createMasteryView, type MasteryView } from './mastery.ts';
export { buildGraph, type TaxonomyGraph } from './taxonomy.ts';
export { buildCardIndex, type CardIndex } from './cards.ts';
export { mulberry32, sampleBeta, sampleGamma, hashString } from './rng.ts';
export { simulateReader, type Persona, type SimResult } from './simulate.ts';

/** `state = fold(events)`. Events are sorted by time, then id, so sync is a set union. */
export function replay(deps: EngineDeps, events: Event[]): EngineState {
  const ctx = createContext(deps);
  const state = initialStateFrom(ctx);
  const ordered = events.slice().sort((a, b) => (a.t - b.t) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  for (const ev of ordered) foldEvent(state, ev, ctx);
  return state;
}

export function createEngine(deps: EngineDeps, initial?: EngineState): Engine {
  const ctx = createContext(deps);
  const state: EngineState = initial ? normalize(initial) : initialStateFrom(ctx);

  let cache: ServedCard[] | null = null;
  let cacheWhy: Record<CardId, string[]> = {};
  let planSeed = 0;

  /**
   * Plans draw from a sub-generator seeded once per "generation" (the span
   * between two events). That is what makes `next(5)` a prefix of `next(20)`
   * while still being a deterministic function of `deps.random`.
   */
  function planContext(): EngineContext {
    if (!planSeed) planSeed = Math.floor(ctx.random() * 4294967296) >>> 0 || 1;
    const random = mulberry32(planSeed);
    return {
      index: ctx.index,
      taxonomy: ctx.taxonomy,
      priors: ctx.priors,
      wire: ctx.wire,
      now: ctx.now,
      random,
      graph: ctx.graph,
      cards: ctx.cards,
    };
  }

  return {
    apply(ev: Event): void {
      foldEvent(state, ev, ctx);
      cache = null;
      cacheWhy = {};
      planSeed = 0;
    },

    next(n?: number): ServedCard[] {
      const want = Math.max(1, n === undefined ? 10 : n);
      if (cache && cache.length >= want) return cache.slice(0, want);
      const result = plan(state, planContext(), want);
      cache = result.cards;
      cacheWhy = result.why;
      return cache.slice(0, want);
    },

    explain(cardId: CardId): string[] {
      const hit = cacheWhy[cardId];
      if (hit) return hit.slice();
      for (const c of cache || []) if (c.id === cardId) return c.why.slice();
      // Not in the current plan: explain it as if it were served next.
      const probe = plan(state, planContext(), 1);
      if (probe.cards.length && probe.cards[0].id === cardId) return probe.cards[0].why.slice();
      const meta = ctx.cards.byId(cardId);
      return meta ? ['Matches your level in ' + ctx.graph.name(ctx.cards.area(cardId) || meta.topic)] : [];
    },

    map(): KnowledgeMapNode[] {
      return knowledgeMap(state, ctx);
    },

    state(): EngineState {
      return state;
    },

    session(): SessionPlan {
      const s = state.session;
      if (!s) {
        return { id: '', startedAt: state.updatedAt, mode: 'daily', goalReached: false };
      }
      return { id: s.id, startedAt: s.startedAt, mode: s.mode, goalReached: s.goalReached };
    },
  };
}

/** Fill in fields that older snapshots may not carry, without touching the rest. */
function normalize(s: EngineState): EngineState {
  if (!s.valence) s.valence = [];
  if (!s.days) s.days = [];
  if (!s.reread) s.reread = [];
  if (!s.log) s.log = [];
  if (!s.pendingMilestones) s.pendingMilestones = [];
  if (typeof s.negStreak !== 'number') s.negStreak = 0;
  if (typeof s.recallK !== 'number') s.recallK = PARAMS.recallIntervalStart;
  if (typeof s.widen !== 'number') s.widen = 0;
  if (!s.recent) s.recent = [];
  return s;
}
