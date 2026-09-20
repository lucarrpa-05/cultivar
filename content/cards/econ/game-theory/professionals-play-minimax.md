---
id: econ.game-theory.mixed-strategies.professionals-play-minimax
topic: econ.game-theory.mixed-strategies
format: idea
difficulty: 3
language: en
weight: heavy
angles: [prediction, numbers]
tags: [penalty-kicks, minimax, serial-independence, palacios-huerta, football]
hook: "More than 1,400 professional penalties, and both halves of von Neumann's minimax theorem survived the test."
sources:
  - {title: "Professionals play minimax, Review of Economic Studies 70(2)", author: "Ignacio Palacios-Huerta", year: 2003, type: paper, url: "https://ideas.repec.org/a/oup/restud/v70y2003i2p395-415.html"}
  - {title: "Penalty kick (association football)", type: wiki, url: "https://en.wikipedia.org/wiki/Penalty_kick_(association_football)"}
dates: {written: 2026-09-19, event: 2003-04-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Penalty kicks are the best experiment game theory ever got

A penalty is a two-person zero-sum game with simultaneous moves, played by professionals who have rehearsed it thousands of times, for stakes that end careers. Game theory has rarely had a laboratory that good.

Ignacio Palacios-Huerta gathered more than 1,400 penalties from professional leagues and tested the two things minimax actually predicts. First, scoring probabilities should be equal across the strategies a player genuinely uses: if kicking left scored more often than kicking right, kickers would go left more until goalkeepers adjusted and the rates levelled. Second, choices should be serially independent — no alternating, no streaks, nothing a scout could sell.

Both held. Winning probabilities were statistically identical across strategies, and serial independence could not be rejected, in tests with real power against the obvious alternatives.

It is the first time both implications of the minimax theorem passed in a natural setting. None of the players could state the theorem. They had simply been punished for years for being predictable.

## Rigor

A two-player zero-sum game with payoff matrix $A$ has a **value**

$$v=\max_{p\in\Delta(S_1)}\ \min_{q\in\Delta(S_2)}\ p^{\top}Aq\;=\;\min_{q}\ \max_{p}\ p^{\top}Aq,$$

by von Neumann's minimax theorem (1928). Two testable consequences follow for the equilibrium mixtures.

**Equal payoffs across used strategies.** If $p^{*}_i>0$ then $(Aq^{*})_i=v$. A kicker who truly mixes between left and right must therefore score at the same rate with each. Note that this is a restriction on *outcomes*, not on frequencies: it holds even though optimal mixtures are nowhere near fifty-fifty, because kickers have a stronger side and everyone knows it.

**Serial independence.** The equilibrium is one fixed mixture played i.i.d. across repetitions. Any dependence on the previous kick — alternating, streaking, reacting to the last save — is exploitable, so equilibrium forbids it.

The second test is the brutal one, because people asked to generate random sequences alternate far too much. These professionals did not. Keep the boundary of the result in view: it says experienced players in a well-practised, high-stakes, strictly competitive game land on the equilibrium. It says nothing about anyone meeting a new game for the first time, where the evidence runs firmly the other way.

## Recall
type: mcq
Q: Why does minimax predict equal scoring rates across a kicker's strategies?
- [x] Any strategy used with positive probability must earn the value of the game — otherwise the kicker would shift weight onto the better one.
- [ ] Because the kicker mixes fifty-fifty — optimal mixtures here are not fifty-fifty; the prediction is about rates, not frequencies.
- [ ] Because goalkeepers dive at random — goalkeepers play their own optimal and generally unequal mixture.
