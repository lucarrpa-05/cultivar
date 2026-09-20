---
id: math.analysis.series.reorder-and-get-any-number
topic: math.analysis.series
format: idea
difficulty: 3
language: en
weight: medium
angles: [paradox, weird]
tags: [riemann-rearrangement, conditional-convergence, absolute-convergence, alternating-harmonic]
hook: "The alternating harmonic series sums to ln 2. Reorder the same terms and it sums to 7, or to pi, or to nothing at all."
sources:
  - {title: "Riemann series theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Riemann_series_theorem"}
  - {title: "Absolute convergence", type: wiki, url: "https://en.wikipedia.org/wiki/Absolute_convergence"}
  - {title: "Principles of Mathematical Analysis, 3rd ed., ch. 3", author: "Walter Rudin", year: 1976, type: book, url: "https://en.wikipedia.org/wiki/Principles_of_Mathematical_Analysis"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Reorder this sum and get any number you want

$1-\tfrac12+\tfrac13-\tfrac14+\cdots=\ln 2$. Same terms, different order: take two positives, then one negative, then two positives, and so on. The sum becomes $\tfrac32\ln 2$. Keep choosing and you can land on $7$, on $-\pi$, on $+\infty$, on nothing in particular.

Riemann proved that this works for every conditionally convergent series and every target. Not a quirk of the harmonic terms — a theorem.

The reason is a resource argument. The positive terms alone add to $+\infty$; the negative terms alone add to $-\infty$; individually the terms shrink to zero. So you have an unlimited budget in both directions and arbitrarily fine control, which is exactly what you need to steer a running total anywhere and keep it there.

The lesson sticks: a conditionally convergent series is not a sum, it is a *process*. Addition is commutative. Infinite addition is not, unless you pay for it. Absolute convergence is the price.

## Rigor

**Riemann series theorem.** If $\sum a_n$ converges but $\sum|a_n|$ diverges, then for any $L\in[-\infty,+\infty]$ there is a permutation $\sigma$ with $\sum a_{\sigma(n)}=L$.

*Construction.* Write $a_n^{+}=\max(a_n,0)$, $a_n^{-}=\max(-a_n,0)$. Convergence plus non-absolute convergence forces $\sum a_n^{+}=\sum a_n^{-}=+\infty$, while $a_n\to 0$. To hit a finite $L$: add positive terms in order until the partial sum first exceeds $L$, then negative terms until it first drops below, and repeat. Both stocks are infinite, so each stage terminates; each overshoot is at most the size of the last term used, and those tend to $0$, so the partial sums converge to $L$.

**The licence.** If $\sum|a_n|<\infty$, every rearrangement converges to the same value — that is what absolute convergence buys, and it is why "process" collapses back to "sum".

## Recall
type: mcq
Q: Which property makes the rearrangement trick possible?
- [x] The positive and the negative parts each diverge while the terms tend to zero — unlimited budget both ways, with arbitrarily fine steps.
- [ ] The terms tend to zero — necessary but nowhere near enough: it also holds for absolutely convergent series, which cannot be rearranged.
- [ ] The series alternates in sign — irrelevant; the theorem covers every conditionally convergent series, alternating or not.
