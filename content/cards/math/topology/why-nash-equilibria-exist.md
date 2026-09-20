---
id: math.topology.compactness.why-nash-equilibria-exist
topic: math.topology.compactness
topics: [econ.game-theory.dominance-nash, math.topology.fixed-points]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, beautiful]
tags: [kakutani, nash-equilibrium, simplex, best-response]
hook: "The footnote that said existence follows from Kakutani's theorem is the compactness card you already read."
callback: {from: math.topology.compactness, to: econ.game-theory.dominance-nash}
sources:
  - {title: "Kakutani fixed-point theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Kakutani_fixed-point_theorem"}
  - {title: "Nash equilibrium", type: wiki, url: "https://en.wikipedia.org/wiki/Nash_equilibrium"}
  - {title: "Equilibrium points in n-person games", author: "John Nash", year: 1950, type: paper, url: "https://doi.org/10.1073/pnas.36.1.48"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember compactness? It is why Nash equilibria exist

When you first met Nash equilibrium, existence arrived as a footnote: "by Kakutani's fixed-point theorem". That footnote is the compactness you have been doing.

Line up the pieces. A mixed strategy for one player is a probability vector over their pure strategies — a point in a simplex, which is closed, bounded and convex, hence compact. A strategy profile is one point from each player's simplex, so the whole space of profiles is a finite product of compact convex sets: still compact, still convex.

Now the best-response map. Given what everyone else is doing, a player has a set of best replies, and that set is never empty, precisely because a continuous payoff on a compact simplex attains its maximum. Collect these into a map sending each profile to the set of profiles that answer it best. A fixed point of that map is a profile where nobody can gain by moving. That is the definition of Nash equilibrium.

So the theorem is: this map must have a fixed point. And it must, because the domain is compact and convex.

## Rigor

**Kakutani (1941).** Let $S \subseteq \mathbb{R}^n$ be nonempty, compact and convex, and let $\Phi : S \rightrightarrows S$ have nonempty convex values and a closed graph. Then $\Phi$ has a fixed point: some $s$ with $s \in \Phi(s)$.

For a finite game with players $i=1,\dots,n$, take $S=\prod_i \Delta(A_i)$, a product of simplices. The best-response correspondence is
$$\Phi(\sigma)=\prod_i \arg\max_{\sigma_i' \in \Delta(A_i)} u_i(\sigma_i',\sigma_{-i}).$$
Three checks, each a compactness or convexity fact. *Nonempty*: $u_i$ is continuous and $\Delta(A_i)$ compact, so the max is attained — the extreme value theorem. *Convex*: $u_i$ is affine in $\sigma_i$, so the set of maximisers is a face. *Closed graph*: $u_i$ is continuous, so limits of best replies are best replies (Berge's maximum theorem).

Kakutani applies. A fixed point $\sigma^{*} \in \Phi(\sigma^{*})$ says every $\sigma_i^{*}$ is a best reply to $\sigma_{-i}^{*}$: a Nash equilibrium.

Nash's 1950 note used exactly this argument; his 1951 paper redid it with Brouwer's theorem alone.

## Recall
type: mcq
Q: Where does compactness enter the proof that Nash equilibria exist?
- [x] Twice — it makes each simplex a valid domain for Kakutani, and it guarantees the best-response set is nonempty by the extreme value theorem.
- [ ] Only in showing payoffs are continuous — continuity is assumed from the payoff structure; compactness is what turns it into an attained maximum.
- [ ] Nowhere; convexity does all the work — convexity alone is not enough, as an unbounded convex set can have a fixed-point-free self map.
