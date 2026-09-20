/**
 * push-data — commit and push what the refresh wrote back into the private data
 * repo: questions.json (answered), context.md (what he is working on), recaps/.
 *
 *   npm run push-data
 *   node scripts/push-data.mjs --dry-run
 *
 * Tolerant by design: no .data/, not a clone, nothing changed, or no network all
 * end in a printed note and exit 0. The refresh must never fail on this step.
 */
import { join } from 'node:path';
import { arg, at, flag, isDir, localDay, run, say, warn } from './lib/refresh-io.mjs';

const argv = process.argv.slice(2);
const dir = at(arg(argv, 'dir', '.data'));
const dryRun = flag(argv, 'dry-run');
const message = arg(argv, 'message', `refresh: ${localDay(Date.now())}`);

function main() {
  if (!isDir(dir)) {
    say('No .data/ — nothing to push. (Run `npm run pull-data` first.)');
    return;
  }
  if (!isDir(join(dir, '.git'))) {
    warn(`${dir} is not a git clone, so there is nowhere to push. Create the repo and clone it:`);
    warn('  gh repo create <owner>/cultivar-data --private   then   npm run pull-data');
    return;
  }

  const status = run('git', ['-C', dir, 'status', '--porcelain']);
  if (!status.ok) {
    warn(`git status failed: ${status.stderr || status.error}`);
    return;
  }
  if (!status.stdout) {
    say('Data repo is clean — nothing to push.');
    return;
  }

  say('changes in the data repo:');
  for (const line of status.stdout.split('\n')) say(`  ${line}`);

  if (dryRun) {
    say(`dry run: would commit "${message}" and push.`);
    return;
  }

  const add = run('git', ['-C', dir, 'add', '-A']);
  if (!add.ok) {
    warn(`git add failed: ${add.stderr || add.error}`);
    return;
  }
  const commit = run('git', ['-C', dir, 'commit', '-m', message]);
  if (!commit.ok && !/nothing to commit/i.test(commit.stdout + commit.stderr)) {
    warn(`git commit failed: ${commit.stderr || commit.stdout || commit.error}`);
    return;
  }
  const push = run('git', ['-C', dir, 'push']);
  if (push.ok) say(`pushed ${message} to cultivar-data.`);
  else warn(`push failed (offline? token?): ${(push.stderr || push.error).split('\n')[0]} — the commit is local; it will go up next time.`);
}

main();
