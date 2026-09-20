---
id: css.complexity.tipping-points.a-hundred-people-a-hundred-thresholds
topic: css.complexity.tipping-points
format: challenge
difficulty: 2
language: en
weight: light
angles: [paradox, numbers, tool]
tags: [granovetter, thresholds, riots, tipping-points, committed-minority]
hook: "Two crowds with almost identical people. One riots, one goes home. Find the difference."
sources:
  - {title: "Threshold Models of Collective Behavior", author: "Mark Granovetter", year: 1978, type: paper, url: "https://doi.org/10.1086/226707"}
  - {title: "Experimental evidence for tipping points in social convention", author: "Damon Centola, Joshua Becker, Devon Brackbill, Andrea Baronchelli", year: 2018, type: paper, url: "https://doi.org/10.1126/science.aas8827"}
dates: {written: 2026-09-19, event: 1978-05-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# One hundred people, one hundred thresholds

Granovetter's setup, 1978. A hundred people in a square, each with a threshold: the number of *others* who must already be rioting before they join. One person has threshold 0 — they will start alone. One has threshold 1, one has threshold 2, and so on up to 99.

Question one: what happens?

Now the second crowd. Identical, except that the person with threshold 1 has threshold 2 instead. So there are two people with threshold 2 and nobody with 1. Every other person is unchanged; the average threshold moves by one hundredth.

Question two: what happens now?

Sit with it before you look. Then ask yourself what a survey of either crowd would have told you, and whether anyone in the second crowd is more peaceful than anyone in the first.

## Recall
type: reveal
Q: What happens in each crowd?
A: The first riots completely: person 0 starts, person 1 joins, that makes two, person 2 joins, and the cascade runs to 99. The second produces exactly one rioter — nobody has threshold 1, so it stops dead. Same people to within one person, opposite outcomes, and no survey of dispositions could tell them apart. Collective behaviour is a property of the whole threshold distribution, not of average radicalism. Centola and colleagues measured a version of this in 2018: a committed minority flipped an established convention once it passed roughly 25%.
