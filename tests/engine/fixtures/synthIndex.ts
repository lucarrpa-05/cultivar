/**
 * A synthetic content index over the *real* taxonomy (content/taxonomy.json).
 *
 * ~2,100 cards: 2–6 per topic at the topic's level ±1, formats and weights in
 * the proportions the style guide asks for (≈30% light / 45% medium / 25%
 * heavy), 40 series of 3–5 episodes, 80 cross-domain callbacks, 12% Spanish,
 * and `hasRecall` on every idea / series / callback.
 *
 * Deterministic for a given seed, so every engine test sees the same library.
 */

import type {
  Angle, CardMeta, ContentIndex, Difficulty, DomainId, Format, Language, Layer,
  Taxonomy, TaxonomyNode, TopicId, Weight,
} from '../../../src/types.ts';
import { mulberry32 } from '../../../src/engine/rng.ts';
import taxonomyJson from '../../../content/taxonomy.json';

export const taxonomy = taxonomyJson as unknown as Taxonomy;

const ANGLES: Angle[] = [
  'paradox', 'history', 'feud', 'mistake', 'connection', 'tool', 'open-problem',
  'weird', 'beautiful', 'practical', 'human', 'numbers', 'origin', 'prediction',
];

const GENERIC_TAGS = [
  'intuition', 'proof', 'counterexample', 'history', 'measurement', 'model',
  'paradox', 'estimate', 'data', 'theorem', 'experiment', 'notation',
];

const FORMAT_TABLE: { format: Format; p: number }[] = [
  { format: 'idea', p: 0.44 },
  { format: 'fact', p: 0.18 },
  { format: 'story', p: 0.14 },
  { format: 'challenge', p: 0.09 },
  { format: 'quote', p: 0.08 },
  { format: 'news', p: 0.04 },
  { format: 'recall', p: 0.03 },
];

const CARDS_PER_TOPIC: { n: number; p: number }[] = [
  { n: 2, p: 0.42 }, { n: 3, p: 0.3 }, { n: 4, p: 0.19 }, { n: 5, p: 0.06 }, { n: 6, p: 0.03 },
];

/**
 * Areas the reader's brief marks as live interests get deeper shelves — which
 * is what a real content plan would do, and what makes the obsession tests
 * meaningful (an area you can actually binge for twenty cards).
 */
const DEEP_AREAS = ['css.llm-agents', 'math.topology', 'ai.llm', 'econ.game-theory', 'bio.evolution', 'phil.epistemology'];

const DAY = 86400000;
/** The instant the library is "built"; card dates are placed around it. */
export const BUILD_AT = Date.UTC(2026, 8, 19);

function pickWeighted<T>(rand: () => number, table: { p: number }[], items: T[]): T {
  let roll = rand();
  for (let i = 0; i < table.length; i++) {
    roll -= table[i].p;
    if (roll <= 0) return items[i];
  }
  return items[items.length - 1];
}

function clampDifficulty(v: number): Difficulty {
  const n = Math.round(v);
  return (n < 1 ? 1 : n > 5 ? 5 : n) as Difficulty;
}

function slugTags(topic: TopicId, rand: () => number): string[] {
  const leaf = topic.split('.').slice(-1)[0];
  const parts = leaf.split('-').filter((s) => s.length > 2).slice(0, 3);
  const tags = parts.length ? parts.slice() : [leaf];
  const extra = 1 + Math.floor(rand() * 2);
  for (let i = 0; i < extra; i++) {
    const t = GENERIC_TAGS[Math.floor(rand() * GENERIC_TAGS.length)];
    if (tags.indexOf(t) < 0) tags.push(t);
  }
  while (tags.length < 2) tags.push(GENERIC_TAGS[Math.floor(rand() * GENERIC_TAGS.length)] + '-x');
  return tags;
}

function pickAngles(rand: () => number, forced?: Angle): Angle[] {
  const n = 1 + Math.floor(rand() * 3);
  const out: Angle[] = forced ? [forced] : [];
  while (out.length < n) {
    const a = ANGLES[Math.floor(rand() * ANGLES.length)];
    if (out.indexOf(a) < 0) out.push(a);
  }
  return out;
}

function weightFor(format: Format, rand: () => number): Weight {
  if (format === 'quote' || format === 'fact' || format === 'news' || format === 'recall') return 'light';
  if (format === 'story') return rand() < 0.2 ? 'light' : 'medium';
  if (format === 'challenge') return rand() < 0.4 ? 'light' : 'medium';
  if (format === 'series') return rand() < 0.75 ? 'medium' : 'heavy';
  return rand() < 0.38 ? 'medium' : 'heavy';
}

function datesFor(format: Format, rand: () => number): { written: string; event?: string; expires?: string } {
  if (format === 'news') {
    // Spread across the test window so some wire-ish news is always live.
    const t = BUILD_AT + Math.round((rand() * 220 - 20) * DAY);
    const written = new Date(t).toISOString().slice(0, 10);
    return { written, event: written, expires: new Date(t + 45 * DAY).toISOString().slice(0, 10) };
  }
  const t = BUILD_AT - Math.round(rand() * 400 * DAY);
  return { written: new Date(t).toISOString().slice(0, 10) };
}

export interface SynthOptions {
  seed?: number;
  seriesCount?: number;
  callbackCount?: number;
  spanishShare?: number;
}

export function buildSynthIndex(options?: SynthOptions): ContentIndex {
  const opts = options || {};
  const rand = mulberry32(opts.seed === undefined ? 20260919 : opts.seed);
  const seriesCount = opts.seriesCount === undefined ? 40 : opts.seriesCount;
  const callbackCount = opts.callbackCount === undefined ? 80 : opts.callbackCount;
  const spanish = opts.spanishShare === undefined ? 0.12 : opts.spanishShare;

  const nodes = taxonomy.nodes;
  const topics: TaxonomyNode[] = nodes.filter((n) => n.kind === 'topic');
  const byId: Record<string, TaxonomyNode> = {};
  for (const n of nodes) byId[n.id] = n;

  const cards: CardMeta[] = [];
  const perTopic: Record<string, CardMeta[]> = {};

  const make = (
    topic: TopicId,
    slug: string,
    format: Format,
    difficulty: Difficulty,
    overrides?: Partial<CardMeta>,
  ): CardMeta => {
    const node = byId[topic];
    const domain = topic.split('.')[0] as DomainId;
    const weight = weightFor(format, rand);
    const technical = format === 'idea' || format === 'series' || format === 'callback';
    // A heavy card is by definition dense or carries a proof sketch.
    const hasRigor = technical && difficulty >= 2 && (weight === 'heavy' || rand() < 0.6);
    const layer: Layer = hasRigor ? 'both' : 'intuition';
    const language: Language = rand() < spanish ? 'es' : 'en';
    const card: CardMeta = {
      id: topic + '.' + slug,
      topic,
      domain,
      format,
      layer,
      difficulty,
      language,
      weight,
      angles: pickAngles(rand),
      tags: slugTags(topic, rand),
      prerequisites: node ? node.prereqs.slice() : [],
      title: (node ? node.name : topic) + ' — ' + slug,
      hook: 'A one-line curiosity gap about ' + (node ? node.name.toLowerCase() : topic) + '.',
      dates: datesFor(format, rand),
      evergreen: format !== 'news',
      hasRigor,
      hasRecall: format === 'idea' || format === 'series' || format === 'callback',
      hasDiagram: rand() < 0.15,
      words: {
        body: 40 + Math.floor(rand() * 150),
        rigor: hasRigor ? 40 + Math.floor(rand() * 240) : 0,
      },
      author: 'synth-' + domain,
    };
    if (weight === 'heavy' && !hasRigor) card.weight = 'medium';
    if (card.weight === 'heavy' && card.words.rigor === 0) card.words.rigor = 120;
    if (overrides) Object.assign(card, overrides);
    cards.push(card);
    (perTopic[topic] || (perTopic[topic] = [])).push(card);
    return card;
  };

  // ── base cards, 2–6 per topic ────────────────────────────────────────────
  const formats = FORMAT_TABLE.map((f) => f.format);
  const counts = CARDS_PER_TOPIC.map((c) => c.n);
  for (const node of topics) {
    let n = pickWeighted(rand, CARDS_PER_TOPIC, counts);
    for (const deep of DEEP_AREAS) if (node.id.indexOf(deep + '.') === 0) n += 4;
    for (let i = 0; i < n; i++) {
      // The first card of every topic is a deliberate "door": easy, never
      // rigor, and — as the style guide asks of an opening card — written to
      // need no prerequisites at all.
      if (i === 0) {
        make(node.id, 'door', rand() < 0.6 ? 'idea' : 'fact', clampDifficulty(node.level - 1), { prerequisites: [] });
        continue;
      }
      const format = pickWeighted(rand, FORMAT_TABLE, formats);
      const drift = rand() < 0.33 ? -1 : rand() < 0.5 ? 0 : 1;
      make(node.id, 'c' + i, format, clampDifficulty(node.level + drift));
    }
  }

  // A few standalone rigor cards, gated on a sibling intuition card (§7).
  for (const topic of Object.keys(perTopic)) {
    if (rand() > 0.04) continue;
    const siblings = perTopic[topic];
    const intuition = siblings[0];
    make(topic, 'rigor', 'idea', clampDifficulty(intuition.difficulty + 1), {
      layer: 'rigor',
      intuitionCard: intuition.id,
      hasRigor: true,
      hasRecall: true,
    });
  }

  // ── series ───────────────────────────────────────────────────────────────
  const seriesHosts: TaxonomyNode[] = [];
  for (let i = 0; i < seriesCount * 4 && seriesHosts.length < seriesCount; i++) {
    const node = topics[Math.floor(rand() * topics.length)];
    if (seriesHosts.indexOf(node) >= 0) continue;
    seriesHosts.push(node);
  }
  for (const host of seriesHosts) {
    const total = 3 + Math.floor(rand() * 3);
    const sid = host.id + '.arc';
    const title = 'Taming ' + host.name.toLowerCase();
    const episodes: CardMeta[] = [];
    for (let i = 1; i <= total; i++) {
      const card = make(host.id, 'ep' + i, 'series', clampDifficulty(host.level + (i >= 3 ? 1 : 0)), {
        series: { id: sid, index: i, total, title },
        weight: 'medium',
        hasRecall: true,
      });
      episodes.push(card);
    }
    for (let i = 0; i < episodes.length; i++) {
      if (i > 0) episodes[i].seriesPrev = episodes[i - 1].id;
      if (i < episodes.length - 1) episodes[i].seriesNext = episodes[i + 1].id;
    }
  }

  // ── cross-domain callbacks ───────────────────────────────────────────────
  const byDomain: Record<string, TaxonomyNode[]> = {};
  for (const n of topics) (byDomain[n.id.split('.')[0]] || (byDomain[n.id.split('.')[0]] = [])).push(n);
  const domainIds = Object.keys(byDomain);

  const addCallback = (from: TaxonomyNode, to: TaxonomyNode, i: number) => {
    make(to.id, 'cb' + i, 'callback', clampDifficulty(to.level), {
      callback: { from: from.id, to: to.id },
      angles: pickAngles(rand, 'connection'),
      hasRecall: true,
      title: 'Remember ' + from.name + '? Same idea in ' + to.name,
    });
  };

  // A deliberate handful into css.llm-agents, the area the obsession tests use.
  const llmAgents = topics.filter((n) => n.id.indexOf('css.llm-agents') === 0);
  const mathSources = (byDomain['math'] || []).concat(byDomain['econ'] || []);
  let cbIndex = 0;
  for (let i = 0; i < 8 && llmAgents.length && mathSources.length; i++) {
    addCallback(mathSources[Math.floor(rand() * mathSources.length)], llmAgents[i % llmAgents.length], cbIndex++);
  }
  while (cbIndex < callbackCount) {
    const fromDomain = domainIds[Math.floor(rand() * domainIds.length)];
    const toDomain = domainIds[Math.floor(rand() * domainIds.length)];
    if (fromDomain === toDomain) continue;
    const from = byDomain[fromDomain][Math.floor(rand() * byDomain[fromDomain].length)];
    const to = byDomain[toDomain][Math.floor(rand() * byDomain[toDomain].length)];
    addCallback(from, to, cbIndex++);
  }

  return { builtAt: new Date(BUILD_AT).toISOString(), count: cards.length, cards };
}

/** Handy lookups for tests. */
export function cardsIn(index: ContentIndex, prefix: string): CardMeta[] {
  return index.cards.filter((c) => c.topic === prefix || c.topic.indexOf(prefix + '.') === 0);
}

export function firstCard(index: ContentIndex, predicate: (c: CardMeta) => boolean): CardMeta {
  const hit = index.cards.find(predicate);
  if (!hit) throw new Error('fixture: no card matches the predicate');
  return hit;
}
