---
id: math.topology.connectedness.the-ivt-is-not-about-numbers
topic: math.topology.connectedness
topics: [math.analysis.continuity]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [intermediate-value-theorem, connectedness, separation, continuous-image]
hook: "You proved the intermediate value theorem with a least upper bound. The supremum was never doing the work."
sources:
  - {title: "Intermediate value theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Intermediate_value_theorem"}
  - {title: "Connected space", type: wiki, url: "https://en.wikipedia.org/wiki/Connected_space"}
  - {title: "Topology, 2nd ed., §24", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Tightened the non-interval separation: the two outer points have to be in the subspace."}
---

# The intermediate value theorem is not about numbers

In analysis you prove it with a supremum: let $S$ be the set where $f$ stays below $c$, take $\sup S$, chase inequalities. It works, and it leaves the impression that the theorem is a fact about the real numbers, propped up by completeness.

Take the numbers away and watch what is left. Three sentences, none of which mentions arithmetic. An interval cannot be split into two separated open pieces. A continuous map cannot split something that was not already split. And a subset of the line that is not split is exactly an interval.

Put them in a row and the theorem drops out, no supremum anywhere. Better, the domain was never used: replace $[a,b]$ by any connected space at all — a disc, a sphere, a country — and a continuous real function on it still hits every value between two that it attains. Walk from Bogotá to Cartagena and at some moment you are at exactly 1,500 metres.

Here are the three sentences, stated properly.

## Rigor

$X$ is **connected** if it is not the union of two disjoint nonempty open subsets (a *separation*).

**(i) Continuous images of connected spaces are connected.** If $f : X \to Y$ is continuous and onto, and $Y = A \sqcup B$ is a separation, then $X = f^{-1}(A)\sqcup f^{-1}(B)$ is one too.

**(ii) $[a,b]$ is connected**, and more generally the connected subspaces of $\mathbb{R}$ are exactly the intervals: a subspace $S$ that is not an interval contains $p<q<r$ with $p,r \in S$ and $q \notin S$, and then $S \cap (-\infty,q)$, $S\cap(q,\infty)$ separate it.

**(iii) IVT.** Let $X$ be connected, $f : X \to \mathbb{R}$ continuous, $f(p)=r$, $f(q)=s$ and $r<c<s$. If $c$ were never attained, then
$$X = f^{-1}\big((-\infty,c)\big)\ \sqcup\ f^{-1}\big((c,\infty)\big)$$
would be two disjoint open sets, both nonempty (they contain $p$ and $q$), covering $X$. That is a separation, contradiction.

The supremum is gone. What remains is the picture: the domain is in one piece, so its image is in one piece, and a piece of the line is an interval.

## Recall
type: mcq
Q: Which hypothesis of the intermediate value theorem is doing the real work?
- [x] The domain is connected — everything else follows from continuity, since continuous images of connected spaces are connected.
- [ ] The domain is a closed bounded interval — closedness and boundedness give you maxima, which is the extreme value theorem, a different result.
- [ ] The real numbers are complete — completeness is what makes intervals connected, but the theorem itself only ever uses the connectedness.
