import { afterAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// @ts-ignore -- plain ESM tooling module, no type declarations
import { buildContent } from '../../scripts/build-content.mjs';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const BUILT_AT = '2026-01-01T00:00:00.000Z';
const tmpDirs: string[] = [];

function build(options: Record<string, unknown> = {}) {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'cultivar-content-'));
  tmpDirs.push(out);
  const result = buildContent({ outDir: out, builtAt: BUILT_AT, ...options });
  return { out, ...result };
}

const readJson = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'));

afterAll(() => {
  for (const dir of tmpDirs) fs.rmSync(dir, { recursive: true, force: true });
});

describe('build-content', () => {
  it('writes index.json, the shards, taxonomy.json and questions.json', () => {
    const { out, report } = build();
    expect(fs.existsSync(path.join(out, 'index.json'))).toBe(true);
    expect(fs.existsSync(path.join(out, 'taxonomy.json'))).toBe(true);
    expect(fs.existsSync(path.join(out, 'questions.json'))).toBe(true);

    const index = readJson(path.join(out, 'index.json'));
    expect(index.builtAt).toBe(BUILT_AT);
    expect(index.count).toBe(index.cards.length);
    expect(index.count).toBe(report.cards);
    expect(index.count).toBeGreaterThanOrEqual(4);

    // sorted by id, one shard per domain, counts agree with the index
    const ids = index.cards.map((c: any) => c.id);
    expect(ids).toEqual([...ids].sort());
    const perDomain: Record<string, number> = {};
    for (const c of index.cards) perDomain[c.domain] = (perDomain[c.domain] || 0) + 1;
    expect(report.domains).toEqual(perDomain);
    for (const domain of Object.keys(perDomain)) {
      const shard = readJson(path.join(out, 'cards', `${domain}.json`));
      expect(Object.keys(shard)).toHaveLength(perDomain[domain]);
      expect(Object.keys(shard)).toEqual([...Object.keys(shard)].sort());
    }

    // no bodies in the index; everything in the shard
    expect(index.cards[0].body).toBeUndefined();
    expect(index.cards[0].sources).toBeUndefined();
    expect(readJson(path.join(out, 'questions.json'))).toEqual([]);
    expect(readJson(path.join(out, 'taxonomy.json')).nodes.length)
      .toBe(readJson(path.join(ROOT, 'content/taxonomy.json')).nodes.length);
  });

  it('inlines the diagram SVG in the shard and keeps rigor/recall shapes', () => {
    const { out } = build();
    const math = readJson(path.join(out, 'cards', 'math.json'));
    const card = math['math.topology.compactness.finitely-many-checks'];
    expect(card.hasDiagram).toBe(true);
    expect(card.diagram.svg).toMatch(/^<svg/);
    expect(card.diagram.svg).toMatch(/viewBox=/);
    expect(card.diagram.caption.length).toBeGreaterThan(0);
    expect(typeof card.rigor).toBe('string');
    expect(card.recall.type).toBe('mcq');
    expect(card.body.length).toBeGreaterThan(80);

    const hist = readJson(path.join(out, 'cards', 'hist.json'));
    const es = hist['hist.latam.colombia.la-hora-gaviria'];
    expect(es.rigor).toBeNull();          // Card.rigor is markdown | null
    expect(es.recall.type).toBe('reveal');
    expect(es.diagram).toBeUndefined();
  });

  it('is deterministic for a fixed builtAt', () => {
    const a = build();
    const b = build();
    expect(fs.readFileSync(path.join(a.out, 'index.json'), 'utf8'))
      .toBe(fs.readFileSync(path.join(b.out, 'index.json'), 'utf8'));
    expect(fs.readFileSync(path.join(a.out, 'cards', 'math.json'), 'utf8'))
      .toBe(fs.readFileSync(path.join(b.out, 'cards', 'math.json'), 'utf8'));
  });

  it('skips unreviewed cards with --require-review and says how many', () => {
    const { out, report, skipped } = build({ requireReview: true });
    const index = readJson(path.join(out, 'index.json'));
    expect(report.skippedUnreviewed).toBe(skipped.length);
    expect(report.skippedUnreviewed).toBeGreaterThanOrEqual(0);
    expect(index.count).toBe(report.cards);
    expect(index.cards.every((c: any) => c.reviewed)).toBe(true);
  });

  it('never publishes private question text', () => {
    const privateDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cultivar-private-question-'));
    tmpDirs.push(privateDir);
    const privateFile = path.join(privateDir, 'questions.json');
    fs.writeFileSync(privateFile, JSON.stringify([{ id: 'q-secret', text: 'PRIVATE QUESTION TEXT', status: 'answered' }]));
    const { out } = build({ questionsFile: privateFile });
    expect(readJson(path.join(out, 'questions.json'))).toEqual([]);
    expect(fs.readFileSync(path.join(out, 'index.json'), 'utf8')).not.toContain('PRIVATE QUESTION TEXT');
  });

  it('removes stale private recap files from the public output', () => {
    const out = fs.mkdtempSync(path.join(os.tmpdir(), 'cultivar-public-recap-'));
    tmpDirs.push(out);
    fs.writeFileSync(path.join(out, 'recap-2026-08.md'), 'PRIVATE READING HISTORY');
    buildContent({ outDir: out, builtAt: BUILT_AT });
    expect(fs.existsSync(path.join(out, 'recap-2026-08.md'))).toBe(false);
  });
});
