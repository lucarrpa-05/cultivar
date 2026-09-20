import { describe, expect, it } from 'vitest';
import {
  base36Time,
  ensureDeviceId,
  isMonthKey,
  monthKey,
  newDeviceId,
  newEventId,
  newQuestionId,
  newSessionId,
  randomChars,
  timeFromId,
} from '../../src/store/ids';
import { T0 } from './helpers';

describe('ids', () => {
  it('mints event ids as padded base36 time + 4 random chars', () => {
    const id = newEventId(T0);
    expect(id).toMatch(/^[0-9a-z]{9}-[0-9a-z]{4}$/);
    expect(id.split('-')[0]).toBe(base36Time(T0));
    expect(timeFromId(id)).toBe(T0);
  });

  it('sorts lexicographically by time', () => {
    const ids = [T0, T0 + 1, T0 + 1000, T0 + 86_400_000, T0 + 4 * 365 * 86_400_000].map((t) => newEventId(t));
    expect([...ids].sort()).toEqual(ids);
  });

  it('does not collide within the same millisecond', () => {
    const ids = new Set(Array.from({ length: 200 }, () => newEventId(T0)));
    expect(ids.size).toBeGreaterThanOrEqual(195);
  });

  it('never collides across increasing timestamps', () => {
    const ids = new Set(Array.from({ length: 2000 }, (_, i) => newEventId(T0 + i)));
    expect(ids.size).toBe(2000);
  });

  it('builds session ids from the first 4 chars of the device id', () => {
    expect(newSessionId('abcdef123456', T0)).toBe(`abcd-${T0.toString(36)}`);
    expect(newSessionId('', T0)).toBe(`anon-${T0.toString(36)}`);
  });

  it('mints 12-char device ids and question ids in SCHEMA form', () => {
    expect(newDeviceId()).toMatch(/^[0-9a-z]{12}$/);
    expect(newQuestionId(T0)).toMatch(/^q-2026-09-19-[0-9a-z]{4}$/);
    expect(randomChars(6)).toHaveLength(6);
  });

  it('shards months in UTC', () => {
    expect(monthKey(T0)).toBe('2026-09');
    expect(monthKey(Date.UTC(2026, 0, 1, 0, 0, 0))).toBe('2026-01');
    expect(monthKey(Date.UTC(2025, 11, 31, 23, 59, 59))).toBe('2025-12');
    expect(isMonthKey('2026-09')).toBe(true);
    expect(isMonthKey('2026-13')).toBe(false);
    expect(isMonthKey('events/2026-09.json')).toBe(false);
  });

  it('creates the device id once and then reuses it', async () => {
    const map = new Map<string, unknown>();
    const kv = {
      getLocal: async <T>(k: string) => map.get(k) as T | undefined,
      setLocal: async <T>(k: string, v: T) => {
        map.set(k, v);
      },
    };
    const first = await ensureDeviceId(kv);
    const second = await ensureDeviceId(kv);
    expect(first).toMatch(/^[0-9a-z]{12}$/);
    expect(second).toBe(first);
  });
});
