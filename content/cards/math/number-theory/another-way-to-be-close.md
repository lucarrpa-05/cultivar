---
id: math.number-theory.p-adics.another-way-to-be-close
topic: math.number-theory.p-adics
topics: [math.analysis.metric-spaces]
format: idea
difficulty: 4
language: en
weight: medium
angles: [weird, beautiful, connection]
tags: [p-adic, ultrametric, ostrowski, absolute-value, hensel]
hook: "In the 2-adic world 1024 is tiny, 1/3 is an ordinary size, and every triangle is isosceles."
diagram: {file: math/p-adic-tree.svg, caption: "Base-3 digits as a tree: two numbers are close when their paths stay together longer.", alt: "A three-level branching tree labelled by trailing base-3 digits, with notes that distances take only the values one, a third, a ninth and so on"}
sources:
  - {title: "p-adic number", type: wiki, url: "https://en.wikipedia.org/wiki/P-adic_number"}
  - {title: "Ostrowski's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Ostrowski%27s_theorem"}
  - {title: "Ultrametric space", type: wiki, url: "https://en.wikipedia.org/wiki/Ultrametric_space"}
dates: {written: 2026-09-19, event: 1916-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Another way for two numbers to be close

"Close" usually means the difference is small on a ruler. Try a different rule: two integers are close when their difference is divisible by a high power of 2. So $0$ and $1024$ are very close, because $2^{10}$ divides the gap, while $0$ and $3$ are far apart.

This is not a game. It satisfies every axiom a distance must satisfy, and one extra: $|x+y|\le\max(|x|,|y|)$, stronger than the triangle inequality. Geometry gets strange. Every triangle is isosceles. Every point inside a ball is its centre. Two balls are nested or disjoint, never overlapping at the edge.

And the sequence $9, 99, 999, 9999, \dots$ converges — 10-adically — to $-1$, since $\underbrace{9\cdots9}_{k}+1 = 10^{k}$ is highly divisible by 10.

The shock is that these are not one exotic option among many. Up to equivalence, they are the *only* other option.

## Rigor

**The $p$-adic absolute value.** For a prime $p$ write a nonzero rational as $x=p^{n}\frac{a}{b}$ with $p\nmid ab$, and set $|x|_p=p^{-n}$, with $|0|_p=0$. Then $|xy|_p=|x|_p|y|_p$ and
$$|x+y|_p\le\max(|x|_p,|y|_p),$$
the ultrametric inequality. It forces the isosceles fact: if $|x|_p\neq|y|_p$ then $|x+y|_p=\max(|x|_p,|y|_p)$ exactly.

**Ostrowski's theorem (1916).** Every non-trivial absolute value on $\mathbb{Q}$ is equivalent either to the usual $|\cdot|_\infty$ or to $|\cdot|_p$ for exactly one prime $p$. There is nothing else. Completing $\mathbb{Q}$ with respect to $|\cdot|_\infty$ gives $\mathbb{R}$; completing with respect to $|\cdot|_p$ gives $\mathbb{Q}_p$, whose elements are the formal series $\sum_{n\ge -m} a_n p^{n}$ — decimals running to the *left*.

**Why anyone bothers.** Convergence is easy there: $\sum a_n$ converges in $\mathbb{Q}_p$ as soon as $a_n\to0$. Hensel's lemma lifts a solution mod $p$ to a solution in $\mathbb{Q}_p$ by a $p$-adic Newton iteration. And the Hasse–Minkowski theorem says a quadratic form has a rational zero precisely when it has one in $\mathbb{R}$ and in every $\mathbb{Q}_p$: a global question answered by checking all the local ones. The tree in the picture is the geometry that makes those local questions easy.

## Recall
type: mcq
Q: In the 5-adic absolute value, which number is smallest?
- [x] 125 — it is $5^3$, so $|125|_5=5^{-3}=1/125$, the smallest of these.
- [ ] 1/5 — $|1/5|_5 = 5$, which is *large*: dividing by $p$ makes things big.
- [ ] 6 — $6$ is coprime to 5, so $|6|_5=1$, the same size as 1, 2, 3 and 4.
- [ ] 0.001 — as the rational $1/1000=1/(8\cdot125)$ it has $|x|_5=125$; decimal smallness is the wrong ruler here.
