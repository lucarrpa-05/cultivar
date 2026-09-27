// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'preact';
import type { Card, CardMeta } from '@/types';
import { app } from '@/app/state';
import { blankState, createFallbackEngine } from '@/app/fallbackEngine';
import { createMemoryStore } from '@/app/fallbackStore';
import { loadIndex, loadTaxonomy } from '@/content/loader';
import { SeriesBar } from '@/ui/SeriesBar';
import { deps, meta, taxonomy } from './fixtures';

const ep = (i: number): CardMeta =>
  meta(`math.area.topic.e${i}`, {
    format: 'series',
    series: { id: 'tiny', index: i, total: 3, title: 'Tiny worlds' },
  });
const cards = [ep(1), ep(2), ep(3)];
const card: Card = { ...cards[1], body: 'Body.', rigor: null, recall: null, sources: [] };

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

beforeEach(async () => {
  const store = createMemoryStore();
  await store.init();
  app.store = store;
  app.engine = createFallbackEngine(deps(cards), blankState('dev'));
  app.engineState = app.engine.state();
  app.feed = [{ id: card.id, slot: 'series', why: [], score: 0 }];
  app.cursor = 0;
  app.toast = null;
});

function mount() {
  const host = document.createElement('div');
  document.body.append(host);
  render(<SeriesBar card={card} />, host);
  return host;
}

const tick = () => new Promise((r) => setTimeout(r, 10));

describe('SeriesBar', () => {
  it('shows where you are in the series', () => {
    const host = mount();
    expect(host.textContent).toContain('Episode 2 of 3 · Tiny worlds');
    expect(host.querySelectorAll('.ep-dots i')).toHaveLength(3);
    render(null, host);
  });

  it('saves for later, then shows the disabled state', async () => {
    const host = mount();
    const btn = host.querySelector<HTMLButtonElement>('[aria-label="Save the series for later"]')!;
    expect(btn).toBeTruthy();
    btn.click();
    await tick();

    const events = await app.store!.listEvents();
    const save = events.find((e) => e.type === 'save');
    expect(save?.card).toBe(card.id);
    expect(save?.data?.later).toBe(true);
    expect(save?.data?.series).toBe('tiny');
    expect(app.engineState?.saved).toContain(card.id);
    expect(app.toast?.text).toContain('Library › Series');

    const done = host.querySelector<HTMLButtonElement>('.series-bar-btn')!;
    expect(done.textContent).toContain('Saved for later');
    expect(done.disabled).toBe(true);
    done.click();
    await tick();
    expect((await app.store!.listEvents()).filter((e) => e.type === 'save')).toHaveLength(1);
    render(null, host);
  });

  it('is already disabled when the series is paused', () => {
    app.engineState!.series.tiny = { lastIndex: 2, lastAt: 1, paused: true, finished: false };
    const host = mount();
    const btn = host.querySelector<HTMLButtonElement>('.series-bar-btn')!;
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute('aria-label')).toBe('Saved for later');
    render(null, host);
  });
});
