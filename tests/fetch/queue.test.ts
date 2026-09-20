import { describe, expect, it } from 'vitest';

import { RETENTION, applyRetention, dedupe, mergeQueue } from '../../scripts/lib/feeds.mjs';
import type { WireItem } from '../../src/types';

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.parse('2026-09-19T12:00:00.000Z');

const item = (over: Partial<WireItem> = {}): WireItem => ({
  id: 'aaaaaaaaaaaa',
  source: 'quanta',
  sourceName: 'Quanta Magazine',
  kind: 'news',
  title: 'A proof about prime numbers',
  url: 'https://quantamagazine.org/a-proof',
  summary: 'Mathematicians proved something.',
  published: new Date(NOW - DAY).toISOString(),
  fetched: new Date(NOW).toISOString(),
  domain: 'math',
  topicHint: 'math.number-theory',
  lang: 'en',
  status: 'fresh',
  ...over,
} as WireItem);

const daysAgo = (n: number) => new Date(NOW - n * DAY).toISOString();

describe('dedupe', () => {
  it('collapses repeats of the same id', () => {
    const out = dedupe([item(), item({ title: 'A different headline' })]);
    expect(out).toHaveLength(1);
  });

  it('collapses the same headline coming from two sources', () => {
    const a = item({ id: 'aaaaaaaaaaaa', source: 'quanta' });
    const b = item({
      id: 'bbbbbbbbbbbb',
      source: 'phys-org',
      url: 'https://phys.org/news/a-proof',
      title: 'A Proof About Prime Numbers!',
    });
    expect(dedupe([a, b])).toHaveLength(1);
  });

  it('keeps the copy from the heavier source', () => {
    const light = item({ id: 'bbbbbbbbbbbb', source: 'kottke', url: 'https://kottke.org/a' });
    const heavy = item({ id: 'cccccccccccc', source: 'quanta', url: 'https://quantamagazine.org/a' });
    const weightOf = (i: WireItem) => (i.source === 'quanta' ? 5 : 2);
    expect(dedupe([light, heavy], { weightOf })[0].source).toBe('quanta');
    expect(dedupe([heavy, light], { weightOf })[0].source).toBe('quanta');
  });

  it('never merges two items that only share a very short title', () => {
    const a = item({ id: 'aaaaaaaaaaaa', title: 'Go', url: 'https://a.example/1' });
    const b = item({ id: 'bbbbbbbbbbbb', title: 'Go!', url: 'https://b.example/2' });
    expect(dedupe([a, b])).toHaveLength(2);
  });
});

describe('mergeQueue', () => {
  it('adds genuinely new items and counts them', () => {
    const existing = [item()];
    const incoming = [item(), item({ id: 'dddddddddddd', title: 'Something else', url: 'https://x/2' })];
    const merged = mergeQueue(existing, incoming);
    expect(merged.added).toBe(1);
    expect(merged.known).toBe(1);
    expect(merged.items).toHaveLength(2);
  });

  it('never resurrects an item that was distilled or dropped', () => {
    const existing = [item({ status: 'distilled', distilledCard: 'math.primes.card' })];
    const merged = mergeQueue(existing, [item()]);
    expect(merged.added).toBe(0);
    expect(merged.items[0].status).toBe('distilled');
    expect(merged.items[0].distilledCard).toBe('math.primes.card');
  });

  it('does not re-add the same story under a new url', () => {
    const existing = [item({ status: 'dropped' })];
    const incoming = [item({ id: 'eeeeeeeeeeee', url: 'https://other.example/a-proof' })];
    expect(mergeQueue(existing, incoming).added).toBe(0);
  });
});

describe('applyRetention', () => {
  it('drops fresh items older than 45 days', () => {
    const items = [
      item({ id: '000000000001', published: daysAgo(10) }),
      item({ id: '000000000002', url: 'https://x/2', title: 'Old news about something', published: daysAgo(46) }),
    ];
    const { items: kept, stats } = applyRetention(items, { now: NOW });
    expect(kept.map((i) => i.id)).toEqual(['000000000001']);
    expect(stats.expired).toBe(1);
  });

  it('keeps distilled and dropped ids for 120 days, then forgets them', () => {
    const items = [
      item({ id: '000000000003', status: 'distilled', published: daysAgo(100) }),
      item({ id: '000000000004', status: 'dropped', published: daysAgo(119) }),
      item({ id: '000000000005', status: 'dropped', published: daysAgo(121) }),
    ];
    const { items: kept, stats } = applyRetention(items, { now: NOW });
    expect(kept.map((i) => i.id).sort()).toEqual(['000000000003', '000000000004']);
    expect(stats.archivedExpired).toBe(1);
  });

  it('caps fresh items, dropping the oldest and lightest first', () => {
    const items = [
      ...Array.from({ length: 30 }, (_, i) =>
        item({ id: `old${String(i).padStart(9, '0')}`, source: 'kottke', published: daysAgo(40) }),
      ),
      ...Array.from({ length: 30 }, (_, i) =>
        item({ id: `new${String(i).padStart(9, '0')}`, source: 'quanta', published: daysAgo(1) }),
      ),
    ];
    const weightOf = (i: WireItem) => (i.source === 'quanta' ? 5 : 1);
    const { items: kept, stats } = applyRetention(items, { now: NOW, maxFresh: 30, weightOf });
    expect(kept).toHaveLength(30);
    expect(kept.every((i) => i.source === 'quanta')).toBe(true);
    expect(stats.capped).toBe(30);
  });

  it('uses the documented defaults', () => {
    expect(RETENTION).toMatchObject({ freshDays: 45, archiveDays: 120, maxFresh: 600 });
  });

  it('returns the queue newest first', () => {
    const items = [
      item({ id: '000000000006', published: daysAgo(5) }),
      item({ id: '000000000007', published: daysAgo(1) }),
      item({ id: '000000000008', published: daysAgo(3) }),
    ];
    const { items: kept } = applyRetention(items, { now: NOW });
    expect(kept.map((i) => i.id)).toEqual(['000000000007', '000000000008', '000000000006']);
  });
});
