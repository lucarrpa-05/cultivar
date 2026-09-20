---
id: econ.game-theory.bargaining.splitting-a-pie-that-shrinks
topic: econ.game-theory.bargaining
topics: [econ.game-theory.mechanism-design]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [nash-bargaining, rubinstein, alternating-offers, discount-factor]
hook: "Nash wrote down four axioms and got one answer. Rubinstein modelled the haggling and got the same one."
sources:
  - {title: "Bargaining problem", type: wiki, url: "https://en.wikipedia.org/wiki/Bargaining_problem"}
  - {title: "Rubinstein bargaining model", type: wiki, url: "https://en.wikipedia.org/wiki/Rubinstein_bargaining_model"}
  - {title: "Perfect equilibrium in a bargaining model, Econometrica 50(1)", author: "Ariel Rubinstein", year: 1982, type: paper, url: "https://doi.org/10.2307/1912531"}
dates: {written: 2026-09-19, event: 1982-01-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Splitting a pie while every minute of arguing eats some of it

Two people must divide one peso; if they never agree, both get nothing. Every possible split is a Nash equilibrium — I demand $x$, you demand $1-x$, and neither of us can gain by moving alone. So the concept says nothing at all here. Bargaining needed a different kind of answer, and it got two.

Nash's 1950 answer was axiomatic. Forget the haggling; write down what a reasonable solution must satisfy and see what survives. Four conditions — efficiency, symmetry, invariance to how you scale utilities, and independence of irrelevant alternatives — select exactly one point: the split maximising the product of the two players' gains over their disagreement payoffs.

Rubinstein's 1982 answer was strategic. Model the haggling: players alternate offers, and delay costs, because the pie shrinks. That game has a *unique* subgame-perfect equilibrium, and agreement arrives immediately, on the first offer.

The two answers turn out to be the same answer, which took until 1986 to prove.

## Rigor

**Nash bargaining.** For a convex compact feasible set $S\subseteq\mathbb{R}^2$ and a disagreement point $d$, the unique solution satisfying Pareto efficiency, symmetry, invariance under positive affine rescaling of utilities, and independence of irrelevant alternatives is

$$\arg\max_{u\in S,\ u\ge d}\ (u_1-d_1)(u_2-d_2).$$

**Rubinstein alternating offers.** Players alternate proposing a split of $1$; each rejection costs one period, with discount factors $\delta_1,\delta_2$. The unique subgame-perfect equilibrium gives the first proposer

$$\frac{1-\delta_2}{1-\delta_1\delta_2},$$

which is $1/(1+\delta)$ when the two are equally patient. The proof is a stationarity argument: if $x$ is the most a proposer can obtain, the responder must be offered $\delta_2$ times *their* own best continuation, and the resulting pair of equations pins $x$ down uniquely. Agreement is immediate, because there is nothing to be gained by a delay whose cost everybody can compute.

**The bridge.** Shrink the period length to zero with discount *rates* $r_i$ fixed, so $\delta_i=e^{-r_i\Delta}\to 1$. The Rubinstein share converges to $r_2/(r_1+r_2)$, which is exactly the asymmetric Nash bargaining solution with weights inversely proportional to impatience (Binmore, Rubinstein and Wolinsky, 1986). Patience is bargaining power, and Nash's axioms were quietly encoding it all along. The first-mover advantage vanishes in that limit — it was an artefact of the period length.

## Recall
type: mcq
Q: Why is there agreement on the very first offer in the Rubinstein model?
- [x] Delay is costly and its cost is common knowledge — so the proposer offers exactly what the responder could get by waiting.
- [ ] Because the players are impatient and careless — they are impatient and perfectly calculating, which is what makes the first offer exact.
- [ ] Because the pie cannot be divided finely — it is perfectly divisible, which is what allows an exact offer to exist.
