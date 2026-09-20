---
id: ai.theory.loss-landscapes.local-minima-are-not-the-problem
topic: ai.theory.loss-landscapes
format: idea
difficulty: 4
language: en
weight: heavy
angles: [paradox, connection]
tags: [saddle-points, hessian-index, flat-minima, mode-connectivity, random-matrix]
hook: "For a point to be a local minimum, a million curvatures must all come out positive. The odds are poor."
sources:
  - {title: "Identifying and attacking the saddle point problem in high-dimensional non-convex optimization", author: "Dauphin, Pascanu, Gulcehre, Cho, Ganguli & Bengio", year: 2014, type: paper, url: "https://arxiv.org/abs/1406.2572"}
  - {title: "Sharp Minima Can Generalize For Deep Nets", author: "Dinh, Pascanu, Bengio & Bengio", year: 2017, type: paper, url: "https://arxiv.org/abs/1703.04933"}
  - {title: "Loss Surfaces, Mode Connectivity, and Fast Ensembling of DNNs", author: "Garipov, Izmailov, Podoprikhin, Vetrov & Wilson", year: 2018, type: paper, url: "https://arxiv.org/abs/1802.10026"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# In a million dimensions, getting stuck is not what goes wrong

The picture everyone carries is a hiker trapped in a small valley while the deep one waits over the ridge. It is the wrong picture, and the reason is a counting argument.

At a critical point of a loss in $d$ dimensions the Hessian has $d$ eigenvalues, and a local minimum needs *all* of them positive. If they behaved like independent coin flips that would happen with probability $2^{-d}$, and $d$ is in the millions. Almost every critical point is a saddle — downhill in some directions, uphill in others — and gradient descent eventually finds a way off.

Dauphin and colleagues made the argument with random matrix theory in 2014: the higher the loss at a critical point, the larger the fraction of negative curvature directions. High saddles are easy to leave. The minima you can actually reach all sit near the bottom, and they tend to be about equally good.

Which moves the question from "did I get stuck?" to "which of these equally good bottoms did I land in?".

## Rigor

At a critical point $\nabla L(\theta)=0$, classify by the **index**: the fraction of negative eigenvalues of $\nabla^{2}L(\theta)$. For a Gaussian random field on $\mathbb R^{d}$ — the model Dauphin et al. borrow from statistical physics — index and loss value are locked together: critical points of high index sit at high loss, and points near the global minimum have index near 0. Local minima with loss far above the global minimum are exponentially rare in $d$.

Two corrections this does *not* license. First, flatness is not reparameterisation invariant. Dinh et al. (2017) rescale a ReLU network's layers, $(W_1,W_2)\mapsto(\alpha W_1,\alpha^{-1}W_2)$, leaving the function identical while making Hessian eigenvalues arbitrarily large — so "flat minima generalise" cannot be true as stated about raw Hessian spectra. Second, the bottom is not a set of isolated points: Garipov et al. and Draxler et al. (both 2018) found that two independently trained networks are joined by a *curved* path of near-constant low loss. The straight segment between them crosses a barrier; a simple bend does not.

So the reachable minima form a connected, nearly flat region. Which is exactly why the interesting question migrated from optimisation to implicit bias — not whether you reach a bottom, but which part of one large bottom the optimiser drifts into.

## Recall
type: mcq
Q: Why are bad local minima rare in very high-dimensional loss landscapes?
- [x] A local minimum requires every one of millions of Hessian eigenvalues to be positive — critical points are overwhelmingly saddles, which gradient descent escapes.
- [ ] Because the loss is convex in practice — it is emphatically not; it has vast numbers of critical points.
- [ ] Because momentum carries the optimiser over barriers — momentum helps with speed, but the claim here is about the geometry of critical points themselves.
