---
id: math.topology.compactness.a-homeomorphism-for-free
topic: math.topology.compactness
topics: [math.topology.separation-axioms]
format: series
difficulty: 3
language: en
weight: heavy
angles: [tool, beautiful]
tags: [closed-map, compact-hausdorff, continuous-bijection, inverse-continuity]
hook: "Checking that an inverse map is continuous is usually work. On a compact domain with a Hausdorff target it is free."
series: {id: math.topology.taming-infinity, index: 2, total: 4, title: "Taming infinity"}
sources:
  - {title: "Compact space", type: wiki, url: "https://en.wikipedia.org/wiki/Compact_space"}
  - {title: "Hausdorff space", type: wiki, url: "https://en.wikipedia.org/wiki/Hausdorff_space"}
  - {title: "Topology, 2nd ed., §26", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# When the inverse map comes for free

Wrap the half-open interval $[0,1)$ around the circle: $t \mapsto (\cos 2\pi t, \sin 2\pi t)$. It is continuous, it is a bijection, and its inverse is not continuous — points just below $1$ on the circle sit next to the image of $0$, but their parameters are nowhere near. A continuous bijection is not automatically a homeomorphism, and you have to check the inverse separately. Usually that is real work.

Sometimes it is no work at all. Close the interval and make the target Hausdorff, and the second half of the check becomes automatic: a continuous bijection from a compact space to a Hausdorff space is always a homeomorphism.

The reason is a three-link chain, each link one line long, and compactness supplies two of them. It is the single most labour-saving theorem in the first half of the course: it is why you can identify a quotient of a compact space by writing down any continuous bijection you like and stopping there.

## Rigor

Three lemmas.

1. A closed subset $C$ of a compact space $X$ is compact: an open cover of $C$ plus $X \setminus C$ covers $X$.
2. A continuous image of a compact space is compact: pull back a cover, take a finite subcover, push forward.
3. A compact subset $K$ of a Hausdorff space $Y$ is closed: for $y \notin K$, separate $y$ from each $k\in K$ by disjoint open sets, take a finite subcover of $K$, intersect the finitely many neighbourhoods of $y$ to get one missing $K$. Finitely many again.

**Theorem.** $f : X \to Y$ a continuous bijection, $X$ compact, $Y$ Hausdorff. For $C \subseteq X$ closed: $C$ is compact (1), $f(C)$ is compact (2), $f(C)$ is closed (3). So $f$ is a closed map, and $(f^{-1})^{-1}(C)=f(C)$ is closed for every closed $C$, which is continuity of $f^{-1}$.

Both hypotheses are load-bearing. Drop compactness and you get the wrapping map above; drop Hausdorff and the identity from a discrete two-point space to an indiscrete one is a continuous bijection with no continuous inverse.

Now try to make an *infinite product* of compact spaces compact. The price turns out to be foundational. Episode 3.

## Recall
type: mcq
Q: Why does the wrapping map $[0,1) \to S^1$ fail to be a homeomorphism?
- [x] $[0,1)$ is not compact — the theorem needs a compact domain, and without it the map need not be closed.
- [ ] The circle is not Hausdorff — the circle is a metric space, so it is certainly Hausdorff; the domain is what fails.
- [ ] The map is not injective — it is a bijection onto the circle; injectivity is not the problem, continuity of the inverse is.
