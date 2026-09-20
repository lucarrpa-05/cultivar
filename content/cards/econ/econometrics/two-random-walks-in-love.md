---
id: econ.econometrics.time-series.two-random-walks-in-love
topic: econ.econometrics.time-series
format: idea
difficulty: 3
language: en
weight: medium
angles: [paradox, mistake]
tags: [spurious-regression, unit-root, random-walk, cointegration, granger-newbold]
hook: "Generate two series with a coin flip each, regress one on the other, and the software will hand you a beautiful significant relationship."
sources:
  - {title: "Spurious regressions in econometrics", author: "Clive W. J. Granger & Paul Newbold", year: 1974, type: paper, url: "https://doi.org/10.1016/0304-4076(74)90034-7"}
  - {title: "Why do we Sometimes get Nonsense-Correlations between Time-Series?", author: "G. Udny Yule", year: 1926, type: paper, url: "https://doi.org/10.2307/2341482"}
  - {title: "Spurious relationship", type: wiki, url: "https://en.wikipedia.org/wiki/Spurious_relationship"}
dates: {written: 2026-09-19, event: 1974-07-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Two random walks look like soulmates

Take two series that have nothing to do with each other. Each one starts at zero and takes a step every period, up or down by a coin flip — a random walk, the purest possible independence. Regress one on the other. You should find nothing.

You will usually find something, with a high $R^2$ and a t-statistic over 2. Granger and Newbold ran exactly this in 1974 and reported rejecting the null of no relationship in most of their simulations; Udny Yule had already worried about it in 1926, calling them nonsense-correlations. And this is not an exotic failure: most macroeconomic series look like random walks. GDP, prices, exchange rates, debt, the number of stork nests in Europe.

The reason is that the usual standard error is computed assuming today's error tells you nothing about tomorrow's. In a random walk the error *is* the accumulated past, so a chance divergence persists for the length of your sample and the regression reads a wandering drift as a relationship. Sample size does not save you — it makes the t-statistic bigger.

## Rigor

Let $y_t=y_{t-1}+\varepsilon_t$ and $x_t=x_{t-1}+\eta_t$ with $\varepsilon\perp\eta$: two independent unit-root processes. Regressing $y$ on $x$, the OLS slope has no probability limit — it converges in distribution to a functional of two independent Brownian motions rather than to zero, and the conventional t-statistic diverges at rate $\sqrt{T}$. So the rejection rate goes to 100% as the sample grows.

Granger and Newbold's field diagnostic is still the fastest one: if $R^2$ exceeds the Durbin–Watson statistic, suspect spuriousness — near-unit-root residuals push $DW$ toward zero while the fit looks superb.

Two ways out. Difference the series and work with $\Delta y_t$ on $\Delta x_t$, which is stationary but throws away long-run information. Or ask whether some linear combination $y_t-\theta x_t$ is stationary even though each series wanders: that is **cointegration**, and it is the case where the long-run relationship is real. Genuinely related series share a common stochastic trend; the coin-flip pair never will.

## Recall
type: mcq
Q: Regressing GDP on a random walk of coin flips gives $R^2=0.86$ and $t=7$. What is the honest reading?
- [x] Both series have a unit root, so the usual t-statistic does not have its usual distribution and inflates with sample size. — the fix is differencing, or a cointegration test.
- [ ] There is a real long-run relationship worth investigating. — a relationship between a macro series and simulated coin flips is exactly the thing this failure mode manufactures.
- [ ] The relationship is real but the standard errors should be clustered. — clustering addresses within-group correlation, not non-stationarity.
- [ ] Adding more years of data would resolve it. — more data makes the spurious t-statistic larger, not smaller.
