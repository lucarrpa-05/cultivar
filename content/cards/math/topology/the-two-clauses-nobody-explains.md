---
id: math.topology.manifolds.the-two-clauses-nobody-explains
topic: math.topology.manifolds
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, mistake]
tags: [manifold-definition, long-line, partitions-of-unity, locally-euclidean]
hook: "A manifold looks locally like Euclidean space. Then the definition adds two clauses that look like paperwork and are not."
related: [math.topology.quotients.the-line-with-two-zeros]
sources:
  - {title: "Manifold", type: wiki, url: "https://en.wikipedia.org/wiki/Manifold"}
  - {title: "Long line (topology)", type: wiki, url: "https://en.wikipedia.org/wiki/Long_line_(topology)"}
  - {title: "Whitney embedding theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Whitney_embedding_theorem"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Two fixes: proper initial segments of the long ray are homeomorphic to [0,1), not R; and paracompactness excludes the long line rather than keeping it."}
---

# The two clauses in the definition nobody explains

A manifold is a space that looks locally like $\mathbb{R}^n$. Then the definition continues: "…which is Hausdorff and second countable", and every course moves on as if that were a formality. It is not. Each clause is there to exclude a specific monster, and the monsters are worth meeting.

Drop Hausdorff and you get the line with two origins: every point has an interval around it, and two points cannot be separated. Sequences have two limits. You would lose uniqueness of solutions to differential equations on day one.

Drop second countable and you get the long line: built by stacking uncountably many copies of $[0,1)$ along the first uncountable ordinal. Every point still has an interval around it, and the whole thing is Hausdorff. It is also not metrizable, cannot be embedded in any $\mathbb{R}^N$, and admits no partitions of unity — so no Riemannian metric, no integration, no analysis.

"Locally Euclidean" tells you what a manifold looks like up close. The other two clauses are what stop it from being unusable at a distance.

## Rigor

**Definition.** An $n$-**manifold** is a second countable Hausdorff space in which every point has an open neighbourhood homeomorphic to an open subset of $\mathbb{R}^n$.

*Hausdorff is independent.* $L=(\mathbb{R}\sqcup\mathbb{R})/(x\sim x^{*}, x\ne0)$ is locally Euclidean and second countable but not Hausdorff.

*Second countability is independent.* The long line $L_{\omega_1}=\omega_1\times[0,1)$ with the order topology is locally Euclidean and Hausdorff, but it is sequentially compact and not compact, not Lindelöf, and not second countable. It is not homeomorphic to $\mathbb{R}$; every proper initial segment of it is homeomorphic to $[0,1)$, which is how it manages to look ordinary up close and behave like nothing you know at a distance.

What second countability buys: a manifold is then paracompact and metrizable, so partitions of unity exist. Those are what let you patch local constructions into global ones — a Riemannian metric, an integral, a vector field. Whitney's theorem, that every smooth $n$-manifold embeds in $\mathbb{R}^{2n}$, also needs it.

Some authors write "paracompact" instead of "second countable". That still throws the long line out — it is not paracompact — while letting in uncountable disjoint unions of copies of $\mathbb{R}^n$; for connected manifolds the two conditions agree.

## Recall
type: mcq
Q: What does second countability actually buy you in the definition of a manifold?
- [x] Paracompactness, hence partitions of unity — which is what lets local constructions be patched into global ones like a Riemannian metric.
- [ ] Uniqueness of limits — that is what the Hausdorff clause gives; the line with two origins is second countable and still has double limits.
- [ ] Compactness — manifolds like $\mathbb{R}^n$ are second countable and not compact; the two conditions are unrelated.
