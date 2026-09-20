/**
 * Taxonomy helpers for the content tooling.
 *
 * Loads content/taxonomy.json (the file the build copies to public/content/taxonomy.json)
 * and answers the questions the validator, the builder and the parser ask about topic ids.
 *
 * Shapes follow `Taxonomy` / `TaxonomyNode` / `TaxonomyDomain` in src/types.ts.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Repo root, resolved from this file (scripts/lib/taxonomy.mjs). */
export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export const TAXONOMY_FILE = path.join(REPO_ROOT, 'content', 'taxonomy.json');
export const CARDS_DIR = path.join(REPO_ROOT, 'content', 'cards');
export const DIAGRAMS_DIR = path.join(REPO_ROOT, 'content', 'diagrams');

/** SCHEMA.md §4 rule 4: domains whose every topic is "technical" (Rigor required). */
export const TECHNICAL_DOMAINS = new Set(['math', 'ai', 'physics']);

/** SCHEMA.md §4 rule 4: individual areas outside those domains that are technical. */
export const TECHNICAL_AREAS = new Set([
  'econ.econometrics',
  'econ.causal',
  'econ.game-theory',
  'econ.finance',
  'css.networks',
  'css.abm',
  'css.opinion-dynamics',
  'bio.genetics',
  'bio.evolution',
  'sports.football-analytics',
  'phil.logic',
]);

/** "math.topology.compactness" -> "math" */
export function domainOf(id) {
  if (typeof id !== 'string' || !id) return null;
  return id.split('.')[0];
}

/** "math.topology.compactness" -> "math.topology"; "math" -> null */
export function areaOf(id) {
  if (typeof id !== 'string' || !id) return null;
  const parts = id.split('.');
  return parts.length >= 2 ? `${parts[0]}.${parts[1]}` : null;
}

/** Technical per SCHEMA §4 rule 4 — works on any topic id (domain, area or topic). */
export function isTechnical(topicId) {
  const d = domainOf(topicId);
  if (d && TECHNICAL_DOMAINS.has(d)) return true;
  const a = areaOf(topicId);
  return Boolean(a && TECHNICAL_AREAS.has(a));
}

/**
 * Load the taxonomy and return the raw data plus lookup helpers.
 * @param {string} [file] path to taxonomy.json (defaults to content/taxonomy.json)
 */
export function loadTaxonomy(file = TAXONOMY_FILE) {
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    throw new Error(`could not read taxonomy at ${file}: ${err.message}`);
  }
  return createTaxonomy(raw);
}

/** Build the helper object from already-parsed taxonomy data. */
export function createTaxonomy(raw) {
  const domains = Array.isArray(raw?.domains) ? raw.domains : [];
  const nodes = Array.isArray(raw?.nodes) ? raw.nodes : [];

  /** @type {Map<string, object>} every node by id (areas and topics) */
  const nodeMap = new Map();
  for (const node of nodes) nodeMap.set(node.id, node);

  /** @type {Map<string, object>} domains by id */
  const domainMap = new Map();
  for (const d of domains) domainMap.set(d.id, d);

  /** children index, for coverage reports */
  const childrenMap = new Map();
  for (const node of nodes) {
    const p = node.parent;
    if (!p) continue;
    if (!childrenMap.has(p)) childrenMap.set(p, []);
    childrenMap.get(p).push(node.id);
  }

  /** Does this id name a domain, area or topic in the taxonomy? */
  function exists(id) {
    return typeof id === 'string' && (nodeMap.has(id) || domainMap.has(id));
  }

  /** The node record (or the domain record for a bare domain id). */
  function node(id) {
    return nodeMap.get(id) || domainMap.get(id) || null;
  }

  /** Declared prereqs of a topic; [] for unknown ids or ids without prereqs. */
  function prereqsOf(id) {
    const n = nodeMap.get(id);
    return Array.isArray(n?.prereqs) ? [...n.prereqs] : [];
  }

  /** Human name, for report lines. */
  function nameOf(id) {
    const n = node(id);
    return n?.name || id;
  }

  function childrenOf(id) {
    return childrenMap.get(id) || [];
  }

  /** All topic ids under a domain/area (kind: 'topic'). */
  function topicsUnder(id) {
    return nodes.filter((n) => n.kind === 'topic' && (n.id === id || n.id.startsWith(`${id}.`))).map((n) => n.id);
  }

  return {
    raw,
    version: raw?.version ?? 0,
    domains,
    nodes,
    nodeMap,
    domainMap,
    domainIds: new Set(domainMap.keys()),
    exists,
    node,
    nameOf,
    prereqsOf,
    childrenOf,
    topicsUnder,
    domainOf,
    areaOf,
    isTechnical,
  };
}

export default { loadTaxonomy, createTaxonomy, domainOf, areaOf, isTechnical, REPO_ROOT, TAXONOMY_FILE, CARDS_DIR, DIAGRAMS_DIR };
