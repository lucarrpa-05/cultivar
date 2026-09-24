---
id: ai.theory.information-bottleneck.a-thousand-flips-in-ten-bits
topic: ai.theory.information-bottleneck
format: fact
difficulty: 2
language: en
weight: light
angles: [numbers, connection]
tags: [sufficient-statistic, coin-flips, mutual-information, minimal-sufficiency, compression]
prerequisites: [math.probability.information-entropy]
hook: "A thousand coin flips take a thousand bits to write down. What they tell you about the coin fits in fewer than ten."
related: [ai.theory.information-bottleneck.shannon-banned-meaning]
sources:
  - {title: "Sufficient statistic", type: wiki, url: "https://en.wikipedia.org/wiki/Sufficient_statistic"}
  - {title: "Information bottleneck method", type: wiki, url: "https://en.wikipedia.org/wiki/Information_bottleneck_method"}
  - {title: "The information bottleneck method", author: "Naftali Tishby, Fernando C. Pereira & William Bialek", year: 1999, type: paper, url: "https://arxiv.org/abs/physics/0004057"}
dates: {written: 2026-09-23}
author: author-ai-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved}
---

# Everything 1,000 coin flips say about the coin fits in 10 bits

Flip a coin 1,000 times and write down the sequence: up to 1,000 bits. Now keep only what the sequence tells you about the coin's bias. The order is irrelevant; only the number of heads matters. The count takes one of 1,001 values, so it fits in under 10 bits, and nothing about the bias is lost.

That is the information bottleneck's ideal case: squeeze the data as hard as possible while keeping everything about the thing you care about. Statisticians had long called it a minimal sufficient statistic.

## Rigor

"Nothing is lost" is an equality between two mutual informations. Let $\theta$ be the bias (with any prior), $X=(X_1,\dots,X_n)$ the flips and $T=\sum_i X_i$ the count. Given $T=k$, each of the $\binom nk$ orders has probability $1/\binom nk$ whatever $\theta$ is, so once you know $T$ the sequence says nothing more about $\theta$:

$$I(\theta;X)=I(\theta;T)\le H(T)\le\log_2(n+1),$$

under 10 bits for $n=1000$. The equality $I(\theta;T)=I(\theta;X)$ for every prior is precisely what "sufficient" means.

The information bottleneck, $\min_{p(t\mid x)} I(X;T)-\beta\,I(T;\theta)$, turns this into a dial. As $\beta\to\infty$ the relevance term dominates: $T$ must keep all of $I(X;\theta)$, i.e. be sufficient, and among sufficient statistics it should minimise $I(X;T)$. The minimal sufficient statistic wins, because it is a function of every other sufficient $T$, and data processing gives $I(X;f(T))\le I(X;T)$. For finite $\beta$ you give up some information about $\theta$ for a smaller $T$. That lossy version is the one that matters in practice: outside exponential families, the Pitman–Koopman–Darmois theorem says (under regularity conditions) that sufficient statistics of fixed size do not exist.

## Recall
type: mcq
Q: 1,000 flips of a coin with unknown bias. Which summary is small and loses nothing about the bias?
- [x] The number of heads — given the count, every order is equally likely whatever the bias, so the order carries nothing more.
- [ ] The full sequence — it loses nothing, but it is not small: about 1,000 bits where 10 suffice.
- [ ] The first ten flips — small, but it throws away almost everything the other 990 flips say about the bias.
