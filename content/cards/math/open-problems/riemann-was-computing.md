---
id: math.open-problems.riemann-hypothesis.riemann-was-computing
topic: math.open-problems.riemann-hypothesis
topics: [math.number-theory.zeta]
format: fact
difficulty: 3
language: en
weight: light
angles: [history, human, weird]
tags: [riemann-siegel-formula, siegel, nachlass, zeta-zeros, numerical-verification]
hook: "Riemann called his hypothesis very probable and moved on. Seventy years later Siegel found the calculations behind the guess."
related: [math.number-theory.zeta.riemann-turned-primes-into-zeros]
sources:
  - {title: "Riemann–Siegel formula", type: wiki, url: "https://en.wikipedia.org/wiki/Riemann%E2%80%93Siegel_formula"}
  - {title: "On Riemann's Nachlass for Analytic Number Theory (translation of Siegel, 1932)", author: "Carl Ludwig Siegel, trans. Eric Barkan and David Sklar", year: 2018, type: paper, url: "https://arxiv.org/abs/1810.05198"}
  - {title: "The Riemann hypothesis is true up to 3·10^12", author: "Dave Platt and Tim Trudgian", year: 2021, type: paper, url: "https://doi.org/10.1112/blms.12460"}
dates: {written: 2026-09-23, event: 1932-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Euler-Maclaurin needs about t/2pi terms (160 billion at 10^12, not a trillion); stopped implying Platt-Trudgian used Riemann-Siegel; Titchmarsh 1935 framed accurately."}
---

# The pure thinker was secretly computing zeros

Riemann's 1859 paper states the hypothesis almost in passing: very probable, and he had put aside the search for a proof. For decades it read like pure intuition. Then in 1932 Carl Ludwig Siegel worked through Riemann's unpublished papers in Göttingen and found numerical work behind it. Riemann had located the first few zeros by hand, with a fast formula nobody else knew. Refined, it powered most of the big zero computations since.

## Rigor

On the critical line write $\zeta(\tfrac12+it)=Z(t)\,e^{-i\theta(t)}$, where $\theta$ is an explicit smooth phase and $Z$ is real-valued. Zeros on the line are sign changes of $Z$, which is how they are certified.

**Riemann–Siegel formula.** With $N=\lfloor\sqrt{t/2\pi}\rfloor$,
$$Z(t)=2\sum_{n=1}^{N}\frac{\cos\big(\theta(t)-t\log n\big)}{\sqrt n}+R(t),\qquad R(t)=O\big(t^{-1/4}\big),$$
with an explicit asymptotic expansion for $R$ that Siegel recovered from Riemann's notes.

**Why it matters.** Evaluating $\zeta$ at height $t$ by Euler–Maclaurin summation needs about $t/2\pi$ terms; this needs about $\sqrt{t/2\pi}$. At $t=10^{12}$ that is roughly 400,000 terms instead of 160 billion. Titchmarsh used it from 1935 on, and later record runs used the Odlyzko–Schönhage algorithm, which speeds up exactly this sum. The current rigorous record, Platt and Trudgian (2021), checked every zero with $0<t\le3\times10^{12}$: all on the line.
