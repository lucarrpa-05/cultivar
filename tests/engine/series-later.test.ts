/**
 * "Save the series for later" (a `save` with `data.later === true` on a series
 * episode) pauses the series: no follow-up nudge this session, back after
 * `seriesPauseDays`.
 */

import { describe, expect, it } from 'vitest';
import { PARAMS } from '../../src/engine/params.ts';
import { createContext, replay } from '../../src/engine/index.ts';
import { seriesGate } from '../../src/engine/readiness.ts';
import type { CardMeta, ServedCard } from '../../src/types.ts';
import { ev, makeHarness, newSession, type Harness } from './fixtures/harness.ts';

function episodes(h: Harness): CardMeta[] {
  const eps = h.index.cards.filter((c) => c.series && c.series.total >= 3 && c.weight !== 'heavy');
  const first = eps.find((c) => c.series!.index === 1)!;
  return h.index.cards
    .filter((c) => c.series && c.series.id === first.series!.id)
    .sort((a, b) => a.series!.index - b.series!.index);
}

/** Session start, then a good read of episode 1 (the series goes warm). */
function readFirst(h: Harness): CardMeta[] {
  const eps = episodes(h);
  h.engine.apply(ev('session_start', h.clock.t, 's1'));
  h.advanceMinutes(1);
  h.engine.apply(ev('view', h.clock.t, 's1', eps[0].id, { dwellMs: 90000, readFraction: 1, slot: 'series', confirmed: true }));
  h.advanceMinutes(1);
  return eps;
}

/** Walk the plan like a reader: read whatever comes, `n` cards. */
function walk(h: Harness, n: number, session: string): ServedCard[] {
  const served: ServedCard[] = [];
  for (let i = 0; i < n; i++) {
    const next = h.engine.next(1)[0];
    if (!next) break;
    served.push(next);
    h.advanceMinutes(1);
    if (next.slot === 'milestone' || next.wire) {
      h.engine.apply(ev('milestone', h.clock.t, session, undefined, { id: next.milestone || next.id }));
      continue;
    }
    h.engine.apply(ev('pass', h.clock.t, session, next.id, { dwellMs: 20000, readFraction: 0.5, slot: next.slot }));
  }
  return served;
}

describe('save for later pauses a series', () => {
  it('without it, a warm series serves the next episode within a few cards', () => {
    const h = makeHarness({ seed: 7 });
    const eps = readFirst(h);
    const served = walk(h, 8, 's1');
    expect(served.some((s) => s.id === eps[1].id && s.slot === 'series')).toBe(true);
  });

  it('marks the series paused, cold and not pending, keeping the furthest index', () => {
    const h = makeHarness({ seed: 7 });
    const eps = readFirst(h);
    const t = h.clock.t;
    h.engine.apply(ev('save', t, 's1', eps[0].id, { later: true, series: eps[0].series!.id }));
    const prog = h.engine.state().series[eps[0].series!.id];
    expect(prog).toMatchObject({ paused: true, warm: false, pending: false, lastAt: t, lastIndex: 1, finished: false });
    expect(h.engine.state().saved).toContain(eps[0].id);
  });

  it('on an unread episode it pauses at that episode', () => {
    const h = makeHarness({ seed: 7 });
    const eps = readFirst(h);
    h.engine.apply(ev('save', h.clock.t, 's1', eps[1].id, { later: true, series: eps[1].series!.id }));
    const prog = h.engine.state().series[eps[1].series!.id];
    expect(prog.paused).toBe(true);
    expect(prog.lastIndex).toBe(2);
  });

  it('a plain save leaves the series alone', () => {
    const h = makeHarness({ seed: 7 });
    const eps = readFirst(h);
    const before = { ...h.engine.state().series[eps[0].series!.id] };
    h.engine.apply(ev('save', h.clock.t, 's1', eps[0].id));
    expect(h.engine.state().series[eps[0].series!.id]).toEqual(before);
  });

  it('the planner stops nudging the next episode this session', () => {
    const h = makeHarness({ seed: 7 });
    const eps = readFirst(h);
    h.engine.apply(ev('save', h.clock.t, 's1', eps[0].id, { later: true, series: eps[0].series!.id }));
    const served = walk(h, 12, 's1');
    expect(served.filter((s) => s.slot === 'series' && s.series === eps[0].series!.id)).toEqual([]);
    expect(served.map((s) => s.id)).not.toContain(eps[1].id);
  });

  it('after the pause days the series comes back as a series slot', () => {
    const h = makeHarness({ seed: 7 });
    const eps = readFirst(h);
    h.engine.apply(ev('save', h.clock.t, 's1', eps[0].id, { later: true, series: eps[0].series!.id }));
    h.advanceDays(PARAMS.seriesPauseDays + 1);
    newSession(h, 1);
    const served = walk(h, 12, 's2');
    // The re-entry: episode 1 again, as a refresher, then the series runs on.
    expect(served.some((s) => s.slot === 'series' && s.id === eps[0].id)).toBe(true);
  });

  it('inside the pause days a new session still leaves it alone', () => {
    const h = makeHarness({ seed: 7 });
    const eps = readFirst(h);
    h.engine.apply(ev('save', h.clock.t, 's1', eps[0].id, { later: true, series: eps[0].series!.id }));
    h.advanceDays(PARAMS.seriesPauseDays - 4);
    newSession(h, 1);
    const served = walk(h, 12, 's2');
    expect(served.filter((s) => s.series === eps[0].series!.id)).toEqual([]);
  });

  it('closes the next episode to the ordinary slots too, until the pause ends', () => {
    const h = makeHarness({ seed: 7 });
    const eps = readFirst(h);
    // Saving marks episode 1 "engaged", which would otherwise unlock episode 2
    // for the plain progress argmax. The pause must win.
    h.engine.apply(ev('save', h.clock.t, 's1', eps[0].id, { later: true, series: eps[0].series!.id }));
    const ctx = createContext(h.deps);
    expect(seriesGate(eps[1], h.engine.state(), ctx, h.clock.t)).toBe(false);
    expect(seriesGate(eps[1], h.engine.state(), ctx, h.clock.t + (PARAMS.seriesPauseDays + 1) * 86_400_000)).toBe(true);
  });

  it('is deterministic under replay', () => {
    const h = makeHarness({ seed: 7 });
    const eps = episodes(h);
    const events = [
      ev('session_start', h.clock.t, 's1'),
      ev('view', h.clock.t + 1000, 's1', eps[0].id, { dwellMs: 90000, readFraction: 1 }),
      ev('save', h.clock.t + 2000, 's1', eps[0].id, { later: true, series: eps[0].series!.id }),
    ];
    const a = replay(h.deps, events).series;
    const b = replay(h.deps, events.slice().reverse()).series;
    expect(a).toEqual(b);
    expect(a[eps[0].series!.id].paused).toBe(true);
  });
});
