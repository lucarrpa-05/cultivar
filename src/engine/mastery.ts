/**
 * Mastery (ENGINE.md §4).
 *
 * Points saturate: `mastery = 1 − exp(−points / S)` with `S = 8 + 2·min(cards, 12)`,
 * so a topic with many cards takes longer to fill. Priors enter as starting points,
 * which makes "no events" and "prior says you know this" the same code path.
 *
 * Retention (FSRS retrievability now) blends in at 30% once a topic has recall
 * items, so mastery decays between sessions without any scheduled job.
 */

import type { EngineState, FsrsCard, TopicId } from '../types.ts';
import type { EngineContext } from './context.ts';
import { dayDiff } from './context.ts';
import { PARAMS } from './params.ts';
import { hasMemory, retrievability } from './fsrs.ts';
import { priorFor } from './taxonomy.ts';

/** Cards attributed to a node — direct for a topic, everything under it otherwise. */
export function cardCount(ctx: EngineContext, id: TopicId): number {
  return ctx.graph.kind(id) === 'topic' ? ctx.cards.byTopic(id).length : ctx.cards.under(id).length;
}

/** `S_t` — how many points a topic needs before it saturates. */
export function saturation(ctx: EngineContext, id: TopicId): number {
  return PARAMS.masterySBase + PARAMS.masterySPerCard * Math.min(cardCount(ctx, id), PARAMS.masterySCardCap);
}

export function priorMastery(ctx: EngineContext, id: TopicId): number {
  const m = priorFor(ctx.priors.mastery, id, ctx.graph, 0);
  return m > 0.98 ? 0.98 : m < 0 ? 0 : m;
}

/** `points_0 = −S·ln(1 − m_prior)`. */
export function priorPoints(ctx: EngineContext, id: TopicId): number {
  const m = priorMastery(ctx, id);
  if (m <= 0) return 0;
  return -saturation(ctx, id) * Math.log(1 - m);
}

export function masteryFromPoints(points: number, s: number): number {
  if (s <= 0) return 0;
  const m = 1 - Math.exp(-Math.max(points, 0) / s);
  return m < 0 ? 0 : m > 1 ? 1 : m;
}

/**
 * A memoised read of mastery across the whole taxonomy at one instant. Build one
 * per plan / per `map()` call — never one per candidate.
 */
export interface MasteryView {
  now: number;
  /** Full mastery: saturating points, idle decay, retention blend. */
  of(id: TopicId): number;
  /** Mean retrievability of the node's FSRS items at `now`, or −1 when it has none. */
  retention(id: TopicId): number;
  fsrsCount(id: TopicId): number;
  unlocked(id: TopicId): boolean;
  level(id: TopicId): 0 | 1 | 2 | 3 | 4;
}

export function createMasteryView(state: EngineState, ctx: EngineContext, now: number): MasteryView {
  const memo: Record<string, number> = {};
  const unlockMemo: Record<string, boolean> = {};
  let fsrsByTopic: Record<string, FsrsCard[]> | null = null;

  const fsrsIndex = (): Record<string, FsrsCard[]> => {
    if (fsrsByTopic) return fsrsByTopic;
    const map: Record<string, FsrsCard[]> = {};
    for (const cardId of Object.keys(state.fsrs)) {
      const meta = ctx.cards.byId(cardId);
      if (!meta) continue;
      const fc = state.fsrs[cardId];
      // Only *graded* items carry a memory state; freshly scheduled ones would
      // otherwise read as 100% and mask real forgetting.
      if (!hasMemory(fc)) continue;
      for (const anc of ctx.graph.ancestors(meta.topic)) {
        (map[anc] || (map[anc] = [])).push(fc);
      }
    }
    fsrsByTopic = map;
    return map;
  };

  const retentionOf = (id: TopicId): number => {
    const items = fsrsIndex()[id];
    if (!items || items.length === 0) return -1;
    let sum = 0;
    for (const it of items) sum += retrievability(it, now);
    return sum / items.length;
  };

  const topicMastery = (id: TopicId): number => {
    const ts = state.topics[id];
    const s = saturation(ctx, id);
    const floor = priorPoints(ctx, id);
    let points = ts ? ts.points : floor;
    const last = ts && ts.lastEvent ? ts.lastEvent : 0;
    if (last > 0) {
      const idle = dayDiff(last, now);
      if (idle > PARAMS.masteryDecayAfterDays) {
        const decayed = points * Math.pow(PARAMS.masteryDecayPerDay, idle - PARAMS.masteryDecayAfterDays);
        points = Math.max(floor, decayed);
      }
    }
    let m = masteryFromPoints(points, s);
    const ret = retentionOf(id);
    if (ret >= 0) m = (1 - PARAMS.masteryRetentionBlend) * m + PARAMS.masteryRetentionBlend * ret;
    return m;
  };

  const aggregate = (id: TopicId): number => {
    const topics = ctx.graph.topicsUnder(id);
    if (topics.length === 0) return topicMastery(id);
    let num = 0;
    let den = 0;
    for (const t of topics) {
      const w = ctx.cards.byTopic(t).length;
      if (w <= 0) continue;
      num += w * of(t);
      den += w;
    }
    if (den > 0) return num / den;
    let sum = 0;
    for (const t of topics) sum += of(t);
    return sum / topics.length;
  };

  function of(id: TopicId): number {
    const hit = memo[id];
    if (hit !== undefined) return hit;
    memo[id] = 0; // cycle guard
    const kind = ctx.graph.kind(id);
    const v = kind === 'topic' || kind === 'unknown' ? topicMastery(id) : aggregate(id);
    memo[id] = v;
    return v;
  }

  return {
    now,
    of,
    retention: retentionOf,
    fsrsCount: (id) => (fsrsIndex()[id] || []).length,
    unlocked(id) {
      const hit = unlockMemo[id];
      if (hit !== undefined) return hit;
      unlockMemo[id] = true;
      let ok = true;
      for (const p of ctx.graph.prereqs(id)) {
        if (of(p) < PARAMS.prereqUnlock) {
          ok = false;
          break;
        }
      }
      unlockMemo[id] = ok;
      return ok;
    },
    level(id) {
      const m = of(id);
      const ts = state.topics[id];
      const touched = !!ts && (ts.seen > 0 || (ts.lastEvent || 0) > 0);
      if (!touched && m < PARAMS.levelTouched) return 0;
      if (m < PARAMS.levelLearning) return 1;
      if (m < PARAMS.levelSolid) return 2;
      if (m < PARAMS.levelMastered) return 3;
      const items = this.fsrsCount(id);
      if (items >= PARAMS.levelMasteredMinItems) {
        const r = retentionOf(id);
        if (r >= 0 && r < PARAMS.levelMasteredRetention) return 3;
      }
      return 4;
    },
  };
}
