---
id: math.algebra.subgroups-lagrange.cosets-tile-the-group
topic: math.algebra.subgroups-lagrange
format: series
difficulty: 3
language: en
weight: medium
angles: [beautiful, tool]
tags: [lagrange-theorem, cosets, subgroups, index, alternating-group]
hook: "A subgroup tiles its group: identical blocks, no overlaps, nothing left over. That one picture is Lagrange's theorem."
series: {id: math.algebra.symmetry-made-precise, index: 2, total: 5, title: "Symmetry, made precise"}
sources:
  - {title: "Lagrange's theorem (group theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Lagrange%27s_theorem_(group_theory)"}
  - {title: "Alternating group", type: wiki, url: "https://en.wikipedia.org/wiki/Alternating_group"}
dates: {written: 2026-09-19}
diagram: {file: math/coset-tiling.svg, caption: "A subgroup of size 3 and its shifts cut a group of size 12 into four identical blocks.", alt: "Four rounded boxes side by side, each holding three dots; the first box is outlined thickly and labelled as the subgroup, the others as shifts of it"}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Fixed two errors: the cube has 24 rotations inside 48 symmetries, and a group of prime order does have the trivial subgroup."}
---

# A subgroup can never be an awkward size

Four turns sitting inside eight symmetries of the square. Twenty-four rotations of a cube inside its forty-eight symmetries. Every time you find a closed family of moves inside a group, the size of the family divides the size of the whole group — and the reason is that the family *tiles*.

Take a subgroup $H$ and any element $g$ outside it. Multiply every member of $H$ by $g$. You get a set the same size as $H$, and it either misses $H$ completely or lands exactly on top of it. Keep going with elements you have not used. Identical blocks, no overlap, nothing left over. The group is a floor and the subgroup is the tile.

That is Lagrange's theorem. It instantly tells you a group of order 15 contains nothing of order 4, and that a group of prime order has no subgroups besides itself and the trivial one, so it is cyclic.

Now the trap. The converse is false, and the smallest counterexample is famous.

## Rigor

For $H\le G$ finite, the **left cosets** $gH=\{gh:h\in H\}$ partition $G$, and $h\mapsto gh$ is a bijection $H\to gH$, so every block has $|H|$ elements. Hence
$$|G|=[G:H]\cdot|H|,$$
where $[G:H]$ is the number of blocks. Applied to $H=\langle g\rangle$: the order of any element divides $|G|$.

**The converse fails.** $A_4$ has order 12 but no subgroup of order 6. Suppose $H\le A_4$ with $|H|=6$. Then $[A_4:H]=2$, so $H$ is normal and $A_4/H\cong\mathbb{Z}/2$, forcing $x^2\in H$ for every $x\in A_4$. But $A_4$ contains eight 3-cycles, and squaring permutes them ($x^2=x^{-1}$ is again a 3-cycle), so all eight would sit inside a set of size 6. Contradiction.

So divisors are necessary, not sufficient. Which divisors *are* realised is the question Sylow answers, in episode 5. First the tiles need a name — cosets — and the group needs something to act on.

## Recall
type: mcq
Q: A group has order 12. What does Lagrange's theorem let you conclude about its subgroups?
- [x] Every subgroup has order 1, 2, 3, 4, 6 or 12 — but there need not be one of each; $A_4$ has no subgroup of order 6.
- [ ] There is exactly one subgroup of each divisor of 12 — that is the false converse, and $A_4$ is the standard counterexample.
- [ ] There is at least one subgroup of each divisor of 12 — true for cyclic groups only; $A_4$ breaks it at order 6.
