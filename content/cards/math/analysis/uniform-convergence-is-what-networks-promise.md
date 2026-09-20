---
id: math.analysis.uniform-convergence.what-networks-promise
topic: math.analysis.uniform-convergence
topics: [ai.neural-nets.activations-depth]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, tool]
tags: [universal-approximation, sup-norm, cybenko, density, neural-networks]
hook: "The slogan is that a neural network can approximate any function. The theorem behind it is a sentence about uniform convergence."
callback: {from: math.analysis.uniform-convergence, to: ai.neural-nets.activations-depth}
sources:
  - {title: "Universal approximation theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Universal_approximation_theorem"}
  - {title: "Approximation by superpositions of a sigmoidal function", author: "George Cybenko", year: 1989, type: paper, url: "https://doi.org/10.1007/BF02551274"}
  - {title: "Stone-Weierstrass theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Stone%E2%80%93Weierstrass_theorem"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember uniform convergence? It is what networks actually promise

Uniform convergence was the repair to Cauchy's broken theorem: not "close at each point" but "close everywhere at once, at a rate you can quote in advance". That exact distinction is the whole content of the most quoted theorem in deep learning.

"A neural network can approximate any function" is a slogan. The theorem says: fix a compact set $K$, a continuous target $f$, and a tolerance $\varepsilon$. Then some network with one hidden layer stays within $\varepsilon$ of $f$ *at every point of $K$ simultaneously*. That is the sup norm — uniform, not pointwise.

Read it again for what it withholds. It does not say how many neurons. It does not say you can find them by training. It says nothing outside $K$, and nothing about derivatives. It is a statement that the target is in the closure of a set, and closures are famously non-constructive.

The same word, doing the same work, ninety years later.

## Rigor

**Cybenko (1989).** Let $\sigma$ be continuous, bounded and non-constant with $\sigma(t)\to 0$ as $t\to-\infty$ and $\to 1$ as $t\to+\infty$. Then finite sums
$$G(x)=\sum_{j=1}^{N}\alpha_j\,\sigma\!\left(w_j^{\top}x+b_j\right)$$
are dense in $C(K)$ with the norm $\|g\|_{\infty}=\sup_{x\in K}|g(x)|$, for any compact $K\subset\mathbb{R}^{d}$. Hornik, Stinchcombe and White proved the same for a wide class of activations the same year; Leshno and coauthors showed in 1993 that the sharp condition is exactly that $\sigma$ be non-polynomial.

Density in the sup norm *is* uniform approximation: for every $\varepsilon$ there is a $G$ with $\sup_K|f-G|<\varepsilon$. Compare Stone-Weierstrass, which says the polynomials are dense in $C(K)$ for the same reason and with the same silence about degree. A network is a different dense family, not a different kind of guarantee.

## Recall
type: mcq
Q: What does the universal approximation theorem actually guarantee?
- [x] For each compact set and tolerance, some network is within that tolerance at every point of the set at once — density in the sup norm.
- [ ] That training will find such a network — the theorem is about existence in a closure and says nothing about optimization.
- [ ] That the network matches the function everywhere on $\mathbb{R}^d$ — the guarantee is only on a compact set; outside it, nothing is claimed.
