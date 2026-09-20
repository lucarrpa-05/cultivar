---
id: math.analysis.differentiation.the-curve-with-no-direction
topic: math.analysis.differentiation
topics: [math.analysis.uniform-convergence]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [weird, history]
tags: [weierstrass-function, nowhere-differentiable, fractal, m-test, pathology]
hook: "In 1872 Weierstrass exhibited a curve you can draw without lifting the pen and that has a tangent at no point at all."
sources:
  - {title: "Weierstrass function", type: wiki, url: "https://en.wikipedia.org/wiki/Weierstrass_function"}
  - {title: "Weierstrass's non-differentiable function (Transactions of the AMS)", author: "G. H. Hardy", year: 1916, type: paper, url: "https://doi.org/10.1090/S0002-9947-1916-1501044-1"}
  - {title: "Karl Weierstrass", type: wiki, url: "https://en.wikipedia.org/wiki/Karl_Weierstrass"}
dates: {written: 2026-09-19, event: 1872-07-18}
diagram: {file: math/weierstrass-three-zooms.svg, caption: "The same curve at one, ten and a hundred times magnification - the roughness never smooths out.", alt: "Three stacked jagged curves; each is a zoom into the one above it and looks just as jagged"}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The curve with no direction, anywhere

On 18 July 1872 Weierstrass read a paper to the Berlin Academy containing a function everyone had assumed could not exist: continuous at every point of the line, differentiable at none of them.

Until then, "continuous" and "has a tangent almost everywhere" were the same intuition. Ampère had published an attempted proof that a continuous function must be differentiable except at isolated corners. The picture in everyone's head was a wire: bend it, kink it, and between the kinks it still points somewhere.

Weierstrass's curve has no between. Zoom in anywhere, by any factor, and the same jaggedness comes back — the difference quotients never settle, they oscillate harder the closer you look. Bolzano had built such a function around 1831 and left it in a drawer; it surfaced in the 1920s, far too late to matter.

The damage was permanent and useful: after 1872, analysis stopped accepting a drawing as an argument. Here is the function.

## Rigor

$$W(x)=\sum_{n=0}^{\infty}a^{n}\cos\!\left(b^{n}\pi x\right),\qquad 0<a<1,\ b\ \text{odd integer},\ ab>1+\tfrac{3\pi}{2}.$$

**Continuity is cheap.** Each term is bounded by $a^{n}$ and $\sum a^{n}<\infty$, so the Weierstrass M-test gives uniform convergence, and a uniform limit of continuous functions is continuous. That is the whole "draw it without lifting the pen".

**Non-differentiability is the fight.** Term $n$ has amplitude $a^{n}$ and frequency $b^{n}$, so its slope has size $(ab)^{n}$. Since $ab>1$ those slopes grow geometrically and never cancel: at each $x$ one can pick points $x_m\to x$ from alternating sides whose difference quotients $\frac{W(x_m)-W(x)}{x_m-x}$ are unbounded. Uniform convergence controls the values and says nothing about the slopes, and that gap is the monster.

Hardy (1916) dropped the odd-integer requirement: $0<a<1$, $b>1$ and $ab\ge 1$ already suffice.

## Recall
type: mcq
Q: Why does uniform convergence fail to rescue differentiability here?
- [x] It controls how far the partial sums are from the limit, not how steep they are — the term slopes grow like $(ab)^n$.
- [ ] The series does not actually converge uniformly — it does, by the M-test, since $\sum a^n$ converges.
- [ ] Each term is non-differentiable — every term is a cosine, perfectly smooth; the pathology exists only in the limit.
