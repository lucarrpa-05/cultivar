---
id: math.optimization.linear-programming.the-answer-is-always-at-a-corner
topic: math.optimization.linear-programming
format: idea
difficulty: 4
language: en
weight: heavy
angles: [beautiful, tool]
tags: [simplex, extreme-points, klee-minty, interior-point, polyhedron]
hook: "A linear program has infinitely many feasible points and you only ever have to look at the corners. Then the corners fight back."
sources:
  - {title: "Linear programming", type: wiki, url: "https://en.wikipedia.org/wiki/Linear_programming"}
  - {title: "Klee-Minty cube", type: wiki, url: "https://en.wikipedia.org/wiki/Klee%E2%80%93Minty_cube"}
  - {title: "Simplex algorithm", type: wiki, url: "https://en.wikipedia.org/wiki/Simplex_algorithm"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved, notes: "An optimum can sit in the middle of a tied face, so corrected to 'a vertex is always among the winners'. Added the degeneracy / anti-cycling caveat to the simplex argument."}
---

# The answer is always at a corner

A linear program is a flat objective over a region cut out by flat walls. Picture tilting a plane over a polyhedron and asking where it touches highest. It is never in the interior, and even when a whole edge or face ties for best, a vertex is always among the winners.

That turns a search over a continuum into a search over a finite list. The simplex method exploits it directly: start at a corner, look along the edges leaving it, walk to a neighbour that improves the objective, repeat until no edge goes up. Because the objective strictly improves, you never revisit a corner, and there are finitely many.

Finitely many is not the same as few. A polyhedron in $n$ dimensions can have exponentially many vertices, and in 1972 Klee and Minty built a deformed cube on which the standard pivot rule visits every single one of the $2^{n}$.

In practice simplex is fast and the bad cubes never appear. Why that is true is still not properly understood.

## Rigor

**Fundamental theorem of LP.** If $P=\{x:Ax\le b,\ x\ge0\}$ is non-empty and $c^{\top}x$ is bounded above on $P$, the maximum is attained at an extreme point of $P$. Reason: $P$ is a polyhedron, every point of a pointed polyhedron is a convex combination of extreme points plus a recession direction, and a linear functional on a convex combination is at most its largest term.

Algebraically, extreme points are the **basic feasible solutions**: choose $m$ linearly independent columns of $A$, solve for those variables, set the rest to zero. There are at most $\binom{n}{m}$ of them. (When several bases name the same vertex — degeneracy — the objective can stall instead of strictly improving, which is why anti-cycling rules like Bland's exist.)

**Complexity.** Klee-Minty (1972) gives, for Dantzig's original pivot rule, an $n$-dimensional perturbed cube whose simplex path passes through all $2^{n}$ vertices. Polynomial-time algorithms exist but abandon the edges: Khachiyan's ellipsoid method (1979) and Karmarkar's interior-point method (1984) both move through the interior. Whether some algorithm solves LP in a number of arithmetic operations polynomial in $m$ and $n$ alone — a *strongly* polynomial algorithm — is Smale's ninth problem, and it is open.

Spielman and Teng's smoothed analysis (2004) explains simplex's practical speed: on slightly perturbed inputs its expected running time is polynomial.

## Recall
type: mcq
Q: Why does an optimal solution of a linear program sit at a vertex?
- [x] A linear objective attains its maximum at an extreme point — any other feasible point is a convex combination of vertices and cannot beat all of them.
- [ ] Because the feasible region is convex — convexity alone allows interior optima; linearity of the objective is what forces a corner.
- [ ] Because the constraints are inequalities — equality-constrained linear programs also attain their optima at vertices of the resulting polyhedron.
