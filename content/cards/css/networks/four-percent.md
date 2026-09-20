---
id: css.networks.scale-free.four-percent
topic: css.networks.scale-free
format: fact
difficulty: 2
language: en
weight: light
angles: [mistake, numbers]
tags: [broido-clauset, scale-free, lognormal, model-selection, evidence]
hook: "Someone finally tested \"scale-free networks are everywhere\" on a thousand networks."
sources:
  - {title: "Scale-free networks are rare", author: "Anna D. Broido and Aaron Clauset", year: 2019, type: paper, url: "https://arxiv.org/abs/1801.03400"}
  - {title: "Scale-free network", type: wiki, url: "https://en.wikipedia.org/wiki/Scale-free_network"}
related: [css.complexity.power-laws.one-of-twenty-four]
dates: {written: 2026-09-19, event: 2019-03-04}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Cross-linked to the Clauset-Shalizi-Newman card, which teaches the same lesson from a different study."}
author: author-css-1
---

# Scale-free networks are rare

Broido and Clauset ran the test on nearly a thousand network data sets from biology, technology, transport and social life. Fitting power laws properly — maximum likelihood, goodness of fit, and a head-to-head against alternatives like the lognormal — only 4% showed the strongest possible evidence of scale-free structure. Over half showed the weakest.

Social networks did particularly badly. The claim survives as a useful mechanism story; it did not survive as a universal law.

## Recall
type: reveal
Q: What was the headline number, and what killed most of the claims?
A: Of nearly 1,000 real networks, about 4% had the strongest evidence for scale-free structure. Most failed because a lognormal fits the degree distribution at least as well — a power law has to beat its alternatives, not merely look straight on a log-log plot.
