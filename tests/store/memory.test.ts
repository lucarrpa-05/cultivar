import { afterEach, describe, expect, it } from 'vitest';
import { RING_LIMIT, createStore } from '../../src/store/index';
import type { Event } from '../../src/types';
import { T0, fakeLocalStorage, makeEvents, makeState, uniqueDbName } from './helpers';

// No `fake-indexeddb/auto` in this file: IndexedDB genuinely does not exist here,
// which is exactly the private-mode situation the fallback is for.

afterEach(() => {
  delete (globalThis as { indexedDB?: unknown }).indexedDB;
});

describe('store (memory fallback)', () => {
  it('falls back when IndexedDB is missing and says so', async () => {
    const store = createStore({ dbName: uniqueDbName(), localStorage: fakeLocalStorage() });
    await store.init();

    expect(store.mode).toBe('memory');
    expect(store.lastError).toMatch(/IndexedDB unavailable/);

    await store.appendEvents(makeEvents(3));
    expect(await store.countEvents()).toBe(3);
    expect((await store.listEvents(T0)).map((e) => e.id)).toEqual(['e0001', 'e0002']);
  });

  it('falls back when IndexedDB throws on open', async () => {
    (globalThis as { indexedDB?: unknown }).indexedDB = {
      open() {
        throw new DOMException('storage is blocked', 'SecurityError');
      },
    };
    const store = createStore({ dbName: uniqueDbName(), localStorage: fakeLocalStorage() });
    await store.init();

    expect(store.mode).toBe('memory');
    expect(store.lastError).toMatch(/storage is blocked/);
    await store.appendEvent(makeEvents(1)[0]);
    expect(await store.countEvents()).toBe(1);
  });

  it('keeps the last 500 events in a localStorage ring buffer and rehydrates', async () => {
    const ls = fakeLocalStorage();
    const store = createStore({ dbName: uniqueDbName(), localStorage: ls });
    await store.init();
    await store.appendEvents(makeEvents(RING_LIMIT + 100));

    const ring = JSON.parse(ls.getItem('cultivar:events') ?? '[]') as Event[];
    expect(ring).toHaveLength(RING_LIMIT);
    expect(ring[0].id).toBe('e0100');
    expect(ring[RING_LIMIT - 1].id).toBe('e0599');

    // A reload: same localStorage, new store.
    const reloaded = createStore({ dbName: uniqueDbName(), localStorage: ls });
    await reloaded.init();
    expect(await reloaded.countEvents()).toBe(RING_LIMIT);
  });

  it('mirrors local keys and the snapshot, but never the sync token', async () => {
    const ls = fakeLocalStorage();
    const store = createStore({ dbName: uniqueDbName(), localStorage: ls });
    await store.init();

    await store.setLocal('theme', 'light');
    await store.setLocal('syncConfig', { owner: 'reader', repo: 'cultivar-data', token: 'ghp_SECRET_TOKEN_VALUE' });
    await store.putSnapshot({ state: makeState({ eventCount: 12 }), savedAt: T0 });

    const mirrored = JSON.stringify([...ls.map.entries()]);
    expect(mirrored).not.toContain('ghp_SECRET_TOKEN_VALUE');
    expect(JSON.parse(ls.getItem('cultivar:local') ?? '{}')).toMatchObject({ theme: 'light' });
    expect(ls.getItem('cultivar:snapshot')).toContain('"eventCount":12');

    // Still readable in this session — only the mirror omits it.
    expect(await store.getLocal<{ token: string }>('syncConfig')).toMatchObject({ token: 'ghp_SECRET_TOKEN_VALUE' });

    const reloaded = createStore({ dbName: uniqueDbName(), localStorage: ls });
    await reloaded.init();
    expect(await reloaded.getLocal('syncConfig')).toBeUndefined();
    expect(await reloaded.getLocal('theme')).toBe('light');
    expect((await reloaded.getSnapshot())?.state.eventCount).toBe(12);
  });

  it('works with no localStorage at all', async () => {
    const store = createStore({ dbName: uniqueDbName(), localStorage: null });
    await store.init();
    await store.appendEvents(makeEvents(2));

    expect(store.mode).toBe('memory');
    expect(await store.countEvents()).toBe(2);
    const blob = await store.exportBackup();
    expect(JSON.parse(await blob.text()).events).toHaveLength(2);
    await store.clearAll();
    expect(await store.countEvents()).toBe(0);
  });

  it('exports and imports in memory mode', async () => {
    const ls = fakeLocalStorage();
    const a = createStore({ dbName: uniqueDbName(), localStorage: ls, now: () => T0 });
    await a.init();
    await a.appendEvents(makeEvents(4));
    const blob = await a.exportBackup();

    const b = createStore({ dbName: uniqueDbName(), localStorage: fakeLocalStorage() });
    await b.init();
    expect(await b.importBackup(blob)).toEqual({ events: 4 });
    expect(await b.countEvents()).toBe(4);
  });
});
