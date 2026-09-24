---
id: math.open-problems.riemann-hypothesis.primes-flip-coins
topic: math.open-problems.riemann-hypothesis
topics: [math.number-theory.prime-distribution, math.probability.lln]
format: idea
difficulty: 3
language: en
weight: medium
angles: [connection, mistake, paradox]
tags: [mobius-function, mertens-function, random-walk, riemann-hypothesis, square-root-cancellation]
hook: "Give every squarefree number a coin: heads for an even number of prime factors. The Riemann hypothesis says those coins look fair."
related: [math.number-theory.zeta.riemann-turned-primes-into-zeros]
sources:
  - {title: "Riemann hypothesis (Denjoy's probabilistic argument; Mertens function)", type: wiki, url: "https://en.wikipedia.org/wiki/Riemann_hypothesis"}
  - {title: "Mertens function", type: wiki, url: "https://en.wikipedia.org/wiki/Mertens_function"}
  - {title: "Disproof of the Mertens conjecture", author: "A. M. Odlyzko and H. J. J. te Riele", year: 1985, type: paper, url: "https://doi.org/10.1515/crll.1985.357.138"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved}
---

# The Riemann hypothesis says the primes flip fair coins

Give each squarefree number a coin: heads if it has an even number of prime factors, tails if odd. So 6 is heads and 30 is tails; numbers with a repeated prime, like 12, sit out. Now take a walk: one step up for heads, one down for tails.

If the coins were genuinely random, after $x$ steps the walk would be about $\sqrt x$ from zero. The Riemann hypothesis is equivalent to exactly that: the walk stays within $x^{1/2+\varepsilon}$ for every $\varepsilon>0$.

In 1897 Franz Mertens guessed something tidier: never beyond $\sqrt x$. That was too greedy. A fair-coin walk strays past $\sqrt x$ infinitely often, and in 1985 Odlyzko and te Riele proved this one does too.

## Rigor

Let $\mu$ be the Möbius function (the coin: $\pm1$ on squarefree $n$, $0$ otherwise) and $M(x)=\sum_{n\le x}\mu(n)$ the walk.

**Theorem (Littlewood, 1912).** RH $\iff M(x)=O(x^{1/2+\varepsilon})$ for every $\varepsilon>0$.

*Proof of $\Leftarrow$.* Unique factorisation in Euler-product form gives, for $\operatorname{Re}s>1$,
$$\frac1{\zeta(s)}=\prod_p\big(1-p^{-s}\big)=\sum_{n\ge1}\frac{\mu(n)}{n^s}=s\int_1^\infty M(x)\,x^{-s-1}\,dx,$$
the last step by summation by parts. If $|M(x)|\le Cx^{1/2+\varepsilon}$, the integral converges absolutely for $\operatorname{Re}s>\tfrac12+\varepsilon$ and is analytic there. So $1/\zeta$ continues analytically to that half-plane and $\zeta$ has no zeros in it. Let $\varepsilon\to0$; the functional equation reflects the zero-free region to the left of $\tfrac12$. That is RH.

**The coin model.** For independent fair $\pm1$ steps $S_x$, the law of the iterated logarithm gives $\limsup S_x/\sqrt{2x\log\log x}=1$ almost surely. So $O(x^{1/2+\varepsilon})$ holds, and $|S_x|\le\sqrt x$ fails: a probabilistic reason, due in spirit to Denjoy (1931), to expect Mertens to be wrong. Odlyzko and te Riele proved $\limsup M(x)/\sqrt x>1.06$ without ever finding an explicit $x$.

## Recall
type: mcq
Q: Which statement about the Möbius walk $M(x)$ is equivalent to the Riemann hypothesis?
- [x] $M(x)$ stays within $x^{1/2+\varepsilon}$ for every $\varepsilon>0$ — the square-root size of a fair-coin walk.
- [ ] $M(x)$ stays within $\pm\sqrt x$ forever — that is the Mertens conjecture, and it is false.
- [ ] $M(x)$ returns to zero infinitely often — a statement about crossings, not size; RH is about how far the walk strays.
