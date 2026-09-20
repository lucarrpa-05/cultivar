---
id: ai.theory.vc-dimension.how-many-points-can-you-shatter
topic: ai.theory.vc-dimension
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, beautiful]
tags: [shattering, vc-dimension, half-planes, radon, capacity]
hook: "Three points in the plane: a line can produce all eight colourings. Four points: never all sixteen."
diagram: {file: ai/vc-shattering.svg, caption: "Three points can be split every possible way by a line; the alternating colouring of four points cannot be.", alt: "Left: three points with dashed lines separating them in different ways. Right: four points at the corners of a square, coloured alternately, with lines that fail to separate them."}
sources:
  - {title: "Vapnik–Chervonenkis dimension", type: wiki, url: "https://en.wikipedia.org/wiki/Vapnik%E2%80%93Chervonenkis_dimension"}
  - {title: "Radon's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Radon%27s_theorem"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The right way to measure capacity is a game played with points

Counting parameters as a measure of model power is a habit rather than a principle, and it breaks on the first example anyone tries. So Vapnik and Chervonenkis measured something else: how many points can your class of models label *any way you like*?

Put three points in the plane, not on a line, and consider all straight-line classifiers. There are eight ways to colour three points red or blue, and for each one there is a line with the reds on one side. The class **shatters** those three points.

Now four. Place them however you wish; there is always a colouring no line can produce — the alternating one, red-blue-red-blue around a square. Four is permanently out of reach.

So the capacity of linear classifiers in the plane is three. That number is the VC dimension: the size of the largest set you can label arbitrarily. A model with one parameter can have infinite VC dimension, and a model with a million can have a small one.

## Rigor

Let $\mathcal H$ be a class of functions $\mathcal X\to\{0,1\}$. For a finite $C=\{x_1,\dots,x_m\}$, the restriction of $\mathcal H$ to $C$ is

$$\mathcal H_C=\big\{\big(h(x_1),\dots,h(x_m)\big)\ :\ h\in\mathcal H\big\}\subseteq\{0,1\}^{m}.$$

$\mathcal H$ **shatters** $C$ when $\mathcal H_C=\{0,1\}^{m}$ — all $2^{m}$ labelings. The **VC dimension** is the largest $m$ for which *some* set of size $m$ is shattered, and $\infty$ if there is no largest.

Watch the quantifiers, which is where everyone slips: *some* set of size $d$ is shattered, *no* set of size $d+1$ is.

**Half-planes in $\mathbb R^{2}$ have VC dimension 3.** Lower bound: three points in general position are shattered, one line per colouring. Upper bound: Radon's theorem says any four points in $\mathbb R^{2}$ can be split into two subsets whose convex hulls intersect — a line realising that colouring would have to put a point on both sides of itself. In general, half-spaces in $\mathbb R^{d}$ have VC dimension $d+1$; here, and essentially only here, capacity and parameter count happen to agree.

Why this is the right notion: it is exactly the quantity that keeps the PAC bound alive when the class is infinite.

## Recall
type: mcq
Q: What does "the VC dimension of lines in the plane is 3" mean, precisely?
- [x] Some set of three points admits all eight colourings by lines, and no set of four admits all sixteen — capacity is about arbitrary labelings.
- [ ] Every set of three points can be shattered — three collinear points cannot be; the definition only asks that *some* set of size three works.
- [ ] A line in the plane has three parameters — it does, but that agreement is a coincidence of half-spaces, not the definition.
