---
id: math.optimization.gradient-descent.steepest-is-not-fastest
topic: math.optimization.gradient-descent
format: idea
difficulty: 4
language: en
weight: medium
angles: [tool, mistake]
tags: [condition-number, zigzag, momentum, newton-method, preconditioning]
hook: "In a narrow valley the gradient points at the wall, not at the exit. That one fact explains momentum, Adam and preconditioning."
sources:
  - {title: "Gradient descent", type: wiki, url: "https://en.wikipedia.org/wiki/Gradient_descent"}
  - {title: "Condition number", type: wiki, url: "https://en.wikipedia.org/wiki/Condition_number"}
  - {title: "Newton method in optimization", type: wiki, url: "https://en.wikipedia.org/wiki/Newton%27s_method_in_optimization"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The steepest direction is usually the wrong one

Picture a valley that is long and narrow: gentle along its floor, steep across it. Stand on the slope and ask which way is steepest. The answer is almost straight at the opposite wall, because that is where the ground drops fastest — and the exit is ninety degrees away, down the floor.

Gradient descent takes that advice literally, so it zigzags. It crosses and recrosses the valley, inching along the floor, and the narrower the valley the worse the ratio of progress to effort.

The number that measures the narrowness is the condition number: the ratio of the largest to the smallest curvature. Everything expensive about training is downstream of it, and every standard fix is an attempt to shrink it. Momentum lets the crossings cancel and the along-floor motion accumulate. Preconditioning and Newton's method rescale the axes until the valley is a bowl. Adam does a cheap per-coordinate version of the same rescaling.

Underneath all of them is one uncomfortable fact: "steepest" depends on how you measure distance.

## Rigor

Take $f(x)=\tfrac12x^{\top}Ax$ with $A\succ0$ and eigenvalues in $[m,L]$; set $\kappa=L/m$.

With fixed step $1/L$, gradient descent satisfies
$$f(x_k)-f^{*}\ \le\ \left(1-\frac{1}{\kappa}\right)^{k}\left(f(x_0)-f^{*}\right),$$
so reaching accuracy $\varepsilon$ takes $O(\kappa\log\frac1\varepsilon)$ steps. With exact line search the contraction factor is $\left(\frac{\kappa-1}{\kappa+1}\right)^{2}$ per step — the zigzag, quantified: at $\kappa=100$ each step removes about $4\%$ of the error.

**Momentum.** Nesterov's accelerated method improves this to $O(\sqrt{\kappa}\log\frac1\varepsilon)$, which is optimal for first-order methods on this class. Going from $\kappa$ to $\sqrt{\kappa}$ at $\kappa=10^{4}$ is a hundredfold saving.

**Newton.** The step $-\left(\nabla^{2}f\right)^{-1}\nabla f$ is steepest descent in the metric $\|v\|_{\nabla^2 f}^2=v^{\top}\nabla^{2}f\,v$. In that metric the valley *is* a bowl and $\kappa=1$. Hence the punchline: the gradient is not a direction in space, it is a direction relative to an inner product, and choosing a better inner product is what all the accelerations are doing.

## Recall
type: mcq
Q: Why does gradient descent zigzag in a narrow valley?
- [x] The steepest direction points across the valley, not along it — so consecutive steps largely cancel each other.
- [ ] The step size is too large — shrinking the step removes the overshoot but makes the crawl along the floor even slower.
- [ ] The function is not convex there — a perfectly convex quadratic with a large condition number zigzags just as badly.
