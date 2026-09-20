/**
 * Milestones (ENGINE.md §15).
 *
 * The engine only *detects* them. Detected ids queue in
 * `state.pendingMilestones`; the planner turns the head of the queue into a
 * `milestone` slot; the UI animates it and records a `milestone` event, which
 * moves the id into `state.milestones`. That round trip is what makes the
 * milestone a fact in the event log rather than a re-derived guess.
 */

import type { EngineState, TopicId } from '../types.ts';
import { dayKey, dayKeyDiff } from './context.ts';
import { PARAMS } from './params.ts';

export function hasMilestone(state: EngineState, id: string): boolean {
  if (state.milestones.indexOf(id) >= 0) return true;
  return (state.pendingMilestones || []).indexOf(id) >= 0;
}

/** Queue a milestone if it has not been earned before. Returns true when new. */
export function earn(state: EngineState, id: string): boolean {
  if (hasMilestone(state, id)) return false;
  if (!state.pendingMilestones) state.pendingMilestones = [];
  state.pendingMilestones.push(id);
  return true;
}

/** Mark a queued milestone as shown (called by the `milestone` event). */
export function record(state: EngineState, id: string): void {
  const pending = state.pendingMilestones || [];
  const i = pending.indexOf(id);
  if (i >= 0) pending.splice(i, 1);
  if (state.milestones.indexOf(id) < 0) state.milestones.push(id);
}

const CARD_COUNTS = [
  { n: 10, id: 'first-10-cards' },
  { n: 100, id: 'cards-100' },
  { n: 500, id: 'cards-500' },
  { n: 1000, id: 'cards-1000' },
];
const STREAKS = [
  { n: 7, id: 'streak-7' },
  { n: 30, id: 'streak-30' },
  { n: 100, id: 'streak-100' },
];

/** Counter-driven milestones, cheap enough to run after every event. */
export function sweepCounters(state: EngineState, now: number, domainCount: number): void {
  for (const m of CARD_COUNTS) if (state.metrics.cardsSeen >= m.n) earn(state, m.id);
  for (const m of STREAKS) if (state.streak.current >= m.n) earn(state, m.id);
  if (state.metrics.likes >= 1) earn(state, 'first-like');
  if (state.metrics.tooHard >= 1) earn(state, 'first-too-hard');
  if (state.metrics.binges >= 1) earn(state, 'first-binge');
  if ((state.recallStreak || 0) >= 10) earn(state, 'recall-streak-10');

  let touched = 0;
  for (const id of state.milestones) if (id.indexOf('domain-touched:') === 0) touched++;
  for (const id of state.pendingMilestones || []) if (id.indexOf('domain-touched:') === 0) touched++;
  if (domainCount > 0 && touched >= domainCount) earn(state, 'all-domains');

  const first = state.metrics.firstDay;
  if (first) {
    const months = Math.floor(dayKeyDiff(first, dayKey(now)) / 30);
    if (months >= 1) earn(state, 'month-' + months);
  }
}

/** The first topic to reach level 3 gets a milestone; later ones do not. */
export function sweepTopic(state: EngineState, topic: TopicId, mastery: number): void {
  if (mastery < PARAMS.levelSolid) return;
  for (const id of state.milestones) if (id.indexOf('topic-solid:') === 0) return;
  for (const id of state.pendingMilestones || []) if (id.indexOf('topic-solid:') === 0) return;
  earn(state, 'topic-solid:' + topic);
}

/** Human copy for the milestone card (§15). */
export function milestoneCopy(id: string, name: string, when: number): string {
  if (id === 'first-too-hard') return 'Good. Now I know where to build.';
  if (id === 'first-revisit-solved') return 'You flagged this in ' + monthOf(when) + '. You just got it.';
  if (id === 'goal-reached') return 'Goal done ✨ — keep going?';
  if (id.indexOf('topic-solid:') === 0) return name + ' is solid now.';
  if (id.indexOf('domain-touched:') === 0) return 'First card in ' + name + '.';
  if (id === 'all-domains') return 'You have touched every domain.';
  if (id.indexOf('streak-') === 0) return id.slice(7) + ' days in a row.';
  if (id.indexOf('cards-') === 0) return id.slice(6) + ' cards.';
  if (id === 'first-10-cards') return 'Ten cards in.';
  if (id === 'first-like') return 'First one you kept.';
  if (id === 'first-rigor') return 'You opened the rigor.';
  if (id === 'first-callback') return 'The app remembered something for you.';
  if (id === 'first-binge') return 'That was a long one.';
  if (id === 'recall-streak-10') return 'Ten recalls in a row.';
  if (id.indexOf('month-') === 0) return 'Month ' + id.slice(6) + ': your recap is ready.';
  return id;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function monthOf(t: number): string {
  return MONTHS[new Date(t).getMonth()];
}
