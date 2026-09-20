---
id: math.topology.fundamental-group.maps-become-homomorphisms
topic: math.topology.fundamental-group
topics: [math.topology.fixed-points]
format: series
difficulty: 4
language: en
weight: heavy
angles: [tool, connection]
tags: [functoriality, induced-homomorphism, no-retraction, brouwer-2d]
hook: "Turn a continuous map into a group homomorphism and an impossible group identity becomes an impossible map."
series: {id: math.topology.holes, index: 3, total: 4, title: "Holes"}
sources:
  - {title: "Fundamental group", type: wiki, url: "https://en.wikipedia.org/wiki/Fundamental_group"}
  - {title: "Brouwer fixed-point theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Brouwer_fixed-point_theorem"}
  - {title: "Topology, 2nd ed., §55", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Continuous maps turn into homomorphisms

$\pi_1$ is not just a group hanging off a space. It is a translator. Feed it a continuous map $f : X \to Y$ and it returns a group homomorphism $f_{*} : \pi_1(X)\to\pi_1(Y)$ — push each loop forward through $f$. Feed it a composition and you get the composition of the homomorphisms; feed it the identity map and you get the identity homomorphism.

That bookkeeping sounds like nothing. It is the most productive nothing in the subject, because it converts geometric impossibilities into algebraic ones, and algebra is where you can actually check things.

Here is the payoff in four lines. Suppose you could squash the disk onto its boundary circle while leaving the boundary alone. Translate: the circle includes into the disk, then retracts back, and the round trip is the identity. Apply $\pi_1$: $\mathbb{Z}\to 0\to\mathbb{Z}$ would have to compose to the identity on $\mathbb{Z}$, because the disk is convex and its $\pi_1$ is trivial. A map through the zero group cannot be the identity on $\mathbb{Z}$. So no such squashing exists — and Brouwer's fixed point theorem in the plane falls out immediately.

## Rigor

For $f:(X,x_0)\to(Y,y_0)$ define $f_{*}[\gamma]=[f\circ\gamma]$. Well defined (compose a homotopy with $f$), a homomorphism ($f\circ(\gamma*\delta)=(f\circ\gamma)*(f\circ\delta)$), and functorial: $(g\circ f)_{*}=g_{*}\circ f_{*}$, $(\mathrm{id})_{*}=\mathrm{id}$.

**No retraction.** Suppose $r : D^2 \to S^1$ is continuous with $r\circ j=\mathrm{id}_{S^1}$, where $j:S^1\hookrightarrow D^2$. Then $r_{*}\circ j_{*}=\mathrm{id}$ on $\pi_1(S^1)\cong\mathbb{Z}$. But $j_{*}$ factors through $\pi_1(D^2)=0$, so $r_{*}\circ j_{*}$ is the zero map. The identity on $\mathbb{Z}$ is not the zero map.

**Brouwer, $n=2$.** Let $g : D^2 \to D^2$ be continuous with no fixed point. Then $g(x)\ne x$ for all $x$, so the ray from $g(x)$ through $x$ meets $S^1$ in a unique point $r(x)$; $r$ is continuous and fixes $S^1$ pointwise. That is a retraction, which cannot exist. So $g$ has a fixed point.

The functor turned "you cannot flatten a disk onto its rim" into "$\mathbb{Z}$ is not $0$".

Computing $\pi_1(S^1)$ took a whole episode. What about a space with two holes? Episode 4.

## Recall
type: mcq
Q: How does functoriality of $\pi_1$ rule out a retraction of the disk onto its boundary?
- [x] The retraction would force the identity on $\mathbb{Z}$ to factor through $\pi_1(D^2)=0$ — and no map through the trivial group is the identity on $\mathbb{Z}$.
- [ ] The disk and the circle have different cardinalities — they have the same cardinality, and cardinality says nothing about continuous maps anyway.
- [ ] $\pi_1$ of the circle is finite, so it cannot inject into $\mathbb{Z}$ — $\pi_1(S^1)$ is $\mathbb{Z}$ itself, which is infinite.
