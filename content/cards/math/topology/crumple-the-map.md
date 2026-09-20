---
id: math.topology.fixed-points.crumple-the-map
topic: math.topology.fixed-points
format: idea
difficulty: 3
language: en
weight: medium
angles: [weird, tool]
tags: [brouwer-fixed-point, map-crumpling, convexity, no-retraction]
hook: "Crumple a map of Bogotá and drop it on the floor of Bogotá. One point of the paper lies exactly over the place it names."
sources:
  - {title: "Brouwer fixed-point theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Brouwer_fixed-point_theorem"}
  - {title: "Topology, 2nd ed., §55", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19, event: 1911-01-01}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Crumple the map and one point is still honest

Print a map of Bogotá, crumple it up without tearing it, and drop it anywhere on the ground inside Bogotá. At least one point of the paper is lying exactly above the point of the city it represents. Always, for any crumpling, however violent.

That is Brouwer's fixed point theorem in disguise: any continuous map from a closed disk into itself leaves some point where it was. The disk can be any convex compact shape — a square, a triangle, the city limits — and the map need not be nice in any other way.

You will hear that Brouwer thought of it while stirring his coffee. Historians doubt it. The theorem's real ancestry is Poincaré's work on the three-body problem, Piers Bohl proved the three-dimensional case in 1904, and Hadamard gave the general case in 1910, with Brouwer's own proof appearing in 1911.

Where it breaks matters as much. Take away compactness and it dies: $x \mapsto x/2$ on $(0,1)$ has no fixed point in the interval. Take away convexity and it dies too: rotate an annulus and everything moves.

## Rigor

**Theorem.** Every continuous $f : D^n \to D^n$ has a point with $f(x)=x$; the same holds for any nonempty compact convex $K \subseteq \mathbb{R}^n$, since such a $K$ is homeomorphic to a closed ball of the right dimension.

The standard proof is by contradiction through a retraction. If $f(x)\ne x$ for all $x$, define $r(x)$ as the point where the ray from $f(x)$ through $x$ exits the sphere. $r$ is continuous — the exit point depends continuously on the two distinct points — and $r(x)=x$ for $x$ on the boundary. That makes $r$ a retraction of $D^n$ onto $S^{n-1}$, which cannot exist: applying $\pi_1$ for $n=2$, or $H_{n-1}$ in general, would force the identity on $\mathbb{Z}$ to factor through the trivial group.

Both hypotheses are sharp. On the open disk, $x\mapsto (x+e_1)/2$ shifts and shrinks with no fixed point. On the annulus $\{1\le|x|\le2\}$, which is compact but not convex, rotation by any nonzero angle has none. Convexity is what lets the ray argument stay inside the space.

The theorem is also famously non-constructive: it tells you a fixed point exists and not where.

## Recall
type: mcq
Q: Why does rotating an annulus not contradict Brouwer's theorem?
- [x] The annulus is compact but not convex — it is not homeomorphic to a disk, and the no-retraction argument needs that.
- [ ] Rotation is not continuous — rotation is as continuous as a map gets; it simply has no fixed point in the annulus.
- [ ] The annulus is unbounded — it is closed and bounded, hence compact; the missing ingredient is the hole in the middle.
