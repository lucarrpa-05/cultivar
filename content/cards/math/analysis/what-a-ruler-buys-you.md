---
id: math.analysis.metric-spaces.what-a-ruler-buys-you
topic: math.analysis.metric-spaces
topics: [math.topology.separation-axioms, math.topology.open-sets-topologies]
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, connection]
tags: [metric-topology, hausdorff, first-countable, sequence-lemma, munkres]
hook: "Almost everything that feels easy about the real line comes from two gifts a distance function hands you for free."
context: "context:2026-09:topology-munkres"
related: [math.topology.separation-axioms.converges-to-every-point, math.topology.open-sets-topologies.distance-was-never-the-point]
diagram: {file: math/metric-two-gifts.svg, caption: "Balls of radius half the distance keep two points apart; balls of radius 1, 1/2, 1/3, … form a ladder that fits inside any neighbourhood.", alt: "Left: two points with non-overlapping dashed circles around each. Right: a point with four nested circles and an irregular shaded region that contains the third circle."}
sources:
  - {title: "Metric space", type: wiki, url: "https://en.wikipedia.org/wiki/Metric_space"}
  - {title: "First-countable space", type: wiki, url: "https://en.wikipedia.org/wiki/First-countable_space"}
  - {title: "Hausdorff space", type: wiki, url: "https://en.wikipedia.org/wiki/Hausdorff_space"}
  - {title: "Topology, 2nd ed., §20–21 (the metric topology)", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "first sentence repeated the hook; new opener leads with Munkres's pathologies. Diagram: moved the 'distance d' label off the point where the two circles touch."}
---

# A ruler buys you two things general topology cannot promise

Munkres keeps his strangest examples in spaces where a sequence has two limits, or where sequences cannot tell you which sets are closed. Put a distance on the space and both go away.

Gift one: room between any two points. If they are 2 cm apart, the balls of radius 1 cm around each never overlap. So a sequence cannot converge to two different places.

Gift two: a countable ladder at every point, the balls of radius $1, \tfrac12, \tfrac13, \dots$ Every neighbourhood contains a rung. So sequences can test everything: closed means keeping your limits, continuous means preserving them.

That is why metric spaces are the tame case, and each gift takes one short proof.

## Rigor

Let $(X,d)$ be a metric space with the metric topology.

**Gift one: Hausdorff.** If $x\ne y$, put $r=d(x,y)/2>0$. If some $z$ were in $B(x,r)\cap B(y,r)$, then $d(x,y)\le d(x,z)+d(z,y)<2r=d(x,y)$. Contradiction. Hence a sequence has at most one limit.

**Gift two: a countable basis at each point.** Every open $U\ni x$ contains some $B(x,1/n)$. This gives the **sequence lemma**: $x\in\overline{A}$ iff some sequence in $A$ converges to $x$. (One direction holds in every space; for the other, pick $a_n\in A\cap B(x,1/n)$.) Consequences: $A$ is closed iff it contains the limits of its convergent sequences, and $f$ is continuous iff $x_n\to x$ implies $f(x_n)\to f(x)$.

**Where each gift fails.** In the cofinite topology on $\mathbb{R}$ there is no room: the sequence $1,2,3,\dots$ converges to every point. In $\mathbb{R}^J$ with $J$ uncountable and the product topology there is no ladder: the zero function lies in the closure of $A=\{x: x_\alpha=0 \text{ for only finitely many } \alpha, \text{ and } 1 \text{ otherwise}\}$, but a sequence in $A$ has only countably many zero coordinates in total, so it cannot converge to $0$. Neither space is metrizable.

## Recall
type: mcq
Q: Why can a sequence in a metric space not converge to two different points?
- [x] Two distinct points have disjoint balls of radius half their distance, and the tail of a sequence cannot sit in both — the triangle inequality supplies the room.
- [ ] Because metric spaces are compact — $\mathbb{R}$ is not compact and limits there are still unique.
- [ ] Because a sequence has only one subsequential limit — false: $(-1)^n$ has two, and converges to neither.
