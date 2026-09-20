---
id: math.optimization.lagrange-duality.every-relaxation-is-a-certificate
topic: math.optimization.lagrange-duality
format: idea
difficulty: 4
language: en
weight: heavy
angles: [tool, beautiful]
tags: [weak-duality, strong-duality, slater, duality-gap, certificate]
hook: "You found a good solution. How would you ever prove nothing better exists, without checking everything else?"
sources:
  - {title: "Duality (optimization)", type: wiki, url: "https://en.wikipedia.org/wiki/Duality_(optimization)"}
  - {title: "Slater's condition", type: wiki, url: "https://en.wikipedia.org/wiki/Slater%27s_condition"}
  - {title: "Convex Optimization, ch. 5", author: "Stephen Boyd and Lieven Vandenberghe", year: 2004, type: book, url: "https://web.stanford.edu/~boyd/cvxbook/"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved, notes: "KKT necessity and sufficiency stated for the differentiable case."}
---

# Every relaxation hands you a certificate

Finding a good solution is the easy half. Proving that nothing better exists is the hard half, because "nothing better" is a claim about infinitely many points you never looked at.

Duality is the trick that makes the claim checkable. Take your constrained problem and let the constraints be violated — but charge a price for violating them. For any fixed set of prices, this relaxed problem is easier, and because it allows more than the original, its optimum can only be *lower*. So every choice of prices produces a lower bound on the true answer, with no work and no assumptions.

Now suppose you hold a solution worth 42 and a set of prices whose relaxed problem is also worth 42. The two squeeze together and both are proved optimal, on the spot. That pair is a certificate: a referee can verify it in minutes without repeating your search.

When the best lower bound actually reaches the true answer, the problem has no duality gap — and that, not the multipliers themselves, is what convexity buys.

## Rigor

Primal: minimise $f_0(x)$ subject to $f_i(x)\le0$, $h_j(x)=0$. Lagrangian and dual function:
$$\mathcal{L}(x,\lambda,\nu)=f_0(x)+\sum_i\lambda_if_i(x)+\sum_j\nu_jh_j(x),\qquad g(\lambda,\nu)=\inf_x\mathcal{L}(x,\lambda,\nu).$$

**Weak duality.** For $\lambda\ge0$ and any feasible $x$, the penalty terms are $\le0$, so $g(\lambda,\nu)\le\mathcal{L}(x,\lambda,\nu)\le f_0(x)$; taking the infimum over feasible $x$ gives $d^{*}=\sup g\le p^{*}$. This needs no convexity at all. And $g$ is a pointwise infimum of affine functions of $(\lambda,\nu)$, hence always concave — the dual is a convex problem even when the primal is hideous.

**Strong duality.** $p^{*}=d^{*}$ when the primal is convex and **Slater's condition** holds: some strictly feasible point exists with $f_i(x)<0$ for all non-affine $f_i$. Then the KKT conditions are, for differentiable $f_i$, necessary and sufficient, and complementary slackness $\lambda_i^{*}f_i(x^{*})=0$ says a constraint has a non-zero price only when it binds — the shadow-price reading again.

Without convexity the gap can be positive, and closing it is exactly what branch-and-bound and relaxation methods spend their time on.

## Recall
type: mcq
Q: Which part of duality survives when the problem is not convex?
- [x] Weak duality — every dual feasible point still lower-bounds the primal optimum, and the dual is still a concave maximisation.
- [ ] Strong duality — it can fail, leaving a positive duality gap; Slater's condition is what rules that out.
- [ ] Complementary slackness — it comes with strong duality and need not hold when there is a gap.
