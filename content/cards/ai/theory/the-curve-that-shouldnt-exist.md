---
id: ai.theory.double-descent.the-curve-that-shouldnt-exist
topic: ai.theory.double-descent
format: idea
difficulty: 3
language: en
weight: heavy
angles: [paradox, connection]
tags: [double-descent, interpolation-threshold, bias-variance, overparameterization]
hook: "Classical theory says the worst model size is the one that fits the data perfectly. Go bigger and the error falls again."
sources:
  - {title: "Reconciling modern machine-learning practice and the classical bias–variance trade-off", author: "Belkin, Hsu, Ma & Mandal", year: 2019, type: paper, url: "https://arxiv.org/abs/1812.11118"}
  - {title: "Deep Double Descent: Where Bigger Models and More Data Hurt", author: "Nakkiran et al.", year: 2019, type: paper, url: "https://arxiv.org/abs/1912.02292"}
  - {title: "Surprises in High-Dimensional Ridgeless Least Squares Interpolation", author: "Hastie, Montanari, Rosset & Tibshirani", year: 2019, type: paper, url: "https://arxiv.org/abs/1903.08560"}
dates: {written: 2026-09-19}
author: lead
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The curve that isn't supposed to exist

Every statistics course draws the same U: make the model bigger and test error falls, then rises as it starts memorizing noise. Stop at the bottom of the U. That's the bias–variance tradeoff, and it's a theorem-shaped fact you can prove for many models.

Now keep going. Make the model so big it fits the training data *perfectly*, every point, noise included. Classical theory says this is the worst possible place to be, and at exactly that size test error does spike. Then, as you keep growing the model past it, test error comes back *down*, often below the old U's minimum.

Belkin, Hsu, Ma and Mandal put a name on the picture in 2019: double descent. Nakkiran and colleagues showed it in deep networks, and showed the same peak appears if you vary training *time* or *data* instead of size. The peak sits at the interpolation threshold: parameters ≈ data points. Why there, and why the descent afterwards? That needs the rigor.

## Rigor

Take linear regression with $p$ features and $n$ samples, $y = X\beta + \varepsilon$. For $p<n$, OLS is unique. For $p>n$, infinitely many $\beta$ interpolate the data; gradient descent from zero (equivalently the pseudoinverse) picks the **minimum-norm** one, $\hat\beta = X^{+}y$.

The test risk depends on the singular values of $X$. At $p\approx n$ the smallest singular value is near zero, so $X^{+}$ amplifies noise: the variance term blows up, and that is the peak. For $p\gg n$ the minimum-norm solution spreads the fit across many directions with small coefficients, the variance shrinks roughly like $n/p$, and the risk descends again — Hastie, Montanari, Rosset and Tibshirani work out the exact asymptotics in the isotropic case.

Two things the intuition hand-waved, made precise: "fits perfectly" is $X\hat\beta=y$, and "so big it comes back down" is the implicit regularization of choosing the minimum-norm interpolant.

## Recall
type: mcq
Q: In the linear model, where does the double-descent peak sit?
- [x] Where the number of parameters is about equal to the number of samples — the design matrix is nearly singular there, so noise gets amplified.
- [ ] Where the model is smallest — that is the high-bias end of the classical U, no peak.
- [ ] Where the model is largest — by then the second descent has already happened.
