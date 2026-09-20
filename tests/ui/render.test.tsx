// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'preact';
import { app, hydrateAround, replan, setTab } from '@/app/state';
import { blankState, createFallbackEngine } from '@/app/fallbackEngine';
import { createMemoryStore } from '@/app/fallbackStore';
import { loadIndex, loadTaxonomy, resetContentCaches } from '@/content/loader';
import { App } from '@/ui/App';
import { deps, meta, taxonomy } from './fixtures';

const cards = [
  meta('math.area.topic.a', { hasRigor: true, hook: 'A curiosity gap.' }),
  meta('bio.area.topic.a', { domain: 'bio', topic: 'bio.area.topic' }),
];

const body = (id: string, over: Record<string, unknown> = {}) => ({
  ...cards.find((c) => c.id === id)!,
  body: 'The **intuition** with a formula $x^2$ in it.',
  rigor: null,
  recall: null,
  sources: [{ title: 'Topology §26', author: 'Munkres', type: 'book', url: 'https://example.com/x' }],
  ...over,
});

const shards: Record<string, unknown> = {
  math: { 'math.area.topic.a': body('math.area.topic.a', { rigor: 'Precise statement.' }) },
  bio: { 'bio.area.topic.a': body('bio.area.topic.a') },
};

beforeAll(() => {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IO;

  vi.stubGlobal('fetch', async (url: string) => {
    const path = String(url);
    const shard = /cards\/(\w+)\.json$/.exec(path)?.[1];
    const payload = path.endsWith('taxonomy.json')
      ? taxonomy
      : path.endsWith('index.json')
        ? { builtAt: '2026-09-01T00:00:00Z', count: cards.length, cards }
        : shard
          ? (shards[shard] ?? null)
          : null;
    return {
      ok: payload !== null,
      status: payload ? 200 : 404,
      json: async () => payload,
      text: async () => JSON.stringify(payload),
    } as unknown as Response;
  });
});

beforeEach(async () => {
  resetContentCaches();
  const store = createMemoryStore();
  await store.init();
  app.store = store;
  app.taxonomy = await loadTaxonomy();
  await loadIndex();
  app.engine = createFallbackEngine(deps(cards), blankState('dev'));
  app.engineState = app.engine.state();
  app.boot = 'ready';
  app.feed = [];
  app.cursor = 0;
  app.cards = {};
  setTab('feed');
});

function mount() {
  const host = document.createElement('div');
  document.body.append(host);
  render(<App />, host);
  return host;
}

describe('App renders', () => {
  it('shows the first card with chips, sources and the next title peeking', async () => {
    replan();
    await hydrateAround(0);
    const host = mount();
    await new Promise((r) => setTimeout(r, 30));

    const text = host.textContent ?? '';
    expect(text).toContain('Title bio.area.topic.a'); // first card (domains interleave)
    expect(text).toContain('Biology');
    expect(text).toContain('Munkres');
    expect(text).toContain('Title math.area.topic.a'); // peek of the next card
    expect(host.querySelector('[aria-label="Like"]')).toBeTruthy();
    expect(host.querySelectorAll('.tab')).toHaveLength(4);
    render(null, host);
  });

  it('gates the rigor layer until the card has been read', async () => {
    replan();
    await hydrateAround(0);
    const host = mount();
    await new Promise((r) => setTimeout(r, 30));
    expect(host.textContent).toContain('Show me the rigor');
    expect(host.querySelector('.rigor-btn.is-locked')).toBeTruthy();
    render(null, host);
  });

  it('shows the empty state when there is no content', async () => {
    app.boot = 'empty';
    app.feed = [];
    const host = mount();
    await new Promise((r) => setTimeout(r, 10));
    expect(host.textContent).toContain('Connect once to download the library');
    render(null, host);
  });
});
