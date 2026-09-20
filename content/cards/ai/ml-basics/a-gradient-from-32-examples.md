---
id: ai.ml-basics.gradient-training.a-gradient-from-32-examples
topic: ai.ml-basics.gradient-training
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, numbers]
tags: [sgd, mini-batch, robbins-monro, learning-rate, gradient-noise]
hook: "The exact gradient costs a full pass over your data and buys one step. A sloppy one buys thousands."
sources:
  - {title: "A Stochastic Approximation Method", author: "Herbert Robbins & Sutton Monro", year: 1951, type: paper, url: "https://doi.org/10.1214/aoms/1177729586"}
  - {title: "Stochastic gradient descent", type: wiki, url: "https://en.wikipedia.org/wiki/Stochastic_gradient_descent"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A gradient from 32 examples beats a gradient from a million

To take one honest step downhill you must visit every training example, average their gradients, and move. With a million examples that is a million derivative computations to buy a single step — and steps are small, so you need thousands of them.

Or: grab 32 examples at random, average *their* gradients, and step. The direction is wrong, but wrong in a very specific way: on average it points exactly where the true gradient points. You have swapped accuracy per step for roughly thirty thousand times more steps at the same cost, and that trade is not close.

The noise turns out to be more than tolerable. An exact optimiser walks into the nearest bottom and stops; a jittery one keeps getting kicked out of narrow crevices and tends to settle somewhere wide. The sloppiness is doing work nobody fully understands yet.

Herbert Robbins and Sutton Monro proved the idea sound in 1951, seven years before the perceptron.

## Rigor

Let $L(\theta)=\frac1n\sum_{i=1}^{n}\ell_i(\theta)$ and sample a mini-batch $B$ of size $b$ uniformly. Then

$$g_B(\theta)=\frac1b\sum_{i\in B}\nabla\ell_i(\theta),\qquad \mathbb E\big[g_B(\theta)\big]=\nabla L(\theta),$$

so $g_B$ is unbiased, with variance proportional to $1/b$. Quadrupling the batch halves the noise's standard deviation at four times the cost: that square root is the whole argument for small batches.

**Robbins–Monro (1951).** For $\theta_{t+1}=\theta_t-\eta_t\,g_{B_t}(\theta_t)$ with unbiased gradients of bounded variance, convergence requires

$$\sum_t \eta_t=\infty,\qquad \sum_t \eta_t^{2}<\infty ,$$

the first so you can still travel arbitrarily far, the second so the noise is eventually damped out. $\eta_t=\eta_0/t$ qualifies. A constant step does not: it leaves you bouncing forever in a neighbourhood of the optimum whose radius grows with $\eta_0$ and with the gradient noise. Every learning-rate schedule ever shipped exists to shut that bounce down at the end — and, if the jitter really is what keeps you out of narrow valleys, to leave it running before then.

## Recall
type: mcq
Q: What makes a mini-batch gradient a usable substitute for the full one?
- [x] It is unbiased, with variance falling like $1/b$ — the errors cancel across many cheap steps instead of being avoided at great cost.
- [ ] It is closer to the true gradient than the full-batch version because it discards outliers — it is strictly noisier; the gain is steps per second.
- [ ] It removes the need for a learning-rate schedule — the opposite: with a constant step, gradient noise keeps you bouncing near the optimum forever.
