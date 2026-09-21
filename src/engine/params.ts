/**
 * Every tunable constant in the engine, in one place (ENGINE.md §20 plus the
 * constants that appear inline in §3–§18). Nothing else in `src/engine` may
 * hard-code a number that a human might want to change.
 *
 * Tuning: mutate `PARAMS` before constructing an engine, or pass a patched copy
 * around in tests. The object is intentionally plain and mutable.
 */

export const PARAMS = {
  // ── §3 valence / points ────────────────────────────────────────────────
  /** Bandit reward per event kind. */
  valence: {
    viewRead: 0.6,
    viewFast: 0.05,
    viewPartial: 0.3,
    like: 1.0,
    unlike: 0.3,
    save: 1.0,
    skip: 0.1,
    tooHard: 0.7,
    tooEasy: 0.5,
    rigorOpen: 0.9,
    sourceOpen: 0.9,
    seriesNext: 0.8,
    recall: 0.6,
    question: 0.9,
    wireView: 0.4,
    wireLike: 1.0,
    wireSkip: 0.1,
    wireOpen: 0.9,
  },
  /** Raw mastery points per event kind (before the difficulty scale). */
  points: {
    viewRead: 1,
    like: 1,
    unlike: -1,
    save: 1,
    tooEasy: 2,
    rigorOpen: 2,
    sourceOpen: 0.5,
    recallAgain: -1,
    recallHard: 1,
    recallGood: 3,
    recallEasy: 4,
  },
  /** points × (pointScaleBase + pointScalePerK · difficulty). */
  pointScaleBase: 0.6,
  pointScalePerK: 0.2,
  /** A view shorter than this with no other action is a "fast pass". */
  fastPassMs: 2500,
  /** readFraction at or above this counts as read. */
  readFraction: 0.6,
  /** dwell ≥ this × expectedReadMs counts as read. */
  readDwellRatio: 0.5,
  /** expectedReadMs = words.body / wordsPerSecBody · 1000 (+ rigor when opened). */
  wordsPerSecBody: 3.3,
  wordsPerSecRigor: 2.5,

  // ── §3 bandits ─────────────────────────────────────────────────────────
  /** Arm update weights up the hierarchy (topic is 1). */
  areaArmWeight: 0.5,
  domainArmWeight: 0.25,
  /** Secondary topics receive this fraction of every update. */
  secondaryWeight: 0.4,
  /** At most this many angle arms are updated per card. */
  maxAngles: 3,
  /** Daily decay of every arm toward Beta(1,1). */
  discountGamma: 0.985,

  // ── §4 mastery ─────────────────────────────────────────────────────────
  masterySBase: 8,
  masterySPerCard: 2,
  masterySCardCap: 12,
  /** mastery = 0.7·points-mastery + 0.3·retention when the topic has FSRS items. */
  masteryRetentionBlend: 0.3,
  masteryDecayAfterDays: 30,
  masteryDecayPerDay: 0.995,
  /** Level thresholds: touched / learning / solid / mastered. */
  levelTouched: 0.15,
  levelLearning: 0.3,
  levelSolid: 0.6,
  levelMastered: 0.85,
  levelMasteredRetention: 0.8,
  levelMasteredMinItems: 3,
  /** A node is unlocked when every prereq reaches this mastery. */
  prereqUnlock: 0.25,

  // ── §5 difficulty ──────────────────────────────────────────────────────
  difficultyMin: 1,
  difficultyMax: 5,
  /** like/save/rigor_open drift: d ← d + driftRate·(k + driftOffset − d). */
  driftRate: 0.15,
  driftOffset: 0.4,
  /** skip on a card at least this much above target lowers the target by skipDrop. */
  skipGap: 1,
  skipDrop: 0.1,
  tooHardDrop: { topic: 0.6, area: 0.3, domain: 0.1 },
  tooEasyRise: { topic: 0.5, area: 0.25, domain: 0.1 },
  recallRise: 0.05,
  /** fit(k,d) = exp(−(k−d)²/(2σ²)). */
  fitSigma: 0.8,
  fitHardGap: 1.3,
  fitHardPenalty: 0.5,
  fitEasyGap: 1.5,
  fitEasyPenalty: 0.8,

  // ── §6 interest ────────────────────────────────────────────────────────
  shrinkKappa: 4,

  // ── §7 readiness ───────────────────────────────────────────────────────
  readyFloor: 0.35,
  readyOffset: 0.05,
  readySpan: 0.3,
  readyLowMastery: 0.15,
  readyLowDifficulty: 3,
  readyLowPenalty: 0.5,
  /** Cards in a locked topic are penalised, never excluded. */
  lockedPenalty: 0.8,
  /** A callback's `from` needs this mastery, or this many positive events. */
  callbackFromMastery: 0.25,
  callbackFromPositives: 2,
  /** …and its `to` needs to be unlocked, in the zone/focus, or sample this high. */
  callbackToTheta: 0.5,
  /** A skipped series pauses this many days before the previous episode returns. */
  seriesPauseDays: 7,

  // ── §8 scoring ─────────────────────────────────────────────────────────
  secondaryTopicMain: 0.7,
  secondaryTopicSecondary: 0.3,
  newsHalfLifeDays: 5,
  wireHalfLifeDays: 7,
  focusBoost: 2.5,
  contextBoost: 1.8,
  answerBoost: 1.6,
  exploreBonus: 0.25,
  randomJitter: 0.05,

  // ── §9 too-advanced protocol ───────────────────────────────────────────
  backfillThreshold: 0.35,
  /** A backfill topic is satisfied after this many served cards. */
  backfillServeTarget: 2,
  /** Backfill cards score with θ replaced by this constant. */
  backfillTheta: 0.8,
  /** Backfill cards must sit at or below d_p + this. */
  backfillSlack: 0.5,
  backfillFirstMin: 2,
  backfillFirstMax: 4,
  backfillEveryMin: 3,
  backfillEveryMax: 5,
  revisitMinDays: 3,
  revisitPerSession: 1,
  revisitAfterPosition: 4,

  // ── §10 sessions and slots ─────────────────────────────────────────────
  sessionGapMin: 30,
  goalMinutes: 10,
  /** A session this long counts as a binge in the metrics. */
  bingeMinutes: 25,
  openFormats: ['story', 'fact', 'callback', 'idea', 'challenge'] as string[],
  openAngles: ['paradox', 'human', 'feud', 'weird', 'beautiful', 'connection'] as string[],
  openTopAreas: 3,
  seriesWithinMin: 1,
  seriesWithinMax: 3,
  answerPerSession: 1,
  answerMinPosition: 2,
  answerMaxPosition: 4,
  callbacksPerSession: 1,
  callbackMinPosition: 2,
  milestonesPerSession: 2,
  closeFormats: ['callback', 'story', 'challenge', 'quote'] as string[],
  closeStoryAngles: ['human', 'feud', 'mistake'] as string[],
  /** Binge mode drops a story/challenge breather every N cards after card M. */
  stoppingPointEvery: 15,
  stoppingPointAfter: 40,

  // ── §10.1 recall ───────────────────────────────────────────────────────
  recallIntervalStart: 7,
  recallIntervalMin: 4,
  recallIntervalMax: 15,
  recallFirstMin: 3,
  recallFirstMax: 5,
  recallWindowDays: 14,
  recallParticipationLow: 0.5,
  recallParticipationHigh: 0.8,
  recallCorrectLow: 0.55,
  recallCorrectHigh: 0.92,
  recallKStepUp: 2,
  recallKStepDown: 1,
  quizFrequency: { auto: 1, less: 1.6, more: 0.6, off: 0 } as Record<string, number>,
  /** MCQ answered faster than this and correct counts as Easy. */
  recallEasyMs: 4000,

  // ── §10.2 FSRS ─────────────────────────────────────────────────────────
  fsrsRetention: 0.9,
  fsrsMaxInterval: 365,
  /** First due = first qualifying view + this many hours. */
  fsrsFirstDueH: 20,

  // ── §11 zone ───────────────────────────────────────────────────────────
  zoneWindow: 25,
  /** Wait for enough independent feedback before inferring an obsession. */
  zoneMinValenceEvents: 200,
  /** No zone before the window is this full — four early cards in one area are not an obsession. */
  zoneMinWindow: 16,
  zoneShare: 0.45,
  zonePositiveRate: 0.6,
  zonePositiveValence: 0.6,
  zoneStartBoost: 1.0,
  /**
   * §11 writes `boost = min(1.5, boost + 0.05)`, i.e. a 2.5 / 0.85 ≈ 2.9× lean.
   * Against a 2,000-card index that is not enough to reach the ≥ 40% in-area
   * share §19.3 requires: the argmax has 1,900 out-of-area cards to draw a lucky
   * Thompson sample from and only ~40 in-area ones. Raised until an obsession
   * looks like one — but no further, because the boost grows additively and
   * decays multiplicatively, so too large a step makes zones permanent.
   */
  zoneStep: 0.12,
  zoneMaxBoost: 4.0,
  zoneNegativeMultiplier: 0.75,
  zoneEndBoost: 0.3,
  zoneTimeoutH: 48,
  zoneOutsideBoost: 0.85,
  widenSessions: 2,
  widenAdjacentBoost: 1.3,

  // ── §12 rhythm, novelty, quotas ────────────────────────────────────────
  energyCost: { light: 1, medium: 2, heavy: 3 } as Record<string, number>,
  recallEnergyCost: 1,
  energyWindow: 3,
  energyBudgetDaily: 7,
  energyBudgetBinge: 8,
  energyBudgetZone: 9,
  afterHeavyLightBoost: 1.3,
  recentWindow: 40,
  noveltySameTopicWindow: 3,
  noveltySameTopic: 0.3,
  noveltySameAreaWindow: 2,
  noveltySameArea: 0.6,
  noveltyTagWindow: 5,
  noveltyTagMin: 2,
  noveltyTagOverlap: 0.5,
  noveltySameFormatWindow: 2,
  noveltySameFormat: 0.7,
  spanishShare: 0.12,
  languageWindow: 20,
  languageLowGap: 0.05,
  languageHighGap: 0.08,
  languageLowBoost: 2.0,
  languageHighPenalty: 0.3,
  wireCapPer: 5,
  newsThetaFloor: 0.45,
  newsFreshDays: 3,
  wireSourceFloor: 0.3,
  /** After this many consecutive negatives, force palate cleansers. */
  cleanserNegStreak: 3,
  cleanserCards: 2,

  // ── §10.9 serendipity ──────────────────────────────────────────────────
  serendipityDaily: 0.12,
  serendipityBinge: 0.18,
  serendipityBingeRampCards: 20,
  serendipityWiden: 0.2,
  serendipityFirstSessions: 0.2,
  /** A daily session gets at least one serendipity slot inside this many cards. */
  serendipityByCard: 10,
  serendipityTopDomains: 3,
  /** A domain absent from the last 20 served is fully "starved" and doubles its surprise draw. */
  serendipityStarvation: 5,
  deepCutUntouchedDays: 7,

  // ── §13 cold start ─────────────────────────────────────────────────────
  coldStartSessions: 3,
  coldStartFirstDomain: 'math',
  coldStartFirstDifficulty: 3,
  coldStartFirstAngles: ['paradox', 'beautiful', 'connection'] as string[],
  /** Positions 2..12 of the very first session, by domain. */
  coldStartShape: ['ai', 'ai', 'css', 'css', 'econ', 'econ', 'physics|bio', 'niche', 'hist|phil|poli', 'hist|phil|poli', 'econ|math'] as string[],
  coldStartHomeDomains: ['math', 'ai'] as string[],
  coldStartHomeBoost: 1.9,
  coldStartCoverCards: 20,

  // ── §14 streak ─────────────────────────────────────────────────────────
  freezePerDays: 7,
  freezeMax: 2,
  lightDayMinutes: 3,
  lightDaysPer: 2,
  lightDayWindow: 14,

  // ── §17 metrics ────────────────────────────────────────────────────────
  rollingDays: 14,
  historyDays: 90,

  // ── housekeeping ───────────────────────────────────────────────────────
  /** How many recent events the state keeps so `undo` can reverse them. */
  undoWindow: 200,
  stateVersion: 1,
};

export type EngineParams = typeof PARAMS;
