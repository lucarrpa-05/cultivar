---
id: math.number-theory.transcendence.almost-all-and-almost-none
topic: math.number-theory.transcendence
topics: [math.foundations.cardinality]
format: idea
difficulty: 3
language: en
weight: medium
angles: [paradox, connection, history]
tags: [transcendental, liouville, lindemann, squaring-the-circle, countability]
hook: "Almost every real number is transcendental. Proving it about any particular number has taken 180 years and counting."
sources:
  - {title: "Transcendental number", type: wiki, url: "https://en.wikipedia.org/wiki/Transcendental_number"}
  - {title: "Liouville number", type: wiki, url: "https://en.wikipedia.org/wiki/Liouville_number"}
  - {title: "Lindemann–Weierstrass theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Lindemann%E2%80%93Weierstrass_theorem"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "\"Taking n=1 gives e transcendental\" is false — with one exponent Lindemann–Weierstrass only says e^α≠0. Replaced with the α=0,1,…,n argument."}
---

# Almost all of them, and almost none we can name

A number is algebraic if some polynomial with integer coefficients kills it. $\sqrt{2}$: yes. The golden ratio: yes. Anything you can build from radicals: yes.

Cantor's 1874 argument settles how common that is, in two lines. Polynomials with integer coefficients can be listed; each has finitely many roots; so the algebraic numbers are countable. The reals are not. Therefore almost every real number — all but a countable set — is transcendental.

Now try to name one. Liouville had to *construct* a number in 1844 specifically designed to be too well approximated by fractions. Hermite proved $e$ transcendental in 1873. Lindemann got $\pi$ in 1882, and with it killed squaring the circle, a problem 2,000 years old. Gelfond and Schneider handled $2^{\sqrt{2}}$ in 1934.

That is roughly the complete list of techniques. Nobody knows whether $e+\pi$ is transcendental. Nobody knows whether it is *irrational*.

## Rigor

**Countability of $\overline{\mathbb{Q}}$.** For each $n,H\in\mathbb{N}$ there are finitely many polynomials of degree $\le n$ with coefficients bounded by $H$, each with at most $n$ roots. A countable union of finite sets is countable, so $\overline{\mathbb{Q}}\cap\mathbb{R}$ is countable and its complement has full measure.

**Liouville's inequality (1844).** If $\alpha$ is algebraic of degree $d\ge2$, there is $c>0$ with
$$\left|\alpha-\frac{p}{q}\right|>\frac{c}{q^{d}}\quad\text{for all rationals } p/q .$$
Proof: let $f$ be the minimal polynomial. Then $|f(p/q)|\ge q^{-d}$ since $q^{d}f(p/q)$ is a nonzero integer, while the mean value theorem bounds $|f(p/q)|$ by $M|\alpha-p/q|$ near $\alpha$.

So a number approximable *faster* than any power cannot be algebraic. The Liouville constant
$$L=\sum_{k=1}^{\infty}10^{-k!}=0.110001000000000000000001\ldots$$
is exactly that: truncating at $k$ gives error about $10^{-(k+1)!}$ against a denominator $10^{k!}$. Transcendental, and built for the purpose.

**Lindemann–Weierstrass.** If $\alpha_1,\dots,\alpha_n$ are distinct algebraic numbers, then $e^{\alpha_1},\dots,e^{\alpha_n}$ are linearly independent over $\overline{\mathbb{Q}}$. Take $\alpha_i=0,1,\dots,n$: no non-trivial algebraic relation among $1,e,e^{2},\dots,e^{n}$ can hold, so $e$ satisfies no polynomial at all. Take $\alpha_1=0,\alpha_2=i\pi$: Euler's identity $e^{i\pi}=-1=-e^{0}$ *is* such a relation, so $i\pi$ — hence $\pi$ — cannot be algebraic. That is why $\pi$ is not constructible and the circle cannot be squared.

## Recall
type: mcq
Q: Why does Cantor's argument not produce a single transcendental number you can write down?
- [x] It only compares cardinalities — countable algebraic numbers inside an uncountable line — and never inspects any individual number.
- [ ] Because transcendental numbers cannot be written down — $L$ and $\pi$ are written down all the time; the difficulty is *proving* transcendence.
- [ ] Because it assumes the continuum hypothesis — no cardinal arithmetic beyond countable versus uncountable is used.
- [ ] Because the algebraic numbers are dense — density is true and irrelevant; the rationals are dense too and countable.
