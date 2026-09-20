import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createStore, type CultivarStore } from '../../src/store/index';
import {
  META_FILE,
  PROFILE_FILE,
  QUESTIONS_FILE,
  createSync,
  formatEventsJson,
  parseEvents,
  type CultivarSync,
  type SyncMeta,
} from '../../src/store/sync';
import type { EngineState, Event, SyncConfig } from '../../src/types';
import { FakeGitHub } from './fake-github';
import { T0, makeEvent, makeEvents, makeQuestion, makeState } from './helpers';

const cfg: SyncConfig = { owner: 'reader', repo: 'cultivar-data', token: 'ghp_SECRET_TOKEN_VALUE_1234' };
const SEPT = '2026-09';
const AUG = '2026-08';
const augT = Date.UTC(2026, 7, 20, 9, 0, 0);

let gh: FakeGitHub;
let uninstall: () => void;
let store: CultivarStore;
let sync: CultivarSync;
let state: EngineState;
let merged: Event[][];
let clock: number;

async function setup(events: Event[] = []): Promise<void> {
  store = createStore({ forceMemory: true, localStorage: null, now: () => clock });
  await store.init();
  if (events.length) await store.appendEvents(events);
  sync = createSync({
    store,
    getState: () => state,
    onMerged: (evs) => merged.push(evs),
    now: () => clock,
    app: '0.1.0-test',
  });
  await sync.configure(cfg);
}

beforeEach(() => {
  gh = new FakeGitHub();
  uninstall = gh.install();
  state = makeState();
  merged = [];
  clock = T0 + 60_000;
});
afterEach(() => uninstall());

describe('push', () => {
  it('creates every repo file on an empty repo (404 → create)', async () => {
    await setup(makeEvents(3));
    state = makeState({ eventCount: 3 });

    const status = await sync.push();

    expect(status.error).toBeUndefined();
    expect(status.lastPush).toBe(clock);
    expect(status.pendingEvents).toBe(0);
    expect([...gh.files.keys()].sort()).toEqual([`events/${SEPT}.json`, META_FILE, PROFILE_FILE, QUESTIONS_FILE]);

    const shard = parseEvents(gh.read(`events/${SEPT}.json`), 'x');
    expect(shard.map((e) => e.id)).toEqual(['e0000', 'e0001', 'e0002']);
    expect(gh.callsTo(`events/${SEPT}.json`, 'PUT')[0].status).toBe(201);
    expect(gh.callsTo(`events/${SEPT}.json`, 'PUT')[0].message).toBe(`sync: events ${SEPT} (+3)`);

    const profile = gh.readJson<{ state: EngineState; exportedAt: string; deviceId: string; app: string }>(PROFILE_FILE);
    expect(profile.state.eventCount).toBe(3);
    expect(profile.exportedAt).toBe(new Date(clock).toISOString());
    expect(profile.deviceId).toBe(await store.deviceId());
    expect(profile.app).toBe('0.1.0-test');

    const meta = gh.readJson<SyncMeta>(META_FILE);
    expect(meta).toEqual({ lastPush: clock, device: await store.deviceId(), eventCount: 3, months: [SEPT] });
  });

  it('writes one event per line so the repo diffs cleanly', async () => {
    await setup(makeEvents(2));
    await sync.push();
    const lines = (gh.read(`events/${SEPT}.json`) ?? '').trim().split('\n');
    expect(lines[0]).toBe('[');
    expect(lines[1]).toContain('"id":"e0000"');
    expect(lines).toHaveLength(4);
  });

  it('shards across months and union-merges with what is already in the repo', async () => {
    const remote = makeEvent({ id: 'remote-1', t: augT - 1000, card: 'from-laptop' });
    gh.write(`events/${AUG}.json`, formatEventsJson([remote]));

    await setup([makeEvent({ id: 'aug-1', t: augT }), ...makeEvents(2)]);
    await sync.push();

    expect(parseEvents(gh.read(`events/${AUG}.json`), 'x').map((e) => e.id)).toEqual(['remote-1', 'aug-1']);
    expect(parseEvents(gh.read(`events/${SEPT}.json`), 'x').map((e) => e.id)).toEqual(['e0000', 'e0001']);
    expect(gh.readJson<SyncMeta>(META_FILE).months).toEqual([AUG, SEPT]);
    expect(gh.callsTo(`events/${AUG}.json`, 'PUT')[0].message).toBe(`sync: events ${AUG} (+1)`);
  });

  it('re-merges rather than clobbering when another device wins the sha race', async () => {
    const theirs = makeEvent({ id: 'remote-1', t: T0 - 5000, card: 'phone-2' });
    const raced = makeEvent({ id: 'remote-2', t: T0 - 2000, card: 'phone-2-again' });
    gh.write(`events/${SEPT}.json`, formatEventsJson([theirs]));

    await setup([makeEvent({ id: 'mine-1', t: T0 })]);
    let fired = false;
    gh.beforePut = (path) => {
      if (path === `events/${SEPT}.json` && !fired) {
        fired = true;
        gh.write(path, formatEventsJson([theirs, raced]));
      }
    };

    const status = await sync.push();

    expect(status.error).toBeUndefined();
    expect(parseEvents(gh.read(`events/${SEPT}.json`), 'x').map((e) => e.id)).toEqual(['remote-1', 'remote-2', 'mine-1']);
    expect(gh.callsTo(`events/${SEPT}.json`, 'PUT').map((c) => c.status)).toEqual([409, 200]);
  });

  it('roundtrips unicode event payloads', async () => {
    const text = '¿por qué el pico está en la interpolación? — ∀x∈ℝ 日本語 🌱';
    await setup([makeEvent({ id: 'q1', t: T0, type: 'question', data: { text } })]);
    await sync.push();

    const stored = parseEvents(gh.read(`events/${SEPT}.json`), 'x');
    expect((stored[0].data as { text: string }).text).toBe(text);
    // Decoded by Buffer in the fake, so the encoder really produced UTF-8.
    expect(gh.read(`events/${SEPT}.json`)).toContain('日本語');
  });

  it('writes questions.json derived from state', async () => {
    state = makeState({
      questions: [
        makeQuestion({ id: 'q-2026-09-19-aaaa', t: T0, text: 'why does the peak happen at interpolation?', card: 'ai.dd.intro', topic: 'ai.theory' }),
        makeQuestion({ id: 'q-2026-09-18-bbbb', t: T0 - 86_400_000, text: 'what is a sheaf?', status: 'answered', answerCard: 'math.sheaf.intro' }),
      ],
    });
    await setup(makeEvents(1));
    await sync.push();

    const written = gh.readJson<Array<Record<string, unknown>>>(QUESTIONS_FILE);
    expect(written).toEqual([
      { id: 'q-2026-09-18-bbbb', t: T0 - 86_400_000, text: 'what is a sheaf?', status: 'answered', answerCard: 'math.sheaf.intro' },
      {
        id: 'q-2026-09-19-aaaa',
        t: T0,
        card: 'ai.dd.intro',
        topic: 'ai.theory',
        text: 'why does the peak happen at interpolation?',
        status: 'open',
      },
    ]);
    expect(gh.callsTo(QUESTIONS_FILE, 'PUT')[0].message).toBe('sync: questions (1 open)');
  });

  it('never writes the token into the repo', async () => {
    await setup(makeEvents(2));
    await store.setLocal('syncConfig', cfg);
    await sync.push();
    for (const [path, content] of gh.files) {
      expect(content, path).not.toContain(cfg.token);
      expect(content, path).not.toContain('token');
    }
  });

  it('writes nothing on a second push with nothing new', async () => {
    await setup(makeEvents(2));
    await sync.push();
    const paths = () => gh.calls.filter((c) => c.method === 'PUT').map((c) => c.path);
    expect(paths()).toEqual([`events/${SEPT}.json`, PROFILE_FILE, QUESTIONS_FILE, META_FILE]);

    // Same events, same state, later clock: profile.exportedAt and meta.lastPush
    // would differ, but neither is news — no commits.
    clock += 1000;
    expect((await sync.push()).error).toBeUndefined();
    expect(paths()).toHaveLength(4);

    // A new event moves the shard and the heartbeat; the unchanged state does not.
    await store.appendEvent(makeEvent({ id: 'new-1', t: T0 + 120_000 }));
    clock += 1000;
    await sync.push();
    expect(paths().slice(4)).toEqual([`events/${SEPT}.json`, META_FILE]);
    expect(gh.readJson<SyncMeta>(META_FILE).lastPush).toBe(clock);
  });

  it('tracks pending events across appends and pushes', async () => {
    await setup(makeEvents(2));
    expect((await sync.refresh()).pendingEvents).toBe(2);

    await sync.push();
    expect(sync.status().pendingEvents).toBe(0);

    await store.appendEvent(makeEvent({ id: 'later', t: T0 + 90_000 }));
    sync.notePending();
    expect(sync.status().pendingEvents).toBe(1);
    expect((await sync.refresh()).pendingEvents).toBe(1);

    clock += 1000;
    await sync.push();
    expect(sync.status().pendingEvents).toBe(0);
    expect(parseEvents(gh.read(`events/${SEPT}.json`), 'x')).toHaveLength(3);

    await sync.markAllPending();
    expect(sync.status().pendingEvents).toBe(3);
  });

  it('uses keepalive for small files only', async () => {
    await setup(makeEvents(2));
    state = makeState({ milestones: ['x'.repeat(70_000)] });
    await sync.push({ keepalive: true });

    expect(gh.callsTo(`events/${SEPT}.json`, 'PUT')[0].keepalive).toBe(true);
    expect(gh.callsTo(META_FILE, 'PUT')[0].keepalive).toBe(true);
    expect(gh.callsTo(PROFILE_FILE, 'PUT')[0].keepalive).toBe(false);
  });

  it('reports failures in status instead of throwing', async () => {
    await setup(makeEvents(2));
    gh.offline = true;

    const status = await sync.push();
    expect(status.error).toMatch(/offline/);
    expect(status.pendingEvents).toBe(2);
    expect(status.lastPush).toBeUndefined();

    gh.offline = false;
    expect((await sync.push()).error).toBeUndefined();
    expect(sync.status().pendingEvents).toBe(0);
  });

  it('refuses to push when not configured', async () => {
    await setup(makeEvents(1));
    await sync.configure(null);
    expect(sync.isConfigured()).toBe(false);
    expect((await sync.push()).error).toMatch(/not configured/);
    expect(gh.files.size).toBe(0);
  });

  it('will not overwrite a month file it cannot parse', async () => {
    gh.write(`events/${SEPT}.json`, '{ broken json');
    await setup(makeEvents(1));
    const status = await sync.push();
    expect(status.error).toMatch(/not valid JSON/);
    expect(gh.read(`events/${SEPT}.json`)).toBe('{ broken json');
  });
});

describe('pull', () => {
  const theirEvents = [
    makeEvent({ id: 'shared-1', t: T0 - 10_000, card: 'both-have-this' }),
    makeEvent({ id: 'theirs-1', t: T0 - 5000, card: 'only-on-laptop' }),
  ];

  async function remoteHasEvents(device = 'another-device'): Promise<void> {
    gh.write(`events/${SEPT}.json`, formatEventsJson(theirEvents));
    gh.writeJson(META_FILE, { lastPush: T0, device, eventCount: 2, months: [SEPT] } satisfies SyncMeta);
  }

  it('merges unknown events and calls onMerged', async () => {
    await remoteHasEvents();
    await setup([theirEvents[0]]);

    const result = await sync.pull();

    expect(result.merged).toBe(1);
    expect(merged).toHaveLength(1);
    expect(merged[0].map((e) => e.id)).toEqual(['theirs-1']);
    expect((await store.listEvents()).map((e) => e.id)).toEqual(['shared-1', 'theirs-1']);
    expect(sync.status().lastPull).toBe(clock);
  });

  it('pulls at most once an hour unless forced', async () => {
    await remoteHasEvents();
    await setup([]);
    await sync.pull();
    const after = gh.calls.length;

    expect(await sync.pull()).toEqual({ merged: 0 });
    expect(gh.calls.length).toBe(after);

    expect((await sync.pull(true)).merged).toBe(0); // forced, but nothing new
    expect(gh.calls.length).toBeGreaterThan(after);

    clock += 61 * 60 * 1000;
    gh.write(`events/${SEPT}.json`, formatEventsJson([...theirEvents, makeEvent({ id: 'theirs-2', t: T0 - 1000 })]));
    gh.writeJson(META_FILE, { lastPush: clock - 1000, device: 'another-device', eventCount: 3, months: [SEPT] } satisfies SyncMeta);
    expect((await sync.pull()).merged).toBe(1);
  });

  it('skips our own push and stale metadata', async () => {
    await setup([]);
    await remoteHasEvents(await store.deviceId());
    expect((await sync.pull()).merged).toBe(0);
    expect(merged).toHaveLength(0);

    // Forcing ignores the device check.
    expect((await sync.pull(true)).merged).toBe(2);
  });

  it('is a no-op when the repo has no meta.json yet', async () => {
    await setup([]);
    expect(await sync.pull()).toEqual({ merged: 0 });
    expect(sync.status().error).toBeUndefined();
  });

  it('reports errors without throwing', async () => {
    await setup([]);
    gh.offline = true;
    expect(await sync.pull()).toEqual({ merged: 0 });
    expect(sync.status().error).toMatch(/offline/);
  });

  it('fetches months it holds no events for, plus the two most recent', async () => {
    gh.write('events/2026-05.json', formatEventsJson([makeEvent({ id: 'old-1', t: Date.UTC(2026, 4, 3) })]));
    gh.write(`events/${AUG}.json`, formatEventsJson([makeEvent({ id: 'aug-1', t: augT })]));
    gh.write(`events/${SEPT}.json`, formatEventsJson(theirEvents));
    gh.writeJson(META_FILE, {
      lastPush: T0,
      device: 'another-device',
      eventCount: 4,
      months: ['2026-05', AUG, SEPT],
    } satisfies SyncMeta);

    await setup([]);
    expect((await sync.pull()).merged).toBe(4);
    expect((await store.listEvents()).map((e) => e.id)).toEqual(['old-1', 'aug-1', 'shared-1', 'theirs-1']);
  });
});

describe('restore and test', () => {
  it('imports every month file in the repo', async () => {
    gh.write(`events/${AUG}.json`, formatEventsJson([makeEvent({ id: 'aug-1', t: augT })]));
    gh.write(`events/${SEPT}.json`, formatEventsJson(makeEvents(2)));
    await setup([]);

    const result = await sync.restore();

    expect(result).toEqual({ events: 3 });
    expect((await store.listEvents()).map((e) => e.id)).toEqual(['aug-1', 'e0000', 'e0001']);
    expect(merged[0]).toHaveLength(3);
  });

  it('explains an empty repo', async () => {
    await setup([]);
    expect((await sync.restore()).error).toMatch(/No events found/);
  });

  it('reports the connection for the Test button', async () => {
    await setup([]);
    expect(await sync.test()).toEqual({ ok: true, message: 'Connected to reader/cultivar-data' });

    gh.repo = { ...gh.repo, permissions: { push: false } };
    const readOnly = await sync.test();
    expect(readOnly.ok).toBe(false);
    expect(readOnly.message).toMatch(/cannot write/);

    gh.failNext = { status: 404, message: 'Not Found' };
    const missing = await sync.test();
    expect(missing.ok).toBe(false);
    expect(missing.message).toMatch(/Not found/);
    expect(missing.message).not.toContain(cfg.token);
  });

  it('persists its config and counters in the local store', async () => {
    await setup(makeEvents(1));
    await sync.push();

    expect(await store.getLocal('syncConfig')).toMatchObject({ owner: 'reader', repo: 'cultivar-data' });
    expect(await store.getLocal<number>('lastPush')).toBe(clock);
    expect(await store.getLocal<number>('pushedThroughT')).toBe(T0);
    expect(sync.configured()).toEqual({ owner: 'reader', repo: 'cultivar-data' });

    await sync.configure(null);
    expect(await store.getLocal('syncConfig')).toBeNull();
    expect(sync.configured()).toBeNull();
  });

  it('ignores a half-filled config', async () => {
    await setup([]);
    await sync.configure({ owner: 'reader', repo: '', token: 'x' } as SyncConfig);
    expect(sync.isConfigured()).toBe(false);
  });

  it('re-pushes the whole history after being pointed at a new repo', async () => {
    await setup(makeEvents(2));
    await sync.push();
    expect(sync.status().pendingEvents).toBe(0);

    await sync.configure({ ...cfg, repo: 'cultivar-data-2' });
    expect(sync.status().pendingEvents).toBe(2);
    expect(await store.getLocal<number>('pushedThroughT')).toBe(0);

    // Re-saving the same repo (a new token, say) does not re-push everything.
    await sync.configure({ ...cfg, repo: 'cultivar-data-2', token: 'ghp_ROTATED_TOKEN_VALUE' });
    clock += 1000;
    await sync.push();
    expect(sync.status().pendingEvents).toBe(0);
    await sync.configure({ ...cfg, repo: 'cultivar-data-2', token: 'ghp_ROTATED_AGAIN_VALUE_9' });
    expect(sync.status().pendingEvents).toBe(0);
  });

  it('keeps GETs alive too during a session-end push', async () => {
    await setup(makeEvents(1));
    await sync.push({ keepalive: true });
    expect(gh.calls.filter((c) => c.method === 'GET').every((c) => c.keepalive)).toBe(true);
  });
});
