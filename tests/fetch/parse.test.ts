import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import {
  looksLikeFeed,
  parseArxivApi,
  parseAtom,
  parseByKind,
  parseHnAlgolia,
  parseRss,
  parseWikiFeatured,
  parseWikiOnThisDay,
} from '../../scripts/lib/feeds.mjs';

const fixture = (name: string) =>
  readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');

const rssXml = fixture('rss-sample.xml');
const atomXml = fixture('atom-sample.xml');
const arxivXml = fixture('arxiv-api.xml');
const onThisDayJson = fixture('onthisday.json');
const featuredJson = fixture('wiki-featured.json');
const hnJson = fixture('hn-algolia.json');

describe('parseRss', () => {
  const items = parseRss(rssXml);

  it('reads every item in the channel', () => {
    expect(items).toHaveLength(5);
  });

  it('decodes entities in titles', () => {
    expect(items[0].title).toBe('Neurons & genes: a CRISPR map of the mouse brain');
    expect(items[2].title).toBe('Elecciones y polarización: qué dicen los datos');
  });

  it('strips HTML, images and entities out of the summary', () => {
    const summary = items[0].summary;
    expect(summary).not.toMatch(/<[a-z/]/i);
    expect(summary).not.toContain('srcset');
    expect(summary).toContain('CRISPR');
    expect(summary).toContain('gene regulation, not cell lineage');
    expect(summary.startsWith('Researchers used')).toBe(true);
  });

  it('caps the summary at 500 characters', () => {
    expect(items[1].summary.length).toBeLessThanOrEqual(500);
    expect(items[1].summary.endsWith('…')).toBe(true);
  });

  it('handles doubly escaped markup', () => {
    expect(items[2].summary).toBe(
      'Un estudio sobre la polarización en redes sociales durante las elecciones de 2026.',
    );
  });

  it('normalizes pubDate and dc:date to ISO', () => {
    expect(items[0].published).toBe('2026-09-17T14:30:00.000Z');
    expect(items[1].published).toBe('2026-09-16T09:00:00.000Z');
    expect(items[2].published).toBe('2026-09-15T11:00:00.000Z');
  });

  it('falls back to a permalink guid when <link> is missing', () => {
    expect(items[3].link).toBe('https://example.org/posts/guid-only');
    expect(items[3].summary).toContain('link element');
  });

  it('keeps categories', () => {
    expect(items[0].categories).toEqual(['Biology', 'Neuroscience']);
  });

  it('leaves an item with no link empty rather than inventing one', () => {
    expect(items[4].link).toBe('');
  });
});

describe('parseAtom', () => {
  const entries = parseAtom(atomXml);

  it('reads entries and prefers rel="alternate" links', () => {
    expect(entries).toHaveLength(3);
    expect(entries[0].link).toBe('https://lab.example.com/2026/09/sparse-scaling');
  });

  it('unescapes html content', () => {
    expect(entries[0].summary).toContain('We trained 40 sparse autoencoders on a transformer');
    expect(entries[0].summary).not.toContain('<p>');
  });

  it('prefers published over updated, and tolerates neither', () => {
    expect(entries[0].published).toBe('2026-09-18T10:15:00.000Z');
    expect(entries[1].published).toBe('2026-09-17T18:00:00.000Z');
    expect(entries[2].published).toBeNull();
  });

  it('reads category terms', () => {
    expect(entries[0].categories).toEqual(['interpretability', 'llm']);
  });
});

describe('parseArxivApi', () => {
  const entries = parseArxivApi(arxivXml);

  it('reads the entries', () => {
    expect(entries.length).toBeGreaterThanOrEqual(2);
  });

  it('uses the https abs URL without the version suffix', () => {
    for (const entry of entries) {
      expect(entry.link).toMatch(/^https:\/\/arxiv\.org\/abs\/[\d.]+$/);
    }
  });

  it('uses the abstract as the summary and keeps it under 500 chars', () => {
    expect(entries[0].summary.length).toBeGreaterThan(80);
    expect(entries[0].summary.length).toBeLessThanOrEqual(500);
  });

  it('records the authors and the arXiv categories', () => {
    expect(entries[0].author.length).toBeGreaterThan(0);
    expect(entries[0].categories.length).toBeGreaterThan(0);
  });

  it('gives an ISO published date', () => {
    expect(String(entries[0].published)).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});

describe('parseWikiOnThisDay', () => {
  const items = parseWikiOnThisDay(onThisDayJson, { date: '2026-09-19' });

  it('drops events from 2000 onwards and events with no linked article', () => {
    expect(items.every((i) => Number(i.title.slice(0, 4)) < 2000)).toBe(true);
    expect(items.some((i) => i.title.includes('no linked article'))).toBe(false);
    expect(items.some((i) => i.title.includes('A very recent event'))).toBe(false);
  });

  it('titles items "{year}: {text}" and links the first page', () => {
    expect(items[0].title).toMatch(/^\d{3,4}: .+/);
    expect(items[0].link).toMatch(/^https:\/\/en\.wikipedia\.org\/wiki\//);
  });

  it('dates the items today, not in the year of the event', () => {
    for (const item of items) expect(String(item.published).startsWith('2026-09-19')).toBe(true);
  });

  it('sorts the most recent year first', () => {
    const years = items.map((i) => Number(i.year));
    expect([...years].sort((a, b) => b - a)).toEqual(years);
  });
});

describe('parseWikiFeatured', () => {
  it("returns today's featured article plus at most two most-read", () => {
    const items = parseWikiFeatured(featuredJson, { date: '2026-09-19' });
    expect(items.length).toBeLessThanOrEqual(3);
    expect(items.length).toBeGreaterThanOrEqual(1);
    expect(items[0].categories).toContain('featured');
    for (const item of items) {
      expect(item.link).toMatch(/^https:\/\/en\.wikipedia\.org\/wiki\//);
      expect(item.summary.length).toBeGreaterThan(0);
      expect(item.summary.length).toBeLessThanOrEqual(500);
    }
  });

  it('never repeats the same article twice', () => {
    const items = parseWikiFeatured(featuredJson, { date: '2026-09-19' });
    expect(new Set(items.map((i) => i.link)).size).toBe(items.length);
  });
});

describe('parseHnAlgolia', () => {
  const items = parseHnAlgolia(hnJson);

  it('drops stories below the point threshold', () => {
    expect(items.every((i) => Number(i.points) >= 100)).toBe(true);
    expect(items.some((i) => i.title.includes('low-scoring'))).toBe(false);
  });

  it('falls back to the discussion page when a story has no url', () => {
    const ask = items.find((i) => i.title.includes('Ask HN'));
    expect(ask?.link).toBe('https://news.ycombinator.com/item?id=222');
  });

  it('sorts by points and mentions the discussion in the summary', () => {
    const points = items.map((i) => Number(i.points));
    expect([...points].sort((a, b) => b - a)).toEqual(points);
    expect(items[0].summary).toMatch(/points, \d+ comments on Hacker News/);
  });

  it('honours a custom minimum', () => {
    expect(parseHnAlgolia(hnJson, { minPoints: 100000 })).toHaveLength(0);
  });
});

describe('parseByKind', () => {
  it('auto-detects atom even when the registry says rss', () => {
    expect(parseByKind('rss', atomXml)).toHaveLength(3);
  });

  it('auto-detects rss even when the registry says atom', () => {
    expect(parseByKind('atom', rssXml)).toHaveLength(5);
  });

  it('dispatches the JSON kinds', () => {
    expect(parseByKind('hn-algolia', hnJson).length).toBeGreaterThan(0);
    expect(parseByKind('wiki-onthisday', onThisDayJson, { date: '2026-09-19' }).length).toBeGreaterThan(0);
    expect(parseByKind('wiki-featured', featuredJson, { date: '2026-09-19' }).length).toBeGreaterThan(0);
  });
});

describe('looksLikeFeed', () => {
  const emptyArxiv = `<?xml version='1.0' encoding='UTF-8'?>
    <rss version="2.0"><channel><title>cs.LG updates</title>
    <skipDays><day>Saturday</day></skipDays></channel></rss>`;

  it('recognises a valid feed with no items (arXiv on a weekend)', () => {
    expect(parseByKind('rss', emptyArxiv)).toHaveLength(0);
    expect(looksLikeFeed(emptyArxiv)).toBe(true);
  });

  it('rejects an HTML error page', () => {
    expect(looksLikeFeed('<!doctype html><html><body>Temporarily offline</body></html>')).toBe(false);
    expect(looksLikeFeed('')).toBe(false);
  });

  it('accepts JSON payloads for the JSON kinds', () => {
    expect(looksLikeFeed(hnJson, 'hn-algolia')).toBe(true);
    expect(looksLikeFeed('not json', 'hn-algolia')).toBe(false);
  });
});
