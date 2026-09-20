---
id: ai.neural-nets.diffusion.train-it-to-remove-noise-get-a-painter
topic: ai.neural-nets.diffusion
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, tool]
tags: [ddpm, denoising, score-matching, langevin, image-generation]
hook: "The training task is a homework exercise: guess what noise was added. Do it at every noise level and you get a machine that invents images."
sources:
  - {title: "Denoising Diffusion Probabilistic Models", author: "Jonathan Ho, Ajay Jain & Pieter Abbeel", year: 2020, type: paper, url: "https://arxiv.org/abs/2006.11239"}
  - {title: "Diffusion model", type: wiki, url: "https://en.wikipedia.org/wiki/Diffusion_model"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Train it only to remove noise, and out comes a painter

The training task is almost insultingly plain. Take a real image. Pick a random noise level. Add that much Gaussian noise. Ask the network to output the noise you added. Score it with squared error. That is a regression problem you could set as an exercise in a first course.

Run it over enough images and enough noise levels and the same network, started on pure static and applied repeatedly, produces an image that has never existed.

The reason is not mysterious once stated. A network that can strip noise at every level has, at every level, learned which direction points toward "more like real data". Generation is nothing but following that direction, a little at a time, from nowhere in particular. Ho, Jain and Abbeel's 2020 model reached an Inception score of 9.46 and an FID of 3.17 on unconditional CIFAR-10 doing exactly this.

The cost is in the honest column: hundreds of network evaluations to make one picture, where a GAN needs one.

## Rigor

Using the closed-form marginal $x_t = \sqrt{\bar\alpha_t}\,x_0 + \sqrt{1-\bar\alpha_t}\,\varepsilon$, the whole variational bound collapses (after reweighting) to

$$\mathcal{L}_{\text{simple}} = \mathbb{E}_{t,\,x_0,\,\varepsilon}\Big[\big\|\varepsilon - \varepsilon_\theta(x_t, t)\big\|^2\Big].$$

Predict the noise. Nothing else.

Why that is secretly a gradient estimate: since $q(x_t\mid x_0)$ is Gaussian with mean $\sqrt{\bar\alpha_t}x_0$ and variance $(1-\bar\alpha_t)I$,

$$\nabla_{x_t}\log q(x_t\mid x_0) = -\frac{x_t - \sqrt{\bar\alpha_t}x_0}{1-\bar\alpha_t} = -\frac{\varepsilon}{\sqrt{1-\bar\alpha_t}} .$$

So $\varepsilon_\theta$ is a rescaled estimate of the **score**, $\nabla_x \log p(x)$ — the direction of steepest increase of the data density. Stepping along an estimated score with a little injected noise is Langevin dynamics, which is precisely the "novel connection between diffusion probabilistic models and denoising score matching with Langevin dynamics" the paper credits its results to.

The intuition's "direction toward more like real data" was not a metaphor. It is the gradient of the log-density, and a denoiser is how you get it without ever writing the density down.

## Recall
type: mcq
Q: What is a trained denoising network secretly estimating?
- [x] The score $\nabla_x \log p(x)$, up to a scale — the added noise is proportional to the gradient of the log-density of the noised data.
- [ ] The data density $p(x)$ itself — the density is never represented; only its gradient is, which is why normalisation is never needed.
- [ ] The inverse of the forward noising matrix — the forward process is Gaussian noise addition, not an invertible linear map.
