---
id: econ.micro.firms-costs.every-doubling-takes-twenty-percent
topic: econ.micro.firms-costs
format: idea
difficulty: 2
language: en
weight: medium
angles: [numbers, practical]
tags: [learning-curve, wrights-law, economies-of-scale, cumulative-production, solar]
hook: "Airframe costs in 1936 fell by a fifth every time total production doubled. The same exponent turns up in ships, chips and solar panels."
sources:
  - {title: "Experience curve effects — Wright's 1936 study and the progress ratio", type: wiki, url: "https://en.wikipedia.org/wiki/Experience_curve_effects"}
  - {title: "Factors Affecting the Cost of Airplanes", author: "Theodore P. Wright", year: 1936, type: paper, url: "https://doi.org/10.2514/8.155"}
  - {title: "How predictable is technological progress?", author: "J. Doyne Farmer & François Lafond", year: 2016, type: paper, url: "https://arxiv.org/abs/1502.05274"}
dates: {written: 2026-09-19, event: 1936-02-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Cost falls by a fifth every time you double everything you have ever built

In 1936 Theodore Wright looked at aircraft factories and found a pattern that had nothing to do with factory size. Every time *cumulative* production doubled — not output per month, total planes ever built — the labour needed for the next one fell by about twenty percent. Workers learn, tools get jigs, the fiftieth wing is not the fifth wing.

The number kept showing up. Liberty ships in the war, transistors, solar modules, batteries: different industries, progress ratios clustered in the same neighbourhood.

Why it matters is that it makes cost a function of *history*, not of current scale. Two firms with identical factories have different costs if one started earlier. A technology that looks hopelessly expensive today is not expensive because of physics; it is expensive because nobody has built many. And a subsidy that buys quantity can be self-justifying — which is an argument policy makers love, and should be made to prove.

Because proving it is genuinely hard, for a reason you already know.

## Rigor

Write $C_x$ for the cost of the $x$-th cumulative unit. Wright's law is a power law,

$$C_x=C_1\,x^{\log_2 b},$$

where $b$ is the **progress ratio**: cost after a doubling relative to cost before. Wright's aircraft gave $b\approx0.8$, so the exponent is $\log_2 0.8\approx-0.32$. On log–log axes it is a straight line, which is why the plots all look so convincing.

Keep it distinct from economies of scale, where cost falls with the *rate* of output at a point in time. Learning depends on accumulated experience; scale on current volume. A firm can have one and not the other.

And here is the econometric catch. Cumulative production grows with time, and so does everything else — general technical progress, input prices, quality. Regressing log cost on log cumulative output attributes all of it to learning, by construction. Separating the two needs variation in production that is not variation in time: a policy shock, a war, a subsidy with a cutoff.

## Recall
type: mcq
Q: A solar-module maker's cost per watt falls 20% every time cumulative output doubles. What does that say about economies of scale?
- [x] Nothing directly — the learning curve tracks accumulated experience, while scale economies track the current rate of output. — a firm can show one without the other.
- [ ] That average cost falls as the plant gets bigger. — that is the scale story, which this pattern does not measure.
- [ ] That marginal cost is below average cost at every output. — a statement about one moment's cost curve, unrelated to the history of production.
- [ ] That the firm has a natural monopoly. — steep learning can favour incumbents, but it is not the natural-monopoly condition.
