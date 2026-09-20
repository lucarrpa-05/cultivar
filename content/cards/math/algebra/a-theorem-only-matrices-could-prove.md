---
id: math.algebra.representations.a-theorem-only-matrices-could-prove
topic: math.algebra.representations
format: idea
difficulty: 4
language: en
weight: medium
angles: [history, tool]
tags: [burnside-theorem, characters, solvable-groups, algebraic-integers, representations]
hook: "A statement purely about finite groups that nobody could prove without complex matrices — for sixty-eight years."
sources:
  - {title: "Burnside's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Burnside%27s_theorem"}
  - {title: "Representation theory of finite groups", type: wiki, url: "https://en.wikipedia.org/wiki/Representation_theory_of_finite_groups"}
dates: {written: 2026-09-19, event: 1904-01-01}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Goldschmidt and Bender split the proof by the order of the group, not by the parity of the prime."}
---

# The theorem that had to go through the complex numbers

William Burnside proved in 1904 that any finite group whose order has only two prime factors — order $p^aq^b$ — is solvable. Read the statement again: finite groups, prime factors, solvability. Nothing continuous, nothing analytic, no complex numbers anywhere in sight.

His proof turns the group into matrices over $\mathbb{C}$, takes traces, and then leans on the fact that those traces are algebraic integers. It leaves the world of finite combinatorics entirely and does not come back until the last line.

For sixty-eight years nobody could avoid the detour. The character-free proofs finally arrived in the 1970s — Goldschmidt for groups of odd order in 1970, Bender for even order in 1972, Matsuyama simplifying in 1973 — and they are not shorter.

That is the case for representation theory in a sentence. An abstract group offers almost nothing to grab. Turn its elements into matrices and you inherit eigenvalues, traces, orthogonality and the whole of linear algebra, for free.

## Rigor

A **representation** is a homomorphism $\rho:G\to GL_n(\mathbb{C})$; its **character** is $\chi(g)=\operatorname{tr}\rho(g)$, a class function. The irreducible characters form an orthonormal basis of the class functions, and $\sum_i (\dim\chi_i)^2 = |G|$.

Two facts do the work. Each $\chi(g)$ is a sum of roots of unity, hence an algebraic integer; and $\frac{|C|\chi(g)}{\chi(1)}$ is an algebraic integer for a conjugacy class $C$ with $g \in C$.

**Key lemma.** If $\gcd(|C|,\chi(1))=1$ and $g\in C$, then either $\chi(g)=0$ or $\rho(g)$ is a scalar matrix. (Bézout turns the two integrality facts into $\chi(g)/\chi(1)$ being an algebraic integer; it is also an average of roots of unity, hence of absolute value $\le 1$, and equality forces a scalar.)

**Consequence.** If $G$ has a conjugacy class of size $p^{k}$ with $k\ge1$, then $G$ is not simple.

**Burnside.** Take $|G|=p^aq^b$ non-trivial. A Sylow $p$-subgroup has non-trivial centre (the class equation, again). An element $g\ne e$ there is centralised by the whole Sylow $p$-subgroup, so its class size divides $q^b$ — a prime power. Hence $G$ is not simple, and induction on $|G|$ finishes it.

## Recall
type: mcq
Q: What does turning a group into matrices actually buy you?
- [x] Traces — the character is a class function whose values are algebraic integers, which imports number theory into a purely finite question.
- [ ] A faithful action on a set — Cayley's theorem already gives that, with no linear algebra involved.
- [ ] A proof that the group is abelian — representations exist for every finite group; they do not make it commutative.
