---
id: ai.ml-basics.trees-ensembles.why-a-forest-beats-a-tree
topic: ai.ml-basics.trees-ensembles
format: idea
difficulty: 3
language: en
weight: heavy
angles: [tool, numbers]
tags: [bagging, random-forest, decorrelation, boosting, variance-reduction]
hook: "Average five hundred identical trees and you get one tree. The whole engineering problem is making them differ."
related: [ai.ml-basics.trees-ensembles.the-two-cultures]
sources:
  - {title: "Random Forests", author: "Leo Breiman", year: 2001, type: paper, url: "https://doi.org/10.1023/A:1010933404324"}
  - {title: "Random forest", type: wiki, url: "https://en.wikipedia.org/wiki/Random_forest"}
  - {title: "XGBoost: A Scalable Tree Boosting System", author: "Tianqi Chen & Carlos Guestrin", year: 2016, type: paper, url: "https://arxiv.org/abs/1603.02754"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A forest beats a tree because the trees disagree

A single decision tree grown deep is a memorisation machine. It will carve the training data into pure leaves and then predict nonsense two inches from any of them: low bias, catastrophic variance.

The standard fix looks lazy. Grow five hundred trees on five hundred bootstrap resamples and average their predictions. Averaging kills variance — that is arithmetic — but only if the things being averaged are not the same thing. Five hundred trees fitted to nearly the same data are nearly the same tree, and averaging nearly identical mistakes changes nothing.

So Breiman added a second injection of randomness in 2001: at each split, let the tree choose among a random handful of features instead of all of them. Individually the trees get *worse*. Collectively they get much better, because they are finally disagreeing about different things.

The formula shows exactly what you are buying, and what you cannot buy.

## Rigor

Let $B$ predictors each have variance $\sigma^{2}$ and pairwise correlation $\rho$. The variance of their average is

$$\operatorname{Var}\!\Big(\tfrac1B\textstyle\sum_{b=1}^{B}T_b\Big)=\rho\,\sigma^{2}+\frac{1-\rho}{B}\,\sigma^{2}\ \xrightarrow[\;B\to\infty\;]{}\ \rho\,\sigma^{2}.$$

Read the two terms separately. The second is the free lunch: it vanishes as you add trees, which is why more trees never hurt a random forest. The first is a floor set by correlation alone — at $\rho=1$ you gain precisely nothing. Bagging by itself leaves $\rho$ high, because one dominant feature gets chosen first in almost every tree. Random feature subsets break that, lowering $\rho$ at the price of slightly larger $\sigma^{2}$ and bias per tree. A random forest is the trade where $\rho$ falls faster than $\sigma^{2}$ rises.

Boosting runs the other way. Trees are fitted *sequentially*, each to the residual of the ensemble so far, $F_m(x)=F_{m-1}(x)+\nu\,h_m(x)$ with $h_m$ approximating $-\partial L/\partial F$: shallow, deliberately high-bias trees stacked to reduce bias. Same ingredient, opposite disease — and the reason boosting can overfit with more rounds while a forest does not.

## Recall
type: mcq
Q: Why does a random forest restrict each split to a random subset of features?
- [x] To lower the correlation between trees — the variance of the average bottoms out at $\rho\sigma^{2}$, so decorrelating is the only remaining gain.
- [ ] To train faster by examining fewer features — it does, but the accuracy comes from decorrelation, not from speed.
- [ ] To keep irrelevant features out of the model — every feature still gets its chances across the forest; the point is that different trees use them at different splits.
