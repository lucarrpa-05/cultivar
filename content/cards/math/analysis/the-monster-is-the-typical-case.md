---
id: math.analysis.completeness-banach.the-monster-is-the-typical-case
topic: math.analysis.completeness-banach
topics: [math.analysis.differentiation]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [paradox, weird]
tags: [baire-category, comeager, nowhere-differentiable, generic, function-space]
hook: "Weierstrass's monster is not the exception. In the space of continuous functions almost every function is one."
related: [math.analysis.differentiation.the-curve-with-no-direction]
sources:
  - {title: "Weierstrass function: density of nowhere-differentiable functions", type: wiki, url: "https://en.wikipedia.org/wiki/Weierstrass_function"}
  - {title: "Uber die Baire'sche Kategorie gewisser Funktionenmengen", author: "Stefan Banach", year: 1931, type: paper, url: "https://doi.org/10.4064/sm-3-1-174-179"}
  - {title: "Baire category theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Baire_category_theorem"}
dates: {written: 2026-09-19, event: 1931-01-01}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The monster is the typical case

Weierstrass's nowhere-differentiable function was received as a freak — something you had to build on purpose, with an odd integer $b$ and a delicate inequality. In 1931 Banach and, independently, Mazurkiewicz showed that the freak is the norm.

In the space of continuous functions on $[0,1]$, with the sup norm, the nowhere-differentiable ones form a *comeager* set: a countable intersection of dense open sets. That is the topological version of "almost all". The functions you can differentiate — every polynomial, every sine, every function you have ever written down — sit inside a meagre set, a countable union of nowhere-dense pieces.

The parallel is exact and worth keeping. Among the reals, the numbers you can name are the rare ones. Among continuous functions, the ones you can differentiate are the rare ones. In both cases your intuition was built entirely out of the exceptions, because the exceptions are the only things that can be written down.

## Rigor

Work in the Banach space $(C[0,1],\|\cdot\|_\infty)$, which is complete, so Baire applies.

For $n\ge1$ let
$$E_n=\left\{f\in C[0,1]\ :\ \exists\,x\in[0,1-\tfrac1n]\ \text{with}\ |f(x+h)-f(x)|\le n h\ \ \forall h\in(0,\tfrac1n)\right\}.$$

If $f$ has a finite right derivative at any point, the difference quotients are bounded near that point, so $f\in E_n$ for some $n$. Hence the differentiable-somewhere functions lie in $\bigcup_n E_n$.

Each $E_n$ is **closed** (a uniform limit of functions satisfying the inequality at points $x_k$ satisfies it at a subsequential limit of the $x_k$, using compactness of $[0,1-\tfrac1n]$), and each has **empty interior**: any $f$ can be perturbed within $\varepsilon$ in sup norm by adding a small sawtooth of slope greater than $n$, which destroys the bound everywhere.

So $\bigcup_n E_n$ is meagre and its complement is comeager — and by Baire, non-empty, which incidentally re-proves that a nowhere-differentiable function exists without ever writing one down.

## Recall
type: mcq
Q: In what sense are "almost all" continuous functions nowhere differentiable?
- [x] In the sense of Baire category — they are comeager in $C[0,1]$, while the rest lie in a countable union of nowhere-dense closed sets.
- [ ] Lebesgue measure: they have full measure — there is no natural translation-invariant measure on this infinite-dimensional space to say that with.
- [ ] Cardinality: there are more of them — both families have the cardinality of the continuum, so counting cannot separate them.
