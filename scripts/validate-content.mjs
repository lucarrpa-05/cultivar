#!/usr/bin/env node
/**
 * Validate every card in content/cards (or the files/directories given as arguments)
 * against .data/docs/SCHEMA.md §4 and schema/card.schema.json.
 *
 *   node scripts/validate-content.mjs                        # the whole corpus
 *   node scripts/validate-content.mjs content/cards/math     # one shard
 *   node scripts/validate-content.mjs content/cards/math/topology/foo.md
 *
 * Flags
 *   --require-review   an unreviewed card is an error (what the shipping build uses)
 *   --strict           promote "probably fine while other agents are writing" warnings to errors
 *   --json             machine-readable report on stdout, nothing else
 *   --quiet            only error lines, no warnings and no summary
 *
 * Exit code 1 if there is at least one error.
 *
 * Link resolution is NOT checked here — that is `npm run check-links`.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import AjvModule from 'ajv';
import addFormatsModule from 'ajv-formats';

import { loadTaxonomy, REPO_ROOT, CARDS_DIR, DIAGRAMS_DIR } from './lib/taxonomy.mjs';
import { parseCardFile, toSchemaSubject, checkMath } from './lib/parse-card.mjs';

const Ajv = AjvModule.default || AjvModule;
const addFormats = addFormatsModule.default || addFormatsModule;

const SCHEMA_FILE = path.join(REPO_ROOT, 'schema', 'card.schema.json');

/** SCHEMA §4.3 — body word limits by format. */
export const BODY_WORDS = {
  fact: [25, 90],
  quote: [25, 90],
  idea: [40, 190],
  series: [40, 190],
  callback: [40, 190],
  story: [40, 190],
  challenge: [40, 190],
  news: [40, 190],
  recall: [20, 190],
};
export const RIGOR_WORDS = [40, 280];
const RIGOR_REQUIRED_FORMATS = new Set(['idea', 'series', 'callback']);
const RECALL_REQUIRED_FORMATS = new Set(['idea', 'series', 'callback', 'recall']);
const MAX_DIAGRAM_BYTES = 30 * 1024;

const ES_MARKERS = ['que', 'de', 'la', 'el', 'los', 'las', 'una', 'por', 'para', 'con', 'pero', 'como', 'cuando', 'sin', 'sobre', 'entre', 'donde', 'porque', 'también', 'más', 'así', 'este', 'esta', 'del', 'al', 'es', 'son', 'fue', 'ser', 'hay', 'su', 'sus'];
const EN_MARKERS = ['the', 'and', 'of', 'that', 'with', 'from', 'which', 'this', 'these', 'because', 'about', 'when', 'where', 'would', 'could', 'there', 'their', 'what', 'into', 'than', 'been', 'is', 'are', 'was', 'you', 'it', 'but', 'not'];

// ───────────────────────────── file collection ─────────────────────────────

export function walkMarkdown(dir, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (e.name.startsWith('.') || e.name.startsWith('_')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkMarkdown(full, out);
    else if (e.isFile() && e.name.endsWith('.md') && e.name.toLowerCase() !== 'readme.md') out.push(full);
  }
  return out;
}

/** Resolve CLI targets (files or directories) into a list of absolute .md paths. */
export function resolveTargets(targets, { root = REPO_ROOT } = {}) {
  const files = [];
  const missing = [];
  for (const t of targets) {
    const abs = path.isAbsolute(t) ? t : path.resolve(root, t);
    let st;
    try {
      st = fs.statSync(abs);
    } catch {
      missing.push(t);
      continue;
    }
    if (st.isDirectory()) files.push(...walkMarkdown(abs));
    else files.push(abs);
  }
  return { files: [...new Set(files)], missing };
}

const relOf = (abs, root = REPO_ROOT) => path.relative(root, abs).split(path.sep).join('/');

// ───────────────────────────── validation ─────────────────────────────

let cachedValidator = null;
function schemaValidator() {
  if (cachedValidator) return cachedValidator;
  const schema = JSON.parse(fs.readFileSync(SCHEMA_FILE, 'utf8'));
  const ajv = new Ajv({ allErrors: true, strict: false, allowUnionTypes: true, verbose: false });
  addFormats(ajv);
  cachedValidator = ajv.compile(schema);
  return cachedValidator;
}

/**
 * @param {{paths?: string[], requireReview?: boolean, strict?: boolean, root?: string, taxonomy?: object}} options
 * @returns {{problems: object[], entries: object[], targets: object[], summary: object, errorCount: number, warningCount: number, ok: boolean}}
 */
export function validateContent(options = {}) {
  const root = options.root || REPO_ROOT;
  const strict = Boolean(options.strict);
  const requireReview = Boolean(options.requireReview);
  const taxonomy = options.taxonomy || loadTaxonomy();
  const diagramsDir = options.diagramsDir || DIAGRAMS_DIR;
  const problems = [];

  const corpusFiles = walkMarkdown(options.cardsDir || CARDS_DIR);
  const requested = options.paths && options.paths.length
    ? resolveTargets(options.paths, { root })
    : { files: corpusFiles, missing: [] };

  for (const miss of requested.missing) {
    problems.push({ file: miss, severity: 'error', rule: 'path', message: 'no such file or directory' });
  }

  const targetSet = new Set(requested.files.map((f) => path.resolve(f)));
  const allFiles = [...new Set([...corpusFiles, ...requested.files].map((f) => path.resolve(f)))].sort();
  const isSubset = corpusFiles.some((f) => !targetSet.has(path.resolve(f)));

  /** @type {object[]} */
  const entries = [];
  for (const abs of allFiles) {
    const { card, errors, warnings } = parseCardFile(abs, { taxonomy, root });
    const entry = {
      abs,
      rel: relOf(abs, root),
      card,
      parseErrors: errors,
      parseWarnings: warnings,
      target: targetSet.has(abs),
    };
    entries.push(entry);
  }

  const targets = entries.filter((e) => e.target);
  const add = (entry, severity, rule, message) => {
    problems.push({ file: entry.rel, severity: strict && severity === 'warn' ? 'error' : severity, rule, message });
  };

  // ── cross-corpus indexes (built from every card, not only the targets) ──
  const byId = new Map();
  const bySeries = new Map();
  const byTopic = new Map();
  for (const e of entries) {
    const c = e.card;
    if (!c) continue;
    if (typeof c.id === 'string') {
      if (!byId.has(c.id)) byId.set(c.id, []);
      byId.get(c.id).push(e);
    }
    if (c.series && typeof c.series.id === 'string') {
      if (!bySeries.has(c.series.id)) bySeries.set(c.series.id, []);
      bySeries.get(c.series.id).push(e);
    }
    if (typeof c.topic === 'string') {
      if (!byTopic.has(c.topic)) byTopic.set(c.topic, []);
      byTopic.get(c.topic).push(e);
    }
  }

  const validate = schemaValidator();
  const topicIds = [...taxonomy.nodeMap.keys()];

  for (const entry of targets) {
    const { card } = entry;
    for (const msg of entry.parseErrors) add(entry, 'error', 'parse', msg);
    for (const msg of entry.parseWarnings) add(entry, 'warn', 'parse', msg);
    if (!card) continue;

    // 1 ── JSON schema (front matter shape, enums, id regex, lengths) ──────
    const subject = toSchemaSubject(card);
    if (!validate(subject)) {
      for (const err of validate.errors) {
        if (err.keyword === 'if') continue; // wrapper for a more specific error we already report
        if (err.instancePath === '/title' && (err.keyword === 'maxLength' || err.keyword === 'minLength')) continue; // custom below
        // schema/card.schema.json quirk: its `rigor: none` conditional has no `required: [rigor]`,
        // so it fires on every card that simply has no `rigor` field. Enforced as a custom rule below.
        if (err.keyword === 'required' && err.params.missingProperty === 'rigorNote' && subject.rigor !== 'none') continue;
        // the parser already prints a better message for an option with no ` — ` reason
        if (err.keyword === 'minLength' && /^\/recall\/options\/\d+\/why$/.test(err.instancePath) && !getPointer(subject, err.instancePath)) continue;
        add(entry, 'error', 'schema', formatAjvError(err, subject));
      }
    }

    // 1b ── id uniqueness across the whole corpus ─────────────────────────
    const sameId = (byId.get(card.id) || []).filter((o) => o.abs !== entry.abs);
    if (sameId.length) {
      add(entry, 'error', 'id-unique', `duplicate id \`${card.id}\` — already used by ${sameId.map((o) => o.rel).join(', ')}. Ids are permanent: pick a different slug.`);
    }

    // 2 ── taxonomy references ────────────────────────────────────────────
    checkTopicRef(entry, add, taxonomy, topicIds, card.topic, 'topic');
    for (const [i, t] of (card.topics || []).entries()) checkTopicRef(entry, add, taxonomy, topicIds, t, `topics[${i}]`);
    for (const [i, t] of (card.prerequisites || []).entries()) checkTopicRef(entry, add, taxonomy, topicIds, t, `prerequisites[${i}]`);
    if (card.callback) {
      checkTopicRef(entry, add, taxonomy, topicIds, card.callback.from, 'callback.from');
      checkTopicRef(entry, add, taxonomy, topicIds, card.callback.to, 'callback.to');
    }
    if (typeof card.topic === 'string' && taxonomy.exists(card.topic)) {
      const node = taxonomy.node(card.topic);
      if (node && node.kind !== 'topic') {
        add(entry, 'warn', 'topic-leaf', `topic \`${card.topic}\` is an ${node.kind || 'domain'}, not a leaf topic — prefer the most specific topic so the engine can track mastery`);
      }
    }
    if (typeof card.id === 'string' && typeof card.topic === 'string' && !card.id.startsWith(`${card.topic}.`)) {
      add(entry, 'warn', 'id-convention', `id \`${card.id}\` does not start with its topic — the convention is \`<topic-id>.<slug>\` (\`${card.topic}.<slug>\`)`);
    }
    for (const [i, ref] of (card.related || []).entries()) {
      if (!byId.has(ref)) add(entry, 'warn', 'related-ref', `related[${i}] \`${ref}\` is not a card in content/cards (typo, or the card is not written yet)`);
    }
    if (card.intuitionCard && !byId.has(card.intuitionCard)) {
      add(entry, 'warn', 'intuition-ref', `intuitionCard \`${card.intuitionCard}\` is not a card in content/cards`);
    }

    // 2b ── domain folder matches the topic's domain ──────────────────────
    const folder = domainFolderOf(entry.rel);
    if (folder && card.domain && folder !== card.domain) {
      add(entry, 'error', 'domain-folder', `file is in \`cards/${folder}/\` but topic \`${card.topic}\` is in domain \`${card.domain}\` — move it to content/cards/${card.domain}/…`);
    }

    // 3 ── title and word counts ──────────────────────────────────────────
    if (typeof card.title === 'string') {
      if (card.title.length > 80) add(entry, 'error', 'title-length', `title is ${card.title.length} characters — the limit is 80. Cut it down to the claim.`);
      else if (card.title.length < 8) add(entry, 'error', 'title-length', `title is ${card.title.length} characters — that is not a hook (minimum 8)`);
    }
    const limits = BODY_WORDS[card.format];
    if (limits && card.words) {
      const n = card.words.body;
      if (n < limits[0]) add(entry, 'error', 'body-words', `body is ${n} words — \`${card.format}\` cards need ${limits[0]}–${limits[1]}. Say more, or change the format.`);
      else if (n > limits[1]) add(entry, 'error', 'body-words', `body is ${n} words — \`${card.format}\` cards allow ${limits[0]}–${limits[1]}. Cut it, or split it into a series.`);
    }
    if (card.hasRigor && card.words) {
      const n = card.words.rigor;
      if (n < RIGOR_WORDS[0]) add(entry, 'error', 'rigor-words', `\`## Rigor\` is ${n} words — it needs ${RIGOR_WORDS[0]}–${RIGOR_WORDS[1]} (statement + the key step)`);
      else if (n > RIGOR_WORDS[1]) add(entry, 'error', 'rigor-words', `\`## Rigor\` is ${n} words — the limit is ${RIGOR_WORDS[1]}. A longer rigor layer is a series.`);
    }

    // 4 ── rigor required on technical topics ─────────────────────────────
    const technical = typeof card.topic === 'string' && taxonomy.isTechnical(card.topic);
    if (technical && RIGOR_REQUIRED_FORMATS.has(card.format) && !card.hasRigor && card.rigor !== 'none') {
      add(entry, 'error', 'rigor-required', `\`## Rigor\` section is required: \`${card.topic}\` is a technical topic (SCHEMA §4.4) and the format is \`${card.format}\`. Add the section, or set \`rigor: none\` with a \`rigorNote\`.`);
    }
    if (card.rigor === 'none' && !card.rigorNote) {
      add(entry, 'error', 'rigor-none', '`rigor: none` needs a `rigorNote:` — one line saying why this card has no rigor layer (e.g. "purely historical")');
    }
    if (card.rigor === 'none' && card.hasRigor) {
      add(entry, 'warn', 'rigor-none', 'front matter says `rigor: none` but the file has a `## Rigor` section — drop one of the two');
    }
    if (card.layer === 'rigor' && !card.hasRigor) {
      add(entry, 'error', 'rigor-layer', '`layer: rigor` but there is no `## Rigor` section');
    }

    // 5 ── recall ─────────────────────────────────────────────────────────
    if (RECALL_REQUIRED_FORMATS.has(card.format) && !card.hasRecall) {
      add(entry, 'error', 'recall-required', `\`## Recall\` section is required for format \`${card.format}\` — add a \`type: mcq\` or \`type: reveal\` item about the idea (SCHEMA §1)`);
    }
    if (card.format === 'quote' && card.hasRecall) {
      add(entry, 'error', 'recall-forbidden', '`quote` cards must not have a `## Recall` section (SCHEMA §1)');
    }
    if (card.format === 'challenge' && !card.hasRecall) {
      add(entry, 'warn', 'recall-challenge', 'challenge cards normally carry the answer as a `type: reveal` recall item');
    }
    if (card.recall && card.recall.type === 'mcq') {
      const opts = card.recall.options || [];
      const correct = opts.filter((o) => o.correct).length;
      if (opts.length && correct !== 1) {
        add(entry, 'error', 'recall-mcq', `Recall mcq has ${correct} correct options — exactly one line must be \`- [x]\``);
      }
      for (const [i, o] of opts.entries()) {
        if (o.why && o.why.length < 3) add(entry, 'error', 'recall-mcq', `Recall option ${i + 1} ("${o.text}") has a reason of ${o.why.length} character(s) — every option teaches something after \` — \``);
      }
    }

    // 6 ── series ─────────────────────────────────────────────────────────
    if (card.series) {
      if (card.format !== 'series') {
        add(entry, 'warn', 'series-format', `card has a \`series:\` block but format is \`${card.format}\` — series episodes use \`format: series\``);
      }
      const group = bySeries.get(card.series.id) || [];
      const { index, total, title } = card.series;
      if (typeof index === 'number' && typeof total === 'number' && index > total) {
        add(entry, 'error', 'series', `series index ${index} is greater than total ${total}`);
      }
      const byIndex = new Map();
      for (const o of group) {
        const oi = o.card?.series?.index;
        if (typeof oi !== 'number') continue;
        if (!byIndex.has(oi)) byIndex.set(oi, []);
        byIndex.get(oi).push(o);
      }
      const clash = (byIndex.get(index) || []).filter((o) => o.abs !== entry.abs);
      if (clash.length) add(entry, 'error', 'series', `two cards claim episode ${index} of series \`${card.series.id}\`: ${clash.map((o) => o.rel).join(', ')}`);
      for (const o of group) {
        if (o.abs === entry.abs) continue;
        if (o.card?.series?.total !== total) add(entry, 'error', 'series', `series \`${card.series.id}\` has total ${total} here but ${o.card?.series?.total} in ${o.rel} — all episodes agree on total`);
        if (o.card?.series?.title !== title) add(entry, 'error', 'series', `series \`${card.series.id}\` is titled "${title}" here but "${o.card?.series?.title}" in ${o.rel} — all episodes share one series title`);
      }
      const missing = [];
      for (let i = 1; i <= (total || 0); i++) if (!byIndex.has(i)) missing.push(i);
      if (missing.length) {
        const severity = isSubset ? 'warn' : 'error';
        add(entry, severity, 'series-gap', `series \`${card.series.id}\` is missing episode${missing.length > 1 ? 's' : ''} ${missing.join(', ')} of ${total} — every episode 1..total must exist`);
      }
    }

    // 7 ── dates ──────────────────────────────────────────────────────────
    if (card.dates && card.dates.expires && card.dates.written && card.dates.expires <= card.dates.written) {
      add(entry, 'error', 'dates', `dates.expires (${card.dates.expires}) must be after dates.written (${card.dates.written})`);
    }
    if (card.evergreen === false && !card.dates?.expires) {
      add(entry, 'warn', 'dates', '`evergreen: false` without `dates.expires` — the card will never stop being served');
    }

    // 8 ── sources ────────────────────────────────────────────────────────
    for (const [i, s] of (card.sources || []).entries()) {
      if (!s || typeof s !== 'object') continue;
      if (typeof s.url === 'string' && !s.url.startsWith('https://')) {
        add(entry, 'error', 'source-url', `sources[${i}].url must start with https:// (got ${s.url})`);
      }
      if (!s.title || String(s.title).trim().length < 3) {
        add(entry, 'error', 'source-title', `sources[${i}] needs a real \`title\` (what the page/paper is called)`);
      }
    }
    if (strict && (card.sources || []).length < 2 && card.format !== 'quote') {
      add(entry, 'warn', 'sources', 'only one source — the style guide asks for two where possible (one canonical, one accessible)');
    }

    // 9 ── diagram ────────────────────────────────────────────────────────
    if (card.diagram && typeof card.diagram.file === 'string') {
      checkDiagram(entry, add, card.diagram.file, diagramsDir);
    }

    // 10 ── KaTeX ─────────────────────────────────────────────────────────
    const mathChunks = [['body', card.body], ['## Rigor', card.rigorBody]];
    if (card.recall) {
      mathChunks.push(['## Recall', [card.recall.question, card.recall.answer, ...(card.recall.options || []).map((o) => `${o.text} ${o.why}`)].filter(Boolean).join('\n')]);
    }
    for (const [where, text] of mathChunks) {
      if (!text) continue;
      const { problems: mathProblems } = checkMath(text);
      for (const m of mathProblems) add(entry, 'error', 'katex', `${where}: ${m}`);
    }

    // 11 ── language heuristic (warning only) ─────────────────────────────
    const langProblem = checkLanguage(card);
    if (langProblem) add(entry, 'warn', 'language', langProblem);

    // 12 ── review stamp ──────────────────────────────────────────────────
    if (requireReview && !card.reviewed) {
      problems.push({ file: entry.rel, severity: 'error', rule: 'review', message: 'unreviewed — a reviewer must add `reviewed: {by, at, verdict: approved}` before this card ships' });
    }

    // 13 ── near-duplicates inside the topic ──────────────────────────────
    for (const other of byTopic.get(card.topic) || []) {
      if (other.abs === entry.abs || !other.card) continue;
      if (entry.rel > other.rel && other.target) continue; // report the pair once when both are targets
      const reason = duplicateReason(card, other.card);
      if (!reason) continue;
      const linked = (card.related || []).includes(other.card.id) || (other.card.related || []).includes(card.id);
      if (linked) continue;
      add(entry, 'error', 'duplicate', `near-duplicate of ${other.rel} (${reason}) — change the angle, or link them with \`related: [${other.card.id}]\``);
    }
  }

  const summary = summarize(targets.map((e) => e.card).filter(Boolean));
  const errorCount = problems.filter((p) => p.severity === 'error').length;
  const warningCount = problems.filter((p) => p.severity === 'warn').length;

  problems.sort((a, b) => (a.file === b.file ? (a.severity === b.severity ? 0 : a.severity === 'error' ? -1 : 1) : a.file < b.file ? -1 : 1));

  return { problems, entries, targets, summary, errorCount, warningCount, ok: errorCount === 0, isSubset };
}

// ───────────────────────────── individual checks ─────────────────────────────

function checkTopicRef(entry, add, taxonomy, topicIds, id, field) {
  if (typeof id !== 'string' || !id) return;
  if (taxonomy.exists(id)) return;
  const hints = suggestIds(id, topicIds);
  add(entry, 'error', 'taxonomy', `${field} \`${id}\` is not in content/taxonomy.json${hints.length ? ` — did you mean ${hints.map((h) => `\`${h}\``).join(' or ')}?` : ' (check the id, or ask the lead to add the node)'}`);
}

function suggestIds(id, candidates, n = 2) {
  const tokens = new Set(String(id).split(/[.\-]/).filter(Boolean));
  const scored = [];
  for (const c of candidates) {
    const ct = new Set(c.split(/[.\-]/).filter(Boolean));
    let inter = 0;
    for (const t of tokens) if (ct.has(t)) inter++;
    const score = inter / Math.max(tokens.size, ct.size, 1);
    if (score >= 0.4) scored.push({ c, score });
  }
  scored.sort((a, b) => b.score - a.score || a.c.localeCompare(b.c));
  return scored.slice(0, n).map((s) => s.c);
}

function domainFolderOf(rel) {
  const parts = rel.split('/');
  const i = parts.lastIndexOf('cards');
  return i >= 0 && parts.length > i + 1 ? parts[i + 1] : null;
}

function checkDiagram(entry, add, file, diagramsDir = DIAGRAMS_DIR) {
  const abs = path.join(diagramsDir, file);
  let svg;
  let bytes = 0;
  try {
    const stat = fs.statSync(abs);
    bytes = stat.size;
    svg = fs.readFileSync(abs, 'utf8');
  } catch {
    add(entry, 'error', 'diagram', `diagram file content/diagrams/${file} does not exist (paths are relative to content/diagrams/)`);
    return;
  }
  if (bytes > MAX_DIAGRAM_BYTES) {
    add(entry, 'error', 'diagram', `diagram content/diagrams/${file} is ${(bytes / 1024).toFixed(1)} KB — the limit is 30 KB (simplify it, drop editor metadata)`);
  }
  if (!/<svg[\s>]/i.test(svg)) {
    add(entry, 'error', 'diagram', `diagram content/diagrams/${file} is not an SVG document (no <svg> element)`);
    return;
  }
  if (!/<svg[^>]*\sviewBox\s*=/i.test(svg)) {
    add(entry, 'error', 'diagram', `diagram content/diagrams/${file} has no viewBox — add viewBox="0 0 W H" and drop width/height so it scales`);
  }
  if (/<script[\s>]/i.test(svg)) add(entry, 'error', 'diagram', `diagram content/diagrams/${file} contains <script> — not allowed`);
  if (/<foreignObject[\s>]/i.test(svg)) add(entry, 'error', 'diagram', `diagram content/diagrams/${file} contains <foreignObject> — not allowed`);
  if (/\son[a-z]+\s*=/i.test(svg)) add(entry, 'error', 'diagram', `diagram content/diagrams/${file} has an inline event handler (on…=) — not allowed`);
  if (/<image[\s>]/i.test(svg)) add(entry, 'error', 'diagram', `diagram content/diagrams/${file} embeds a raster <image> — diagrams are vector only`);
  if (/data:image\/(png|jpe?g|gif|webp|bmp)/i.test(svg)) add(entry, 'error', 'diagram', `diagram content/diagrams/${file} embeds raster data — diagrams are vector only`);
  const external = svg.match(/(?:xlink:)?href\s*=\s*"(?!#)([^"]*)"/i);
  if (external) add(entry, 'error', 'diagram', `diagram content/diagrams/${file} references an external resource (${external[1]}) — everything must be inline`);
  if (!/currentColor/.test(svg)) {
    add(entry, 'warn', 'diagram', `diagram content/diagrams/${file} never uses currentColor — strokes and text should so it works in dark mode (STYLE_GUIDE Part 4)`);
  }
}

function checkLanguage(card) {
  const text = `${card.body || ''}\n${card.rigorBody || ''}`;
  const words = text.toLowerCase().match(/[\p{L}]+/gu) || [];
  if (words.length < 30) return null;
  let es = 0;
  let en = 0;
  for (const w of words) {
    if (ES_MARKERS.includes(w)) es++;
    if (EN_MARKERS.includes(w)) en++;
  }
  const total = words.length;
  if (card.language === 'es' && en / total > 0.06 && en >= 6) {
    return `language is \`es\` but the text looks English (${en} common English words in ${total}) — Spanish cards are written natively, not translated`;
  }
  if (card.language === 'en' && es / total > 0.06 && es >= 6) {
    return `language is \`en\` but the text looks Spanish (${es} common Spanish words in ${total}) — set \`language: es\` or rewrite in English`;
  }
  return null;
}

const STOPWORDS = new Set(['the', 'a', 'an', 'of', 'and', 'or', 'to', 'in', 'on', 'for', 'is', 'that', 'it', 'was', 'why', 'how', 'what', 'el', 'la', 'los', 'las', 'de', 'del', 'y', 'o', 'un', 'una', 'que', 'en', 'por', 'para']);

function titleTokens(title) {
  return String(title || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/** SCHEMA §4.11: ≥ 6 consecutive shared title words, or identical tag sets. */
function duplicateReason(a, b) {
  const ta = titleTokens(a.title);
  const tb = titleTokens(b.title);
  const run = longestCommonRun(ta, tb);
  if (run >= 6) return `titles share ${run} consecutive words`;
  const sa = [...new Set(a.tags || [])].sort().join(',');
  const sb = [...new Set(b.tags || [])].sort().join(',');
  if (sa && sa === sb) return `identical tag sets (${sa})`;
  return null;
}

function longestCommonRun(a, b) {
  let best = 0;
  const dp = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    let prev = 0;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev + 1 : 0;
      if (dp[j] > best) best = dp[j];
      prev = tmp;
    }
  }
  return best;
}

function formatAjvError(err, subject) {
  const where = err.instancePath ? err.instancePath.slice(1).replace(/\//g, '.') : 'front matter';
  const value = getPointer(subject, err.instancePath);
  switch (err.keyword) {
    case 'required':
      return `${where === 'front matter' ? 'front matter' : where} is missing required field \`${err.params.missingProperty}\` (.data/docs/SCHEMA.md §2)`;
    case 'additionalProperties':
      return `unknown field \`${err.params.additionalProperty}\`${where === 'front matter' ? '' : ` in ${where}`} — check the spelling against .data/docs/SCHEMA.md §2`;
    case 'enum':
      return `${where} = ${JSON.stringify(value)} is not allowed — use one of: ${err.params.allowedValues.join(', ')}`;
    case 'pattern':
      return `${where} = ${JSON.stringify(value)} does not match ${err.params.pattern}`;
    case 'maxLength':
      return `${where} is ${String(value ?? '').length} characters — the limit is ${err.params.limit}`;
    case 'minLength':
      return `${where} is ${String(value ?? '').length} characters — the minimum is ${err.params.limit}`;
    case 'maxItems':
      return `${where} has ${Array.isArray(value) ? value.length : '?'} items — the limit is ${err.params.limit}`;
    case 'minItems':
      return `${where} has ${Array.isArray(value) ? value.length : '?'} items — at least ${err.params.limit} required`;
    case 'type':
      return `${where} must be ${err.params.type} (got ${JSON.stringify(value)})`;
    case 'maximum':
    case 'minimum':
      return `${where} = ${JSON.stringify(value)} — must be ${err.keyword === 'maximum' ? '≤' : '≥'} ${err.params.limit}`;
    case 'uniqueItems':
      return `${where} has a repeated item (positions ${err.params.i + 1} and ${err.params.j + 1})`;
    default:
      return `${where} ${err.message}`;
  }
}

function getPointer(obj, pointer) {
  if (!pointer) return obj;
  let cur = obj;
  for (const raw of pointer.split('/').slice(1)) {
    if (cur == null) return undefined;
    cur = cur[raw.replace(/~1/g, '/').replace(/~0/g, '~')];
  }
  return cur;
}

// ───────────────────────────── summary ─────────────────────────────

export function summarize(cards) {
  const count = (list, key) => {
    const out = {};
    for (const c of list) {
      const v = typeof key === 'function' ? key(c) : c[key];
      if (v === undefined || v === null) continue;
      out[v] = (out[v] || 0) + 1;
    }
    return out;
  };
  const seriesIds = new Set(cards.filter((c) => c.series?.id).map((c) => c.series.id));
  const reviewed = cards.filter((c) => c.reviewed).length;
  const spanish = cards.filter((c) => c.language === 'es').length;
  return {
    cards: cards.length,
    domain: count(cards, 'domain'),
    format: count(cards, 'format'),
    language: count(cards, 'language'),
    difficulty: count(cards, 'difficulty'),
    weight: count(cards, 'weight'),
    layer: count(cards, 'layer'),
    reviewed,
    unreviewed: cards.length - reviewed,
    spanishShare: cards.length ? spanish / cards.length : 0,
    callbacks: cards.filter((c) => c.format === 'callback' || c.callback).length,
    series: seriesIds.size,
    withRigor: cards.filter((c) => c.hasRigor).length,
    withRecall: cards.filter((c) => c.hasRecall).length,
    withDiagram: cards.filter((c) => c.hasDiagram).length,
  };
}

function row(label, obj) {
  const parts = Object.keys(obj)
    .sort((a, b) => (Number.isNaN(Number(a)) ? a.localeCompare(b) : Number(a) - Number(b)))
    .map((k) => `${k} ${obj[k]}`);
  return `  ${label.padEnd(11)} ${parts.join(' · ') || '—'}`;
}

export function printSummary(summary, log = console.log) {
  log('');
  log(`  ${summary.cards} card${summary.cards === 1 ? '' : 's'}`);
  log(row('domain', summary.domain));
  log(row('format', summary.format));
  log(row('language', summary.language) + `  (${(summary.spanishShare * 100).toFixed(1)}% Spanish)`);
  log(row('difficulty', summary.difficulty));
  log(row('weight', summary.weight));
  log(`  ${'review'.padEnd(11)} ${summary.reviewed} reviewed · ${summary.unreviewed} unreviewed`);
  log(`  ${'structure'.padEnd(11)} ${summary.withRigor} with rigor · ${summary.withRecall} with recall · ${summary.withDiagram} with diagram`);
  log(`  ${'links'.padEnd(11)} ${summary.callbacks} callback${summary.callbacks === 1 ? '' : 's'} · ${summary.series} series`);
  log('');
}

// ───────────────────────────── CLI ─────────────────────────────

export function parseArgs(argv) {
  const opts = { paths: [], requireReview: false, strict: false, json: false, quiet: false };
  for (const arg of argv) {
    if (arg === '--require-review') opts.requireReview = true;
    else if (arg === '--strict') opts.strict = true;
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
    console.log('usage: node scripts/validate-content.mjs [paths…] [--require-review] [--strict] [--json] [--quiet]');
    return 0;
  }
  if (opts.unknown) {
    console.error(`unknown flag(s): ${opts.unknown.join(', ')}`);
    return 2;
  }

  const result = validateContent(opts);

  if (opts.json) {
    process.stdout.write(`${JSON.stringify({
      ok: result.ok,
      files: result.targets.length,
      errors: result.errorCount,
      warnings: result.warningCount,
      problems: result.problems,
      summary: result.summary,
    }, null, 2)}\n`);
    return result.ok ? 0 : 1;
  }

  for (const p of result.problems) {
    if (p.severity === 'warn' && opts.quiet) continue;
    const line = `${p.file}: ${p.severity === 'warn' ? 'warning: ' : ''}${p.message}`;
    if (p.severity === 'error') console.error(line);
    else console.warn(line);
  }

  if (!opts.quiet) {
    printSummary(result.summary);
    const verdict = result.ok
      ? `OK — ${result.targets.length} card${result.targets.length === 1 ? '' : 's'} valid, ${result.warningCount} warning${result.warningCount === 1 ? '' : 's'}`
      : `FAILED — ${result.errorCount} error${result.errorCount === 1 ? '' : 's'}, ${result.warningCount} warning${result.warningCount === 1 ? '' : 's'} in ${result.targets.length} card${result.targets.length === 1 ? '' : 's'}`;
    console.log(verdict);
  }
  return result.ok ? 0 : 1;
}

const invokedDirectly = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;
if (invokedDirectly) process.exit(main(process.argv.slice(2)));

export default { validateContent, walkMarkdown, resolveTargets, summarize };
