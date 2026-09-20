---
id: math.topology.compactness.the-delta-that-stops-shrinking
topic: math.topology.compactness
topics: [math.analysis.continuity]
format: series
difficulty: 3
language: en
weight: heavy
angles: [tool, connection]
tags: [uniform-continuity, lebesgue-number, local-to-global, minimum]
hook: "A minimum of infinitely many positive numbers can be zero. A minimum of finitely many cannot. That gap is the whole subject."
series: {id: math.topology.taming-infinity, index: 1, total: 4, title: "Taming infinity"}
related: [math.topology.compactness.finitely-many-checks]
sources:
  - {title: "Lebesgue's number lemma", type: wiki, url: "https://en.wikipedia.org/wiki/Lebesgue%27s_number_lemma"}
  - {title: "Uniform continuity", type: wiki, url: "https://en.wikipedia.org/wiki/Uniform_continuity"}
  - {title: "Topology, 2nd ed., §26–27", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The delta that refuses to shrink

$1/x$ is continuous on $(0,1]$. It is not uniformly continuous there, and you can feel why: near $0.5$ a tolerance of $\delta = 0.01$ is plenty, near $0.001$ it is hopeless. Each point gets its own $\delta$, and the $\delta$s shrink towards zero as you walk left. There is no single $\delta$ that works everywhere, because the infimum of all of them is $0$.

Now put the same function on $[1,2]$, or any continuous function on $[0,1]$. Suddenly there always is one. Nothing changed about what continuity means. What changed is the space.

Compactness is the exact reason. Every point still hands you a private $\delta$; compactness lets you keep finitely many of them and take the minimum. A minimum of finitely many positive numbers is positive. That one sentence — infinitely many local promises, collapsed into one global promise — is the machine, and it has a name: the Lebesgue number lemma.

## Rigor

**Lebesgue number lemma.** Let $(X,d)$ be a compact metric space and $\mathcal{A}$ an open cover. Then there is $\delta>0$ (a *Lebesgue number*) such that every subset of $X$ of diameter less than $\delta$ lies inside a single member of $\mathcal{A}$.

Sketch: for each $x$ pick $\varepsilon_x$ with $B(x,2\varepsilon_x)$ inside some member; the balls $B(x,\varepsilon_x)$ cover $X$; finitely many suffice, say with radii $\varepsilon_1,\dots,\varepsilon_n$; take $\delta=\min_i \varepsilon_i > 0$. The minimum of $n$ positive numbers is where compactness is spent.

**Uniform continuity.** Let $f : X \to Y$ be continuous, $X$ compact metric. Given $\varepsilon>0$, the balls $B(y,\varepsilon/2)$ cover $Y$, so $\{f^{-1}(B(y,\varepsilon/2))\}$ is an open cover of $X$; let $\delta$ be a Lebesgue number for it. If $d(x_1,x_2)<\delta$ then $\{x_1,x_2\}$ has diameter $<\delta$, so both land in one $B(y,\varepsilon/2)$, so $d(f(x_1),f(x_2))<\varepsilon$. One $\delta$, valid everywhere.

And compactness has a stranger gift: it sometimes hands you the inverse of a map for free. Next episode.

## Recall
type: mcq
Q: Why is every continuous function on $[0,1]$ automatically uniformly continuous?
- [x] Compactness reduces infinitely many local deltas to finitely many, and their minimum is still positive — that minimum is the uniform delta.
- [ ] Because $[0,1]$ is bounded, so the deltas cannot get small — $(0,1]$ is bounded too, and $1/x$ on it has deltas shrinking to zero.
- [ ] Because continuous functions on $[0,1]$ are differentiable — most are not; the Weierstrass function is continuous and nowhere differentiable, yet still uniformly continuous.
