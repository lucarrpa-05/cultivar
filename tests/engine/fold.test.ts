/**
 * Unit tests for the fold (ENGINE.md §3): one per event type, plus undo, the
 * daily discounting and the JSON-round-trip invariant.
 */

import { describe, expect, it } from 'vitest';
import { PARAMS } from '../../src/engine/params.ts';
import { createMasteryView } from '../../src/engine/mastery.ts';
import { initialState, replay } from '../../src/engine/index.ts';
import type { CardMeta, EngineState, Event } from '../../src/types.ts';
import { makeHarness, type Harness } from './fixtures/harness.ts';

const DAY = 86400000;
let seq = 0;

function ev(type: Event['type'], t: number, card?: string, data?: Record<string, unknown>, s = 'u1'): Event {
  const out: Event = { id: 'E' + (++seq), t, type, s };
  if (card) out.card = card;
  if (data) out.data = data;
  return out;
}

/** A plain idea card with a couple of angles, for arithmetic we can check by hand. */
function pick(h: Harness, predicate: (c: CardMeta) => boolean): CardMeta {
  const c = h.index.cards.find(predicate);
  if (!c) throw new Error('no card matches');
  return c;
}

function arm(state: EngineState, id: string) {
  return state.topics[id].interest;
}

/** A topic's state without the timestamps, which `undo` deliberately leaves alone. */
function shape(state: EngineState, id: string): string {
  const ts = state.topics[id];
  const r = (v: number) => Math.round(v * 1e9) / 1e9;
  return JSON.stringify({
    mastery: r(ts.mastery),
    points: r(ts.points),
    difficulty: r(ts.difficulty),
    a: r(ts.interest.a),
    b: r(ts.interest.b),
    seen: ts.seen,
    positives: ts.positives,
    negatives: ts.negatives,
    tooHard: ts.tooHard,
  });
}

describe('fold — one test per event type (§3)', () => {
  it('view: a read gives valence 0.6, one point and a place in `seen`', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.format === 'fact' && c.difficulty === 3);
    const before = { ...arm(h.engine.state(), card.topic) };
    h.engine.apply(ev('view', h.clock.t, card.id, { dwellMs: 60000, readFraction: 0.9, slot: 'progress' }));

    const st = h.engine.state();
    const a = arm(st, card.topic);
    expect(a.a - before.a).toBeCloseTo(PARAMS.valence.viewRead, 6);
    expect(a.b - before.b).toBeCloseTo(1 - PARAMS.valence.viewRead, 6);
    const scale = PARAMS.pointScaleBase + PARAMS.pointScalePerK * card.difficulty;
    expect(st.topics[card.topic].points).toBeCloseTo(
      initialState(h.deps).topics[card.topic].points + scale,
      6,
    );
    expect(st.seen[card.id].views).toBe(1);
    expect(st.metrics.cardsSeen).toBe(1);
    expect(st.recent).toEqual([card.id]);
  });

  it('pass: an unconfirmed card advances its slot and teaches disinterest without a read', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.domain === 'bio' && c.format !== 'callback');
    const before = { ...arm(h.engine.state(), card.topic) };
    h.engine.apply(ev('session_start', h.clock.t));
    h.engine.apply(ev('pass', h.clock.t + 100, card.id,
      { slot: 'serendipity', dwellMs: 1200, readFraction: 0.1 }));
    const st = h.engine.state();
    expect(st.seen[card.id]).toBeUndefined();
    expect(st.metrics.cardsSeen).toBe(0);
    expect(st.session?.index).toBe(1);
    expect(st.session?.slots.serendipity).toBe(1);
    expect(arm(st, card.topic).a - before.a).toBeCloseTo(PARAMS.valence.viewFast);
    expect(st.surprise.bio.n).toBe(1);
  });

  it('migration repairs only the original slotless backfill, even when repeated in a replay', () => {
    const h = makeHarness({ seed: 6 });
    const mv = createMasteryView(h.engine.state(), h.ctx, h.clock.t);
    const flagged = pick(h, (c) => c.topic.startsWith('math.topology.')
      && c.difficulty === 4 && c.prerequisites.some((p) => mv.of(p) < PARAMS.backfillThreshold));
    const t = h.clock.t;
    const repairData = { kind: 'legacy-slot-backfill', entries: [{ because: flagged.id, created: t }] };
    const events: Event[] = [
      ev('too_hard', t, flagged.id),
      ev('migration', t + 1, undefined, repairData),
      ev('migration', t + 2, undefined, repairData),
      ev('too_hard', t + 3, flagged.id, { slot: 'progress' }),
    ];
    const state = replay(h.deps, events);
    const old = state.backfill.filter((b) => b.because === flagged.id && b.created === t);
    const fresh = state.backfill.filter((b) => b.because === flagged.id && b.created === t + 3);
    expect(old.length).toBeGreaterThan(0);
    expect(old.every((b) => b.done)).toBe(true);
    expect(fresh.length).toBeGreaterThan(0);
    expect(fresh.every((b) => !b.done)).toBe(true);
    expect(replay(h.deps, events).backfill).toEqual(state.backfill);
  });

  it.each(['like', 'save', 'recall'] as const)('%s on an answer card closes its question', (action) => {
    const base = makeHarness({ seed: 5 });
    const answer: CardMeta = { ...base.index.cards[0], id: 'math.answer-test',
      answersQuestion: 'q-test', hasRecall: true };
    const h = makeHarness({ seed: 5, index: { ...base.index, count: base.index.count + 1,
      cards: [...base.index.cards, answer] } });
    h.engine.apply(ev('question', h.clock.t, undefined, { id: 'q-test', text: 'Explain it' }));
    h.engine.apply(ev(action, h.clock.t + 1, answer.id,
      action === 'recall' ? { grade: 3, correct: true } : undefined));
    expect(h.engine.state().questions[0]).toMatchObject({ status: 'answered', answerCard: answer.id });
  });

  it('view: hierarchy gets 0.5× on the area and 0.25× on the domain', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.domain === 'math' && !c.topics);
    const area = h.ctx.graph.area(card.topic);
    const domain = card.domain;
    const before = {
      area: { ...arm(h.engine.state(), area) },
      domain: { ...arm(h.engine.state(), domain) },
    };
    h.engine.apply(ev('view', h.clock.t, card.id, { dwellMs: 60000, readFraction: 0.9 }));
    const st = h.engine.state();
    expect(arm(st, area).a - before.area.a).toBeCloseTo(PARAMS.valence.viewRead * PARAMS.areaArmWeight, 6);
    expect(arm(st, domain).a - before.domain.a).toBeCloseTo(PARAMS.valence.viewRead * PARAMS.domainArmWeight, 6);
  });

  it('view: a sub-2.5 s glance with no other action is a fast pass', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.words.body > 120);
    const before = { ...arm(h.engine.state(), card.topic) };
    h.engine.apply(ev('view', h.clock.t, card.id, { dwellMs: PARAMS.fastPassMs - 500, readFraction: 0.05 }));
    const st = h.engine.state();
    expect(arm(st, card.topic).a - before.a).toBeCloseTo(PARAMS.valence.viewFast, 6);
    expect(st.topics[card.topic].negatives).toBe(1);
    expect(st.negStreak).toBe(1);
  });

  it('view: a longer partial read scores 0.3 and no points', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.words.body > 150);
    const before = { ...arm(h.engine.state(), card.topic) };
    const points = h.engine.state().topics[card.topic].points;
    h.engine.apply(ev('view', h.clock.t, card.id, { dwellMs: 6000, readFraction: 0.2 }));
    const st = h.engine.state();
    expect(arm(st, card.topic).a - before.a).toBeCloseTo(PARAMS.valence.viewPartial, 6);
    expect(st.topics[card.topic].points).toBeCloseTo(points, 6);
  });

  it('like drifts the difficulty target toward the card; unlike reverses it', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.difficulty === 4 && c.domain === 'math');
    const d0 = h.engine.state().topics[card.topic].difficulty;
    h.engine.apply(ev('like', h.clock.t, card.id));
    const st = h.engine.state();
    expect(st.topics[card.topic].difficulty).toBeCloseTo(
      d0 + PARAMS.driftRate * (card.difficulty + PARAMS.driftOffset - d0), 6,
    );
    expect(st.seen[card.id].liked).toBe(true);
    expect(st.metrics.likes).toBe(1);

    h.engine.apply(ev('unlike', h.clock.t + 1000, card.id));
    const st2 = h.engine.state();
    expect(st2.seen[card.id].liked).toBe(false);
    expect(st2.metrics.likes).toBe(0);
    expect(st2.topics[card.topic].difficulty).toBeCloseTo(d0, 6);
    // Net effect on the arm is the weaker r = 0.3 signal, not the like.
    const a = arm(st2, card.topic);
    expect(a.a).toBeCloseTo(1 + PARAMS.valence.unlike, 6);
  });

  it('save adds to `saved`; unsave removes it', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.format === 'story');
    h.engine.apply(ev('save', h.clock.t, card.id));
    expect(h.engine.state().saved).toEqual([card.id]);
    expect(h.engine.state().metrics.saves).toBe(1);
    h.engine.apply(ev('unsave', h.clock.t + 1000, card.id));
    expect(h.engine.state().saved).toEqual([]);
    expect(h.engine.state().seen[card.id].saved).toBe(false);
  });

  it('skip lowers the target only when the card was above it', () => {
    const h = makeHarness({ seed: 2 });
    const easy = pick(h, (c) => c.domain === 'math' && c.difficulty === 2);
    const d0 = h.engine.state().topics[easy.topic].difficulty;
    h.engine.apply(ev('skip', h.clock.t, easy.id));
    expect(h.engine.state().topics[easy.topic].difficulty).toBeCloseTo(d0, 6);

    const hard = pick(h, (c) => c.domain === 'math' && c.difficulty === 5);
    const d1 = h.engine.state().topics[hard.topic].difficulty;
    h.engine.apply(ev('skip', h.clock.t + 1000, hard.id));
    expect(h.engine.state().topics[hard.topic].difficulty).toBeCloseTo(d1 - PARAMS.skipDrop, 6);
    expect(h.engine.state().metrics.skips).toBe(2);
  });

  it('too_easy raises the target up the hierarchy and pays two points', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.domain === 'econ' && c.difficulty === 1);
    const area = h.ctx.graph.area(card.topic);
    const d = {
      topic: h.engine.state().topics[card.topic].difficulty,
      area: h.engine.state().topics[area].difficulty,
      domain: h.engine.state().topics['econ'].difficulty,
    };
    const p0 = h.engine.state().topics[card.topic].points;
    h.engine.apply(ev('too_easy', h.clock.t, card.id));
    const st = h.engine.state();
    expect(st.topics[card.topic].difficulty).toBeCloseTo(d.topic + PARAMS.tooEasyRise.topic, 6);
    expect(st.topics[area].difficulty).toBeCloseTo(d.area + PARAMS.tooEasyRise.area, 6);
    expect(st.topics['econ'].difficulty).toBeCloseTo(d.domain + PARAMS.tooEasyRise.domain, 6);
    const scale = PARAMS.pointScaleBase + PARAMS.pointScalePerK * card.difficulty;
    expect(st.topics[card.topic].points).toBeCloseTo(p0 + PARAMS.points.tooEasy * scale, 6);
    expect(st.metrics.tooEasy).toBe(1);
  });

  it('rigor_open and source_open are the strongest interest signals', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.hasRigor && c.layer === 'both');
    h.engine.apply(ev('rigor_open', h.clock.t, card.id));
    expect(h.engine.state().seen[card.id].rigorOpened).toBe(true);
    expect(h.engine.state().pendingMilestones).toContain('first-rigor');
    const a1 = { ...arm(h.engine.state(), card.topic) };
    h.engine.apply(ev('source_open', h.clock.t + 1000, card.id));
    const a2 = arm(h.engine.state(), card.topic);
    expect(a2.a - a1.a).toBeCloseTo(PARAMS.valence.sourceOpen, 6);
  });

  it('series_next marks the series pending and advances progress', () => {
    const h = makeHarness({ seed: 2 });
    const ep1 = pick(h, (c) => !!c.series && c.series.index === 1);
    h.engine.apply(ev('view', h.clock.t, ep1.id, { dwellMs: 60000, readFraction: 0.9 }));
    h.engine.apply(ev('series_next', h.clock.t + 1000, ep1.id));
    const prog = h.engine.state().series[ep1.series!.id];
    expect(prog.pending).toBe(true);
    expect(prog.lastIndex).toBe(1);
    expect(prog.paused).toBe(false);
  });

  it('recall: grades move points in the right direction and enter FSRS', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.hasRecall && c.difficulty === 3);
    h.engine.apply(ev('view', h.clock.t, card.id, { dwellMs: 60000, readFraction: 0.9 }));
    expect(h.engine.state().fsrs[card.id]).toBeTruthy();
    const p0 = h.engine.state().topics[card.topic].points;
    h.engine.apply(ev('recall', h.clock.t + DAY, card.id, { grade: 3, correct: true }));
    const st = h.engine.state();
    const scale = PARAMS.pointScaleBase + PARAMS.pointScalePerK * card.difficulty;
    expect(st.topics[card.topic].points).toBeCloseTo(p0 + PARAMS.points.recallGood * scale, 6);
    expect(st.metrics.recallAnswered).toBe(1);
    expect(st.metrics.recallCorrect).toBe(1);
    expect(st.recallStreak).toBe(1);
    expect(st.fsrs[card.id].reps).toBe(1);

    // A wrong answer queues a light re-read and resets the streak.
    const other = pick(h, (c) => c.hasRecall && c.id !== card.id);
    h.engine.apply(ev('view', h.clock.t + DAY, other.id, { dwellMs: 60000, readFraction: 0.9 }));
    h.engine.apply(ev('recall', h.clock.t + 2 * DAY, other.id, { grade: 1, correct: false }));
    expect(h.engine.state().reread).toContain(other.id);
    expect(h.engine.state().recallStreak).toBe(0);
  });

  it('question records an open question and a strong signal', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.format === 'idea');
    const before = { ...arm(h.engine.state(), card.topic) };
    h.engine.apply(ev('question', h.clock.t, card.id, { text: 'why does the peak happen at interpolation?', id: 'q-1' }));
    const st = h.engine.state();
    expect(st.questions).toHaveLength(1);
    expect(st.questions[0].status).toBe('open');
    expect(st.questions[0].topic).toBe(card.topic);
    expect(arm(st, card.topic).a - before.a).toBeCloseTo(PARAMS.valence.question, 6);
  });

  it('wire updates the source arm and the news format arm', () => {
    const h = makeHarness({ seed: 2 });
    const news = { ...h.engine.state().formats['news'] };
    h.engine.apply(ev('wire', h.clock.t, undefined, { wire: 'w1', source: 'arxiv', action: 'like' }));
    const st = h.engine.state();
    expect(st.sources['arxiv']).toBeTruthy();
    expect(st.sources['arxiv'].a).toBeCloseTo(1 + PARAMS.valence.wireLike, 6);
    expect(st.formats['news'].a - news.a).toBeCloseTo(PARAMS.valence.wireLike, 6);
  });

  it('focus and settings write straight through', () => {
    const h = makeHarness({ seed: 2 });
    h.engine.apply({ id: 'f1', t: h.clock.t, type: 'focus', s: 'u1', topic: 'math.topology' });
    expect(h.engine.state().focus).toBe('math.topology');
    h.engine.apply({ id: 'empty-focus', t: h.clock.t + 1, type: 'focus', s: 'u1',
      topic: 'niche.games.puzzles', data: { available: false } });
    expect(h.engine.state().focus).toBe('math.topology');
    h.engine.apply({ id: 'f2', t: h.clock.t + 1, type: 'focus', s: 'u1' });
    expect(h.engine.state().focus).toBeUndefined();

    h.engine.apply({ id: 'g1', t: h.clock.t + 2, type: 'settings', s: 'u1', data: { patch: { spanishShare: 0.2, quizFrequency: 'less', goalMinutes: 15 } } });
    const st = h.engine.state();
    expect(st.settings.spanishShare).toBe(0.2);
    expect(st.settings.quizFrequency).toBe('less');
    expect(st.streak.goalMinutes).toBe(15);
  });

  it('session_start / session_end drive the streak and the metrics', () => {
    const h = makeHarness({ seed: 2 });
    h.engine.apply(ev('session_start', h.clock.t, undefined, undefined, 'd1'));
    expect(h.engine.session().mode).toBe('daily');
    h.engine.apply(ev('session_end', h.clock.t + 12 * 60000, undefined, { minutes: 12, cards: 9 }, 'd1'));
    const st = h.engine.state();
    expect(st.metrics.sessions).toBe(1);
    expect(st.metrics.totalMinutes).toBe(12);
    expect(st.streak.current).toBe(1);
    expect(st.streak.best).toBe(1);
    expect(st.days!.length).toBe(1);
    expect(st.days![0].sessions).toEqual([12]);
    expect(h.engine.session().id).toBe('');
  });

  it('milestone events move a pending id into `milestones`', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.format === 'idea');
    h.engine.apply(ev('like', h.clock.t, card.id));
    expect(h.engine.state().pendingMilestones).toContain('first-like');
    h.engine.apply(ev('milestone', h.clock.t + 1, undefined, { id: 'first-like' }));
    expect(h.engine.state().milestones).toContain('first-like');
    expect(h.engine.state().pendingMilestones).not.toContain('first-like');
  });

  it('undo reverses a like, a save, a skip and a too_easy', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.domain === 'math' && c.difficulty === 5);
    const snapshot = shape(h.engine.state(), card.topic);

    h.engine.apply({ id: 'L', t: h.clock.t, type: 'like', s: 'u1', card: card.id });
    h.engine.apply({ id: 'UL', t: h.clock.t + 1, type: 'undo', s: 'u1', data: { of: 'L' } });
    expect(shape(h.engine.state(), card.topic)).toBe(snapshot);

    h.engine.apply({ id: 'S', t: h.clock.t + 2, type: 'save', s: 'u1', card: card.id });
    h.engine.apply({ id: 'US', t: h.clock.t + 3, type: 'undo', s: 'u1', data: { of: 'S' } });
    expect(h.engine.state().saved).toEqual([]);
    expect(shape(h.engine.state(), card.topic)).toBe(snapshot);

    h.engine.apply({ id: 'K', t: h.clock.t + 4, type: 'skip', s: 'u1', card: card.id });
    h.engine.apply({ id: 'UK', t: h.clock.t + 5, type: 'undo', s: 'u1', data: { of: 'K' } });
    expect(h.engine.state().metrics.skips).toBe(0);
    expect(shape(h.engine.state(), card.topic)).toBe(snapshot);

    h.engine.apply({ id: 'E', t: h.clock.t + 6, type: 'too_easy', s: 'u1', card: card.id });
    h.engine.apply({ id: 'UE', t: h.clock.t + 7, type: 'undo', s: 'u1', data: { of: 'E' } });
    expect(h.engine.state().metrics.tooEasy).toBe(0);
    expect(shape(h.engine.state(), card.topic)).toBe(snapshot);
  });

  it('a new local day discounts every arm toward Beta(1,1)', () => {
    const h = makeHarness({ seed: 2 });
    const card = pick(h, (c) => c.domain === 'math');
    h.engine.apply(ev('like', h.clock.t, card.id));
    const before = { ...arm(h.engine.state(), card.topic) };
    expect(before.a).toBeGreaterThan(1);

    // Any event on a later day triggers the decay; use a different card so the
    // arm under test is untouched by the event itself.
    const other = pick(h, (c) => c.domain === 'hist');
    h.engine.apply(ev('view', h.clock.t + 3 * DAY, other.id, { dwellMs: 100, readFraction: 0 }));
    const after = arm(h.engine.state(), card.topic);
    const g = Math.pow(PARAMS.discountGamma, 3);
    expect(after.a).toBeCloseTo(1 + (before.a - 1) * g, 6);
    expect(after.b).toBeCloseTo(1 + (before.b - 1) * g, 6);
  });

  it('state survives a JSON round trip unchanged', () => {
    const h = makeHarness({ seed: 2 });
    const cards = h.index.cards.slice(0, 12);
    let t = h.clock.t;
    h.engine.apply(ev('session_start', t, undefined, undefined, 'j1'));
    for (const c of cards) {
      t += 60000;
      h.engine.apply(ev('view', t, c.id, { dwellMs: 50000, readFraction: 0.9, slot: 'progress' }, 'j1'));
      h.engine.apply(ev('like', t + 1, c.id, undefined, 'j1'));
    }
    h.engine.apply(ev('session_end', t + 60000, undefined, { minutes: 14, cards: 12 }, 'j1'));

    const json = JSON.stringify(h.engine.state());
    expect(JSON.stringify(JSON.parse(json))).toBe(json);
  });

  it('replay is order-independent for the same event set', () => {
    const h = makeHarness({ seed: 2 });
    const cards = h.index.cards.slice(0, 20);
    const events: Event[] = [];
    let t = h.clock.t;
    for (const c of cards) {
      t += 60000;
      events.push(ev('view', t, c.id, { dwellMs: 50000, readFraction: 0.9, slot: 'progress' }, 'j1'));
    }
    const deps = { index: h.index, taxonomy: h.deps.taxonomy, priors: h.deps.priors, now: () => t };
    const a = replay(deps, events);
    const b = replay(deps, events.slice().reverse());
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });
});
