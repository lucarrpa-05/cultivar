---
id: math.topology.connectedness.what-survives-the-deleting
topic: math.topology.connectedness
topics: [math.topology.compactness]
format: idea
difficulty: 4
language: en
weight: medium
angles: [weird, beautiful]
tags: [cantor-set, totally-disconnected, perfect-set, cantor-space]
hook: "Delete middle thirds forever and you remove the whole length of the interval. What is left has as many points as you started with."
sources:
  - {title: "Cantor set", type: wiki, url: "https://en.wikipedia.org/wiki/Cantor_set"}
  - {title: "Topology, 2nd ed., §27", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Added the nonempty clause to Brouwer characterisation of the Cantor set."}
---

# What survives when you delete the middle forever

Take $[0,1]$, throw away the open middle third, then the middle third of each surviving piece, and keep going. The lengths you removed add to $\tfrac13+\tfrac29+\tfrac4{27}+\cdots=1$. You have deleted the entire interval, measured with a ruler.

What remains is not empty. It is not even small. It has exactly as many points as the interval you started with, it is compact, and it contains no interval whatsoever — between any two of its points sits a gap. Every point of it is a limit of other points, so nothing in it is isolated, and yet no two points are connected to each other. Dust that is all boundary.

The clean way to see it is to stop drawing and start writing numbers in base 3. Then the Cantor set turns out to be something you already know: the set of all infinite coin-flip sequences.

## Rigor

Write $x \in [0,1]$ in base 3. The first deletion removes the numbers whose first digit must be $1$; the $n$th deletion removes those whose $n$th digit must be $1$. So
$$C=\Big\{\textstyle\sum_{n\ge1} a_n 3^{-n} : a_n \in \{0,2\}\Big\},$$
and $(a_n) \mapsto x$ is a bijection from $\{0,2\}^{\mathbb{N}}$ onto $C$. Hence $|C| = \mathfrak{c}$, while the Lebesgue measure of $C$ is $1-\sum_n 2^{n-1}3^{-n}=0$.

That bijection is a homeomorphism onto the product space $\{0,1\}^{\mathbb{N}}$ with the product topology: matching the first $n$ digits is exactly landing in the same level-$n$ interval, of length $3^{-n}$. So $C$ is a countable product of two-point spaces, compact by Tychonoff — or directly, because it is closed and bounded in $\mathbb{R}$.

$C$ is **totally disconnected** (any two points differ in some digit, which splits $C$ into two clopen halves) and **perfect** (change the tail of a sequence to get nearby points). Brouwer proved that those four properties — compact, metrizable, perfect, totally disconnected — pin the Cantor set down up to homeomorphism: any nonempty space with all four is a copy of it.

## Recall
type: mcq
Q: The Cantor set has measure zero. How many points does it have?
- [x] As many as $\mathbb{R}$ — its points are exactly the base-3 expansions using only 0 and 2, a copy of $\{0,2\}^{\mathbb{N}}$.
- [ ] Countably many, the endpoints of the deleted intervals — those are only countably many of its points; the rest, like $0.020202\ldots_3$, are never endpoints.
- [ ] None, since the removed lengths sum to 1 — measure zero and empty are different; the construction is an intersection of nonempty nested compact sets.
