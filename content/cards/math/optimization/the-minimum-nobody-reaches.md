---
id: math.optimization.calculus-of-variations.the-minimum-nobody-reaches
topic: math.optimization.calculus-of-variations
topics: [math.analysis.hilbert-functional]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [mistake, paradox]
tags: [dirichlet-principle, weierstrass, direct-method, infimum, hilbert]
hook: "Riemann assumed the minimum exists. Weierstrass wrote down a problem where it does not, and the field stalled for thirty years."
sources:
  - {title: "Dirichlet's principle", type: wiki, url: "https://en.wikipedia.org/wiki/Dirichlet%27s_principle"}
  - {title: "Direct method in the calculus of variations", type: wiki, url: "https://en.wikipedia.org/wiki/Direct_method_in_the_calculus_of_variations"}
  - {title: "Bernhard Riemann", type: wiki, url: "https://en.wikipedia.org/wiki/Bernhard_Riemann"}
dates: {written: 2026-09-19, event: 1870-01-01}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The minimum that nobody reaches

Riemann used a move he learned from Dirichlet and it was too good to question. Among all functions with prescribed boundary values, take the one that minimises the total energy; that minimiser exists because the energy is never negative, so it has a smallest value; and the minimiser turns out to be harmonic. Existence of solutions, for free.

In 1870 Weierstrass pointed out the hole. A quantity that is bounded below has an infimum — that is the completeness of the reals, and it is free. It does not have a *minimum*. The value you are approaching may simply not be achieved by anything in the set.

He supplied an energy of exactly that kind: a perfectly reasonable functional whose infimum is zero, whose values get as close to zero as you like, and which is never zero. The minimising sequence goes somewhere the space does not contain.

Everything Riemann had built on the principle was suddenly resting on an assumption. Hilbert repaired it around 1900, and the repair became the standard technique in the subject.

## Rigor

**Weierstrass's example.** Over continuous, piecewise-$C^{1}$ functions on $[-1,1]$ with $y(-1)=-1$, $y(1)=1$, take
$$J(y)=\int_{-1}^{1}x^{2}\,y'(x)^{2}\,dx\ \ge\ 0 .$$
Take $y_n(x)=\dfrac{\arctan(nx)}{\arctan n}$. Each is admissible and $J(y_n)=\dfrac{1}{n\arctan^{2}n}\displaystyle\int_{-n}^{n}\frac{u^{2}}{(1+u^{2})^{2}}du\to0$, so $\inf J=0$. But $J(y)=0$ forces $y'=0$ for every $x\ne0$, hence $y$ constant on each side of the origin, which a continuous function cannot reconcile with $y(\pm1)=\pm1$. No minimiser.

**The repair: the direct method** (Hilbert, then Tonelli). To minimise $J$ on a set $\mathcal{A}$:
1. take a minimising sequence $J(y_n)\to\inf J$;
2. use **coercivity** to bound it, then extract a *weakly* convergent subsequence $y_n\rightharpoonup y$ — the compactness must be weak, since norm-bounded sets in infinite dimensions are not compact;
3. conclude with **weak lower semicontinuity**, $J(y)\le\liminf J(y_n)=\inf J$.

Weierstrass's functional fails step 2: the weight $x^{2}$ vanishes at the origin, so $J$ does not control the derivative there and the sequence escapes the space. The fix is never "try harder"; it is to change the space until the limit lives in it, which is how Sobolev spaces entered the subject.

## Recall
type: mcq
Q: Why is "bounded below, so a minimum exists" wrong?
- [x] Completeness gives an infimum, not an attained value — a minimising sequence can converge to something outside the set of admissible functions.
- [ ] The functional might be unbounded — it is bounded below by assumption; the failure happens with the bound in place.
- [ ] The infimum might be negative — sign is irrelevant; Weierstrass's example has infimum exactly zero and still no minimiser.
