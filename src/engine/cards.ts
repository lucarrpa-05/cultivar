/**
 * Content index helpers: the `cardsOf(id)` / `byId(id)` side of ENGINE.md §2,
 * plus the per-card values the planner would otherwise recompute 40,000 times
 * per plan (area, energy cost, expected read time, series ordering).
 */

import type { CardId, CardMeta, ContentIndex, TopicId } from '../types.ts';
import { PARAMS } from './params.ts';
import type { TaxonomyGraph } from './taxonomy.ts';

export interface CardIndex {
  all: CardMeta[];
  byId(id: CardId): CardMeta | null;
  /** Cards whose primary or secondary topic is exactly `id`. */
  byTopic(id: TopicId): CardMeta[];
  /** Cards whose primary or secondary topic is `id` or anything under it. */
  under(id: TopicId): CardMeta[];
  byDomain(id: string): CardMeta[];
  /** Episodes of a series, ordered by index. */
  series(seriesId: string): CardMeta[];
  callbacks: CardMeta[];
  withQuestion(questionId: string): CardMeta[];
  withContext(tag: string): CardMeta[];
  /** The card's area id (cached). */
  area(id: CardId): TopicId;
  /** light 1 · medium 2 · heavy 3 (cached). */
  cost(id: CardId): number;
  /** ENGINE.md §3: words.body / 3.3 · 1000 (+ rigor when opened). */
  expectedReadMs(card: CardMeta, rigorOpened: boolean): number;
}

export function buildCardIndex(index: ContentIndex, graph: TaxonomyGraph): CardIndex {
  const all = index.cards;
  const byId: Record<string, CardMeta> = {};
  const byTopic: Record<string, CardMeta[]> = {};
  const under: Record<string, CardMeta[]> = {};
  const byDomain: Record<string, CardMeta[]> = {};
  const bySeries: Record<string, CardMeta[]> = {};
  const byQuestion: Record<string, CardMeta[]> = {};
  const byContext: Record<string, CardMeta[]> = {};
  const areaOf: Record<string, string> = {};
  const costOf: Record<string, number> = {};
  const callbacks: CardMeta[] = [];

  for (const c of all) {
    byId[c.id] = c;
    areaOf[c.id] = graph.area(c.topic);
    costOf[c.id] = PARAMS.energyCost[c.weight] || 2;

    const topics: TopicId[] = [c.topic];
    if (c.topics) for (const t of c.topics) if (topics.indexOf(t) < 0) topics.push(t);
    const placed: Record<string, true> = {};
    for (const t of topics) {
      (byTopic[t] || (byTopic[t] = [])).push(c);
      for (const anc of graph.ancestors(t)) {
        if (placed[anc]) continue;
        placed[anc] = true;
        (under[anc] || (under[anc] = [])).push(c);
      }
    }
    (byDomain[c.domain] || (byDomain[c.domain] = [])).push(c);
    if (c.series) (bySeries[c.series.id] || (bySeries[c.series.id] = [])).push(c);
    if (c.format === 'callback' && c.callback) callbacks.push(c);
    if (c.answersQuestion) (byQuestion[c.answersQuestion] || (byQuestion[c.answersQuestion] = [])).push(c);
    if (c.context) (byContext[c.context] || (byContext[c.context] = [])).push(c);
  }
  for (const k of Object.keys(bySeries)) {
    bySeries[k].sort((a, b) => (a.series ? a.series.index : 0) - (b.series ? b.series.index : 0));
  }

  const empty: CardMeta[] = [];
  return {
    all,
    byId: (id) => byId[id] || null,
    byTopic: (id) => byTopic[id] || empty,
    under: (id) => under[id] || empty,
    byDomain: (id) => byDomain[id] || empty,
    series: (id) => bySeries[id] || empty,
    callbacks,
    withQuestion: (id) => byQuestion[id] || empty,
    withContext: (tag) => byContext[tag] || empty,
    area: (id) => areaOf[id] || '',
    cost: (id) => costOf[id] || 2,
    expectedReadMs: (card, rigorOpened) => {
      let ms = (card.words.body / PARAMS.wordsPerSecBody) * 1000;
      if (rigorOpened && card.words.rigor) ms += (card.words.rigor / PARAMS.wordsPerSecRigor) * 1000;
      return ms;
    },
  };
}
