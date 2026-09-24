---
id: math.algebra.group-actions.cayley-reads-the-multiplication-table
topic: math.algebra.group-actions
topics: [math.algebra.permutations]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [paradox, tool, history]
tags: [cayley-theorem, left-multiplication, regular-action, sign-homomorphism, multiplication-table]
hook: "Every row of a multiplication table is a shuffle of the group. That is the whole proof of Cayley's theorem, and it still proves things."
context: "context:2026-09:abstract-algebra"
related: [math.algebra.group-actions.the-group-leaves-home, math.category.categories-functors.a-group-is-a-category-with-one-object]
sources:
  - {title: "Cayley's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Cayley%27s_theorem"}
  - {title: "On the theory of groups, as depending on the symbolic equation θ^n = 1", author: "Arthur Cayley", year: 1854, type: paper, url: "https://doi.org/10.1080/14786445408647421"}
  - {title: "Parity of a permutation", type: wiki, url: "https://en.wikipedia.org/wiki/Parity_of_a_permutation"}
dates: {written: 2026-09-23, event: 1854-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "rewrote the body's last line so it hands off to the rigor's map λ. Cayley 1854 (Phil. Mag. 7, no. 42) and 'never checked the homomorphism' confirmed; the |G|=2m, m odd proof checked (it is D&F §4.2)."}
---

# Cayley's theorem is one line long, and it still has teeth

Write out any group's multiplication table and look at a single row. Every element appears in it exactly once, like a line of a sudoku. So each row is a shuffle of the group's elements, and following one row after another composes the shuffles. That is Cayley's theorem: every group is a group of permutations.

The trivial half: the proof is that observation. Cayley wrote it down in 1854 without even checking in print that it respects multiplication.

The deep half: the axioms you memorised lose nothing. Anything that satisfies them really is a family of symmetries of something, namely itself.

Below, the shuffle becomes a map, and counting the swaps in one row proves a theorem.

## Rigor

**Theorem (Cayley).** For a group $G$, the map $\lambda:G\to\operatorname{Sym}(G)$, $\lambda_g(x)=gx$, is an injective homomorphism. If $|G|=n$, then $G$ embeds in $S_n$.

*Proof.* $\lambda_g$ is a bijection with inverse $\lambda_{g^{-1}}$: the sudoku row. $\lambda_{gh}(x)=ghx=\lambda_g(\lambda_h(x))$, so $\lambda$ is a homomorphism; it is the action of $G$ on itself by left multiplication. If $\lambda_g=\mathrm{id}$ then $g=\lambda_g(e)=e$. $\square$

**The teeth.** *If $|G|=2m$ with $m$ odd, then $G$ has a normal subgroup of index 2.* So no such group with $m>1$ is simple.

Pair every element with its inverse. Since $|G|$ is even and $e$ is paired with itself, some $t\ne e$ is too: $t^2=e$. Because $tx\ne x$ for every $x$, the row $\lambda_t$ moves every element, and since $\lambda_t^2=\mathrm{id}$ it is a product of $m$ disjoint transpositions $(x\ \ tx)$. With $m$ odd, $\lambda_t$ is an odd permutation. So $\operatorname{sgn}\circ\lambda:G\to\{\pm1\}$ is onto, and its kernel, the elements whose rows are even shuffles, is normal of index 2.

Everything came from counting the swaps in one row of the table.

## Recall
type: mcq
Q: Why is every row of a group's multiplication table a permutation of the group?
- [x] Cancellation: $gx=gy$ forces $x=y$, and $\lambda_{g^{-1}}$ undoes $\lambda_g$ — so left multiplication by $g$ is a bijection.
- [ ] Because the group is abelian — rows are permutations in every group, abelian or not.
- [ ] Because every element's order divides $|G|$ — true, but that is Lagrange; the row property is pure cancellation.
