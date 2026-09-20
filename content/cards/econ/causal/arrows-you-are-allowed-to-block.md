---
id: econ.causal.dags.arrows-you-are-allowed-to-block
topic: econ.causal.dags
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, tool]
tags: [dags, d-separation, backdoor-criterion, pearl, confounding]
callback: {from: math.combinatorics.graph-theory, to: econ.causal.dags}
hook: "You already know what a path in a directed graph is. Add one rule about arrowheads and you get a recipe for what to control for."
sources:
  - {title: "Causal inference in statistics: An overview", author: "Judea Pearl", year: 2009, type: paper, url: "https://doi.org/10.1214/09-SS057"}
  - {title: "Causality: Models, Reasoning, and Inference, 2nd ed.", author: "Judea Pearl", year: 2009, type: book, url: "https://en.wikipedia.org/wiki/Causality_(book)"}
  - {title: "Causal model — d-separation and the back-door criterion", type: wiki, url: "https://en.wikipedia.org/wiki/Causal_model"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The graph theory you already know, with the arrows meaning something

A directed acyclic graph was a combinatorial object: vertices, arrows, no cycles, and a path is a sequence of edges you walk without caring which way the arrowheads point. Judea Pearl kept all of that and added one interpretation — an arrow means "this one listens to that one" — and suddenly the graph answers a question no statistics course could: which variables am I allowed to put in the regression?

Information flows along paths, in either direction, with one exception. At a collider, where two arrowheads meet, the path is blocked *until* you condition on that vertex, at which point it opens. Ordinary vertices work the other way: open, until you condition on them.

So "controlling for confounders" becomes a graph algorithm. List the paths from treatment to outcome that begin with an arrow *into* the treatment — the back doors. Block every one of them with your controls, without opening a collider on the way. If you can, the association you measure is the causal effect.

Which is a stronger claim than it sounds, because it tells you when no set of controls works at all.

## Rigor

A path $p$ is **d-separated** by a set $Z$ if either (i) $p$ contains a chain $a\to m\to b$ or a fork $a\leftarrow m\to b$ with $m\in Z$, or (ii) $p$ contains a collider $a\to m\leftarrow b$ with $m\notin Z$ and no descendant of $m$ in $Z$. If every path from $X$ to $Y$ is d-separated by $Z$, the graph's factorisation forces $X\perp\!\!\!\perp Y\mid Z$.

**Back-door criterion.** $Z$ identifies the effect of $X$ on $Y$ if no node in $Z$ is a descendant of $X$, and $Z$ d-separates every path from $X$ to $Y$ that starts with an arrow into $X$. Then

$$P(y\mid do(x))=\sum_{z}P(y\mid x,z)\,P(z),$$

which is estimable from observed data: a *do* on the left, no *do* on the right.

The walk-every-path habit from graph theory is exactly the work here. And the criterion can fail for every $Z$ — no adjustment identifies the effect — which is when you go looking for an instrument instead.

## Recall
type: mcq
Q: A path from treatment to outcome passes through a collider that you have not conditioned on. Is it open?
- [x] No — colliders block a path by default, and conditioning on the collider (or a descendant) is what opens it. — the exact reverse of chains and forks.
- [ ] Yes — any path that exists carries association until you block it with a control. — true for chains and forks, false at arrowheads that meet.
- [ ] Only if the collider is caused by the treatment. — descendants of the treatment are excluded from the adjustment set for a different reason.
- [ ] It depends on the sample size. — d-separation is a property of the graph, not of the data.
