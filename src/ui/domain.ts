/** Taxonomy lookups for the UI: names, glyphs, accent colours. */
import type { JSX } from 'preact';
import type { TaxonomyDomain, TaxonomyNode, TopicId } from '@/types';
import { app } from '@/app/state';

export function domainOf(topicOrCard: string): string {
  return topicOrCard.split('.')[0] ?? '';
}

export function domainInfo(id: string): TaxonomyDomain | undefined {
  return app.taxonomy?.domains.find((d) => d.id === id);
}

export function nodeInfo(id: TopicId): TaxonomyNode | undefined {
  return app.taxonomy?.nodes.find((n) => n.id === id);
}

export function topicName(id: TopicId): string {
  return nodeInfo(id)?.name ?? domainInfo(id)?.name ?? id.split('.').pop()?.replace(/-/g, ' ') ?? id;
}

export function accentFor(domain: string): string {
  return domainInfo(domain)?.color ?? 'var(--accent)';
}

export function accentStyle(domain: string): JSX.CSSProperties {
  return { '--accent-domain': accentFor(domain) } as JSX.CSSProperties;
}
