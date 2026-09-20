---
id: math.analysis.completeness-banach.the-map-on-the-floor
topic: math.analysis.completeness-banach
topics: [math.analysis.ode-dynamics]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [tool, beautiful]
tags: [contraction-mapping, banach-fixed-point, picard-lindelof, iteration, existence-uniqueness]
hook: "Drop a map of Bogota on the floor in Bogota. Exactly one point of the paper lies directly above the place it represents."
sources:
  - {title: "Banach fixed-point theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Banach_fixed-point_theorem"}
  - {title: "Picard-Lindelof theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Picard%E2%80%93Lindel%C3%B6f_theorem"}
  - {title: "Sur les operations dans les ensembles abstraits et leur application aux equations integrales", author: "Stefan Banach", year: 1922, type: paper, url: "https://doi.org/10.4064/fm-3-1-133-181"}
dates: {written: 2026-09-19, event: 1922-01-01}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Picard-Lindelof: the Lipschitz constant is now uniform in t, and the local version (invariant ball, h below b/max|f|) that the statement skipped has been added."}
---

# Fold the map, and one point stays where it is

Lay a street map of Bogotá on the floor of a room in Bogotá. Exactly one point of the paper sits directly above the point of the city it represents. Crumple the map, rotate it, shrink it — still exactly one. The reason is that printing a map shrinks distances, and shrinking maps have nowhere to hide.

That is Banach's theorem from 1922, and it is the most useful theorem in analysis that a first course can prove in six lines. It is worth more than existence, though: the proof is an algorithm. Start anywhere, apply the map, apply it again. The iterates converge to the fixed point geometrically, and you get an error bound after every step for free.

Its best-known job has nothing to do with maps. An initial value problem $y'=f(t,y)$, $y(t_0)=y_0$ becomes a fixed point of an integral operator, and "the solution exists and is unique" becomes "this operator shrinks distances". Existence proofs stop being magic and start being iteration.

## Rigor

**Banach (1922).** Let $(X,d)$ be a non-empty *complete* metric space and $T:X\to X$ satisfy $d(Tx,Ty)\le q\,d(x,y)$ with $q<1$. Then $T$ has exactly one fixed point $x^{*}$, and $x_{n+1}=Tx_n$ converges to it from any start, with $d(x_n,x^{*})\le \frac{q^{n}}{1-q}d(x_1,x_0)$.

*Proof.* $d(x_{n+1},x_n)\le q^{n}d(x_1,x_0)$, so the tail sums are dominated by a geometric series and $(x_n)$ is Cauchy. Completeness supplies the limit; continuity of $T$ gives $Tx^{*}=x^{*}$; two fixed points would satisfy $d\le qd$, forcing $d=0$.

**Picard-Lindelöf.** If $f$ is continuous in $t$ and Lipschitz in $y$ with a constant $L$ that does not depend on $t$, define on $C([t_0-h,t_0+h])$
$$(Ty)(t)=y_0+\int_{t_0}^{t}f(s,y(s))\,ds .$$
Then $\|Ty-Tz\|_\infty\le Lh\|y-z\|_\infty$, a contraction once $h<1/L$. Fixed points of $T$ are exactly solutions of the ODE. If $f$ is Lipschitz only on a rectangle about $(t_0,y_0)$, run the same argument inside the closed ball $\|y-y_0\|_\infty\le b$ — still complete — and shrink $h$ below $b/\max|f|$ so that $T$ maps it into itself. The sup norm is the ruler, completeness supplies the limit, and the iteration is Picard's.

## Recall
type: mcq
Q: Which hypothesis of the contraction mapping theorem is doing the existence work?
- [x] Completeness of the space — it is what turns the Cauchy sequence of iterates into an actual point.
- [ ] Continuity of $T$ — it follows from the contraction condition and is only used to identify the limit.
- [ ] Compactness of the space — never assumed; the theorem works on unbounded complete spaces like $C[a,b]$.
