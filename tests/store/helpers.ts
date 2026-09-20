import type { EngineState, Event, EventType, ReaderQuestion } from '../../src/types';
import type { LocalStorageLike } from '../../src/store/index';

/** Fixed clock so months and ids are predictable. 2026-09-19T12:00:00Z. */
export const T0 = Date.UTC(2026, 8, 19, 12, 0, 0);

export function makeEvent(partial: Partial<Event> & { id: string; t: number }): Event {
  return {
    type: 'view' as EventType,
    s: 'sess-1',
    ...partial,
  };
}

/** Sequential events one second apart, ids sorted by time. */
export function makeEvents(n: number, startT = T0, prefix = 'e'): Event[] {
  return Array.from({ length: n }, (_, i) =>
    makeEvent({ id: `${prefix}${String(i).padStart(4, '0')}`, t: startT + i * 1000, card: `card-${i}` }),
  );
}

export function makeState(over: Partial<EngineState> = {}): EngineState {
  return {
    version: 1,
    deviceId: 'device-under-test',
    updatedAt: T0,
    eventCount: 0,
    topics: {},
    formats: {},
    angles: {},
    sources: {},
    surprise: {},
    seen: {},
    fsrs: {},
    backfill: [],
    revisit: [],
    series: {},
    saved: [],
    questions: [],
    streak: {
      current: 1,
      best: 3,
      lastGoalDay: '2026-09-19',
      freezes: 0,
      goalMinutes: 10,
      todayMinutes: 4,
      todayDay: '2026-09-19',
    },
    metrics: {
      sessions: 2,
      binges: 0,
      totalMinutes: 21,
      cardsSeen: 30,
      likes: 6,
      saves: 2,
      skips: 3,
      tooHard: 1,
      tooEasy: 0,
      recallAnswered: 4,
      recallCorrect: 3,
      daysActive: 2,
      firstDay: '2026-09-18',
      rolling: { likeRate: 0.2, skipRate: 0.1, medianSession: 10, returnRate: 1 },
    },
    settings: {
      spanishShare: 0.12,
      quizFrequency: 'auto',
      theme: 'dark',
      goalMinutes: 10,
      reduceMotion: false,
      showWhy: true,
    },
    milestones: [],
    recent: [],
    ...over,
  };
}

export function makeQuestion(over: Partial<ReaderQuestion> & { id: string }): ReaderQuestion {
  return { t: T0, text: 'why?', status: 'open', ...over };
}

/** An in-memory localStorage with the bits the store uses. */
export function fakeLocalStorage(): LocalStorageLike & { map: Map<string, string>; size(): number } {
  const map = new Map<string, string>();
  return {
    map,
    size: () => [...map.values()].reduce((n, v) => n + v.length, 0),
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => {
      map.set(k, v);
    },
    removeItem: (k) => {
      map.delete(k);
    },
  };
}

let dbCounter = 0;
export function uniqueDbName(prefix = 'cultivar-test'): string {
  dbCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${dbCounter}`;
}
