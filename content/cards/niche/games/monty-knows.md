---
id: niche.games.puzzles.monty-knows
topic: niche.games.puzzles
format: challenge
difficulty: 2
language: en
weight: light
angles: [paradox, prediction]
tags: [monty-hall, doors, probability, information]
hook: "One door disappears, but your first guess does not become any smarter."
sources:
  - {title: "Monty Hall problem", type: wiki, url: "https://en.wikipedia.org/wiki/Monty_Hall_problem"}
dates: {written: 2026-09-20}
author: content-author
reviewed: {by: reviewer-dayone-2026-09-20, at: 2026-09-20, verdict: approved}
---

# The host opens a door he knows is wrong

Three doors hide one prize and two goats. You choose a door. The host knows where the prize is, always opens a *different* door showing a goat, and always offers you the chance to switch to the only other closed door. Should you switch?

With two doors left, “half and half” feels natural. But the host did not open a door at random. He carefully removed a losing option while protecting your original choice. Ask a simpler question: how often was your first guess right? Switching wins precisely when that first guess was wrong. The host's knowledge is doing the work.

## Recall
type: reveal
Q: Under the stated host rules, what is the chance of winning by switching?
A: Two-thirds. Your first choice is wrong with probability 2/3. Whenever it is wrong, the host must reveal the other goat, so switching takes you to the prize. Staying wins only when your first choice was right, probability 1/3.
