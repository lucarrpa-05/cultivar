---
id: math.category.natural-transformations.the-determinant-is-natural
topic: math.category.natural-transformations
topics: [math.number-theory.modular]
format: fact
difficulty: 3
language: en
weight: light
angles: [tool, beautiful]
tags: [determinant, naturality, ring-homomorphism, reduction-mod-p, general-linear-group]
hook: "Reduce a matrix mod 7 and take its determinant, or take the determinant and reduce mod 7. Same answer, and naturality is why."
related: [math.category.natural-transformations.categories-were-invented-for-one-word]
sources:
  - {title: "Natural transformation (example: the determinant)", type: wiki, url: "https://en.wikipedia.org/wiki/Natural_transformation"}
  - {title: "Determinant (Leibniz formula)", type: wiki, url: "https://en.wikipedia.org/wiki/Determinant"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Rigor stated det as natural on GL_n but its payoffs use non-invertible matrices (mod p, det(xI-A)); restated it on M_n into multiplicative monoids, GL_n as the restriction."}
---

# Reduce first or take the determinant first: the answer never changes

Take an integer matrix. Reduce its entries mod 7 and compute the determinant there, or compute the determinant over the integers and reduce that mod 7. Same answer, always. The same holds for every ring homomorphism: substituting a number into polynomial entries, conjugating complex entries, anything. The determinant is one formula in every commutative ring, so it commutes with every map between rings. That is naturality, and it is why a matrix is invertible mod $p$ exactly when $p$ does not divide its integer determinant.

## Rigor

Let $\mathbf{CRing}$ be the category of commutative rings with ring homomorphisms. Two functors $\mathbf{CRing}\to\mathbf{Mon}$ (monoids): $R\mapsto M_n(R)$ under matrix multiplication, acting on arrows by applying a homomorphism to every entry, and $R\mapsto(R,\cdot)$.

**Claim.** $\det_R:M_n(R)\to R$ is a natural transformation: for every ring homomorphism $\varphi:R\to S$ and every $A\in M_n(R)$,
$$\det_S\big(\varphi(A)\big)=\varphi\big(\det_RA\big).$$

*Proof.* $\det A=\sum_{\sigma\in S_n}\operatorname{sgn}(\sigma)\prod_{i}a_{i\sigma(i)}$ is a polynomial with integer coefficients in the entries, and ring homomorphisms preserve sums, products and the integers. $\square$

**Payoffs.** With $\varphi:\mathbb{Z}\to\mathbb{F}_p$: an integer matrix is invertible mod $p$ iff $p\nmid\det A$. With evaluation $R[x]\to R$ at $c$: $\det(xI-A)$ evaluated at $x=c$ is $\det(cI-A)$, so you may substitute before or after expanding the characteristic polynomial.

Restricting to invertible matrices gives the textbook example, $\det:GL_n\Rightarrow(-)^\times$ as functors into groups. The trace is natural for the same reason; so is any integer-polynomial formula in the entries. A recipe that needs a choice, such as a basis, has no reason to commute with every homomorphism.
