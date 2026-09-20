---
id: econ.game-theory.evolutionary.hawks-doves-and-lizards
topic: econ.game-theory.evolutionary
format: idea
difficulty: 3
language: en
weight: medium
angles: [numbers, connection]
tags: [hawk-dove, side-blotched-lizard, rock-paper-scissors, population-mixture]
diagram: {file: econ/hawk-dove-equilibrium.svg, caption: "Whichever type is rarer earns more, so the population is pushed back to a hawk share of V over C.", alt: "Two straight lines showing hawk and dove fitness against the fraction of hawks, crossing at V over C, with arrows pointing toward the crossing from both sides"}
hook: "The stable share of aggressive animals is the prize divided by the cost of the wound. Lizards in California run the experiment."
sources:
  - {title: "Chicken (game) — includes the hawk–dove payoff matrix", type: wiki, url: "https://en.wikipedia.org/wiki/Chicken_(game)"}
  - {title: "Common side-blotched lizard", type: wiki, url: "https://en.wikipedia.org/wiki/Common_side-blotched_lizard"}
  - {title: "The rock–paper–scissors game and the evolution of alternative male strategies, Nature 380(6571)", author: "Sinervo & Lively", year: 1996, type: paper, url: "https://doi.org/10.1038/380240a0"}
dates: {written: 2026-09-19, event: 1996-03-21}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# How aggressive should a population be? Exactly V over C.

Two animals meet over a resource worth $V$. Each can play hawk — escalate, fight, risk an injury costing $C$ — or dove, which means display and give way if the other escalates. Hawks beat doves. Hawks meeting hawks get hurt. Doves meeting doves share.

If the wound is worse than the prize, neither pure strategy can take the population. All doves is invaded by a single hawk, who wins every contest for nothing. All hawks is invaded by a dove, who never wins and never bleeds — and in a field of maimed hawks that is enough. The stable share of hawks turns out to be exactly $V/C$, in two lines of algebra.

Nature runs the experiment. Side-blotched lizards in California come in three male types — orange, blue, yellow — that beat one another in a cycle like rock-paper-scissors. Sinervo and Lively watched the three proportions chase each other round on a four-to-five-year cycle. No lizard is randomising. The population is.

## Rigor

Payoffs to the row player, with resource value $V$ and injury cost $C$:

$$\begin{array}{c|cc} & \text{Hawk} & \text{Dove}\\ \hline \text{Hawk} & \tfrac{V-C}{2} & V\\ \text{Dove} & 0 & \tfrac{V}{2}\end{array}$$

Let a fraction $p$ of the population play hawk. Expected payoffs are

$$E(H)=p\,\frac{V-C}{2}+(1-p)V,\qquad E(D)=(1-p)\frac{V}{2}.$$

Setting them equal — the indifference principle again, now read as equal *fitness* rather than a player's willingness to mix — gives

$$p\,\frac{V-C}{2}+V-pV=\frac{V}{2}-\frac{pV}{2}\ \Longrightarrow\ -\frac{pC}{2}=-\frac{V}{2}\ \Longrightarrow\ p^{*}=\frac{V}{C}.$$

When $C>V$ this sits strictly inside $(0,1)$ and is an ESS: push the hawk share above $V/C$ and hawk fitness drops below dove fitness, so selection pushes it back. When $C\le V$, Hawk strictly dominates and $p^{*}=1$ — fighting to the death is stable exactly when the prize is worth more than the wound.

One reading note. $p^{*}$ can be a population with a fraction $V/C$ of pure hawks, or a population of identical animals each escalating with probability $V/C$. The mathematics cannot tell them apart. The lizards are the first kind.

## Recall
type: mcq
Q: Why is "all hawks" unstable when the injury cost exceeds the prize?
- [x] A rare dove never wins but never bleeds — in a field of fighting hawks that beats the average hawk's payoff.
- [ ] Hawks exhaust the resource — the model has no depletion; the instability comes from injury costs alone.
- [ ] Doves cooperate with one another — doves only share when they meet each other, which is rare in a hawk population.
