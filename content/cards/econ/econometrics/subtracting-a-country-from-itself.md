---
id: econ.econometrics.panel-fixed-effects.subtracting-a-country-from-itself
topic: econ.econometrics.panel-fixed-effects
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, connection]
tags: [fixed-effects, within-transformation, panel-data, strict-exogeneity, attenuation]
hook: "You can delete a confounder you have never measured and cannot name — as long as it never changes."
sources:
  - {title: "Fixed effects model", type: wiki, url: "https://en.wikipedia.org/wiki/Fixed_effects_model"}
  - {title: "Econometric Analysis of Cross Section and Panel Data, ch. 10", author: "Jeffrey M. Wooldridge", year: 2010, type: book, url: "https://mitpress.mit.edu/9780262232586/econometric-analysis-of-cross-section-and-panel-data/"}
  - {title: "Frisch–Waugh–Lovell theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Frisch%E2%80%93Waugh%E2%80%93Lovell_theorem"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Fixed effects is subtraction, and it throws away most of your data

Here is the trick that makes panel data feel like magic. You are worried that countries differ in ways nobody can measure — legal culture, trust, geography, whatever "institutions" means this week. You cannot control for a thing you cannot name.

But if it does not change over time, you do not have to. Subtract each country's own average from every variable it has, and anything constant within that country vanishes in the subtraction, measured or not. What remains is deviations from your own mean: did Colombia's investment rise in the years Colombia's tax rate fell? The unmeasured confounder is gone without ever being observed.

Then read the bill. Everything that is fixed is also unidentified — you can never estimate the effect of geography this way. Units that never change contribute nothing. Any confounder that *moves* is untouched. And measurement error gets worse, because subtracting the mean removes real signal while leaving the noise behind.

Also, the "magic" is a projection you already know.

## Rigor

Model $y_{it}=\alpha_i+\beta x_{it}+u_{it}$, where $\alpha_i$ is arbitrary, possibly correlated with $x$. Averaging over $t$ within unit $i$ and subtracting gives the **within transformation**

$$\ddot y_{it}=y_{it}-\bar y_i=\beta\,(x_{it}-\bar x_i)+\ddot u_{it}=\beta\ddot x_{it}+\ddot u_{it},$$

and $\alpha_i$ is gone because it equals its own average. OLS on the demeaned data is the fixed-effects estimator, and by Frisch–Waugh–Lovell it is numerically identical to including a dummy for every unit: demeaning *is* projecting out the dummies.

Consistency needs **strict exogeneity**, $\mathbb{E}[u_{it}\mid x_{i1},\dots,x_{iT},\alpha_i]=0$ — not just "no contemporaneous correlation" but no feedback from today's shock to tomorrow's regressor, which rules out a lagged dependent variable.

Attenuation gets worse in a quantifiable way: with classical measurement error, the bias factor moves from $\sigma^2_{x^*}/(\sigma^2_{x^*}+\sigma^2_e)$ to a version in *deviations*, and deviations have less signal variance than levels. Cleaner design, noisier regressor.

## Recall
type: mcq
Q: A fixed-effects regression of growth on trade openness across countries. What is still a threat?
- [x] Anything that changes over time within a country and moves with openness — a reform wave, a commodity boom. — the within transformation only removes what is constant.
- [ ] Permanent differences in institutions across countries. — those are exactly what the demeaning deletes, measured or not.
- [ ] Countries having different average growth rates. — a level difference per country is absorbed by its own fixed effect.
- [ ] The fact that openness is measured with error. — a real problem, but it attenuates the estimate rather than acting as a confounder.
