---
id: math.linear-algebra.duality.the-transpose-is-an-arrow-reversal
topic: math.linear-algebra.duality
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, connection]
tags: [transpose, dual-map, rank, annihilator, pullback]
hook: "Why does reversing a product reverse its order under transposition? Because the transpose is an arrow pointing the other way."
sources:
  - {title: "Dual space", type: wiki, url: "https://en.wikipedia.org/wiki/Dual_space"}
  - {title: "Transpose", type: wiki, url: "https://en.wikipedia.org/wiki/Transpose"}
dates: {written: 2026-09-19}
related: [math.linear-algebra.duality.the-dot-product-was-never-a-product]
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The transpose is not about flipping a grid

Reflecting a matrix across its diagonal looks like a notational stunt. Then it keeps showing up where notation should not matter. Why does $(AB)^{T}=B^{T}A^{T}$ reverse the order? Why is row rank equal to column rank, a fact with no obvious reason to be true? Why do symmetric matrices behave so well?

Those are not facts about grids.

Given a linear map $T:V\to W$, there is a map going the other way that needs no choices at all. Take a measurement on $W$ — an element of the dual — and pull it back to a measurement on $V$: measure *after* applying $T$. That is the dual map $T^{*}:W^{*}\to V^{*}$. Pick bases, take the dual bases, and the matrix of $T^{*}$ is literally the transpose of the matrix of $T$.

So flipping the grid is the shadow of reversing an arrow. And the order reversal is now obvious: to pull a measurement back through "do $A$, then do $B$", you pull through $B$ first and then through $A$.

## Rigor

Define $T^{*}:W^{*}\to V^{*}$ by $T^{*}(\varphi)=\varphi\circ T$. Functoriality is immediate: $(S\circ T)^{*}=T^{*}\circ S^{*}$, which is $(AB)^{T}=B^{T}A^{T}$.

In bases $\{e_j\}$ of $V$ and $\{f_i\}$ of $W$ with $T e_j=\sum_i a_{ij}f_i$,
$$T^{*}(f^{i})(e_j)=f^{i}(Te_j)=a_{ij},$$
so $T^{*}f^{i}=\sum_j a_{ij}e^{j}$: the coefficient matrix of $T^*$ in the dual bases is $A^{T}$.

**Row rank equals column rank.** For a subspace $U\subseteq V$, its annihilator $U^{\circ}=\{\varphi\in V^*:\varphi|_U=0\}$ has $\dim U^{\circ}=\dim V-\dim U$. One checks $\ker T^{*}=(\operatorname{im}T)^{\circ}$, so
$$\operatorname{rank}T^{*}=\dim W^{*}-\dim\ker T^{*}=\dim W-(\dim W-\operatorname{rank}T)=\operatorname{rank}T .$$
The rank of $A^{T}$ — the row rank of $A$ — equals the rank of $A$. The mysterious symmetry of the grid is the unremarkable statement that an arrow and its reversal have the same rank.

## Recall
type: mcq
Q: What is the transpose of a linear map, intrinsically?
- [x] The pullback of functionals — $T^{*}(\varphi)=\varphi\circ T$, a map from $W^{*}$ to $V^{*}$ that needs no basis at all.
- [ ] The inverse of the map — the two are unrelated; non-invertible maps still have transposes.
- [ ] The adjoint with respect to an inner product — that is a close relative, but it needs a metric, while the dual map does not.
