---
id: css.llm-agents.validity.the-averages-match-the-variance-doesnt
topic: css.llm-agents.validity
format: fact
difficulty: 3
language: en
weight: light
angles: [mistake, numbers]
tags: [bisbee, synthetic-data, variance, regression, anes]
hook: "The synthetic survey got the means right and the disagreement wrong. Means are not what regressions are made of."
sources:
  - {title: "Synthetic Replacements for Human Survey Data? The Perils of Large Language Models", author: "Bisbee, Clinton, Dorff, Kenkel, Larson", year: 2024, type: paper, url: "https://doi.org/10.1017/pan.2024.5"}
  - {title: "American National Election Studies", type: wiki, url: "https://en.wikipedia.org/wiki/American_National_Election_Studies"}
dates: {written: 2026-09-19, event: 2024-10-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Replaced 'results shifted as the model was updated' with the paper's own claim: the same prompt gave significantly different results three months later."}
author: author-css-1
---

# The means matched. Nothing else did.

Bisbee and colleagues prompted ChatGPT with personas and collected feeling-thermometer ratings for eleven social and political groups, against the 2016–2020 American National Election Studies as the benchmark.

The averages lined up well. Everything that depends on spread did not: the synthetic responses varied far less than real people do, regression coefficients differed significantly from the ANES estimates, and the same prompt gave significantly different results three months later.

## Recall
type: reveal
Q: Why is matching the mean the least useful thing a synthetic survey can do?
A: Because social science runs on variation — regressions, subgroup differences, treatment effects and confidence intervals are all functions of the spread. A generator that collapses variance will reproduce every average and get every relationship wrong.
