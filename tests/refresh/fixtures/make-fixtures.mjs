/**
 * Regenerate the refresh fixtures (deterministic — run it and commit the output):
 *
 *   node tests/refresh/fixtures/make-fixtures.mjs
 *
 * Writes:
 *   index.json           a small ContentIndex (~200 cards) shaped like the real library
 *   events-2026-09.json  ~600 events over three weeks of a plausible reader
 *
 * The shape is chosen so the analysis has something to find: "over my head" flags in
 * ai.theory whose prerequisites have no cards, a topic he is eating through, skipped
 * philosophy and quotes, recalls, three questions, and sessions that get shorter.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DAY = 86400000;
const TZ = 5 * 3600 * 1000; // Bogota UTC-5

// ───────────────────────── the library ─────────────────────────

/** topic, how many cards, difficulty cycle, format cycle, weight cycle, language */
const SPEC = [
  ['math.topology.compactness', 6, [2, 3, 3, 4, 3, 4], ['idea', 'story', 'series', 'idea', 'challenge', 'idea'], ['medium', 'light', 'medium', 'heavy', 'light', 'heavy']],
  ['math.topology.connectedness', 5, [3, 3, 2, 4], ['idea', 'fact', 'idea', 'story'], ['medium', 'light', 'heavy', 'medium']],
  ['math.topology.fixed-points', 5, [4, 3, 4, 3], ['idea', 'callback', 'idea', 'challenge'], ['heavy', 'medium', 'medium', 'light']],
  ['math.topology.knots', 4, [3, 2, 3], ['story', 'idea', 'fact'], ['light', 'medium', 'light']],
  ['math.topology.continuity-homeomorphism', 4, [3, 3, 2], ['idea', 'fact', 'idea'], ['medium', 'light', 'medium']],
  ['math.analysis.metric-spaces', 3, [4, 4, 3], ['idea', 'idea', 'quote'], ['heavy', 'heavy', 'light']],
  ['math.analysis.sequences-limits', 4, [2, 3, 2], ['idea', 'idea', 'fact'], ['medium', 'medium', 'light']],
  ['math.analysis.fourier', 4, [3, 4, 3], ['idea', 'idea', 'callback'], ['medium', 'heavy', 'medium']],
  ['math.algebra.groups-basics', 5, [2, 3, 2, 3], ['idea', 'story', 'idea', 'fact'], ['medium', 'light', 'medium', 'light']],
  ['math.algebra.galois', 4, [4, 3, 5], ['story', 'idea', 'idea'], ['medium', 'heavy', 'heavy']],
  ['math.number-theory.primes-distribution', 4, [3, 2, 4], ['idea', 'fact', 'idea'], ['medium', 'light', 'heavy']],
  ['math.probability.conditional-bayes', 4, [2, 3, 2], ['idea', 'challenge', 'idea'], ['medium', 'light', 'medium']],
  ['math.linear-algebra.svd', 2, [4, 4], ['idea', 'idea'], ['heavy', 'heavy']],
  ['math.history.hilbert-problems', 3, [2, 3], ['story', 'quote'], ['medium', 'light']],

  ['ai.theory.double-descent', 4, [4, 3, 4, 2], ['idea', 'idea', 'series', 'fact'], ['heavy', 'medium', 'heavy', 'light']],
  ['ai.theory.benign-overfitting', 2, [5, 4], ['idea', 'idea'], ['heavy', 'heavy']],
  ['ai.theory.ntk', 2, [4, 5], ['idea', 'idea'], ['heavy', 'heavy']],
  ['ai.theory.grokking', 3, [3, 3, 2], ['idea', 'story', 'fact'], ['medium', 'medium', 'light']],
  ['ai.ml-basics.linear-models', 2, [4, 5], ['idea', 'idea'], ['heavy', 'heavy']],
  ['ai.llm.attention', 5, [2, 3, 2, 3], ['idea', 'idea', 'fact', 'callback'], ['medium', 'heavy', 'light', 'medium']],
  ['ai.llm.scaling-laws', 4, [2, 3, 2], ['idea', 'news', 'idea'], ['medium', 'light', 'medium']],
  ['ai.llm.hallucination', 3, [2, 2, 3], ['idea', 'story', 'idea'], ['medium', 'light', 'medium']],
  ['ai.history.perceptron-winter', 3, [1, 2, 2], ['story', 'story', 'quote'], ['light', 'medium', 'light']],

  ['css.llm-agents.simulation-validity', 4, [2, 3, 2], ['idea', 'idea', 'challenge'], ['medium', 'medium', 'light']],
  ['css.networks.small-world', 4, [2, 2, 3], ['idea', 'fact', 'idea'], ['medium', 'light', 'medium']],
  ['css.abm.schelling', 4, [2, 2, 3], ['idea', 'story', 'idea'], ['medium', 'medium', 'heavy']],
  ['css.opinion-dynamics.polarization', 3, [2, 3], ['idea', 'news'], ['medium', 'light']],

  ['econ.behavioral.prospect-theory', 4, [2, 3, 2], ['idea', 'story', 'idea'], ['medium', 'medium', 'light']],
  ['econ.game-theory.nash-equilibrium', 4, [3, 2, 3], ['idea', 'story', 'callback'], ['medium', 'medium', 'heavy']],
  ['econ.causal.diff-in-diff', 3, [3, 2, 3], ['idea', 'idea', 'challenge'], ['medium', 'medium', 'light']],
  ['econ.history-thought.keynes-hayek', 3, [2, 2], ['story', 'quote'], ['medium', 'light']],

  ['phil.mind.hard-problem', 4, [2, 2, 3], ['idea', 'quote', 'idea'], ['medium', 'light', 'medium']],
  ['phil.ethics.trolley-dilemmas', 3, [1, 2], ['idea', 'challenge'], ['light', 'medium']],
  ['phil.science.kuhn-paradigms', 3, [1, 2], ['story', 'quote'], ['medium', 'light']],
  ['phil.epistemology.gettier', 3, [2, 2], ['idea', 'challenge'], ['medium', 'light']],

  ['physics.quantum.measurement', 3, [1, 2], ['idea', 'story'], ['medium', 'medium']],
  ['bio.evolution.natural-selection', 3, [1, 2], ['idea', 'fact'], ['medium', 'light']],
  ['hist.latam.independence', 3, [2, 2], ['story', 'fact'], ['medium', 'light'], 'es'],
  ['poli.colombia.peace-process', 2, [2, 2], ['story', 'news'], ['medium', 'light'], 'es'],
  ['sports.football-analytics.expected-goals', 3, [2, 3], ['idea', 'fact'], ['medium', 'light']],
  ['niche.curiosities.odd-facts', 4, [1, 1, 2], ['fact', 'fact', 'story'], ['light', 'light', 'light']],
];

const ANGLES = ['paradox', 'connection', 'history', 'beautiful', 'weird', 'human', 'practical', 'numbers', 'open-problem', 'tool'];
const TITLES = [
  'The move that makes infinity behave',
  'The plot that should not exist',
  'What nobody tells you first',
  'The mistake that started it',
  'Two things that turn out to be one',
  'A number that is too big to be true',
  'The argument he lost on purpose',
  'Why the obvious answer is wrong',
  'The shortcut everyone uses',
  'It was a legend, and here is the truth',
];

function buildIndex() {
  const cards = [];
  for (const [topic, n, diffs, formats, weights, language] of SPEC) {
    for (let i = 0; i < n * 2; i++) {
      const difficulty = diffs[i % diffs.length];
      const format = formats[i % formats.length];
      const weight = weights[i % weights.length];
      const hasRigor = ['idea', 'series', 'callback'].includes(format) && difficulty >= 3;
      cards.push({
        id: `${topic}.c${i + 1}`,
        topic,
        domain: topic.split('.')[0],
        format,
        layer: hasRigor ? 'both' : 'intuition',
        difficulty,
        language: language || 'en',
        weight,
        angles: [ANGLES[(i + topic.length) % ANGLES.length], ANGLES[(i * 3 + 1) % ANGLES.length]],
        tags: [topic.split('.').pop(), `t${i + 1}`],
        prerequisites: [],
        title: `${TITLES[(i + topic.length) % TITLES.length]} (${topic.split('.').pop()} ${i + 1})`,
        hook: 'One surprising true thing, then the reason it matters.',
        dates: { written: '2026-08-01' },
        evergreen: format !== 'news',
        hasRigor,
        hasRecall: ['idea', 'series', 'callback', 'challenge'].includes(format),
        hasDiagram: i === 0 && difficulty >= 3,
        words: { body: weight === 'light' ? 70 : weight === 'medium' ? 130 : 180, rigor: hasRigor ? 150 : 0 },
        author: `author-${topic.split('.')[0]}-1`,
        reviewed: { by: 'reviewer-fixture', at: '2026-08-02', verdict: 'approved' },
      });
    }
  }
  return { builtAt: '2026-08-15T00:00:00.000Z', count: cards.length, cards };
}

// ───────────────────────── the reader ─────────────────────────

function mulberry32(seed) {
  return function rnd() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** how much he likes each area */
const TASTE = {
  'math.topology': 0.9,
  'math.algebra': 0.8,
  'math.analysis': 0.7,
  'math.number-theory': 0.7,
  'math.probability': 0.65,
  'math.linear-algebra': 0.6,
  'math.history': 0.6,
  'ai.theory': 0.75,
  'ai.llm': 0.7,
  'ai.ml-basics': 0.5,
  'ai.history': 0.5,
  'css.llm-agents': 0.8,
  'css.networks': 0.6,
  'css.abm': 0.6,
  'css.opinion-dynamics': 0.5,
  'econ.behavioral': 0.6,
  'econ.game-theory': 0.6,
  'econ.causal': 0.45,
  'econ.history-thought': 0.35,
  'phil.mind': 0.12,
  'phil.ethics': 0.1,
  'phil.science': 0.12,
  'phil.epistemology': 0.15,
  'physics.quantum': 0.4,
  'bio.evolution': 0.4,
  'hist.latam': 0.45,
  'poli.colombia': 0.4,
  'sports.football-analytics': 0.5,
  'niche.curiosities': 0.6,
};

const area = (topic) => topic.split('.').slice(0, 2).join('.');

/** cards held back for the scheduled beats below */
let RESERVED = new Set();

/** Scheduled beats, so the fixture always exercises the paths the tests check. */
const TOO_HARD = [
  { day: 6, card: 'ai.theory.double-descent.c1' },
  { day: 10, card: 'ai.theory.benign-overfitting.c1' },
  { day: 13, card: 'ai.theory.ntk.c1' },
  { day: 16, card: 'ai.ml-basics.linear-models.c2' },
];

const QUESTIONS = [
  { day: 6, card: 'ai.theory.double-descent.c2', id: 'q-2026-09-03-7f3a', text: 'why does the peak happen exactly at interpolation?' },
  { day: 11, card: 'math.topology.fixed-points.c1', id: 'q-2026-09-08-2b1c', text: 'is Brouwer really the same idea as Nash existence, or just similar?' },
  { day: 17, card: 'css.llm-agents.simulation-validity.c1', id: 'q-2026-09-14-9d4e', text: 'how would I even validate an agent-based election model against real data?' },
];

function buildEvents(index) {
  const rnd = mulberry32(20260919);
  RESERVED = new Set([...TOO_HARD.map((b) => b.card), ...QUESTIONS.map((q) => q.card)]);
  const byId = new Map(index.cards.map((c) => [c.id, c]));
  const events = [];
  let seq = 0;

  const push = (t, type, extra = {}) => {
    events.push({ id: `${Math.floor(t).toString(36)}-${(seq++).toString(36).padStart(3, '0')}`, t: Math.floor(t), type, ...extra });
  };

  const START = Date.parse('2026-08-29T00:00:00Z') + TZ; // day 0, Bogota
  const served = new Set();
  const positive = new Set();
  const recallPool = [];

  const pick = (avoidPhil) => {
    const pool = index.cards.filter((c) => !served.has(c.id) && !RESERVED.has(c.id));
    if (!pool.length) return null;
    const weighted = pool.map((c) => {
      let w = TASTE[area(c.topic)] ?? 0.4;
      if (avoidPhil && c.domain === 'phil') w *= 0.35;
      if (c.format === 'quote') w *= 1.1; // they still get served; he skips them
      return { c, w: w * w };
    });
    const total = weighted.reduce((s, x) => s + x.w, 0);
    let r = rnd() * total;
    for (const x of weighted) {
      r -= x.w;
      if (r <= 0) return x.c;
    }
    return weighted[weighted.length - 1].c;
  };

  for (let day = 0; day < 21; day++) {
    const dayStart = START + day * DAY;
    if (day === 4 || day === 12) continue; // two days off
    const week = Math.floor(day / 7);
    const sessions = day % 5 === 3 || day % 7 === 1 ? 2 : 1;

    for (let sIdx = 0; sIdx < sessions; sIdx++) {
      const s = `dev1-${Math.floor(dayStart).toString(36)}${sIdx}`;
      let t = dayStart + (sIdx === 0 ? 8 : 15) * 3600000 + Math.floor(rnd() * 3600000);
      push(t, 'session_start', { s });
      const minutes = [16, 11, 7][week] + Math.floor(rnd() * 4) - 1 + (sIdx === 1 ? -2 : 0);
      const cardCount = Math.max(6, Math.min(14, Math.round(minutes * 0.95)));
      let seen = 0;

      for (let i = 0; i < cardCount; i++) {
        t += 40000 + rnd() * 120000;

        // scheduled "over my head"
        const beat = TOO_HARD.find((b) => b.day === day && sIdx === 0 && i === 2 && !served.has(b.card));
        const card = beat ? byId.get(beat.card) : pick(sIdx === 1);
        if (!card) break;
        served.add(card.id);
        seen += 1;

        const expected = (card.words.body / 3.3) * 1000;
        const taste = TASTE[area(card.topic)] ?? 0.4;
        const heavyPenalty = card.weight === 'heavy' ? 0.15 + week * 0.12 : 0;
        const quotePenalty = card.format === 'quote' ? 0.55 : 0;
        const skipP = Math.max(0.03, (1 - taste) * 0.8 + heavyPenalty + quotePenalty - 0.1);

        if (beat) {
          push(t, 'view', { s, card: card.id, topic: card.topic, data: { dwellMs: Math.round(expected * 0.9), readFraction: 0.8 } });
          push(t + 3000, 'too_hard', { s, card: card.id, topic: card.topic });
          continue;
        }

        if (rnd() < skipP) {
          push(t, 'view', { s, card: card.id, topic: card.topic, data: { dwellMs: Math.round(1200 + rnd() * 1500), readFraction: 0.1 } });
          push(t + 1500, 'skip', { s, card: card.id, topic: card.topic });
          continue;
        }

        const dwell = Math.round(expected * (0.7 + rnd() * 0.8));
        push(t, 'view', { s, card: card.id, topic: card.topic, data: { dwellMs: dwell, readFraction: 0.7 + rnd() * 0.3 } });
        if (rnd() < taste * 0.75) {
          push(t + 2000, 'like', { s, card: card.id, topic: card.topic });
          positive.add(card.id);
          if (card.hasRecall) recallPool.push(card.id);
        }
        if (rnd() < taste * 0.18) push(t + 2500, 'save', { s, card: card.id, topic: card.topic });
        if (card.hasRigor && rnd() < taste * 0.55) push(t + 4000, 'rigor_open', { s, card: card.id, topic: card.topic });
        if (rnd() < 0.07) push(t + 5000, 'source_open', { s, card: card.id, topic: card.topic });
        if (card.format === 'series' && rnd() < 0.6) push(t + 6000, 'series_next', { s, card: card.id, topic: card.topic });
        if (card.difficulty <= 1 && rnd() < 0.25) push(t + 3000, 'too_easy', { s, card: card.id, topic: card.topic });

        // a recall item every few cards, on something he read a while ago
        if (i > 0 && i % 3 === 0 && recallPool.length > 3) {
          const target = recallPool[Math.floor(rnd() * recallPool.length)];
          const grade = rnd() < 0.12 ? 1 : rnd() < 0.35 ? 2 : rnd() < 0.85 ? 3 : 4;
          t += 20000;
          push(t, 'recall', { s, card: target, topic: byId.get(target)?.topic, data: { grade, correct: grade >= 3 } });
        }

      }

      // a question he types, on a card he reads that day
      const q = QUESTIONS.find((x) => x.day === day && sIdx === 0);
      if (q && !byId.get(q.card).asked) {
        byId.get(q.card).asked = true;
        const qc = byId.get(q.card);
        t += 45000;
        served.add(qc.id);
        push(t, 'view', { s, card: qc.id, topic: qc.topic, data: { dwellMs: Math.round((qc.words.body / 3.3) * 1000), readFraction: 0.9 } });
        push(t + 2000, 'like', { s, card: qc.id, topic: qc.topic });
        push(t + 7000, 'question', { s, card: qc.id, topic: qc.topic, data: { id: q.id, text: q.text } });
      }

      // wire items (the live inbox), a couple of which he wants distilled
      if (day % 3 === 0) {
        t += 60000;
        push(t, 'wire', { s, data: { id: `w-${day}-1`, source: 'quanta', action: day === 9 ? 'like' : 'view' } });
        push(t + 4000, 'wire', { s, data: { id: `w-${day}-2`, source: 'arxiv-cs-lg', action: day === 15 ? 'like' : 'skip' } });
      }

      if (day === 8 && sIdx === 0) push(t + 30000, 'focus', { s, data: { topic: 'math.topology' } });
      if (day === 2 && sIdx === 0) push(t + 30000, 'milestone', { s, data: { id: 'first-10-cards' } });
      if (day === 9 && sIdx === 0) push(t + 30000, 'milestone', { s, data: { id: 'first-too-hard' } });

      t += 120000;
      push(t, 'session_end', { s, data: { minutes, cards: seen } });
    }
  }

  events.sort((a, b) => a.t - b.t);
  return events;
}

const index = buildIndex();
const events = buildEvents(index);
writeFileSync(join(HERE, 'index.json'), JSON.stringify(index, null, 1) + '\n');
writeFileSync(join(HERE, 'events-2026-09.json'), JSON.stringify(events) + '\n');
console.log(`index: ${index.count} cards`);
console.log(`events: ${events.length} (${new Date(events[0].t).toISOString().slice(0, 10)} to ${new Date(events[events.length - 1].t).toISOString().slice(0, 10)})`);
const byType = {};
for (const e of events) byType[e.type] = (byType[e.type] || 0) + 1;
console.log(byType);
