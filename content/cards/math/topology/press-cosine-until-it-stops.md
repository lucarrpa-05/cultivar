---
id: math.analysis.metric-spaces.press-cosine-until-it-stops
topic: math.analysis.metric-spaces
topics: [math.topology.fixed-points]
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, numbers]
tags: [banach-fixed-point, contraction, dottie-number, iteration]
hook: "Type any number into a calculator in radians and press cos over and over. It always lands on 0.7390851332."
sources:
  - {title: "Banach fixed-point theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Banach_fixed-point_theorem"}
  - {title: "Dottie number", type: wiki, url: "https://en.wikipedia.org/wiki/Dottie_number"}
  - {title: "Contraction mapping", type: wiki, url: "https://en.wikipedia.org/wiki/Contraction_mapping"}
dates: {written: 2026-09-19, event: 1922-01-01}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Cosine is not a contraction on all of R; fixed that, and the display needs about sixty presses to settle ten digits, not thirty."}
---

# Press cosine until the calculator stops changing

Put a calculator in radians, type any number, and press cos repeatedly. After about sixty presses the display stops moving at $0.7390851332\ldots$ — the same number whether you started at $0$, at $1000$, or at $-17$. It even has a name: Samuel Kaplan called it the Dottie number in 2007, after a professor of French who noticed it on her own calculator.

The number is a curiosity. The reason behind it is a tool you will use for the rest of your life.

One press drops you into a narrow band around $0.74$, and inside it cosine pulls points together: the gap between two inputs shrinks by a fixed factor every press. Banach's theorem from 1922 says that any map on a complete space that shrinks all distances by a fixed factor has exactly one fixed point, and that iterating from *anywhere* converges to it.

Compare Brouwer's theorem, which also promises a fixed point and then leaves you standing there. Banach hands you the algorithm, the uniqueness, and an error bound after $n$ steps. That is why every existence-and-uniqueness theorem for differential equations is this theorem wearing a coat.

## Rigor

**Banach fixed-point theorem.** Let $(X,d)$ be a nonempty complete metric space and $f : X \to X$ satisfy $d(f(x),f(y))\le q\,d(x,y)$ for some fixed $q<1$. Then $f$ has a unique fixed point $x^{*}$, and for any $x_0$ the iterates $x_{n+1}=f(x_n)$ converge to it with
$$d(x_n,x^{*})\le \frac{q^{n}}{1-q}\,d(x_0,x_1).$$

Proof sketch: $d(x_{n+1},x_n)\le q^n d(x_1,x_0)$, so the tail sums are dominated by a geometric series and $(x_n)$ is Cauchy; completeness gives a limit, continuity gives $f(x^{*})=x^{*}$, and two fixed points would satisfy $d\le qd$, forcing $d=0$.

Why cosine qualifies: $\cos$ maps $\mathbb{R}$ into $[-1,1]$ and then $[-1,1]$ into $[\cos 1, 1]\subset[0.54,1]$, which it maps into itself. On that interval $|\cos'|=|\sin|\le\sin 1\approx0.8415<1$, so by the mean value theorem $\cos$ is a contraction there with $q=\sin 1$. The first press puts you inside the invariant interval; everything after is Banach.

Unlike Brouwer's theorem, this one is constructive, and the bound tells you when to stop.

## Recall
type: mcq
Q: What does Banach's fixed-point theorem give you that Brouwer's does not?
- [x] Uniqueness, an algorithm, and an error bound — iterating from any starting point converges, with $q^n/(1-q)$ controlling the distance.
- [ ] Applicability to non-convex sets — Banach needs completeness rather than convexity, but that is not the difference that matters here.
- [ ] A fixed point without continuity — a contraction is automatically continuous; contraction is a stronger hypothesis, not a weaker one.
