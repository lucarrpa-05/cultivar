/**
 * "Why this card?" (ENGINE.md §16).
 *
 * Up to three human sentences per served card, built from the factors that
 * actually dominated the score, using names from the taxonomy and dates from
 * state. Never "because of your preferences" — always something checkable:
 * "Episode 3 of Taming infinity", "You flagged this on Sep 21".
 */

import type { EngineState, ServedCard, SlotKind, WireItem } from '../types.ts';
import type { EngineContext } from './context.ts';
import { DAY_MS, shortDate } from './context.ts';
import { milestoneCopy } from './milestones.ts';
import { PARAMS } from './params.ts';
import type { Candidate, PlanScope } from './score.ts';

const ANGLE_PLURAL: Record<string, string> = {
  paradox: 'paradoxes',
  history: 'history',
  feud: 'feuds',
  mistake: 'famous mistakes',
  connection: 'connections between distant things',
  tool: 'tools you can use',
  'open-problem': 'open problems',
  weird: 'weird true things',
  beautiful: 'beautiful arguments',
  practical: 'practical ideas',
  human: 'the people behind the ideas',
  numbers: 'striking numbers',
  origin: 'origin stories',
  prediction: 'predictions that came true',
};

function days(from: number, to: number): number {
  return Math.max(0, Math.round((to - from) / DAY_MS));
}

function plural(n: number, one: string, many: string): string {
  return n === 1 ? one : many;
}

export function explainCard(cand: Candidate, slot: SlotKind, scope: PlanScope, extra?: Partial<ServedCard>): string[] {
  const { state, ctx, now } = scope;
  const card = cand.card;
  const out: string[] = [];
  const push = (s: string) => {
    if (s && out.indexOf(s) < 0 && out.length < 3) out.push(s);
  };

  // 1 ── the slot itself is usually the most honest reason.
  switch (slot) {
    case 'backfill': {
      const because = extra && extra.backfillFor ? extra.backfillFor : '';
      let when = 0;
      for (const b of state.backfill) if (b.because === because) when = b.created;
      push(when
        ? 'Groundwork for the card you flagged on ' + shortDate(when)
        : 'Groundwork for something you flagged as too advanced');
      break;
    }
    case 'revisit': {
      const when = extra && extra.revisitOf ? extra.revisitOf.flaggedAt : 0;
      push(when ? 'You flagged this on ' + shortDate(when) + '. Try it now.' : 'You flagged this one. Try it now.');
      break;
    }
    case 'series': {
      if (card.series) push('Episode ' + card.series.index + ' of ' + card.series.title);
      break;
    }
    case 'recall': {
      const seen = state.seen[card.id];
      const n = seen ? days(seen.last, now) : 0;
      push(n > 0
        ? 'Due for a quick recall: last seen ' + n + ' ' + plural(n, 'day', 'days') + ' ago'
        : 'Due for a quick recall');
      break;
    }
    case 'serendipity': {
      const angle = topAngle(scope, card.angles);
      push(angle ? 'Surprise: you tend to like ' + (ANGLE_PLURAL[angle] || angle) : 'Surprise: something from further afield');
      break;
    }
    case 'news': {
      const n = card.dates.event ? days(Date.parse(card.dates.event + 'T00:00:00'), now) : 0;
      push(n > 0 ? 'Fresh — ' + n + ' ' + plural(n, 'day', 'days') + ' old' : 'Fresh today');
      break;
    }
    case 'answer': {
      const q = card.answersQuestion ? findQuestion(scope, card.answersQuestion) : '';
      push(q ? 'You asked: “' + q + '”' : 'An answer to something you asked');
      break;
    }
    case 'context':
      push('For what you’re working on');
      break;
    case 'open':
      push('A good way in');
      break;
    case 'close':
      push('One to end on');
      break;
    case 'light':
      push('A breather');
      break;
    default:
      break;
  }

  // 2 ── a callback always says what it connects to, whatever slot carried it.
  if (card.format === 'callback' && card.callback) {
    const fromName = ctx.graph.name(card.callback.from);
    let when = 0;
    for (const c of ctx.cards.byTopic(card.callback.from)) {
      const s = state.seen[c.id];
      if (s && s.last > when) when = s.last;
    }
    push(when
      ? 'Connects to ' + fromName + ', which you read on ' + shortDate(when)
      : 'Connects to ' + fromName);
  }

  // 3 ── the zone / widening / focus story.
  if (state.zone) {
    const areaName = ctx.graph.name(state.zone.area);
    if (cand.area === state.zone.area) push('You’re deep in ' + areaName + '; staying with it');
  } else if ((state.widen || 0) > 0 && state.widenFrom && cand.area !== state.widenFrom) {
    push('Widening out from ' + ctx.graph.name(state.widenFrom));
  }
  if (state.focus && (state.focus === card.topic || state.focus === cand.area)) {
    push('You’re focused on ' + ctx.graph.name(state.focus));
  }

  // 4 ── interest, from the reader's own record on this topic.
  const ts = state.topics[card.topic] || state.topics[cand.area];
  if (ts) {
    const tried = ts.positives + ts.negatives;
    if (tried >= 3 && ts.positives >= 2) {
      const name = ctx.graph.name(state.topics[card.topic] ? card.topic : cand.area).toLowerCase();
      push('You’ve liked ' + ts.positives + ' of your last ' + tried + ' ' + name + ' cards');
    }
  }

  // 5 ── level fit.
  if (out.length < 3) {
    const areaName = ctx.graph.name(cand.area || card.topic);
    push('Matches your level in ' + areaName + ' (' + Math.round(cand.d) + ' of 5)');
  }

  // 6 ── the language quota, stated honestly.
  if (card.language === 'es' && out.length < 3) {
    const share = spanishShare(scope);
    push('En español, because you’re at ' + Math.round(share * 100) + '% and asked for '
      + Math.round(scope.spanishTarget * 100) + '%');
  }

  if (!out.length) push('Worth your time');
  return out;
}

export function explainMilestone(id: string, ctx: EngineContext, state: EngineState): string[] {
  const colon = id.indexOf(':');
  const name = colon > 0 ? ctx.graph.name(id.slice(colon + 1)) : '';
  let when = state.updatedAt;
  for (const item of state.revisit) if (item.resolved) when = item.flaggedAt;
  return [milestoneCopy(id, name, when)];
}

export function explainWire(item: WireItem, now: number): string[] {
  const dated = Date.parse(item.published);
  const n = isNaN(dated) ? 0 : days(dated, now);
  if (item.kind === 'onthisday') {
    const year = isNaN(dated) ? '' : String(new Date(dated).getFullYear());
    return year ? ['Today in ' + year] : ['Today in history'];
  }
  return [n > 0
    ? 'Fresh from ' + item.sourceName + ', ' + n + ' ' + plural(n, 'day', 'days') + ' old'
    : 'Fresh from ' + item.sourceName + ', today'];
}

// ── helpers ─────────────────────────────────────────────────────────────────

function topAngle(scope: PlanScope, angles: string[] | undefined): string {
  if (!angles || !angles.length) return '';
  let best = '';
  let bestMean = -1;
  for (const a of angles.slice(0, PARAMS.maxAngles)) {
    const arm = scope.state.angles[a];
    if (!arm) continue;
    const mean = arm.a / (arm.a + arm.b);
    if (mean > bestMean) {
      bestMean = mean;
      best = a;
    }
  }
  return best;
}

function findQuestion(scope: PlanScope, id: string): string {
  for (const q of scope.state.questions) if (q.id === id) return q.text;
  return '';
}

function spanishShare(scope: PlanScope): number {
  const entries = scope.trail.entries.slice(-PARAMS.languageWindow);
  if (!entries.length) return 0;
  let es = 0;
  for (const e of entries) if (e.language === 'es') es++;
  return es / entries.length;
}
