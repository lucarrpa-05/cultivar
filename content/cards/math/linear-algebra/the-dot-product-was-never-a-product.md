---
id: math.linear-algebra.duality.the-dot-product-was-never-a-product
topic: math.linear-algebra.duality
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, beautiful]
tags: [dual-space, riesz-representation, row-vectors, covectors, natural-isomorphism]
hook: "Row vectors and column vectors have always felt different because they are different kinds of object. An inner product hides the difference."
callback: {from: math.linear-algebra.inner-products, to: math.linear-algebra.duality}
sources:
  - {title: "Dual space", type: wiki, url: "https://en.wikipedia.org/wiki/Dual_space"}
  - {title: "Riesz representation theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Riesz_representation_theorem"}
dates: {written: 2026-09-19}
related: [math.linear-algebra.duality.the-transpose-is-an-arrow-reversal]
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Reflexivity belongs to the continuous dual of a normed space; said so instead of implying the algebraic dual."}
---

# Remember the dot product? It was never a product

Remember $v\cdot w$: two vectors in, one number out, linear in each slot. Now freeze one of the two arguments. What is left is a machine that eats a vector and returns a number, linearly. That machine is not a vector. It lives somewhere else.

The space of linear maps from $V$ to its scalars is the **dual space** $V^*$, and its elements are not arrows — they are measurements. "The $x$-coordinate of." "The total mass of." "The pressure at this point." In coordinates they come out as row vectors, and the reason row and column vectors have always felt subtly like different animals is that they are.

Now the part that matters. An inner product hands you an isomorphism $V\to V^*$, and that is why you were able to ignore all of this for years. But the isomorphism depends on which inner product you picked: change the metric and every row vector changes. The isomorphism $V\to V^{**}$ needs no choices whatsoever.

That distinction — natural versus merely available — is where the difference stops being pedantic.

## Rigor

$V^{*}=\operatorname{Hom}(V,k)$. If $e_1,\dots,e_n$ is a basis of $V$, the **dual basis** $e^1,\dots,e^n$ defined by $e^i(e_j)=\delta^i_j$ is a basis of $V^*$, so $\dim V^*=\dim V$ and $V\cong V^*$ — but the isomorphism depends on the basis you chose.

**Riesz, finite-dimensional.** If $\langle\cdot,\cdot\rangle$ is a non-degenerate bilinear form on $V$, then $v\mapsto\langle v,\cdot\rangle$ is an isomorphism $V\to V^*$. Non-degeneracy gives injectivity, and equal dimensions give surjectivity. So every linear functional is "dot with something" — with *which* something depending entirely on the form.

**The natural one.** Define $\operatorname{ev}:V\to V^{**}$ by $\operatorname{ev}(v)(\varphi)=\varphi(v)$. No basis, no metric, nothing chosen. It is injective always, and an isomorphism when $\dim V<\infty$. In infinite dimensions it stops being surjective; for a normed space, where $V^*$ means the *continuous* dual, the ones on which it is still onto are called reflexive.

The frozen dot product from the intuition is exactly $\langle v,\cdot\rangle$: the image of $v$ under Riesz.

## Recall
type: mcq
Q: Why is the isomorphism $V\to V^{**}$ considered better than the isomorphism $V\to V^{*}$?
- [x] It requires no choice of basis or inner product — it is defined by evaluation, so it commutes with every linear map.
- [ ] Because $V^{**}$ is bigger than $V^{*}$ — in finite dimensions all three spaces have the same dimension.
- [ ] Because $V \to V^{*}$ is never an isomorphism — it is, for any non-degenerate form; the objection is that you had to pick one.
