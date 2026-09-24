---
id: econ.micro.preferences-utility.a-preference-no-number-can-hold
topic: econ.micro.preferences-utility
topics: [math.analysis.metric-spaces]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [paradox, connection, beautiful]
tags: [lexicographic-preferences, utility-representation, debreu, countability, continuity, dictionary-order]
context: context:2026-09:topology-munkres
hook: "Rank bundles like words in a dictionary and you get a perfectly rational preference that no utility function can describe."
related: [econ.micro.preferences-utility.utility-is-a-ranking]
sources:
  - {title: "Lexicographic preferences", type: wiki, url: "https://en.wikipedia.org/wiki/Lexicographic_preferences"}
  - {title: "Debreu theorems (representation of continuous preferences)", type: wiki, url: "https://en.wikipedia.org/wiki/Debreu_theorems"}
  - {title: "Representation of a preference ordering by a numerical function (1954; reprinted in Mathematical Economics, ch. 6)", author: "Gerard Debreu", year: 1954, type: book, url: "https://www.cambridge.org/core/books/abs/mathematical-economics/representation-of-a-preference-ordering-by-a-numerical-function/009AEFFF2E07235C5BBFFEF226353FE8"}
dates: {written: 2026-09-23}
author: author-econ-1
reviewed: {by: reviewer-econ-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Math checked. Added Debreu (1954) as the canonical source; the card had only Wikipedia."}
---

# A perfectly rational preference that no number can represent

Rank bundles the way a dictionary ranks words. Compare apples first, and more apples always wins. Only if the apples tie do you look at bananas. Complete, transitive, perfectly sensible, and Munkres already showed it to you as the dictionary order on $\mathbb{R}\times\mathbb{R}$.

Now write down a utility function for it: one number per bundle, bigger for better. You cannot. Not a clever one, not an ugly one; none exists.

The obstruction is not economics, it is counting. There are too many apple amounts, and each demands its own private stretch of the real line. The repair economists adopted is a topological condition that sits right beside the metric spaces you are reading this week.

## Rigor

First the counting, then the repair.

**No utility.** Order $\mathbb{R}^2$ by $(x,y)\succ(x',y')$ iff $x>x'$, or $x=x'$ and $y>y'$. Suppose $u:\mathbb{R}^2\to\mathbb{R}$ represents it. For each $x$, $u(x,0)<u(x,1)$, so pick a rational $q(x)$ strictly between them. If $x<x'$ then $(x,1)\prec(x',0)$, so $u(x,1)<u(x',0)$: the intervals $\big(u(x,0),u(x,1)\big)$ are pairwise disjoint. Hence $q:\mathbb{R}\to\mathbb{Q}$ is injective, contradicting the countability of $\mathbb{Q}$. Each apple amount's "private stretch" is that interval.

**The repair (Debreu, 1954).** Call $\succeq$ continuous if every upper set $\{z: z\succeq w\}$ and every lower set $\{z: w\succeq z\}$ is closed. A complete, transitive, continuous preference on a connected, separable space such as $\mathbb{R}^n_+$ has a continuous utility representation.

**Where the dictionary order fails.** Its upper set at $(1,1)$ is $\{x>1\}\cup\{x=1,\ y\ge1\}$. The points $(1+\tfrac1n,0)$ lie in it and converge to $(1,0)$, which does not. Not closed. In a metric space, closed means closed under limits, so continuity says: a limit of bundles at least as good as $w$ is still at least as good as $w$. Lexicographic tastes break exactly that sentence.

## Recall
type: mcq
Q: Why can't lexicographic preferences on ℝ² have any utility function?
- [x] Each first-coordinate value needs its own disjoint interval of utility values, and ℝ cannot hold uncountably many disjoint nonempty intervals — each would contain a different rational.
- [ ] Because they are not transitive — they are complete and transitive; what fails is representability, not rationality.
- [ ] Because a utility function must be continuous — even a discontinuous one is impossible here; the obstruction is countability.
