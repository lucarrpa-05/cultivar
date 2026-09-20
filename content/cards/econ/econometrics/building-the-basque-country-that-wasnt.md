---
id: econ.econometrics.synthetic-control.building-the-basque-country-that-wasnt
topic: econ.econometrics.synthetic-control
format: idea
difficulty: 3
language: en
weight: heavy
angles: [tool, beautiful]
tags: [synthetic-control, abadie, basque-country, proposition-99, placebo-inference]
hook: "One region, one policy, no control group. So they built a control group out of weighted pieces of other regions."
sources:
  - {title: "The Economic Costs of Conflict: A Case Study of the Basque Country", author: "Alberto Abadie & Javier Gardeazabal", year: 2003, type: paper, url: "https://doi.org/10.1257/000282803321455188"}
  - {title: "Synthetic Control Methods for Comparative Case Studies: Estimating the Effect of California's Tobacco Control Program", author: "Alberto Abadie, Alexis Diamond & Jens Hainmueller", year: 2010, type: paper, url: "https://www.nber.org/papers/w12831"}
  - {title: "Synthetic control method", type: wiki, url: "https://en.wikipedia.org/wiki/Synthetic_control_method"}
dates: {written: 2026-09-19, event: 2003-03-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Build the region where the policy never happened

Difference-in-differences needs a control group. What do you do when exactly one unit is treated — one region hit by terrorism, one state that passed the law, one country that adopted the currency? No other place is the Basque Country.

Abadie and Gardeazabal's answer in 2003 was to stop looking for a twin and build one. Take all the untreated Spanish regions, and find the weighted average of them that tracks the Basque Country *before* the violence: same income path, same industrial mix, same investment rate. That weighted blend — perhaps a bit of Catalonia, a bit of Madrid — is the synthetic Basque Country. Let it run forward, and the gap between the real one and the synthetic one is the estimate. They put the cost of terrorism at roughly ten percent of per capita GDP.

The method's most quoted outing came in 2010: synthetic California against real California after Proposition 99, with about 26 fewer packs of cigarettes sold per person per year by 2000.

The weights are the assumption, and they are constrained on purpose.

## Rigor

One treated unit $j=1$, donors $j=2,\dots,J+1$, treatment at $T_0$. Choose weights $w=(w_2,\dots,w_{J+1})$ minimising the pre-treatment distance

$$\lVert X_1-X_0w\rVert_V \quad\text{subject to}\quad w_j\ge 0,\ \sum_j w_j=1,$$

where $X$ collects pre-treatment outcomes and predictors. The estimated effect is $\hat\alpha_{1t}=Y_{1t}-\sum_j w_j Y_{jt}$ for $t>T_0$.

The two constraints do the work. Non-negativity and summing to one keep the synthetic unit inside the **convex hull** of the donors, so the method refuses to extrapolate — if no blend of donors can match the treated unit before treatment, you learn that instead of getting a confident wrong answer. Abadie, Diamond and Hainmueller show the bias is bounded when the pre-treatment fit is good over many periods, because matching a long pre-period implicitly matches the unobserved factor loadings.

Inference is by permutation: apply the identical procedure to each donor as a placebo, then ask where the real gap ranks among the fake ones. With 38 donors, being the largest gap is a p-value of about $1/39$.

## Recall
type: mcq
Q: Why are synthetic-control weights restricted to be non-negative and sum to one?
- [x] To keep the synthetic unit inside the donors' convex hull, so it never extrapolates beyond the observed data. — a poor pre-treatment fit then warns you rather than hiding.
- [ ] To make the weights interpretable as probabilities of treatment. — they are not propensities; they are matching weights on units.
- [ ] Because negative weights would make the estimator biased. — unrestricted regression weights are not biased per se; they extrapolate, which is a different sin.
- [ ] To guarantee the estimate is statistically significant. — significance comes from the placebo permutation, and the constraints do nothing for it.
