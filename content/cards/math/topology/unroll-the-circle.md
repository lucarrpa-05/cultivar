---
id: math.topology.covering-spaces.unroll-the-circle
topic: math.topology.covering-spaces
topics: [math.topology.fundamental-group]
format: series
difficulty: 4
language: en
weight: heavy
angles: [tool, beautiful]
tags: [covering-space, path-lifting, winding-number, degree]
hook: "To prove a loop cannot be undone, stop looking at the circle and look at the line spiralling above it."
series: {id: math.topology.holes, index: 2, total: 4, title: "Holes"}
sources:
  - {title: "Covering space", type: wiki, url: "https://en.wikipedia.org/wiki/Covering_space"}
  - {title: "Winding number", type: wiki, url: "https://en.wikipedia.org/wiki/Winding_number"}
  - {title: "Topology, 2nd ed., §53–54", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
diagram: {file: math/covering-helix-circle.svg, caption: "The line coiled above the circle: every small arc has a stack of copies over it, and a loop downstairs lifts to a path from 0 to an integer.", alt: "A helix drawn above a circle, with vertical dotted lines showing how a short arc of the circle lifts to a stack of separate arcs on the helix"}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Unroll the circle into a line

Last episode ended with a claim you believe and cannot yet prove: the loop that goes once around the tree cannot be shrunk to a point. Drawing pictures of failed attempts is not an argument. You need an invariant.

Here it is. Look at the line coiled above the circle, like a spring seen from the side. The map $p(t)=(\cos 2\pi t, \sin 2\pi t)$ wraps the line onto the circle infinitely often, and its defining feature is that every small arc has a preimage that is a disjoint stack of intervals, each mapped homeomorphically onto the arc. Locally, upstairs is many separate copies of downstairs.

That property buys everything. Pick a starting height and any path downstairs lifts to exactly one path upstairs. A loop lifts to a path from $0$ to some integer $n$ — it must end over the start, and the points over the start are the integers. Deform the loop and the lift deforms with it, but its endpoint is an integer, and integers cannot move continuously.

So $n$ is an invariant of the loop's class. That is the proof.

## Rigor

$p : E \to B$ is a **covering map** if every $b \in B$ has an open neighbourhood $U$ with $p^{-1}(U)=\bigsqcup_\alpha V_\alpha$, each $V_\alpha$ open and mapped homeomorphically onto $U$ by $p$.

**Path lifting.** Given a path $f:[0,1]\to B$ and $e_0 \in p^{-1}(f(0))$, there is a unique lift $\tilde f$ with $p\tilde f = f$ and $\tilde f(0)=e_0$. (Cover $[0,1]$ by preimages of evenly covered sets, take a Lebesgue number, lift on each small subinterval in turn.)

**Homotopy lifting.** A path homotopy $F$ between $f$ and $g$ lifts to a path homotopy $\tilde F$ between their lifts; in particular the lifts share endpoints.

For $p:\mathbb{R}\to S^1$, $p^{-1}(1,0)=\mathbb{Z}$. Define $\deg[f]=\tilde f(1)\in\mathbb{Z}$: well defined by homotopy lifting, a homomorphism because a lift of $f*g$ is $\tilde f$ followed by $\tilde g$ shifted by $\deg[f]$, injective because a lift ending at $0$ contracts in $\mathbb{R}$ and pushes down, surjective via $t \mapsto p(nt)$. Hence
$$\pi_1(S^1)\cong\mathbb{Z}.$$

One number, and the loop is pinned. Next: what $\pi_1$ does to *maps*, and the crumpled-map theorem that falls out of it.

## Recall
type: mcq
Q: What makes $p(t)=(\cos 2\pi t,\sin 2\pi t)$ a covering map?
- [x] Every small arc has a preimage that is a disjoint stack of intervals, each homeomorphic to the arc — that local triviality is what makes paths lift uniquely.
- [ ] It is surjective and continuous — plenty of surjective continuous maps are not coverings; the squaring map on the closed disk is one.
- [ ] Its domain is simply connected — the universal cover happens to be simply connected, but that is a bonus, not the definition.
