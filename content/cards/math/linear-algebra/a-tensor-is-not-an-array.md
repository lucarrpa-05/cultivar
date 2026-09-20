---
id: math.linear-algebra.tensors-multilinear.a-tensor-is-not-an-array
topic: math.linear-algebra.tensors-multilinear
format: idea
difficulty: 4
language: en
weight: heavy
angles: [tool, connection]
tags: [tensor-product, universal-property, bilinear-maps, pure-tensors, multilinear]
hook: "The tensor product exists to do one job: turn every bilinear map into a linear one, in exactly one way."
sources:
  - {title: "Tensor product", type: wiki, url: "https://en.wikipedia.org/wiki/Tensor_product"}
  - {title: "Universal property", type: wiki, url: "https://en.wikipedia.org/wiki/Universal_property"}
dates: {written: 2026-09-19}
diagram: {file: math/tensor-universal-property.svg, caption: "Any bilinear map out of a pair of spaces factors through the tensor product, and through exactly one linear map.", alt: "A triangle: the pair of spaces maps to their tensor product along the top and to a target space down the left, with a dashed unique linear arrow from the tensor product to the target"}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A tensor is a machine that turns bilinear into linear

You may have met tensors as arrays with indices and rules about how the indices transform under a change of coordinates. That describes the coordinates, not the object, and it buries the reason tensors were invented.

Here is the reason. Linear maps are easy to handle: they are determined by what they do to a basis, they add, they compose, they sit in matrices. Bilinear maps — two inputs, linear in each one separately — are not easy, and there are a great many of them that you care about: inner products, determinants, multiplication in an algebra, the cross product, the evaluation pairing between a space and its dual.

The tensor product is the one construction that converts the hard problem into the easy one. The space $V\otimes W$ is built precisely so that bilinear maps out of $V\times W$ match up, one for one, with *linear* maps out of $V\otimes W$. After that you never reason about bilinearity again; you reason about linear maps on a larger space.

The array is what appears once you choose bases. It is the output, not the definition.

## Rigor

**Universal property.** $V\otimes W$ together with a bilinear $\otimes:V\times W\to V\otimes W$ has the property that for every bilinear $b:V\times W\to U$ there is a *unique* linear $\tilde b:V\otimes W\to U$ with $b=\tilde b\circ\otimes$. This determines $V\otimes W$ up to unique isomorphism.

**Existence.** Take the free vector space on the set $V\times W$ and quotient by the relations
$$(v+v',w)-(v,w)-(v',w),\quad (v,w+w')-(v,w)-(v,w'),\quad (\lambda v,w)-\lambda(v,w),\quad (v,\lambda w)-\lambda(v,w).$$
Bilinearity is imposed by force; everything else follows.

If $\{e_i\}$ and $\{f_j\}$ are bases then $\{e_i\otimes f_j\}$ is a basis, so $\dim(V\otimes W)=\dim V\cdot\dim W$ — not the sum, which is $V\oplus W$.

**The trap.** Not every element of $V\otimes W$ is of the form $v\otimes w$. In $\mathbb{R}^2\otimes\mathbb{R}^2$ the element $e_1\otimes e_1+e_2\otimes e_2$ is not a pure tensor: as a matrix it has rank 2, and pure tensors are exactly the rank-1 matrices. Tensor rank is the smallest number of pure tensors you need to sum, and in three or more factors computing it is NP-hard.

## Recall
type: mcq
Q: What is the tensor product $V \otimes W$ for?
- [x] It represents bilinear maps — every bilinear map out of $V\times W$ becomes exactly one linear map out of $V\otimes W$.
- [ ] It is the space of pairs $(v,w)$ — that is $V\times W$, whose dimension is the sum, not the product.
- [ ] It is the space of matrices with $V$ rows and $W$ columns — true after choosing bases, but that is a consequence, not the definition.
