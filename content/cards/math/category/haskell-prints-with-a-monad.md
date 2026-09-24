---
id: math.category.monads.haskell-prints-with-a-monad
topic: math.category.monads
format: story
difficulty: 3
language: en
weight: medium
angles: [connection, history, practical]
tags: [monads, haskell, moggi, wadler, kleisli, side-effects]
hook: "A purely functional language struggles to print to the screen. The fix, worked out in the early 1990s, came from 1950s category theory."
related: [math.category.monads.just-a-monoid-in-endofunctors, math.category.monads.probability-is-a-monad]
sources:
  - {title: "Notions of computation and monads", author: "Eugenio Moggi", year: 1991, type: paper, url: "https://doi.org/10.1016/0890-5401(91)90052-4"}
  - {title: "The essence of functional programming", author: "Philip Wadler", year: 1992, type: paper, url: "https://doi.org/10.1145/143165.143169"}
  - {title: "Imperative functional programming", author: "Simon Peyton Jones and Philip Wadler", year: 1993, type: paper, url: "https://doi.org/10.1145/158511.158524"}
  - {title: "Monadic I/O in Haskell 1.3", author: "Andrew D. Gordon and Kevin Hammond", year: 1995, type: paper, url: "https://www.microsoft.com/en-us/research/publication/monadic-io-in-haskell-1-3/"}
  - {title: "Monad (functional programming)", type: wiki, url: "https://en.wikipedia.org/wiki/Monad_(functional_programming)"}
dates: {written: 2026-09-23, event: 1989-01-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Haskell adopted monadic I/O in version 1.3 (1996), not the early 1990s: fixed hook and body, dated Wadler 1990-92, added Gordon and Hammond 1995 as a source."}
---

# Haskell prints to your screen with a borrowed piece of category theory

A purely functional programming language makes a noble promise that turns out to be crippling: a function's output depends only on its input, and nothing else happens. So how do you print to the screen, or read a file?

Early Haskell did input and output with an awkward stream model. In 1989 Eugenio Moggi proposed describing computations with side effects using monads, a structure category theorists had studied since Roger Godement in 1958. Philip Wadler brought it to programmers in 1990–92, and in 1993 he and Simon Peyton Jones showed how to do input and output with it. Haskell 1.3 adopted it in 1996.

A monad supplies a way to glue effectful steps together so that the gluing is associative.

## Rigor

A **monad** on a category $\mathcal C$ is a functor $T:\mathcal C\to\mathcal C$ with natural transformations $\eta:1\Rightarrow T$ (unit) and $\mu:TT\Rightarrow T$ (multiplication) such that
$$\mu\circ T\mu=\mu\circ\mu T,\qquad \mu\circ\eta T=\mu\circ T\eta=1_T .$$

**Moggi's reading.** $TA$ is "computations that produce an $A$", and an effectful program from $A$ to $B$ is an arrow $A\to TB$. Two of them compose by the **Kleisli composite**
$$g\circ_T f=\mu_C\circ Tg\circ f\qquad(f:A\to TB,\ g:B\to TC),$$
with $\eta_A$ as the identity. The monad laws are exactly what make this composition associative and unital, so effectful programs form a category of their own.

**Example: lists.** $T(A)$ is the set of finite lists of elements of $A$; $\eta(a)=[a]$; $\mu$ concatenates a list of lists. An arrow $A\to TB$ is a nondeterministic function, and the Kleisli composite runs every branch. In Haskell, $\eta$ is `return` and the Kleisli composite is built from `>>=`.

**Where monads come from.** Every adjunction $F\dashv G$ gives a monad $GF$. The list monad comes from the free monoid on a set, left adjoint to forgetting the monoid structure.

## Recall
type: mcq
Q: What do the monad laws buy a programmer?
- [x] Associative, unital composition of effectful steps — gluing (f then g) then h equals f then (g then h), so programs can be refactored safely.
- [ ] The absence of side effects — monads organise effects, they do not remove them.
- [ ] Faster execution — the laws are equations about meaning, not about performance.
