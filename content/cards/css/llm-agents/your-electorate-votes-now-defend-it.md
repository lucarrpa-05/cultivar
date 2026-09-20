---
id: css.llm-agents.electoral-simulation.your-electorate-votes-now-defend-it
topic: css.llm-agents.electoral-simulation
topics: [css.abm.calibration-validation]
format: series
difficulty: 3
language: en
weight: heavy
angles: [tool, prediction, open-problem]
tags: [electoral-simulation, validation, llm-agents, preregistration, elections]
hook: "The agents no longer follow rules you wrote. So what is left to check?"
series: {id: css.abm.simulating-a-society, index: 5, total: 5, title: "Simulating a society"}
sources:
  - {title: "Generative Agent Simulations of 1,000 People (v1)", author: "Park, Zou, Shaw, Hill, Cai, Morris, Willer, Liang, Bernstein", year: 2024, type: paper, url: "https://arxiv.org/abs/2411.10109v1"}
  - {title: "Out of One, Many: Using Language Models to Simulate Human Samples", author: "Argyle, Busby, Fulda, Gubler, Rytting, Wingate", year: 2023, type: paper, url: "https://doi.org/10.1017/pan.2023.2"}
  - {title: "Synthetic Replacements for Human Survey Data? The Perils of Large Language Models", author: "Bisbee, Clinton, Dorff, Kenkel, Larson", year: 2024, type: paper, url: "https://doi.org/10.1017/pan.2024.5"}
dates: {written: 2026-09-19}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Source repointed to arXiv v1, since the unversioned link now serves the retitled June 2026 version."}
author: author-css-1
---

# Your simulated electorate votes. Now defend it.

Episode one made a promise: an agent-based model is a model you have to run, because you wrote the rule for one person and nobody can read the crowd off the rule. Swap those rules for a language model and the promise quietly breaks. You no longer wrote the rule. You do not know what is in it. The thing that generates your agent's vote was trained on the internet, including on commentary about the election you are trying to simulate.

That is not a reason to stop. It is a reason to be specific about the claim. "Simulating an election" can mean at least three different jobs, and they have three different burdens of proof: forecasting a margin, estimating how an electorate would respond to a shock that never happened, or exhibiting a mechanism that could produce a pattern someone observed.

Only the first has a scoreboard. The second and third are where the method could actually earn its keep — and where nobody yet agrees what counts as evidence.

## Rigor

Take the three jobs in turn.

**Forecast.** The target is a known number, so the test is ordinary: preregister, predict, score with Brier or log loss against a baseline that costs nothing (polling average, uniform swing, the prior election). A simulator that cannot beat a uniform-swing baseline is entertainment. The hard part is leakage — the model may have memorised the result — so the only clean test is an election after the training cutoff.

**Counterfactual.** The target is unobservable, so validation has to be indirect: does the simulated electorate reproduce *held-out* relationships it was never conditioned on? Argyle et al. (2023) call the relevant property algorithmic fidelity — conditioned on a demographic backstory, the model reproduces the joint structure of a real sample, not merely its marginals. Bisbee et al. (2024) show how thin that can be: average feeling-thermometer scores matched the ANES well, while variance was too small and regression coefficients diverged.

**Mechanism.** The target is a possibility claim, and the standard is episode four's: report what the model cannot produce, and let someone else re-implement it.

Three claims, three burdens. Pick one before you press play.

## Recall
type: mcq
Q: You simulate an electorate with LLM agents and it reproduces the real vote share. What have you shown?
- [x] Almost nothing yet — the result may be memorised from training data, so the claim only survives on an election after the model's cutoff, against a cheap baseline.
- [ ] That the agents' reasoning matches voters' reasoning — matching a marginal says nothing about the joint structure underneath it.
- [ ] That the simulation would predict a counterfactual policy shock — counterfactual claims need held-out relationships, not a matched outcome.
