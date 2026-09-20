---
name: refresh
description: Reads the reader's synced feedback and the live inbox, generates + fact-checks + merges new cards for his current profile, validates, builds and deploys.
---

# /refresh

One command, every week or two. It reads what Lucas actually did on his phone, writes the cards
his behaviour is asking for, has different agents check them, and deploys.

**Run it from the repo root. Follow the steps in order. Every command below is exact — run it as
written.** The only two moments that need Lucas are step 2 (one optional question) and step 8
(the push confirmation). Everything else is yours.

Modes:

| invocation | what happens | time |
|---|---|---|
| `/refresh` | the full loop: analysis → authors → reviewers → validate → build → deploy | 20–40 min |
| `/refresh --quick` | inbox distillation + answer cards only, ≤ 40 cards, no domain authors | 8–12 min |

If anything below fails, the failure handling is written under that step. Never skip a validation
gate, and never push content that has not been reviewed.

---

## 0. Say what is about to happen

Print exactly one line, then start:

> Reading your feedback from cultivar-data, writing the cards your last two weeks are asking for,
> checking them, and deploying. One optional question first; I'll ask before pushing.

## 1. Get the latest code and the latest feedback

```bash
git pull
npm run pull-data
```

`pull-data` clones or pulls the private `cultivar-data` repo into `.data/` (gitignored).

- **"Could not clone … cultivar-data"** → the repo does not exist yet. Tell him once:
  `gh repo create <owner>/cultivar-data --private`, then continue: the run still works, it is
  just a cold brief (see step 3).
- **"could not pull (offline?)"** → continue with the local copy; say so in the final summary.
- **"No sync in over a week"** → note it; you will repeat it in the summary (his phone token may
  have expired: phone → Settings → Sync → Test).

## 2. Ask the one question

Use `AskUserQuestion`, exactly one question, and accept a free-text answer:

- question: `What are you studying, reading, or working on right now? (optional; helps me write cards for your coursework and projects)`
- header: `Right now`
- multiSelect: false
- options:
  - `Skip this time` — "Nothing in particular; write from the brief only."
  - `Coursework` — "Type the course and where you are in it (e.g. Folland ch. 1–2, measure theory)."
  - `A project` — "Type what you are building or writing."

If he picks **Skip this time**, go to step 3.

Otherwise append his answer to `.data/context.md` with today's date. Read the file first, then
write it back with this block appended (keep everything already in it):

```markdown

## 2026-09-19

<his answer, verbatim>
```

(Use today's date in `YYYY-MM-DD`. If `.data/` does not exist, create `.data/context.md` with the
same block — `npm run push-data` in step 8 will do nothing with it, which is fine.)

## 3. Analyse

```bash
npm run analyze
```

Then **read `refresh/brief.md` in full**. It is ordered by priority and it is the only input you
need for the rest of the run. Note:

- section 1 (diagnoses) — these change *how* the cards are written, not just which
- section 2 — the asks, grouped by domain; each domain has a packet in `refresh/packets/`
- sections 3–4 — his open questions and what he said in step 2
- section 10 — the inbox

**No data yet?** If `refresh/brief.json` has `"coldStart": true`, say one line —
"No feedback synced yet, so this run fills the biggest gaps against your priors" — and continue
normally. Steps 5–9 are unchanged; there are simply no backfill, question or context asks.

**`npm run analyze` fails** → run `node scripts/build-content.mjs` first (a stale index is the
usual cause), then retry. If it still fails, run
`npx tsx scripts/analyze-profile.ts --no-build` and report the error; do not continue blind.

## 4. Write (author agents, in parallel)

One `Agent` call per packet in `refresh/packets/`, **all launched in a single message** so they
run concurrently. Use `subagent_type: "general-purpose"` and `model: "opus"`.

- A packet asking for **more than 45 cards** gets split across 2–3 agents; each takes a contiguous
  run of the numbered asks in that packet and a distinct `author: author-<domain>-<n>` id. Say in
  each prompt which ask numbers that agent owns.
- Packets under 10 cards can be merged: one agent, two packets, both packet paths in the prompt.
- Target 25–45 cards per agent. Never more than 6 author agents at once.

The prompt for each is the template in `.claude/skills/refresh/prompts/author.md`, with
`{{DOMAIN}}`, `{{PACKET}}` and `{{ASKS}}` filled in.

**Plus one news agent**, launched in the same message, using
`.claude/skills/refresh/prompts/news.md`. It takes the top 25 inbox items from section 10 of the
brief, fetches each URL live, and writes `news` cards or drops the item. It produces
`refresh/distilled.json` and `refresh/dropped.json`.

In `--quick` mode: **only** the news agent plus one answer-card agent for the open questions in
section 3 (same author template, only the `question` asks). Cap the run at 40 cards. Skip to step 6
when they report, and run reviewers only on the news cards.

If an author agent reports that it could not make an ask work (no honest source, topic too thin),
that is fine — record it for the summary and move on.

## 5. Check (reviewer agents, in parallel)

List what the authors actually wrote:

```bash
git status --porcelain content/cards
```

Group the new/changed `.md` paths by domain. Launch **one reviewer agent per domain**, again all
in one message, `model: "opus"`, using `.claude/skills/refresh/prompts/reviewer.md` with
`{{DOMAIN}}`, `{{FILES}}` (the exact list of paths for that domain) and `{{DATE}}` filled in.

A reviewer never reviews a domain it authored. Reviewers fix small things, stamp `reviewed:`,
delete rejects, and write `.data/reviews/<domain>-<date>.json`.

## 6. Gates

Run these in order. Do not continue past a failure — fix it (or delete the offending card) and
re-run the failing command.

```bash
npm run validate content/cards
node scripts/validate-content.mjs <the new paths from step 5> --require-review
npm run check-links
npm run dedupe
node scripts/mark-distilled.mjs
node scripts/answer-questions.mjs
```

(The second command must be the `node …` form: `npm run validate … --require-review` swallows the
flag, because npm eats `--`-flags that follow the script name.)

- `--require-review` fails on unreviewed cards → the reviewer for that domain missed
  files; re-run that reviewer on exactly those paths.
- `check-links` errors (404/DNS) → fix or remove the source; warnings (403/timeout) are fine.
- `dedupe` writes `.data/reviews/dedupe-report.json` and always exits 0 → read it, and for each
  flagged pair either delete the weaker card or add the other to its `related:`.
- `mark-distilled` closes the inbox loop from `refresh/distilled.json` + `refresh/dropped.json`.
- `answer-questions` marks his questions answered and writes `public/content/questions.json`.

Then, only if the brief's section 11 said a month boundary passed:

```bash
npm run recap
```

## 7. Build

```bash
npm run build
```

This runs content build + Vite. If it fails, the error is almost always a card: fix it and re-run.

## 8. Deploy (ask first)

Summarise in one line what will be pushed (`N cards across M domains, Q questions answered`), then
ask with `AskUserQuestion`: **"Push and deploy?"** — options `Yes, push` / `No, keep it local`.

On `Yes, push` (use today's date and the real counts):

```bash
git add -A
git commit -m "refresh: 2026-09-19 — 137 cards (math 52, ai 38, css 21, econ 14, news 12), 3 questions answered"
git push
npm run push-data
```

The push to `main` triggers the Pages deploy workflow. `push-data` commits `.data/` (questions,
context, recaps) back to the private repo; if there is nothing to push it says so and exits 0.

On `No, keep it local`: stop here and tell him the working tree has everything, and that
`git push` will deploy it whenever he wants.

## 9. Report

Print, in this shape:

```
Refresh done — 2026-09-19

Cards added      math 52 · ai 38 · css 21 · econ 14 · news 12
Questions        3 answered (double descent, Brouwer/Nash, ABM validation)
Backfill served  ai.ml-basics.bias-variance (6), ai.ml-basics.linear-models (5), …
Diagnoses acted  sessions got shorter → lighter openers, fewer heavy cards
                 quote cards skipped 60% → none written this run
Inbox            12 distilled, 13 dropped
Reviewers        4 domains, 3 cards rejected, 11 fixed

Open the app; new cards appear after the Pages deploy (~2 min).
```

Mention anything that failed or was skipped (offline pull, missing data repo, asks the authors
could not honestly write). Keep it to that block plus at most two sentences.

---

## Reference

| thing | where |
|---|---|
| the brief | `refresh/brief.md`, `refresh/brief.json` (`RefreshBrief` in `src/types.ts`) |
| author packets | `refresh/packets/<domain>.md` |
| prompts | `.claude/skills/refresh/prompts/{author,news,reviewer}.md` |
| card contract | `.data/docs/SCHEMA.md` |
| voice and taste | `.data/docs/STYLE_GUIDE.md` (Part 1 and 2 for authors, Part 5 for reviewers) |
| the loop, explained | `.data/docs/REFRESH.md` |
| private feedback | `.data/` (gitignored clone of `cultivar-data`) |

Useful variants:

```bash
npx tsx scripts/analyze-profile.ts --max-cards 80      # a smaller run
npx tsx scripts/analyze-profile.ts --fixture <file>     # analyse a specific event log
node scripts/mark-distilled.mjs --dry-run
node scripts/push-data.mjs --dry-run
```
