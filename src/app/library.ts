/**
 * Library logic: search, mood shelves, series progress, "surprise me".
 *
 * Pure over the content index (`allMeta()`) and the engine state (`app.engineState`);
 * no DOM. The Library screen renders what these return.
 */
import type { CardId, CardMeta, EngineState, Format } from '@/types';
import { allMeta, cardMeta } from '@/content/loader';
import { hashString } from '@/engine/rng';
import { topicName } from '@/ui/domain';
import { app } from './state';
import { interleave } from './util';

const DAY_MS = 86_400_000;

function state(): EngineState | null {
  return app.engineState;
}

export function isReadId(id: CardId): boolean {
  return (state()?.seen[id]?.views || 0) > 0;
}

// ── search ─────────────────────────────────────────────────────────────────

function wordScore(m: CardMeta, word: string): number {
  let s = 0;
  if (m.title.toLowerCase().includes(word)) s += 3;
  if ((m.hook ?? '').toLowerCase().includes(word)) s += 2;
  if (m.tags.some((t) => t.toLowerCase().includes(word))) s += 1;
  if (topicName(m.topic).toLowerCase().includes(word) || topicName(m.domain).toLowerCase().includes(word)) s += 1;
  return s;
}

/** Cards whose title, hook, tags or topic mention every word of the query, best first. */
export function searchCards(query: string, limit = 40): CardMeta[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const words = q.split(/\s+/).filter(Boolean);
  const hits: { m: CardMeta; score: number }[] = [];
  for (const m of allMeta()) {
    let total = 0;
    let all = true;
    for (const w of words) {
      const s = wordScore(m, w);
      if (!s) {
        all = false;
        break;
      }
      total += s;
    }
    if (all) hits.push({ m, score: total });
  }
  hits.sort((a, b) => b.score - a.score || a.m.title.localeCompare(b.m.title));
  return hits.slice(0, limit).map((h) => h.m);
}

// ── shelves ────────────────────────────────────────────────────────────────

export interface Shelf {
  id: string;
  name: string;
  blurb: string;
  ids: CardId[];
}

interface ShelfDef {
  id: string;
  name: string;
  blurb: string;
  test: (m: CardMeta, now: number) => boolean;
  hideEmpty?: boolean;
}

const isFormat = (f: Format) => (m: CardMeta) => m.format === f;

const SHELVES: ShelfDef[] = [
  { id: 'puzzles', name: 'Puzzles', blurb: 'Things to chew on', test: isFormat('challenge') },
  { id: 'stories', name: 'Stories', blurb: 'Human beings, mostly', test: isFormat('story') },
  { id: 'quotes', name: 'Quotes', blurb: 'Other people, said well', test: isFormat('quote') },
  {
    id: 'short',
    name: 'Short ones',
    blurb: 'A minute each, tops',
    test: (m) => m.weight === 'light' && m.words.body <= 90,
  },
  {
    id: 'deep',
    name: 'Deep end',
    blurb: 'With the proofs attached',
    test: (m) => m.hasRigor && m.difficulty >= 3,
  },
  { id: 'spanish', name: 'En español', blurb: 'Para leer en casa', test: (m) => m.language === 'es' },
  {
    id: 'fresh',
    name: 'Fresh',
    blurb: 'Written in the last two weeks',
    test: (m, now) => {
      const t = Date.parse(m.dates?.written ?? '');
      return !Number.isNaN(t) && now - t <= 14 * DAY_MS && t <= now + DAY_MS;
    },
    hideEmpty: true,
  },
];

/** The mood shelves, built from the whole library. The `fresh` shelf hides when empty. */
export function shelves(now = Date.now()): Shelf[] {
  const metas = allMeta().filter((m) => m.format !== 'recall');
  const out: Shelf[] = [];
  for (const def of SHELVES) {
    const ids = metas.filter((m) => def.test(m, now)).map((m) => m.id);
    if (def.hideEmpty && !ids.length) continue;
    out.push({ id: def.id, name: def.name, blurb: def.blurb, ids });
  }
  return out;
}

export function unreadIn(shelf: Shelf): number {
  return shelf.ids.filter((id) => !isReadId(id)).length;
}

/**
 * `n` cards from a shelf: unread first, then read-but-not-liked. The order is
 * a deterministic function of `seed` (use the day key), spread across domains.
 */
export function pickFromShelf(shelf: Shelf, n: number, seed: string | number): CardId[] {
  const seen = state()?.seen ?? {};
  const salt = String(seed);
  const order = (ids: CardId[]) =>
    interleave(
      ids
        .map((id) => ({ id, h: hashString(salt + '|' + id) }))
        .sort((a, b) => a.h - b.h || (a.id < b.id ? -1 : 1))
        .map((x) => x.id),
      (id) => cardMeta(id)?.domain ?? id.split('.')[0] ?? '',
    );
  const unread = shelf.ids.filter((id) => !seen[id]?.views);
  const reread = shelf.ids.filter((id) => seen[id]?.views && !seen[id]?.liked);
  return [...order(unread), ...order(reread)].slice(0, Math.max(0, n));
}

/** One unread, not-heavy card from the domain the reader has read least. */
export function surpriseMe(random: () => number = Math.random): CardId | null {
  const seen = state()?.seen ?? {};
  const reads = new Map<string, number>();
  for (const [id, info] of Object.entries(seen)) {
    if (!info.views) continue;
    const d = cardMeta(id)?.domain ?? id.split('.')[0];
    if (d) reads.set(d, (reads.get(d) ?? 0) + 1);
  }
  const byDomain = new Map<string, CardId[]>();
  for (const m of allMeta()) {
    if (m.weight === 'heavy' || seen[m.id]?.views) continue;
    if (m.format === 'recall' || (m.series && m.series.index > 1)) continue;
    const list = byDomain.get(m.domain);
    if (list) list.push(m.id);
    else byDomain.set(m.domain, [m.id]);
  }
  if (!byDomain.size) return null;
  const fewest = Math.min(...[...byDomain.keys()].map((d) => reads.get(d) ?? 0));
  const domains = [...byDomain.keys()].filter((d) => (reads.get(d) ?? 0) === fewest).sort();
  const domain = domains[Math.floor(random() * domains.length) % domains.length];
  const pool = byDomain.get(domain)!;
  return pool[Math.floor(random() * pool.length) % pool.length] ?? null;
}

// ── series ─────────────────────────────────────────────────────────────────

export type SeriesStatus = 'new' | 'reading' | 'paused' | 'finished';

export interface SeriesEntry {
  id: string;
  title: string;
  domain: string;
  total: number;
  /** episode ids ordered by index */
  episodes: CardId[];
  /** which of `episodes` have been read */
  read: boolean[];
  lastIndex: number;
  lastAt: number;
  status: SeriesStatus;
  /** the episode to open next: resume point, or episode 1 */
  nextId: CardId;
}

const STATUS_RANK: Record<SeriesStatus, number> = { paused: 0, reading: 0, new: 1, finished: 2 };

export function seriesList(): SeriesEntry[] {
  const st = state();
  const seen = st?.seen ?? {};
  const groups = new Map<string, CardMeta[]>();
  for (const m of allMeta()) {
    if (!m.series) continue;
    const list = groups.get(m.series.id);
    if (list) list.push(m);
    else groups.set(m.series.id, [m]);
  }
  const out: SeriesEntry[] = [];
  for (const [id, metas] of groups) {
    metas.sort((a, b) => a.series!.index - b.series!.index);
    const episodes = metas.map((m) => m.id);
    const read = metas.map((m) => (seen[m.id]?.views || 0) > 0);
    const byIndex = (i: number) => metas.find((m) => m.series!.index === i)?.id;
    const maxRead = metas.reduce((mx, m, i) => (read[i] ? Math.max(mx, m.series!.index) : mx), 0);
    const lastSeen = metas.reduce((mx, m) => Math.max(mx, seen[m.id]?.views ? seen[m.id].last : 0), 0);
    const prog = st?.series[id];
    const total = Math.max(metas[0].series!.total, metas.length);
    const lastIndex = prog ? prog.lastIndex : maxRead;
    const allRead = read.every(Boolean);

    let status: SeriesStatus;
    if (prog?.finished || allRead) status = 'finished';
    else if (prog?.paused) status = 'paused';
    else if ((prog && prog.lastIndex > 0) || maxRead > 0) status = 'reading';
    else status = 'new';

    let want: number;
    if (status === 'finished' || status === 'new') want = 1;
    // A skip lowers `lastIndex`; the resume point is the one after the last one read.
    else if (status === 'paused') want = maxRead + 1;
    else want = Math.max(lastIndex, maxRead) + 1;
    const firstUnread = metas.find((_, i) => !read[i])?.id;
    const nextId = byIndex(want) ?? firstUnread ?? episodes[0];

    out.push({
      id,
      title: metas[0].series!.title,
      domain: metas[0].domain,
      total,
      episodes,
      read,
      lastIndex,
      lastAt: Math.max(prog?.lastAt ?? 0, lastSeen),
      status,
      nextId,
    });
  }
  out.sort(
    (a, b) =>
      STATUS_RANK[a.status] - STATUS_RANK[b.status] || b.lastAt - a.lastAt || a.title.localeCompare(b.title),
  );
  return out;
}
