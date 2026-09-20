/**
 * Per-node difficulty targets and the fit curve (ENGINE.md §5).
 *
 * A target is a real number in [1, 5] that drifts toward what the reader
 * actually enjoys. Topics with no history of their own read through to their
 * area, then their domain, so a brand-new topic inherits a sane level instead
 * of starting at the middle of the scale.
 */

import type { EngineState, TopicId } from '../types.ts';
import type { EngineContext } from './context.ts';
import { PARAMS } from './params.ts';
import { clamp } from './rng.ts';
import { priorFor } from './taxonomy.ts';

/** The starting target: most specific prior wins, else the node's taxonomy level. */
export function priorDifficulty(ctx: EngineContext, id: TopicId): number {
  const fallback = ctx.graph.level(id);
  const v = priorFor(ctx.priors.difficulty, id, ctx.graph, fallback);
  return clamp(v, PARAMS.difficultyMin, PARAMS.difficultyMax);
}

/** Whether the node has any history of its own (drives the read-through). */
function touched(state: EngineState, id: TopicId): boolean {
  const ts = state.topics[id];
  return !!ts && ((ts.lastEvent || 0) > 0 || ts.seen > 0);
}

/** `d_t`, reading through topic → area → domain while the node is untouched. */
export function targetOf(state: EngineState, ctx: EngineContext, id: TopicId): number {
  const own = state.topics[id];
  if (own && touched(state, id)) return clamp(own.difficulty, PARAMS.difficultyMin, PARAMS.difficultyMax);
  const areaId = ctx.graph.area(id);
  if (areaId && areaId !== id) {
    const area = state.topics[areaId];
    if (area && touched(state, areaId)) return clamp(area.difficulty, PARAMS.difficultyMin, PARAMS.difficultyMax);
  }
  const domainId = ctx.graph.domain(id);
  if (domainId && domainId !== id && domainId !== areaId) {
    const dom = state.topics[domainId];
    if (dom && touched(state, domainId)) return clamp(dom.difficulty, PARAMS.difficultyMin, PARAMS.difficultyMax);
  }
  return own ? clamp(own.difficulty, PARAMS.difficultyMin, PARAMS.difficultyMax) : priorDifficulty(ctx, id);
}

/**
 * How well a card of difficulty `k` matches the target `d`.
 * Gaussian around the target, with an extra penalty for "over my head" outside
 * the zone and a mild one for "too easy" — light cards are rhythm, not waste.
 */
export function fit(k: number, d: number, inZone: boolean): number {
  const gap = k - d;
  let v = Math.exp(-(gap * gap) / (2 * PARAMS.fitSigma * PARAMS.fitSigma));
  if (gap >= PARAMS.fitHardGap && !inZone) v *= PARAMS.fitHardPenalty;
  if (gap <= -PARAMS.fitEasyGap) v *= PARAMS.fitEasyPenalty;
  return v;
}

/** `d ← d + rate·(k + offset − d)` — the like/save/rigor_open drift (§3). */
export function driftTowardCard(state: EngineState, id: TopicId, k: number): void {
  const ts = state.topics[id];
  if (!ts) return;
  ts.difficulty = clamp(
    ts.difficulty + PARAMS.driftRate * (k + PARAMS.driftOffset - ts.difficulty),
    PARAMS.difficultyMin,
    PARAMS.difficultyMax,
  );
}

/** Undo of `driftTowardCard`, used by `undo` (§3). */
export function undriftTowardCard(state: EngineState, id: TopicId, k: number): void {
  const ts = state.topics[id];
  if (!ts) return;
  // d' = d + r(k + o − d) ⇒ d = (d' − r(k + o)) / (1 − r)
  const r = PARAMS.driftRate;
  const before = (ts.difficulty - r * (k + PARAMS.driftOffset)) / (1 - r);
  ts.difficulty = clamp(before, PARAMS.difficultyMin, PARAMS.difficultyMax);
}

export function nudge(state: EngineState, id: TopicId, delta: number): void {
  const ts = state.topics[id];
  if (!ts) return;
  ts.difficulty = clamp(ts.difficulty + delta, PARAMS.difficultyMin, PARAMS.difficultyMax);
}
