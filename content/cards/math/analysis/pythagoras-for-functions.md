---
id: math.analysis.hilbert-functional.pythagoras-for-functions
topic: math.analysis.hilbert-functional
topics: [math.analysis.fourier]
format: idea
difficulty: 4
language: en
weight: medium
angles: [connection, beautiful]
tags: [hilbert-space, l2, orthonormal-basis, parseval, fourier-coefficients]
hook: "Fourier coefficients are not a trick. They are coordinates, computed the way you have always computed coordinates: project."
sources:
  - {title: "Hilbert space", type: wiki, url: "https://en.wikipedia.org/wiki/Hilbert_space"}
  - {title: "Parseval's identity", type: wiki, url: "https://en.wikipedia.org/wiki/Parseval%27s_identity"}
  - {title: "Orthonormal basis", type: wiki, url: "https://en.wikipedia.org/wiki/Orthonormal_basis"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Pythagoras still works when the triangle has infinite sides

Put an inner product on functions: $\langle f,g\rangle=\int f\bar g$. Everything you know about vectors survives. Length is $\sqrt{\langle f,f\rangle}$. Perpendicular means the integral of the product is zero. Projection onto a direction is the same formula it always was.

Now notice that $\sin$ and $\cos$ of different frequencies are perpendicular in this sense — their products integrate to zero over a period. They are not merely a convenient family. They are a set of orthogonal axes.

So the Fourier coefficient $\hat f(n)$ is nothing exotic: it is the component of $f$ along the $n$-th axis, $\langle f,e_n\rangle$, the same projection you take in $\mathbb{R}^3$. And the identity $\|f\|^2=\sum|\hat f(n)|^2$, which looks like a miracle when it appears in a course on heat flow, is Pythagoras with infinitely many legs.

One thing genuinely breaks in infinite dimensions, and it is not a technicality.

## Rigor

$L^{2}[-\pi,\pi]$ with $\langle f,g\rangle=\frac{1}{2\pi}\int_{-\pi}^{\pi}f\bar g$ and $e_n(x)=e^{inx}$ is a Hilbert space: an inner-product space that is complete, by Riesz-Fischer.

**Bessel** holds in any inner-product space: $\sum_n|\langle f,e_n\rangle|^{2}\le\|f\|^{2}$, because the difference $f-\sum_{|n|\le N}\langle f,e_n\rangle e_n$ is orthogonal to the span and so has non-negative norm.

**Parseval** is the upgrade to equality, $\sum_n|\langle f,e_n\rangle|^{2}=\|f\|^{2}$, and it holds precisely when $\{e_n\}$ is *complete* — no non-zero function is orthogonal to all of them.

Completeness of the space is what makes "basis" behave. Riesz-Fischer says the coordinate map $f\mapsto(\hat f(n))$ is an isometric isomorphism onto $\ell^{2}$: every square-summable sequence is the coefficient sequence of an actual function. In finite dimensions that is free. Here it is a theorem, and it is the theorem that makes Fourier analysis a change of basis rather than a formal manipulation.

What breaks: no finite subset spans, so compactness of the unit ball is gone — and with it the usual proof that a minimum is attained.

## Recall
type: mcq
Q: What is Parseval's identity, structurally?
- [x] The Pythagorean theorem in an orthonormal basis — the squared length equals the sum of squared coordinates.
- [ ] A convergence test for Fourier series — it says nothing about pointwise convergence, only about the $L^2$ norm.
- [ ] A special property of sines and cosines — it holds for any complete orthonormal system in any Hilbert space.
