---
id: math.foundations.cardinality.the-list-nobody-can-finish
topic: math.foundations.cardinality
format: series
difficulty: 3
language: en
weight: medium
angles: [beautiful, paradox]
tags: [diagonal-argument, uncountable, reals, cantor-1891]
hook: "Hand Cantor any list of real numbers and he hands back a number that is not on it. Every time."
series: {id: math.foundations.infinity-three-sizes, index: 2, total: 3, title: "Infinity, three sizes"}
diagram: {file: math/cantor-diagonal.svg, caption: "Read down the diagonal, change every digit, and you have built a number that differs from row n at place n.", alt: "A list of decimal expansions with the diagonal digits highlighted and a new number below, each of whose digits differs from the diagonal digit above it"}
sources:
  - {title: "Cantor's diagonal argument", type: wiki, url: "https://en.wikipedia.org/wiki/Cantor%27s_diagonal_argument"}
  - {title: "Cantor's first set theory article", type: wiki, url: "https://en.wikipedia.org/wiki/Cantor%27s_first_set_theory_article"}
  - {title: "Cantor's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Cantor%27s_theorem"}
dates: {written: 2026-09-19, event: 1891-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The cases environment had a single backslash where the row break belongs, so the digit rule rendered as one line."}
---

# The list nobody can finish

Last episode every infinite set you met turned out to be the same size. Cantor wrote to Dedekind on 29 November 1873 asking whether the reals could be matched with the counting numbers too. He had the answer eight days later: no.

The argument he published in 1891 is the one everybody remembers, and it is a heckle rather than a construction. Someone claims to have listed every real number between 0 and 1. Fine. Take the first digit of the first number and change it. Take the second digit of the second number and change it. The third digit of the third, and so on, forever.

The number you have just written differs from row one in place one, from row two in place two, from row $n$ in place $n$. So it is nowhere on a list that was supposed to contain everything.

The list was not too short. No list is long enough. There are strictly more reals than counting numbers — a second size of infinity, which immediately raises the question of whether there is a third.

## Rigor

**Theorem.** $[0,1)$ is uncountable.

**Proof.** Suppose $f:\mathbb{N}\to[0,1)$ is any function. Write $f(n)=0.d_{n1}d_{n2}d_{n3}\dots$ in decimal. Define
$$e_n=\begin{cases}5,& d_{nn}\neq 5\\ 4,& d_{nn}=5\end{cases}\qquad x=0.e_1e_2e_3\dots$$
Then $x\in[0,1)$ and $x\neq f(n)$ for every $n$, because their $n$-th digits differ. So $f$ is not surjective. No function $\mathbb{N}\to[0,1)$ is onto, hence no bijection exists. $\square$

**Why 4 and 5.** Decimal expansions are not unique — $0.4999\ldots = 0.5$ — so a careless digit choice could build a number that *looks* new but equals a listed one. Avoiding 0 and 9 entirely kills every such collision.

**What it is really about.** Nothing here is about decimals. The same move applied to indicator functions shows $|\mathcal{P}(\mathbb{N})|>|\mathbb{N}|$, and $|\mathcal{P}(\mathbb{N})|=|\mathbb{R}|=2^{\aleph_0}$. The pebbles-and-sheep matching of episode 1 fails not through lack of cleverness: every proposed matching contains the recipe for its own counterexample.

So $\mathbb{R}$ is bigger than $\mathbb{N}$. Is anything bigger than $\mathbb{R}$?

## Recall
type: mcq
Q: The diagonal argument shows that a proposed list of the reals must miss one. Why is that fatal rather than fixable?
- [x] The missing number is built from the list itself, so patching it in produces a new list with a new missing number — the failure is not an accident of the list you chose.
- [ ] Because the reals are dense and the list is not — density is irrelevant; $\mathbb{Q}$ is dense and can be listed.
- [ ] Because the list is finite — the list is infinite by assumption; length is not the problem.
- [ ] Because some reals have two decimal expansions — that is a technicality the proof sidesteps by only ever writing the digits 4 and 5.
