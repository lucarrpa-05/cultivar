// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import type { CardMeta, EngineState } from '@/types';
import { app } from '@/app/state';
import { blankState, createFallbackEngine } from '@/app/fallbackEngine';
import { loadIndex, loadTaxonomy } from '@/content/loader';
import { pickFromShelf, searchCards, seriesList, shelves, surpriseMe, type Shelf } from '@/app/library';
import { h, render } from 'preact';
import { LibraryScreen } from '@/ui/LibraryScreen';
import { deps, meta, taxonomy } from './fixtures';

const NOW = Date.parse('2026-09-27T12:00:00Z');
const ep = (sid: string, i: number, total: number, over: Partial<CardMeta> = {}) =>
  meta(`math.area.topic.${sid}e${i}`, {
    format: 'series',
    series: { id: sid, index: i, total, title: `Series ${sid}` },
    title: `${sid} episode ${i}`,
    ...over,
  });

const cards: CardMeta[] = [
  // search
  meta('math.area.topic.t1', { title: 'Prime gaps', hook: 'Spacing out.', tags: ['number theory'] }),
  meta('math.area.topic.t2', { title: 'Twin towers', hook: 'Every prime has a twin?', tags: ['x'] }),
  meta('math.area.topic.t3', { title: 'Sieve', hook: 'Old tricks.', tags: ['prime'] }),
  meta('math.area.topic.t4', { title: 'Gaps in knowledge', hook: 'Nothing here.', tags: ['y'] }),
  // shelves
  meta('math.area.topic.pz1', { format: 'challenge', title: 'Puzzle one' }),
  meta('math.area.topic.pz2', { format: 'challenge', title: 'Puzzle two' }),
  meta('math.area.topic.pz3', { format: 'challenge', title: 'Puzzle three' }),
  meta('bio.area.topic.pz4', { domain: 'bio', topic: 'bio.area.topic', format: 'challenge', title: 'Puzzle four' }),
  meta('bio.area.topic.pz5', { domain: 'bio', topic: 'bio.area.topic', format: 'challenge', title: 'Puzzle five' }),
  meta('bio.area.topic.st', { domain: 'bio', topic: 'bio.area.topic', format: 'story', title: 'A story' }),
  meta('math.area.topic.qu', { format: 'quote', title: 'A quote' }),
  meta('math.area.topic.sh', { weight: 'light', words: { body: 80, rigor: 0 }, title: 'Short' }),
  meta('math.area.topic.lo', { weight: 'light', words: { body: 200, rigor: 0 }, title: 'Light but long' }),
  meta('math.area.topic.dp', { hasRigor: true, difficulty: 3, title: 'Deep' }),
  meta('math.area.topic.dx', { hasRigor: true, difficulty: 2, title: 'Rigor but easy' }),
  meta('math.area.topic.es', { language: 'es', title: 'En casa' }),
  meta('math.area.topic.fr', { dates: { written: '2026-09-20' }, title: 'Fresh one' }),
  meta('math.area.topic.hv', { weight: 'heavy', title: 'Heavy' }),
  // series
  ep('sa', 1, 3), ep('sa', 2, 3), ep('sa', 3, 3),
  ep('sb', 1, 3), ep('sb', 2, 3), ep('sb', 3, 3),
  ep('sc', 1, 4), ep('sc', 2, 4), ep('sc', 3, 4), ep('sc', 4, 4),
  ep('sd', 1, 2), ep('sd', 2, 2),
];

beforeAll(async () => {
  vi.stubGlobal('fetch', async (url: string) => {
    const path = String(url);
    const payload = path.endsWith('taxonomy.json')
      ? taxonomy
      : path.endsWith('index.json')
        ? { builtAt: '2026-09-01T00:00:00Z', count: cards.length, cards }
        : null;
    return { ok: payload !== null, status: payload ? 200 : 404, json: async () => payload } as unknown as Response;
  });
  app.taxonomy = await loadTaxonomy();
  await loadIndex();
});

let st: EngineState;
beforeEach(() => {
  app.engine = createFallbackEngine(deps(cards), blankState('dev'));
  app.engineState = app.engine.state();
  st = app.engineState;
});

function read(id: string, t = 1000, liked = false) {
  st.seen[id] = { first: t, last: t, views: 1, ...(liked ? { liked: true } : {}) };
}

describe('searchCards', () => {
  it('ranks title over hook over tags', () => {
    expect(searchCards('prime').map((m) => m.id)).toEqual([
      'math.area.topic.t1',
      'math.area.topic.t2',
      'math.area.topic.t3',
    ]);
  });

  it('requires every word to hit somewhere', () => {
    expect(searchCards('prime gaps').map((m) => m.id)).toEqual(['math.area.topic.t1']);
    expect(searchCards('gaps nothing').map((m) => m.id)).toEqual(['math.area.topic.t4']);
    expect(searchCards('prime zebra')).toEqual([]);
  });

  it('matches topic and domain names, and ignores one-letter queries', () => {
    expect(searchCards('biology').map((m) => m.id)).toContain('bio.area.topic.st');
    expect(searchCards('p')).toEqual([]);
    expect(searchCards('pr', 2)).toHaveLength(2);
  });
});

describe('shelves', () => {
  it('classifies the fixtures', () => {
    const by = Object.fromEntries(shelves(NOW).map((s) => [s.id, s.ids]));
    expect(by.puzzles).toHaveLength(5);
    expect(by.stories).toEqual(['bio.area.topic.st']);
    expect(by.quotes).toEqual(['math.area.topic.qu']);
    expect(by.short).toEqual(['math.area.topic.sh']);
    expect(by.deep).toEqual(['math.area.topic.dp']);
    expect(by.spanish).toEqual(['math.area.topic.es']);
    expect(by.fresh).toEqual(['math.area.topic.fr']);
    for (const s of shelves(NOW)) expect(s.blurb.length).toBeGreaterThan(0);
  });

  it('hides the fresh shelf when nothing is recent', () => {
    const later = Date.parse('2027-03-01T00:00:00Z');
    expect(shelves(later).map((s) => s.id)).not.toContain('fresh');
  });
});

describe('pickFromShelf', () => {
  const puzzles = (): Shelf => shelves(NOW).find((s) => s.id === 'puzzles')!;

  it('prefers unread, then read-but-not-liked, never read-and-liked', () => {
    read('math.area.topic.pz1');
    read('math.area.topic.pz2', 1000, true);
    const ids = pickFromShelf(puzzles(), 5, '2026-09-27');
    expect(ids.slice(0, 3).sort()).toEqual(['bio.area.topic.pz4', 'bio.area.topic.pz5', 'math.area.topic.pz3']);
    expect(ids[3]).toBe('math.area.topic.pz1');
    expect(ids).not.toContain('math.area.topic.pz2');
  });

  it('is deterministic for a seed and spreads across domains', () => {
    const a = pickFromShelf(puzzles(), 5, '2026-09-27');
    const b = pickFromShelf(puzzles(), 5, '2026-09-27');
    expect(a).toEqual(b);
    expect(a).toHaveLength(5);
    const domains = a.slice(0, 2).map((id) => id.split('.')[0]);
    expect(new Set(domains).size).toBe(2);
    expect(pickFromShelf(puzzles(), 2, 'x')).toHaveLength(2);
  });
});

describe('surpriseMe', () => {
  it('picks an unread, not-heavy card from the least-read domain', () => {
    read('bio.area.topic.st');
    for (let i = 0; i < 20; i++) {
      const id = surpriseMe(() => (i + 0.5) / 20);
      expect(id).toBeTruthy();
      expect(id!.startsWith('math.')).toBe(true);
      expect(id).not.toBe('math.area.topic.hv');
    }
  });
});

describe('seriesList', () => {
  it('computes status and the next episode', () => {
    // sb: reading, episode 1 read
    read('math.area.topic.sbe1', 5000);
    st.series.sb = { lastIndex: 1, lastAt: 5000, paused: false, finished: false };
    // sc: read 1 and 2, then skipped 2 (a skip lowers lastIndex to 1) — resume at 3
    read('math.area.topic.sce1', 6000);
    read('math.area.topic.sce2', 7000);
    st.series.sc = { lastIndex: 1, lastAt: 8000, paused: true, finished: false };
    // sd: finished
    read('math.area.topic.sde1', 100);
    read('math.area.topic.sde2', 200);
    st.series.sd = { lastIndex: 2, lastAt: 200, paused: false, finished: true };

    const list = seriesList();
    const by = Object.fromEntries(list.map((s) => [s.id, s]));
    expect(by.sa).toMatchObject({ status: 'new', nextId: 'math.area.topic.sae1', total: 3, lastIndex: 0 });
    expect(by.sa.episodes).toEqual(['math.area.topic.sae1', 'math.area.topic.sae2', 'math.area.topic.sae3']);
    expect(by.sb).toMatchObject({ status: 'reading', nextId: 'math.area.topic.sbe2' });
    expect(by.sc).toMatchObject({ status: 'paused', nextId: 'math.area.topic.sce3', lastIndex: 1 });
    expect(by.sc.read).toEqual([true, true, false, false]);
    expect(by.sd).toMatchObject({ status: 'finished', nextId: 'math.area.topic.sde1' });

    // paused/reading first, most recent first; then new; then finished
    expect(list.map((s) => s.id)).toEqual(['sc', 'sb', 'sa', 'sd']);
  });

  it('a series saved for later on an unread episode resumes at that episode', () => {
    read('math.area.topic.sae1', 5000);
    st.series.sa = { lastIndex: 2, lastAt: 6000, paused: true, finished: false, warm: false, pending: false };
    expect(seriesList().find((s) => s.id === 'sa')).toMatchObject({ status: 'paused', nextId: 'math.area.topic.sae2' });
  });
});

describe('LibraryScreen', () => {
  it('renders shelves, series and saved, and search replaces them', async () => {
    const host = document.createElement('div');
    document.body.append(host);
    render(h(LibraryScreen, {}), host);
    const text = host.textContent ?? '';
    expect(text).toContain('Library');
    expect(text).toContain('In the mood for');
    expect(text).toContain('Puzzles');
    expect(text).toContain('5 unread of 5');
    expect(text).toContain('Series sa');
    expect(text).toContain('Nothing saved yet');
    expect(host.querySelector('[aria-label="Surprise me"]')).toBeTruthy();

    const input = host.querySelector<HTMLInputElement>('input[type="search"]')!;
    input.value = 'prime gaps';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 10));
    expect(host.textContent).toContain('Prime gaps');
    expect(host.textContent).not.toContain('In the mood for');
    render(null, host);
  });
});
