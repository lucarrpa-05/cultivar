#!/usr/bin/env node
/**
 * Build the JSON the app consumes (.data/docs/SCHEMA.md §3, types in src/types.ts):
 *
 *   public/content/taxonomy.json          copy of content/taxonomy.json
 *   public/content/index.json             { builtAt, count, cards: CardMeta[] }   (no bodies)
 *   public/content/cards/<domain>.json    Record<CardId, Card>                    (bodies + inlined SVG)
 *   public/content/questions.json         copy of .data/questions.json, or []
 *
 * Validation runs first; any error fails the build.
 *
 *   node scripts/build-content.mjs                  # everything that validates
 *   node scripts/build-content.mjs --require-review # only reviewed cards (what `npm run build` does)
 *   node scripts/build-content.mjs --out dist/content
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

import { loadTaxonomy, REPO_ROOT, TAXONOMY_FILE, CARDS_DIR } from './lib/taxonomy.mjs';
import { parseCardFile } from './lib/parse-card.mjs';
import { validateContent, walkMarkdown } from './validate-content.mjs';

const DEFAULT_OUT = path.join(REPO_ROOT, 'public', 'content');
const QUESTIONS_SRC = path.join(REPO_ROOT, '.data', 'questions.json');

/** CardMeta, in the order src/types.ts declares it. */
function toMeta(card) {
  const meta = {
    id: card.id,
    topic: card.topic,
    ...(card.topics ? { topics: card.topics } : {}),
    domain: card.domain,
    format: card.format,
    layer: card.layer,
    ...(card.intuitionCard ? { intuitionCard: card.intuitionCard } : {}),
    difficulty: card.difficulty,
    language: card.language,
    weight: card.weight,
    angles: card.angles,
    tags: card.tags,
    prerequisites: card.prerequisites,
    title: card.title,
    ...(card.hook ? { hook: card.hook } : {}),
    ...(card.series ? { series: card.series } : {}),
    ...(card.seriesPrev ? { seriesPrev: card.seriesPrev } : {}),
    ...(card.seriesNext ? { seriesNext: card.seriesNext } : {}),
    ...(card.callback ? { callback: card.callback } : {}),
    ...(card.related ? { related: card.related } : {}),
    dates: card.dates,
    evergreen: card.evergreen,
    hasRigor: card.hasRigor,
    hasRecall: card.hasRecall,
    hasDiagram: card.hasDiagram,
    words: card.words,
    author: card.author,
    ...(card.reviewed ? { reviewed: card.reviewed } : {}),
    ...(card.answersQuestion ? { answersQuestion: card.answersQuestion } : {}),
    ...(card.context ? { context: card.context } : {}),
  };
  return meta;
}

/** Card = CardMeta + body/rigor/recall/sources/diagram. */
function toCard(card) {
  return {
    ...toMeta(card),
    body: card.body,
    rigor: card.rigorBody ?? null,
    recall: card.recall ?? null,
    sources: card.sources,
    ...(card.diagram ? { diagram: card.diagram } : {}),
  };
}

/**
 * @param {{outDir?: string, requireReview?: boolean, root?: string, cardsDir?: string,
 *          skipValidation?: boolean, builtAt?: string, write?: boolean}} options
 */
export function buildContent(options = {}) {
  const root = options.root || REPO_ROOT;
  const outDir = options.outDir ? path.resolve(root, options.outDir) : DEFAULT_OUT;
  const cardsDir = options.cardsDir || CARDS_DIR;
  const taxonomy = options.taxonomy || loadTaxonomy(options.taxonomyFile || TAXONOMY_FILE);
  const requireReview = Boolean(options.requireReview);

  // 1 ── validate (never ship something that fails SCHEMA §4) ───────────────
  let validation = null;
  if (!options.skipValidation) {
    validation = validateContent({ root, cardsDir, taxonomy });
    if (!validation.ok) {
      const err = new Error(`content validation failed with ${validation.errorCount} error(s)`);
      err.validation = validation;
      throw err;
    }
  }

  // 2 ── parse again, this time inlining diagram SVGs ───────────────────────
  const files = walkMarkdown(cardsDir);
  const parsed = [];
  const parseProblems = [];
  for (const file of files) {
    const { card, errors } = parseCardFile(file, { taxonomy, root, inlineDiagram: true });
    const rel = path.relative(root, file).split(path.sep).join('/');
    for (const e of errors) parseProblems.push(`${rel}: ${e}`);
    if (card) parsed.push(card);
  }
  if (parseProblems.length) {
    const err = new Error(`could not parse ${parseProblems.length} card file(s):\n${parseProblems.join('\n')}`);
    err.parseProblems = parseProblems;
    throw err;
  }

  // 3 ── review filter ──────────────────────────────────────────────────────
  const skipped = requireReview ? parsed.filter((c) => !c.reviewed) : [];
  const kept = requireReview ? parsed.filter((c) => Boolean(c.reviewed)) : parsed;
  kept.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

  // 4 ── series neighbours ──────────────────────────────────────────────────
  const bySeries = new Map();
  for (const c of kept) {
    if (!c.series?.id || typeof c.series.index !== 'number') continue;
    if (!bySeries.has(c.series.id)) bySeries.set(c.series.id, new Map());
    bySeries.get(c.series.id).set(c.series.index, c);
  }
  for (const c of kept) {
    if (!c.series?.id) continue;
    const episodes = bySeries.get(c.series.id);
    const prev = episodes.get(c.series.index - 1);
    const next = episodes.get(c.series.index + 1);
    if (prev) c.seriesPrev = prev.id;
    if (next) c.seriesNext = next.id;
  }

  // 5 ── index + shards ─────────────────────────────────────────────────────
  const builtAt = options.builtAt || process.env.CULTIVAR_BUILT_AT || new Date().toISOString();
  const index = { builtAt, count: kept.length, cards: kept.map(toMeta) };

  /** @type {Map<string, Record<string, object>>} */
  const shards = new Map();
  for (const c of kept) {
    if (!shards.has(c.domain)) shards.set(c.domain, {});
    shards.get(c.domain)[c.id] = toCard(c);
  }
  const sortedShards = new Map(
    [...shards.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([domain, record]) => [
        domain,
        Object.fromEntries(Object.keys(record).sort().map((id) => [id, record[id]])),
      ]),
  );

  // 6 ── questions ──────────────────────────────────────────────────────────
  let questions = [];
  let questionsFrom = null;
  const questionsSrc = options.questionsFile || QUESTIONS_SRC;
  if (fs.existsSync(questionsSrc)) {
    try {
      questions = JSON.parse(fs.readFileSync(questionsSrc, 'utf8'));
      questionsFrom = path.relative(root, questionsSrc).split(path.sep).join('/');
    } catch (err) {
      throw new Error(`${questionsSrc} is not valid JSON: ${err.message}`);
    }
  }

  // 7 ── write ──────────────────────────────────────────────────────────────
  const written = [];
  if (options.write !== false) {
    fs.mkdirSync(outDir, { recursive: true });
    const cardsOut = path.join(outDir, 'cards');
    fs.rmSync(cardsOut, { recursive: true, force: true });
    fs.mkdirSync(cardsOut, { recursive: true });

    fs.copyFileSync(options.taxonomyFile || TAXONOMY_FILE, path.join(outDir, 'taxonomy.json'));
    written.push(rel(outDir, root, 'taxonomy.json'));

    writeJson(path.join(outDir, 'index.json'), index);
    written.push(rel(outDir, root, 'index.json'));

    for (const [domain, record] of sortedShards) {
      writeJson(path.join(cardsOut, `${domain}.json`), record);
      written.push(rel(outDir, root, `cards/${domain}.json`));
    }

    writeJson(path.join(outDir, 'questions.json'), questions);
    written.push(rel(outDir, root, 'questions.json'));
  }

  const report = {
    outDir: path.relative(root, outDir).split(path.sep).join('/'),
    cards: kept.length,
    skippedUnreviewed: skipped.length,
    domains: Object.fromEntries([...sortedShards].map(([d, r]) => [d, Object.keys(r).length])),
    series: bySeries.size,
    questions: questions.length,
    questionsFrom,
    written,
    warnings: validation ? validation.warningCount : 0,
    builtAt,
  };

  return { index, shards: sortedShards, questions, report, skipped, validation };
}

function rel(outDir, root, name) {
  return path.join(path.relative(root, outDir), name).split(path.sep).join('/');
}

function writeJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data)}\n`, 'utf8');
}

// ───────────────────────────── CLI ─────────────────────────────

function parseArgs(argv) {
  const opts = { requireReview: false, quiet: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--require-review') opts.requireReview = true;
    else if (arg === '--out') opts.outDir = argv[++i];
    else if (arg.startsWith('--out=')) opts.outDir = arg.slice('--out='.length);
    else if (arg === '--quiet' || arg === '-q') opts.quiet = true;
    else if (arg === '--help' || arg === '-h') opts.help = true;
    else opts.unknown = (opts.unknown || []).concat(arg);
  }
  return opts;
}

function main(argv) {
  const opts = parseArgs(argv);
  if (opts.help) {
    console.log('usage: node scripts/build-content.mjs [--require-review] [--out <dir>] [--quiet]');
    return 0;
  }
  if (opts.unknown) {
    console.error(`unknown argument(s): ${opts.unknown.join(', ')}`);
    return 2;
  }

  let result;
  try {
    result = buildContent(opts);
  } catch (err) {
    if (err.validation) {
      for (const p of err.validation.problems) {
        if (p.severity !== 'error') continue;
        console.error(`${p.file}: ${p.message}`);
      }
      console.error(`\nbuild aborted: ${err.validation.errorCount} validation error(s). Fix them, then build again.`);
    } else {
      console.error(`build failed: ${err.message}`);
    }
    return 1;
  }

  const r = result.report;
  if (!opts.quiet) {
    const shards = Object.entries(r.domains).map(([d, n]) => `${d} ${n}`).join(' · ') || '—';
    console.log(`built ${r.cards} card${r.cards === 1 ? '' : 's'} → ${r.outDir}/`);
    console.log(`  shards     ${shards}`);
    console.log(`  series     ${r.series} · questions ${r.questions}${r.questionsFrom ? ` (from ${r.questionsFrom})` : ' (none; wrote [])'}`);
    if (r.skippedUnreviewed) console.log(`  skipped    ${r.skippedUnreviewed} unreviewed card${r.skippedUnreviewed === 1 ? '' : 's'} (--require-review)`);
    if (r.warnings) console.log(`  warnings   ${r.warnings} (run \`npm run validate\` to see them)`);
    console.log(`  builtAt    ${r.builtAt}`);
  }
  if (r.cards === 0) {
    console.warn('warning: the index is empty — the app will have nothing to serve.');
  }
  return 0;
}

const invokedDirectly = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;
if (invokedDirectly) process.exit(main(process.argv.slice(2)));

export default { buildContent };
