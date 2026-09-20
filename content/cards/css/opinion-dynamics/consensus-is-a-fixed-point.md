---
id: css.opinion-dynamics.degroot.consensus-is-a-fixed-point
topic: css.opinion-dynamics.degroot
format: callback
difficulty: 4
language: en
weight: heavy
angles: [connection, beautiful]
tags: [fixed-points, banach, contraction, consensus, simplex]
hook: "Agreement is a point a map doesn't move. That sentence is a theorem, and it comes with a rate."
callback: {from: math.topology.fixed-points, to: css.opinion-dynamics.degroot}
related: [css.opinion-dynamics.degroot.everyone-averages-someone-wins]
sources:
  - {title: "Reaching a Consensus", author: "Morris H. DeGroot", year: 1974, type: paper, url: "https://doi.org/10.1080/01621459.1974.10480137"}
  - {title: "Banach fixed-point theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Banach_fixed-point_theorem"}
  - {title: "Brouwer fixed-point theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Brouwer_fixed-point_theorem"}
dates: {written: 2026-09-19}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Remember fixed points? Agreement is one of them

A fixed point is a place the map leaves alone: apply $f$, get the same point back. You met it as a topological curiosity — Brouwer's theorem, a continuous map of a disc to itself, some point does not move, and the proof has nothing to do with computing anything.

Opinions give it a job. The state of a society is a vector of numbers, one per person. Updating everyone's opinion is a map from that vector space to itself. A state that the update leaves unchanged is, by definition, a state where nobody wants to revise — consensus, or a stalemate.

So "will they agree?" becomes "does this map have a fixed point, and do the iterates find it?" Those are two different questions, and the second one is where the interesting mathematics is. Brouwer hands you existence and nothing else: no uniqueness, no way to get there, no rate. Averaging is better behaved than a general continuous map, and that is exactly why it converges.

## Rigor

Existence is cheap. The update $p\mapsto Tp$ with $T$ row-stochastic maps the compact convex set $[\min p_i(0),\max p_i(0)]^n$ into itself continuously, so Brouwer applies. And every consensus vector $c\mathbf{1}$ is fixed, since $T\mathbf{1}=\mathbf{1}$: the fixed set is at least a line.

Convergence needs more. Use the spread $\Delta(p)=\max_i p_i-\min_i p_i$ as a metric on opinions modulo consensus. If every entry of $T$ is at least $\delta>0$, then for any $i$,
$$(Tp)_i=\sum_j T_{ij}p_j \in [\min p + \delta\,\Delta,\ \max p - \delta\,\Delta],$$
so $\Delta(Tp)\le(1-2\delta)\Delta(p)$. The map is a contraction with modulus $1-2\delta$, and Banach gives a unique fixed point in the quotient plus geometric convergence — Brouwer's existence upgraded to a rate.

When $T$ is not strictly positive, the same argument runs on $T^{k}$ for some $k$ making every path length reachable; that is exactly the strong-connectivity-plus-aperiodicity hypothesis, and the contraction factor becomes $1-\lambda_2$, the spectral gap. Slow mixing is a society with near-separate communities.

Bounded-confidence models break this on purpose: the map is discontinuous, because a neighbour drops out of your average the instant they get too far away. No contraction, no consensus theorem, and several fixed points.

## Recall
type: mcq
Q: What does Brouwer's theorem give you about opinion dynamics, and what does it not?
- [x] Existence only — a fixed point exists on the compact convex state space, but uniqueness and convergence need the contraction argument.
- [ ] Both existence and convergence — Brouwer says nothing about iterates reaching the fixed point; continuous maps can cycle forever.
- [ ] Neither, since the state space is not compact — opinions stay inside the initial range, which is compact and convex.
