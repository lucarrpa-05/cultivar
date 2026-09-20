/**
 * mark-distilled — close the loop on the live inbox after the news pass.
 *
 *   node scripts/mark-distilled.mjs                          # uses refresh/distilled.json + refresh/dropped.json
 *   node scripts/mark-distilled.mjs --map refresh/distilled.json
 *   node scripts/mark-distilled.mjs --drop 9f3a1b2c4d5e,7a1b2c3d4e5f
 *
 * refresh/distilled.json : { "<wireId>": "<cardId>", ... }
 * refresh/dropped.json   : ["<wireId>", ...]  or  [{ "id": "...", "why": "..." }]
 *
 * Items keep their id: the fetcher will not re-add a distilled/dropped item.
 */
import { arg, at, flag, readJson, say, warn, writeJson } from './lib/refresh-io.mjs';

const argv = process.argv.slice(2);
const queuePath = at(arg(argv, 'queue', 'data/inbox/queue.json'));
const mapPath = at(arg(argv, 'map', 'refresh/distilled.json'));
const droppedPath = at(arg(argv, 'dropped', 'refresh/dropped.json'));
const dryRun = flag(argv, 'dry-run');

function main() {
  const queue = readJson(queuePath, null);
  if (!queue) {
    warn(`No inbox queue at ${queuePath} — nothing to mark. (The fetch-live workflow writes it.)`);
    return;
  }
  const items = Array.isArray(queue) ? queue : queue.items || [];
  const byId = new Map(items.map((i) => [i.id, i]));

  const map = readJson(mapPath, {}) || {};
  const droppedFile = readJson(droppedPath, []) || [];
  const dropIds = new Set(
    [
      ...(arg(argv, 'drop', '') || '').split(',').map((s) => s.trim()).filter(Boolean),
      ...(Array.isArray(droppedFile) ? droppedFile : droppedFile.items || []).map((d) => (typeof d === 'string' ? d : d.id)),
    ].filter(Boolean),
  );

  let distilled = 0;
  let dropped = 0;
  const unknown = [];

  for (const [wireId, cardId] of Object.entries(map)) {
    const item = byId.get(wireId);
    if (!item) {
      unknown.push(wireId);
      continue;
    }
    item.status = 'distilled';
    item.distilledCard = String(cardId);
    distilled += 1;
  }

  for (const wireId of dropIds) {
    const item = byId.get(wireId);
    if (!item) {
      unknown.push(wireId);
      continue;
    }
    if (item.status === 'distilled') continue;
    item.status = 'dropped';
    dropped += 1;
  }

  if (unknown.length) warn(`not in the queue (ignored): ${unknown.slice(0, 8).join(', ')}${unknown.length > 8 ? ` +${unknown.length - 8}` : ''}`);

  if (dryRun) {
    say(`dry run: would mark ${distilled} distilled and ${dropped} dropped in ${queuePath}`);
    return;
  }

  if (!distilled && !dropped) {
    say('Nothing to mark (no distilled.json / dropped.json entries matched the queue).');
    return;
  }

  if (Array.isArray(queue)) writeJson(queuePath, items);
  else writeJson(queuePath, { ...queue, updatedAt: new Date().toISOString(), items });

  const fresh = items.filter((i) => i.status === 'fresh').length;
  say(`inbox: ${distilled} distilled, ${dropped} dropped, ${fresh} still fresh.`);
}

main();
