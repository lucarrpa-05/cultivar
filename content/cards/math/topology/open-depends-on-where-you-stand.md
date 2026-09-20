---
id: math.topology.bases-products.open-depends-on-where-you-stand
topic: math.topology.bases-products
format: idea
difficulty: 2
language: en
weight: medium
angles: [mistake, tool]
tags: [subspace-topology, relative-open, clopen, inclusion]
hook: "The interval from zero to one, half-open, is not open in the line. Shrink the universe to the closed unit interval and it becomes open."
sources:
  - {title: "Subspace topology", type: wiki, url: "https://en.wikipedia.org/wiki/Subspace_topology"}
  - {title: "Topology, 2nd ed., §16", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Open depends on where you are standing

$[0,1)$ is not open in $\mathbb{R}$: the point $0$ has no room to its left. Now shrink the universe to $[0,1]$ and ask again. Inside $[0,1]$, everything to the left of $0$ has stopped existing, so $0$ does have room, and $[0,1)$ is open.

Same points, opposite answers. The lesson is that "open" was never a property of a set. It is a property of a set *inside a space*, and the space is doing half the work.

The subspace topology makes it official: a subset of $Y$ counts as open when it is the shadow of something open in the big space, cut down to $Y$. Two consequences people trip over. Every space is open in itself, so "clopen" is not exotic — $Y$ always is. And "open in $Y$" does not give you "open in $X$", unless $Y$ itself is open in $X$.

## Rigor

For $Y \subseteq X$ the **subspace topology** is $\mathcal{T}_Y = \{\,U \cap Y : U \in \mathcal{T}_X\,\}$. It is a topology because intersection with $Y$ commutes with unions and finite intersections.

$[0,1) = (-1,1)\cap[0,1]$, which is why it is open in $[0,1]$.

**Lemma.** If $Y$ is open in $X$ and $A$ is open in $Y$, then $A$ is open in $X$. Proof: $A = U \cap Y$ with $U$ open in $X$, and an intersection of two open sets of $X$ is open. The same holds with "closed" throughout.

Without that hypothesis it fails: $[0,1)$ is open in $[0,1]$ but not in $\mathbb{R}$, and $[0,1]$ is not open in $\mathbb{R}$.

A basis passes to subspaces for free: if $\mathcal{B}$ is a basis for $X$, then $\{B \cap Y : B \in \mathcal{B}\}$ is a basis for $Y$. That is how you compute in a subspace without ever listing its open sets.

## Recall
type: mcq
Q: $[0,1)$ is open in $[0,1]$ but not in $\mathbb{R}$. Why is that not a contradiction?
- [x] Openness is relative to the ambient space — in $[0,1]$ the point $0$ has a neighbourhood inside $[0,1)$, and in $\mathbb{R}$ it does not.
- [ ] $[0,1)$ is not really a subset of $\mathbb{R}$ — it is the same set of points; only the surrounding space changed.
- [ ] The subspace topology is a different kind of topology — it is an ordinary topology on $[0,1]$; the word "open" simply refers to it.
