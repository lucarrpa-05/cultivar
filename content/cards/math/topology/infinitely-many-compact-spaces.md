---
id: math.topology.tychonoff.infinitely-many-compact-spaces
topic: math.topology.tychonoff
format: series
difficulty: 4
language: en
weight: heavy
angles: [connection, paradox]
tags: [tychonoff, axiom-of-choice, infinite-products, ultrafilter]
hook: "A product of compact spaces is compact — even an uncountable one. The theorem is not merely proved with choice; it is equivalent to it."
series: {id: math.topology.taming-infinity, index: 3, total: 4, title: "Taming infinity"}
sources:
  - {title: "Tychonoff's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Tychonoff%27s_theorem"}
  - {title: "Boolean prime ideal theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Boolean_prime_ideal_theorem"}
  - {title: "The Tychonoff product theorem implies the axiom of choice", author: "John L. Kelley", year: 1950, type: paper, url: "https://doi.org/10.4064/fm-37-1-75-76"}
  - {title: "Topology, 2nd ed., §37", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Added the Kelley 1950 source (DOI verified via Crossref) and his actual construction for Tychonoff implies AC."}
---

# Infinitely many compact spaces, multiplied

A product of two compact spaces is compact, and the proof is an honest afternoon's work with tubes. Now take infinitely many factors: $[0,1]^{\mathbb{N}}$, or $[0,1]^{\mathbb{R}}$, or a product of two-point spaces indexed by every real number. Tychonoff's theorem says all of them are compact. Tikhonov proved the case of powers of the interval in 1930 and stated the general version in 1935.

The result is so useful that it is easy to miss how expensive it is. It is not that the proof happens to use the axiom of choice. Assume Tychonoff's theorem and you can *derive* the axiom of choice. They are the same statement in different clothing.

That should be unsettling. Compactness looked like a modest bookkeeping property about covers. It turns out that asserting it for arbitrary products is a commitment about what it means for a choice to exist at all.

## Rigor

**Theorem.** If each $X_i$ is compact, then $\prod_{i \in I} X_i$ is compact in the product topology.

Two remarks on where the cost sits. The Alexander subbase lemma reduces the proof to covers by subbasic sets $\pi_i^{-1}(U)$: if no finite subfamily covers, then for each $i$ the sets $U$ appearing with index $i$ fail to cover $X_i$, so *choose* $x_i \in X_i$ outside all of them. That choice, over an arbitrary index set, is the axiom of choice, and it is unavoidable. Kelley showed the converse in 1950, in a two-page note: given nonempty sets $A_i$, topologise $A_i \cup \{\infty_i\}$ so that the closed sets are the whole space together with every subset of $A_i$ — compact, and not Hausdorff — apply Tychonoff to the product, and the sets $\pi_i^{-1}(A_i)$ are closed with the finite intersection property, so a point in their intersection is an element of $\prod A_i$.

If every $X_i$ is Hausdorff, limits are unique and the second use of choice disappears; that weaker version is equivalent to the Boolean prime ideal theorem, strictly weaker than full choice.

The box topology enjoys none of this: $\{0,1\}^{\mathbb{N}}$ with box-open sets is discrete, hence not compact. Infinite products are compact only because their basic open sets constrain finitely many coordinates.

So compactness of products costs a foundational commitment. What does it buy? Something that does not look like topology at all. Episode 4.

## Recall
type: mcq
Q: What is the relationship between Tychonoff's theorem and the axiom of choice?
- [x] They are equivalent — Tychonoff needs choice, and conversely choice can be derived from Tychonoff for arbitrary products.
- [ ] Tychonoff is a theorem of ZF alone — it is not; without choice the arbitrary product of nonempty sets can be empty, which already kills it.
- [ ] Tychonoff is strictly weaker than choice in every form — the Hausdorff-factor version is strictly weaker, but the full theorem is exactly as strong as choice.
