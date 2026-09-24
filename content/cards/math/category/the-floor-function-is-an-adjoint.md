---
id: math.category.adjunctions.the-floor-function-is-an-adjoint
topic: math.category.adjunctions
format: fact
difficulty: 3
language: en
weight: light
angles: [weird, beautiful, tool]
tags: [floor-function, galois-connection, poset, adjunction, yoneda]
hook: "The floor function is a right adjoint. That is why identities about it can be proved without a single case split."
related: [math.category.adjunctions.say-where-the-generators-go]
sources:
  - {title: "Galois connection (floor and ceiling example)", type: wiki, url: "https://en.wikipedia.org/wiki/Galois_connection"}
  - {title: "Adjoint functors", type: wiki, url: "https://en.wikipedia.org/wiki/Adjoint_functors"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved}
---

# The floor function is an adjoint, which is why it behaves so well

For an integer $n$ and a real number $x$: $n\le x$ exactly when $n\le\lfloor x\rfloor$. That one line says everything the floor function is. It also says floor is the right adjoint of the inclusion of the integers into the reals, both seen as ordered sets. Adjunctions between ordered sets are called Galois connections, and they prove identities like $\lfloor\lfloor x\rfloor/k\rfloor=\lfloor x/k\rfloor$ without cases.

## Rigor

A poset is a category with one arrow $a\to b$ exactly when $a\le b$. A functor between posets is a monotone map, and an adjunction between $f:P\to Q$ and $g:Q\to P$ reduces to
$$f(p)\le q\iff p\le g(q)\qquad\text{for all }p,q;$$
each Hom-set has at most one element, so naturality is automatic.

**Floor.** With $\iota:\mathbb{Z}\to\mathbb{R}$ the inclusion, $\iota(n)\le x\iff n\le\lfloor x\rfloor$ is exactly $\iota\dashv\lfloor\cdot\rfloor$. Dually, $\lceil\cdot\rceil\dashv\iota$.

**Identities by chasing the adjunction.** For an integer $k\ge1$ and any integer $n$,
$$n\le\Big\lfloor\frac{\lfloor x\rfloor}{k}\Big\rfloor\iff nk\le\lfloor x\rfloor\iff nk\le x\iff n\le\frac xk\iff n\le\Big\lfloor\frac xk\Big\rfloor .$$
Two integers with exactly the same integers below them are equal. That last step is the Yoneda idea in miniature: an object is determined by the maps into it.

**Limits.** Right adjoints preserve limits, and in a poset a limit of two elements is their minimum. So $\lfloor\min(x,y)\rfloor=\min(\lfloor x\rfloor,\lfloor y\rfloor)$, with no cases either.
