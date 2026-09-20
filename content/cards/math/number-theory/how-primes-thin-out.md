---
id: math.number-theory.prime-distribution.how-primes-thin-out
topic: math.number-theory.prime-distribution
topics: [math.analysis.series]
format: idea
difficulty: 3
language: en
weight: medium
angles: [numbers, beautiful, tool]
tags: [prime-number-theorem, logarithmic-integral, chebyshev, hadamard]
hook: "A number near a million is prime with probability about 1 in 14. Gauss spotted the rule at fifteen, from a table."
diagram: {file: math/prime-staircase.svg, caption: "The staircase counts primes; the two curves are the crude guess x/log x and the sharp one, Li(x).", alt: "A step function rising to 25 by x equal to 100, with a dashed curve below it and a dotted curve slightly above it"}
sources:
  - {title: "Prime number theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Prime_number_theorem"}
  - {title: "Prime-counting function", type: wiki, url: "https://en.wikipedia.org/wiki/Prime-counting_function"}
  - {title: "Logarithmic integral function", type: wiki, url: "https://en.wikipedia.org/wiki/Logarithmic_integral_function"}
dates: {written: 2026-09-19, event: 1896-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "A distractor called √10⁹ \"the count of primes you would need to sieve\"; it is the largest prime you sieve with."}
---

# The primes thin out, and they do it on schedule

Primes look lawless up close. 2, 3, 5, 7, then a gap, then twins at 11 and 13, then nothing until 17. No formula generates them in order and nobody expects one.

Step back far enough and a law appears anyway. Near a number $x$, the chance that a random integer is prime is about $1/\log x$. Near a thousand, one in seven. Near a million, one in fourteen. Near a billion, one in twenty-one. The primes are not scheduled, but their *density* is.

Gauss noticed this at about fifteen, reading a table of primes, and guessed the count should be the running total of those chances — an integral, not a fraction. His guess is dramatically better than the simple version, and you can see the gap in the picture.

Proving any of it took another century and a detour through complex analysis that nobody saw coming.

## Rigor

**Prime number theorem.** With $\pi(x)=\#\{p\le x : p \text{ prime}\}$,
$$\pi(x)\sim\frac{x}{\log x},\qquad\text{and better,}\qquad \pi(x)\sim \mathrm{Li}(x)=\int_2^x\frac{dt}{\log t}.$$
Both are asymptotic statements: the ratio tends to 1. Proved independently by Hadamard and de la Vallée Poussin in 1896.

**How good is "better".** At $x=10^9$: $\pi(x)=50\,847\,534$, while $x/\log x\approx 48\,254\,942$ — off by 5% — and $\mathrm{Li}(x)$ is off by 1701, about 0.003%. The crude version and the sharp one are both "asymptotically correct"; only one is usable.

**Where it comes from.** Chebyshev (1852) got $\pi(x)$ pinned between constants times $x/\log x$ by elementary means. The theorem itself is equivalent to $\zeta(s)\neq 0$ on the line $\mathrm{Re}(s)=1$. The bridge is the Euler product: $\log\zeta(s)=\sum_p\sum_k \frac{1}{k}p^{-ks}$, so a pole or zero of $\zeta$ is a statement about primes, and contour-shifting turns analytic facts into counting facts.

**The remaining question is the error.** "$1$ in $\log x$" is settled. *How far* $\pi(x)$ strays from $\mathrm{Li}(x)$ is exactly the Riemann hypothesis.

## Recall
type: mcq
Q: Roughly how many primes are there below one billion?
- [x] About 50 million — $10^9/\log(10^9)\approx 4.8\times10^7$, and the true value is 50 847 534.
- [ ] About 5 million — that is off by a factor of ten; it would mean primes were ten times rarer than they are.
- [ ] About 500 million — that is one in two, the density near $x=7$, not near a billion.
- [ ] About 30 000 — that is roughly $\sqrt{10^9}$, the largest prime you would sieve *with*, not a count of primes at all.
