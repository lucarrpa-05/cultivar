---
id: css.networks.homophily.the-job-came-from-someone-you-barely-see
topic: css.networks.homophily
format: idea
difficulty: 2
language: en
weight: heavy
angles: [practical, numbers, connection]
tags: [granovetter, weak-ties, bridges, homophily, job-search]
hook: "Granovetter asked people how they found their job. Only one in six heard it from someone they saw often."
sources:
  - {title: "The Strength of Weak Ties", author: "Mark S. Granovetter", year: 1973, type: paper, url: "https://doi.org/10.1086/225469"}
  - {title: "A causal test of the strength of weak ties", author: "Rajkumar, Saint-Jacques, Bojinov, Brynjolfsson, Aral", year: 2022, type: paper, url: "https://doi.org/10.1126/science.abl4476"}
  - {title: "Interpersonal ties", type: wiki, url: "https://en.wikipedia.org/wiki/Interpersonal_ties"}
dates: {written: 2026-09-19, event: 1973-05-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# The job came from someone you barely see

Mark Granovetter surveyed 282 professional and managerial workers in Newton, Massachusetts about how they found their current job. Among those who got it through a personal contact, only 16.7% had been seeing that person often. The majority, 55.6%, saw them *occasionally*; another 27.8%, rarely.

Your close friends are useless for this, and the reason is structural rather than sentimental. The people you see constantly are the people who see each other. They move in your circle, they hear what you hear, and their news is your news. Somebody you barely see is somebody embedded in a different crowd, which is precisely why they know something you do not.

Granovetter's 1973 paper turns that into a claim about the graph: strong ties get trapped inside clusters, and the edges that connect one cluster to another have to be weak. Weak ties are the bridges, so they are the only route information takes between worlds.

Nearly fifty years later, someone ran the experiment.

## Rigor

Define tie strength as Granovetter does — time, emotional intensity, intimacy, reciprocal services — and state the **forbidden triad**: if $A$–$B$ and $A$–$C$ are both strong, then $B$–$C$ exists at least weakly. Empirically this is homophily plus opportunity: strong ties imply time together and similarity, both of which pull $B$ and $C$ into contact.

The corollary is the theorem. Suppose edge $A$–$B$ is a **bridge**, meaning its removal is the only path between two components. If $A$–$B$ were strong, take any other strong tie $A$–$C$; the forbidden triad forces $B$–$C$, giving a second path and contradicting bridgehood. So **all bridges are weak ties**. Not all weak ties bridge, which is why the effect is statistical.

The causal test came in 2022. Rajkumar and colleagues exploited years of randomised variation in LinkedIn's recommendation algorithm across roughly 20 million users and 2 billion new ties, and measured job transmission. Weak ties do cause more job mobility — but the relationship is an inverted U: *moderately* weak ties are the most productive channel, with diminishing returns to further weakness.

So the theory survives the largest social experiment ever run on it, slightly bent.

## Recall
type: mcq
Q: Why must every bridge in a social network be a weak tie?
- [x] The forbidden triad — two strong ties from the same person force a tie between their other ends, which creates a second path and destroys bridgehood.
- [ ] Because weak ties are more numerous — frequency is irrelevant; the argument is structural and holds for any single edge.
- [ ] Because strong ties carry more information — they carry more, but redundantly, which is a separate point about what flows.
