---
id: math.algebra.rings-ideals.kummers-imaginary-primes
topic: math.algebra.rings-ideals
format: idea
difficulty: 3
language: en
weight: heavy
angles: [origin, history]
tags: [ideals, unique-factorisation, kummer, dedekind, algebraic-integers]
hook: "In one ring away from the integers, 6 factors two different ways. Ideals were invented to put the missing primes back."
sources:
  - {title: "Ideal number", type: wiki, url: "https://en.wikipedia.org/wiki/Ideal_number"}
  - {title: "Ideal (ring theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Ideal_(ring_theory)"}
  - {title: "Ernst Kummer", type: wiki, url: "https://en.wikipedia.org/wiki/Ernst_Kummer"}
dates: {written: 2026-09-19, event: 1844-01-01}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The word "ideal" means "imaginary", and it always did

You think of unique factorisation as arithmetic. It is closer to a lucky accident of the integers. Step one ring outward and it breaks.

In $\mathbb{Z}[\sqrt{-5}]$ — perfectly ordinary numbers of the form $a+b\sqrt{-5}$ —
$$6=2\cdot 3=(1+\sqrt{-5})(1-\sqrt{-5}),$$
and all four factors are irreducible: none of them splits any further. Two genuinely different factorisations of the same number.

Ernst Kummer ran into this in the 1840s with cyclotomic integers, and it was not an academic worry: several attempted proofs of Fermat's Last Theorem had quietly assumed unique factorisation and were therefore worthless. His repair was to invent the missing primes. He postulated *ideal numbers* — not elements of the ring, just hypothetical divisors — chosen so that unique factorisation came back.

Richard Dedekind made it rigorous in 1876 by replacing each ghost with the set of things it would divide. That set is an **ideal**. The name is not a compliment; it is Kummer's word for "existing in imagination only".

## Rigor

In $R=\mathbb{Z}[\sqrt{-5}]$ use the norm $N(a+b\sqrt{-5})=a^2+5b^2$, which is multiplicative. The units are exactly the elements of norm 1, namely $\pm1$.

$N(2)=4$, so a proper factorisation of 2 would need an element of norm 2; but $a^2+5b^2=2$ has no integer solutions. Likewise $a^2+5b^2=3$ is unsolvable, so 3 is irreducible, and $N(1\pm\sqrt{-5})=6$ would need a factor of norm 2 or 3. All four are irreducible, and no unit relates $2$ to $1\pm\sqrt{-5}$.

Now factor into **ideals**, where the missing primes reappear as honest objects:
$$\mathfrak{p}_2=(2,\,1+\sqrt{-5}),\quad \mathfrak{p}_3=(3,\,1+\sqrt{-5}),\quad \mathfrak{p}_3'=(3,\,1-\sqrt{-5}).$$
Then $(2)=\mathfrak{p}_2^{2}$, $(3)=\mathfrak{p}_3\mathfrak{p}_3'$, $(1+\sqrt{-5})=\mathfrak{p}_2\mathfrak{p}_3$, $(1-\sqrt{-5})=\mathfrak{p}_2\mathfrak{p}_3'$, and both of the competing factorisations of 6 become the *same* product $\mathfrak{p}_2^2\mathfrak{p}_3\mathfrak{p}_3'$.

This is the defining property of a Dedekind domain: elements may factor badly, ideals never do.

## Recall
type: mcq
Q: What exactly is restored by passing from elements to ideals in $\mathbb{Z}[\sqrt{-5}]$?
- [x] Unique factorisation — the two rival factorisations of 6 become one and the same product of prime ideals.
- [ ] Commutativity — the ring was already commutative; that was never the problem.
- [ ] The existence of irreducible elements — there were plenty of those; the trouble was that irreducible stopped meaning prime.
