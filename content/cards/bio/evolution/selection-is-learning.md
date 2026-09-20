---
id: bio.evolution.natural-selection.selection-is-learning
topic: bio.evolution.natural-selection
topics: [ai.ml-basics.what-is-learning]
format: callback
difficulty: 2
language: en
weight: heavy
angles: [connection, tool]
tags: [natural-selection, machine-learning, replicator, bayes, zeroth-order]
callback: {from: bio.evolution.natural-selection, to: ai.ml-basics.what-is-learning}
hook: "Variation, heredity, differential success. Rename the three and you have written down what 'learning' means in machine learning."
sources:
  - {title: "The Replicator Equation as an Inference Dynamic, arXiv:0911.1763", author: "Marc Harper", year: 2009, type: paper, url: "https://arxiv.org/abs/0911.1763"}
  - {title: "Evolution Strategies as a Scalable Alternative to Reinforcement Learning, arXiv:1703.03864", author: "Tim Salimans, Jonathan Ho, Xi Chen, Szymon Sidor, Ilya Sutskever", year: 2017, type: paper, url: "https://arxiv.org/abs/1703.03864"}
  - {title: "Replicator equation", type: wiki, url: "https://en.wikipedia.org/wiki/Replicator_equation"}
dates: {written: 2026-09-19}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember Darwin's three facts? That is a definition of learning

Variation, heredity, differential success. You met those as an argument about finches. They are also, word for word, the specification of an optimisation procedure, and the machine-learning version renames rather than rebuilds them.

Mutation and recombination become proposals for new parameters. Fitness becomes the negative of a loss. A generation becomes a training step. The population becomes the set of candidates currently in play. Both procedures keep what scores well and discard the rest; neither needs a designer, a written-down goal, or any understanding of *why* the winner won. That is the whole reason a textbook can define learning as "performance on a task improves with experience" without saying who is doing the improving.

Now the difference, which is the entire practical story. Gradient descent knows which direction to move, because it differentiates the loss. Evolution cannot differentiate anything. It can only evaluate. That makes selection a zeroth-order method, and zeroth-order methods pay for their generality.

## Rigor

Take the discrete replicator update on a population of types with frequencies $x_i$ and fitnesses $f_i$:

$$x_i' \;=\; \frac{x_i f_i}{\sum_j x_j f_j}.$$

That is Bayes' rule. Read $x_i$ as a prior over hypotheses, $f_i$ as the likelihood of the observed data under hypothesis $i$, and $x_i'$ as the posterior. A population's frequency vector and a Bayesian's belief vector obey the same recursion; Harper (2009) develops the correspondence through information geometry. Selection is inference, with dying as the update rule.

The cost of having no gradient is also exact. Evolution strategies estimate the gradient of a smoothed objective by sampling:

$$\nabla_\theta\,\mathbb{E}_{\varepsilon\sim\mathcal{N}(0,I)}\big[f(\theta+\sigma\varepsilon)\big] \;=\; \frac{1}{\sigma}\,\mathbb{E}_{\varepsilon}\big[f(\theta+\sigma\varepsilon)\,\varepsilon\big].$$

Every evaluation contributes one scalar, so the estimator's variance grows with dimension, whereas backpropagation returns all $d$ partial derivatives for roughly the cost of one forward pass. Salimans et al. (2017) showed the trade is worth making when you have thousands of machines and no gradient — which is exactly evolution's situation, run for four billion years on a very large cluster.

## Recall
type: mcq
Q: What is the sharpest difference between natural selection and gradient descent?
- [x] Selection only evaluates candidates, while gradient descent differentiates the objective and so knows which direction to move — one scalar per trial versus a full gradient.
- [ ] Selection has no objective function, while learning does — fitness is an objective function; nobody has to write it down for it to act as one.
- [ ] Selection is random and gradient descent is deterministic — mutation is random, but stochastic gradient descent is too; the difference is the derivative.
- [ ] Selection works on populations, learning on a single model — population methods are standard in optimisation, and evolution strategies use them deliberately.
