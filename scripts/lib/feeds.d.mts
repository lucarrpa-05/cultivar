/**
 * Types for `scripts/lib/feeds.mjs` (the implementation is plain ESM JavaScript
 * so that GitHub Actions can run it with bare `node`, no build step).
 *
 * `WireItem` itself lives in `src/types.ts` — the authoritative contract.
 */

import type { DomainId, Language, TopicId, WireItem } from '../../src/types';

/** One entry in `data/sources.json`. */
export interface SourceEntry {
  id: string;
  name: string;
  kind: 'rss' | 'atom' | 'arxiv-api' | 'wiki-onthisday' | 'wiki-featured' | 'hn-algolia' | 'json';
  url: string;
  domain: DomainId;
  topicHint?: TopicId;
  lang: Language;
  itemKind: 'paper' | 'news' | 'blog' | 'onthisday' | 'wiki' | 'video' | 'article';
  maxItems: number;
  weight: number;
  enabled: boolean;
  note?: string;
  verified?: string;
  /** opt a source into cross-domain keyword classification */
  multiDomain?: boolean;
  /** hn-algolia only */
  minPoints?: number;
}

/** A parsed feed item, before it becomes a `WireItem`. */
export interface RawItem {
  title: string;
  link: string;
  summary: string;
  published: string | null;
  categories: string[];
  author: string;
  /** wiki-onthisday only */
  year?: number;
  /** hn-algolia only */
  points?: number;
}

export interface ParseOptions {
  now?: number;
  /** YYYY-MM-DD; defaults to today in Bogotá */
  date?: string;
  /** wiki-onthisday: keep events strictly before this year (default 2000) */
  maxYear?: number;
  /** wiki-featured: how many most-read articles to add (default 2) */
  mostRead?: number;
  /** hn-algolia: minimum score (default 100) */
  minPoints?: number;
}

export interface ClassifyOptions {
  /** every id in content/taxonomy.json; unknown hints are walked up to a valid ancestor */
  validTopics?: Set<string>;
}

export interface ClassifyResult {
  domain: DomainId;
  topicHint: TopicId;
  /** the keywords that decided it */
  why: string[];
}

export interface KeywordVote {
  domain: DomainId;
  score: number;
  topic: TopicId | null;
  topicScore: number;
  terms: string[];
}

export interface KeywordRule {
  domain: DomainId;
  topic: TopicId;
  weight: number;
  terms: string[];
}

export interface RetentionStats {
  expired: number;
  archivedExpired: number;
  capped: number;
}

export interface RetentionOptions {
  now?: number;
  freshDays?: number;
  archiveDays?: number;
  maxFresh?: number;
  weightOf?: (item: WireItem) => number;
}

export const SUMMARY_MAX: 500;
export const USER_AGENT: string;
export const RETENTION: { freshDays: number; archiveDays: number; maxFresh: number };
export const KEYWORD_RULES: KeywordRule[];
export const MULTI_DOMAIN_SOURCES: Set<string>;
export const SOURCE_FILTERS: Record<string, (raw: Partial<RawItem>, source: SourceEntry) => boolean>;

// ids and text
export function sha1(input: unknown): string;
export function idFor(url: string): string;
export function canonicalUrl(raw: unknown): string;
export function decodeEntities(input: unknown): string;
export function stripHtml(input: unknown): string;
export function truncate(input: unknown, max?: number): string;
export function cleanSummary(input: unknown, max?: number): string;
export function normalizeTitle(input: unknown): string;
export function foldText(input: unknown): string;

// dates
export function toIso(value: unknown): string | null;
export function bogotaDate(now?: number | Date): { yyyy: string; mm: string; dd: string; date: string };
export function expandDateTemplate(url: string, now?: number): string;

// parsing
export function parseXml(xml: string): Record<string, unknown>;
export function parseRss(xml: string | Record<string, unknown>): RawItem[];
export function parseAtom(xml: string | Record<string, unknown>): RawItem[];
export function parseArxivApi(xml: string | Record<string, unknown>): RawItem[];
export function parseWikiOnThisDay(json: string | object, opts?: ParseOptions): RawItem[];
export function parseWikiFeatured(json: string | object, opts?: ParseOptions): RawItem[];
export function parseHnAlgolia(json: string | object, opts?: ParseOptions): RawItem[];
export function parseByKind(kind: string, body: string, opts?: ParseOptions): RawItem[];
export function looksLikeFeed(body: string, kind?: string): boolean;

// classification
export function scoreKeywords(item: Partial<RawItem>): KeywordVote[];
export function classify(
  item: Partial<RawItem>,
  source: SourceEntry,
  opts?: ClassifyOptions,
): ClassifyResult;
export function wireKind(itemKind: unknown): WireItem['kind'];
export function passesFilter(raw: Partial<RawItem>, source: SourceEntry): boolean;
export function toWireItem(
  raw: Partial<RawItem>,
  source: SourceEntry,
  opts?: ClassifyOptions & { fetched?: string },
): WireItem | null;

// queue
export function dedupe(
  items: WireItem[],
  opts?: { weightOf?: (item: WireItem) => number },
): WireItem[];
export function applyRetention(
  items: WireItem[],
  opts?: RetentionOptions,
): { items: WireItem[]; stats: RetentionStats };
export function mergeQueue(
  existing: WireItem[],
  incoming: WireItem[],
): { items: WireItem[]; added: number; known: number };
