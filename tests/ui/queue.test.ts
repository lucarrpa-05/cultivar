// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { app, clearQueue, enqueue, isSynthetic, record, replan } from '@/app/state';
import { blankState, createFallbackEngine } from '@/app/fallbackEngine';
import { createMemoryStore } from '@/app/fallbackStore';
import { loadIndex, resetContentCaches } from '@/content/loader';
import { deps, meta } from './fixtures';

const cards = [
  meta('math.area.topic.a'),
  meta('math.area.topic.b'),
  meta('math.area.topic.c'),
  meta('bio.area.topic.a', { domain: 'bio', topic: 'bio.area.topic' }),
  meta('bio.area.topic.b', { domain: 'bio', topic: 'bio.area.topic' }),
];

beforeEach(async () => {
  resetContentCaches();
  const index = { builtAt: '2026-09-01T00:00:00Z', count: cards.length, cards };
  (globalThis as unknown as { fetch: unknown }).fetch = async (url: string) => ({
    ok: String(url).endsWith('index.json'),
    status: 200,
    json: async () => index,
  });
  await loadIndex();
  const store = createMemoryStore();
  await store.init();
  app.store = store;
  app.engine = createFallbackEngine(deps(cards), blankState('dev'));
  app.engineState = app.engine.state();
  app.feed = [];
  app.cursor = 0;
  app.cards = {};
  app.queue = [];
  app.scrollToIndex = null;
});

describe('feed queue', () => {
  it('places queued cards right after the current one and survives a re-plan', async () => {
    replan();
    const current = app.feed[0].id;
    const wanted = cards.map((c) => c.id).filter((id) => id !== current).slice(0, 2);
    expect(enqueue(wanted, 'progress', ['From a shelf'], false)).toBe(2);
    expect(app.feed.slice(1, 3).map((c) => c.id)).toEqual(wanted);
    expect(app.feed[1].why).toEqual(['From a shelf']);

    await record('like', { card: current });
    expect(app.feed[0].id).toBe(current);
    expect(app.feed.slice(1, 3).map((c) => c.id)).toEqual(wanted);
    // No duplicates further down the feed.
    expect(app.feed.filter((c) => wanted.includes(c.id))).toHaveLength(2);
  });

  it('drops queued cards once the reader has reached them', () => {
    replan();
    const current = app.feed[0].id;
    const wanted = cards.map((c) => c.id).filter((id) => id !== current).slice(0, 2);
    enqueue(wanted, 'progress', [], false);
    app.cursor = 2; // reader moved past both
    replan();
    expect(app.queue).toHaveLength(0);
    expect(app.feed.slice(0, 3).map((c) => c.id)).toEqual([current, ...wanted]);
  });

  it('ignores unknown ids, the current card and repeats', () => {
    replan();
    const current = app.feed[0].id;
    const other = cards.find((c) => c.id !== current)!.id;
    expect(enqueue([current, 'nope.nope', other, other], 'progress', [], false)).toBe(1);
    expect(enqueue([other], 'progress', [], false)).toBe(0);
    expect(app.queue).toHaveLength(1);
  });

  it('clearQueue removes everything not yet reached', () => {
    replan();
    const current = app.feed[0].id;
    const wanted = cards.map((c) => c.id).filter((id) => id !== current).slice(0, 3);
    enqueue(wanted, 'progress', [], false);
    clearQueue();
    expect(app.queue).toHaveLength(0);
    expect(app.feed[0].id).toBe(current);
    expect(app.feed.slice(1, 4).map((c) => c.id)).not.toEqual(wanted);
  });

  it('knows which ids are synthetic', () => {
    expect(isSynthetic('milestone:goal-reached')).toBe(true);
    expect(isSynthetic('today:2026-09-27')).toBe(true);
    expect(isSynthetic('math.area.topic.a')).toBe(false);
  });
});
