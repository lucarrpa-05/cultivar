/**
 * The single AppStore: engine + store + sync + everything the screens read.
 *
 * Reactivity is a tiny subscribe/notify (no signals dependency). Components use
 * `useApp(selector)` and re-render when the selected value changes by identity.
 *
 * Event flow: UI action -> `record()` -> engine.apply -> store.appendEvent ->
 * replan (engine.next(8), current card kept at the head) -> notify.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import type {
  Card,
  CardId,
  Engine,
  EngineState,
  Event,
  EventType,
  ServedCard,
  Settings,
  Store,
  Sync,
  SyncConfig,
  SyncStatus,
  Taxonomy,
  TopicId,
  WireItem,
} from '@/types';
import { cardMeta, loadCard } from '@/content/loader';
import { DEFAULT_SETTINGS } from './fallbackEngine';
import { dayKey, newEventId, sessionIdFor } from './util';

export type Tab = 'feed' | 'map' | 'saved' | 'you';

export type Sheet =
  | { kind: 'more'; card: CardId }
  | { kind: 'why'; card: CardId }
  | { kind: 'question'; card: CardId }
  | { kind: 'topic'; topic: TopicId }
  | null;

export interface ToastMsg {
  id: number;
  text: string;
  actionLabel?: string;
  action?: () => void;
}

export interface AppState {
  boot: 'loading' | 'ready' | 'empty' | 'error';
  bootMessage: string;
  degradedStore: boolean;

  engine: Engine | null;
  engineState: EngineState | null;
  store: Store | null;
  sync: Sync | null;
  taxonomy: Taxonomy | null;
  wire: WireItem[];
  builtAt: string;
  cardCount: number;

  tab: Tab;
  feed: ServedCard[];
  cursor: number;
  cards: Record<CardId, Card | null>;
  exhausted: boolean;

  sheet: Sheet;
  toast: ToastMsg | null;
  mapDomain: string | null;
  updateReady: boolean;
  syncStatus: SyncStatus | null;
  syncConfig: SyncConfig | null;

  /** live active minutes for the goal ring (session so far + engine's today) */
  liveMinutes: number;
  /** registered by <Feed/> so actions can move the reader */
  scrollToIndex: ((i: number, smooth?: boolean) => void) | null;
}

export const app: AppState = {
  boot: 'loading',
  bootMessage: '',
  degradedStore: false,
  engine: null,
  engineState: null,
  store: null,
  sync: null,
  taxonomy: null,
  wire: [],
  builtAt: '',
  cardCount: 0,
  tab: 'feed',
  feed: [],
  cursor: 0,
  cards: {},
  exhausted: false,
  sheet: null,
  toast: null,
  mapDomain: null,
  updateReady: false,
  syncStatus: null,
  syncConfig: null,
  liveMinutes: 0,
  scrollToIndex: null,
};

// ── reactivity ─────────────────────────────────────────────────────────────

type Listener = () => void;
const listeners = new Set<Listener>();
let queued = false;

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => void listeners.delete(fn);
}

export function notify(): void {
  if (queued) return;
  queued = true;
  queueMicrotask(() => {
    queued = false;
    for (const fn of [...listeners]) fn();
  });
}

export function useApp<T>(selector: (s: AppState) => T): T {
  const [, force] = useState(0);
  const sel = useRef(selector);
  sel.current = selector;
  const value = useRef<T>(selector(app));
  value.current = selector(app);
  useEffect(
    () =>
      subscribe(() => {
        const next = sel.current(app);
        if (!Object.is(next, value.current)) {
          value.current = next;
          force((n) => n + 1);
        }
      }),
    [],
  );
  return value.current;
}

export function settings(): Settings {
  return app.engineState?.settings ?? DEFAULT_SETTINGS;
}

// ── session + dwell ────────────────────────────────────────────────────────

const SESSION_GAP_MS = 30 * 60 * 1000;

let sessionId = 'boot';
let sessionStart = 0;
let sessionActiveMs = 0;
let sessionCards = 0;
let sessionOpen = false;
let eventsSinceSnapshot = 0;

let dwell: { card: CardId; start: number; readFraction: number } | null = null;

export function currentSessionId(): string {
  return sessionId;
}

export function startSession(deviceId: string, lastEventT: number): void {
  const now = Date.now();
  sessionStart = now;
  sessionActiveMs = 0;
  sessionCards = 0;
  sessionId = sessionIdFor(deviceId, now);
  if (!lastEventT || now - lastEventT >= SESSION_GAP_MS) {
    sessionOpen = true;
    void record('session_start');
  } else {
    sessionOpen = true;
  }
}

export function endSession(): void {
  if (!sessionOpen) return;
  endDwell();
  const minutes = Math.round((sessionActiveMs / 60000) * 10) / 10;
  sessionOpen = false;
  void record('session_end', { data: { minutes, cards: sessionCards } }).then(() => {
    void saveSnapshot();
    void pushSync(true);
  });
  sessionActiveMs = 0;
  sessionCards = 0;
}

export function resumeSession(deviceId: string): void {
  if (sessionOpen) return;
  startSession(deviceId, Date.now() - SESSION_GAP_MS - 1);
}

export function beginDwell(card: CardId): void {
  dwell = { card, start: Date.now(), readFraction: 0 };
}

export function reportReadFraction(card: CardId, fraction: number): void {
  if (dwell && dwell.card === card) dwell.readFraction = Math.max(dwell.readFraction, fraction);
}

export function dwellMs(card?: CardId): number {
  if (!dwell || (card && dwell.card !== card)) return 0;
  return Date.now() - dwell.start;
}

export function endDwell(): void {
  if (!dwell) return;
  const ms = Date.now() - dwell.start;
  dwell = null;
  sessionActiveMs += Math.min(ms, 5 * 60 * 1000); // a card left open for an hour is not reading
  updateLiveMinutes();
  // Passing a card is not reading it. Only markRead() (the Read button, or an
  // action that implies reading: like, save, rigor, recall, next episode) records a `view`.
}

/** Cards confirmed read in this session (before the engine snapshot catches up). */
const readThisSession = new Set<CardId>();

export function isRead(card: CardId): boolean {
  return readThisSession.has(card) || Boolean(app.engineState?.seen[card]);
}

/**
 * Explicitly mark a card as read. Idempotent. Carries the dwell data so the
 * engine still knows how long the reader spent; `confirmed: true` tells the
 * fold this was a deliberate act, never a fast pass.
 */
export function markRead(card: CardId): Promise<Event | null> {
  if (isRead(card)) return Promise.resolve(null);
  readThisSession.add(card);
  const onCard = dwell && dwell.card === card;
  const ms = onCard ? Date.now() - dwell!.start : 0;
  const readFraction = onCard ? Math.max(dwell!.readFraction, 0.6) : 1;
  sessionCards += 1;
  return record('view', {
    card,
    data: { dwellMs: ms, readFraction: Math.round(readFraction * 100) / 100, confirmed: true },
  });
}

export function updateLiveMinutes(): void {
  const streak = app.engineState?.streak;
  const today = streak && streak.todayDay === dayKey() ? streak.todayMinutes : 0;
  const live = today + (sessionActiveMs + (dwell ? Date.now() - dwell.start : 0)) / 60000;
  const rounded = Math.round(live * 10) / 10;
  if (rounded !== app.liveMinutes) {
    app.liveMinutes = rounded;
    notify();
  }
}

// ── events ─────────────────────────────────────────────────────────────────

export interface RecordOpts {
  card?: CardId;
  topic?: TopicId;
  data?: Record<string, unknown>;
  /** skip the re-plan (used for `view`, which fires while the reader is moving) */
  quiet?: boolean;
}

export async function record(type: EventType, opts: RecordOpts = {}): Promise<Event> {
  const ev: Event = {
    id: newEventId(),
    t: Date.now(),
    type,
    s: sessionId,
    ...(opts.card ? { card: opts.card } : {}),
    ...(opts.topic ? { topic: opts.topic } : {}),
    ...(opts.data ? { data: opts.data } : {}),
  };
  if (!ev.topic && ev.card) {
    const meta = cardMeta(ev.card);
    if (meta) ev.topic = meta.topic;
  }
  try {
    app.engine?.apply(ev);
    app.engineState = app.engine?.state() ?? app.engineState;
  } catch (err) {
    console.warn('[cultivar] engine.apply failed', err);
  }
  try {
    await app.store?.appendEvent(ev);
  } catch (err) {
    console.warn('[cultivar] appendEvent failed', err);
  }
  eventsSinceSnapshot++;
  if (eventsSinceSnapshot >= 50) void saveSnapshot();
  if (!opts.quiet) replan();
  else notify();
  return ev;
}

export async function saveSnapshot(): Promise<void> {
  const engine = app.engine;
  const store = app.store;
  if (!engine || !store) return;
  eventsSinceSnapshot = 0;
  try {
    await store.putSnapshot({ state: engine.state(), savedAt: Date.now() });
  } catch (err) {
    console.warn('[cultivar] putSnapshot failed', err);
  }
}

// ── feed ───────────────────────────────────────────────────────────────────

/** Index the reader is currently scrolling toward; it must survive a re-plan. */
let pendingIndex: number | null = null;

export function replan(): void {
  const engine = app.engine;
  if (!engine) {
    notify();
    return;
  }
  let plan: ServedCard[] = [];
  try {
    plan = engine.next(8) ?? [];
  } catch (err) {
    console.warn('[cultivar] engine.next failed', err);
  }
  const keepTo = Math.max(app.cursor, pendingIndex ?? -1);
  const head = app.feed.slice(0, keepTo + 1);
  const headIds = new Set(head.map((c) => c.id));
  const tail = plan.filter((p) => !headIds.has(p.id));
  app.feed = [...head, ...tail];
  app.exhausted = tail.length === 0;
  maybeInjectGoalMilestone();
  void hydrateAround(app.cursor);
  notify();
}

/** In-flight body loads, so two overlapping hydrations share one fetch. */
const loadingCards = new Map<CardId, Promise<Card | null>>();

/** Loads bodies for the mounted window (cursor-1 .. cursor+2). */
export async function hydrateAround(index: number): Promise<void> {
  const wanted = app.feed.slice(Math.max(0, index - 1), index + 3);
  let changed = false;
  await Promise.all(
    wanted.map(async (s) => {
      if (s.id in app.cards) return;
      if (s.id.startsWith('milestone:') || s.slot === 'milestone' || s.slot === 'wire' || s.wire) return;
      let pending = loadingCards.get(s.id);
      if (!pending) {
        pending = loadCard(s.id);
        loadingCards.set(s.id, pending);
      }
      const card = await pending;
      loadingCards.delete(s.id);
      app.cards[s.id] = card;
      changed = true;
    }),
  );
  if (changed) {
    app.cards = { ...app.cards };
    notify();
  }
}

export function onCardVisible(index: number): void {
  if (pendingIndex !== null && index === pendingIndex) pendingIndex = null;
  if (index === app.cursor && dwell) return;
  const served = app.feed[index];
  if (!served) return;
  app.cursor = index;
  endDwell(); // emits `view` for the card we just left
  beginDwell(served.id);
  void hydrateAround(index);
  notify();
}

export function currentServed(): ServedCard | undefined {
  return app.feed[app.cursor];
}

export function goTo(index: number, smooth = true): void {
  pendingIndex = index;
  app.scrollToIndex?.(index, smooth);
  // If the scroll never lands (tab switched, no section yet), do not pin forever.
  setTimeout(() => {
    if (pendingIndex === index) pendingIndex = null;
  }, 2500);
}

/** Put a specific card next (related chips, random saved card, series jump). */
export function jumpToCard(id: CardId, slot: ServedCard['slot'] = 'progress', why: string[] = []): void {
  const at = app.cursor + 1;
  const served: ServedCard = { id, slot, why, score: 0 };
  app.feed = [...app.feed.slice(0, at).filter((c) => c.id !== id), served, ...app.feed.slice(at).filter((c) => c.id !== id)];
  app.tab = 'feed';
  notify();
  void hydrateAround(app.cursor).then(() => {
    requestAnimationFrame(() => goTo(at));
  });
}

function maybeInjectGoalMilestone(): void {
  const st = app.engineState;
  if (!st) return;
  const goal = st.settings.goalMinutes || st.streak.goalMinutes || 10;
  const id = `goal-reached:${dayKey()}`;
  if (app.liveMinutes < goal) return;
  if (st.milestones.includes(id)) return;
  if (app.feed.some((s) => s.slot === 'milestone')) return;
  st.milestones.push(id);
  void record('milestone', { data: { id: 'goal-reached' }, quiet: true });
  const at = app.cursor + 1;
  app.feed = [
    ...app.feed.slice(0, at),
    { id: `milestone:goal-reached`, slot: 'milestone', why: [`${st.streak.current + 1} days`], score: 0 },
    ...app.feed.slice(at),
  ];
}

// ── toasts + sheets ────────────────────────────────────────────────────────

let toastSeq = 0;
let toastTimer: number | undefined;

export function showToast(text: string, action?: { label: string; run: () => void }, ms = 4000): void {
  toastSeq++;
  app.toast = { id: toastSeq, text, actionLabel: action?.label, action: action?.run };
  notify();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    app.toast = null;
    notify();
  }, ms) as unknown as number;
}

export function dismissToast(): void {
  clearTimeout(toastTimer);
  app.toast = null;
  notify();
}

export function openSheet(sheet: Sheet): void {
  app.sheet = sheet;
  notify();
}

export function closeSheet(): void {
  app.sheet = null;
  notify();
}

export function setTab(tab: Tab): void {
  if (app.tab === tab) return;
  app.tab = tab;
  if (tab !== 'feed') endDwell();
  else {
    const served = currentServed();
    if (served) beginDwell(served.id);
  }
  notify();
}

export function setMapDomain(id: string | null): void {
  app.mapDomain = id;
  notify();
}

// ── undo-able reactions ────────────────────────────────────────────────────

export async function reactWithUndo(type: 'skip' | 'too_hard' | 'too_easy', card: CardId, text: string): Promise<void> {
  const ev = await record(type, { card });
  showToast(text, {
    label: 'Undo',
    run: () => {
      void record('undo', { card, data: { of: ev.id } });
      dismissToast();
    },
  });
}

// ── settings ───────────────────────────────────────────────────────────────

export async function patchSettings(patch: Partial<Settings>): Promise<void> {
  await record('settings', { data: { patch } });
  applyTheme();
}

export function applyTheme(): void {
  const s = settings();
  const root = document.documentElement;
  const prefersLight =
    typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: light)').matches : false;
  const theme = s.theme === 'system' ? (prefersLight ? 'light' : 'dark') : s.theme;
  root.dataset.theme = theme;
  root.dataset.text = (s.textSize ?? 'M').toLowerCase();
  root.dataset.motion = s.reduceMotion ? 'reduce' : '';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#fbfaf7' : '#0e1014');
}

// ── sync ───────────────────────────────────────────────────────────────────

export function defaultSyncConfig(): SyncConfig {
  const host = location.hostname;
  const owner = host.endsWith('.github.io') ? host.split('.')[0] : '';
  const seg = location.pathname.split('/').filter(Boolean)[0] ?? 'cultivar';
  return { owner, repo: `${seg}-data`, token: '' };
}

export async function loadSyncConfig(): Promise<void> {
  const stored = await app.store?.getLocal<SyncConfig>('syncConfig').catch(() => undefined);
  app.syncConfig = stored ?? { ...defaultSyncConfig() };
  app.syncStatus = app.sync?.status() ?? null;
  notify();
}

export async function saveSyncConfig(cfg: SyncConfig): Promise<void> {
  app.syncConfig = cfg;
  await app.store?.setLocal('syncConfig', cfg).catch(() => undefined);
  await app.sync?.configure(cfg).catch(() => undefined);
  app.syncStatus = app.sync?.status() ?? null;
  notify();
}

export async function forgetSync(): Promise<void> {
  app.syncConfig = { ...defaultSyncConfig() };
  await app.store?.setLocal('syncConfig', null).catch(() => undefined);
  await app.sync?.configure(null).catch(() => undefined);
  app.syncStatus = app.sync?.status() ?? null;
  notify();
}

export async function pushSync(silent = false): Promise<void> {
  if (!app.sync) return;
  try {
    app.syncStatus = await app.sync.push();
  } catch (err) {
    if (!silent) showToast('Sync failed. It will retry later.');
    app.syncStatus = app.sync.status?.() ?? null;
  }
  notify();
}

export async function pullSync(): Promise<number> {
  if (!app.sync) return 0;
  try {
    const { merged } = await app.sync.pull();
    app.syncStatus = app.sync.status();
    notify();
    return merged;
  } catch {
    return 0;
  }
}

// ── danger zone / backup ───────────────────────────────────────────────────

export async function exportBackup(): Promise<void> {
  const store = app.store;
  if (!store) return;
  const blob = await store.exportBackup();
  const name = `cultivar-backup-${dayKey()}.json`;
  const file = new File([blob], name, { type: 'application/json' });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (nav.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Cultivar backup' });
      return;
    } catch {
      /* fall through to download */
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export async function importBackup(file: Blob): Promise<void> {
  const store = app.store;
  if (!store) return;
  try {
    const { events } = await store.importBackup(file);
    showToast(`Imported ${events} events. Reloading.`);
    setTimeout(() => location.reload(), 900);
  } catch {
    showToast('That file could not be read.');
  }
}

export async function resetAll(): Promise<void> {
  try {
    await app.store?.clearAll();
  } finally {
    location.reload();
  }
}

/**
 * Mark every card unread: wipe the event log and snapshot here AND empty the
 * synced month files in the data repo, keeping the token, settings and device id.
 */
export async function resetReadingHistory(): Promise<{ ok: boolean; message: string }> {
  const store = app.store as (typeof app.store & { clearEvents?: () => Promise<void> }) | undefined;
  const sync = app.sync as
    | (typeof app.sync & { resetRemote?: () => Promise<{ months: number; error?: string }> })
    | undefined;
  let message = 'Reading history cleared on this device.';
  try {
    if (sync?.resetRemote && app.syncConfig?.token) {
      const r = await sync.resetRemote();
      message = r.error
        ? `Cleared here, but the repo could not be reset: ${r.error}`
        : `Reading history cleared here and in the repo (${r.months} month file${r.months === 1 ? '' : 's'}).`;
    }
    if (store?.clearEvents) await store.clearEvents();
    else await app.store?.clearAll();
    readThisSession.clear();
    setTimeout(() => location.reload(), 1200);
    return { ok: true, message };
  } catch (err) {
    return { ok: false, message: `Could not reset: ${(err as Error).message}` };
  }
}
