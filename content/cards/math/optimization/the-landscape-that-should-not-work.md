---
id: math.optimization.convexity.the-landscape-that-should-not-work
topic: math.optimization.convexity
topics: [ai.theory.loss-landscapes]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, paradox]
tags: [loss-landscape, non-convex, saddle-points, mode-connectivity, permutation-symmetry]
hook: "Deep networks violate every hypothesis that makes optimization safe, and gradient descent works anyway. The reasons surprise."
callback: {from: math.optimization.convexity, to: ai.theory.loss-landscapes}
sources:
  - {title: "Identifying and attacking the saddle point problem in high-dimensional non-convex optimization", author: "Dauphin et al.", year: 2014, type: paper, url: "https://arxiv.org/abs/1406.2572"}
  - {title: "Loss Surfaces, Mode Connectivity, and Fast Ensembling of DNNs", author: "Garipov et al.", year: 2018, type: paper, url: "https://arxiv.org/abs/1802.10026"}
  - {title: "Essentially No Barriers in Neural Network Energy Landscape", author: "Draxler et al.", year: 2018, type: paper, url: "https://arxiv.org/abs/1803.00885"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember "no ditches"? Deep learning is nothing but ditches

Convexity bought you one guarantee: a flat point is the answer. Training a neural network throws that away in the most flagrant manner available.

Permute the hidden units of a layer with $n$ neurons and you get the same function with different parameters: $n$ factorial copies of every minimum, before you count sign flips and rescalings. The landscape is not merely non-convex, it is tiled with exact symmetric duplicates. Classical optimization says a blind local method is hopeless here.

It is not hopeless, and the current explanation has two parts, both empirical rather than proved. First, the flat points you actually meet in very high dimension are mostly saddles: to be a local minimum, every curvature direction has to agree, and with millions of directions that is a strong coincidence unless the loss is already low. Second, the good minima are not isolated — you can often walk from one trained network to another along a curved path where the loss never rises.

The guarantee changes shape. Not "no ditches", but "the ditches are shallow, and they are connected".

## Rigor

For parameters $\theta\in\mathbb{R}^{p}$ with loss $L$, a critical point has $\nabla L=0$ and is classified by its **index**, the fraction of negative eigenvalues of $\nabla^{2}L(\theta)$. Dauphin and coauthors (2014) argued from random-matrix heuristics that index and loss are tightly coupled in high dimension: critical points at high loss are overwhelmingly saddles, and low index appears mainly where the loss is already small. Gradient descent escapes saddles; it is bad local minima that would trap it, and those sit where you were headed anyway.

**Mode connectivity.** Garipov and coauthors, and independently Draxler and coauthors, both in 2018, found for trained networks $\theta_A,\theta_B$ a continuous path $\gamma$ with $\gamma(0)=\theta_A$, $\gamma(1)=\theta_B$ and $L(\gamma(t))$ essentially constant — even though the straight segment between them crosses a high barrier. The good solutions behave like a connected low-loss set rather than a scatter of isolated pits.

Label this honestly: experiments plus heuristics, not the one-line theorem convexity hands you.

## Recall
type: mcq
Q: Why are high-loss flat points in a huge network usually saddles rather than local minima?
- [x] A minimum needs every one of millions of curvature directions to be non-negative — a coincidence that gets rarer as dimension grows.
- [ ] Because the loss is convex near initialisation — it is non-convex essentially everywhere, including there.
- [ ] Because saddles are easy for gradient descent to escape — true, but that is why it matters, not why they are common.
