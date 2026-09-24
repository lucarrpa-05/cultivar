---
id: math.algebra.homomorphisms-quotients.normal-inside-normal-is-not-normal
topic: math.algebra.homomorphisms-quotients
topics: [math.algebra.subgroups-lagrange]
format: fact
difficulty: 3
language: en
weight: medium
angles: [paradox, mistake]
tags: [normal-subgroup, transitivity, dihedral-group, characteristic-subgroup, counterexample]
hook: "A normal subgroup of a normal subgroup does not have to be normal. The eight symmetries of a square show it."
related: [math.algebra.homomorphisms-quotients.forgetting-on-purpose]
sources:
  - {title: "Normal subgroup (normality is not transitive)", type: wiki, url: "https://en.wikipedia.org/wiki/Normal_subgroup"}
  - {title: "Characteristic subgroup", type: wiki, url: "https://en.wikipedia.org/wiki/Characteristic_subgroup"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "weight light to medium (it has a rigor section). Conjugation computation and the characteristic-subgroup counterexample checked."}
---

# A normal subgroup of a normal subgroup need not be normal

Normality feels like the kind of property that should pass down a chain. It doesn't. In the eight symmetries of a square, let $r$ be a quarter-turn and $s$ a reflection. The four symmetries $\{e, r^2, s, r^2s\}$ form a normal subgroup, since it has index 2. Inside it, $\{e,s\}$ is normal, again index 2. But in the whole group, conjugating $s$ by a quarter-turn gives $r^2s$, the reflection in the perpendicular axis. So $\{e,s\}$ is not normal.

## Rigor

Write $D_8=\langle r,s\mid r^4=s^2=e,\ srs^{-1}=r^{-1}\rangle$, as in Dummit and Foote, and let $K=\{e,r^2,s,r^2s\}$ and $H=\{e,s\}$.

**$K\trianglelefteq D_8$.** $[D_8:K]=2$, and a subgroup of index 2 is normal: its left cosets and right cosets are both "$K$ and everything else".

**$H\trianglelefteq K$.** Same reason; or note that $K\cong\mathbb{Z}/2\times\mathbb{Z}/2$ is abelian.

**$H\ntrianglelefteq D_8$.** From $srs^{-1}=r^{-1}$ we get $sr^{-1}=rs$, so
$$rsr^{-1}=r\,(sr^{-1})=r\,(rs)=r^2s\notin H .$$

**What does pass down.** Call $H\le N$ **characteristic** if every automorphism of $N$ maps $H$ to itself. If $H$ is characteristic in $N$ and $N\trianglelefteq G$, then $H\trianglelefteq G$: conjugation by any $g$ restricts to an automorphism of $N$, which fixes $H$. The centre and the commutator subgroup are characteristic, which is why they are normal wherever their parent is. Here $H$ is not characteristic in $K$: the automorphism of $K$ swapping $s$ and $r^2$ moves it.
