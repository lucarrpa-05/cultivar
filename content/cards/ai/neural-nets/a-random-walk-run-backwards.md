---
id: ai.neural-nets.diffusion.a-random-walk-run-backwards
topic: ai.neural-nets.diffusion
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, beautiful]
tags: [diffusion, brownian-motion, forward-process, gaussian, markov-chain]
callback: {from: math.probability.brownian, to: ai.neural-nets.diffusion}
prerequisites: [math.probability.brownian, ai.neural-nets.autoencoders-vae]
hook: "A random walk forgets where it started. Diffusion models are the claim that you can teach a network to remember."
sources:
  - {title: "Deep Unsupervised Learning using Nonequilibrium Thermodynamics", author: "Jascha Sohl-Dickstein, Eric A. Weiss, Niru Maheswaranathan & Surya Ganguli", year: 2015, type: paper, url: "https://arxiv.org/abs/1503.03585"}
  - {title: "Denoising Diffusion Probabilistic Models", author: "Jonathan Ho, Ajay Jain & Pieter Abbeel", year: 2020, type: paper, url: "https://arxiv.org/abs/2006.11239"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember Brownian motion? Now run it backwards

The defining feature of a random walk is that it destroys information. Start at a point, add an independent Gaussian nudge, repeat. After enough steps the position tells you essentially nothing about where you began — the walk has forgotten, and the distribution has relaxed to something featureless.

Sohl-Dickstein and colleagues took that as a construction rather than a nuisance, borrowing the framing from non-equilibrium statistical physics: "systematically and slowly destroy structure in a data distribution through an iterative forward diffusion process. We then learn a reverse diffusion process that restores structure in data."

The asymmetry is the whole design. Going forward is free — it is just adding noise, with no parameters and nothing to learn. Going backward is impossible in closed form, which is where the network goes. And because every forward step is tiny, each backward step is only a small correction, which is a far easier thing to learn than jumping from noise to a photograph in one leap.

The reason small steps make this tractable is worth writing down.

## Rigor

The forward chain is fixed: $q(x_t \mid x_{t-1}) = \mathcal{N}\big(\sqrt{1-\beta_t}\,x_{t-1},\, \beta_t I\big)$, with a small variance schedule $\beta_t$. Gaussians compose, so with $\alpha_t = 1-\beta_t$ and $\bar\alpha_t = \prod_{s\le t}\alpha_s$ the marginal is available in one shot:

$$x_t = \sqrt{\bar\alpha_t}\,x_0 + \sqrt{1-\bar\alpha_t}\,\varepsilon, \qquad \varepsilon \sim \mathcal{N}(0,I).$$

That closed form is what makes training cheap: you never simulate the walk, you jump straight to a random time $t$.

The key structural fact is the one Feller established for diffusions: **for small enough steps, the reverse conditional $q(x_{t-1}\mid x_t)$ is itself approximately Gaussian.** So the learned reverse process may be parameterised as $p_\theta(x_{t-1}\mid x_t) = \mathcal{N}(\mu_\theta(x_t,t), \Sigma_t)$ — the same family as the forward step, only with a learned mean. Take $\beta_t$ too large and that approximation fails, which is why the schedules are long and gentle.

So "run the walk backwards" is exact: same Markov chain, same Gaussian steps, one direction known analytically and the other fitted.

## Recall
type: mcq
Q: Why must a diffusion model's forward process take many tiny steps rather than a few large ones?
- [x] Because the reverse of a diffusion is only approximately Gaussian when each step is small, and that approximation is what lets the network parameterise it. — large steps would need a reverse distribution of unknown, complicated shape.
- [ ] Because large steps would not destroy the image completely — a few large steps destroy it perfectly well; the problem is inverting them.
- [ ] Because the forward process has parameters that need many updates — the forward process is fixed and has nothing to learn.
