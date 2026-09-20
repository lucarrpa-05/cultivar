---
id: econ.behavioral.prospect-theory.four-boxes-of-risk
topic: econ.behavioral.prospect-theory
format: series
difficulty: 4
language: en
weight: heavy
angles: [beautiful, prediction]
tags: [fourfold-pattern, rank-dependence, stochastic-dominance, decision-weights]
series: {id: econ.behavioral.prospect-theory-properly, index: 4, total: 4, title: "Prospect theory, properly"}
hook: "One risk attitude cannot bend twice. The fourfold pattern needs both of prospect theory's moves at once."
sources:
  - {title: "Cumulative prospect theory", type: wiki, url: "https://en.wikipedia.org/wiki/Cumulative_prospect_theory"}
  - {title: "Advances in prospect theory: cumulative representation of uncertainty, Journal of Risk and Uncertainty 5(4)", author: "Tversky & Kahneman", year: 1992, type: paper, url: "https://doi.org/10.1007/BF00122574"}
  - {title: "Prospect theory", type: wiki, url: "https://en.wikipedia.org/wiki/Prospect_theory"}
dates: {written: 2026-09-19, event: 1992-10-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Four boxes that hold almost everything people do about risk

Put the two moves together — outcomes as changes through a kinked value function, probabilities bent through an inverse S — and you get a prediction no single risk attitude can generate. Whether someone gambles depends on two things at once: gain or loss, and large probability or small.

High-probability gains: take the sure thing. High-probability losses: gamble rather than accept a certain loss. Low-probability gains: buy the lottery ticket. Low-probability losses: buy the insurance. Risk-averse, risk-seeking, risk-seeking, risk-averse, in that order. Tversky and Kahneman called it the fourfold pattern, and it is the sharpest thing the theory predicts, because one curvature parameter cannot bend twice.

The 1992 rewrite was not cosmetic either. The 1979 original could hand a higher value to a prospect that loses outcome by outcome. Ranking the outcomes first repairs it — and takes us back to the two choices that started this.

## Rigor

Cumulative prospect theory evaluates a prospect with outcomes $x_1<\dots<x_n$ and probabilities $p_i$ as $V=\sum_i \pi_i\,v(x_i)$, where the decision weights are *differences of the weighting function applied to cumulative probabilities*. For gains, ranked from the best downwards,

$$\pi_i=w\Bigl(\sum_{j\ge i}p_j\Bigr)-w\Bigl(\sum_{j>i}p_j\Bigr).$$

Losses are handled the same way from the worst upwards, using $\delta=0.69$ in place of $\gamma=0.61$.

Why the repair matters: in the 1979 form, applying $w$ to each $p_i$ separately gives $\sum_i w(p_i)\ne 1$, and a prospect that is stochastically dominated can come out ahead. Rank-dependent weights telescope to exactly $1$, so dominance is preserved by construction.

Now go back to episode 1. With $\gamma=0.61$, $w(1)-w(0.89)\approx 0.30$ while $w(0.11)-w(0)\approx 0.20$. The same eleven percentage points are worth half again as much when they are the last step to certainty. Feed that asymmetry into A-versus-B and C-versus-D and the Allais pair stops being a contradiction and becomes a consequence. The axiom was wrong about people, not the people about the axiom.

## Recall
type: mcq
Q: What did the 1992 cumulative version fix in the 1979 original?
- [x] Weighting each probability separately could rank a dominated prospect above one that beats it — rank-dependent weights cannot.
- [ ] The value function was not steep enough on the loss side — the value function was essentially unchanged; the repair was on the probability side.
- [ ] It removed the reference point — reference dependence is the core of both versions and stayed put.
