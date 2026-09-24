---
id: math.probability.markov-chains.a-drunk-bird-may-never-get-home
topic: math.probability.markov-chains
topics: [math.probability.brownian]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [human, paradox, numbers]
tags: [polya, recurrence, transience, random-walk, lattice, dimension]
hook: "Pólya kept bumping into the same couple in the woods. Whether that was suspicious turned out to depend on the number of dimensions."
related: [math.probability.markov-chains.consensus-is-an-absorbing-state]
sources:
  - {title: "Über eine Aufgabe der Wahrscheinlichkeitsrechnung betreffend die Irrfahrt im Straßennetz", author: "George Pólya", year: 1921, type: paper, url: "https://doi.org/10.1007/BF01458701"}
  - {title: "This mathematician proved the random walk theorem to clear his name as a lurker", author: "Jack Murtagh", year: 2026, type: article, url: "https://www.scientificamerican.com/article/this-mathematician-proved-the-random-walk-theorem-to-clear-his-name-as-a/"}
  - {title: "Random walk", type: wiki, url: "https://en.wikipedia.org/wiki/Random_walk"}
dates: {written: 2026-09-23, event: 1921-03-01}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "hook stated 'proved it to clear his name', which is SciAm's joke, as his motive; rephrased. Added the SciAm author and year. 'Bound to meet infinitely often' is false on the lattice when the walkers start an odd distance apart (parity); added the condition. 34%, 1921 and the Kakutani attribution checked."}
---

# A drunk man always finds his way home. A drunk bird might not.

George Pólya, strolling in the woods outside Zürich, kept running into the same student and his fiancée, so often that it looked like snooping. So he asked: do two random walkers on a grid keep meeting?

His 1921 answer depends only on dimension. On a line or a flat grid, a random walker returns to its starting point with probability 1, and does so infinitely often. In three dimensions the chance of ever coming back is only about 34%, and sooner or later the walker leaves for good. The line usually credited to Shizuo Kakutani: a drunk man will find his way home, but a drunk bird may get lost forever.

The difference is one series that converges or doesn't.

## Rigor

For a Markov chain started at $0$, let $f$ be the probability of ever returning and $R$ the number of returns. Each return restarts the chain (the strong Markov property), so $P(R\ge k)=f^k$ and
$$\mathbb{E}[R]=\sum_{n\ge1}P^n(0,0)=\frac{f}{1-f}.$$
Hence **$0$ is recurrent ($f=1$) iff $\sum_nP^n(0,0)=\infty$.**

**The key computation.** For simple random walk on $\mathbb{Z}^d$, returns happen only at even times, and $P^{2n}(0,0)\asymp n^{-d/2}$.

- $d=1$: $P^{2n}(0,0)=\binom{2n}{n}4^{-n}\sim(\pi n)^{-1/2}$ by Stirling.
- $d=2$: rotate the grid by $45^\circ$ and the walk splits into two independent one-dimensional walks, so $P^{2n}(0,0)=\big(\binom{2n}{n}4^{-n}\big)^2\sim(\pi n)^{-1}$.
- $d=3$: the same kind of count gives order $n^{-3/2}$.

$\sum n^{-1/2}$ and $\sum n^{-1}$ diverge: recurrent. $\sum n^{-3/2}$ converges: transient, with return probability $f\approx0.34$.

**Back to the woods.** The difference of two independent walkers stepping at the same time is again a symmetric random walk with bounded steps, and the same $n^{-d/2}$ estimate applies to it. The woods are two-dimensional, so in the grid model Pólya and the couple meet infinitely often, provided they start an even number of blocks apart. An odd gap never closes: each round of steps changes it by an even amount.

## Recall
type: mcq
Q: Why does the walk in three dimensions escape while the one in two dimensions keeps coming back?
- [x] Return probabilities fall like $n^{-3/2}$ in 3D and like $n^{-1}$ in 2D — the first series converges, so the expected number of returns is finite; the second diverges.
- [ ] In 3D each step is less likely to point home — every step is still symmetric; what decides it is the sum over all times.
- [ ] In 3D the walk drifts away from the origin — there is no drift; the walk's mean position stays at the origin forever.
