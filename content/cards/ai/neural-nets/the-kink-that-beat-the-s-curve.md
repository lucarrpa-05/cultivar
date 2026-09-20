---
id: ai.neural-nets.activations-depth.the-kink-that-beat-the-s-curve
topic: ai.neural-nets.activations-depth
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, mistake]
tags: [relu, sigmoid, saturation, vanishing-gradient, linear-regions]
hook: "The standard unit squashed everything into a smooth S. Its derivative never exceeds one quarter, and that turned out to be fatal."
sources:
  - {title: "Deep Sparse Rectifier Neural Networks", author: "Xavier Glorot, Antoine Bordes & Yoshua Bengio", year: 2011, type: paper, url: "https://proceedings.mlr.press/v15/glorot11a.html"}
  - {title: "On the Number of Linear Regions of Deep Neural Networks", author: "Guido Montúfar, Razvan Pascanu, Kyunghyun Cho & Yoshua Bengio", year: 2014, type: paper, url: "https://arxiv.org/abs/1402.1869"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The kink that beat the S-curve

The logistic sigmoid ruled for twenty years, and it had every credential: smooth, bounded, differentiable everywhere, vaguely suggestive of a firing rate. It also had a defect nobody weighted properly. Its derivative peaks at one quarter and collapses toward zero wherever the input is large in either direction.

Now recall that the backward pass multiplies those derivatives together, one per layer. Ten layers of a factor at most $1/4$ is a factor of $10^{-6}$ before any weight has been considered. The signal reaching the early layers is noise, and those layers effectively never train. That is the vanishing gradient, and it is why deep networks were considered untrainable without elaborate unsupervised pre-training.

Glorot, Bordes and Bengio argued in 2011 for something cruder: $\max(0,x)$. Derivative exactly one where it is on, exactly zero where it is off. Nothing shrinks. Their result was that deep rectifier networks reach their best performance "without requiring any unsupervised pre-training", which removed the crutch.

The crudeness is not a compromise. It is what buys the expressiveness.

## Rigor

For the logistic $\sigma$, $\sigma'(z) = \sigma(z)(1-\sigma(z)) \le 1/4$, so the backward recursion $\delta^{l} = ((W^{l+1})^{\top}\delta^{l+1})\odot\sigma'(z^{l})$ contracts by at least a factor of four per layer even before the weights act. For $\mathrm{ReLU}$, $\sigma' \in \{0,1\}$: on the active path the gradient is passed through untouched.

The price is real. A unit whose pre-activation is negative for every input in the data receives gradient zero forever — a dead unit, and no amount of training revives it. Leaky variants exist precisely for this.

What the kink buys is counted by Montúfar and colleagues (2014). A rectifier network is piecewise linear, and each layer can fold the regions produced by the layer below, so the number of linear regions grows exponentially in depth rather than polynomially in width: "the compositional structure of these functions enables them to re-use pieces of computation exponentially often in terms of the network's depth."

That is the honest case for depth. A wide shallow network and a deep narrow one are both universal, but only the deep one gets exponentially many pieces per unit of parameter.

## Recall
type: mcq
Q: What is the concrete reason sigmoids make deep networks hard to train?
- [x] Their derivative is at most $1/4$, and the backward pass multiplies one such factor per layer. — ten layers already cost a factor of a million before the weights are considered.
- [ ] They are not differentiable at zero — the sigmoid is smooth everywhere; it is ReLU that has the kink.
- [ ] They cannot represent negative values — the range is $(0,1)$, which is a matter of scale rather than of gradient flow.
