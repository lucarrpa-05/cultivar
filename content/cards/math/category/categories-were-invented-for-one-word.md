---
id: math.category.natural-transformations.categories-were-invented-for-one-word
topic: math.category.natural-transformations
format: story
difficulty: 3
language: en
weight: medium
angles: [origin, history, human]
tags: [natural-transformation, eilenberg-mac-lane, double-dual, naturality-square, canonical]
hook: "Mathematicians said 'natural' for decades without being able to define it. Defining it took a new branch of mathematics."
related: [math.linear-algebra.duality.the-dot-product-was-never-a-product, math.category.categories-functors.borrowed-from-aristotle-and-carnap]
diagram: {file: math/naturality-square.svg, caption: "A natural transformation is a family of arrows that makes this square close for every map f, with no choices made anywhere.", alt: "A square with F of A and G of A along the top, F of B and G of B along the bottom; the horizontal arrows are the components at A and B, the vertical arrows are F of f and G of f."}
sources:
  - {title: "General theory of natural equivalences", author: "Samuel Eilenberg and Saunders MacLane", year: 1945, type: paper, url: "https://doi.org/10.1090/S0002-9947-1945-0013131-6"}
  - {title: "Category Theory (Stanford Encyclopedia of Philosophy)", author: "Jean-Pierre Marquis", type: encyclopedia, url: "https://plato.stanford.edu/entries/category-theory/"}
  - {title: "Natural transformation", type: wiki, url: "https://en.wikipedia.org/wiki/Natural_transformation"}
dates: {written: 2026-09-23, event: 1945-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Replaced the unsourced 'Mac Lane is said to have' line with the verbatim 1945 sentence (quoted in SEP), added SEP as a source; difficulty 2 to 3 because the rigor proves naturality of the double dual. Trimmed to 120 words."}
---

# Category theory was invented to define one ordinary word: natural

For decades mathematicians called an isomorphism "natural" when it did not depend on arbitrary choices. A finite-dimensional vector space is isomorphic to its double dual without picking a basis, and to its dual only after picking one. Nobody could define the difference.

In 1945 Samuel Eilenberg and Saunders Mac Lane did, in *General theory of natural equivalences*. To say what a natural map between two constructions is, they first had to say what a construction is, a functor, and before that what it acts on, a category. The paper admits it: "the whole concept of a category is essentially an auxiliary one; our basic concepts are essentially those of a functor and of natural transformation."

It fits in one square.

## Rigor

Given functors $F,G:\mathcal C\to\mathcal D$, a **natural transformation** $\alpha:F\Rightarrow G$ is a family of arrows $\alpha_A:FA\to GA$, one for each object $A$, such that for every arrow $f:A\to B$
$$\alpha_B\circ Ff=Gf\circ\alpha_A .$$
Right then down equals down then right: the square in the diagram closes.

**The double dual.** Let $F$ be the identity functor on finite-dimensional vector spaces over a field $k$, and $G=(-)^{**}$. Define $\alpha_V(v)=(\varphi\mapsto\varphi(v))$, which uses no basis. For linear $T:V\to W$ and $\psi\in W^*$,
$$T^{**}(\alpha_Vv)(\psi)=\alpha_Vv(\psi\circ T)=\psi(Tv)=\alpha_W(Tv)(\psi),$$
so the square closes. Each $\alpha_V$ is injective between spaces of equal dimension, hence an isomorphism: $\alpha$ is a natural isomorphism.

**The single dual.** $V\mapsto V^*$ reverses arrows, $T\mapsto T^*:W^*\to V^*$, while the identity functor does not. So there is no square to even write down between them. "Depends on a choice" became "has no naturality square", which is something you can check.

## Recall
type: reveal
Q: What does it mean, precisely, for the isomorphism $V\to V^{**}$ to be natural?
A: For every linear map $T:V\to W$, going $V\to V^{**}\to W^{**}$ (via $T^{**}$) equals going $V\to W\to W^{**}$: the square closes for every $T$, with no basis chosen anywhere.
