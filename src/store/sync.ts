/**
 * Cultivar — feedback sync (SYNC.md §"Sync protocol").
 *
 * Pushes the event log to a private data repo so the laptop refresh session can
 * read it; pulls other devices' events back. The conflict model is a union of
 * event logs by id — no event is ever edited, so two devices can only collide at
 * the file level, which the sha retry handles.
 *
 * Files written (see .data/docs/SYNC-IMPLEMENTATION.md):
 *   events/YYYY-MM.json   union-merged event shards, one event per line
 *   profile.json          { state, exportedAt, deviceId, app }
 *   questions.json        ReaderQuestion[] derived from state
 *   meta.json             { lastPush, device, eventCount, months }
 *
 * Nothing here throws at the UI: every failure lands in `status().error`.
 */

import type { EngineState, Event, Store, Sync, SyncConfig, SyncStatus } from '../types';
import { GitHubError, getFile, getRepo, listDir, putFile, type GhFile } from './github';
import { isMonthKey, monthKey } from './ids';
import { deriveQuestions } from './questions';

export const APP_VERSION = '0.1.0';
/** `pull()` is a no-op inside this window unless forced (SYNC.md). */
export const PULL_INTERVAL_MS = 60 * 60 * 1000;
export const EVENTS_DIR = 'events';
export const PROFILE_FILE = 'profile.json';
export const QUESTIONS_FILE = 'questions.json';
export const META_FILE = 'meta.json';
/** How many trailing months `pull()` re-reads (current + previous). */
export const PULL_MONTHS = 2;

export interface SyncMeta {
  lastPush: number;
  device: string;
  eventCount: number;
  months: string[];
}

export interface SyncOptions {
  store: Store;
  /** Current engine state, read fresh at push time. */
  getState: () => EngineState;
  /** Called with events that arrived from another device — replay the engine. */
  onMerged: (events: Event[]) => void;
  now?: () => number;
  /** Written to `profile.json` as `app`. */
  app?: string;
}

export interface PushOptions {
  /** Session-end push: small files ride along on the unloading page. */
  keepalive?: boolean;
}

/** `Sync` plus the extras Settings needs. Additive — `Sync` is unchanged. */
export interface CultivarSync extends Sync {
  push(opts?: PushOptions): Promise<SyncStatus>;
  pull(force?: boolean): Promise<{ merged: number }>;
  /** "Restore from repo": read every month file and import it. */
  restore(): Promise<{ events: number; error?: string }>;
  /** Recount pending events from the store (call at app open). */
  refresh(): Promise<SyncStatus>;
  /** Cheap counter bump after `store.appendEvent` — avoids a store round trip. */
  notePending(n?: number): void;
  /** Call after `store.importBackup()` so imported history gets pushed. */
  markAllPending(): Promise<void>;
  isConfigured(): boolean;
  /** owner/repo/branch for the Settings line. Never the token. */
  configured(): { owner: string; repo: string; branch?: string } | null;
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

function byTThenId(a: Event, b: Event): number {
  return a.t - b.t || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}

function normalizeConfig(raw: unknown): SyncConfig | null {
  if (!isObj(raw)) return null;
  const owner = typeof raw.owner === 'string' ? raw.owner.trim() : '';
  const repo = typeof raw.repo === 'string' ? raw.repo.trim() : '';
  const token = typeof raw.token === 'string' ? raw.token.trim() : '';
  if (!owner || !repo || !token) return null;
  const branch = typeof raw.branch === 'string' && raw.branch.trim() ? raw.branch.trim() : undefined;
  return branch ? { owner, repo, token, branch } : { owner, repo, token };
}

/** Events out of a repo file. Accepts `Event[]` or `{ events: Event[] }`. */
export function parseEvents(text: string | undefined, path: string): Event[] {
  if (!text || !text.trim()) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    // Never overwrite a file we cannot read — that would delete history.
    throw new GitHubError(0, `${path} in the data repo is not valid JSON. Fix it in the repo, then sync again.`, path);
  }
  const list = Array.isArray(parsed) ? parsed : isObj(parsed) && Array.isArray(parsed.events) ? parsed.events : [];
  const out: Event[] = [];
  for (const e of list) {
    if (!isObj(e)) continue;
    if (typeof e.id !== 'string' || !e.id) continue;
    if (typeof e.t !== 'number' || !Number.isFinite(e.t)) continue;
    if (typeof e.type !== 'string' || !e.type) continue;
    out.push(e as unknown as Event);
  }
  return out;
}

/** One event per line inside a JSON array: valid JSON, readable git diffs. */
export function formatEventsJson(events: Event[]): string {
  if (events.length === 0) return '[]\n';
  return `[\n${events.map((e) => JSON.stringify(e)).join(',\n')}\n]\n`;
}

function unionById(remote: Event[], local: Event[]): Event[] {
  const byId = new Map<string, Event>();
  for (const e of remote) byId.set(e.id, e);
  for (const e of local) if (!byId.has(e.id)) byId.set(e.id, e); // remote wins ties: never rewrite history
  return [...byId.values()].sort(byTThenId);
}

function uniqueMonths(events: Event[]): string[] {
  return [...new Set(events.map((e) => monthKey(e.t)))].sort();
}

export function createSync(opts: SyncOptions): CultivarSync {
  const { store, getState, onMerged } = opts;
  const now = opts.now ?? (() => Date.now());
  const app = opts.app ?? APP_VERSION;

  let cfg: SyncConfig | null = null;
  let loaded = false;
  let loading: Promise<void> | null = null;
  let queue: Promise<unknown> = Promise.resolve();

  let lastPush: number | undefined;
  let lastPull: number | undefined;
  /** Highest `t` known to be in the repo. Pending = local events after it. */
  let pushedThroughT = 0;
  let pendingEvents = 0;
  let deviceId = '';
  let error: string | undefined;

  function describe(err: unknown): string {
    const msg = err instanceof GitHubError ? err.message : err instanceof Error ? err.message || err.name : String(err);
    const token = cfg?.token;
    return token && token.length >= 8 ? msg.split(token).join('***') : msg;
  }

  function status(): SyncStatus {
    const out: SyncStatus = { pendingEvents };
    if (typeof lastPush === 'number') out.lastPush = lastPush;
    if (typeof lastPull === 'number') out.lastPull = lastPull;
    if (error) out.error = error;
    return out;
  }

  async function countPending(): Promise<number> {
    const since = pushedThroughT > 0 ? pushedThroughT : undefined;
    return (await store.listEvents(since)).length;
  }

  async function ensureLoaded(): Promise<void> {
    if (loaded) return;
    if (!loading) {
      loading = (async () => {
        try {
          cfg = normalizeConfig(await store.getLocal('syncConfig'));
          const push = await store.getLocal<number>('lastPush');
          const pull = await store.getLocal<number>('lastPull');
          const through = await store.getLocal<number>('pushedThroughT');
          lastPush = typeof push === 'number' ? push : undefined;
          lastPull = typeof pull === 'number' ? pull : undefined;
          pushedThroughT = typeof through === 'number' ? through : 0;
          deviceId = (await store.getLocal<string>('deviceId')) ?? '';
          pendingEvents = await countPending();
        } catch (err) {
          error = describe(err);
        }
        loaded = true;
      })();
    }
    await loading;
  }

  /** One network conversation at a time — a session-end push must not race a pull. */
  function serialize<T>(fn: () => Promise<T>): Promise<T> {
    const run = queue.then(fn, fn);
    queue = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  /**
   * PUT unless the repo already says this. `same` lets a caller ignore fields
   * that change on every push (profile.json's `exportedAt`) so an unchanged
   * state does not cost a 400 KB commit.
   */
  async function writeIfChanged(
    config: SyncConfig,
    path: string,
    content: string,
    message: string,
    keepalive: boolean,
    same?: (currentContent: string) => boolean,
  ): Promise<boolean> {
    const current = await getFile(config, path, { keepalive });
    if (current && (current.content === content || (same ? same(current.content) : false))) return false;
    await putFile(config, path, content, message, current?.sha, { keepalive });
    return true;
  }

  /** Union-merge one month shard. Returns false when the repo already had it all. */
  async function pushMonth(config: SyncConfig, month: string, local: Event[], keepalive: boolean): Promise<boolean> {
    const path = `${EVENTS_DIR}/${month}.json`;
    const current = await getFile(config, path, { keepalive });
    const remote = parseEvents(current?.content, path);
    const merged = unionById(remote, local);
    const added = merged.length - remote.length;
    const body = formatEventsJson(merged);
    if (current && current.content === body) return false;
    await putFile(config, path, body, `sync: events ${month} (+${added})`, current?.sha, {
      keepalive,
      // Lost the sha race: re-union against whatever the other device just wrote.
      remerge: (fresh: GhFile | null) => formatEventsJson(unionById(parseEvents(fresh?.content, path), local)),
    });
    return true;
  }

  function profileJson(state: EngineState, at: number): string {
    return `${JSON.stringify({ state, exportedAt: new Date(at).toISOString(), deviceId, app }, null, 2)}\n`;
  }

  function metaJson(meta: SyncMeta): string {
    return `${JSON.stringify(meta, null, 2)}\n`;
  }

  async function mergeRemoteEvents(config: SyncConfig, paths: string[]): Promise<Event[]> {
    const known = new Set((await store.listEvents()).map((e) => e.id));
    const fresh: Event[] = [];
    for (const path of paths) {
      const file = await getFile(config, path);
      if (!file) continue;
      for (const ev of parseEvents(file.content, path)) {
        if (known.has(ev.id)) continue;
        known.add(ev.id);
        fresh.push(ev);
      }
    }
    if (fresh.length === 0) return fresh;
    fresh.sort(byTThenId);
    for (const ev of fresh) await store.appendEvent(ev);
    return fresh;
  }

  const sync: CultivarSync = {
    async configure(next: SyncConfig | null): Promise<void> {
      await ensureLoaded();
      const previous = cfg;
      cfg = normalizeConfig(next);
      error = undefined;
      try {
        await store.setLocal('syncConfig', cfg);
        // Pointed at a different repo: that repo has none of this history yet.
        if (cfg && previous && (previous.owner !== cfg.owner || previous.repo !== cfg.repo)) {
          pushedThroughT = 0;
          await store.setLocal('pushedThroughT', 0);
          pendingEvents = await countPending();
        }
      } catch (err) {
        error = describe(err);
      }
    },

    isConfigured(): boolean {
      return cfg !== null;
    },

    configured() {
      if (!cfg) return null;
      return cfg.branch ? { owner: cfg.owner, repo: cfg.repo, branch: cfg.branch } : { owner: cfg.owner, repo: cfg.repo };
    },

    status,

    notePending(n = 1): void {
      pendingEvents = Math.max(0, pendingEvents + n);
    },

    async refresh(): Promise<SyncStatus> {
      await ensureLoaded();
      try {
        pendingEvents = await countPending();
      } catch (err) {
        error = describe(err);
      }
      return status();
    },

    async markAllPending(): Promise<void> {
      await ensureLoaded();
      pushedThroughT = 0;
      try {
        await store.setLocal('pushedThroughT', 0);
        pendingEvents = await countPending();
      } catch (err) {
        error = describe(err);
      }
    },

    async test(): Promise<{ ok: boolean; message: string }> {
      await ensureLoaded();
      if (!cfg) return { ok: false, message: 'Not configured yet — add the owner, repo and token.' };
      try {
        const repo = await getRepo(cfg);
        if (!repo.canPush) {
          error = `The token cannot write to ${repo.fullName}.`;
          return { ok: false, message: `Connected to ${repo.fullName}, but the token cannot write to it (needs Contents: Read and write).` };
        }
        error = undefined;
        return { ok: true, message: `Connected to ${repo.fullName}` };
      } catch (err) {
        const message = describe(err);
        error = message;
        return { ok: false, message };
      }
    },

    async push(pushOpts: PushOptions = {}): Promise<SyncStatus> {
      await ensureLoaded();
      if (!cfg) {
        error = 'Sync is not configured.';
        return status();
      }
      const config = cfg;
      const keepalive = pushOpts.keepalive === true;

      return serialize(async () => {
        const at = now();
        try {
          if (!deviceId) deviceId = (await store.getLocal<string>('deviceId')) ?? '';
          const all = await store.listEvents();
          const watermark = pushedThroughT;
          const pending = all.filter((e) => e.t > watermark);

          // 1–2. Month shards first: those are the durable part.
          let highest = watermark;
          let wrote = 0;
          for (const month of uniqueMonths(pending)) {
            const local = all.filter((e) => monthKey(e.t) === month);
            if (await pushMonth(config, month, local, keepalive)) wrote += 1;
            for (const e of local) if (e.t > highest) highest = e.t;
          }

          if (highest > watermark) {
            pushedThroughT = highest;
            await store.setLocal('pushedThroughT', pushedThroughT);
          }
          lastPush = at;
          await store.setLocal('lastPush', at);
          pendingEvents = all.filter((e) => e.t > pushedThroughT).length;
          error = undefined;

          // 3–5. Derived files. A failure here does not un-push the events.
          let state: EngineState | null = null;
          try {
            state = getState();
          } catch (err) {
            error = describe(err);
          }
          if (state) {
            const stateJson = JSON.stringify(state);
            const wroteProfile = await writeIfChanged(
              config,
              PROFILE_FILE,
              profileJson(state, at),
              `sync: profile (${all.length} events)`,
              keepalive,
              // Only `exportedAt` differs? Then the reader learned nothing new.
              (currentContent) => {
                try {
                  return JSON.stringify((JSON.parse(currentContent) as { state?: unknown }).state) === stateJson;
                } catch {
                  return false;
                }
              },
            );
            if (wroteProfile) wrote += 1;

            const questions = deriveQuestions(state);
            const wroteQuestions = await writeIfChanged(
              config,
              QUESTIONS_FILE,
              `${JSON.stringify(questions, null, 2)}\n`,
              `sync: questions (${questions.filter((q) => q.status === 'open').length} open)`,
              keepalive,
            );
            if (wroteQuestions) wrote += 1;
          }

          const meta: SyncMeta = { lastPush: at, device: deviceId, eventCount: all.length, months: uniqueMonths(all) };
          await writeIfChanged(config, META_FILE, metaJson(meta), 'sync: meta', keepalive, (currentContent) => {
            // Nothing else changed: do not spend a commit just to move lastPush.
            if (wrote > 0) return false;
            try {
              const previous = JSON.parse(currentContent) as SyncMeta;
              return (
                previous.device === meta.device &&
                previous.eventCount === meta.eventCount &&
                JSON.stringify(previous.months) === JSON.stringify(meta.months)
              );
            } catch {
              return false;
            }
          });
        } catch (err) {
          error = describe(err);
        }
        return status();
      });
    },

    async pull(force = false): Promise<{ merged: number }> {
      await ensureLoaded();
      if (!cfg) {
        error = 'Sync is not configured.';
        return { merged: 0 };
      }
      const config = cfg;

      return serialize(async () => {
        const at = now();
        const previousPull = lastPull ?? 0;
        if (!force && previousPull && at - previousPull < PULL_INTERVAL_MS) return { merged: 0 };
        try {
          if (!deviceId) deviceId = (await store.getLocal<string>('deviceId')) ?? '';
          const metaFile = await getFile(config, META_FILE);
          lastPull = at;
          await store.setLocal('lastPull', at);
          error = undefined;
          if (!metaFile) return { merged: 0 };

          let meta: SyncMeta | null = null;
          try {
            meta = JSON.parse(metaFile.content) as SyncMeta;
          } catch {
            meta = null;
          }
          if (!meta) return { merged: 0 };

          const remoteMonths = (Array.isArray(meta.months) ? meta.months : []).filter(isMonthKey).sort();
          const ours = meta.device === deviceId;
          const stale = !(typeof meta.lastPush === 'number' && meta.lastPush > previousPull);
          if (!force && (ours || stale)) return { merged: 0 };

          // Current + previous month, plus any month we hold no events for at all.
          const localMonths = new Set(uniqueMonths(await store.listEvents()));
          const head = new Set(remoteMonths.slice(-PULL_MONTHS));
          const wanted = remoteMonths.filter((m) => head.has(m) || !localMonths.has(m));

          const fresh = await mergeRemoteEvents(
            config,
            wanted.map((m) => `${EVENTS_DIR}/${m}.json`),
          );
          if (fresh.length > 0) {
            pendingEvents = await countPending();
            onMerged(fresh);
          }
          return { merged: fresh.length };
        } catch (err) {
          error = describe(err);
          return { merged: 0 };
        }
      });
    },

    async restore(): Promise<{ events: number; error?: string }> {
      await ensureLoaded();
      if (!cfg) return { events: 0, error: 'Sync is not configured.' };
      const config = cfg;

      return serialize(async () => {
        try {
          if (!deviceId) deviceId = (await store.getLocal<string>('deviceId')) ?? '';
          const entries = await listDir(config, EVENTS_DIR);
          const paths = entries
            .filter((e) => e.type === 'file' && e.name.endsWith('.json'))
            .map((e) => e.path || `${EVENTS_DIR}/${e.name}`)
            .sort();
          if (paths.length === 0) return { events: 0, error: `No events found in ${config.owner}/${config.repo}.` };

          const fresh = await mergeRemoteEvents(config, paths);
          lastPull = now();
          await store.setLocal('lastPull', lastPull);
          pendingEvents = await countPending();
          error = undefined;
          if (fresh.length > 0) onMerged(fresh);
          return { events: fresh.length };
        } catch (err) {
          const message = describe(err);
          error = message;
          return { events: 0, error: message };
        }
      });
    },
  };

  return sync;
}

export { deriveQuestions } from './questions';
export { KEEPALIVE_MAX_BYTES, canKeepalive, GitHubError } from './github';
export { monthKey } from './ids';
