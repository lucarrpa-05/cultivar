/**
 * recap — the monthly "what you understand now" card for the You tab.
 *
 *   npm run recap                 every finished month that has no recap yet
 *   npm run recap -- --month 2026-09
 *
 * Writes public/content/recap-YYYY-MM.md (shipped with the app) and
 * .data/recaps/YYYY-MM.md (kept in the private data repo).
 */
import { join } from 'node:path';
import type { EngineDeps } from '../src/types.ts';
import { loadDataRepo, loadIndex, loadPriors, loadTaxonomy, loadWire, Nodes } from './lib/refresh-data.ts';
import { pendingRecapMonths, recapFor, recapPaths } from './lib/refresh-recap.ts';
import { arg, at, flag, isDir, say, writeText } from './lib/refresh-io.mjs';

const argv = process.argv.slice(2);
const nowArg = arg(argv, 'now');
const now = nowArg ? Date.parse(nowArg) : Date.now();
const dataDir = at(arg(argv, 'data', '.data') as string);
const fixture = arg(argv, 'fixture');

async function main(): Promise<void> {
  const taxonomy = loadTaxonomy();
  const priors = loadPriors();
  const { index } = loadIndex({ build: !flag(argv, 'no-build'), file: arg(argv, 'index') });
  const data = loadDataRepo(dataDir, fixture ? at(fixture) : undefined);
  if (!data.events.length) {
    say('No events yet — nothing to recap.');
    return;
  }

  const only = arg(argv, 'month');
  const months = only ? [only] : pendingRecapMonths(data, data.events, now);
  if (!months.length) {
    say('No month boundary passed since the last recap.');
    return;
  }

  const deps: EngineDeps = { index, taxonomy, priors, wire: loadWire(), now: () => now };
  const nodes = new Nodes(taxonomy, index);

  for (const month of months) {
    const markdown = await recapFor(month, deps, data.events, nodes);
    const paths = recapPaths(month, dataDir);
    writeText(paths.app, markdown);
    say(`recap ${month}: ${paths.app.replace(at('.') + '\\', '').replace(/\\/g, '/')}`);
    if (isDir(dataDir)) {
      writeText(paths.data, markdown);
      say(`           ${join('.data', 'recaps', `${month}.md`).replace(/\\/g, '/')} (push with: npm run push-data)`);
    }
  }
}

main().catch((err) => {
  console.error('[error] recap failed:', err?.stack || err);
  process.exit(1);
});
