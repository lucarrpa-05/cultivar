---
id: math.analysis.riemann-integral.riemanns-integral-has-a-habit
topic: math.analysis.riemann-integral
topics: [math.analysis.measure-lebesgue]
format: series
difficulty: 3
language: en
weight: medium
angles: [mistake, paradox]
tags: [riemann-integral, dirichlet-function, pointwise-limit, darboux-sums, integrability]
hook: "Each function in the sequence is integrable. The limit is not. Riemann's integral is not stable under the one operation analysis lives on."
series: {id: math.analysis.riemann-to-lebesgue, index: 1, total: 4, title: "From Riemann to Lebesgue"}
sources:
  - {title: "Riemann integral", type: wiki, url: "https://en.wikipedia.org/wiki/Riemann_integral"}
  - {title: "Dirichlet function", type: wiki, url: "https://en.wikipedia.org/wiki/Dirichlet_function"}
  - {title: "Lebesgue integral", type: wiki, url: "https://en.wikipedia.org/wiki/Lebesgue_integral"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Riemann's integral has one fatal habit

List the rationals in $[0,1]$ as $q_1,q_2,q_3,\dots$ and let $f_n$ be the function that is $1$ on the first $n$ of them and $0$ everywhere else. Each $f_n$ is zero except at finitely many points, so each one is Riemann integrable with integral $0$. Easy.

Now let $n\to\infty$. The functions converge, pointwise, to the function that is $1$ on every rational and $0$ on every irrational. That limit is not Riemann integrable at all. Every upper sum equals $1$, every lower sum equals $0$, and they never meet.

The integrals were all $0$ and stayed $0$. What died was integrability itself. And this is not an exotic corner: Fourier series are limits, probability densities are limits, and nearly every theorem you want has the shape "pass to the limit under the integral". Riemann's construction keeps refusing at exactly that step.

The problem is not the rationals. It is *where Riemann chose to cut*.

## Rigor

Riemann integrability via Darboux: $f$ bounded on $[a,b]$ is integrable iff $\sup_P L(f,P)=\inf_P U(f,P)$ over partitions $P$. For $\mathbf{1}_{\mathbb{Q}}$, every subinterval contains both rationals and irrationals, so $\sup=1$ and $\inf=0$ on every piece:
$$U(f,P)=1,\qquad L(f,P)=0\quad\text{for every partition }P.$$

The diagnosis was proved in 1907 by Lebesgue and, independently, Vitali: a bounded $f$ on $[a,b]$ is Riemann integrable **iff its set of discontinuities has measure zero**. The finite-support $f_n$ are discontinuous at $n$ points — measure zero, fine. The limit is discontinuous at every point of $[0,1]$ — measure one, hopeless.

Notice what the criterion is made of. It is stated in the language of *measure*, a notion Riemann's definition never contains. The fix will be to build the integral out of that language instead. Next: what Lebesgue changed.

## Recall
type: mcq
Q: What exactly goes wrong when the $f_n$ converge to the indicator of the rationals?
- [x] Integrability is lost, not the value — each upper sum stays $1$ and each lower sum stays $0$, so the limit has no Riemann integral.
- [ ] The integrals converge to the wrong number — they are all $0$, and $0$ is also the Lebesgue integral of the limit.
- [ ] The convergence is not pointwise — it is: fix a rational and it is eventually in the list; fix an irrational and the value is always $0$.
