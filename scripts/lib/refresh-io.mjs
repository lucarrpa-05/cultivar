/**
 * Shared, dependency-free helpers for the /refresh scripts (agent E).
 * Plain .mjs so the CLI scripts run with bare `node`; typed by refresh-io.d.mts
 * so the TypeScript scripts (run with tsx) can import it too.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Repo root (this file lives in <root>/scripts/lib). */
export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** Absolute path inside the repo (an absolute argument is respected as-is). */
export const at = (...parts) => resolve(ROOT, ...parts);

/** Bogota is UTC-5 all year (no DST). "Today" everywhere in Cultivar means Bogota's today. */
export const TZ_OFFSET_MS = 5 * 60 * 60 * 1000;

export const DAY_MS = 24 * 60 * 60 * 1000;

/** YYYY-MM-DD in Bogota local time. */
export function localDay(t) {
  return new Date(t - TZ_OFFSET_MS).toISOString().slice(0, 10);
}

/** YYYY-MM in Bogota local time. */
export function localMonth(t) {
  return localDay(t).slice(0, 7);
}

/** Epoch ms of 00:00 Bogota on a YYYY-MM-DD day. */
export function dayStart(day) {
  return Date.parse(day + 'T00:00:00Z') + TZ_OFFSET_MS;
}

/** Whole days between two epoch ms values (floored, never negative). */
export function daysBetween(a, b) {
  return Math.max(0, Math.floor((b - a) / DAY_MS));
}

export function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return dir;
}

export function readText(file, fallback = '') {
  try {
    return readFileSync(file, 'utf8');
  } catch {
    return fallback;
  }
}

export function writeText(file, text) {
  ensureDir(dirname(file));
  writeFileSync(file, String(text).replace(/\r\n/g, '\n'), 'utf8');
  return file;
}

export function readJson(file, fallback = null) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

export function writeJson(file, value) {
  return writeText(file, JSON.stringify(value, null, 2) + '\n');
}

/** Every file under `dir` matching `test` (a predicate on the file name), recursively. */
export function walk(dir, test, out) {
  const acc = out || [];
  const ok = test || (() => true);
  let entries = [];
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      walk(full, ok, acc);
    } else if (ok(e.name)) {
      acc.push(full);
    }
  }
  return acc;
}

export function isDir(p) {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Run a command. Returns {ok, code, stdout, stderr} and never throws.
 * npm/npx need a shell on Windows; real .exe files (node, git, gh) do not.
 */
export function run(cmd, args = [], opts = {}) {
  const needsShell = cmd === 'npm' || cmd === 'npx';
  const res = spawnSync(cmd, args, {
    encoding: 'utf8',
    cwd: ROOT,
    shell: needsShell,
    maxBuffer: 32 * 1024 * 1024,
    ...opts,
  });
  return {
    ok: res.status === 0,
    code: res.status === null ? -1 : res.status,
    stdout: (res.stdout || '').trim(),
    stderr: (res.stderr || '').trim(),
    error: res.error ? String(res.error.message || res.error) : '',
  };
}

/** `--name value` (or `--name=value`). Returns `def` when absent. */
export function arg(argv, name, def = undefined) {
  const i = argv.indexOf('--' + name);
  if (i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--')) return argv[i + 1];
  const eq = argv.find((a) => a.startsWith('--' + name + '='));
  if (eq) return eq.slice(name.length + 3);
  return def;
}

/** `--name` present? */
export function flag(argv, name) {
  return argv.includes('--' + name);
}

/* Console helpers - quiet and prefix-light, so the skill transcript stays readable. */
export const say = (...m) => console.log(...m);
export const warn = (...m) => console.warn('[warn]', ...m);
export const die = (msg, code = 1) => {
  console.error('[error]', msg);
  process.exit(code);
};

/** kebab-case slug, for context tags and file names. */
export function slug(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

/** Minimal YAML front-matter reader: scalars, [a, b] inline lists and "- item" lists. */
export function frontMatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text);
  if (!m) return { data: {}, body: text };
  const data = {};
  let key = null;
  for (const raw of m[1].split(/\r?\n/)) {
    if (!raw.trim() || raw.trimStart().startsWith('#')) continue;
    const listItem = /^\s+-\s+(.*)$/.exec(raw);
    if (listItem && key) {
      if (!Array.isArray(data[key])) data[key] = [];
      data[key].push(scalar(listItem[1]));
      continue;
    }
    const kv = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(raw);
    if (!kv) continue;
    key = kv[1];
    const rest = kv[2].trim();
    data[key] = rest === '' ? [] : scalar(rest);
  }
  return { data, body: m[2] };
}

function scalar(v) {
  const s = String(v).trim().replace(/\s+#.*$/, '');
  if (/^\[.*\]$/.test(s)) {
    const inner = s.slice(1, -1).trim();
    return inner ? inner.split(',').map((x) => scalar(x)) : [];
  }
  if (/^\{.*\}$/.test(s)) return s; // objects stay raw; nothing here needs them parsed
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  if (s === 'true') return true;
  if (s === 'false') return false;
  return s.replace(/^["']|["']$/g, '');
}
