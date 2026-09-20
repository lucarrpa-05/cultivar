---
id: css.complexity.power-laws.one-of-twenty-four
topic: css.complexity.power-laws
format: idea
difficulty: 2
language: en
weight: medium
angles: [mistake, numbers, tool]
tags: [power-laws, clauset, lognormal, heavy-tails, model-selection]
hook: "Twenty-four famous data sets, tested properly. Exactly one came out convincingly power-law."
sources:
  - {title: "Power-law distributions in empirical data", author: "Aaron Clauset, Cosma Rohilla Shalizi, M. E. J. Newman", year: 2009, type: paper, url: "https://arxiv.org/abs/0706.1062"}
  - {title: "Power law", type: wiki, url: "https://en.wikipedia.org/wiki/Power_law"}
  - {title: "Log-normal distribution", type: wiki, url: "https://en.wikipedia.org/wiki/Log-normal_distribution"}
related: [css.networks.scale-free.four-percent]
dates: {written: 2026-09-19, event: 2009-11-04}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Cross-linked to the scale-free networks card, which teaches the same lesson from a different study."}
author: author-css-1
---

# Twenty-four data sets went in. One power law came out.

City sizes, word frequencies, blackout magnitudes, wealth, war deaths, citations, solar flares, the number of species in a genus. The claim attached to all of these is that their distribution is a power law, which is exciting because power laws suggest a shared mechanism — something scale-free, something critical.

Clauset, Shalizi and Newman took twenty-four such data sets in 2009 and ran the test properly. Fit by maximum likelihood, not by drawing a line through a log-log plot. Estimate where the tail starts rather than eyeballing it. Then ask two separate questions: does a power law fit at all, and does it fit *better than the alternatives*?

Seventeen of the twenty-four survived the first question. The second one did most of the damage. Once a lognormal or a power law with an exponential cutoff was allowed to compete, only one data set — word frequencies in *Moby-Dick* — came out with strong support for a pure power law.

The problem is that straightness on a log-log plot is not evidence. A lognormal looks straight too.

## Rigor

The model is $p(x)\propto x^{-\alpha}$ for $x\ge x_{\min}$. The standard sin is to bin the data, take logs and run OLS. Binning throws away the tail, the errors are neither independent nor homoscedastic in log space, and the procedure returns a slope and an $R^2$ no matter what generated the data.

The recipe instead: estimate $\alpha$ by maximum likelihood, which for continuous data gives
$$\hat\alpha = 1+n\left[\sum_{i=1}^{n}\ln\frac{x_i}{x_{\min}}\right]^{-1};$$
choose $x_{\min}$ by minimising the Kolmogorov–Smirnov distance between the fitted and empirical tails; get a $p$-value by comparing that distance to synthetic data drawn from the fitted model; and finally run Vuong-style likelihood-ratio tests against lognormal, exponential and stretched-exponential alternatives.

That last step is where the field's claims die, and it dies for a structural reason: a lognormal arises from multiplicative noise, which is at least as common a mechanism as preferential attachment, and over two or three decades of data the two are nearly indistinguishable. Distinguishing them needs orders of magnitude more tail than most social data has.

So "heavy-tailed" is usually the defensible claim. "Power law" is a much stronger one, and it needs the alternatives beaten.

## Recall
type: mcq
Q: Why is a straight line on a log-log plot not evidence for a power law?
- [x] Other distributions, notably the lognormal, look straight over a few decades — the test has to beat the alternatives, not just fit.
- [ ] Because logarithms distort the data — logs are fine; the problem is binning, non-independent errors and no comparison model.
- [ ] Because power laws are never real — one of Clauset's twenty-four did come out convincingly power-law, and heavy tails are everywhere.
