---
id: math.algebra.groups-basics.symmetry-is-a-verb
topic: math.algebra.groups-basics
format: series
difficulty: 2
language: en
weight: medium
angles: [beautiful, connection]
tags: [groups, symmetry, dihedral-group, composition, subgroups]
hook: "A square has eight symmetries. Counting them is easy. Noticing that they form a system is the whole subject."
series: {id: math.algebra.symmetry-made-precise, index: 1, total: 5, title: "Symmetry, made precise"}
sources:
  - {title: "Group (mathematics)", type: wiki, url: "https://en.wikipedia.org/wiki/Group_(mathematics)"}
  - {title: "Dihedral group", type: wiki, url: "https://en.wikipedia.org/wiki/Dihedral_group"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A symmetry is not a shape. It is a move.

Cut a square out of cardboard and drop it back into its own outline. Count the ways it fits: four turns, including the turn by nothing at all, and four flips. Eight.

Now notice the part nobody points out. Do two of those moves in a row and the result is one of the eight. Undo any of them and you get one of the eight. The moves are closed under doing-then-doing, and every move has an undo.

That closure is the whole idea. Symmetry is not a property the square *has*; it is a set of things you can *do*, and the doing composes. Strip the cardboard away, keep only the composition rule, and you have a group. The same eight-move structure turns up in clock arithmetic, in card shuffles, in the rotations of a molecule.

One more thing about that square. The four turns, by themselves, already form a closed family: four inside eight. Four divides eight, and that is not a coincidence.

## Rigor

A **group** is a set $G$ with an associative operation $G\times G\to G$, an identity $e$, and an inverse for each element. "Closed under doing-then-doing" hides in the word *operation*; "every move has an undo" is the inverse axiom.

The square's group is dihedral of order 8:
$$D_4=\langle r,s \mid r^4=s^2=e,\; srs=r^{-1}\rangle,$$
with $r$ a quarter turn and $s$ a flip. Its elements are $e,r,r^2,r^3,s,rs,r^2s,r^3s$. The relation $srs=r^{-1}$ is a fact about cardboard: flip, turn, flip again, and the turn has reversed. It is also why $D_4$ is not abelian, since $rs\neq sr$.

A **subgroup** is a subset closed under the operation and under inverses. The turns $\{e,r,r^2,r^3\}$ form one, of size 4 inside a group of size 8. Every subgroup of a finite group has size dividing the whole. Episode 2 is that theorem, and the proof is a tiling argument.

## Recall
type: mcq
Q: What makes the eight symmetries of a square a group rather than just a list of eight things?
- [x] Any two of them compose to another one, and every one can be undone — closure, associativity, identity and inverses are exactly that.
- [ ] There are eight of them, and eight is a power of two — size never makes something a group; the composition rule does.
- [ ] They are rigid motions of the plane — true here, but the axioms never mention geometry, which is why groups also describe shuffles and clocks.
