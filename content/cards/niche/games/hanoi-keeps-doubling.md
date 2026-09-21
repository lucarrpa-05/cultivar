---
id: niche.games.puzzles.hanoi-keeps-doubling
topic: niche.games.puzzles
format: challenge
difficulty: 2
language: en
weight: light
angles: [numbers, beautiful]
tags: [tower-of-hanoi, recursion, disks, doubling]
hook: "Adding one disk nearly doubles the work. What happens by disk 64?"
sources:
  - {title: "Tower of Hanoi", type: wiki, url: "https://en.wikipedia.org/wiki/Tower_of_Hanoi"}
dates: {written: 2026-09-20}
author: content-author
reviewed: {by: reviewer-dayone-2026-09-20, at: 2026-09-20, verdict: approved}
---

# The disk that doubles the whole puzzle

The Tower of Hanoi has three pegs and a stack of disks, smallest on top. Move the entire stack to another peg, one disk at a time, never placing a larger disk on a smaller one. One disk takes one move; two take three. How many moves for five disks?

To move the largest disk, every smaller disk must first move out of its way. Then you move the largest once, then move the smaller stack back on top. The entire smaller puzzle appears twice around one unavoidable move. Try building the count for three and four disks before answering five. Then picture doing the same with 64.

## Recall
type: reveal
Q: What is the fewest moves for five disks, and what pattern gives it?
A: Thirty-one. If $M(n)$ is the minimum for $n$ disks, moving the bottom disk forces $M(n-1)$ moves before and after it: $M(n)=2M(n-1)+1=2^n-1$. For 64 disks, that is $2^{64}-1$ moves.
