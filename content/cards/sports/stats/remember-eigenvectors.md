---
id: sports.stats.rankings.remember-eigenvectors
topic: sports.stats.rankings
format: callback
difficulty: 2
language: en
weight: heavy
angles: [connection, beautiful]
tags: [eigenvector, perron-frobenius, ranking, keener, strength-of-schedule]
hook: "Beating a great team should count more than beating a bad one. Say that carefully and you have written down an eigenvalue problem."
callback: {from: math.linear-algebra.eigen, to: sports.stats.rankings}
prerequisites: [math.linear-algebra.eigen]
sources:
  - {title: "The Perron-Frobenius Theorem and the Ranking of Football Teams", author: "James P. Keener", year: 1993, type: paper, url: "https://doi.org/10.1137/1035004"}
  - {title: "Perron–Frobenius theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem"}
  - {title: "Random Walker Ranking for NCAA Division I-A Football", author: "Callaghan, Mucha and Porter", year: 2007, type: paper, url: "https://arxiv.org/abs/physics/0310148"}
dates: {written: 2026-09-19}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Keener 1993 confirmed via Crossref (SIAM Review 35(1):80-93). Removed the unsupported claim that his method ran inside the BCS formula."}
---

# Remember eigenvectors? Sports tables are full of them.

An eigenvector is the direction a matrix leaves alone, up to scale. Here is where that turns into a league table.

Counting wins is a terrible ranking, and everyone knows why: it treats beating the champion and beating the bottom club as the same event. So try the obvious fix. *A team's rating should be proportional to the total rating of the teams it has beaten.* Say it out loud and notice what you have done — you have defined the rating vector in terms of itself.

Write $A$ for the matrix of results and $r$ for the vector of ratings. The sentence above says $Ar = \lambda r$. The ranking you wanted is an eigenvector, and the only sensible one is the dominant one.

James Keener wrote this up for *SIAM Review* in 1993, while American college football argued about whose computer ranking to trust. Callaghan, Mucha and Porter's random walker (2007) is the same fixed point in Markov disguise; so, on a matrix of links instead of results, is PageRank. Strength of schedule is not a bolt-on adjustment; it is what the eigenvector is *for*.

Existence and uniqueness are not free, though.

## Rigor

Let $a_{ij}\ge 0$ score team $i$'s results against $j$ (Keener uses a smooth, bounded function of the score line rather than raw margin, so a 50-point win cannot be farmed). Define ratings by

$$r_i=\frac{1}{\lambda}\sum_j a_{ij}r_j,\qquad\text{i.e.}\qquad Ar=\lambda r .$$

**Perron–Frobenius.** If $A\ge 0$ is irreducible, it has a positive eigenvalue $\lambda_{\max}$ equal to its spectral radius, with a one-dimensional eigenspace spanned by a strictly positive vector, and no other eigenvector is nonnegative.

Unpack the hypotheses, because they are the sport. *Nonnegative* is free. *Irreducible* means the directed graph "i has a result against j" is strongly connected — every team reachable from every other through chains of fixtures. A league schedule gives you that; two conferences that never meet do not, and then the ranking between them is genuinely undefined, no matter what number a computer prints.

Positivity of the eigenvector is what makes the output a *ranking*: all ratings share a sign, so ratios are meaningful. And the power method converges to it, which is why these tables were computable in 1993 on the hardware of 1993.

## Recall
type: mcq
Q: Two college conferences play a full schedule internally but never play each other. What breaks in the eigenvector ranking?
- [ ] Nothing — the matrix is still nonnegative, and nonnegativity alone is enough for Perron–Frobenius.
- [x] Irreducibility fails, so the dominant eigenvector is no longer unique and the cross-conference comparison is arbitrary — the graph of results is not strongly connected.
- [ ] The eigenvalues become complex — a nonnegative matrix always has a real spectral radius; the problem is uniqueness, not realness.
- [ ] The power method diverges — it still converges within each block; the blocks just cannot be compared.
