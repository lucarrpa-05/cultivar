---
id: ai.ml-basics.overfitting-regularization.ridge-and-lasso-are-priors
topic: ai.ml-basics.overfitting-regularization
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, tool]
tags: [ridge, lasso, map-estimation, sparsity, shrinkage]
hook: "Add a penalty to your loss and you have not 'regularised'. You have stated a prior and taken its mode."
sources:
  - {title: "Regression Shrinkage and Selection via the Lasso", author: "Robert Tibshirani", year: 1996, type: paper, url: "https://doi.org/10.1111/j.2517-6161.1996.tb02080.x"}
  - {title: "Ridge regression", type: wiki, url: "https://en.wikipedia.org/wiki/Ridge_regression"}
  - {title: "Lasso (statistics)", type: wiki, url: "https://en.wikipedia.org/wiki/Lasso_(statistics)"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Ridge and lasso are opinions about the world, written as penalties

Shrinking coefficients toward zero looks like a fudge factor — a knob you turn until the validation curve stops embarrassing you. It is not a fudge. It is Bayes' rule with the plumbing pulled out.

Suppose that before seeing any data you believe coefficients are probably smallish, and you encode that belief as a Gaussian centred at zero. Multiply by the likelihood, take the most probable parameters, take logarithms, and out drops least squares plus $\lambda\|w\|_2^2$. That is ridge regression. Swap the Gaussian for a Laplace distribution — same idea, sharper peak at zero, fatter tails — and out drops least squares plus $\lambda\|w\|_1$. That is the lasso.

They behave differently because they are different opinions. Ridge says *many small effects*: it shrinks everything and kills nothing. Lasso says *a few real effects, the rest exactly zero*: it drives coefficients to precisely zero and hands you a variable selection you never asked for.

Why one hits zero and the other never does is a fact about corners.

## Rigor

MAP estimation: with likelihood $p(y\mid X,w)$ and prior $p(w)$,

$$\hat w_{\mathrm{MAP}}=\arg\max_w\ \log p(y\mid X,w)+\log p(w).$$

Take $y\mid X,w\sim\mathcal N(Xw,\sigma^{2}I)$ and $w\sim\mathcal N(0,\tau^{2}I)$:

$$\hat w=\arg\min_w\ \|y-Xw\|_2^{2}+\lambda\|w\|_2^{2},\qquad \lambda=\frac{\sigma^{2}}{\tau^{2}},$$

with closed form $\hat w=(X^{\top}X+\lambda I)^{-1}X^{\top}y$. Ridge adds $\lambda$ to every eigenvalue of $X^{\top}X$, so a direction with singular value $s_i$ is scaled by $s_i^{2}/(s_i^{2}+\lambda)$: near-degenerate directions are crushed, strong ones barely move. A Laplace prior $p(w_j)\propto e^{-|w_j|/b}$ gives the lasso instead, $\|y-Xw\|_2^{2}+\lambda\|w\|_1$ (Tibshirani, 1996).

**The corners.** Both problems equal minimising $\|y-Xw\|^{2}$ subject to $\|w\|_2\le t$ or $\|w\|_1\le t$. The first constraint set is a round ball; the second is a cross-polytope — all spikes and flat faces. The elliptical contours of squared error touch a round ball at a generic point, every coordinate nonzero. They touch a diamond overwhelmingly often *at a vertex*, where all but a few coordinates are exactly $0$. Sparsity is geometry, not magic.

## Recall
type: mcq
Q: Ridge and lasso encode different beliefs about the coefficients. What is lasso's?
- [x] A few coefficients are genuinely nonzero and the rest are exactly zero — the Laplace prior's spike at the origin, which is why the $\ell_1$ ball's corners get hit.
- [ ] All coefficients are small but none are exactly zero — that is the Gaussian prior behind ridge, which shrinks without ever zeroing.
- [ ] Coefficients are uniform on a ball — a uniform prior is constant inside its support, so it contributes no penalty at all.
