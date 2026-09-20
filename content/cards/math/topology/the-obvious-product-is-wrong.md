---
id: math.topology.bases-products.the-obvious-product-is-wrong
topic: math.topology.bases-products
format: idea
difficulty: 4
language: en
weight: heavy
angles: [mistake, connection]
tags: [product-topology, box-topology, infinite-products, universal-property]
hook: "Write down the obvious topology on an infinite product and you destroy the only theorem products are for."
sources:
  - {title: "Product topology", type: wiki, url: "https://en.wikipedia.org/wiki/Product_topology"}
  - {title: "Box topology", type: wiki, url: "https://en.wikipedia.org/wiki/Box_topology"}
  - {title: "Topology, 2nd ed., §19", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The obvious way to build a product is the wrong one

For two factors, the basic open sets of $X \times Y$ are rectangles $U \times V$. Extend that to infinitely many factors in the obvious way — take all boxes $\prod U_i$ with every $U_i$ open — and you have defined the box topology. It is a perfectly legal topology. It is also useless.

The one thing a product is supposed to do is this: a map into it is continuous exactly when each of its coordinates is. In the box topology that fails on the very first example you would try. Send $t \mapsto (t, t, t, \dots)$ into $\mathbb{R}^\omega$. Every coordinate function is the identity map. The whole map is not continuous.

The repair is the same word that saved the axioms: in a basic open set, all but *finitely many* factors must be the entire space. Finiteness, again, is what keeps infinity from collapsing everything.

## Rigor

Let $f : \mathbb{R} \to \mathbb{R}^\omega$, $f(t)=(t,t,t,\dots)$, and let $B = \prod_{n\ge1}\left(-\tfrac1n,\tfrac1n\right)$, a basic box-open set containing $f(0)$. Then
$$f^{-1}(B)=\Big\{t : |t|<\tfrac1n \text{ for every } n\Big\}=\{0\},$$
which is not open, so $f$ is not continuous in the box topology.

In the **product topology**, a basis element is $\prod U_i$ with $U_i = X_i$ for all but finitely many $i$, so $f^{-1}$ of it is a finite intersection of open sets: open. In general, $f : Z \to \prod X_i$ is continuous iff every $\pi_i \circ f$ is — and that statement is exactly the universal property that makes $\prod X_i$ the categorical product.

Equivalently, the product topology is the coarsest topology making all projections continuous. Almost every theorem you want survives it: products of Hausdorff, of connected, of compact spaces stay Hausdorff, connected, compact. In the box topology, $\{0,1\}^\omega$ is discrete, so even compactness dies.

## Recall
type: mcq
Q: What breaks in the box topology on $\mathbb{R}^\omega$?
- [x] A map into the product can have all coordinates continuous yet fail to be continuous — $t\mapsto(t,t,\dots)$ is the standard witness.
- [ ] The projections stop being continuous — they stay continuous; the box topology is finer, so preimages of open sets are still open.
- [ ] The boxes fail to form a basis — they do form a basis; the trouble is the topology it generates, not the family itself.
