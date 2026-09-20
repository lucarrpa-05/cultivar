---
id: css.networks.centrality.pagerank-is-an-eigenvector
topic: css.networks.centrality
topics: [math.probability.markov-chains]
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, tool, beautiful]
tags: [pagerank, eigenvector-centrality, perron-frobenius, random-surfer, damping]
hook: "The algorithm that ranked the web is one eigenvector of one matrix, and you already know which one."
callback: {from: math.linear-algebra.eigen, to: css.networks.centrality}
sources:
  - {title: "PageRank", type: wiki, url: "https://en.wikipedia.org/wiki/PageRank"}
  - {title: "The Anatomy of a Large-Scale Hypertextual Web Search Engine", author: "Sergey Brin and Lawrence Page", year: 1998, type: paper, url: "https://doi.org/10.1016/S0169-7552(98)00110-X"}
  - {title: "Perron–Frobenius theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem"}
dates: {written: 2026-09-19, event: 1998-04-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Remember eigenvectors? One of them ranked the entire web

An eigenvector is the direction a matrix does not rotate — apply the map and you get the same direction back, only stretched. It probably arrived as an algebraic curiosity with a characteristic polynomial attached.

Here is what it turned out to be worth. "Important pages are the ones linked to by important pages" is circular, and that circularity is not a bug; it is a fixed-point equation. Write importance as a vector, write "receives links from" as a matrix, and the sentence becomes: the importance vector is unchanged by the link matrix. An eigenvector with eigenvalue one.

Same object, read a third way: imagine somebody clicking links forever at random. The fraction of time they spend on each page is the stationary distribution of a Markov chain. Importance, eigenvector, long-run occupancy — three descriptions of one vector.

Which is why the same computation ranks football teams, ranks scientific journals, and finds the people who actually run a company.

## Rigor

Let $M$ be column-stochastic with $M_{ij}=1/\text{outdeg}(j)$ when $j$ links to $i$. We want $r$ with $Mr=r$: the eigenvector for $\lambda=1$, equivalently the stationary distribution of the random surfer.

Two things can go wrong. A page with no outlinks leaks probability, and a group of pages linking only to each other traps it — so $M$ need not be irreducible or aperiodic, and the fixed point need not be unique. The fix is the damping factor: with probability $d$ follow a link, with probability $1-d$ teleport to a uniformly random page. The Google matrix
$$G=dM+\frac{1-d}{n}\mathbf{1}\mathbf{1}^{\!\top},\qquad d=0.85,$$
is strictly positive, so Perron–Frobenius gives a unique positive eigenvector for the simple eigenvalue $1$. The teleport is not a hack for realism; it is what buys uniqueness.

It also buys speed. The second eigenvalue of $G$ is bounded by $d$, so power iteration $r\leftarrow Gr$ converges geometrically at rate $0.85$ — about fifty iterations for three digits, on a matrix with billions of rows.

The circular sentence, the eigenvector and the random walk are the same statement. Which one you use is a matter of what you want to prove.

## Recall
type: mcq
Q: What does the damping factor of 0.85 actually buy you?
- [x] Uniqueness and convergence — teleporting makes the Google matrix strictly positive, so Perron–Frobenius gives one positive eigenvector, and the second eigenvalue is at most $d$.
- [ ] Realism about how people browse — it was chosen for the mathematics; the surfer story is an interpretation, not a measurement.
- [ ] Protection against spam links — link spam is fought separately; damping does not distinguish honest links from bought ones.
