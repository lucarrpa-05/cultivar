---
id: math.number-theory.zeta.unique-factorisation-as-an-identity
topic: math.number-theory.zeta
topics: [math.analysis.series]
format: idea
difficulty: 3
language: en
weight: medium
angles: [connection, beautiful, origin]
tags: [euler-product, zeta-function, basel-problem, divergent-sum-of-reciprocals]
hook: "Euler wrote one equation with a sum on the left and a product over primes on the right. It is the sieve, in ink."
sources:
  - {title: "Euler product", type: wiki, url: "https://en.wikipedia.org/wiki/Euler_product"}
  - {title: "Riemann zeta function", type: wiki, url: "https://en.wikipedia.org/wiki/Riemann_zeta_function"}
  - {title: "Basel problem", type: wiki, url: "https://en.wikipedia.org/wiki/Basel_problem"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The identity where a sum turns into the primes

Add up $1/n^s$ over all the whole numbers. Separately, multiply $\left(1-p^{-s}\right)^{-1}$ over all the primes. Euler noticed, in the 1730s, that these are the same number.

They have no right to be. One side runs over every integer in order; the other only ever mentions primes, and multiplies instead of adding. The bridge is that every term on the left is built, exactly once, by choosing one factor from each bracket on the right. Unique factorisation, in other words — not used in the proof so much as *equal* to it.

This is why the primes became an analysis problem. Anything you can say about the function on the left — where it blows up, where it vanishes, how it grows — is instantly a statement about primes, because the right-hand side is made of nothing else.

Euler cashed the identity immediately. Plug in $s=1$ and it tells you the primes are infinite, and more than infinite: crowded.

## Rigor

**Euler product.** For $\mathrm{Re}(s)>1$,
$$\zeta(s)=\sum_{n=1}^{\infty}\frac{1}{n^{s}}=\prod_{p \text{ prime}}\left(1-\frac{1}{p^{s}}\right)^{-1}.$$

**Why.** Expand each factor as a geometric series, $\left(1-p^{-s}\right)^{-1}=1+p^{-s}+p^{-2s}+\cdots$. Multiplying finitely many of them and expanding gives $\sum n^{-s}$ over all $n$ whose prime factors lie in that finite set, each $n$ appearing exactly once — that "exactly once" is the fundamental theorem of arithmetic. Absolute convergence for $\mathrm{Re}(s)>1$ lets you take the limit.

**Euler's infinitude of primes.** As $s\to 1^{+}$, the left side diverges like the harmonic series. So the product diverges, so
$$\sum_p \frac{1}{p}=\infty,$$
which is far stronger than "infinitely many primes": the squares are infinite too, yet $\sum 1/n^2$ converges. It says primes are denser than squares, and it was the first analytic theorem about them.

**The other Euler cheque.** $\zeta(2)=\pi^2/6$ — the Basel problem, 1735 — so $\prod_p (1-p^{-2})^{-1}=\pi^2/6$, and the probability that two random integers are coprime is $6/\pi^2\approx 0.608$.

## Recall
type: mcq
Q: What fact about the integers is the Euler product really a restatement of?
- [x] Unique factorisation — expanding the product produces each $n^{-s}$ exactly once, which is precisely "every integer factors into primes in one way".
- [ ] The infinitude of primes — that is a consequence you get by setting $s\to 1$, not what the identity encodes.
- [ ] The divergence of the harmonic series — that is the input to Euler's corollary; the identity holds for every $\mathrm{Re}(s)>1$.
- [ ] The prime number theorem — that needs the analytic continuation and the zeros; the product alone does not give it.
