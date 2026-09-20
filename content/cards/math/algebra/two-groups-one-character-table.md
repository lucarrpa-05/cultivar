---
id: math.algebra.representations.two-groups-one-character-table
topic: math.algebra.representations
format: idea
difficulty: 4
language: en
weight: heavy
angles: [paradox, beautiful]
tags: [character-table, quaternion-group, dihedral-group, frobenius-schur, invariants]
hook: "The character table knows the order, the normal subgroups, whether the group is solvable. It does not know the group."
sources:
  - {title: "Character table", type: wiki, url: "https://en.wikipedia.org/wiki/Character_table"}
  - {title: "Quaternion group", type: wiki, url: "https://en.wikipedia.org/wiki/Quaternion_group"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Two different groups with the same character table

A character table is a small grid of numbers: one row per irreducible representation, one column per conjugacy class. For something so compact it knows an unreasonable amount. Read off the order of the group, whether it is abelian, every normal subgroup, whether it is simple, whether it is solvable, the sizes of all the conjugacy classes.

It does not know the group.

The symmetries of the square, $D_4$, and the quaternion group $Q_8=\{\pm1,\pm i,\pm j,\pm k\}$ both have order 8 and are certainly not isomorphic: $D_4$ has five elements of order 2, and $Q_8$ has exactly one, namely $-1$. Their character tables are identical, entry for entry.

So characters see a group through a lossy compression — an extremely powerful one, which is why Burnside could prove solvability with it, but lossy. The information that distinguishes these two is visible only if you are allowed to ask what squaring does.

## Rigor

Both groups have five conjugacy classes, so five irreducible characters. Both have commutator subgroup of order 2 with quotient $(\mathbb{Z}/2)^2$, giving four one-dimensional characters; the fifth has degree $d$ with $1+1+1+1+d^2=8$, so $d=2$. The common table, with classes $\{e\},\{z\},$ and three classes of size 2:

| | $e$ | $z$ | $A$ | $B$ | $C$ |
|---|---|---|---|---|---|
| $\chi_1$ | 1 | 1 | 1 | 1 | 1 |
| $\chi_2$ | 1 | 1 | 1 | $-1$ | $-1$ |
| $\chi_3$ | 1 | 1 | $-1$ | 1 | $-1$ |
| $\chi_4$ | 1 | 1 | $-1$ | $-1$ | 1 |
| $\chi_5$ | 2 | $-2$ | 0 | 0 | 0 |

Identical for $D_4$ and $Q_8$.

What separates them is the **Frobenius–Schur indicator**
$$\nu(\chi)=\frac{1}{|G|}\sum_{g\in G}\chi(g^{2}),$$
which needs the squaring map, not just the table. For $\chi_5$ it is $+1$ for $D_4$ (the representation is real — it really is rotations and reflections of the plane) and $-1$ for $Q_8$ (quaternionic, realisable over $\mathbb{H}$ but not over $\mathbb{R}$). Same characters, different reality.

## Recall
type: mcq
Q: The character tables of $D_4$ and $Q_8$ agree. What distinguishes the two groups?
- [x] The Frobenius–Schur indicator of the 2-dimensional character — it is built from $\chi(g^{2})$, so it reads the squaring map and not just the table.
- [ ] The number of conjugacy classes — both have five, which is why the tables are the same shape in the first place.
- [ ] The degrees of the irreducible characters — both are $1,1,1,1,2$; the degrees are part of the table that already matches.
