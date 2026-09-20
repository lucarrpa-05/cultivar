---
id: math.number-theory.elliptic-curves.which-numbers-are-triangle-areas
topic: math.number-theory.elliptic-curves
format: idea
difficulty: 4
language: en
weight: heavy
angles: [connection, open-problem, beautiful]
tags: [congruent-numbers, elliptic-curves, group-law, tunnell, birch-swinnerton-dyer]
hook: "Is there a right triangle with rational sides and area 1? The honest answer runs through a 1000-year-old question."
sources:
  - {title: "Congruent number", type: wiki, url: "https://en.wikipedia.org/wiki/Congruent_number"}
  - {title: "Elliptic curve", type: wiki, url: "https://en.wikipedia.org/wiki/Elliptic_curve"}
  - {title: "Birch and Swinnerton-Dyer conjecture", type: wiki, url: "https://en.wikipedia.org/wiki/Birch_and_Swinnerton-Dyer_conjecture"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The torsion of E_n is Z/2×Z/2 — the three points with y=0 plus the identity; the card omitted the identity. Difficulty 3→4."}
---

# Which whole numbers are the area of a right triangle?

Rational sides only. Area 6 is easy: the 3-4-5 triangle. Area 5 is not obvious but works, with sides $3/2$, $20/3$, $41/6$. Area 7 works too, with uglier fractions.

Area 1? Area 2? Area 3? No. And "no" here is a theorem of Fermat, who invented infinite descent partly to prove it. Arab mathematicians were already circulating the question in the tenth century; it is one of the oldest unresolved problems in mathematics, and it is still unresolved.

What changed is the viewpoint. Chase the algebra and the triangle condition collapses into a single cubic curve, one curve per candidate area. The question "is $n$ a triangle area?" becomes "does this curve carry a rational point other than the obvious ones?" — and rational points on cubics have structure: you can *add* two of them and get a third, by drawing the line through them and taking the third intersection.

A geometry question about triangles has become a group.

## Rigor

$n$ is **congruent** if it is the area of a right triangle with rational sides.

**The translation.** $n$ is congruent iff the elliptic curve
$$E_n:\;y^2=x^3-n^2x$$
has a rational point with $y\neq0$. From a triangle $(a,b,c)$ with $ab/2=n$, set $x=n(a+c)/b$; the inverse map recovers the triangle. The points with $y=0$ are the torsion points $(0,0),(\pm n,0)$, always present and useless.

**The group law.** The rational points of $E$, with the point at infinity as identity, form an abelian group: to add $P$ and $Q$, take the line through them, find the third intersection, and reflect in the $x$-axis. Mordell (1922) proved $E(\mathbb{Q})\cong \mathbb{Z}^{r}\times E(\mathbb{Q})_{\text{tors}}$ — finitely generated. For $E_n$ the torsion is exactly those three points plus the identity at infinity, a copy of $\mathbb{Z}/2\times\mathbb{Z}/2$, so $n$ is congruent iff the **rank** $r$ is positive.

**Where it stands.** Tunnell (1983) gave a criterion you can check by counting solutions of two quadratic forms — but proving it detects congruent numbers, rather than merely failing to rule them out, requires the Birch–Swinnerton-Dyer conjecture, a Millennium Prize problem. So there is a one-minute test for a thousand-year-old question, and it is conditional.

## Recall
type: mcq
Q: What does "$n$ is a congruent number" become, after the translation to $y^2=x^3-n^2x$?
- [x] The curve has rank at least 1 — its torsion is only the three points with $y=0$ and the identity, so any further rational point makes the group infinite.
- [ ] The curve has a rational point — it always has four, counting infinity; the content is having one *beyond* those.
- [ ] The curve is singular — $E_n$ is smooth for every $n\ge1$; singular cubics have no interesting group.
- [ ] The curve has integer points — the triangle sides are rational, and rational points are what the correspondence produces.
