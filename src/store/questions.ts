/**
 * Cultivar — `questions.json` for the data repo (SCHEMA.md §5, SYNC.md §"Questions and context").
 *
 * The engine keeps reader questions in `state.questions`; the refresh session
 * reads the file this module produces, writes answer cards with
 * `answersQuestion: <id>`, and flips the entry to `status: 'answered'` with the
 * card id. Deriving instead of accumulating means the file is always a pure
 * function of the event log.
 */

import type { EngineState, ReaderQuestion } from '../types';

/**
 * Open + answered questions, deduped by id (last wins), oldest first.
 * A question counts as answered when it says so or when it carries an answer card.
 */
export function deriveQuestions(state: EngineState | null | undefined): ReaderQuestion[] {
  const raw = state && Array.isArray(state.questions) ? state.questions : [];
  const byId = new Map<string, ReaderQuestion>();

  for (const q of raw) {
    if (!q || typeof q !== 'object') continue;
    const id = typeof q.id === 'string' ? q.id.trim() : '';
    const text = typeof q.text === 'string' ? q.text.trim() : '';
    if (!id || !text) continue;

    const answerCard = typeof q.answerCard === 'string' && q.answerCard ? q.answerCard : undefined;
    const answered = q.status === 'answered' || Boolean(answerCard);

    // Key order matches the SCHEMA.md §5 example, so diffs in the repo read well.
    byId.set(id, {
      id,
      t: typeof q.t === 'number' && Number.isFinite(q.t) ? q.t : 0,
      ...(typeof q.card === 'string' && q.card ? { card: q.card } : {}),
      ...(typeof q.topic === 'string' && q.topic ? { topic: q.topic } : {}),
      text,
      status: answered ? 'answered' : 'open',
      ...(answerCard ? { answerCard } : {}),
    });
  }

  return [...byId.values()].sort((a, b) => a.t - b.t || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

/** The exact bytes pushed to `questions.json`. */
export function questionsJson(state: EngineState | null | undefined): string {
  return `${JSON.stringify(deriveQuestions(state), null, 2)}\n`;
}

/** How many are still waiting for an answer card — for the Settings line. */
export function countOpen(questions: ReaderQuestion[]): number {
  return questions.filter((q) => q.status === 'open').length;
}
