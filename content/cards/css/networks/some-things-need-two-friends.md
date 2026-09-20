---
id: css.networks.contagion.some-things-need-two-friends
topic: css.networks.contagion
format: idea
difficulty: 2
language: en
weight: heavy
angles: [connection, paradox, tool]
tags: [complex-contagion, centola-macy, long-ties, thresholds, diffusion]
hook: "A virus needs one carrier. A behaviour often needs two, and that one change reverses everything you know about networks."
sources:
  - {title: "Complex Contagions and the Weakness of Long Ties", author: "Damon Centola and Michael Macy", year: 2007, type: paper, url: "https://doi.org/10.1086/521848"}
  - {title: "The Spread of Behavior in an Online Social Network Experiment", author: "Damon Centola", year: 2010, type: paper, url: "https://doi.org/10.1126/science.1185231"}
  - {title: "Complex contagion", type: wiki, url: "https://en.wikipedia.org/wiki/Complex_contagion"}
dates: {written: 2026-09-19, event: 2007-11-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Some things need two friends, and that changes the whole picture

Small-world theory has a clean moral: a few long-range links collapse distance, so anything that spreads, spreads fast. It is right about measles. It is wrong about a lot of the things social scientists actually care about.

The difference is how many exposures you need. Catching flu takes one contact. Quitting a job, joining a protest, adopting an expensive or embarrassing or risky practice usually takes several independent people you trust doing it first — you want confirmation, or social cover, or just proof it is not ridiculous.

Centola and Macy called that a **complex contagion**, and showed that the long-range shortcuts stop helping. A shortcut delivers one exposure to a stranger, and one is not enough. What a complex contagion needs is *wide bridges*: clusters overlapping enough that several of your contacts get infected together. Clustering, which slows a virus down, is exactly what lets a behaviour cross.

Centola tested it directly in 2010, building artificial health-forum networks and randomly assigning people to one structure or the other.

## Rigor

Give each node a threshold $\theta$: it adopts when at least $\theta$ of its neighbours have adopted (Granovetter's rule). For $\theta=1$ this is standard contagion and the relevant statistic is path length — one infected neighbour suffices, so shortcuts dominate and Watts–Strogatz applies.

For $\theta\ge 2$ the object that matters is no longer a path but a **bridge width**: the number of ties connecting one neighbourhood to another. A single edge between two clusters can transmit a simple contagion and can never transmit a $\theta=2$ contagion, because the node on the far side only ever receives one exposure. Adoption crosses only where at least $\theta$ ties cross together.

Randomly rewiring a lattice therefore has opposite effects on the two processes: it shortens paths (good for simple contagion) while converting wide bridges into single long ties (fatal for complex contagion). Centola and Macy found a non-monotone relationship — modest rewiring can help by removing redundancy, then further rewiring kills propagation.

The 2010 experiment matches. Participants were randomly assigned to a clustered lattice or a random network with identical degree; the health behaviour spread further and faster in the clustered one.

So "small world" is a claim about information, not about behaviour.

## Recall
type: mcq
Q: Why do long-range shortcuts fail to spread a complex contagion?
- [x] A single long tie delivers only one exposure, and a complex contagion needs several — so what matters is how many ties cross between clusters, not how short the path is.
- [ ] Long ties are weak, and weak ties carry less information — tie strength is a separate issue; the problem here is the count of independent exposures.
- [ ] Complex contagions spread slower everywhere — in clustered networks they spread faster than in random ones with the same degree.
