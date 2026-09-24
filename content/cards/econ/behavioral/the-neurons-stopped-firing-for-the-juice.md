---
id: econ.behavioral.neuroeconomics.the-neurons-stopped-firing-for-the-juice
topic: econ.behavioral.neuroeconomics
topics: [bio.neuro.decision-making]
format: story
difficulty: 2
language: en
weight: medium
angles: [connection, prediction, history]
tags: [dopamine, reward-prediction-error, schultz, temporal-difference, learning]
hook: "Once the monkey learned the cue meant juice, its dopamine neurons stopped responding to the juice."
related: [econ.behavioral.neuroeconomics.no-loss-centre-in-the-brain]
sources:
  - {title: "A Neural Substrate of Prediction and Reward, Science 275(5306)", author: "Wolfram Schultz, Peter Dayan, P. Read Montague", year: 1997, type: paper, url: "https://doi.org/10.1126/science.275.5306.1593"}
  - {title: "Temporal difference learning (In neuroscience)", type: wiki, url: "https://en.wikipedia.org/wiki/Temporal_difference_learning"}
  - {title: "Dopamine, Reward Prediction Error, and Economics, QJE 123(2)", author: "Andrew Caplin, Mark Dean", year: 2008, type: paper, url: "https://doi.org/10.1162/qjec.2008.123.2.663"}
dates: {written: 2026-09-23, event: 1997-03-14}
author: author-econ-1
reviewed: {by: reviewer-econ-2026-09-23, at: 2026-09-23, verdict: approved}
---

# The dopamine neurons stopped firing for the juice

In the early 1990s Wolfram Schultz recorded single dopamine neurons in monkeys while drops of juice arrived. Unexpected juice brought a burst of firing. Then a cue began to precede each drop, and as the monkey learned, the burst moved: to the cue, and away from the juice.

The strangest trace came when the cue appeared and the juice did not. At the moment it was due, the neurons fell silent, below their resting rate.

In 1997 Schultz, Peter Dayan and Read Montague explained it in *Science*. The neurons were not reporting pleasure but the gap between what arrived and what was expected, in exactly the form a learning algorithm needs.

## Rigor

The algorithm is temporal-difference learning. Keep a value estimate $V(s)$ for each moment $s$ of a trial; after each step compute

$$\delta_t=r_t+\gamma V(s_{t+1})-V(s_t),$$

and nudge $V(s_t)$ by $\alpha\,\delta_t$. The three recordings are three signs of $\delta$.

*Unexpected juice.* Nothing predicted it, so $V\approx0$ throughout and $\delta=r>0$ at the juice: a burst.

*After learning.* The cue itself arrives unpredictably, so the moment before it has $V\approx0$, while the cue state has $V\approx\gamma^{k}r$ for juice $k$ steps later. The jump $\delta>0$ now sits at the cue. When the juice comes, it is exactly what $V$ promised and $\delta\approx0$: no burst.

*Omitted juice.* At the expected time $r=0$ but $V$ still promised it, so $\delta<0$: the dip below baseline.

Why an economist cares: $V$ is an expected discounted value, the object economics puts at the centre of choice, and here was a candidate physical signal that learns it. Caplin and Dean later wrote axioms any such signal must satisfy and showed the data pin down the reward scale only up to increasing transformations. Ordinal, like utility.

## Recall
type: mcq
Q: A trained monkey sees the cue, but the juice never comes. What do its dopamine neurons do when the juice was due?
- [x] Dip below baseline — the outcome fell short of the prediction, a negative prediction error.
- [ ] Burst, because the cue promised reward — the burst already happened at the cue; at the due time the outcome is worse than expected.
- [ ] Nothing, since no juice arrived — silence would mean no expectation; the dip shows the neurons encode what was expected.
