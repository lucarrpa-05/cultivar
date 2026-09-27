// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import type { Card } from '@/types';
import { cardLink } from '@/ui/actions';
import { formatLabel, layoutCard, plainText, renderCardImage, stripMarkdown, wrapLines } from '@/ui/share';
import { meta } from './fixtures';

const tenPx = (s: string) => s.length * 10;
const measure = (s: string) => s.length * 10;

function card(over: Partial<Card> = {}): Card {
  return {
    ...meta('math.share-test'),
    body: 'A short body.',
    rigor: null,
    recall: null,
    sources: [],
    ...over,
  };
}

describe('stripMarkdown', () => {
  it('drops emphasis, code ticks and link targets', () => {
    expect(stripMarkdown('A **bold** and *soft* and _quiet_ claim')).toBe('A bold and soft and quiet claim');
    expect(stripMarkdown('Run `npm test` now')).toBe('Run npm test now');
    expect(stripMarkdown('See [the paper](https://example.com/x) first')).toBe('See the paper first');
  });

  it('turns lists, quotes and headings into plain lines', () => {
    expect(stripMarkdown('- one\n* two\n+ three')).toBe('· one\n· two\n· three');
    expect(stripMarkdown('> To be\n> or not')).toBe('To be\nor not');
    expect(stripMarkdown('### The trick\n\nIt works.')).toBe('The trick\n\nIt works.');
  });

  it('keeps TeX without the dollars', () => {
    expect(stripMarkdown('Let $x_1 * y_2$ be small.')).toBe('Let x_1 * y_2 be small.');
    expect(stripMarkdown('Then\n$$\\int_0^1 x\\,dx$$\nholds.')).toBe('Then\n\\int_0^1 x\\,dx\nholds.');
    expect(stripMarkdown('So $$a^2+b^2=c^2$$ always.')).toBe('So\na^2+b^2=c^2\nalways.');
  });

  it('leaves dollars and stars inside code alone', () => {
    expect(stripMarkdown('Use `$PATH` and `a*b*c`.')).toBe('Use $PATH and a*b*c.');
  });

  it('collapses runs of blank lines', () => {
    expect(stripMarkdown('one\n\n\n\n\ntwo   \n\n\nthree')).toBe('one\n\ntwo\n\nthree');
  });
});

describe('wrapLines', () => {
  it('wraps greedily at the width', () => {
    const lines = wrapLines('the quick brown fox jumps over the lazy dog', 100, tenPx);
    expect(lines).toEqual(['the quick', 'brown fox', 'jumps over', 'the lazy', 'dog']);
    for (const l of lines) expect(tenPx(l)).toBeLessThanOrEqual(100);
  });

  it('hard-breaks a word longer than the line', () => {
    const lines = wrapLines(`start ${'x'.repeat(200)} end`, 100, tenPx);
    expect(lines[0]).toBe('start');
    expect(lines.filter((l) => /^x+$/.test(l))).toHaveLength(20);
    expect(lines[lines.length - 1]).toBe('end');
    for (const l of lines) expect(tenPx(l)).toBeLessThanOrEqual(100);
  });

  it('keeps paragraph breaks', () => {
    expect(wrapLines('one two\n\nthree', 1000, tenPx)).toEqual(['one two', '', 'three']);
  });
});

describe('layoutCard', () => {
  it('always places the title, hook, domain and wordmark', () => {
    const l = layoutCard(card({ title: 'Why primes never run out', hook: 'An old proof' }), {
      measure,
      domainLabel: '∑ Mathematics',
    });
    const text = (role: string) => l.runs.filter((r) => r.role === role).map((r) => r.text).join(' ');
    expect(text('title')).toBe('Why primes never run out');
    expect(text('hook')).toBe('An old proof');
    expect(text('domain')).toBe('∑ Mathematics');
    expect(text('wordmark')).toBe('cultivar');
    expect(text('body')).toBe('A short body.');
    expect(l.truncated).toBe(false);
    expect(l.runs.find((r) => r.role === 'title')?.font).toContain('bold 60px');
    expect(l.runs.find((r) => r.role === 'hook')?.font).toContain('italic 38px');
  });

  it('flags truncation for a very long body and says where to read the rest', () => {
    const body = Array.from({ length: 30 }, (_, i) => `Paragraph ${i} ${'word '.repeat(40)}`).join('\n\n');
    const l = layoutCard(card({ body, sources: [{ title: 'Elements', author: 'Euclid', url: 'https://x', type: 'book' }] }), {
      measure,
      domainLabel: 'Math',
    });
    expect(l.truncated).toBe(true);
    expect(l.runs.some((r) => r.role === 'more' && r.text === '…')).toBe(true);
    expect(l.runs.some((r) => r.role === 'cta' && r.text === 'Read the rest in Cultivar')).toBe(true);
    expect(l.runs.some((r) => r.role === 'source' && r.text === 'Source: Euclid, Elements')).toBe(true);
    for (const r of l.runs) {
      expect(r.y).toBeGreaterThanOrEqual(0);
      expect(r.y + r.lineHeight).toBeLessThanOrEqual(l.height);
    }
    // No run overlaps the next one down on the left column.
    const left = l.runs.filter((r) => r.align === 'left').sort((a, b) => a.y - b.y);
    for (let i = 1; i < left.length; i++) expect(left[i].y).toBeGreaterThanOrEqual(left[i - 1].y + left[i - 1].lineHeight);
  });

  it('labels puzzles, stories and quotes only', () => {
    expect(formatLabel({ format: 'challenge' })).toBe('A puzzle');
    expect(formatLabel({ format: 'story' })).toBe('A story');
    expect(formatLabel({ format: 'quote' })).toBe('A quote');
    expect(formatLabel({ format: 'idea' })).toBe('');
    const l = layoutCard(card({ format: 'quote' }), { measure, domainLabel: 'Math' });
    expect(l.runs.find((r) => r.role === 'label')?.align).toBe('right');
  });
});

describe('plainText', () => {
  it('reads as a message and ends with the card link', () => {
    const c = card({
      title: 'Pigeonholes',
      hook: 'More birds than holes',
      body: 'If $n+1$ birds sit in **$n$** holes, one hole is shared.',
      sources: [{ title: 'Proofs from THE BOOK', author: 'Aigner & Ziegler', url: 'https://x', type: 'book' }],
    });
    const text = plainText(c);
    expect(text.startsWith('Pigeonholes\n\nMore birds than holes\n\nIf n+1 birds sit in n holes')).toBe(true);
    expect(text).toContain('Source: Aigner & Ziegler, Proofs from THE BOOK');
    expect(text.endsWith(cardLink(c.id))).toBe(true);
  });

  it('skips the source line when there is none', () => {
    const text = plainText(card());
    expect(text).not.toContain('Source:');
    expect(text.endsWith(cardLink('math.share-test'))).toBe(true);
  });
});

describe('renderCardImage', () => {
  it('returns null when there is no 2D context', async () => {
    const spy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    expect(await renderCardImage(card())).toBeNull();
    spy.mockRestore();
  });
});
