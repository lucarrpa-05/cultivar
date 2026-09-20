---
id: ai.theory.benign-overfitting.fitting-the-noise-and-getting-away-with-it
topic: ai.theory.benign-overfitting
format: series
difficulty: 4
language: en
weight: heavy
angles: [paradox, beautiful]
tags: [minimum-norm, interpolation, effective-rank, bartlett-2020, pseudoinverse]
hook: "There are infinitely many ways to interpolate. Gradient descent picks one, and that choice is the entire story."
series: {id: ai.theory.why-huge-models-generalize, index: 5, total: 6, title: "Why huge models generalize"}
sources:
  - {title: "Benign Overfitting in Linear Regression", author: "Bartlett, Long, Lugosi & Tsigler", year: 2020, type: paper, url: "https://arxiv.org/abs/1906.11300"}
  - {title: "Benign overfitting in linear regression (PNAS)", author: "Bartlett, Long, Lugosi & Tsigler", year: 2020, type: paper, url: "https://doi.org/10.1073/pnas.1907378117"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Fitting the noise exactly, and getting away with it

Past the interpolation threshold every model in play fits the training data perfectly, noise included. Training error is zero for all of them, so it has stopped telling you anything. What separates the good ones from the catastrophes?

Which interpolant you land on. When parameters outnumber constraints the solutions form an entire flat space, and something has to choose a point in it. Gradient descent started from zero chooses the one of smallest norm — the least aggressive way of passing through your data.

And a minimum-norm interpolant treats noise differently than you would guess. It does not ignore the noise; by definition it fits every noisy point exactly. But it spreads that fitting over a great many directions, each with a tiny coefficient. The noise is diluted into a thousand harmless corrections instead of concentrated into one wild swing near your data.

Bartlett, Long, Lugosi and Tsigler made this precise in 2020, and the condition they found says exactly what overparameterisation is *for*.

## Rigor

Linear model $y=X\beta^{*}+\varepsilon$ with $X\in\mathbb R^{n\times p}$ and $p>n$. Every $\beta$ with $X\beta=y$ interpolates; the minimum-norm one is

$$\hat\beta=X^{+}y=X^{\top}(XX^{\top})^{-1}y,$$

which is exactly the limit of gradient descent started at $\beta_0=0$, because every update lies in the row space of $X$ and so the iterates can never leave it.

Write $\Pi$ for the projection onto that row space. Then $\hat\beta=\Pi\beta^{*}+X^{+}\varepsilon$, and the excess risk splits:

$$\underbrace{\big\|(I-\Pi)\beta^{*}\big\|_{\Sigma}^{2}}_{\text{signal you missed}}\;+\;\underbrace{\sigma^{2}\,\operatorname{tr}\!\big(X^{+\top}\Sigma X^{+}\big)}_{\text{noise you absorbed}} .$$

Benign overfitting is the regime where the second term stays small *even though the fit is exact*. Bartlett et al. characterise it with two **effective ranks** of the covariance $\Sigma$, eigenvalues $\lambda_1\ge\lambda_2\ge\cdots$:

$$r_k=\frac{\sum_{i>k}\lambda_i}{\lambda_{k+1}},\qquad R_k=\frac{\big(\sum_{i>k}\lambda_i\big)^{2}}{\sum_{i>k}\lambda_i^{2}} .$$

Interpolation is benign exactly when, for some $k=o(n)$, the tail is both long and flat: $r_k\gtrsim n$ and $R_k\gg n$. In words, there must be *more low-variance directions than you have data points* for the noise to be spread into. Overparameterisation is not incidental here. It is the hypothesis of the theorem.

Next: who told gradient descent to pick the minimum-norm solution?

## Recall
type: mcq
Q: Past the interpolation threshold, training error is zero for every candidate. What decides which one generalizes?
- [x] Which interpolant the optimiser lands on — gradient descent from zero converges to the minimum-norm solution, which spreads noise thinly over many directions.
- [ ] The one with the lowest training loss — they all have exactly zero; the criterion has stopped discriminating.
- [ ] The one with the fewest parameters — the good solutions here have *more* parameters; the tail of small-variance directions is what absorbs the noise.
