---
id: css.networks.small-world.rewire-one-edge-in-a-hundred
topic: css.networks.small-world
format: idea
difficulty: 2
language: en
weight: heavy
angles: [beautiful, connection, numbers]
tags: [watts-strogatz, small-world, clustering, path-length, rewiring]
hook: "Rewire one link in a hundred and the world shrinks almost all the way. Nobody loses a single friend."
sources:
  - {title: "Collective dynamics of 'small-world' networks", author: "Duncan J. Watts and Steven H. Strogatz", year: 1998, type: paper, url: "https://doi.org/10.1038/30918"}
  - {title: "Watts–Strogatz model", type: wiki, url: "https://en.wikipedia.org/wiki/Watts%E2%80%93Strogatz_model"}
  - {title: "Small-world network", type: wiki, url: "https://en.wikipedia.org/wiki/Small-world_network"}
dates: {written: 2026-09-19, event: 1998-06-04}
diagram: {file: css/small-world-rewiring.svg, caption: "Twenty people in a ring, each tied to their four nearest neighbours. Rewiring a handful of edges at random barely touches the cliques and collapses the distances.", alt: "Three rings of twenty dots: one with only short local links, one with the same short links plus a few long chords, one with links scattered everywhere"}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Rewire one link in a hundred and the world collapses

Two things about your social life are both true and, on the face of it, incompatible. Your friends mostly know each other — your world is cliquey, local, made of overlapping triangles. And yet you are six handshakes from a stranger in Ulaanbaatar. Cliquishness says distances should be huge. Short distances say the graph should look random. It cannot be both.

Watts and Strogatz showed in 1998 that it can, and that getting there is almost free. Start with a ring where everyone knows their nearest few neighbours: heavily clustered, and to reach the far side you walk. Now take each edge and, with small probability $p$, move one end to a random person.

At $p$ around one in a hundred, the average distance has already fallen most of the way to random-graph levels, while clustering is essentially untouched. A few long-range links do all the shrinking; local structure never notices they left.

They then checked three real networks — film actors, the US power grid, the neuron wiring of *C. elegans* — and all three sat in that regime.

## Rigor

Build the ring lattice: $n$ nodes on a circle, each joined to its $k$ nearest neighbours. Then visit each edge once and rewire one endpoint to a uniformly random node with probability $p$. At $p=0$ you have the lattice; at $p=1$, essentially $G(n,k/2)$.

Track two statistics. The characteristic path length $L(p)$, the mean shortest-path distance, and the clustering coefficient $C(p)$, the average fraction of a node's neighbour pairs that are themselves joined.

At $p=0$: $L(0)\approx n/2k$, which grows *linearly* in $n$, and $C(0)\approx 3/4$. At $p=1$: $L\sim \ln n/\ln k$ and $C\approx k/n$.

The asymmetry is the point. $L$ is governed by rare shortcuts, so a handful of long edges is enough to break it — each shortcut removes a whole detour, and its effect is non-linear in $p$. $C$ is governed by the typical edge, so it only falls once a sizeable *fraction* of edges have moved, which is linear in $p$. The two curves therefore separate over orders of magnitude, and the broad plateau where $L$ is already small and $C$ is still large is the small-world regime.

So the picture is not "the world is random". It is "the world is local, plus a few people who moved."

## Recall
type: mcq
Q: Why do path length and clustering fall at such different rates as you rewire?
- [x] One depends on rare edges, the other on typical ones — a few shortcuts destroy long paths, while clustering only falls once a large fraction of edges have moved.
- [ ] Clustering is a local measure and path length a global one, so global measures always change faster — plenty of global measures are insensitive to a few edges.
- [ ] Rewiring removes triangles faster than it creates shortcuts — it is the reverse: each rewired edge makes one shortcut and costs only a few triangles.
