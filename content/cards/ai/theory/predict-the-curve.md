---
id: ai.theory.double-descent.predict-the-curve
topic: ai.theory.double-descent
format: challenge
difficulty: 2
language: en
weight: light
angles: [prediction, paradox]
tags: [interpolation-threshold, random-features, least-squares, experiment]
hook: "Ten lines of code, one plot, and the shape every statistics course teaches is wrong about two-thirds of it."
related: [ai.theory.double-descent.the-curve-that-shouldnt-exist]
sources:
  - {title: "Reconciling modern machine learning practice and the bias-variance trade-off", author: "Belkin, Hsu, Ma & Mandal", year: 2019, type: paper, url: "https://arxiv.org/abs/1812.11118"}
  - {title: "Surprises in High-Dimensional Ridgeless Least Squares Interpolation", author: "Hastie, Montanari, Rosset & Tibshirani", year: 2019, type: paper, url: "https://arxiv.org/abs/1903.08560"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Softened an unverifiable claim about what most statistics graduates answer."}
---

# You have 100 points and you keep adding features. Predict the curve.

An experiment you could run over a coffee. You have 100 training points from a noisy linear model. You fit plain least squares using $p$ random features built from the inputs, with no regularisation at all; once $p>100$ there are infinitely many exact fits, so you take the one with the smallest norm. Now plot test error as $p$ runs from 1 to 1000.

Sketch it before you read the answer. Where is the error lowest? What happens exactly at $p=100$? And out at $p=1000$ — does it flatten, keep climbing, or come back down?

The shape a statistics course trains you to draw is confident, and wrong about two-thirds of this picture.

## Recall
type: reveal
Q: What does the curve actually look like?
A: Down to a shallow minimum well below $p=100$, then up — and at $p=100$ it *explodes*, because the design matrix is square and nearly singular, so the fit amplifies noise. Past 100 it descends again, and by $p\approx1000$ it typically sits *below* the classical minimum. Two descents and one spike, the spike exactly at $p=n$.
