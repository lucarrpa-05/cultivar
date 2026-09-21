/**
 * Obsession detection and widening (ENGINE.md §11).
 *
 * The reader falls into intense temporary obsessions. The engine notices when
 * one area takes over the last 25 valence-bearing events and leans in — but
 * only so far: out-of-area cards keep a 0.85 multiplier rather than zero, so a
 * zone bends the feed without collapsing it. When the obsession dies, the
 * engine deliberately widens instead of drifting.
 */

import type { EngineState, TopicId } from '../types.ts';
import type { EngineContext } from './context.ts';
import { HOUR_MS } from './context.ts';
import { PARAMS } from './params.ts';

/** Push one valence-bearing event into the rolling window. */
export function recordValence(state: EngineState, area: TopicId, r: number, t: number): void {
  state.valenceCount = (state.valenceCount || 0) + 1;
  if (!state.valence) state.valence = [];
  state.valence.push({ t, area, r });
  const overflow = state.valence.length - PARAMS.zoneWindow;
  if (overflow > 0) state.valence.splice(0, overflow);
}

function lastInArea(state: EngineState, area: TopicId): number {
  let last = 0;
  for (const m of state.valence || []) if (m.area === area && m.t > last) last = m.t;
  return last;
}

/** End the zone and open a widening window of `PARAMS.widenSessions` sessions. */
export function endZone(state: EngineState): void {
  if (!state.zone) return;
  state.widenFrom = state.zone.area;
  state.widen = PARAMS.widenSessions;
  delete state.zone;
}

/**
 * Re-evaluate the zone after one valence event. Called from the fold, so the
 * zone is part of the deterministic state, not a planner-local guess.
 */
export function updateZone(state: EngineState, area: TopicId, r: number, t: number): void {
  if ((state.valenceCount || 0) < PARAMS.zoneMinValenceEvents) {
    delete state.zone; // old snapshots may have inferred a zone from day-one feedback
    return;
  }
  const zone = state.zone;
  if (zone) {
    if (area && area === zone.area) {
      if (r >= PARAMS.zonePositiveValence) {
        zone.boost = Math.min(PARAMS.zoneMaxBoost, zone.boost + PARAMS.zoneStep);
      } else {
        zone.boost *= PARAMS.zoneNegativeMultiplier;
      }
    }
    if (zone.boost < PARAMS.zoneEndBoost) {
      endZone(state);
      return;
    }
    const last = lastInArea(state, zone.area) || zone.since;
    if (t - last > PARAMS.zoneTimeoutH * HOUR_MS) endZone(state);
    return;
  }

  const marks = state.valence || [];
  if (marks.length < PARAMS.zoneMinWindow) return;
  const byArea: Record<string, { n: number; pos: number }> = {};
  for (const m of marks) {
    if (!m.area) continue;
    const slot = byArea[m.area] || (byArea[m.area] = { n: 0, pos: 0 });
    slot.n += 1;
    if (m.r >= PARAMS.zonePositiveValence) slot.pos += 1;
  }
  let topArea = '';
  let topN = 0;
  for (const a of Object.keys(byArea)) {
    if (byArea[a].n > topN) {
      topN = byArea[a].n;
      topArea = a;
    }
  }
  if (!topArea) return;
  const share = topN / marks.length;
  const positiveRate = byArea[topArea].pos / topN;
  if (share >= PARAMS.zoneShare && positiveRate >= PARAMS.zonePositiveRate) {
    state.zone = { area: topArea, since: t, boost: PARAMS.zoneStartBoost };
  }
}

/** Time-based expiry, checked at each `session_start`. */
export function expireZone(state: EngineState, now: number): void {
  if ((state.valenceCount || 0) < PARAMS.zoneMinValenceEvents) {
    delete state.zone;
    return;
  }
  const zone = state.zone;
  if (!zone) return;
  const last = lastInArea(state, zone.area) || zone.since;
  if (now - last > PARAMS.zoneTimeoutH * HOUR_MS) endZone(state);
}

/** `zoneBoost(c)` from §8, including the post-zone widening bonus for adjacent areas. */
export function zoneBoost(state: EngineState, ctx: EngineContext, cardArea: TopicId): number {
  let v = 1;
  const zone = (state.valenceCount || 0) >= PARAMS.zoneMinValenceEvents ? state.zone : undefined;
  if (zone) v = cardArea === zone.area ? 1 + zone.boost : PARAMS.zoneOutsideBoost;
  if ((state.widen || 0) > 0 && state.widenFrom && cardArea && cardArea !== state.widenFrom) {
    const near = ctx.graph.adjacentAreas(state.widenFrom);
    if (near.indexOf(cardArea) >= 0) v *= PARAMS.widenAdjacentBoost;
  }
  return v;
}

/** The serendipity budget ε for the current situation (§10.9, §11, §13). */
export function serendipityEpsilon(state: EngineState, sessionIndex: number): number {
  const s = state.session;
  if (s && s.ordinal <= PARAMS.coldStartSessions) return PARAMS.serendipityFirstSessions;
  if ((state.widen || 0) > 0) return PARAMS.serendipityWiden;
  if (s && s.mode === 'binge') {
    const ramp = Math.min(1, sessionIndex / PARAMS.serendipityBingeRampCards);
    return PARAMS.serendipityDaily + ramp * (PARAMS.serendipityBinge - PARAMS.serendipityDaily);
  }
  return PARAMS.serendipityDaily;
}
