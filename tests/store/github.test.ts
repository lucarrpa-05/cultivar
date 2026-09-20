import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  API_VERSION,
  GitHubError,
  KEEPALIVE_MAX_BYTES,
  bytesToBase64,
  canKeepalive,
  decodeUtf8Base64,
  encodeUtf8Base64,
  getFile,
  getRepo,
  listDir,
  putFile,
} from '../../src/store/github';
import type { SyncConfig } from '../../src/types';
import { FakeGitHub } from './fake-github';

const cfg: SyncConfig = { owner: 'reader', repo: 'cultivar-data', token: 'ghp_SECRET_TOKEN_VALUE_1234' };

let gh: FakeGitHub;
let uninstall: () => void;

beforeEach(() => {
  gh = new FakeGitHub();
  uninstall = gh.install();
});
afterEach(() => uninstall());

describe('base64', () => {
  it('roundtrips non-ASCII text that would break btoa', () => {
    const text = '¿por qué? — ∀x∈ℝ, 日本語, emoji 🌱, quote “curly”';
    const encoded = encodeUtf8Base64(text);
    expect(encoded).toBe(Buffer.from(text, 'utf8').toString('base64'));
    expect(decodeUtf8Base64(encoded)).toBe(text);
    expect(() => btoa(text)).toThrow();
  });

  it('handles padding at every length and tolerates wrapped base64', () => {
    for (const s of ['', 'a', 'ab', 'abc', 'abcd', 'ñ', 'ñe', '∀']) {
      expect(decodeUtf8Base64(encodeUtf8Base64(s))).toBe(s);
    }
    const wrapped = `${encodeUtf8Base64('x'.repeat(200))}`.match(/.{1,60}/g)!.join('\n');
    expect(decodeUtf8Base64(wrapped)).toBe('x'.repeat(200));
    expect(bytesToBase64(new Uint8Array([0, 255, 16]))).toBe(Buffer.from([0, 255, 16]).toString('base64'));
  });

  it('knows what fits in a keepalive request', () => {
    expect(canKeepalive('small')).toBe(true);
    expect(canKeepalive('x'.repeat(KEEPALIVE_MAX_BYTES))).toBe(false);
  });
});

describe('getFile', () => {
  it('returns null on 404 and decodes on 200', async () => {
    expect(await getFile(cfg, 'events/2026-09.json')).toBeNull();

    gh.write('events/2026-09.json', '{"hola":"qué tal"}');
    const file = await getFile(cfg, 'events/2026-09.json');
    expect(file?.content).toBe('{"hola":"qué tal"}');
    expect(file?.sha).toBe(gh.sha('events/2026-09.json'));
    expect(file?.status).toBe(200);
  });

  it('sends the SYNC.md headers and no token in the URL', async () => {
    gh.write('meta.json', '{}');
    await getFile(cfg, 'meta.json');
    const call = gh.callsTo('meta.json', 'GET')[0];
    expect(call.authorization).toBe(`Bearer ${cfg.token}`);
    expect(call.accept).toBe('application/vnd.github+json');
    expect(call.apiVersion).toBe(API_VERSION);
    expect(call.url).toBe('https://api.github.com/repos/reader/cultivar-data/contents/meta.json');
  });

  it('appends ?ref when a branch is configured', async () => {
    gh.write('meta.json', '{}');
    await getFile({ ...cfg, branch: 'main' }, 'meta.json');
    expect(gh.calls[0].url).toContain('?ref=main');
  });
});

describe('putFile', () => {
  it('creates a missing file (201) without a sha', async () => {
    const res = await putFile(cfg, 'events/2026-09.json', '[]\n', 'sync: events 2026-09 (+0)');
    expect(res.created).toBe(true);
    expect(res.status).toBe(201);
    expect(res.retried).toBe(false);
    expect(gh.read('events/2026-09.json')).toBe('[]\n');
    expect(gh.callsTo('events/2026-09.json', 'PUT')[0].message).toBe('sync: events 2026-09 (+0)');
  });

  it('updates with a sha (200)', async () => {
    gh.write('meta.json', 'old');
    const res = await putFile(cfg, 'meta.json', 'new', 'sync: meta', gh.sha('meta.json'));
    expect(res.status).toBe(200);
    expect(gh.read('meta.json')).toBe('new');
  });

  it('retries once after a 409 sha race, re-merging through remerge', async () => {
    gh.write('notes.json', 'A');
    const staleSha = gh.sha('notes.json');
    gh.beforePut = (path) => {
      if (path === 'notes.json' && gh.read('notes.json') === 'A') gh.write('notes.json', 'A+B'); // other device
    };

    const res = await putFile(cfg, 'notes.json', 'A+C', 'sync: notes', staleSha, {
      remerge: (current) => `${current?.content ?? ''}+C`,
    });

    expect(res.retried).toBe(true);
    expect(res.status).toBe(200);
    expect(gh.read('notes.json')).toBe('A+B+C');
    const puts = gh.callsTo('notes.json', 'PUT');
    expect(puts.map((c) => c.status)).toEqual([409, 200]);
    expect(gh.callsTo('notes.json', 'GET')).toHaveLength(1);
  });

  it('retries once after a 422 (sha missing for an existing file)', async () => {
    gh.write('meta.json', 'old');
    gh.beforePut = null;
    const res = await putFile(cfg, 'meta.json', 'fresh', 'sync: meta');
    expect(res.retried).toBe(true);
    expect(gh.read('meta.json')).toBe('fresh');
    expect(gh.callsTo('meta.json', 'PUT').map((c) => c.status)).toEqual([422, 200]);
  });

  it('gives up after one retry and reports a readable error without the token', async () => {
    gh.write('meta.json', 'old');
    gh.beforePut = () => gh.write('meta.json', `${Math.random()}`); // conflicts forever
    await expect(putFile(cfg, 'meta.json', 'x', 'sync: meta', 'stale-sha')).rejects.toThrow(GitHubError);
    await expect(putFile(cfg, 'meta.json', 'x', 'sync: meta', 'stale-sha')).rejects.toThrow(/Conflict|refused/);
    for (const call of gh.calls) expect(JSON.stringify(call.text ?? '')).not.toContain(cfg.token);
  });

  it('sets keepalive only for small bodies', async () => {
    await putFile(cfg, 'small.json', '{"a":1}', 'sync: small', undefined, { keepalive: true });
    expect(gh.callsTo('small.json', 'PUT')[0].keepalive).toBe(true);

    await putFile(cfg, 'big.json', 'x'.repeat(KEEPALIVE_MAX_BYTES), 'sync: big', undefined, { keepalive: true });
    expect(gh.callsTo('big.json', 'PUT')[0].keepalive).toBe(false);

    await putFile(cfg, 'plain.json', '{}', 'sync: plain');
    expect(gh.callsTo('plain.json', 'PUT')[0].keepalive).toBe(false);
  });
});

describe('errors', () => {
  it('translates 401 into token language and redacts the token', async () => {
    gh.failNext = { status: 401, message: `Bad credentials for ${cfg.token}` };
    const err = await getFile(cfg, 'meta.json').catch((e: unknown) => e as GitHubError);
    expect(err).toBeInstanceOf(GitHubError);
    expect((err as GitHubError).status).toBe(401);
    expect((err as GitHubError).message).toMatch(/expired/);
    expect((err as GitHubError).message).not.toContain(cfg.token);
  });

  it('explains a 403 without push permission', async () => {
    gh.failNext = { status: 403, message: 'Resource not accessible by personal access token' };
    await expect(getFile(cfg, 'meta.json')).rejects.toThrow(/Contents: Read and write/);
  });

  it('reports offline as a network error rather than crashing', async () => {
    gh.offline = true;
    const err = await getFile(cfg, 'meta.json').catch((e: unknown) => e as GitHubError);
    expect((err as GitHubError).status).toBe(0);
    expect((err as GitHubError).message).toMatch(/offline/);
  });
});

describe('repo and directory', () => {
  it('reads repo permissions for the Test button', async () => {
    const repo = await getRepo(cfg);
    expect(repo.fullName).toBe('reader/cultivar-data');
    expect(repo.canPush).toBe(true);
    expect(repo.private).toBe(true);

    gh.repo = { ...gh.repo, permissions: { push: false } };
    expect((await getRepo(cfg)).canPush).toBe(false);
  });

  it('lists a directory and returns [] when it does not exist', async () => {
    expect(await listDir(cfg, 'events')).toEqual([]);
    gh.write('events/2026-08.json', '[]');
    gh.write('events/2026-09.json', '[]');
    const entries = await listDir(cfg, 'events');
    expect(entries.map((e) => e.name).sort()).toEqual(['2026-08.json', '2026-09.json']);
    expect(entries[0].type).toBe('file');
  });
});
