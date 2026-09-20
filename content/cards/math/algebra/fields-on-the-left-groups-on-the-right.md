---
id: math.algebra.galois.fields-on-the-left-groups-on-the-right
topic: math.algebra.galois
format: series
difficulty: 4
language: en
weight: heavy
angles: [beautiful, connection]
tags: [galois-correspondence, fixed-field, intermediate-fields, klein-four-group, splitting-field]
hook: "Two lattices that look nothing alike turn out to be the same lattice, upside down. That is the whole of Galois theory."
series: {id: math.algebra.why-you-cannot-solve-the-quintic, index: 3, total: 4, title: "Why you can't solve the quintic"}
sources:
  - {title: "Galois theory", type: wiki, url: "https://en.wikipedia.org/wiki/Galois_theory"}
  - {title: "Fundamental theorem of Galois theory", type: wiki, url: "https://en.wikipedia.org/wiki/Fundamental_theorem_of_Galois_theory"}
dates: {written: 2026-09-19}
diagram: {file: math/galois-correspondence.svg, caption: "The three fields between the rationals and Q(root2, root3), mirrored by the three subgroups of order 2.", alt: "Two diamond-shaped lattices side by side, one of fields and one of subgroups, drawn so that matching levels line up and inclusions run in opposite directions"}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Fields on the left, groups on the right, and a perfect mirror

Episode 2 left us with the question: which permutation groups can a tower of radicals take apart? Galois turned that into a machine by noticing that two lattices which look nothing alike are the same lattice, reflected.

On one side, every field squeezed between your base field and the splitting field of your polynomial. On the other, every subgroup of the group of symmetries of the roots. The correspondence matches them exactly, and it reverses inclusions: bigger field, smaller group.

Take $\mathbb{Q}(\sqrt2,\sqrt3)$ over $\mathbb{Q}$. You may flip the sign of $\sqrt2$, independently flip the sign of $\sqrt3$, so the symmetry group is the Klein four-group. It has three subgroups of order 2. So there must be exactly three fields in between — and there are: $\mathbb{Q}(\sqrt2)$, $\mathbb{Q}(\sqrt3)$, and $\mathbb{Q}(\sqrt6)$. That last one is easy to forget and the group never does.

With the dictionary in hand, "is there a formula?" becomes a question about subgroups. Which groups can be taken apart in abelian steps?

## Rigor

Let $K/F$ be a finite Galois extension (normal and separable) with $G=\operatorname{Gal}(K/F)$.

**Fundamental theorem.** The maps
$$H\ \longmapsto\ K^{H}=\{x\in K: \sigma x = x\ \forall\sigma\in H\},\qquad L\ \longmapsto\ \operatorname{Gal}(K/L)$$
are mutually inverse, inclusion-reversing bijections between subgroups of $G$ and fields $F\subseteq L\subseteq K$. Moreover $[K:K^{H}]=|H|$ and $[K^{H}:F]=[G:H]$, and $K^{H}/F$ is Galois exactly when $H\trianglelefteq G$, in which case $\operatorname{Gal}(K^{H}/F)\cong G/H$.

**The example.** $K=\mathbb{Q}(\sqrt2,\sqrt3)$ has degree 4 over $\mathbb{Q}$, with $G=\{1,\sigma,\tau,\sigma\tau\}\cong(\mathbb{Z}/2)^2$ where $\sigma:\sqrt2\mapsto-\sqrt2$ and $\tau:\sqrt3\mapsto-\sqrt3$. Then $K^{\langle\sigma\rangle}=\mathbb{Q}(\sqrt3)$, $K^{\langle\tau\rangle}=\mathbb{Q}(\sqrt2)$, and $K^{\langle\sigma\tau\rangle}=\mathbb{Q}(\sqrt6)$, since $\sigma\tau$ fixes $\sqrt2\sqrt3$. Three subgroups, three fields, inclusions reversed.

Every subgroup here is normal, so every intermediate field is Galois over $\mathbb{Q}$ — which is exactly what "you can build it by adjoining one square root at a time" looks like on the group side.

## Recall
type: mcq
Q: In the Galois correspondence, what does it mean for an intermediate field $L$ to be *normal* over the base?
- [x] The matching subgroup is normal in $G$ — and then $\operatorname{Gal}(L/F)$ is exactly the quotient $G/\operatorname{Gal}(K/L)$.
- [ ] The matching subgroup is the whole of $G$ — that corresponds to $L = F$ itself, which is a single case, not a criterion.
- [ ] The extension $K/L$ has prime degree — degree tells you the subgroup's order, not whether it is normal.
