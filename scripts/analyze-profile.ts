/**
 * analyze-profile — read the reader's synced feedback and say what to write next.
 *
 *   npm run analyze
 *   npx tsx scripts/analyze-profile.ts --fixture tests/refresh/fixtures/events-2026-09.json
 *
 * Writes:
 *   refresh/brief.json          RefreshBrief (src/types.ts)
 *   refresh/brief.md            the same thing for a human, ordered by priority
 *   refresh/packets/<domain>.md one self-contained packet per author agent
 *
 * Options:
 *   --fixture <file>  events from this JSON file instead of .data/events/*.json
 *   --index <file>    a ContentIndex to use instead of public/content/index.json
 *   --data <dir>      the data-repo clone (default .data)
 *   --out <dir>       output directory (default refresh)
 *   --now <iso>       pretend "now" is this instant (tests)
 *   --no-build        never shell out to build-content.mjs
 *   --max-cards <n>   cap the total cards requested (default 200)
 *   --quiet           only print the summary line
 */
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import type { EngineDeps } from '../src/types.ts';
import { buildBrief } from './lib/refresh-brief.ts';
import { loadDataRepo, loadIndex, loadPriors, loadSourceWeights, loadTaxonomy, loadWire, Nodes } from './lib/refresh-data.ts';
import { pendingRecapMonths, recapFor } from './lib/refresh-recap.ts';
import { buildState } from './lib/refresh-state.ts';
import { arg, at, ensureDir, flag, say, walk, warn, writeJson, writeText } from './lib/refresh-io.mjs';

const argv = process.argv.slice(2);
const quiet = flag(argv, 'quiet');
const nowArg = arg(argv, 'now');
const now = nowArg ? Date.parse(nowArg) : Date.now();
const outDir = at(arg(argv, 'out', 'refresh') as string);
const dataDir = at(arg(argv, 'data', '.data') as string);
const fixture = arg(argv, 'fixture');

async function main(): Promise<void> {
  if (!Number.isFinite(now)) throw new Error(`--now is not a date: ${nowArg}`);

  const taxonomy = loadTaxonomy();
  const priors = loadPriors();
  const { index, source: indexSource } = loadIndex({ build: !flag(argv, 'no-build'), file: arg(argv, 'index') });
  const data = loadDataRepo(dataDir, fixture ? at(fixture) : undefined);
  const wire = loadWire();
  const sourceWeights = loadSourceWeights();

  if (!quiet) {
    say(`events: ${data.events.length}${fixture ? ` (fixture ${fixture})` : data.present ? ` from ${dataDir}` : ' — no .data/ yet, cold run'}`);
    say(`content: ${index.count} cards (${indexSource}) · inbox: ${wire.filter((w) => w.status === 'fresh').length} fresh`);
  }

  const deps: EngineDeps = { index, taxonomy, priors, wire, now: () => now };
  const { state, source: stateSource, note } = await buildState(deps, data.events);
  if (!quiet) say(`state: ${note}`);

  // A month boundary since the last recap? Build it so the brief can carry it.
  let monthlyRecap: string | undefined;
  const pending = pendingRecapMonths(data, data.events, now);
  if (pending.length) {
    try {
      monthlyRecap = await recapFor(pending[pending.length - 1], deps, data.events, new Nodes(taxonomy, index));
      if (!quiet) say(`recap pending for ${pending.join(', ')} — run: npm run recap`);
    } catch (err) {
      warn('recap failed:', (err as Error).message);
    }
  }

  const { brief, markdown, packets } = buildBrief({
    state,
    events: data.events,
    index,
    taxonomy,
    priors,
    wire,
    sourceWeights,
    data,
    now,
    stateSource,
    stateNote: note,
    monthlyRecap,
    indexSource,
    maxCards: Number(arg(argv, 'max-cards', '200')),
  });

  ensureDir(outDir);
  const packetDir = ensureDir(join(outDir, 'packets'));
  for (const stale of walk(packetDir, (n) => n.endsWith('.md'))) rmSync(stale, { force: true });

  writeJson(join(outDir, 'brief.json'), brief);
  writeText(join(outDir, 'brief.md'), markdown);
  for (const p of packets) writeText(join(packetDir, `${p.domain}.md`), p.markdown);

  const total = (brief.asks || []).reduce((n, a) => n + a.count, 0);
  say('');
  say(`brief: ${rel(join(outDir, 'brief.md'))}  (read this first)`);
  say(`       ${rel(join(outDir, 'brief.json'))}`);
  for (const p of packets) say(`packet: ${rel(join(packetDir, `${p.domain}.md`))}  — ${p.cards} cards`);
  say('');
  say(
    `${total} cards requested across ${packets.length} domains · ${brief.openQuestions.length} open questions · ${brief.backfillRequests.length} backfill topics · ${brief.inboxPriority.length} inbox items · ${brief.diagnosis.length} diagnoses`,
  );
  if (brief.coldStart) say('Cold run: no events yet. Set up phone sync (Settings → Sync) so the next refresh has data.');
}

function rel(p: string): string {
  return p.replace(at('.') + '\\', '').replace(at('.') + '/', '').replace(/\\/g, '/');
}

main().catch((err) => {
  console.error('[error] analyze-profile failed:', err?.stack || err);
  process.exit(1);
});
