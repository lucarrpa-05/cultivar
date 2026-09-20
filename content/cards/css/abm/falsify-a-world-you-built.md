---
id: css.abm.calibration-validation.falsify-a-world-you-built
topic: css.abm.calibration-validation
format: series
difficulty: 3
language: en
weight: heavy
angles: [mistake, tool, history]
tags: [validation, calibration, artificial-anasazi, identification, docking]
hook: "The most celebrated validated simulation in the field matched a thousand years of history and still got the ending wrong."
series: {id: css.abm.simulating-a-society, index: 4, total: 5, title: "Simulating a society"}
sources:
  - {title: "Population growth and collapse in a multiagent model of the Kayenta Anasazi in Long House Valley", author: "Axtell, Epstein, Dean, Gumerman, Swedlund et al.", year: 2002, type: paper, url: "https://doi.org/10.1073/pnas.092080799"}
  - {title: "Understanding Artificial Anasazi", author: "Marco A. Janssen", year: 2009, type: paper, url: "https://www.jasss.org/12/4/13.html"}
dates: {written: 2026-09-19, event: 2002-05-14}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# How do you falsify a world you built yourself?

Long House Valley, northeastern Arizona. Tree rings and pollen give you year-by-year estimates of how much maize the valley could grow between AD 800 and 1350. Archaeology gives you the number of households in each of those years. In 2002 Axtell, Epstein and a team of archaeologists put simulated Kayenta Anasazi families on that real landscape, gave them rules about planting and moving, and asked whether the environment alone could reproduce the population curve.

Largely, it could. Rise, peak, decline — the shape came out. Then it failed exactly where it mattered: the real valley was *completely* abandoned by about 1300, and the simulated valley never empties. Rainfall alone cannot get you to zero.

That negative result is the model's best contribution. It turned "why did they leave?" into "something other than the climate made them leave."

The uncomfortable footnote arrived in 2009, when Marco Janssen re-implemented the model and found that most of the fit came from two parameters setting the valley's carrying capacity, with the agent behaviour adding only a modest improvement.

Hold that thought, and now swap the rule-following agents for language models.

## Rigor

Validating a simulation is a fitting problem with an ugly free-parameter count. Write the model as $y_t = M(\theta, z_t) + \varepsilon_t$, with $\theta$ the behavioural parameters and $z_t$ the exogenous environmental series. Calibration picks $\hat\theta$ minimising a distance between simulated and observed trajectories — often $\sum_t (y_t - \hat y_t)^2$, or a distance between summary statistics in approximate Bayesian computation.

Three traps, all visible in Long House Valley. **Identification:** many $\theta$ generate the same trajectory, so a good fit does not pin down a mechanism, which is precisely Janssen's finding. **Overfitting:** with enough knobs you can trace any single historical path, and history ran once, so there is no held-out sample. **Direction of evidence:** the informative outcome is failure, because failure rules out a class of mechanisms.

So the honest test is not $R^2$. It is docking — does an independent re-implementation reproduce the result? — plus prediction of some regularity the model was never tuned to, plus a published account of what the model *cannot* produce. The Anasazi paper passes that last test loudly: it reports its own inability to empty the valley.

## Recall
type: mcq
Q: What was the Artificial Anasazi model's most scientifically useful result?
- [x] Its failure — the environment alone never emptied the valley, which rules out a purely climatic explanation of the real abandonment.
- [ ] Its fit to the population curve — many parameter settings reproduce one historical trajectory, so fit by itself identifies little.
- [ ] Its prediction of the abandonment date — the model says the valley could still have supported people after 1300, which is the opposite.
