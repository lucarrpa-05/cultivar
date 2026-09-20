---
id: ai.neural-nets.perceptron-mlp.a-neuron-is-a-dot-product-and-a-kink
topic: ai.neural-nets.perceptron-mlp
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, beautiful]
tags: [neuron, relu, piecewise-linear, hyperplane, nonlinearity]
hook: "Strip away the biology and a neuron is two operations: an inner product, and a bend. The bend is the whole reason depth exists."
sources:
  - {title: "Artificial neuron", type: wiki, url: "https://en.wikipedia.org/wiki/Artificial_neuron"}
  - {title: "Rectifier (neural networks)", type: wiki, url: "https://en.wikipedia.org/wiki/Rectifier_(neural_networks)"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Difficulty 1 to 2: the rigor counts regions of a hyperplane arrangement, which is not a level-1 ask."}
---

# A neuron is a dot product and a kink

Forget the dendrites. A unit in a neural network does exactly two things. It takes the incoming vector and forms an inner product with its own weight vector, plus a constant. Then it bends the result: if it came out negative, set it to zero.

The inner product asks one question, and it is a geometric one — *how much does this input point along my direction?* The constant sets how much counts as enough. So a unit is a soft yes/no question about a direction in input space, and a layer is a few thousand such questions asked at once.

The bend is doing more work than it looks. It is the only nonlinear thing in the entire machine. Take it out and stacking a hundred layers gains you precisely nothing, because a composition of linear maps is a linear map — a hundred matrices multiply into one. Every ounce of expressive power in a deep network is bought by that little kink.

Here is what the kink actually builds.

## Rigor

A unit computes $y = \sigma(\langle w,x\rangle + b)$, and with $\sigma = \mathrm{ReLU}$, $\sigma(t) = \max(0,t)$.

**Why depth needs it.** Without $\sigma$, an $L$-layer network is $x \mapsto W_L W_{L-1}\cdots W_1 x$, a single matrix of rank at most $\min_i \operatorname{rank}(W_i)$. Depth adds no functions at all, only a worse-conditioned parameterisation of the same linear maps.

**What it builds.** Each unit splits input space along the hyperplane $\langle w,x\rangle + b = 0$: zero on one side, affine on the other. A layer of $n$ units in $\mathbb{R}^{d}$ is an arrangement of $n$ hyperplanes, which cuts the space into at most

$$\sum_{i=0}^{d}\binom{n}{i}$$

regions, and inside each region every unit is either off or exactly linear — so the whole network is affine there. A ReLU network is a piecewise-linear function, and training is the search for where to put the creases.

That is the honest picture of the kink: not a smooth squashing, not a firing rate, just a fold in the domain.

## Recall
type: mcq
Q: What breaks if you delete the nonlinearity from every unit in a deep network?
- [x] The whole network collapses to a single linear map, so depth buys nothing. — a composition of matrices is one matrix.
- [ ] Training becomes unstable but the network stays as expressive — it becomes perfectly stable and strictly less expressive.
- [ ] The network can still fit any continuous function, just more slowly — it can only ever fit affine functions, no matter how long you train.
