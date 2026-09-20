---
id: ai.theory.vc-dimension.one-parameter-infinite-capacity
topic: ai.theory.vc-dimension
format: fact
difficulty: 3
language: en
weight: light
angles: [weird, numbers]
tags: [sine-classifier, capacity, parameter-counting, infinite-vc]
hook: "One real number, and the class shatters any finite set you name."
related: [ai.theory.vc-dimension.how-many-points-can-you-shatter]
sources:
  - {title: "Vapnik–Chervonenkis dimension", type: wiki, url: "https://en.wikipedia.org/wiki/Vapnik%E2%80%93Chervonenkis_dimension"}
  - {title: "Vapnik–Chervonenkis theory", type: wiki, url: "https://en.wikipedia.org/wiki/Vapnik%E2%80%93Chervonenkis_theory"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# One real parameter is enough for infinite capacity

The class of classifiers $h_\theta(x)=\mathbb 1[\sin(\theta x)>0]$, with $\theta$ a single real number, has infinite VC dimension. Take any $m$ points of the form $x_i=2^{-i}$: for every one of the $2^{m}$ colourings there is a $\theta$, built from the binary expansion of the labels, that produces it. One knob shatters arbitrarily large sets, while a linear classifier in $\mathbb R^{50}$, with fifty-one knobs, shatters at most fifty-one points. Counting parameters measures nothing at all.

## Recall
type: reveal
Q: Why doesn't parameter count measure a model's capacity?
A: Capacity is about which *labelings* a class can realise, not how many numbers it stores. A one-parameter sine classifier shatters arbitrarily large sets, while a 51-parameter linear classifier in $\mathbb R^{50}$ tops out at 51 points.
