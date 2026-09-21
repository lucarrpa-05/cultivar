---
id: math.history.islamic-golden-age.khayyam-cut-two-conics
topic: math.history.islamic-golden-age
topics: [math.algebra.polynomials-factorization]
format: idea
difficulty: 3
language: en
weight: medium
angles: [beautiful, tool, history]
tags: [omar-khayyam, cubic-equations, conic-sections, geometric-algebra]
hook: "Khayyam located cubic roots with conic sections, centuries before algebraists found a formula."
sources:
  - {title: "Omar Khayyam", type: wiki, url: "https://en.wikipedia.org/wiki/Omar_Khayyam"}
  - {title: "Cubic equation", type: wiki, url: "https://en.wikipedia.org/wiki/Cubic_equation"}
  - {title: "Umar Khayyam", type: encyclopedia, url: "https://plato.stanford.edu/entries/umar-khayyam/"}
dates: {written: 2026-09-20}
author: author-math-fnp-1
reviewed: {by: reviewer-math-history-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Removed unsupported exact 1079 completion and overbroad every-cubic claim; narrowed ruler-and-compass argument to rational coefficients."}
---

# Khayyam solved cubics by crossing curves

In the eleventh century, Omar Khayyam classified fourteen irreducible forms of cubic equation with positive coefficients. Instead of giving a formula for their roots, he built a geometric construction for each: find where two suitable conic sections meet, then read the root as a length.

For one form, a parabola crossing a circle does the job. Move either curve and the crossing moves with the answer. Khayyam knew this was not the arithmetical rule he wanted; he suggested that someone after him might find one. Italian algebraists found formulas for cubics in the sixteenth century. His distinction still matters: locating a solution geometrically and expressing it by arithmetic operations are different achievements.

## Rigor

**The construction, in one case.** Take $x^{3}+bx=c$ with $b,c>0$, and write $b=p^{2}$. Khayyam intersects the parabola
$$x^{2}=py$$
with the circle through the origin whose diameter is the segment of length $c/p^{2}$ along the $x$-axis, that is $y^{2}=x\left(\frac{c}{p^{2}}-x\right)$.

Substituting $y=x^{2}/p$ into the circle and dividing by $x\neq0$:
$$\frac{x^{4}}{p^{2}}=\frac{cx}{p^{2}}-x^{2}\ \Longrightarrow\ \frac{x^{3}}{p^{2}}=\frac{c}{p^{2}}-x\ \Longrightarrow\ x^{3}+p^{2}x=c .$$
The abscissa of the intersection is the root. Thirteen more cases, thirteen more pairs of curves.

**Why conics help.** For an irreducible cubic with rational coefficients, a root has degree 3 over $\mathbb{Q}$. A length constructed by straightedge and compass has degree a power of 2, so those tools cannot generally produce such a root. Intersecting conic sections is a stronger geometric operation. Khayyam used it without the field theory that would explain the obstruction centuries later.

## Recall
type: mcq
Q: Why can't an irreducible cubic's root be built with straightedge and compass?
- [x] Constructible numbers have degree a power of 2 over $\mathbb{Q}$ — an irreducible cubic root has degree 3 instead.
- [ ] Because the construction would need negative lengths — Khayyam's positive-coefficient classification is a separate historical convention.
- [ ] Because cubics can have three real roots — the number of roots is irrelevant; even a single real root can be unconstructible.
- [ ] Because π and $e$ are transcendental — transcendence is not the obstruction; the roots here are algebraic of degree 3.
