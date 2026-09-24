---
id: math.category.monads.probability-is-a-monad
topic: math.category.monads
topics: [math.probability.markov-chains, math.probability.conditional-bayes]
format: idea
difficulty: 4
language: en
weight: medium
angles: [connection, beautiful]
tags: [distribution-monad, giry-monad, kleisli-category, markov-kernel, total-probability]
hook: "The law of total probability is a monad law. The programs of that monad are Markov chains, and composing them is multiplying matrices."
related: [math.category.monads.haskell-prints-with-a-monad, math.probability.markov-chains.where-a-chain-forgets-where-it-started]
sources:
  - {title: "Giry monad", type: wiki, url: "https://en.wikipedia.org/wiki/Giry_monad"}
  - {title: "A categorical approach to probability theory", author: "Michèle Giry", year: 1982, type: paper, url: "https://doi.org/10.1007/BFb0092872"}
  - {title: "Monad (category theory): the distribution monad", type: wiki, url: "https://en.wikipedia.org/wiki/Monad_(category_theory)"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved}
---

# Averaging an average is a monad law, and Markov chains are its programs

You already use this monad. Send a set $X$ to the set of probability distributions on $X$. A certain outcome counts as a distribution, with all the weight on one point. And a random choice of a distribution, like flipping a coin to decide which die to roll, collapses into a single distribution. That collapse is the law of total probability.

Those two moves are the unit and the multiplication of a monad, and the monad laws are facts you know: averaging in stages gives the same answer as averaging at once.

The payoff is the arrows. A program in this monad, from states to distributions on states, is a Markov transition. Composing two programs is multiplying transition matrices.

## Rigor

For a finite set $X$ let $DX=\{p:X\to[0,1]:\sum_xp(x)=1\}$, and for $f:X\to Y$ let $Df$ push distributions forward: $(Df\,p)(y)=\sum_{f(x)=y}p(x)$.

**Unit and multiplication.** $\eta_X(x)=\delta_x$, and for $P\in DDX$, a distribution over distributions (finitely supported),
$$\mu_X(P)(x)=\sum_{q}P(q)\,q(x),$$
the law of total probability. The measure-theoretic version is the **Giry monad** (1982).

**The laws.** $\mu\circ D\eta=\mu\circ\eta D=1$: mixing with certainty changes nothing. $\mu\circ D\mu=\mu\circ\mu D$: for a three-level mixture, flattening the inner two levels first or the outer two first gives the same distribution, by exchanging finite sums.

**Kleisli arrows are Markov kernels.** An arrow $k:X\to DY$ is a stochastic matrix $K_{xy}=k(x)(y)$. The Kleisli composite of $k:X\to DY$ and $l:Y\to DZ$ is $\mu\circ Dl\circ k$, and
$$(l\circ_Dk)(x)(z)=\sum_yK_{xy}L_{yz}=(KL)_{xz}:$$
matrix multiplication, the Chapman–Kolmogorov equation. The $n$-step transition of a chain is the $n$-fold Kleisli power of one step, and a stationary distribution is an arrow $\pi$ from the one-point set that the chain leaves fixed: $k\circ_D\pi=\pi$.

## Recall
type: mcq
Q: In the probability monad, what does composing two Kleisli arrows $X\to DY$ and $Y\to DZ$ amount to?
- [x] Multiplying the two transition matrices — the Chapman–Kolmogorov equation.
- [ ] Forming the product distribution on $Y\times Z$ — that is independence, a different construction.
- [ ] Averaging the two kernels — mixing is $\mu$ applied at one level, not composition.
