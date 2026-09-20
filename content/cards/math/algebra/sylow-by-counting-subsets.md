---
id: math.algebra.sylow.sylow-by-counting-subsets
topic: math.algebra.sylow
format: idea
difficulty: 5
language: en
weight: heavy
angles: [beautiful, tool]
tags: [sylow-theorems, wielandt-proof, binomial-coefficients, group-actions, existence-proof]
hook: "Wielandt proved that Sylow subgroups exist without constructing one. He counted subsets and let the arithmetic hand him a subgroup."
sources:
  - {title: "Sylow theorems", type: wiki, url: "https://en.wikipedia.org/wiki/Sylow_theorems"}
  - {title: "Helmut Wielandt", type: wiki, url: "https://en.wikipedia.org/wiki/Helmut_Wielandt"}
dates: {written: 2026-09-19, event: 1959-01-01}
related: [math.algebra.sylow.the-counting-that-cannot-fail]
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A subgroup that nobody built

Existence theorems usually come with instructions. Sylow's first theorem says a subgroup of order $p^a$ is in there somewhere, and you expect a recipe: start with an element of order $p$, take its normaliser, climb. That is one proof, and it is a climb.

Helmut Wielandt published a different one in 1959, and it builds nothing at all.

Write the group's order as $p^a m$ with $p$ not dividing $m$. Now consider every subset of the group with exactly $p^a$ elements. Not subgroups — subsets, a huge and completely structureless pile. Let the group act on the pile by left multiplication.

One computation does all the work: the number of such subsets is congruent to $m$ modulo $p$, so $p$ does not divide it. Orbits partition the pile, so some orbit has size not divisible by $p$. Look at the stabiliser of any subset in that orbit, and it is squeezed from both sides until it has exactly $p^a$ elements.

You never chose anything cleverly. The arithmetic hands you the subgroup.

## Rigor

Let $|G|=p^am$, $p\nmid m$, and let $\Omega$ be the set of subsets of $G$ of size $p^a$, with $G$ acting by $g\cdot S=gS$.

**The count.** Modulo $p$, $(1+x)^{p^a}\equiv 1+x^{p^a}$, so $(1+x)^{p^am}\equiv(1+x^{p^a})^m$. Comparing coefficients of $x^{p^a}$,
$$|\Omega|=\binom{p^am}{p^a}\equiv m \not\equiv 0 \pmod p .$$

So some orbit $\mathcal{O}$ has $p\nmid|\mathcal{O}|$. Fix $S\in\mathcal{O}$ with stabiliser $H=\{g: gS=S\}$.

**Upper bound.** For any $s\in S$, $Hs\subseteq S$, and $|Hs|=|H|$, so $|H|\le|S|=p^a$.

**Lower bound.** By orbit–stabiliser $|\mathcal{O}|=[G:H]=p^am/|H|$. Since $p\nmid|\mathcal{O}|$, the factor $p^a$ must be absorbed by $|H|$, so $p^a\mid |H|$.

Hence $|H|=p^a$. $\square$

The two bounds are the same orbit–stabiliser identity used in opposite directions: once to bound the stabiliser by the size of what it stabilises, once to read the stabiliser off the orbit's size.

## Recall
type: reveal
Q: In Wielandt's proof, what forces the stabiliser $H$ to have exactly $p^a$ elements?
A: Two squeezes. $Hs \subseteq S$ for $s \in S$ gives $|H| \le p^a$. And $p$ not dividing the orbit size $[G:H] = p^a m/|H|$ forces $p^a$ to divide $|H|$. Together: $|H| = p^a$.
