import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// @ts-ignore -- plain ESM tooling module, no type declarations
import { validateContent } from '../../scripts/validate-content.mjs';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const FIXTURES = path.join(ROOT, 'tests/content/fixtures/cards');
const fixture = (rel: string) => path.join(FIXTURES, rel);

const messages = (result: any) => result.problems.map((p: any) => `${p.severity}: ${p.message}`).join('\n');

describe('the corpus', () => {
  it('validates with zero errors', () => {
    const result = validateContent({});
    expect(messages(result)).not.toMatch(/^error:/m);
    expect(result.errorCount).toBe(0);
    expect(result.ok).toBe(true);
    expect(result.targets.length).toBeGreaterThanOrEqual(4);
  });

  it('summarizes what is in it', () => {
    const { summary } = validateContent({});
    expect(summary.cards).toBe(summary.reviewed + summary.unreviewed);
    const known = ['ai', 'bio', 'css', 'econ', 'hist', 'math', 'niche', 'phil', 'physics', 'poli', 'sports'];
    for (const d of Object.keys(summary.domain)) expect(known).toContain(d);
    expect(Object.keys(summary.domain)).toContain('math');
    expect(summary.language.es).toBeGreaterThanOrEqual(1);
    expect(summary.spanishShare).toBeCloseTo(summary.language.es / summary.cards, 5);
    expect(summary.withDiagram).toBeGreaterThanOrEqual(1);
  });

  it('enforces the shorter body limit on new reviews while preserving launch cards', () => {
    const launch = validateContent({}).targets.find((entry: any) =>
      entry.card?.reviewed?.at === '2026-09-19' &&
      entry.card?.format === 'idea' && entry.card.words.body > 120);
    expect(launch).toBeTruthy();
    const before = validateContent({ paths: [launch.abs] });
    expect(before.problems.some((p: any) => p.rule === 'body-words')).toBe(false);

    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'cultivar-length-'));
    try {
      const copied = path.join(temp, 'card.md');
      const source = fs.readFileSync(launch.abs, 'utf8');
      fs.writeFileSync(copied, source.replace('at: 2026-09-19', 'at: 2026-09-20'));
      const after = validateContent({ paths: [copied] });
      expect(after.problems.some((p: any) => p.rule === 'body-words' && p.severity === 'error')).toBe(true);
    } finally {
      fs.rmSync(temp, { recursive: true, force: true });
    }
  });

  it('fails every card when --require-review is on and nothing is reviewed', () => {
    const result = validateContent({ requireReview: true });
    expect(result.ok).toBe(result.summary.unreviewed === 0 && result.errorCount === 0);
    // reviewers stamp cards over time; only the unreviewed ones must be flagged
    const flagged = result.problems.filter((p: any) => p.rule === 'review').length;
    expect(flagged).toBe(result.summary.unreviewed);
    if (flagged > 0) expect(messages(result)).toMatch(/unreviewed/);
  });
});

describe('broken fixtures each fail with a useful message', () => {
  const cases: Array<[string, RegExp]> = [
    ['math/missing-recall.md', /`## Recall` section is required/],
    ['math/unbalanced-math.md', /KaTeX: an inline `\$` is never closed/],
    ['math/bad-topic.md', /topic `math\.topology\.compactnes` is not in content\/taxonomy\.json/],
    ['econ/wrong-domain.md', /move it to content\/cards\/math/],
    ['math/duplicate-id.md', /duplicate id `math\.topology\.compactness\.finitely-many-checks`/],
    ['math/oversize-title.md', /title is \d+ characters — the limit is 80/],
    ['math/bad-recall-option.md', /has no reason/],
  ];

  for (const [file, expected] of cases) {
    it(file, () => {
      const result = validateContent({ paths: [fixture(file)] });
      expect(result.ok, `${file} should fail:\n${messages(result)}`).toBe(false);
      const errors = result.problems.filter((p: any) => p.severity === 'error').map((p: any) => p.message);
      expect(errors.join('\n')).toMatch(expected);
    });
  }

  it('reports a series gap as a warning on a subset and an error with --strict', () => {
    const lenient = validateContent({ paths: [fixture('math/series-gap.md')] });
    const gapWarning = lenient.problems.find((p: any) => p.rule === 'series-gap');
    expect(gapWarning).toBeTruthy();
    expect(gapWarning.severity).toBe('warn');
    expect(gapWarning.message).toMatch(/missing episodes 2, 3 of 3/);
    expect(lenient.ok).toBe(true);

    const strict = validateContent({ paths: [fixture('math/series-gap.md')], strict: true });
    expect(strict.ok).toBe(false);
    expect(strict.problems.find((p: any) => p.rule === 'series-gap').severity).toBe('error');
  });

  it('rejects an unsafe diagram and a missing one', () => {
    const diagramsDir = path.join(ROOT, 'tests/content/fixtures/diagrams');
    const unsafe = validateContent({ paths: [fixture('math/unsafe-diagram.md')], diagramsDir });
    const text = unsafe.problems.map((p: any) => p.message).join('\n');
    expect(unsafe.ok).toBe(false);
    expect(text).toMatch(/contains <script>/);
    expect(text).toMatch(/has no viewBox/);
    expect(text).toMatch(/inline event handler/);
    expect(text).toMatch(/raster <image>/);
    expect(text).toMatch(/references an external resource/);
    expect(text).toMatch(/never uses currentColor/);

    const missing = validateContent({ paths: [fixture('math/missing-diagram.md')], diagramsDir });
    expect(missing.ok).toBe(false);
    expect(messages(missing)).toMatch(/does not exist/);
  });

  it('never lets a fixture leak into the shipped corpus', () => {
    const result = validateContent({});
    expect(result.targets.map((t: any) => t.rel).join('\n')).not.toMatch(/tests\//);
  });
});
