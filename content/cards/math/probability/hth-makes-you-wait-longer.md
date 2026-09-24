---
id: math.probability.markov-chains.hth-makes-you-wait-longer
topic: math.probability.markov-chains
format: challenge
difficulty: 3
language: en
weight: medium
angles: [paradox, numbers, tool]
tags: [waiting-time, coin-patterns, hitting-time, first-step-analysis, penney]
hook: "HTH and HTT each have probability one in eight. Wait for each with a fair coin and one takes 25% longer."
sources:
  - {title: "A Martingale Approach to the Study of Occurrence of Sequence Patterns in Repeated Experiments", author: "Shuo-Yen Robert Li", year: 1980, type: paper, url: "https://doi.org/10.1214/aop/1176994578"}
  - {title: "Penney's game", type: wiki, url: "https://en.wikipedia.org/wiki/Penney%27s_game"}
  - {title: "Absorbing Markov chain", type: wiki, url: "https://en.wikipedia.org/wiki/Absorbing_Markov_chain"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "weight light to medium (it has a rigor section). Both hitting-time systems solved by hand (10 and 8); Conway/Li overlap sums checked."}
---

# HTH and HTT are equally likely. One makes you wait longer.

Flip a fair coin until the pattern HTH appears, and count the flips. Then do the same for HTT.

Both patterns have probability $1/8$ at any given spot. So you would expect the same average wait for both, and a reasonable guess is 8 flips.

It is not the same. One of them takes 8 flips on average and the other takes 10. Which is which, and why would a coin with no memory care?

A hint that is really the whole method: after a near miss, how much of the pattern do you still have? Track only that. It is a four-state Markov chain, and the wait is a hitting time you can compute by hand.

## Rigor

Let the state be the longest ending of the flips so far that is also a beginning of the pattern. For HTH the states are $\varnothing, H, HT$ and the absorbing $HTH$. Let $m_s$ be the expected number of further flips from state $s$. Conditioning on the next flip:
$$m_\varnothing=1+\tfrac12m_H+\tfrac12m_\varnothing,\qquad m_H=1+\tfrac12m_H+\tfrac12m_{HT},\qquad m_{HT}=1+\tfrac12\cdot0+\tfrac12m_\varnothing .$$
The last equation is the near miss: from HT, a T leaves you with nothing. Solving, $m_\varnothing=10$.

For HTT the near miss is an H, which already starts the pattern again: $m_{HT}=1+\tfrac12\cdot0+\tfrac12m_H$. Solving, $m_\varnothing=8$.

**The general rule (Li, 1980; Conway).** The expected wait for a pattern of length $L$ is
$$\sum_{k}2^k\quad\text{over all }k\le L\text{ such that the first }k\text{ symbols equal the last }k .$$
HTH overlaps itself at $k=1$ and $k=3$: $2+8=10$. HTT only at $k=3$: $8$. HHH at $k=1,2,3$: $14$.

## Recall
type: reveal
Q: Which takes longer on average, HTH or HTT, and what is the real reason?
A: HTH, 10 flips against 8. Occurrences of HTH can overlap (HTHTH contains two), so they come in clumps; with the same long-run rate of one per eight positions, clumped occurrences must leave longer gaps between clumps.
