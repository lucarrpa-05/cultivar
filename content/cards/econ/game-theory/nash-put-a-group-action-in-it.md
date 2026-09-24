---
id: econ.game-theory.dominance-nash.nash-put-a-group-action-in-it
topic: econ.game-theory.dominance-nash
topics: [econ.game-theory.mixed-strategies]
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful, history]
tags: [symmetric-games, group-actions, fixed-points, nash-1951, orbit-stabilizer, chicken]
prerequisites: [math.algebra.group-actions, econ.game-theory.mixed-strategies]
callback: {from: math.algebra.group-actions, to: econ.game-theory.dominance-nash}
context: context:2026-09:abstract-algebra
hook: "Nash's 1951 paper has a group action in it. It is why symmetric games have symmetric equilibria, and why those can end in a crash."
related: [econ.game-theory.dominance-nash.a-two-page-note, econ.game-theory.dominance-nash.compactness-is-why-equilibria-exist]
sources:
  - {title: "Non-Cooperative Games, Annals of Mathematics 54(2)", author: "John Nash", year: 1951, type: paper, url: "https://doi.org/10.2307/1969529"}
  - {title: "Symmetric game", type: wiki, url: "https://en.wikipedia.org/wiki/Symmetric_game"}
  - {title: "Chicken (game)", type: wiki, url: "https://en.wikipedia.org/wiki/Chicken_(game)"}
dates: {written: 2026-09-23, event: 1951-09-01}
author: author-econ-1
reviewed: {by: reviewer-econ-2026-09-23, at: 2026-09-23, verdict: approved}
---

# Remember fixed points of a group action? Nash's 1951 paper runs on one

Remember this week's picture: a group acting on a set splits it into orbits, and some points are fixed by every element. John Nash used exactly that in his 1951 *Annals* paper, on a tip from David Gale.

A game's symmetries, like swapping Chicken's two drivers, form a group acting on strategy profiles. Nash's Theorem 2: every finite game has an equilibrium fixed by the whole group. It is why "look for a symmetric equilibrium first" is safe in finite games.

In Chicken the two pure equilibria (you swerve, I don't; I swerve, you don't) swap under the symmetry, so neither is fixed. The fixed one is mixed, and in it drivers sometimes crash.

## Rigor

First the theorem, then the crash in numbers. Let $G$ be the symmetries of a finite game: permutations of pure strategies that carry each player's strategies onto some player's strategies and preserve payoffs. $G$ acts on mixed profiles $\Sigma$ by linear extension; write $\Sigma^G=\{\sigma: g\sigma=\sigma\ \ \forall g\in G\}$.

**Theorem (Nash, 1951).** Some Nash equilibrium lies in $\Sigma^G$.

*Sketch.* $\Sigma^G$ is non-empty (the profile in which everyone mixes uniformly is fixed by every symmetry), convex and closed, hence a compact convex cell. Nash's continuous map $T:\Sigma\to\Sigma$, whose fixed points are exactly the equilibria, is built from payoffs alone, so it commutes with symmetries: $T(g\sigma)=gT(\sigma)$. If $\sigma\in\Sigma^G$ then $gT(\sigma)=T(g\sigma)=T(\sigma)$, so $T(\Sigma^G)\subseteq\Sigma^G$, and Brouwer gives a fixed point inside $\Sigma^G$.

**Chicken.** Payoffs: both swerve $(0,0)$; swerve against straight $(-1,1)$; both straight $(-10,-10)$. Here $G=\{e,\tau\}$, $\tau$ swapping the players, and $\Sigma^G$ is the diagonal $\{(\sigma,\sigma)\}$. The pure equilibria form one orbit of size $2=|G|/|\mathrm{Stab}|$ with trivial stabiliser, so neither is symmetric. On the diagonal, if the other driver goes straight with probability $p$, swerving pays $-p$ and going straight pays $1-11p$; indifference gives $p=\tfrac1{10}$. They crash with probability $\tfrac1{100}$ and total payoff is $-\tfrac15$, against $0$ in either pure equilibrium. Symmetry is guaranteed; it is not free.

## Recall
type: mcq
Q: In Chicken, why can't a pure equilibrium where one driver swerves and the other doesn't be symmetric?
- [x] Swapping the players sends it to the other pure equilibrium — its orbit has size 2, so the group does not fix it.
- [ ] Symmetric games never have pure equilibria — Chicken has two; they just are not fixed by the swap.
- [ ] Nash's theorem forbids asymmetric equilibria — it guarantees that a symmetric one exists, not that others don't.
