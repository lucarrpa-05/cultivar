/**
 * Card parser: one Markdown file -> the parsed card object that
 * schema/card.schema.json validates and scripts/build-content.mjs emits.
 *
 * See .data/docs/SCHEMA.md §1 (file format) and §2 (front matter).
 *
 *   import { parseCardFile } from './lib/parse-card.mjs';
 *   const { card, errors, warnings } = parseCardFile(absPath, { taxonomy });
 *
 * `errors` are fatal (the card could not be parsed into something valid);
 * `warnings` are tolerated deviations (e.g. an en dash instead of an em dash).
 * Both are plain strings, ready to print after "path: ".
 */

import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { REPO_ROOT, DIAGRAMS_DIR, domainOf } from './taxonomy.mjs';

/** Derived keys that schema/card.schema.json does not know about (it is additionalProperties:false). */
export const DERIVED_ONLY_KEYS = ['domain', 'hasRigor', 'hasRecall', 'hasDiagram'];

const FRONT_MATTER_RE = /^---[ \t]*\n([\s\S]*?)\n---[ \t]*(?:\n|$)/;
const OPTION_RE = /^\s*[-*]\s*\[([ xX])\]\s*(.*)$/;
const SEPARATORS = [
  { sep: ' — ', ok: true },            // em dash, the canonical one
  { sep: ' – ', ok: false, name: 'en dash (–)' },
  { sep: ' -- ', ok: false, name: 'double hyphen (--)' },
  { sep: ' - ', ok: false, name: 'hyphen (-)' },
];

/** Read + parse one card file. */
export function parseCardFile(filePath, options = {}) {
  const abs = path.resolve(filePath);
  let text;
  try {
    text = fs.readFileSync(abs, 'utf8');
  } catch (err) {
    return { card: null, errors: [`cannot read file: ${err.message}`], warnings: [] };
  }
  return parseCardText(text, { ...options, file: abs });
}

/**
 * Parse card source text.
 * @param {string} source raw markdown
 * @param {{file?: string, taxonomy?: object, inlineDiagram?: boolean, root?: string}} options
 */
export function parseCardText(source, options = {}) {
  const { taxonomy = null, inlineDiagram = false, root = REPO_ROOT } = options;
  const errors = [];
  const warnings = [];
  const abs = options.file ? path.resolve(options.file) : null;
  const rel = abs ? path.relative(root, abs).split(path.sep).join('/') : null;

  const text = String(source).replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');

  // ── front matter ──────────────────────────────────────────────────────────
  const fmMatch = text.match(FRONT_MATTER_RE);
  if (!fmMatch) {
    errors.push('no YAML front matter: the file must start with a line containing only `---`, then the fields, then another `---`');
    return { card: null, errors, warnings };
  }

  let fm;
  try {
    fm = YAML.parse(fmMatch[1], { prettyErrors: true });
  } catch (err) {
    errors.push(`front matter is not valid YAML: ${String(err.message).split('\n')[0]}`);
    return { card: null, errors, warnings };
  }
  if (fm === null || typeof fm !== 'object' || Array.isArray(fm)) {
    errors.push('front matter must be a YAML mapping of fields (key: value)');
    return { card: null, errors, warnings };
  }

  const rest = text.slice(fmMatch[0].length);

  // ── title / body / sections ───────────────────────────────────────────────
  const { title, body, sections, issues } = splitDocument(rest);
  for (const issue of issues) {
    (issue.fatal ? errors : warnings).push(issue.message);
  }
  if (title === null) {
    errors.push('no `# Title` line: after the front matter the first heading must be a single-`#` H1 (the hook)');
  }

  const rigorSection = sections.find((s) => normalizeHeading(s.heading) === 'rigor') || null;
  const recallSection = sections.find((s) => normalizeHeading(s.heading) === 'recall') || null;
  for (const s of sections) {
    const h = normalizeHeading(s.heading);
    if (h !== 'rigor' && h !== 'recall') {
      warnings.push(`unknown section \`## ${s.heading}\`: only \`## Rigor\` and \`## Recall\` are used by the app (its text will not be shown)`);
    }
  }

  const rigorBody = rigorSection ? rigorSection.text.trim() || null : null;

  // ── recall ────────────────────────────────────────────────────────────────
  let recall = null;
  if (recallSection) {
    const parsed = parseRecall(recallSection.text);
    recall = parsed.recall;
    errors.push(...parsed.errors);
    warnings.push(...parsed.warnings);
  }

  // ── derived fields ────────────────────────────────────────────────────────
  const topic = typeof fm.topic === 'string' ? fm.topic : null;
  const domain = domainOf(topic);
  const hasRigor = Boolean(rigorBody);
  const hasRecall = Boolean(recall);
  const hasDiagram = Boolean(fm.diagram && fm.diagram.file);

  let prerequisites;
  if (Array.isArray(fm.prerequisites)) prerequisites = [...fm.prerequisites];
  else if (taxonomy && topic) prerequisites = taxonomy.prereqsOf(topic);
  else prerequisites = [];

  const layer = typeof fm.layer === 'string' ? fm.layer : hasRigor ? 'both' : 'intuition';

  let evergreen;
  if (typeof fm.evergreen === 'boolean') evergreen = fm.evergreen;
  else evergreen = fm.format === 'news' ? false : true;

  // ── diagram ───────────────────────────────────────────────────────────────
  let diagram;
  if (fm.diagram && typeof fm.diagram === 'object') {
    diagram = { ...fm.diagram };
    if (inlineDiagram && typeof diagram.file === 'string') {
      const svgPath = path.join(DIAGRAMS_DIR, diagram.file);
      try {
        diagram.svg = fs.readFileSync(svgPath, 'utf8').replace(/^\uFEFF/, '').trim();
      } catch {
        errors.push(`diagram file not found: content/diagrams/${diagram.file} (create it, or drop the \`diagram:\` field)`);
      }
    }
  }

  // Ordered to match src/types.ts (CardMeta, then Card) so the built JSON reads well.
  const card = {
    id: fm.id,
    topic: fm.topic,
    ...(fm.topics !== undefined ? { topics: fm.topics } : {}),
    domain,
    format: fm.format,
    layer,
    ...(fm.intuitionCard !== undefined ? { intuitionCard: fm.intuitionCard } : {}),
    difficulty: fm.difficulty,
    language: fm.language,
    weight: fm.weight,
    angles: fm.angles,
    tags: fm.tags,
    prerequisites,
    title,
    ...(fm.hook !== undefined ? { hook: fm.hook } : {}),
    ...(fm.series !== undefined ? { series: fm.series } : {}),
    ...(fm.callback !== undefined ? { callback: fm.callback } : {}),
    ...(fm.related !== undefined ? { related: fm.related } : {}),
    dates: fm.dates,
    evergreen,
    hasRigor,
    hasRecall,
    hasDiagram,
    words: { body: countWords(body), rigor: rigorBody ? countWords(rigorBody) : 0 },
    author: fm.author,
    ...(fm.reviewed !== undefined ? { reviewed: fm.reviewed } : {}),
    ...(fm.answersQuestion !== undefined ? { answersQuestion: fm.answersQuestion } : {}),
    ...(fm.context !== undefined ? { context: fm.context } : {}),
    body,
    rigorBody,
    recall,
    sources: fm.sources,
    ...(diagram !== undefined ? { diagram } : {}),
    ...(fm.rigor !== undefined ? { rigor: fm.rigor } : {}),
    ...(fm.rigorNote !== undefined ? { rigorNote: fm.rigorNote } : {}),
    ...(rel ? { file: rel } : {}),
  };

  // Any front-matter key we did not map explicitly (typos, new fields) is kept so the
  // JSON schema can complain about it instead of it disappearing silently.
  const known = new Set([
    'id', 'topic', 'topics', 'format', 'layer', 'intuitionCard', 'difficulty', 'language', 'weight',
    'angles', 'tags', 'prerequisites', 'hook', 'series', 'callback', 'related', 'sources', 'dates',
    'evergreen', 'diagram', 'rigor', 'rigorNote', 'author', 'reviewed', 'answersQuestion', 'context',
  ]);
  for (const key of Object.keys(fm)) {
    if (!known.has(key) && !(key in card)) card[key] = fm[key];
  }

  return { card, errors, warnings };
}

/** Split the markdown after the front matter into title, body and `##` sections. */
function splitDocument(markdown) {
  const lines = markdown.split('\n');
  const issues = [];
  let title = null;
  let titleLine = -1;
  let inFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const h1 = line.match(/^#\s+(.+?)\s*$/);
    if (h1) {
      if (title === null) { title = h1[1].trim(); titleLine = i; }
      else issues.push({ fatal: false, message: `second \`# ${h1[1].trim()}\` heading: a card has exactly one H1 (use \`##\` for sections)` });
    }
  }

  const bodyLines = [];
  const sections = [];
  let current = null;
  inFence = false;

  for (let i = titleLine + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const h2 = !inFence && line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      current = { heading: h2[1].trim(), lines: [] };
      sections.push(current);
      continue;
    }
    if (current) current.lines.push(line);
    else if (titleLine >= 0) bodyLines.push(line);
  }

  return {
    title,
    body: bodyLines.join('\n').trim(),
    sections: sections.map((s) => ({ heading: s.heading, text: s.lines.join('\n').trim() })),
    issues,
  };
}

function normalizeHeading(heading) {
  return String(heading).trim().toLowerCase().replace(/[:.]+$/, '');
}

/**
 * Parse a `## Recall` section body into the `Recall` object from src/types.ts.
 * Supports both formats in SCHEMA §1 (mcq and reveal).
 * @returns {{recall: object|null, errors: string[], warnings: string[]}}
 */
export function parseRecall(sectionText) {
  const errors = [];
  const warnings = [];
  // Authors sometimes wrap the block in a code fence (the style guide shows it fenced).
  const lines = String(sectionText)
    .split('\n')
    .filter((l) => !/^\s*(```|~~~)/.test(l));

  let type = null;
  let question = null;
  let answer = null;
  const options = [];
  let last = null; // 'q' | 'a' — for continuation lines

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { last = null; continue; }

    const typeM = line.match(/^type\s*:\s*(.+)$/i);
    if (typeM && type === null && options.length === 0) {
      type = typeM[1].trim().toLowerCase();
      last = null;
      continue;
    }

    const qM = line.match(/^(?:Q|P|Pregunta|Question)\s*:\s*(.*)$/i);
    if (qM) {
      if (question !== null) errors.push('Recall section has more than one `Q:` line — one question per card');
      question = qM[1].trim();
      last = 'q';
      continue;
    }

    const aM = line.match(/^(?:A|R|Respuesta|Answer)\s*:\s*(.*)$/i);
    if (aM) {
      answer = aM[1].trim();
      last = 'a';
      continue;
    }

    const optM = line.match(OPTION_RE);
    if (optM) {
      last = null;
      const correct = optM[1].toLowerCase() === 'x';
      const rawText = optM[2].trim();
      const split = splitOption(rawText);
      if (split.warning) warnings.push(split.warning);
      if (split.why === null) {
        errors.push(`Recall option "${truncate(rawText, 60)}" has no reason: write \`- [${correct ? 'x' : ' '}] option — one-line reason it is right or wrong\` (em dash, spaces around it)`);
        options.push({ text: rawText, correct, why: '' });
      } else {
        options.push({ text: split.text, correct, why: split.why });
      }
      continue;
    }

    // continuation of Q or A
    if (last === 'q' && question !== null) { question = `${question} ${line}`.trim(); continue; }
    if (last === 'a' && answer !== null) { answer = `${answer} ${line}`.trim(); continue; }

    warnings.push(`Recall section: ignored line "${truncate(line, 60)}" (expected \`type:\`, \`Q:\`, \`A:\` or \`- [ ] option — reason\`)`);
  }

  if (type === null) {
    if (options.length > 0) { type = 'mcq'; warnings.push('Recall section has no `type:` line; assuming `type: mcq` because it has options'); }
    else if (answer !== null) { type = 'reveal'; warnings.push('Recall section has no `type:` line; assuming `type: reveal` because it has an `A:` line'); }
    else { errors.push('Recall section: missing first line `type: mcq` or `type: reveal`'); return { recall: null, errors, warnings }; }
  }
  if (type !== 'mcq' && type !== 'reveal') {
    errors.push(`Recall \`type: ${type}\` is not valid — use \`mcq\` or \`reveal\``);
    return { recall: null, errors, warnings };
  }
  if (question === null || question === '') {
    errors.push('Recall section: missing the `Q:` line (the question, on one line)');
  }

  const recall = { type, question: question || '' };
  if (type === 'reveal') {
    if (answer === null || answer === '') errors.push('Recall `type: reveal` needs an `A:` line with the answer (1–3 lines)');
    recall.answer = answer || '';
    if (options.length) errors.push('Recall `type: reveal` must not have `- [ ]` options — use `type: mcq` for those');
  } else {
    recall.options = options;
    if (options.length === 0) errors.push('Recall `type: mcq` has no options: add 2–4 lines like `- [ ] option — reason`');
  }
  return { recall, errors, warnings };
}

function splitOption(text) {
  for (const { sep, ok, name } of SEPARATORS) {
    const at = text.indexOf(sep);
    if (at > 0) {
      const head = text.slice(0, at).trim();
      const why = text.slice(at + sep.length).trim();
      if (!head || !why) continue;
      return {
        text: head,
        why,
        warning: ok ? null : `Recall option "${truncate(head, 40)}" uses a ${name} before its reason; the separator is \` — \` (em dash with a space on each side)`,
      };
    }
  }
  return { text, why: null, warning: null };
}

function truncate(s, n) {
  const str = String(s);
  return str.length <= n ? str : `${str.slice(0, n - 1)}…`;
}

/**
 * Strip markdown/KaTeX syntax so word counts measure prose, not punctuation.
 * Math spans collapse to a single token (a formula reads as one "word").
 */
export function stripMarkdown(markdown) {
  let t = String(markdown);
  t = t.replace(/```[\s\S]*?```/g, ' ');            // fenced code
  t = t.replace(/~~~[\s\S]*?~~~/g, ' ');
  t = t.replace(/\\\$/g, '\u0000');                  // escaped dollar: not math
  t = t.replace(/\$\$[\s\S]*?\$\$/g, ' math ');      // display math
  t = t.replace(/\$[^$\n]*\$/g, ' math ');           // inline math
  t = t.replace(/\u0000/g, '$');
  t = t.replace(/`[^`]*`/g, ' code ');               // inline code
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');       // images
  t = t.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');     // links -> text
  t = t.replace(/<[^>]+>/g, ' ');                    // stray html
  t = t.replace(/^\s{0,3}#{1,6}\s+/gm, '');          // headings
  t = t.replace(/^\s{0,3}>\s?/gm, '');               // quotes
  t = t.replace(/^\s*[-*+]\s+/gm, '');               // bullets
  t = t.replace(/^\s*\d+\.\s+/gm, '');               // ordered lists
  t = t.replace(/[*_~]{1,3}/g, '');                  // emphasis
  t = t.replace(/\|/g, ' ');                         // table pipes
  return t;
}

/** Words in a markdown chunk, ignoring markup. */
export function countWords(markdown) {
  const tokens = stripMarkdown(markdown).split(/\s+/);
  let n = 0;
  for (const tok of tokens) if (/[\p{L}\p{N}]/u.test(tok)) n++;
  return n;
}

/**
 * KaTeX sanity: every `$` opens and closes, and no `\newcommand`.
 * Escaped `\$` (a literal dollar sign) does not count.
 * @returns {{ok: boolean, problems: string[]}}
 */
export function checkMath(markdown) {
  const problems = [];
  let t = String(markdown).replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ');
  if (/\\newcommand|\\renewcommand|\\def\b/.test(t)) {
    problems.push('KaTeX: `\\newcommand`/`\\def` is not supported in cards — write the macro out in full');
  }
  t = t.replace(/\\\$/g, '');
  let inline = false;
  let display = false;
  for (let i = 0; i < t.length; i++) {
    if (t[i] !== '$') continue;
    if (t[i + 1] === '$' && !inline) { display = !display; i++; continue; }
    inline = !inline;
  }
  // Row breaks inside cases/matrix/align environments must be `\\`; a lone `\` followed by a
  // space or newline renders the whole environment on one line without any KaTeX error.
  const envRe = /\\begin\{(cases|matrix|pmatrix|bmatrix|vmatrix|Bmatrix|align|aligned|alignat|array|gathered)\}([\s\S]*?)\\end\{\1\}/g;
  let em;
  while ((em = envRe.exec(t)) !== null) {
    const body = em[2];
    const loneBackslashRow = /(^|[^\\])\\(?:[ \t]*\n|[ \t]+(?=[^\\\s,;!:>]))/m;
    const hasRealBreak = /\\\\/.test(body);
    if (loneBackslashRow.test(body) && !hasRealBreak) {
      problems.push(`KaTeX: inside \\begin{${em[1]}} a row break is written as a single backslash — use \\\\ (double backslash) between rows`);
    }
  }
  if (inline) problems.push('KaTeX: an inline `$` is never closed — every `$…$` needs a matching `$` (use `\\$` for a literal dollar sign)');
  if (display) problems.push('KaTeX: a display `$$` block is never closed — every `$$…$$` needs a matching `$$`');
  return { ok: problems.length === 0, problems };
}

/** The card object with the derived-only keys removed, for JSON-schema validation. */
export function toSchemaSubject(card) {
  const subject = { ...card };
  for (const key of DERIVED_ONLY_KEYS) delete subject[key];
  if (subject.diagram && typeof subject.diagram === 'object' && 'svg' in subject.diagram) {
    subject.diagram = { ...subject.diagram };
    delete subject.diagram.svg;
  }
  return subject;
}

export default { parseCardFile, parseCardText, parseRecall, countWords, stripMarkdown, checkMath, toSchemaSubject };
