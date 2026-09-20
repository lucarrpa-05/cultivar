---
id: css.abm.axelrod-cooperation.shadow-of-the-future-callback
topic: css.abm.axelrod-cooperation
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, tool]
tags: [folk-theorem, repeated-games, axelrod, discount-factor, cooperation]
hook: "The folk theorem says cooperation can be an equilibrium. Axelrod asked a different question entirely."
callback: {from: econ.game-theory.repeated-games, to: css.abm.axelrod-cooperation}
sources:
  - {title: "Effective Choice in the Prisoner's Dilemma", author: "Robert Axelrod", year: 1980, type: paper, url: "https://doi.org/10.1177/002200278002400101"}
  - {title: "The Evolution of Cooperation", author: "Robert Axelrod and William D. Hamilton", year: 1981, type: paper, url: "https://doi.org/10.1126/science.7466396"}
  - {title: "Folk theorem (game theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Folk_theorem_(game_theory)"}
dates: {written: 2026-09-19}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Remember the folk theorem? Axelrod asked the question it can't answer

When you met repeated games, the punchline was the folk theorem: if the future matters enough, almost any decent outcome — cooperation included — can be supported as an equilibrium by the threat of punishment. Powerful, and strangely unsatisfying, because it proves *too* much. Almost anything is an equilibrium. The theorem tells you cooperation is possible. It does not tell you it will happen, or which of the infinitely many equilibria a real population lands on.

Axelrod's tournaments are the empirical version of exactly that gap. He did not ask which strategies are equilibria. He asked which strategies do well against whatever other people actually send in — a selection question, not an existence question. The answer, twice, was a rule so simple it would never have been interesting as a theorem.

The two results sit on top of each other. One says the door is open. The other says who walks through it.

## Rigor

In the infinitely repeated prisoner's dilemma with discount factor $\delta$, grim trigger sustains cooperation when the one-shot gain from defecting is outweighed by the lost future:
$$\frac{R}{1-\delta}\;\ge\;T+\frac{\delta P}{1-\delta}\quad\Longleftrightarrow\quad \delta\;\ge\;\frac{T-R}{T-P}.$$
With Axelrod's payoffs $(T,R,P,S)=(5,3,1,0)$ this gives $\delta\ge\tfrac12$. The folk theorem then says every feasible, individually rational payoff vector is an equilibrium for $\delta$ close enough to 1 — an enormous set.

Axelrod's tournament collapses that set by fixing the *population*. His second round approximated an indefinite horizon with a per-move continuation probability, so the shadow of the future was real; but the payoff to a rule was its average against the 62 rules actually submitted, not its performance in a hypothetical equilibrium. That is a fitness, not a best response.

The follow-up makes the logic explicit: Axelrod reran the tournament as an ecology, reweighting each rule's share by its score and iterating. Nice rules grew; exploiters flourished early on the suckers and then starved.

Equilibrium analysis asks what could stand. Evolutionary and simulation analysis ask what survives the crowd you happen to be in.

## Recall
type: mcq
Q: What question do Axelrod's tournaments answer that the folk theorem does not?
- [x] Which strategy does well against the population you actually face — selection among equilibria, rather than which outcomes are equilibria at all.
- [ ] Whether cooperation can ever be rational — that is precisely what the folk theorem already settles for a patient enough player.
- [ ] Whether tit-for-tat is evolutionarily stable — it is not; Boyd and Lorberbaum showed no pure strategy in this game is.
