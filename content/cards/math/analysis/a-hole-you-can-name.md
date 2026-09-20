---
id: math.analysis.sequences-limits.a-hole-you-can-name
topic: math.analysis.sequences-limits
format: idea
difficulty: 2
language: en
weight: medium
angles: [beautiful, origin]
tags: [supremum, completeness, least-upper-bound, rationals, real-numbers]
hook: "The rationals have a hole you can point at without ever seeing it. Patching it is the whole content of the real numbers."
sources:
  - {title: "Least-upper-bound property", type: wiki, url: "https://en.wikipedia.org/wiki/Least-upper-bound_property"}
  - {title: "Principles of Mathematical Analysis, 3rd ed., ch. 1", author: "Walter Rudin", year: 1976, type: book, url: "https://en.wikipedia.org/wiki/Principles_of_Mathematical_Analysis"}
  - {title: "Construction of the real numbers", type: wiki, url: "https://en.wikipedia.org/wiki/Construction_of_the_real_numbers"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The rationals have a hole you can point at

Take every rational whose square is less than 2. The set is bounded above — 1.5 works, 2 works. Now ask for its *least* upper bound. Inside the rationals there isn't one: name any rational upper bound and there is a smaller rational that still works, forever, with no bottom to the descent.

That one failure is the entire difference between the rationals and the reals. ℝ is not "ℚ plus a few famous irrationals". ℝ is ℚ repaired so that every bounded set gets the supremum it is owed. Everything downstream falls out of that single repair: monotone bounded sequences converge, Cauchy sequences converge, the intermediate value theorem holds, closed bounded intervals are compact. Those are not four facts. They are one axiom wearing four hats.

The picture: ℚ is a ruler with invisible gaps. Measurements land in the gaps and the ruler stays silent. The analogy breaks in the honest place — you cannot see the gaps, because between any two rationals sit infinitely many more.

Here is the axiom, and one of the hats.

## Rigor

**Least upper bound property.** Every nonempty $S\subseteq\mathbb{R}$ that is bounded above has a supremum in $\mathbb{R}$.

**ℚ fails it.** Let $S=\{q\in\mathbb{Q}:q>0,\;q^2<2\}$. Given a rational $p>0$ with $p^2>2$, Rudin's trick produces a smaller one: set

$$q=p-\frac{p^2-2}{p+2}=\frac{2p+2}{p+2},\qquad q^2-2=\frac{2(p^2-2)}{(p+2)^2}>0 .$$

So $q<p$, $q$ is still an upper bound, and no rational upper bound is least.

**One hat: monotone convergence.** Let $(a_n)$ increase with $a_n\le M$. Put $L=\sup_n a_n$, which exists by the axiom. Given $\varepsilon>0$, $L-\varepsilon$ is not an upper bound, so $a_N>L-\varepsilon$ for some $N$; monotonicity gives $L-\varepsilon<a_n\le L$ for every $n\ge N$. Hence $a_n\to L$.

The "gap in the ruler" is precisely the supremum the axiom hands you and ℚ withholds.

## Recall
type: reveal
Q: In one sentence, what does ℝ have that ℚ does not?
A: The least upper bound property — every nonempty set bounded above has a supremum. Not "more numbers": one axiom, from which monotone convergence, Cauchy completeness and the intermediate value theorem all follow.
