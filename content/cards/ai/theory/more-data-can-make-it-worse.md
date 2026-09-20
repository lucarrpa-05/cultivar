---
id: ai.theory.double-descent.more-data-can-make-it-worse
topic: ai.theory.double-descent
format: series
difficulty: 3
language: en
weight: medium
angles: [paradox, numbers]
tags: [epoch-wise, sample-wise, effective-model-complexity, marchenko-pastur, nakkiran]
hook: "Same model, more training data, worse test error. The peak does not care which axis you walk in on."
series: {id: ai.theory.why-huge-models-generalize, index: 4, total: 6, title: "Why huge models generalize"}
related: [ai.theory.double-descent.the-curve-that-shouldnt-exist]
diagram: {file: ai/double-descent-curve.svg, caption: "Test error peaks exactly where the model becomes able to fit every training point, then falls below the classical minimum.", alt: "A curve that falls, rises to a peak at a dashed vertical line marking the interpolation threshold, then falls again to a level below its first minimum"}
sources:
  - {title: "Deep Double Descent: Where Bigger Models and More Data Hurt", author: "Nakkiran, Kaplan, Bansal, Yang, Barak & Sutskever", year: 2019, type: paper, url: "https://arxiv.org/abs/1912.02292"}
  - {title: "Surprises in High-Dimensional Ridgeless Least Squares Interpolation", author: "Hastie, Montanari, Rosset & Tibshirani", year: 2019, type: paper, url: "https://arxiv.org/abs/1903.08560"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Opening now follows episode 3 instead of assuming the reader has already met the curve."}
---

# More data can make your model worse, and the graph shows where

Here is the curve the last episode's bound could never produce: test error falls, rises to a peak exactly where the model becomes able to fit the training set perfectly, then falls again — past the old minimum. The peak sits at the interpolation threshold.

Nakkiran, Kaplan, Bansal, Yang, Barak and Sutskever showed in 2019 that the peak is not really about model size. It is about the *ratio* of capacity to data, and you can walk into it from three directions. Grow the model: peak. Keep the model fixed and train longer: peak, late in training — epoch-wise double descent. Or keep the model fixed and *add training data*: if that pushes the number of samples up toward the model's capacity, test error goes **up**.

Give that last one a second. More data, same model, worse performance. It stops being a paradox once you know where the peak is, but it violates a rule everyone teaches on day one.

The peak is a fact about badly conditioned matrices, and it has a formula.

## Rigor

Nakkiran et al. define the **effective model complexity** of a training procedure on a distribution as the largest $n$ for which the procedure reaches roughly zero training error on $n$ samples. Double descent is then a single statement — test error peaks where $\mathrm{EMC}\approx n$ — and the three axes are three ways of dragging $\mathrm{EMC}$ or $n$ across that line.

The mechanism is visible in ridgeless linear regression. With $n$ samples and $p$ features the minimum-norm interpolant is $\hat\beta=X^{+}y$, and the variance term of its risk is governed by $\sigma^{2}\sum_i s_i^{-2}$, the inverse squared singular values of $X$. For a random $n\times p$ matrix the Marchenko–Pastur law puts the lower spectral edge at $\big(\sqrt{n}-\sqrt{p}\big)^{2}/n$, which is exactly zero at $p=n$:

$$p\to n\ \Longrightarrow\ s_{\min}\to 0\ \Longrightarrow\ \|X^{+}\varepsilon\|\to\infty .$$

That is the spike — a fact about nearly-singular matrices, not about neural networks. Push past the threshold and the extra directions make the matrix better conditioned again while the interpolant's norm falls; Hastie, Montanari, Rosset and Tibshirani compute the asymptotic risk exactly as $p/n\to\gamma$.

So the peak is understood. The *second descent* — why interpolating noise is survivable at all — is not, yet.

## Recall
type: mcq
Q: Nakkiran et al. found the same peak along three axes. Which three?
- [x] Model size, training time, and the number of training samples — each moves effective capacity and $n$ relative to one another.
- [ ] Model size only — epoch-wise and sample-wise double descent are precisely the surprising part of the result.
- [ ] Learning rate, batch size and weight decay — those shift where the threshold sits, but the peak is a statement about capacity versus data.
