---
id: econ.game-theory.cooperative-shapley.the-airport-runway
topic: econ.game-theory.cooperative-shapley
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, practical]
tags: [shapley-value, cost-sharing, airport-problem, marginal-contribution]
hook: "Four aircraft, one runway, one bill. There is exactly one split that satisfies a short list of fairness axioms."
sources:
  - {title: "Shapley value", type: wiki, url: "https://en.wikipedia.org/wiki/Shapley_value"}
  - {title: "Airport problem", type: wiki, url: "https://en.wikipedia.org/wiki/Airport_problem"}
  - {title: "A simple expression for the Shapley value in a special case, Management Science 20(3)", author: "Littlechild & Owen", year: 1973, type: paper, url: "https://doi.org/10.1287/mnsc.20.3.370"}
dates: {written: 2026-09-19, event: 1973-11-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Four aircraft, one runway, and exactly one fair bill

A small airport builds one runway. The smallest aircraft needs 8 units of it, the next 11, the next 13, the largest 18. They all land on the same strip. Who pays what?

An equal split is absurd: the little plane subsidises the big one. Charging each what it would need on its own collects far too much, because the runway gets built once. What you want is a rule charging each aircraft for the extra burden it imposes — and if you insist on a short list of fairness properties, exactly one such rule exists.

Lloyd Shapley wrote it down in 1953: give each player the average of what they add to a coalition, taken over every order in which the coalition could have formed. Littlechild and Owen showed in 1973 that for a runway this collapses into something you could implement at a desk. Cut the runway into segments and split each segment's cost equally among the aircraft that need it.

The answer is 2, 3, 4 and 9.

## Rigor

For a cooperative game $(N,v)$ with $v(\emptyset)=0$, the **Shapley value** of player $i$ is

$$\varphi_i(v)=\sum_{S\subseteq N\setminus\{i\}}\frac{|S|!\,(n-|S|-1)!}{n!}\bigl[v(S\cup\{i\})-v(S)\bigr],$$

which is the expected marginal contribution of $i$ when the grand coalition forms in a uniformly random order. It is the unique value satisfying efficiency ($\sum_i\varphi_i=v(N)$), symmetry, additivity and the null-player property.

For the airport, $v(S)$ is the cost of the longest runway any member of $S$ requires, with requirements $8,11,13,18$ for types $A,B,C,D$. Littlechild and Owen's reduction: partition the runway into segments of length $8,3,2,5$ and divide each segment equally among the aircraft using it. Segment 1 serves all four, so $8/4=2$ each. Segment 2 serves $B,C,D$: $3/3=1$ each. Segment 3 serves $C,D$: $2/2=1$ each. Segment 4 serves $D$ alone: $5$.

Totals: $A=2$, $B=3$, $C=4$, $D=9$, summing to $18$ — efficiency, checked. The rule an airport authority would reach for by instinct turns out to be the Shapley value in disguise, which is precisely why the axioms are worth knowing: they tell you when your instinct is the unique consistent one and when it is not.

## Recall
type: mcq
Q: What is the Shapley value of a player, in one sentence?
- [x] Their average marginal contribution over all orders the coalition could form in — one number each, summing to the total.
- [ ] Their share in proportion to what they would need alone — that rule over-collects, because the runway is built only once.
- [ ] An equal split of the total among all players — that makes the smallest aircraft subsidise the largest.
