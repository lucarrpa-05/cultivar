---
id: econ.behavioral.replication-crisis.popper-would-have-asked-first
topic: econ.behavioral.replication-crisis
format: callback
difficulty: 2
language: en
weight: medium
angles: [connection, tool]
tags: [falsifiability, preregistration, p-hacking, researcher-degrees-of-freedom]
prerequisites: [econ.behavioral.heuristics-biases, phil.science.demarcation-popper]
callback: {from: phil.science.demarcation-popper, to: econ.behavioral.replication-crisis}
hook: "Popper's demarcation asks what would refute you. Preregistration is that question turned into paperwork."
sources:
  - {title: "Replication crisis", type: wiki, url: "https://en.wikipedia.org/wiki/Replication_crisis"}
  - {title: "Preregistration (science)", type: wiki, url: "https://en.wikipedia.org/wiki/Preregistration_(science)"}
  - {title: "Data dredging", type: wiki, url: "https://en.wikipedia.org/wiki/Data_dredging"}
dates: {written: 2026-09-19}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember Popper's question? Preregistration is it, in triplicate

Remember Popper's demarcation criterion — that a theory earns scientific standing by saying in advance what would refute it? For most of the twentieth century that stayed philosophy. The replication crisis turned it into an administrative form.

The problem it solves is not lying. A perfectly honest researcher with one dataset has dozens of defensible choices: which outliers to drop, which covariates to include, which of four outcome measures to headline, whether to split by gender. Each choice is reasonable on its own. Run them in the order that the data suggest, and you will find a significant result that no amount of integrity makes real. Andrew Gelman calls it the garden of forking paths; there was never a single moment of cheating to point at.

Preregistration closes the garden by making you commit to the path before you see the data. Which is Popper's question, asked at the only time when the answer costs something.

## Rigor

Fix a significance level $\alpha=0.05$. If a researcher runs $m$ independent tests and reports the best one, the probability of at least one false positive under a true null is

$$1-(1-\alpha)^{m},$$

which is $0.23$ at $m=5$ and $0.40$ at $m=10$. Nothing here requires dishonesty: the tests need not be run deliberately, only *selected* after the fact.

The subtler version has no explicit multiplicity at all. If the analysis is chosen as a function of the observed data, the reported $p$-value is no longer the tail probability of the statistic under the null — it is the tail probability of $\max$ over the set of analyses the researcher *would have* run in other datasets. That set is unobservable, which is why the inflation cannot be corrected after the fact.

Preregistration restores the sampling distribution by fixing the analysis before the data exist, making $p$ mean what its definition says. The Popperian content is exact: a preregistration is a written statement of which outcomes would count as refutation, timestamped so that it cannot be rewritten afterwards.

## Recall
type: mcq
Q: Why can a completely honest researcher still produce inflated $p$-values?
- [x] Analysis choices made after seeing the data select the most favourable path — so the reported $p$ is not the tail probability its definition assumes.
- [ ] Because $p$-values are always wrong — they are exactly right when the analysis is fixed in advance of the data.
- [ ] Because small samples bias estimates towards zero — small samples inflate published estimates, through the significance filter, not shrink them.
