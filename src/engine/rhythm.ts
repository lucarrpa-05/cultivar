/**
 * Rhythm, novelty and quotas (ENGINE.md §12).
 *
 * A feed of uniformly excellent heavy cards is exhausting. These rules are the
 * engine's sense of pacing: an energy budget over the last three cards, novelty
 * penalties that stop two topology cards touching, a language quota, and a cap
 * on how much of the feed can be the news wire.
 *
 * The `Trail` is the planner's short-term memory. It is seeded from
 * `state.recent` and then advanced *inside* a plan, so `next(20)` composes a
 * sequence with rhythm rather than twenty independent argmaxes.
 */

import type { CardMeta, EngineState, SlotKind } from '../types.ts';
import type { EngineContext } from './context.ts';
import { PARAMS } from './params.ts';

export interface TrailEntry {
  id: string;
  topic: string;
  area: string;
  domain: string;
  format: string;
  weight: string;
  language: string;
  tags: string[];
  cost: number;
  slot: SlotKind | '';
}

export interface Trail {
  entries: TrailEntry[];
}

const WIRE_SLOTS: SlotKind[] = ['news', 'wire'];

export function createTrail(state: EngineState, ctx: EngineContext): Trail {
  const entries: TrailEntry[] = [];
  for (const id of state.recent) {
    const c = ctx.cards.byId(id);
    if (!c) {
      entries.push({ id, topic: '', area: '', domain: '', format: 'news', weight: 'light', language: 'en', tags: [], cost: 1, slot: 'wire' });
      continue;
    }
    entries.push(entryOf(c, ctx, ''));
  }
  return { entries };
}

export function entryOf(card: CardMeta, ctx: EngineContext, slot: SlotKind | ''): TrailEntry {
  return {
    id: card.id,
    topic: card.topic,
    area: ctx.cards.area(card.id),
    domain: card.domain,
    format: card.format,
    weight: card.weight,
    language: card.language,
    tags: card.tags || [],
    cost: slot === 'recall' ? PARAMS.recallEnergyCost : ctx.cards.cost(card.id),
    slot,
  };
}

export function pushTrail(trail: Trail, entry: TrailEntry): void {
  trail.entries.push(entry);
  const overflow = trail.entries.length - PARAMS.recentWindow;
  if (overflow > 0) trail.entries.splice(0, overflow);
}

/** Index of the first entry of the last `n` — used instead of slicing, which
 *  would allocate tens of thousands of arrays per plan. */
function from(trail: Trail, n: number): number {
  const len = trail.entries.length;
  return len > n ? len - n : 0;
}

export function lastEntry(trail: Trail): TrailEntry | null {
  return trail.entries.length ? trail.entries[trail.entries.length - 1] : null;
}

export function energyBudget(mode: 'daily' | 'binge', inZone: boolean): number {
  if (inZone) return PARAMS.energyBudgetZone;
  return mode === 'binge' ? PARAMS.energyBudgetBinge : PARAMS.energyBudgetDaily;
}

/**
 * `sum(cost of last 3) + cost(c) ≤ budget`, plus "no two heavy in a row outside
 * the zone". Returns 1 when the candidate fits the rhythm and 0 when it does not.
 */
export function rhythm(trail: Trail, card: CardMeta, ctx: EngineContext, slot: SlotKind, budget: number, inZone: boolean): number {
  const cost = slot === 'recall' ? PARAMS.recallEnergyCost : ctx.cards.cost(card.id);
  let sum = cost;
  const entries = trail.entries;
  for (let i = from(trail, PARAMS.energyWindow); i < entries.length; i++) sum += entries[i].cost;
  if (sum > budget) return 0;
  if (!inZone && card.weight === 'heavy' && slot !== 'recall') {
    const last = lastEntry(trail);
    if (last && last.weight === 'heavy' && last.slot !== 'recall') return 0;
  }
  return 1;
}

/** After a heavy card, light candidates get a nudge (§12). */
export function afterHeavyBoost(trail: Trail, card: CardMeta): number {
  const last = lastEntry(trail);
  if (last && last.weight === 'heavy' && card.weight === 'light') return PARAMS.afterHeavyLightBoost;
  return 1;
}

/**
 * Variety multipliers (§12). Series and backfill are exempt from the topic rule.
 *
 * `zoneArea` is the one interpretation call here: §12 wants variety, §11 wants
 * the feed to lean into an obsession, and at the *area* level those two rules
 * contradict each other — the same-area penalty would cancel the zone boost
 * exactly. Inside the zone the area rule is suspended; the topic rule still
 * applies, so an obsession still moves around within its area.
 */
export function novelty(trail: Trail, card: CardMeta, ctx: EngineContext, slot: SlotKind, zoneArea?: string): number {
  let v = 1;
  const entries = trail.entries;
  const len = entries.length;
  if (len === 0) return 1;
  const area = ctx.cards.area(card.id);

  if (slot !== 'series' && slot !== 'backfill') {
    for (let i = from(trail, PARAMS.noveltySameTopicWindow); i < len; i++) {
      if (entries[i].topic === card.topic) {
        v *= PARAMS.noveltySameTopic;
        break;
      }
    }
  }
  if (!zoneArea || area !== zoneArea) {
    for (let i = from(trail, PARAMS.noveltySameAreaWindow); i < len; i++) {
      if (entries[i].area && entries[i].area === area) {
        v *= PARAMS.noveltySameArea;
        break;
      }
    }
  }
  const tags = card.tags;
  if (tags && tags.length) {
    for (let i = from(trail, PARAMS.noveltyTagWindow); i < len; i++) {
      const theirs = entries[i].tags;
      let overlap = 0;
      for (let k = 0; k < tags.length; k++) if (theirs.indexOf(tags[k]) >= 0) overlap++;
      if (overlap >= PARAMS.noveltyTagMin) {
        v *= PARAMS.noveltyTagOverlap;
        break;
      }
    }
  }
  if (card.format !== 'idea') {
    const start = from(trail, PARAMS.noveltySameFormatWindow);
    if (len - start === PARAMS.noveltySameFormatWindow) {
      let same = 0;
      for (let i = start; i < len; i++) if (entries[i].format === card.format) same++;
      if (same === PARAMS.noveltySameFormatWindow) v *= PARAMS.noveltySameFormat;
    }
  }
  return v;
}

/** `languageQuota(c)` — pull Spanish toward `settings.spanishShare` (§12). */
export function languageQuota(trail: Trail, card: CardMeta, target: number): number {
  if (card.language !== 'es') return 1;
  const entries = trail.entries;
  const start = from(trail, PARAMS.languageWindow);
  const n = entries.length - start;
  if (n < 5) return 1;
  let es = 0;
  for (let i = start; i < entries.length; i++) if (entries[i].language === 'es') es++;
  const share = es / n;
  if (share < target - PARAMS.languageLowGap) return PARAMS.languageLowBoost;
  if (share > target + PARAMS.languageHighGap) return PARAMS.languageHighPenalty;
  return 1;
}

/** At most one wire/news per 5 cards, never two in a row (§12). */
export function wireAllowed(trail: Trail): boolean {
  const entries = trail.entries;
  for (let i = from(trail, PARAMS.wireCapPer); i < entries.length; i++) {
    const e = entries[i];
    if (WIRE_SLOTS.indexOf(e.slot as SlotKind) >= 0 || e.format === 'news') return false;
  }
  return true;
}

/** Ids already in the trail — the §12 `recent` exclusion. */
export function trailIds(trail: Trail): Record<string, true> {
  const out: Record<string, true> = {};
  for (const e of trail.entries) out[e.id] = true;
  return out;
}
