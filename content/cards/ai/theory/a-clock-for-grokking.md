---
id: ai.theory.grokking.a-clock-for-grokking
topic: ai.theory.grokking
topics: [ai.theory.ntk]
format: news
difficulty: 3
language: en
weight: medium
angles: [prediction, numbers]
tags: [grokking, weight-decay, learning-rate, lazy-to-rich, modular-arithmetic, preprint]
hook: "The network memorises, then waits. A new theory says how long: one over the product of two knobs."
related: [ai.theory.grokking.it-kept-training-long-after-it-had-won, ai.theory.grokking.the-network-invented-the-fourier-transform]
sources:
  - {title: "A Spectral Theory of Grokking: Weight Decay induces Feature Learning", author: "Pracher, de Jong, Lieshaus, Jeffares & Rulands", year: 2026, type: paper, url: "https://arxiv.org/abs/2609.26679"}
  - {title: "Grokking as the Transition from Lazy to Rich Training Dynamics", author: "Kumar, Bordelon, Gershman & Pehlevan", year: 2023, type: paper, url: "https://arxiv.org/abs/2310.06110"}
dates: {written: 2026-09-23, event: 2026-09-22, expires: 2026-11-06}
evergreen: false
author: author-news-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Hook said the wait is the product of the two knobs; the paper says it scales as one over it. Replaced the vague \"nothing in the loss announced the jump / this says something does\" with what the paper shows: the post-fit residual keeps reshaping the kernel. Dates checked: arXiv submission, body date and dates.event are all 2026-09-22; expires is +45 days."}
---

# Grokking now has a clock: learning rate times weight decay

On 22 September 2026, Lenz Pracher, Steffen Rulands and three coauthors posted a quantitative theory of grokking. After memorisation, weight decay leaves a small unfitted residual that keeps rebuilding the network's features, and the wait before generalisation scales as one over the product of learning rate and weight decay. An 84-by-90 grid of networks trained on modular addition recovered that scaling. Past a critical weight decay, generalisation never arrives.

Grokking looked like thousands of idle steps after memorisation. This says the idle steps are doing the work, and turns Kumar and coauthors' 2023 lazy-to-rich picture into a formula you can test.

Caveat: a preprint, derived for homogeneous networks with squared loss, and tested only on modular arithmetic.
