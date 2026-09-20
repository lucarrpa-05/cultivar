/**
 * A tiny in-memory stand-in for the GitHub Contents API.
 *
 * Deliberately independent of src/store/github.ts: it decodes with Buffer, so a
 * unicode roundtrip through the real encoder is actually verified rather than
 * cancelled out by sharing an implementation.
 */

export interface RecordedCall {
  method: string;
  url: string;
  /** contents path, or '' for the repo endpoint */
  path: string;
  keepalive: boolean;
  accept: string;
  authorization: string;
  apiVersion: string;
  /** PUT body, decoded */
  message?: string;
  sha?: string;
  branch?: string;
  text?: string;
  bodyBytes: number;
  status: number;
}

function shaOf(content: string): string {
  // djb2 — a stable fake sha, not a real git blob hash.
  let h = 5381;
  for (let i = 0; i < content.length; i += 1) h = ((h << 5) + h + content.charCodeAt(i)) >>> 0;
  return `sha${h.toString(16).padStart(8, '0')}${content.length.toString(16)}`;
}

export class FakeGitHub {
  files = new Map<string, string>();
  calls: RecordedCall[] = [];
  repo: Record<string, unknown> = {
    full_name: 'reader/cultivar-data',
    private: true,
    default_branch: 'main',
    permissions: { push: true, pull: true, admin: false },
  };

  /** Fail the *next* request with this status (network-level failures use `offline`). */
  failNext: { status: number; message: string } | null = null;
  offline = false;
  /** Called right before a PUT is applied — the hook a conflict test uses. */
  beforePut: ((path: string, text: string) => void) | null = null;

  write(path: string, content: string): void {
    this.files.set(path, content);
  }

  writeJson(path: string, value: unknown): void {
    this.files.set(path, `${JSON.stringify(value, null, 2)}\n`);
  }

  read(path: string): string | undefined {
    return this.files.get(path);
  }

  readJson<T>(path: string): T {
    return JSON.parse(this.files.get(path) ?? 'null') as T;
  }

  sha(path: string): string {
    return shaOf(this.files.get(path) ?? '');
  }

  callsTo(path: string, method?: string): RecordedCall[] {
    return this.calls.filter((c) => c.path === path && (!method || c.method === method));
  }

  install(): () => void {
    const previous = globalThis.fetch;
    (globalThis as { fetch: typeof fetch }).fetch = this.fetch;
    return () => {
      (globalThis as { fetch: typeof fetch }).fetch = previous;
    };
  }

  fetch = async (input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> => {
    const url = String(input);
    const method = (init.method ?? 'GET').toUpperCase();
    const headers = new Headers((init.headers as HeadersInit | undefined) ?? {});
    const bodyText = typeof init.body === 'string' ? init.body : '';

    const record = (path: string, status: number, extra: Partial<RecordedCall> = {}): void => {
      this.calls.push({
        method,
        url,
        path,
        keepalive: init.keepalive === true,
        accept: headers.get('Accept') ?? '',
        authorization: headers.get('Authorization') ?? '',
        apiVersion: headers.get('X-GitHub-Api-Version') ?? '',
        bodyBytes: bodyText.length,
        status,
        ...extra,
      });
    };

    if (this.offline) throw new TypeError('Failed to fetch');
    if (this.failNext) {
      const { status, message } = this.failNext;
      this.failNext = null;
      record('', status);
      return this.json({ message }, status);
    }

    const [base, query] = url.split('?');
    const contents = base.match(/\/repos\/([^/]+)\/([^/]+)\/contents\/(.*)$/);
    const repoOnly = base.match(/\/repos\/([^/]+)\/([^/]+)$/);

    if (repoOnly) {
      record('', 200);
      return this.json(this.repo, 200);
    }
    if (!contents) {
      record('', 404);
      return this.json({ message: 'Not Found' }, 404);
    }

    const path = decodeURIComponent(contents[3]);
    void query;

    if (method === 'GET') {
      // Directory listing
      const children = [...this.files.keys()].filter((p) => p.startsWith(`${path}/`));
      if (!this.files.has(path) && children.length > 0) {
        record(path, 200);
        return this.json(
          children.map((p) => ({
            name: p.slice(path.length + 1),
            path: p,
            sha: this.sha(p),
            size: Buffer.byteLength(this.files.get(p) ?? '', 'utf8'),
            type: 'file',
          })),
          200,
        );
      }
      const content = this.files.get(path);
      if (content === undefined) {
        record(path, 404);
        return this.json({ message: 'Not Found' }, 404);
      }
      record(path, 200);
      if ((headers.get('Accept') ?? '').includes('raw')) {
        return new Response(content, { status: 200, headers: { 'Content-Type': 'text/plain' } });
      }
      // GitHub wraps base64 at 60 chars — exercise the whitespace stripping.
      const b64 = (Buffer.from(content, 'utf8').toString('base64').match(/.{1,60}/g) ?? []).join('\n');
      return this.json(
        {
          name: path.split('/').pop(),
          path,
          sha: this.sha(path),
          size: Buffer.byteLength(content, 'utf8'),
          type: 'file',
          encoding: 'base64',
          content: `${b64}\n`,
        },
        200,
      );
    }

    if (method === 'PUT') {
      const body = JSON.parse(bodyText) as { message?: string; content?: string; sha?: string; branch?: string };
      const text = Buffer.from(String(body.content ?? ''), 'base64').toString('utf8');
      const common = { message: body.message, sha: body.sha, branch: body.branch, text };
      this.beforePut?.(path, text);

      const exists = this.files.has(path);
      if (exists && !body.sha) {
        record(path, 422, common);
        return this.json({ message: `${path} exists, but no sha was supplied` }, 422);
      }
      if (!exists && body.sha) {
        record(path, 422, common);
        return this.json({ message: `sha given for a file that does not exist: ${path}` }, 422);
      }
      if (exists && body.sha !== this.sha(path)) {
        record(path, 409, common);
        return this.json({ message: `${path} does not match ${body.sha}` }, 409);
      }

      this.files.set(path, text);
      const status = exists ? 200 : 201;
      record(path, status, common);
      return this.json({ content: { path, sha: this.sha(path) }, commit: { message: body.message } }, status);
    }

    record(path, 405);
    return this.json({ message: 'Method not allowed' }, 405);
  };

  private json(body: unknown, status: number): Response {
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  }
}
