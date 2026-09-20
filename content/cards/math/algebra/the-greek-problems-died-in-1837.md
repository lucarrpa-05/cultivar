---
id: math.algebra.fields-extensions.the-greek-problems-died-in-1837
topic: math.algebra.fields-extensions
format: idea
difficulty: 3
language: en
weight: medium
angles: [history, connection]
tags: [constructible-numbers, tower-law, angle-trisection, doubling-the-cube, wantzel]
hook: "Two thousand years of failed constructions, settled by one observation: compasses only ever hand you square roots."
sources:
  - {title: "Pierre Wantzel", type: wiki, url: "https://en.wikipedia.org/wiki/Pierre_Wantzel"}
  - {title: "Constructible number", type: wiki, url: "https://en.wikipedia.org/wiki/Constructible_number"}
  - {title: "Doubling the cube", type: wiki, url: "https://en.wikipedia.org/wiki/Doubling_the_cube"}
dates: {written: 2026-09-19, event: 1837-01-01}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The Greek problems died in 1837 and nobody noticed

Trisect an arbitrary angle with straightedge and compass. Build a cube of twice the volume. Two thousand years of attempts, and the reason they all fail takes about four lines once you think of a field as a vector space.

A construction can only ever intersect a line with a line, a line with a circle, or a circle with a circle. Solve those and the worst you get is a square root. So every constructible length sits in a field reached from the rationals by a chain of degree-2 steps, and the tower law says its degree over $\mathbb{Q}$ must be a power of 2.

Doubling the cube asks for $\sqrt[3]{2}$, whose minimal polynomial has degree 3. Three is not a power of two. Trisecting a 60° angle asks for $\cos 20°$, which satisfies an irreducible cubic. Same wall.

Pierre Wantzel published this in 1837, aged 23. It was almost entirely ignored — the first citation in a journal or textbook came roughly fifty years later, and the result was still being misattributed a century after that. He died in 1848, at 33.

## Rigor

Let $F\subseteq\mathbb{R}$ contain the coordinates of the points you already have. Intersecting two lines over $F$ stays in $F$; intersecting a line with a circle, or two circles, produces coordinates in $F(\sqrt d)$ for some $d\in F$. So a point is **constructible** iff it lies in a field $F_k$ at the top of a tower
$$\mathbb{Q}=F_0\subseteq F_1\subseteq\cdots\subseteq F_k,\qquad [F_{i+1}:F_i]=2 .$$
The tower law $[F_k:\mathbb{Q}]=\prod [F_{i+1}:F_i]$ then forces $[\mathbb{Q}(\alpha):\mathbb{Q}]$ to divide $2^k$, so it is a power of 2.

**Doubling.** $x^3-2$ is irreducible over $\mathbb{Q}$ (Eisenstein at 2), so $[\mathbb{Q}(\sqrt[3]2):\mathbb{Q}]=3$. Not a power of 2.

**Trisection.** From $\cos 3\theta=4\cos^3\theta-3\cos\theta$ with $3\theta=60°$, the number $c=\cos20°$ satisfies
$$8c^3-6c-1=0,$$
which has no rational root (test $\pm1,\pm\tfrac12,\pm\tfrac14,\pm\tfrac18$), hence is irreducible. Degree 3 again.

Note what is *not* proved: that no angle can be trisected. A 90° angle trisects easily. The claim is about the general one.

## Recall
type: mcq
Q: Why does "compass and straightedge" cap the degree of what you can construct?
- [x] Each new intersection solves at most a quadratic — every step at most doubles the degree, and the tower law makes the total a power of 2.
- [ ] Because circles are degree 2 curves and lines are degree 1 — the degrees of the curves are not what multiply; the field extensions are.
- [ ] Because only rational lengths are constructible — plenty of irrational lengths are, starting with $\sqrt2$ as a diagonal.
