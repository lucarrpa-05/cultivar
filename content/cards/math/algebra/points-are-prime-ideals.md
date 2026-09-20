---
id: math.algebra.rings-ideals.points-are-prime-ideals
topic: math.algebra.rings-ideals
format: idea
difficulty: 5
language: en
weight: medium
angles: [connection, beautiful]
tags: [spectrum, prime-ideals, nullstellensatz, algebraic-geometry, generic-point]
hook: "Throw away the points of a curve and keep only its ring of functions. The points come back as ideals, and you get extra ones for free."
sources:
  - {title: "Spectrum of a ring", type: wiki, url: "https://en.wikipedia.org/wiki/Spectrum_of_a_ring"}
  - {title: "Hilbert's Nullstellensatz", type: wiki, url: "https://en.wikipedia.org/wiki/Hilbert%27s_Nullstellensatz"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A point is the set of functions that vanish on it

A polynomial in two variables carves a curve out of the plane, and for a century algebraic geometry meant studying such curves over $\mathbb{C}$, with pictures. Then the subject made a move that sounds like vandalism: throw the points away and keep only the ring of functions.

Nothing is lost, because the points come back. On a curve, the polynomial functions vanishing at a given point form a maximal ideal, and different points give different ideals. So "the point $p$" can be replaced by "the ideal of things that die at $p$", and the geometry is now written entirely inside the ring.

What you gain is the surprise. There are more prime ideals than there are points, and the extra ones are useful. On an irreducible curve, the zero ideal is prime, and it behaves like a point that is not anywhere in particular — a **generic point**, sitting in the closure of nothing and having every other point in *its* closure. It is what "a general member of this family" means when you want the phrase to be a theorem.

## Rigor

For a commutative ring $R$, let $\operatorname{Spec}R$ be the set of prime ideals, topologised by declaring the closed sets to be
$$V(I)=\{\mathfrak{p}\in\operatorname{Spec}R:\ I\subseteq\mathfrak{p}\}.$$
A ring map $R\to S$ pulls primes back to primes, so $\operatorname{Spec}$ is a contravariant functor: algebra maps become geometry maps, backwards.

**Nullstellensatz.** For $k$ algebraically closed, the maximal ideals of $k[x_1,\dots,x_n]$ are exactly $\mathfrak{m}_a=(x_1-a_1,\dots,x_n-a_n)$, and $I(V(J))=\sqrt{J}$. So classical points of affine space correspond precisely to maximal ideals, and radical ideals correspond to closed sets. Dropping "maximal" for "prime" is what adds the generic points.

Two things make this worth the abstraction: it works over $\mathbb{Z}$, where "geometry" becomes number theory, and the topology is honest about irreducibility — $\operatorname{Spec}R$ is irreducible exactly when its nilradical is prime, i.e. when there is a single generic point. The vanishing-set picture from the intuition is the closed-set operator $V$, read in reverse.

## Recall
type: mcq
Q: Why use prime ideals rather than just maximal ideals as "points"?
- [x] Primes include generic points — on an irreducible variety the zero ideal is prime, and it is the point whose closure is everything.
- [ ] Because maximal ideals are not closed under intersection — irrelevant; the issue is what the space contains, not how ideals combine.
- [ ] Because non-algebraically-closed fields have no maximal ideals — every non-zero ring has maximal ideals; the Nullstellensatz just stops describing them so simply.
