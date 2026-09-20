---
id: ai.neural-nets.optimizers.every-parameter-gets-its-own-step
topic: ai.neural-nets.optimizers
format: idea
difficulty: 3
language: en
weight: heavy
angles: [tool, practical]
tags: [adam, adaptive-moments, bias-correction, optimizer-state, adamw]
hook: "One learning rate has to be small enough for the loudest parameter, which means the quietest one never moves at all."
sources:
  - {title: "Adam: A Method for Stochastic Optimization", author: "Diederik P. Kingma & Jimmy Ba", year: 2014, type: paper, url: "https://arxiv.org/abs/1412.6980"}
  - {title: "Decoupled Weight Decay Regularization", author: "Ilya Loshchilov & Frank Hutter", year: 2017, type: paper, url: "https://arxiv.org/abs/1711.05101"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Every parameter gets its own step size

Plain gradient descent applies one step size to every weight in the model. In a real network that is a disaster of scale. Some parameters receive a large gradient on every batch. Others — the embedding of a rare word, say — receive a tiny gradient once in a thousand batches. A single step size has to be small enough not to destabilise the first kind, and then the second kind is frozen for the entire run.

Adam, from Kingma and Ba in 2014, keeps two running averages per parameter: the recent mean of its gradient, and the recent mean of its *squared* gradient. Divide the first by the square root of the second and the units cancel. What is left is a step of roughly fixed size, in the direction the gradient has been consistently pointing, whatever the gradient's magnitude happens to be.

The name is adaptive moment estimation, and the two moments are exactly those two averages.

## Rigor

With $g_t$ the gradient at step $t$:

$$m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t, \qquad v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^{2},$$
$$\hat m_t = \frac{m_t}{1-\beta_1^{t}}, \qquad \hat v_t = \frac{v_t}{1-\beta_2^{t}}, \qquad \theta_t = \theta_{t-1} - \eta\,\frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon},$$

with the recommended defaults $\beta_1 = 0.9$, $\beta_2 = 0.999$, $\epsilon = 10^{-8}$.

**Why the hats.** Both averages start at zero, so early on they are biased toward zero — badly, since $\beta_2 = 0.999$ means $v_1$ is a thousandth of the true second moment. For a stationary gradient, $\mathbb{E}[m_t] = (1-\beta_1^{t})\,\mathbb{E}[g]$, so dividing by $1-\beta_1^{t}$ removes the bias exactly. Without it the first few hundred steps take enormous jumps.

**The costs.** Two extra numbers per parameter, so optimiser state is twice the model — often the dominant memory term in training. And the division by $\sqrt{\hat v}$ rescales the gradient but not an added $L_2$ penalty, so $L_2$ regularisation and weight decay stop being equivalent; Loshchilov and Hutter's AdamW decouples the decay from the adaptive step for exactly this reason.

## Recall
type: mcq
Q: What does dividing by $\sqrt{\hat v_t}$ accomplish in Adam?
- [x] It makes each parameter's step roughly scale-free, so rare small gradients move as far as frequent large ones. — the gradient's magnitude cancels, leaving direction and consistency.
- [ ] It prevents the gradient from ever being negative — sign is preserved; only the magnitude is normalised.
- [ ] It replaces the learning rate, which is no longer needed — $\eta$ is still there and still matters; it now sets the size of a normalised step.
