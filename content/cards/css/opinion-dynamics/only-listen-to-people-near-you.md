---
id: css.opinion-dynamics.bounded-confidence.only-listen-to-people-near-you
topic: css.opinion-dynamics.bounded-confidence
format: idea
difficulty: 2
language: en
weight: medium
angles: [connection, paradox, tool]
tags: [hegselmann-krause, bounded-confidence, fragmentation, deffuant, thresholds]
hook: "Add one rule to a model that always reaches consensus — ignore people too far from you — and consensus stops being guaranteed."
sources:
  - {title: "Opinion Dynamics and Bounded Confidence: Models, Analysis and Simulation", author: "Rainer Hegselmann and Ulrich Krause", year: 2002, type: paper, url: "https://www.jasss.org/5/3/2.html"}
  - {title: "Consensus Strikes Back in the Hegselmann-Krause Model of Continuous Opinion Dynamics Under Bounded Confidence", author: "Jan Lorenz", year: 2006, type: paper, url: "https://www.jasss.org/9/1/8.html"}
dates: {written: 2026-09-19, event: 2002-06-30}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Lorenz's first bifurcation is into three clusters, not two camps; rewritten with his own epsilon values (0.3 consensus, 0.19 split)."}
author: author-css-1
---

# Ignore anyone too far from you, and consensus stops being guaranteed

DeGroot's averagers always converge, because everyone keeps listening to everyone. Real people do not. Past some distance, an opinion stops registering as a position and starts registering as evidence that the speaker is not worth hearing.

Hegselmann and Krause added exactly that in 2002, and nothing else. Each agent has a confidence bound $\varepsilon$. Each round, it averages the opinions within $\varepsilon$ of its own and ignores everything outside. That is the entire modification.

The behaviour changes completely. With a wide bound you get consensus, as before. Narrow it and the population splits into a few stable clusters that no longer hear each other — polarisation, then fragmentation, with the number of surviving clusters growing roughly as $1/(2\varepsilon)$.

Then it gets strange. Lorenz showed in 2006 that the transition is not monotone: from consensus at $\varepsilon=0.3$ the population first breaks into three clusters at $\varepsilon=0.19$, and then, lowering $\varepsilon$ a little further, consensus strikes back for a narrow window before the clusters return.

## Rigor

Start opinions uniformly on $[0,1]$. The update is
$$x_i(t+1)=\frac{1}{|N_i(t)|}\sum_{j\in N_i(t)}x_j(t),\qquad N_i(t)=\{j:\ |x_i(t)-x_j(t)|\le\varepsilon\}.$$

This is still an averaging map, but the weight matrix now depends on the state, and it is **discontinuous**: an agent leaves your neighbourhood the moment the gap crosses $\varepsilon$. The contraction argument that guarantees DeGroot consensus dies here, and with it uniqueness of the limit. Simulations remain the main tool; general analytic results are hard.

What does survive: opinions stay in the convex hull of the initial ones, order is preserved (if $x_i\le x_j$ then $x_i(t)\le x_j(t)$ for all $t$), and the dynamics terminates in finitely many clusters separated by gaps greater than $\varepsilon$. Rough rule of thumb from simulation: consensus for $\varepsilon$ above roughly $0.2$ on the unit interval, clustering below.

Deffuant and Weisbuch's variant updates one random pair at a time with a partial step $\mu$ rather than everybody at once, and reaches similar cluster structure by a slower route.

One caution before you reach for it as an explanation of real polarisation: the model produces clusters that separate and then sit still. Measured polarisation usually involves groups that keep interacting and dislike each other more for it.

## Recall
type: mcq
Q: Why does the DeGroot convergence proof fail for bounded confidence?
- [x] The map is discontinuous — weights depend on the current state and jump when a gap crosses $\varepsilon$, so the update is no longer a contraction.
- [ ] Opinions can leave the initial range — they cannot; the update stays inside the convex hull of the starting opinions.
- [ ] The matrix stops being row-stochastic — each agent still averages, so the rows still sum to one.
