---
id: math.topology.open-sets-topologies.three-hundred-fifty-five
topic: math.topology.open-sets-topologies
format: fact
difficulty: 2
language: en
weight: light
angles: [numbers, connection]
tags: [finite-spaces, preorders, counting-topologies, alexandrov]
hook: "There are exactly 355 topologies on a four-element set, 6,942 on five, and no known formula for the next one."
sources:
  - {title: "OEIS A000798: number of quasi-orders (equivalently topologies) on n labeled elements", type: dataset, url: "https://oeis.org/A000798"}
  - {title: "Finite topological space", type: wiki, url: "https://en.wikipedia.org/wiki/Finite_topological_space"}
  - {title: "Alexandrov topology", type: wiki, url: "https://en.wikipedia.org/wiki/Alexandrov_topology"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# There are 355 topologies on four points

Four points, and exactly 355 ways to choose which subsets count as open. Five points: 6,942. Six: 209,527. No formula is known.

On a finite set a topology is secretly something else. Declare $x \le y$ when every open set containing $x$ also contains $y$: that is a preorder, the open sets are exactly its up-sets, and every preorder comes from exactly one topology. Counting topologies is counting loose orderings — the most abstract object in the course, wearing a combinatorial costume.

## Recall
type: reveal
Q: On a finite set, what is a topology really?
A: A preorder. Set $x \le y$ when every open set containing $x$ contains $y$; the open sets are then exactly the up-sets, and the correspondence between topologies and preorders is a bijection.
