---
id: ai.ml-basics.linear-models.linear-in-the-parameters
topic: ai.ml-basics.linear-models
format: idea
difficulty: 3
language: en
weight: heavy
angles: [tool, connection]
tags: [basis-expansion, normal-equations, feature-engineering, convexity]
hook: "A linear model can fit a wave, a circle or a step function. 'Linear' was never a claim about the inputs."
related: [ai.ml-basics.linear-models.the-lost-planet]
sources:
  - {title: "Linear regression", type: wiki, url: "https://en.wikipedia.org/wiki/Linear_regression"}
  - {title: "Least squares", type: wiki, url: "https://en.wikipedia.org/wiki/Least_squares"}
  - {title: "Kernel method", type: wiki, url: "https://en.wikipedia.org/wiki/Kernel_method"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# "Linear" is a claim about the parameters, not about the world

"Linear models are too weak for that" is nearly always a vocabulary error. A linear model is linear in its *coefficients*. What you do to the inputs before they arrive is entirely your business.

Hand the model $x$ and it draws a line. Hand it $x,\ x^2,\ x^3$ and it draws cubics — still a linear model, still one matrix solve, still a single global optimum with no local traps. Hand it $\sin x$, $\log x$, indicators for a hundred buckets, products of feature pairs, and it draws very nearly anything. The fitting problem does not get harder. Only the bookkeeping does.

Which relocates the real work of classical machine learning. It was never the fitting; it was choosing the features — deciding what the model is allowed to see. A chemist with good descriptors beat a fancier model with raw inputs, every time. Deep learning's entire pitch is that the network picks the features itself.

Here is why the fitting stays easy no matter how strange the features get.

## Rigor

Fix a feature map $\varphi:\mathcal X\to\mathbb R^{p}$ and the class $f_w(x)=w^{\top}\varphi(x)$. With squared loss and design matrix $\Phi\in\mathbb R^{n\times p}$, $\Phi_{ij}=\varphi_j(x_i)$, the objective $\|y-\Phi w\|^2$ is convex in $w$ with gradient $-2\Phi^{\top}(y-\Phi w)$, so any optimum solves the **normal equations**

$$\Phi^{\top}\Phi\,\hat w=\Phi^{\top}y .$$

Nonlinearity in $x$ never appears here: it is frozen inside $\Phi$, which is a fixed table of numbers by the time you optimise. That is what "linear in the parameters" buys — one solve, no local minima, and $\hat w=(\Phi^{\top}\Phi)^{-1}\Phi^{\top}y$ whenever $\Phi$ has full column rank.

Logistic regression keeps the shape: $p(y=1\mid x)=\sigma\!\left(w^{\top}\varphi(x)\right)$, with negative log-likelihood still convex in $w$, now without a closed form.

Two costs follow. First, $\varphi$ *is* your inductive bias, chosen blind. Second, $p$ explodes: degree-$d$ polynomials in $m$ variables need $\binom{m+d}{d}$ features. Both problems have one escape route — never build $\varphi(x)$ at all, only the inner products $\varphi(x)^{\top}\varphi(z)$.

## Recall
type: mcq
Q: Why is a model built from the features $x,\ x^2,\ x^3$ still called linear?
- [x] The prediction is linear in the coefficients — so fitting is still one convex problem with a closed-form solution.
- [ ] Because the fitted curve is still a straight line in $x$ — it is not; it is a cubic, which is exactly the point.
- [ ] Because the errors are assumed Gaussian — that is an assumption about noise, not about what the word "linear" names here.
