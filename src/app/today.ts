/**
 * The Today card: a once-a-day opener at the head of the feed.
 *
 * Everything here is derived from state already on the device (engine state,
 * the content index). `buildToday` is pure apart from reading `app` and the
 * loader; `maybeInjectToday` is the only side effect and records no events.
 */
import type { CardId, CardMeta, DayStat, DomainId, EngineState, ServedCard } from '@/types';
import { allMeta, cardMeta, getIndex } from '@/content/loader';
import { hashString } from '@/engine/rng';
import { app, enqueue, jumpToCard, notify } from './state';
import { dayKey, friendlyDate } from './util';

export type TodayKind = 'answer' | 'revisit' | 'series' | 'fresh' | 'puzzle';

export interface TodayItem {
  kind: TodayKind;
  title: string;
  line: string;
  /** accent for the tile, when the item points at one card */
  domain?: DomainId;
  action: { label: string; run: () => void };
}

export interface TodayBrief {
  day: string;
  greeting: string;
  dateLine: string;
  streak: { current: number; best: number; freezes: number; line: string };
  items: TodayItem[];
  yesterday?: { cards: number; likes: number; minutes: number };
  shelfLine: string;
}

export const TODAY_FLAG = 'todayShown';
const MAX_ITEMS = 4;

export function todayId(day: string = dayKey()): CardId {
  return `today:${day}`;
}

// ── small pure helpers ─────────────────────────────────────────────────────

export function greetingFor(hour: number): string {
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 18) return 'Good afternoon';
  return 'Good evening';
}

const DATE_LINE = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' });

export function dateLineFor(now: number): string {
  return DATE_LINE.format(now);
}

export function streakLine(current: number, best: number): string {
  if (current > 0) return `Day ${current} · best ${Math.max(best, current)}`;
  if (best > 0) return `A new streak starts today. Your best is ${best}.`;
  return 'Day one.';
}

export function truncate(text: string, max = 70): string {
  const t = text.trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const space = cut.lastIndexOf(' ');
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s.,;:!?-]+$/, '')}…`;
}

/** Local midnight of a `YYYY-MM-DD` key. */
export function dayStart(day: string): number {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1).getTime();
}

function shiftDay(day: string, n: number): string {
  const [y, m, d] = day.split('-').map(Number);
  return dayKey(new Date(y, (m ?? 1) - 1, (d ?? 1) + n));
}

const SHORT_DOMAIN: Record<string, string> = {
  math: 'math',
  ai: 'AI',
  css: 'social science',
  econ: 'economics',
  physics: 'physics',
  bio: 'biology',
  phil: 'philosophy',
  hist: 'history',
  poli: 'politics',
  sports: 'sports',
  niche: 'odds and ends',
};

export function domainWord(id: string): string {
  return SHORT_DOMAIN[id] ?? app.taxonomy?.domains.find((d) => d.id === id)?.name.toLowerCase() ?? id;
}

function listWords(words: string[]): string {
  if (words.length <= 1) return words[0] ?? '';
  return `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`;
}

const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

/** "All physics" · "Math and AI" · "Mostly history, physics and AI". */
export function domainsLine(domainsByCount: string[]): string {
  const words = domainsByCount.slice(0, 3).map(domainWord);
  if (!words.length) return '';
  if (domainsByCount.length === 1) return `All ${words[0]}`;
  if (domainsByCount.length <= 3) return cap(listWords(words));
  return `Mostly ${listWords(words)}`;
}

const readIn = (st: EngineState, id: CardId) => (st.seen[id]?.views ?? 0) > 0;

/** Deterministic per-day order: a hash of day + id. */
const dayOrder = (day: string) => (a: CardMeta, b: CardMeta) =>
  hashString(`${day}:${a.id}`) - hashString(`${day}:${b.id}`) || a.id.localeCompare(b.id);

// ── candidates ─────────────────────────────────────────────────────────────

export function pickAnswer(st: EngineState): { question: string; card: CardId } | null {
  const qs = [...st.questions]
    .filter((q) => q.status === 'answered' && q.answerCard && !readIn(st, q.answerCard))
    .sort((a, b) => b.t - a.t);
  const q = qs[0];
  return q && q.answerCard ? { question: q.text, card: q.answerCard } : null;
}

export function pickRevisit(st: EngineState, now: number) {
  return (
    [...st.revisit]
      .filter((r) => !r.resolved && r.readyAt && r.readyAt <= now)
      .sort((a, b) => (a.readyAt ?? 0) - (b.readyAt ?? 0))[0] ?? null
  );
}

export function pickSeries(st: EngineState, metas: CardMeta[]): { next: CardMeta; title: string } | null {
  const ids = Object.entries(st.series)
    .filter(([, p]) => !p.finished)
    .sort((a, b) => b[1].lastAt - a[1].lastAt)
    .map(([id]) => id);
  for (const sid of ids) {
    const eps = metas.filter((m) => m.series?.id === sid).sort((a, b) => a.series!.index - b.series!.index);
    const read = eps.filter((m) => readIn(st, m.id));
    if (!read.length) continue;
    const lastRead = read[read.length - 1].series!.index;
    const next = eps.find((m) => m.series!.index > lastRead);
    if (next && !readIn(st, next.id)) return { next, title: next.series!.title };
  }
  return null;
}

/** The last day before `today` the reader opened the app, or '' when there is none yet. */
export function lastVisit(st: EngineState, today: string): string {
  const days = (st.days ?? []).map((d) => d.d).filter((d) => d < today).sort();
  return days.length ? days[days.length - 1] : '';
}

export function pickFresh(st: EngineState, metas: CardMeta[], today: string, exclude: Set<CardId> = new Set()) {
  const since = lastVisit(st, today);
  // Nothing is "new since you were here" on the very first day: the whole shelf is.
  if (!since) return { since, count: 0, domains: [] as string[], picks: [] as CardId[] };
  const fresh = metas.filter(
    (m) => (m.dates?.written ?? '').slice(0, 10) > since && !readIn(st, m.id) && !exclude.has(m.id),
  );
  const byDomain = new Map<string, CardMeta[]>();
  for (const m of [...fresh].sort(dayOrder(today))) {
    const list = byDomain.get(m.domain);
    if (list) list.push(m);
    else byDomain.set(m.domain, [m]);
  }
  const domains = [...byDomain.keys()].sort(
    (a, b) => byDomain.get(b)!.length - byDomain.get(a)!.length || a.localeCompare(b),
  );
  const picks: CardId[] = [];
  for (let round = 0; picks.length < 3; round++) {
    let moved = false;
    for (const d of domains) {
      const m = byDomain.get(d)![round];
      if (m && picks.length < 3) {
        picks.push(m.id);
        moved = true;
      }
    }
    if (!moved) break;
  }
  return { since, count: fresh.length, domains, picks };
}

export function pickPuzzle(st: EngineState, metas: CardMeta[], today: string): CardMeta | null {
  const open = metas.filter((m) => m.format === 'challenge' && !readIn(st, m.id));
  return open.sort(dayOrder(today))[0] ?? null;
}

/** Keep priority order, cap at four, and never drop the puzzle. */
export function capItems(items: TodayItem[]): TodayItem[] {
  const puzzle = items.find((i) => i.kind === 'puzzle');
  const others = items.filter((i) => i.kind !== 'puzzle');
  return puzzle ? [...others.slice(0, MAX_ITEMS - 1), puzzle] : others.slice(0, MAX_ITEMS);
}

export function yesterdayLine(y: { cards: number; likes: number; minutes: number }): string {
  const bits = [`${y.cards} ${y.cards === 1 ? 'card' : 'cards'}`];
  if (y.likes) bits.push(`${y.likes} ${y.likes === 1 ? 'like' : 'likes'}`);
  if (y.minutes >= 1) bits.push(`${Math.round(y.minutes)} min`);
  return `Yesterday: ${bits.join(', ')}.`;
}

// ── the brief ──────────────────────────────────────────────────────────────

export function buildToday(now = Date.now()): TodayBrief {
  const st = app.engineState;
  const today = dayKey(now);
  const metas = allMeta();
  const total = metas.length || getIndex()?.count || app.cardCount || 0;
  const base = {
    day: today,
    greeting: greetingFor(new Date(now).getHours()),
    dateLine: dateLineFor(now),
  };
  if (!st) {
    return {
      ...base,
      streak: { current: 0, best: 0, freezes: 0, line: streakLine(0, 0) },
      items: [],
      shelfLine: total ? `${total} cards on the shelf.` : '',
    };
  }

  const items: TodayItem[] = [];

  const answer = pickAnswer(st);
  if (answer) {
    const card = answer.card;
    items.push({
      kind: 'answer',
      title: 'Your question has an answer',
      line: truncate(answer.question),
      domain: cardMeta(card)?.domain,
      action: { label: 'Read the answer', run: () => jumpToCard(card, 'answer', ['You asked']) },
    });
  }

  const revisit = pickRevisit(st, now);
  if (revisit) {
    const m = cardMeta(revisit.card);
    items.push({
      kind: 'revisit',
      title: 'One you flagged is ready',
      line: m?.title ?? 'A card you found hard',
      domain: m?.domain,
      action: {
        label: 'Try it again',
        run: () => jumpToCard(revisit.card, 'revisit', [`You flagged this ${friendlyDate(revisit.flaggedAt, now)}`]),
      },
    });
  }

  const series = pickSeries(st, metas);
  if (series) {
    const { next, title } = series;
    items.push({
      kind: 'series',
      title: 'Pick up where you left off',
      line: `Episode ${next.series!.index} of ${next.series!.total} · ${title}`,
      domain: next.domain,
      action: { label: 'Continue', run: () => void enqueue([next.id], 'series', [`You came back to ${title}`]) },
    });
  }

  const puzzle = pickPuzzle(st, metas, today);

  const fresh = pickFresh(st, metas, today, new Set(puzzle ? [puzzle.id] : []));
  if (fresh.count > 0 && fresh.picks.length) {
    const picks = fresh.picks;
    const n = fresh.count;
    items.push({
      kind: 'fresh',
      title: `${n} new ${n === 1 ? 'card' : 'cards'} since ${friendlyDate(dayStart(fresh.since), now)}`,
      line: domainsLine(fresh.domains),
      action: {
        label: picks.length >= 3 ? 'Read three' : picks.length === 2 ? 'Read both' : 'Read it',
        run: () => void enqueue(picks, 'progress', ['New since you were here']),
      },
    });
  }

  if (puzzle) {
    const id = puzzle.id;
    items.push({
      kind: 'puzzle',
      title: "Today's puzzle",
      line: puzzle.title,
      domain: puzzle.domain,
      action: { label: 'Show me', run: () => jumpToCard(id, 'progress', ["Today's puzzle"]) },
    });
  }

  const yKey = shiftDay(today, -1);
  const yStat: DayStat | undefined = (st.days ?? []).find((d) => d.d === yKey);
  const yesterday =
    yStat && (yStat.cards > 0 || yStat.likes > 0 || yStat.minutes >= 1)
      ? { cards: yStat.cards, likes: yStat.likes, minutes: yStat.minutes }
      : undefined;

  const read = Object.values(st.seen).filter((s) => (s?.views ?? 0) > 0).length;
  const shelfLine = !total
    ? ''
    : read === 0
      ? `${total} cards on the shelf, all of them new to you.`
      : `You have read ${read} of ${total} cards`;

  const s = st.streak;
  return {
    ...base,
    streak: {
      current: s.current,
      best: s.best,
      freezes: s.freezes,
      line: streakLine(s.current, s.best),
    },
    items: capItems(items),
    ...(yesterday ? { yesterday } : {}),
    shelfLine,
  };
}

// ── injection ──────────────────────────────────────────────────────────────

/**
 * Put `today:<day>` at the head of the feed the first time the app opens on a
 * local day. Device-local bookkeeping only; no event is recorded.
 */
export async function maybeInjectToday(now = Date.now(), deepLink = false): Promise<boolean> {
  if (!app.engine || !app.feed.length) return false;
  // The reader came for one card (a shared link): give them that card. The
  // flag stays unset, so Today appears on the next open instead. The caller
  // reads the hash before the first render, because the app shell clears it.
  if (deepLink || (typeof location !== 'undefined' && /card=/.test(location.hash))) return false;
  // `?notoday=1`: the end-to-end suite wants a library card at index 0.
  if (typeof location !== 'undefined' && /[?&]notoday=1/.test(location.search)) return false;
  const day = dayKey(now);
  const id = todayId(day);
  const shown = await app.store?.getLocal<string>(TODAY_FLAG).catch(() => undefined);
  if (shown === day) return false;
  if (app.feed.some((s) => s.id === id)) return false;
  const served: ServedCard = { id, slot: 'open', why: ['A new day'], score: 0 };
  app.feed = [served, ...app.feed.filter((s) => !s.id.startsWith('today:'))];
  app.cursor = 0;
  await app.store?.setLocal(TODAY_FLAG, day).catch(() => undefined);
  notify();
  return true;
}
