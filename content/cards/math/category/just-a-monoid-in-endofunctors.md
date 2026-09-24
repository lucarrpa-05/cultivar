---
id: math.category.monads.just-a-monoid-in-endofunctors
topic: math.category.monads
format: fact
difficulty: 3
language: en
weight: light
angles: [origin, weird]
tags: [monoid, endofunctors, mac-lane, monoidal-category, programming-folklore]
hook: "Programmers' favourite joke about category theory is a real sentence from a 1971 textbook, and it is true."
related: [math.category.monads.haskell-prints-with-a-monad]
sources:
  - {title: "A Brief, Incomplete, and Mostly Wrong History of Programming Languages", author: "James Iry", year: 2009, type: blog, url: "https://james-iry.blogspot.com/2009/05/brief-incomplete-and-mostly-wrong.html"}
  - {title: "Categories for the Working Mathematician, 2nd ed., §VI.1, p. 138 (first edition 1971)", author: "Saunders Mac Lane", year: 1998, type: book, url: "https://doi.org/10.1007/978-1-4757-4721-8"}
  - {title: "Monad (category theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Monad_(category_theory)"}
dates: {written: 2026-09-23, event: 2009-05-07}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Iry's 2009 joke puts the line in Wadler's mouth: said so. Replaced 'almost exactly' with Mac Lane's verbatim sentence (VI.1, p. 138); the DOI is the 1998 2nd edition, source relabelled."}
---

# Programming's favourite joke is a sentence from a 1971 textbook

"A monad is a monoid in the category of endofunctors, what's the problem?" In 2009 the programmer James Iry put that line in the mouth of Haskell designer Philip Wadler, in a tongue-in-cheek history of programming languages. It escaped into folklore. But the sentence is older than Haskell. Saunders Mac Lane's *Categories for the Working Mathematician* (1971) had already said it: "a monad in X is just a monoid in the category of endofunctors of X". And it is literally true.

## Rigor

A **monoid** in a monoidal category $(\mathcal M,\otimes,I)$ is an object $M$ with a multiplication $m:M\otimes M\to M$ and a unit $e:I\to M$ satisfying associativity and unit laws. In $(\mathbf{Set},\times,\{\ast\})$ this is an ordinary monoid.

Now take $\mathcal M=\operatorname{End}(\mathcal C)$: the functors $\mathcal C\to\mathcal C$, with natural transformations as arrows, $\otimes$ given by composition of functors, and $I$ the identity functor. A monoid there is a functor $T$ with $\mu:T\circ T\Rightarrow T$ and $\eta:1\Rightarrow T$ satisfying
$$\mu\circ T\mu=\mu\circ\mu T,\qquad\mu\circ T\eta=1_T=\mu\circ\eta T .$$
That is the definition of a monad, word for word. The multiplication flattens two layers of $T$ into one; the unit wraps a plain value in one layer.

For the list monad: flattening a list of lists of lists gives the same result whichever layer you flatten first. That is the associativity of the monoid, and the whole content of the joke.

## Recall
type: reveal
Q: In "a monad is a monoid in the category of endofunctors", what plays the role of the multiplication, and of the product it multiplies?
A: The product is composition of functors, $T\circ T$; the multiplication is the natural transformation $\mu:T\circ T\Rightarrow T$ that flattens two layers into one. The unit is $\eta:1\Rightarrow T$.
