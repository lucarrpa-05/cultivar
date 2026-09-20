---
id: ai.neural-nets.activations-depth.any-function-if-you-are-wide-enough
topic: ai.neural-nets.activations-depth
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [universal-approximation, uniform-convergence, cybenko, hornik, density]
callback: {from: math.analysis.uniform-convergence, to: ai.neural-nets.activations-depth}
prerequisites: [math.analysis.uniform-convergence, ai.neural-nets.perceptron-mlp]
hook: "One hidden layer can approximate any continuous function on a box. The theorem says nothing about how wide, and that is the point."
sources:
  - {title: "Universal approximation theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Universal_approximation_theorem"}
  - {title: "Approximation by superpositions of a sigmoidal function", author: "George Cybenko", year: 1989, type: paper, url: "https://doi.org/10.1007/BF02551274"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember uniform convergence? It is what "universal approximation" means

The distinction you fought for — pointwise convergence is cheap, uniform convergence is the one with teeth, because it controls the worst point simultaneously — is exactly the distinction the universal approximation theorem is stated in.

Cybenko proved it in 1989: a network with a single hidden layer of sigmoidal units can come uniformly within $\varepsilon$ of any continuous function on a compact box. Not "close on average", not "close at each point eventually" — close *everywhere at once*, which is precisely the sup-norm statement. His proof is not constructive: it goes through the Hahn–Banach and Riesz representation theorems, showing that if the network family were not dense, some nonzero measure would annihilate every sigmoid, and that cannot happen.

Hornik sharpened the moral in 1991. The magic is not in the sigmoid. It is the multilayer feedforward architecture; any reasonable non-polynomial activation does the job.

Which leaves the question of what the theorem actually buys you.

## Rigor

**Statement (Cybenko 1989).** For $\sigma$ continuous and sigmoidal, finite sums

$$G(x) = \sum_{j=1}^{N} \alpha_j\, \sigma\!\left(y_j^{\top}x + \theta_j\right)$$

are dense in $C([0,1]^n)$ with respect to the uniform norm: for every $f \in C([0,1]^n)$ and every $\varepsilon > 0$ there is such a $G$ with $\sup_{x\in[0,1]^n}|f(x)-G(x)| < \varepsilon$.

Read the quantifiers carefully and the theorem deflates in a useful way. $N$ appears *after* $\varepsilon$: the width is allowed to depend on the function and the tolerance, with no bound whatsoever. Approximation on a compact set in sup norm is exactly the setting where the Stone–Weierstrass theorem says polynomials work too — and nobody proposes fitting the world with degree-$10^{6}$ polynomials.

So universality is a statement about the closure of a function class, and it says nothing about three things that decide whether deep learning works: how many units you need, whether gradient descent can find them, and whether the fit generalises off the training set. Hornik's 1991 refinement makes that sharper by removing the activation from the story entirely — if everything is universal, universality cannot be the explanation.

## Recall
type: mcq
Q: What does the universal approximation theorem *not* tell you?
- [ ] That one hidden layer suffices in principle — that is exactly what it does tell you.
- [x] How many units you need, or whether training can find them. — the width depends on $f$ and $\varepsilon$ with no bound, and the proof is non-constructive.
- [ ] That the approximation is uniform on a compact set — it is a sup-norm statement, so that part is included.
