---
id: niche.games.puzzles.nine-coins-two-weighings
topic: niche.games.puzzles
format: challenge
difficulty: 2
language: en
weight: light
angles: [tool, beautiful]
tags: [coins, balance, ternary-search, lighter-coin]
hook: "A balance scale has three answers, so two weighings can distinguish nine coins."
sources:
  - {title: "Balance puzzle", type: wiki, url: "https://en.wikipedia.org/wiki/Balance_puzzle"}
dates: {written: 2026-09-20}
author: content-author
reviewed: {by: reviewer-dayone-2026-09-20, at: 2026-09-20, verdict: approved}
---

# Nine coins, one too light, only two weighings

Nine coins look identical. Exactly one is lighter than the rest, and you have a balance scale. Find the odd coin in at most two weighings. You may put any equal number of coins on each pan, and the scale can tip left, tip right, or balance.

Do not begin by weighing one coin against another. That spends a three-way observation on a tiny part of the problem. Instead, divide the nine coins into three groups of three. One weighing can identify the suspicious group. Then ask how a single weighing can identify one coin out of three. The scale's *balance* result matters as much as either tilt.

## Recall
type: reveal
Q: How do two weighings locate the lighter coin among nine?
A: Weigh three coins against three. The lighter pan identifies the suspect trio; if the pans balance, the unweighed trio does. From that trio, weigh one coin against another. The lighter one is odd, or, if they balance, the third is odd.
