---
id: math.optimization.gradient-descent.the-oldest-algorithm-in-machine-learning
topic: math.optimization.gradient-descent
format: fact
difficulty: 2
language: en
weight: light
angles: [origin, history]
tags: [cauchy, steepest-descent, orbit-fitting, astronomy, comptes-rendus]
hook: "The training loop at the centre of modern machine learning was written down in a two-page note about fitting orbits."
sources:
  - {title: "Gradient descent", type: wiki, url: "https://en.wikipedia.org/wiki/Gradient_descent"}
  - {title: "Augustin-Louis Cauchy", type: wiki, url: "https://en.wikipedia.org/wiki/Augustin-Louis_Cauchy"}
dates: {written: 2026-09-19, event: 1847-10-18}
rigor: none
rigorNote: "a fact card; the convergence analysis is on the steepest-descent card"
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The oldest algorithm in machine learning is from 1847

On 18 October 1847 Cauchy read a two-page note to the French Academy: *Méthode générale pour la résolution des systèmes d'équations simultanées*. The problem was astronomy — fitting orbits to observations gave systems too large to solve exactly.

His proposal: evaluate the gradient, step in the opposite direction, repeat. That is the training loop, a century before there was anything to train.

## Recall
type: reveal
Q: What problem was gradient descent originally invented for?
A: Solving large systems of equations from astronomical observations. Cauchy wanted an approximate method for orbit-fitting problems that were too big to attack exactly, and stepping downhill along the gradient was his answer.
