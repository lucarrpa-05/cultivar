/**
 * Taxonomy graph helpers (ENGINE.md §2, §4, §18).
 *
 * Node ids are hierarchical — `math`, `math.topology`, `math.topology.compactness` —
 * so most questions are answered by prefix arithmetic, but we index everything up
 * front because `next()` asks these questions thousands of times per plan.
 *
 * Everything here is plain objects and arrays so the caller can keep it beside a
 * JSON-serialisable state without ever serialising it.
 */

import type { DomainId, Taxonomy, TaxonomyDomain, TaxonomyNode, TopicId } from '../types.ts';

export interface TaxonomyGraph {
  taxonomy: Taxonomy;
  /** Every id we know: domains, areas, topics. */
  ids: TopicId[];
  domainIds: DomainId[];
  areaIds: TopicId[];
  topicIds: TopicId[];
  node(id: TopicId): TaxonomyNode | null;
  domainMeta(id: TopicId): TaxonomyDomain | null;
  has(id: TopicId): boolean;
  kind(id: TopicId): 'domain' | 'area' | 'topic' | 'unknown';
  name(id: TopicId): string;
  level(id: TopicId): number;
  /** Direct parent: topic → area, area → domain, domain → ''. */
  parent(id: TopicId): TopicId;
  /** The area ancestor: '' for a domain, itself for an area, parent for a topic. */
  area(id: TopicId): TopicId;
  /** The domain id (first segment). */
  domain(id: TopicId): DomainId;
  /** [self, area, domain] without blanks, most specific first. */
  ancestors(id: TopicId): TopicId[];
  prereqs(id: TopicId): TopicId[];
  children(id: TopicId): TopicId[];
  descendants(id: TopicId): TopicId[];
  /** Topics under `id` (leaf nodes only), including `id` if it is a topic. */
  topicsUnder(id: TopicId): TopicId[];
  /** Areas that share a prereq with `id` (the §11 widening neighbourhood). */
  adjacentAreas(id: TopicId): TopicId[];
}

function segments(id: TopicId): string[] {
  return id.split('.');
}

export function buildGraph(taxonomy: Taxonomy): TaxonomyGraph {
  const nodeById: Record<string, TaxonomyNode> = {};
  const domainById: Record<string, TaxonomyDomain> = {};
  const childrenById: Record<string, TopicId[]> = {};
  const descendantsById: Record<string, TopicId[]> = {};
  const topicsUnderById: Record<string, TopicId[]> = {};
  const adjacentById: Record<string, TopicId[]> = {};

  const domainIds: DomainId[] = [];
  for (const d of taxonomy.domains) {
    domainById[d.id] = d;
    domainIds.push(d.id);
    childrenById[d.id] = [];
  }

  const areaIds: TopicId[] = [];
  const topicIds: TopicId[] = [];
  for (const n of taxonomy.nodes) {
    nodeById[n.id] = n;
    if (!childrenById[n.id]) childrenById[n.id] = [];
    if (n.kind === 'area') areaIds.push(n.id);
    else topicIds.push(n.id);
  }
  for (const n of taxonomy.nodes) {
    const p = n.parent || segments(n.id).slice(0, -1).join('.');
    if (!childrenById[p]) childrenById[p] = [];
    childrenById[p].push(n.id);
  }

  const ids: TopicId[] = domainIds.slice();
  for (const n of taxonomy.nodes) ids.push(n.id);

  const parentOf = (id: TopicId): TopicId => {
    const n = nodeById[id];
    if (n) return n.parent || segments(id).slice(0, -1).join('.');
    const segs = segments(id);
    return segs.length > 1 ? segs.slice(0, -1).join('.') : '';
  };

  const areaOf = (id: TopicId): TopicId => {
    const n = nodeById[id];
    if (n) return n.kind === 'area' ? id : parentOf(id);
    const segs = segments(id);
    if (segs.length <= 1) return '';
    return segs.slice(0, 2).join('.');
  };

  const domainOf = (id: TopicId): DomainId => segments(id)[0] as DomainId;

  // Descendants (cached, computed bottom-up so it stays linear).
  const computeDescendants = (id: TopicId): TopicId[] => {
    const cached = descendantsById[id];
    if (cached) return cached;
    const out: TopicId[] = [];
    descendantsById[id] = out; // guard against malformed cycles
    for (const c of childrenById[id] || []) {
      out.push(c);
      for (const g of computeDescendants(c)) out.push(g);
    }
    return out;
  };
  for (const id of ids) computeDescendants(id);
  for (const id of ids) {
    const n = nodeById[id];
    const out: TopicId[] = n && n.kind === 'topic' ? [id] : [];
    for (const d of descendantsById[id]) {
      const dn = nodeById[d];
      if (dn && dn.kind === 'topic') out.push(d);
    }
    topicsUnderById[id] = out;
  }

  // Areas sharing a prerequisite (used by §11 widening).
  const areasByPrereq: Record<string, TopicId[]> = {};
  for (const a of areaIds) {
    const seen: Record<string, true> = {};
    for (const t of topicsUnderById[a]) {
      for (const p of nodeById[t].prereqs) {
        if (seen[p]) continue;
        seen[p] = true;
        (areasByPrereq[p] || (areasByPrereq[p] = [])).push(a);
      }
    }
  }
  for (const a of areaIds) {
    const out: Record<string, true> = {};
    for (const t of topicsUnderById[a]) {
      for (const p of nodeById[t].prereqs) {
        for (const other of areasByPrereq[p] || []) if (other !== a) out[other] = true;
      }
      const pArea = areaOf(t);
      if (pArea && pArea !== a) out[pArea] = true;
    }
    adjacentById[a] = Object.keys(out);
  }

  return {
    taxonomy,
    ids,
    domainIds,
    areaIds,
    topicIds,
    node: (id) => nodeById[id] || null,
    domainMeta: (id) => domainById[id] || null,
    has: (id) => !!nodeById[id] || !!domainById[id],
    kind: (id) => {
      if (domainById[id]) return 'domain';
      const n = nodeById[id];
      return n ? n.kind : 'unknown';
    },
    name: (id) => {
      const n = nodeById[id];
      if (n) return n.name;
      const d = domainById[id];
      if (d) return d.name;
      return id;
    },
    level: (id) => {
      const n = nodeById[id];
      return n ? n.level : 2;
    },
    parent: parentOf,
    area: areaOf,
    domain: domainOf,
    ancestors: (id) => {
      const out: TopicId[] = [id];
      const a = areaOf(id);
      if (a && a !== id) out.push(a);
      const d = domainOf(id);
      if (d && d !== id && d !== a) out.push(d);
      return out;
    },
    prereqs: (id) => {
      const n = nodeById[id];
      return n ? n.prereqs : [];
    },
    children: (id) => childrenById[id] || [],
    descendants: (id) => descendantsById[id] || [],
    topicsUnder: (id) => topicsUnderById[id] || [],
    adjacentAreas: (id) => adjacentById[areaOf(id)] || [],
  };
}

/**
 * Most-specific-wins prior lookup: try the id, then its area, then its domain.
 * Returns `fallback` when nothing matches (ENGINE.md §4: default 0 for mastery).
 */
export function priorFor<T>(table: Record<string, T>, id: TopicId, graph: TaxonomyGraph, fallback: T): T {
  const chain = graph.ancestors(id);
  for (const step of chain) {
    const v = table[step];
    if (v !== undefined) return v;
  }
  return fallback;
}
