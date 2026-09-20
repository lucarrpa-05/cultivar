---
id: ai.ml-basics.cross-validation.a-test-set-you-look-at-twice
topic: ai.ml-basics.cross-validation
format: idea
difficulty: 2
language: en
weight: medium
angles: [practical, mistake]
tags: [holdout, adaptive-overfitting, leaderboard, imagenet-v2, cross-validation]
hook: "Every decision you make after peeking at held-out data spends a little of it. Leaderboards spend a lot."
sources:
  - {title: "Do ImageNet Classifiers Generalize to ImageNet?", author: "Recht, Roelofs, Schmidt & Shankar", year: 2019, type: paper, url: "https://arxiv.org/abs/1902.10811"}
  - {title: "The reusable holdout: Preserving validity in adaptive data analysis", author: "Dwork, Feldman, Hardt, Pitassi, Reingold & Roth", year: 2015, type: paper, url: "https://doi.org/10.1126/science.aaa9375"}
  - {title: "Cross-validation (statistics)", type: wiki, url: "https://en.wikipedia.org/wiki/Cross-validation_(statistics)"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A test set you look at twice is a training set

You hold data back so it can tell you the truth once. Then you try a model, look, adjust, try again, look again. By the fiftieth look you are no longer measuring a model on unseen data; you are selecting the model that happens to suit *that particular* held-out sample. The set has changed sides without telling you.

How bad is it in practice? In 2019 Recht, Roelofs, Schmidt and Shankar built brand-new test sets for CIFAR-10 and ImageNet, following the original collection recipes as closely as they could, and re-scored dozens of published models. Accuracy dropped: roughly 3 to 15 points on CIFAR-10, 11 to 14 on ImageNet.

The ranking, though, survived almost perfectly — better models stayed better. Their reading is that this is mostly distribution shift rather than a decade of leaderboard cheating. Reassuring, and also a reminder that "test accuracy" is a number attached to one specific pile of images.

The cost of a peek can be priced.

## Rigor

Evaluate $k$ models on one holdout of size $n$ with bounded loss. Each estimate obeys Hoeffding's inequality, $\Pr[\,|\hat R_j-R_j|\ge t\,]\le 2e^{-2nt^{2}}$, but you report the *best* of them, so what you need is a union bound:

$$\Pr\Big[\max_{j\le k}|\hat R_j-R_j|\ge t\Big]\le 2k\,e^{-2nt^{2}}\quad\Longrightarrow\quad t\ \approx\ \sqrt{\frac{\ln k}{2n}} .$$

The optimism of the winning score therefore grows like $\sqrt{\ln k}$: negligible for ten models, real for ten thousand. And this is the *friendly* case, where the $k$ models were fixed in advance. They never are — each new model is chosen in response to the last score, and adaptivity makes the bound fail outright, which is the problem Dwork and colleagues attack with the reusable holdout.

Cross-validation does not escape this; it only spends the data differently. $k$-fold estimates the risk of a model trained on $n(1-1/k)$ points, which is not the model you will ship, and its folds overlap, so its own variance has no unbiased estimator. Use it to *choose*. Use a set you have never once looked at to *report*.

## Recall
type: mcq
Q: You try a thousand architectures and report the best held-out score. What is wrong with the number?
- [x] It is the maximum of a thousand noisy estimates, optimistic by roughly $\sqrt{\ln k/2n}$ — the holdout was spent on selection.
- [ ] Nothing, as long as no model was trained on the holdout — selecting with it leaks it just as surely as training on it.
- [ ] It is biased downward, since averaging many models cancels error — you reported a maximum, not an average, and maxima of noisy quantities run high.
