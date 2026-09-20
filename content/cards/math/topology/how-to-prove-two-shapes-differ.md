---
id: math.topology.continuity-homeomorphism.how-to-prove-two-shapes-differ
topic: math.topology.continuity-homeomorphism
topics: [math.topology.connectedness]
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, practical]
tags: [topological-invariant, cut-points, letters, non-homeomorphic]
hook: "Proving two spaces are the same means building a map. Proving they differ means finding one thing that cannot survive the trip."
sources:
  - {title: "Topological property", type: wiki, url: "https://en.wikipedia.org/wiki/Topological_property"}
  - {title: "Topology, 2nd ed., §18 and §23–24", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# How to prove two shapes are different

Showing that two spaces *are* homeomorphic means producing a map and checking it twice. Showing they are *not* looks hopeless by comparison: you would have to rule out every map at once.

You never do. You find one property that homeomorphisms cannot damage, and check that one space has it and the other does not. The cheapest such property is embarrassing in its simplicity: delete a point and see what falls apart.

Remove an interior point from a segment and it splits in two. Remove any point from a circle and what remains is still one piece. So no homeomorphism can exist, because a homeomorphism restricted to the complement of a point is still a homeomorphism. The same move sorts the capital letters: X has a point whose removal leaves four pieces, T has one leaving three, O has none at all.

The honest limit: this tool only proves difference, never sameness.

## Rigor

If $f : X \to Y$ is a homeomorphism and $A \subseteq X$, then $f$ restricts to a homeomorphism $X \setminus A \to Y \setminus f(A)$. So any statement of the form "there are exactly $k$ points whose removal leaves $m$ components" is a topological invariant.

**$[0,1] \not\cong S^1$.** Every $x \in (0,1)$ is a cut point: $[0,1]\setminus\{x\}$ is a disjoint union of two nonempty open sets. No $p \in S^1$ is a cut point, since $S^1 \setminus \{p\} \cong \mathbb{R}$ is connected.

**$\mathbb{R} \not\cong \mathbb{R}^2$.** Same trick: $\mathbb{R}\setminus\{0\}$ is disconnected, $\mathbb{R}^2\setminus\{0\}$ is path connected.

Where it dies: $\mathbb{R}^2\setminus\{0\}$ and $\mathbb{R}^3\setminus\{0\}$ are both connected, and removing any finite set leaves both connected. Separating $\mathbb{R}^2$ from $\mathbb{R}^3$ needs an invariant that counts holes rather than pieces — the fundamental group, or homology. That is the whole reason algebraic topology was invented.

## Recall
type: mcq
Q: Why is the letter X not homeomorphic to the letter T?
- [x] X has a point whose removal leaves four components, T's best is three — and the count of components after deleting a point is preserved by homeomorphisms.
- [ ] X has more line segments than T — the number of strokes you draw with is not topological; it depends on how you drew the letter.
- [ ] X is symmetric and T is not — symmetry is a metric notion, and homeomorphisms are free to destroy it.
