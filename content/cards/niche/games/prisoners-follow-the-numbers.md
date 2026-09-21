---
id: niche.games.puzzles.prisoners-follow-the-numbers
topic: niche.games.puzzles
format: challenge
difficulty: 3
language: en
weight: medium
angles: [paradox, beautiful]
tags: [prisoners, boxes, cycles, strategy]
hook: "A team that looks doomed can win about 31% of the time by opening boxes in a strange order."
sources:
  - {title: "100 prisoners problem", type: wiki, url: "https://en.wikipedia.org/wiki/100_prisoners_problem"}
dates: {written: 2026-09-20}
author: content-author
reviewed: {by: reviewer-dayone-2026-09-20, at: 2026-09-20, verdict: approved}
---

# The boxes tell you which box to open next

One hundred numbered people face 100 numbered boxes. Each box hides one of their numbers, shuffled at random. Each person enters alone, may open at most 50 boxes, and must find their own number. Everyone wins only if *everyone* succeeds. They can agree on a strategy beforehand, but leave no messages.

Opening 50 random boxes each gives the team almost no chance. Yet one shared rule wins about 31% of the time. Your first box should bear your own number. Inside it is another number: what if that tells you which box to open next? Follow the chain and ask when it returns to you.

## Recall
type: reveal
Q: What is the shared strategy, and when does it fail?
A: Each person opens the box with their own number, then the box named by the slip inside, and repeats. This follows a cycle of the hidden permutation. Everyone succeeds exactly when no cycle is longer than 50 boxes; under a random shuffle that happens about 31.18% of the time.
