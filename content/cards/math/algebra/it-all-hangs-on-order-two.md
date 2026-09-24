---
id: math.algebra.classification-finite-simple.it-all-hangs-on-order-two
topic: math.algebra.classification-finite-simple
topics: [math.algebra.sylow]
format: idea
difficulty: 3
language: en
weight: medium
angles: [history, tool, numbers]
tags: [involutions, centraliser, brauer-fowler, feit-thompson, odd-order-theorem, janko]
hook: "The plan for listing every finite simple group started from elements of order two. It needed a 255-page theorem to guarantee they exist."
related: [math.algebra.classification-finite-simple.the-theorem-nobody-has-read, math.algebra.homomorphisms-quotients.the-primes-of-group-theory]
sources:
  - {title: "Feit–Thompson theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Feit%E2%80%93Thompson_theorem"}
  - {title: "Solvability of groups of odd order", author: "Walter Feit and John G. Thompson", year: 1963, type: paper, url: "https://doi.org/10.2140/pjm.1963.13.775"}
  - {title: "Brauer–Fowler theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Brauer%E2%80%93Fowler_theorem"}
  - {title: "Janko group J1", type: wiki, url: "https://en.wikipedia.org/wiki/Janko_group_J1"}
dates: {written: 2026-09-23, event: 1963-09-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "title said 'the whole classification' while the body says 'much of'; dropped 'whole' and named the classification. Event date 1963-01-01 placeholder set to the issue date 1963-09-01 (Crossref). Brauer-Fowler, Feit-Thompson (255 pp., whole issue), Gonthier 2012 and J1 checked."}
---

# The classification of finite simple groups hangs on elements of order two

In 1955 Richard Brauer and Kenneth Fowler proved something that turned into a strategy. Pick a finite simple group and an element of order two in it, and look at everything that commutes with that element. Knowing that centraliser pins the group down to finitely many possibilities.

The catch: the strategy needs an element of order two, which means even order. William Burnside had conjectured in 1911 that every non-abelian finite simple group has one. Walter Feit and John Thompson proved it in 1963, in 255 pages that filled an entire issue of the *Pacific Journal of Mathematics*. In 2012 a team led by Georges Gonthier checked every step by computer.

Much of the classification then ran on that plan.

## Rigor

The plan, in symbols. An **involution** is an element $t$ with $t^2=e\ne t$; its centraliser is $C_G(t)=\{g\in G:gt=tg\}$.

**Brauer–Fowler (1955).** If $G$ is a finite group of even order $g>2$, then $G$ has a proper subgroup of order greater than $g^{1/3}$. Consequence: for a given finite group $H$, only finitely many finite simple groups, up to isomorphism, contain an involution whose centraliser is isomorphic to $H$.

**Feit–Thompson (1963).** Every finite group of odd order is solvable. Equivalently, every non-abelian finite simple group has even order, and so, by Cauchy's theorem, contains an involution.

**The strategy.** Together these reduce the classification to two questions: which centralisers of involutions can occur in a simple group, and which simple groups realise each one. Several sporadic groups were first found as answers to the second question. Zvonimir Janko's group $J_1$ is the classic case: he studied simple groups with an involution whose centraliser is $\mathbb{Z}/2\times A_5$, and found that the conditions forced a new group of order $175{,}560$.

## Recall
type: mcq
Q: Why did Brauer's involution strategy depend on the Feit–Thompson theorem?
- [x] The strategy studies centralisers of elements of order 2, and Feit–Thompson guarantees every non-abelian simple group has one — its order must be even.
- [ ] Feit–Thompson lists the sporadic groups — it lists nothing; it says groups of odd order are solvable.
- [ ] Odd-order simple groups were the hardest case left — apart from cyclic groups of prime order there are none, and that is the theorem.
