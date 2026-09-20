// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { sanitizeHtml, sanitizeSvg } from '@/ui/sanitize';

describe('sanitizeHtml', () => {
  it('keeps the allowlisted tags', () => {
    const out = sanitizeHtml('<p>Hello <em>there</em> <strong>you</strong></p><ul><li>one</li></ul>');
    expect(out).toContain('<em>there</em>');
    expect(out).toContain('<li>one</li>');
  });

  it('drops scripts and event handlers', () => {
    const out = sanitizeHtml('<p onclick="alert(1)">hi</p><script>alert(2)</script>');
    expect(out).not.toContain('script');
    expect(out).not.toContain('onclick');
    expect(out).toContain('hi');
  });

  it('unwraps tags that are not on the list but keeps their text', () => {
    const out = sanitizeHtml('<div><h1>Title</h1><img src="x.png">text</div>');
    expect(out).not.toContain('<div');
    expect(out).not.toContain('<h1');
    expect(out).not.toContain('<img');
    expect(out).toContain('Title');
    expect(out).toContain('text');
  });

  it('allows only https links and hardens them', () => {
    const ok = sanitizeHtml('<a href="https://example.com">x</a>');
    expect(ok).toContain('rel="noopener noreferrer"');
    const bad = sanitizeHtml('<a href="javascript:alert(1)">x</a>');
    expect(bad).not.toContain('javascript');
  });

  it('keeps math placeholders', () => {
    const out = sanitizeHtml('<p><span data-math="0" data-display="0"></span></p>');
    expect(out).toContain('data-math="0"');
  });
});

describe('sanitizeSvg', () => {
  it('strips scripts, handlers and external hrefs', () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10">
      <script>alert(1)</script><rect width="5" height="5" onclick="x()"/>
      <a href="https://evil.example"><text>x</text></a></svg>`;
    const out = sanitizeSvg(svg) ?? '';
    expect(out).not.toContain('script');
    expect(out).not.toContain('onclick');
    expect(out).not.toContain('evil.example');
    expect(out).toContain('viewBox');
    expect(out).not.toContain('width="10"');
  });

  it('returns null for something that is not svg', () => {
    expect(sanitizeSvg('<p>nope</p>')).toBeNull();
  });
});
