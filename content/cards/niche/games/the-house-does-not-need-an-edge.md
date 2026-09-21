---
id: niche.games.probability-in-games.the-house-does-not-need-an-edge
topic: niche.games.probability-in-games
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, practical]
tags: [gamblers-ruin, random-walk, absorbing-barrier, bankroll, pascal]
hook: "In a fair game, your chance of bankrupting an opponent equals your share of the total bankroll."
sources:
  - {title: "Gambler's ruin", type: wiki, url: "https://en.wikipedia.org/wiki/Gambler%27s_ruin"}
  - {title: "Random walk", type: wiki, url: "https://en.wikipedia.org/wiki/Random_walk"}
dates: {written: 2026-09-20, event: 1656-01-01}
author: author-sports-niche-1
reviewed: {by: reviewer-niche-w2-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Corrected finite-bankroll probability; certain ruin is a limit."}
---

# A fair game can still ruin a small bankroll

Imagine a fair game in which you and an opponent exchange one unit on each round. Neither player has an edge. If you start with $i$ units and the total bankroll is $N$, your chance of taking it all before going broke is $i/N$. A richer opponent therefore has a better chance of outlasting you, even when every individual bet is fair. Against an *effectively unlimited* bankroll, continuing indefinitely means eventual ruin with probability one. That limiting case is often called gambler's ruin. The distinction matters: a merely richer but finite opponent can still lose. Fair odds on each flip are not equal odds for unequal fortunes.

## Rigor

Let your capital be $i$, the total in play $N$, and let you win each round with probability $p$, losing with $q=1-p$. Let $P_i$ be the probability you reach $N$ before $0$. Conditioning on one round,

$$P_i=pP_{i+1}+qP_{i-1},\qquad P_0=0,\; P_N=1 .$$

For $p\ne\tfrac12$ the solution is

$$P_i=\frac{1-(q/p)^{i}}{1-(q/p)^{N}},$$

and for $p=\tfrac12$ the walk is a martingale and $P_i=i/N$ — check the boundaries: $P_0=0$, $P_N=1$.

Now take the opponent to be much richer, so $N\to\infty$ with your stake $i$ fixed. In the fair case $P_i=i/N\to 0$: ruin with probability one. In the unfavourable case $q>p$ it goes to zero exponentially fast.

Notice what the fair case says. There is no drift against you, and you still lose everything — not because the walk trends down, but because only one of the two absorbing barriers is within reach.

## Recall
type: reveal
Q: In a fair game with two finite bankrolls, what is your chance of winning everything?
A: If you hold $i$ of the total $N$ units, your chance is $i/N$. It approaches zero as the opponent’s bankroll grows without bound while yours stays fixed; with a finite opponent, it is never literally zero.
