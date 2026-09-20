import type { CardMeta, ContentIndex, EngineDeps, Priors, Taxonomy } from '@/types';

export function meta(id: string, over: Partial<CardMeta> = {}): CardMeta {
  const domain = (over.domain ?? id.split('.')[0]) as CardMeta['domain'];
  return {
    id,
    topic: over.topic ?? `${domain}.area.topic`,
    domain,
    format: 'idea',
    layer: 'intuition',
    difficulty: 2,
    language: 'en',
    weight: 'medium',
    angles: ['connection'],
    tags: ['t'],
    prerequisites: [],
    title: `Title ${id}`,
    dates: { written: '2026-09-01' },
    evergreen: true,
    hasRigor: false,
    hasRecall: false,
    hasDiagram: false,
    words: { body: 120, rigor: 0 },
    author: 'test',
    ...over,
  };
}

export const taxonomy: Taxonomy = {
  version: 1,
  domains: [
    { id: 'math', name: 'Mathematics', glyph: '∑', color: '#7c9cff', blurb: 'maths' },
    { id: 'bio', name: 'Biology', glyph: '🧬', color: '#8bd450', blurb: 'life' },
  ],
  nodes: [
    { id: 'math.area', kind: 'area', parent: 'math', name: 'Area', level: 2, prereqs: [] },
    { id: 'math.area.topic', kind: 'topic', parent: 'math.area', name: 'Topic', level: 2, prereqs: [] },
    { id: 'math.area.next', kind: 'topic', parent: 'math.area', name: 'Next', level: 3, prereqs: ['math.area.topic'] },
    { id: 'bio.area', kind: 'area', parent: 'bio', name: 'Cells', level: 1, prereqs: [] },
    { id: 'bio.area.topic', kind: 'topic', parent: 'bio.area', name: 'Cells', level: 1, prereqs: [] },
  ],
};

export const priors: Priors = {
  mastery: {},
  difficulty: {},
  interest: {},
  formats: {} as Priors['formats'],
  angles: {} as Priors['angles'],
  language: { es: 0.12 },
};

export function deps(cards: CardMeta[]): EngineDeps {
  const index: ContentIndex = { builtAt: '2026-09-01T00:00:00Z', count: cards.length, cards };
  return { index, taxonomy, priors };
}
