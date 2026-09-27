// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'preact';
import type { Card, ServedCard } from '@/types';
import { app, beginDwell, endDwell, isRead } from '@/app/state';
import { blankState, createFallbackEngine } from '@/app/fallbackEngine';
import { createMemoryStore } from '@/app/fallbackStore';
import { CardShell } from '@/ui/CardView';
import { gateMs, questionAddsSomething } from '@/ui/Challenge';
import { deps, meta, taxonomy } from './fixtures';

const ID = 'math.area.topic.puzzle';

function puzzle(over: Partial<Card> = {}): Card {
  return {
    ...meta(ID, { format: 'challenge', hasRecall: true, hook: 'Two doors, one guard who always lies.' }),
    title: 'Which door do you pick?',
    body: 'You get **one** question. Choose it well.',
    rigor: null,
    recall: {
      type: 'reveal',
      question: 'What single question works whichever guard you ask?',
      answer: 'Ask: *which door would the other guard point to?* Then pick the **other** one.',
    },
    sources: [],
    ...over,
  };
}

const served: ServedCard = { id: ID, slot: 'progress', why: [], score: 0 };
const tick = (ms = 20) => new Promise((r) => setTimeout(r, ms));

let host: HTMLElement;

beforeEach(async () => {
  localStorage.clear();
  const store = createMemoryStore();
  await store.init();
  app.store = store;
  app.taxonomy = taxonomy;
  app.engine = createFallbackEngine(deps([meta(ID, { format: 'challenge' })]), blankState('dev'));
  app.engineState = app.engine.state();
  app.feed = [served];
  app.cursor = 0;
  app.cards = {};
  endDwell();
  host = document.createElement('div');
  document.body.append(host);
});

afterEach(() => {
  render(null, host);
  host.remove();
  vi.restoreAllMocks();
});

function mount(card: Card) {
  render(<CardShell card={card} served={served} active={true} />, host);
}

function button(label: string): HTMLButtonElement {
  const el = host.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`);
  if (!el) throw new Error(`no button ${label}`);
  return el;
}

/** Pretend the reader has been on the card for a minute. */
function dwellAMinute(id = ID) {
  vi.restoreAllMocks();
  const real = Date.now.bind(Date);
  beginDwell(id);
  vi.spyOn(Date, 'now').mockImplementation(() => real() + 60_000);
}

describe('puzzle solutions', () => {
  it('replaces "Sit with it" with a locked solution button', async () => {
    beginDwell(ID);
    mount(puzzle());
    await tick();
    const btn = button('Show me the solution');
    expect(btn.classList.contains('is-locked')).toBe(true);
    expect(btn.getAttribute('aria-disabled')).toBe('true');
    expect(host.textContent).not.toContain('Sit with it');

    btn.click();
    await tick();
    expect(host.textContent).toContain('Give it a minute first.');
    expect(host.querySelector('.puzzle-panel')).toBeNull();
    expect(isRead(ID)).toBe(false);
  });

  it('shows the question only when it adds something', () => {
    expect(questionAddsSomething('What single question works?', 'Which door do you pick?', 'Two doors')).toBe(true);
    expect(questionAddsSomething('Which door do you pick?', 'Which door do you pick?')).toBe(false);
    expect(questionAddsSomething('', 'Anything')).toBe(false);
  });

  it('gates for at least 8 s, longer for long bodies', () => {
    expect(gateMs(10, 0.5, 8000)).toBe(8000);
    expect(gateMs(330, 0.5, 8000)).toBeCloseTo(50_000);
  });

  it('reveals the answer, marks the card read, and records a "Not quite" once', async () => {
    dwellAMinute();
    mount(puzzle());
    await tick();
    expect(host.textContent).toContain('What single question works whichever guard you ask?');
    const btn = button('Show me the solution');
    expect(btn.classList.contains('is-locked')).toBe(false);

    btn.click();
    await tick();
    expect(host.querySelector('.puzzle-panel')?.textContent).toContain('which door would the other guard point to?');
    expect(isRead(ID)).toBe(true);

    button('Not quite').click();
    await tick();
    expect(host.textContent).toContain('Now you have seen it. It will come back around.');
    expect(host.querySelector('button[aria-label="I had it"]')).toBeNull();

    const events = await app.store!.listEvents();
    const recalls = events.filter((e) => e.type === 'recall');
    expect(recalls).toHaveLength(1);
    expect(recalls[0].card).toBe(ID);
    expect(recalls[0].data).toMatchObject({ grade: 1, correct: false, solution: true });
    expect(events.some((e) => e.type === 'view' && e.card === ID && e.data?.confirmed === true)).toBe(true);
  });

  it('"I had it" records a correct grade; "Just curious" records nothing', async () => {
    dwellAMinute();
    mount(puzzle());
    await tick();
    button('Show me the solution').click();
    await tick();
    button('I had it').click();
    await tick();
    expect(host.textContent).toContain('Nice.');
    let recalls = (await app.store!.listEvents()).filter((e) => e.type === 'recall');
    expect(recalls[0].data).toMatchObject({ grade: 3, correct: true, solution: true });

    // A different card in the same slot starts fresh.
    const other = puzzle({ id: `${ID}.b` });
    dwellAMinute(other.id);
    render(<CardShell card={other} served={{ ...served, id: other.id }} active={true} />, host);
    await tick();
    expect(host.querySelector('.puzzle-panel')).toBeNull();
    button('Show me the solution').click();
    await tick();
    button('Just curious').click();
    await tick();
    recalls = (await app.store!.listEvents()).filter((e) => e.type === 'recall');
    expect(recalls).toHaveLength(1);
    expect(host.querySelector('.puzzle-grade')).toBeNull();
  });

  it('opens straight away on a puzzle the reader has already read', async () => {
    app.engineState!.seen[ID] = { first: 1, last: 1, views: 1 };
    beginDwell(ID);
    mount(puzzle());
    await tick();
    const btn = button('Show me the solution');
    expect(btn.classList.contains('is-locked')).toBe(false);
    btn.click();
    await tick();
    expect(host.textContent).toContain('which door would the other guard point to');
  });

  it('keeps the old line for a puzzle without a reveal answer', async () => {
    mount(puzzle({ recall: null }));
    await tick();
    expect(host.textContent).toContain('Sit with it. No answer needed.');
    expect(host.querySelector('.puzzle-btn')).toBeNull();
  });
});
