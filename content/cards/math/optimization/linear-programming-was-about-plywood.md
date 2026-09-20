---
id: math.optimization.linear-programming.linear-programming-was-about-plywood
topic: math.optimization.linear-programming
format: story
difficulty: 2
language: en
weight: light
angles: [origin, history]
tags: [kantorovich, plywood, soviet-planning, simplex, nobel-1975]
hook: "A plywood trust in Leningrad asked a young mathematician how to assign work to machines. The answer was linear programming."
sources:
  - {title: "Leonid Kantorovich", type: wiki, url: "https://en.wikipedia.org/wiki/Leonid_Kantorovich"}
  - {title: "Linear programming", type: wiki, url: "https://en.wikipedia.org/wiki/Linear_programming"}
  - {title: "George Dantzig", type: wiki, url: "https://en.wikipedia.org/wiki/George_Dantzig"}
dates: {written: 2026-09-19, event: 1939-01-01}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Linear programming was invented to cut plywood

In 1939 a plywood trust in Leningrad brought Leonid Kantorovich a dull question. They had several machines, each better at some jobs than others, and a production target. How should the work be split?

Kantorovich noticed that the question was not about plywood. Maximise a linear quantity, subject to linear constraints, over non-negative variables: transport, steel, crop rotation and railway scheduling are all the same problem. He wrote it up that year in *The Mathematical Method of Production Planning and Organization*.

Then it sat. The method produces, alongside the plan, a set of implicit prices for scarce resources — which was awkward doctrine in a planned economy that located value in labour. The work circulated slowly.

George Dantzig hit the same class of problems at the US Air Force and produced the simplex algorithm in 1947, unaware of the Russian work. Kantorovich and Tjalling Koopmans shared the 1975 Nobel Memorial Prize in economics for the theory of optimal allocation of resources.

## Recall
type: reveal
Q: What made Kantorovich's plywood answer more than an answer about plywood?
A: The structure. Maximising a linear objective under linear constraints describes transport, scheduling, blending and planning problems alike, and the solution comes with shadow prices for every scarce resource.
