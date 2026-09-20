---
id: ai.ml-basics.linear-models.the-lost-planet
topic: ai.ml-basics.linear-models
format: story
difficulty: 2
language: en
weight: light
angles: [history, feud, origin]
tags: [least-squares, gauss, legendre, ceres, prediction]
hook: "A 24-year-old fitted a curve to 41 days of measurements and told astronomers where to point. They found it."
sources:
  - {title: "Least squares", type: wiki, url: "https://en.wikipedia.org/wiki/Least_squares"}
  - {title: "Ceres (dwarf planet)", type: wiki, url: "https://en.wikipedia.org/wiki/Ceres_(dwarf_planet)"}
dates: {written: 2026-09-19, event: 1801-12-31}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The first model fitted to data was hunting a lost planet

On 1 January 1801, Giuseppe Piazzi spotted a moving dot from Palermo and tracked it for about six weeks before it slid into the glare of the Sun. Ceres, the first asteroid ever seen. Then it was gone. Six weeks of noisy positions is a very thin ribbon of sky, and Europe's astronomers could not agree where it would come back.

Carl Friedrich Gauss, then 24, took Piazzi's numbers and computed an orbit. On the last night of 1801, Franz Xaver von Zach pointed a telescope where Gauss said and found it.

The method underneath was least squares: pick the orbit that minimises the sum of squared discrepancies with the observations. Legendre published it first, in 1805. Gauss stated in 1809 that he had been using it since 1795, and the two were still irritated about it years later.

Fit parameters by minimising squared error, then predict somewhere you have never looked. Supervised learning, a century and a half early.

## Recall
type: reveal
Q: What did Gauss actually do with Piazzi's 41 days of observations?
A: He chose the orbit minimising the sum of squared discrepancies with the measurements — least squares — and used it to predict a position nobody had observed. Fit, then extrapolate: the shape of supervised learning.
