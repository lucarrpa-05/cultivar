---
id: math.analysis.complex.differentiable-once-means-forever
topic: math.analysis.complex
topics: [math.analysis.differentiation]
format: idea
difficulty: 3
language: en
weight: medium
angles: [weird, beautiful]
tags: [holomorphic, cauchy-integral-formula, analytic, identity-theorem, rigidity]
hook: "On the real line, one derivative buys you almost nothing. In the complex plane, one derivative buys you all of them, plus a Taylor series."
sources:
  - {title: "Holomorphic function", type: wiki, url: "https://en.wikipedia.org/wiki/Holomorphic_function"}
  - {title: "Cauchy's integral formula", type: wiki, url: "https://en.wikipedia.org/wiki/Cauchy%27s_integral_formula"}
  - {title: "Identity theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Identity_theorem"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# One complex derivative buys you all of them

On the real line, differentiable once is nearly worthless. The derivative need not be continuous, let alone differentiable; there are functions with a first derivative and no second one anywhere useful, and a continuous function usually has no derivative at all.

Move the same definition into the plane and it becomes tyrannical. If $f$ has a complex derivative at every point of an open set — the limit of $\frac{f(z+h)-f(z)}{h}$ exists as $h\to0$ — then $f$ has derivatives of every order, and equals its own Taylor series on every disc inside the set.

The reason is hiding in "as $h\to0$". On the line, $h$ comes from two directions. In the plane it comes from all of them, and demanding that infinitely many directional limits agree is an enormous constraint.

The consequences get worse. Knowing $f$ on any tiny arc pins it down everywhere it is defined. A holomorphic function has no private life.

## Rigor

**Cauchy-Goursat.** If $f$ is holomorphic on a simply connected open $U$, then $\oint_\gamma f=0$ for every closed $\gamma$ in $U$.

**Cauchy integral formula.** For $z$ inside a circle $\gamma\subset U$,
$$f(z)=\frac{1}{2\pi i}\oint_{\gamma}\frac{f(w)}{w-z}\,dw .$$

Everything follows from differentiating under the integral sign. The integrand is as smooth in $z$ as $\frac{1}{w-z}$, which is infinitely differentiable, so
$$f^{(n)}(z)=\frac{n!}{2\pi i}\oint_{\gamma}\frac{f(w)}{(w-z)^{n+1}}\,dw ,$$
and expanding $\frac1{w-z}$ as a geometric series in $(z-z_0)$ gives a convergent power series on any disc inside $U$. Holomorphic and analytic are the same word.

**Identity theorem.** If $f,g$ are holomorphic on a connected $U$ and agree on a set with a limit point in $U$, they agree on all of $U$ — because the zeros of a non-zero analytic function are isolated. That is the "no private life": the values on a tiny arc already contain everything.

## Recall
type: mcq
Q: Why is complex differentiability so much stronger than real differentiability?
- [x] The difference quotient must converge to the same limit from every direction in the plane — the Cauchy-Riemann equations are that constraint written out.
- [ ] Because complex functions are always continuous — continuity is implied by differentiability in both settings and is not the difference.
- [ ] Because the complex numbers are complete — the reals are complete too, and real differentiability still buys almost nothing.
