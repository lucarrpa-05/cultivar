/**
 * Scoring (ENGINE.md §8).
 *
 * One multiplicative expression: interest × fit × readiness × taste in formats
 * and angles × variety × freshness × the situational boosts. Everything that
 * does not change during a single `next()` call is precomputed once into a
 * `Candidate`; only the Thompson draws, the trail-dependent terms and the
 * jitter are recomputed per slot. That is what keeps `next(20)` under 30 ms
 * with 2,000 cards.
 */

import type { CardMeta, EngineState, SlotKind } from '../types.ts';
import type { Sampler } from './bandit.ts';
import type { EngineContext } from './context.ts';
import { DAY_MS, parseDate } from './context.ts';
import { fit, targetOf } from './difficulty.ts';
import type { MasteryView } from './mastery.ts';
import { PARAMS } from './params.ts';
import { readiness } from './readiness.ts';
import { afterHeavyBoost, languageQuota, novelty, rhythm, type Trail } from './rhythm.ts';
import { zoneBoost } from './zone.ts';

export interface Candidate {
  card: CardMeta;
  area: string;
  /** difficulty target of the card's topic at plan time */
  d: number;
  fit: number;
  ready: number;
  /** everything static for the whole plan, multiplied together */
  base: number;
  /** why-string support */
  reasons: { focus: boolean; context: boolean; answer: boolean; callback: boolean; fresh: number };
}

export interface PlanScope {
  state: EngineState;
  ctx: EngineContext;
  mv: MasteryView;
  now: number;
  sampler: Sampler;
  trail: Trail;
  inZone: boolean;
  budget: number;
  openQuestions: Record<string, true>;
  contextTag: string;
  spanishTarget: number;
  /** ×1 normally; the cold-start lean toward math/AI during the first session (§13). */
  homeBoost: number;
  /** the obsession's area, exempt from the same-area novelty penalty (§11/§12). */
  zoneArea: string;
}

/**
 * The largest the dynamic (per-slot) half of the score can ever be: every
 * Thompson draw and every novelty term is ≤ 1, so only the language boost, the
 * after-heavy nudge and the jitter can push a candidate above its `base`.
 * `best()` sorts by `base` and stops once `base × this` cannot win.
 */
export const SCORE_BOUND =
  PARAMS.languageLowBoost * PARAMS.afterHeavyLightBoost * (1 + PARAMS.randomJitter);

/** exp(−ageDays / halfLife) for dated cards; 1 for everything evergreen. */
function recency(card: CardMeta, now: number): number {
  if (card.format !== 'news' && card.evergreen) return 1;
  const dated = parseDate((card.dates && card.dates.event) || (card.dates && card.dates.written));
  if (isNaN(dated)) return 1;
  const ageDays = Math.max(0, (now - dated) / DAY_MS);
  const half = card.format === 'news' ? PARAMS.newsHalfLifeDays : PARAMS.wireHalfLifeDays;
  return Math.exp(-ageDays / half);
}

export function openQuestionsOf(state: EngineState): Record<string, true> {
  const out: Record<string, true> = {};
  for (const q of state.questions) if (q.status === 'open') out[q.id] = true;
  return out;
}

/** Build the per-plan static half of the score for one card. */
export function makeCandidate(card: CardMeta, scope: PlanScope): Candidate {
  const { state, ctx, mv, now } = scope;
  const area = ctx.cards.area(card.id);
  const d = targetOf(state, ctx, card.topic);
  const fitV = fit(card.difficulty, d, scope.inZone);
  const readyV = readiness(card, ctx, mv);

  let base = fitV * readyV * recency(card, now) * zoneBoost(state, ctx, area);

  let focusHit = false;
  if (state.focus && (state.focus === card.topic || state.focus === area || state.focus === card.domain)) {
    base *= PARAMS.focusBoost;
    focusHit = true;
  }
  let contextHit = false;
  if (scope.contextTag && card.context === scope.contextTag) {
    base *= PARAMS.contextBoost;
    contextHit = true;
  }
  let answerHit = false;
  if (card.answersQuestion) {
    if (scope.openQuestions[card.answersQuestion]) {
      base *= PARAMS.answerBoost;
      answerHit = true;
    } else {
      // §7: written for this reader even when the question is closed — a mild nudge.
      base *= 1 + (PARAMS.answerBoost - 1) * 0.25;
    }
  }
  const callbackHit = card.format === 'callback' && !!card.callback;
  const ts = state.topics[card.topic];
  const seenT = ts ? ts.seen : 0;
  base *= 1 + PARAMS.exploreBonus / Math.sqrt(1 + seenT);
  if (scope.homeBoost !== 1 && PARAMS.coldStartHomeDomains.indexOf(card.domain) >= 0) base *= scope.homeBoost;

  return {
    card,
    area,
    d,
    fit: fitV,
    ready: readyV,
    base,
    reasons: { focus: focusHit, context: contextHit, answer: answerHit, callback: callbackHit, fresh: recency(card, now) },
  };
}

/** θ_t, with the secondary-topic blend from §8. */
export function interestOf(card: CardMeta, sampler: Sampler): number {
  const primary = sampler.topic(card.topic);
  if (!card.topics || card.topics.length === 0) return primary;
  let sum = 0;
  for (const t of card.topics) sum += sampler.topic(t);
  const secondary = sum / card.topics.length;
  return PARAMS.secondaryTopicMain * primary + PARAMS.secondaryTopicSecondary * secondary;
}

/**
 * The full score for one candidate in one slot. `thetaOverride` implements the
 * §9 rule that backfill cards score with a fixed 0.8 interest so they do not
 * lose to whatever the reader is currently obsessed with.
 */
export function score(
  cand: Candidate,
  scope: PlanScope,
  slot: SlotKind,
  thetaOverride?: number,
  ignoreRhythm?: boolean,
): number {
  const card = cand.card;
  if (!ignoreRhythm && rhythm(scope.trail, card, scope.ctx, slot, scope.budget, scope.inZone) === 0) return 0;
  const theta = thetaOverride !== undefined ? thetaOverride : interestOf(card, scope.sampler);
  let v = cand.base * theta;
  v *= scope.sampler.format(card.format);
  v *= scope.sampler.anglesOf(card.angles);
  v *= novelty(scope.trail, card, scope.ctx, slot, scope.zoneArea);
  v *= languageQuota(scope.trail, card, scope.spanishTarget);
  v *= afterHeavyBoost(scope.trail, card);
  v *= 1 + PARAMS.randomJitter * scope.ctx.random();
  return v;
}
