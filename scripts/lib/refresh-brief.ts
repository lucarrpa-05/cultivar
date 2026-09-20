/**
 * Turning an EngineState + the event log into a RefreshBrief (src/types.ts),
 * a human-readable refresh/brief.md, and one author packet per domain.
 *
 * Everything here is deterministic given (events, index, taxonomy, priors, now).
 */
import type {
  CardMeta,
  ContentIndex,
  DomainId,
  EngineState,
  Event,
  Priors,
  ReaderQuestion,
  RefreshAsk,
  RefreshBrief,
  Taxonomy,
  TopicId,
  WireItem,
} from '../../src/types.ts';
import { Nodes, priorFor, type ContextEntry, type DataRepo } from './refresh-data.ts';
import { DAY_MS, daysBetween, localDay, slug } from './refresh-io.mjs';

export interface BriefInput {
  state: EngineState;
  events: Event[];
  index: ContentIndex;
  taxonomy: Taxonomy;
  priors: Priors;
  wire: WireItem[];
  sourceWeights: Record<string, { weight: number; name: string; enabled: boolean }>;
  data: DataRepo;
  now: number;
  stateSource: 'engine' | 'fallback';
  stateNote: string;
  monthlyRecap?: string;
  indexSource: string;
  /** cap on the total cards requested (default 200) */
  maxCards?: number;
}

export interface BriefOutput {
  brief: RefreshBrief;
  markdown: string;
  packets: { domain: DomainId; markdown: string; cards: number }[];
}

const WANT_BACKFILL = 4; // intuition cards a prerequisite topic should have available
const WANT_HUNGRY = 5; // cards to add to a topic the reader is eating through
const WANT_COVERAGE = 3; // minimum unseen cards at target for a topic in a top area
const MAX_COVERAGE_GAPS = 40;
const KAPPA = 4; // hierarchical shrinkage, ENGINE §6
const MAX_ASK_CARDS = 200; // one refresh writes 100-200 cards (PLAN §1)

export function buildBrief(input: BriefInput): BriefOutput {
  const { state, events, index, priors, now } = input;
  const nodes = new Nodes(input.taxonomy, index);
  const ctx = new Ctx(input, nodes);

  const coldStart = events.length === 0;
  const firstT = events.length ? events[0].t : now;
  const daysOfData = coldStart ? 0 : Math.max(1, daysBetween(firstT, now));

  const diagnosis = coldStart ? coldDiagnosis(ctx) : diagnose(ctx);
  const backfillRequests = coldStart ? [] : backfill(ctx);
  const hungryTopics = coldStart ? [] : hungry(ctx);
  const openQuestions = mergeQuestions(state.questions, input.data.questions);
  const revisitPending = (state.revisit || []).filter((r) => !r.resolved);
  const coverageGaps = coverage(ctx, coldStart);
  const inboxPriority = rankInbox(ctx);
  const context = input.data.context ? `${input.data.context.date} — ${input.data.context.text}` : undefined;

  const difficultyTargets: Record<TopicId, number> = {};
  for (const [id, ts] of Object.entries(state.topics)) {
    if (ts.seen > 0 || ts.points > 0) difficultyTargets[id] = round(ts.difficulty, 2);
  }

  const asks = buildAsks(ctx, {
    backfillRequests,
    hungryTopics,
    openQuestions,
    coverageGaps,
    context: input.data.context || null,
    coldStart,
  });

  const brief: RefreshBrief = {
    generatedAt: new Date(now).toISOString(),
    daysOfData,
    metrics: metricsFor(ctx),
    diagnosis,
    backfillRequests,
    hungryTopics,
    difficultyTargets,
    formatPerformance: performance(ctx, 'format'),
    anglePerformance: performance(ctx, 'angle'),
    openQuestions,
    revisitPending,
    coverageGaps,
    inboxPriority,
    context,
    monthlyRecap: input.monthlyRecap,
    coldStart,
    stateSource: input.stateSource,
    asks,
  };

  return { brief, markdown: renderBrief(brief, ctx), packets: renderPackets(brief, ctx) };
}

// ───────────────────────────── context object ─────────────────────────────

class Ctx {
  readonly state: EngineState;
  readonly index: ContentIndex;
  readonly priors: Priors;
  readonly now: number;
  readonly byId = new Map<string, CardMeta>();
  readonly byTopic = new Map<TopicId, CardMeta[]>();
  readonly tooHardEvents: Event[] = [];
  readonly wireLikes = new Set<string>();

  constructor(
    readonly input: BriefInput,
    readonly nodes: Nodes,
  ) {
    this.state = input.state;
    this.index = input.index;
    this.priors = input.priors;
    this.now = input.now;
    for (const c of input.index.cards) {
      this.byId.set(c.id, c);
      for (const t of [c.topic, ...(c.topics || [])]) {
        const list = this.byTopic.get(t) || [];
        list.push(c);
        this.byTopic.set(t, list);
      }
    }
    for (const ev of input.events) {
      if (ev.type === 'too_hard') this.tooHardEvents.push(ev);
      if (ev.type === 'wire' && ev.data && ev.data.action === 'like') {
        const id = String(ev.data.id || ev.data.wire || ev.card || '');
        if (id) this.wireLikes.add(id);
      }
    }
  }

  card(id: string): CardMeta | undefined {
    return this.byId.get(id);
  }

  cardsIn(topic: TopicId): CardMeta[] {
    return this.byTopic.get(topic) || [];
  }

  seen(id: string): boolean {
    return Boolean(this.state.seen[id]);
  }

  mastery(id: TopicId): number {
    const ts = this.state.topics[id];
    if (ts) return ts.mastery;
    return Number(priorFor(this.priors.mastery, id, this.nodes) ?? 0);
  }

  /** Difficulty target, reading through to the area/domain when the topic is untouched. */
  target(id: TopicId): number {
    for (const step of this.nodes.chain(id)) {
      const ts = this.state.topics[step];
      if (ts && (ts.seen > 0 || step === id)) return ts.difficulty;
    }
    return Number(priorFor(this.priors.difficulty, id, this.nodes) ?? 3);
  }

  /** Thompson-arm mean with hierarchical shrinkage toward the parent (ENGINE §6). */
  interest(id: TopicId): number {
    const chain = this.nodes.chain(id);
    let mu = 0.5;
    for (let i = chain.length - 1; i >= 0; i--) {
      const node = chain[i];
      const arm = this.state.topics[node]?.interest;
      const prior = this.priors.interest?.[node];
      const a = arm ? arm.a : prior ? prior[0] : 1;
      const b = arm ? arm.b : prior ? prior[1] : 1;
      mu = (a + KAPPA * mu) / (a + b + KAPPA);
    }
    return mu;
  }

  unseenIn(topic: TopicId, pred: (c: CardMeta) => boolean): CardMeta[] {
    return this.cardsIn(topic).filter((c) => !this.seen(c.id) && pred(c));
  }

  eventsSince(ms: number): Event[] {
    return this.input.events.filter((e) => e.t >= this.now - ms);
  }
}


/**
 * The engine only records cards it knows about, so a stale or partial index can
 * leave metrics at zero while the log clearly shows activity. Fill them from the
 * events in that case, so the brief never reports "0 cards seen" after 600 events.
 */
function metricsFor(ctx: Ctx): RefreshBrief['metrics'] {
  const m = ctx.state.metrics;
  const views = ctx.input.events.filter((e) => e.type === 'view' && e.card);
  if (!views.length || m.cardsSeen > 0) return m;
  const count = (type: string) => ctx.input.events.filter((e) => e.type === type).length;
  const sessions = ctx.input.events.filter((e) => e.type === 'session_end');
  const minutes = sessions.reduce((s, e) => s + Number(e.data?.minutes || 0), 0);
  const days = new Set(ctx.input.events.map((e) => localDay(e.t)));
  const recall = ctx.input.events.filter((e) => e.type === 'recall');
  return {
    ...m,
    sessions: Math.max(m.sessions, ctx.input.events.filter((e) => e.type === 'session_start').length),
    binges: Math.max(m.binges, sessions.filter((e) => Number(e.data?.minutes || 0) >= 25).length),
    totalMinutes: Math.max(m.totalMinutes, Math.round(minutes)),
    cardsSeen: new Set(views.map((e) => e.card)).size,
    likes: count('like'),
    saves: count('save'),
    skips: count('skip'),
    tooHard: count('too_hard'),
    tooEasy: count('too_easy'),
    recallAnswered: recall.length,
    recallCorrect: recall.filter((e) => Number(e.data?.grade || 0) >= 3).length,
    daysActive: Math.max(m.daysActive, days.size),
    firstDay: m.firstDay || (ctx.input.events.length ? localDay(ctx.input.events[0].t) : ''),
  };
}

// ───────────────────────────── diagnoses ─────────────────────────────

function diagnose(ctx: Ctx): string[] {
  const out: string[] = [];
  const { state, now } = ctx;
  const events = ctx.input.events;
  const last = events.length ? events[events.length - 1].t : 0;

  // 0. is the built index even current?
  const viewed = events.filter((e) => e.type === 'view' && e.card);
  const unknown = viewed.filter((e) => !ctx.card(e.card as string)).length;
  if (viewed.length >= 20 && unknown / viewed.length > 0.2) {
    out.push(
      `${Math.round((unknown / viewed.length) * 100)}% of the cards he has read are not in the built index (${ctx.index.count} cards). Run \`node scripts/build-content.mjs\` and re-run the analysis — otherwise everything below undercounts.`,
    );
  }

  // 1. sync health
  const lastPush = ctx.input.data.meta?.lastPush || 0;
  const staleDays = daysBetween(Math.max(last, lastPush), now);
  if (staleDays >= 10) {
    out.push(
      `No sync since ${localDay(Math.max(last, lastPush))} (${staleDays} days). Either he has not opened the app, or the phone token expired — check Settings → Sync on the phone before writing 200 cards he will not see.`,
    );
  }

  // 2. session-length trend over two 14-day windows
  const win = (from: number, to: number) =>
    events
      .filter((e) => e.type === 'session_end' && e.t >= from && e.t < to)
      .map((e) => Number(e.data?.minutes || 0))
      .sort((a, b) => a - b);
  const older = win(now - 28 * DAY_MS, now - 14 * DAY_MS);
  const newer = win(now - 14 * DAY_MS, now + DAY_MS);
  if (older.length >= 2 && newer.length >= 2) {
    const mOld = median(older);
    const mNew = median(newer);
    if (mNew <= 0.7 * mOld) {
      out.push(
        `Median session fell from ${fmt(mOld)} to ${fmt(mNew)} min over the last two weeks (${newer.length} sessions). Lead with lighter openers and cut heavy cards until it recovers.`,
      );
    } else if (mNew >= 1.3 * mOld) {
      out.push(`Median session rose from ${fmt(mOld)} to ${fmt(mNew)} min — the current mix is working; more of it.`);
    }
  }

  // 3. heavy-card skip rate
  const heavy = weightStats(ctx, 'heavy');
  const all = weightStats(ctx, null);
  if (heavy.n >= 5 && all.n >= 15 && heavy.skipRate >= Math.max(0.25, 1.5 * all.skipRate)) {
    out.push(
      `Heavy cards: ${pct(heavy.skipRate)} skip against ${pct(all.skipRate)} overall (${heavy.n} heavy cards seen). Write the same ideas as intuition-first cards and push the proofs into rigor layers or series.`,
    );
  }

  // 4/5. format and angle performance
  for (const [kind, perf] of [
    ['format', performance(ctx, 'format')],
    ['angle', performance(ctx, 'angle')],
  ] as const) {
    const rows = Object.entries(perf).filter(([, v]) => v.n >= 6);
    for (const [name, v] of rows) {
      const positive = v.positive / v.n;
      if (positive <= 0.35) {
        out.push(
          `${name} ${kind === 'format' ? 'cards' : 'angle'}: only ${pct(positive)} land (${v.n} seen) — cut the share, or change the door: ${kind === 'format' ? 'what is dull about them' : 'that angle is not his'}.`,
        );
      }
    }
    const best = rows.sort((a, b) => b[1].positive / b[1].n - a[1].positive / a[1].n)[0];
    if (best && best[1].positive / best[1].n >= 0.75) {
      out.push(
        `${best[0]} ${kind === 'format' ? 'cards' : 'angle'} land ${pct(best[1].positive / best[1].n)} of the time (${best[1].n} seen) — the surest bet for new cards.`,
      );
    }
  }

  // 6. where "over my head" is concentrated
  const byArea = new Map<TopicId, Event[]>();
  for (const ev of ctx.tooHardEvents) {
    const topic = ev.topic || ctx.card(ev.card || '')?.topic || '';
    if (!topic) continue;
    const area = ctx.nodes.area(topic);
    byArea.set(area, [...(byArea.get(area) || []), ev]);
  }
  for (const [area, evs] of [...byArea.entries()].sort((a, b) => b[1].length - a[1].length)) {
    if (evs.length < 2) continue;
    out.push(
      `${evs.length} "over my head" flags in ${ctx.nodes.name(area)} (${area}) — target difficulty is now ${fmt(ctx.target(area))}. Backfill requests below; do not just write easier versions of the same card.`,
    );
  }

  // 7. recall
  const m = state.metrics;
  if (m.cardsSeen >= 30) {
    const participation = m.recallAnswered / Math.max(1, m.cardsSeen);
    if (participation < 0.05) {
      out.push(
        `Recall answered on ${m.recallAnswered} of ${m.cardsSeen} cards — the quiz interval widens by itself, but it usually means the items feel like homework. Make them playful or fewer.`,
      );
    }
    if (m.recallAnswered >= 10) {
      const correct = m.recallCorrect / m.recallAnswered;
      if (correct >= 0.95) out.push(`Recall correct rate ${pct(correct)} — the items are too easy; write distractors that are real misconceptions.`);
      if (correct <= 0.5) out.push(`Recall correct rate ${pct(correct)} — either the items test trivia instead of the idea, or the cards are above target difficulty.`);
    }
  }

  // 8. return rate
  if (m.rolling.returnRate < 0.4 && ctx.input.events.length > 50) {
    out.push(`Active on ${Math.round(m.rolling.returnRate * 14)} of the last 14 days. Shorter, lighter openers; lean on the angles that land.`);
  }

  // 9. Spanish share
  const esSeen = Object.keys(state.seen).filter((id) => ctx.card(id)?.language === 'es').length;
  const seenTotal = Math.max(1, Object.keys(state.seen).length);
  const esShare = esSeen / seenTotal;
  const esStock = ctx.index.cards.filter((c) => c.language === 'es').length;
  const target = state.settings.spanishShare ?? 0.12;
  if (seenTotal >= 30 && esShare < target - 0.05) {
    out.push(
      `Spanish is ${pct(esShare)} of what he has seen against a ${pct(target)} target — ${esStock} of ${ctx.index.count} cards are in Spanish. Write more in Spanish (native, not translated).`,
    );
  }

  // 10. running out of feed at his level
  const topAreas = rankAreas(ctx).slice(0, 3);
  const stock = topAreas.reduce((sum, a) => sum + unseenAtTarget(ctx, a).length, 0);
  if (topAreas.length && stock < 25) {
    out.push(
      `${stock === 0 ? 'Nothing' : `Only ${stock} cards`} left unseen at his level in his top areas (${topAreas.map((a) => ctx.nodes.name(a)).join(', ')}). Without new cards here the feed falls back to serendipity.`,
    );
  }

  // 11. inbox freshness
  const fresh = ctx.input.wire.filter((w) => w.status === 'fresh');
  const newest = fresh.reduce((t, w) => Math.max(t, Date.parse(w.fetched || w.published || '') || 0), 0);
  if (!fresh.length) {
    out.push('The live inbox is empty — check the fetch-live workflow (Actions tab) before the news pass.');
  } else if (newest && daysBetween(newest, now) > 3) {
    out.push(`The newest inbox item is ${daysBetween(newest, now)} days old — the fetch-live cron may be failing.`);
  }

  return out;
}

function coldDiagnosis(ctx: Ctx): string[] {
  const out = [
    'No events yet: this is a cold run. Everything below comes from content/priors.json and the card counts, not from behaviour.',
    'Set up sync before the next refresh: phone → Settings → Sync → paste a fine-grained token for cultivar-data → Test → Save. Without it the next brief is cold too.',
  ];
  if (!ctx.index.count) out.push('No built content index either — run `npm run build:content` once cards exist.');
  const fresh = ctx.input.wire.filter((w) => w.status === 'fresh').length;
  out.push(fresh ? `${fresh} fresh inbox items are waiting for the news pass.` : 'The live inbox is empty — run the fetch-live workflow.');
  return out;
}

function weightStats(ctx: Ctx, weight: 'light' | 'medium' | 'heavy' | null) {
  let n = 0;
  let skips = 0;
  let positive = 0;
  for (const [id, info] of Object.entries(ctx.state.seen)) {
    const c = ctx.card(id);
    if (!c) continue;
    if (weight && c.weight !== weight) continue;
    n += 1;
    if (info.skipped) skips += 1;
    if (info.liked || info.saved || info.rigorOpened) positive += 1;
  }
  return { n, skipRate: n ? skips / n : 0, positiveRate: n ? positive / n : 0 };
}

// ───────────────────────────── brief sections ─────────────────────────────

function performance(ctx: Ctx, kind: 'format' | 'angle'): Record<string, { n: number; positive: number }> {
  const out: Record<string, { n: number; positive: number }> = {};
  const add = (key: string, good: boolean) => {
    const row = (out[key] = out[key] || { n: 0, positive: 0 });
    row.n += 1;
    if (good) row.positive += 1;
  };
  let sawAny = false;
  for (const [id, info] of Object.entries(ctx.state.seen)) {
    const c = ctx.card(id);
    if (!c) continue;
    sawAny = true;
    const good = Boolean(info.liked || info.saved || info.rigorOpened) || (!info.skipped && !info.tooHard && (info.dwellMs || 0) > 8000);
    if (kind === 'format') add(c.format, good);
    else for (const a of c.angles || []) add(a, good);
  }
  if (!sawAny) {
    // No index knowledge of the seen cards: fall back to the engine's own arms.
    const arms = kind === 'format' ? ctx.state.formats : ctx.state.angles;
    for (const [key, arm] of Object.entries(arms || {})) {
      if (!arm || arm.n <= 0) continue;
      out[key] = { n: Math.round(arm.n), positive: Math.round(Math.max(0, arm.a - 1)) };
    }
  }
  return out;
}

function backfill(ctx: Ctx): RefreshBrief['backfillRequests'] {
  const wanted = new Map<TopicId, { because: Set<string>; from: 'state' | 'event' }>();

  for (const item of ctx.state.backfill || []) {
    if (item.done) continue;
    const row = wanted.get(item.topic) || { because: new Set<string>(), from: 'state' as const };
    if (item.because) row.because.add(item.because);
    wanted.set(item.topic, row);
  }

  // Also, and more importantly: the prerequisites the engine could NOT schedule
  // because no card exists for them. Those are exactly what this refresh must write.
  for (const ev of ctx.tooHardEvents) {
    const card = ctx.card(ev.card || '');
    const topic = ev.topic || card?.topic || '';
    if (!topic) continue;
    const prereqs = new Set<TopicId>([...(card?.prerequisites || []), ...ctx.nodes.prereqs(topic)]);
    if (!prereqs.size) {
      // ENGINE §9.2 fallback: backfill inside the topic itself, one difficulty lower.
      prereqs.add(topic);
    }
    for (const p of prereqs) {
      if (ctx.mastery(p) >= 0.35 && !wanted.has(p)) continue;
      const row = wanted.get(p) || { because: new Set<string>(), from: 'event' as const };
      if (ev.card) row.because.add(ev.card);
      wanted.set(p, row);
    }
  }

  const rows = [...wanted.entries()].map(([topic, row]) => {
    const target = ctx.target(topic) + 0.5;
    const available = ctx.unseenIn(topic, (c) => c.difficulty <= target && c.layer !== 'rigor').length;
    return {
      topic,
      because: [...row.because],
      needed: Math.max(0, WANT_BACKFILL - available),
    };
  });

  return rows
    .filter((r) => r.needed > 0)
    .sort((a, b) => b.needed - a.needed || ctx.mastery(a.topic) - ctx.mastery(b.topic));
}

function hungry(ctx: Ctx): RefreshBrief['hungryTopics'] {
  const out: RefreshBrief['hungryTopics'] = [];
  for (const [topic, ts] of Object.entries(ctx.state.topics)) {
    if (ctx.nodes.node(topic)?.kind !== 'topic') continue;
    if (ts.seen < 3) continue;
    const decided = ts.positives + ts.negatives;
    const likeRate = decided >= 3 ? ts.positives / decided : ts.positives / Math.max(1, ts.seen);
    if (likeRate < 0.6) continue;
    const target = ctx.target(topic);
    const unseenAtTarget = ctx.unseenIn(topic, (c) => Math.abs(c.difficulty - target) <= 0.5 + 1e-9).length;
    if (unseenAtTarget >= 4) continue;
    out.push({ topic, likeRate: round(likeRate, 2), unseenAtTarget, targetDifficulty: round(target, 1) });
  }
  return out.sort((a, b) => b.likeRate - a.likeRate || a.unseenAtTarget - b.unseenAtTarget).slice(0, 25);
}

function unseenAtTarget(ctx: Ctx, area: TopicId): CardMeta[] {
  const target = ctx.target(area);
  const out: CardMeta[] = [];
  for (const topic of [area, ...ctx.nodes.topicsUnder(area)]) {
    out.push(...ctx.unseenIn(topic, (c) => Math.abs(c.difficulty - target) <= 1));
  }
  return out;
}

function rankAreas(ctx: Ctx): TopicId[] {
  const areas = new Set<TopicId>();
  for (const n of ctx.nodes.taxonomy.nodes) if (n.kind === 'area') areas.add(n.id);
  return [...areas].sort((a, b) => ctx.interest(b) - ctx.interest(a));
}

function coverage(ctx: Ctx, coldStart: boolean): RefreshBrief['coverageGaps'] {
  const out: RefreshBrief['coverageGaps'] = [];
  const seenTopics = new Set<TopicId>();
  const areas = rankAreas(ctx).slice(0, coldStart ? 8 : 6);

  for (const area of areas) {
    const target = ctx.target(area);
    let perArea = 0;
    for (const topic of ctx.nodes.topicsUnder(area)) {
      if (seenTopics.has(topic) || perArea >= 6) continue;
      const cards = coldStart
        ? ctx.cardsIn(topic).length
        : ctx.unseenIn(topic, (c) => Math.abs(c.difficulty - target) <= 1).length;
      if (cards >= WANT_COVERAGE) continue;
      seenTopics.add(topic);
      perArea += 1;
      out.push({ topic, cards, wanted: WANT_COVERAGE });
    }
  }

  // Prerequisites of whatever he is obsessed with / focused on come first.
  const hot = [ctx.state.zone?.area, ctx.state.focus].filter(Boolean) as TopicId[];
  const priority = new Set<TopicId>();
  for (const h of hot) {
    for (const topic of [h, ...ctx.nodes.topicsUnder(h)]) {
      for (const p of ctx.nodes.prereqs(topic)) {
        if (ctx.cardsIn(p).length >= WANT_COVERAGE) continue;
        priority.add(p);
        if (!seenTopics.has(p)) {
          seenTopics.add(p);
          out.push({ topic: p, cards: ctx.cardsIn(p).length, wanted: WANT_COVERAGE });
        }
      }
    }
  }

  return out
    .sort((a, b) => {
      const pa = priority.has(a.topic) ? 1 : 0;
      const pb = priority.has(b.topic) ? 1 : 0;
      if (pa !== pb) return pb - pa;
      const ia = ctx.interest(a.topic);
      const ib = ctx.interest(b.topic);
      if (Math.abs(ia - ib) > 0.01) return ib - ia;
      return a.cards - b.cards;
    })
    .slice(0, MAX_COVERAGE_GAPS);
}

function mergeQuestions(fromState: ReaderQuestion[], fromRepo: ReaderQuestion[]): ReaderQuestion[] {
  const byId = new Map<string, ReaderQuestion>();
  for (const q of fromState || []) byId.set(q.id, q);
  for (const q of fromRepo || []) byId.set(q.id, { ...byId.get(q.id), ...q });
  return [...byId.values()].filter((q) => q.status !== 'answered').sort((a, b) => a.t - b.t);
}

/** SOURCES.md: weight x source arm x recency x topic interest x 3 if "Distill this" was tapped. */
function rankInbox(ctx: Ctx): WireItem[] {
  const now = ctx.now;
  const scored = ctx.input.wire
    .filter((w) => w.status === 'fresh')
    .map((w) => {
      const reg = ctx.input.sourceWeights[w.source];
      const weight = (reg?.weight ?? 3) / 5;
      const arm = ctx.state.sources?.[w.source];
      const armMean = arm ? arm.a / Math.max(1e-6, arm.a + arm.b) : 0.5;
      const ageDays = daysBetween(Date.parse(w.published || w.fetched || '') || now, now);
      const recency = Math.exp(-ageDays / 7);
      const interest = ctx.interest(w.topicHint || w.domain);
      const distill = ctx.wireLikes.has(w.id) ? 3 : 1;
      return { w, score: weight * armMean * recency * interest * distill };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, 25).map((s) => s.w);
}

// ───────────────────────────── asks ─────────────────────────────

function buildAsks(
  ctx: Ctx,
  parts: {
    backfillRequests: RefreshBrief['backfillRequests'];
    hungryTopics: RefreshBrief['hungryTopics'];
    openQuestions: ReaderQuestion[];
    coverageGaps: RefreshBrief['coverageGaps'];
    context: ContextEntry | null;
    coldStart: boolean;
  },
): RefreshAsk[] {
  const asks: RefreshAsk[] = [];
  const push = (a: Omit<RefreshAsk, 'id' | 'topicName' | 'domain'> & { topic: TopicId }) => {
    asks.push({
      id: `${a.kind}-${slug(a.topic)}-${asks.length + 1}`,
      domain: ctx.nodes.domain(a.topic),
      topicName: ctx.nodes.name(a.topic),
      ...a,
    });
  };

  for (const b of parts.backfillRequests.slice(0, 18)) {
    const target = ctx.target(b.topic);
    const lo = Math.max(1, Math.round(target - 1));
    const hi = Math.max(lo, Math.round(target + 0.5));
    push({
      kind: 'backfill',
      topic: b.topic,
      count: Math.max(3, Math.min(6, b.needed + 2)),
      difficulty: [lo, hi],
      layer: 'intuition',
      weights: ['light', 'medium'],
      formats: ['idea', 'fact', 'story'],
      because: b.because.length
        ? `flagged too hard on ${b.because.slice(0, 3).join(', ')}`
        : 'prerequisite mastery is below 0.35',
      notes: [
        'At least one card must carry a diagram if a picture genuinely explains it.',
        'These are the groundwork cards the engine will serve in backfill slots — the door matters more than completeness.',
      ],
      priority: 1,
    });
  }

  for (const q of parts.openQuestions.slice(0, 12)) {
    const topic = q.topic || ctx.card(q.card || '')?.topic || 'niche';
    push({
      kind: 'question',
      topic,
      count: 1,
      difficulty: [Math.max(1, Math.round(ctx.target(topic) - 0.5)), Math.round(ctx.target(topic) + 0.5)],
      layer: 'both',
      weights: ['medium'],
      formats: ['idea'],
      because: `he asked: "${q.text}"${q.card ? ` (on ${q.card})` : ''}`,
      notes: [`Front matter must carry \`answersQuestion: ${q.id}\`.`, 'Answer the question he actually asked in the first sentence, then explain.'],
      priority: 2,
    });
  }

  if (parts.context) {
    const tag = `context:${parts.context.date.slice(0, 7)}:<slug>`;
    for (const domain of topDomains(ctx, 2)) {
      push({
        kind: 'context',
        topic: domain,
        count: 3,
        difficulty: [Math.max(1, Math.round(ctx.target(domain) - 0.5)), Math.round(ctx.target(domain) + 1)],
        layer: 'both',
        weights: ['medium', 'heavy'],
        formats: ['idea', 'callback', 'challenge'],
        because: `what he said he is working on (${parts.context.date}): "${oneLine(parts.context.text)}"`,
        notes: [
          `Tag them \`context: ${tag}\` with a slug naming the course/project (e.g. context:${parts.context.date.slice(0, 7)}:measure-theory).`,
          'Only write these if this domain genuinely touches what he named. Do not stretch.',
        ],
        priority: 3,
      });
    }
  }

  for (const h of parts.hungryTopics.slice(0, 14)) {
    push({
      kind: 'hungry',
      topic: h.topic,
      count: WANT_HUNGRY,
      difficulty: [Math.max(1, Math.round(h.targetDifficulty - 0.5)), Math.round(h.targetDifficulty + 1)],
      layer: 'both',
      weights: ['light', 'medium', 'heavy'],
      formats: ['idea', 'story', 'challenge', 'callback'],
      because: `${pct(h.likeRate)} of what he sees here lands, and only ${h.unseenAtTarget} unseen cards are left at his level`,
      notes: ['He is eating this topic. Go one step deeper than the existing cards, not sideways.'],
      priority: 4,
    });
  }

  const alreadyAsked = new Set(asks.filter((a) => a.kind === 'backfill' || a.kind === 'hungry').map((a) => a.topic));
  const coverageByArea = new Map<TopicId, RefreshBrief['coverageGaps']>();
  for (const g of parts.coverageGaps) {
    if (alreadyAsked.has(g.topic)) continue;
    const area = ctx.nodes.area(g.topic);
    coverageByArea.set(area, [...(coverageByArea.get(area) || []), g]);
  }
  for (const [area, gaps] of coverageByArea) {
    for (const g of gaps.slice(0, 4)) {
      if (g.wanted - g.cards <= 0) continue;
      const target = ctx.target(g.topic);
      push({
        kind: 'coverage',
        topic: g.topic,
        count: g.wanted - g.cards,
        difficulty: [Math.max(1, Math.round(target - 1)), Math.round(target + 1)],
        layer: 'both',
        weights: ['light', 'medium'],
        formats: ['idea', 'story', 'fact'],
        because: `${g.cards} of ${g.wanted} cards at his level in ${ctx.nodes.name(area)}`,
        notes: g.cards === 0 ? ['This topic has no cards: the first one is the door. Pick the most surprising or human thing in it, never the definition.'] : undefined,
        priority: 5,
      });
    }
  }

  // Format rebalance: callbacks are the magic feature and are always under-supplied.
  const callbacks = ctx.index.cards.filter((c) => c.format === 'callback').length;
  const touchedDomains = topDomains(ctx, 4);
  if (touchedDomains.length >= 2 && callbacks < 60) {
    push({
      kind: 'callback',
      topic: touchedDomains[0],
      count: 5,
      difficulty: [2, 4],
      layer: 'both',
      weights: ['medium'],
      formats: ['callback'],
      because: `only ${callbacks} callback cards exist, and ${ctx.input.events.length ? 'he has history in' : 'the priors put him in'} ${touchedDomains.map((d) => ctx.nodes.name(d)).join(', ')}`,
      notes: [
        `\`callback.from\` must be a topic he has actually touched: ${touchedDomains.join(', ')}.`,
        'Open by naming the earlier idea explicitly ("Remember how compactness let you swap infinitely many for finitely many?").',
      ],
      priority: 6,
    });
  }

  const esShare = ctx.index.count ? ctx.index.cards.filter((c) => c.language === 'es').length / ctx.index.count : 0;
  if (esShare < 0.1) {
    push({
      kind: 'spanish',
      topic: topDomains(ctx, 1)[0] || 'niche',
      count: 4,
      difficulty: [2, 3],
      layer: 'both',
      weights: ['light', 'medium'],
      formats: ['idea', 'story', 'fact'],
      because: `Spanish is ${pct(esShare)} of the library against a ${pct(ctx.state.settings.spanishShare ?? 0.12)} quota`,
      notes: ['Write them in Spanish from scratch (Colombian usage is fine) — never translate an English card.'],
      priority: 7,
    });
  }

  const ordered = asks.sort((a, b) => a.priority - b.priority || b.count - a.count);
  const budget = ctx.input.maxCards ?? MAX_ASK_CARDS;
  let total = 0;
  const kept: RefreshAsk[] = [];
  for (const a of ordered) {
    if (total + a.count > budget) continue;
    kept.push(a);
    total += a.count;
  }
  return kept;
}

function topDomains(ctx: Ctx, n: number): DomainId[] {
  const domains = ctx.nodes.taxonomy.domains.map((d) => d.id);
  const scored = domains
    .map((d) => ({ d, i: ctx.interest(d), seen: ctx.state.topics[d]?.seen || 0 }))
    .sort((a, b) => b.i - a.i || b.seen - a.seen);
  return scored.slice(0, n).map((s) => s.d);
}

// ───────────────────────────── rendering ─────────────────────────────

export function renderBrief(brief: RefreshBrief, ctx: Ctx): string {
  const L: string[] = [];
  const nodes = ctx.nodes;
  const day = localDay(ctx.now);
  const totalCards = (brief.asks || []).reduce((n, a) => n + a.count, 0);
  const domains = [...new Set((brief.asks || []).map((a) => a.domain))];

  L.push(`# Refresh brief — ${day}`);
  L.push('');
  L.push(
    brief.coldStart
      ? '**Cold run.** No events yet, so every ask below comes from the priors and the card counts.'
      : `**${brief.daysOfData} days of data** · ${brief.metrics.cardsSeen} cards seen · ${brief.metrics.likes} likes · ${brief.metrics.saves} saves · ${brief.metrics.skips} skips · ${brief.metrics.tooHard} "over my head" · streak ${ctx.state.streak.current} (best ${ctx.state.streak.best}).`,
  );
  L.push('');
  L.push(`**Ask: ${totalCards} cards across ${domains.length} domains** (${domains.join(', ') || 'none'}), plus ${brief.inboxPriority.length} inbox items to triage.`);
  L.push('');
  L.push(`State: ${brief.stateSource === 'engine' ? 'replayed with src/engine' : 'analysis fold (src/engine unavailable — numbers are approximate)'} · index: ${ctx.input.indexSource} (${ctx.index.count} cards).`);
  L.push('');

  L.push('## 1. Act on these');
  L.push('');
  if (!brief.diagnosis.length) L.push('_Nothing alarming._');
  brief.diagnosis.forEach((d, i) => L.push(`${i + 1}. ${d}`));
  L.push('');

  L.push('## 2. What to write');
  L.push('');
  if (!brief.asks?.length) {
    L.push('_No asks: the library covers what he is reading. Do the inbox pass and stop._');
  }
  for (const domain of domains) {
    const list = (brief.asks || []).filter((a) => a.domain === domain);
    const n = list.reduce((s, a) => s + a.count, 0);
    L.push(`### ${nodes.name(domain)} (\`${domain}\`) — ${n} cards · packet: \`refresh/packets/${domain}.md\``);
    L.push('');
    for (const a of list) L.push(`- ${askLine(a)}`);
    L.push('');
  }

  L.push('## 3. Questions he asked (answer these first)');
  L.push('');
  if (!brief.openQuestions.length) L.push('_None open._');
  for (const q of brief.openQuestions) {
    L.push(`- \`${q.id}\` — "${q.text}"${q.card ? ` · on ${q.card}` : ''}${q.topic ? ` · ${nodes.name(q.topic)} (\`${q.topic}\`)` : ''} · asked ${localDay(q.t)}`);
  }
  L.push('');

  L.push('## 4. What he is working on');
  L.push('');
  L.push(brief.context ? brief.context : '_He has not said (the refresh asks once, optionally)._');
  L.push('');

  L.push('## 5. Backfill (the "over my head" debt)');
  L.push('');
  if (!brief.backfillRequests.length) L.push('_Nothing flagged._');
  for (const b of brief.backfillRequests) {
    L.push(
      `- \`${b.topic}\` (${nodes.name(b.topic)}) — needs ${b.needed} intuition cards at ≤ ${fmt(ctx.target(b.topic) + 0.5)}; mastery ${fmt2(ctx.mastery(b.topic))}; because: ${b.because.join(', ') || 'prerequisite gap'}`,
    );
  }
  L.push('');
  if (brief.revisitPending.length) {
    L.push('Pending revisits (the app promised to bring these back):');
    for (const r of brief.revisitPending) {
      L.push(`- ${r.card} — flagged ${localDay(r.flaggedAt)}; needs ${r.prereqs.map((p) => `\`${p}\``).join(', ') || 'no prereqs'} at mastery ${r.threshold}`);
    }
    L.push('');
  }

  L.push('## 6. Hungry topics');
  L.push('');
  if (!brief.hungryTopics.length) L.push('_None: every liked topic still has stock._');
  for (const h of brief.hungryTopics) {
    L.push(`- \`${h.topic}\` (${nodes.name(h.topic)}) — ${pct(h.likeRate)} land, ${h.unseenAtTarget} unseen at difficulty ${fmt(h.targetDifficulty)}`);
  }
  L.push('');

  L.push('## 7. Coverage gaps');
  L.push('');
  if (!brief.coverageGaps.length) L.push('_None in his top areas._');
  for (const g of brief.coverageGaps.slice(0, 25)) {
    L.push(`- \`${g.topic}\` (${nodes.name(g.topic)}) — ${g.cards}/${g.wanted} cards at his level`);
  }
  if (brief.coverageGaps.length > 25) L.push(`- … and ${brief.coverageGaps.length - 25} more (see brief.json)`);
  L.push('');

  L.push('## 8. What lands');
  L.push('');
  L.push('| format | seen | lands | angle | seen | lands |');
  L.push('|---|---:|---:|---|---:|---:|');
  const fr = Object.entries(brief.formatPerformance).sort((a, b) => b[1].n - a[1].n);
  const ar = Object.entries(brief.anglePerformance).sort((a, b) => b[1].n - a[1].n);
  for (let i = 0; i < Math.max(fr.length, ar.length); i++) {
    const f = fr[i];
    const a = ar[i];
    L.push(
      `| ${f ? f[0] : ''} | ${f ? f[1].n : ''} | ${f ? pct(f[1].positive / Math.max(1, f[1].n)) : ''} | ${a ? a[0] : ''} | ${a ? a[1].n : ''} | ${a ? pct(a[1].positive / Math.max(1, a[1].n)) : ''} |`,
    );
  }
  if (!fr.length && !ar.length) L.push('| _no data_ | | | | | |');
  L.push('');

  L.push('## 9. Difficulty targets');
  L.push('');
  const targets = Object.entries(brief.difficultyTargets)
    .filter(([id]) => (id.match(/\./g) || []).length <= 1)
    .sort((a, b) => a[0].localeCompare(b[0]));
  L.push(targets.length ? targets.map(([id, d]) => `\`${id}\` ${fmt(d)}`).join(' · ') : '_none yet_');
  L.push('');

  L.push('## 10. Inbox (top 25, ranked)');
  L.push('');
  if (!brief.inboxPriority.length) L.push('_Empty. Check the fetch-live workflow._');
  brief.inboxPriority.forEach((w, i) => {
    L.push(`${i + 1}. **${w.title}** — ${w.sourceName} · ${w.published?.slice(0, 10)} · \`${w.domain}\`${ctx.wireLikes.has(w.id) ? ' · **he tapped "distill this"**' : ''}`);
    L.push(`   ${w.url}`);
  });
  L.push('');

  if (brief.monthlyRecap) {
    L.push('## 11. Monthly recap (ready to write)');
    L.push('');
    L.push('A month boundary passed — run `npm run recap` to write it.');
    L.push('');
  }

  L.push('---');
  L.push('');
  L.push('Packets for the author agents are in `refresh/packets/`. Each packet is self-contained: give one to each author agent.');
  return L.join('\n') + '\n';
}

function askLine(a: RefreshAsk): string {
  const layer = a.layer === 'any' ? '' : `${a.layer}-layer `;
  const diff = a.difficulty[0] === a.difficulty[1] ? `${a.difficulty[0]}` : `${a.difficulty[0]}–${a.difficulty[1]}`;
  const formats = a.formats?.length ? `, formats ${a.formats.join('/')}` : '';
  return `Write ${a.count} ${layer}cards for \`${a.topic}\` (${a.topicName}) at difficulty ${diff}, weights ${a.weights.join('/')}${formats}; because: ${a.because}`;
}

export function renderPackets(brief: RefreshBrief, ctx: Ctx): { domain: DomainId; markdown: string; cards: number }[] {
  const nodes = ctx.nodes;
  const day = localDay(ctx.now);
  const byDomain = new Map<DomainId, RefreshAsk[]>();
  for (const a of brief.asks || []) byDomain.set(a.domain, [...(byDomain.get(a.domain) || []), a]);

  const out: { domain: DomainId; markdown: string; cards: number }[] = [];
  for (const [domain, asks] of byDomain) {
    const cards = asks.reduce((n, a) => n + a.count, 0);
    const L: string[] = [];
    const topics = [...new Set(asks.map((a) => a.topic))];

    L.push(`# Author packet — ${nodes.name(domain)} (\`${domain}\`) — ${day}`);
    L.push('');
    L.push(`Write **${cards} cards** into \`content/cards/${domain}/…\`. Everything you need is in this file; the brief it came from is \`refresh/brief.md\`.`);
    L.push('');
    if (cards > 45) {
      const n = Math.ceil(cards / 40);
      L.push(`> This packet is large: split it across **${n} author agents**, each taking a contiguous run of the numbered asks below (agent 1 starts at ask 1). Each agent uses a distinct \`author: author-${domain}-<n>\` id.`);
      L.push('');
    }
    L.push('Read first: `.data/docs/STYLE_GUIDE.md` (Part 1 and Part 2), `.data/docs/SCHEMA.md` (front matter and validation), `.data/docs/AUTHORING.md` if present.');
    L.push('');
    L.push('## The reader');
    L.push('');
    L.push('Lucas, math–economics undergrad in Bogotá. Mid-undergrad math (Rudin, Munkres, algebra); beginner in physics, biology, AI theory, computational social science. Reads English and Spanish. Falls into intense obsessions. If it feels like studying, he stops.');
    L.push('');
    if (brief.context) {
      L.push('## What he is working on right now');
      L.push('');
      L.push(brief.context);
      L.push('');
    }
    L.push('## Your asks');
    L.push('');
    asks.forEach((a, i) => {
      L.push(`### ${i + 1}. ${a.kind} — \`${a.topic}\` · ${a.count} cards`);
      L.push('');
      L.push(`- ${askLine(a)}`);
      const node = nodes.node(a.topic);
      if (node) {
        L.push(`- Taxonomy: **${node.name}** · level ${node.level} · parent \`${node.parent}\``);
        L.push(
          `- Prerequisites: ${node.prereqs.length ? node.prereqs.map((p) => `\`${p}\` (${nodes.name(p)}, mastery ${fmt2(ctx.mastery(p))})`).join(', ') : '_none_'}`,
        );
      }
      L.push(`- His difficulty target here: **${fmt(ctx.target(a.topic))}** · mastery ${fmt2(ctx.mastery(a.topic))} · cards that exist: ${ctx.nodes.cards(a.topic)}`);
      for (const n of a.notes || []) L.push(`- ${n}`);
      L.push('');
    });

    L.push('## Cards that already exist in these topics — do not duplicate');
    L.push('');
    let any = false;
    for (const t of topics) {
      const existing = [...ctx.cardsIn(t), ...nodes.topicsUnder(t).flatMap((x) => ctx.cardsIn(x))];
      if (!existing.length) continue;
      any = true;
      L.push(`**\`${t}\`**`);
      for (const c of existing.slice(0, 30)) {
        L.push(`- ${c.title} — \`${c.id}\` · ${c.format}/${c.layer} · d${c.difficulty} · ${c.weight}${ctx.seen(c.id) ? ' · seen' : ''}`);
      }
      L.push('');
    }
    if (!any) {
      L.push('_None of these topics has a card yet. You are writing the door into each one: pick the most surprising or human thing, never the definition (STYLE_GUIDE Part 1)._');
      L.push('');
    }

    const qs = brief.openQuestions.filter((q) => {
      const topic = q.topic || ctx.card(q.card || '')?.topic || '';
      return topic.startsWith(domain);
    });
    if (qs.length) {
      L.push('## Open questions in this domain');
      L.push('');
      for (const q of qs) L.push(`- \`${q.id}\` — "${q.text}" ${q.card ? `(asked on ${q.card})` : ''} → the card that answers it carries \`answersQuestion: ${q.id}\``);
      L.push('');
    }

    const backfills = brief.backfillRequests.filter((b) => b.topic.startsWith(domain));
    if (backfills.length) {
      L.push('## Why the backfill matters');
      L.push('');
      for (const b of backfills) {
        const causes = b.because.map((c) => `\`${c}\``).join(', ');
        L.push(`- He flagged ${causes || 'a card'} as "over my head". The engine will serve your \`${b.topic}\` cards in backfill slots, then bring the flagged card back with a "you flagged this on …" badge. Write the groundwork, not a simpler copy of the flagged card.`);
      }
      L.push('');
    }

    L.push('## Callback targets (topics he has actually touched)');
    L.push('');
    const touched = Object.entries(ctx.state.topics)
      .filter(([id, ts]) => ts.seen >= 2 && nodes.node(id)?.kind === 'topic' && !id.startsWith(domain))
      .sort((a, b) => b[1].seen - a[1].seen)
      .slice(0, 12)
      .map(([id]) => `\`${id}\` (${nodes.name(id)})`);
    L.push(touched.length ? touched.join(' · ') : '_He has no cross-domain history yet — use priors: math, ai, css, econ._');
    L.push('');

    L.push('## House rules (short version)');
    L.push('');
    L.push('- One file per card: `content/cards/' + domain + '/<area>/<slug>.md`, front matter exactly per SCHEMA §2.');
    L.push('- Intuition layer first, 40–190 words; `## Rigor` when the topic is technical; `## Recall` for idea/series/callback.');
    L.push('- Banned openers: "Have you ever wondered", "In the world of", "At its core", "Simply put", "Let\'s dive in".');
    L.push('- Every card needs ≥ 1 real, resolvable source URL. Never invent a reference, a quote or a date.');
    L.push('- Mix weights: roughly 30% light, 45% medium, 25% heavy.');
    L.push(`- \`author: author-${domain}-<n>\`, \`dates: {written: ${day}}\`.`);
    L.push('- Run `npm run validate content/cards/' + domain + '` until it is clean before you report back.');
    L.push('');
    out.push({ domain, markdown: L.join('\n') + '\n', cards });
  }
  return out.sort((a, b) => b.cards - a.cards);
}

// ───────────────────────────── small helpers ─────────────────────────────

function median(sorted: number[]): number {
  if (!sorted.length) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function pct(x: number): string {
  return `${Math.round(x * 100)}%`;
}

function fmt(x: number): string {
  return (Math.round(x * 10) / 10).toString();
}

function fmt2(x: number): string {
  return (Math.round(x * 100) / 100).toFixed(2);
}

function round(x: number, places: number): number {
  const f = Math.pow(10, places);
  return Math.round(x * f) / f;
}

function oneLine(s: string): string {
  return s.replace(/\s+/g, ' ').trim().slice(0, 240);
}
