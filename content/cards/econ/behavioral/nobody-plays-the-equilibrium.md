---
id: econ.behavioral.behavioral-game-theory.nobody-plays-the-equilibrium
topic: econ.behavioral.behavioral-game-theory
topics: [econ.game-theory.dominance-nash]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, tool]
tags: [level-k, cognitive-hierarchy, quantal-response, bounded-reasoning]
related: [econ.behavioral.behavioral-game-theory.guess-two-thirds]
hook: "Game theorists who know the equilibrium of the two-thirds game perfectly well still do not play it. They are right not to."
diagram: {file: econ/beauty-contest-levels.svg, caption: "Where the levels land in the two-thirds game, and where people actually pile up.", alt: "A number line from 0 to 100 marking 50, 33.3, 22.2 and 14.8, with tall bars of observed choices at 33 and 22 and almost nothing at 0"}
sources:
  - {title: "Guess 2/3 of the average", type: wiki, url: "https://en.wikipedia.org/wiki/Guess_2/3_of_the_average"}
  - {title: "A cognitive hierarchy model of games, Quarterly Journal of Economics 119(3)", author: "Camerer, Ho & Chong", year: 2004, type: paper, url: "https://doi.org/10.1162/0033553041502225"}
  - {title: "Quantal response equilibrium", type: wiki, url: "https://en.wikipedia.org/wiki/Quantal_response_equilibrium"}
dates: {written: 2026-09-19, event: 2004-08-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Nobody plays the equilibrium. Everybody plays the room.

The two-thirds game has an awkward property: its equilibrium is 0 and almost nobody plays it, including professional game theorists who could prove it on request. That is not stupidity. Writing 0 is a best response only against a room full of people writing 0, and there has never been such a room.

Level-k models take the observation seriously. A level-0 player is a placeholder — random, or drawn to whatever is salient. A level-1 player best-responds to level-0. A level-2 best-responds to level-1. The spikes at 33 and 22 in real data are levels 1 and 2 anchored on an average of 50.

The idea travels well beyond this game. It says people run a small, bounded number of "what will they do" steps, and the number is genuinely small: one, sometimes two. Equilibrium is not what people compute. It is where things end up after enough repetition, if they end up there at all.

The models put a distribution over those levels.

## Rigor

Let $a_k$ be the action of a level-$k$ player in the $p$-beauty contest, with level-0 uniform on $[0,100]$, so $\mathbb{E}[a_0]=50$. Best-responding to a room of level-$(k-1)$ players gives

$$a_k=p\,\mathbb{E}[a_{k-1}]\ \Longrightarrow\ a_k=50\,p^{\,k}.$$

With $p=2/3$: $a_1=33.3$, $a_2=22.2$, $a_3=14.8$, and $a_k\to 0$ only in the limit. Nash is level infinity, which is a strong thing to assume about strangers.

Camerer, Ho and Chong's **cognitive hierarchy** model refines this: a level-$k$ player best-responds not to level $k-1$ alone but to a normalised Poisson distribution over levels $0,\dots,k-1$ with mean $\tau$. Fitted across many games, $\tau$ lands around $1.5$ — between one and two steps for the average player.

The other standard repair is **quantal response equilibrium** (McKelvey and Palfrey, 1995). Players best-respond with noise, choosing action $j$ with probability proportional to $\exp(\lambda u_j)$, and equilibrium is a fixed point of those noisy responses. As $\lambda\to\infty$ you recover Nash; estimated $\lambda$ is always finite. Two different repairs, one shared admission: equilibrium is a limit of something people do a little of.

## Recall
type: mcq
Q: In a level-k model, what does a level-2 player believe about everyone else?
- [x] That they are level 1 — so a level-2 player best-responds to a room that is best-responding to random play.
- [ ] That they are playing the Nash equilibrium — that belief produces the equilibrium action, which the data almost never show.
- [ ] That they are also level 2 — self-consistent beliefs are exactly what level-k gives up in favour of a finite chain.
