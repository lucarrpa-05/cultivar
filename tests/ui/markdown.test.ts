// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { renderMarkdown } from '@/ui/Markdown';

describe('renderMarkdown', () => {
  it('renders markdown through the allowlist', () => {
    const { html } = renderMarkdown('A **bold** claim\n\n- one\n- two');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('<li>one</li>');
  });

  it('pulls inline and display math out before marked sees it', () => {
    const { html, math } = renderMarkdown('Let $x_1$ be a point.\n\n$$\\int_0^1 x\\,dx$$');
    expect(math).toHaveLength(2);
    expect(math[0]).toEqual({ tex: 'x_1', display: false });
    expect(math[1].display).toBe(true);
    expect(html).toContain('data-math="0"');
    expect(html).toContain('data-math="1"');
    expect(html).not.toContain('$');
  });

  it('leaves dollars inside code alone', () => {
    const { html, math } = renderMarkdown('Use `$PATH` carefully.');
    expect(math).toHaveLength(0);
    expect(html).toContain('$PATH');
  });

  it('strips html embedded in the markdown', () => {
    const { html } = renderMarkdown('before\n\n<script>alert(1)</script>\n\nafter');
    expect(html).not.toContain('script');
  });
});
