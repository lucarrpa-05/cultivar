---
id: ai.rl.q-learning.two-machines-that-pay-nothing
topic: ai.rl.q-learning
format: challenge
difficulty: 2
language: en
weight: light
angles: [paradox, numbers, mistake]
tags: [maximization-bias, jensen, overestimation, double-q-learning, optimism]
hook: "Two machines, both worth exactly zero. Estimate each from one noisy pull, report the bigger number. Are you right on average?"
sources:
  - {title: "Q-learning", type: wiki, url: "https://en.wikipedia.org/wiki/Q-learning"}
  - {title: "Double Q-learning", author: "Hado van Hasselt", year: 2010, type: paper, url: "https://papers.nips.cc/paper_files/paper/2010/hash/091d584fced301b442654dd8c23b3fc9-Abstract.html"}
  - {title: "Jensen's inequality", type: wiki, url: "https://en.wikipedia.org/wiki/Jensen%27s_inequality"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Two slot machines that pay nothing. Which looks better?

Two machines. Both have a true average payout of exactly zero — you know this, but your estimates do not. You pull each once. The payouts are noisy, so you get two numbers scattered around zero, and you write them down as your estimates.

Now someone asks what the better machine is worth. You report the larger of your two numbers.

Is that report unbiased, too high, or too low, on average? And before you answer: Q-learning does this at every single step, taking a $\max$ over noisy action-values and feeding the result back into itself as a training target.

## Recall
type: reveal
Q: Is the reported maximum unbiased?
A: Too high, always. $\mathbb{E}[\max(X,Y)]\ge\max(\mathbb{E}[X],\mathbb{E}[Y])$ by Jensen, and strictly so with any noise — for independent standard normals, $\mathbb{E}[\max]=1/\sqrt{\pi}\approx 0.56$ when the truth is 0. This is maximization bias, and in Q-learning the inflated target becomes the next estimate, so the optimism compounds. Double Q-learning (van Hasselt, 2010) fixes it by keeping two independent estimates: one picks which action looks best, the other says what it is worth.
