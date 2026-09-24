---
id: math.category.natural-transformations.a-homotopy-one-arrow-wide
topic: math.category.natural-transformations
topics: [math.topology.continuity-homeomorphism]
format: idea
difficulty: 4
language: en
weight: medium
angles: [connection, beautiful]
tags: [natural-transformation, homotopy, interval-category, product-category, nerve]
hook: "A homotopy deforms one map into another over an interval. Replace the interval by a single arrow and you get a natural transformation."
related: [math.category.natural-transformations.categories-were-invented-for-one-word]
sources:
  - {title: "natural transformation (via the interval category)", type: encyclopedia, url: "https://ncatlab.org/nlab/show/natural+transformation"}
  - {title: "Nerve (category theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Nerve_(category_theory)"}
  - {title: "Homotopy", type: wiki, url: "https://en.wikipedia.org/wiki/Homotopy"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved}
---

# A natural transformation is a homotopy with an arrow for an interval

In topology, a homotopy between maps $f,g:X\to Y$ is a continuous deformation: a map from $X\times[0,1]$ to $Y$ that is $f$ at time 0 and $g$ at time 1. Each point of $X$ traces a path from $f(x)$ to $g(x)$, and nearby points trace nearby paths.

Now replace the interval by the smallest category that still has a start and an end: two objects and one arrow between them. A functor out of "category times arrow" that is $F$ at the start and $G$ at the end gives, for each object, an arrow from $F(A)$ to $G(A)$: the path. Compatibility with the arrows of the category is the nearby-paths condition.

That is exactly a natural transformation.

## Rigor

Let $\mathbf 2$ be the category with objects $0,1$ and one non-identity arrow $u:0\to1$.

**Claim.** Natural transformations $F\Rightarrow G$ between functors $\mathcal C\to\mathcal D$ correspond bijectively to functors $H:\mathcal C\times\mathbf 2\to\mathcal D$ with $H(-,0)=F$ and $H(-,1)=G$.

*Proof.* Given $H$, set $\alpha_A=H(1_A,u):FA\to GA$. In $\mathcal C\times\mathbf 2$, for $f:A\to B$,
$$(f,1_1)\circ(1_A,u)=(f,u)=(1_B,u)\circ(f,1_0),$$
and applying $H$ gives $Gf\circ\alpha_A=\alpha_B\circ Ff$. The naturality square is the image of a square that already commutes in $\mathcal C\times\mathbf 2$. Conversely, given $\alpha$, put $H(f,1_0)=Ff$, $H(f,1_1)=Gf$ and $H(f,u)=\alpha_B\circ Ff$; functoriality of $H$ reduces to naturality of $\alpha$. $\square$

**More than an analogy.** The nerve construction turns a category into a space, and it sends $\mathbf 2$ to a line segment. A natural transformation $F\Rightarrow G$ then becomes a homotopy between the induced maps of spaces. That is why an equivalence of categories induces a homotopy equivalence of their classifying spaces.

## Recall
type: mcq
Q: What plays the role of the interval $[0,1]$ when a natural transformation is viewed as a homotopy?
- [x] The category $\mathbf 2$ with two objects and one arrow $0\to1$ — a functor out of $\mathcal C\times\mathbf 2$ is exactly a natural transformation.
- [ ] The real numbers as a poset — far more than needed; one arrow already gives a start, an end and a path.
- [ ] The category with one object — it has no distinct start and end, so it cannot connect $F$ to $G$.
