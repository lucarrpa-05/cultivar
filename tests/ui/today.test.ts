// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { h, render } from 'preact';
import type { DayStat, EngineState } from '@/types';
import { app, replan } from '@/app/state';
import { blankState, createFallbackEngine } from '@/app/fallbackEngine';
import { createMemoryStore } from '@/app/fallbackStore';
import { loadIndex } from '@/content/loader';
import {
  TODAY_FLAG,
  buildToday,
  greetingFor,
  maybeInjectToday,
  pickFresh,
  pickPuzzle,
  streakLine,
  todayId,
  truncate,
} from '@/app/today';
import { allMeta } from '@/content/loader';
import { TodayCard } from '@/ui/TodayCard';
import { deps, meta, taxonomy } from './fixtures';

// Sunday, September 27 2026, 09:00 local.
const NOW = new Date(2026, 8, 27, 9, 0, 0).getTime();
const DAY = 86_400_000;

const series = (index: number) => ({ id: 'math.primes', index, total: 5, title: 'The primes' });

const cards = [
  meta('math.area.topic.a', { dates: { written: '2026-09-01' } }),
  meta('math.area.topic.hard', { title: 'The hard one', dates: { written: '2026-09-01' } }),
  meta('bio.area.topic.ans', { domain: 'bio', topic: 'bio.area.topic', title: 'Why cells', dates: { written: '2026-09-20' } }),
  meta('math.area.topic.s1', { series: series(1), dates: { written: '2026-09-01' } }),
  meta('math.area.topic.s2', { series: series(2), dates: { written: '2026-09-01' } }),
  meta('math.area.topic.s3', { series: series(3), title: 'Episode three', dates: { written: '2026-09-01' } }),
  meta('math.area.topic.p1', { format: 'challenge', title: 'Puzzle one', dates: { written: '2026-09-01' } }),
  meta('math.area.topic.p2', { format: 'challenge', title: 'Puzzle two', dates: { written: '2026-09-01' } }),
  meta('bio.area.topic.p3', { domain: 'bio', topic: 'bio.area.topic', format: 'challenge', title: 'Puzzle three', dates: { written: '2026-09-01' } }),
  // Written the day before the last visit: not new.
  meta('math.area.topic.old', { dates: { written: '2026-09-25' } }),
  // Written after the last visit (2026-09-26): new.
  meta('math.area.topic.n1', { dates: { written: '2026-09-27' } }),
  meta('math.area.topic.n2', { dates: { written: '2026-09-27' } }),
  meta('bio.area.topic.n3', { domain: 'bio', topic: 'bio.area.topic', dates: { written: '2026-09-27' } }),
  meta('ai.area.topic.n4', { domain: 'ai', topic: 'ai.area.topic', dates: { written: '2026-09-27T08:00:00Z' } }),
];

function day(d: string, over: Partial<DayStat> = {}): DayStat {
  return {
    d,
    minutes: 12,
    cards: 6,
    likes: 2,
    skips: 0,
    views: 6,
    recallAnswered: 0,
    recallCorrect: 0,
    recallSkipped: 0,
    sessions: [12],
    ...over,
  };
}

const read = (st: EngineState, id: string) => {
  st.seen[id] = { first: NOW - 5 * DAY, last: NOW - 5 * DAY, views: 1 };
};

/** A state with every kind of item available. */
function fullState(): EngineState {
  const st = blankState('dev', NOW - 10 * DAY);
  st.days = [day('2026-09-24'), day('2026-09-26', { cards: 7, likes: 3, minutes: 18.4 })];
  read(st, 'math.area.topic.a');
  read(st, 'math.area.topic.s1');
  read(st, 'math.area.topic.s2');
  st.series['math.primes'] = { lastIndex: 2, lastAt: NOW - 2 * DAY, paused: true, finished: false };
  st.questions.push({
    id: 'q-2026-09-20-abcd',
    t: NOW - 7 * DAY,
    text: 'Why do cells bother dividing at all when they could just keep growing bigger and bigger forever?',
    status: 'answered',
    answerCard: 'bio.area.topic.ans',
  });
  st.revisit.push({
    card: 'math.area.topic.hard',
    flaggedAt: NOW - 20 * DAY,
    prereqs: [],
    threshold: 0.5,
    readyAt: NOW - DAY,
    resolved: false,
  });
  st.streak = { ...st.streak, current: 8, best: 12, freezes: 1 };
  return st;
}

beforeAll(async () => {
  vi.stubGlobal('fetch', async (url: string) => {
    const path = String(url);
    const payload = path.endsWith('index.json')
      ? { builtAt: '2026-09-27T00:00:00Z', count: cards.length, cards }
      : path.endsWith('taxonomy.json')
        ? taxonomy
        : null;
    return {
      ok: payload !== null,
      status: payload ? 200 : 404,
      json: async () => payload,
    } as unknown as Response;
  });
  await loadIndex();
});

beforeEach(async () => {
  localStorage.clear();
  const store = createMemoryStore();
  await store.init();
  app.store = store;
  app.taxonomy = taxonomy;
  app.engine = createFallbackEngine(deps(cards), blankState('dev'));
  app.engineState = fullState();
  app.feed = [];
  app.cursor = 0;
  app.queue = [];
  app.cards = {};
  app.cardCount = cards.length;
});

describe('today: copy', () => {
  it('greets by local hour', () => {
    expect(greetingFor(8)).toBe('Good morning');
    expect(greetingFor(13)).toBe('Good afternoon');
    expect(greetingFor(20)).toBe('Good evening');
    expect(greetingFor(2)).toBe('Good evening');
    const brief = buildToday(NOW);
    expect(brief.greeting).toBe('Good morning');
    expect(brief.dateLine).toBe('Sunday, September 27');
    expect(buildToday(new Date(2026, 8, 27, 15).getTime()).greeting).toBe('Good afternoon');
  });

  it('says the streak kindly in all three cases', () => {
    expect(streakLine(8, 12)).toBe('Day 8 · best 12');
    expect(streakLine(0, 12)).toBe('A new streak starts today. Your best is 12.');
    expect(streakLine(0, 0)).toBe('Day one.');
    expect(buildToday(NOW).streak).toEqual({ current: 8, best: 12, freezes: 1, line: 'Day 8 · best 12' });
    app.engineState!.streak = { ...app.engineState!.streak, current: 0, best: 12 };
    expect(buildToday(NOW).streak.line).toBe('A new streak starts today. Your best is 12.');
  });

  it('never uses the forbidden words or exclamation marks', () => {
    const brief = buildToday(NOW);
    const text = [
      brief.greeting,
      brief.streak.line,
      brief.shelfLine,
      ...brief.items.flatMap((i) => [i.title, i.line, i.action.label]),
    ].join(' ');
    expect(text).not.toMatch(/!|\bquiz|\bstudy|\blesson|\btest\b|homework/i);
  });

  it('truncates long questions near 70 characters', () => {
    const q = truncate('word '.repeat(40));
    expect(q.length).toBeLessThanOrEqual(71);
    expect(q.endsWith('…')).toBe(true);
    expect(truncate('Short one?')).toBe('Short one?');
  });

  it('reports yesterday and the shelf', () => {
    const brief = buildToday(NOW);
    expect(brief.yesterday).toEqual({ cards: 7, likes: 3, minutes: 18.4 });
    expect(brief.shelfLine).toBe(`You have read 3 of ${cards.length} cards`);
    app.engineState!.days = [day('2026-09-24')];
    expect(buildToday(NOW).yesterday).toBeUndefined();
  });
});

describe('today: items', () => {
  it('orders by priority, caps at four and always keeps the puzzle', () => {
    const brief = buildToday(NOW);
    expect(brief.items.map((i) => i.kind)).toEqual(['answer', 'revisit', 'series', 'puzzle']);
    const [answer, revisit, series] = brief.items;
    expect(answer.title).toBe('Your question has an answer');
    expect(answer.line.length).toBeLessThanOrEqual(71);
    expect(answer.action.label).toBe('Read the answer');
    expect(revisit.line).toBe('The hard one');
    expect(series.line).toBe('Episode 3 of 5 · The primes');
  });

  it('shows the fresh item when there is room', () => {
    const st = app.engineState!;
    for (const p of ['math.area.topic.p1', 'math.area.topic.p2', 'bio.area.topic.p3']) read(st, p);
    expect(buildToday(NOW).items.map((i) => i.kind)).toEqual(['answer', 'revisit', 'series', 'fresh']);
    st.questions = [];
    st.revisit = [];
    st.series = {};
    delete st.seen['math.area.topic.p1'];
    expect(buildToday(NOW).items.map((i) => i.kind)).toEqual(['fresh', 'puzzle']);
  });

  it('skips an answer already read and a revisit not ready yet', () => {
    const st = app.engineState!;
    read(st, 'bio.area.topic.ans');
    st.revisit[0].readyAt = NOW + DAY;
    expect(buildToday(NOW).items.map((i) => i.kind)).toEqual(['series', 'fresh', 'puzzle']);
  });

  it('counts only cards written after the last active day', () => {
    const st = app.engineState!;
    const fresh = pickFresh(st, allMeta(), '2026-09-27');
    expect(fresh.since).toBe('2026-09-26');
    expect(fresh.count).toBe(4);
    expect(fresh.picks).toHaveLength(3);
    // spread across domains: three picks, three different domains
    expect(new Set(fresh.picks.map((id) => id.split('.')[0])).size).toBe(3);
    expect(fresh.picks).toEqual(pickFresh(st, allMeta(), '2026-09-27').picks);

    st.questions = [];
    st.revisit = [];
    st.series = {};
    const item = buildToday(NOW).items.find((i) => i.kind === 'fresh')!;
    expect(item.title).toBe('4 new cards since yesterday');
    expect(item.line).toBe('Math, AI and biology');
    expect(item.action.label).toBe('Read three');

    read(st, 'math.area.topic.n1');
    expect(pickFresh(st, allMeta(), '2026-09-27').count).toBe(3);

    // An earlier last visit widens the window.
    st.days = [day('2026-09-24')];
    expect(pickFresh(st, allMeta(), '2026-09-27').count).toBe(4);

    // No previous day at all: nothing is "new since you were here".
    st.days = [];
    expect(pickFresh(st, allMeta(), '2026-09-27').count).toBe(0);
    expect(buildToday(NOW).items.map((i) => i.kind)).not.toContain('fresh');
  });

  it('picks the same puzzle all day, and a different one some days', () => {
    const st = app.engineState!;
    const a = pickPuzzle(st, allMeta(), '2026-09-27')!.id;
    expect(pickPuzzle(st, allMeta(), '2026-09-27')!.id).toBe(a);
    expect(buildToday(NOW).items.at(-1)!.line).toBe(pickPuzzle(st, allMeta(), '2026-09-27')!.title);
    const picks = new Set(
      Array.from({ length: 20 }, (_, i) => pickPuzzle(st, allMeta(), `2026-10-${String(i + 1).padStart(2, '0')}`)!.id),
    );
    expect(picks.size).toBeGreaterThan(1);
    read(st, a);
    expect(pickPuzzle(st, allMeta(), '2026-09-27')!.id).not.toBe(a);
  });

  it('actions put the right card next', async () => {
    app.feed = [{ id: 'math.area.topic.a', slot: 'open', why: [], score: 0 }];
    const brief = buildToday(NOW);
    brief.items.find((i) => i.kind === 'revisit')!.action.run();
    expect(app.feed[app.cursor + 1].id).toBe('math.area.topic.hard');
    expect(app.feed[app.cursor + 1].slot).toBe('revisit');
    expect(app.feed[app.cursor + 1].why[0]).toMatch(/^You flagged this /);

    brief.items.find((i) => i.kind === 'series')!.action.run();
    expect(app.feed[app.cursor + 1].id).toBe('math.area.topic.s3');
    expect(app.feed[app.cursor + 1].why).toEqual(['You came back to The primes']);
  });
});

describe('today: injection', () => {
  it('inserts the opener once per day and is a no-op on the second call', async () => {
    replan();
    const before = app.feed.length;
    expect(await maybeInjectToday(NOW)).toBe(true);
    expect(app.feed[0]).toEqual({ id: todayId('2026-09-27'), slot: 'open', why: ['A new day'], score: 0 });
    expect(app.cursor).toBe(0);
    expect(app.feed.length).toBe(before + 1);
    expect(await app.store!.getLocal(TODAY_FLAG)).toBe('2026-09-27');

    expect(await maybeInjectToday(NOW)).toBe(false);
    expect(app.feed.filter((s) => s.id.startsWith('today:'))).toHaveLength(1);

    // it survives a re-plan at the head
    replan();
    expect(app.feed[0].id).toBe('today:2026-09-27');

    // a new day brings it back
    app.feed = app.feed.slice(1);
    expect(await maybeInjectToday(NOW + DAY)).toBe(true);
    expect(app.feed[0].id).toBe('today:2026-09-28');
  });

  it('does nothing without an engine or a feed', async () => {
    expect(await maybeInjectToday(NOW)).toBe(false);
    replan();
    app.engine = null;
    expect(await maybeInjectToday(NOW)).toBe(false);
    expect(await app.store!.getLocal(TODAY_FLAG)).toBeUndefined();
  });
});

describe('today: card', () => {
  it('renders the greeting, tiles with labelled buttons and a way in', () => {
    const host = document.createElement('div');
    document.body.append(host);
    render(h(TodayCard, { served: { id: todayId(), slot: 'open', why: [], score: 0 }, active: true }), host);
    expect(host.querySelector('.card.is-today')).not.toBeNull();
    expect(host.querySelector('.card-title')!.textContent).toMatch(/^Good (morning|afternoon|evening)$/);
    const tiles = host.querySelectorAll('.today-item');
    expect(tiles.length).toBeGreaterThan(0);
    expect(tiles.length).toBeLessThanOrEqual(4);
    const buttons = [...host.querySelectorAll('button')];
    expect(buttons.every((b) => b.getAttribute('aria-label'))).toBe(true);
    expect(buttons.at(-1)!.textContent).toBe('Start reading');
    render(null, host);
    host.remove();
  });
});
