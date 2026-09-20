---
id: math.topology.covering-spaces.covering-spaces-are-galois
topic: math.topology.covering-spaces
topics: [math.algebra.groups-basics]
format: idea
difficulty: 5
language: en
weight: heavy
angles: [connection, beautiful]
tags: [galois-correspondence, universal-cover, deck-transformations, normal-covering]
hook: "Subgroups of the fundamental group correspond to covering spaces, order-reversing. You have seen this lattice before, in algebra."
sources:
  - {title: "Covering space", type: wiki, url: "https://en.wikipedia.org/wiki/Covering_space"}
  - {title: "Deck transformation", type: wiki, url: "https://en.wikipedia.org/wiki/Deck_transformation"}
  - {title: "Galois connection", type: wiki, url: "https://en.wikipedia.org/wiki/Galois_connection"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Covering spaces are Galois theory in disguise

In algebra you take a field extension, attach a group, and find that the subgroups of that group correspond exactly to the intermediate fields — bigger subgroup, smaller field, with normal subgroups picking out the extensions that are themselves symmetric.

Now take a space $X$ that is nice enough, attach $\pi_1(X)$, and look at its connected covering spaces. Bigger subgroup, smaller cover. The trivial subgroup corresponds to the universal cover, the one with no loops left, sitting on top of everything; the whole group corresponds to $X$ itself. Normal subgroups pick out the covers whose symmetry group acts transitively on each fibre — the ones where every sheet looks like every other.

It is the same lattice picture twice, and that is not a coincidence anyone noticed by accident. Both are instances of one construction, which is why Grothendieck was able to define an étale fundamental group that contains Galois theory and covering space theory as two special cases.

## Rigor

Let $X$ be path connected, locally path connected and semilocally simply connected, with basepoint $x_0$.

**Classification.** The map $(\tilde X, \tilde x_0)\mapsto p_{*}\pi_1(\tilde X,\tilde x_0)$ is a bijection between based connected coverings of $X$ up to isomorphism and subgroups of $\pi_1(X,x_0)$. It reverses inclusion: a cover $\tilde X_1$ covers $\tilde X_2$ exactly when $H_1 \subseteq H_2$.

The index matters: $[\pi_1(X):H]$ is the number of sheets.

**Deck transformations.** $\mathrm{Deck}(\tilde X/X)\cong N(H)/H$, the normaliser quotient. The covering is **normal** (deck transformations act transitively on fibres) iff $H \trianglelefteq \pi_1(X)$, and then $\mathrm{Deck}\cong\pi_1(X)/H$ — exactly $\mathrm{Gal}(L/K)\cong G/H$.

**The universal cover** corresponds to $H=1$: simply connected, with $\mathrm{Deck}\cong\pi_1(X)$ acting freely, and $X \cong \tilde X/\pi_1(X)$.

Example: $\pi_1(S^1)=\mathbb{Z}$, whose subgroups are $n\mathbb{Z}$. The cover for $n\mathbb{Z}$ is $z \mapsto z^n$, an $n$-sheeted cover of the circle by itself with deck group $\mathbb{Z}/n$; the cover for $\{0\}$ is $\mathbb{R}\to S^1$, the universal one, with deck group $\mathbb{Z}$.

## Recall
type: mcq
Q: In the covering space correspondence, what does the trivial subgroup of $\pi_1(X)$ correspond to?
- [x] The universal cover — simply connected, sitting above every other cover, with deck group isomorphic to $\pi_1(X)$ itself.
- [ ] The space $X$ itself — that is the other end: $X$ corresponds to the whole group $\pi_1(X)$, since the identity map is a one-sheeted cover.
- [ ] No cover at all — every subgroup, the trivial one included, is realised by a connected cover under the standard hypotheses.
