---
id: math.analysis.series.harmonic-series-slow
topic: math.analysis.series
format: fact
difficulty: 2
language: en
weight: light
angles: [numbers, history]
tags: [harmonic-series, divergence, oresme, euler-mascheroni, logarithm]
hook: "The harmonic series diverges. Reaching a partial sum of 100 takes about 10^43 terms, which is why nobody has ever watched it happen."
sources:
  - {title: "Harmonic series (mathematics)", type: wiki, url: "https://en.wikipedia.org/wiki/Harmonic_series_(mathematics)"}
  - {title: "Euler-Mascheroni constant", type: wiki, url: "https://en.wikipedia.org/wiki/Euler%27s_constant"}
dates: {written: 2026-09-19}
rigor: none
rigorNote: "a fact card; the divergence proof belongs with the convergence-tests cards"
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# It diverges, and it takes its time

Nicole Oresme showed around 1350 that $1+\tfrac12+\tfrac13+\cdots$ grows without bound, by grouping terms into blocks each worth at least $\tfrac12$. True, and useless as a warning, because the growth is logarithmic: $H_n\approx\ln n+0.5772$.

To reach a partial sum of $100$ you need about $1.5\times10^{43}$ terms. Adding a billion terms a second since the Big Bang would get you roughly $4\times10^{26}$ of them. Divergence is a statement about eternity, not about patience.

## Recall
type: reveal
Q: If the harmonic series diverges, why is that almost never visible in a computation?
A: Because the partial sums grow like $\ln n$. Every extra digit of the sum costs you an exponential number of new terms, so on any finite run it looks like it is converging.
