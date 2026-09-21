/**
 * The monthly recap: what he now understands that he did not a month ago.
 * Stored in the private data repo and fetched by the You tab through sync.
 */
import { join } from 'node:path';
import type { CardMeta, EngineDeps, EngineState, Event, TopicId } from '../../src/types.ts';
import { Nodes, type DataRepo } from './refresh-data.ts';
import { buildState } from './refresh-state.ts';
import { at, dayStart, localDay, localMonth } from './refresh-io.mjs';

export interface RecapInput {
  month: string; // YYYY-MM
  before: EngineState; // state at 00:00 on the 1st
  after: EngineState; // state at the end of the month
  events: Event[]; // the whole log (filtered internally)
  nodes: Nodes;
  cards: Map<string, CardMeta>;
}

const LEVELS = ['unseen', 'touched', 'learning', 'solid', 'mastered'];

export function levelOf(mastery: number): number {
  if (mastery >= 0.85) return 4;
  if (mastery >= 0.6) return 3;
  if (mastery >= 0.3) return 2;
  if (mastery >= 0.15) return 1;
  return 0;
}

/** Months that have events, are finished, and have no recap written yet. */
export function pendingRecapMonths(data: DataRepo, events: Event[], now: number): string[] {
  const current = localMonth(now);
  const months = new Set<string>();
  for (const ev of events) {
    const m = localMonth(ev.t);
    if (m < current) months.add(m);
  }
  return [...months]
    .sort()
    .filter((m) => !data.recaps.includes(m));
}

export function monthRange(month: string): { from: number; to: number } {
  const from = dayStart(`${month}-01`);
  const [y, mo] = month.split('-').map(Number);
  const nextMonth = mo === 12 ? `${y + 1}-01` : `${y}-${String(mo + 1).padStart(2, '0')}`;
  return { from, to: dayStart(`${nextMonth}-01`) };
}

export function buildRecap(input: RecapInput): string {
  const { month, before, after, nodes, cards } = input;
  const { from, to } = monthRange(month);
  const events = input.events.filter((e) => e.t >= from && e.t < to);
  const monthName = new Date(`${month}-15T12:00:00Z`).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const L: string[] = [];

  // ── what you now understand ──
  const climbed: { topic: TopicId; from: number; to: number; mastery: number }[] = [];
  for (const [topic, ts] of Object.entries(after.topics)) {
    if (nodes.node(topic)?.kind !== 'topic') continue;
    const was = levelOf(before.topics[topic]?.mastery ?? 0);
    const now = levelOf(ts.mastery);
    if (now >= 2 && now > was) climbed.push({ topic, from: was, to: now, mastery: ts.mastery });
  }
  climbed.sort((a, b) => b.to - a.to || b.mastery - a.mastery);

  // ── mastery deltas by domain ──
  const domains = nodes.taxonomy.domains.map((d) => d.id);
  const deltas = domains
    .map((d) => ({
      domain: d,
      name: nodes.name(d),
      delta: (after.topics[d]?.mastery ?? 0) - (before.topics[d]?.mastery ?? 0),
      mastery: after.topics[d]?.mastery ?? 0,
    }))
    .filter((d) => Math.abs(d.delta) > 0.005)
    .sort((a, b) => b.delta - a.delta);

  // ── new interests ──
  const armMean = (s: EngineState, id: string) => {
    const arm = s.topics[id]?.interest;
    return arm ? arm.a / Math.max(1e-6, arm.a + arm.b) : 0.5;
  };
  const areas = nodes.taxonomy.nodes.filter((n) => n.kind === 'area').map((n) => n.id);
  const risers = [...domains, ...areas]
    .filter((id) => after.topics[id])
    .map((id) => ({ id, rise: armMean(after, id) - armMean(before, id), mean: armMean(after, id) }))
    .filter((r) => r.rise > 0.04 && r.mean > 0.55)
    .sort((a, b) => b.rise - a.rise)
    .slice(0, 4);

  // ── counts ──
  const count = (type: string) => events.filter((e) => e.type === type).length;
  const seenThisMonth = new Set(events.filter((e) => e.type === 'view' && e.card).map((e) => e.card as string));
  const minutes = events
    .filter((e) => e.type === 'session_end')
    .reduce((s, e) => s + Number(e.data?.minutes || 0), 0);

  // ── favorite angles ──
  const angleScore = new Map<string, { n: number; pos: number }>();
  for (const ev of events) {
    const c = ev.card ? cards.get(ev.card) : undefined;
    if (!c) continue;
    const good = ev.type === 'like' || ev.type === 'save' || ev.type === 'rigor_open';
    const counts = good || ev.type === 'skip';
    if (!counts) continue;
    for (const a of c.angles || []) {
      const row = angleScore.get(a) || { n: 0, pos: 0 };
      row.n += 1;
      if (good) row.pos += 1;
      angleScore.set(a, row);
    }
  }
  const favAngles = [...angleScore.entries()]
    .filter(([, v]) => v.n >= 3)
    .sort((a, b) => b[1].pos / b[1].n - a[1].pos / a[1].n)
    .slice(0, 3);

  // ── "you flagged this and later got it" ──
  const moments = gotItMoments(input.events, cards, to).slice(0, 3);

  L.push(`# ${monthName}`);
  L.push('');
  L.push(
    `${seenThisMonth.size} cards · ${count('like')} likes · ${count('save')} saved · ${Math.round(minutes)} minutes · best streak ${after.streak.best} days.`,
  );
  L.push('');

  if (climbed.length) {
    L.push('## What you understand now');
    L.push('');
    for (const c of climbed.slice(0, 10)) {
      L.push(c.from === 0 ? `- **${nodes.name(c.topic)}** — now **${LEVELS[c.to]}**` : `- **${nodes.name(c.topic)}** — ${LEVELS[c.from]} → **${LEVELS[c.to]}**`);
    }
    L.push('');
  }

  if (moments.length) {
    L.push('## You flagged this, and then you got it');
    L.push('');
    for (const m of moments) {
      L.push(`- *${m.title}* — "over my head" on ${m.flagged}. On ${m.solved}, you read it through.`);
    }
    L.push('');
  }

  if (deltas.length) {
    L.push('## Where you moved');
    L.push('');
    for (const d of deltas.slice(0, 6)) {
      const arrow = d.delta > 0 ? '+' : '';
      const level = levelOf(d.mastery);
      L.push(`- ${d.name}: ${arrow}${(d.delta * 100).toFixed(0)} points${level > 0 ? ` (now ${LEVELS[level]})` : ''}`);
    }
    L.push('');
  }

  if (risers.length) {
    L.push('## New pulls');
    L.push('');
    L.push(
      risers
        .map((r) => `**${nodes.name(r.id)}**`)
        .join(', ') + ' — you liked more of these than you used to.',
    );
    L.push('');
  }

  if (favAngles.length) {
    L.push('## What hooks you');
    L.push('');
    L.push(favAngles.map(([a, v]) => `${a} (${Math.round((v.pos / v.n) * 100)}%)`).join(' · '));
    L.push('');
  }

  const questions = events.filter((e) => e.type === 'question').length;
  if (questions) {
    L.push(`You asked ${questions} question${questions === 1 ? '' : 's'} this month. ${questions === 1 ? 'It is' : 'They are'} answered in the feed.`);
    L.push('');
  }

  L.push('---');
  L.push('');
  L.push('_Next month: keep pulling the threads you are pulling._');
  return L.join('\n') + '\n';
}

function gotItMoments(
  events: Event[],
  cards: Map<string, CardMeta>,
  before: number,
): { title: string; flagged: string; solved: string }[] {
  const flagged = new Map<string, number>();
  const out: { title: string; flagged: string; solved: string }[] = [];
  for (const ev of events) {
    if (ev.t >= before) break;
    if (!ev.card) continue;
    if (ev.type === 'too_hard') {
      flagged.set(ev.card, ev.t);
      continue;
    }
    const t0 = flagged.get(ev.card);
    if (!t0 || ev.t <= t0) continue;
    const positive =
      ev.type === 'like' ||
      ev.type === 'save' ||
      ev.type === 'rigor_open' ||
      (ev.type === 'view' && Number(ev.data?.readFraction || 0) >= 0.6) ||
      (ev.type === 'recall' && Number(ev.data?.grade || 0) >= 3);
    if (!positive) continue;
    out.push({
      title: cards.get(ev.card)?.title || ev.card,
      flagged: localDay(t0),
      solved: localDay(ev.t),
    });
    flagged.delete(ev.card);
  }
  return out;
}

/** Replay twice (start of the month, end of the month) and render the recap. */
export async function recapFor(month: string, deps: EngineDeps, events: Event[], nodes: Nodes): Promise<string> {
  const { from, to } = monthRange(month);
  const before = await buildState({ ...deps, now: () => from }, events.filter((e) => e.t < from));
  const after = await buildState({ ...deps, now: () => to }, events.filter((e) => e.t < to));
  const cards = new Map<string, CardMeta>(deps.index.cards.map((c) => [c.id, c]));
  return buildRecap({ month, before: before.state, after: after.state, events, nodes, cards });
}

export function recapPaths(month: string, dataDir = at('.data')): { data: string } {
  return { data: join(dataDir, 'recaps', `${month}.md`) };
}
