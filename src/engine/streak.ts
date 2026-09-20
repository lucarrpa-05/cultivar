/**
 * Streak and goal (ENGINE.md §14).
 *
 * The rules are deliberately forgiving: banked freezes absorb a missed day in
 * silence, and a short day (≥ 3 min) holds the streak without extending it. The
 * copy is never guilt-based — "New streak starts today. Your best is 23."
 */

import type { EngineState } from '../types.ts';
import { dayKey, dayKeyDiff } from './context.ts';
import { PARAMS } from './params.ts';
import { today, window } from './metrics.ts';

function goalOf(state: EngineState): number {
  return state.settings.goalMinutes || state.streak.goalMinutes || PARAMS.goalMinutes;
}

function minutesOn(state: EngineState, day: string): number {
  for (const r of state.days || []) if (r.d === day) return r.minutes;
  return 0;
}

function lightDaysIn(state: EngineState, now: number): number {
  const goal = goalOf(state);
  let n = 0;
  for (const r of window(state, now, PARAMS.lightDayWindow)) {
    if (r.minutes >= PARAMS.lightDayMinutes && r.minutes < goal) n++;
  }
  return n;
}

function addDays(day: string, n: number): string {
  const t = Date.parse(day + 'T00:00:00') + n * 86400000;
  return dayKey(t);
}

/**
 * Close out every local day between the last one we saw and today. Called on
 * the first event of a new day, so an app that stays closed for a week settles
 * up the moment it reopens.
 */
export function rollDays(state: EngineState, now: number): void {
  const streak = state.streak;
  const todayKey = dayKey(now);
  if (streak.todayDay === todayKey) return;
  if (!streak.todayDay) {
    streak.todayDay = todayKey;
    streak.todayMinutes = 0;
    return;
  }
  const goal = goalOf(state);
  let cursor = streak.todayDay;
  let lightUsed = lightDaysIn(state, now);
  let guard = 0;
  while (dayKeyDiff(cursor, todayKey) > 0 && guard++ < 400) {
    const minutes = minutesOn(state, cursor);
    const qualified = minutes >= goal;
    if (!qualified) {
      if (minutes >= PARAMS.lightDayMinutes && lightUsed <= PARAMS.lightDaysPer) {
        // A light day: holds the streak, does not extend it.
      } else if (cursor !== streak.lastGoalDay) {
        if (streak.freezes > 0) {
          streak.freezes -= 1;
          streak.freezeUsedOn = cursor;
        } else if (streak.current > 0) {
          streak.current = 0;
        }
      }
      if (minutes >= PARAMS.lightDayMinutes && minutes < goal) lightUsed++;
    }
    cursor = addDays(cursor, 1);
  }
  streak.todayDay = todayKey;
  streak.todayMinutes = 0;
}

/** Record active reading minutes and extend the streak when the goal is crossed. */
export function addMinutes(state: EngineState, now: number, minutes: number): void {
  if (minutes <= 0) return;
  rollDays(state, now);
  const row = today(state, now);
  row.minutes += minutes;
  state.streak.todayMinutes = row.minutes;
  state.metrics.totalMinutes += minutes;
  checkGoal(state, now);
}

/** Has today crossed the goal? If so, count the day exactly once. */
export function checkGoal(state: EngineState, now: number): boolean {
  const streak = state.streak;
  const goal = goalOf(state);
  const todayKey = dayKey(now);
  if (streak.todayMinutes < goal) return false;
  if (streak.lastGoalDay === todayKey) return true;
  streak.current += 1;
  streak.lastGoalDay = todayKey;
  if (streak.current > streak.best) streak.best = streak.current;
  if (streak.current > 0 && streak.current % PARAMS.freezePerDays === 0) {
    streak.freezes = Math.min(PARAMS.freezeMax, streak.freezes + 1);
  }
  return true;
}

/** Copy for a broken streak — never guilt-based (§14). */
export function streakCopy(state: EngineState): string {
  const s = state.streak;
  if (s.current > 0) return 'Day ' + s.current + '. Best: ' + s.best + '.';
  if (s.best > 0) return 'New streak starts today. Your best is ' + s.best + '.';
  return 'New streak starts today.';
}
