---
id: ai.interpretability.features-superposition.how-many-ideas-fit-in-512-dimensions
topic: ai.interpretability.features-superposition
format: challenge
difficulty: 3
language: en
weight: light
angles: [prediction, weird]
tags: [capacity-puzzle, sparse-features, dimensions, interference]
hook: "512 numbers per token, and a few thousand things worth tracking. Something has to give."
related: [ai.interpretability.features-superposition.almost-orthogonal-is-good-enough]
sources:
  - {title: "Toy Models of Superposition", author: "Elhage, Hume, Olsson, Schiefer et al.", year: 2022, type: article, url: "https://transformer-circuits.pub/2022/toy_model/index.html"}
  - {title: "Johnson–Lindenstrauss lemma", type: wiki, url: "https://en.wikipedia.org/wiki/Johnson%E2%80%93Lindenstrauss_lemma"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# How many separate ideas fit in 512 dimensions?

A layer of a small language model has 512 neurons, so its state on any given token is a list of 512 numbers. Nothing more. Meanwhile the model needs to keep track of whether the text is Korean, whether it sits inside a Python string, whether the subject is plural, whether the register is legal, whether the previous token was part of a URL — and a few thousand other things of that kind.

The instinctive answer is 512: one thing per neuron. The careful version is also 512: one thing per orthogonal direction, since only 512 directions can be mutually perpendicular.

Both are wrong. How many can it actually track — and what exactly does it have to give up to get there?

## Recall
type: reveal
Q: How many features, and at what cost?
A: Thousands. What it gives up is exact independence: the feature directions are only *nearly* orthogonal, so reading one picks up a little of every other. The trade works because features are sparse — few are active at once — and the ReLU clips the small interference away. That is superposition, and it is why single neurons respond to unrelated things.
