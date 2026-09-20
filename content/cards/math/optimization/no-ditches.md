---
id: math.optimization.convexity.no-ditches
topic: math.optimization.convexity
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, beautiful]
tags: [convexity, local-minimum, global-minimum, epigraph, first-order-condition]
hook: "A local minimum tells you nothing about the global one. Convexity is exactly the condition that makes local news global news."
sources:
  - {title: "Convex function", type: wiki, url: "https://en.wikipedia.org/wiki/Convex_function"}
  - {title: "Convex Optimization", author: "Stephen Boyd and Lieven Vandenberghe", year: 2004, type: book, url: "https://web.stanford.edu/~boyd/cvxbook/"}
  - {title: "Convex optimization", type: wiki, url: "https://en.wikipedia.org/wiki/Convex_optimization"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The one shape with no ditches

Optimization is mostly a search carried out in the dark. You feel the slope under your feet and nothing else. When the ground is flat in every direction you stop — and in general that tells you nothing, because you may be standing in a shallow ditch two metres from a canyon.

Convexity abolishes ditches. Draw a straight line between any two points on the graph; if the graph never rises above that line, the function is convex, and then every flat spot is the bottom of the whole thing.

That single fact is why convex problems count as solved and everything else does not. A blind local procedure — gradient descent, Newton, an interior-point method — becomes a globally correct algorithm with a certificate you can check. Uniqueness, duality, stability of the answer in the data: all of it comes from the same picture.

Convexity is also rare. Almost nothing you care about is convex, which is the interesting half of the story.

## Rigor

$f$ is **convex** on a convex set $C$ if
$$f(\lambda x+(1-\lambda)y)\ \le\ \lambda f(x)+(1-\lambda)f(y)\qquad \forall x,y\in C,\ \lambda\in[0,1],$$
equivalently if its epigraph $\{(x,t):t\ge f(x)\}$ is a convex set. For differentiable $f$ this is equivalent to the **first-order condition**
$$f(y)\ \ge\ f(x)+\nabla f(x)^{\top}(y-x),$$
which says the tangent plane lies below the graph everywhere; for twice differentiable $f$, to $\nabla^{2}f\succeq0$.

**Local implies global.** Suppose $\nabla f(x^{*})=0$. For any $y\in C$ the first-order condition gives $f(y)\ge f(x^{*})+0=f(x^{*})$. One line, no search. Strict convexity upgrades it to uniqueness of the minimiser.

The "no ditches" picture is the first-order condition itself: a ditch is a place where the tangent plane at your feet rises above the graph somewhere else, and convexity forbids exactly that.

## Recall
type: mcq
Q: Why does convexity make gradient descent a globally correct method?
- [x] Every stationary point is a global minimum, because the tangent plane lies below the whole graph — stopping at a flat point is stopping at the answer.
- [ ] Because convex functions have exactly one stationary point — a convex function can have a flat valley of minimisers, all of them global.
- [ ] Because gradient descent converges faster on convex functions — speed is a separate matter, governed by the condition number.
