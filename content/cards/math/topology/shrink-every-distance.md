---
id: math.analysis.metric-spaces.shrink-every-distance
topic: math.analysis.metric-spaces
format: idea
difficulty: 2
language: en
weight: medium
angles: [mistake, connection]
tags: [bounded-metric, metric-equivalence, boundedness, standard-bounded]
hook: "Cap every distance in a space at 1 and nothing topological changes. Boundedness is a fact about your ruler, not about the space."
related: [math.topology.compactness.finitely-many-checks]
sources:
  - {title: "Metric space", type: wiki, url: "https://en.wikipedia.org/wiki/Metric_space"}
  - {title: "Topology, 2nd ed., §20", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Shrink every distance and nothing changes

Take any metric space and replace the distance $d(x,y)$ by $\min\{d(x,y),1\}$. Every pair of points is now at most $1$ apart. The whole of $\mathbb{R}$ fits inside a ball of radius $2$.

Check what changed. The open sets: identical. The convergent sequences: identical, with the same limits. The continuous functions in and out: identical. The compact sets, the connected sets, the closures: all identical. Nothing a topologist can detect has moved.

What did change is that the space went from unbounded to bounded. So boundedness cannot be a topological property at all — it is a statement about the particular ruler you chose, and a different ruler giving the same open sets can disagree with it.

That is the sharpest possible answer to why compactness had to stop being "closed and bounded". Closed is topological. Bounded is not, and it is not even stable under swapping one metric for an equivalent one.

## Rigor

Let $\bar d(x,y)=\min\{d(x,y),1\}$. It is a metric: symmetry and positivity are clear, and the triangle inequality holds by cases — if either of $d(x,z)$, $d(z,y)$ is $\ge1$ the right side is at least $1 \ge \bar d(x,y)$; otherwise $\bar d(x,y)\le d(x,y)\le d(x,z)+d(z,y)=\bar d(x,z)+\bar d(z,y)$.

**Same topology.** For $r<1$ the balls agree: $B_{\bar d}(x,r)=B_d(x,r)$. Balls of radius less than $1$ already form a basis for each topology, so the two topologies coincide.

The same trick works on infinite products. Munkres's metric on $\mathbb{R}^{\omega}$,
$$D(x,y)=\sup_i \frac{\bar d(x_i,y_i)}{i},$$
is finite precisely because each term is capped, and it induces the product topology.

What is *not* preserved by an equivalence of metrics: completeness can fail to transfer ($(0,1)$ with $|x-y|$ is incomplete, but it is homeomorphic to $\mathbb{R}$, which is complete), and total boundedness is different from boundedness — under $\bar d$ every space is bounded, while $\mathbb{R}$ is still not totally bounded. It is total boundedness plus completeness, not boundedness, that recovers compactness.

## Recall
type: mcq
Q: What does capping a metric at 1 tell you about "closed and bounded"?
- [x] Boundedness is not topological — the capped metric gives exactly the same open sets while making every space bounded.
- [ ] Closedness is not topological either — closedness is defined purely from the open sets, so it is preserved by construction.
- [ ] Capping breaks the triangle inequality — it does not; a short case check shows $\min\{d,1\}$ is still a metric.
