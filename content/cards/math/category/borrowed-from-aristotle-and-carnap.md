---
id: math.category.categories-functors.borrowed-from-aristotle-and-carnap
topic: math.category.categories-functors
format: fact
difficulty: 2
language: en
weight: light
angles: [origin, history]
tags: [etymology, eilenberg-mac-lane, carnap, functor, category]
hook: "The two founding words of category theory were borrowed from philosophers: one from Aristotle, one from a logician of language."
related: [math.category.natural-transformations.categories-were-invented-for-one-word]
sources:
  - {title: "Category Theory (Stanford Encyclopedia of Philosophy)", author: "Jean-Pierre Marquis", type: encyclopedia, url: "https://plato.stanford.edu/entries/category-theory/"}
  - {title: "Functor (etymology)", type: wiki, url: "https://en.wikipedia.org/wiki/Functor"}
  - {title: "General theory of natural equivalences", author: "Samuel Eilenberg and Saunders MacLane", year: 1945, type: paper, url: "https://doi.org/10.1090/S0002-9947-1945-0013131-6"}
dates: {written: 2026-09-23, event: 1945-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Category came from Aristotle, Kant and Peirce (SEP), not Aristotle alone; added the SEP source and replaced the generic last line with the objects-to-arrows twist."}
---

# "Category" came from Aristotle and "functor" from a philosopher of language

When Samuel Eilenberg and Saunders Mac Lane needed words for their 1945 paper, they borrowed. *Functor* came from the philosopher Rudolf Carnap, who used it in the logic of language for expressions that behave like functions. *Category* came from Aristotle, by way of Kant and Peirce. The philosophers' categories were lists of the most general kinds of thing. The mathematicians' version flipped the emphasis: a category is things plus the arrows between them, and the arrows do almost all the work.

## Rigor

A **category** $\mathcal C$ has objects and, for each pair $A,B$, a set of arrows $\operatorname{Hom}(A,B)$, with an associative composition and an identity arrow $1_A$ on each object.

A **functor** $F:\mathcal C\to\mathcal D$ sends objects to objects and each arrow $f:A\to B$ to an arrow $Ff:FA\to FB$, with
$$F(g\circ f)=Fg\circ Ff,\qquad F(1_A)=1_{FA}.$$

**Functors you already use.** The fundamental group, from pointed spaces to groups: a continuous map becomes a homomorphism. The dual space, from vector spaces to vector spaces, with $T\mapsto T^*$ reversing the arrows (a *contravariant* functor). Preimages: a function $f:X\to Y$ gives $f^{-1}:\mathcal P(Y)\to\mathcal P(X)$, again reversing direction.

**Why the two equations matter.** Functors preserve isomorphisms: if $g$ is inverse to $f$, then $Fg\circ Ff=F(g\circ f)=F(1)=1$, and the same on the other side. That single line is why homeomorphic spaces have isomorphic fundamental groups.
