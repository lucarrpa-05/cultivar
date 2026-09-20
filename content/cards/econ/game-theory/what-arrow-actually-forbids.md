---
id: econ.game-theory.social-choice.what-arrow-actually-forbids
topic: econ.game-theory.social-choice
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, paradox]
tags: [arrow-theorem, iia, social-welfare-function, gibbard-satterthwaite]
prerequisites: [econ.micro.preferences-utility, poli.democracy.arrow]
callback: {from: poli.democracy.arrow, to: econ.game-theory.social-choice}
hook: "\"There is no perfect voting system\" is not what Arrow proved, and the difference is where all the interesting work is."
sources:
  - {title: "Arrow's impossibility theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Arrow%27s_impossibility_theorem"}
  - {title: "Gibbard–Satterthwaite theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Gibbard%E2%80%93Satterthwaite_theorem"}
  - {title: "Kenneth Arrow", type: wiki, url: "https://en.wikipedia.org/wiki/Kenneth_Arrow"}
dates: {written: 2026-09-19, event: 1951-01-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember Arrow's theorem? Here is what it actually forbids

Remember Arrow's impossibility theorem — the one everyone summarises as "there is no perfect voting system"? That summary does real damage, because the theorem is far more specific, and far more interesting, than the slogan.

Arrow is not about a single election. It is about a *rule* that takes everybody's full ranking of all the candidates and returns one social ranking, for every conceivable profile of individual rankings. With three or more alternatives, four mild-sounding requirements on such a rule are jointly impossible, and the proof does something stronger than say "impossible": it locates a dictator.

What the theorem does not say: that majority rule is bad, that voting is pointless, or that all systems are equally flawed. Approval and range voting escape by using more than rankings. Single-peaked preferences escape by shrinking the domain. Every escape from Arrow is an escape from one specific hypothesis, which is why the hypotheses repay careful reading.

The one everybody fights about is the third.

## Rigor

Let $A$ be a set of alternatives with $|A|\ge 3$ and $N$ a finite set of voters. A **social welfare function** $F$ maps each profile $(\succ_1,\dots,\succ_n)$ of complete transitive individual rankings to a complete transitive social ranking.

**Theorem (Arrow, 1950, 1951).** No $F$ satisfies all four of:

1. **Unrestricted domain** — $F$ is defined on every profile of complete transitive rankings.
2. **Weak Pareto** — if every voter ranks $a$ above $b$, society does too.
3. **Independence of irrelevant alternatives** — society's ranking of $a$ against $b$ depends only on how voters rank $a$ against $b$.
4. **Non-dictatorship** — no single voter's strict ranking always becomes society's.

Condition 3 is the contested one. It is what kills the Borda count and anything using intensity: if a voter shifts $c$ about without touching $a$ versus $b$, the social verdict on $a$ versus $b$ must not move.

The standard proof builds a **decisive set**. Show some coalition is decisive over some pair; use unrestricted domain and IIA to spread decisiveness from one pair to all pairs; then shrink the decisive set one voter at a time until a single voter remains. That voter is the dictator.

Gibbard and Satterthwaite later proved the strategic twin: any voting rule with at least three possible winners that is not dictatorial can be manipulated by a voter who misreports. Arrow constrains aggregation, Gibbard–Satterthwaite constrains honesty, and they are the same obstruction seen from two sides.

## Recall
type: mcq
Q: Which Arrow condition rules out the Borda count?
- [x] Independence of irrelevant alternatives — Borda scores depend on where the other candidates sit, so moving a third one can flip $a$ against $b$.
- [ ] Weak Pareto — Borda respects unanimity perfectly well.
- [ ] Unrestricted domain — Borda is defined on every profile of rankings, so that is not where it fails.
