/**
 * Wire items — the live layer.
 *
 * GitHub Actions runs `scripts/fetch-live.mjs` daily and commits
 * `data/inbox/queue.json` to the public repo. The app reads that file straight
 * from raw.githubusercontent.com (CORS-enabled, no deploy needed) and shows
 * `status: 'fresh'` items as light wire cards.
 *
 * Cheap and forgiving by design: an in-memory memo, a localStorage copy with a
 * `fetchedAt` stamp, a 6-hour staleness window, and — if the network or the
 * file is unavailable — whatever was cached last, or an empty list.
 *
 * Nothing here touches the DOM beyond `fetch` and `localStorage`.
 */

import type { WireItem } from '../types';

// ───────────────────────────── contract ─────────────────────────────

/** Shape of `data/inbox/queue.json`. */
export interface WireQueueFile {
  updatedAt: string;
  items: WireItem[];
}

/** Shape of `data/inbox/onthisday.json`. */
export interface OnThisDayFile {
  date: string;
  updatedAt: string;
  items: WireItem[];
}

export interface WireLoadOptions {
  /** branch of the public repo, default `main` */
  branch?: string;
  /** how long a cached copy stays good, default 6 h */
  maxAgeMs?: number;
  /** ignore the cache and refetch (still falls back to the cache on failure) */
  force?: boolean;
  signal?: AbortSignal;
}

/** What `loadWireQueue` reports alongside the items. */
export interface WireResult {
  items: WireItem[];
  updatedAt: string | null;
  /** where these items came from */
  from: 'network' | 'memory' | 'storage' | 'empty';
  fetchedAt: number | null;
  error?: string;
}

export const WIRE_CACHE_KEY = 'cultivar.wire';
export const ONTHISDAY_CACHE_KEY = 'cultivar.onthisday';
export const WIRE_MAX_AGE_MS = 6 * 60 * 60 * 1000;
export const WIRE_QUEUE_PATH = 'data/inbox/queue.json';
export const ONTHISDAY_PATH = 'data/inbox/onthisday.json';

const RAW_BASE = 'https://raw.githubusercontent.com';

/** Raw URL of a file in the public content repo. */
export function rawUrl(owner: string, repo: string, filePath: string, branch = 'main'): string {
  return `${RAW_BASE}/${owner}/${repo}/${branch}/${filePath}`;
}

// ───────────────────────────── cache plumbing ─────────────────────────────

interface Envelope<T> {
  /** epoch ms of the successful fetch */
  fetchedAt: number;
  /** the url it came from, so a repo/branch switch invalidates the copy */
  url: string;
  data: T;
}

const memo = new Map<string, Envelope<unknown>>();
const inflight = new Map<string, Promise<Envelope<unknown> | null>>();

function storage(): Storage | null {
  try {
    const s = globalThis.localStorage;
    return s && typeof s.getItem === 'function' ? s : null;
  } catch {
    return null; // private mode / blocked storage
  }
}

function readCache<T>(key: string, url: string): Envelope<T> | null {
  const hit = memo.get(key) as Envelope<T> | undefined;
  if (hit && hit.url === url) return hit;
  const store = storage();
  if (!store) return null;
  try {
    const raw = store.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Envelope<T>;
    if (!parsed || typeof parsed.fetchedAt !== 'number' || parsed.url !== url) return null;
    memo.set(key, parsed as Envelope<unknown>);
    return parsed;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, env: Envelope<T>): void {
  memo.set(key, env as Envelope<unknown>);
  const store = storage();
  if (!store) return;
  try {
    store.setItem(key, JSON.stringify(env));
  } catch {
    // quota or private mode — the in-memory copy still serves this session
  }
}

/** Drop both cached files (used by Settings → "reset local data"). */
export function clearWireCache(): void {
  memo.clear();
  inflight.clear();
  const store = storage();
  if (!store) return;
  try {
    store.removeItem(WIRE_CACHE_KEY);
    store.removeItem(ONTHISDAY_CACHE_KEY);
  } catch {
    /* ignore */
  }
}

function isOnline(): boolean {
  const nav = (globalThis as { navigator?: { onLine?: boolean } }).navigator;
  return nav?.onLine !== false; // unknown → assume online
}

// ───────────────────────────── validation ─────────────────────────────

const KINDS = new Set(['paper', 'news', 'blog', 'onthisday', 'wiki', 'video']);
const STATUSES = new Set(['fresh', 'distilled', 'dropped']);

/** Defensive: the queue is data we did not build in this bundle. */
function sanitize(input: unknown): WireItem[] {
  if (!Array.isArray(input)) return [];
  const out: WireItem[] = [];
  for (const raw of input) {
    if (!raw || typeof raw !== 'object') continue;
    const item = raw as Partial<WireItem>;
    if (typeof item.id !== 'string' || !item.id) continue;
    if (typeof item.url !== 'string' || !/^https?:\/\//i.test(item.url)) continue;
    if (typeof item.title !== 'string' || !item.title) continue;
    if (typeof item.domain !== 'string') continue;
    out.push({
      id: item.id,
      source: typeof item.source === 'string' ? item.source : 'unknown',
      sourceName: typeof item.sourceName === 'string' ? item.sourceName : (item.source ?? 'unknown'),
      kind: KINDS.has(item.kind as string) ? (item.kind as WireItem['kind']) : 'news',
      title: item.title,
      url: item.url,
      summary: typeof item.summary === 'string' ? item.summary : '',
      published: typeof item.published === 'string' ? item.published : '',
      fetched: typeof item.fetched === 'string' ? item.fetched : '',
      domain: item.domain as WireItem['domain'],
      topicHint: typeof item.topicHint === 'string' ? item.topicHint : undefined,
      lang: item.lang === 'es' ? 'es' : 'en',
      status: STATUSES.has(item.status as string) ? (item.status as WireItem['status']) : 'fresh',
      distilledCard: typeof item.distilledCard === 'string' ? item.distilledCard : undefined,
    });
  }
  return out;
}

function byNewest(a: WireItem, b: WireItem): number {
  return (Date.parse(b.published) || 0) - (Date.parse(a.published) || 0);
}

// ───────────────────────────── fetching ─────────────────────────────

async function loadFile<T extends { items: WireItem[] }>(
  key: string,
  url: string,
  opts: WireLoadOptions,
  shape: (json: unknown) => T,
): Promise<{ env: Envelope<T> | null; from: WireResult['from']; error?: string }> {
  const maxAge = opts.maxAgeMs ?? WIRE_MAX_AGE_MS;
  const cached = readCache<T>(key, url);
  const fresh = cached != null && Date.now() - cached.fetchedAt < maxAge;

  if (cached && !opts.force && (fresh || !isOnline())) {
    return { env: cached, from: memo.has(key) ? 'memory' : 'storage' };
  }
  if (!cached && !isOnline()) return { env: null, from: 'empty', error: 'offline' };

  const pending = inflight.get(key);
  if (pending && !opts.force) {
    const env = (await pending) as Envelope<T> | null;
    if (env) return { env, from: 'network' };
    return cached ? { env: cached, from: 'storage' } : { env: null, from: 'empty' };
  }

  const task = (async (): Promise<Envelope<T> | null> => {
    const res = await fetch(url, { cache: 'no-cache', signal: opts.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json: unknown = await res.json();
    const env: Envelope<T> = { fetchedAt: Date.now(), url, data: shape(json) };
    writeCache(key, env);
    return env;
  })();

  inflight.set(key, task as Promise<Envelope<unknown> | null>);
  try {
    const env = await task;
    return { env, from: 'network' };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    if (cached) return { env: cached, from: 'storage', error };
    return { env: null, from: 'empty', error };
  } finally {
    inflight.delete(key);
  }
}

function shapeQueue(json: unknown): WireQueueFile {
  const obj = (json ?? {}) as Partial<WireQueueFile>;
  return {
    updatedAt: typeof obj.updatedAt === 'string' ? obj.updatedAt : '',
    items: sanitize(obj.items),
  };
}

function shapeOnThisDay(json: unknown): OnThisDayFile {
  const obj = (json ?? {}) as Partial<OnThisDayFile>;
  return {
    date: typeof obj.date === 'string' ? obj.date : '',
    updatedAt: typeof obj.updatedAt === 'string' ? obj.updatedAt : '',
    items: sanitize(obj.items),
  };
}

// ───────────────────────────── public API ─────────────────────────────

/**
 * Fresh wire items for the engine (`EngineDeps.wire`), newest first.
 * Never throws: on any failure it returns the cached copy, or `[]`.
 */
export async function loadWire(
  owner: string,
  repo: string,
  opts: WireLoadOptions = {},
): Promise<WireItem[]> {
  const { items } = await loadWireQueue(owner, repo, opts);
  return items;
}

/** Same as `loadWire`, plus where the items came from (for Settings/debug). */
export async function loadWireQueue(
  owner: string,
  repo: string,
  opts: WireLoadOptions = {},
): Promise<WireResult> {
  const url = rawUrl(owner, repo, WIRE_QUEUE_PATH, opts.branch ?? 'main');
  const { env, from, error } = await loadFile(WIRE_CACHE_KEY, url, opts, shapeQueue);
  const items = (env?.data.items ?? []).filter((i) => i.status === 'fresh').sort(byNewest);
  return {
    items,
    updatedAt: env?.data.updatedAt ?? null,
    fetchedAt: env?.fetchedAt ?? null,
    from: env ? from : 'empty',
    ...(error ? { error } : {}),
  };
}

/**
 * Today's "on this day" items (Bogotá date, written by the same cron).
 * Returns `[]` when the file is missing or older than today.
 */
export async function loadOnThisDay(
  owner: string,
  repo: string,
  opts: WireLoadOptions = {},
): Promise<WireItem[]> {
  const url = rawUrl(owner, repo, ONTHISDAY_PATH, opts.branch ?? 'main');
  const { env } = await loadFile(ONTHISDAY_CACHE_KEY, url, opts, shapeOnThisDay);
  return (env?.data.items ?? []).filter((i) => i.status === 'fresh');
}

/** The cached queue without touching the network (synchronous, for first paint). */
export function cachedWire(owner: string, repo: string, branch = 'main'): WireItem[] {
  const url = rawUrl(owner, repo, WIRE_QUEUE_PATH, branch);
  const env = readCache<WireQueueFile>(WIRE_CACHE_KEY, url);
  return (env?.data.items ?? []).filter((i) => i.status === 'fresh').sort(byNewest);
}
