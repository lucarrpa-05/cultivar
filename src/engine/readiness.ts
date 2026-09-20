/**
 * Readiness and hard gates (ENGINE.md §7).
 *
 * Readiness is soft: a locked topic is penalised, never excluded, so a
 * difficulty-1 "door" card can still show up in a field the reader has never
 * touched. The hard gates are the handful of things that would be *wrong* to
 * serve — rigor before its intuition, episode 3 before episode 2, a callback to
 * something the reader has never met, an expired news card.
 */

import type { CardId, CardMeta, EngineState, TopicId } from '../types.ts';
import type { Sampler } from './bandit.ts';
import type { EngineContext } from './context.ts';
import { DAY_MS, parseDate, startOfDay } from './context.ts';
import type { MasteryView } from './mastery.ts';
import { PARAMS } from './params.ts';
import { clamp } from './rng.ts';

export interface GateOptions {
  /** Cards that may be served again despite being in `seen` (revisit, re-read, series re-entry). */
  allowSeen?: Record<CardId, true>;
  /** Needed for the callback `θ_to ≥ 0.5` escape hatch. */
  sampler?: Sampler;
}

function g(m: number): number {
  return PARAMS.readyFloor + (1 - PARAMS.readyFloor) * clamp((m - PARAMS.readyOffset) / PARAMS.readySpan, 0, 1);
}

/** `ready(c) = ∏ g(mastery_p)`, with the low-prereq and locked penalties. */
export function readiness(card: CardMeta, ctx: EngineContext, mv: MasteryView): number {
  const prereqs = card.prerequisites && card.prerequisites.length
    ? card.prerequisites
    : ctx.graph.prereqs(card.topic);
  let v = 1;
  let weakest = 1;
  for (const p of prereqs) {
    const m = mv.of(p);
    if (m < weakest) weakest = m;
    v *= g(m);
  }
  if (card.difficulty >= PARAMS.readyLowDifficulty && weakest < PARAMS.readyLowMastery) v *= PARAMS.readyLowPenalty;
  // A card with no prerequisites of its own *is* the door §7 wants to keep
  // open, so the locked-topic penalty does not apply to it.
  if (prereqs.length && !mv.unlocked(card.topic)) v *= PARAMS.lockedPenalty;
  // §7: "Locked is a soft state … a readiness penalty, not exclusion." A bare
  // product over three unmet prerequisites reaches 0.04, which *is* exclusion,
  // so readiness never falls below the value one unmet prerequisite would give.
  return v < PARAMS.readyFloor ? PARAMS.readyFloor : v;
}

/** Did the reader engage with this card at valence ≥ 0.6? */
export function engaged(state: EngineState, id: CardId): boolean {
  const s = state.seen[id];
  if (!s) return false;
  if (s.liked || s.saved || s.rigorOpened) return true;
  return (s.best || 0) >= PARAMS.zonePositiveValence;
}

/** Series bookkeeping: which episode index may be served next, or 0 for none. */
export function seriesGate(card: CardMeta, state: EngineState, ctx: EngineContext, now: number): boolean {
  const ref = card.series;
  if (!ref) return true;
  if (ref.index <= 1) return true;
  const episodes = ctx.cards.series(ref.id);
  let prev: CardMeta | null = null;
  for (const e of episodes) if (e.series && e.series.index === ref.index - 1) prev = e;
  if (card.seriesPrev) {
    const byId = ctx.cards.byId(card.seriesPrev);
    if (byId) prev = byId;
  }
  if (!prev) return true;
  const seen = state.seen[prev.id];
  if (!seen) return false;
  if (seen.skipped || seen.tooHard) return false;
  return engaged(state, prev.id);
}

/**
 * The previous episode of a paused series becomes eligible again after 7 days,
 * as a `series` slot ("Picking up where you left off").
 */
export function seriesReentries(state: EngineState, ctx: EngineContext, now: number): CardId[] {
  const out: CardId[] = [];
  for (const sid of Object.keys(state.series)) {
    const prog = state.series[sid];
    if (!prog.paused || prog.finished) continue;
    if (now - prog.lastAt < PARAMS.seriesPauseDays * DAY_MS) continue;
    for (const ep of ctx.cards.series(sid)) {
      if (ep.series && ep.series.index === prog.lastIndex) out.push(ep.id);
    }
  }
  return out;
}

function callbackGate(card: CardMeta, state: EngineState, ctx: EngineContext, mv: MasteryView, opts: GateOptions): boolean {
  const cb = card.callback;
  if (!cb) return true;
  const fromState = state.topics[cb.from];
  const fromOk = mv.of(cb.from) >= PARAMS.callbackFromMastery
    || (fromState ? fromState.positives >= PARAMS.callbackFromPositives : false);
  if (!fromOk) return false;
  if (mv.unlocked(cb.to)) return true;
  const toArea = ctx.graph.area(cb.to);
  if (state.zone && state.zone.area === toArea) return true;
  if (state.focus && (state.focus === cb.to || state.focus === toArea)) return true;
  if (opts.sampler && opts.sampler.topic(cb.to) >= PARAMS.callbackToTheta) return true;
  return false;
}

/** Non-evergreen cards stop being served after `dates.expires`. */
export function expired(card: CardMeta, now: number): boolean {
  if (card.evergreen) return false;
  const exp = parseDate(card.dates && card.dates.expires);
  if (isNaN(exp)) return false;
  return exp < startOfDay(now);
}

/** The full §7 gate. */
export function eligible(
  card: CardMeta,
  state: EngineState,
  ctx: EngineContext,
  mv: MasteryView,
  now: number,
  opts: GateOptions,
): boolean {
  if (state.seen[card.id] && !(opts.allowSeen && opts.allowSeen[card.id])) return false;
  if (expired(card, now)) return false;
  if (card.layer === 'rigor') {
    if (!card.intuitionCard) return false;
    if (!engaged(state, card.intuitionCard)) return false;
  }
  if (!seriesGate(card, state, ctx, now)) return false;
  if (!callbackGate(card, state, ctx, mv, opts)) return false;
  return true;
}

/** Topics that are one prereq away from unlocking (§18 "unlocked next"). */
export function nextUnlock(id: TopicId, ctx: EngineContext, mv: MasteryView): TopicId | '' {
  const prereqs = ctx.graph.prereqs(id);
  if (!prereqs.length) return '';
  let weakest = '';
  let weakestM = 2;
  let blocked = 0;
  for (const p of prereqs) {
    const m = mv.of(p);
    if (m < PARAMS.prereqUnlock) {
      blocked++;
      if (m < weakestM) {
        weakestM = m;
        weakest = p;
      }
    }
  }
  return blocked === 1 ? weakest : '';
}
