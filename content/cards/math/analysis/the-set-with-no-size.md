---
id: math.analysis.measure-lebesgue.the-set-with-no-size
topic: math.analysis.measure-lebesgue
topics: [math.foundations.cardinality]
format: series
difficulty: 4
language: en
weight: medium
angles: [paradox, weird]
tags: [vitali-set, non-measurable, axiom-of-choice, translation-invariance, countable-additivity]
hook: "You want length to be translation-invariant, countably additive and defined for every set. In 1905 Vitali proved you can have any two."
series: {id: math.analysis.riemann-to-lebesgue, index: 3, total: 4, title: "From Riemann to Lebesgue"}
sources:
  - {title: "Vitali set", type: wiki, url: "https://en.wikipedia.org/wiki/Vitali_set"}
  - {title: "Non-measurable set", type: wiki, url: "https://en.wikipedia.org/wiki/Non-measurable_set"}
  - {title: "Axiom of choice", type: wiki, url: "https://en.wikipedia.org/wiki/Axiom_of_choice"}
dates: {written: 2026-09-19, event: 1905-01-01}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Solovay's model assumes an inaccessible cardinal; the card now says so."}
---

# The set that has no size, and why you have to allow it

Episode 2 ended on a bill: the whole Lebesgue construction needs to assign a size to whatever set a band hands it. So write down what "size" should mean. An interval has size equal to its length. Sliding a set along the line does not change its size. And the size of countably many disjoint pieces is the sum of their sizes.

Three demands, all obviously correct, and together with a fourth — *every* subset of the line gets a size — they are inconsistent.

Giuseppe Vitali showed it in 1905 with a set you cannot draw. Call two reals equivalent when their difference is rational. That chops $[0,1]$ into uncountably many classes, each a shifted copy of the rationals. Now pick one representative from each class. Nothing tells you how to pick; the axiom of choice says you may.

The resulting set has no possible size. Not "unknown" — the arithmetic forbids every value at once.

## Rigor

Let $V\subset[0,1]$ contain exactly one element of each coset of $\mathbb{Q}$ in $\mathbb{R}$. Enumerate $\mathbb{Q}\cap[-1,1]=\{q_1,q_2,\dots\}$ and set $V_k=V+q_k$.

The $V_k$ are pairwise disjoint (two elements of $V$ differing by a rational would be in the same class), and
$$[0,1]\ \subseteq\ \bigcup_{k}V_k\ \subseteq\ [-1,2].$$

Suppose $V$ is measurable with $\lambda(V)=c$. Translation invariance gives $\lambda(V_k)=c$ for every $k$, and countable additivity gives
$$1\ \le\ \sum_{k=1}^{\infty}c\ \le\ 3 .$$
If $c=0$ the sum is $0$; if $c>0$ the sum is $+\infty$. Neither lands in $[1,3]$. So $V$ is not measurable.

Lebesgue's response was to give up the fourth demand: measure the sets you can, build a $\sigma$-algebra out of them, and stay inside it. Solovay proved in 1970 that this is genuinely a cost of choice — granted an inaccessible cardinal, there are models of ZF plus dependent choice in which every set of reals is measurable.

The bill is paid. Next: what the theory buys with it.

## Recall
type: mcq
Q: Which of the four demands does Lebesgue measure give up?
- [x] That every subset of the line has a measure — the domain is restricted to a $\sigma$-algebra of measurable sets.
- [ ] Countable additivity — kept, and it is precisely what makes the limit theorems work.
- [ ] Translation invariance — kept; length would be useless without it.
