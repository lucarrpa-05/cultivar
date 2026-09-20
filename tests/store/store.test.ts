import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { backupFilename, createStore, type BackupFile, type CultivarStore } from '../../src/store/index';
import type { Snapshot } from '../../src/types';
import { T0, makeEvent, makeEvents, makeState, uniqueDbName } from './helpers';

async function freshStore(): Promise<CultivarStore> {
  const store = createStore({ dbName: uniqueDbName(), localStorage: null, now: () => T0 });
  await store.init();
  return store;
}

describe('store (IndexedDB)', () => {
  let store: CultivarStore;

  beforeEach(async () => {
    store = await freshStore();
  });

  it('opens IndexedDB and reports idb mode', () => {
    expect(store.mode).toBe('idb');
    expect(store.lastError).toBeUndefined();
  });

  it('appends and lists events in time order', async () => {
    await store.appendEvent(makeEvent({ id: 'b', t: T0 + 200 }));
    await store.appendEvent(makeEvent({ id: 'a', t: T0 + 100 }));
    await store.appendEvent(makeEvent({ id: 'c', t: T0 + 300 }));

    const all = await store.listEvents();
    expect(all.map((e) => e.id)).toEqual(['a', 'b', 'c']);
    expect(await store.countEvents()).toBe(3);
  });

  it('is idempotent by id — a re-append never rewrites history', async () => {
    const first = makeEvent({ id: 'dup', t: T0, card: 'original' });
    await store.appendEvent(first);
    await store.appendEvent({ ...first, card: 'rewritten', data: { sneaky: true } });

    const all = await store.listEvents();
    expect(all).toHaveLength(1);
    expect(all[0].card).toBe('original');
    expect(all[0].data).toBeUndefined();
  });

  it('uses the byT index for listEvents(sinceT), exclusive', async () => {
    await store.appendEvents(makeEvents(5));
    const since = await store.listEvents(T0 + 1000);
    expect(since.map((e) => e.id)).toEqual(['e0002', 'e0003', 'e0004']);
    expect(await store.listEvents(T0 + 10_000)).toEqual([]);
    expect(await store.listEvents(0)).toHaveLength(5);
  });

  it('keeps only contract fields and drops unserializable data', async () => {
    const dirty = {
      id: 'x1',
      t: T0,
      type: 'like',
      s: 'sess',
      card: 'c1',
      topic: 'math.topology',
      data: { grade: 3, fn: () => 1 },
      bogus: 'nope',
    };
    await store.appendEvent(dirty as never);
    const [ev] = await store.listEvents();
    expect(ev).toEqual({ id: 'x1', t: T0, type: 'like', s: 'sess', card: 'c1', topic: 'math.topology', data: { grade: 3 } });
  });

  it('rejects malformed events instead of storing them', async () => {
    await store.appendEvent({ t: T0, type: 'view' } as never);
    await store.appendEvent({ id: 'no-time', type: 'view' } as never);
    expect(await store.countEvents()).toBe(0);
  });

  it('roundtrips the snapshot', async () => {
    expect(await store.getSnapshot()).toBeNull();
    const snap: Snapshot = { state: makeState({ eventCount: 7 }), savedAt: T0 };
    await store.putSnapshot(snap);
    const back = await store.getSnapshot();
    expect(back?.savedAt).toBe(T0);
    expect(back?.state.eventCount).toBe(7);

    await store.putSnapshot({ state: makeState({ eventCount: 9 }), savedAt: T0 + 1 });
    expect((await store.getSnapshot())?.state.eventCount).toBe(9);
  });

  it('stores local key/value and mints a stable device id', async () => {
    const id = await store.deviceId();
    expect(id).toMatch(/^[0-9a-z]{12}$/);
    expect(await store.deviceId()).toBe(id);

    await store.setLocal('theme', 'dark');
    expect(await store.getLocal<string>('theme')).toBe('dark');
    expect(await store.getLocal('missing')).toBeUndefined();
  });

  it('exports a backup without the token and imports it as a union', async () => {
    await store.appendEvents(makeEvents(3));
    await store.putSnapshot({ state: makeState(), savedAt: T0 });
    await store.setLocal('syncConfig', { owner: 'reader', repo: 'cultivar-data', token: 'ghp_SECRET_TOKEN_VALUE' });

    const blob = await store.exportBackup();
    expect(blob.type).toBe('application/json');
    const text = await blob.text();
    expect(text).not.toContain('ghp_SECRET_TOKEN_VALUE');
    expect(text).not.toContain('token');

    const backup = JSON.parse(text) as BackupFile;
    expect(backup.app).toBe('cultivar');
    expect(backup.version).toBe(1);
    expect(backup.exportedAt).toBe(new Date(T0).toISOString());
    expect(backup.deviceId).toBe(await store.deviceId());
    expect(backup.settings?.spanishShare).toBe(0.12);
    expect(backup.events).toHaveLength(3);

    // Import into a second device: everything is new.
    const other = await freshStore();
    await other.appendEvent(makeEvent({ id: 'e0000', t: T0, card: 'card-0' })); // already known
    expect(await other.importBackup(blob)).toEqual({ events: 2 });
    expect(await other.countEvents()).toBe(3);
    // Re-importing the same backup adds nothing.
    expect(await other.importBackup(blob)).toEqual({ events: 0 });
  });

  it('imports a bare event array and rejects junk', async () => {
    const blob = new Blob([JSON.stringify(makeEvents(2, T0, 'z'))], { type: 'application/json' });
    expect(await store.importBackup(blob)).toEqual({ events: 2 });

    await expect(store.importBackup(new Blob(['not json']))).rejects.toThrow(/not a Cultivar backup/);
    await expect(store.importBackup(new Blob([JSON.stringify({ app: 'cultivar' })]))).rejects.toThrow(/no events/);
  });

  it('names the backup file by date', () => {
    expect(backupFilename(T0)).toBe('cultivar-backup-2026-09-19.json');
  });

  it('clears everything but keeps the device id', async () => {
    const id = await store.deviceId();
    await store.appendEvents(makeEvents(4));
    await store.putSnapshot({ state: makeState(), savedAt: T0 });
    await store.setLocal('theme', 'light');

    await store.clearAll();

    expect(await store.countEvents()).toBe(0);
    expect(await store.getSnapshot()).toBeNull();
    expect(await store.getLocal('theme')).toBeUndefined();
    expect(await store.deviceId()).toBe(id);
  });

  it('survives a reopen of the same database', async () => {
    const dbName = uniqueDbName();
    const a = createStore({ dbName, localStorage: null });
    await a.init();
    await a.appendEvents(makeEvents(2));
    const deviceId = await a.deviceId();

    const b = createStore({ dbName, localStorage: null });
    await b.init();
    expect(await b.countEvents()).toBe(2);
    expect(await b.deviceId()).toBe(deviceId);
  });
});
