// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { app, endDwell, beginDwell, isRead, markRead, notify, record, replan, subscribe } from '@/app/state';
import { blankState, createFallbackEngine } from '@/app/fallbackEngine';
import { createMemoryStore } from '@/app/fallbackStore';
import { deps, meta } from './fixtures';

const cards = [
  meta('math.area.topic.a'),
  meta('math.area.topic.b'),
  meta('bio.area.topic.a', { domain: 'bio', topic: 'bio.area.topic' }),
];

beforeEach(async () => {
  localStorage.clear();
  const store = createMemoryStore();
  await store.init();
  app.store = store;
  app.engine = createFallbackEngine(deps(cards), blankState('dev'));
  app.engineState = app.engine.state();
  app.feed = [];
  app.cursor = 0;
  app.cards = {};
  app.toast = null;
});

describe('app store', () => {
  it('plans a feed and keeps the current card at the head after an event', async () => {
    replan();
    const first = app.feed[0].id;
    await record('like', { card: first });
    expect(app.feed[0].id).toBe(first);
  });

  it('writes every event to the store and folds it into the engine', async () => {
    replan();
    const id = app.feed[0].id;
    await record('save', { card: id });
    const events = await app.store!.listEvents();
    expect(events.map((e) => e.type)).toContain('save');
    expect(app.engine!.state().saved).toContain(id);
  });

  it('does not count a passed card as read; the Read button does', async () => {
    replan();
    const id = app.feed[0].id;
    beginDwell(id);
    await new Promise((r) => setTimeout(r, 900));
    endDwell();
    await new Promise((r) => setTimeout(r, 30));
    let events = await app.store!.listEvents();
    expect(events.find((e) => e.type === 'view' && e.card === id)).toBeUndefined();
    expect(isRead(id)).toBe(false);

    beginDwell(id);
    await new Promise((r) => setTimeout(r, 600));
    await markRead(id);
    await new Promise((r) => setTimeout(r, 30));
    events = await app.store!.listEvents();
    const view = events.find((e) => e.type === 'view' && e.card === id);
    expect(view?.data?.confirmed).toBe(true);
    expect(Number(view?.data?.dwellMs)).toBeGreaterThan(300);
    expect(isRead(id)).toBe(true);
    // idempotent
    expect(await markRead(id)).toBeNull();
  });

  it('notifies subscribers', async () => {
    let calls = 0;
    const off = subscribe(() => calls++);
    notify();
    await new Promise((r) => setTimeout(r, 5));
    off();
    expect(calls).toBe(1);
  });
});
