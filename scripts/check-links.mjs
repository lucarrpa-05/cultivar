#!/usr/bin/env node
/**
 * Check that every `sources[].url` in the corpus resolves (SCHEMA §4.7).
 *
 *   node scripts/check-links.mjs                       # every card
 *   node scripts/check-links.mjs content/cards/math    # one shard
 *   node scripts/check-links.mjs --json --all
 *
 * HEAD first, GET as a fallback, browser-like User-Agent, 15 s timeout,
 * 6 requests in flight, one retry. Results are cached in .link-cache.json
 * for 30 days ({ url: { status, checkedAt } }), so re-runs are cheap.
 *
 * 2xx/3xx            ok
 * 403/429 from a host that is known to block bots (DOI, Elsevier, JSTOR…)  warning
 * 5xx, timeouts      warning (transient — the URL is probably fine)
 * 404/410, DNS       error
 * other 4xx          error
 *
 * Exit code 1 if there is at least one error.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

import { loadTaxonomy, REPO_ROOT, CARDS_DIR } from './lib/taxonomy.mjs';
import { parseCardFile } from './lib/parse-card.mjs';
import { walkMarkdown, resolveTargets } from './validate-content.mjs';

const CACHE_FILE = path.join(REPO_ROOT, '.link-cache.json');
const CACHE_DAYS = 30;
const TIMEOUT_MS = 15_000;
const CONCURRENCY = 6;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';

/** Publishers that answer bots with 403/429 even though the page is fine. */
export const BOT_BLOCKING_HOSTS = [
  'doi.org',
  'sciencedirect.com',
  'jstor.org',
  'springer.com',
  'link.springer.com',
  'wiley.com',
  'onlinelibrary.wiley.com',
  'nature.com',
  'science.org',
  'tandfonline.com',
  'academic.oup.com',
  'journals.uchicago.edu',
];

export function isBotBlocking(url) {
  let host;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return false;
  }
  return BOT_BLOCKING_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
}

// ───────────────────────────── cache ─────────────────────────────

export function loadCache(file = CACHE_FILE) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

export function saveCache(cache, file = CACHE_FILE) {
  const sorted = Object.fromEntries(Object.keys(cache).sort().map((k) => [k, cache[k]]));
  try {
    fs.writeFileSync(file, `${JSON.stringify(sorted, null, 2)}\n`, 'utf8');
  } catch {
    /* a read-only checkout is not a reason to fail the run */
  }
}

function fresh(entry, now) {
  if (!entry || !entry.checkedAt) return false;
  const age = now - Date.parse(entry.checkedAt);
  return Number.isFinite(age) && age >= 0 && age < CACHE_DAYS * 24 * 60 * 60 * 1000;
}

// ───────────────────────────── probing ─────────────────────────────

async function probe(url, method) {
  const res = await fetch(url, {
    method,
    redirect: 'follow',
    headers: {
      'user-agent': USER_AGENT,
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'en,es;q=0.8',
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  // Drain the body so the socket is released.
  if (res.body && typeof res.body.cancel === 'function') {
    try { await res.body.cancel(); } catch { /* ignore */ }
  }
  return res.status;
}

function networkCode(err) {
  const msg = `${err?.cause?.code || ''} ${err?.name || ''} ${err?.message || ''}`;
  if (/ENOTFOUND|EAI_AGAIN|ERR_NAME_NOT_RESOLVED/i.test(msg)) return 'DNS';
  if (/TimeoutError|ETIMEDOUT|aborted|AbortError/i.test(msg)) return 'TIMEOUT';
  if (/ECONNREFUSED|ECONNRESET|EHOSTUNREACH|ENETUNREACH|EPIPE|CERT|SSL|socket/i.test(msg)) return 'NETWORK';
  return 'NETWORK';
}

/** Status for one URL: a number, or 'DNS' | 'TIMEOUT' | 'NETWORK'. */
export async function checkUrl(url, { attempts = 2 } = {}) {
  let last = 'NETWORK';
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const head = await probe(url, 'HEAD');
      if (head >= 200 && head < 400) return head;
      if (head === 404 || head === 410) {
        // Some servers 404 on HEAD but serve GET; confirm before failing a card.
        try {
          return await probe(url, 'GET');
        } catch (err) {
          last = networkCode(err);
          continue;
        }
      }
      try {
        return await probe(url, 'GET');
      } catch {
        return head;
      }
    } catch (err) {
      last = networkCode(err);
      if (last === 'DNS') {
        try {
          return await probe(url, 'GET');
        } catch (err2) {
          last = networkCode(err2);
        }
      }
    }
  }
  return last;
}

export function classify(url, status) {
  if (typeof status === 'number') {
    if (status >= 200 && status < 400) return 'ok';
    if (status === 404 || status === 410) return 'error';
    if (status === 403 || status === 429) return isBotBlocking(url) ? 'warn' : 'error';
    if (status >= 500) return 'warn';
    return 'error';
  }
  if (status === 'DNS') return 'error';
  return 'warn'; // TIMEOUT / NETWORK — transient
}

// ───────────────────────────── collection ─────────────────────────────

/** url -> card ids that cite it */
export function collectUrls(files, { taxonomy, root = REPO_ROOT } = {}) {
  const urls = new Map();
  for (const file of files) {
    const { card } = parseCardFile(file, { taxonomy, root });
    if (!card || !Array.isArray(card.sources)) continue;
    for (const source of card.sources) {
      const url = source?.url;
      if (typeof url !== 'string' || !url) continue;
      if (!urls.has(url)) urls.set(url, new Set());
      urls.get(url).add(card.id || path.basename(file));
    }
  }
  return urls;
}

async function runPool(items, worker, size = CONCURRENCY) {
  const queue = [...items];
  const workers = Array.from({ length: Math.min(size, queue.length) }, async () => {
    for (;;) {
      const item = queue.shift();
      if (item === undefined) return;
      await worker(item);
    }
  });
  await Promise.all(workers);
}

export async function checkLinks(options = {}) {
  const root = options.root || REPO_ROOT;
  const taxonomy = options.taxonomy || loadTaxonomy();
  const files = options.paths && options.paths.length
    ? resolveTargets(options.paths, { root }).files
    : walkMarkdown(options.cardsDir || CARDS_DIR);

  const urls = collectUrls(files, { taxonomy, root });
  const cache = options.noCache ? {} : loadCache(options.cacheFile);
  const now = Date.now();
  const results = [];

  await runPool([...urls.keys()].sort(), async (url) => {
    const cards = [...urls.get(url)].sort();
    const cached = cache[url];
    if (fresh(cached, now) && !options.noCache) {
      results.push({ url, status: cached.status, verdict: classify(url, cached.status), cards, cached: true });
      return;
    }
    const status = await checkUrl(url);
    cache[url] = { status, checkedAt: new Date().toISOString() };
    results.push({ url, status, verdict: classify(url, status), cards, cached: false });
  }, options.concurrency || CONCURRENCY);

  if (!options.noCache) saveCache(cache, options.cacheFile);

  results.sort((a, b) => a.url.localeCompare(b.url));
  const errors = results.filter((r) => r.verdict === 'error');
  const warnings = results.filter((r) => r.verdict === 'warn');
  return {
    files: files.length,
    urls: results.length,
    results,
    errors,
    warnings,
    fromCache: results.filter((r) => r.cached).length,
    ok: errors.length === 0,
  };
}

// ───────────────────────────── CLI ─────────────────────────────

function parseArgs(argv) {
  const opts = { paths: [] };
  for (const arg of argv) {
    if (arg === '--json') opts.json = true;
    else if (arg === '--all' || arg === '-a') opts.all = true;
    else if (arg === '--no-cache' || arg === '--refresh') opts.noCache = true;
    else if (arg === '--quiet' || arg === '-q') opts.quiet = true;
    else if (arg === '--help' || arg === '-h') opts.help = true;
    else if (arg.startsWith('-')) opts.unknown = (opts.unknown || []).concat(arg);
    else opts.paths.push(arg);
  }
  return opts;
}

function line(r) {
  return `${r.status} ${r.url} (in: ${r.cards.join(', ')})${r.cached ? ' [cached]' : ''}`;
}

async function main(argv) {
  const opts = parseArgs(argv);
  if (opts.help) {
    console.log('usage: node scripts/check-links.mjs [paths…] [--json] [--all] [--no-cache] [--quiet]');
    return 0;
  }
  if (opts.unknown) {
    console.error(`unknown flag(s): ${opts.unknown.join(', ')}`);
    return 2;
  }

  const result = await checkLinks(opts);

  if (opts.json) {
    process.stdout.write(`${JSON.stringify({
      ok: result.ok,
      files: result.files,
      urls: result.urls,
      fromCache: result.fromCache,
      errors: result.errors.length,
      warnings: result.warnings.length,
      results: result.results,
    }, null, 2)}\n`);
    return result.ok ? 0 : 1;
  }

  for (const r of result.results) {
    if (r.verdict === 'error') console.error(line(r));
    else if (r.verdict === 'warn' && !opts.quiet) console.warn(`${line(r)} — warning${isBotBlocking(r.url) ? ' (host blocks bots; open it once by hand)' : ''}`);
    else if (opts.all && !opts.quiet) console.log(line(r));
  }

  if (!opts.quiet) {
    console.log(`\nchecked ${result.urls} url${result.urls === 1 ? '' : 's'} in ${result.files} card file${result.files === 1 ? '' : 's'} · ${result.fromCache} from cache · ${result.warnings.length} warning${result.warnings.length === 1 ? '' : 's'} · ${result.errors.length} error${result.errors.length === 1 ? '' : 's'}`);
    if (result.errors.length) console.log('a dead link is a dead card: fix the url or replace the source.');
  }
  return result.ok ? 0 : 1;
}

const invokedDirectly = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;
if (invokedDirectly) main(process.argv.slice(2)).then((code) => process.exit(code));

export default { checkLinks, checkUrl, classify, collectUrls };
