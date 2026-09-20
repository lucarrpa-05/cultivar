#!/usr/bin/env node
/**
 * Corpus-wide near-duplicate report.
 *
 * The validator only fails duplicates *inside a topic* (SCHEMA §4.11). This script is the
 * wider net: it compares every card with every other one, across topics and domains, where
 * a repeat is easy to miss — the same anecdote told in `math` and in `hist`, two shards
 * writing the same Feynman story, the same hook twice.
 *
 *   node scripts/dedupe.mjs [paths…] [--out .data/reviews/dedupe-report.json] [--quiet] [--json]
 *
 * Flags a pair when
 *   - title tokens (stopwords removed) have Jaccard ≥ 0.6, or
 *   - tag sets have Jaccard ≥ 0.75, or
 *   - the hooks are identical (after normalization).
 *
 * Writes .data/reviews/dedupe-report.json and prints a summary. Always exits 0 —
 * this is a report for the lead, not a gate.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

import { loadTaxonomy, REPO_ROOT, CARDS_DIR } from './lib/taxonomy.mjs';
import { parseCardFile } from './lib/parse-card.mjs';
import { walkMarkdown, resolveTargets } from './validate-content.mjs';

const DEFAULT_REPORT = path.join(REPO_ROOT, 'content', 'reviews', 'dedupe-report.json');
export const TITLE_JACCARD = 0.6;
export const TAG_JACCARD = 0.75;

const STOPWORDS = new Set([
  'the', 'a', 'an', 'of', 'and', 'or', 'to', 'in', 'on', 'for', 'is', 'that', 'it', 'was', 'were', 'be', 'by',
  'why', 'how', 'what', 'when', 'who', 'which', 'with', 'from', 'at', 'as', 'its', 'you', 'your', 'not', 'no',
  'el', 'la', 'los', 'las', 'de', 'del', 'y', 'o', 'un', 'una', 'que', 'en', 'por', 'para', 'con', 'se', 'su',
]);

export function tokens(text) {
  return new Set(
    String(text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .split(/\s+/)
      .filter((w) => w && !STOPWORDS.has(w)),
  );
}

export function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

function normalizeHook(hook) {
  return String(hook || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

export function dedupe(options = {}) {
  const root = options.root || REPO_ROOT;
  const taxonomy = options.taxonomy || loadTaxonomy();
  const files = options.paths && options.paths.length
    ? resolveTargets(options.paths, { root }).files
    : walkMarkdown(options.cardsDir || CARDS_DIR);

  const cards = [];
  for (const file of files) {
    const { card } = parseCardFile(file, { taxonomy, root });
    if (!card || !card.id) continue;
    cards.push({
      id: card.id,
      file: card.file,
      topic: card.topic,
      domain: card.domain,
      title: card.title || '',
      hook: card.hook || '',
      tags: card.tags || [],
      related: card.related || [],
      titleTokens: tokens(card.title),
      tagSet: new Set(card.tags || []),
      hookKey: normalizeHook(card.hook),
    });
  }
  cards.sort((a, b) => a.id.localeCompare(b.id));

  const pairs = [];
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const a = cards[i];
      const b = cards[j];
      const reasons = [];
      const titleScore = jaccard(a.titleTokens, b.titleTokens);
      if (titleScore >= TITLE_JACCARD) reasons.push({ kind: 'title', score: round(titleScore) });
      const tagScore = jaccard(a.tagSet, b.tagSet);
      if (tagScore >= TAG_JACCARD) reasons.push({ kind: 'tags', score: round(tagScore) });
      if (a.hookKey && a.hookKey === b.hookKey) reasons.push({ kind: 'hook', score: 1 });
      if (!reasons.length) continue;
      pairs.push({
        a: { id: a.id, file: a.file, topic: a.topic, title: a.title },
        b: { id: b.id, file: b.file, topic: b.topic, title: b.title },
        sameTopic: a.topic === b.topic,
        related: a.related.includes(b.id) || b.related.includes(a.id),
        reasons,
        score: round(Math.max(...reasons.map((r) => r.score))),
      });
    }
  }
  pairs.sort((x, y) => y.score - x.score || x.a.id.localeCompare(y.a.id));

  const hookGroups = new Map();
  for (const c of cards) {
    if (!c.hookKey) continue;
    if (!hookGroups.has(c.hookKey)) hookGroups.set(c.hookKey, []);
    hookGroups.get(c.hookKey).push(c.id);
  }
  const identicalHooks = [...hookGroups.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([key, ids]) => ({ hook: key, cards: ids.sort() }))
    .sort((a, b) => a.hook.localeCompare(b.hook));

  const report = {
    generatedAt: new Date().toISOString(),
    cards: cards.length,
    thresholds: { titleJaccard: TITLE_JACCARD, tagJaccard: TAG_JACCARD },
    pairs,
    identicalHooks,
    summary: {
      pairs: pairs.length,
      unlinked: pairs.filter((p) => !p.related).length,
      sameTopic: pairs.filter((p) => p.sameTopic).length,
      crossTopic: pairs.filter((p) => !p.sameTopic).length,
      byReason: {
        title: pairs.filter((p) => p.reasons.some((r) => r.kind === 'title')).length,
        tags: pairs.filter((p) => p.reasons.some((r) => r.kind === 'tags')).length,
        hook: pairs.filter((p) => p.reasons.some((r) => r.kind === 'hook')).length,
      },
    },
  };
  return report;
}

function round(n) {
  return Math.round(n * 100) / 100;
}

// ───────────────────────────── CLI ─────────────────────────────

function parseArgs(argv) {
  const opts = { paths: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--out') opts.out = argv[++i];
    else if (arg.startsWith('--out=')) opts.out = arg.slice('--out='.length);
    else if (arg === '--json') opts.json = true;
    else if (arg === '--quiet' || arg === '-q') opts.quiet = true;
    else if (arg === '--help' || arg === '-h') opts.help = true;
    else if (arg.startsWith('-')) opts.unknown = (opts.unknown || []).concat(arg);
    else opts.paths.push(arg);
  }
  return opts;
}

function main(argv) {
  const opts = parseArgs(argv);
  if (opts.help) {
    console.log('usage: node scripts/dedupe.mjs [paths…] [--out <file>] [--json] [--quiet]');
    return 0;
  }
  const report = dedupe(opts);
  const out = opts.out ? path.resolve(REPO_ROOT, opts.out) : DEFAULT_REPORT;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  if (opts.json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return 0;
  }
  if (!opts.quiet) {
    const rel = path.relative(REPO_ROOT, out).split(path.sep).join('/');
    console.log(`${report.cards} cards · ${report.summary.pairs} near-duplicate pair${report.summary.pairs === 1 ? '' : 's'} (${report.summary.unlinked} not linked with \`related:\`)`);
    console.log(`  by reason  title ${report.summary.byReason.title} · tags ${report.summary.byReason.tags} · hook ${report.summary.byReason.hook}`);
    console.log(`  spread     ${report.summary.sameTopic} same topic · ${report.summary.crossTopic} across topics`);
    for (const p of report.pairs.slice(0, 15)) {
      console.log(`  ${p.score.toFixed(2)} ${p.reasons.map((r) => r.kind).join('+')}${p.related ? ' [related]' : ''}  ${p.a.id}  ↔  ${p.b.id}`);
    }
    if (report.pairs.length > 15) console.log(`  … ${report.pairs.length - 15} more in ${rel}`);
    console.log(`\nreport → ${rel}`);
  }
  return 0;
}

const invokedDirectly = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;
if (invokedDirectly) process.exit(main(process.argv.slice(2)));

export default { dedupe, jaccard, tokens };
