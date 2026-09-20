---
id: econ.causal.heterogeneous-effects.trees-that-predict-the-effect
topic: econ.causal.heterogeneous-effects
format: callback
difficulty: 4
language: en
weight: heavy
angles: [connection, tool]
tags: [causal-forests, honest-splitting, athey-wager, treatment-heterogeneity, random-forests]
callback: {from: ai.ml-basics.trees-ensembles, to: econ.causal.heterogeneous-effects}
hook: "A forest predicts an outcome you can see. Point the same machinery at a quantity nobody ever observes and it still works — with one fix."
sources:
  - {title: "Estimation and Inference of Heterogeneous Treatment Effects using Random Forests", author: "Stefan Wager & Susan Athey", year: 2018, type: paper, url: "https://arxiv.org/abs/1510.04342"}
  - {title: "Generalized Random Forests", author: "Susan Athey, Julie Tibshirani & Stefan Wager", year: 2019, type: paper, url: "https://arxiv.org/abs/1610.01271"}
  - {title: "Recursive partitioning for heterogeneous causal effects", author: "Susan Athey & Guido Imbens", year: 2016, type: paper, url: "https://doi.org/10.1073/pnas.1510489113"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember random forests? Now grow one that predicts an effect

A random forest works by growing many trees on resampled data, each splitting where the split most improves prediction of $y$, then averaging them. The averaging is what tames the variance of a single deep tree.

Susan Athey and Stefan Wager kept the machinery and changed the target. Do not split to predict the outcome — split to separate people whose *treatment effect* differs. Which sounds impossible, since the treatment effect of any one person is precisely the number nobody has ever observed.

It works because within a small enough leaf, treatment is as good as random, so the difference in means inside the leaf estimates the effect there. The forest becomes an adaptive way of deciding who counts as "similar to you" — weighting neighbours by how often they land in your leaf.

One addition makes it honest, and without it the whole thing is a machine for finding subgroups that are not there.

## Rigor

Target: the conditional average treatment effect $\tau(x)=\mathbb{E}[Y(1)-Y(0)\mid X=x]$.

A causal tree splits to maximise the between-leaf variance of the estimated effect, and inside a leaf $L$ estimates $\hat\tau_L=\bar Y_{1,L}-\bar Y_{0,L}$ — valid under unconfoundedness within the leaf. Averaging trees turns this into a weighted estimator: observation $i$ carries weight $\alpha_i(x)$, the frequency with which it shares a leaf with $x$, and $\hat\tau(x)$ is the difference in weighted means of the treated and untreated under those weights.

**Honesty** is the key modification: split the sample, use one half to choose the splits and the *other* half to estimate the leaf effects. Without it, the same data that found the split also estimates the gap in that split, and the gap is biased upward by construction — the same selection problem as picking the best-looking subgroup after the fact.

With honesty plus subsampling instead of bootstrap, Wager and Athey prove $\hat\tau(x)$ is consistent and asymptotically normal, so you get pointwise confidence intervals. Note the thing you still cannot do: cross-validate against the truth, since $\tau_i$ is never observed.

## Recall
type: mcq
Q: Why must a causal forest use different observations to choose the splits and to estimate the effect inside a leaf?
- [x] Otherwise the split is chosen because that subgroup looked extreme, and the same data then reports that extreme as the effect. — honest splitting removes the selection bias baked into adaptive partitioning.
- [ ] Because the two halves have different distributions of covariates. — the halves are random draws from the same distribution; that is the point.
- [ ] Because treatment assignment is only random in one half of the sample. — unconfoundedness is assumed throughout; honesty addresses selection in the model, not in the treatment.
- [ ] To reduce the computational cost of growing deep trees. — it costs efficiency rather than saving it; the gain is valid inference.
