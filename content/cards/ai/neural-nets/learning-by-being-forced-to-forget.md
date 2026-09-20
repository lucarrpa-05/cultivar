---
id: ai.neural-nets.autoencoders-vae.learning-by-being-forced-to-forget
topic: ai.neural-nets.autoencoders-vae
format: idea
difficulty: 2
language: en
weight: medium
angles: [connection, tool]
tags: [autoencoder, bottleneck, pca, eckart-young, representation-learning]
hook: "Train a network to copy its input to its output. Absurd — until you make the middle too narrow for a copy to fit."
sources:
  - {title: "Autoencoder", type: wiki, url: "https://en.wikipedia.org/wiki/Autoencoder"}
  - {title: "Low-rank approximation", type: wiki, url: "https://en.wikipedia.org/wiki/Low-rank_approximation"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Learning by being forced to forget

An autoencoder is trained to reproduce its own input. As stated that is a ridiculous exercise — the identity function solves it perfectly and teaches nothing.

The whole idea is the pinch in the middle. Route the data through a layer with far fewer numbers than the input has, and copying becomes impossible. The network must decide what to throw away, and the only way to score well is to throw away the parts that are predictable from the rest. What survives the bottleneck is, by construction, what carried the information.

This is compression discovered rather than designed, and it connects to something you already know: with linear layers and squared error, the best possible autoencoder is principal component analysis. The nonlinear version is what you get when the "principal subspace" is allowed to curve with the data.

The honest limitation is that reconstruction is not relevance. An autoencoder preserves whatever is expensive to reconstruct — overall brightness, background texture — which may have nothing to do with the thing you care about.

## Rigor

Take a linear encoder $E \in \mathbb{R}^{k\times d}$ and decoder $D \in \mathbb{R}^{d\times k}$ with $k < d$, and minimise $\|X - DEX\|_F^2$ over the data matrix $X$. Since $\operatorname{rank}(DE) \le k$, this is exactly the best rank-$k$ approximation problem, and Eckart–Young says the optimum is the truncated SVD: $DE$ is the projection onto the span of the top $k$ left singular vectors of $X$.

Two consequences worth stating. The optimum recovers the principal *subspace*, not the individual components — for any invertible $A \in \mathbb{R}^{k\times k}$, replacing $(E,D)$ by $(AE, DA^{-1})$ gives the identical reconstruction, so the code is defined only up to a change of basis. And the loss equals $\sum_{i>k}\sigma_i^2$, the tail of the squared singular values: the bottleneck's cost is precisely the energy in the directions it discarded.

Adding nonlinearities buys curved manifolds instead of flat subspaces; it does not change the character of the objective, which still rewards reconstructing the dominant variation and not the meaningful one.

## Recall
type: mcq
Q: A linear autoencoder with squared loss and a $k$-dimensional bottleneck converges to what?
- [x] A projection onto the top-$k$ principal subspace — the same answer as PCA, by Eckart–Young. — the best rank-$k$ approximation is the truncated SVD.
- [ ] The identity map restricted to $k$ coordinates — dropping coordinates is a rank-$k$ map, but almost never the optimal one.
- [ ] The exact principal components, one per code unit — only the subspace is identified; any invertible mixing of the code reconstructs equally well.
