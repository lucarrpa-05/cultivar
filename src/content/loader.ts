/**
 * Content loading: index, taxonomy, priors, per-domain card shards.
 *
 * Everything lives under `${BASE_URL}content/` and is precached by the service
 * worker. Every loader resolves to `null` instead of throwing, so a missing or
 * not-yet-built file degrades into an empty state rather than a crash.
 */
import type { Card, CardId, CardMeta, ContentIndex, DomainId, Priors, Taxonomy } from '@/types';

const BASE = (import.meta.env?.BASE_URL as string | undefined) ?? '/';
const contentUrl = (p: string) => `${BASE}content/${p}`;

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(contentUrl(path), { credentials: 'omit' });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function once<T>(fn: () => Promise<T>): () => Promise<T> {
  let p: Promise<T> | null = null;
  return () => (p ??= fn());
}

// ── index ──────────────────────────────────────────────────────────────────

const metaById = new Map<CardId, CardMeta>();
let indexValue: ContentIndex | null = null;

function primeIndex(index: ContentIndex | null): ContentIndex | null {
  indexValue = index;
  metaById.clear();
  for (const m of index?.cards ?? []) metaById.set(m.id, m);
  return index;
}

export const loadIndex = once(async () => primeIndex(await getJson<ContentIndex>('index.json')));
export const loadTaxonomy = once(() => getJson<Taxonomy>('taxonomy.json'));
export const loadPriors = once(() => getJson<Priors>('priors.json'));
export const loadQuestions = once(async () => (await getJson<unknown[]>('questions.json')) ?? []);

export function getIndex(): ContentIndex | null {
  return indexValue;
}
export function cardMeta(id: CardId): CardMeta | undefined {
  return metaById.get(id);
}
export function allMeta(): CardMeta[] {
  return indexValue?.cards ?? [];
}

// ── card shards, with a small LRU so memory stays bounded ───────────────────

type Shard = Record<CardId, Card>;

const MAX_SHARDS = 4;
const MAX_CARDS = 320;
const shards = new Map<string, Shard>();
const inflight = new Map<string, Promise<Shard | null>>();
const cards = new Map<CardId, Card>();

function touch<K, V>(map: Map<K, V>, key: K, max: number, value?: V) {
  if (value !== undefined) map.delete(key);
  else if (!map.has(key)) return;
  const v = value ?? (map.get(key) as V);
  map.delete(key);
  map.set(key, v);
  while (map.size > max) {
    const oldest = map.keys().next().value as K | undefined;
    if (oldest === undefined) break;
    map.delete(oldest);
  }
}

export async function loadShard(domain: DomainId | string): Promise<Shard | null> {
  const hit = shards.get(domain);
  if (hit) {
    touch(shards, domain, MAX_SHARDS);
    return hit;
  }
  const pending = inflight.get(domain);
  if (pending) return pending;
  const p = getJson<Shard>(`cards/${domain}.json`).then((shard) => {
    inflight.delete(domain);
    if (shard) touch(shards, domain, MAX_SHARDS, shard);
    return shard;
  });
  inflight.set(domain, p);
  return p;
}

/** Full card by id. Shards are keyed by the card's domain, taken from the index. */
export async function loadCard(id: CardId): Promise<Card | null> {
  const cached = cards.get(id);
  if (cached) {
    touch(cards, id, MAX_CARDS);
    return cached;
  }
  const meta = metaById.get(id);
  const domain = meta?.domain ?? (id.split('.')[0] as DomainId);
  if (!domain) return null;
  const shard = await loadShard(domain);
  const card = shard?.[id] ?? null;
  if (card) touch(cards, id, MAX_CARDS, card);
  return card;
}

export async function loadCards(ids: CardId[]): Promise<Record<CardId, Card>> {
  const out: Record<CardId, Card> = {};
  await Promise.all(
    ids.map(async (id) => {
      const c = await loadCard(id);
      if (c) out[id] = c;
    }),
  );
  return out;
}

/** Pull every shard into the HTTP/SW cache while the reader is idle. */
export function warmAllShards(): void {
  const domains = [...new Set(allMeta().map((m) => m.domain))];
  if (!domains.length) return;
  let i = 0;
  const idle: (cb: () => void) => void =
    typeof requestIdleCallback === 'function'
      ? (cb) => requestIdleCallback(() => cb(), { timeout: 4000 })
      : (cb) => setTimeout(cb, 400);
  const step = () => {
    const domain = domains[i++];
    if (!domain) return;
    // Fetch (and let the SW cache it) without holding every shard in memory.
    fetch(contentUrl(`cards/${domain}.json`), { credentials: 'omit' })
      .then((r) => r.arrayBuffer())
      .catch(() => undefined)
      .finally(() => idle(step));
  };
  idle(step);
}

/** Monthly recap markdown written by the refresh, e.g. content/recap-2026-09.md */
export async function loadRecap(month: string): Promise<string | null> {
  try {
    const res = await fetch(contentUrl(`recap-${month}.md`), { credentials: 'omit' });
    if (!res.ok) return null;
    const text = await res.text();
    return text.trim().startsWith('<') ? null : text;
  } catch {
    return null;
  }
}

/** Test seam: drop every cache (also used by "reset all local data"). */
export function resetContentCaches(): void {
  shards.clear();
  cards.clear();
  inflight.clear();
}
