---
id: sports.stats.hot-hand.four-coin-flips
topic: sports.stats.hot-hand
format: challenge
difficulty: 2
language: en
weight: medium
angles: [paradox, numbers]
tags: [hot-hand, selection-bias, coin-flips, small-samples, puzzle]
hook: "A fair coin, four flips, one innocent-looking question. The answer is not one half, and it took 33 years to notice."
prerequisites: [math.probability.basics]
sources:
  - {title: "Surprised by the Hot Hand Fallacy? A Truth in the Law of Small Numbers", author: "Joshua B. Miller and Adam Sanjurjo", year: 2018, type: paper, url: "https://www.econometricsociety.org/publications/econometrica/2018/11/01/surprised-hot-hand-fallacy-truth-law-small-numbers"}
  - {title: "Hot hand", type: wiki, url: "https://en.wikipedia.org/wiki/Hot_hand"}
dates: {written: 2026-09-19}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Four flips, and the coin appears to hate streaks

Take a fair coin and flip it four times. Write the sequence down — say **H T H H**.

Now do what every hot-hand study does. Find every flip that came *immediately after a head*, and ask what fraction of those flips are themselves heads. In **H T H H** the flips following a head are the second (T) and the fourth (H), so the fraction is one half.

Do this for all sixteen possible sequences, throwing away the ones where no flip ever follows a head. Average the fraction across the sequences that remain.

The coin has no memory. Each flip is 50-50 and independent of everything before it. So the average of that fraction must be 0.5.

Make your guess before you look. What is it actually?

## Recall
type: reveal
Q: What is the average fraction, and what is wrong with the reasoning above?
A: It is $17/42\approx 0.405$, not $0.5$. The three-flip version of the same puzzle gives exactly $5/12$. Nothing is wrong with the coin: the *procedure* is biased. Asking "what followed a head?" in a short finite sequence selects flips in a way that systematically under-counts heads, because a head you have already used up cannot be reused. Miller and Sanjurjo proved this in Econometrica in 2018 — and it is the same statistic that was used to declare the hot hand an illusion.
