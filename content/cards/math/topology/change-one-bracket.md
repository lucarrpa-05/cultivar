---
id: math.topology.open-sets-topologies.change-one-bracket
topic: math.topology.open-sets-topologies
format: idea
difficulty: 4
language: en
weight: medium
angles: [weird, tool]
tags: [sorgenfrey-line, lower-limit-topology, counterexample, second-countable]
hook: "Flip one bracket in the definition of an interval and the real line stops admitting any distance function at all."
sources:
  - {title: "Lower limit topology", type: wiki, url: "https://en.wikipedia.org/wiki/Lower_limit_topology"}
  - {title: "Topology, 2nd ed., §13, §30–31", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Change one bracket and the real line breaks

Take $\mathbb{R}$ and change exactly one thing: let the half-open intervals $[a,b)$ be the basic open sets instead of $(a,b)$. Same points, same order, one bracket flipped. Munkres writes it $\mathbb{R}_\ell$, and then spends the rest of the book using it to kill plausible conjectures.

What breaks is startling. Every $[a,b)$ is now open *and* closed, so the line crumbles into dust: no two points share a connected piece. Sequences can approach a number from the left and never arrive. The rationals are still dense, so the space is separable — and yet it has no countable basis, because each point $x$ needs a basic set whose smallest element is $x$, and there are uncountably many points.

Separable plus metrizable would force a countable basis. So no metric on $\mathbb{R}$ produces these open sets. One bracket, and distance becomes impossible.

## Rigor

$\mathcal{B}=\{[a,b) : a<b\}$ is a basis, and the topology it generates is strictly finer than the standard one: $(a,b)=\bigcup_n [a+\tfrac1n, b)$ is open here, while $[0,1)$ is not open in the standard topology.

**Not second countable.** Let $\mathcal{C}$ be any basis. For each $x$ choose $C_x \in \mathcal{C}$ with $x \in C_x \subseteq [x, x+1)$. Then $\inf C_x = x$, so $x \mapsto C_x$ is injective and $|\mathcal{C}| \ge \mathfrak{c}$.

**Not metrizable.** $\mathbb{Q}$ is dense, so $\mathbb{R}_\ell$ is separable; every separable metric space is second countable; contradiction.

For the record $\mathbb{R}_\ell$ *is* first countable, Lindelöf, paracompact and normal. It satisfies every hypothesis you half-remember and fails the conclusion you expected, which is precisely why it is the counterexample factory of the course.

## Recall
type: mcq
Q: Why can no metric produce the lower limit topology on $\mathbb{R}$?
- [x] It is separable but not second countable — and for metric spaces those two properties are equivalent, so no metric can do it.
- [ ] Its basic open sets are not symmetric around their points — metric balls are symmetric, but a metric topology can still contain plenty of lopsided open sets.
- [ ] It is totally disconnected — many metric spaces are totally disconnected, the Cantor set and $\mathbb{Q}$ among them.
