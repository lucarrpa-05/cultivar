---
id: ai.neural-nets.normalization-residuals.fifty-six-layers-lost-to-twenty
topic: ai.neural-nets.normalization-residuals
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, tool]
tags: [resnet, skip-connection, degradation, identity-mapping, depth]
hook: "The deeper network did worse on the training set. Not overfitting — it could not even fit."
sources:
  - {title: "Deep Residual Learning for Image Recognition", author: "Kaiming He, Xiangyu Zhang, Shaoqing Ren & Jian Sun", year: 2015, type: paper, url: "https://arxiv.org/abs/1512.03385"}
  - {title: "Residual neural network", type: wiki, url: "https://en.wikipedia.org/wiki/Residual_neural_network"}
dates: {written: 2026-09-19, event: 2015-12-10}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Fifty-six layers lost to twenty, on the training set

Figure 1 of the ResNet paper shows two curves on CIFAR-10: a 20-layer plain network and a 56-layer plain network. The deeper one is worse. Not worse on the test set — worse on the *training* set. He, Zhang, Ren and Sun are blunt about what that rules out: "such degradation is not caused by overfitting, and adding more layers to a suitably deep model leads to higher training error."

Sit with why that is strange. The 56-layer network contains the 20-layer one as a special case: keep the first twenty, make the remaining thirty-six compute the identity, and you have copied the shallower network exactly. A solution at least as good provably exists. Gradient descent simply cannot find it, because "compute the identity" turns out to be a hard thing for a stack of weight matrices and nonlinearities to learn.

So stop asking. Wire the identity in by hand, and let the layers learn only the correction.

## Rigor

Instead of asking a block to produce the desired mapping $\mathcal{H}(x)$ directly, let the stacked layers fit the residual $\mathcal{F}(x) := \mathcal{H}(x) - x$ and add the input back, so the block outputs $\mathcal{F}(x) + x$.

The reparameterisation changes nothing about what is representable and everything about where it sits in parameter space. "Do nothing" was previously a specific, awkward setting of the weights; now it is $\mathcal{F} = 0$, which is what a block with small weights already computes. Initialise near zero and a deep residual network starts life as a shallow one and deepens as training proceeds.

The gradient story is the same statement differentiated: $\partial(x + \mathcal{F}(x))/\partial x = I + \partial\mathcal{F}/\partial x$. Composing $L$ blocks gives a product whose expansion includes the bare $I$ — an undamped path from the loss to every layer, rather than a product of Jacobians that decays geometrically.

With it, they trained 152 layers on ImageNet and reported 3.57% top-5 error, winning ILSVRC 2015. The same device, unchanged, is the residual stream inside every transformer.

## Recall
type: mcq
Q: The 56-layer plain network had higher *training* error than the 20-layer one. What does that rule out?
- [x] Overfitting and insufficient capacity — the deeper net can represent the shallower one exactly, so the failure is in optimisation. — a strictly larger function class did worse at fitting, which only an optimisation problem explains.
- [ ] A learning-rate problem — the paper shows the gap persists across schedules; the degradation is structural.
- [ ] Too little training data — more data would not help a model that cannot fit the data it has.
