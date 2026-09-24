---
id: math.algebra.modules.one-copy-holds-two
topic: math.algebra.modules
format: fact
difficulty: 4
language: en
weight: medium
angles: [weird, paradox]
tags: [invariant-basis-number, free-module, rank, endomorphism-ring, hilbert-hotel]
hook: "Dimension is the one number a vector space cannot lie about. Some rings have a module with a basis of one element and a basis of two."
related: [math.algebra.modules.a-spanning-set-with-no-basis-inside]
sources:
  - {title: "Invariant basis number", type: wiki, url: "https://en.wikipedia.org/wiki/Invariant_basis_number"}
  - {title: "The module type of a ring", author: "William G. Leavitt", year: 1962, type: paper, url: "https://doi.org/10.1090/S0002-9947-1962-0132764-X"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "the rigor used tensor products (not in his prerequisites); rewrote the IBN step as reduction mod a maximal ideal. Difficulty 3 to 4: non-IBN rings via End(V) are grad-algebra material. Weight light to medium: light means no rigor."}
---

# There is a ring where one copy of itself holds two

In linear algebra, dimension is the one number a space cannot lie about: $k^m\cong k^n$ forces $m=n$. Over some rings it fails outright. Let $S$ be the ring of all linear maps from a countably-infinite-dimensional vector space to itself. As modules over $S$, $S\cong S\oplus S$: one module with a basis of one element and a basis of two. Rings like this are Hilbert's hotel in algebraic form.

## Rigor

A ring $R$ has **invariant basis number** (IBN) if $R^m\cong R^n$ as $R$-modules forces $m=n$. Every nonzero commutative ring has it: pick a maximal ideal $\mathfrak m$ and reduce modulo it. An isomorphism $R^m\cong R^n$ induces $R^m/\mathfrak mR^m\cong R^n/\mathfrak mR^n$, that is, $(R/\mathfrak m)^m\cong(R/\mathfrak m)^n$ as vector spaces over the field $R/\mathfrak m$; compare dimensions.

**A ring without it.** Let $V$ have basis $e_1,e_2,\dots$ over a field $k$ and $S=\operatorname{End}_k(V)$. Splitting the basis into odd and even positions, $e_{2i-1}\mapsto(e_i,0)$ and $e_{2i}\mapsto(0,e_i)$, gives $V\cong V\oplus V$. Then
$$S=\operatorname{Hom}(V,V)\cong\operatorname{Hom}(V\oplus V,V)\cong\operatorname{Hom}(V,V)^2=S^2,$$
and each isomorphism commutes with composing on the left by elements of $S$, so it is an isomorphism of left $S$-modules. Iterating, $S\cong S^n$ for every $n\ge1$.

The field trick fails because $S$ is not commutative. In fact $S$ has no homomorphism to any field or division ring $D$ at all, since it would turn $S\cong S^2$ into $D\cong D^2$. The odd rooms and the even rooms of the hotel each form a full copy, and that is the whole argument.
