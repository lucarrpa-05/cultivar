/**
 * Cultivar — shared contracts.
 *
 * This file is the authoritative interface between:
 *   - content tooling  (scripts/build-content.mjs emits ContentIndex, Card shards, Taxonomy)
 *   - the engine       (src/engine, pure TypeScript, no DOM; also runs in Node for analysis)
 *   - the store        (src/store: IndexedDB + GitHub sync)
 *   - the UI           (src/ui: Preact)
 *
 * Rules: no DOM types here; everything JSON-serializable; add fields, never rename.
 */

// ───────────────────────────── Content ─────────────────────────────

export type DomainId =
  | 'math' | 'ai' | 'css' | 'econ' | 'physics' | 'bio'
  | 'phil' | 'hist' | 'poli' | 'sports' | 'niche';

/** "math" | "math.topology" | "math.topology.compactness" */
export type TopicId = string;
export type CardId = string;

export type Format =
  | 'idea' | 'series' | 'fact' | 'quote' | 'story'
  | 'news' | 'callback' | 'challenge' | 'recall';
export type Layer = 'intuition' | 'both' | 'rigor';
export type Language = 'en' | 'es';
export type Weight = 'light' | 'medium' | 'heavy';
export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type Angle =
  | 'paradox' | 'history' | 'feud' | 'mistake' | 'connection' | 'tool'
  | 'open-problem' | 'weird' | 'beautiful' | 'practical' | 'human'
  | 'numbers' | 'origin' | 'prediction';

export interface Source {
  title: string;
  url: string;
  author?: string;
  year?: number;
  type: 'paper' | 'book' | 'wiki' | 'article' | 'video' | 'dataset' | 'primary' | 'blog' | 'encyclopedia';
}

export interface SeriesRef { id: string; index: number; total: number; title: string }
export interface CallbackRef { from: TopicId; to: TopicId }
export interface Diagram { file: string; caption: string; alt: string; svg?: string }
export interface CardDates { written: string; event?: string; expires?: string }
export interface ReviewStamp { by: string; at: string; verdict: 'approved'; notes?: string }

export interface RecallOption { text: string; correct: boolean; why: string }
export interface Recall {
  type: 'mcq' | 'reveal';
  question: string;
  /** reveal: the answer text */
  answer?: string;
  /** mcq: 2–4 options, exactly one correct */
  options?: RecallOption[];
}

/** Everything the engine needs to rank a card. No bodies. Lives in public/content/index.json */
export interface CardMeta {
  id: CardId;
  topic: TopicId;
  topics?: TopicId[];
  domain: DomainId;
  format: Format;
  layer: Layer;
  intuitionCard?: CardId;
  difficulty: Difficulty;
  language: Language;
  weight: Weight;
  angles: Angle[];
  tags: string[];
  /** resolved: explicit front matter, else the taxonomy prereqs of `topic` */
  prerequisites: TopicId[];
  title: string;
  hook?: string;
  series?: SeriesRef;
  seriesPrev?: CardId;
  seriesNext?: CardId;
  callback?: CallbackRef;
  related?: CardId[];
  dates: CardDates;
  evergreen: boolean;
  hasRigor: boolean;
  hasRecall: boolean;
  hasDiagram: boolean;
  words: { body: number; rigor: number };
  author: string;
  reviewed?: ReviewStamp;
  answersQuestion?: string;
  context?: string;
}

/** Full card, in public/content/cards/<domain>.json as Record<CardId, Card> */
export interface Card extends CardMeta {
  /** markdown; may contain $…$ / $$…$$ KaTeX */
  body: string;
  rigor: string | null;
  recall: Recall | null;
  sources: Source[];
  diagram?: Diagram;
}

export interface ContentIndex {
  builtAt: string;
  count: number;
  cards: CardMeta[];
}

export interface TaxonomyDomain { id: DomainId; name: string; glyph: string; color: string; blurb: string }
export interface TaxonomyNode {
  id: TopicId;
  kind: 'area' | 'topic';
  parent: TopicId;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  prereqs: TopicId[];
  blurb?: string;
}
export interface Taxonomy { version: number; notes?: string; domains: TaxonomyDomain[]; nodes: TaxonomyNode[] }

/** Cold-start priors (content/priors.json). Keys are topic ids at any depth; deeper keys win. */
export interface Priors {
  mastery: Record<TopicId, number>;
  difficulty: Record<TopicId, number>;
  interest: Record<TopicId, [number, number]>;
  formats: Record<Format, [number, number]>;
  angles: Record<Angle, [number, number]>;
  language: { es: number };
}

/** A live item fetched by GitHub Actions into data/inbox/*.json; shown as a light "wire" card. */
export interface WireItem {
  id: string;             // sha1(url) prefix
  source: string;         // source id from data/sources.json
  sourceName: string;
  kind: 'paper' | 'news' | 'blog' | 'onthisday' | 'wiki' | 'video';
  title: string;
  url: string;
  summary: string;        // ≤ 500 chars, plain text
  published: string;      // ISO date
  fetched: string;        // ISO date
  domain: DomainId;
  topicHint?: TopicId;
  lang: Language;
  status: 'fresh' | 'distilled' | 'dropped';
  distilledCard?: CardId;
}

export interface ReaderQuestion {
  id: string;             // q-YYYY-MM-DD-xxxx
  t: number;
  card?: CardId;
  topic?: TopicId;
  text: string;
  status: 'open' | 'answered';
  answerCard?: CardId;
}

// ───────────────────────────── Events ─────────────────────────────
// The engine state is a pure fold over the event log (event sourcing).
// Sync = union of event logs by id, sorted by t, replayed.

export type EventType =
  | 'view'          // card shown; data.dwellMs on leave; data.readFraction 0..1
  | 'like' | 'unlike'
  | 'save' | 'unsave'
  | 'skip'          // explicit "not my taste"
  | 'too_hard'      // "over my head" — interest stays, difficulty drops, prereqs backfill
  | 'too_easy'      // difficulty rises
  | 'rigor_open'    // opened the rigor layer
  | 'source_open'   // tapped a source link
  | 'series_next'   // asked for the next episode
  | 'recall'        // data.grade: 1 again | 2 hard | 3 good | 4 easy; data.correct?: boolean
  | 'question'      // data.text
  | 'wire'          // data.action: 'view'|'like'|'skip'|'open'
  | 'session_start' | 'session_end'   // data.minutes, data.cards
  | 'focus'         // data.topic: reader chose a topic to focus on in the Map (or null to clear)
  | 'settings'      // data.patch: Partial<Settings>
  | 'milestone'     // data.id
  | 'undo';         // data.of: event id

export interface Event {
  id: string;        // ulid-ish, unique across devices
  t: number;         // epoch ms
  type: EventType;
  s: string;         // session id
  card?: CardId;
  topic?: TopicId;
  data?: Record<string, unknown>;
}

// ───────────────────────────── Engine state ─────────────────────────────

export interface BanditArm { a: number; b: number; n: number; last: number }

export interface TopicState {
  /** 0..1, derived from points via saturating map; see ENGINE.md §4 */
  mastery: number;
  points: number;
  /** target difficulty 1..5 */
  difficulty: number;
  interest: BanditArm;
  seen: number;
  positives: number;
  negatives: number;
  tooHard: number;
  lastServed: number;
  /** FSRS-style retrievability summary across the topic's recall items, 0..1 */
  retention?: number;
  /** engine: epoch ms of the last event that touched this node (0 = never). Drives idle decay (ENGINE.md §4) and the difficulty read-through (§5). */
  lastEvent?: number;
}

export interface FsrsCard {
  due: number;
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  state: 0 | 1 | 2 | 3;   // new, learning, review, relearning
  lastReview: number;
}

export interface SeenInfo {
  first: number;
  last: number;
  views: number;
  liked?: boolean;
  saved?: boolean;
  skipped?: boolean;
  tooHard?: boolean;
  tooEasy?: boolean;
  rigorOpened?: boolean;
  dwellMs?: number;
  /** engine: the best valence this card ever earned — the "seen with valence ≥ 0.6" gate (ENGINE.md §7). */
  best?: number;
}

export interface BackfillItem {
  topic: TopicId;          // prerequisite to backfill
  because: CardId;         // the card flagged too hard
  created: number;
  served: number;          // how many backfill cards served so far
  done: boolean;
  /** engine: served backfill cards that landed (valence ≥ 0.6) — the §9.4 revisit trigger. */
  positives?: number;
}

export interface RevisitItem {
  card: CardId;
  flaggedAt: number;
  prereqs: TopicId[];
  /** mastery each prereq must reach */
  threshold: number;
  readyAt?: number;
  resolved: boolean;
}

export interface SeriesProgress {
  lastIndex: number;
  lastAt: number;
  paused: boolean;
  finished: boolean;
  /** engine: `series_next` was tapped — the next episode goes immediately (ENGINE.md §10.2). */
  pending?: boolean;
  /** engine: the last episode landed well — the next one goes within 1–3 cards. */
  warm?: boolean;
  /** engine: the session position the last episode was served at, for that 1–3 card delay. */
  atIndex?: number;
}

/** engine: one valence-bearing event, kept in a rolling window for zone detection (ENGINE.md §11). */
export interface ValenceMark { t: number; area: TopicId; r: number }

/** engine: one local day of activity, for the rolling metrics (§17) and the streak (§14). */
export interface DayStat {
  d: string;               // YYYY-MM-DD local
  minutes: number;
  cards: number;
  likes: number;
  skips: number;
  views: number;
  recallAnswered: number;
  recallCorrect: number;
  recallSkipped: number;
  sessions: number[];      // active minutes of each session that day
}

/** engine: live session bookkeeping the planner needs between `next()` calls (§10). */
export interface SessionState {
  id: string;
  startedAt: number;
  mode: 'daily' | 'binge';
  goalReached: boolean;
  minutes: number;
  cards: number;
  /** cards served so far this session (position − 1). */
  index: number;
  /** how many of each slot kind have been served this session. */
  slots: Record<string, number>;
  sinceRecall: number;
  sinceWire: number;
  lastSlot: string;
  /** remaining forced palate-cleanser cards (§12). */
  cleanser: number;
  /** a serendipity slot is owed right after the cleansers. */
  cleanserSerendipity: boolean;
  /** true for the very first session ever (§13). */
  first: boolean;
  /** 1-based session number. */
  ordinal: number;
  /** the `onthisday` wire item already used today, if any. */
  onThisDay: string;
  /** the session position the next `backfill` slot is due at (ENGINE.md §9.3). */
  backfillAt?: number;
}

export interface StreakState {
  current: number;
  best: number;
  lastGoalDay: string;     // YYYY-MM-DD local
  freezes: number;         // banked freezes (max 2)
  freezeUsedOn?: string;
  goalMinutes: number;     // default 10
  todayMinutes: number;
  todayDay: string;
}

export interface FunMetrics {
  sessions: number;
  binges: number;          // sessions ≥ 25 min
  totalMinutes: number;
  cardsSeen: number;
  likes: number;
  saves: number;
  skips: number;
  tooHard: number;
  tooEasy: number;
  recallAnswered: number;
  recallCorrect: number;
  daysActive: number;
  firstDay: string;
  /** rolling 14-day: like rate, skip rate, median session minutes, return rate */
  rolling: { likeRate: number; skipRate: number; medianSession: number; returnRate: number };
}

export interface Settings {
  spanishShare: number;         // 0..0.3, default 0.12
  quizFrequency: 'auto' | 'less' | 'more' | 'off';
  theme: 'dark' | 'light' | 'system';
  goalMinutes: number;
  reduceMotion: boolean;
  showWhy: boolean;
  /** UI text size (added by the UI shell; optional so older states stay valid). */
  textSize?: 'S' | 'M' | 'L';
}

export interface EngineState {
  version: number;
  deviceId: string;
  updatedAt: number;
  eventCount: number;
  lastEventId?: string;
  topics: Record<TopicId, TopicState>;
  formats: Record<string, BanditArm>;
  angles: Record<string, BanditArm>;
  sources: Record<string, BanditArm>;       // wire sources
  /** taste in surprises: outcome of serendipity-slot cards, keyed by domain */
  surprise: Record<string, BanditArm>;
  seen: Record<CardId, SeenInfo>;
  fsrs: Record<CardId, FsrsCard>;
  backfill: BackfillItem[];
  revisit: RevisitItem[];
  series: Record<string, SeriesProgress>;
  saved: CardId[];
  questions: ReaderQuestion[];
  streak: StreakState;
  metrics: FunMetrics;
  settings: Settings;
  milestones: string[];
  /** current obsession, if any */
  zone?: { area: TopicId; since: number; boost: number };
  focus?: TopicId;
  recent: CardId[];        // last 40 served, for novelty

  // ── engine-owned, all optional so older snapshots stay valid ──
  /** the live session (§10); absent between sessions. */
  session?: SessionState;
  /** rolling window of the last 25 valence-bearing events (§11). */
  valence?: ValenceMark[];
  /** per-day activity, newest last, trimmed to 90 days (§14, §17). */
  days?: DayStat[];
  /** consecutive negative *cards* (skip / fast pass) — drives palate cleansers (§12). */
  negStreak?: number;
  /** the card already counted toward `negStreak`, so one card never counts twice. */
  negCard?: CardId;
  /** current recall interval K (§10.1). */
  recallK?: number;
  /** consecutive correct recall answers, for the `recall-streak-10` milestone (§15). */
  recallStreak?: number;
  /** cards owed a light re-read after an Again grade (§10.2). */
  reread?: CardId[];
  /** sessions left in the post-zone widening window (§11). */
  widen?: number;
  /** the area the reader is widening out of, for the "why" copy. */
  widenFrom?: TopicId;
  /** milestones earned but not yet shown as a `milestone` slot (§15). */
  pendingMilestones?: string[];
  /** the reader's active context tag (`context:…`), set by a `settings` or `focus` event (§8). */
  context?: string;
  /** the last N events, so `undo` can reverse one without the full log (§3). */
  log?: Event[];
}

// ───────────────────────────── Engine API ─────────────────────────────

export type SlotKind =
  | 'open' | 'progress' | 'series' | 'backfill' | 'revisit' | 'recall'
  | 'callback' | 'serendipity' | 'news' | 'wire' | 'light' | 'close' | 'milestone' | 'answer' | 'context';

export interface ServedCard {
  id: CardId;
  slot: SlotKind;
  /** human-readable reasons for "Why this card?" — top 3 factors */
  why: string[];
  /** engine's score, for debugging/tests */
  score: number;
  /** for revisit: when the reader flagged it */
  revisitOf?: { flaggedAt: number };
  /** for wire slots: the WireItem id */
  wire?: string;
  /** for `milestone` slots: the milestone id (ENGINE.md §15). `id` carries it too. */
  milestone?: string;
  /** for `backfill` slots: the card that was flagged too hard (§9). */
  backfillFor?: CardId;
  /** for `series` slots: the series id. */
  series?: string;
}

export interface SessionPlan {
  id: string;
  startedAt: number;
  mode: 'daily' | 'binge';
  goalReached: boolean;
}

export interface KnowledgeMapNode {
  id: TopicId;
  kind: 'domain' | 'area' | 'topic';
  name: string;
  mastery: number;
  level: 0 | 1 | 2 | 3 | 4;   // unseen, touched, learning, solid, mastered
  unlocked: boolean;
  cardsTotal: number;
  cardsSeen: number;
  prereqs: TopicId[];
  children: TopicId[];
  color?: string;
  /** locked now, but one prereq away: it unlocks when its weakest prereq reaches 0.25 (ENGINE.md §18). */
  unlockedNext?: boolean;
  /** the prereq holding it back, when `unlockedNext`. */
  blockedBy?: TopicId;
}

export interface Engine {
  /** Fold one event into state (pure; returns new state or mutates in place, but deterministically). */
  apply(ev: Event): void;
  /** Plan the next n cards for the feed (idempotent until events arrive). */
  next(n?: number): ServedCard[];
  /** Explain why a card was served. */
  explain(cardId: CardId): string[];
  /** Knowledge map view. */
  map(): KnowledgeMapNode[];
  /** Current state (serializable). */
  state(): EngineState;
  /** Session info. */
  session(): SessionPlan;
}

export interface EngineDeps {
  index: ContentIndex;
  taxonomy: Taxonomy;
  priors: Priors;
  wire?: WireItem[];
  now?: () => number;
  random?: () => number;   // seedable for tests
}

// ───────────────────────────── Store API ─────────────────────────────

export interface Snapshot { state: EngineState; savedAt: number }

export interface Store {
  init(): Promise<void>;
  appendEvent(ev: Event): Promise<void>;
  listEvents(sinceT?: number): Promise<Event[]>;
  getSnapshot(): Promise<Snapshot | null>;
  putSnapshot(s: Snapshot): Promise<void>;
  getLocal<T>(key: string): Promise<T | undefined>;   // token, deviceId, theme — never synced
  setLocal<T>(key: string, v: T): Promise<void>;
  exportBackup(): Promise<Blob>;
  importBackup(file: Blob): Promise<{ events: number }>;
  clearAll(): Promise<void>;
}

export interface SyncConfig { owner: string; repo: string; token: string; branch?: string }
export interface SyncStatus { lastPush?: number; lastPull?: number; pendingEvents: number; error?: string }
export interface Sync {
  configure(cfg: SyncConfig | null): Promise<void>;
  test(): Promise<{ ok: boolean; message: string }>;
  push(): Promise<SyncStatus>;
  pull(): Promise<{ merged: number }>;
  status(): SyncStatus;
}

// ───────────────────────────── Refresh brief (scripts/analyze-profile.mjs) ─────────────────────────────

/**
 * One concrete authoring ask, generated by scripts/analyze-profile.ts and rendered
 * into refresh/brief.md and refresh/packets/<domain>.md. Additive: consumers may ignore it.
 */
export interface RefreshAsk {
  id: string;
  kind: 'backfill' | 'hungry' | 'coverage' | 'question' | 'context' | 'callback' | 'spanish' | 'news';
  domain: DomainId;
  topic: TopicId;
  topicName: string;
  count: number;
  /** inclusive range for the card's `difficulty` field */
  difficulty: [number, number];
  layer: Layer | 'any';
  weights: Weight[];
  formats?: Format[];
  /** human-readable justification, shown to the author agent */
  because: string;
  notes?: string[];
  /** 1 = write these first */
  priority: number;
}

export interface RefreshBrief {
  generatedAt: string;
  daysOfData: number;
  metrics: FunMetrics;
  diagnosis: string[];                       // e.g. "skip rate on 'quote' cards is 61% — cut quotes"
  backfillRequests: { topic: TopicId; because: CardId[]; needed: number }[];
  hungryTopics: { topic: TopicId; likeRate: number; unseenAtTarget: number; targetDifficulty: number }[];
  difficultyTargets: Record<TopicId, number>;
  formatPerformance: Record<string, { n: number; positive: number }>;
  anglePerformance: Record<string, { n: number; positive: number }>;
  openQuestions: ReaderQuestion[];
  revisitPending: RevisitItem[];
  coverageGaps: { topic: TopicId; cards: number; wanted: number }[];
  inboxPriority: WireItem[];
  context?: string;                           // what the reader said they are working on
  monthlyRecap?: string;                      // markdown
  /** true when there are no events yet (first run): everything comes from priors */
  coldStart?: boolean;
  /** 'engine' = replayed with src/engine; 'fallback' = the analysis fold in scripts/lib */
  stateSource?: 'engine' | 'fallback';
  /** concrete authoring asks, ordered by priority; one packet per domain is generated from these */
  asks?: RefreshAsk[];
}
