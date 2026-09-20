import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { classify, passesFilter, scoreKeywords, toWireItem, wireKind } from '../../scripts/lib/feeds.mjs';
import type { SourceEntry } from '../../scripts/lib/feeds.mjs';

const registry = JSON.parse(
  readFileSync(new URL('../../data/sources.json', import.meta.url), 'utf8'),
) as { sources: SourceEntry[] };

const taxonomy = JSON.parse(
  readFileSync(new URL('../../content/taxonomy.json', import.meta.url), 'utf8'),
) as { nodes: Array<{ id: string }>; domains: Array<{ id: string }> };

const validTopics = new Set([
  ...taxonomy.nodes.map((n) => n.id),
  ...taxonomy.domains.map((d) => d.id),
]);

const source = (id: string) => {
  const found = registry.sources.find((s) => s.id === id);
  if (!found) throw new Error(`fixture source ${id} is gone from data/sources.json`);
  return found;
};

describe('classify', () => {
  it('moves a physics story off a multi-domain source', () => {
    const item = {
      title: 'Where does the quantum world end and ours begin?',
      summary: 'Entanglement experiments push superposition to ever larger objects.',
      categories: ['Physics'],
    };
    const out = classify(item, source('quanta'), { validTopics });
    expect(out.domain).toBe('physics');
    expect(out.topicHint).toBe('physics.quantum');
  });

  it('moves a biology story off Nature into bio', () => {
    const item = {
      title: 'CRISPR screens map gene regulation in the developing brain',
      summary: 'A genome-wide screen of neurons and their gene expression.',
      categories: [],
    };
    const out = classify(item, source('nature-news'), { validTopics });
    expect(out.domain).toBe('bio');
    expect(out.topicHint?.startsWith('bio.')).toBe(true);
  });

  it('keeps an AI story on Hacker News in ai and sharpens the topic', () => {
    const item = {
      title: 'Mechanistic interpretability of a 7B model with sparse autoencoders',
      summary: 'A new interpretability result on a large language model.',
      categories: ['story'],
    };
    const out = classify(item, source('hn-ai'), { validTopics });
    expect(out.domain).toBe('ai');
    expect(out.topicHint).toBe('ai.interpretability');
  });

  it('filters BBC Mundo down to science/economy/history and routes them', () => {
    const science = {
      title: 'Qué dice el nuevo estudio sobre el genoma humano',
      summary: 'Una investigación sobre genes y evolución.',
      link: 'https://www.bbc.com/mundo/articles/ciencia-123',
      categories: [],
    };
    const football = {
      title: 'El último partido de la liga',
      summary: 'Crónica deportiva.',
      link: 'https://www.bbc.com/mundo/articles/otro-456',
      categories: [],
    };
    expect(passesFilter(science, source('bbc-mundo'))).toBe(true);
    expect(passesFilter(football, source('bbc-mundo'))).toBe(false);
    expect(classify(science, source('bbc-mundo'), { validTopics }).domain).toBe('bio');
  });

  it('will not move a single-domain source off its domain', () => {
    const item = {
      title: 'Inflation, elections and the central bank',
      summary: 'A macroeconomic story that mentions voters and the economy.',
      categories: [],
    };
    const out = classify(item, source('arxiv-cs-lg'), { validTopics });
    expect(out.domain).toBe('ai');
  });

  it('falls back to the source defaults when nothing matches', () => {
    const item = { title: 'Untitled note', summary: 'Nothing in particular.', categories: [] };
    const out = classify(item, source('futility-closet'), { validTopics });
    expect(out.domain).toBe('niche');
    expect(out.topicHint).toBe('niche.weird.strange-but-true');
  });

  it('only ever emits topic ids that exist in the taxonomy', () => {
    const probes = [
      'Prime numbers and the Riemann hypothesis',
      'A new agent-based model of polarization on social networks',
      'Expected goals and pressing in the Premier League',
      'Consciousness, free will and the philosophy of mind',
      'Archaeologists excavate a Bronze Age settlement',
      'The central bank raises rates as inflation falls',
      'Dark matter, galaxies and the cosmic web',
      'CRISPR, genome editing and the immune system',
      'A large language model trained with reinforcement learning',
      'Cartography, map projections and border disputes',
    ];
    for (const s of registry.sources) {
      for (const title of probes) {
        const out = classify({ title, summary: title, categories: [] }, s, { validTopics });
        expect(validTopics.has(out.domain)).toBe(true);
        expect(out.topicHint == null || validTopics.has(out.topicHint)).toBe(true);
        expect(out.topicHint === out.domain || out.topicHint?.startsWith(`${out.domain}.`)).toBe(true);
      }
    }
  });

  it('scores keywords transparently', () => {
    const votes = scoreKeywords({
      title: 'Double descent and benign overfitting in deep networks',
      summary: 'Generalization theory.',
      categories: [],
    });
    expect(votes[0].domain).toBe('ai');
    expect(votes[0].topic).toBe('ai.theory');
  });
});

describe('wireKind', () => {
  it('maps every registry itemKind onto the WireItem union', () => {
    const allowed = new Set(['paper', 'news', 'blog', 'onthisday', 'wiki', 'video']);
    for (const s of registry.sources) expect(allowed.has(wireKind(s.itemKind))).toBe(true);
  });

  it('folds "article" into "news" (article is not in WireItem["kind"])', () => {
    expect(wireKind('article')).toBe('news');
    expect(wireKind(undefined)).toBe('news');
    expect(wireKind('paper')).toBe('paper');
  });
});

describe('toWireItem', () => {
  const src = source('quanta');
  const fetched = '2026-09-19T09:17:00.000Z';

  it('produces a complete WireItem', () => {
    const item = toWireItem(
      {
        title: 'A proof about prime numbers',
        link: 'https://www.quantamagazine.org/a-proof-20260917/?utm_source=rss',
        summary: 'Mathematicians proved a conjecture about the distribution of primes.',
        published: 'Thu, 17 Sep 2026 14:30:00 +0000',
        categories: ['Mathematics'],
      },
      src,
      { fetched, validTopics },
    );
    expect(item).not.toBeNull();
    expect(item).toMatchObject({
      source: 'quanta',
      sourceName: 'Quanta Magazine',
      kind: 'news',
      url: 'https://quantamagazine.org/a-proof-20260917',
      published: '2026-09-17T14:30:00.000Z',
      fetched,
      domain: 'math',
      lang: 'en',
      status: 'fresh',
    });
    expect(item!.id).toMatch(/^[0-9a-f]{12}$/);
    expect(item!.summary.length).toBeLessThanOrEqual(500);
  });

  it('falls back to the fetch time when the feed has no date', () => {
    const item = toWireItem(
      { title: 'Undated', link: 'https://example.org/undated', summary: '', published: null },
      src,
      { fetched, validTopics },
    );
    expect(item!.published).toBe(fetched);
  });

  it('refuses items without a usable url or title', () => {
    expect(toWireItem({ title: 'No link', link: '', summary: '' }, src, { fetched })).toBeNull();
    expect(toWireItem({ title: '', link: 'https://example.org/x', summary: '' }, src, { fetched })).toBeNull();
    expect(toWireItem({ title: 'Bad scheme', link: 'ftp://example.org/x' }, src, { fetched })).toBeNull();
  });

  it('strips the arXiv boilerplate out of RSS abstracts', () => {
    const item = toWireItem(
      {
        title: 'Some paper',
        link: 'https://arxiv.org/abs/2609.01234v1',
        summary: 'arXiv:2609.01234v1 Announce Type: new Abstract: The real abstract starts here.',
        published: '2026-09-18T00:00:00Z',
      },
      source('arxiv-cs-lg'),
      { fetched, validTopics },
    );
    expect(item!.summary).toBe('The real abstract starts here.');
    expect(item!.url).toBe('https://arxiv.org/abs/2609.01234');
    expect(item!.kind).toBe('paper');
  });
});
