---
id: css.complexity.criticality.the-sandpile-that-tunes-itself
topic: css.complexity.criticality
format: idea
difficulty: 3
language: en
weight: heavy
angles: [beautiful, mistake, connection]
tags: [self-organized-criticality, bak-tang-wiesenfeld, sandpile, avalanches, rice-pile]
hook: "A phase transition normally needs someone to set the temperature. Bak claimed some systems drive themselves there."
sources:
  - {title: "Self-organized criticality: An explanation of 1/f noise", author: "Per Bak, Chao Tang, Kurt Wiesenfeld", year: 1987, type: paper, url: "https://doi.org/10.1103/PhysRevLett.59.381"}
  - {title: "Avalanche dynamics in a pile of rice", author: "Frette, Christensen, Malthe-Sørenssen, Feder, Jøssang, Meakin", year: 1996, type: paper, url: "https://doi.org/10.1038/379049a0"}
  - {title: "Self-organized criticality", type: wiki, url: "https://en.wikipedia.org/wiki/Self-organized_criticality"}
dates: {written: 2026-09-19, event: 1987-07-27}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# The pile that tunes itself to the edge

Critical points are fussy. To sit a magnet exactly at its Curie temperature, where fluctuations of every size appear at once, somebody has to hold the dial there. Nudge it either way and the interesting behaviour vanishes. Criticality in physics is a measure-zero accident that experimentalists work hard to arrange.

Bak, Tang and Wiesenfeld proposed in 1987 that some systems arrange it themselves. Drop sand grain by grain onto a pile. The slope builds until it is steep enough to slide, avalanches carry material away, and the pile settles at exactly the angle where the next grain might trigger anything from one tumbling grain to a collapse of the whole face. Nobody set that angle. The dynamics has an attractor, and the attractor is the critical point.

If true, it would explain a lot at once: why earthquake magnitudes, forest fires, extinctions and market moves all have heavy tails and no characteristic size, with no tuning and no conspiracy.

Then somebody built the pile.

## Rigor

The BTW automaton: each site of a lattice holds $z_i$ grains; add a grain at random, and whenever $z_i$ exceeds a threshold the site topples, sending one grain to each neighbour, possibly triggering more. The system is **slowly driven** (grains arrive far slower than avalanches resolve) and **dissipative at the boundary**. Its attractor is a statistically stationary state where the avalanche size distribution follows $P(s)\sim s^{-\tau}$ over a range set by system size, with no characteristic scale — hence the claim about $1/f$ noise.

The empirical test came in 1996. Frette and colleagues built a quasi-two-dimensional rice pile between glass plates and tracked every avalanche. With elongated grains they found scaling consistent with self-organized criticality. With rounder grains, the same apparatus gave avalanches with a characteristic size and no scaling — the grain shape decided it. Self-organized criticality is a real behaviour of some systems, not a universal law of piles.

That is the pattern worth carrying into social science. The recipe — slow drive, threshold dynamics, local redistribution, dissipation — does produce scale-free avalanches, and plenty of social processes look like it. But "heavy tail, therefore critical" is the same inference the power-law card warns about, run backwards.

## Recall
type: mcq
Q: What did the 1996 rice-pile experiment show about self-organized criticality?
- [x] It depends on the grains — elongated rice gave scale-free avalanches while rounder grains gave a characteristic size, so SOC is a property of some systems, not all piles.
- [ ] That the theory is wrong — one grain shape did reproduce the predicted scaling; the finding is about generality, not falsity.
- [ ] That real sand always self-organises to criticality — real sand piles are in fact among the poorer examples, which is why rice was used.
