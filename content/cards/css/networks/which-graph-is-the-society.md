---
id: css.networks.graphs-basics.which-graph-is-the-society
topic: css.networks.graphs-basics
format: callback
difficulty: 2
language: en
weight: medium
angles: [connection, tool, mistake]
tags: [graphs, adjacency-matrix, walks, modelling-choices, clustering-coefficient]
hook: "Euler got handed the bridges. You have to decide what the edges are, and that decision is the model."
callback: {from: math.combinatorics.graph-theory, to: css.networks.graphs-basics}
sources:
  - {title: "Seven Bridges of Königsberg", type: wiki, url: "https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg"}
  - {title: "Social network analysis", type: wiki, url: "https://en.wikipedia.org/wiki/Social_network_analysis"}
  - {title: "Clustering coefficient", type: wiki, url: "https://en.wikipedia.org/wiki/Clustering_coefficient"}
dates: {written: 2026-09-19}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Remember Königsberg? Euler got the easy part: someone handed him the edges

When you met graph theory, the bridges were already there. Four landmasses, seven bridges, and the only question was what follows. Nobody had to argue about whether a bridge counted.

Point the same machinery at a society and that argument is the entire job. Take one company. Is an edge "reports to"? "Has eaten lunch with"? "Replied to an email within a day"? "Is named in the same document"? Each gives a different graph on the same people, and they disagree about who is central, where the communities are, and how fast anything spreads. There is no neutral choice; there is only a choice you can defend.

Worse, the choice quietly fixes the mathematics. Directed or not, weighted or not, one-mode or bipartite, snapshot or timestamped — each of those flips which theorems apply.

So: what survives, once you have committed to a graph?

## Rigor

Fix $G=(V,E)$ with $|V|=n$ and adjacency matrix $A$, where $A_{ij}=1$ iff $i\sim j$. Three quantities do most of the work.

**Degree.** $k_i=\sum_j A_{ij}$, and $\sum_i k_i = 2|E|$ — the handshake lemma, which is why the mean degree is $2|E|/n$ and not $|E|/n$.

**Walks.** $(A^k)_{ij}$ counts walks of length $k$ from $i$ to $j$. Everything spectral follows from this one fact: eigenvector centrality, PageRank, the diffusion of a rumour. If you made your edges directed, $A$ stops being symmetric, its eigenvalues can be complex, and half of those tools need rewriting.

**Clustering.** $C_i = 2T_i / (k_i(k_i-1))$, the fraction of $i$'s pairs of neighbours who are themselves connected. In a random graph with $n$ nodes and mean degree $\langle k\rangle$, $C\approx \langle k\rangle/n$, which for a society of millions is effectively zero. Real social graphs come in at $10^{-1}$.

That last gap — clustering vastly above chance — is the first hard empirical fact about social networks, and it is why the Königsberg toolkit needed new theorems.

## Recall
type: mcq
Q: Why is $(A^k)_{ij}$ the workhorse quantity in network analysis?
- [x] It counts walks of length $k$ between $i$ and $j$, which is what every spectral measure — eigenvector centrality, PageRank, diffusion — is built on.
- [ ] It gives the shortest path length between $i$ and $j$ — that needs the smallest $k$ with a nonzero entry, which is a different object.
- [ ] It counts triangles through $i$ — triangles come from the diagonal of $A^3$, a special case, not the general point.
