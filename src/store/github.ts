/**
 * Cultivar — a very small GitHub Contents API client (SYNC.md §"Sync protocol").
 *
 * Only what the phone needs: read a file, write a file, list a directory, read
 * the repo (for the "Test" button). Uses global `fetch`, works in a browser and
 * in Node >= 18. The token is never logged, never put in a URL, and is redacted
 * from every error message this module produces.
 */

import type { SyncConfig } from '../types';

export const API_ROOT = 'https://api.github.com';
export const API_VERSION = '2022-11-28';

/** `fetch(..., { keepalive: true })` bodies must stay small; browsers cap at 64 KB. */
export const KEEPALIVE_MAX_BYTES = 60 * 1024;

export interface GhFile {
  path: string;
  sha: string;
  /** decoded UTF-8 text */
  content: string;
  status: number;
}

export interface GhPutResult {
  sha: string;
  status: number;
  created: boolean;
  /** true when the first PUT hit a sha conflict and the retry succeeded */
  retried: boolean;
}

export interface GhEntry {
  name: string;
  path: string;
  sha: string;
  size: number;
  type: 'file' | 'dir' | 'symlink' | 'submodule' | string;
}

export interface GhRepo {
  fullName: string;
  private: boolean;
  defaultBranch: string;
  canPush: boolean;
}

export class GitHubError extends Error {
  readonly status: number;
  readonly path: string | undefined;
  constructor(status: number, message: string, path?: string) {
    super(message);
    this.name = 'GitHubError';
    this.status = status;
    this.path = path;
  }
}

// ───────────────────────────── base64 (UTF-8 safe) ─────────────────────────────
// Hand-rolled so non-ASCII content never goes near `btoa`, which throws on any
// code unit > 0xFF. Also avoids Buffer, so the same code runs in the browser.

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function bytesToBase64(bytes: Uint8Array): string {
  let out = '';
  const n = bytes.length;
  for (let i = 0; i < n; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < n ? bytes[i + 1] : 0;
    const b2 = i + 2 < n ? bytes[i + 2] : 0;
    out += B64[b0 >> 2];
    out += B64[((b0 & 3) << 4) | (b1 >> 4)];
    out += i + 1 < n ? B64[((b1 & 15) << 2) | (b2 >> 6)] : '=';
    out += i + 2 < n ? B64[b2 & 63] : '=';
  }
  return out;
}

export function base64ToBytes(b64: string): Uint8Array {
  const body = String(b64 ?? '')
    .replace(/[^A-Za-z0-9+/=]/g, '')
    .replace(/=+$/, '');
  const out = new Uint8Array(Math.floor((body.length * 3) / 4));
  let acc = 0;
  let bits = 0;
  let o = 0;
  for (let i = 0; i < body.length; i += 1) {
    const v = B64.indexOf(body[i]);
    if (v < 0) continue;
    acc = (acc << 6) | v;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out[o] = (acc >> bits) & 0xff;
      o += 1;
    }
  }
  return o === out.length ? out : out.subarray(0, o);
}

export function encodeUtf8Base64(text: string): string {
  return bytesToBase64(new TextEncoder().encode(text));
}

export function decodeUtf8Base64(b64: string): string {
  return new TextDecoder().decode(base64ToBytes(b64));
}

export function byteLength(s: string): number {
  return new TextEncoder().encode(s).length;
}

/** Small enough to ride along on an unloading page. */
export function canKeepalive(body: string): boolean {
  return byteLength(body) < KEEPALIVE_MAX_BYTES;
}

// ───────────────────────────── request plumbing ─────────────────────────────

function redact(message: string, token?: string): string {
  if (!token || token.length < 8) return message;
  return message.split(token).join('***');
}

function authHeaders(cfg: SyncConfig, extra?: Record<string, string>): Record<string, string> {
  return {
    Authorization: `Bearer ${cfg.token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': API_VERSION,
    ...(extra ?? {}),
  };
}

function enc(s: string): string {
  return encodeURIComponent(String(s ?? ''));
}

function contentsUrl(cfg: SyncConfig, path: string): string {
  const clean = String(path ?? '').replace(/^\/+/, '');
  const encoded = clean.split('/').filter(Boolean).map(enc).join('/');
  return `${API_ROOT}/repos/${enc(cfg.owner)}/${enc(cfg.repo)}/contents/${encoded}`;
}

function withRef(url: string, cfg: SyncConfig): string {
  return cfg.branch ? `${url}?ref=${enc(cfg.branch)}` : url;
}

interface RawResponse {
  ok: boolean;
  status: number;
  json: unknown;
  text: string;
}

async function request(cfg: SyncConfig, url: string, init: RequestInit): Promise<RawResponse> {
  const f = (globalThis as { fetch?: typeof fetch }).fetch;
  if (typeof f !== 'function') throw new GitHubError(0, 'This browser cannot reach the network (no fetch).');
  let res: Response;
  try {
    res = await f(url, init);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new GitHubError(0, redact(`Network error — is the phone offline? (${msg})`, cfg.token));
  }
  let text = '';
  try {
    text = await res.text();
  } catch {
    text = '';
  }
  let json: unknown;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = undefined;
    }
  }
  return { ok: res.ok, status: res.status, json, text };
}

function apiMessage(res: RawResponse): string {
  const body = res.json as { message?: unknown } | undefined;
  const m = body && typeof body.message === 'string' ? body.message : '';
  return m || res.text.slice(0, 200);
}

function toError(cfg: SyncConfig, res: RawResponse, path?: string): GitHubError {
  const detail = apiMessage(res);
  const where = path ? ` (${path})` : '';
  let msg: string;
  switch (res.status) {
    case 401:
      msg = 'GitHub rejected the token (401). It may have expired — paste a new one.';
      break;
    case 403:
      msg = /rate limit/i.test(detail)
        ? 'GitHub rate limit reached. Sync will retry later.'
        : `The token cannot write to ${cfg.owner}/${cfg.repo} (403). It needs Contents: Read and write.`;
      break;
    case 404:
      msg = `Not found: ${cfg.owner}/${cfg.repo}${where}. Check the repo name and the token's repository access.`;
      break;
    case 409:
      msg = `Conflict on ${cfg.owner}/${cfg.repo}${where} — another device wrote first.`;
      break;
    case 422:
      msg = `GitHub refused the write${where}: ${detail || 'unprocessable'}`;
      break;
    default:
      msg =
        res.status >= 500
          ? `GitHub is having trouble (${res.status}). Sync will retry later.`
          : `GitHub error ${res.status}${where}${detail ? `: ${detail}` : ''}`;
  }
  return new GitHubError(res.status, redact(msg, cfg.token), path);
}

// ───────────────────────────── API ─────────────────────────────

export interface GetOptions {
  /**
   * Survive an unloading page. GETs carry no body, so they never eat into the
   * browser's 64 KB keepalive budget — but a session-end push starts with one.
   */
  keepalive?: boolean;
}

/** GET a file. `null` when it does not exist (404). Throws `GitHubError` otherwise. */
export async function getFile(cfg: SyncConfig, path: string, opts: GetOptions = {}): Promise<GhFile | null> {
  const res = await request(cfg, withRef(contentsUrl(cfg, path), cfg), {
    method: 'GET',
    headers: authHeaders(cfg),
    cache: 'no-store',
    ...(opts.keepalive ? { keepalive: true } : {}),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw toError(cfg, res, path);
  if (Array.isArray(res.json)) throw new GitHubError(res.status, `${path} is a directory, not a file.`, path);

  const body = (res.json ?? {}) as { sha?: unknown; content?: unknown; encoding?: unknown; size?: unknown };
  const sha = typeof body.sha === 'string' ? body.sha : '';
  const size = typeof body.size === 'number' ? body.size : 0;
  const encoded = typeof body.content === 'string' ? body.content : '';
  let content = body.encoding === 'none' ? '' : decodeUtf8Base64(encoded);

  // Files over 1 MB come back with an empty `content`; re-ask for the raw media type.
  if (!content && size > 0) content = await getRaw(cfg, path);
  return { path, sha, content, status: res.status };
}

async function getRaw(cfg: SyncConfig, path: string): Promise<string> {
  const res = await request(cfg, withRef(contentsUrl(cfg, path), cfg), {
    method: 'GET',
    headers: authHeaders(cfg, { Accept: 'application/vnd.github.raw' }),
    cache: 'no-store',
  });
  if (res.status === 404) return '';
  if (!res.ok) throw toError(cfg, res, path);
  return res.text;
}

export interface PutOptions {
  /** Ride along on an unloading page. Ignored when the body is >= 60 KB. */
  keepalive?: boolean;
  /**
   * Called when the first PUT loses a sha race: receives the file as it is *now*
   * and returns the content to write instead. This is what lets `push()` re-union
   * a month file with whatever the other device just wrote, instead of clobbering it.
   */
  remerge?: (current: GhFile | null) => string | Promise<string>;
}

/**
 * PUT a file. Pass `sha` when updating (omit to create). On 409/422 — the two
 * ways GitHub reports a stale or missing sha — re-GET once and retry.
 */
export async function putFile(
  cfg: SyncConfig,
  path: string,
  content: string,
  message: string,
  sha?: string,
  opts: PutOptions = {},
): Promise<GhPutResult> {
  const attempt = async (body: string, useSha: string | undefined): Promise<RawResponse> => {
    const payload: Record<string, unknown> = { message, content: encodeUtf8Base64(body) };
    if (useSha) payload.sha = useSha;
    if (cfg.branch) payload.branch = cfg.branch;
    const serialized = JSON.stringify(payload);
    const init: RequestInit = {
      method: 'PUT',
      headers: authHeaders(cfg, { 'Content-Type': 'application/json' }),
      body: serialized,
    };
    if (opts.keepalive && canKeepalive(serialized)) init.keepalive = true;
    return request(cfg, contentsUrl(cfg, path), init);
  };

  let retried = false;
  let res = await attempt(content, sha);
  if (res.status === 409 || res.status === 422) {
    retried = true;
    let current: GhFile | null = null;
    try {
      current = await getFile(cfg, path);
    } catch {
      current = null;
    }
    const next = opts.remerge ? await opts.remerge(current) : content;
    res = await attempt(next, current?.sha);
  }
  if (!res.ok) throw toError(cfg, res, path);
  const body = (res.json ?? {}) as { content?: { sha?: unknown } };
  const newSha = body.content && typeof body.content.sha === 'string' ? body.content.sha : '';
  return { sha: newSha, status: res.status, created: res.status === 201, retried };
}

/** List a directory. `[]` when it does not exist. */
export async function listDir(cfg: SyncConfig, path: string): Promise<GhEntry[]> {
  const res = await request(cfg, withRef(contentsUrl(cfg, path), cfg), {
    method: 'GET',
    headers: authHeaders(cfg),
    cache: 'no-store',
  });
  if (res.status === 404) return [];
  if (!res.ok) throw toError(cfg, res, path);
  if (!Array.isArray(res.json)) return [];
  return (res.json as Record<string, unknown>[]).map((e) => ({
    name: String(e.name ?? ''),
    path: String(e.path ?? ''),
    sha: String(e.sha ?? ''),
    size: typeof e.size === 'number' ? e.size : 0,
    type: String(e.type ?? 'file'),
  }));
}

/** GET /repos/{owner}/{repo} — the "Test" button. */
export async function getRepo(cfg: SyncConfig): Promise<GhRepo> {
  const res = await request(cfg, `${API_ROOT}/repos/${enc(cfg.owner)}/${enc(cfg.repo)}`, {
    method: 'GET',
    headers: authHeaders(cfg),
    cache: 'no-store',
  });
  if (!res.ok) throw toError(cfg, res);
  const body = (res.json ?? {}) as {
    full_name?: unknown;
    private?: unknown;
    default_branch?: unknown;
    permissions?: { push?: unknown };
  };
  return {
    fullName: typeof body.full_name === 'string' ? body.full_name : `${cfg.owner}/${cfg.repo}`,
    private: body.private === true,
    defaultBranch: typeof body.default_branch === 'string' ? body.default_branch : 'main',
    canPush: body.permissions?.push === true,
  };
}
