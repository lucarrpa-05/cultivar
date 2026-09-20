---
id: econ.macro.development.mortality-tables-as-an-instrument
topic: econ.macro.development
topics: [econ.econometrics.iv]
format: idea
difficulty: 3
language: en
weight: medium
angles: [history, feud]
tags: [acemoglu-johnson-robinson, settler-mortality, institutions, exclusion-restriction, albouy]
hook: "Where European settlers died they built extractive states; where they survived, institutions. That claim became an instrument."
sources:
  - {title: "The Colonial Origins of Comparative Development: An Empirical Investigation", author: "Daron Acemoglu, Simon Johnson & James A. Robinson", year: 2001, type: paper, url: "https://doi.org/10.1257/aer.91.5.1369"}
  - {title: "The Colonial Origins of Comparative Development: An Empirical Investigation: Comment", author: "David Albouy", year: 2012, type: paper, url: "https://doi.org/10.1257/aer.102.6.3059"}
  - {title: "Daron Acemoglu — the 2024 Nobel Memorial Prize for work on institutions and prosperity", type: wiki, url: "https://en.wikipedia.org/wiki/Daron_Acemoglu"}
dates: {written: 2026-09-19, event: 2001-12-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Softened an unverifiable most-cited-paper superlative."}
---

# Eighteenth-century death rates, used to explain today's GDP

Rich countries have good institutions. Do the institutions cause the wealth, or does wealth buy better institutions? Regression cannot answer that, and everyone knew it.

Acemoglu, Johnson and Robinson's 2001 answer was to look for something that moved institutions centuries ago and has no other business in today's income. Their candidate: how dangerous a colony was to Europeans. Where settlers died of malaria and yellow fever, colonisers built extractive machinery to pump out resources with as few Europeans as possible. Where they survived, they built the institutions of home — property rights, courts, representation. Those arrangements persisted long after the diseases were controlled.

Run mortality as an instrument for institutions today and the estimated effect on income is large — larger than the raw regression. It became one of the most cited empirical papers in development economics and part of the 2024 Nobel citation.

It has also been fought over harder than almost any result in economics, and the fight is instructive rather than embarrassing.

## Rigor

The system is

$$\log y_i=\alpha+\beta\,\text{Inst}_i+\varepsilon_i,\qquad \text{Inst}_i=\gamma+\delta\,\log M_i+u_i,$$

with $M_i$ settler mortality. Identification needs relevance ($\delta\neq0$, comfortably satisfied) and exclusion: $\log M_i$ affects income today *only* through institutions.

David Albouy's 2012 comment attacks the data rather than the story: he argues that a majority of the countries have mortality rates imputed from other countries, and that rates for soldiers on campaign, bishops and labourers were pooled in ways that favour the hypothesis. Rebuilding the series with those cases handled differently, the first stage weakens and the IV confidence intervals blow up. Acemoglu, Johnson and Robinson replied in the same issue defending the sources.

The deeper worry is the exclusion restriction, which no data can test: the disease environment plausibly affects productivity, human capital and population density directly. Note also the tell — IV exceeding OLS is often read as evidence of attenuation in the institutions measure, but a violated exclusion restriction produces exactly the same pattern.

## Recall
type: mcq
Q: What is the untestable assumption behind using settler mortality as an instrument?
- [x] That past mortality influences income today only through the institutions colonisers built — no direct channel through disease, geography or human capital. — exclusion is an argument about the world, never a test on the data.
- [ ] That settler mortality is uncorrelated with today's institutions. — the opposite is required: the instrument must move the endogenous variable.
- [ ] That the mortality data were recorded accurately. — a serious problem raised by Albouy, but one that can be checked against sources.
- [ ] That institutions are measured without error. — measurement error is what IV is partly meant to fix, not an identifying assumption.
