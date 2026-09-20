---
id: math.probability.markov-chains.the-stationary-distribution-google-sells
topic: math.probability.markov-chains
topics: [css.networks.centrality]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, tool, practical]
tags: [pagerank, random-surfer, damping-factor, teleportation, centrality]
hook: "The two ways a chain fails to forget its start are exactly the two problems PageRank's damping factor fixes."
callback: {from: math.probability.markov-chains, to: css.networks.centrality}
sources:
  - {title: "PageRank", type: wiki, url: "https://en.wikipedia.org/wiki/PageRank"}
  - {title: "The Anatomy of a Large-Scale Hypertextual Web Search Engine", author: "Sergey Brin and Lawrence Page", year: 1998, type: paper, url: "https://doi.org/10.1016/S0169-7552(98)00110-X"}
  - {title: "Centrality", type: wiki, url: "https://en.wikipedia.org/wiki/Centrality"}
dates: {written: 2026-09-19, event: 1998-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember the stationary distribution? Google built a company on it

You met a Markov chain that forgets where it started and settles into one list of long-run probabilities. Brin and Page's 1998 idea was to point that machinery at the web.

Imagine someone clicking links at random, forever. The web is a graph, each page a state, each link an equally likely move. The stationary distribution of that chain says what fraction of eternity the surfer spends on each page — and that fraction is a ranking. A page is important if important pages point to it, which sounds circular and is simply an eigenvector equation.

Except the raw web chain fails both of the conditions you already know. It is reducible: whole regions link inward and never out, so the surfer gets trapped and never forgets where it began. And pages with no outgoing links are dead ends where the chain stops being a chain at all.

The fix is one line of arithmetic, and it is why the damping factor exists.

## Rigor

Let $A$ be the link matrix with $A_{ij}=1/\deg^{+}(i)$ when $i$ links to $j$, and dangling rows replaced by uniform rows. With damping $d=0.85$, the Google matrix is
$$G=dA+(1-d)\frac{\mathbf{1}\mathbf{1}^{\top}}{N}.$$
With probability $1-d$ the surfer teleports to a uniformly random page. Every entry of $G$ is now strictly positive, so the chain is irreducible and aperiodic, and Perron–Frobenius hands you a unique stationary $\pi$ with $\pi G=\pi$. That is the entire role of the damping factor: it is not a fudge, it is the repair of the two failure modes.

**Computing it.** Power iteration: $\pi^{(k+1)}=\pi^{(k)}G$, using the sparse $A$ plus a rank-one correction, so each step is $O(\text{edges})$. The subdominant eigenvalue satisfies $|\lambda_2|\le d$, so the error shrinks by $0.85$ per step — about fifty iterations for four digits, independent of how large the web is.

**Elsewhere.** The same recipe is eigenvector centrality in a social network, and in football, passing-network centrality: build the chain, teleport a little, read off $\pi$.

## Recall
type: mcq
Q: What does the damping factor do, mathematically?
- [x] Makes the chain irreducible and aperiodic — teleportation gives every transition positive probability, so a unique stationary distribution exists and is reached from any start.
- [ ] Prevents the ranking from being dominated by large pages — size plays no direct role; the issue is graph structure.
- [ ] Speeds up convergence at the cost of accuracy — it does bound $|\lambda_2|$ by $d$, but its purpose is existence and uniqueness first.
- [ ] Models user boredom, with no mathematical role — the story is a gloss on a change that is doing real structural work.
