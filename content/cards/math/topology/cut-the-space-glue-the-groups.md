---
id: math.topology.fundamental-group.cut-the-space-glue-the-groups
topic: math.topology.fundamental-group
format: series
difficulty: 4
language: en
weight: heavy
angles: [tool, beautiful]
tags: [van-kampen, free-group, figure-eight, commutator]
hook: "With two trees instead of one, going around A then B is genuinely different from B then A — and the difference is a loop around nothing."
series: {id: math.topology.holes, index: 4, total: 4, title: "Holes"}
sources:
  - {title: "Seifert–Van Kampen theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Seifert%E2%80%93Van_Kampen_theorem"}
  - {title: "Free group", type: wiki, url: "https://en.wikipedia.org/wiki/Free_group"}
  - {title: "Topology, 2nd ed., §70", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Added the missing van Kampen hypothesis (U and V path connected) and the two-arc cover of the circle that shows why it is needed."}
---

# Cut the space in two, glue the groups

Computing $\pi_1(S^1)$ took an entire covering space. You cannot do that for every space. What you can do is chop a space into two overlapping open pieces, compute each piece, and assemble — that is the Seifert–van Kampen theorem, and it is the reason $\pi_1$ is a practical tool rather than a beautiful one.

Run it on two trees: the plane with two points removed, which deformation retracts onto a figure eight. Each loop of the eight contributes a generator, the overlap contributes nothing, and the answer is the **free group on two generators** — every reduced word in $a$, $b$, $a^{-1}$, $b^{-1}$, and no relations at all.

Free means non-commutative, and that is the episode-1 leash again, with a second tree. Walking around $A$ then $B$ leaves the leash in a genuinely different state than $B$ then $A$: $ab \ne ba$. The gap between them is the commutator $aba^{-1}b^{-1}$, a loop with winding number zero around each tree individually and which still cannot be pulled free of both. A hole you can only see when there are two of them.

## Rigor

**Seifert–van Kampen.** Let $X=U\cup V$ with $U,V$ open and path connected, $U\cap V$ path connected and nonempty, $x_0 \in U \cap V$. Every path-connectedness clause is load-bearing: drop the one on $U\cap V$, cover $S^1$ by two arcs, and the theorem would "prove" $\pi_1(S^1)=0$. Then $\pi_1(X,x_0)$ is the pushout
$$\pi_1(X)\cong \pi_1(U)*_{\pi_1(U\cap V)}\pi_1(V),$$
the free product of $\pi_1(U)$ and $\pi_1(V)$ amalgamated over the images of $\pi_1(U\cap V)$. Concretely: generators from each side, relations from each side, plus one relation $i_{*}(\gamma)=j_{*}(\gamma)$ for each generator $\gamma$ of the overlap.

**Figure eight.** Let $X=S^1\vee S^1$. Take $U$ = left circle plus a small arc of the right, $V$ = the mirror image. Each deformation retracts to a circle, so $\pi_1(U)\cong\pi_1(V)\cong\mathbb{Z}$; $U\cap V$ is a contractible cross, so $\pi_1(U\cap V)=0$ and there are no amalgamation relations. Hence
$$\pi_1(S^1\vee S^1)\cong\mathbb{Z}*\mathbb{Z}=F_2=\langle a,b\mid\ \rangle .$$

$F_2$ is non-abelian, and $[a,b]=aba^{-1}b^{-1}\ne e$. Abelianising kills exactly that: $H_1(S^1\vee S^1)\cong\mathbb{Z}^2$, which counts the holes but forgets the order — which is precisely what homology gives up in exchange for being computable.

## Recall
type: mcq
Q: Why is $\pi_1$ of the plane minus two points non-abelian?
- [x] Van Kampen makes it the free group on two generators, with no relations — so $ab$ and $ba$ are different words and different loop classes.
- [ ] Because the two punctures are at different distances — positions are irrelevant; any two punctures give the same free group.
- [ ] Because $\pi_1$ is never abelian for non-simply-connected spaces — $\pi_1(S^1)=\mathbb{Z}$ and $\pi_1$ of the torus is $\mathbb{Z}^2$, both abelian.
