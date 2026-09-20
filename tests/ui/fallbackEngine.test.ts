import { describe, expect, it } from 'vitest';
import { blankState, createFallbackEngine } from '@/app/fallbackEngine';
import type { Event } from '@/types';
import { deps, meta } from './fixtures';

const cards = [
  meta('math.area.topic.a', { difficulty: 1, weight: 'light' }),
  meta('math.area.topic.b', { difficulty: 3, weight: 'heavy' }),
  meta('bio.area.topic.a', { domain: 'bio', topic: 'bio.area.topic', difficulty: 2 }),
  meta('bio.area.topic.b', { domain: 'bio', topic: 'bio.area.topic', difficulty: 4 }),
  meta('math.area.topic.quiz', { format: 'recall', hasRecall: true }),
];

const ev = (type: Event['type'], card?: string, data?: Record<string, unknown>): Event => ({
  id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
  t: Date.now(),
  type,
  s: 'test',
  card,
  data,
});

describe('fallbackEngine', () => {
  it('plans unseen cards in a mixed order and never a recall card', () => {
    const engine = createFallbackEngine(deps(cards), blankState('dev'));
    const plan = engine.next(8);
    expect(plan.length).toBe(4);
    expect(plan.every((p) => p.why[0] === 'fallback')).toBe(true);
    expect(plan.some((p) => p.id.includes('quiz'))).toBe(false);
    // alternates domains rather than serving one domain first
    expect(plan[0].id.split('.')[0]).not.toBe(plan[1].id.split('.')[0]);
  });

  it('drops cards that have been seen', () => {
    const engine = createFallbackEngine(deps(cards), blankState('dev'));
    const first = engine.next(1)[0];
    engine.apply(ev('view', first.id, { dwellMs: 4000 }));
    expect(engine.next(8).some((p) => p.id === first.id)).toBe(false);
  });

  it('tracks saves, likes and settings so the screens still work', () => {
    const engine = createFallbackEngine(deps(cards), blankState('dev'));
    engine.apply(ev('save', 'math.area.topic.a'));
    engine.apply(ev('like', 'math.area.topic.a'));
    engine.apply(ev('settings', undefined, { patch: { goalMinutes: 20 } }));
    const state = engine.state();
    expect(state.saved).toContain('math.area.topic.a');
    expect(state.seen['math.area.topic.a'].liked).toBe(true);
    expect(state.settings.goalMinutes).toBe(20);
  });

  it('builds a map with a node per domain and topic', () => {
    const engine = createFallbackEngine(deps(cards), blankState('dev'));
    const nodes = engine.map();
    expect(nodes.filter((n) => n.kind === 'domain')).toHaveLength(2);
    expect(nodes.find((n) => n.id === 'math.area.next')?.unlocked).toBe(false);
  });

  it('survives a JSON round trip', () => {
    const engine = createFallbackEngine(deps(cards), blankState('dev'));
    engine.apply(ev('view', 'math.area.topic.a', { dwellMs: 1000 }));
    const copy = JSON.parse(JSON.stringify(engine.state()));
    expect(copy.seen['math.area.topic.a'].views).toBe(1);
  });
});
