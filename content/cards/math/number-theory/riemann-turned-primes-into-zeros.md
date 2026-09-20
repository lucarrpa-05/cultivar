---
id: math.number-theory.zeta.riemann-turned-primes-into-zeros
topic: math.number-theory.zeta
topics: [math.analysis.complex]
format: idea
difficulty: 4
language: en
weight: medium
angles: [open-problem, beautiful, prediction]
tags: [riemann-hypothesis, explicit-formula, critical-line, littlewood, skewes]
hook: "Riemann wrote eight pages on primes in 1859 and never returned to the subject. We are still working through them."
sources:
  - {title: "Riemann hypothesis", type: wiki, url: "https://en.wikipedia.org/wiki/Riemann_hypothesis"}
  - {title: "On the Number of Primes Less Than a Given Magnitude", author: "Bernhard Riemann", year: 1859, type: primary, url: "https://en.wikipedia.org/wiki/On_the_Number_of_Primes_Less_Than_a_Given_Magnitude"}
  - {title: "Skewes's number", type: wiki, url: "https://en.wikipedia.org/wiki/Skewes%27s_number"}
dates: {written: 2026-09-19, event: 1859-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The Skewes source was cited but never used; added Skewes's 1933 bound next to the current 1.4×10^316 estimate."}
---

# Riemann turned the primes into a sum over zeros

The prime number theorem says the primes thin out like $1/\log x$. Fine. The next question is the one that matters: by how much does the actual count wobble around that prediction?

Riemann's answer, in an eight-page paper from 1859 — the only thing he ever published on number theory — is that the wobble is not noise. It is a sum. Take the complex numbers where $\zeta(s)$ vanishes; each one contributes its own regular oscillation to the prime count, and adding them up reproduces the error *exactly*. Not approximately. The irregularity of the primes is a chord, and the zeros are the notes.

How loud each note is depends on how far right its zero sits. Riemann guessed they all sit on a single vertical line, which would mean every note has the same volume and the primes are as evenly spread as arithmetic permits.

That guess is unproven, and it is the reason people care about a function nobody would otherwise look at.

## Rigor

$\zeta(s)=\sum n^{-s}$ for $\mathrm{Re}(s)>1$, continued meromorphically to $\mathbb{C}$ with a simple pole at $s=1$. The functional equation relates $s$ to $1-s$; it forces "trivial" zeros at $s=-2,-4,-6,\dots$, and confines the rest to the strip $0<\mathrm{Re}(s)<1$.

**Explicit formula (von Mangoldt).** With $\psi(x)=\sum_{p^k\le x}\log p$,
$$\psi(x)=x-\sum_{\rho}\frac{x^{\rho}}{\rho}-\log(2\pi)-\tfrac12\log\!\left(1-x^{-2}\right),$$
the sum running over non-trivial zeros $\rho=\beta+i\gamma$. Each term has modulus $x^{\beta}/|\rho|$ and oscillates like $\cos(\gamma\log x)$: amplitude from the real part, frequency from the imaginary part. That is the chord, written out.

**Riemann hypothesis.** Every non-trivial zero has $\beta=\tfrac12$. Equivalently $\pi(x)=\mathrm{Li}(x)+O\!\left(\sqrt{x}\log x\right)$ — and $\sqrt{x}$ is the square-root cancellation you would get if primality behaved like a coin flip.

**Why computation settles nothing.** $\pi(x)<\mathrm{Li}(x)$ for every $x$ ever checked, and Littlewood proved in 1914 that the inequality reverses infinitely often. Nobody has ever seen one: Skewes's 1933 bound for the first crossing, assuming RH, was $10^{10^{10^{34}}}$, and the best estimate today still only places it below about $1.4\times10^{316}$. The first $10^{13}$ zeros are verified to be on the line; that is a rounding error away from nothing.

## Recall
type: reveal
Q: What do the zeros of $\zeta$ have to do with prime numbers?
A: They *are* the error term. The explicit formula writes the prime-counting function as a smooth main term minus a sum of $x^{\rho}/\rho$ over the zeros; each zero contributes an oscillation whose amplitude is $x^{\mathrm{Re}\,\rho}$. The Riemann hypothesis says every amplitude is $\sqrt{x}$ — the smallest the error could possibly be.
