---
id: econ.causal.credibility-revolution.taking-the-con-out
topic: econ.causal.credibility-revolution
topics: [econ.causal.external-validity]
format: series
difficulty: 2
language: en
weight: medium
angles: [history, feud]
tags: [credibility-revolution, leamer, angrist-pischke, research-design, deaton]
hook: "In 1983 an economist told his colleagues that nobody believed anybody's regressions. He was right, and it worked."
series: {id: econ.causal.correlation-to-causation, index: 5, total: 5, title: "Correlation to causation"}
sources:
  - {title: "Let's Take the Con Out of Econometrics", author: "Edward E. Leamer", year: 1983, type: paper, url: "https://pages.stern.nyu.edu/~adamodar/pdfiles/eqnotes/Leamer.pdf"}
  - {title: "The Credibility Revolution in Empirical Economics: How Better Research Design Is Taking the Con Out of Econometrics", author: "Joshua D. Angrist & Jörn-Steffen Pischke", year: 2010, type: paper, url: "https://doi.org/10.1257/jep.24.2.3"}
  - {title: "Joshua Angrist — the 2021 Nobel Memorial Prize with Card and Imbens", type: wiki, url: "https://en.wikipedia.org/wiki/Joshua_Angrist"}
dates: {written: 2026-09-19, event: 1983-03-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Leamer wording fixed (analyses). Deaton and Heckman wrote in a JEL symposium, not the same issue as Angrist-Pischke, which was JEP."}
---

# The decade economics stopped believing its own regressions

Edward Leamer's 1983 complaint was that econometrics had become a search: try controls until the coefficient behaves, report the run that survived, call it evidence. Hardly anyone, he wrote, takes anyone else's data analyses seriously — and everybody knew he was describing the whole profession.

The answer was not better statistics. It was to stop asking "what should I control for?" and start asking "where did the variation come from?" A state line. A lottery. A rule with a cutoff. A pipe laid in 1852. Angrist and Pischke called it the credibility revolution in 2010, and in 2021 the Nobel committee agreed, honouring Card, Angrist and Imbens for exactly this.

The critics are worth as much as the converts. Angus Deaton and James Heckman argued the same year, in the *Journal of Economic Literature*, that a clean local effect on a lucky subgroup can be less useful than a messier estimate of the thing you actually want to know. Both objections are live.

Snow never asked what to control for. He asked who laid the pipes.

## Rigor

The design-based programme is one sentence about identification: pick an estimand, then find a source of variation $Z$ for which "as good as random" is defendable, and accept the estimand $Z$ gives you. Formally you trade assumptions of the form "$Y(0)$ is mean-independent of $D$ given my controls $X$" — untestable and usually false — for assumptions about a known mechanism.

What you pay is in the estimand. An instrument or a discontinuity identifies an effect for **compliers** or for units *at* the cutoff, not for everyone: $\mathbb{E}[Y(1)-Y(0)\mid \text{complier}]$ is not $\mathbb{E}[Y(1)-Y(0)]$. Scaling that up needs either a model of how effects vary with covariates, or the assumption that they do not — which is where Deaton's and Heckman's objection lands, and where structural modelling re-enters.

The rest of this domain is the toolkit: instruments, discontinuities, panels, synthetic controls. Each one is an argument about the selection-bias term in episode 3.

## Recall
type: mcq
Q: What changed in empirical economics after Leamer's critique?
- [x] Researchers began justifying their estimates by the source of variation — lotteries, cutoffs, borders — rather than by the list of controls in the regression. — design first, estimation second.
- [ ] Economists switched to larger datasets, which removed the bias. — bias does not shrink with sample size; that was the point.
- [ ] Regression was abandoned in favour of machine learning. — regression is still the workhorse; what changed is what justifies it.
- [ ] Researchers started reporting p-values more carefully. — better inference on a badly identified estimate is still a badly identified estimate.
