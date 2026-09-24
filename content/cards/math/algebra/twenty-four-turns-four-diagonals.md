---
id: math.algebra.group-actions.twenty-four-turns-four-diagonals
topic: math.algebra.group-actions
topics: [math.algebra.permutations]
format: challenge
difficulty: 3
language: en
weight: medium
angles: [beautiful, tool, paradox]
tags: [cube-rotations, symmetric-group, faithful-action, orbit-stabiliser, permutation-representation]
hook: "A cube has 24 rotations, and 24 is 4 factorial. Find the four things every rotation shuffles."
context: "context:2026-09:abstract-algebra"
related: [math.algebra.group-actions.the-group-leaves-home, math.algebra.group-actions.cayley-reads-the-multiplication-table]
sources:
  - {title: "Octahedral symmetry (the rotation group of the cube is isomorphic to S4)", type: wiki, url: "https://en.wikipedia.org/wiki/Octahedral_symmetry"}
  - {title: "Group action", type: wiki, url: "https://en.wikipedia.org/wiki/Group_action"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "'If it is S4, there are four features' is not an implication; recast it as the proof strategy. Checked the diagonal vectors (sum 0, any three a basis, det 4) and the ±I kernel argument."}
---

# A cube has 24 rotations. Find the four things they shuffle.

Count the ways to pick up a cube and set it back down in its own footprint. Any of six faces can go on the bottom, then there are four quarter-turns: 24 rotations. Now notice that $24=4!$, the number of ways to shuffle four objects.

Coincidence, or is the rotation group of the cube secretly $S_4$? To prove it, find four features of the cube that every rotation permutes, so that each of the 24 possible shuffles happens exactly once and a rotation is completely decided by what it does to those four.

Faces come in six, edges in twelve, corners in eight. None of those is four.

Find the four things. Then the proof is short.

## Rigor

An **action** of $G$ on a set $X$ is the same thing as a homomorphism $\rho:G\to\operatorname{Sym}(X)$, $\rho(g)(x)=g\cdot x$. It is **faithful** when $\ker\rho=\{e\}$; then $G$ is isomorphic to its image.

**$|G|=24$.** $G$ acts transitively on the 6 faces, and the stabiliser of the bottom face is the 4 rotations about the vertical axis. Orbit–stabiliser: $|G|=6\cdot4$.

**The four things are the long diagonals**, each joining a corner to the opposite corner. Put the corners at $(\pm1,\pm1,\pm1)$ and take one corner per diagonal:
$$v_1=(1,1,1),\ v_2=(1,-1,-1),\ v_3=(-1,1,-1),\ v_4=(-1,-1,1).$$
Then $v_1+v_2+v_3+v_4=0$, and any three of them form a basis of $\mathbb{R}^3$.

**The kernel is trivial.** Suppose a rotation $R$ sends every diagonal to itself. Then $Rv_i=\varepsilon_iv_i$ with $\varepsilon_i=\pm1$. Applying $R$ to the relation gives $\sum_i\varepsilon_iv_i=0$; subtracting $\varepsilon_4\sum_iv_i=0$ leaves $\sum_{i\le3}(\varepsilon_i-\varepsilon_4)v_i=0$, so all $\varepsilon_i$ are equal and $R=\pm I$. Since $\det(-I)=-1$ and rotations have determinant $1$, $R=I$.

So $\rho:G\to S_4$ is injective between two sets of size 24, hence an isomorphism.

## Recall
type: reveal
Q: Which four things do the cube's rotations shuffle, and why does only the identity leave all four in place?
A: The four long diagonals. A rotation fixing every diagonal sends each corner to itself or its opposite; the relation $v_1+v_2+v_3+v_4=0$ forces the same choice for all four, so the rotation is $I$ or $-I$, and $-I$ is a reflection through the centre, not a rotation.
