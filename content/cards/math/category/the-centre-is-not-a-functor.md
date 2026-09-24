---
id: math.category.categories-functors.the-centre-is-not-a-functor
topic: math.category.categories-functors
topics: [math.algebra.homomorphisms-quotients]
format: idea
difficulty: 3
language: en
weight: medium
angles: [paradox, tool]
tags: [centre, functoriality, retract, commutator-subgroup, impossibility-proof]
hook: "The commutator subgroup travels along every homomorphism. The centre cannot, and a two-element group proves it in three lines."
related: [math.topology.fundamental-group.maps-become-homomorphisms, math.category.categories-functors.borrowed-from-aristotle-and-carnap]
sources:
  - {title: "Functor", type: wiki, url: "https://en.wikipedia.org/wiki/Functor"}
  - {title: "Center (group theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Center_(group_theory)"}
  - {title: "Retract (category theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Retract_(category_theory)"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved}
---

# The centre of a group cannot be made into a functor

Most constructions from your algebra course travel along homomorphisms. The commutator subgroup does: a homomorphism sends commutators to commutators. Abelianisation does. The centre does not, and no cleverer definition can fix it.

Take the group with two elements and slip it inside the six symmetries of a triangle as one reflection. Then map back out by the sign of each symmetry. The round trip is the identity. The small group is its own centre; the triangle group's centre has one element. Any rule sending centres along homomorphisms would have to route two elements through one and bring both back.

That is how functors prove impossibility: equations between arrows must survive the trip.

## Rigor

**Claim.** No functor $F:\mathbf{Grp}\to\mathbf{Set}$ has $F(G)=Z(G)$ for every group $G$, whatever it does on arrows.

*Proof.* Let $i:\mathbb{Z}/2\to S_3$ send the generator to the transposition $(1\,2)$, and let $\operatorname{sgn}:S_3\to\mathbb{Z}/2$ be the sign. Then $\operatorname{sgn}\circ i=\mathrm{id}$, so $\mathbb{Z}/2$ is a **retract** of $S_3$. Functors preserve composition and identities, so $F(\operatorname{sgn})\circ F(i)=\mathrm{id}_{F(\mathbb{Z}/2)}$, which makes $F(i):Z(\mathbb{Z}/2)\to Z(S_3)$ injective. But $|Z(\mathbb{Z}/2)|=2$ and $|Z(S_3)|=1$. $\square$

**Contrast.** $G\mapsto[G,G]$ is a functor, because $\varphi([a,b])=[\varphi(a),\varphi(b)]$; so is $G\mapsto G/[G,G]$. The centre is functorial on the smaller category of groups with *surjective* homomorphisms: if $\varphi$ is onto and $z$ is central, $\varphi(z)$ commutes with every $\varphi(g)$, which is everything.

**The method.** A retract goes to a retract, and cardinality then says no. The proof that a disc cannot retract onto its boundary circle is the same argument with the fundamental group in place of the centre: $\mathbb{Z}$ would have to pass through the trivial group and come back intact.

## Recall
type: mcq
Q: Why can "take the centre" not be a functor on groups?
- [x] $\mathbb{Z}/2$ is a retract of $S_3$, so a functor would make a 2-element set a retract of a 1-element set — impossible.
- [ ] The centre is not a normal subgroup — it always is normal, and even characteristic.
- [ ] Homomorphisms never send central elements to central ones — surjective ones always do; the failure needs a map that is not onto.
