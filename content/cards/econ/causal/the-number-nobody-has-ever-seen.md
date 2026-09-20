---
id: econ.causal.potential-outcomes.the-number-nobody-has-ever-seen
topic: econ.causal.potential-outcomes
format: series
difficulty: 2
language: en
weight: medium
angles: [paradox, beautiful]
tags: [potential-outcomes, rubin, neyman, fundamental-problem, counterfactual]
hook: "Every causal claim is about a subtraction where one of the two numbers has never existed."
series: {id: econ.causal.correlation-to-causation, index: 2, total: 5, title: "Correlation to causation"}
sources:
  - {title: "Rubin causal model", type: wiki, url: "https://en.wikipedia.org/wiki/Rubin_causal_model"}
  - {title: "Estimating causal effects of treatments in randomized and nonrandomized studies", author: "Donald B. Rubin", year: 1974, type: paper, url: "https://doi.org/10.1037/h0037350"}
  - {title: "Statistics and Causal Inference", author: "Paul W. Holland", year: 1986, type: paper, url: "https://doi.org/10.1080/01621459.1986.10478354"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The number nobody has ever seen

Did the scholarship raise your salary? The honest version of that question is a subtraction: your salary now, minus your salary in the world where the same you, same year, same everything, did not get it. That second number does not exist. It has never existed, for anybody, about anything.

Jerzy Neyman wrote the idea down in 1923, in Polish, about agricultural plots; Donald Rubin rebuilt it in 1974 for the social sciences, and Paul Holland gave it the name it deserves in 1986: the **fundamental problem of causal inference**. Each unit has two possible outcomes and the world shows you exactly one.

Which reframes the whole enterprise. Causal inference is not a statistics problem about noise, it is a *missing data* problem — and the missing half is missing by construction, not by accident. You can never fix it for one person. What you can do is arrange things so that the missing half of one group is predictable from the observed half of another.

Here is what that costs.

## Rigor

Each unit $i$ carries two **potential outcomes**: $Y_i(1)$ if treated, $Y_i(0)$ if not. The individual effect is $\tau_i=Y_i(1)-Y_i(0)$. With treatment $D_i\in\{0,1\}$ you observe only

$$Y_i = D_i\,Y_i(1) + (1-D_i)\,Y_i(0),$$

so exactly one of the two is ever visible and $\tau_i$ is never identified. Give up on $\tau_i$ and aim at averages: the average treatment effect $\mathrm{ATE}=\mathbb{E}[Y(1)-Y(0)]$, or the effect on the treated $\mathrm{ATT}=\mathbb{E}[Y(1)-Y(0)\mid D=1]$.

Averages are reachable because expectation is linear even when the individual terms are unobservable: $\mathbb{E}[Y(1)]$ needs only *some* group whose untreated behaviour stands in for the treated group's missing half. Two assumptions run quietly underneath. SUTVA: your treatment does not change my outcome, and there is only one version of the treatment. And consistency: the potential outcome you observe is the one you got.

Snow's houses were his stand-in group. The rest of this series is about when a stand-in is allowed.

## Recall
type: reveal
Q: In one sentence, why is causal inference a missing-data problem rather than a noise problem?
A: Because each unit has two potential outcomes, $Y_i(1)$ and $Y_i(0)$, and the world reveals exactly one of them — the other half is missing by construction, so no amount of extra data on the same units recovers it.
