---
id: math.algebra.fields-extensions.nobody-has-to-find-the-polynomial
topic: math.algebra.fields-extensions
topics: [math.linear-algebra.vector-spaces]
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, beautiful, paradox]
tags: [algebraic-numbers, tower-law, degree, linear-dependence, field-extension]
hook: "√2 + ∛5 is a root of some polynomial with rational coefficients. Linear algebra proves it without ever writing the polynomial down."
related: [math.algebra.fields-extensions.the-greek-problems-died-in-1837]
sources:
  - {title: "Algebraic number (closure under field operations)", type: wiki, url: "https://en.wikipedia.org/wiki/Algebraic_number"}
  - {title: "Degree of a field extension (tower law)", type: wiki, url: "https://en.wikipedia.org/wiki/Degree_of_a_field_extension"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "the rigor opened on a definition; added a first sentence naming the six-dimensional space the intuition promised. Degree-6 polynomial in the recall expanded and checked by hand."}
---

# √2 + ∛5 solves some polynomial, and nobody has to find it

$\sqrt2$ solves $x^2=2$ and $\sqrt[3]5$ solves $x^3=5$. Does their sum solve some polynomial equation with rational coefficients? Try to find one by hand and you are in for an afternoon of cubing and squaring.

You don't have to. Every number you can build from $\sqrt2$ and $\sqrt[3]5$ with the four operations lives in a vector space over the rationals that needs only six basis vectors. So the seven numbers $1, s, s^2,\dots,s^6$, where $s$ is the sum, cannot be linearly independent. A dependence among them is exactly a polynomial with $s$ as a root.

Linear algebra proves the polynomial exists and never has to write it down.

## Rigor

The six-dimensional space is the field $\mathbb{Q}(\sqrt2,\sqrt[3]5)$, and the tower law is what counts its dimension. Call $\alpha\in\mathbb{C}$ **algebraic** if $f(\alpha)=0$ for some nonzero $f\in\mathbb{Q}[x]$. Then $\alpha$ is algebraic iff $\mathbb{Q}(\alpha)$ is finite-dimensional over $\mathbb{Q}$, and $[\mathbb{Q}(\alpha):\mathbb{Q}]$ is the degree of its minimal polynomial.

**Tower law.** For fields $K\subseteq L\subseteq M$, $[M:K]=[M:L]\,[L:K]$: products of a basis of $M$ over $L$ with a basis of $L$ over $K$ form a basis of $M$ over $K$.

**Theorem.** If $\alpha,\beta$ are algebraic, so are $\alpha+\beta$, $\alpha\beta$ and $\alpha/\beta$ (for $\beta\ne0$).

*Proof.* Let $m,n$ be the degrees of $\alpha,\beta$. Then $\beta$ is algebraic over $\mathbb{Q}(\alpha)$ of degree at most $n$, so $[\mathbb{Q}(\alpha,\beta):\mathbb{Q}]\le mn$. Any $\gamma\in\mathbb{Q}(\alpha,\beta)$ gives $mn+1$ vectors $1,\gamma,\dots,\gamma^{mn}$ in a space of dimension at most $mn$; a linear dependence $\sum c_i\gamma^i=0$ is a nonzero polynomial with root $\gamma$. $\square$

**For $s=\sqrt2+\sqrt[3]5$.** $[\mathbb{Q}(\sqrt2,\sqrt[3]5):\mathbb{Q}]$ is divisible by 2 and by 3 (tower law through each generator) and is at most 6, so it is 6. The six basis vectors are $\sqrt2^{\,i}\sqrt[3]5^{\,j}$ with $i<2$, $j<3$. The counting argument only promises degree at most 6; in fact $\sqrt2\in\mathbb{Q}(s)$, so the degree is exactly 6.

## Recall
type: reveal
Q: If you insist on the polynomial for $s=\sqrt2+\sqrt[3]5$, how do you get it quickly?
A: Move $\sqrt2$ across: $(s-\sqrt2)^3=5$ gives $s^3+6s-5=\sqrt2\,(3s^2+2)$. Square both sides: $s^6-6s^4-10s^3+12s^2-60s+17=0$. The linear-algebra argument promised degree at most 6, and here it is.
