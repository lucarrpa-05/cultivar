/**
 * Unit tests for the pieces the simulation tests lean on: bandit arithmetic,
 * mastery saturation, FSRS monotonicity, the taxonomy graph, the knowledge map
 * and the "why this card" strings.
 */

import { describe, expect, it } from 'vitest';
import {
  armMean, discountArm, newArm, reverseArm, sampleArm, sampleFlat, shrunkMean, updateArm,
} from '../../src/engine/bandit.ts';
import { enterFsrs, gradeFsrs, hasMemory, overdueDays, retrievability } from '../../src/engine/fsrs.ts';
import {
  cardCount, createMasteryView, masteryFromPoints, priorMastery, priorPoints, saturation,
} from '../../src/engine/mastery.ts';
import { PARAMS } from '../../src/engine/params.ts';
import { hashString, mulberry32, sampleBeta, sampleGamma } from '../../src/engine/rng.ts';
import { fit, targetOf } from '../../src/engine/difficulty.ts';
import { priorFor } from '../../src/engine/taxonomy.ts';
import type { WireItem } from '../../src/types.ts';
import { makeHarness, sharedIndex } from './fixtures/harness.ts';

const DAY = 86400000;

describe('rng', () => {
  it('mulberry32 is deterministic and uniform enough', () => {
    const a = mulberry32(12345);
    const b = mulberry32(12345);
    const draws: number[] = [];
    for (let i = 0; i < 2000; i++) {
      const x = a();
      expect(x).toBe(b());
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
      draws.push(x);
    }
    const mean = draws.reduce((s, v) => s + v, 0) / draws.length;
    expect(Math.abs(mean - 0.5)).toBeLessThan(0.03);
  });

  it('hashString is stable and spreads', () => {
    expect(hashString('math.topology')).toBe(hashString('math.topology'));
    expect(hashString('math.topology')).not.toBe(hashString('math.algebra'));
  });

  it('sampleGamma has mean ≈ shape', () => {
    const rand = mulberry32(7);
    for (const k of [0.5, 1, 3, 9]) {
      let sum = 0;
      const n = 4000;
      for (let i = 0; i < n; i++) sum += sampleGamma(rand, k);
      expect(Math.abs(sum / n - k)).toBeLessThan(0.12 * Math.max(1, Math.sqrt(k)));
    }
  });

  it('sampleBeta has mean ≈ a/(a+b) and stays inside (0,1)', () => {
    const rand = mulberry32(11);
    for (const [a, b] of [[1, 1], [8, 2], [2, 8], [30, 10]] as [number, number][]) {
      let sum = 0;
      const n = 4000;
      for (let i = 0; i < n; i++) {
        const x = sampleBeta(rand, a, b);
        expect(x).toBeGreaterThan(0);
        expect(x).toBeLessThan(1);
        sum += x;
      }
      expect(Math.abs(sum / n - a / (a + b))).toBeLessThan(0.02);
    }
  });
});

describe('bandit (§3, §6)', () => {
  it('updateArm and reverseArm are inverses', () => {
    const arm = newArm(3, 2, 0);
    const before = JSON.stringify(arm);
    updateArm(arm, 0.7, 0.5, 100);
    expect(JSON.stringify(arm)).not.toBe(before);
    reverseArm(arm, 0.7, 0.5);
    expect(arm.a).toBeCloseTo(3, 9);
    expect(arm.b).toBeCloseTo(2, 9);
    expect(arm.n).toBeCloseTo(0, 9);
  });

  it('an arm of likes converges on 1 and of skips on 0', () => {
    const liked = newArm(1, 1, 0);
    const skipped = newArm(1, 1, 0);
    for (let i = 0; i < 40; i++) {
      updateArm(liked, 1, 1, i);
      updateArm(skipped, 0.1, 1, i);
    }
    expect(armMean(liked)).toBeGreaterThan(0.9);
    expect(armMean(skipped)).toBeLessThan(0.2);
  });

  it('shrinkage pulls an empty arm to its parent and lets evidence pull it back', () => {
    const empty = newArm(1, 1, 0);
    expect(shrunkMean(empty, 0.9, PARAMS.shrinkKappa)).toBeGreaterThan(0.6);
    expect(shrunkMean(empty, 0.1, PARAMS.shrinkKappa)).toBeLessThan(0.4);

    const evidenced = newArm(1, 1, 0);
    for (let i = 0; i < 30; i++) updateArm(evidenced, 1, 1, i);
    expect(shrunkMean(evidenced, 0.1, PARAMS.shrinkKappa)).toBeGreaterThan(0.8);
  });

  it('sampled arms rank the way their means do', () => {
    const rand = mulberry32(5);
    const good = newArm(20, 2, 0);
    const bad = newArm(2, 20, 0);
    let goodWins = 0;
    for (let i = 0; i < 500; i++) {
      if (sampleFlat(rand, good) > sampleFlat(rand, bad)) goodWins++;
    }
    expect(goodWins).toBeGreaterThan(480);
    // With shrinkage toward a hostile parent, the gap narrows but holds.
    const shrunk = sampleArm(rand, good, 0.1, PARAMS.shrinkKappa);
    expect(shrunk).toBeGreaterThan(0.5);
  });

  it('discounting decays toward Beta(1,1) with a ~46-day half life', () => {
    const arm = newArm(11, 1, 0);
    discountArm(arm, Math.pow(PARAMS.discountGamma, 46));
    expect(arm.a - 1).toBeCloseTo(10 * 0.5, 1);
    for (let d = 0; d < 800; d++) discountArm(arm, PARAMS.discountGamma);
    expect(arm.a).toBeCloseTo(1, 3);
    expect(arm.b).toBeCloseTo(1, 3);
  });
});

describe('mastery (§4)', () => {
  const h = makeHarness({ seed: 3 });

  it('saturates: more points always help, less and less', () => {
    const s = 20;
    expect(masteryFromPoints(0, s)).toBe(0);
    const a = masteryFromPoints(10, s);
    const b = masteryFromPoints(20, s);
    const c = masteryFromPoints(40, s);
    expect(a).toBeLessThan(b);
    expect(b).toBeLessThan(c);
    expect(b - a).toBeGreaterThan(c - b);
    expect(masteryFromPoints(1e6, s)).toBeCloseTo(1, 6);
    expect(masteryFromPoints(s, s)).toBeCloseTo(1 - Math.exp(-1), 9);
  });

  it('S grows with the card count and then stops', () => {
    const fat = h.ctx.graph.topicIds.find((t) => cardCount(h.ctx, t) >= PARAMS.masterySCardCap)!;
    expect(saturation(h.ctx, fat)).toBe(PARAMS.masterySBase + PARAMS.masterySPerCard * PARAMS.masterySCardCap);
  });

  it('priors land exactly on the prior mastery', () => {
    const st = h.engine.state();
    for (const id of ['math.topology', 'math.linear-algebra.svd', 'bio', 'css.llm-agents']) {
      const prior = priorMastery(h.ctx, id);
      if (h.ctx.graph.kind(id) !== 'topic') continue;
      expect(masteryFromPoints(priorPoints(h.ctx, id), saturation(h.ctx, id))).toBeCloseTo(prior, 6);
      expect(st.topics[id].mastery).toBeCloseTo(prior, 6);
    }
  });

  it('an area is the card-count-weighted mean of its topics', () => {
    const mv = createMasteryView(h.engine.state(), h.ctx, h.clock.t);
    const area = 'math.topology';
    let num = 0;
    let den = 0;
    for (const t of h.ctx.graph.topicsUnder(area)) {
      const w = h.ctx.cards.byTopic(t).length;
      num += w * mv.of(t);
      den += w;
    }
    expect(mv.of(area)).toBeCloseTo(num / den, 6);
  });

  it('points decay after a month idle, never below the prior', () => {
    const g = makeHarness({ seed: 3 });
    const card = g.index.cards.find((c) => c.topic === 'math.topology.compactness')!;
    for (let i = 0; i < 6; i++) {
      g.engine.apply({ id: 'm' + i, t: g.clock.t + i * 1000, type: 'like', s: 'm1', card: g.ctx.cards.byTopic(card.topic)[i % 3].id });
    }
    const hot = createMasteryView(g.engine.state(), g.ctx, g.clock.t).of(card.topic);
    const cold = createMasteryView(g.engine.state(), g.ctx, g.clock.t + 400 * DAY).of(card.topic);
    expect(cold).toBeLessThan(hot);
    expect(cold).toBeGreaterThanOrEqual(priorMastery(g.ctx, card.topic) - 1e-9);
  });

  it('unlocked follows the prereq threshold, and levels follow mastery', () => {
    const mv = createMasteryView(h.engine.state(), h.ctx, h.clock.t);
    const locked = h.ctx.graph.topicIds.find((t) => h.ctx.graph.prereqs(t).some((p) => mv.of(p) < PARAMS.prereqUnlock))!;
    expect(mv.unlocked(locked)).toBe(false);
    const open = h.ctx.graph.topicIds.find((t) => h.ctx.graph.prereqs(t).length === 0)!;
    expect(mv.unlocked(open)).toBe(true);
    expect(mv.level('math.foundations')).toBeGreaterThanOrEqual(2);
    expect(mv.level('bio.ecology.ecosystems-energy')).toBe(0);
  });
});

describe('difficulty (§5)', () => {
  const h = makeHarness({ seed: 3 });

  it('fit peaks at the target and penalises "over my head" harder', () => {
    expect(fit(3, 3, false)).toBeCloseTo(1, 9);
    expect(fit(4, 3, false)).toBeCloseTo(Math.exp(-1 / (2 * PARAMS.fitSigma ** 2)), 9);
    expect(fit(4.5, 3, false)).toBeLessThan(fit(1.5, 3, false));
    // In the zone the "too hard" penalty lifts.
    expect(fit(4.5, 3, true)).toBeGreaterThan(fit(4.5, 3, false));
  });

  it('an untouched topic reads its target through to the area, then the domain', () => {
    const st = h.engine.state();
    const topic = 'math.topology.compactness';
    expect(targetOf(st, h.ctx, topic)).toBeCloseTo(priorFor(h.ctx.priors.difficulty, topic, h.ctx.graph, 3), 6);

    const area = h.ctx.graph.area(topic);
    st.topics[area].difficulty = 4.2;
    st.topics[area].lastEvent = h.clock.t;
    expect(targetOf(st, h.ctx, topic)).toBeCloseTo(4.2, 6);

    st.topics[topic].difficulty = 2.1;
    st.topics[topic].lastEvent = h.clock.t;
    expect(targetOf(st, h.ctx, topic)).toBeCloseTo(2.1, 6);
  });
});

describe('FSRS (§10.2)', () => {
  const t0 = Date.UTC(2026, 8, 19, 9);

  it('a new item is due 20 hours after the first read and has no memory yet', () => {
    const card = enterFsrs(t0);
    expect(card.due - t0).toBe(PARAMS.fsrsFirstDueH * 3600000);
    expect(hasMemory(card)).toBe(false);
    expect(retrievability(card, t0)).toBe(1);
    expect(overdueDays(card, t0)).toBeLessThan(0);
  });

  it('grades are monotone: Again ≤ Hard < Good < Easy in both interval and stability', () => {
    const base = enterFsrs(t0);
    const reviewed = [1, 2, 3, 4].map((g) => gradeFsrs(base, g, t0 + DAY));
    for (let i = 1; i < reviewed.length; i++) {
      expect(reviewed[i].due).toBeGreaterThanOrEqual(reviewed[i - 1].due);
      expect(reviewed[i].stability).toBeGreaterThan(reviewed[i - 1].stability);
    }
    expect(reviewed[0].due).toBeLessThan(reviewed[2].due);
    for (const r of reviewed) {
      expect(r.reps).toBe(1);
      expect(hasMemory(r)).toBe(true);
      expect(r.due - t0 - DAY).toBeLessThanOrEqual(PARAMS.fsrsMaxInterval * DAY);
    }
  });

  it('repeated Good answers stretch the interval; an Again collapses it', () => {
    let card = enterFsrs(t0);
    let at = t0 + DAY;
    const intervals: number[] = [];
    for (let i = 0; i < 5; i++) {
      const next = gradeFsrs(card, 3, at);
      intervals.push(next.due - at);
      card = next;
      at = next.due;
    }
    for (let i = 1; i < intervals.length; i++) expect(intervals[i]).toBeGreaterThan(intervals[i - 1]);
    const lapsed = gradeFsrs(card, 1, at);
    expect(lapsed.due - at).toBeLessThan(intervals[intervals.length - 1]);
    expect(lapsed.lapses).toBe(1);
  });

  it('retrievability decays with time and rises with stability', () => {
    const card = gradeFsrs(enterFsrs(t0), 3, t0 + DAY);
    const r1 = retrievability(card, card.lastReview + DAY);
    const r10 = retrievability(card, card.lastReview + 10 * DAY);
    expect(r1).toBeGreaterThan(r10);
    expect(r10).toBeGreaterThan(0);
    const stronger = { ...card, stability: card.stability * 4 };
    expect(retrievability(stronger, card.lastReview + 10 * DAY)).toBeGreaterThan(r10);
  });
});

describe('taxonomy, map and explanations', () => {
  const h = makeHarness({ seed: 3 });

  it('the graph agrees with the id hierarchy', () => {
    expect(h.ctx.graph.domain('math.topology.compactness')).toBe('math');
    expect(h.ctx.graph.area('math.topology.compactness')).toBe('math.topology');
    expect(h.ctx.graph.area('math.topology')).toBe('math.topology');
    expect(h.ctx.graph.parent('math.topology.compactness')).toBe('math.topology');
    expect(h.ctx.graph.ancestors('math.topology.compactness')).toEqual(['math.topology.compactness', 'math.topology', 'math']);
    expect(h.ctx.graph.topicsUnder('math.topology')).toContain('math.topology.compactness');
    expect(h.ctx.graph.children('math')).toContain('math.topology');
    expect(h.ctx.graph.name('math.topology')).toBe('Topology');
  });

  it('the most specific prior wins', () => {
    expect(priorFor(h.ctx.priors.mastery, 'math.topology.covering-spaces', h.ctx.graph, -1)).toBe(0);
    expect(priorFor(h.ctx.priors.mastery, 'math.topology.connectedness', h.ctx.graph, -1)).toBe(0.3);
    expect(priorFor(h.ctx.priors.mastery, 'sports.football-analytics.xg', h.ctx.graph, -1)).toBe(0.45);
    expect(priorFor(h.ctx.priors.mastery, 'nonexistent.node.here', h.ctx.graph, -1)).toBe(-1);
  });

  it('map() covers every node with counts, levels and colours', () => {
    const nodes = h.engine.map();
    expect(nodes.length).toBe(h.ctx.graph.ids.length);
    const math = nodes.find((n) => n.id === 'math')!;
    expect(math.kind).toBe('domain');
    expect(math.color).toBe('#7c9cff');
    expect(math.cardsTotal).toBeGreaterThan(300);
    expect(math.cardsSeen).toBe(0);
    const topic = nodes.find((n) => n.id === 'math.topology.compactness')!;
    expect(topic.kind).toBe('topic');
    expect(topic.prereqs.length).toBeGreaterThan(0);
    expect(nodes.some((n) => n.unlockedNext && n.blockedBy)).toBe(true);
  });

  it('map() counts seen cards after reading', () => {
    const g = makeHarness({ seed: 3 });
    const cards = g.ctx.cards.under('math.topology').slice(0, 5);
    cards.forEach((c, i) => g.engine.apply({
      id: 'mp' + i, t: g.clock.t + i * 1000, type: 'view', s: 'mp', card: c.id,
      data: { dwellMs: 60000, readFraction: 0.9, slot: 'progress' },
    }));
    const node = g.engine.map().find((n) => n.id === 'math.topology')!;
    expect(node.cardsSeen).toBe(5);
    expect(node.mastery).toBeGreaterThan(0);
  });

  it('every served card carries one to three human reasons', () => {
    const plan = h.engine.next(20);
    for (const s of plan) {
      expect(s.why.length).toBeGreaterThan(0);
      expect(s.why.length).toBeLessThanOrEqual(3);
      for (const w of s.why) expect(w.length).toBeGreaterThan(3);
    }
    expect(h.engine.explain(plan[0].id)).toEqual(plan[0].why);
  });

  it('the wire surfaces fresh items and learns its sources (§10.8)', () => {
    const base = sharedIndex();
    // Strip the distilled news cards so the raw inbox has to carry the slot.
    const cards = base.cards.filter((c) => c.format !== 'news');
    const index = { builtAt: base.builtAt, count: cards.length, cards };
    const at = Date.UTC(2026, 8, 19, 9);
    const wire: WireItem[] = [
      {
        id: 'w1', source: 'arxiv', sourceName: 'arXiv', kind: 'paper',
        title: 'Something new', url: 'https://example.org/a', summary: 'x',
        published: new Date(at - 2 * DAY).toISOString().slice(0, 10),
        fetched: '2026-09-19', domain: 'ai', topicHint: 'ai.llm.agents-tools',
        lang: 'en', status: 'fresh',
      },
      {
        id: 'w2', source: 'dead', sourceName: 'Dead', kind: 'news',
        title: 'Stale', url: 'https://example.org/b', summary: 'x',
        published: '2020-01-01', fetched: '2026-09-19', domain: 'hist',
        lang: 'en', status: 'dropped',
      },
    ];
    const g = makeHarness({ seed: 4, index, wire, start: at });
    g.engine.apply({ id: 'w0', t: g.clock.t, type: 'session_start', s: 'wz' });
    // Walk past the cold-start tour, which holds the wire back.
    for (let i = 0; i < 13; i++) {
      const [s] = g.engine.next(1);
      if (!s) break;
      if (s.slot === 'milestone') {
        g.engine.apply({ id: 'wm' + i, t: g.clock.t, type: 'milestone', s: 'wz', data: { id: s.milestone } });
        continue;
      }
      g.engine.apply({ id: 'wv' + i, t: g.clock.t, type: 'view', s: 'wz', card: s.id, data: { dwellMs: 40000, readFraction: 0.9, slot: s.slot } });
      g.clock.t += 41000;
    }
    const slot = g.engine.next(10).find((s) => s.slot === 'wire');
    expect(slot).toBeTruthy();
    expect(slot!.wire).toBe('w1');           // the dropped item is never offered
    expect(slot!.id).toBe('wire:w1');
    expect(slot!.why[0]).toMatch(/Fresh from arXiv/);

    g.engine.apply({ id: 'wa', t: g.clock.t, type: 'wire', s: 'wz', data: { wire: 'w1', action: 'open' } });
    expect(g.engine.state().sources['arxiv'].a).toBeGreaterThan(1);
  });

  it('next() is idempotent between events and invalidated by one', () => {
    const g = makeHarness({ seed: 19 });
    const a = g.engine.next(10);
    expect(JSON.stringify(g.engine.next(10))).toBe(JSON.stringify(a));
    expect(JSON.stringify(g.engine.next(5))).toBe(JSON.stringify(a.slice(0, 5)));
    expect(JSON.stringify(g.engine.next(20).slice(0, 10))).toBe(JSON.stringify(a));

    g.engine.apply({
      id: 'inv', t: g.clock.t, type: 'view', s: 'i1', card: a[0].id,
      data: { dwellMs: 60000, readFraction: 0.9, slot: a[0].slot },
    });
    const b = g.engine.next(10);
    expect(b.some((s) => s.id === a[0].id)).toBe(false);
  });
});
