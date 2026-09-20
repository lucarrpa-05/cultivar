---
id: math.algebra.permutations.the-cube-in-the-drawer-is-a-group
topic: math.algebra.permutations
topics: [niche.games.puzzles]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, numbers]
tags: [rubiks-cube, permutation-group, parity, gods-number, semidirect-product]
hook: "Reassemble a cube at random and only one arrangement in twelve is solvable. That factor of 12 is three conservation laws."
callback: {from: math.algebra.groups-basics, to: niche.games.puzzles}
sources:
  - {title: "Rubik's Cube group", type: wiki, url: "https://en.wikipedia.org/wiki/Rubik%27s_Cube_group"}
  - {title: "Optimal solutions for the Rubik's Cube", type: wiki, url: "https://en.wikipedia.org/wiki/Optimal_solutions_for_the_Rubik%27s_Cube"}
dates: {written: 2026-09-19, event: 2010-07-01}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Callback retargeted to niche.games.puzzles; chess-go was the wrong node. Cube order, factorisation and God's number verified."}
---

# Remember groups? You have had one in a drawer since childhood

Remember that a group is a set of moves that compose and undo. A Rubik's cube is the most widely owned group in history. Its elements are not the coloured patterns but the *manoeuvres*, and there are 43,252,003,274,489,856,000 of them.

That number is not what you get by placing and orienting every piece freely. It is that count divided by 12, and the 12 is three separate impossibilities: you cannot twist a single corner on its own, you cannot flip a single edge on its own, and you cannot swap exactly two pieces and leave everything else. Each is a conservation law the group enforces. Pop a cube apart and reassemble it at random and you land in a solvable state one time in twelve.

In 2010 Tomas Rokicki, Herbert Kociemba, Morley Davidson and John Dethridge finished a computation showing that every one of those 43 quintillion positions is at most 20 face turns from solved. Twenty, for all of them. They called it God's number.

Here is where the 12 comes from.

## Rigor

Label 8 corner cubies and 12 edge cubies. An unrestricted state is a corner permutation, corner twists in $(\mathbb{Z}/3)^8$, an edge permutation, and edge flips in $(\mathbb{Z}/2)^{12}$, giving $8!\cdot 3^8\cdot 12!\cdot 2^{12}$ configurations.

Three functions are unchanged by every face turn: total corner twist in $\mathbb{Z}/3$, total edge flip in $\mathbb{Z}/2$, and the common sign of the corner and edge permutations in $\mathbb{Z}/2$. (Check one quarter turn; all six are conjugate.) Together they give a surjection onto $\mathbb{Z}/3\times\mathbb{Z}/2\times\mathbb{Z}/2$, and the legal group is its kernel:
$$|G|=\frac{8!\cdot 3^8\cdot 12!\cdot 2^{12}}{12}=43{,}252{,}003{,}274{,}489{,}856{,}000=2^{27}\cdot3^{14}\cdot5^{3}\cdot7^{2}\cdot11 .$$

The third invariant is the sign homomorphism from the permutation card, applied twice: a face turn is a 4-cycle on corners and a 4-cycle on edges, so it is odd in both, and the product of the two signs stays $+1$ forever. The 15 puzzle's unreachable half and the cube's untwistable corner are the same obstruction.

## Recall
type: mcq
Q: Why can you never twist exactly one corner of a solved cube and leave it otherwise solved?
- [x] Total corner twist modulo 3 is invariant under every face turn, so it stays 0 — one twisted corner would make it 1 or 2.
- [ ] Because the cube would fall apart — mechanically you can do it with a screwdriver; the obstruction is algebraic, which is why the result is unsolvable.
- [ ] Because 20 moves is not enough — God's number bounds how far any *legal* position is; illegal positions are not reachable at any length.
