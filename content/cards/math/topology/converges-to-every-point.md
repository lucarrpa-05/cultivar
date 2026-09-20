---
id: math.topology.separation-axioms.converges-to-every-point
topic: math.topology.separation-axioms
format: idea
difficulty: 3
language: en
weight: medium
angles: [weird, mistake]
tags: [hausdorff, unique-limits, cofinite-topology, convergence]
hook: "The sequence 1, 2, 3, 4, ... can converge to every real number at once. Uniqueness of limits is an axiom, not a fact."
sources:
  - {title: "Hausdorff space", type: wiki, url: "https://en.wikipedia.org/wiki/Hausdorff_space"}
  - {title: "Cofiniteness", type: wiki, url: "https://en.wikipedia.org/wiki/Cofiniteness"}
  - {title: "Topology, 2nd ed., §17", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A sequence that converges to every point at once

Put a different topology on $\mathbb{R}$: let the open sets be the empty set together with every set whose complement is finite. That is a legitimate topology — check the axioms, they pass.

Now take the sequence $1, 2, 3, 4, \dots$ and ask what it converges to. Pick any real number, say $\pi$. Every open set containing $\pi$ misses only finitely many points, so it contains all but finitely many terms of the sequence. That is the definition of convergence. So the sequence converges to $\pi$. And to $0$. And to every real number simultaneously.

Nothing is wrong with the sequence. The space simply does not own enough open sets to keep two points apart, so "the limit" is not a thing you can point at.

Uniqueness of limits — which you used a hundred times in analysis without noticing — is not a theorem about convergence. It is a separate hypothesis about the space, and Hausdorff is its name.

## Rigor

$X$ is **Hausdorff** ($T_2$) if any two distinct points have disjoint open neighbourhoods.

**Hausdorff implies unique limits.** If $x_n \to a$ and $x_n \to b$ with $a\ne b$, take disjoint open $U \ni a$, $V \ni b$. Eventually the sequence is in $U$ and eventually in $V$, so eventually in $U \cap V = \varnothing$. Contradiction.

**The cofinite topology on an infinite set is not Hausdorff**, since any two nonempty open sets have cofinite complements and therefore meet. It is $T_1$: points are closed, because finite sets are closed by construction. So $T_1$ is strictly weaker than $T_2$, and $T_1$ is not enough for unique limits.

Two consequences worth keeping. In a Hausdorff space every compact subspace is closed — the proof separates an outside point from each point of the compact set and takes a finite subcover. And a continuous bijection from a compact space to a Hausdorff space is automatically a homeomorphism. Hausdorff is cheap to assume and does a lot of work.

## Recall
type: mcq
Q: In the cofinite topology on $\mathbb{R}$, what does the sequence $1,2,3,\dots$ converge to?
- [x] Every real number — each open set omits only finitely many points, so it eventually contains the whole tail, whatever point you named.
- [ ] Nothing, since it is unbounded — boundedness is a metric notion and has no meaning in a topology with no ruler.
- [ ] Only to $\infty$, which is not in the space — there is no point at infinity here; the convergence happens at genuine real numbers, all of them.
