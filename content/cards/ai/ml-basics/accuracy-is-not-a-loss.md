---
id: ai.ml-basics.loss-functions.accuracy-is-not-a-loss
topic: ai.ml-basics.loss-functions
format: idea
difficulty: 2
language: en
weight: medium
angles: [practical, mistake]
tags: [proper-scoring-rule, calibration, log-loss, brier-score, class-imbalance]
hook: "A cancer test that answers 'no' to everyone is 99% accurate. That is the mild problem with accuracy."
related: [ai.ml-basics.loss-functions.your-loss-is-a-likelihood]
sources:
  - {title: "Scoring rule", type: wiki, url: "https://en.wikipedia.org/wiki/Scoring_rule"}
  - {title: "Cross-entropy", type: wiki, url: "https://en.wikipedia.org/wiki/Cross_entropy"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Accuracy is the number you want and the worst thing to optimise

One patient in a hundred has the disease. A model that answers "healthy" to everyone scores 99% and is worth nothing. That is the famous complaint about accuracy, and it is the mild one.

The serious one is that accuracy is a staircase. Nudging a prediction from 0.51 to 0.62 changes it by exactly zero, and then crossing the threshold changes it by a whole unit. Zero gradient almost everywhere, undefined where it matters. There is nothing to walk down.

So you train on something that scores *confidence* — log loss, or the Brier score — and report accuracy afterwards to humans. Confidence buys a second thing accuracy cannot see: calibration. Of the days a forecaster says 70%, it should rain on about 70%. Accuracy never checks that, which is how you end up with a model that is right often and spectacularly overconfident when it is wrong.

The property that makes log loss safe to optimise has a name and a one-line proof.

## Rigor

A scoring rule $S(\hat p,y)$ for a probabilistic forecast is **proper** if honesty is optimal: for every true distribution $q$,

$$\mathbb E_{y\sim q}\big[S(q,y)\big]\ \le\ \mathbb E_{y\sim q}\big[S(\hat p,y)\big]\quad\text{for all }\hat p,$$

and **strictly proper** when equality forces $\hat p=q$. Log loss $S=-\log\hat p_y$ is strictly proper, because

$$\mathbb E_{y\sim q}\big[-\log\hat p_y\big]=H(q)+\mathrm{KL}(q\,\|\,\hat p),$$

and $\mathrm{KL}\ge 0$ with equality only at $\hat p=q$. Report your true belief and you land on the floor; the floor itself is the entropy of the world, the irreducible part. The Brier score $\sum_k(\hat p_k-\mathbb 1[y=k])^2$ is strictly proper too.

Accuracy is proper but *not strictly* proper. If the truth is $q=0.6$ for class 1, every forecast $\hat p>0.5$ scores identically, so the rule cannot tell a well-calibrated 0.6 from a reckless 0.999. Add the staircase — piecewise constant, so no gradient — and you have a fine report and an untrainable objective.

## Recall
type: mcq
Q: Why train on log loss and only report accuracy?
- [x] Log loss is strictly proper and differentiable — uniquely minimised by honest probabilities, and it actually has a gradient to follow.
- [ ] Log loss takes larger numerical values, giving gradient descent more to work with — scale is irrelevant; you can multiply any loss by ten.
- [ ] Accuracy cannot be computed during training — it can; it just has zero gradient almost everywhere and is blind to confidence.
