---
id: math.topology.bases-products.nobody-checks-all-the-open-sets
topic: math.topology.bases-products
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, practical]
tags: [basis, subbasis, comparing-topologies, generated-topology]
hook: "A topology on the plane has more open sets than you can list. You never touch more than a countable handful of them."
sources:
  - {title: "Base (topology)", type: wiki, url: "https://en.wikipedia.org/wiki/Base_(topology)"}
  - {title: "Topology, 2nd ed., §13", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Fixed a false claim: the plane has exactly continuum-many open sets, not more than there are reals. Uncountability is the real point."}
---

# Nobody has ever checked all the open sets

The standard topology on the plane has uncountably many open sets — one for every set of rational rectangles you might union together. You have never verified a single claim about all of them, and you never will. Every proof you write goes through a basis: the open discs, or the open rectangles with rational corners, of which there are only countably many.

A basis is a small family from which every open set is a union. That is all it is, and it converts impossible global checks into local ones. Continuity: enough to check preimages of basic sets. Convergence: enough to check basic neighbourhoods.

The payoff most worth remembering is the comparison test. To decide whether one topology is finer than another — a question about two uncountable collections — you only have to look at one point and one basic set at a time. That is Munkres's Lemma 13.3, and it is the workhorse of the whole chapter.

## Rigor

$\mathcal{B}$ is a **basis** on $X$ if it covers $X$ and, for $x \in B_1 \cap B_2$ with $B_i \in \mathcal{B}$, some $B_3 \in \mathcal{B}$ has $x \in B_3 \subseteq B_1 \cap B_2$. The topology it generates is $\{U : \forall x \in U, \exists B \in \mathcal{B}, x \in B \subseteq U\}$, which is exactly the set of unions of members of $\mathcal{B}$.

**Comparison.** Let $\mathcal{B}$ and $\mathcal{B}'$ generate $\mathcal{T}$ and $\mathcal{T}'$. Then $\mathcal{T} \subseteq \mathcal{T}'$ iff for every $x$ and every $B \in \mathcal{B}$ with $x \in B$, there is $B' \in \mathcal{B}'$ with $x \in B' \subseteq B$. Two quantifiers over points and basic sets replace a comparison of two uncountable families.

Example: $[a,b)$ sits inside no interval $(c,d)$ containing $a$, but $(a,b)=\bigcup_n[a+\tfrac1n,b)$. So the lower limit topology is strictly finer than the standard one — a full proof in one line.

A **subbasis** relaxes this further: any family $\mathcal{S}$ covering $X$ generates a topology, with finite intersections of members of $\mathcal{S}$ as a basis.

## Recall
type: mcq
Q: To prove that topology $\mathcal{T}'$ is finer than $\mathcal{T}$, what is enough?
- [x] For each point $x$ and each basic $\mathcal{T}$-set around it, find a basic $\mathcal{T}'$-set squeezed between $x$ and it — one point at a time, one basic set at a time.
- [ ] Show $\mathcal{T}'$ has strictly more sets by cardinality — finer is about containment, and two topologies can have the same size while neither contains the other.
- [ ] Show every $\mathcal{T}'$-open set is a union of $\mathcal{T}$-open sets — that would make $\mathcal{T}'$ coarser, not finer.
