---
id: math.topology.continuity-homeomorphism.the-coffee-cup-problem
topic: math.topology.continuity-homeomorphism
topics: [math.topology.knots]
format: idea
difficulty: 2
language: en
weight: medium
angles: [mistake, connection]
tags: [homeomorphism, coffee-cup, ambient-isotopy, trefoil]
hook: "The mug turning into a donut is true, and it teaches three wrong things about what homeomorphism means."
sources:
  - {title: "Homeomorphism", type: wiki, url: "https://en.wikipedia.org/wiki/Homeomorphism"}
  - {title: "Ambient isotopy", type: wiki, url: "https://en.wikipedia.org/wiki/Ambient_isotopy"}
  - {title: "Knot theory", type: wiki, url: "https://en.wikipedia.org/wiki/Knot_theory"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The coffee cup is a bad first lesson

The mug morphing into a donut is the one image everybody has seen. The statement is true — mug and torus are homeomorphic — and the animation quietly teaches three false things.

It suggests the shapes have to live somewhere, in a room, in three dimensions. They do not: a homeomorphism is a bijection between two spaces that is continuous both ways, and no ambient room appears anywhere in that sentence.

It suggests you may never cut. You may. Cut a circle open, then glue it back matching every point to where it came from, and the round trip is a homeomorphism. What you may not do is leave the cut open.

And the expensive one: it suggests knottedness is topological. Every knotted loop in space is homeomorphic to a plain circle, trefoil included. Knottedness is not a property of the curve. It is a property of how the curve sits.

So what is the picture actually showing?

## Rigor

A **homeomorphism** is a bijection $f : X \to Y$ with $f$ and $f^{-1}$ both continuous. No ambient space occurs in the definition.

An **ambient isotopy** of $\mathbb{R}^3$ is a continuous $H : \mathbb{R}^3 \times [0,1] \to \mathbb{R}^3$ with $H_0 = \mathrm{id}$ and every $H_t$ a homeomorphism; two subsets are ambiently isotopic when some $H_1$ carries one onto the other. *That* is the rubber-sheet animation, and it is strictly stronger than homeomorphism of the subsets themselves.

The trefoil $K \subset \mathbb{R}^3$ is homeomorphic to $S^1$ — just parametrise it — yet no ambient isotopy of $\mathbb{R}^3$ takes $K$ to a round circle. What separates them is not $K$ but its complement: $\pi_1(\mathbb{R}^3 \setminus K)$ is non-abelian for the trefoil and $\mathbb{Z}$ for the unknot.

Mug and donut happen to be homeomorphic *and* ambiently isotopic. That coincidence is exactly what makes the picture misleading.

## Recall
type: mcq
Q: A trefoil knot and a round circle sitting in $\mathbb{R}^3$ — what is true of them?
- [x] Homeomorphic as spaces, but not ambiently isotopic — knottedness lives in how the curve sits in space, not in the curve.
- [ ] Neither homeomorphic nor ambiently isotopic — homeomorphism compares the curves alone, and every tame knot is just a circle.
- [ ] Both, since stretching can untie any knot — untying needs a cut, and no ambient isotopy is allowed one.
