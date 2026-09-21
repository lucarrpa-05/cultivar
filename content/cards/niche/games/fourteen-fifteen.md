---
id: niche.games.puzzles.fourteen-fifteen
topic: niche.games.puzzles
format: idea
difficulty: 2
language: en
weight: medium
angles: [beautiful, mistake]
tags: [15-puzzle, parity, permutation, sam-loyd, invariant]
hook: "Sam Loyd offered a prize for solving a puzzle that had been proved unsolvable eleven years earlier."
sources:
  - {title: "15 Puzzle", type: wiki, url: "https://en.wikipedia.org/wiki/15_Puzzle"}
  - {title: "Books, Hallways, and Social Butterflies", year: 2024, type: paper, url: "https://link.springer.com/article/10.1007/s00283-024-10358-x"}
dates: {written: 2026-09-20, event: 1880-01-01}
author: author-sports-niche-1
reviewed: {by: reviewer-niche-w2-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Corrected parity proof scope and historical phrasing."}
---

# Swap 14 and 15; the prize becomes impossible

The sliding-tile puzzle swept America in 1880. Sam Loyd later offered a prize for solving a version with tiles 14 and 15 swapped. The money was safe: Johnson and Story had already analyzed the puzzle's parity. Each legal slide swaps the blank with one tile and also changes the blank's checkerboard colour. Those two changes preserve a combined even-or-odd signature. Swapping 14 and 15 without moving the blank changes only one part of it, putting the board in a different class from the solved state. You can slide forever and never cross that boundary. Here, “I cannot solve it” has a mathematical reason.

## Rigor

Number the sixteen cells, treating the blank as tile 16, so a board is a permutation $\sigma\in S_{16}$. A legal move transposes the blank with a neighbour, which is a single transposition: it flips $\operatorname{sgn}(\sigma)$. It also moves the blank one step, changing by one the taxicab distance $d$ from the blank to the lower-right corner.

So each move flips both parities, and the quantity

$$\operatorname{sgn}(\sigma)\cdot(-1)^{d}$$

is invariant under every legal move.

The solved board has $\operatorname{sgn}=+1$ and $d=0$. Swapping 14 and 15 is one transposition and leaves the blank alone, so it has $\operatorname{sgn}=-1$, $d=0$ — the opposite value. No sequence of slides can connect them.

The invariant partitions all boards into two equally sized classes. The solvability theorem adds that every board in the solved state’s class can be reached; hence exactly half of the configurations are reachable.

## Recall
type: mcq
Q: Why is exactly half of the 15-puzzle's positions unreachable, rather than some other fraction?
- [x] Each slide flips both the permutation's sign and the blank's taxicab parity, so their product is invariant — and that invariant splits the positions into two equal classes.
- [ ] Because the board is 4 by 4 and even-sized boards are symmetric — board size is not what creates the invariant; the parity argument does.
- [ ] Because the blank square must return to its corner — it must, but that alone does not rule out a swap of two tiles.
