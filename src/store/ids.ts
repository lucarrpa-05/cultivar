/**
 * Cultivar — id generation (SYNC.md §"Event ids and sessions").
 *
 *   event id    = base36(t) padded to 9 chars + '-' + 4 random base36 chars
 *   session id  = deviceId.slice(0, 4) + '-' + base36(sessionStartT)
 *   device id   = 12 random base36 chars (persisted in the `local` store, never synced)
 *   question id = q-YYYY-MM-DD-xxxx (SCHEMA.md §5)
 *
 * Event ids sort lexicographically by time, which makes them pleasant in the
 * repo and in logs. Ordering of the event log itself is always by `t` then `id`,
 * so a clock skew never corrupts the fold — it only reorders ties.
 */

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';

/** Zero-padded base36 time: 9 chars keeps ids sortable past the year 4000. */
export const TIME_CHARS = 9;

function randomBytes(n: number): Uint8Array {
  const out = new Uint8Array(n);
  const c = (globalThis as { crypto?: Crypto }).crypto;
  if (c && typeof c.getRandomValues === 'function') {
    try {
      c.getRandomValues(out);
      return out;
    } catch {
      /* fall through to Math.random */
    }
  }
  for (let i = 0; i < n; i += 1) out[i] = Math.floor(Math.random() * 256);
  return out;
}

/** `n` random base36 characters. Not cryptographic; collision-resistant enough for one reader. */
export function randomChars(n: number): string {
  const bytes = randomBytes(n);
  let s = '';
  for (let i = 0; i < n; i += 1) s += ALPHABET[bytes[i] % 36];
  return s;
}

function safeTime(t: number): number {
  return Number.isFinite(t) && t > 0 ? Math.floor(t) : 0;
}

/** base36 of an epoch-ms timestamp, left-padded so ids sort as strings. */
export function base36Time(t: number): string {
  return safeTime(t).toString(36).padStart(TIME_CHARS, '0');
}

/** `newEventId(Date.now())` → "0mfp3k9z1-h7qa" */
export function newEventId(t: number = Date.now()): string {
  return `${base36Time(t)}-${randomChars(4)}`;
}

/** Recover the timestamp an event id was minted with (0 if it is not one of ours). */
export function timeFromId(id: string): number {
  const head = String(id ?? '').split('-')[0] ?? '';
  const t = parseInt(head, 36);
  return Number.isFinite(t) ? t : 0;
}

/** 12 random base36 chars. The first 4 become the session-id prefix. */
export function newDeviceId(): string {
  return randomChars(12);
}

/** `newSessionId(deviceId, startedAt)` → "k3f9-mfp3k9z1" */
export function newSessionId(deviceId: string, t: number = Date.now()): string {
  const prefix = (String(deviceId ?? '').slice(0, 4) || 'anon').padEnd(4, '0');
  return `${prefix}-${safeTime(t).toString(36)}`;
}

/** SCHEMA.md §5 question id: `q-YYYY-MM-DD-xxxx` (UTC date, so two devices agree). */
export function newQuestionId(t: number = Date.now()): string {
  return `q-${new Date(safeTime(t)).toISOString().slice(0, 10)}-${randomChars(4)}`;
}

/**
 * Month shard key for `events/YYYY-MM.json`. UTC on purpose: the file an event
 * lands in must not depend on which timezone the phone was in.
 */
export function monthKey(t: number): string {
  return new Date(safeTime(t)).toISOString().slice(0, 7);
}

/** Cheap guard for month strings coming back from the repo. */
export function isMonthKey(s: unknown): s is string {
  return typeof s === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(s);
}

interface LocalKv {
  getLocal<T>(key: string): Promise<T | undefined>;
  setLocal<T>(key: string, v: T): Promise<void>;
}

/** Read `local.deviceId`, minting and persisting one the first time. */
export async function ensureDeviceId(store: LocalKv): Promise<string> {
  const existing = await store.getLocal<string>('deviceId');
  if (typeof existing === 'string' && existing.length > 0) return existing;
  const fresh = newDeviceId();
  await store.setLocal('deviceId', fresh);
  return fresh;
}
