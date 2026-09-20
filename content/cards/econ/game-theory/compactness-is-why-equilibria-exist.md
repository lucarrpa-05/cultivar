---
id: econ.game-theory.dominance-nash.compactness-is-why-equilibria-exist
topic: econ.game-theory.dominance-nash
format: callback
difficulty: 4
language: en
weight: heavy
angles: [connection, beautiful]
tags: [compactness, kakutani, fixed-point, existence, weierstrass]
prerequisites: [econ.game-theory.what-is-a-game, math.topology.compactness]
callback: {from: math.topology.compactness, to: econ.game-theory.dominance-nash}
related: [econ.game-theory.dominance-nash.a-two-page-note]
hook: "Every existence theorem in economics is a compactness argument wearing a coat. Nash's is the cleanest one to undress."
sources:
  - {title: "Kakutani fixed-point theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Kakutani_fixed-point_theorem"}
  - {title: "Nash equilibrium", type: wiki, url: "https://en.wikipedia.org/wiki/Nash_equilibrium"}
  - {title: "Extreme value theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Extreme_value_theorem"}
dates: {written: 2026-09-19}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember finite subcovers? That is why equilibria exist

Remember compactness — the property that lets you swap infinitely many local guarantees for finitely many? You have already done the hard half of every existence theorem in economics, including the one Nash is famous for.

The argument has a fixed shape and it never varies. You want to show that *something* exists: an equilibrium, a price vector clearing every market, a stable matching. You build a map sending each candidate to the set of candidates that answer it best. A point mapping to itself is the object you are hunting. Then you invoke a fixed-point theorem — and every fixed-point theorem is a compactness argument in disguise.

For Nash the space is a product of simplices: closed and bounded in finite dimensions, hence compact by Heine–Borel, and convex because probability distributions mix. Those two adjectives, plus continuity of payoffs, are the entire hypothesis list.

Drop any one of them and the theorem dies. It is worth seeing which corpse you get.

## Rigor

**Kakutani (1941).** Let $K\subseteq\mathbb{R}^n$ be non-empty, compact and convex, and let $F:K\to 2^{K}$ have non-empty convex values and closed graph. Then some $x\in K$ satisfies $x\in F(x)$.

For a finite game take $K=\Sigma=\prod_i\Delta(S_i)$ and $F=B$, the best-response correspondence. Watch each hypothesis work.

*Compactness.* $B_i(\sigma)=\arg\max u_i(\cdot,\sigma_{-i})$ is non-empty only because a continuous function on a compact set attains its supremum — Weierstrass, which is the extreme value theorem, which is the finite-subcover argument you already know. Take a non-compact strategy set and the maximum can simply fail to exist: on $S_i=(0,1)$ with $u_i(s_i)=s_i$ there is no best response, and no equilibrium.

*Convexity.* Needed twice. For $K$, or Kakutani does not apply; and for the values $B_i(\sigma)$, which are convex because $u_i$ is linear in $\sigma_i$. Without convex values a correspondence can push every point off itself: $x\mapsto\{-x\}$ on $[-1,1]$ has a fixed point, but $x\mapsto\{-1,1\}\setminus\{\operatorname{sgn} x\}$ does not.

*Closed graph.* Continuity of $u_i$ supplies it. Remove it and best responses jump across the diagonal without ever landing on it.

Glicksberg extended the same three adjectives to compact metric strategy spaces. Every existence proof in economics is this paragraph in a different costume.

## Recall
type: mcq
Q: Which hypothesis of Kakutani's theorem guarantees a best response exists at all?
- [x] Compactness of the strategy space — a continuous payoff attains its maximum there, by the finite-subcover argument.
- [ ] Convexity of the values — that stops the fixed point being rotated away; it does not produce a maximiser.
- [ ] The closed graph — it rules out jumps, but a supremum can fail to be attained on a non-compact set even with continuous payoffs.
