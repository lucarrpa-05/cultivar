/** Small helpers shared by the app shell. No DOM assumptions beyond `Intl`. */

export const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

/** Event id: base36 time + 4 random base36 chars (sortable, unique enough). See SYNC.md. */
export function newEventId(t = Date.now()): string {
  const rnd = Math.random().toString(36).slice(2, 6).padEnd(4, '0');
  return `${t.toString(36)}-${rnd}`;
}

export function newDeviceId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

export function sessionIdFor(deviceId: string, startedAt: number): string {
  return `${(deviceId || 'anon').slice(0, 4)}-${startedAt.toString(36)}`;
}

/** Local YYYY-MM-DD. */
export function dayKey(t: number | Date = Date.now()): string {
  const d = typeof t === 'number' ? new Date(t) : t;
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function monthKey(t: number | Date = Date.now()): string {
  return dayKey(t).slice(0, 7);
}

export function startOfDay(t: number): number {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

const WEEKDAY = new Intl.DateTimeFormat('en', { weekday: 'short' });
const SHORT = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' });
const LONG_MONTH = new Intl.DateTimeFormat('en', { month: 'long' });

/** "today" · "yesterday" · "Tue" (this week) · "Sep 12". */
export function friendlyDate(t: number, now = Date.now()): string {
  const days = Math.round((startOfDay(now) - startOfDay(t)) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return WEEKDAY.format(t);
  return SHORT.format(t);
}

export function monthName(month: string): string {
  const [y, m] = month.split('-').map(Number);
  return `${LONG_MONTH.format(new Date(y, (m ?? 1) - 1, 1))} ${y}`;
}

export function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export function minutesLabel(mins: number): string {
  const m = Math.max(0, Math.round(mins));
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  return `${h} h ${m - h * 60} min`;
}

/** Stable shuffle-ish interleave: round-robin across buckets keyed by `key`. */
export function interleave<T>(items: T[], key: (item: T) => string): T[] {
  const buckets = new Map<string, T[]>();
  for (const it of items) {
    const k = key(it);
    const b = buckets.get(k);
    if (b) b.push(it);
    else buckets.set(k, [it]);
  }
  const lists = [...buckets.values()];
  const out: T[] = [];
  for (let i = 0; out.length < items.length; i++) {
    let moved = false;
    for (const list of lists) {
      const next = list[i];
      if (next !== undefined) {
        out.push(next);
        moved = true;
      }
    }
    if (!moved) break;
  }
  return out;
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;',
  );
}
