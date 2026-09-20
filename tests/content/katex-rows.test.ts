import { describe, it, expect } from 'vitest';
// @ts-ignore — plain ESM module without types
import { checkMath } from '../../scripts/lib/parse-card.mjs';

describe('checkMath: row breaks inside KaTeX environments', () => {
  it('flags a single backslash + space used as a row break in cases', () => {
    const bad = String.raw`$$\begin{cases} a & x>0 \ b & x\le 0 \end{cases}$$`;
    const { problems } = checkMath(bad);
    expect(problems.some((p: string) => p.includes('row break'))).toBe(true);
  });

  it('flags a single backslash at end of line inside pmatrix', () => {
    const bad = '$$\\begin{pmatrix} 1 & 2 \\\n 3 & 4 \\end{pmatrix}$$';
    const { problems } = checkMath(bad);
    expect(problems.some((p: string) => p.includes('row break'))).toBe(true);
  });

  it('accepts proper double-backslash row breaks', () => {
    const good = String.raw`$$\begin{cases} a & x>0 \\ b & x\le 0 \end{cases}$$`;
    expect(checkMath(good).problems).toEqual([]);
    const good2 = String.raw`$$\begin{aligned} f(x) &= x^2 \\ g(x) &= \, x \end{aligned}$$`;
    expect(checkMath(good2).problems).toEqual([]);
  });

  it('ignores backslashes outside environments', () => {
    const ok = String.raw`Inline $\alpha \beta$ and display $$\sum_{i} x_i \le 1$$`;
    expect(checkMath(ok).problems).toEqual([]);
  });
});
