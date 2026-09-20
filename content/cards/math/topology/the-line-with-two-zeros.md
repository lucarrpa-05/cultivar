---
id: math.topology.quotients.the-line-with-two-zeros
topic: math.topology.quotients
topics: [math.topology.manifolds]
format: idea
difficulty: 3
language: en
weight: medium
angles: [weird, mistake]
tags: [line-with-two-origins, non-hausdorff, quotient-map, locally-euclidean]
hook: "Glue two copies of the real line along everything but zero. Every point still looks like an interval, and the two zeros are inseparable."
sources:
  - {title: "Non-Hausdorff manifold", type: wiki, url: "https://en.wikipedia.org/wiki/Non-Hausdorff_manifold"}
  - {title: "Quotient space (topology)", type: wiki, url: "https://en.wikipedia.org/wiki/Quotient_space_(topology)"}
  - {title: "Topology, 2nd ed., §22", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The line with two zeros

Take two copies of $\mathbb{R}$, one labelled with a star. Glue $x$ to $x^{*}$ for every $x \ne 0$, and leave the two zeros unglued. You now have a line with a doubled origin.

Walk along it. Every point has a neighbourhood that looks exactly like an open interval, including both zeros — locally you cannot detect anything unusual anywhere. But the two zeros are inseparable: any open set containing $0$ and any open set containing $0^{*}$ both contain a punctured interval around the origin, so they always overlap. The sequence $1/n$ converges to $0$ and also to $0^{*}$.

This one example earns its keep twice. It is why the definition of a manifold bolts "Hausdorff" onto "locally Euclidean" — the second does not imply the first. And it is a warning about quotients: $\mathbb{R}\sqcup\mathbb{R}$ is as Hausdorff as a space gets, and the quotient is not. Gluing destroys separation.

## Rigor

Let $X = \mathbb{R}\times\{0,1\}$ with the disjoint union topology, and let $\sim$ identify $(x,0)$ with $(x,1)$ for $x \ne 0$. Set $L = X/\!\sim$ with the quotient topology and $\pi$ the projection.

**Locally Euclidean.** $\pi(\mathbb{R}\times\{0\})$ and $\pi(\mathbb{R}\times\{1\})$ are open (their preimages are open) and each is homeomorphic to $\mathbb{R}$ — $\pi$ restricted to either copy is a continuous open bijection onto it. Their union is $L$, so every point has a neighbourhood homeomorphic to $\mathbb{R}$. $L$ is also second countable and path connected.

**Not Hausdorff.** Any open $U \ni 0$ has preimage containing $(-\varepsilon,\varepsilon)\times\{0\}$, and any open $V \ni 0^{*}$ has preimage containing $(-\delta,\delta)\times\{1\}$. By the identification, both $U$ and $V$ contain $\pi((0,\min(\varepsilon,\delta))\times\{0\})$, so $U \cap V \ne \varnothing$.

So $L$ satisfies every clause of "manifold" except one. Note also that $\pi$ here is an open quotient map — even good quotient maps do not preserve Hausdorffness.

## Recall
type: mcq
Q: What does the line with two origins show about the definition of a manifold?
- [x] Locally Euclidean does not imply Hausdorff — the two origins have no disjoint neighbourhoods even though every point has an interval around it.
- [ ] Locally Euclidean does not imply second countable — true of the long line, but this space is second countable; Hausdorff is what fails here.
- [ ] Quotients of connected spaces can be disconnected — quotients of connected spaces are always connected, being continuous images.
