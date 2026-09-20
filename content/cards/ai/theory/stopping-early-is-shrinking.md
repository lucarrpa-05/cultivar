---
id: ai.theory.implicit-regularization.stopping-early-is-shrinking
topic: ai.theory.implicit-regularization
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, tool]
tags: [early-stopping, ridge, shrinkage, spectral-filter, gradient-flow]
hook: "Nobody added a penalty. Cutting training short adds one anyway, and you can compute its strength."
related: [ai.ml-basics.overfitting-regularization.ridge-and-lasso-are-priors]
sources:
  - {title: "Early stopping", type: wiki, url: "https://en.wikipedia.org/wiki/Early_stopping"}
  - {title: "Ridge regression", type: wiki, url: "https://en.wikipedia.org/wiki/Ridge_regression"}
  - {title: "In Search of the Real Inductive Bias: On the Role of Implicit Regularization in Deep Learning", author: "Neyshabur, Tomioka & Srebro", year: 2015, type: paper, url: "https://arxiv.org/abs/1412.6614"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Stopping early is ridge regression, with the step count as lambda

Early stopping is usually explained as vigilance: watch the validation curve, quit before it turns up. True, and it hides something far more specific. Stopping early is not merely *avoiding* overfitting. It applies a particular regulariser, at a particular strength, and you can write both down.

Run gradient descent on a least-squares problem from zero. The directions in which your data varies most get fitted fastest, because they produce the largest gradients; the flimsy, poorly determined directions crawl. Stop after $t$ steps and you have essentially fitted the strong directions and left the weak ones near zero.

That is precisely what ridge regression does. Ridge multiplies each direction by a shrinkage factor determined by its singular value, crushing the weak ones. Early stopping multiplies each direction by a shrinkage factor determined by its singular value *and the number of steps*. Same filter, and the correspondence is $\lambda\approx1/(\eta t)$.

Which reframes the practice entirely: training time is a regularisation hyperparameter.

## Rigor

Least squares $L(\beta)=\tfrac12\|y-X\beta\|^{2}$, gradient descent with step $\eta$ from $\beta_0=0$. Write $X=U\Sigma V^{\top}$ and work in the basis $V$: for the component $b_i=v_i^{\top}\beta$ the update $\beta_{t+1}=\beta_t+\eta X^{\top}(y-X\beta_t)$ becomes

$$b_i^{(t+1)}=b_i^{(t)}+\eta s_i\big(u_i^{\top}y-s_i\,b_i^{(t)}\big)\ \Longrightarrow\ b_i^{(t)}=\frac{u_i^{\top}y}{s_i}\Big(1-(1-\eta s_i^{2})^{t}\Big),$$

a geometric recursion solved exactly. Compare ridge, which gives $b_i^{\text{ridge}}=\frac{u_i^{\top}y}{s_i}\cdot\frac{s_i^{2}}{s_i^{2}+\lambda}$. Both are the least-squares answer $u_i^{\top}y/s_i$ multiplied by a **spectral filter** that is near 1 for large $s_i$ and near 0 for small:

$$\text{early stopping: } 1-(1-\eta s_i^{2})^{t}\approx1-e^{-\eta t\,s_i^{2}},\qquad\text{ridge: }\frac{s_i^{2}}{s_i^{2}+\lambda}.$$

The first crosses over at $s_i^{2}\sim1/(\eta t)$, the second at $s_i^{2}\sim\lambda$. Hence $\lambda\approx1/(\eta t)$: more steps, less shrinkage.

The caveat for deep learning is that all of this is linear. In a nonlinear network the qualitative story survives — fast, well-determined directions first — but the exact correspondence does not, which is why "train longer" and "use less weight decay" are not interchangeable in practice.

## Recall
type: reveal
Q: Early stopping and ridge regression apply the same kind of spectral filter. What plays the role of $\lambda$?
A: One over the step size times the number of steps, $\lambda\approx1/(\eta t)$. Both multiply each singular direction by a factor near 1 when $s_i^{2}$ is large and near 0 when it is small; more training steps means weaker shrinkage.
