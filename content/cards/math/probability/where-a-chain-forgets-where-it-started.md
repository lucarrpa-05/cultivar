---
id: math.probability.markov-chains.where-a-chain-forgets-where-it-started
topic: math.probability.markov-chains
topics: [math.linear-algebra.eigen]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, tool, beautiful]
tags: [stationary-distribution, ergodic-theorem, perron-frobenius, mixing, irreducible]
hook: "Run a Markov chain long enough and it forgets where it began. What it remembers is an eigenvector."
diagram: {file: math/markov-stationary.svg, caption: "Three states, six transitions, one long-run answer — the same one from every starting point.", alt: "Three labelled circles joined by arrows carrying transition probabilities, with the long-run share of time in each state listed beside them"}
sources:
  - {title: "Markov chain", type: wiki, url: "https://en.wikipedia.org/wiki/Markov_chain"}
  - {title: "Perron–Frobenius theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem"}
  - {title: "Markov chain mixing time", type: wiki, url: "https://en.wikipedia.org/wiki/Markov_chain_mixing_time"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The convergence theorem was stated without finiteness, where it needs it (or positive recurrence)."}
---

# Where a chain forgets where it started

A Markov chain has the shortest possible memory: to know what happens next, the present state is enough, and the whole history before it is irrelevant. Today's weather predicts tomorrow's; last Tuesday adds nothing.

Now run one for a long time and ask where it is. Something surprising happens: the answer stops depending on where you started. Begin in sunny or begin in rain, wait long enough, and the probability of finding the chain in each state converges to the *same* list of numbers.

That list is the stationary distribution, and it is the object almost every application actually wants. What fraction of days does this machine spend broken? What share of web traffic lands on that page? Where does a random walker end up? The question "where does it settle?" has a single answer, and finding it is not simulation — it is an eigenvector calculation you can do on paper.

Two things can break the forgetting, and both are worth naming.

## Rigor

Let $P$ be the transition matrix, $P_{ij}=P(X_{t+1}=j\mid X_t=i)$, with rows summing to 1. A distribution $\pi$ is **stationary** if $\pi P=\pi$ — a left eigenvector with eigenvalue 1, normalised to sum to 1. Eigenvalue 1 always exists, because $P$ has the all-ones vector as a right eigenvector.

**Convergence theorem.** If a finite chain is *irreducible* (every state reaches every other) and *aperiodic* (the return times to a state have gcd 1), then $\pi$ is unique and
$$P^{k}\longrightarrow \mathbf{1}\pi \quad\text{as } k\to\infty,$$
every row converging to $\pi$. That is the forgetting, in matrix form: the limit has identical rows, so the starting row stops mattering.

**Why, and how fast.** Perron–Frobenius: for an irreducible aperiodic stochastic matrix, $\lambda_1=1$ is simple and every other eigenvalue satisfies $|\lambda_i|<1$. The error after $k$ steps decays like $|\lambda_2|^{k}$, so the **spectral gap** $1-|\lambda_2|$ is the mixing rate.

**The two failures.** Reducible: two isolated clusters give two stationary distributions and permanent memory of which one you began in. Periodic: the chain $A\to B\to A$ has $\pi=(\tfrac12,\tfrac12)$ stationary, yet $P^{k}$ oscillates forever and never converges — time averages still work, but the distribution at step $k$ does not settle.

## Recall
type: mcq
Q: A chain is irreducible but strictly periodic with period 2. What can you still say?
- [x] A unique stationary $\pi$ exists and long-run *time averages* converge to it — but the distribution at step $k$ keeps oscillating.
- [ ] Nothing converges, since $|\lambda_2|=1$ — the eigenvalue $-1$ blocks convergence of $P^k$, not of time averages.
- [ ] The chain has two stationary distributions — periodicity does not break uniqueness; reducibility does.
- [ ] $P^k$ converges, just slowly — it never converges; it cycles between two limits.
