---
id: math.algebra.sylow.the-counting-that-cannot-fail
topic: math.algebra.sylow
format: series
difficulty: 4
language: en
weight: heavy
angles: [tool, beautiful]
tags: [sylow-theorems, conjugacy, simple-groups, counting, p-subgroups]
hook: "Lagrange's converse fails in general. Sylow found exactly where it survives — at the full prime powers — and turned it into a machine."
series: {id: math.algebra.symmetry-made-precise, index: 5, total: 5, title: "Symmetry, made precise"}
sources:
  - {title: "Sylow theorems", type: wiki, url: "https://en.wikipedia.org/wiki/Sylow_theorems"}
  - {title: "Simple group", type: wiki, url: "https://en.wikipedia.org/wiki/Simple_group"}
dates: {written: 2026-09-19, event: 1872-01-01}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# How to find a subgroup you have no reason to believe exists

Lagrange told you a subgroup's size must divide the group's size. $A_4$ told you that is all it tells you. Ludwig Sylow, in 1872, found the place where the converse survives intact: pull out the *full* power of a prime.

If $p^a$ is the largest power of $p$ dividing the order of a finite group, a subgroup of exactly that order exists. All of them are conjugate — the same subgroup seen from different seats, which is episode 4's word for it. And their number is congruent to 1 modulo $p$ and divides what is left over.

That last clause is the workhorse, because it is a counting constraint tight enough to kill whole orders. It is how you prove, in three lines and without constructing anything, that no simple group has order 30.

And it closes the loop. The eight symmetries of the square from episode 1 are not a curiosity: they are a Sylow 2-subgroup of the permutations of the square's four corners, and Sylow predicts exactly how many copies you will find.

## Rigor

Let $|G|=p^a m$ with $p\nmid m$. A **Sylow $p$-subgroup** is a subgroup of order $p^a$.

**I.** Sylow $p$-subgroups exist. **II.** They are all conjugate, and every $p$-subgroup lies inside one. **III.** Their number satisfies $n_p\equiv 1\pmod p$ and $n_p\mid m$.

III follows from the action machinery: $G$ acts by conjugation on the set of Sylow $p$-subgroups, transitively by II, so $n_p=[G:N_G(P)]$ divides $|G|$; restricting the action to a single $P$ leaves $P$ as the only fixed point, so $n_p\equiv 1 \pmod p$.

**No simple group of order 30.** Here $n_5\in\{1,6\}$ and $n_3\in\{1,10\}$. Six Sylow 5-subgroups would give $6\cdot 4=24$ elements of order 5; ten Sylow 3-subgroups would give $10\cdot 2=20$ of order 3. That is 44 elements in a group of 30. So $n_3=1$ or $n_5=1$, and a unique Sylow subgroup is normal.

**And the square.** $|S_4|=24=2^3\cdot 3$, so a Sylow 2-subgroup has order 8 — and it is $D_4$, episode 1's cardboard square, sitting inside the permutations of its corners. Sylow III forces $n_2$ odd and dividing 3: there are three of them.

## Recall
type: mcq
Q: A group has order $p^a m$ with $p \nmid m$. Which statement is Sylow's, and not Lagrange's?
- [x] There is a subgroup of order exactly $p^a$, and the number of them is $\equiv 1 \pmod p$ — existence and counting, which Lagrange never gives.
- [ ] Every subgroup has order dividing $p^a m$ — that is Lagrange, and it says nothing about which divisors occur.
- [ ] Every divisor of $p^a m$ is the order of some subgroup — false in general; $A_4$ has order 12 and no subgroup of order 6.
