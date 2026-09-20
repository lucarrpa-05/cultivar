---
id: css.abm.sugarscape.grew-a-society-got-inequality
topic: css.abm.sugarscape
format: series
difficulty: 2
language: en
weight: medium
angles: [origin, numbers, connection]
tags: [sugarscape, epstein-axtell, artificial-societies, wealth-distribution, growback]
hook: "Two economists gave near-identical rules to near-identical agents and got a wealth distribution that looks like ours."
series: {id: css.abm.simulating-a-society, index: 3, total: 5, title: "Simulating a society"}
sources:
  - {title: "Growing Artificial Societies: Social Science from the Bottom Up", author: "Joshua M. Epstein and Robert Axtell", year: 1996, type: book, url: "https://mitpress.mit.edu/9780262550253/growing-artificial-societies/"}
  - {title: "Sugarscape", type: wiki, url: "https://en.wikipedia.org/wiki/Sugarscape"}
dates: {written: 2026-09-19, event: 1996-10-11}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# They grew a society and it invented inequality

The entire world is a 50 × 50 grid that wraps around like a doughnut, with two mountains of sugar on it. Each agent gets a vision (how far it can see), a metabolism (how fast it burns), and one rule: look as far as you can, go to the richest free square in sight, eat, burn. Run out and you die. That is the model. No banks, no bosses, no prices.

Within a few hundred ticks the agents have sorted themselves onto the two mountains, and the wealth distribution has gone violently skewed. A handful of agents are enormously rich. Most are not. Nobody stole anything; there is nothing to steal with. Small differences in vision and metabolism, plus where you happened to be born, are enough.

Epstein and Axtell then bolted on sex, inheritance, combat, trade, disease and culture, one rule at a time, in *Growing Artificial Societies* (1996). Every addition moved the distribution.

A society you can grow is a society you can vary. It is also still yours. How would you ever discover it was wrong?

## Rigor

The base model is two rules. **Growback:** each site regrows sugar at a fixed rate up to its own capacity. **Movement:** an agent with vision $v$ scans the sites within $v$ steps along its four cardinal directions, moves to the nearest unoccupied site of maximal sugar, eats all of it, and subtracts its metabolism $m$; when its stock reaches zero it dies.

So an agent's fate turns on how much it can reach against how fast it burns — roughly $v$ versus $m$ — plus its starting square. Vision and metabolism are drawn from bounded distributions, so the *inputs* are near-symmetric and light-tailed.

The output is not. Reaching a rich site both feeds you now and keeps you alive to reach the next one, so accumulation is multiplicative with an absorbing barrier at zero. Multiplicative growth plus an absorbing barrier is a standard recipe for a heavy right tail, and it is structurally the same story as preferential attachment in networks: advantage that compounds, from starting points that barely differ.

The lesson Epstein and Axtell press is not "inequality is natural". It is that a skewed outcome is weak evidence about a skewed cause.

## Recall
type: mcq
Q: Sugarscape's agents start with near-symmetric vision and metabolism. Why does wealth come out so skewed?
- [x] Advantage compounds — reaching a rich site feeds you and keeps you alive to reach the next one, with death as an absorbing barrier at zero.
- [ ] The landscape is heavy-tailed — it is two smooth sugar mountains, and the skew shows up on simpler landscapes too.
- [ ] Agents trade and some bargain harder — trade is a later extension; the base model has no trade at all.
