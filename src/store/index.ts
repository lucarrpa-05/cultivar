/**
 * Cultivar — local storage (SYNC.md §"Local storage").
 *
 * IndexedDB via `idb`, database `cultivar` v1:
 *   events     key `id`, index `byT` on `t`
 *   snapshots  key `'latest'` -> { state, savedAt }
 *   local      key/value, never synced: deviceId, syncConfig, theme, lastPull, lastPush
 *
 * Every call is wrapped: if IndexedDB is missing or throws (private mode, a
 * browser that blocks storage), the store degrades once to an in-memory map
 * mirrored into a localStorage ring buffer of the last 500 events, sets
 * `store.mode = 'memory'` and keeps working. Nothing thrown from here should
 * ever reach the UI as a crash.
 */

import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Event, Settings, Snapshot, Store } from '../types';
import { ensureDeviceId } from './ids';

export const DB_NAME = 'cultivar';
export const DB_VERSION = 1;
export const SNAPSHOT_KEY = 'latest';
/** How many events the localStorage fallback keeps (SYNC.md). */
export const RING_LIMIT = 500;

const LS_PREFIX = 'cultivar:';
const LS_EVENTS = `${LS_PREFIX}events`;
const LS_SNAPSHOT = `${LS_PREFIX}snapshot`;
const LS_LOCAL = `${LS_PREFIX}local`;

/**
 * Keys that are never mirrored into localStorage: the token lives in IndexedDB
 * only (SYNC.md §"Token setup"). In memory mode sync therefore has to be
 * reconfigured after a reload — deliberate, that mode is already ephemeral.
 */
const NEVER_MIRRORED = new Set(['syncConfig']);

export type StoreMode = 'idb' | 'memory';

/** The shape `exportBackup()` produces. Never contains the token. */
export interface BackupFile {
  app: 'cultivar';
  version: 1;
  exportedAt: string;
  deviceId?: string;
  settings?: Settings;
  events: Event[];
}

export interface LocalStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface StoreOptions {
  /** Skip IndexedDB entirely (tests, or a caller that knows better). */
  forceMemory?: boolean;
  /** Override the localStorage used by the fallback; `null` disables mirroring. */
  localStorage?: LocalStorageLike | null;
  now?: () => number;
  /** Database name; tests use a unique one per file. */
  dbName?: string;
}

/** `Store` plus the few extras the UI and sync need. Additive — `Store` is unchanged. */
export interface CultivarStore extends Store {
  /** `'memory'` means IndexedDB was unavailable; show the Settings notice. */
  readonly mode: StoreMode;
  /** Why it degraded, for that same notice. Never contains the token. */
  readonly lastError: string | undefined;
  /** For the snapshot-vs-log consistency check at startup. */
  countEvents(): Promise<number>;
  /** Bulk append (import, pull, restore). Returns how many were new. */
  appendEvents(events: Event[]): Promise<number>;
  /** `local.deviceId`, minted and persisted on first use. */
  deviceId(): Promise<string>;
  /** Wipe events + snapshot only (token, settings and device id survive). */
  clearEvents(): Promise<void>;
}

interface CultivarDB extends DBSchema {
  events: { key: string; value: Event; indexes: { byT: number } };
  snapshots: { key: string; value: Snapshot };
  local: { key: string; value: unknown };
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

/** Keep only the contract fields, and make `data` structured-clone + JSON safe. */
function normalizeEvent(raw: unknown): Event | null {
  if (!isObj(raw)) return null;
  const id = typeof raw.id === 'string' ? raw.id : '';
  const t = typeof raw.t === 'number' && Number.isFinite(raw.t) ? raw.t : NaN;
  const type = typeof raw.type === 'string' ? raw.type : '';
  if (!id || !type || Number.isNaN(t)) return null;

  const ev: Event = { id, t, type: type as Event['type'], s: typeof raw.s === 'string' ? raw.s : '' };
  if (typeof raw.card === 'string') ev.card = raw.card;
  if (typeof raw.topic === 'string') ev.topic = raw.topic;
  if (isObj(raw.data)) {
    try {
      ev.data = JSON.parse(JSON.stringify(raw.data)) as Record<string, unknown>;
    } catch {
      /* unserializable payload: drop it rather than poison the log */
    }
  }
  return ev;
}

function byTThenId(a: Event, b: Event): number {
  return a.t - b.t || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}

function sortEvents(list: Event[]): Event[] {
  return list.slice().sort(byTThenId);
}

function describe(err: unknown): string {
  if (err instanceof Error) return err.message || err.name;
  return String(err);
}

export function createStore(opts: StoreOptions = {}): CultivarStore {
  const now = opts.now ?? (() => Date.now());
  const dbName = opts.dbName ?? DB_NAME;

  let mode: StoreMode = opts.forceMemory ? 'memory' : 'idb';
  let lastError: string | undefined;
  let db: IDBPDatabase<CultivarDB> | null = null;
  let opening: Promise<IDBPDatabase<CultivarDB> | null> | null = null;
  let hydrated = false;

  const mem = {
    events: new Map<string, Event>(),
    snapshot: null as Snapshot | null,
    local: new Map<string, unknown>(),
  };

  // ── localStorage mirror (fallback mode only) ─────────────────────────────
  const ls: LocalStorageLike | null = (() => {
    if (opts.localStorage !== undefined) return opts.localStorage;
    try {
      return (globalThis as { localStorage?: LocalStorageLike }).localStorage ?? null;
    } catch {
      return null;
    }
  })();

  function lsRead<T>(key: string): T | null {
    if (!ls) return null;
    try {
      const raw = ls.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  function lsWrite(key: string, value: unknown): void {
    if (!ls) return;
    try {
      ls.setItem(key, JSON.stringify(value));
    } catch (err) {
      lastError = `localStorage is full (${describe(err)})`;
    }
  }

  function persistEvents(): void {
    if (!ls) return;
    const all = sortEvents([...mem.events.values()]);
    const ring = all.slice(-RING_LIMIT);
    try {
      ls.setItem(LS_EVENTS, JSON.stringify(ring));
    } catch {
      try {
        ls.setItem(LS_EVENTS, JSON.stringify(ring.slice(-100)));
      } catch (err) {
        lastError = `localStorage is full (${describe(err)})`;
      }
    }
  }

  function persistLocal(): void {
    if (!ls) return;
    const plain: Record<string, unknown> = {};
    for (const [k, v] of mem.local) if (!NEVER_MIRRORED.has(k)) plain[k] = v;
    lsWrite(LS_LOCAL, plain);
  }

  function hydrate(): void {
    if (hydrated) return;
    hydrated = true;
    for (const ev of lsRead<Event[]>(LS_EVENTS) ?? []) {
      const clean = normalizeEvent(ev);
      if (clean) mem.events.set(clean.id, clean);
    }
    const snap = lsRead<Snapshot>(LS_SNAPSHOT);
    if (snap && isObj(snap) && isObj(snap.state)) mem.snapshot = snap;
    const local = lsRead<Record<string, unknown>>(LS_LOCAL);
    if (isObj(local)) for (const [k, v] of Object.entries(local)) mem.local.set(k, v);
  }

  // ── IndexedDB ────────────────────────────────────────────────────────────
  function degrade(err: unknown, where: string): void {
    if (mode !== 'memory') {
      mode = 'memory';
      lastError = `IndexedDB unavailable (${where}: ${describe(err)}) — using in-memory storage.`;
    }
    try {
      db?.close();
    } catch {
      /* ignore */
    }
    db = null;
    opening = null;
    hydrate();
  }

  async function ensureDb(): Promise<IDBPDatabase<CultivarDB> | null> {
    if (mode === 'memory') {
      hydrate();
      return null;
    }
    if (db) return db;
    if (!opening) {
      opening = (async () => {
        try {
          const factory = (globalThis as { indexedDB?: IDBFactory }).indexedDB;
          if (!factory) throw new Error('no indexedDB in this context');
          const handle = await openDB<CultivarDB>(dbName, DB_VERSION, {
            upgrade(d) {
              if (!d.objectStoreNames.contains('events')) {
                const s = d.createObjectStore('events', { keyPath: 'id' });
                s.createIndex('byT', 't');
              }
              if (!d.objectStoreNames.contains('snapshots')) d.createObjectStore('snapshots');
              if (!d.objectStoreNames.contains('local')) d.createObjectStore('local');
            },
            blocking() {
              // Another tab wants to upgrade: let go, reopen on the next call.
              try {
                db?.close();
              } catch {
                /* ignore */
              }
              db = null;
              opening = null;
            },
            terminated() {
              db = null;
              opening = null;
            },
          });
          db = handle;
          return handle;
        } catch (err) {
          degrade(err, 'open');
          return null;
        }
      })();
    }
    return opening;
  }

  /** Run `op` against IndexedDB; on any failure degrade once and run `fallback`. */
  async function useDb<T>(
    op: (handle: IDBPDatabase<CultivarDB>) => Promise<T>,
    fallback: () => T | Promise<T>,
  ): Promise<T> {
    const handle = await ensureDb();
    if (handle) {
      try {
        return await op(handle);
      } catch (err) {
        degrade(err, 'tx');
      }
    }
    hydrate();
    return fallback();
  }

  // ── Store ────────────────────────────────────────────────────────────────
  async function getLocal<T>(key: string): Promise<T | undefined> {
    return useDb(
      async (d) => (await d.get('local', key)) as T | undefined,
      () => mem.local.get(key) as T | undefined,
    );
  }

  async function setLocal<T>(key: string, v: T): Promise<void> {
    await useDb(
      async (d) => {
        await d.put('local', v, key);
      },
      () => {
        mem.local.set(key, v);
        persistLocal();
      },
    );
  }

  async function listEvents(sinceT?: number): Promise<Event[]> {
    const bounded = typeof sinceT === 'number' && Number.isFinite(sinceT);
    return useDb(
      async (d) => {
        const KR = (globalThis as { IDBKeyRange?: typeof IDBKeyRange }).IDBKeyRange;
        if (bounded && KR) {
          return sortEvents(await d.getAllFromIndex('events', 'byT', KR.lowerBound(sinceT as number, true)));
        }
        const all = await d.getAllFromIndex('events', 'byT');
        return sortEvents(bounded ? all.filter((e) => e.t > (sinceT as number)) : all);
      },
      () => {
        const all = [...mem.events.values()];
        return sortEvents(bounded ? all.filter((e) => e.t > (sinceT as number)) : all);
      },
    );
  }

  async function appendEvents(events: Event[]): Promise<number> {
    const clean = events.map(normalizeEvent).filter((e): e is Event => e !== null);
    if (clean.length === 0) return 0;
    return useDb(
      async (d) => {
        const tx = d.transaction('events', 'readwrite');
        let added = 0;
        for (const ev of clean) {
          // Idempotent by id: first write wins, a replay never rewrites history.
          if (!(await tx.store.get(ev.id))) {
            await tx.store.put(ev);
            added += 1;
          }
        }
        await tx.done;
        return added;
      },
      () => {
        let added = 0;
        for (const ev of clean) {
          if (!mem.events.has(ev.id)) {
            mem.events.set(ev.id, ev);
            added += 1;
          }
        }
        if (added > 0) persistEvents();
        return added;
      },
    );
  }

  const store: CultivarStore = {
    get mode() {
      return mode;
    },
    get lastError() {
      return lastError;
    },

    async init(): Promise<void> {
      await ensureDb();
      if (mode === 'memory') hydrate();
      await store.deviceId();
    },

    async appendEvent(ev: Event): Promise<void> {
      await appendEvents([ev]);
    },

    appendEvents,
    listEvents,

    async countEvents(): Promise<number> {
      return useDb(
        (d) => d.count('events'),
        () => mem.events.size,
      );
    },

    async getSnapshot(): Promise<Snapshot | null> {
      return useDb(
        async (d) => (await d.get('snapshots', SNAPSHOT_KEY)) ?? null,
        () => mem.snapshot,
      );
    },

    async putSnapshot(s: Snapshot): Promise<void> {
      await useDb(
        async (d) => {
          await d.put('snapshots', s, SNAPSHOT_KEY);
        },
        () => {
          mem.snapshot = s;
          lsWrite(LS_SNAPSHOT, s);
        },
      );
    },

    getLocal,
    setLocal,

    async deviceId(): Promise<string> {
      return ensureDeviceId(store);
    },

    async exportBackup(): Promise<Blob> {
      const [events, deviceId, snapshot] = await Promise.all([listEvents(), getLocal<string>('deviceId'), store.getSnapshot()]);
      const payload: BackupFile = {
        app: 'cultivar',
        version: 1,
        exportedAt: new Date(now()).toISOString(),
        deviceId,
        // Settings only — the token lives in `local` and is never read here.
        settings: snapshot?.state?.settings,
        events,
      };
      return new Blob([JSON.stringify(payload, null, 1)], { type: 'application/json' });
    },

    async importBackup(file: Blob): Promise<{ events: number }> {
      let text = '';
      try {
        text = typeof file?.text === 'function' ? await file.text() : String(file ?? '');
      } catch (err) {
        throw new Error(`Could not read that file (${describe(err)}).`);
      }
      let parsed: unknown;
      try {
        parsed = JSON.parse(text);
      } catch {
        throw new Error('That file is not a Cultivar backup (invalid JSON).');
      }
      const raw = Array.isArray(parsed)
        ? parsed
        : isObj(parsed) && Array.isArray(parsed.events)
          ? parsed.events
          : null;
      if (!raw) throw new Error('That file is not a Cultivar backup (no events).');
      // Union by id: importing the same backup twice adds nothing.
      const added = await appendEvents(raw as Event[]);
      return { events: added };
    },

    async clearEvents(): Promise<void> {
      await useDb(
        async (d) => {
          const tx = d.transaction(['events', 'snapshots'], 'readwrite');
          await Promise.all([tx.objectStore('events').clear(), tx.objectStore('snapshots').clear(), tx.done]);
        },
        () => {
          mem.events.clear();
          mem.snapshot = null;
        },
      );
      if (ls) {
        try {
          ls.removeItem(LS_EVENTS);
          ls.removeItem(LS_SNAPSHOT);
        } catch {
          /* ignore */
        }
      }
    },

    async clearAll(): Promise<void> {
      // Survives the wipe so meta.device stays stable for the data repo.
      const keepDeviceId = await getLocal<string>('deviceId');
      await useDb(
        async (d) => {
          const tx = d.transaction(['events', 'snapshots', 'local'], 'readwrite');
          await Promise.all([
            tx.objectStore('events').clear(),
            tx.objectStore('snapshots').clear(),
            tx.objectStore('local').clear(),
            tx.done,
          ]);
        },
        () => {
          mem.events.clear();
          mem.snapshot = null;
          mem.local.clear();
        },
      );
      if (ls) {
        try {
          ls.removeItem(LS_EVENTS);
          ls.removeItem(LS_SNAPSHOT);
          ls.removeItem(LS_LOCAL);
        } catch {
          /* ignore */
        }
      }
      if (keepDeviceId) await setLocal('deviceId', keepDeviceId);
    },
  };

  return store;
}

/** `cultivar-backup-2026-09-19.json` — the filename for the exported Blob. */
export function backupFilename(t: number = Date.now()): string {
  return `cultivar-backup-${new Date(t).toISOString().slice(0, 10)}.json`;
}

export { newEventId, newSessionId, newDeviceId, newQuestionId, ensureDeviceId, monthKey } from './ids';
export type { Event, Snapshot, Store } from '../types';
