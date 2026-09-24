---
id: sports.stats.hot-hand.the-coin-is-innocent
topic: sports.stats.hot-hand
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, numbers]
tags: [hot-hand, streak-selection-bias, average-of-ratios, coin-flips, miller-sanjurjo]
hook: "About 0.405, not 0.5. Twelve heads and twelve tails follow a head, but they do not get equal votes."
prerequisites: [math.probability.basics]
related: [sports.stats.hot-hand.four-coin-flips, sports.stats.hot-hand.the-fallacy-had-a-bug]
answersQuestion: q-2026-09-21-7q4e
sources:
  - {title: "Surprised by the Hot Hand Fallacy? A Truth in the Law of Small Numbers", author: "Joshua B. Miller and Adam Sanjurjo", year: 2018, type: paper, url: "https://doi.org/10.3982/ECTA14943"}
  - {title: "Hot hand", type: wiki, url: "https://en.wikipedia.org/wiki/Hot_hand"}
dates: {written: 2026-09-23}
diagram: {file: sports/four-flips-scorecard.svg, caption: "All sixteen sequences, sorted by score. Six score 0 and only three score 1: heads that follow heads sit in tiles with more bright letters, where each one counts for less.", alt: "The sixteen four-flip sequences as tiles in rows by score: six at 0, four at one half, one at two thirds, three at 1, and two with no score."}
author: author-sports-1
reviewed: {by: reviewer-sports-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Recomputed all 16 sequences: 17/42, pooled 12/24, weights 17/3 vs 25/3 all correct. Heads-after-heads sit in 8 sequences and tails-after-heads in 11, so 'a few' vs 'many' became 'fewer' vs 'more', and the caption now names the real mechanism (larger denominators)."}
---

# The answer is 17/42, and the coin is innocent

The average is 17/42, about 0.405.

Nothing is wrong with the coin. Pool all sixteen sequences and the flips that follow a head split exactly evenly: twelve heads, twelve tails. The bias comes from averaging per sequence, where each sequence gets one vote however many flips it contributes.

Heads-after-heads come in clumps: HHHH alone holds three of them and casts one vote. Tails-after-heads can't clump, because each needs its own head right before it. So the heads crowd into fewer sequences and get outvoted by tails spread across more. Six sequences score 0; only three score 1.

The whole tally is short enough to check by hand.

## Rigor

Here it is. For a sequence $s$ of four flips, let $N(s)$ be the number of flips that immediately follow an H, and $K(s)$ how many of those are H. The statistic is $\hat p(s) = K(s)/N(s)$, defined when $N(s) \ge 1$, which drops TTTT and TTTH. On the other 14:

| score | sequences |
|---|---|
| 0 | TTHT, THTT, THTH, HTTT, HTTH, HTHT |
| 1/2 | THHT, HTHH, HHTT, HHTH |
| 2/3 | HHHT |
| 1 | TTHH, THHH, HHHH |

$$\mathbb{E}\left[\hat p \mid N \ge 1\right] = \frac{1}{14}\left(6\cdot 0 + 4\cdot\tfrac12 + \tfrac23 + 3\cdot 1\right) = \frac{1}{14}\cdot\frac{17}{3} = \frac{17}{42}.$$

Pooled, $\sum_s K(s) = 12$ and $\sum_s N(s) = 24$: each of flips 2 to 4 follows an H in 8 sequences and is itself H in half of them. So the ratio of averages is exactly $\tfrac12$, while the average of ratios is $\tfrac{17}{42}$.

The gap is a weighting. Averaging $\hat p$ gives each after-head flip weight $1/N(s)$. The 12 heads-after-heads carry total weight $\tfrac{17}{3}$ and the 12 tails-after-heads carry $\tfrac{25}{3}$, because heads-after-heads sit in the high-$N$ sequences, the clumps. Miller and Sanjurjo (2018) proved that this down-weighting pulls the expected score below the true rate for every $n \ge 3$, and that it was built into the 1985 statistic that declared the hot hand a fallacy.

## Recall
type: mcq
Q: Pool all sixteen sequences and count every flip that follows a head. What share of them are heads?
- [x] Exactly half, 12 of 24 — pooling gives every flip equal weight, so the coin's fairness shows through.
- [ ] 17/42 — that is the average of per-sequence scores, where clumped heads share one vote.
- [ ] Less than half, because a head was used up — that explains the per-sequence average, not the pooled count.
