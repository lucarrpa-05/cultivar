---
id: ai.ml-basics.loss-functions.your-loss-is-a-likelihood
topic: ai.ml-basics.loss-functions
format: idea
difficulty: 2
language: en
weight: medium
angles: [connection, tool]
tags: [maximum-likelihood, squared-error, cross-entropy, noise-model]
hook: "Squared error is not a neutral default. It is an assumption about your noise, wearing a disguise."
sources:
  - {title: "Maximum likelihood estimation", type: wiki, url: "https://en.wikipedia.org/wiki/Maximum_likelihood_estimation"}
  - {title: "Cross-entropy", type: wiki, url: "https://en.wikipedia.org/wiki/Cross_entropy"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Choose a loss and you have quietly chosen a probability model

Squared error reads like common sense: punish being wrong, punish being very wrong much more. It is not common sense. It is a specific claim — that your measurements are the truth plus Gaussian noise of roughly constant size.

Change the claim and the loss changes with it. If your noise throws occasional wild outliers, the Gaussian claim is false, and squared error responds by letting one bad point drag the entire fit; absolute error, which falls out of a heavier-tailed assumption, shrugs at it. If your output is a yes/no label, the natural claim is a coin with probability $p$, and the loss that drops out is cross-entropy. Nobody chose these by taste.

So "which loss should I use?" is rarely a question about optimisation. It is a question about what you think generated the data — and every answer arrives with its loss already attached.

The bridge between the belief and the loss is one line long.

## Rigor

Suppose the data come from a family $p_\theta(y\mid x)$ and you estimate $\theta$ by maximum likelihood on independent samples:

$$\hat\theta=\arg\max_\theta\ \prod_i p_\theta(y_i\mid x_i)\;=\;\arg\min_\theta\ \sum_i -\log p_\theta(y_i\mid x_i).$$

The loss *is* the negative log-likelihood. Three instances:

**Gaussian.** $y\mid x\sim\mathcal N\!\left(f_\theta(x),\sigma^2\right)$ gives $-\log p=\frac{(y-f_\theta(x))^2}{2\sigma^{2}}+\log\sqrt{2\pi\sigma^{2}}$. Drop the constants: squared error.

**Bernoulli.** $y\in\{0,1\}$ with $p_\theta(1\mid x)=\hat p$ gives $-y\log\hat p-(1-y)\log(1-\hat p)$: binary cross-entropy. For $K$ classes it is $-\log\hat p_{y}$.

**Laplace.** $p\propto e^{-|y-f_\theta(x)|/b}$ gives absolute error, whose minimiser is the conditional *median* rather than the mean — which is precisely why it ignores outliers.

The disguise is literal: the loss is the belief. Using squared error on counts, or on heavy-tailed data, is not a neutral default. It is a wrong model, stated in the one place nobody thinks to read.

## Recall
type: mcq
Q: Squared-error loss is the maximum-likelihood loss under which assumption?
- [x] Gaussian noise of constant variance — dropping constants from $-\log p$ leaves exactly $(y-f(x))^2$.
- [ ] Laplace (double-exponential) noise — that one yields absolute error, whose optimum is the conditional median.
- [ ] Bernoulli labels — that yields cross-entropy, the classification loss.
- [ ] No assumption at all, it is neutral — every loss is somebody's negative log-likelihood, so neutrality is not on the menu.
