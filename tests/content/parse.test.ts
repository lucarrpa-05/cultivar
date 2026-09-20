import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// @ts-ignore -- plain ESM tooling module, no type declarations
import { parseCardFile, parseCardText, parseRecall, countWords, toSchemaSubject } from '../../scripts/lib/parse-card.mjs';
// @ts-ignore -- plain ESM tooling module, no type declarations
import { loadTaxonomy } from '../../scripts/lib/taxonomy.mjs';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const card = (rel: string) => path.join(ROOT, rel);
const taxonomy = loadTaxonomy();

const SAMPLES = {
  compactness: 'content/cards/math/topology/finitely-many-checks.md',
  doubleDescent: 'content/cards/ai/theory/the-curve-that-shouldnt-exist.md',
  mug: 'content/cards/econ/behavioral/the-mug-worth-twice-as-much.md',
  gaviria: 'content/cards/hist/latam/la-hora-gaviria.md',
};

describe('parseCardFile — the golden samples', () => {
  it('parses all four with no errors and no warnings', () => {
    for (const rel of Object.values(SAMPLES)) {
      const { card: parsed, errors, warnings } = parseCardFile(card(rel), { taxonomy });
      expect(errors, `${rel} errors`).toEqual([]);
      expect(warnings, `${rel} warnings`).toEqual([]);
      expect(parsed).toBeTruthy();
      expect(parsed.file).toBe(rel);
    }
  });

  it('derives layer, domain, prerequisites, evergreen and the flags', () => {
    const { card: c } = parseCardFile(card(SAMPLES.compactness), { taxonomy });
    expect(c.id).toBe('math.topology.compactness.finitely-many-checks');
    expect(c.domain).toBe('math');
    expect(c.layer).toBe('both'); // Rigor section present
    expect(c.evergreen).toBe(true);
    expect(c.hasRigor).toBe(true);
    expect(c.hasRecall).toBe(true);
    expect(c.hasDiagram).toBe(true);
    // no `prerequisites:` in front matter -> the taxonomy's prereqs for the topic
    expect(c.prerequisites).toEqual(taxonomy.prereqsOf('math.topology.compactness'));
    expect(c.words.body).toBeGreaterThan(40);
    expect(c.words.body).toBeLessThanOrEqual(190);
    expect(c.words.rigor).toBeGreaterThan(40);
  });

  it('defaults layer to intuition when there is no Rigor section', () => {
    const { card: c } = parseCardFile(card(SAMPLES.gaviria), { taxonomy });
    expect(c.layer).toBe('intuition');
    expect(c.hasRigor).toBe(false);
    expect(c.rigorBody).toBeNull();
    expect(c.words.rigor).toBe(0);
    expect(c.language).toBe('es');
  });

  it('keeps the title and body separate, body stopping at the first ##', () => {
    const { card: c } = parseCardFile(card(SAMPLES.doubleDescent), { taxonomy });
    expect(c.title).toBe("The curve that isn't supposed to exist");
    expect(c.body).not.toMatch(/^## /m);
    expect(c.body.startsWith('Every statistics course')).toBe(true);
    expect(c.rigorBody).toMatch(/minimum-norm/);
  });

  it('only inlines the diagram SVG when asked to', () => {
    const plain = parseCardFile(card(SAMPLES.compactness), { taxonomy });
    expect(plain.card.diagram.svg).toBeUndefined();

    const built = parseCardFile(card(SAMPLES.compactness), { taxonomy, inlineDiagram: true });
    expect(built.errors).toEqual([]);
    expect(built.card.diagram.file).toBe('math/compactness-open-cover.svg');
    expect(built.card.diagram.svg).toMatch(/^<svg/);
    expect(built.card.diagram.svg).toMatch(/viewBox=/);
  });
});

describe('recall parsing', () => {
  it('parses the mcq format with em-dash reasons', () => {
    const { card: c } = parseCardFile(card(SAMPLES.compactness), { taxonomy });
    expect(c.recall.type).toBe('mcq');
    expect(c.recall.question).toBe('Which of these is compact in the usual topology?');
    expect(c.recall.options).toHaveLength(4);
    expect(c.recall.options.filter((o: any) => o.correct)).toHaveLength(1);
    expect(c.recall.options[1]).toEqual({
      text: '$[0,1]$',
      correct: true,
      why: 'closed and bounded in ℝ, so Heine–Borel applies.',
    });
    for (const o of c.recall.options) expect(o.why.length).toBeGreaterThan(3);
  });

  it('parses the reveal format', () => {
    const { card: c } = parseCardFile(card(SAMPLES.gaviria), { taxonomy });
    expect(c.recall.type).toBe('reveal');
    expect(c.recall.question).toMatch(/^¿Qué problema de incentivos/);
    expect(c.recall.answer).toMatch(/cargo por confiabilidad/);
    expect(c.recall.options).toBeUndefined();
  });

  it('tolerates an en dash or hyphen separator, with a warning', () => {
    const enDash = parseRecall('type: mcq\nQ: Does it still parse?\n- [x] Yes – with a warning.\n- [ ] No - also a warning.\n');
    expect(enDash.errors).toEqual([]);
    expect(enDash.warnings).toHaveLength(2);
    expect(enDash.warnings[0]).toMatch(/en dash/);
    expect(enDash.recall.options[0]).toEqual({ text: 'Yes', correct: true, why: 'with a warning.' });
    expect(enDash.recall.options[1].why).toBe('also a warning.');
  });

  it('reports an option with no reason and a missing type line', () => {
    const noReason = parseRecall('type: mcq\nQ: What now?\n- [x] A bare option\n- [ ] Another one — with a reason.\n');
    expect(noReason.errors.join(' ')).toMatch(/has no reason/);

    const noType = parseRecall('Q: Where is the type line?\n');
    expect(noType.errors.join(' ')).toMatch(/type: mcq. or .type: reveal/);
  });
});

describe('text helpers', () => {
  it('counts words, not markdown or math', () => {
    expect(countWords('one two three')).toBe(3);
    // a formula counts as a single word, links count as their text, bullets do not count
    expect(countWords('- the set $\\bigcup_{i\\in I}U_i$ is [open](https://example.com)')).toBe(5);
    expect(countWords('```\nignored code block\n```\nreal words here')).toBe(3);
  });

  it('strips the derived-only keys before JSON-schema validation', () => {
    const { card: c } = parseCardFile(card(SAMPLES.compactness), { taxonomy, inlineDiagram: true });
    const subject = toSchemaSubject(c);
    expect(subject.domain).toBeUndefined();
    expect(subject.hasRigor).toBeUndefined();
    expect(subject.diagram.svg).toBeUndefined();
    expect(c.diagram.svg).toMatch(/^<svg/); // the original is untouched
    expect(subject.title).toBe(c.title);
  });

  it('fails cleanly on a file with no front matter', () => {
    const { card: c, errors } = parseCardText('# Just a heading\n\nNo front matter here.\n', { taxonomy });
    expect(c).toBeNull();
    expect(errors.join(' ')).toMatch(/front matter/);
  });
});
