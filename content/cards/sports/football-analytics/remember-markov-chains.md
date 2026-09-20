---
id: sports.football-analytics.possession-value.remember-markov-chains
topic: sports.football-analytics.possession-value
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, tool]
tags: [markov-chain, absorbing-states, fundamental-matrix, expected-threat, football]
hook: "An absorbing chain asks: starting here, where do I end up? Football asks: starting here, do I score?"
callback: {from: math.probability.markov-chains, to: sports.football-analytics.possession-value}
related: [sports.football-analytics.possession-value.most-of-the-game-has-no-shot]
prerequisites: [math.probability.markov-chains, sports.football-analytics.expected-goals]
sources:
  - {title: "Introducing Expected Threat (xT)", author: "Karun Singh", year: 2018, type: blog, url: "https://karun.in/blog/expected-threat.html"}
  - {title: "Absorbing Markov chain", type: wiki, url: "https://en.wikipedia.org/wiki/Absorbing_Markov_chain"}
dates: {written: 2026-09-19}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Repaired a broken KaTeX block matrix (missing row break)."}
---

# Remember absorbing Markov chains? A football possession is one.

When you met absorbing chains, the payoff question was: from this transient state, what is the probability I am eventually swallowed by *that* absorbing state? You solved it with the fundamental matrix and it felt like bookkeeping.

Now hand the chain a football. The transient states are the zones of the pitch — Karun Singh's expected-threat model uses a 16-by-12 grid, so 192 of them. There are exactly two absorbing states: **goal** and **possession lost**. A move is a transition between zones; a shot is a coin flip into one absorber or the other; a turnover is the other absorber.

The "value" of a zone that episode two defined circularly is not a new idea at all. It is the absorption probability of the goal state, starting from that zone. And the iteration Singh runs until it converges is just repeated multiplication by the transition matrix — the same computation you already did on a rat in a maze, run on a pitch instead.

The bookkeeping is the same bookkeeping.

## Rigor

Order the states as transient $Z$ (the 192 zones) then absorbing $\{\text{goal},\text{lost}\}$, giving

$$P=\begin{pmatrix}Q & R\\ 0 & I\end{pmatrix}.$$

If $\rho(Q)<1$ — true here because every possession ends — the fundamental matrix $N=(I-Q)^{-1}=\sum_{k\ge0}Q^{k}$ exists, $N_{ij}$ counts expected visits to zone $j$ before absorption starting from $i$, and the absorption probabilities are $B=NR$. Expected threat is the goal column of $B$:

$$V=(I-Q)^{-1}r_{\text{goal}},$$

which is exactly the fixed point $V=r_{\text{goal}}+QV$ that Singh reaches by starting at $V\equiv 0$ and iterating. Power iteration on an absorbing chain, four or five sweeps, done.

One honest caveat the chain forces into the open: Markov means the value of a zone depends on the zone alone, not on how the ball arrived. Real football is emphatically not memoryless — that is precisely why the later models threw the grid away and learned from the full game state.

## Recall
type: reveal
Q: In the Markov picture of a possession, what are the absorbing states, and what quantity is "expected threat"?
A: The absorbing states are *goal* and *possession lost*. Expected threat for a zone is the probability of being absorbed into *goal* starting from that zone — the goal column of $B=(I-Q)^{-1}R$.
