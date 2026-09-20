---
id: math.topology.separation-axioms.the-property-that-breaks-on-squares
topic: math.topology.separation-axioms
format: idea
difficulty: 4
language: en
weight: medium
angles: [weird, mistake]
tags: [normality, sorgenfrey-plane, jones-lemma, hereditary]
hook: "Hausdorff, regular, compact and connected all survive products. Normality fails, and it fails on a space times itself."
related: [math.topology.open-sets-topologies.change-one-bracket]
sources:
  - {title: "Sorgenfrey plane", type: wiki, url: "https://en.wikipedia.org/wiki/Sorgenfrey_plane"}
  - {title: "Normal space", type: wiki, url: "https://en.wikipedia.org/wiki/Normal_space"}
  - {title: "Topology, 2nd ed., §31–32", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Reworded open boxes as open sets, to avoid colliding with the box topology."}
---

# The property that breaks when you square it

Topological properties usually travel well. Take products of Hausdorff spaces and you get Hausdorff. Products of regular spaces are regular; of compact spaces, compact; of connected spaces, connected. Subspaces inherit Hausdorff, regular, metrizable.

Normality — disjoint closed sets can be wrapped in disjoint open sets — does neither. It is not inherited by subspaces, and it is not preserved by products. The cleanest demonstration is the lower limit topology from earlier: $\mathbb{R}_\ell$ is normal, comfortably so. Its square, the Sorgenfrey plane, is not.

This is not a technicality. Urysohn's lemma and the Tietze extension theorem — the two results that give you a supply of continuous functions — both run on normality. The moment you take a product, the fuel can vanish, which is exactly why metrization theorems have to assume something sturdier, like regularity plus a countability condition, instead of normality on its own.

The proof that the plane fails is a counting argument, and it is worth seeing.

## Rigor

In $\mathbb{R}_\ell^2$ the basic open sets are half-open boxes $[a,b)\times[c,d)$. Consider the anti-diagonal
$$L=\{(x,-x) : x \in \mathbb{R}\}.$$
$L$ is closed, and it is **discrete** in the subspace topology: the box $[x,x+1)\times[-x,-x+1)$ meets $L$ only at $(x,-x)$. So $L$ is a closed discrete subspace of size $\mathfrak{c}$.

Meanwhile $\mathbb{R}_\ell^2$ is separable: $\mathbb{Q}^2$ is dense, since every basic box contains a rational pair.

**Jones's lemma.** If $X$ is normal and separable and $D \subseteq X$ is closed and discrete, then $2^{|D|}\le 2^{\aleph_0}$. (Sketch: normality lets you assign to each $A \subseteq D$ a continuous function separating $A$ from $D\setminus A$; a countable dense set determines each function, so distinct subsets give distinct restrictions.)

Here $|L|=\mathfrak{c}=2^{\aleph_0}$, so normality would force $2^{\mathfrak c}\le\mathfrak c$. False. Hence $\mathbb{R}_\ell^2$ is not normal, even though each factor is.

## Recall
type: mcq
Q: What does the Sorgenfrey plane show?
- [x] Normality is not preserved by products — $\mathbb{R}_\ell$ is normal but $\mathbb{R}_\ell^2$ is not, because it packs an uncountable closed discrete set into a separable space.
- [ ] Hausdorffness is not preserved by products — it always is; a product of Hausdorff spaces is Hausdorff, no conditions needed.
- [ ] Compactness fails for infinite products — Tychonoff's theorem says the opposite, and the Sorgenfrey plane is only a product of two factors.
