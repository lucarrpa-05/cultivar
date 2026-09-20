---
id: ai.ml-basics.clustering.k-clusters-even-when-there-are-none
topic: ai.ml-basics.clustering
format: idea
difficulty: 2
language: en
weight: medium
angles: [mistake, tool]
tags: [k-means, lloyd, voronoi, initialization, unsupervised]
hook: "Hand it one featureless blob and ask for four groups. It will give you four groups, without embarrassment."
sources:
  - {title: "k-means clustering", type: wiki, url: "https://en.wikipedia.org/wiki/K-means_clustering"}
  - {title: "Least squares quantization in PCM", author: "Stuart P. Lloyd", year: 1982, type: paper, url: "https://doi.org/10.1109/TIT.1982.1056489"}
  - {title: "k-means++", type: wiki, url: "https://en.wikipedia.org/wiki/K-means%2B%2B"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# k-means always finds k clusters, even when there are none

The algorithm is three lines. Drop $k$ centres at random; assign every point to its nearest centre; move each centre to the mean of its points; repeat until nothing moves. It always halts, and it always returns exactly $k$ groups — including when your data is a single featureless cloud, which it will slice into $k$ tidy wedges and report with a straight face.

Two more assumptions ride along unannounced. Clusters are round, because "nearest centre" draws straight-line boundaries: give it two interlocking crescents and it cuts both in half. And clusters are comparable in size, because a big loose group gets robbed by a small tight one sitting next to it.

Stuart Lloyd wrote the procedure at Bell Labs in 1957; it was not published until 1982. It is still the first thing everyone runs, and it still answers a question you did not ask — "where are the best $k$ centres?", never "are there clusters here at all?".

The assumptions are in the objective, not the code.

## Rigor

The objective is the within-cluster sum of squares,

$$\min_{C_1,\dots,C_k}\ \sum_{j=1}^{k}\sum_{x\in C_j}\|x-\mu_j\|^{2},\qquad \mu_j=\frac{1}{|C_j|}\sum_{x\in C_j}x .$$

Lloyd's algorithm is alternating minimisation: with centres fixed, nearest-centre assignment is optimal; with assignments fixed, the mean minimises $\sum\|x-c\|^{2}$. Each half-step weakly decreases the objective and there are finitely many partitions, so it terminates — at a local minimum that can be arbitrarily worse than the global one. Minimising exactly is NP-hard, already for $k=2$.

Now read the assumptions off the formula. Squared Euclidean distance plus nearest-centre assignment makes every cluster a cell of a Voronoi diagram: convex, straight-edged, never a crescent. And every point contributing equally means the cost of a large diffuse cluster can always be cut by donating part of it to a neighbour, which is what equalises sizes.

$k$-means++ repairs the *initialisation*, not the model: seed centres with probability proportional to the squared distance from the nearest chosen centre, and the expected objective lands within an $O(\log k)$ factor of the optimum. Nothing in any of this repairs your choice of $k$.

## Recall
type: mcq
Q: You run k-means with $k=4$ on data with no cluster structure whatsoever. What comes back?
- [x] Four plausible-looking clusters — the procedure partitions whatever it is given and has no way to report "there is nothing here".
- [ ] An error, or empty clusters — empty clusters are rare and the iteration converges normally on unstructured data.
- [ ] One cluster holding everything and three empty ones — the objective rewards splitting a blob, since any split lowers within-cluster distance.
