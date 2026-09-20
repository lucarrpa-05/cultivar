---
id: math.algebra.sylow.only-one-group-of-order-fifteen
topic: math.algebra.sylow
format: challenge
difficulty: 4
language: en
weight: light
angles: [tool, paradox]
tags: [sylow-theorems, order-15, cyclic-groups, classification, direct-product]
hook: "Order 8 gives you five different groups. Order 15 gives exactly one, and no cleverness will produce a second."
sources:
  - {title: "Sylow theorems", type: wiki, url: "https://en.wikipedia.org/wiki/Sylow_theorems"}
  - {title: "List of small groups", type: wiki, url: "https://en.wikipedia.org/wiki/List_of_small_groups"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# There is only one group of order 15. Prove it in four lines.

Order 4 gives you two groups. Order 6 gives two. Order 8 gives five, including the quaternions. Order 15 gives exactly one — the cyclic one — and no amount of ingenuity will produce a second.

Take any group $G$ with $|G|=15$ and use only Sylow's counting rules. The number of subgroups of order 5 is congruent to 1 modulo 5 and divides 3. The number of subgroups of order 3 is congruent to 1 modulo 3 and divides 5.

Work out what those two numbers have to be. Then finish: why does that pin $G$ down completely?

Bonus, once you have it: the same argument shows every group of order $pq$ with primes $p<q$ is cyclic whenever $p$ does not divide $q-1$. Fifteen is the smallest such order, because $3$ does not divide $4$.

## Recall
type: reveal
Q: Why is every group of order 15 cyclic?
A: The divisor-and-congruence conditions force $n_5 = 1$ and $n_3 = 1$, so both Sylow subgroups are unique, hence normal. They intersect trivially (coprime orders) and their product has 15 elements, so $G \cong \mathbb{Z}/5 \times \mathbb{Z}/3 \cong \mathbb{Z}/15$.
