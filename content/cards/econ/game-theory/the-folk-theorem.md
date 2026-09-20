---
id: econ.game-theory.repeated-games.the-folk-theorem
topic: econ.game-theory.repeated-games
format: idea
difficulty: 4
language: en
weight: heavy
angles: [paradox, open-problem]
tags: [folk-theorem, minmax, discount-factor, grim-trigger, fudenberg-maskin]
hook: "Repetition explains cooperation. It also explains almost every other pattern of behaviour, which is the problem."
sources:
  - {title: "Folk theorem (game theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Folk_theorem_(game_theory)"}
  - {title: "The folk theorem in repeated games with discounting or with incomplete information, Econometrica 54(3)", author: "Fudenberg & Maskin", year: 1986, type: paper, url: "https://doi.org/10.2307/1911307"}
dates: {written: 2026-09-19, event: 1986-05-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Everything is an equilibrium, if the game never ends

In a one-shot prisoner's dilemma, defection is the only equilibrium and cooperation is wishful thinking. Play the same game every day forever and cooperation becomes an equilibrium: I cooperate because I expect you to, and because I know what happens to me if I stop.

Good. The trouble is what *else* becomes an equilibrium. I cooperate on Mondays and defect on Thursdays — equilibrium. You take 90% of the surplus and I take 10% — equilibrium. Almost any pattern you can describe, provided it pays each of us at least what we could guarantee alone, is supportable by some arrangement of threats.

That is the folk theorem, so named because it circulated among game theorists for years before anybody troubled to publish it. It is at once the field's most celebrated result and its most awkward: repetition explains cooperation, and repetition explains nearly everything else, which is uncomfortably close to explaining nothing.

The content is in the precise statement.

## Rigor

Fix a finite stage game with payoffs $u_i$. Player $i$'s **minmax** value is

$$\underline{v}_i=\min_{\sigma_{-i}}\ \max_{a_i}\ u_i(a_i,\sigma_{-i}),$$

the most $i$ can guarantee when everyone else is trying to hold them down. A payoff vector $v$ is *individually rational* if $v_i>\underline{v}_i$ for every $i$, and *feasible* if it is a convex combination of stage-game payoff vectors. Let $V^{*}$ be the set of feasible, strictly individually rational payoffs.

**Folk theorem (Fudenberg and Maskin, 1986).** If $V^{*}$ has full dimension $|N|$, then for every $v\in V^{*}$ there is $\underline{\delta}<1$ such that for all discount factors $\delta\in(\underline{\delta},1)$, $v$ is the average payoff of some subgame-perfect equilibrium of the infinitely repeated game.

Two conditions carry the weight. *Patience*: with $\delta$ near 1 the one-period gain from cheating is negligible against a permanent loss. *Full dimensionality*: it lets a punishment hurt one player while still rewarding the punishers, so that carrying out the punishment is itself credible — without it the threat has exactly the price-war problem.

Grim trigger in a prisoner's dilemma with payoffs $3$ for mutual cooperation, $1$ for mutual defection, $4$ for cheating and $0$ for being cheated: cooperation holds when $3/(1-\delta)\ge 4+\delta/(1-\delta)$, that is $\delta\ge 1/3$.

## Recall
type: mcq
Q: What is the full-dimensionality condition doing in the folk theorem?
- [x] It lets a punishment hurt one player while rewarding the punishers — so carrying out the threat is itself credible.
- [ ] It makes the equilibrium payoff unique — the theorem delivers the opposite: a continuum of supportable payoffs.
- [ ] It allows players to randomise — mixing is available whatever the dimension of the payoff set.
