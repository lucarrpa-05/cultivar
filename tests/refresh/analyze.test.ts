/**
 * The refresh analysis, against a fixture reader (three weeks, ~600 events).
 *
 * These assert behaviour, not implementation: the brief must find the prerequisite
 * debt behind "over my head", the topics he is eating through, his open questions,
 * and the fact that his sessions are getting shorter.
 */
import { describe, expect, it } from 'vitest';
import type { ContentIndex, EngineDeps, Event, RefreshBrief } from '../../src/types.ts';
import { buildBrief } from '../../scripts/lib/refresh-brief.ts';
import { loadEventsFromFile, loadPriors, loadSourceWeights, loadTaxonomy } from '../../scripts/lib/refresh-data.ts';
import { buildState, fallbackReplay, loadEngineModule } from '../../scripts/lib/refresh-state.ts';
import { at, readJson } from '../../scripts/lib/refresh-io.mjs';

const NOW = Date.parse('2026-09-19T15:00:00Z');
const events = loadEventsFromFile(at('tests', 'refresh', 'fixtures', 'events-2026-09.json'));
const index = readJson<ContentIndex>(at('tests', 'refresh', 'fixtures', 'index.json')) as ContentIndex;
const taxonomy = loadTaxonomy();
const priors = loadPriors();
const engineModule = await loadEngineModule();
const hasEngine = typeof engineModule?.replay === 'function';

const emptyData = {
  dir: at('.data'),
  present: false,
  events: [],
  questions: [],
  context: null,
  contextHistory: [],
  meta: null,
  recaps: [],
};

async function brief(evs: Event[], over: Partial<Parameters<typeof buildBrief>[0]> = {}) {
  const deps: EngineDeps = { index, taxonomy, priors, now: () => NOW };
  const { state, source } = await buildState(deps, evs);
  return buildBrief({
    state,
    events: evs,
    index,
    taxonomy,
    priors,
    wire: [],
    sourceWeights: loadSourceWeights(),
    data: emptyData,
    now: NOW,
    stateSource: source,
    stateNote: '',
    indexSource: 'fixture',
    ...over,
  });
}

describe('refresh brief — the fixture reader', () => {
  it('reads the fixture log', () => {
    expect(events.length).toBeGreaterThan(500);
    expect(index.cards.length).toBeGreaterThan(100);
    expect(events.filter((e) => e.type === 'too_hard').length).toBeGreaterThanOrEqual(3);
  });

  it('asks for the prerequisites behind the "over my head" flags in ai.theory', async () => {
    const { brief: b } = await brief(events);
    const topics = b.backfillRequests.map((r) => r.topic);
    expect(b.backfillRequests.length).toBeGreaterThan(0);
    expect(topics).toContain('ai.ml-basics.bias-variance');
    expect(topics).toContain('ai.ml-basics.linear-models');
    for (const r of b.backfillRequests) {
      expect(r.needed).toBeGreaterThan(0);
      expect(r.because.length).toBeGreaterThan(0);
    }
    const backfillAsks = (b.asks || []).filter((a) => a.kind === 'backfill');
    expect(backfillAsks.length).toBeGreaterThan(0);
    expect(backfillAsks.every((a) => a.layer === 'intuition')).toBe(true);
    expect(backfillAsks.map((a) => a.topic)).toContain('ai.ml-basics.bias-variance');
  });

  it('drops the difficulty target where he flagged cards, without dropping interest', async () => {
    const { brief: b } = await brief(events);
    expect(b.difficultyTargets['ai.theory']).toBeLessThan(2.5); // priors put ai.theory at 2.5
    const asked = (b.asks || []).filter((a) => a.topic.startsWith('ai.'));
    expect(asked.length).toBeGreaterThan(0); // interest survives: he still gets AI cards
  });

  it('finds at least one hungry topic, with stock actually low', async () => {
    const { brief: b } = await brief(events);
    expect(b.hungryTopics.length).toBeGreaterThan(0);
    for (const h of b.hungryTopics) {
      expect(h.likeRate).toBeGreaterThanOrEqual(0.6);
      expect(h.unseenAtTarget).toBeLessThan(4);
    }
    expect(b.hungryTopics.some((h) => h.topic.startsWith('math.topology'))).toBe(true);
  });

  it('carries his open questions into asks that stamp answersQuestion', async () => {
    const { brief: b } = await brief(events);
    expect(b.openQuestions.length).toBe(3);
    expect(b.openQuestions.map((q) => q.id)).toContain('q-2026-09-03-7f3a');
    const answers = (b.asks || []).filter((a) => a.kind === 'question');
    expect(answers.length).toBe(3);
    expect(answers.every((a) => (a.notes || []).some((n) => n.includes('answersQuestion')))).toBe(true);
  });

  it('diagnoses the shrinking sessions, the heavy-card skips and the flags', async () => {
    const { brief: b } = await brief(events);
    const all = b.diagnosis.join('\n');
    expect(b.diagnosis.length).toBeGreaterThanOrEqual(3);
    expect(all).toMatch(/median session fell/i);
    expect(all).toMatch(/heavy cards/i);
    expect(all).toMatch(/over my head/i);
  });

  it('keeps pending revisits so the flagged cards come back', async () => {
    const { brief: b } = await brief(events);
    expect(b.revisitPending.length).toBeGreaterThan(0);
    expect(b.revisitPending.every((r) => !r.resolved && r.flaggedAt > 0)).toBe(true);
  });

  it('reports what lands', async () => {
    const { brief: b } = await brief(events);
    expect(Object.keys(b.formatPerformance).length).toBeGreaterThan(3);
    expect(Object.keys(b.anglePerformance).length).toBeGreaterThan(3);
    expect(b.metrics.cardsSeen).toBeGreaterThan(100);
    expect(b.metrics.likes).toBeGreaterThan(20);
    expect(b.metrics.rolling.medianSession).toBeGreaterThan(0);
  });

  it('writes one packet per domain that has asks, and each packet stands alone', async () => {
    const { brief: b, packets, markdown } = await brief(events);
    const domains = new Set((b.asks || []).map((a) => a.domain));
    expect(packets.length).toBe(domains.size);
    for (const p of packets) {
      expect(p.cards).toBeGreaterThan(0);
      expect(p.markdown).toContain('.data/docs/STYLE_GUIDE.md');
      expect(p.markdown).toContain('npm run validate content/cards/' + p.domain);
      expect(p.markdown).toMatch(/## Your asks/);
      expect(p.markdown).toMatch(/do not duplicate/i);
    }
    expect(markdown).toContain('# Refresh brief');
    expect(markdown).toContain('refresh/packets/');
  });

  it('stays inside the card budget', async () => {
    const { brief: b } = await brief(events, { maxCards: 120 });
    const total = (b.asks || []).reduce((n, a) => n + a.count, 0);
    expect(total).toBeGreaterThan(20);
    expect(total).toBeLessThanOrEqual(120);
  });

  it('is deterministic', async () => {
    const a = await brief(events);
    const c = await brief(events);
    expect(JSON.stringify(a.brief)).toBe(JSON.stringify(c.brief));
  });
});

describe('refresh brief — cold start', () => {
  it('produces a usable brief with no events at all', async () => {
    const { brief: b, packets } = await brief([]);
    expect(b.coldStart).toBe(true);
    expect(b.daysOfData).toBe(0);
    expect(b.backfillRequests).toEqual([]);
    expect(b.hungryTopics).toEqual([]);
    expect(b.coverageGaps.length).toBeGreaterThan(0);
    expect(b.diagnosis.join('\n')).toMatch(/sync/i);
    expect(packets.length).toBeGreaterThan(0);
    expect((b.asks || []).length).toBeGreaterThan(0);
  });
});

describe('refresh analysis without the engine (the fallback fold)', () => {
  const deps: EngineDeps = { index, taxonomy, priors, now: () => NOW };

  it('folds the log into a state the brief can use', () => {
    const state = fallbackReplay(deps, events);
    expect(Object.keys(state.topics).length).toBeGreaterThan(20);
    expect(state.metrics.cardsSeen).toBeGreaterThan(100);
    expect(state.metrics.likes).toBeGreaterThan(20);
    expect(state.revisit.length).toBeGreaterThan(0);
    expect(state.questions.length).toBe(3);
    expect(state.streak.best).toBeGreaterThan(0);
    expect(state.topics['ai.theory'].difficulty).toBeLessThan(2.5); // too_hard lowered it
    expect(state.topics['math.topology'].interest.a).toBeGreaterThan(state.topics['math.topology'].interest.b);
  });

  it('finds the same prerequisite debt the engine finds', () => {
    const state = fallbackReplay(deps, events);
    const { brief: b } = buildBrief({
      state,
      events,
      index,
      taxonomy,
      priors,
      wire: [],
      sourceWeights: loadSourceWeights(),
      data: emptyData,
      now: NOW,
      stateSource: 'fallback',
      stateNote: '',
      indexSource: 'fixture',
    });
    expect(b.backfillRequests.map((r) => r.topic)).toContain('ai.ml-basics.bias-variance');
    expect(b.hungryTopics.length).toBeGreaterThan(0);
    expect(b.diagnosis.some((d) => /median session fell/i.test(d))).toBe(true);
  });
});

describe('refresh brief — against the real engine', () => {
  it.skipIf(!hasEngine)(
    'agrees with src/engine on the backfill debt and the questions',
    async () => {
      const deps: EngineDeps = { index, taxonomy, priors, now: () => NOW };
      const { state, source } = await buildState(deps, events);
      expect(source).toBe('engine');
      const { brief: b } = buildBrief({
        state,
        events,
        index,
        taxonomy,
        priors,
        wire: [],
        sourceWeights: loadSourceWeights(),
        data: emptyData,
        now: NOW,
        stateSource: source,
        stateNote: '',
        indexSource: 'fixture',
      });
      expect(b.backfillRequests.length).toBeGreaterThan(0);
      expect(b.backfillRequests.map((r) => r.topic)).toContain('ai.ml-basics.bias-variance');
      expect(b.openQuestions.length).toBe(3);
      expect(b.hungryTopics.length).toBeGreaterThan(0);
      expect((b.asks || []).length).toBeGreaterThan(0);
    },
  );

  it(hasEngine ? 'engine present' : 'SKIPPED: src/engine/index.ts is not present yet — the fallback fold was used instead', () => {
    // A visible marker in the report either way: the analysis must work with or
    // without the engine module, and the brief records which path it took.
    expect(typeof hasEngine).toBe('boolean');
  });
});

export type { RefreshBrief };
