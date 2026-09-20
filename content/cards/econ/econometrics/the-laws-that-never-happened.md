---
id: econ.econometrics.inference.the-laws-that-never-happened
topic: econ.econometrics.inference
topics: [econ.econometrics.did]
format: idea
difficulty: 3
language: en
weight: medium
angles: [mistake, numbers]
tags: [clustered-standard-errors, serial-correlation, placebo-test, bertrand-duflo-mullainathan, inference]
hook: "They invented state laws that never existed, ran the standard analysis, and found significant effects almost half the time."
sources:
  - {title: "How Much Should We Trust Differences-in-Differences Estimates?", author: "Marianne Bertrand, Esther Duflo & Sendhil Mullainathan", year: 2004, type: paper, url: "https://doi.org/10.1162/003355304772839588"}
  - {title: "Clustered standard errors", type: wiki, url: "https://en.wikipedia.org/wiki/Clustered_standard_errors"}
  - {title: "Heteroskedasticity-consistent standard errors", type: wiki, url: "https://en.wikipedia.org/wiki/Heteroskedasticity-consistent_standard_errors"}
dates: {written: 2026-09-19, event: 2004-02-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The laws that never happened, and their significant effects

Bertrand, Duflo and Mullainathan ran a cruel experiment on the profession in 2004. Take real data on women's wages by US state and year. Invent a law: pick a state at random, pick a year at random, declare that the state passed something then. Nothing happened, by construction. Then run the standard difference-in-differences regression everybody was running.

An effect significant at the five percent level turned up in up to 45 percent of these invented laws.

The culprit was not the estimate but the standard error. State wages are serially correlated — a state that is above trend this year is above trend next year — so thirty years of data from one state is nowhere near thirty independent observations. Software counted them as independent, the standard errors came out small, and the t-statistics soared.

The fix is dull and now universal: let the errors be arbitrarily correlated within each state, and count states, not state-years. Which quietly means your sample is a lot smaller than it looked.

## Rigor

For a mean of $n$ observations with equal pairwise correlation $\rho$,

$$\operatorname{Var}(\bar y)=\frac{\sigma^{2}}{n}\big[1+(n-1)\rho\big],$$

so the conventional $\sigma^2/n$ understates the variance by the design factor in brackets. With $n=30$ and $\rho=0.5$ that factor is about 15, and the standard error is off by a factor of four.

The **cluster-robust** estimator leaves the within-cluster correlation unrestricted:

$$\hat V=(X'X)^{-1}\Big(\sum_{g=1}^{G}X_g'\hat u_g\hat u_g'X_g\Big)(X'X)^{-1},$$

consistent as the number of clusters $G\to\infty$, with no structure imposed on $\hat u_g\hat u_g'$. Note what is asymptotic here: $G$, not $n$. With a handful of clusters the estimator is badly downward-biased, and you need a wild bootstrap or a t-distribution with $G-1$ degrees of freedom.

The rule of thumb that follows: cluster at the level at which the treatment was assigned. In difference-in-differences that is the state, not the person.

## Recall
type: mcq
Q: Why did the invented state laws come out "significant" so often?
- [x] Outcomes within a state are serially correlated, so the effective number of independent observations is close to the number of states. — the standard error, not the point estimate, was the broken part.
- [ ] The placebo laws accidentally coincided with real policy changes. — the dates were random and the effect appeared far too often for coincidence.
- [ ] The sample was too small for the central limit theorem to apply. — the datasets were large; the problem is dependence, not size.
- [ ] Difference-in-differences is biased when treatment is randomly assigned. — random assignment is the one case where the estimate is unbiased; here inference failed, not identification.
