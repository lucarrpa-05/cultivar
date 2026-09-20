---
id: math.algebra.homomorphisms-quotients.the-primes-of-group-theory
topic: math.algebra.homomorphisms-quotients
topics: [math.algebra.classification-finite-simple]
format: idea
difficulty: 4
language: en
weight: medium
angles: [connection, beautiful]
tags: [jordan-holder, composition-series, simple-groups, extension-problem, factorisation]
hook: "Groups factor into simple pieces, and the factorisation is unique. Unlike with integers, the pieces do not determine the group."
sources:
  - {title: "Composition series", type: wiki, url: "https://en.wikipedia.org/wiki/Composition_series"}
  - {title: "Simple group", type: wiki, url: "https://en.wikipedia.org/wiki/Simple_group"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Groups have prime factorisation, and it is not enough

Smash a finite group with a normal subgroup, smash the two halves the same way, keep going. Eventually nothing breaks: you are left with groups whose only normal subgroups are the trivial ones. Those are the **simple** groups, and they play the role of primes.

Jordan and Hölder proved the part that makes the analogy respectable: however you chose to smash it, you end up with the same list of pieces, in some order, with the same multiplicities. The factorisation is unique.

Then the analogy snaps, and it snaps hard. With integers, knowing the prime factors reconstructs the number. With groups it does not. The cyclic group of order 6 and the symmetries of a triangle both break into a piece of size 2 and a piece of size 3. One is abelian; the other is not. Same factors, different group.

So finite group theory has two problems, not one: list the simple groups, then work out how they can be glued. The first took fifty years and roughly a hundred people. The second is still open in general.

## Rigor

A **composition series** of a finite group $G$ is a chain
$$\{e\}=G_0\triangleleft G_1\triangleleft\cdots\triangleleft G_n=G$$
with each $G_{i+1}/G_i$ simple. **Jordan–Hölder:** any two composition series of $G$ have the same length, and the multisets of factors $\{G_{i+1}/G_i\}$ agree up to isomorphism and reordering.

Existence is induction on $|G|$: take a maximal proper normal subgroup, which exists by finiteness, and the quotient by it is simple.

The failure of reconstruction is the **extension problem**. Both $\mathbb{Z}/6$ and $S_3$ have composition factors $\{\mathbb{Z}/2,\mathbb{Z}/3\}$: for $\mathbb{Z}/6$ via $\{e\}\triangleleft \mathbb{Z}/3\triangleleft\mathbb{Z}/6$, for $S_3$ via $\{e\}\triangleleft A_3\triangleleft S_3$. They differ in *how* $\mathbb{Z}/2$ acts on $\mathbb{Z}/3$: trivially in the first, by inversion in the second. Same tiles, different floor.

## Recall
type: mcq
Q: Where does the "simple groups are the primes" analogy break down?
- [x] The composition factors do not determine the group — $\mathbb{Z}/6$ and $S_3$ share the factors $\mathbb{Z}/2$ and $\mathbb{Z}/3$ and are not isomorphic.
- [ ] The factorisation is not unique — Jordan–Hölder guarantees it is unique up to order and isomorphism.
- [ ] Some finite groups have no composition series — every finite group has one; you just keep taking maximal normal subgroups.
