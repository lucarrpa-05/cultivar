---
id: sports.stats.hot-hand.the-fallacy-had-a-bug
topic: sports.stats.hot-hand
format: idea
difficulty: 2
language: en
weight: heavy
angles: [mistake, paradox]
tags: [hot-hand, gilovich-vallone-tversky, miller-sanjurjo, streak-selection-bias, replication]
hook: "For 33 years the hot hand was the textbook example of humans seeing patterns in noise. Then someone checked the estimator."
prerequisites: [math.probability.basics]
related: [sports.stats.hot-hand.four-coin-flips]
sources:
  - {title: "The hot hand in basketball: On the misperception of random sequences", author: "Gilovich, Vallone and Tversky", year: 1985, type: paper, url: "https://doi.org/10.1016/0010-0285(85)90010-6"}
  - {title: "Surprised by the Hot Hand Fallacy? A Truth in the Law of Small Numbers", author: "Joshua B. Miller and Adam Sanjurjo", year: 2018, type: paper, url: "https://www.econometricsociety.org/publications/econometrica/2018/11/01/surprised-hot-hand-fallacy-truth-law-small-numbers"}
  - {title: "Hot Hand: The Miller and Sanjurjo Correction", type: blog, url: "https://datacolada.org/88"}
dates: {written: 2026-09-19, event: 2018-11-01}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Bias holds for n>=3, not every finite n (n=2 is unbiased); the 100-shot claim restated as the ~8pp gap in GVT's three-in-a-row comparison."}
---

# The hot hand fallacy had a fallacy in it

In 1985 Gilovich, Vallone and Tversky took Philadelphia 76ers shooting records and a controlled shooting experiment at Cornell, looked at what happened after a make, found no lift, and concluded that the hot hand is something fans invent. It became the canonical demonstration that human pattern-detection is broken — cited in every behavioural economics course, Tversky's own favourite result.

The measure they used was: among shots taken right after a made shot, what fraction went in? Compare it to the overall rate. Sensible. Obviously unbiased.

It is not unbiased. In a *finite* sequence, selecting the shots that follow a make is not a neutral act of looking; it is a filter that pulls the expected hit rate below the true rate. Joshua Miller and Adam Sanjurjo proved it and published in Econometrica in 2018. Correct for the bias and the Cornell data flips sign: a hot-hand effect of roughly 13 percentage points, with a wide confidence interval.

The bias is small, exact, and easy to state.

## Rigor

Fix $p=\tfrac12$ and flip a coin $n$ times. Let $\hat{p}_H$ be the proportion of heads among the flips that immediately follow a head, defined only on sequences where such a flip exists. Then

$$\mathbb{E}[\hat{p}_H]<p \quad\text{for every } n\ge 3,$$

with $\mathbb{E}[\hat{p}_H]=5/12$ at $n=3$ and $17/42$ at $n=4$; the gap shrinks like $O(1/n)$.

Why: the estimator averages *ratios* over sequences, and sequences with many heads contribute a denominator that is large, so they are down-weighted relative to sequences where a single head is followed by a tail. Equivalently, sampling a flip that follows a head is sampling without replacement from a finite record — you have already spent one head on the conditioning event.

GVT's Cornell subjects took 100 shots each, and the comparison GVT ran was the hit rate after three makes against the hit rate after three misses. On a fair 100-flip sequence that difference is already about eight percentage points below zero — the same order as the effect being tested. Gilovich and colleagues measured a genuine hot hand and, through a subtly biased ruler, read it as zero.

## Recall
type: mcq
Q: Why is "the hit rate on shots following a make" a biased estimator of the true hit rate?
- [ ] Because makes and misses are not independent in real basketball — that is the hypothesis being tested, so it cannot be the source of the bias; the bias appears even for a fair coin.
- [x] Because in a finite sequence, conditioning on "follows a make" samples without replacement and systematically under-counts makes — the bias is a property of the selection rule, not of the shooter.
- [ ] Because players take harder shots after a make — a real effect, but it does not explain why a simulated coin shows the same shortfall.
