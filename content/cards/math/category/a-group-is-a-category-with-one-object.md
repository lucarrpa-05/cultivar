---
id: math.category.categories-functors.a-group-is-a-category-with-one-object
topic: math.category.categories-functors
topics: [math.algebra.group-actions]
format: idea
difficulty: 3
language: en
weight: medium
angles: [connection, beautiful]
tags: [one-object-category, group-action, functor, equivariant-map, yoneda, cayley-theorem]
hook: "Draw one dot and one loop for each element of a group. That picture is a category, and a functor out of it is exactly a group action."
related: [math.algebra.group-actions.cayley-reads-the-multiplication-table, math.algebra.group-actions.the-group-leaves-home]
sources:
  - {title: "Functor (examples: group actions)", type: wiki, url: "https://en.wikipedia.org/wiki/Functor"}
  - {title: "Yoneda lemma (a generalisation of Cayley's theorem)", type: wiki, url: "https://en.wikipedia.org/wiki/Yoneda_lemma"}
  - {title: "delooping", type: encyclopedia, url: "https://ncatlab.org/nlab/show/delooping"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved}
---

# A group is a category with one object, and an action is a functor

Draw a single dot. Draw one arrow from the dot back to itself for every element of a group, and declare that following two arrows in a row means multiplying. That picture is a category with one object in which every arrow can be undone. It is the group, nothing added.

Now ask what a functor from this one-dot category into sets looks like. It sends the dot to some set $X$, and each arrow to a function from $X$ to itself, respecting composition and the identity. That is, word for word, the definition of a group action.

So actions have a one-line summary in the other language: they are functors out of a group.

## Rigor

For a group $G$, let $\mathbf BG$ be the category with one object $\ast$, $\operatorname{Hom}(\ast,\ast)=G$, composition the group law and identity $e$.

**Actions are functors.** A functor $F:\mathbf BG\to\mathbf{Set}$ is a set $X=F(\ast)$ with functions $F(g):X\to X$ such that $F(gh)=F(g)\circ F(h)$ and $F(e)=\mathrm{id}_X$. Writing $g\cdot x=F(g)(x)$, these are exactly the axioms $(gh)\cdot x=g\cdot(h\cdot x)$ and $e\cdot x=x$.

**Homomorphisms are functors.** A functor $\mathbf BG\to\mathbf BH$ is a map $G\to H$ preserving products and the identity.

**Equivariant maps are natural transformations.** For actions $F,F'$ on $X,X'$, a natural transformation $\alpha:F\Rightarrow F'$ has one component $\alpha_\ast:X\to X'$, and naturality says $\alpha_\ast(g\cdot x)=g\cdot\alpha_\ast(x)$.

**Cayley, seen again.** Left multiplication is the functor $\operatorname{Hom}(\ast,-)$. The Yoneda lemma says its natural transformations to itself correspond to $\operatorname{Hom}(\ast,\ast)=G$; concretely they are the right multiplications $x\mapsto xg$, a copy of $G$ inside the permutations of $G$. Cayley's theorem is the one-object case of Yoneda.

## Recall
type: mcq
Q: In the one-object category of a group $G$, what is a functor into $\mathbf{Set}$?
- [x] A $G$-action on a set — the object goes to a set, each arrow to a permutation of it, compatibly with multiplication.
- [ ] A subgroup of $G$ — a subgroup is a subcategory, not a functor into $\mathbf{Set}$.
- [ ] A homomorphism $G\to\mathbb{Z}$ — that is a functor into the one-object category of $\mathbb{Z}$, not into $\mathbf{Set}$.
