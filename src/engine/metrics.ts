/**
 * Fun metrics (ENGINE.md §17). The engine keeps counters and a per-day ledger;
 * the refresh script is the one that turns them into diagnoses.
 *
 * The 14-day rolling window is recomputed from `state.days`, which is the only
 * history the engine keeps — 90 days of one small row each.
 */

import type { DayStat, EngineState } from '../types.ts';
import { dayKey, dayKeyDiff } from './context.ts';
import { PARAMS } from './params.ts';

export function emptyDay(d: string): DayStat {
  return { d, minutes: 0, cards: 0, likes: 0, skips: 0, views: 0, recallAnswered: 0, recallCorrect: 0, recallSkipped: 0, sessions: [] };
}

/** Get (or create) today's row and trim the ledger. */
export function today(state: EngineState, now: number): DayStat {
  if (!state.days) state.days = [];
  const key = dayKey(now);
  const days = state.days;
  const last = days.length ? days[days.length - 1] : null;
  if (last && last.d === key) return last;
  const row = emptyDay(key);
  days.push(row);
  const overflow = days.length - PARAMS.historyDays;
  if (overflow > 0) days.splice(0, overflow);
  return row;
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = values.slice().sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** The last `days` rows of the ledger, newest last. */
export function window(state: EngineState, now: number, days: number): DayStat[] {
  const key = dayKey(now);
  const out: DayStat[] = [];
  for (const row of state.days || []) {
    const age = dayKeyDiff(row.d, key);
    if (age >= 0 && age < days) out.push(row);
  }
  return out;
}

/** Recompute `metrics.rolling` (§17). */
export function updateRolling(state: EngineState, now: number): void {
  const rows = window(state, now, PARAMS.rollingDays);
  let views = 0;
  let likes = 0;
  let skips = 0;
  let active = 0;
  const sessions: number[] = [];
  for (const r of rows) {
    views += r.views;
    likes += r.likes;
    skips += r.skips;
    if (r.minutes > 0 || r.cards > 0) active++;
    for (const m of r.sessions) sessions.push(m);
  }
  const first = state.metrics.firstDay;
  const elapsed = first ? Math.min(PARAMS.rollingDays, dayKeyDiff(first, dayKey(now)) + 1) : 1;
  state.metrics.rolling = {
    likeRate: views > 0 ? likes / views : 0,
    skipRate: views > 0 ? skips / views : 0,
    medianSession: median(sessions),
    returnRate: elapsed > 0 ? active / elapsed : 0,
  };
}

/** Recall participation and accuracy over the last `PARAMS.recallWindowDays` (§10.1). */
export function recallStats(state: EngineState, now: number): { answered: number; correct: number; skipped: number } {
  const rows = window(state, now, PARAMS.recallWindowDays);
  let answered = 0;
  let correct = 0;
  let skipped = 0;
  for (const r of rows) {
    answered += r.recallAnswered;
    correct += r.recallCorrect;
    skipped += r.recallSkipped;
  }
  return { answered, correct, skipped };
}

/** Adapt the recall interval K at each `session_start` (§10.1). */
export function adaptRecallInterval(state: EngineState, now: number): number {
  let k = state.recallK || PARAMS.recallIntervalStart;
  const { answered, correct, skipped } = recallStats(state, now);
  const attempts = answered + skipped;
  if (attempts >= 3) {
    const participation = answered / attempts;
    if (participation < PARAMS.recallParticipationLow) {
      k = Math.min(PARAMS.recallIntervalMax, k + PARAMS.recallKStepUp);
    } else if (participation >= PARAMS.recallParticipationHigh && answered > 0) {
      const rate = correct / answered;
      if (rate >= PARAMS.recallCorrectLow && rate <= PARAMS.recallCorrectHigh) {
        k = Math.max(PARAMS.recallIntervalMin, k - PARAMS.recallKStepDown);
      }
    }
  }
  state.recallK = k;
  return k;
}

/** K after the reader's `quizFrequency` preference (§10.1). 0 means "no recall slots". */
export function effectiveRecallInterval(state: EngineState): number {
  const base = state.recallK || PARAMS.recallIntervalStart;
  const mul = PARAMS.quizFrequency[state.settings.quizFrequency];
  if (mul === 0) return 0;
  return Math.max(1, Math.round(base * (mul === undefined ? 1 : mul)));
}
