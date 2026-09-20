---
id: math.topology.connectedness.a-space-you-cannot-walk-across
topic: math.topology.connectedness
format: idea
difficulty: 4
language: en
weight: heavy
angles: [paradox, weird]
tags: [topologists-sine-curve, path-connected, closure, limit-oscillation]
hook: "One piece, two points, and no path between them. The gap is infinitely thin and infinitely long."
sources:
  - {title: "Topologist's sine curve", type: wiki, url: "https://en.wikipedia.org/wiki/Topologist%27s_sine_curve"}
  - {title: "Topology, 2nd ed., §24", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
diagram: {file: math/topologists-sine-curve.svg, caption: "The graph of sin(1/x) oscillating faster and faster towards the vertical segment it can never reach.", alt: "A wave whose oscillations compress without limit as they approach a vertical segment on the left edge; the segment is drawn attached but unreachable"}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Fixed a number: between x=0.001 and 0.002 sin(1/x) completes about eighty oscillations, not hundreds of swings."}
---

# A space in one piece you cannot walk across

Draw $y=\sin(1/x)$ for $x>0$. Near zero it oscillates, and the oscillations get faster without bound: between $x=0.001$ and $x=0.002$ the curve completes about eighty full oscillations. Now glue on the vertical segment from $(0,-1)$ to $(0,1)$.

The result is connected. It is one piece, in the precise sense: you cannot split it into two disjoint nonempty open sets, because the segment sits in the closure of the curve — every neighbourhood of a point on it is hit by the wave, infinitely often.

And yet there is no path from a point on the segment to a point on the curve. A path would have to arrive at the segment in finite time, and to do so it would have to complete infinitely many oscillations on the way. Continuity forbids it.

So connected and path connected are genuinely different properties, and this is the space that proves it.

## Rigor

Let $S=\{(x,\sin(1/x)) : 0<x\le 1\}$ and $\bar S = S \cup (\{0\}\times[-1,1])$.

**Connected.** $S$ is a continuous image of $(0,1]$, hence connected. Every point of $\{0\}\times[-1,1]$ is a limit of points of $S$ — for $c \in [-1,1]$ take $x_n \to 0$ with $\sin(1/x_n)=c$ — so $\bar S$ is the closure of $S$, and the closure of a connected set is connected.

**Not path connected.** Suppose $\gamma : [0,1] \to \bar S$ is continuous with $\gamma(0)=(0,0)$ and $\gamma(1) \in S$. The set $\gamma^{-1}(\{0\}\times[-1,1])$ is closed; let $t_0$ be its supremum, so $\gamma(t)\in S$ for $t>t_0$ and $\gamma(t_0)=(0,c)$. Write $\gamma(t)=(x(t),\sin(1/x(t)))$ for $t>t_0$. On $(t_0, t_0+\delta]$ the function $x$ is continuous with $x(t_0^+)\to 0$, so by the intermediate value theorem it takes every small positive value, and we can pick $t_n \downarrow t_0$ with $\sin(1/x(t_n))$ alternating between $+1$ and $-1$. Then $\gamma(t_n)$ has no limit, contradicting continuity at $t_0$.

Connected does not imply path connected. The converse does hold: a path connected space is connected.

## Recall
type: mcq
Q: What does the topologist's sine curve demonstrate?
- [x] Connected does not imply path connected — the closure of a connected set stays connected, but a path onto the limit segment would need infinitely many oscillations in finite time.
- [ ] Path connected does not imply connected — that implication is always true, since $[0,1]$ is connected and continuous images of connected spaces are.
- [ ] A closure can fail to be connected — the closure of a connected set is always connected; that is exactly what makes this space one piece.
