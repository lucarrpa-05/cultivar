/**
 * Cultivar — feed parsing, cleaning and classification.
 *
 * Pure functions only: no network, no filesystem, no process access.
 * `scripts/fetch-live.mjs` does the I/O; the tests in `tests/fetch/` exercise
 * everything here against saved fixtures.
 *
 * Contract: the objects produced by `toWireItem` must satisfy `WireItem`
 * in `src/types.ts`.
 */

import { createHash } from 'node:crypto';
import { XMLParser } from 'fast-xml-parser';

// ───────────────────────────── constants ─────────────────────────────

export const SUMMARY_MAX = 500;
export const USER_AGENT =
  'cultivar-fetch/1.0 (personal learning app; +https://github.com/lucarrpa-05/cultivar)';

/** WireItem['kind'] — `article` is not in the union, so it becomes `news`. */
const KIND_MAP = {
  paper: 'paper',
  news: 'news',
  blog: 'blog',
  onthisday: 'onthisday',
  wiki: 'wiki',
  video: 'video',
  article: 'news',
};

const VALID_DOMAINS = new Set([
  'math', 'ai', 'css', 'econ', 'physics', 'bio',
  'phil', 'hist', 'poli', 'sports', 'niche',
]);

// ───────────────────────────── ids & text ─────────────────────────────

/** Hex sha1 of a string. */
export function sha1(input) {
  return createHash('sha1').update(String(input), 'utf8').digest('hex');
}

/** WireItem id: first 12 hex chars of sha1(url). */
export function idFor(url) {
  return sha1(canonicalUrl(url)).slice(0, 12);
}

/**
 * Canonical form of a URL for id/dedupe purposes: drop the fragment, drop
 * tracking params, drop a trailing slash, lowercase the host, and collapse
 * arXiv versions (`/abs/2509.01234v2` → `/abs/2509.01234`).
 */
export function canonicalUrl(raw) {
  const s = String(raw ?? '').trim();
  if (!s) return '';
  let u;
  try {
    u = new URL(s);
  } catch {
    return s;
  }
  u.hash = '';
  u.protocol = u.protocol === 'http:' ? 'https:' : u.protocol;
  u.hostname = u.hostname.toLowerCase().replace(/^www\./, '');
  const drop = [];
  for (const key of u.searchParams.keys()) {
    if (/^(utm_|ref_|fbclid|gclid|mc_cid|mc_eid|at_|ito$|cmpid$|smid$)/i.test(key)) drop.push(key);
  }
  for (const key of drop) u.searchParams.delete(key);
  if (/(^|\.)arxiv\.org$/.test(u.hostname)) {
    u.pathname = u.pathname.replace(/^\/abs\/(.+?)v\d+$/, '/abs/$1');
  }
  let out = u.toString();
  out = out.replace(/\?$/, '');
  if (u.pathname !== '/' && out.endsWith('/')) out = out.slice(0, -1);
  return out;
}

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', hellip: '…',
  laquo: '«', raquo: '»', deg: '°', middot: '·', bull: '•', trade: '™', copy: '©',
  reg: '®', times: '×', divide: '÷', plusmn: '±', frac12: '½', frac14: '¼', frac34: '¾',
  sup2: '²', sup3: '³', micro: 'µ', euro: '€', pound: '£', yen: '¥', cent: '¢',
  dagger: '†', Dagger: '‡', prime: '′', Prime: '″', minus: '−', ne: '≠', le: '≤',
  ge: '≥', asymp: '≈', infin: '∞', alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ',
  epsilon: 'ε', theta: 'θ', lambda: 'λ', mu: 'μ', pi: 'π', sigma: 'σ', tau: 'τ',
  phi: 'φ', omega: 'ω', Omega: 'Ω', Delta: 'Δ', Sigma: 'Σ', shy: '', zwj: '', zwnj: '',
  ensp: ' ', emsp: ' ', thinsp: ' ', eacute: 'é', egrave: 'è', aacute: 'á', iacute: 'í',
  oacute: 'ó', uacute: 'ú', ntilde: 'ñ', Ntilde: 'Ñ', uuml: 'ü', ouml: 'ö', auml: 'ä',
  ccedil: 'ç', szlig: 'ß', agrave: 'à', acirc: 'â', ecirc: 'ê', icirc: 'î', ocirc: 'ô',
  ucirc: 'û', iquest: '¿', iexcl: '¡',
};

/** Decode numeric and the common named HTML entities. */
export function decodeEntities(input) {
  let s = String(input ?? '');
  if (!s.includes('&')) return s;
  s = s.replace(/&#x([0-9a-f]+);/gi, (_, hex) => safeCodePoint(parseInt(hex, 16)));
  s = s.replace(/&#(\d+);/g, (_, dec) => safeCodePoint(parseInt(dec, 10)));
  s = s.replace(/&([a-z][a-z0-9]*);/gi, (m, name) => {
    if (Object.prototype.hasOwnProperty.call(ENTITIES, name)) return ENTITIES[name];
    const lower = name.toLowerCase();
    return Object.prototype.hasOwnProperty.call(ENTITIES, lower) ? ENTITIES[lower] : m;
  });
  return s;
}

function safeCodePoint(code) {
  if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) return '';
  try {
    return String.fromCodePoint(code);
  } catch {
    return '';
  }
}

/**
 * Strip HTML/XML markup and decode entities, leaving readable plain text.
 * Handles feeds that escape their markup twice (`&lt;p&gt;…`).
 */
export function stripHtml(input) {
  let s = String(input ?? '');
  if (!s) return '';
  for (let pass = 0; pass < 2; pass += 1) {
    s = s
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<\/(p|div|li|tr|h[1-6]|blockquote|section|article)\s*>/gi, ' \u0001 ')
      .replace(/<br\s*\/?>/gi, ' \u0001 ')
      .replace(/<li\b[^>]*>/gi, ' \u0001 ')
      // negated class, so no backtracking risk even on a 4 kB <img srcset=…>
      .replace(/<[^<>]*>/g, ' ');
    const before = s;
    s = decodeEntities(s);
    if (s === before && !/[<>]/.test(s)) break;
  }
  return s
    .replace(/\u0001+/g, ' ')
    .replace(/[\t\r\n\f\v ​]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Truncate to `max` characters on a word boundary, adding an ellipsis. */
export function truncate(input, max = SUMMARY_MAX) {
  const s = String(input ?? '').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  const body = space > max * 0.6 ? cut.slice(0, space) : cut;
  return `${body.replace(/[\s,;:.–—-]+$/, '')}…`;
}

/** Plain-text summary of feed HTML, capped at 500 chars. */
export function cleanSummary(input, max = SUMMARY_MAX) {
  return truncate(stripHtml(input), max);
}

/** Lowercase, de-accent, drop punctuation — used for cross-source title dedupe. */
export function normalizeTitle(input) {
  return String(input ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&[a-z]+;/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(a|an|the|and|of|el|la|los|las|un|una|de|del|y)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Lowercase + de-accent, for keyword matching. */
export function foldText(input) {
  return String(input ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

// ───────────────────────────── dates ─────────────────────────────

/** Normalize anything date-ish to an ISO string, or null when unusable. */
export function toIso(value) {
  if (value == null || value === '') return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value.toISOString();
  let s = String(value).trim();
  if (!s) return null;
  // Bare YYYY-MM-DD → midday UTC, so timezone shifts never move the day.
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) s = `${s}T12:00:00Z`;
  let d = new Date(s);
  if (Number.isNaN(d.getTime())) {
    // "Tue, 16 Sep 2025 10:00:00 GMT+0000" and friends
    const cleaned = s.replace(/\s*\(.*\)$/, '').replace(/(GMT|UTC)\s*([+-]\d{4})/i, '$2');
    d = new Date(cleaned);
  }
  if (Number.isNaN(d.getTime())) return null;
  const year = d.getUTCFullYear();
  if (year < 1990 || year > 2100) return null;
  return d.toISOString();
}

/** Today in Bogotá (UTC−5, no DST). */
export function bogotaDate(now = Date.now()) {
  const d = new Date(typeof now === 'number' ? now : now.getTime());
  const shifted = new Date(d.getTime() - 5 * 60 * 60 * 1000);
  const yyyy = String(shifted.getUTCFullYear());
  const mm = String(shifted.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(shifted.getUTCDate()).padStart(2, '0');
  return { yyyy, mm, dd, date: `${yyyy}-${mm}-${dd}` };
}

/** Fill {YYYY}/{MM}/{DD} in a source URL with today's Bogotá date. */
export function expandDateTemplate(url, now = Date.now()) {
  const { yyyy, mm, dd } = bogotaDate(now);
  return String(url)
    .replace(/\{YYYY\}/g, yyyy)
    .replace(/\{MM\}/g, mm)
    .replace(/\{DD\}/g, dd);
}

// ───────────────────────────── XML helpers ─────────────────────────────

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  trimValues: true,
  // Public feeds are long; the library's default DoS caps are far too small for
  // a 1 MB feed full of &amp;/&#8217;. These are still bounded.
  processEntities: {
    enabled: true,
    maxEntitySize: 10_000,
    maxExpansionDepth: 12,
    maxTotalExpansions: 500_000,
    maxExpandedLength: 8_000_000,
    maxEntityCount: 100_000,
  },
  htmlEntities: true,
  parseTagValue: false,
  parseAttributeValue: false,
  ignoreDeclaration: true,
  ignorePiTags: true,
});

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

/** Text of a possibly attribute-wrapped XML node. */
function text(node) {
  if (node == null) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(text).filter(Boolean).join(' ');
  if (typeof node === 'object') {
    if ('#text' in node) return String(node['#text']);
    if ('__cdata' in node) return String(node.__cdata);
  }
  return '';
}

function pick(obj, ...keys) {
  for (const key of keys) {
    if (obj && obj[key] != null) {
      const v = text(obj[key]);
      if (v) return v;
    }
  }
  return '';
}

/** Parse XML into a plain object (exported for tests). */
export function parseXml(xml) {
  return parser.parse(String(xml));
}

// ───────────────────────────── feed parsers ─────────────────────────────

/**
 * RSS 2.0 (and RSS 1.0 / RDF). Returns raw items:
 * `{ title, link, summary, published, categories, author }`.
 */
export function parseRss(xml) {
  const doc = typeof xml === 'string' ? parseXml(xml) : xml;
  const channel = doc?.rss?.channel ?? doc?.channel ?? doc?.['rdf:RDF'] ?? doc?.RDF ?? {};
  const raw = asArray(channel.item ?? doc?.['rdf:RDF']?.item ?? []);
  return raw.map((it) => rssItem(it)).filter((it) => it.title || it.link);
}

function rssItem(it) {
  const link =
    firstUrl(it.link) ||
    firstUrl(it['feedburner:origLink']) ||
    firstUrl(it.guid && typeof it.guid === 'object' && it.guid['@_isPermaLink'] !== 'false' ? it.guid : null) ||
    firstUrl(typeof it.guid === 'string' && /^https?:\/\//.test(it.guid) ? it.guid : null) ||
    firstUrl(it['@_rdf:about']);
  const summaryRaw =
    pick(it, 'description', 'summary', 'content:encoded', 'content', 'media:description', 'itunes:summary');
  return {
    title: stripHtml(pick(it, 'title')),
    link,
    summary: cleanSummary(summaryRaw),
    published:
      toIso(pick(it, 'pubDate', 'dc:date', 'date', 'published', 'updated', 'lastBuildDate')) || null,
    categories: asArray(it.category).map(text).map((c) => c.trim()).filter(Boolean),
    author: stripHtml(pick(it, 'dc:creator', 'author', 'creator')),
  };
}

/** Atom 1.0. */
export function parseAtom(xml) {
  const doc = typeof xml === 'string' ? parseXml(xml) : xml;
  const feed = doc?.feed ?? doc ?? {};
  return asArray(feed.entry)
    .map((entry) => atomEntry(entry))
    .filter((it) => it.title || it.link);
}

function atomEntry(entry) {
  const link = atomLink(entry.link) || firstUrl(entry.id);
  const summaryRaw = pick(entry, 'summary', 'content', 'media:group', 'media:description');
  const mediaDesc = entry['media:group']?.['media:description'];
  return {
    title: stripHtml(pick(entry, 'title')),
    link,
    summary: cleanSummary(mediaDesc ? text(mediaDesc) : summaryRaw),
    published: toIso(pick(entry, 'published', 'updated', 'issued', 'dc:date')) || null,
    categories: asArray(entry.category)
      .map((c) => (typeof c === 'object' ? c['@_term'] ?? text(c) : text(c)))
      .filter(Boolean),
    author: stripHtml(entry.author ? pick(entry.author, 'name') || text(entry.author) : ''),
  };
}

function atomLink(link) {
  const links = asArray(link);
  const withRel = (rel) =>
    links.find((l) => typeof l === 'object' && (l['@_rel'] ?? 'alternate') === rel && l['@_href']);
  const alt = withRel('alternate') || links.find((l) => typeof l === 'object' && l['@_href']);
  if (alt) return String(alt['@_href']);
  const plain = links.find((l) => typeof l === 'string' && /^https?:\/\//.test(l));
  return plain ? String(plain) : '';
}

function firstUrl(node) {
  const v = text(node) || (node && typeof node === 'object' ? String(node['@_href'] ?? node['@_rdf:about'] ?? '') : '');
  const s = String(v ?? '').trim();
  return /^https?:\/\//i.test(s) ? s : '';
}

/** arXiv API (export.arxiv.org/api/query) — Atom with extra namespaces. */
export function parseArxivApi(xml) {
  const doc = typeof xml === 'string' ? parseXml(xml) : xml;
  const feed = doc?.feed ?? {};
  return asArray(feed.entry)
    .map((entry) => {
      const id = text(entry.id);
      const abs = id && /arxiv\.org/i.test(id)
        ? id.replace(/^http:/, 'https:').replace(/v\d+$/, '')
        : atomLink(entry.link) || id;
      const authors = asArray(entry.author).map((a) => pick(a, 'name')).filter(Boolean);
      return {
        title: stripHtml(pick(entry, 'title')).replace(/\s+/g, ' '),
        link: abs,
        summary: cleanSummary(pick(entry, 'summary')),
        published: toIso(pick(entry, 'published', 'updated')) || null,
        categories: asArray(entry.category)
          .map((c) => (typeof c === 'object' ? c['@_term'] : text(c)))
          .filter(Boolean),
        author: authors.slice(0, 4).join(', '),
      };
    })
    .filter((it) => it.title && it.link);
}

/** arXiv's own RSS mirror repeats boilerplate in the description; drop it. */
function cleanArxivSummary(summary) {
  return String(summary ?? '')
    .replace(/^arXiv:\S+\s*/i, '')
    .replace(/^Announce Type:\s*\S+\s*/i, '')
    .replace(/^Abstract:\s*/i, '')
    .trim();
}

/**
 * Wikimedia "on this day" (`/feed/v1/wikipedia/{lang}/onthisday/events/{MM}/{DD}`).
 * Keeps events before 2000 that link to an article; titles them "{year}: {text}".
 */
export function parseWikiOnThisDay(json, opts = {}) {
  const data = typeof json === 'string' ? JSON.parse(json) : json;
  const today = opts.date ?? bogotaDate(opts.now ?? Date.now()).date;
  const maxYear = opts.maxYear ?? 2000;
  const buckets = [
    ...asArray(data?.events),
    ...(opts.includeSelected === false ? [] : asArray(data?.selected)),
  ];
  const out = [];
  const seen = new Set();
  for (const ev of buckets) {
    const year = Number(ev?.year);
    if (!Number.isFinite(year) || year >= maxYear) continue;
    const page = asArray(ev?.pages).find((p) => p?.content_urls?.desktop?.page);
    if (!page) continue;
    const url = page.content_urls.desktop.page;
    if (seen.has(url)) continue;
    seen.add(url);
    const evText = stripHtml(ev.text ?? '');
    if (!evText) continue;
    out.push({
      title: `${year}: ${evText}`,
      link: url,
      summary: cleanSummary(page.extract || evText),
      published: `${today}T12:00:00.000Z`,
      categories: ['onthisday', String(year)],
      author: '',
      year,
    });
  }
  return out.sort((a, b) => b.year - a.year);
}

/**
 * Wikimedia "featured" (`/feed/v1/wikipedia/{lang}/featured/{YYYY}/{MM}/{DD}`):
 * today's featured article plus up to 2 most-read articles that have an extract.
 */
export function parseWikiFeatured(json, opts = {}) {
  const data = typeof json === 'string' ? JSON.parse(json) : json;
  const today = opts.date ?? bogotaDate(opts.now ?? Date.now()).date;
  const mostRead = opts.mostRead ?? 2;
  const out = [];
  const push = (page, tag) => {
    const url = page?.content_urls?.desktop?.page;
    const extract = page?.extract;
    if (!url || !extract) return;
    if (out.some((it) => it.link === url)) return;
    out.push({
      title: stripHtml(page.titles?.normalized || page.normalizedtitle || page.title || ''),
      link: url,
      summary: cleanSummary(extract),
      published: toIso(page.timestamp) || `${today}T12:00:00.000Z`,
      categories: ['wikipedia', tag],
      author: '',
    });
  };
  push(data?.tfa, 'featured');
  for (const article of asArray(data?.mostread?.articles).slice(0, mostRead * 3)) {
    if (out.length >= 1 + mostRead) break;
    push(article, 'mostread');
  }
  return out.filter((it) => it.title);
}

/** Hacker News via the Algolia API; keeps stories with `minPoints` points. */
export function parseHnAlgolia(json, opts = {}) {
  const data = typeof json === 'string' ? JSON.parse(json) : json;
  const minPoints = opts.minPoints ?? 100;
  return asArray(data?.hits)
    .map((hit) => {
      const points = Number(hit?.points ?? 0);
      const discussion = hit?.objectID ? `https://news.ycombinator.com/item?id=${hit.objectID}` : '';
      const url = hit?.url || hit?.story_url || discussion;
      const title = stripHtml(hit?.title || hit?.story_title || '');
      if (!url || !title) return null;
      const comments = Number(hit?.num_comments ?? 0);
      return {
        title,
        link: url,
        summary: cleanSummary(
          hit?.story_text || hit?.comment_text ||
          `${points} points, ${comments} comments on Hacker News. Discussion: ${discussion}`,
        ),
        published: toIso(hit?.created_at) || null,
        categories: asArray(hit?._tags).filter((t) => typeof t === 'string'),
        author: hit?.author ? String(hit.author) : '',
        points,
      };
    })
    .filter((it) => it && it.points >= minPoints)
    .sort((a, b) => b.points - a.points);
}

/**
 * Does this body look like a feed (or a feed-ish JSON payload) at all?
 * Lets the fetcher tell "valid feed, no items today" (arXiv skips weekends)
 * from "the server handed us an error page".
 */
export function looksLikeFeed(body, kind = 'rss') {
  const s = String(body ?? '').trim();
  if (!s) return false;
  if (kind === 'hn-algolia' || kind === 'wiki-onthisday' || kind === 'wiki-featured' || s.startsWith('{')) {
    try {
      const j = JSON.parse(s);
      return Boolean(j && typeof j === 'object');
    } catch {
      return false;
    }
  }
  try {
    const doc = parseXml(s);
    return Boolean(doc?.feed || doc?.rss || doc?.channel || doc?.['rdf:RDF'] || doc?.RDF);
  } catch {
    return false;
  }
}

/**
 * Parse a fetched body according to a source `kind`.
 * XML kinds auto-detect rss vs atom, so a mislabeled feed still works.
 */
export function parseByKind(kind, body, opts = {}) {
  switch (kind) {
    case 'arxiv-api':
      return parseArxivApi(body);
    case 'wiki-onthisday':
      return parseWikiOnThisDay(body, opts);
    case 'wiki-featured':
      return parseWikiFeatured(body, opts);
    case 'hn-algolia':
      return parseHnAlgolia(body, opts);
    case 'rss':
    case 'atom':
    case 'xml':
    default: {
      const doc = parseXml(body);
      if (doc?.feed) return parseAtom(doc);
      if (doc?.rss || doc?.channel || doc?.['rdf:RDF'] || doc?.RDF) return parseRss(doc);
      // Last resort: try both.
      const atom = parseAtom(doc);
      return atom.length ? atom : parseRss(doc);
    }
  }
}

// ───────────────────────────── classification ─────────────────────────────

/**
 * Keyword rules. Each rule votes for a domain (and optionally a topic) when one
 * of its terms appears in the title/summary/categories. Terms are matched on
 * folded text (lowercase, no accents) at word boundaries; `weight` lets
 * unambiguous phrases outvote single ambiguous words.
 */
export const KEYWORD_RULES = [
  // ── ai ──
  { domain: 'ai', topic: 'ai.llm', weight: 3, terms: ['large language model', 'language model', 'llm', 'llms', 'gpt-4', 'gpt-5', 'chatgpt', 'transformer', 'tokenizer', 'prompt engineering', 'modelo de lenguaje'] },
  { domain: 'ai', topic: 'ai.frontier.labs', weight: 3, terms: ['openai', 'anthropic', 'deepmind', 'mistral ai', 'hugging face', 'xai', 'meta ai'] },
  { domain: 'ai', topic: 'ai.frontier.models', weight: 2, terms: ['claude', 'gemini', 'llama 3', 'llama 4', 'gpt-4o', 'deepseek', 'qwen', 'frontier model', 'foundation model'] },
  { domain: 'ai', topic: 'ai.alignment', weight: 3, terms: ['ai safety', 'ai alignment', 'alignment research', 'reward hacking', 'rlhf', 'jailbreak', 'red teaming'] },
  { domain: 'ai', topic: 'ai.interpretability', weight: 3, terms: ['mechanistic interpretability', 'interpretability', 'sparse autoencoder', 'probing classifier', 'feature visualization'] },
  { domain: 'ai', topic: 'ai.neural-nets', weight: 2, terms: ['neural network', 'neural networks', 'deep learning', 'backpropagation', 'convolutional', 'embedding', 'red neuronal', 'aprendizaje profundo'] },
  { domain: 'ai', topic: 'ai.theory', weight: 3, terms: ['double descent', 'benign overfitting', 'lottery ticket', 'grokking', 'generalization bound', 'scaling law', 'scaling laws'] },
  { domain: 'ai', topic: 'ai.ml-basics', weight: 1, terms: ['machine learning', 'training data', 'classifier', 'inference', 'fine-tuning', 'fine tuning', 'benchmark', 'aprendizaje automatico', 'inteligencia artificial', 'artificial intelligence'] },
  { domain: 'ai', topic: 'ai.rl', weight: 2, terms: ['reinforcement learning', 'policy gradient', 'q-learning', 'alphago', 'alphafold', 'multi-armed bandit'] },
  { domain: 'ai', topic: 'ai.frontier.compute-hardware', weight: 2, terms: ['gpu', 'gpus', 'tpu', 'nvidia', 'data center', 'training compute', 'flops'] },

  // ── math ──
  { domain: 'math', topic: 'math.number-theory.divisibility-primes', weight: 3, terms: ['prime', 'primes', 'prime number', 'riemann hypothesis', 'zeta function', 'goldbach', 'numeros primos'] },
  { domain: 'math', topic: 'math.topology', weight: 3, terms: ['topology', 'topological', 'manifold', 'manifolds', 'homotopy', 'homology', 'knot theory', 'topologia'] },
  { domain: 'math', topic: 'math.combinatorics.graph-theory', weight: 3, terms: ['graph theory', 'ramsey', 'combinatorics', 'combinatorial', 'hypergraph', 'tiling', 'sphere packing'] },
  { domain: 'math', topic: 'math.algebra', weight: 3, terms: ['group theory', 'galois', 'abelian', 'lie algebra', 'modular form', 'algebraic geometry', 'representation theory'] },
  { domain: 'math', topic: 'math.open-problems', weight: 3, terms: ['conjecture', 'open problem', 'millennium prize', 'p vs np', 'collatz', 'fields medal', 'conjetura'] },
  { domain: 'math', topic: 'math.logic', weight: 3, terms: ['set theory', 'continuum hypothesis', 'godel', 'incompleteness', 'formal proof', 'lean prover', 'proof assistant'] },
  { domain: 'math', topic: 'math.probability', weight: 2, terms: ['probability theory', 'random walk', 'markov chain', 'stochastic', 'martingale', 'bayesian'] },
  { domain: 'math', topic: 'math', weight: 2, terms: ['mathematician', 'mathematicians', 'theorem', 'proved', 'mathematical', 'matematico', 'matematicas', 'teorema'] },

  // ── physics ──
  { domain: 'physics', topic: 'physics.quantum', weight: 3, terms: ['quantum', 'qubit', 'qubits', 'entanglement', 'superposition', 'quantum computer', 'cuantica', 'cuantico'] },
  { domain: 'physics', topic: 'physics.cosmos', weight: 3, terms: ['galaxy', 'galaxies', 'black hole', 'dark matter', 'dark energy', 'cosmology', 'exoplanet', 'supernova', 'telescope', 'neutrino', 'agujero negro', 'galaxia', 'universo'] },
  { domain: 'physics', topic: 'physics.cosmos.standard-model', weight: 3, terms: ['higgs', 'quark', 'muon', 'large hadron collider', 'standard model', 'antimatter', 'particle physics'] },
  { domain: 'physics', topic: 'physics.relativity', weight: 3, terms: ['general relativity', 'special relativity', 'gravitational wave', 'spacetime', 'ligo', 'relatividad'] },
  { domain: 'physics', topic: 'physics.thermo', weight: 2, terms: ['thermodynamic', 'entropy', 'superconductor', 'superconducting', 'phase transition', 'plasma'] },
  { domain: 'physics', topic: 'physics', weight: 1, terms: ['physicist', 'physicists', 'physics', 'nasa', 'fisica', 'fisico'] },

  // ── bio ──
  { domain: 'bio', topic: 'bio.genetics', weight: 3, terms: ['gene', 'genes', 'genome', 'genomic', 'dna', 'rna', 'crispr', 'mutation', 'chromosome', 'epigenetic', 'genoma', 'genetica'] },
  { domain: 'bio', topic: 'bio.neuro', weight: 3, terms: ['neuron', 'neurons', 'neural circuit', 'neuroscience', 'brain', 'cortex', 'synapse', 'dopamine', 'memory consolidation', 'cerebro', 'neurona'] },
  { domain: 'bio', topic: 'bio.evolution', weight: 3, terms: ['evolution', 'evolutionary', 'natural selection', 'species', 'fossil', 'dinosaur', 'phylogen', 'ancestor', 'evolucion', 'especie', 'fosil'] },
  { domain: 'bio', topic: 'bio.cells', weight: 3, terms: ['cell', 'cells', 'protein', 'proteins', 'enzyme', 'mitochondria', 'ribosome', 'molecular biology', 'celula', 'proteina'] },
  { domain: 'bio', topic: 'bio.body', weight: 2, terms: ['immune', 'antibody', 'vaccine', 'cancer', 'tumor', 'microbiome', 'virus', 'bacteria', 'pathogen', 'clinical trial', 'vacuna', 'cancer'] },
  { domain: 'bio', topic: 'bio.ecology', weight: 2, terms: ['ecosystem', 'biodiversity', 'coral reef', 'climate change', 'extinction', 'rainforest', 'biodiversidad'] },

  // ── css (computational social science) ──
  { domain: 'css', topic: 'css.networks', weight: 3, terms: ['social network', 'social networks', 'network science', 'complex network', 'scale-free', 'small-world', 'centrality', 'redes sociales'] },
  { domain: 'css', topic: 'css.abm', weight: 3, terms: ['agent-based', 'agent based model', 'multi-agent', 'simulation model', 'cellular automata', 'emergent behavior'] },
  { domain: 'css', topic: 'css.opinion-dynamics', weight: 3, terms: ['polarization', 'opinion dynamics', 'echo chamber', 'misinformation', 'disinformation', 'filter bubble', 'polarizacion', 'desinformacion'] },
  { domain: 'css', topic: 'css.llm-agents', weight: 3, terms: ['generative agents', 'llm agents', 'silicon sampling', 'simulated society', 'social simulation'] },
  { domain: 'css', topic: 'css.complexity', weight: 2, terms: ['complex system', 'complex systems', 'power law', 'tipping point', 'santa fe institute', 'self-organization'] },
  { domain: 'css', topic: 'css.methods', weight: 2, terms: ['computational social science', 'text as data', 'digital trace', 'online experiment', 'survey experiment'] },

  // ── econ ──
  { domain: 'econ', topic: 'econ.macro', weight: 3, terms: ['inflation', 'gdp', 'central bank', 'federal reserve', 'monetary policy', 'recession', 'unemployment', 'fiscal', 'inflacion', 'banco central', 'desempleo'] },
  { domain: 'econ', topic: 'econ.behavioral', weight: 3, terms: ['behavioral economics', 'nudge', 'loss aversion', 'cognitive bias', 'heuristics and biases', 'prospect theory', 'economia conductual'] },
  { domain: 'econ', topic: 'econ.causal', weight: 3, terms: ['causal inference', 'randomized controlled trial', 'difference-in-differences', 'instrumental variable', 'natural experiment'] },
  { domain: 'econ', topic: 'econ.econometrics', weight: 2, terms: ['econometric', 'econometrics', 'regression discontinuity', 'panel data'] },
  { domain: 'econ', topic: 'econ.micro', weight: 2, terms: ['market design', 'auction', 'supply and demand', 'price elasticity', 'externality', 'monopoly'] },
  { domain: 'econ', topic: 'econ', weight: 1, terms: ['economist', 'economists', 'economy', 'economic growth', 'trade war', 'tariff', 'labor market', 'economia', 'mercado laboral'] },

  // ── poli ──
  { domain: 'poli', topic: 'poli.democracy.elections', weight: 3, terms: ['election', 'elections', 'voters', 'ballot', 'referendum', 'electoral', 'elecciones', 'votantes'] },
  { domain: 'poli', topic: 'poli.colombia', weight: 3, terms: ['colombia', 'petro', 'bogota', 'farc', 'colombiano', 'colombiana'] },
  { domain: 'poli', topic: 'poli.democracy.backsliding', weight: 2, terms: ['authoritarian', 'democratic backsliding', 'autocrat', 'coup', 'populism', 'populismo', 'autoritario'] },
  { domain: 'poli', topic: 'poli.institutions', weight: 2, terms: ['parliament', 'congress', 'constitutional court', 'legislation', 'supreme court', 'congreso', 'constitucion'] },
  { domain: 'poli', topic: 'poli.political-economy', weight: 2, terms: ['corruption', 'state capacity', 'clientelism', 'rent-seeking', 'corrupcion'] },

  // ── hist ──
  { domain: 'hist', topic: 'hist.ancient', weight: 3, terms: ['archaeolog', 'archeolog', 'excavation', 'ancient rome', 'ancient greece', 'mesopotamia', 'pharaoh', 'bronze age', 'arqueolog'] },
  { domain: 'hist', topic: 'hist.modern', weight: 2, terms: ['world war', 'cold war', 'medieval', 'renaissance', 'industrial revolution', 'colonial', 'empire', 'guerra mundial', 'siglo xix', 'siglo xx'] },
  { domain: 'hist', topic: 'hist.latam', weight: 3, terms: ['latin america', 'latinoamerica', 'america latina', 'mexico', 'argentina', 'chile', 'peru', 'venezuela', 'brasil'] },
  { domain: 'hist', topic: 'hist.science', weight: 2, terms: ['history of science', 'manuscript', 'archive', 'historian', 'historians', 'historiador'] },

  // ── phil ──
  { domain: 'phil', topic: 'phil.mind', weight: 3, terms: ['consciousness', 'philosophy of mind', 'free will', 'qualia', 'personal identity', 'conciencia'] },
  { domain: 'phil', topic: 'phil.ethics', weight: 3, terms: ['ethics', 'moral philosophy', 'utilitarian', 'deontolog', 'trolley problem', 'etica', 'moral'] },
  { domain: 'phil', topic: 'phil.epistemology', weight: 3, terms: ['epistemolog', 'knowledge and belief', 'skepticism', 'rationality', 'epistemolog'] },
  { domain: 'phil', topic: 'phil.science', weight: 2, terms: ['philosophy of science', 'paradigm shift', 'falsifiab', 'scientific realism', 'filosofia'] },
  { domain: 'phil', topic: 'phil', weight: 2, terms: ['philosopher', 'philosophers', 'philosophy', 'filosofo'] },

  // ── sports ──
  { domain: 'sports', topic: 'sports.football-analytics', weight: 3, terms: ['expected goals', 'xg model', 'football analytics', 'soccer analytics', 'premier league', 'la liga', 'world cup', 'futbol', 'seleccion colombia'] },
  { domain: 'sports', topic: 'sports.stats', weight: 2, terms: ['moneyball', 'sabermetric', 'hot hand', 'home advantage', 'elo rating', 'betting market'] },

  // ── niche ──
  { domain: 'niche', topic: 'niche.language', weight: 2, terms: ['etymology', 'linguistic', 'linguistics', 'writing system', 'untranslatable', 'etimologia'] },
  { domain: 'niche', topic: 'niche.art', weight: 2, terms: ['painting', 'museum', 'illustration', 'engraving', 'art history', 'architecture', 'pintura', 'museo'] },
  { domain: 'niche', topic: 'niche.places', weight: 2, terms: ['cartograph', 'map projection', 'abandoned', 'island', 'border dispute', 'geography'] },
  { domain: 'niche', topic: 'niche.weird', weight: 2, terms: ['hoax', 'eccentric', 'curiosity', 'bizarre', 'strange but true', 'mystery'] },
];

const COMPILED_RULES = KEYWORD_RULES.map((rule) => ({
  ...rule,
  matchers: rule.terms.map((term) => ({
    term,
    // tolerant of an English plural: "sparse autoencoder" also matches "sparse autoencoders"
    re: new RegExp(`(?:^|[^a-z0-9])${escapeRegExp(foldText(term))}(?:e?s)?(?:[^a-z0-9]|$)`, 'i'),
  })),
}));

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Sources whose items can legitimately belong to several domains. */
export const MULTI_DOMAIN_SOURCES = new Set([
  'quanta', 'nature-news', 'science-news', 'nature-human-behaviour', 'hn-ai',
  'bbc-mundo', 'elpais-ciencia', 'phys-org', 'ars-science', 'aeon',
  '3-quarks', 'kottke', 'nautilus', 'sinc', 'xataka', 'marginal-revolution',
  'wiki-featured-en', 'hn-front',
]);

/**
 * Score every domain against an item's text and return the ranked votes.
 * Exported for tests and for `--verbose` output.
 */
export function scoreKeywords(item) {
  const hay = foldText(
    [item?.title, item?.summary, ...(item?.categories ?? [])].filter(Boolean).join(' \n '),
  );
  const domains = new Map();
  for (const rule of COMPILED_RULES) {
    let hits = 0;
    const matched = [];
    for (const m of rule.matchers) {
      if (m.re.test(hay)) {
        hits += 1;
        matched.push(m.term);
      }
    }
    if (!hits) continue;
    const score = hits * rule.weight;
    const entry = domains.get(rule.domain) ?? { domain: rule.domain, score: 0, topic: null, topicScore: 0, terms: [] };
    entry.score += score;
    entry.terms.push(...matched);
    if (score > entry.topicScore) {
      entry.topicScore = score;
      entry.topic = rule.topic;
    }
    domains.set(rule.domain, entry);
  }
  return [...domains.values()].sort((a, b) => b.score - a.score || a.domain.localeCompare(b.domain));
}

/**
 * Decide `domain` and `topicHint` for one raw item.
 *
 * The source's own `domain`/`topicHint` are the default. Keyword votes can
 * refine the topic for any source; they can only *change the domain* for the
 * multi-domain sources listed above (or a source marked `multiDomain: true`),
 * and then only with a clear margin.
 *
 * @param {object} item   raw feed item `{title, summary, categories}`
 * @param {object} source the entry from data/sources.json
 * @param {{validTopics?: Set<string>}} [opts]
 */
export function classify(item, source, opts = {}) {
  const fallbackDomain = VALID_DOMAINS.has(source?.domain) ? source.domain : 'niche';
  const result = { domain: fallbackDomain, topicHint: source?.topicHint || fallbackDomain, why: [] };
  const votes = scoreKeywords(item);
  if (!votes.length) return finishClassify(result, opts, source);

  const multi = MULTI_DOMAIN_SOURCES.has(source?.id) || source?.multiDomain === true;
  const best = votes[0];
  const own = votes.find((v) => v.domain === fallbackDomain);

  if (multi && best.domain !== fallbackDomain && best.score >= 3 && best.score >= (own?.score ?? 0) + 2) {
    result.domain = best.domain;
    if (best.topic) result.topicHint = best.topic;
    result.why = best.terms.slice(0, 4);
  } else if (own && own.topic && own.topicScore >= 3) {
    // Same domain as the source: only sharpen the topic.
    result.topicHint = deeperTopic(source?.topicHint, own.topic);
    result.why = own.terms.slice(0, 4);
  } else if (!multi && best.domain === fallbackDomain && best.topic) {
    result.topicHint = deeperTopic(source?.topicHint, best.topic);
    result.why = best.terms.slice(0, 4);
  }
  return finishClassify(result, opts, source);
}

/** Prefer the more specific of two topic ids when one is an ancestor of the other. */
function deeperTopic(sourceTopic, ruleTopic) {
  if (!sourceTopic) return ruleTopic;
  if (!ruleTopic) return sourceTopic;
  if (sourceTopic === ruleTopic) return sourceTopic;
  if (sourceTopic.startsWith(`${ruleTopic}.`)) return sourceTopic;  // source is deeper
  if (ruleTopic.startsWith(`${sourceTopic}.`)) return ruleTopic;    // rule is deeper
  return ruleTopic;
}

function finishClassify(result, opts, source) {
  const valid = opts?.validTopics;
  if (valid && result.topicHint && !valid.has(result.topicHint)) {
    // Walk up to the nearest valid ancestor, then fall back to the source/domain.
    let candidate = result.topicHint;
    while (candidate.includes('.')) {
      candidate = candidate.slice(0, candidate.lastIndexOf('.'));
      if (valid.has(candidate)) break;
    }
    result.topicHint = valid.has(candidate)
      ? candidate
      : (valid.has(source?.topicHint) ? source.topicHint : result.domain);
  }
  const t = result.topicHint;
  if (t && t !== result.domain && !t.startsWith(`${result.domain}.`)) {
    // domain and topic must agree; the domain wins.
    result.topicHint = result.domain;
  }
  return result;
}

// ───────────────────────────── WireItem ─────────────────────────────

/** Map a source `itemKind` onto the `WireItem['kind']` union. */
export function wireKind(itemKind) {
  return KIND_MAP[String(itemKind ?? '').toLowerCase()] ?? 'news';
}

/**
 * Turn a raw parsed item into a `WireItem` (src/types.ts).
 * Returns null when the item has no usable URL or title.
 */
export function toWireItem(raw, source, opts = {}) {
  const url = String(raw?.link ?? '').trim();
  const title = stripHtml(raw?.title ?? '').trim();
  if (!/^https?:\/\//i.test(url) || !title) return null;
  const fetched = opts.fetched ?? new Date().toISOString();
  const summarySource = source?.kind === 'rss' && /arxiv/i.test(source?.id ?? '')
    ? cleanArxivSummary(raw.summary)
    : raw.summary;
  const { domain, topicHint } = classify({ ...raw, title }, source, opts);
  const item = {
    id: idFor(url),
    source: source.id,
    sourceName: source.name,
    kind: wireKind(source.itemKind),
    title: truncate(title, 220),
    url: canonicalUrl(url),
    summary: cleanSummary(summarySource),
    published: toIso(raw.published) ?? fetched,
    fetched,
    domain,
    lang: source.lang === 'es' ? 'es' : 'en',
    status: 'fresh',
  };
  if (topicHint) item.topicHint = topicHint;
  return item;
}

// ───────────────────────────── per-source filters ─────────────────────────────

/**
 * Extra include/exclude rules that cannot be expressed in the registry.
 * Returning false drops the item before it becomes a WireItem.
 */
export const SOURCE_FILTERS = {
  // BBC Mundo's index feed is general news: keep science/economy/history/tech only.
  'bbc-mundo': (raw) => {
    const path = foldText(raw.link);
    const hay = foldText(`${raw.title} ${raw.summary} ${(raw.categories ?? []).join(' ')}`);
    if (/(ciencia|tecnologia|salud|economia|historia|medio-ambiente|vert-)/.test(path)) return true;
    return /(ciencia|cientific|investigacion|estudio|economia|inflacion|historia|arqueolog|universo|planeta|inteligencia artificial|tecnologia)/.test(hay);
  },
  // Kottke and 3QD are grab bags; skip pure link-dump posts with no text.
  kottke: (raw) => (raw.summary ?? '').length > 60,
  'mathoverflow': (raw) => (raw.title ?? '').length > 15,
};

/** Should this raw item be kept for this source? */
export function passesFilter(raw, source) {
  const fn = SOURCE_FILTERS[source?.id];
  if (!fn) return true;
  try {
    return Boolean(fn(raw, source));
  } catch {
    return true;
  }
}

// ───────────────────────────── dedupe & retention ─────────────────────────────

/**
 * Remove duplicates by id, then by normalized title.
 * When two items collide the one from the heavier source wins, then the newer.
 */
export function dedupe(items, opts = {}) {
  const weightOf = opts.weightOf ?? (() => 3);
  const byId = new Map();
  for (const item of items) {
    const prev = byId.get(item.id);
    if (!prev || betterThan(item, prev, weightOf)) byId.set(item.id, item);
  }
  const byTitle = new Map();
  for (const item of byId.values()) {
    const key = normalizeTitle(item.title);
    if (!key || key.length < 8) {
      byTitle.set(`id:${item.id}`, item);
      continue;
    }
    const prev = byTitle.get(key);
    if (!prev || betterThan(item, prev, weightOf)) byTitle.set(key, item);
  }
  return [...byTitle.values()];
}

function betterThan(a, b, weightOf) {
  const wa = weightOf(a);
  const wb = weightOf(b);
  if (wa !== wb) return wa > wb;
  const ta = Date.parse(a.published ?? '') || 0;
  const tb = Date.parse(b.published ?? '') || 0;
  if (ta !== tb) return ta > tb;
  return String(a.id) < String(b.id);
}

export const RETENTION = { freshDays: 45, archiveDays: 120, maxFresh: 600 };

/**
 * Queue retention (SOURCES.md §Fetcher):
 *  - `fresh` items older than `freshDays` are dropped;
 *  - `distilled`/`dropped` records are kept `archiveDays` so they are not re-added;
 *  - `fresh` is capped at `maxFresh`, dropping oldest and lowest-weight first
 *    (rank = published time + (sourceWeight − 3) × 36 h).
 */
export function applyRetention(items, opts = {}) {
  const now = opts.now ?? Date.now();
  const freshDays = opts.freshDays ?? RETENTION.freshDays;
  const archiveDays = opts.archiveDays ?? RETENTION.archiveDays;
  const maxFresh = opts.maxFresh ?? RETENTION.maxFresh;
  const weightOf = opts.weightOf ?? (() => 3);
  const day = 24 * 60 * 60 * 1000;

  const ageOf = (item) => {
    const t = Date.parse(item.published ?? '') || Date.parse(item.fetched ?? '') || now;
    return now - t;
  };

  const kept = [];
  const fresh = [];
  const stats = { expired: 0, archivedExpired: 0, capped: 0 };
  for (const item of items) {
    if (item.status === 'fresh') {
      if (ageOf(item) > freshDays * day) { stats.expired += 1; continue; }
      fresh.push(item);
    } else {
      if (ageOf(item) > archiveDays * day) { stats.archivedExpired += 1; continue; }
      kept.push(item);
    }
  }
  if (fresh.length > maxFresh) {
    fresh.sort((a, b) => rank(b, weightOf) - rank(a, weightOf));
    stats.capped = fresh.length - maxFresh;
    fresh.length = maxFresh;
  }
  const out = [...fresh, ...kept];
  out.sort((a, b) => (Date.parse(b.published ?? '') || 0) - (Date.parse(a.published ?? '') || 0));
  return { items: out, stats };
}

function rank(item, weightOf) {
  const t = Date.parse(item.published ?? '') || Date.parse(item.fetched ?? '') || 0;
  return t + (weightOf(item) - 3) * 36 * 60 * 60 * 1000;
}

/**
 * Merge freshly fetched items into the existing queue.
 * Existing records win (they may be `distilled`/`dropped`); genuinely new
 * items are appended.
 */
export function mergeQueue(existing, incoming) {
  const byId = new Map();
  const titles = new Map();
  for (const item of existing) {
    byId.set(item.id, item);
    const key = normalizeTitle(item.title);
    if (key.length >= 8) titles.set(key, item);
  }
  let added = 0;
  let known = 0;
  for (const item of incoming) {
    const key = normalizeTitle(item.title);
    if (byId.has(item.id) || (key.length >= 8 && titles.has(key))) {
      known += 1;
      const prev = byId.get(item.id);
      if (prev && prev.status === 'fresh') {
        // refresh the volatile fields without touching status/distilledCard
        prev.summary = prev.summary || item.summary;
        prev.published = prev.published || item.published;
      }
      continue;
    }
    byId.set(item.id, item);
    if (key.length >= 8) titles.set(key, item);
    added += 1;
  }
  return { items: [...byId.values()], added, known };
}
