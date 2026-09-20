---
id: ai.neural-nets.autoencoders-vae.how-to-differentiate-through-a-coin-flip
topic: ai.neural-nets.autoencoders-vae
format: idea
difficulty: 4
language: en
weight: heavy
angles: [beautiful, tool]
tags: [reparameterization-trick, vae, elbo, variance-reduction, score-function]
hook: "You need the derivative of an expectation whose distribution you are learning. Sampling has no derivative. Move the randomness."
sources:
  - {title: "Auto-Encoding Variational Bayes", author: "Diederik P. Kingma & Max Welling", year: 2013, type: paper, url: "https://arxiv.org/abs/1312.6114"}
  - {title: "Variational autoencoder", type: wiki, url: "https://en.wikipedia.org/wiki/Variational_autoencoder"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# How to differentiate through a coin flip

Here is the obstruction. You want to train a model that *samples* — the encoder outputs a mean and a spread, and a latent vector is drawn from that distribution. To use gradient descent you need to know how the loss would change if the mean moved. But the sampler is a black box that hands you a number. "How would this particular draw have come out if $\mu$ had been slightly larger?" is not a question it can answer.

Kingma and Welling's 2013 move is almost too simple to be called a trick. Do not draw from $\mathcal{N}(\mu,\sigma^2)$. Draw $\varepsilon$ from $\mathcal{N}(0,1)$ — a distribution with no learnable parameters at all — and then compute $z = \mu + \sigma\varepsilon$.

Nothing about the sampling has changed; $z$ has the same distribution as before. But now $z$ is an ordinary differentiable function of $\mu$ and $\sigma$, and the randomness sits in an input that you never differentiate with respect to. The gradient walks straight through the sample.

## Rigor

Write $z = g_\phi(\varepsilon)$ with $\varepsilon \sim p(\varepsilon)$ fixed. Then

$$\nabla_\phi\, \mathbb{E}_{q_\phi(z)}\big[f(z)\big] = \nabla_\phi\, \mathbb{E}_{p(\varepsilon)}\big[f(g_\phi(\varepsilon))\big] = \mathbb{E}_{p(\varepsilon)}\big[\nabla_\phi f(g_\phi(\varepsilon))\big],$$

where the second equality is the whole point: the measure no longer depends on $\phi$, so differentiation and expectation commute and a single sample gives an unbiased gradient estimate.

The alternative, which always works, is the score-function estimator $\nabla_\phi\mathbb{E}_{q_\phi}[f] = \mathbb{E}_{q_\phi}[f(z)\nabla_\phi \log q_\phi(z)]$. Also unbiased, and far noisier — it uses $f$ only as a scalar weight and never looks at how $f$ varies with $z$, whereas the reparameterised estimator gets $\nabla f$ itself.

This is what makes the variational bound trainable:

$$\log p(x) \;\ge\; \mathbb{E}_{q_\phi(z\mid x)}\big[\log p_\theta(x\mid z)\big] - D_{\mathrm{KL}}\big(q_\phi(z\mid x)\,\|\,p(z)\big).$$

The first term is an expectation over a distribution being learned — exactly the object the trick unlocks. The second, for Gaussians, is available in closed form. Hence the paper's claim that "a reparameterization of the variational lower bound yields a lower bound estimator that can be straightforwardly optimized using standard stochastic gradient methods".

## Recall
type: reveal
Q: Why does writing $z = \mu + \sigma\varepsilon$ with $\varepsilon \sim \mathcal{N}(0,1)$ let gradients flow?
A: Because the distribution being sampled no longer depends on the parameters — all the randomness is in $\varepsilon$. The expectation is now over a fixed measure, so $\nabla$ and $\mathbb{E}$ commute and $z$ is a differentiable function of $\mu$ and $\sigma$.
