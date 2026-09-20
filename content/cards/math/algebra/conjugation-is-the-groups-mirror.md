---
id: math.algebra.group-actions.conjugation-is-the-groups-mirror
topic: math.algebra.group-actions
format: series
difficulty: 4
language: en
weight: medium
angles: [tool, beautiful]
tags: [conjugation, class-equation, centre, p-groups, conjugacy-classes]
hook: "A p-group can never be entirely non-commutative. Its centre is always bigger than the identity, and conjugation is why."
series: {id: math.algebra.symmetry-made-precise, index: 4, total: 5, title: "Symmetry, made precise"}
sources:
  - {title: "Conjugacy class", type: wiki, url: "https://en.wikipedia.org/wiki/Conjugacy_class"}
  - {title: "P-group", type: wiki, url: "https://en.wikipedia.org/wiki/P-group"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The best thing a group can act on is itself

Let a group act on its own elements by $g\cdot x = gxg^{-1}$. On the face of it this is a wasted move: do something, do the thing, undo the something. It is the most productive action in the subject.

Orbits become conjugacy classes, and they mean something concrete. In the symmetric group, two permutations are conjugate exactly when they have the same cycle shape — so "conjugate" translates as *the same move, described from a different seat*. Stabilisers become centralisers. The points that every single $g$ fixes are exactly the elements that commute with everything: the centre.

Now add up the orbit sizes. The classes of size 1 are the centre; every other class has size dividing the order of the group and bigger than 1. That bookkeeping identity is the class equation, and it proves something you cannot see by staring at multiplication tables: a group whose order is a power of a prime always has a non-trivial centre. Not usually. Always.

That single fact is the lever under Sylow.

## Rigor

Conjugation is an action of $G$ on $G$. The orbit of $x$ is its conjugacy class; the stabiliser is the centraliser $C_G(x)=\{g:gx=xg\}$. Orbit–stabiliser gives $|\mathrm{class}(x)|=[G:C_G(x)]$, so every class size divides $|G|$.

Orbits partition $G$, and the singleton orbits are exactly $Z(G)$. Splitting the sum:
$$|G|=|Z(G)|+\sum_{i}[G:C_G(x_i)],$$
one term per class of size greater than 1. This is the **class equation**.

**Every $p$-group has non-trivial centre.** Let $|G|=p^n$ with $n\ge 1$. Each summand $[G:C_G(x_i)]$ is a divisor of $p^n$ greater than 1, hence a multiple of $p$. And $p$ divides $|G|$. So $p$ divides $|Z(G)|$, and $Z(G)\neq\{e\}$ because it contains $e$. $\square$

Induct on this and you get: every group of order $p^2$ is abelian, and every $p$-group has a chain of normal subgroups of every order dividing $|G|$ — the converse of Lagrange, restored inside $p$-groups. Which raises the obvious question about everything else.

## Recall
type: mcq
Q: The class equation gives $|G| = |Z(G)| + \sum_i [G : C_G(x_i)]$. Why does it force a $p$-group to have a non-trivial centre?
- [x] Each term in the sum is a divisor of $p^n$ bigger than 1, so $p$ divides every one, and $p$ divides $|G|$ — so $p$ divides $|Z(G)|$ too.
- [ ] Because every conjugacy class in a $p$-group has size $p$ — class sizes can be any power of $p$, including 1 for central elements.
- [ ] Because $p$-groups are abelian — they need not be; $D_4$ and the quaternion group have order 8 and are not abelian.
