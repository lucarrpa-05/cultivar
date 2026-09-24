---
id: ai.theory.benign-overfitting.memorise-everything-at-most-twice-as-wrong
topic: ai.theory.benign-overfitting
format: fact
difficulty: 2
language: en
weight: light
angles: [history, numbers]
tags: [nearest-neighbor, cover-hart, bayes-error, tempered-overfitting, memorization]
prerequisites: [ai.ml-basics.overfitting-regularization, math.probability.conditional-bayes]
hook: "The laziest classifier copies its nearest neighbour's label, mistakes and all. In 1967 it was proved almost harmless."
sources:
  - {title: "Nearest neighbor pattern classification", author: "Thomas Cover & Peter Hart", year: 1967, type: paper, url: "https://doi.org/10.1109/TIT.1967.1053964"}
  - {title: "Benign, Tempered, or Catastrophic: A Taxonomy of Overfitting", author: "Mallinar, Simon, Abedsoltan, Pandit, Belkin & Nakkiran", year: 2022, type: paper, url: "https://arxiv.org/abs/2207.06569"}
  - {title: "k-nearest neighbors algorithm", type: wiki, url: "https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm"}
dates: {written: 2026-09-23}
author: author-ai-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Title said \"twice as wrong as perfect\"; a perfect classifier has zero error, the bound is against the Bayes-optimal one, so it now says \"the best\". Added a one-line bridge to the rigor."}
---

# Memorise every example and you are at most twice as wrong as the best

The laziest classifier there is: to label a new point, copy the label of the closest training example. It memorises everything, mislabelled examples included, and its training error is zero by construction.

In 1967 Thomas Cover and Peter Hart proved that with enough data its error is at most twice that of the best possible classifier. Fitting the noise costs you, but only a bounded amount. In 2022 Mallinar and colleagues named this middle ground *tempered* overfitting, and found many interpolating neural networks living in it. Why exactly twice?

## Rigor

"Twice" comes from two coins. Take two classes and let $\eta(x)=P(Y=1\mid X=x)$. The best classifier guesses the likelier label and errs with probability $r^*(x)=\min(\eta,1-\eta)$; the Bayes risk is $R^*=\mathbb E\,r^*(X)$.

As $n\to\infty$ the nearest neighbour of $x$ converges to $x$, so (under mild conditions, e.g. $\eta$ continuous) its stored label is an independent draw with essentially the same $\eta(x)$. The rule errs exactly when the two labels disagree:

$$P(Y\neq Y')=\eta(1-\eta)+(1-\eta)\eta=2\eta(1-\eta)=2r^*(1-r^*).$$

So the asymptotic risk is $R=\mathbb E\big[2r^*(1-r^*)\big]$. Since $r\mapsto 2r(1-r)$ is concave, Jensen's inequality gives

$$R^*\ \le\ R\ \le\ 2R^*(1-R^*)\ \le\ 2R^*,$$

the lower bound because $2r(1-r)\ge r$ when $r\le\tfrac12$. The memorised label is a coin with the right bias; the new label is another. You pay for the noise twice, never more. That is what "tempered" means: nonzero excess risk that stays bounded, unlike the catastrophic spike where parameters equal data points.

## Recall
type: mcq
Q: With unlimited data, why does 1-nearest-neighbour still miss the best possible error?
- [x] It copies a stored label that is itself noisy — the neighbour's label and the new point's label are two independent coins, and they can disagree.
- [ ] The nearest neighbour stays far away — with unlimited data it gets arbitrarily close; distance is not the problem.
- [ ] Memorising makes the error grow without bound — the error is capped at twice the Bayes error, and that cap is the whole result.
