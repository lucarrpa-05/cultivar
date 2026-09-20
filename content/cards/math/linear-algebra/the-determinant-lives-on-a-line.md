---
id: math.linear-algebra.tensors-multilinear.the-determinant-lives-on-a-line
topic: math.linear-algebra.tensors-multilinear
topics: [math.linear-algebra.determinants]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [beautiful, connection]
tags: [exterior-algebra, determinant, alternating-forms, volume, wedge-product]
hook: "One sentence explains the permutation sum, the basis-independence and the multiplicativity of the determinant at once."
sources:
  - {title: "Exterior algebra", type: wiki, url: "https://en.wikipedia.org/wiki/Exterior_algebra"}
  - {title: "Determinant", type: wiki, url: "https://en.wikipedia.org/wiki/Determinant"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The determinant is one number because one space is one-dimensional

Every definition of the determinant you have met is a little bit of an accusation. Where did that alternating sum over all $n!$ permutations come from? Why does cofactor expansion give the same answer whichever row you pick? And why, really, is $\det(AB)=\det A\det B$?

One sentence answers all three.

For an $n$-dimensional space $V$, the space $\Lambda^{n}V$ of alternating $n$-linear things is one-dimensional. A linear map $T:V\to V$ induces a map on that space, and a linear map from a line to itself is multiplication by a number. That number is $\det T$.

Multiplicativity is now free: composing maps composes the scalars they multiply by. Basis-independence is free: no basis appears anywhere in the sentence. The permutation sum is what you get when you expand in coordinates, and the sign of the permutation shows up because $\Lambda$ is alternating — the same sign function that decided the 15 puzzle.

Geometrically, $\Lambda^{n}$ measures oriented volume, and $\det T$ is the factor by which $T$ scales it.

## Rigor

Let $\Lambda V=T(V)/\langle v\otimes v\rangle$, with product $\wedge$. Then $v\wedge v=0$, hence $v\wedge w=-w\wedge v$, and for a basis $e_1,\dots,e_n$ the products $e_{i_1}\wedge\cdots\wedge e_{i_k}$ with $i_1<\cdots<i_k$ are a basis of $\Lambda^{k}V$, so
$$\dim\Lambda^{k}V=\binom{n}{k},\qquad \dim\Lambda^{n}V=1 .$$

A linear $T:V\to V$ induces $\Lambda^{n}T:\Lambda^{n}V\to\Lambda^{n}V$, which is multiplication by a scalar. **Define** $\det T$ to be that scalar. Functoriality of $\Lambda^n$ gives $\det(ST)=\det S\det T$ in one line, and $T$ is invertible iff $\det T\ne0$ because $\Lambda^n T$ is then invertible.

Coordinates: with $Te_j=\sum_i a_{ij}e_i$,
$$Te_1\wedge\cdots\wedge Te_n=\sum_{\sigma\in S_n}a_{\sigma(1)1}\cdots a_{\sigma(n)n}\ e_{\sigma(1)}\wedge\cdots\wedge e_{\sigma(n)} =\Big(\sum_{\sigma}\operatorname{sgn}(\sigma)\prod_i a_{\sigma(i)i}\Big)e_1\wedge\cdots\wedge e_n,$$
because reordering the wedge costs exactly $\operatorname{sgn}(\sigma)$. The Leibniz formula is not the definition; it is the receipt.

## Recall
type: mcq
Q: Why is $\det(ST)=\det S\,\det T$ immediate from the exterior-algebra definition?
- [x] $\Lambda^n$ is functorial and $\Lambda^n V$ is a line — composing two maps composes the scalars they act by.
- [ ] Because determinants are volumes and volumes add — they multiply under composition, and additivity is not what is being used.
- [ ] Because the Leibniz formula factors — it does not factor in any obvious way; that is precisely why the direct proof is painful.
