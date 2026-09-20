/**
 * In-memory Store used when `src/store` is missing or IndexedDB is unavailable
 * (private mode). The last 500 events and the local key/value bag are mirrored
 * into localStorage so a reload does not lose the session. See SYNC.md.
 */
import type { Event, Snapshot, Store } from '@/types';

const EVENTS_KEY = 'cultivar:events';
const LOCAL_KEY = 'cultivar:local';
const SNAP_KEY = 'cultivar:snapshot';
const MAX_EVENTS = 500;

function readLs<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeLs(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or private mode: memory only */
  }
}

export function createMemoryStore(): Store & { degraded: true } {
  let events: Event[] = readLs<Event[]>(EVENTS_KEY, []);
  let local: Record<string, unknown> = readLs<Record<string, unknown>>(LOCAL_KEY, {});
  let snapshot: Snapshot | null = readLs<Snapshot | null>(SNAP_KEY, null);

  return {
    degraded: true,
    async init() {
      /* nothing to open */
    },
    async appendEvent(ev) {
      events.push(ev);
      if (events.length > MAX_EVENTS) events = events.slice(-MAX_EVENTS);
      writeLs(EVENTS_KEY, events);
    },
    async listEvents(sinceT) {
      return sinceT === undefined ? [...events] : events.filter((e) => e.t > sinceT);
    },
    async getSnapshot() {
      return snapshot;
    },
    async putSnapshot(s) {
      snapshot = s;
      writeLs(SNAP_KEY, s);
    },
    async getLocal<T>(key: string) {
      return local[key] as T | undefined;
    },
    async setLocal<T>(key: string, v: T) {
      local[key] = v;
      writeLs(LOCAL_KEY, local);
    },
    async exportBackup() {
      const payload = {
        app: 'cultivar',
        exportedAt: new Date().toISOString(),
        deviceId: String(local.deviceId ?? ''),
        events,
      };
      return new Blob([JSON.stringify(payload)], { type: 'application/json' });
    },
    async importBackup(file) {
      const text = await file.text();
      const parsed = JSON.parse(text) as { events?: Event[] };
      const known = new Set(events.map((e) => e.id));
      const incoming = (parsed.events ?? []).filter((e) => e && e.id && !known.has(e.id));
      events = [...events, ...incoming].sort((a, b) => a.t - b.t).slice(-MAX_EVENTS);
      writeLs(EVENTS_KEY, events);
      return { events: incoming.length };
    },
    async clearAll() {
      events = [];
      local = {};
      snapshot = null;
      try {
        localStorage.removeItem(EVENTS_KEY);
        localStorage.removeItem(LOCAL_KEY);
        localStorage.removeItem(SNAP_KEY);
      } catch {
        /* ignore */
      }
    },
  };
}
