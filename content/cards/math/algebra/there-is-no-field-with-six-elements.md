---
id: math.algebra.fields-extensions.there-is-no-field-with-six-elements
topic: math.algebra.fields-extensions
format: idea
difficulty: 4
language: en
weight: heavy
angles: [beautiful, tool]
tags: [finite-fields, characteristic, prime-power, cyclic-group, frobenius]
hook: "Not 6, not 10, not 12. Finite fields exist only at prime powers, and for each one there is exactly a single field."
sources:
  - {title: "Finite field", type: wiki, url: "https://en.wikipedia.org/wiki/Finite_field"}
  - {title: "Field extension", type: wiki, url: "https://en.wikipedia.org/wiki/Field_extension"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# There is no field with six elements, and there never will be

Arithmetic modulo 5 is a field: every non-zero element has an inverse. Modulo 6 it is not, because $2\times 3=0$ and zero divisors cannot be inverted. Fair enough — but that only rules out one six-element system. Could some completely different set of six symbols, with cleverly designed tables, work?

No. The size of a finite field is always a prime power, and for each prime power there is exactly one field up to isomorphism. Six is not a prime power, so no field has six elements. Same verdict for 10, 12, 14, 15.

The argument is embarrassingly short. Any field contains 1, so it contains $1+1+1+\cdots$, and in a finite field that repeated sum must eventually cycle. The smallest $n$ with $n\cdot 1=0$ has to be prime — otherwise you would have zero divisors — and that $\mathbb{Z}/p$ sits inside your field. The whole field is then a vector space over it. A vector space of dimension $d$ over a set of size $p$ has $p^d$ elements. That is all.

One more gift falls out, and it is the one that codes and cryptography actually use.

## Rigor

Let $F$ be finite. The map $\mathbb{Z}\to F$, $n\mapsto n\cdot 1$, has kernel $(p)$ for some prime $p$ (prime because $F$ has no zero divisors), so $\mathbb{F}_p\subseteq F$. Then $F$ is an $\mathbb{F}_p$-vector space of some finite dimension $d$, giving
$$|F|=p^{d}.$$

**Existence and uniqueness.** For each $q=p^d$, the splitting field of $x^{q}-x$ over $\mathbb{F}_p$ has exactly $q$ elements, since $x^q-x$ is separable ($\text{derivative} =-1$) and its roots are closed under the field operations. Any two fields of size $q$ are splitting fields of the same polynomial, hence isomorphic. Write $\mathbb{F}_q$.

**The gift.** $\mathbb{F}_q^{\times}$ is cyclic of order $q-1$. Reason: a finite abelian group of exponent $m$ has every element satisfying $x^m=1$, and $x^m-1$ has at most $m$ roots in a field, so $m=q-1$ and some element has that order. A generator is called a primitive element, and it is what turns Reed–Solomon codes and discrete-log cryptography into computation.

Note the contrast with the intuition's counting: the *additive* group of $\mathbb{F}_q$ is $(\mathbb{Z}/p)^d$, never cyclic for $d>1$, while the multiplicative one always is.

## Recall
type: mcq
Q: Why must a finite field have prime-power order?
- [x] It contains a copy of $\mathbb{Z}/p$ for one prime $p$ — and it is a vector space over that copy, so its size is $p$ to the dimension.
- [ ] Because its multiplicative group is cyclic — true, but that constrains $q-1$, not $q$, and does not by itself force a prime power.
- [ ] Because $\mathbb{Z}/n$ is a field only for prime $n$ — that rules out one construction, not every possible field of that size.
