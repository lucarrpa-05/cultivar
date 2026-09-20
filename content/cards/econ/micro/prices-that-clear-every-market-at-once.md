---
id: econ.micro.general-equilibrium.prices-that-clear-every-market-at-once
topic: econ.micro.general-equilibrium
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [general-equilibrium, brouwer, kakutani, arrow-debreu, walras-law]
callback: {from: math.topology.fixed-points, to: econ.micro.general-equilibrium}
hook: "Every market clearing at the same time is a fixed point of a continuous map on a simplex. That is not an analogy."
sources:
  - {title: "Existence of an Equilibrium for a Competitive Economy", author: "Kenneth J. Arrow & Gerard Debreu", year: 1954, type: paper, url: "https://doi.org/10.2307/1907353"}
  - {title: "Arrow–Debreu model", type: wiki, url: "https://en.wikipedia.org/wiki/Arrow%E2%80%93Debreu_model"}
  - {title: "Competitive equilibrium — existence via fixed-point theorems", type: wiki, url: "https://en.wikipedia.org/wiki/Competitive_equilibrium"}
dates: {written: 2026-09-19, event: 1954-07-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember Brouwer? It is why economists believe prices exist

When you met fixed-point theorems, Brouwer looked like a curiosity: any continuous map from a closed ball to itself leaves some point exactly where it was. Stir your coffee and a molecule ends up where it started.

Here is what economists did with it. Take an economy with $n$ goods, every household optimising, every firm optimising. At a given price vector some markets have excess demand and others excess supply. The question of whether *some* price vector clears all of them simultaneously is not obviously answerable — it is $n$ equations in $n$ unknowns, and counting equations proves nothing about existence.

So turn it into a map. Raise the price of anything in excess demand, lower the price of anything in excess supply, renormalise. Equilibrium is precisely a price vector this map leaves alone: a fixed point. Prices scale freely, so you can live on a simplex — compact and convex — and if the map is continuous, Brouwer hands you existence.

Arrow and Debreu did it properly in 1954, with Kakutani because demand is a correspondence, not a function.

## Rigor

Let $z(p)$ be excess demand, homogeneous of degree zero (so normalise $p$ to the simplex $\Delta$), continuous, and satisfying **Walras's law** $p\cdot z(p)=0$ — the value of what everyone wants equals the value of what everyone has.

Define the Gale–Nikaido map

$$f_i(p)=\frac{p_i+\max\{0,z_i(p)\}}{1+\sum_{j}\max\{0,z_j(p)\}} .$$

This is continuous and maps $\Delta$ into $\Delta$, so Brouwer gives $p^*$ with $f(p^*)=p^*$. Write $S=\sum_j\max\{0,z_j(p^*)\}$; the fixed-point condition is $p_i^*S=\max\{0,z_i(p^*)\}$. Multiply by $z_i(p^*)$ and sum: the left side is $S\,(p^*\cdot z(p^*))=0$ by Walras's law, while the right side is $\sum_i z_i\max\{0,z_i\}$, a sum of non-negative terms. So every term is zero, giving $z(p^*)\le 0$: all markets clear.

The coffee-stirring theorem, doing the work of an entire theory of prices. Convexity of preferences is what buys continuity; when it fails, you need Kakutani.

## Recall
type: mcq
Q: Which property of the price simplex makes Brouwer's theorem applicable?
- [x] It is compact and convex, and prices can be normalised onto it because excess demand is homogeneous of degree zero. — only relative prices matter, which is exactly what lets you shrink the domain.
- [ ] It is open, so the map has room to move points around. — Brouwer needs a compact convex set; open sets can fail badly.
- [ ] It is a vector space, so linear algebra applies. — the simplex is not a subspace, and linearity is not what is used.
- [ ] It is finite, so the map has finitely many candidate fixed points. — the simplex is a continuum; finiteness plays no role.
