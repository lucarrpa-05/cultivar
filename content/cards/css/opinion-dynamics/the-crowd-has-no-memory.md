---
id: css.opinion-dynamics.voter-model.the-crowd-has-no-memory
topic: css.opinion-dynamics.voter-model
topics: [math.probability.markov-chains]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, beautiful, paradox]
tags: [voter-model, martingale, absorbing-states, coalescing-random-walks, consensus]
hook: "Copy a random neighbour, forever. Your side's chance of winning was fixed before anybody moved."
callback: {from: math.probability.markov-chains, to: css.opinion-dynamics.voter-model}
sources:
  - {title: "Voter model", type: wiki, url: "https://en.wikipedia.org/wiki/Voter_model"}
  - {title: "A model for spatial conflict", author: "Peter Clifford and Aidan Sudbury", year: 1973, type: paper, url: "https://doi.org/10.1093/biomet/60.3.581"}
  - {title: "Ergodic Theorems for Weakly Interacting Infinite Systems and the Voter Model", author: "Richard Holley and Thomas Liggett", year: 1975, type: paper, url: "https://doi.org/10.1214/aop/1176996306"}
dates: {written: 2026-09-19, event: 1973-12-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Remember Markov chains? Here is one where the answer is known in advance

A Markov chain is a process with no memory: where you go next depends only on where you are. You learned to ask two questions about one — does it have absorbing states, and what is the probability of hitting each?

The voter model is the simplest opinion dynamics there is, and it is exactly that chain. Everyone holds one of two opinions. At each tick, pick a person at random; they adopt the opinion of a randomly chosen neighbour. Nobody weighs evidence. Nobody is stubborn. There is no notion of being right.

The chain has precisely two absorbing states: everyone A, or everyone B. On a finite connected network it reaches one of them with probability one. Somebody always wins, eventually, and permanently.

And the probability that A wins is fixed at time zero — it is the share of *edge endpoints* that start as A, not the share of people. Fix a few popular nodes and you have moved the answer before a single conversation happens.

## Rigor

Let $x_i(t)\in\{0,1\}$ and define the degree-weighted magnetisation
$$M(t)=\frac{\sum_i k_i\,x_i(t)}{\sum_i k_i}.$$
Pick node $i$ uniformly and copy a uniform neighbour. Then $x_i$ flips to 1 with probability equal to the fraction of $i$'s neighbours holding 1, and to 0 otherwise, so
$$\mathbb{E}[M(t+1)\mid \mathcal{F}_t]=M(t).$$
$M$ is a bounded martingale. It converges, and since the only absorbing configurations are all-0 and all-1, optional stopping gives
$$\mathbb{P}(\text{all-}1)=M(0).$$
On a regular graph that is just the initial fraction; on a heterogeneous one, hubs count in proportion to their degree.

Two more facts worth carrying. The model is **dual to coalescing random walks**: trace opinions backwards and each site's opinion is the one held, at time zero, by the ancestor its backward walk lands on; walks that meet merge. Consensus time is therefore a meeting time for random walks — order $n^2$ on a ring, order $n$ on a complete graph.

And on the infinite lattice $\mathbb{Z}^d$ the dual decides everything: random walks are recurrent for $d\le 2$, so opinions cluster and local consensus spreads forever; for $d\ge 3$ they are transient, and the two opinions coexist indefinitely.

## Recall
type: mcq
Q: In the voter model on a network with hubs, what fixes the probability that opinion A wins?
- [x] The degree-weighted share of A at time zero — it is a martingale, so a hub's opinion counts in proportion to its degree.
- [ ] The plain fraction of people starting with A — that is only right on a regular graph, where every degree is the same.
- [ ] Whichever opinion the highest-degree node holds — degree tilts the odds but does not decide the outcome.
