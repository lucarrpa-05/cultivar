---
id: math.number-theory.diophantine.arithmetic-is-a-computer
topic: math.number-theory.diophantine
topics: [math.foundations.computability]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [connection, open-problem, beautiful]
tags: [hilberts-tenth, mrdp, diophantine-sets, matiyasevich, undecidable]
hook: "There is a polynomial whose positive values, as its variables run over the naturals, are exactly the prime numbers."
sources:
  - {title: "Hilbert's tenth problem", type: wiki, url: "https://en.wikipedia.org/wiki/Hilbert%27s_tenth_problem"}
  - {title: "Diophantine set", type: wiki, url: "https://en.wikipedia.org/wiki/Diophantine_set"}
  - {title: "Formula for primes", type: wiki, url: "https://en.wikipedia.org/wiki/Formula_for_primes"}
dates: {written: 2026-09-19, event: 1970-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Added the degree of the Jones–Sato–Wada–Wiens polynomial (25), which the card had left out."}
---

# Polynomials can run programs

Hilbert's tenth problem, from his 1900 list, asks for a procedure: given a polynomial equation with integer coefficients, decide whether it has an integer solution. He assumed one existed and wanted it written down.

It took seventy years and four people to answer, and the answer is no. But the *reason* is much stranger than the verdict.

Davis, Putnam and Robinson, and finally Matiyasevich in 1970, showed that polynomial equations are as expressive as computer programs. Any set of numbers a program can list — the primes, the halting machine codes, the theorems of any axiom system — is exactly the set of values of some polynomial. Not approximated: equal.

Undecidability then comes for free, because if you could solve Diophantine equations you could solve the halting problem.

And the constructions are real. In 1976 Jones, Sato, Wada and Wiens wrote down a polynomial of degree 25 in 26 variables whose positive values are precisely the primes. The equation does not test primality; it *is* primality.

## Rigor

**Diophantine sets.** $S\subseteq\mathbb{N}^k$ is Diophantine if there is a polynomial $P$ with integer coefficients such that
$$\bar{a}\in S \iff \exists \bar{x}\in\mathbb{N}^{m}\; P(\bar{a},\bar{x})=0 .$$

**MRDP theorem (Matiyasevich, 1970).** A set is Diophantine if and only if it is recursively enumerable.

One direction is easy: an existential search over $\mathbb{N}^m$ is an enumeration. The hard direction needed Davis's normal form (1949–53), the Davis–Putnam–Robinson reduction to *exponential* Diophantine sets (1961), and Julia Robinson's hypothesis that some Diophantine relation grows exponentially — which Matiyasevich supplied with the Fibonacci numbers, showing $y=F_{2x}$ is Diophantine.

**Consequence.** Take an r.e. but undecidable set, say $K$. By MRDP it is $\{a : \exists \bar{x}\, P(a,\bar{x})=0\}$. An algorithm for Hilbert's tenth problem would decide membership in $K$. None exists.

**The prime polynomial.** The Jones–Sato–Wada–Wiens polynomial (1976) has 26 variables, one per letter of the alphabet, degree 25, and is assembled from a system of 14 Diophantine equations. The set of its positive values, as the variables range over $\mathbb{N}$, is exactly the set of primes. It is useless for computing primes and remarkable anyway.

**Open.** The same question over $\mathbb{Q}$ instead of $\mathbb{Z}$ is still unsolved.

## Recall
type: mcq
Q: What does the MRDP theorem say?
- [x] The Diophantine sets are exactly the recursively enumerable sets — polynomial existential formulas have the full expressive power of programs.
- [ ] Every Diophantine equation is unsolvable — most have solutions; what is impossible is a general algorithm to tell which.
- [ ] Polynomial equations can be solved in exponential time — no time bound is claimed; there is no algorithm at all.
- [ ] Every recursively enumerable set is decidable — that would contradict the halting problem, which is r.e. and undecidable.
