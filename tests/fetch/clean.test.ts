import { describe, expect, it } from 'vitest';

import {
  SUMMARY_MAX,
  bogotaDate,
  canonicalUrl,
  cleanSummary,
  decodeEntities,
  expandDateTemplate,
  foldText,
  idFor,
  normalizeTitle,
  sha1,
  stripHtml,
  toIso,
  truncate,
} from '../../scripts/lib/feeds.mjs';

describe('stripHtml', () => {
  it('removes tags and keeps the words apart', () => {
    expect(stripHtml('<p>One</p><p>Two</p>')).toBe('One Two');
    expect(stripHtml('a<br>b')).toBe('a b');
    expect(stripHtml('<ul><li>x</li><li>y</li></ul>')).toBe('x y');
  });

  it('removes an <img> tag with a 500-character srcset', () => {
    const srcset = Array.from({ length: 40 }, (_, i) => `https://cdn.example/a.png?w=${i} ${i}w`).join(', ');
    const html = `<img src="https://cdn.example/a.png" srcset="${srcset}" /> Real text.`;
    expect(stripHtml(html)).toBe('Real text.');
  });

  it('drops script and style blocks with their contents', () => {
    expect(stripHtml('<style>p{color:red}</style><script>alert(1)</script>Body')).toBe('Body');
  });

  it('decodes entities, including doubly escaped markup', () => {
    expect(stripHtml('&lt;p&gt;caf&eacute; &amp;amp; pan&lt;/p&gt;')).toBe('café & pan');
    expect(stripHtml('caf&#233; &#x2014; listo')).toBe('café — listo');
  });

  it('collapses whitespace and non-breaking spaces', () => {
    expect(stripHtml('a \n\t b&nbsp;&nbsp;c')).toBe('a b c');
  });

  it('is safe on empty and non-string input', () => {
    expect(stripHtml('')).toBe('');
    expect(stripHtml(null)).toBe('');
    expect(stripHtml(undefined)).toBe('');
  });
});

describe('decodeEntities', () => {
  it('handles named, decimal and hex entities', () => {
    expect(decodeEntities('&amp;&lt;&gt;&quot;&apos;')).toBe('&<>"\'');
    expect(decodeEntities('&ntilde;o&ntilde;o')).toBe('ñoño');
    expect(decodeEntities('&#8212;&#x2026;')).toBe('—…');
  });

  it('leaves unknown entities alone', () => {
    expect(decodeEntities('&notanentity;')).toBe('&notanentity;');
  });
});

describe('truncate', () => {
  it('leaves short strings untouched', () => {
    expect(truncate('short', 500)).toBe('short');
  });

  it('cuts on a word boundary and adds an ellipsis', () => {
    const out = truncate(`${'word '.repeat(200)}end`, 100);
    expect(out.length).toBeLessThanOrEqual(100);
    expect(out.endsWith('…')).toBe(true);
    expect(out).not.toMatch(/wor…$/);
  });

  it('caps summaries at 500 characters by default', () => {
    const out = cleanSummary('<p>' + 'lorem ipsum dolor sit amet '.repeat(100) + '</p>');
    expect(out.length).toBeLessThanOrEqual(SUMMARY_MAX);
    expect(SUMMARY_MAX).toBe(500);
  });
});

describe('normalizeTitle', () => {
  it('folds case, accents, punctuation and leading articles', () => {
    expect(normalizeTitle('¿Qué dicen los datos, señor?')).toBe('que dicen datos senor');
    expect(normalizeTitle('The Riemann Hypothesis!')).toBe('riemann hypothesis');
  });

  it('collapses two spellings of the same headline', () => {
    expect(normalizeTitle('Neurons &amp; genes — a CRISPR map')).toBe(
      normalizeTitle('Neurons and genes: a CRISPR map'),
    );
  });

  it('folds text for keyword matching', () => {
    expect(foldText('POLARIZACIÓN')).toBe('polarizacion');
  });
});

describe('toIso', () => {
  it('parses RFC 822 pubDates', () => {
    expect(toIso('Thu, 17 Sep 2026 14:30:00 +0000')).toBe('2026-09-17T14:30:00.000Z');
    expect(toIso('Tue, 15 Sep 2026 11:00:00 GMT')).toBe('2026-09-15T11:00:00.000Z');
  });

  it('parses ISO strings and bare dates (at midday, so the day cannot slip)', () => {
    expect(toIso('2026-09-16T09:00:00Z')).toBe('2026-09-16T09:00:00.000Z');
    expect(toIso('2026-09-16')).toBe('2026-09-16T12:00:00.000Z');
  });

  it('returns null for junk and out-of-range years', () => {
    expect(toIso('')).toBeNull();
    expect(toIso(null)).toBeNull();
    expect(toIso('not a date')).toBeNull();
    expect(toIso('1066-10-14T00:00:00Z')).toBeNull();
  });
});

describe('bogotaDate', () => {
  it('is five hours behind UTC', () => {
    // 03:00 UTC on the 20th is still the 19th in Bogotá
    expect(bogotaDate(Date.parse('2026-09-20T03:00:00Z')).date).toBe('2026-09-19');
    expect(bogotaDate(Date.parse('2026-09-20T05:00:00Z')).date).toBe('2026-09-20');
  });

  it('zero-pads month and day', () => {
    const d = bogotaDate(Date.parse('2026-01-05T18:00:00Z'));
    expect(d).toMatchObject({ yyyy: '2026', mm: '01', dd: '05', date: '2026-01-05' });
  });

  it('fills {YYYY}/{MM}/{DD} in a source URL', () => {
    const url = 'https://api.wikimedia.org/feed/v1/wikipedia/en/featured/{YYYY}/{MM}/{DD}';
    expect(expandDateTemplate(url, Date.parse('2026-09-20T03:00:00Z'))).toBe(
      'https://api.wikimedia.org/feed/v1/wikipedia/en/featured/2026/09/19',
    );
    expect(expandDateTemplate('.../onthisday/events/{MM}/{DD}', Date.parse('2026-03-02T18:00:00Z'))).toBe(
      '.../onthisday/events/03/02',
    );
  });
});

describe('ids and urls', () => {
  it('derives a stable 12-hex id from the url', () => {
    expect(sha1('abc')).toBe('a9993e364706816aba3e25717850c26c9cd0d89d');
    expect(idFor('https://example.org/a')).toMatch(/^[0-9a-f]{12}$/);
    expect(idFor('https://example.org/a')).toBe(idFor('https://example.org/a'));
    expect(idFor('https://example.org/a')).not.toBe(idFor('https://example.org/b'));
  });

  it('canonicalizes urls before hashing', () => {
    expect(canonicalUrl('http://www.Example.org/a/?utm_source=rss#top')).toBe('https://example.org/a');
    expect(idFor('https://arxiv.org/abs/2509.01234v2')).toBe(idFor('https://arxiv.org/abs/2509.01234'));
    expect(canonicalUrl('https://example.org/')).toBe('https://example.org/');
  });
});
