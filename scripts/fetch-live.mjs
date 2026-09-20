#!/usr/bin/env node
/**
 * Cultivar — live source fetcher.
 *
 * Reads data/sources.json, fetches every enabled source, normalizes the items
 * into `WireItem`s (src/types.ts) and writes:
 *
 *   data/inbox/queue.json      { updatedAt, items: WireItem[] }
 *   data/inbox/report.json     per-source { fetched, kept, ms, error }
 *   data/inbox/health.json     consecutive failures per source (>= 3 → flagged)
 *   data/inbox/onthisday.json  today's on-this-day items (Bogotá, UTC−5)
 *
 * Usage:
 *   node scripts/fetch-live.mjs [--source <id>] [--dry-run] [--verbose]
 *
 * Exit code is 0 even when individual sources fail; 1 only when the queue
 * could not be written. Run daily by .github/workflows/fetch-live.yml.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  RETENTION,
  USER_AGENT,
  applyRetention,
  bogotaDate,
  dedupe,
  expandDateTemplate,
  looksLikeFeed,
  mergeQueue,
  parseByKind,
  passesFilter,
  toWireItem,
} from './lib/feeds.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCES_FILE = path.join(ROOT, 'data', 'sources.json');
const TAXONOMY_FILE = path.join(ROOT, 'content', 'taxonomy.json');
const INBOX_DIR = path.join(ROOT, 'data', 'inbox');
const QUEUE_FILE = path.join(INBOX_DIR, 'queue.json');
const REPORT_FILE = path.join(INBOX_DIR, 'report.json');
const HEALTH_FILE = path.join(INBOX_DIR, 'health.json');
const ONTHISDAY_FILE = path.join(INBOX_DIR, 'onthisday.json');

const TIMEOUT_MS = 15_000;
const HOST_CONCURRENCY = 6;
const HOST_DELAY_MS = { default: 800, 'export.arxiv.org': 3000, 'api.wikimedia.org': 1000 };
const FAIL_FLAG_AT = 3;

// ───────────────────────────── cli ─────────────────────────────

function parseArgs(argv) {
  const opts = { source: null, dryRun: false, verbose: false, help: false, timeout: TIMEOUT_MS };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--source' || arg === '-s') opts.source = argv[++i];
    else if (arg.startsWith('--source=')) opts.source = arg.slice('--source='.length);
    else if (arg === '--dry-run' || arg === '-n') opts.dryRun = true;
    else if (arg === '--verbose' || arg === '-v') opts.verbose = true;
    else if (arg === '--help' || arg === '-h') opts.help = true;
    else if (arg.startsWith('--timeout=')) opts.timeout = Number(arg.slice('--timeout='.length)) || TIMEOUT_MS;
    else if (arg.startsWith('--')) console.warn(`! unknown flag ${arg}`);
  }
  return opts;
}

const HELP = `cultivar fetch-live

  node scripts/fetch-live.mjs [options]

  --source <id>   fetch a single source from data/sources.json
  --dry-run       fetch and report, write nothing
  --verbose       per-source and per-item logging
  --timeout=<ms>  per-request timeout (default ${TIMEOUT_MS})
  --help          this text
`;

// ───────────────────────────── io helpers ─────────────────────────────

async function readJson(file, fallback) {
  try {
    if (!existsSync(file)) return fallback;
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (err) {
    console.warn(`! could not read ${path.relative(ROOT, file)}: ${err.message}`);
    return fallback;
  }
}

async function writeJson(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

/**
 * Politeness gate: at most one in-flight request per host, with a minimum
 * interval between them (arXiv asks for 3 s). Applies to fallback requests too.
 */
const hostChains = new Map();
function withHostGate(url, task) {
  const host = hostOf(url);
  const delay = HOST_DELAY_MS[host] ?? HOST_DELAY_MS.default;
  const prev = hostChains.get(host) ?? Promise.resolve(0);
  const next = prev.then(async (lastAt) => {
    const wait = lastAt ? lastAt + delay - Date.now() : 0;
    if (wait > 0) await sleep(wait);
    try {
      return await task();
    } finally {
      hostChains.set(host, Promise.resolve(Date.now()));
    }
  });
  // the chain carries the completion time, never a rejection
  hostChains.set(host, next.then(() => Date.now(), () => Date.now()));
  return next;
}

/** fetch with a hard timeout, one retry on network/5xx/429, host-gated. */
function fetchText(url, opts = {}) {
  return withHostGate(url, () => rawFetchText(url, opts));
}

async function rawFetchText(url, { timeout = TIMEOUT_MS, attempt = 0 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        Accept:
          'application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.9, application/json;q=0.9, text/html;q=0.6, */*;q=0.5',
        'Accept-Language': 'en,es;q=0.8',
        'Cache-Control': 'no-cache',
      },
    });
    if (!res.ok) {
      const retryable = res.status === 429 || res.status >= 500;
      if (retryable && attempt < 2) {
        await sleep(res.status === 429 ? 6000 : 2000);
        return rawFetchText(url, { timeout, attempt: attempt + 1 });
      }
      throw new Error(`HTTP ${res.status} ${res.statusText || ''}`.trim());
    }
    const body = await res.text();
    if (!body.trim()) throw new Error('empty body');
    return { body, url: res.url, status: res.status };
  } catch (err) {
    if (attempt < 1 && !/HTTP \d/.test(err.message)) {
      await sleep(1500);
      return rawFetchText(url, { timeout, attempt: attempt + 1 });
    }
    if (err.name === 'AbortError' || err.name === 'TimeoutError') throw new Error(`timeout after ${timeout}ms`);
    throw new Error(err.cause?.code ? `${err.message} (${err.cause.code})` : err.message);
  } finally {
    clearTimeout(timer);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Short description of an unexpected response body, for the error message. */
function describeBody(body) {
  const head = String(body ?? '').trim().slice(0, 120).replace(/\s+/g, ' ');
  if (/^<!doctype html/i.test(head) || /^<html/i.test(head)) return 'an HTML page';
  if (head.startsWith('{') || head.startsWith('[')) return 'JSON';
  return `"${head.slice(0, 60)}…"`;
}

function hostOf(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return 'unknown';
  }
}

// ───────────────────────────── per source ─────────────────────────────

/**
 * arXiv's category RSS is empty on weekends (`skipDays`). The API query for the
 * same category always answers, so an empty category feed falls back to it.
 */
function arxivFallback(source) {
  if (source.kind !== 'rss' || !/rss\.arxiv\.org/i.test(source.url)) return null;
  const cat = source.url.replace(/^.*\/rss\//, '').split('?')[0];
  if (!cat) return null;
  const max = Math.max(source.maxItems ?? 10, 10);
  return {
    kind: 'arxiv-api',
    url:
      'https://export.arxiv.org/api/query?search_query=' +
      `cat:${encodeURIComponent(cat)}` +
      `&sortBy=submittedDate&sortOrder=descending&max_results=${max}`,
  };
}

async function runSource(source, ctx) {
  const started = Date.now();
  const entry = {
    id: source.id,
    name: source.name,
    kind: source.kind,
    url: source.url,
    fetched: 0,
    kept: 0,
    ms: 0,
    error: null,
  };
  try {
    const url = expandDateTemplate(source.url, ctx.now);
    const { body } = await fetchText(url, { timeout: ctx.timeout });
    let parseKind = source.kind;
    let raw = parseByKind(parseKind, body, {
      now: ctx.now,
      date: ctx.today,
      minPoints: source.minPoints ?? 100,
      mostRead: 2,
    });
    if (!raw.length) {
      if (!looksLikeFeed(body, source.kind)) {
        throw new Error(`not a ${source.kind} feed (got ${describeBody(body)})`);
      }
      const fallback = arxivFallback(source);
      if (fallback) {
        const alt = await fetchText(fallback.url, { timeout: ctx.timeout });
        parseKind = fallback.kind;
        raw = parseByKind(parseKind, alt.body, { now: ctx.now, date: ctx.today });
        if (raw.length) entry.note = 'arXiv RSS empty (weekend) — used the API query';
      }
      if (!raw.length) {
        entry.note = entry.note ?? 'feed is valid but has no items right now';
        entry.ms = Date.now() - started;
        return { entry, items: [], ok: true };
      }
    }
    entry.fetched = raw.length;

    const withDates = raw.map((it) => ({ ...it, _t: Date.parse(it.published ?? '') || 0 }));
    // newest first, then cap
    withDates.sort((a, b) => b._t - a._t);

    const items = [];
    const seen = new Set();
    for (const it of withDates) {
      if (items.length >= (source.maxItems ?? 10)) break;
      if (!passesFilter(it, source)) continue;
      const wire = toWireItem(it, source, { fetched: ctx.fetchedAt, validTopics: ctx.validTopics });
      if (!wire) continue;
      if (seen.has(wire.id)) continue;
      seen.add(wire.id);
      items.push(wire);
      if (ctx.verbose) {
        console.log(`    · [${wire.domain}/${wire.topicHint ?? '-'}] ${wire.title.slice(0, 92)}`);
      }
    }
    entry.kept = items.length;
    entry.ms = Date.now() - started;
    return { entry, items, ok: true };
  } catch (err) {
    entry.error = err.message || String(err);
    entry.ms = Date.now() - started;
    return { entry, items: [], ok: false };
  }
}

/** Run sources grouped by host: hosts in parallel, sequential inside a host. */
async function runAll(sources, ctx) {
  const groups = new Map();
  for (const source of sources) {
    const host = hostOf(source.url);
    if (!groups.has(host)) groups.set(host, []);
    groups.get(host).push(source);
  }
  const hosts = [...groups.entries()];
  const results = [];
  let cursor = 0;

  const worker = async () => {
    while (cursor < hosts.length) {
      const index = cursor++;
      const [, list] = hosts[index];
      for (let i = 0; i < list.length; i += 1) {
        const source = list[i];
        const res = await runSource(source, ctx);
        results.push(res);
        const mark = res.ok ? 'ok ' : 'ERR';
        const detail = res.ok
          ? `${String(res.entry.kept).padStart(3)} kept / ${String(res.entry.fetched).padStart(3)} fetched`
          : res.entry.error;
        console.log(`  ${mark} ${source.id.padEnd(28)} ${String(res.entry.ms).padStart(6)}ms  ${detail}`);
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(HOST_CONCURRENCY, hosts.length) }, worker));
  return results;
}

// ───────────────────────────── main ─────────────────────────────

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(HELP);
    return 0;
  }

  const startedAt = Date.now();
  const fetchedAt = new Date(startedAt).toISOString();
  const today = bogotaDate(startedAt).date;

  const registry = await readJson(SOURCES_FILE, null);
  if (!registry?.sources?.length) {
    console.error('! data/sources.json missing or empty');
    return 1;
  }
  const taxonomy = await readJson(TAXONOMY_FILE, { nodes: [], domains: [] });
  const validTopics = new Set([
    ...(taxonomy.nodes ?? []).map((n) => n.id),
    ...(taxonomy.domains ?? []).map((d) => d.id),
  ]);

  let sources = registry.sources.filter((s) => s.enabled !== false);
  if (opts.source) {
    const wanted = registry.sources.find((s) => s.id === opts.source);
    if (!wanted) {
      console.error(`! no source with id "${opts.source}"`);
      return 1;
    }
    sources = [wanted];
  }

  const weights = new Map(registry.sources.map((s) => [s.id, Number(s.weight) || 3]));
  const weightOf = (item) => weights.get(item.source) ?? 3;

  console.log(`cultivar fetch-live · ${sources.length} source(s) · ${today} (Bogotá)`);

  const ctx = {
    now: startedAt,
    today,
    fetchedAt,
    timeout: opts.timeout,
    verbose: opts.verbose,
    validTopics,
  };

  const results = await runAll(sources, ctx);

  // ── collect ──
  const fetchedItems = results.flatMap((r) => r.items);
  const unique = dedupe(fetchedItems, { weightOf });

  // Several feeds carry an archive of old posts. Drop anything that retention
  // would delete on the way out, so the queue does not churn on every run.
  const maxAgeMs = RETENTION.freshDays * 24 * 60 * 60 * 1000;
  const recent = unique.filter((i) => startedAt - (Date.parse(i.published) || startedAt) <= maxAgeMs);

  const existingQueue = await readJson(QUEUE_FILE, { updatedAt: null, items: [] });
  const existingItems = Array.isArray(existingQueue.items) ? existingQueue.items : [];

  const merged = mergeQueue(existingItems, recent);
  const { items: retained, stats } = applyRetention(merged.items, { now: startedAt, weightOf });

  const freshItems = retained.filter((i) => i.status === 'fresh');
  const byDomain = tally(freshItems, (i) => i.domain);
  const byKind = tally(freshItems, (i) => i.kind);
  const byLang = tally(freshItems, (i) => i.lang);

  // ── on this day ──
  const onThisDaySources = new Set(
    registry.sources.filter((s) => s.kind === 'wiki-onthisday').map((s) => s.id),
  );
  const onThisDayItems = fetchedItems.filter((i) => onThisDaySources.has(i.source));

  // ── health ──
  const previousHealth = await readJson(HEALTH_FILE, { updatedAt: null, sources: {} });
  const health = { updatedAt: fetchedAt, flagged: [], sources: { ...(previousHealth.sources ?? {}) } };
  for (const { entry, ok } of results) {
    const prev = health.sources[entry.id] ?? { consecutiveFailures: 0 };
    const next = {
      consecutiveFailures: ok ? 0 : (prev.consecutiveFailures ?? 0) + 1,
      lastOk: ok ? fetchedAt : prev.lastOk ?? null,
      lastKept: ok ? entry.kept : prev.lastKept ?? 0,
      lastError: ok ? null : entry.error,
      lastErrorAt: ok ? prev.lastErrorAt ?? null : fetchedAt,
    };
    next.flagged = next.consecutiveFailures >= FAIL_FLAG_AT;
    health.sources[entry.id] = next;
  }
  // keep registry order and drop sources that no longer exist
  const known = new Set(registry.sources.map((s) => s.id));
  for (const id of Object.keys(health.sources)) if (!known.has(id)) delete health.sources[id];
  health.flagged = Object.entries(health.sources)
    .filter(([, v]) => v.flagged)
    .map(([id]) => id);

  // ── report ──
  const failed = results.filter((r) => !r.ok);
  const report = {
    generatedAt: fetchedAt,
    date: today,
    durationMs: Date.now() - startedAt,
    sourcesRun: results.length,
    sourcesOk: results.length - failed.length,
    sourcesFailed: failed.length,
    totals: {
      fetched: results.reduce((n, r) => n + r.entry.fetched, 0),
      kept: results.reduce((n, r) => n + r.entry.kept, 0),
      uniqueAfterDedupe: unique.length,
      tooOldToQueue: unique.length - recent.length,
      newToQueue: merged.added,
      alreadyKnown: merged.known,
      queueTotal: retained.length,
      queueFresh: freshItems.length,
      expired: stats.expired,
      archiveExpired: stats.archivedExpired,
      cappedOff: stats.capped,
    },
    byDomain,
    byKind,
    byLang,
    flagged: health.flagged,
    sources: results
      .map((r) => r.entry)
      .sort((a, b) => a.id.localeCompare(b.id)),
  };

  // ── write ──
  if (opts.dryRun) {
    console.log('\n-- dry run, nothing written --');
  } else {
    try {
      await mkdir(INBOX_DIR, { recursive: true });
      await writeJson(QUEUE_FILE, { updatedAt: fetchedAt, items: retained });
    } catch (err) {
      console.error(`! could not write queue.json: ${err.message}`);
      return 1;
    }
    try {
      await writeJson(REPORT_FILE, report);
      await writeJson(HEALTH_FILE, health);
      if (!opts.source || onThisDayItems.length) {
        const existingOtd = await readJson(ONTHISDAY_FILE, { date: null, items: [] });
        const keep = onThisDayItems.length || existingOtd.date !== today
          ? onThisDayItems
          : existingOtd.items;
        await writeJson(ONTHISDAY_FILE, { date: today, updatedAt: fetchedAt, items: keep });
      }
    } catch (err) {
      console.warn(`! could not write a side file: ${err.message}`);
    }
  }

  // ── summary ──
  console.log('');
  console.log(`fetched ${report.totals.fetched} · kept ${report.totals.kept} · unique ${unique.length} · new ${merged.added}`);
  console.log(`queue: ${retained.length} items (${freshItems.length} fresh) · expired ${stats.expired} · capped ${stats.capped}`);
  console.log(`domains: ${Object.entries(byDomain).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
  console.log(`langs: ${Object.entries(byLang).map(([k, v]) => `${k} ${v}`).join(' · ')} · on-this-day today: ${onThisDayItems.length}`);
  if (failed.length) {
    console.log(`\n${failed.length} source(s) failed:`);
    for (const f of failed) console.log(`  - ${f.entry.id}: ${f.entry.error}`);
  }
  if (health.flagged.length) console.log(`flagged (>=${FAIL_FLAG_AT} consecutive failures): ${health.flagged.join(', ')}`);
  return 0;
}

function tally(items, keyFn) {
  const out = {};
  for (const item of items) {
    const key = keyFn(item) ?? 'unknown';
    out[key] = (out[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(out).sort((a, b) => b[1] - a[1]));
}

main()
  .then((code) => {
    process.exitCode = code ?? 0;
  })
  .catch((err) => {
    console.error('! fatal:', err?.stack || err);
    process.exitCode = 1;
  });
