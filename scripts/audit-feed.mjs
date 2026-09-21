#!/usr/bin/env node
/** Measure the day-seven feed goals against synced events and the shipped index. */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXPOSURE_TYPES = new Set(['pass', 'view', 'skip', 'too_hard', 'like', 'save', 'rigor_open', 'recall_answer', 'question']);
const DAY = 86_400_000;

export function auditFeed(index, events, since, days = 7) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(since)) throw new Error('--since must be YYYY-MM-DD (Bogotá date)');
  if (!Number.isInteger(days) || days < 1) throw new Error('--days must be a positive integer');
  const start = Date.parse(`${since}T05:00:00Z`); // Bogotá has a fixed UTC−5 offset.
  if (!Number.isFinite(start)) throw new Error('invalid --since date');
  const end = start + days * DAY;
  const cards = new Map(index.cards.map((card) => [card.id, card]));
  const availableDomains = [...new Set(index.cards.map((card) => card.domain))].sort();
  const windowEvents = events.filter((event) => event.t >= start && event.t < end)
    .sort((a, b) => a.t - b.t || String(a.id).localeCompare(String(b.id)));
  const exposures = [];
  const exposed = new Set();
  const focusMisses = [];
  const unverifiedFocusRequests = [];
  for (const event of windowEvents) {
    if (event.type === 'focus') {
      const topic = event.data?.topic;
      if (typeof topic === 'string' && event.data?.available === undefined) {
        // Older events did not record whether feedback was shown. The current
        // index may contain cards added later, so it cannot prove availability.
        unverifiedFocusRequests.push(topic);
        if (!index.cards.some((card) => card.topic === topic || card.topic.startsWith(`${topic}.`))) focusMisses.push(topic);
      }
    }
    if (!EXPOSURE_TYPES.has(event.type) || typeof event.card !== 'string') continue;
    const card = cards.get(event.card);
    if (!card) continue;
    const key = `${event.s || 'unknown'}:${event.card}`;
    if (exposed.has(key)) continue;
    exposed.add(key);
    exposures.push({ session: event.s || 'unknown', card });
  }

  const bySession = new Map();
  for (const exposure of exposures) {
    if (!bySession.has(exposure.session)) bySession.set(exposure.session, []);
    bySession.get(exposure.session).push(exposure.card);
  }
  const sessions = [...bySession.entries()].map(([id, list]) => {
    const mathCards = list.filter((card) => card.domain === 'math').length;
    return {
      id,
      cards: list.length,
      mathCards,
      mathShare: mathCards / list.length,
      mathWithinRoundedCap: mathCards <= Math.max(1, Math.ceil(0.35 * list.length)),
      callbackCount: list.filter((card) => card.format === 'callback').length,
      adjacentSameDomain: list.slice(1).filter((card, i) => card.domain === list[i].domain).length,
    };
  });
  const bodyWords = exposures.map(({ card }) => card.words?.body).filter(Number.isFinite).sort((a, b) => a - b);
  const middle = Math.floor(bodyWords.length / 2);
  const medianBodyWords = bodyWords.length
    ? bodyWords.length % 2 ? bodyWords[middle] : (bodyWords[middle - 1] + bodyWords[middle]) / 2
    : null;
  const domains = [...new Set(exposures.map(({ card }) => card.domain))].sort();
  const answeredQuestions = [...new Set(exposures.map(({ card }) => card.answersQuestion).filter(Boolean))];
  const mathShare = exposures.length ? exposures.filter(({ card }) => card.domain === 'math').length / exposures.length : null;

  return {
    window: { since, days, through: new Date(end).toISOString() },
    sample: { exposures: exposures.length, sessions: sessions.length },
    mathShare,
    medianBodyWords,
    domains,
    missingDomains: availableDomains.filter((domain) => !domains.includes(domain)),
    answeredQuestions,
    silentFocusMisses: focusMisses,
    unverifiedFocusRequests,
    sessions,
    goals: {
      mathAtMost35Percent: mathShare !== null && mathShare <= 0.35 && sessions.every((session) => session.mathWithinRoundedCap),
      everyDomainTouched: domains.length === availableDomains.length,
      medianBodyUnder130: medianBodyWords !== null && medianBodyWords < 130,
      noSilentFocusMisses: focusMisses.length === 0 && unverifiedFocusRequests.length === 0,
      questionAnswered: answeredQuestions.length > 0,
    },
  };
}

function readEvents(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((name) => /^\d{4}-\d{2}\.json$/.test(name))
    .flatMap((name) => {
      const parsed = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));
      return Array.isArray(parsed) ? parsed : Array.isArray(parsed.events) ? parsed.events : [];
    });
}

function main(args) {
  const value = (name) => {
    const flag = args.find((arg) => arg.startsWith(`${name}=`));
    return flag?.slice(name.length + 1);
  };
  if (args.includes('--help') || args.includes('-h')) {
    console.log('usage: node scripts/audit-feed.mjs --since=YYYY-MM-DD [--days=7] [--json]');
    return;
  }
  const since = value('--since');
  if (!since) throw new Error('--since is required; use the first Bogotá day after deployment');
  const days = Number(value('--days') || 7);
  const index = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/content/index.json'), 'utf8'));
  const result = auditFeed(index, readEvents(path.join(ROOT, '.data/events')), since, days);
  if (args.includes('--json')) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`${result.sample.exposures} cards observed in ${result.sample.sessions} sessions`);
    console.log(`Math: ${result.mathShare === null ? '—' : (100 * result.mathShare).toFixed(1) + '%'} · median body: ${result.medianBodyWords ?? '—'} words`);
    console.log(`Domains: ${result.domains.join(', ') || '—'} · missing: ${result.missingDomains.join(', ') || 'none'}`);
    console.log(`Answered questions: ${result.answeredQuestions.length} · silent focus misses: ${result.silentFocusMisses.length} · unverified focus requests: ${result.unverifiedFocusRequests.length}`);
    for (const [goal, passed] of Object.entries(result.goals)) console.log(`${passed ? '✓' : '·'} ${goal}`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
