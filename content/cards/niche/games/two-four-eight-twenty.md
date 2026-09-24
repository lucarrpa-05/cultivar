---
id: niche.games.puzzles.two-four-eight-twenty
topic: niche.games.puzzles
format: challenge
difficulty: 3
language: en
weight: heavy
angles: [numbers, beautiful]
tags: [conway-soldiers, peg-solitaire, golden-ratio, invariant, potential-function]
hook: "Conway's soldiers can march four rows past the line. The fifth row is out of reach for any finite army, and the golden ratio is why."
related: [niche.games.puzzles.missing-corners]
sources:
  - {title: "Conway's Soldiers", type: wiki, url: "https://en.wikipedia.org/wiki/Conway%27s_Soldiers"}
  - {title: "Conway's Soldiers", author: "Eric W. Weisstein", type: encyclopedia, url: "https://mathworld.wolfram.com/ConwaysSoldiers.html"}
dates: {written: 2026-09-23}
author: author-niche-1
reviewed: {by: reviewer-niche-2026-09-23, at: 2026-09-23, verdict: approved, notes: "The body fills the whole half-plane but the rigor argues about a finite army; added the clause that finitely many jumps involve only finitely many soldiers. Jump patterns, the half-plane sum, 1961 and 2/4/8/20 checked."}
---

# Two, four, eight, twenty, and then no army is big enough

An infinite board, a horizontal line across it, and a soldier on every square below the line. A move is a peg-solitaire jump: a soldier leaps over an adjacent soldier, horizontally or vertically, into an empty square, and the jumped soldier is removed.

How far above the line can one soldier get? One row takes 2 soldiers, two rows take 4, three take 8. Four rows take 20. Five rows cannot be reached by any finite army. John Conway worked this out in 1961.

Your challenge is to see why. Give each square a value that shrinks with distance from the target, chosen so that a jump straight toward the target never changes the total.

## Rigor

The value that does it is $\omega^d$, where $d$ is the taxicab distance to the target $T$ and $\omega = \tfrac{\sqrt5 - 1}{2} \approx 0.618$ solves $\omega^2 + \omega = 1$. Put $T$ five rows above the line; a position's score is the sum of $\omega^d$ over occupied squares.

**Jumps never raise the score.** Three consecutive squares in a row or column have distances $(d+2, d+1, d)$, $(d, d+1, d+2)$ or $(d, d-1, d)$. A jump toward $T$ changes the score by

$$\omega^d - \omega^{d+1} - \omega^{d+2} = \omega^d(1 - \omega - \omega^2) = 0,$$

and the other two patterns change it by $\omega^{d+2} - \omega^{d} - \omega^{d+1} < 0$ and $-\omega^{d-1} < 0$.

**The whole half-plane scores exactly 1.** The square in row $j \ge 0$ below the line and $i$ columns from $T$ has distance $5 + j + |i|$. Using $1 - \omega = \omega^2$ and $1 + \omega = \omega^{-1}$,

$$\sum_{j \ge 0}\sum_{i \in \mathbb{Z}} \omega^{5 + j + |i|} = \omega^5 \cdot \frac{1}{1-\omega} \cdot \frac{1+\omega}{1-\omega} = \omega^5 \cdot \omega^{-2} \cdot \omega^{-3} = 1.$$

Finitely many jumps only ever involve finitely many soldiers, and a finite army is part of that sum, so it scores strictly less than 1, while a soldier on $T$ alone scores $\omega^0 = 1$. Since no jump raises the score, no finite army ever gets there. For a target four rows up, the same sum is $\omega^{-1} > 1$, so the argument no longer blocks it, and 20 soldiers suffice.

## Recall
type: reveal
Q: Why does the golden ratio show up in Conway's soldiers?
A: With weights $\omega^d$ and $\omega^2 + \omega = 1$, a jump straight at the target leaves the total unchanged and every other jump lowers it. With that $\omega$, the entire half-plane totals exactly one soldier's worth on row five, so any finite army falls short.
