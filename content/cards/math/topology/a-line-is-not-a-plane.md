---
id: math.topology.homology-intro.a-line-is-not-a-plane
topic: math.topology.homology-intro
topics: [math.foundations.cardinality]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [history, paradox]
tags: [invariance-of-domain, brouwer, space-filling-curve, dimension]
hook: "Cantor found a bijection from a line to a square, Peano a continuous surjection. Proving dimension is real took until 1911."
related: [math.topology.continuity-homeomorphism.i-see-it-but-i-do-not-believe-it]
sources:
  - {title: "Invariance of domain", type: wiki, url: "https://en.wikipedia.org/wiki/Invariance_of_domain"}
  - {title: "Space-filling curve", type: wiki, url: "https://en.wikipedia.org/wiki/Space-filling_curve"}
  - {title: "Georg Cantor", type: wiki, url: "https://en.wikipedia.org/wiki/Georg_Cantor"}
dates: {written: 2026-09-19, event: 1911-01-01}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# It took until 1911 to prove a line is not a plane

That $\mathbb{R}$ and $\mathbb{R}^2$ are different is not a theorem anybody expected to need. Then the nineteenth century took away every easy reason to believe it.

Counting failed first: in 1877 Cantor sent Dedekind a bijection between the unit interval and the unit square. Same number of points. Continuity failed next: in 1890 Peano built a *continuous* map from $[0,1]$ onto the whole square, surjective, hitting every point. So "there are more points in the plane" is false, and "you cannot continuously cover a plane with a line" is false too.

What is left is homeomorphism — a bijection continuous in both directions — and for $n=1$ you can still argue by hand: delete a point from $\mathbb{R}$ and it falls apart, delete one from $\mathbb{R}^2$ and it does not. That trick dies at $n=2$ versus $n=3$, where deleting points leaves both connected.

Brouwer settled it in 1911 with genuinely new machinery, and the machinery is the whole reason algebraic topology exists.

## Rigor

**Theorem (Brouwer).** If $U \subseteq \mathbb{R}^n$ is open and $f : U \to \mathbb{R}^n$ is continuous and injective, then $f(U)$ is open and $f$ is a homeomorphism onto it — *invariance of domain*. Consequently $\mathbb{R}^n\cong\mathbb{R}^m$ forces $n=m$.

The dimension statement follows from a computation that the cut-point trick cannot reach. A homeomorphism $\mathbb{R}^n\to\mathbb{R}^m$ restricts to $\mathbb{R}^n\setminus\{0\}\to\mathbb{R}^m\setminus\{pt\}$. Each punctured space deformation retracts onto a sphere:
$$\mathbb{R}^n\setminus\{0\}\simeq S^{n-1},\qquad \tilde H_k(S^{n-1})=\begin{cases}\mathbb{Z} & k=n-1\\ 0 & \text{otherwise,}\end{cases}$$
for $n \ge 2$. Reduced homology is a homotopy invariant, so the two lists of groups must agree, which happens only when $n=m$.

Why the Peano curve is no counterexample: it is surjective but not injective, so it is not a homeomorphism, and nothing in it contradicts invariance of domain. Why Cantor's bijection is not: it is injective but wildly discontinuous.

## Recall
type: mcq
Q: Why do Cantor's bijection and Peano's curve not contradict the fact that $\mathbb{R}\not\cong\mathbb{R}^2$?
- [x] One is a bijection that is not continuous, the other continuous but not injective — a homeomorphism needs both at once, plus a continuous inverse.
- [ ] Both are only defined on the unit interval, not on all of $\mathbb{R}$ — the restriction is irrelevant; open subsets would inherit any homeomorphism.
- [ ] Neither map is surjective — Peano's curve is surjective onto the square, and Cantor's map is a bijection, so surjectivity is not what fails.
