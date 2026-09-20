---
id: ai.neural-nets.backprop.every-derivative-for-the-price-of-one
topic: ai.neural-nets.backprop
format: idea
difficulty: 3
language: en
weight: heavy
angles: [tool, beautiful]
tags: [backpropagation, reverse-mode, automatic-differentiation, chain-rule, activations-memory]
hook: "Nudging each parameter to see what happens would take a hundred billion forward passes. The real cost is about two."
sources:
  - {title: "Learning representations by back-propagating errors", author: "David E. Rumelhart, Geoffrey E. Hinton & Ronald J. Williams", year: 1986, type: paper, url: "https://www.nature.com/articles/323533a0"}
  - {title: "Automatic differentiation", type: wiki, url: "https://en.wikipedia.org/wiki/Automatic_differentiation"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Every derivative for the price of one forward pass

To improve a model you need to know how the loss would change if you nudged each parameter. The obvious way is to nudge each parameter and see. For a hundred-billion-parameter model that is a hundred billion forward passes per training step, which is not a slow algorithm — it is a dead one.

Backpropagation computes every one of those derivatives at about twice the cost of a single forward pass. It does not do anything clever with calculus; the chain rule is the chain rule. What it does is refuse to recompute. Every parameter's gradient is a product along a path from that parameter to the loss, and all those paths share their final stretch. Sweep backwards from the loss, store each shared piece once, and every gradient falls out on the way past.

Rumelhart, Hinton and Williams put this in *Nature* in 1986, and multilayer networks became trainable.

## Rigor

Write the forward pass as $z^{l} = W^{l}a^{l-1} + b^{l}$, $a^{l} = \sigma(z^{l})$, and define $\delta^{l} = \partial \mathcal{L}/\partial z^{l}$. Then

$$\delta^{L} = \nabla_{a}\mathcal{L} \odot \sigma'(z^{L}), \qquad \delta^{l} = \big((W^{l+1})^{\top}\delta^{l+1}\big) \odot \sigma'(z^{l}), \qquad \frac{\partial \mathcal{L}}{\partial W^{l}} = \delta^{l}\,(a^{l-1})^{\top}.$$

Each backward step is one matrix–vector product with $(W^{l+1})^{\top}$ — the same shape and cost as the forward product with $W^{l+1}$. Hence the factor of about two.

The general statement is about direction. Forward-mode differentiation propagates a perturbation of one *input* and costs one pass per input variable; reverse-mode propagates a sensitivity of one *output* and costs one pass per output. A training loss is a single scalar with $10^{11}$ inputs, so reverse-mode is not a clever choice but the only sane one.

The bill is memory, not time. Computing $\partial\mathcal{L}/\partial W^{l}$ needs $a^{l-1}$, so the entire forward pass must be kept alive until the backward sweep reaches it. That is why training a model costs several times the memory of running one, and why gradient checkpointing — recomputing activations instead of storing them — exists.

## Recall
type: mcq
Q: Why is reverse-mode differentiation the right direction for training a neural network?
- [x] There is one scalar loss and enormously many parameters, and reverse-mode costs one pass per output, not per input. — the cost scales with the number of things you differentiate, not the number you differentiate by.
- [ ] Because forward-mode cannot handle nonlinearities — it handles them fine; it is simply priced per input variable.
- [ ] Because it uses less memory than the forward pass — it uses strictly more: the activations must be kept for the backward sweep.
