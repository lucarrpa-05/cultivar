/**
 * Beta–Bernoulli bandits with hierarchical shrinkage (ENGINE.md §3, §6).
 *
 * Every taxonomy node, format, angle, wire source and surprise-domain carries an
 * arm `(a, b)`. Updates run `a += r`, `b += 1 − r`, weighted down the hierarchy;
 * reads are Thompson samples of `Beta(a + κ·μ_parent, b + κ·(1 − μ_parent))`.
 *
 * `createSampler` draws each arm at most once per slot, which is both the right
 * statistics (one draw per decision) and what keeps `next(20)` inside 30 ms.
 */

import type { BanditArm, EngineState, TopicId } from '../types.ts';
import { PARAMS } from './params.ts';
import { sampleBeta } from './rng.ts';
import type { TaxonomyGraph } from './taxonomy.ts';

export function newArm(a: number, b: number, t: number): BanditArm {
  return { a, b, n: 0, last: t };
}

export function armMean(arm: BanditArm): number {
  const s = arm.a + arm.b;
  return s > 0 ? arm.a / s : 0.5;
}

/** Mean of the arm shrunk toward its parent's mean by κ pseudo-observations. */
export function shrunkMean(arm: BanditArm, parentMu: number, kappa: number): number {
  const s = arm.a + arm.b + kappa;
  return s > 0 ? (arm.a + kappa * parentMu) / s : parentMu;
}

/** Thompson draw with shrinkage toward `parentMu`. */
export function sampleArm(random: () => number, arm: BanditArm, parentMu: number, kappa: number): number {
  return sampleBeta(random, arm.a + kappa * parentMu, arm.b + kappa * (1 - parentMu));
}

/** Thompson draw with no hierarchy (formats, angles, sources, surprise). */
export function sampleFlat(random: () => number, arm: BanditArm): number {
  return sampleBeta(random, arm.a, arm.b);
}

const FLOOR = 0.02;

export function updateArm(arm: BanditArm, r: number, weight: number, t: number): void {
  if (weight <= 0) return;
  arm.a += r * weight;
  arm.b += (1 - r) * weight;
  arm.n += weight;
  arm.last = t;
}

/** Exact inverse of `updateArm`, for `undo` (§3). */
export function reverseArm(arm: BanditArm, r: number, weight: number): void {
  if (weight <= 0) return;
  arm.a = Math.max(FLOOR, arm.a - r * weight);
  arm.b = Math.max(FLOOR, arm.b - (1 - r) * weight);
  arm.n = Math.max(0, arm.n - weight);
}

/** `a ← 1 + (a − 1)·γ^days` — obsessions cool, tastes change (§3). */
export function discountArm(arm: BanditArm, g: number): void {
  arm.a = 1 + (arm.a - 1) * g;
  arm.b = 1 + (arm.b - 1) * g;
  if (arm.a < FLOOR) arm.a = FLOOR;
  if (arm.b < FLOOR) arm.b = FLOOR;
}

/** Decay every arm in the state by γ^days (called on the first event of a new day). */
export function discountAll(state: EngineState, days: number): void {
  if (days <= 0) return;
  const g = Math.pow(PARAMS.discountGamma, days);
  for (const k of Object.keys(state.topics)) discountArm(state.topics[k].interest, g);
  for (const k of Object.keys(state.formats)) discountArm(state.formats[k], g);
  for (const k of Object.keys(state.angles)) discountArm(state.angles[k], g);
  for (const k of Object.keys(state.sources)) discountArm(state.sources[k], g);
  for (const k of Object.keys(state.surprise)) discountArm(state.surprise[k], g);
}

// ── sampling for one planning decision ──────────────────────────────────────

export interface Sampler {
  /** θ_t with topic ← area ← domain shrinkage. */
  topic(id: TopicId): number;
  format(f: string): number;
  angle(a: string): number;
  /** Mean over the card's angles (capped at `PARAMS.maxAngles`). */
  anglesOf(list: string[]): number;
  surprise(domain: string): number;
  source(id: string): number;
  /** Start a new decision: forget the cached draws. */
  reset(): void;
}

const NEUTRAL: BanditArm = { a: 1, b: 1, n: 0, last: 0 };

/** No prior, no evidence: the arm carries nothing of its own. */
function virgin(arm: BanditArm): boolean {
  return arm.n === 0 && arm.a === 1 && arm.b === 1;
}

export function createSampler(state: EngineState, graph: TaxonomyGraph, random: () => number): Sampler {
  const kappa = PARAMS.shrinkKappa;
  let topics: Record<string, number> = {};
  let formats: Record<string, number> = {};
  let angles: Record<string, number> = {};
  let surprises: Record<string, number> = {};
  let sources: Record<string, number> = {};

  const arm = (id: TopicId): BanditArm => {
    const ts = state.topics[id];
    return ts ? ts.interest : NEUTRAL;
  };

  /**
   * θ_t with topic ← area ← domain shrinkage (§6).
   *
   * A *topic* arm with neither a prior nor any evidence does not get a draw of
   * its own: it is its area's posterior ("unseeded arms … inherit through
   * shrinkage"). Drawing 132 independent copies of one posterior and then
   * taking an argmax over them is not Thompson sampling — it hands the feed to
   * whichever domain happens to have the most topics. Areas and domains always
   * draw for themselves, so the competition stays between ~90 real positions
   * and no field is ever locked out. Fit, format, angle taste and the
   * exploration bonus are what separate unexplored siblings.
   */
  const topicTheta = (id: TopicId): number => {
    const hit = topics[id];
    if (hit !== undefined) return hit;
    const domainId = graph.domain(id);
    const areaId = graph.area(id);
    let v: number;
    if (id === domainId) {
      v = sampleFlat(random, arm(domainId));
    } else if (id === areaId || !areaId) {
      v = sampleArm(random, arm(id), armMean(arm(domainId)), kappa);
    } else if (virgin(arm(id))) {
      v = topicTheta(areaId);
    } else {
      const domainMu = armMean(arm(domainId));
      const areaMu = shrunkMean(arm(areaId), domainMu, kappa);
      v = sampleArm(random, arm(id), areaMu, kappa);
    }
    topics[id] = v;
    return v;
  };

  return {
    topic: topicTheta,
    format: (f) => {
      const hit = formats[f];
      if (hit !== undefined) return hit;
      const v = sampleFlat(random, state.formats[f] || NEUTRAL);
      formats[f] = v;
      return v;
    },
    angle: (a) => {
      const hit = angles[a];
      if (hit !== undefined) return hit;
      const v = sampleFlat(random, state.angles[a] || NEUTRAL);
      angles[a] = v;
      return v;
    },
    anglesOf(list) {
      if (!list || list.length === 0) return 0.5;
      const n = Math.min(list.length, PARAMS.maxAngles);
      let sum = 0;
      for (let i = 0; i < n; i++) sum += this.angle(list[i]);
      return sum / n;
    },
    surprise: (d) => {
      const hit = surprises[d];
      if (hit !== undefined) return hit;
      const v = sampleFlat(random, state.surprise[d] || NEUTRAL);
      surprises[d] = v;
      return v;
    },
    source: (s) => {
      const hit = sources[s];
      if (hit !== undefined) return hit;
      const v = sampleFlat(random, state.sources[s] || NEUTRAL);
      sources[s] = v;
      return v;
    },
    reset() {
      topics = {};
      formats = {};
      angles = {};
      surprises = {};
      sources = {};
    },
  };
}
