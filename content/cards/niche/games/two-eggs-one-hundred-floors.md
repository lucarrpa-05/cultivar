---
id: niche.games.puzzles.two-eggs-one-hundred-floors
topic: niche.games.puzzles
format: challenge
difficulty: 3
language: en
weight: medium
angles: [tool, paradox]
tags: [egg-dropping, search, worst-case, strategy]
hook: "With two eggs, equally spaced test floors are a trap."
sources:
  - {title: "Dynamic programming: Egg dropping puzzle", type: wiki, url: "https://en.wikipedia.org/wiki/Dynamic_programming#Egg_dropping_puzzle"}
dates: {written: 2026-09-20}
author: content-author
reviewed: {by: reviewer-dayone-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Clarified the monotone break-threshold premise."}
---

# Two eggs against a hundred floors

There is an unknown threshold: an egg survives a drop from any floor at or below it and breaks from every higher floor. You have two identical eggs and a hundred-floor building. A surviving egg can be reused. Find the highest safe floor, even if none is safe, while minimizing the *worst-case* number of drops.

If you test every tenth floor, the first egg may break late and the second must search many floors one by one. Instead, make the first jump large and each later jump one floor smaller. Why? After a break, your remaining one-by-one search should fit within the same total drop budget. What starting jump makes 100 floors reachable in fourteen drops?

## Recall
type: reveal
Q: What is the minimum worst-case number of drops, and how does the first egg move?
A: Fourteen. Drop first from floor 14, then 27, 39, 50, and so on, shrinking each jump by one. If it breaks, test the unchecked floors below with the second egg. The reachable count is 14+13+⋯+1=105; thirteen drops cover only 91 floors.
