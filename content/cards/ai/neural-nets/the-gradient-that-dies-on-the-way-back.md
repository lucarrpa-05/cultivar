---
id: ai.neural-nets.rnn-lstm.the-gradient-that-dies-on-the-way-back
topic: ai.neural-nets.rnn-lstm
format: idea
difficulty: 3
language: en
weight: heavy
angles: [tool, mistake]
tags: [vanishing-gradient, lstm, recurrent-networks, constant-error-carousel, gates]
hook: "A recurrent network is a deep network where every layer is the same layer. Multiply one matrix by itself forty times and see what survives."
sources:
  - {title: "Long Short-Term Memory", author: "Sepp Hochreiter & Jürgen Schmidhuber", year: 1997, type: paper, url: "https://www.bioinf.jku.at/publications/older/2604.pdf"}
  - {title: "Vanishing gradient problem", type: wiki, url: "https://en.wikipedia.org/wiki/Vanishing_gradient_problem"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The gradient that dies on the way back

Unroll a recurrent network over forty time steps and you have a forty-layer network — with the catch that every layer is the *same* layer, applying the same matrix. To learn that a pronoun in the last sentence refers to a name in the first, the error signal has to travel back through that one matrix forty times.

Multiply a number by itself forty times. Unless it sits almost exactly at one, you get zero or you get infinity. There is no gentle middle, and the same is true for matrices with their largest singular value in place of the number. Long-range dependencies were not hard to learn; they were arithmetically unreachable.

Sepp Hochreiter identified this in his 1991 diploma thesis. In 1997 he and Jürgen Schmidhuber published the escape: a memory cell whose *default* behaviour is to copy its contents forward untouched, with small multiplicative gates deciding when to overwrite it, when to clear it, and when to let it out.

The escape is visible in one derivative.

## Rigor

For a vanilla recurrence $h_t = \sigma(Wh_{t-1} + Ux_t)$,

$$\frac{\partial h_t}{\partial h_k} = \prod_{i=k+1}^{t} \operatorname{diag}\big(\sigma'(z_i)\big)\, W^{\top},$$

so $\left\|\partial h_t/\partial h_k\right\| \le \big(\|W\|\cdot \max\sigma'\big)^{\,t-k}$. With a logistic $\sigma$, $\max\sigma' = 1/4$, and the bound decays geometrically unless $\|W\|$ is large — in which case the same product explodes instead. Vanishing and exploding are the two faces of one exponent.

The LSTM adds a cell state with an additive update:

$$c_t = f_t \odot c_{t-1} + i_t \odot g_t \quad\Longrightarrow\quad \frac{\partial c_t}{\partial c_{t-1}} = \operatorname{diag}(f_t).$$

No weight matrix, no squashing derivative — just the forget gate. When $f_t \approx 1$ the Jacobian is approximately the identity and error flows back over hundreds of steps without shrinking. That is the "constant error carrousel" of the 1997 paper, and it is the same trick as the residual stream in a transformer: make the identity the default path and let the network learn the deviations.

## Recall
type: mcq
Q: Why does an LSTM's cell state let gradients survive hundreds of steps?
- [x] Its update is additive and gated, so the Jacobian is $\operatorname{diag}(f_t) \approx I$ rather than a repeated weight matrix. — nothing is multiplied by a shrinking factor each step.
- [ ] It uses a larger learning rate for early time steps — the learning rate does not change how the product of Jacobians decays.
- [ ] It truncates the sequence so there are fewer steps — truncation limits the reach; the carousel is what extends it.
