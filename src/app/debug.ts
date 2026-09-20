/**
 * `window.__cultivar` — a read-mostly view of the running app for end-to-end
 * tests and for poking at the engine from a phone's devtools.
 *
 * Off by default in a production build: it installs only in `vite dev` or when
 * the URL carries `?debug=1`. Nothing here is imported by the UI, so tree
 * shaking leaves only the guard behind.
 */
import type { CardId, Event, EventType, ServedCard, TopicId } from '@/types';
import { allMeta, cardMeta, getIndex } from '@/content/loader';
import { app, jumpToCard, record, replan, saveSnapshot, setTab } from './state';

export interface DebugApi {
  /** The plan from the current card onward. */
  plan: ServedCard[];
  feed: ServedCard[];
  cursor: number;
  boot: string;
  tab: string;
  state: unknown;
  /** The served card the reader is on. */
  current: ServedCard | undefined;
  meta(id: CardId): unknown;
  /** Taxonomy prerequisites of a topic (what a `backfill` slot should serve). */
  prereqs(topic: TopicId): TopicId[];
  /** Cards matching a predicate-ish filter, for picking a fixture card. */
  find(filter: { domain?: string; format?: string; minDifficulty?: number; hasRigor?: boolean; hasRecall?: boolean }): CardId[];
  record(type: EventType, opts?: Record<string, unknown>): Promise<Event>;
  /** Append events straight to the store (backdated seeding); reload to replay. */
  seed(events: Event[]): Promise<number>;
  events(): Promise<Event[]>;
  snapshot(): Promise<void>;
  replan(): void;
  setTab(tab: 'feed' | 'map' | 'saved' | 'you'): void;
  /** Put a card next in the feed (the same path the "related" chips use). */
  jump(id: CardId): void;
}

export function debugEnabled(): boolean {
  if (import.meta.env.DEV) return true;
  try {
    return /(?:^|[?&])debug=1(?:&|$)/.test(location.search);
  } catch {
    return false;
  }
}

export function installDebugHook(): void {
  if (!debugEnabled()) return;
  const api: DebugApi = {
    get plan() {
      return app.feed.slice(app.cursor);
    },
    get feed() {
      return app.feed;
    },
    get cursor() {
      return app.cursor;
    },
    get boot() {
      return app.boot;
    },
    get tab() {
      return app.tab;
    },
    get state() {
      return app.engineState;
    },
    get current() {
      return app.feed[app.cursor];
    },
    meta: (id) => cardMeta(id),
    prereqs: (topic) => {
      const node = app.taxonomy?.nodes.find((n) => n.id === topic);
      return node ? node.prereqs.slice() : [];
    },
    find: (filter) =>
      allMeta()
        .filter((m) => {
          if (filter.domain && m.domain !== filter.domain) return false;
          if (filter.format && m.format !== filter.format) return false;
          if (filter.minDifficulty !== undefined && m.difficulty < filter.minDifficulty) return false;
          if (filter.hasRigor !== undefined && m.hasRigor !== filter.hasRigor) return false;
          if (filter.hasRecall !== undefined && m.hasRecall !== filter.hasRecall) return false;
          return true;
        })
        .map((m) => m.id),
    record: (type, opts) => record(type, (opts ?? {}) as Parameters<typeof record>[1]),
    seed: async (events) => {
      let n = 0;
      for (const ev of events) {
        await app.store?.appendEvent(ev);
        n++;
      }
      return n;
    },
    events: async () => (await app.store?.listEvents()) ?? [],
    snapshot: () => saveSnapshot(),
    replan,
    setTab,
    jump: (id) => jumpToCard(id, 'progress', ['Opened from the debug hook']),
  };
  (globalThis as unknown as { __cultivar?: DebugApi }).__cultivar = api;
  (globalThis as unknown as { __cultivarIndex?: unknown }).__cultivarIndex = () => getIndex();
}
