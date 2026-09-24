---
id: math.algebra.classification-finite-simple.a-happy-family-and-six-pariahs
topic: math.algebra.classification-finite-simple
format: fact
difficulty: 2
language: en
weight: medium
angles: [weird, numbers, origin]
tags: [sporadic-groups, monster-group, happy-family, pariahs, griess, subquotient]
hook: "Twenty of the 26 sporadic groups live inside the Monster. The other six are called the pariahs."
related: [math.algebra.classification-finite-simple.one-more-than-the-monster, math.algebra.classification-finite-simple.it-all-hangs-on-order-two]
sources:
  - {title: "Sporadic group", type: wiki, url: "https://en.wikipedia.org/wiki/Sporadic_group"}
  - {title: "Monster group", type: wiki, url: "https://en.wikipedia.org/wiki/Monster_group"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "weight light to medium (it has a rigor section). Generations, pariah list, Monster order and the 37 argument checked."}
---

# Twenty sporadic groups live inside the Monster. Six refuse.

The 26 sporadic simple groups belong to no infinite family. Yet 20 of them turn out to live inside a single group, the Monster, with about $8\times10^{53}$ elements: each is a quotient of one of its subgroups. Robert Griess called those twenty the happy family. The other six appear nowhere in the Monster, three of them among Zvonimir Janko's four groups. Griess called them the pariahs. "Inside" has a precise meaning, and a single prime number is enough to shut two of the six out.

## Rigor

A group $H$ is a **subquotient** of $G$ if $H\cong K/N$ for some subgroups $N\trianglelefteq K\le G$. The Monster has order
$$|\mathbb{M}|=2^{46}\cdot3^{20}\cdot5^{9}\cdot7^{6}\cdot11^{2}\cdot13^{3}\cdot17\cdot19\cdot23\cdot29\cdot31\cdot41\cdot47\cdot59\cdot71\approx8.08\times10^{53}.$$

**The happy family (20).** The five Mathieu groups; seven groups tied to the Leech lattice, among them Conway's three groups and Janko's $J_2$; and eight more tied to the Monster itself, among them the Fischer groups, the Baby Monster and $\mathbb{M}$. Griess arranged them in these three generations.

**The pariahs (6).** $J_1$, $J_3$, $J_4$, $O'N$, $Ru$, $Ly$.

**The cheapest proof of exclusion is Lagrange.** $|K/N|$ divides $|K|$, which divides $|\mathbb M|$. The orders of $J_4$ and $Ly$ are divisible by $37$, a prime that does not divide $|\mathbb{M}|$, so neither can be a subquotient. The other four pariahs pass this test, and excluding them takes a closer look at the Monster's subgroups.
