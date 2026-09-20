---
id: math.topology.fixed-points.prices-that-clear-markets
topic: math.topology.fixed-points
topics: [econ.micro.general-equilibrium]
format: callback
difficulty: 4
language: en
weight: medium
angles: [connection, practical]
tags: [arrow-debreu, excess-demand, price-simplex, walras-law]
hook: "Remember the fixed point in the crumpled map? Arrow and Debreu used the same theorem to prove that market-clearing prices exist."
callback: {from: math.topology.fixed-points, to: econ.micro.general-equilibrium}
sources:
  - {title: "Arrow–Debreu model", type: wiki, url: "https://en.wikipedia.org/wiki/Arrow%E2%80%93Debreu_model"}
  - {title: "General equilibrium theory", type: wiki, url: "https://en.wikipedia.org/wiki/General_equilibrium_theory"}
  - {title: "Kakutani fixed-point theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Kakutani_fixed-point_theorem"}
dates: {written: 2026-09-19, event: 1954-01-01}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember the crumpled map? It is why prices can clear

Remember that a continuous map of a compact convex set into itself must leave some point exactly where it was. Arrow and Debreu published the economic consequence in 1954, and it is still the central existence theorem of the field.

Set up the economy. Prices only matter up to scale — doubling every price changes nothing real — so normalise them to sum to one. The set of price vectors is then a simplex: compact, convex, exactly the shape Brouwer's theorem wants. At each price vector, aggregate excess demand says how much of each good people want beyond what exists.

Now the trick. Define a map on the simplex that raises the relative price of any good in excess demand and lowers it for goods in excess supply, renormalising afterwards. It is continuous and sends the simplex to itself. A fixed point is a price vector the adjustment does not want to change — which, given the budget identity, means no good is in excess demand. Markets clear.

The honest part: this proves existence, nothing more.

## Rigor

Let $z : \Delta \to \mathbb{R}^n$ be aggregate excess demand on the simplex $\Delta=\{p \ge 0 : \sum_i p_i =1\}$, continuous, homogeneous of degree zero, and satisfying **Walras's law** $p \cdot z(p)=0$ for all $p$.

Define $g : \Delta \to \Delta$ by
$$g_i(p)=\frac{p_i+\max(0,z_i(p))}{1+\sum_{j}\max(0,z_j(p))}.$$
The coordinates are non-negative and sum to $1$, so $g$ maps the compact convex $\Delta$ into itself continuously, and Brouwer gives $p^{*}=g(p^{*})$. Writing $\lambda=\sum_j \max(0,z_j(p^{*}))$, the fixed point says $\lambda p_i^{*}=\max(0,z_i(p^{*}))$ for every $i$. Multiply by $z_i(p^{*})$ and sum: the left side is $\lambda\, p^{*}\!\cdot z(p^{*})=0$ by Walras's law, and the right side is $\sum_{i : z_i>0} z_i(p^{*})^2$. A sum of squares equal to zero forces $z_i(p^{*})\le0$ for every $i$: no excess demand anywhere.

Arrow and Debreu's actual proof uses Kakutani's set-valued version, because demand is a correspondence when preferences are merely convex rather than strictly convex, and because boundary prices need care — the budget set stops being compact when a price hits zero.

What the theorem does not give: uniqueness, stability, or any process that finds the equilibrium. Sonnenschein, Mantel and Debreu later showed that excess demand functions are essentially unrestricted beyond continuity, homogeneity and Walras's law, so nothing stronger is available in general.

## Recall
type: mcq
Q: What does the Arrow–Debreu fixed-point argument actually establish?
- [x] That an equilibrium price vector exists — not that it is unique, stable, or reachable by any adjustment process.
- [ ] That the market will converge to equilibrium — convergence is a separate and largely negative story; Brouwer's theorem is silent on dynamics.
- [ ] That the equilibrium is efficient — efficiency is the first welfare theorem, proved by a different and much simpler argument.
