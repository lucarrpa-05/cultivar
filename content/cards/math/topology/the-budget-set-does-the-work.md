---
id: math.topology.compactness.the-budget-set-does-the-work
topic: math.topology.compactness
topics: [econ.micro.general-equilibrium, econ.micro.consumer-choice]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, practical]
tags: [budget-set, extreme-value-theorem, demand-existence, positive-prices]
hook: "Before anyone proves markets clear, someone has to prove that a consumer has a demand at all. That is a compactness argument."
callback: {from: math.topology.compactness, to: econ.micro.general-equilibrium}
sources:
  - {title: "Extreme value theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Extreme_value_theorem"}
  - {title: "General equilibrium theory", type: wiki, url: "https://en.wikipedia.org/wiki/General_equilibrium_theory"}
  - {title: "Arrow–Debreu model", type: wiki, url: "https://en.wikipedia.org/wiki/Arrow%E2%80%93Debreu_model"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember the budget set? It is compact, and that is the point

Remember that continuous functions on a compact space attain their maximum, and that the proof was pure open covers. Microeconomics uses that theorem on the first page and does not say so.

The consumer's problem is: maximise utility over the bundles you can afford. Textbooks jump straight to the tangency condition, but the tangency condition describes a solution that has been assumed to exist. Why does it exist? Because the budget set — everything non-negative costing no more than your wealth — is closed and bounded whenever every price is strictly positive. Closed and bounded in $\mathbb{R}^n$ means compact. Utility is continuous. So a maximum is attained, and "demand" is a well-defined thing rather than a hopeful notation.

Now watch what happens if one price is zero. The budget set becomes unbounded — you can take unlimited amounts of the free good — and if utility is increasing, no maximum exists. Demand is undefined.

That is why general equilibrium theory insists on strictly positive prices, and why the existence proof has to handle the boundary of the price simplex with care. The assumption is not fussiness; it is what keeps the set compact.

## Rigor

Fix prices $p \in \mathbb{R}^n_{++}$ and wealth $w>0$. The **budget set** is
$$B(p,w)=\{x \in \mathbb{R}^n_{+} : p \cdot x \le w\}.$$
It is closed (an intersection of closed half-spaces) and bounded, since $x_i \le w/p_i$ for each $i$. By Heine–Borel it is compact, and it is nonempty and convex.

With $u$ continuous, the extreme value theorem gives a maximiser, so the demand correspondence $x(p,w)=\arg\max_{B(p,w)} u$ is nonempty; convexity of $B$ plus quasi-concavity of $u$ makes its values convex; Berge's maximum theorem makes it upper hemicontinuous in $(p,w)$.

Those are exactly the three hypotheses Kakutani needs downstream, when Arrow and Debreu (1954) run a fixed-point argument on aggregate excess demand. Existence of equilibrium is one compactness argument stacked on another.

If some $p_i = 0$ then $B(p,w)$ is unbounded and, with monotone preferences, the supremum is not attained. Compactness fails, and so does everything built on it.

## Recall
type: mcq
Q: Why does a consumer's demand exist at strictly positive prices?
- [x] The budget set is closed and bounded, so compact, and continuous utility attains a maximum on it — the extreme value theorem.
- [ ] Because preferences are convex — convexity makes the demand set convex and helps uniqueness, but it never produces a maximiser on its own.
- [ ] Because the budget constraint holds with equality — that follows from monotonicity once a solution exists; it does not create one.
