/**
 * A synthetic reader (ENGINE.md §19).
 *
 * Given a persona — per-domain like probability, a true level per domain, a
 * quiz accuracy — this consumes `engine.next()` and emits the events a real
 * reader would, with plausible dwell times, in the order the UI emits them
 * (actions first, then the `view` that closes the card).
 *
 * Deterministic: everything comes from the seeded `random` in the options, and
 * time comes from a `Clock` the caller also wires into `deps.now`.
 */

import type { CardMeta, Engine, Event, ServedCard } from '../types.ts';
import type { EngineContext } from './context.ts';
import { PARAMS } from './params.ts';
import { clamp, mulberry32 } from './rng.ts';

/** A mutable clock the simulator advances and `deps.now` reads. */
export interface Clock { t: number }

export function createClock(start: number): Clock {
  return { t: start };
}

export interface Persona {
  /** probability of liking a card in a domain that lands at the right level */
  like: Record<string, number>;
  /** the reader's true level per domain, 1..5 */
  level: Record<string, number>;
  likeDefault: number;
  levelDefault: number;
  /** probability of "too advanced" at gap 0, and the extra per point above */
  tooHardBase: number;
  tooHardSlope: number;
  /** probability of skipping a card the reader does not care for */
  skipBase: number;
  /** probability of reading a card properly once it is not skipped */
  readProbability: number;
  /** dwell = expectedRead × dwellFactor × U(0.7, 1.3) */
  dwellFactor: number;
  quizAccuracy: number;
  quizParticipation: number;
  rigorProbability: number;
  saveProbability: number;
  sourceProbability: number;
  seriesNextProbability: number;
  questionProbability: number;
  /** probability of engaging with a Spanish card at all */
  spanishOk: number;
  cardsPerSession: number;
}

export function persona(patch?: Partial<Persona>): Persona {
  const base: Persona = {
    like: {},
    level: {},
    likeDefault: 0.3,
    levelDefault: 2.5,
    tooHardBase: 0.02,
    tooHardSlope: 0.25,
    skipBase: 0.12,
    readProbability: 0.85,
    dwellFactor: 1.05,
    quizAccuracy: 0.75,
    quizParticipation: 0.85,
    rigorProbability: 0.3,
    saveProbability: 0.06,
    sourceProbability: 0.08,
    seriesNextProbability: 0.7,
    questionProbability: 0.01,
    spanishOk: 0.9,
    cardsPerSession: 14,
  };
  if (patch) Object.assign(base, patch);
  return base;
}

export interface SimOptions {
  clock: Clock;
  cards: number;
  seed?: number;
  persona?: Persona;
  /** Force a specific reaction; return null to fall back to the persona. */
  react?: (card: CardMeta | null, served: ServedCard, index: number) => Reaction | null;
  onServed?: (served: ServedCard, card: CardMeta | null, index: number) => void;
  /** Stop early. */
  until?: (index: number) => boolean;
  /** Gap between sessions, in minutes (must exceed PARAMS.sessionGapMin to start a new one). */
  sessionGapMin?: number;
}

export type Reaction =
  | 'read' | 'like' | 'save' | 'skip' | 'too_hard' | 'too_easy'
  | 'rigor' | 'fast_pass' | 'series_next' | 'ignore';

export interface SimResult {
  served: ServedCard[];
  events: Event[];
  slots: Record<string, number>;
  sessions: number;
}

const MIN = 60000;

export function simulateReader(engine: Engine, ctx: EngineContext, opts: SimOptions): SimResult {
  const rand = mulberry32(opts.seed === undefined ? 1 : opts.seed);
  const p = opts.persona || persona();
  const clock = opts.clock;
  const served: ServedCard[] = [];
  const events: Event[] = [];
  const slots: Record<string, number> = {};

  let eventSeq = 0;
  let sessionSeq = 0;
  let sessionId = '';
  let sessionMinutes = 0;
  let sessionCards = 0;
  let sessions = 0;

  const emit = (type: Event['type'], card: string | undefined, data?: Record<string, unknown>) => {
    const ev: Event = { id: 'e' + (++eventSeq).toString(36).padStart(6, '0'), t: clock.t, type, s: sessionId };
    if (card) ev.card = card;
    if (data) ev.data = data;
    events.push(ev);
    engine.apply(ev);
    return ev;
  };

  const startSession = () => {
    sessionId = 's' + (++sessionSeq);
    sessions += 1;
    sessionMinutes = 0;
    sessionCards = 0;
    emit('session_start', undefined);
  };

  const endSession = () => {
    if (!sessionId) return;
    emit('session_end', undefined, { minutes: Math.round(sessionMinutes * 10) / 10, cards: sessionCards });
    clock.t += (opts.sessionGapMin === undefined ? PARAMS.sessionGapMin + 5 : opts.sessionGapMin) * MIN;
    sessionId = '';
  };

  startSession();

  for (let i = 0; i < opts.cards; i++) {
    if (opts.until && opts.until(i)) break;
    const batch = engine.next(1);
    if (!batch.length) break;
    const s = batch[0];
    served.push(s);
    slots[s.slot] = (slots[s.slot] || 0) + 1;
    const card = ctx.cards.byId(s.id);
    if (opts.onServed) opts.onServed(s, card, i);

    if (s.slot === 'milestone') {
      emit('milestone', undefined, { id: s.milestone || s.id });
      continue;
    }
    if (s.slot === 'wire' || !card) {
      const roll = rand();
      const action = roll < 0.08 ? 'like' : roll < 0.3 ? 'skip' : roll < 0.4 ? 'open' : 'view';
      emit('wire', undefined, { wire: s.wire || s.id, action });
      clock.t += 8000;
      sessionMinutes += 8000 / MIN;
      continue;
    }

    const forced = opts.react ? opts.react(card, s, i) : null;
    consume(card, s, forced);
    sessionCards += 1;

    if (sessionCards >= p.cardsPerSession) {
      endSession();
      startSession();
    }
  }
  endSession();

  return { served, events, slots, sessions };

  // ── one card ──────────────────────────────────────────────────────────────
  function consume(card: CardMeta, s: ServedCard, forced: Reaction | null): void {
    const expected = ctx.cards.expectedReadMs(card, false);

    if (s.slot === 'recall') {
      if (rand() > p.quizParticipation) {
        emit('skip', card.id, { slot: 'recall' });
        clock.t += 3000;
        sessionMinutes += 3000 / MIN;
        return;
      }
      const correct = rand() < p.quizAccuracy;
      const answerMs = 3000 + Math.floor(rand() * 9000);
      emit('recall', card.id, { grade: correct ? 3 : 1, correct, answerMs, slot: 'recall' });
      clock.t += answerMs;
      sessionMinutes += answerMs / MIN;
      return;
    }

    const domain = card.domain;
    const level = p.level[domain] === undefined ? p.levelDefault : p.level[domain];
    const gap = card.difficulty - level;
    const likeP = p.like[domain] === undefined ? p.likeDefault : p.like[domain];

    let reaction: Reaction = forced || 'read';
    if (!forced) {
      const pTooHard = clamp(p.tooHardBase + p.tooHardSlope * Math.max(0, gap), 0, 0.85);
      const spanishBlock = card.language === 'es' && rand() > p.spanishOk;
      const pSkip = clamp(p.skipBase + (1 - likeP) * 0.25 + (spanishBlock ? 0.6 : 0), 0, 0.95);
      if (rand() < pTooHard) reaction = 'too_hard';
      else if (rand() < pSkip) reaction = rand() < 0.5 ? 'skip' : 'fast_pass';
      else if (gap <= -2 && rand() < 0.2) reaction = 'too_easy';
      else if (rand() < likeP) reaction = 'like';
      else if (rand() > p.readProbability) reaction = 'fast_pass';
      else reaction = 'read';
    }

    let dwell = 0;
    switch (reaction) {
      case 'too_hard':
        emit('too_hard', card.id, { slot: s.slot });
        dwell = Math.max(2000, expected * 0.35);
        emit('view', card.id, { dwellMs: Math.round(dwell), readFraction: 0.3, slot: s.slot });
        break;
      case 'skip':
        // The UI records the tap, then the view that closes the card — so the
        // view reads as a partial (the reader did act), not a fast pass.
        emit('skip', card.id, { slot: s.slot });
        dwell = 1200 + Math.floor(rand() * 900);
        emit('view', card.id, { dwellMs: Math.round(dwell), readFraction: 0.05, slot: s.slot });
        break;
      case 'fast_pass':
        dwell = 900 + Math.floor(rand() * 1200);
        emit('view', card.id, { dwellMs: Math.round(dwell), readFraction: 0.08, slot: s.slot });
        break;
      case 'too_easy':
        emit('too_easy', card.id, { slot: s.slot });
        dwell = expected * 0.6;
        emit('view', card.id, { dwellMs: Math.round(dwell), readFraction: 0.8, slot: s.slot });
        break;
      case 'ignore':
        dwell = 500;
        break;
      default: {
        const wantsLike = reaction === 'like' || (reaction === 'read' && rand() < likeP * 0.4);
        if (card.hasRigor && rand() < p.rigorProbability) emit('rigor_open', card.id, { slot: s.slot });
        if (wantsLike) emit('like', card.id, { slot: s.slot });
        if (rand() < p.saveProbability) emit('save', card.id, { slot: s.slot });
        if (rand() < p.sourceProbability) emit('source_open', card.id, { slot: s.slot });
        if (card.series && card.series.index < card.series.total && rand() < p.seriesNextProbability) {
          emit('series_next', card.id, { slot: s.slot });
        }
        if (rand() < p.questionProbability) {
          emit('question', card.id, { text: 'why does this work?', id: 'q-' + card.id });
        }
        dwell = expected * p.dwellFactor * (0.7 + rand() * 0.6);
        emit('view', card.id, { dwellMs: Math.round(dwell), readFraction: 0.9, slot: s.slot });
        break;
      }
    }
    clock.t += Math.round(dwell) + 800;
    sessionMinutes += (dwell + 800) / MIN;
  }
}
