---
id: ai.rl.bandits.the-restaurant-you-never-optimise
topic: ai.rl.bandits
topics: [econ.behavioral.bounded-rationality]
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, practical, paradox]
callback: {from: ai.rl.bandits, to: econ.behavioral.bounded-rationality}
tags: [satisficing, simon, regret, lai-robbins, explore-exploit]
hook: "Simon said you satisfice because optimising costs more than it is worth. The bandit maths says satisficing costs you linearly, forever."
sources:
  - {title: "Satisficing", type: wiki, url: "https://en.wikipedia.org/wiki/Satisficing"}
  - {title: "A Behavioral Model of Rational Choice", author: "Herbert A. Simon", year: 1955, type: paper, url: "https://doi.org/10.2307/1884852"}
  - {title: "Asymptotically efficient adaptive allocation rules", author: "T. L. Lai & Herbert Robbins", year: 1985, type: paper, url: "https://doi.org/10.1016/0196-8858(85)90002-8"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The restaurant problem you solve badly every week

Remember the explore/exploit tradeoff from the bandit card? You run it every week without noticing. Twenty restaurants within walking distance, you have tried four, and you have maybe three hundred dinners left in this neighbourhood. Going back to the reliable one is exploitation. Trying the strange place on the corner is exploration.

Herbert Simon's 1955 answer was that you do not solve this problem, and you are right not to: working out the optimal policy costs more than the meals are worth. You *satisfice*. You set a bar for "good enough" and take the first option that clears it.

The bandit mathematics agrees with him about the reason and disagrees about the verdict. Optimal exploration is not a fixed budget you spend and finish — it is a rate you must keep paying, forever, at a slowly shrinking level. Any rule that stops exploring entirely, including satisficing, has a fixed chance of having settled on the wrong restaurant, and then it pays a small toll on every dinner for the rest of your life.

Both statements are true at once, and the reconciliation is about what you are counting.

## Rigor

With arms $a$ of mean $\mu_a$, best mean $\mu^{*}$, and gaps $\Delta_a=\mu^{*}-\mu_a$, regret after $T$ rounds is
$$R_T = T\mu^{*} - \mathbb{E}\Big[\textstyle\sum_{t=1}^{T}\mu_{a_t}\Big] = \sum_a \Delta_a\,\mathbb{E}[N_a(T)].$$

Lai and Robbins (1985) proved a lower bound: any policy that is uniformly good across problems must satisfy
$$\liminf_{T\to\infty}\frac{R_T}{\ln T}\;\ge\;\sum_{a:\Delta_a>0}\frac{\Delta_a}{\mathrm{KL}(\nu_a\,\|\,\nu^{*})},$$
so every suboptimal arm has to keep being sampled $\Theta(\ln T)$ times. Thompson sampling and UCB match this rate.

Now the satisficer. Fix an aspiration level; stop exploring once some arm clears it. With probability bounded away from zero the first arm to clear it is not the best, and from then on the per-round loss is a constant $\Delta>0$, giving $R_T=\Theta(T)$ — linear, not logarithmic.

The catch is in Simon's favour. $\ln T$ exploration only repays itself if $T$ is large, and the lower bound prices *only* the meals, never the deliberation. Price the computation and satisficing is not a failure to optimise; it is the optimum of a different, honest problem.

## Recall
type: mcq
Q: How much regret does a rule that stops exploring accumulate?
- [ ] Bounded — it converges to some arm and stops losing — it converges to the *wrong* arm with positive probability, and then never finds out.
- [x] Linear in the number of rounds — a constant per-round gap persists forever once exploration stops.
- [ ] Logarithmic, the same as an optimal rule — logarithmic regret is exactly what requires continuing to sample every arm.
