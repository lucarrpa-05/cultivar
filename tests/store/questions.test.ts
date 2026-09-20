import { describe, expect, it } from 'vitest';
import { countOpen, deriveQuestions, questionsJson } from '../../src/store/questions';
import type { EngineState } from '../../src/types';
import { T0, makeQuestion, makeState } from './helpers';

describe('deriveQuestions', () => {
  it('returns open and answered questions oldest first', () => {
    const state = makeState({
      questions: [
        makeQuestion({ id: 'q-2026-09-19-bbbb', t: T0, text: 'why does the peak happen at interpolation?' }),
        makeQuestion({ id: 'q-2026-09-18-aaaa', t: T0 - 86_400_000, text: 'what is a sheaf?', status: 'answered', answerCard: 'math.sheaf.intro' }),
      ],
    });

    const out = deriveQuestions(state);
    expect(out.map((q) => q.id)).toEqual(['q-2026-09-18-aaaa', 'q-2026-09-19-bbbb']);
    expect(out.map((q) => q.status)).toEqual(['answered', 'open']);
    expect(countOpen(out)).toBe(1);
  });

  it('treats an answer card as answered even without the status', () => {
    const state = makeState({
      questions: [makeQuestion({ id: 'q1', text: 'why?', status: 'open', answerCard: 'ai.dd.answer' })],
    });
    expect(deriveQuestions(state)[0]).toEqual({ id: 'q1', t: T0, text: 'why?', status: 'answered', answerCard: 'ai.dd.answer' });
  });

  it('keeps the SCHEMA.md key order and carries card/topic', () => {
    const state = makeState({
      questions: [makeQuestion({ id: 'q1', card: 'ai.theory.double-descent.intro', topic: 'ai.theory.double-descent', text: 'why?' })],
    });
    expect(Object.keys(deriveQuestions(state)[0])).toEqual(['id', 't', 'card', 'topic', 'text', 'status']);
  });

  it('dedupes by id (last wins) and drops entries without id or text', () => {
    const state = makeState({
      questions: [
        makeQuestion({ id: 'q1', text: 'first ask' }),
        makeQuestion({ id: 'q1', text: 'edited ask', status: 'answered', answerCard: 'c1' }),
        makeQuestion({ id: '', text: 'no id' }),
        makeQuestion({ id: 'q2', text: '   ' }),
      ],
    });
    const out = deriveQuestions(state);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({ id: 'q1', text: 'edited ask', status: 'answered' });
  });

  it('survives missing or malformed state', () => {
    expect(deriveQuestions(null)).toEqual([]);
    expect(deriveQuestions(undefined)).toEqual([]);
    expect(deriveQuestions({} as EngineState)).toEqual([]);
    expect(deriveQuestions({ questions: [null, 3, 'x'] } as unknown as EngineState)).toEqual([]);
  });

  it('serializes as pretty JSON with a trailing newline', () => {
    const state = makeState({ questions: [makeQuestion({ id: 'q1', text: 'why?' })] });
    const json = questionsJson(state);
    expect(json.endsWith('\n')).toBe(true);
    expect(JSON.parse(json)).toEqual(deriveQuestions(state));
    expect(json).toContain('\n  {\n    "id": "q1"');
  });
});
