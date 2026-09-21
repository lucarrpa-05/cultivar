/**
 * answer-questions — every card that carries `answersQuestion: <id>` marks that
 * question answered, in the private data repo and in what the app ships.
 *
 *   node scripts/answer-questions.mjs
 *   node scripts/answer-questions.mjs --dry-run
 *   node scripts/answer-questions.mjs --cards <dir> --out <file>   (tests)
 *
 * Writes .data/questions.json (status: answered, answerCard). The public
 * compatibility file is always empty: question text is private learning data.
 */
import { join } from 'node:path';
import { arg, at, flag, frontMatter, isDir, readJson, readText, say, walk, warn, writeJson } from './lib/refresh-io.mjs';

const argv = process.argv.slice(2);
const dataDir = at(arg(argv, 'data', '.data'));
const cardsDir = at(arg(argv, 'cards', 'content/cards'));
const outFile = at(arg(argv, 'out', 'public/content/questions.json'));
const dryRun = flag(argv, 'dry-run');

function main() {
  const answers = new Map(); // questionId -> cardId
  for (const file of walk(cardsDir, (n) => n.endsWith('.md'))) {
    const { data } = frontMatter(readText(file));
    if (!data.answersQuestion || !data.id) continue;
    const qid = String(data.answersQuestion).trim();
    if (!answers.has(qid)) answers.set(qid, String(data.id));
  }

  const questionsFile = join(dataDir, 'questions.json');
  const existing = readJson(questionsFile, []) || [];
  const list = Array.isArray(existing) ? existing.slice() : [];
  const byId = new Map(list.map((q) => [q.id, q]));

  let answered = 0;
  let unknown = 0;
  for (const [qid, cardId] of answers) {
    const q = byId.get(qid);
    if (!q) {
      // The card answers a question this clone does not know about (no data repo,
      // or the question was asked on another device). Record it anyway so the app
      // can still show the badge.
      const fresh = { id: qid, t: 0, text: '', status: 'answered', answerCard: cardId };
      list.push(fresh);
      byId.set(qid, fresh);
      unknown += 1;
      answered += 1;
      continue;
    }
    if (q.status === 'answered' && q.answerCard === cardId) continue;
    q.status = 'answered';
    q.answerCard = cardId;
    answered += 1;
  }

  const open = list.filter((q) => q.status !== 'answered').length;

  if (dryRun) {
    say(`dry run: ${answers.size} cards answer questions; ${answered} entries would change; ${open} would stay open.`);
    return;
  }

  if (isDir(dataDir)) writeJson(questionsFile, list);
  else warn('No .data/ — writing the app copy only (run `npm run pull-data` to keep the data repo in sync).');
  writeJson(outFile, []);

  say(`questions: ${answered} newly answered, ${open} still open (${list.length} total).`);
  if (unknown) warn(`${unknown} answered question id(s) were not in questions.json — check the id in the card's front matter.`);
}

main();
