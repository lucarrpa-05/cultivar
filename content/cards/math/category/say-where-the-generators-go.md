---
id: math.category.adjunctions.say-where-the-generators-go
topic: math.category.adjunctions
topics: [math.algebra.homomorphisms-quotients]
format: idea
difficulty: 3
language: en
weight: medium
angles: [connection, tool]
tags: [adjunction, free-group, forgetful-functor, universal-property, abelianisation]
hook: "Every time you defined a homomorphism by saying where the generators go, you were using an adjunction."
related: [math.category.adjunctions.kan-found-them-in-1958]
sources:
  - {title: "Adjoint functors", type: wiki, url: "https://en.wikipedia.org/wiki/Adjoint_functors"}
  - {title: "Free group", type: wiki, url: "https://en.wikipedia.org/wiki/Free_group"}
  - {title: "adjunction", type: encyclopedia, url: "https://ncatlab.org/nlab/show/adjunction"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved}
---

# Every time you said "send the generators", you used an adjunction

There is a sentence in group theory you use so often it feels like grammar: to define a homomorphism out of a free group, just say where the generators go. Any choice works, and the choice decides the map.

That sentence is a perfect matching between two kinds of arrows. On one side, plain functions from a set $X$ into a group $G$. On the other, homomorphisms from the free group on $X$ into $G$. Every function extends to exactly one homomorphism, and every homomorphism restricts to one function.

A matching like that is called an adjunction. Free vector spaces, polynomial rings and abelianisation are all the most efficient answer to one problem, in exactly this sense.

## Rigor

Let $U:\mathbf{Grp}\to\mathbf{Set}$ forget the multiplication, and $F:\mathbf{Set}\to\mathbf{Grp}$ send $X$ to the free group on $X$, with inclusion of generators $\eta_X:X\to UF(X)$.

**Adjunction.** $F\dashv U$ means a bijection
$$\operatorname{Hom}_{\mathbf{Grp}}(FX,G)\ \cong\ \operatorname{Hom}_{\mathbf{Set}}(X,UG),\qquad \varphi\mapsto U\varphi\circ\eta_X ,$$
natural in $X$ and $G$: it respects precomposing with functions $X'\to X$ and postcomposing with homomorphisms $G\to G'$.

This is the universal property of free groups. For every function $f:X\to UG$ there is a unique homomorphism $\bar f:FX\to G$ with $\bar f\circ\eta_X=f$, namely $\bar f(x_1^{\epsilon_1}\cdots x_k^{\epsilon_k})=f(x_1)^{\epsilon_1}\cdots f(x_k)^{\epsilon_k}$; the only thing to check is that it is well defined on reduced words.

**Two more.** Abelianisation is left adjoint to the inclusion $\mathbf{Ab}\hookrightarrow\mathbf{Grp}$: for abelian $A$, homomorphisms $G/[G,G]\to A$ are exactly the homomorphisms $G\to A$. The free vector space on a set is left adjoint to forgetting the vector-space structure: a linear map may take any values on a basis.

The pattern to recognise: a left adjoint freely adds structure, and the bijection is "say where the generators go".

## Recall
type: mcq
Q: The free group functor is left adjoint to the forgetful functor. What does $\operatorname{Hom}(FX,G)\cong\operatorname{Hom}(X,UG)$ say in plain words?
- [x] A homomorphism out of a free group is the same as an arbitrary choice of where each generator goes — every choice extends, uniquely.
- [ ] Every group is free — most groups have relations; the adjunction is about maps out of free groups.
- [ ] Homomorphisms into a free group are decided by generators — the direction matters: it is maps out of $FX$ that can be chosen freely.
