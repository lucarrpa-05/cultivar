/**
 * Shared wiring for the engine tests: the real taxonomy, the real priors, the
 * synthetic index, a seeded RNG and a clock the simulator advances.
 */

import priorsJson from '../../../content/priors.json';
import { createContext, createEngine, mulberry32, type EngineContext } from '../../../src/engine/index.ts';
import { PARAMS } from '../../../src/engine/params.ts';
import { createClock, type Clock } from '../../../src/engine/simulate.ts';
import type { ContentIndex, Engine, EngineDeps, Priors, WireItem } from '../../../src/types.ts';
import { BUILD_AT, buildSynthIndex, taxonomy } from './synthIndex.ts';

export const priors = priorsJson as unknown as Priors;
export { taxonomy, BUILD_AT };

/** One index built once and shared — building it is the slow part. */
let cachedIndex: ContentIndex | null = null;
export function sharedIndex(): ContentIndex {
  if (!cachedIndex) cachedIndex = buildSynthIndex();
  return cachedIndex;
}

export interface Harness {
  engine: Engine;
  ctx: EngineContext;
  clock: Clock;
  deps: EngineDeps;
  index: ContentIndex;
  /** Advance the clock by whole days. */
  advanceDays(n: number): void;
  advanceMinutes(n: number): void;
}

export interface HarnessOptions {
  seed?: number;
  start?: number;
  index?: ContentIndex;
  wire?: WireItem[];
}

export function makeHarness(options?: HarnessOptions): Harness {
  const opts = options || {};
  const index = opts.index || sharedIndex();
  const clock = createClock(opts.start === undefined ? BUILD_AT + 9 * 3600000 : opts.start);
  const random = mulberry32(opts.seed === undefined ? 99 : opts.seed);
  const deps: EngineDeps = {
    index,
    taxonomy,
    priors,
    now: () => clock.t,
    random,
  };
  if (opts.wire) deps.wire = opts.wire;
  const ctx = createContext(deps);
  const engine = createEngine(deps);
  return {
    engine,
    ctx,
    clock,
    deps,
    index,
    advanceDays: (n) => {
      clock.t += n * 86400000;
    },
    advanceMinutes: (n) => {
      clock.t += n * 60000;
    },
  };
}

/** A session boundary: end the current session, wait past the gap, start a new one. */
export function newSession(h: Harness, seq: number, minutes = 12, cards = 10): void {
  h.engine.apply({ id: 'se' + seq, t: h.clock.t, type: 'session_end', s: 's' + seq, data: { minutes, cards } });
  h.clock.t += (PARAMS.sessionGapMin + 5) * 60000;
  h.engine.apply({ id: 'ss' + (seq + 1), t: h.clock.t, type: 'session_start', s: 's' + (seq + 1) });
}

let eventSeq = 0;
export function ev(
  type: Parameters<Engine['apply']>[0]['type'],
  t: number,
  s: string,
  card?: string,
  data?: Record<string, unknown>,
): Parameters<Engine['apply']>[0] {
  const out: Parameters<Engine['apply']>[0] = { id: 'x' + (++eventSeq).toString(36), t, type, s };
  if (card) out.card = card;
  if (data) out.data = data;
  return out;
}
