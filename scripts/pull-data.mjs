/**
 * pull-data — bring the private feedback repo (cultivar-data) into .data/ (gitignored).
 *
 *   npm run pull-data
 *   node scripts/pull-data.mjs --owner lucarrpa-05 --repo cultivar-data --dir .data
 *
 * Tolerates: no repo yet (scaffolds empty files and prints how to create it), no
 * network (uses whatever is already in .data/), and no gh auth (falls back to the
 * app repo's origin, then to $CULTIVAR_OWNER).
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { arg, at, ensureDir, isDir, localDay, readJson, run, say, walk, warn, writeJson, writeText } from './lib/refresh-io.mjs';

const argv = process.argv.slice(2);
const dir = at(arg(argv, 'dir', '.data'));
const repo = arg(argv, 'repo', 'cultivar-data');

function resolveOwner() {
  const explicit = arg(argv, 'owner') || process.env.CULTIVAR_OWNER;
  if (explicit) return explicit;
  const gh = run('gh', ['api', 'user', '-q', '.login']);
  if (gh.ok && gh.stdout) return gh.stdout.split('\n').pop().trim();
  const origin = run('git', ['remote', 'get-url', 'origin']);
  if (origin.ok) {
    const m = /github\.com[:/]([^/]+)\//.exec(origin.stdout);
    if (m) return m[1];
  }
  return null;
}

function scaffold(reason) {
  ensureDir(dir);
  ensureDir(join(dir, 'events'));
  ensureDir(join(dir, 'recaps'));
  if (!existsSync(join(dir, 'questions.json'))) writeJson(join(dir, 'questions.json'), []);
  if (!existsSync(join(dir, 'meta.json'))) writeJson(join(dir, 'meta.json'), {});
  if (!existsSync(join(dir, 'profile.json'))) writeJson(join(dir, 'profile.json'), {});
  if (!existsSync(join(dir, 'context.md'))) {
    writeText(
      join(dir, 'context.md'),
      '# What Lucas is studying / working on\n\nOne dated entry per refresh. The app never writes this file.\n',
    );
  }
  warn(reason);
}

function summarize() {
  const months = walk(join(dir, 'events'), (n) => n.endsWith('.json'));
  let events = 0;
  for (const f of months) {
    const raw = readJson(f, null);
    const list = Array.isArray(raw) ? raw : raw?.events || [];
    events += list.length;
  }
  const questions = readJson(join(dir, 'questions.json'), []) || [];
  const open = Array.isArray(questions) ? questions.filter((q) => q.status !== 'answered').length : 0;
  const meta = readJson(join(dir, 'meta.json'), {}) || {};
  say('');
  say(`data: ${events} events in ${months.length} month file${months.length === 1 ? '' : 's'} · ${open} open question${open === 1 ? '' : 's'}`);
  if (meta.lastPush) {
    const days = Math.floor((Date.now() - meta.lastPush) / 86400000);
    say(`last push from the phone: ${localDay(meta.lastPush)} (${days} day${days === 1 ? '' : 's'} ago)`);
    if (days >= 10) warn('No sync in over a week — the phone token may have expired (phone → Settings → Sync → Test).');
  } else if (events === 0) {
    say('No events yet. On the phone: Settings → Sync → paste the token → Test → Save.');
  }
}

function main() {
  if (isDir(join(dir, '.git'))) {
    const pull = run('git', ['-C', dir, 'pull', '--ff-only']);
    if (pull.ok) say(`pulled ${repo}: ${pull.stdout.split('\n')[0] || 'up to date'}`);
    else warn(`could not pull (offline?): ${(pull.stderr || pull.error).split('\n')[0]} — using the local copy`);
    summarize();
    return;
  }

  const owner = resolveOwner();
  if (!owner) {
    scaffold('No GitHub owner found (gh not authenticated and no origin remote). Run `gh auth login`, or pass --owner.');
    summarize();
    return;
  }

  if (isDir(dir) && walk(dir, () => true).length) {
    warn(`${dir} exists but is not a git clone — leaving it alone and using what is there.`);
    summarize();
    return;
  }

  const clone = run('gh', ['repo', 'clone', `${owner}/${repo}`, dir]);
  if (clone.ok) {
    say(`cloned ${owner}/${repo} into ${dir}`);
    ensureDir(join(dir, 'events'));
    summarize();
    return;
  }

  scaffold(
    `Could not clone ${owner}/${repo}: ${(clone.stderr || clone.error).split('\n')[0]}\n` +
      `  If the repo does not exist yet:  gh repo create ${owner}/${repo} --private\n` +
      '  If you are offline: this run uses local data only; nothing is lost.',
  );
  summarize();
}

main();
