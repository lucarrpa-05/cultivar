---
id: math.analysis.metric-spaces.change-the-ruler-change-the-limit
topic: math.analysis.metric-spaces
topics: [math.analysis.completeness-banach]
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, connection]
tags: [sup-metric, l1-metric, function-spaces, convergence, modelling-choice]
related: [math.analysis.completeness-banach.completeness-is-a-promise]
hook: "Convergence is not a property of a sequence. It is a property of a sequence plus the ruler you chose to measure with."
sources:
  - {title: "Uniform norm", type: wiki, url: "https://en.wikipedia.org/wiki/Uniform_norm"}
  - {title: "Lp space", type: wiki, url: "https://en.wikipedia.org/wiki/Lp_space"}
  - {title: "Principles of Mathematical Analysis, 3rd ed., ch. 7", author: "Walter Rudin", year: 1976, type: book, url: "https://en.wikipedia.org/wiki/Principles_of_Mathematical_Analysis"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Cross-linked to the completeness card, which shares the C[0,1] example."}
---

# Change the ruler and the same sequence stops converging

Take the continuous functions on $[0,1]$ and put two different distances on them. The first asks for the worst disagreement anywhere: $d_\infty(f,g)=\sup|f-g|$. The second asks for the total disagreement: $d_1(f,g)=\int_0^1|f-g|$.

Now watch $f_n(x)=x^{n}$. Under $d_1$ it converges to the zero function: the area under $x^n$ is $1/(n+1)$, which goes to nothing. Under $d_\infty$ it does not converge to zero at all, because $f_n(1)=1$ forever. Same functions, same order, two verdicts.

This is not a pathology to be avoided; it is the job. A metric encodes what you are willing to ignore. The sup metric refuses to ignore a single bad point, which is why it protects continuity. The $d_1$ metric ignores anything thin, which is why it is the right one for mass, probability and energy — and why it will force you to accept limits that are not continuous functions at all.

Choosing the metric *is* the modelling decision.

## Rigor

On $C[0,1]$: $\;d_\infty(f,g)=\|f-g\|_\infty$ and $d_1(f,g)=\|f-g\|_1$. Since $\|h\|_1\le\|h\|_\infty$ on a set of measure one, $d_\infty$-convergence implies $d_1$-convergence; the spike $g_n$ equal to $1$ at $0$, $0$ on $[1/n,1]$ and linear between has $\|g_n\|_1=\tfrac1{2n}\to0$ with $\|g_n\|_\infty=1$, so the converse fails.

The deeper asymmetry is completeness. $(C[0,1],d_\infty)$ is complete: a $d_\infty$-Cauchy sequence converges uniformly, and a uniform limit of continuous functions is continuous. $(C[0,1],d_1)$ is not: let $h_n$ climb from $0$ to $1$ linearly on $[\tfrac12,\tfrac12+\tfrac1n]$. It is $d_1$-Cauchy, and its only sensible limit is a step function, which is not in the space.

That missing limit is where $L^1$ comes from. The "ruler that ignores thin things" forces you to enlarge the space until the limits exist.

## Recall
type: mcq
Q: Why does $x^n$ converge to $0$ in the $d_1$ metric but not the sup metric?
- [x] The graph stays pinned at height $1$ at $x=1$, but the area under it shrinks — the two metrics disagree about whether a thin spike counts.
- [ ] Because $x^n$ is not continuous for large $n$ — every $x^n$ is a polynomial, continuous everywhere.
- [ ] Because $d_1$ is not a metric on $C[0,1]$ — it is; two continuous functions with $\int|f-g|=0$ are equal.
