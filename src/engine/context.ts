/**
 * The read-only world the engine folds and plans against: content, taxonomy,
 * priors, the wire inbox, and the two injected effects (`now`, `random`).
 * Everything derived from the inputs (graphs, indexes) is built once here.
 *
 * Also the home of the calendar helpers, because "local day" shows up in the
 * discounting rule (§3), the streak (§14) and the rolling metrics (§17).
 */

import type { Angle, ContentIndex, EngineDeps, Format, Priors, Taxonomy, WireItem } from '../types.ts';
import { buildCardIndex, type CardIndex } from './cards.ts';
import { buildGraph, type TaxonomyGraph } from './taxonomy.ts';

export const FORMATS: Format[] = ['idea', 'series', 'fact', 'quote', 'story', 'news', 'callback', 'challenge', 'recall'];

export const ANGLES: Angle[] = [
  'paradox', 'history', 'feud', 'mistake', 'connection', 'tool', 'open-problem',
  'weird', 'beautiful', 'practical', 'human', 'numbers', 'origin', 'prediction',
];

export interface EngineContext {
  index: ContentIndex;
  taxonomy: Taxonomy;
  priors: Priors;
  wire: WireItem[];
  now: () => number;
  random: () => number;
  graph: TaxonomyGraph;
  cards: CardIndex;
}

export function createContext(deps: EngineDeps): EngineContext {
  const graph = buildGraph(deps.taxonomy);
  return {
    index: deps.index,
    taxonomy: deps.taxonomy,
    priors: deps.priors,
    wire: deps.wire || [],
    now: deps.now || (() => Date.now()),
    random: deps.random || Math.random,
    graph,
    cards: buildCardIndex(deps.index, graph),
  };
}

// ── calendar ────────────────────────────────────────────────────────────────

export const DAY_MS = 86400000;
export const HOUR_MS = 3600000;

function pad2(n: number): string {
  return n < 10 ? '0' + n : String(n);
}

/** Local-calendar day key, `YYYY-MM-DD`. */
export function dayKey(t: number): string {
  const d = new Date(t);
  return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
}

/** Epoch ms at local midnight of `t`'s day. */
export function startOfDay(t: number): number {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Whole local days between two instants (b − a), by midnight boundaries. */
export function dayDiff(a: number, b: number): number {
  return Math.round((startOfDay(b) - startOfDay(a)) / DAY_MS);
}

/** Days between two `YYYY-MM-DD` keys. */
export function dayKeyDiff(a: string, b: string): number {
  if (!a || !b) return 0;
  return Math.round((Date.parse(b + 'T00:00:00') - Date.parse(a + 'T00:00:00')) / DAY_MS);
}

/** "Sep 21" — used by the `why` strings (§16). */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function shortDate(t: number): string {
  const d = new Date(t);
  return MONTHS[d.getMonth()] + ' ' + d.getDate();
}
export function monthName(t: number): string {
  return MONTHS[new Date(t).getMonth()];
}

/** ISO `YYYY-MM-DD` (as card dates are written) to epoch ms, or NaN. */
export function parseDate(s: string | undefined): number {
  if (!s) return NaN;
  const t = Date.parse(s.length <= 10 ? s + 'T00:00:00' : s);
  return t;
}
