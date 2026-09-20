---
id: math.topology.continuity-homeomorphism.continuity-runs-backwards
topic: math.topology.continuity-homeomorphism
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, beautiful]
tags: [continuity, preimage, open-maps, set-algebra]
hook: "Continuity is stated with preimages, not images. That is not a convention — images cannot carry a topology."
sources:
  - {title: "Continuous function", type: wiki, url: "https://en.wikipedia.org/wiki/Continuous_function"}
  - {title: "Topology, 2nd ed., §18", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Why continuity had to be defined backwards

The topological definition says: $f$ is continuous when the preimage of every open set is open. Students reliably try to fix this. Surely the natural statement is that $f$ sends open sets to open sets?

It is a perfectly good property. It is just a different one, and it is not what calculus needs. Sine is continuous, yet it maps the open interval $(0,2\pi)$ onto the closed set $[-1,1]$. A constant function crushes everything to a single point. Nobody wants to call those discontinuous.

The deeper reason is algebraic. A topology is built out of unions, intersections and complements, and the preimage operation respects all three. Images respect only unions: $f(A \cap B)$ can be much smaller than $f(A) \cap f(B)$, and $f$ of a complement is usually nonsense. Only one direction of the arrow can carry the structure across, so only one direction can define continuity.

Here is the whole argument in symbols.

## Rigor

$f : X \to Y$ is **continuous** iff $f^{-1}(U)$ is open in $X$ for every open $U \subseteq Y$; equivalently, iff $f^{-1}(C)$ is closed for every closed $C$, since $f^{-1}(Y \setminus C) = X \setminus f^{-1}(C)$.

The set algebra that makes it work:
$$f^{-1}\Big(\bigcup_i U_i\Big)=\bigcup_i f^{-1}(U_i), \qquad f^{-1}\Big(\bigcap_i U_i\Big)=\bigcap_i f^{-1}(U_i),$$
and $f^{-1}$ commutes with complements. For images only the first identity survives in general.

**Agreement with $\varepsilon$–$\delta$.** In metric spaces, suppose $f^{-1}(U)$ is always open and fix $x$ and $\varepsilon > 0$. Then $f^{-1}(B(f(x),\varepsilon))$ is open and contains $x$, so it contains some $B(x,\delta)$: that is the $\delta$. Conversely, given the $\varepsilon$–$\delta$ property and $U$ open, each $x \in f^{-1}(U)$ has an $\varepsilon$-ball inside $U$, hence a $\delta$-ball inside $f^{-1}(U)$.

Maps that do send open sets to open sets are called **open maps**; continuity and openness are independent conditions, and a bijection with both is exactly a homeomorphism.

## Recall
type: mcq
Q: Why is continuity defined with preimages instead of images?
- [x] Preimages commute with unions, intersections and complements — images only with unions, so only the backwards direction can carry a topology.
- [ ] Images of open sets are always closed — they need not be either; $\sin((0,2\pi))=[-1,1]$ is closed, but a projection sends open sets to open sets.
- [ ] It is a historical convention from Bourbaki — the choice is forced by set algebra, and the two conditions genuinely describe different maps.
