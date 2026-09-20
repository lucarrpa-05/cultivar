/**
 * Loading everything the refresh analysis needs, tolerantly.
 *
 * Nothing here throws because of missing inputs: a first run has no data repo,
 * no built content and (during the fleet build) possibly no cards at all.
 */
import { existsSync } from 'node:fs';
import { basename, join, relative } from 'node:path';
import type {
  CardMeta,
  ContentIndex,
  DomainId,
  Event,
  Priors,
  ReaderQuestion,
  Taxonomy,
  TaxonomyNode,
  TopicId,
  WireItem,
} from '../../src/types.ts';
import { at, frontMatter, isDir, localDay, readJson, readText, run, walk } from './refresh-io.mjs';

export interface DataRepo {
  dir: string;
  present: boolean;
  events: Event[];
  questions: ReaderQuestion[];
  context: ContextEntry | null;
  contextHistory: ContextEntry[];
  meta: { lastPush?: number; device?: string; eventCount?: number; months?: string[] } | null;
  recaps: string[];
}

export interface ContextEntry {
  date: string;
  text: string;
}

export const EMPTY_INDEX: ContentIndex = { builtAt: '', count: 0, cards: [] };

export function loadTaxonomy(): Taxonomy {
  const tax = readJson<Taxonomy>(at('content', 'taxonomy.json'));
  return tax || { version: 0, domains: [], nodes: [] };
}

export function loadPriors(): Priors {
  const priors = readJson<Priors>(at('content', 'priors.json'));
  return (
    priors || {
      mastery: {},
      difficulty: {},
      interest: {},
      formats: {} as Priors['formats'],
      angles: {} as Priors['angles'],
      language: { es: 0.12 },
    }
  );
}

/**
 * The built content index, in order of preference:
 *  1. public/content/index.json (what the app ships)
 *  2. `node scripts/build-content.mjs` then (1)
 *  3. a best-effort front-matter scan of content/cards/**\/*.md
 *  4. an empty index (cold start, before any content exists)
 */
export function loadIndex(opts: { build?: boolean; file?: string } = {}): {
  index: ContentIndex;
  source: 'built' | 'rebuilt' | 'scanned' | 'empty' | 'file';
} {
  if (opts.file) {
    const custom = readJson<ContentIndex>(opts.file);
    if (custom) return { index: custom, source: 'file' };
  }
  const built = readJson<ContentIndex>(at('public', 'content', 'index.json'));
  if (built && Array.isArray(built.cards)) return { index: built, source: 'built' };

  if (opts.build !== false && existsSync(at('scripts', 'build-content.mjs'))) {
    const res = run('node', ['scripts/build-content.mjs']);
    if (res.ok) {
      const rebuilt = readJson<ContentIndex>(at('public', 'content', 'index.json'));
      if (rebuilt && Array.isArray(rebuilt.cards)) return { index: rebuilt, source: 'rebuilt' };
    }
  }
  const scanned = scanCards();
  if (scanned.cards.length) return { index: scanned, source: 'scanned' };
  return { index: EMPTY_INDEX, source: 'empty' };
}

/** Front-matter scan: enough CardMeta for the analysis (counts, difficulty, layer, topic). */
export function scanCards(): ContentIndex {
  const dir = at('content', 'cards');
  const files = walk(dir, (n) => n.endsWith('.md'));
  const cards: CardMeta[] = [];
  for (const file of files) {
    const { data, body } = frontMatter(readText(file));
    if (!data.id || !data.topic) continue;
    const titleMatch = /^#\s+(.+)$/m.exec(body);
    const hasRigor = /^##\s+Rigor\s*$/m.test(body);
    const hasRecall = /^##\s+Recall\s*$/m.test(body);
    const intuition = body.split(/^##\s+/m)[0] || '';
    cards.push({
      id: String(data.id),
      topic: String(data.topic),
      topics: asArray(data.topics),
      domain: String(data.topic).split('.')[0] as DomainId,
      format: (data.format || 'idea') as CardMeta['format'],
      layer: (data.layer || (hasRigor ? 'both' : 'intuition')) as CardMeta['layer'],
      difficulty: Number(data.difficulty || 3) as CardMeta['difficulty'],
      language: (data.language || 'en') as CardMeta['language'],
      weight: (data.weight || 'medium') as CardMeta['weight'],
      angles: asArray(data.angles) as CardMeta['angles'],
      tags: asArray(data.tags),
      prerequisites: asArray(data.prerequisites),
      title: titleMatch ? titleMatch[1].trim() : basename(file, '.md'),
      hook: data.hook ? String(data.hook) : undefined,
      dates: { written: (/(\d{4}-\d{2}-\d{2})/.exec(String(data.dates || '')) || [])[1] || localDay(Date.now()) },
      evergreen: data.evergreen !== false,
      hasRigor,
      hasRecall,
      hasDiagram: Boolean(data.diagram),
      words: { body: words(intuition), rigor: 0 },
      author: String(data.author || 'unknown'),
      reviewed: data.reviewed ? ({ by: 'unknown', at: '', verdict: 'approved' } as CardMeta['reviewed']) : undefined,
      answersQuestion: data.answersQuestion ? String(data.answersQuestion) : undefined,
      context: data.context ? String(data.context) : undefined,
    });
  }
  return { builtAt: new Date().toISOString(), count: cards.length, cards };
}

function asArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === 'string' && v.trim()) return [v.trim()];
  return [];
}

function words(s: string): number {
  return (s.trim().match(/\S+/g) || []).length;
}

/** Everything in the private data repo clone (.data/), or sensible empties. */
export function loadDataRepo(dir = at('.data'), fixture?: string): DataRepo {
  const present = isDir(dir);
  const events = fixture ? loadEventsFromFile(fixture) : loadEvents(dir);
  const questions = readJson<ReaderQuestion[]>(join(dir, 'questions.json'), []) || [];
  const contextHistory = parseContext(readText(join(dir, 'context.md')));
  const recaps = walk(join(dir, 'recaps'), (n) => n.endsWith('.md')).map((f) => basename(f, '.md')).sort();
  return {
    dir,
    present,
    events,
    questions: Array.isArray(questions) ? questions : [],
    context: contextHistory.length ? contextHistory[contextHistory.length - 1] : null,
    contextHistory,
    meta: readJson(join(dir, 'meta.json'), null),
    recaps,
  };
}

/** Union of .data/events/*.json by event id, sorted by t. */
export function loadEvents(dir: string): Event[] {
  const files = walk(join(dir, 'events'), (n) => n.endsWith('.json'));
  const seen = new Map<string, Event>();
  for (const f of files) collectEvents(readJson(f, null), seen);
  return [...seen.values()].sort((a, b) => a.t - b.t || a.id.localeCompare(b.id));
}

export function loadEventsFromFile(file: string): Event[] {
  const seen = new Map<string, Event>();
  collectEvents(readJson(file, null), seen);
  return [...seen.values()].sort((a, b) => a.t - b.t || a.id.localeCompare(b.id));
}

function collectEvents(raw: unknown, into: Map<string, Event>): void {
  const list = Array.isArray(raw)
    ? raw
    : raw && typeof raw === 'object' && Array.isArray((raw as { events?: Event[] }).events)
      ? (raw as { events: Event[] }).events
      : [];
  for (const ev of list as Event[]) {
    if (ev && typeof ev.t === 'number' && typeof ev.type === 'string') {
      into.set(ev.id || `${ev.t}-${ev.type}-${into.size}`, ev);
    }
  }
}

/** context.md: "## YYYY-MM-DD" headed blocks, oldest first. */
export function parseContext(text: string): ContextEntry[] {
  const out: ContextEntry[] = [];
  let date = '';
  let buf: string[] = [];
  const flush = () => {
    const t = buf.join('\n').trim();
    if (date && t) out.push({ date, text: t });
    buf = [];
  };
  for (const line of text.replace(/\r\n/g, '\n').split('\n')) {
    const h = /^##\s+(\d{4}-\d{2}-\d{2})/.exec(line);
    if (h) {
      flush();
      date = h[1];
    } else if (date) {
      buf.push(line);
    }
  }
  flush();
  out.sort((a, b) => a.date.localeCompare(b.date));
  return out;
}

/** The live inbox queue (agent D writes it; may not exist yet). */
export function loadWire(): WireItem[] {
  const q = readJson<{ items?: WireItem[] } | WireItem[]>(at('data', 'inbox', 'queue.json'), null);
  if (!q) return [];
  const items = Array.isArray(q) ? q : q.items || [];
  return items.filter((i) => i && typeof i.id === 'string');
}

/** Source registry weights, for inbox ranking. */
export function loadSourceWeights(): Record<string, { weight: number; name: string; enabled: boolean }> {
  const reg = readJson<{ sources?: { id: string; weight?: number; name?: string; enabled?: boolean }[] }>(
    at('data', 'sources.json'),
    null,
  );
  const out: Record<string, { weight: number; name: string; enabled: boolean }> = {};
  for (const s of reg?.sources || []) {
    out[s.id] = { weight: s.weight ?? 3, name: s.name || s.id, enabled: s.enabled !== false };
  }
  return out;
}

// ───────────────────────── taxonomy helpers ─────────────────────────

export class Nodes {
  readonly byId = new Map<TopicId, TaxonomyNode>();
  readonly domainName = new Map<string, string>();
  readonly childrenOf = new Map<TopicId, TopicId[]>();
  readonly cardCount = new Map<TopicId, number>();

  constructor(
    readonly taxonomy: Taxonomy,
    readonly index: ContentIndex,
  ) {
    for (const n of taxonomy.nodes) {
      this.byId.set(n.id, n);
      const kids = this.childrenOf.get(n.parent) || [];
      kids.push(n.id);
      this.childrenOf.set(n.parent, kids);
    }
    for (const d of taxonomy.domains) this.domainName.set(d.id, d.name);
    for (const c of index.cards) {
      for (const t of [c.topic, ...(c.topics || [])]) {
        for (const node of this.chain(t)) this.cardCount.set(node, (this.cardCount.get(node) || 0) + 1);
      }
    }
  }

  node(id: TopicId): TaxonomyNode | undefined {
    return this.byId.get(id);
  }

  name(id: TopicId): string {
    const n = this.byId.get(id);
    if (n) return n.name;
    return this.domainName.get(id) || id;
  }

  /** "math.topology.compactness" -> ["math.topology.compactness", "math.topology", "math"] */
  chain(id: TopicId): TopicId[] {
    const out: TopicId[] = [];
    let cur: TopicId | undefined = id;
    let guard = 0;
    while (cur && guard++ < 8) {
      out.push(cur);
      const n = this.byId.get(cur);
      cur = n ? n.parent : cur.includes('.') ? cur.slice(0, cur.lastIndexOf('.')) : undefined;
      if (cur && out.includes(cur)) break;
    }
    return out;
  }

  domain(id: TopicId): DomainId {
    return id.split('.')[0] as DomainId;
  }

  area(id: TopicId): TopicId {
    const parts = id.split('.');
    return parts.length >= 2 ? parts.slice(0, 2).join('.') : id;
  }

  prereqs(id: TopicId): TopicId[] {
    return this.byId.get(id)?.prereqs || [];
  }

  /** Topics (leaf nodes) under an area or domain. */
  topicsUnder(id: TopicId): TopicId[] {
    const out: TopicId[] = [];
    const stack = [...(this.childrenOf.get(id) || [])];
    while (stack.length) {
      const cur = stack.pop()!;
      const n = this.byId.get(cur);
      if (!n) continue;
      if (n.kind === 'topic') out.push(cur);
      else stack.push(...(this.childrenOf.get(cur) || []));
    }
    return out.sort();
  }

  cards(id: TopicId): number {
    return this.cardCount.get(id) || 0;
  }
}

/** Most specific matching prior (topic -> area -> domain). */
export function priorFor<T>(map: Record<string, T> | undefined, id: TopicId, nodes: Nodes): T | undefined {
  if (!map) return undefined;
  for (const step of nodes.chain(id)) if (map[step] !== undefined) return map[step];
  return undefined;
}

export function repoRelative(p: string): string {
  return relative(at('.'), p).replace(/\\/g, '/');
}
