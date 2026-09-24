---
id: math.probability.markov-chains.seven-riffles
topic: math.probability.markov-chains
topics: [math.algebra.permutations]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, numbers, human]
tags: [card-shuffling, mixing-time, cutoff, total-variation, random-walk-on-a-group]
hook: "The prisoners' 31% assumed a random shuffle. For a deck of cards, random takes about seven riffles, and then it arrives all at once."
callback: {from: niche.games.puzzles, to: math.probability.markov-chains}
related: [niche.games.puzzles.prisoners-follow-the-numbers, math.probability.markov-chains.where-a-chain-forgets-where-it-started]
diagram: {file: math/riffle-cutoff.svg, caption: "For four riffles the deck is essentially as far from random as it can be; then the distance collapses, to 0.334 at seven.", alt: "A line chart of distance from random against number of riffle shuffles, flat at 1 for shuffles one to four, then dropping steeply through 0.924, 0.614, 0.334 and on towards zero by ten."}
sources:
  - {title: "Trailing the Dovetail Shuffle to its Lair", author: "Dave Bayer and Persi Diaconis", year: 1992, type: paper, url: "https://doi.org/10.1214/aoap/1177005705"}
  - {title: "Gilbert–Shannon–Reeds model", type: wiki, url: "https://en.wikipedia.org/wiki/Gilbert%E2%80%93Shannon%E2%80%93Reeds_model"}
  - {title: "Persi Diaconis", type: wiki, url: "https://en.wikipedia.org/wiki/Persi_Diaconis"}
dates: {written: 2026-09-23, event: 1992-05-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "the relative clause made both Bayer and Diaconis leave home at 14 (only Diaconis did); split it. Caption says 'essentially' as far from random (TV is 1.000 only to three decimals). Table, GSR model, rising-sequence formula and the 3/2 log2 n cutoff checked; diagram points match the table."}
---

# Remember the hundred prisoners? "Shuffled at random" takes seven riffles

Remember the hundred prisoners following the chain of numbers from box to box? Their 31% rested on three words: shuffled at random, all $100!$ arrangements equally likely. Nobody asked how.

A shuffle is one step of a Markov chain whose states are orderings of the deck, and "random" means the chain has reached its stationary distribution. So the real question is a mixing time.

For riffles of 52 cards, Dave Bayer and Persi Diaconis answered it in 1992; Diaconis had left home at 14 to tour with a magician. After five riffles the deck is still nearly as far from random as it can be. Then it collapses: by seven the distance is a third, and each riffle halves it.

## Rigor

Model a riffle by Gilbert–Shannon–Reeds: cut the deck binomially, then drop cards from the two packets with probability proportional to packet size. Each riffle applies a random permutation drawn from a fixed distribution $Q$ on $S_n$, so $k$ riffles have distribution $Q^{*k}$, the $k$-fold convolution: a random walk on the group.

**Why uniform is stationary.** The transition matrix $P(\sigma,\tau)=Q(\tau\sigma^{-1})$ has every column summing to 1, as well as every row. So $\pi=\tfrac1{n!}\mathbf 1$ satisfies $\pi P=\pi$.

**The distance.** $\|Q^{*k}-U\|_{TV}=\max_A|Q^{*k}(A)-U(A)|$. Bayer and Diaconis computed it exactly: after $k$ riffles, a permutation with $r$ rising sequences has probability $\binom{2^k+n-r}{n}/2^{kn}$. For $n=52$:

| riffles | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|
| distance | 0.924 | 0.614 | 0.334 | 0.167 | 0.085 | 0.043 |

**Cutoff.** For a deck of $n$ cards the distance stays near 1 until about $\tfrac32\log_2 n$ riffles and then falls to near 0 within a window of constant width. For $n=52$ that is about 8.6; seven is where the distance first drops below one half. The prisoners' 31% assumes the cliff has already been passed.

## Recall
type: mcq
Q: Why is the uniform distribution stationary for any shuffling method that applies the same random permutation rule each time?
- [x] The transition matrix is doubly stochastic — columns sum to 1 as well as rows — so the uniform vector is left unchanged.
- [ ] Because shuffles are reversible — many shuffles, the riffle included, are not, and uniform is still stationary.
- [ ] Because after seven steps every chain is uniform — seven is a fact about riffles of 52 cards, not about Markov chains.
