---
id: css.networks.random-graphs.the-instant-a-crowd-becomes-a-society
topic: css.networks.random-graphs
format: idea
difficulty: 3
language: en
weight: heavy
angles: [paradox, beautiful, numbers]
tags: [erdos-renyi, giant-component, phase-transition, random-graphs, branching-process]
hook: "Add random links to a crowd of strangers and nothing happens, nothing happens, then suddenly everyone is connected."
sources:
  - {title: "Erdős–Rényi model", type: wiki, url: "https://en.wikipedia.org/wiki/Erd%C5%91s%E2%80%93R%C3%A9nyi_model"}
  - {title: "Giant component", type: wiki, url: "https://en.wikipedia.org/wiki/Giant_component"}
  - {title: "Random graph", type: wiki, url: "https://en.wikipedia.org/wiki/Random_graph"}
dates: {written: 2026-09-19, event: 1960-01-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# The exact moment a crowd turns into a society

Put a million strangers in a room and start introducing random pairs. For a long while nothing interesting happens: you get little islands, a pair here, a triangle there, the biggest clump a few dozen people at most. Keep going. Keep going.

Then, over a vanishingly short stretch, the islands fuse and a single component appears containing a fixed fraction of everyone in the room. Not "gradually more connected" — a jump. Erdős and Rényi found the exact location in 1960: it happens when the average person has *one* link.

One. Not five, not log of anything. Below an average degree of one, the largest group is of order $\log n$. Above it, the largest group is of order $n$.

This is the reason network scientists talk like physicists. It is a genuine phase transition, with a critical point and critical exponents, in an object with no energy and no temperature in it.

## Rigor

In $G(n,p)$ each of the $\binom{n}{2}$ pairs is linked independently with probability $p$. Write $c=np$ for the mean degree.

Explore a component by breadth-first search. Each vertex you reach has about $\mathrm{Binomial}(n,p)\approx \mathrm{Poisson}(c)$ neighbours, so early exploration is a branching process with mean offspring $c$. Branching processes die out almost surely iff $c\le 1$: that is the whole theorem.

Above threshold, let $S$ be the fraction of nodes in the giant component; it must satisfy the extinction-probability fixed point
$$S = 1-e^{-cS},$$
which has a unique positive root exactly when $c>1$. Near the transition, $S\approx 2(c-1)$ — the component grows linearly out of zero, the mark of a continuous transition.

Two further thresholds people confuse with this one. The giant component appears at $c=1$, but the graph is not yet *connected*: isolated vertices survive until $p=\ln n/n$, i.e. $c=\ln n$. And inside the critical window $c = 1 + \lambda n^{-1/3}$ the largest component is of order $n^{2/3}$ — the scaling regime.

Which makes Erdős–Rényi a superb null model and a terrible description of a society: it has no triangles to speak of, and nobody is a hub.

## Recall
type: mcq
Q: At what average degree does a giant component appear in a large random graph?
- [x] One — below it the largest component is $O(\log n)$, above it a constant fraction of the graph, because the exploration is a branching process with mean offspring $c$.
- [ ] $\ln n$ — that is the threshold for the graph to become fully connected, with no isolated vertices left.
- [ ] Two — nothing special happens at two; the branching process already survives with probability bounded away from zero past one.
