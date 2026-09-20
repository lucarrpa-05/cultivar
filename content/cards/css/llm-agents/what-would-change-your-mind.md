---
id: css.llm-agents.validity.what-would-change-your-mind
topic: css.llm-agents.validity
format: challenge
difficulty: 3
language: en
weight: light
angles: [tool, prediction]
tags: [falsification, preregistration, validity, design, thought-experiment]
hook: "A referee asks one question and the whole project depends on whether you prepared for it."
sources:
  - {title: "Synthetic Replacements for Human Survey Data? The Perils of Large Language Models", author: "Bisbee, Clinton, Dorff, Kenkel, Larson", year: 2024, type: paper, url: "https://doi.org/10.1017/pan.2024.5"}
  - {title: "Whose Opinions Do Language Models Reflect?", author: "Santurkar, Durmus, Ladhak, Lee, Liang, Hashimoto", year: 2023, type: paper, url: "https://arxiv.org/abs/2303.17548"}
dates: {written: 2026-09-19}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# What result would make you abandon your own simulation?

You have built it. A few thousand LLM agents with demographic backstories and a media diet, run through a campaign. It produces a 52–48 result and a satisfying story about which group moved and when.

A referee asks the only question that matters: *what outcome would have told you the model was wrong?*

Before reading on, write down three answers. One check you could run before seeing any real data. One check that uses real data you already have. One that would fail if your agents were merely regurgitating the training corpus rather than reasoning from their personas.

Take a minute. Most projects in this literature cannot answer the third.

## Recall
type: reveal
Q: Three checks that would falsify an LLM electoral simulation.
A: (1) Ablate a mechanism — cut the media diet and see whether the result moves as theory requires. If nothing changes, the mechanism was decorative. (2) Hold out a relationship you never conditioned on: a subgroup turnout gap, or the *spread* of opinions rather than the mean. Bisbee et al. matched every mean and got the variance and the regressions wrong. (3) Test for retrieval: run on an election after the training cutoff, or rename the candidates and rewrite their platforms into something the corpus cannot contain. If accuracy collapses, you were remembering.
