---
id: math.number-theory.divisibility-primes.factorisation-stops-being-unique
topic: math.number-theory.divisibility-primes
topics: [math.algebra.rings-ideals]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [mistake, connection, history]
tags: [unique-factorisation, kummer, ideals, fermats-last-theorem, lame]
hook: "In 1847 Lamé announced a proof of Fermat's Last Theorem. It died in the discussion, on one unexamined word."
sources:
  - {title: "Fundamental theorem of arithmetic", type: wiki, url: "https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic"}
  - {title: "Ernst Kummer", type: wiki, url: "https://en.wikipedia.org/wiki/Ernst_Kummer"}
  - {title: "Ideal number", type: wiki, url: "https://en.wikipedia.org/wiki/Ideal_number"}
dates: {written: 2026-09-19, event: 1847-03-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Unique factorisation in Z[ζ_p] first fails at p=23 (class number 3), not at the first irregular prime 37; Kummer's letter dated 24 May 1847."}
---

# Factorisation stops being unique one step outside the integers

On 1 March 1847 Gabriel Lamé told the Paris Academy he had proved Fermat's Last Theorem. His idea was to factor $x^n+y^n$ into linear pieces using roots of unity and compare factorisations. Liouville stood up and asked the obvious question, which nobody had thought to ask: why should factorisation there be unique?

It isn't. Kummer had already found that out, and said so in a letter to Liouville dated 24 May 1847.

You can see the failure without any roots of unity. Work in the numbers $a+b\sqrt{-5}$, which is a perfectly respectable ring. Then
$$6 = 2\times 3 = (1+\sqrt{-5})(1-\sqrt{-5}),$$
and all four factors are as unbreakable as primes. Two genuinely different factorisations of the same number.

So the fundamental theorem of arithmetic is a *theorem* about $\mathbb{Z}$, not a law of arithmetic. And the repair Kummer invented to save it is one of the reasons modern algebra looks the way it does.

## Rigor

**Why the four factors are irreducible.** Use the norm $N(a+b\sqrt{-5})=a^2+5b^2$, which is multiplicative. $N(2)=4$, $N(3)=9$, $N(1\pm\sqrt{-5})=6$. A proper factorisation of 2 would need a factor of norm 2, i.e. $a^2+5b^2=2$: impossible. Norm 3 is impossible for the same reason, which kills proper factorisations of 3 and of $1\pm\sqrt{-5}$. The units are $\pm1$ (norm 1), so no two of the factors are associates.

**The repair.** Kummer's "ideal numbers", recast by Dedekind as *ideals*, restore uniqueness one level up. In $\mathbb{Z}[\sqrt{-5}]$,
$$(2)=\mathfrak{p}^2,\quad (3)=\mathfrak{q}\bar{\mathfrak{q}},\quad (1+\sqrt{-5})=\mathfrak{p}\mathfrak{q},\quad (1-\sqrt{-5})=\mathfrak{p}\bar{\mathfrak{q}},$$
with $\mathfrak{p}=(2,1+\sqrt{-5})$, $\mathfrak{q}=(3,1+\sqrt{-5})$. Both factorisations of 6 become $\mathfrak{p}^2\mathfrak{q}\bar{\mathfrak{q}}$ — the same, at last. Every ring of integers of a number field has unique factorisation into prime ideals; how badly elements fail is measured by the class number.

**Back to Lamé.** Unique factorisation in $\mathbb{Z}[\zeta_p]$ holds up to $p=19$ and first fails at $p=23$, where the class number is 3 — that is where Lamé's argument starts lying. Kummer's repair (1850) rescues Fermat's Last Theorem for every *regular* prime, one not dividing the class number of $\mathbb{Q}(\zeta_p)$; the first irregular prime is 37.

## Recall
type: reveal
Q: What does $6 = 2\cdot 3 = (1+\sqrt{-5})(1-\sqrt{-5})$ show?
A: That unique factorisation into irreducibles is a special property of $\mathbb{Z}$, not a general fact about rings. All four factors are irreducible in $\mathbb{Z}[\sqrt{-5}]$, so 6 has two genuinely different factorisations. Uniqueness returns only after Kummer and Dedekind move the bookkeeping from elements to ideals.
