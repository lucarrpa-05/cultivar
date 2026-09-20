---
id: math.probability.markov-chains.consensus-is-an-absorbing-state
topic: math.probability.markov-chains
topics: [css.opinion-dynamics.voter-model]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, paradox, beautiful]
tags: [voter-model, absorbing-state, martingale, coalescing-random-walks, consensus]
hook: "Nobody in the voter model persuades anybody. Everyone copies at random, and the population still reaches unanimity."
callback: {from: math.probability.markov-chains, to: css.opinion-dynamics.voter-model}
sources:
  - {title: "Voter model", type: wiki, url: "https://en.wikipedia.org/wiki/Voter_model"}
  - {title: "A Model for Spatial Conflict", author: "Peter Clifford and Aidan Sudbury", year: 1973, type: paper, url: "https://doi.org/10.1093/biomet/60.3.581"}
  - {title: "Interacting particle system", type: wiki, url: "https://en.wikipedia.org/wiki/Interacting_particle_system"}
dates: {written: 2026-09-19, event: 1973-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember absorbing states? Consensus is one

A Markov chain forgets where it started — unless it can get somewhere it cannot leave. The voter model is the cleanest social example of that exception.

The rules are almost insultingly simple. Everyone sits on a node of a graph holding one of two opinions. At random times, a person is picked, looks at a random neighbour, and copies them. No persuasion, no stubbornness, no argument quality, nobody weighing evidence. Pure imitation.

The state of the whole population is a Markov chain on configurations, and it has exactly two absorbing states: everyone 0, or everyone 1. Once unanimity is reached there is nothing left to copy, so the chain stops. On any finite connected graph, it gets there with probability 1.

So a society of people who never reason at all still converges on a single opinion. And the chance it lands on yours is something you can write down before any of it happens.

## Rigor

Let $x_i(t)\in\{0,1\}$ on a connected graph, and at rate 1 let node $i$ copy a uniformly chosen neighbour.

**The martingale.** Weight each node by its degree and set
$$M_t=\frac{\sum_i d_i\,x_i(t)}{\sum_i d_i}.$$
The expected drift at each node cancels — a copy is as likely to flip you toward 1 as toward 0, in proportion to your neighbours — so $M_t$ is a bounded martingale. On a regular graph this is just the unweighted fraction.

**The consequence.** By the optional stopping theorem, $\mathbb{E}[M_\infty]=M_0$. Since $M_\infty\in\{0,1\}$,
$$P(\text{consensus on }1)=\frac{\sum_i d_i\,x_i(0)}{\sum_i d_i}.$$
The outcome is decided, in expectation, by the initial degree-weighted share. Well-connected people count more, not because they argue better, but because they are copied more often.

**Duality.** Trace the copying backwards in time and the opinions become coalescing random walks: two sites agree at time $t$ exactly when their backward walks have already met. So consensus times reduce to meeting times of random walks — which is why the infinite lattice splits by dimension: in $d\le2$ walks are recurrent and the system clusters toward consensus, while in $d\ge3$ they may never meet and both opinions survive forever.

## Recall
type: mcq
Q: In the voter model on a finite connected graph, what fixes the probability of ending up all-1?
- [x] The degree-weighted initial fraction of 1s — that quantity is a martingale, and optional stopping equates its start with its absorbed value.
- [ ] The plain initial fraction of 1s — true only on a regular graph; otherwise high-degree nodes are over-represented.
- [ ] Whichever opinion the highest-degree node holds — degree tilts the odds, it does not decide the outcome.
- [ ] Nothing, since the process is symmetric — symmetry makes it a fair game, and a fair game still has computable stopping odds.
