---
id: econ.econometrics.ols.regression-is-a-shadow
topic: econ.econometrics.ols
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [ols, projection, orthogonality, normal-equations, frisch-waugh]
callback: {from: math.linear-algebra.inner-products, to: econ.econometrics.ols}
hook: "Regression has no statistics in it. It is the nearest point in a subspace, and the residual is the perpendicular."
sources:
  - {title: "Ordinary least squares — the projection matrix and normal equations", type: wiki, url: "https://en.wikipedia.org/wiki/Ordinary_least_squares"}
  - {title: "Projection matrix", type: wiki, url: "https://en.wikipedia.org/wiki/Projection_matrix"}
  - {title: "Frisch–Waugh–Lovell theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Frisch%E2%80%93Waugh%E2%80%93Lovell_theorem"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember orthogonal projection? That is all a regression is

When you met inner product spaces, the first real theorem was that a subspace has a nearest point: drop a perpendicular from your vector, and the foot of that perpendicular is the closest thing in the subspace to where you started.

Run a regression and you are doing exactly this, with no probability anywhere. Your outcome is a vector in $\mathbb{R}^n$ — one coordinate per observation, not per variable. Your regressors span a subspace of that space, usually a small one. The fitted values are the projection of the outcome onto that subspace, and the residuals are the perpendicular you dropped. "Least squares" is just "shortest perpendicular", because squared length *is* the inner product with itself.

Everything economists say about regression is a fact about that picture. Residuals uncorrelated with regressors? The perpendicular is orthogonal to the subspace, by construction, always — it is not evidence of anything. Adding a variable never lowers $R^2$? You enlarged the subspace, so the nearest point got no further away.

And "controlling for" has a geometric meaning too.

## Rigor

With $X\in\mathbb{R}^{n\times k}$ of full column rank, minimising $\lVert y-Xb\rVert^2$ gives the **normal equations** $X'(y-X\hat\beta)=0$, i.e. the residual is orthogonal to every column of $X$:

$$\hat\beta=(X'X)^{-1}X'y,\qquad \hat y = Py,\qquad P=X(X'X)^{-1}X',\qquad e=My,\ M=I-P.$$

$P$ and $M$ are symmetric and idempotent — projections onto $\operatorname{col}(X)$ and its orthogonal complement. Pythagoras then gives $\lVert y\rVert^2=\lVert \hat y\rVert^2+\lVert e\rVert^2$, and in deviations from means $R^2=\cos^2\theta$, the squared cosine of the angle between the outcome and the subspace.

**Frisch–Waugh–Lovell** makes "controlling for" literal: the coefficient on $x_1$ in the full regression equals the coefficient from regressing $M_{2}y$ on $M_{2}x_1$, where $M_2$ projects out the other regressors. Controlling for something means deleting its direction from both vectors first, then measuring what is left.

## Recall
type: mcq
Q: Why are OLS residuals always uncorrelated with the included regressors?
- [x] Because the residual is by construction the component of $y$ orthogonal to the span of the regressors. — it is geometry, not evidence that the model is correct.
- [ ] Because OLS assumes the errors are uncorrelated with the regressors, and the data confirm it. — that assumption concerns the unobservable errors; the residuals are orthogonal whether or not it holds.
- [ ] Because the residuals are normally distributed with mean zero. — normality is never needed for the orthogonality, or for OLS itself.
- [ ] Because of the central limit theorem in large samples. — the orthogonality is exact in every sample, however small.
