/**
 * Boot sequence and the wiring between the four packages.
 *
 *   store.init -> snapshot/replay -> content -> wire -> engine ready -> first plan
 *
 * `src/engine`, `src/store`, `src/store/sync.ts` and `src/content/wire.ts` are
 * owned by other agents and may be absent or broken while this ships, so each is
 * loaded through `import.meta.glob` (no build error when the file does not exist)
 * and every call is guarded. The app falls back to `fallbackEngine` /
 * `fallbackStore` and keeps working.
 */
import type {
  Engine,
  EngineDeps,
  EngineState,
  Event,
  Priors,
  Store,
  Sync,
  SyncConfig,
  Taxonomy,
  WireItem,
} from '@/types';
import { loadIndex, loadPriors, loadTaxonomy, warmAllShards } from '@/content/loader';
import {
  app,
  applyTheme,
  beginDwell,
  defaultSyncConfig,
  hydrateAround,
  endSession,
  loadSyncConfig,
  notify,
  pullSync,
  pushSync,
  record,
  replan,
  resumeSession,
  startSession,
  updateLiveMinutes,
} from './state';
import { blankState, createFallbackEngine } from './fallbackEngine';
import { createMemoryStore } from './fallbackStore';
import { newDeviceId } from './util';

type Glob = Record<string, () => Promise<unknown>>;

const engineMods = import.meta.glob('/src/engine/index.ts') as Glob;
const storeMods = import.meta.glob('/src/store/index.ts') as Glob;
const syncMods = import.meta.glob('/src/store/sync.ts') as Glob;
const wireMods = import.meta.glob('/src/content/wire.ts') as Glob;

interface EngineModule {
  createEngine?: (deps: EngineDeps, initial?: EngineState) => Engine;
  initialState?: (deps: EngineDeps) => EngineState;
  replay?: (deps: EngineDeps, events: Event[]) => unknown;
}
interface StoreModule {
  createStore?: () => Store;
}
interface SyncModule {
  createSync?: (opts: {
    store: Store;
    getState: () => EngineState;
    onMerged: (events: Event[]) => void;
  }) => Sync;
}
interface WireModule {
  loadWire?: (owner: string, repo: string) => Promise<WireItem[]>;
}

async function pick<T>(mods: Glob, path: string, what: string): Promise<T | null> {
  const loader = mods[path];
  if (!loader) return null;
  try {
    return (await loader()) as T;
  } catch (err) {
    console.warn(`[cultivar] ${what} failed to load`, err);
    return null;
  }
}

let deviceId = 'device';
let allEvents: Event[] = [];
let deps: EngineDeps | null = null;

export async function boot(): Promise<void> {
  // 1. store ---------------------------------------------------------------
  const storeMod = await pick<StoreModule>(storeMods, '/src/store/index.ts', 'store');
  let store: Store;
  try {
    store = storeMod?.createStore?.() ?? createMemoryStore();
    await store.init();
  } catch (err) {
    console.warn('[cultivar] store unavailable, using memory store', err);
    store = createMemoryStore();
    app.degradedStore = true;
    await store.init().catch(() => undefined);
  }
  app.store = store;

  deviceId = (await store.getLocal<string>('deviceId').catch(() => undefined)) ?? '';
  if (!deviceId) {
    deviceId = newDeviceId();
    await store.setLocal('deviceId', deviceId).catch(() => undefined);
  }

  // 2. content -------------------------------------------------------------
  const [index, taxonomy, priors] = await Promise.all([loadIndex(), loadTaxonomy(), loadPriors()]);
  app.taxonomy = taxonomy;
  app.builtAt = index?.builtAt ?? '';
  app.cardCount = index?.count ?? index?.cards.length ?? 0;

  if (!index || !index.cards.length || !taxonomy) {
    // No library yet: still fold the stored events so Settings, theme and the
    // streak header are honest, and so nothing the reader changes is lost.
    deps = {
      index: index ?? { builtAt: '', count: 0, cards: [] },
      taxonomy: taxonomy ?? { version: 1, domains: [], nodes: [] },
      priors: priors ?? emptyPriors(),
    };
    const engine = createFallbackEngine(deps, blankState(deviceId));
    for (const ev of await store.listEvents().catch(() => [] as Event[])) {
      try {
        engine.apply(ev);
      } catch {
        /* keep going */
      }
    }
    app.engine = engine;
    app.engineState = engine.state();
    app.boot = 'empty';
    app.bootMessage = 'Connect once to download the library (about 5 MB).';
    applyTheme();
    notify();
    void attachSync(store);
    attachLifecycle();
    return;
  }

  // 3. wire (optional) -----------------------------------------------------
  const cfg = (await store.getLocal<SyncConfig>('syncConfig').catch(() => undefined)) ?? defaultSyncConfig();
  const wireMod = await pick<WireModule>(wireMods, '/src/content/wire.ts', 'wire loader');
  let wire: WireItem[] = [];
  if (wireMod?.loadWire && cfg.owner && cfg.repo) {
    try {
      wire = (await wireMod.loadWire(cfg.owner, cfg.repo)) ?? [];
    } catch (err) {
      console.warn('[cultivar] wire unavailable', err);
    }
  }
  app.wire = wire;

  // 4. engine --------------------------------------------------------------
  deps = { index, taxonomy, priors: priors ?? emptyPriors(), wire };
  const snapshot = await store.getSnapshot().catch(() => null);
  allEvents = await store.listEvents().catch(() => [] as Event[]);
  allEvents.sort((a, b) => a.t - b.t || a.id.localeCompare(b.id));

  const engineMod = await pick<EngineModule>(engineMods, '/src/engine/index.ts', 'engine');
  app.engine = buildEngine(engineMod, deps, snapshot?.state, allEvents, snapshot?.state?.eventCount);
  app.engineState = app.engine.state();
  await repairLegacyBackfill(allEvents);

  // 5. ready ---------------------------------------------------------------
  app.boot = 'ready';
  applyTheme();
  startSession(deviceId, allEvents.length ? allEvents[allEvents.length - 1].t : 0);
  replan();
  const first = app.feed[0];
  if (first) beginDwell(first.id);
  notify();

  void attachSync(store);
  attachLifecycle();

  // Warm the rest of the library in the background — but only once the first
  // card is actually on screen. Eleven shards racing the one shard the reader
  // is waiting for pushed LCP from ~2 s to ~8 s on a throttled connection.
  void hydrateAround(app.cursor)
    .catch(() => undefined)
    .then(() => setTimeout(() => warmAllShards(), 1200));
}

function buildEngine(
  mod: EngineModule | null,
  engineDeps: EngineDeps,
  snapshotState: EngineState | undefined,
  events: Event[],
  snapshotCount: number | undefined,
): Engine {
  const create = mod?.createEngine;
  if (create) {
    try {
      // A snapshot whose event count disagrees with the log is not trusted (SYNC.md).
      const trustworthy = snapshotState && snapshotCount === events.length;
      if (trustworthy) {
        const engine = create(engineDeps, snapshotState);
        for (const ev of events.filter((e) => e.t > (snapshotState?.updatedAt ?? 0))) engine.apply(ev);
        return engine;
      }
      const replayed = mod?.replay ? tryReplay(mod, engineDeps, events) : null;
      if (replayed) return replayed;
      const engine = create(engineDeps);
      for (const ev of events) engine.apply(ev);
      return engine;
    } catch (err) {
      console.warn('[cultivar] engine failed, falling back', err);
    }
  }
  const fallback = createFallbackEngine(engineDeps, blankState(deviceId));
  for (const ev of events) {
    try {
      fallback.apply(ev);
    } catch {
      /* keep going */
    }
  }
  return fallback;
}

function tryReplay(mod: EngineModule, engineDeps: EngineDeps, events: Event[]): Engine | null {
  try {
    const out = mod.replay?.(engineDeps, events);
    if (out && typeof (out as Engine).next === 'function') return out as Engine;
    if (out && typeof out === 'object' && mod.createEngine) return mod.createEngine(engineDeps, out as EngineState);
  } catch (err) {
    console.warn('[cultivar] replay failed', err);
  }
  return null;
}

function emptyPriors(): Priors {
  return {
    mastery: {},
    difficulty: {},
    interest: {},
    formats: {} as Priors['formats'],
    angles: {} as Priors['angles'],
    language: { es: 0.12 },
  };
}

// ── sync ───────────────────────────────────────────────────────────────────

let syncTimer: number | undefined;

async function attachSync(store: Store): Promise<void> {
  const mod = await pick<SyncModule>(syncMods, '/src/store/sync.ts', 'sync');
  if (mod?.createSync) {
    try {
      app.sync = mod.createSync({
        store,
        getState: () => app.engine?.state() ?? blankState(deviceId),
        onMerged: (events) => void onMerged(events),
      });
    } catch (err) {
      console.warn('[cultivar] sync unavailable', err);
    }
  }
  await loadSyncConfig();
  if (app.sync && app.syncConfig?.token && navigator.onLine) {
    void pullSync();
    void pushSync(true);
    clearInterval(syncTimer);
    syncTimer = setInterval(() => void pushSync(true), 10 * 60 * 1000) as unknown as number;
  }
}

/** Events arrived from another device: rebuild the engine from the full log. */
async function onMerged(events: Event[]): Promise<void> {
  if (!events?.length || !deps || !app.store) return;
  const mod = await pick<EngineModule>(engineMods, '/src/engine/index.ts', 'engine');
  const all = await app.store.listEvents().catch(() => allEvents);
  all.sort((a, b) => a.t - b.t || a.id.localeCompare(b.id));
  allEvents = all;
  app.engine = buildEngine(mod, deps, undefined, all, undefined);
  app.engineState = app.engine.state();
  await repairLegacyBackfill(all);
  replan();
}

/** The first UI version omitted the served slot. Close only zero-served
 * groundwork spawned by those historical too-hard events, then sync the repair
 * as an ordinary event so every replay reaches the same state. */
async function repairLegacyBackfill(events: Event[]): Promise<void> {
  const open = app.engineState?.backfill.filter((b) => !b.done && b.served === 0) ?? [];
  if (!open.length) return;
  const legacy = events
    .filter((e) => e.type === 'too_hard' && e.card && !e.data?.slot)
    .map((e) => ({ because: e.card as string, created: e.t }));
  const entries = legacy.filter((e) => open.some((b) => b.because === e.because && b.created === e.created));
  if (entries.length) await record('migration', { data: { kind: 'legacy-slot-backfill', entries } });
}

// ── lifecycle ──────────────────────────────────────────────────────────────

function attachLifecycle(): void {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') endSession();
    else {
      resumeSession(deviceId);
      if (app.sync && app.syncConfig?.token) void pullSync();
    }
  });
  addEventListener('pagehide', () => endSession());
  setInterval(() => updateLiveMinutes(), 15_000);
  if (typeof matchMedia === 'function') {
    matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', () => applyTheme());
  }
}

// ── service worker update ──────────────────────────────────────────────────

let updateSW: ((reload?: boolean) => Promise<void>) | null = null;

export async function registerUpdates(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;
  try {
    const mod = await import('virtual:pwa-register');
    updateSW = mod.registerSW({
      immediate: true,
      onNeedRefresh() {
        app.updateReady = true;
        notify();
      },
    });
  } catch {
    /* no service worker in this build */
  }
}

export function applyUpdate(): void {
  app.updateReady = false;
  notify();
  void updateSW?.(true);
}
