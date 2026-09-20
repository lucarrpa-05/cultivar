---
id: math.topology.open-sets-topologies.distance-was-never-the-point
topic: math.topology.open-sets-topologies
topics: [math.analysis.metric-spaces]
format: idea
difficulty: 3
language: en
weight: medium
angles: [connection, origin]
tags: [topology-axioms, open-sets, metric-to-topological, finite-intersection]
hook: "Every epsilon-delta proof you ever wrote used the distance for exactly one thing. Topology keeps that thing and throws the ruler away."
sources:
  - {title: "Topological space", type: wiki, url: "https://en.wikipedia.org/wiki/Topological_space"}
  - {title: "Topology, 2nd ed., §12–13", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
  - {title: "Metric space", type: wiki, url: "https://en.wikipedia.org/wiki/Metric_space"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Distance was never the point

Go back through any $\varepsilon$–$\delta$ proof you have written and watch what the distance actually does. It never gets measured. It only ever gets used to say *there is room around this point*: some ball small enough to sit inside the region you care about. The number is scaffolding. The statement is "room".

Topology takes that seriously. Declare which sets have room around every one of their points — call those open — and ask the collection for only three things: the empty set and the whole space belong, any union of members is a member, and any *finite* intersection is. Convergence, continuity, closure, compactness, connectedness all survive, because none of them ever needed the number.

What you lose is real. Two different rulers can produce exactly the same open sets, and topology will never tell them apart. What you gain is every space that has no ruler at all.

The third axiom is the strange one. Why finite?

## Rigor

A **topology** on a set $X$ is a family $\mathcal{T}$ of subsets with $\varnothing, X \in \mathcal{T}$; with $\bigcup_{i \in I} U_i \in \mathcal{T}$ for every family in $\mathcal{T}$; and with $U_1 \cap \cdots \cap U_n \in \mathcal{T}$ for every finite list.

Why finite? In $\mathbb{R}$ each $(-\tfrac1n,\tfrac1n)$ is open, but
$$\bigcap_{n\ge 1}\left(-\tfrac1n,\tfrac1n\right)=\{0\},$$
and a single point has no room around it. Allow arbitrary intersections and every subset becomes open, so "open" stops saying anything at all.

A metric generates a topology: $U$ is open iff for each $x \in U$ there is $\varepsilon>0$ with $B_d(x,\varepsilon)\subseteq U$. That clause *is* the "room", written once and then never needed again. On $\mathbb{R}^2$ the Euclidean and taxicab metrics give visibly different balls but identical open sets, hence identical continuous functions, convergent sequences and compact sets. The ruler has already become unreachable.

## Recall
type: mcq
Q: Why do the axioms allow arbitrary unions but only finite intersections?
- [x] Infinite intersections can shrink to a single point — and $\bigcap_n(-1/n,1/n)=\{0\}$ has no room around it, so it must not come out open.
- [ ] Infinite intersections are hard to compute — computation has nothing to do with it; the axioms are about which sets can honestly be called roomy.
- [ ] Infinite unions are also restricted in some treatments — they are not: arbitrary unions are always allowed, which is exactly what makes openness a local condition.
