---
id: math.number-theory.prime-distribution.nine-pages-from-madras
topic: math.number-theory.prime-distribution
format: story
difficulty: 3
language: en
weight: medium
angles: [human, mistake, history]
tags: [ramanujan, hardy, prime-counting, zeta-zeros, 1913-letter]
hook: "Hardy received nine pages of unproved formulas from a clerk in Madras. The most confident claim in them was false."
sources:
  - {title: "Srinivasa Ramanujan", type: wiki, url: "https://en.wikipedia.org/wiki/Srinivasa_Ramanujan"}
  - {title: "G. H. Hardy", type: wiki, url: "https://en.wikipedia.org/wiki/G._H._Hardy"}
  - {title: "Srinivasa Ramanujan", type: encyclopedia, url: "https://mathshistory.st-andrews.ac.uk/Biographies/Ramanujan/"}
dates: {written: 2026-09-19, event: 1913-01-16}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Hardy's quote had a spurious \"had\". His diagnosis was that Ramanujan assumed ζ has no complex zeros; now attributed to Hardy and sourced to MacTutor."}
---

# Nine pages from Madras, and the claim in them that was wrong

On 16 January 1913 a port clerk in Madras posted nine pages of mathematics to a Cambridge don he had never met. No proofs. Just statements — continued fractions, infinite series, identities that looked invented rather than derived. Hardy's verdict, later: they "must be true, because, if they were not true, no one would have the imagination to invent them."

Among them, Ramanujan claimed a formula for $\pi(x)$, the count of primes below $x$, and claimed it was accurate to within a tiny error.

It was wrong, and Hardy's diagnosis was exact. Working alone from an out-of-date textbook, Ramanujan had no complex analysis, and his theory of primes quietly assumed the zeta function has no complex zeros. It has infinitely many, and the error in counting primes is precisely what they control. Hardy's verdict: Ramanujan's theory of primes was vitiated by that gap.

So the letter contained both the most startling correct mathematics Hardy had ever received and one confident, instructive failure — in the single area where you cannot guess your way past the zeros.

## Recall
type: reveal
Q: Why was Ramanujan's prime-counting claim wrong when so much else in the letter was right?
A: Because the error in approximating $\pi(x)$ is governed by the complex zeros of $\zeta(s)$, and Ramanujan, self-taught without complex analysis, had assumed there were none. Identities and series he could see by pattern; the distribution of primes is the one place where the pattern lies unless you know where the zeros are.
