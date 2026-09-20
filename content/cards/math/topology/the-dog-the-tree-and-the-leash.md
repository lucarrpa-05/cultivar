---
id: math.topology.fundamental-group.the-dog-the-tree-and-the-leash
topic: math.topology.fundamental-group
format: series
difficulty: 3
language: en
weight: medium
angles: [connection, beautiful]
tags: [homotopy-of-paths, fundamental-group, winding, basepoint]
hook: "The leash is wrapped around the tree. Nothing about its shape says so — the only surviving information is: once around, this way."
series: {id: math.topology.holes, index: 1, total: 4, title: "Holes"}
sources:
  - {title: "Fundamental group", type: wiki, url: "https://en.wikipedia.org/wiki/Fundamental_group"}
  - {title: "Homotopy", type: wiki, url: "https://en.wikipedia.org/wiki/Homotopy"}
  - {title: "Topology, 2nd ed., §51–52", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The dog, the tree and the leash

Your dog runs a lap around a tree and comes back to you. The leash is now looped around the trunk, and no amount of pulling will free it — you have to walk the dog back the way it came, or lift the leash over the top.

Notice what is left of the walk. Not the route, not the distance, not the speed — all of that can be deformed away by tugging. What survives is one piece of information: it went around, once, this way. Two laps would be a different situation, and one lap the other way would undo it.

Topology takes that as a definition. Fix a point, look at the loops that start and end there, and call two of them the same when one can be slid into the other without leaving the space — without crossing the tree. The classes form a group: concatenate to multiply, run backwards to invert, stand still for the identity. For the plane with the tree removed, the group is $\mathbb{Z}$, and the integer is the lap count.

You believe the once-around loop cannot be undone. Proving it is episode 2.

## Rigor

Let $X$ be a space, $x_0 \in X$. A **loop** at $x_0$ is a continuous $f : [0,1]\to X$ with $f(0)=f(1)=x_0$. Loops $f,g$ are **path homotopic**, $f \simeq_p g$, if there is continuous $H : [0,1]^2 \to X$ with
$$H(s,0)=f(s),\quad H(s,1)=g(s),\quad H(0,t)=H(1,t)=x_0 .$$
That is an equivalence relation. Define $\pi_1(X,x_0)$ as the set of classes, with $[f]\cdot[g]=[f * g]$ where $f * g$ runs $f$ at double speed then $g$.

The group axioms hold at the level of classes, not of loops: $(f*g)*h$ and $f*(g*h)$ differ by a reparametrisation, which is a homotopy; the constant loop $e_{x_0}$ is the identity; $\bar f(s)=f(1-s)$ inverts.

If $X$ is path connected, a path $\alpha$ from $x_0$ to $x_1$ gives an isomorphism $[f]\mapsto[\bar\alpha * f * \alpha]$, so the basepoint is a formality and we write $\pi_1(X)$.

Convex sets have $\pi_1$ trivial: the straight-line homotopy $H(s,t)=(1-t)f(s)+t\,x_0$ contracts everything. And $\pi_1(\mathbb{R}^2\setminus\{0\})\cong\pi_1(S^1)\cong\mathbb{Z}$ — the tree, with the lap count as the isomorphism.

## Recall
type: mcq
Q: What does the fundamental group remember about a loop?
- [x] Only its class up to deformation inside the space — the route, length and speed are all deformable away; what survives is how it wraps.
- [ ] Its length and the area it encloses — both are metric quantities, and homotopies are free to change them without limit.
- [ ] Which points it passes through — a homotopy moves the loop off almost any point; only the obstructions it cannot cross matter.
