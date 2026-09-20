---
id: sports.football-analytics.passing-networks.remember-graph-theory
topic: sports.football-analytics.passing-networks
format: callback
difficulty: 2
language: en
weight: heavy
angles: [connection, tool]
tags: [graph-theory, betweenness, passing-network, adjacency-matrix, pagerank]
hook: "Eleven vertices, a few hundred directed edges. A football team is a small weighted digraph that runs for ninety minutes."
callback: {from: math.combinatorics.graph-theory, to: sports.football-analytics.passing-networks}
prerequisites: [math.combinatorics.graph-theory, css.networks.centrality]
sources:
  - {title: "Quantifying the Performance of Individual Players in a Team Activity", author: "Duch, Waitzman and Amaral", year: 2010, type: paper, url: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0010937"}
  - {title: "A network theory analysis of football strategies", author: "Javier López Peña and Hugo Touchette", year: 2012, type: paper, url: "https://arxiv.org/abs/1206.6904"}
dates: {written: 2026-09-19}
diagram: {file: sports/passing-network.svg, caption: "One team's passes as a weighted digraph: thicker edges are more passes, and the ringed vertex is the one most paths must cross.", alt: "Eleven circles arranged like a football formation, joined by lines of different thickness; the central midfield circle has a ring around it and the most lines through it"}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Brandes is O(|V||E|) only unweighted; added the weighted bound, since the card uses weights."}
---

# Remember graphs? A football team is one, and it has a cut vertex.

Vertices and edges, an adjacency matrix, centrality. You met all of it abstractly. Now put eleven players on the vertices and let $A_{ij}$ be the number of passes from $i$ to $j$ during a match. Everything you know transfers, and it all means something.

Out-degree is involvement. In-degree is how much your team looks for you. The matrix is *asymmetric* — a full-back who receives twenty passes from his centre-back and returns three is a different animal from one who returns twenty.

The interesting measure is betweenness: the fraction of shortest paths between other players that run through you. Duch, Waitzman and Amaral built a version of this in PLoS ONE in 2010 that measures flow towards the opponent's goal rather than between arbitrary players. López Peña and Touchette ran closeness, betweenness and PageRank over the 2010 World Cup sides in 2012.

High betweenness is the mathematical name for a pivot — and for a vulnerability. If deleting one vertex disconnects the graph, you have just found the man the opposition should mark.

Here is what that deletion does, precisely.

## Rigor

Let $G=(V,E,w)$ be the weighted digraph with $V$ the eleven players and $w_{ij}=A_{ij}$ the pass counts. Define edge *distance* as $d_{ij}=1/w_{ij}$, so that heavily used lanes are short — a passing move travels the cheap edges.

Betweenness of $v$ is

$$C_B(v)=\sum_{s\neq v\neq t}\frac{\sigma_{st}(v)}{\sigma_{st}},$$

where $\sigma_{st}$ counts shortest $s\to t$ paths and $\sigma_{st}(v)$ those through $v$. Brandes's algorithm computes it in $O(|V||E|)$ unweighted and $O(|V||E|+|V|^{2}\log|V|)$ with weights — for eleven vertices, instant either way.

Now the football question as a graph question: how much worse is the team without $v$? Compare the sum of pairwise shortest-path distances in $G$ and in $G-v$. A vertex whose removal blows that sum up is a *cut-vertex-like* bottleneck — exactly what a pressing scheme tries to manufacture by taking one passing option away.

And the strength-of-connection idea from the eigenvector ranking returns here in a different suit: PageRank on this same matrix asks not "who touches it most" but "who does the ball keep coming back to", and those are not the same player.

## Recall
type: mcq
Q: In a passing network, why is edge distance usually set to $1/w_{ij}$ rather than $w_{ij}$?
- [x] Because shortest-path measures treat small weights as cheap, and a heavily used passing lane should be cheap to travel — inverting turns "lots of passes" into "short".
- [ ] Because pass counts can be zero — zero-weight edges are simply absent; that is not why the inversion is used.
- [ ] Because betweenness requires a symmetric matrix — it does not; the passing digraph is deliberately asymmetric.
