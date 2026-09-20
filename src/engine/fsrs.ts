/**
 * Spaced repetition (ENGINE.md §10.2), wrapping `ts-fsrs` (FSRS-5).
 *
 * The library speaks `Date`s and enums; `EngineState` speaks numbers, so every
 * value crosses this boundary and nothing else in the engine imports `ts-fsrs`.
 *
 * Two deliberate settings:
 *  - `enable_fuzz: false` — fuzz would make plans non-deterministic.
 *  - `enable_short_term: false` — this is a once-a-day reading app, not a cram
 *    session; ten-minute relearning steps would turn the feed into a drill.
 */

import { forgetting_curve, fsrs, generatorParameters, Rating, State, type Card as LibCard, type Grade } from 'ts-fsrs';
import type { FsrsCard } from '../types.ts';
import { HOUR_MS } from './context.ts';
import { PARAMS } from './params.ts';

const scheduler = fsrs(
  generatorParameters({
    request_retention: PARAMS.fsrsRetention,
    maximum_interval: PARAMS.fsrsMaxInterval,
    enable_fuzz: false,
    enable_short_term: false,
  }),
);

const DAY = 86400000;

/** grade 1..4 (again/hard/good/easy) → an FSRS rating. */
export function toRating(grade: number): Grade {
  if (grade <= 1) return Rating.Again;
  if (grade === 2) return Rating.Hard;
  if (grade === 3) return Rating.Good;
  return Rating.Easy;
}

/** A card that just earned its place in the schedule: first due = now + 20 h. */
export function enterFsrs(now: number): FsrsCard {
  return {
    due: now + PARAMS.fsrsFirstDueH * HOUR_MS,
    stability: 0,
    difficulty: 0,
    reps: 0,
    lapses: 0,
    state: 0,
    lastReview: 0,
  };
}

function toLib(fc: FsrsCard, now: number): LibCard {
  const last = fc.lastReview || 0;
  return {
    due: new Date(fc.due),
    stability: fc.stability,
    difficulty: fc.difficulty,
    elapsed_days: last ? Math.max(0, Math.floor((now - last) / DAY)) : 0,
    scheduled_days: last ? Math.max(0, Math.round((fc.due - last) / DAY)) : 0,
    reps: fc.reps,
    lapses: fc.lapses,
    state: fc.state as State,
    last_review: last ? new Date(last) : undefined,
  };
}

function fromLib(card: LibCard): FsrsCard {
  return {
    due: card.due.getTime(),
    stability: card.stability,
    difficulty: card.difficulty,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state as 0 | 1 | 2 | 3,
    lastReview: card.last_review ? card.last_review.getTime() : 0,
  };
}

/** Apply a grade; returns the rescheduled card (the input is not mutated). */
export function gradeFsrs(fc: FsrsCard, grade: number, now: number): FsrsCard {
  const res = scheduler.next(toLib(fc, now), new Date(now), toRating(grade));
  return fromLib(res.card);
}

/** True once the item has a memory state (it has been graded at least once). */
export function hasMemory(fc: FsrsCard): boolean {
  return fc.stability > 0 && fc.reps > 0;
}

/**
 * Retrievability at `now` via the FSRS forgetting curve. Items with no memory
 * state yet return 1 (just read, nothing forgotten); callers that only want
 * *measured* retention filter with `hasMemory` first.
 */
export function retrievability(fc: FsrsCard, now: number): number {
  if (!hasMemory(fc)) return 1;
  const elapsed = Math.max(0, (now - (fc.lastReview || fc.due)) / DAY);
  const r = forgetting_curve(elapsed, fc.stability);
  return r < 0 ? 0 : r > 1 ? 1 : r;
}

/** Days overdue at `now` (negative when it is not due yet). */
export function overdueDays(fc: FsrsCard, now: number): number {
  return (now - fc.due) / DAY;
}
