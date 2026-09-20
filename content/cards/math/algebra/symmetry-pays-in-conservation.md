---
id: math.algebra.groups-basics.symmetry-pays-in-conservation
topic: math.algebra.groups-basics
topics: [physics.mechanics.symmetry-noether]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, human]
tags: [groups, noether-theorem, energy, lagrangian, continuous-symmetry]
hook: "Energy conservation is not a law of nature. It is a consequence of the fact that the laws are the same today as yesterday."
callback: {from: math.algebra.groups-basics, to: physics.mechanics.symmetry-noether}
related: [physics.mechanics.symmetry-noether.the-group-that-pays-in-conservation-laws]
sources:
  - {title: "Noether's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Noether%27s_theorem"}
  - {title: "Emmy Noether", type: wiki, url: "https://en.wikipedia.org/wiki/Emmy_Noether"}
dates: {written: 2026-09-19, event: 1918-01-01}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Swing example changed to pumping so the body matches the time-dependent Lagrangian in the rigor."}
---

# Energy is conserved because time has a symmetry, and only then

Remember the square and its eight moves: a group is a set of transformations you can chain and undo. Emmy Noether asked what a group buys you when the moves form a continuous dial rather than a finite list, and her answer reversed the direction of an entire subject.

Conservation of energy is usually taught as a law, a thing the universe simply does. Noether's 1918 theorem makes it a consequence. If the laws governing a system are the same at every moment — if shifting the clock changes nothing — then a particular combination of its variables cannot change. Energy is the receipt for that indifference, not an axiom.

Which means it can be revoked. Pump a swing — stand, squat, stand — and you are changing the system's own rules as time passes. The swing's energy climbs, and nothing is violated, because the symmetry you were being paid for is gone.

She proved it at Göttingen while helping Klein and Hilbert with general relativity, in the years when the faculty would not let her hold a paid post.

## Rigor

For a Lagrangian $L(q,\dot q,t)$, define the energy function
$$H=\sum_i \dot q_i\frac{\partial L}{\partial\dot q_i}-L .$$
Differentiate along a solution of the Euler–Lagrange equations $\frac{d}{dt}\frac{\partial L}{\partial\dot q_i}=\frac{\partial L}{\partial q_i}$. Every term cancels in pairs except one:
$$\frac{dH}{dt}=-\frac{\partial L}{\partial t}.$$

So $H$ is conserved exactly when $L$ has no explicit time dependence — that is, exactly when the one-parameter group of time translations $t\mapsto t+\varepsilon$ is a symmetry. The swing whose effective length you keep changing has $\partial L/\partial t\neq 0$, and its energy changes at precisely that rate.

Noether's theorem is the general statement: for any one-parameter group of transformations leaving the action invariant, with $\delta q_i$ the infinitesimal displacement it generates,
$$\frac{d}{dt}\left(\sum_i \frac{\partial L}{\partial\dot q_i}\,\delta q_i\right)=0 .$$
Constant $\delta q_i$ gives momentum, rotations give angular momentum, and the time case gives $H$ above. Finite groups get nothing: with no dial to differentiate, there is no current to conserve.

## Recall
type: mcq
Q: A pendulum's string is being slowly shortened by hand. Is its energy conserved, and what does Noether say?
- [x] Not conserved, and nothing is violated — the Lagrangian depends explicitly on time, so time translation is not a symmetry and there is no conserved $H$.
- [ ] Conserved, because energy always is — energy conservation is a corollary of a symmetry, and it lapses when the symmetry does.
- [ ] Not conserved, because the theorem only applies to closed systems — the theorem applies to any invariant action; "closed" is a symptom, not the hypothesis.
