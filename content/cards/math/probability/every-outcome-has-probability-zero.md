---
id: math.probability.measure-theoretic.every-outcome-has-probability-zero
topic: math.probability.measure-theoretic
topics: [math.analysis.measure-lebesgue]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [paradox, beautiful, connection]
tags: [kolmogorov-1933, sigma-algebra, vitali, countable-additivity, radon-nikodym]
hook: "Pick a real number uniformly from [0,1]. Every single number had probability zero, and one of them happened."
sources:
  - {title: "Probability axioms", type: wiki, url: "https://en.wikipedia.org/wiki/Probability_axioms"}
  - {title: "Vitali set", type: wiki, url: "https://en.wikipedia.org/wiki/Vitali_set"}
  - {title: "Probability space", type: wiki, url: "https://en.wikipedia.org/wiki/Probability_space"}
dates: {written: 2026-09-19, event: 1933-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Every outcome has probability zero, and one of them happens

Pick a real number uniformly from $[0,1]$. Whatever comes out had, beforehand, probability exactly zero — there are uncountably many candidates and they cannot each get a positive share. So an event of probability zero occurred, and had to.

Fine, you say: probability zero means "won't happen" only for finite sets. Then try the harder version. Ask for a rule that assigns a probability to *every* subset of $[0,1]$, is translation-invariant around the circle, and is countably additive. There is none. Vitali built the counterexample in 1905, choosing one representative from each class of reals differing by a rational; the resulting set cannot consistently be given any probability at all.

So the naive picture — every collection of outcomes has a probability — is not merely inconvenient. It is inconsistent.

Kolmogorov's 1933 response was to stop treating probability as a property of outcomes and make it a measure on a restricted family of sets. Everything else in the subject follows from that decision.

## Rigor

**A probability space** is $(\Omega,\mathcal{F},P)$: a sample space, a $\sigma$-algebra of *measurable* events (closed under complement and countable unions), and $P:\mathcal{F}\to[0,1]$ with $P(\Omega)=1$ and countable additivity on disjoint sets. Not every subset of $\Omega$ is in $\mathcal{F}$, and that is the point.

**Vitali's set.** On $[0,1)$ with addition mod 1, the relation $x\sim y \iff x-y\in\mathbb{Q}$ partitions the interval into uncountably many classes; choice picks one representative from each, giving $V$. The translates $V+q$ for $q\in\mathbb{Q}\cap[0,1)$ are disjoint and cover $[0,1)$. Countable additivity plus translation invariance would force $1=\sum_{q} P(V)$, which is 0 if $P(V)=0$ and $\infty$ otherwise. Contradiction, so $V\notin\mathcal{F}$.

**What this buys.** Random variables become measurable functions $X:\Omega\to\mathbb{R}$; expectation becomes the Lebesgue integral $\mathbb{E}X=\int_\Omega X\,dP$, so convergence theorems (monotone, dominated) become available for free. Conditional expectation stops being $P(A\cap B)/P(B)$ — hopeless when $P(B)=0$ — and becomes the Radon–Nikodym derivative: the a.s.-unique $\mathcal{G}$-measurable $\mathbb{E}[X\mid\mathcal{G}]$ with $\int_G \mathbb{E}[X\mid\mathcal{G}]\,dP=\int_G X\,dP$ for all $G\in\mathcal{G}$. That is what lets you condition on a continuous variable, and it is what makes martingales and Brownian motion definable at all.

## Recall
type: mcq
Q: Why does probability have to be defined on a $\sigma$-algebra rather than on all subsets?
- [x] Because a translation-invariant countably additive measure on every subset of $[0,1)$ is impossible — Vitali's set has no consistent probability.
- [ ] Because some subsets are too large to measure — cardinality is not the obstruction; the Vitali set is no bigger than any other.
- [ ] Because infinite sets always cause contradictions — countable sets are entirely unproblematic; the issue needs the axiom of choice.
- [ ] To make the axioms simpler — restricting the domain makes the theory harder to state, and is done because the alternative is inconsistent.
