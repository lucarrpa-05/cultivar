---
id: bio.evolution.evolutionary-games.nash-with-no-reasoning
topic: bio.evolution.evolutionary-games
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [ess, nash-equilibrium, hawk-dove, replicator-dynamics, maynard-smith]
hook: "Nash assumed players who reason. Evolution has none, gets equilibrium anyway, and its version is strictly stronger."
callback: {from: econ.game-theory.dominance-nash, to: bio.evolution.evolutionary-games}
sources:
  - {title: "The logic of animal conflict, Nature 246, 15–18", author: "John Maynard Smith and George R. Price", year: 1973, type: paper, url: "https://doi.org/10.1038/246015a0"}
  - {title: "Evolutionarily stable strategy", type: wiki, url: "https://en.wikipedia.org/wiki/Evolutionarily_stable_strategy"}
  - {title: "Replicator equation", type: wiki, url: "https://en.wikipedia.org/wiki/Replicator_equation"}
dates: {written: 2026-09-19, event: 1973-11-02}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Fixed callback.from (was econ.game-theory.evolutionary, which gates the card behind the idea it teaches) to dominance-nash; corrected \"Nash equilibria are exactly the rest points\" — the converse fails."}
---

# Remember Nash equilibrium? Evolution found a stricter version

When you met Nash equilibrium, the justification was psychological: rational players, common knowledge, nobody wants to deviate given what everyone else does. In 1973 Maynard Smith and Price asked what survives if you delete the players. No reasoning, no beliefs, no common knowledge. Strategies are inherited, payoff is offspring, and the population plays against itself.

Equilibrium survives, and it comes back sharper. A strategy is *evolutionarily stable* if a population playing it cannot be invaded: any rare mutant does strictly worse than the residents do, so selection removes it. That is not a new solution concept bolted onto Nash. It is Nash plus one extra requirement, and the extra requirement bites.

Their example is Hawk–Dove. Two animals contest a resource worth $V$; a fight costs $C$. Doves share, hawks escalate, and when two hawks meet they split the spoils and the injuries. If $C>V$, neither pure strategy is stable — a population of doves is invaded by hawks, a population of hawks by doves — and the stable mixture is exactly $V/C$ hawks.

The relationship to Nash is a containment, and it is strict.

## Rigor

A strategy $S$ is an **ESS** if, for every $T \neq S$, either

$$E(S,S) > E(T,S), \qquad\text{or}\qquad E(S,S) = E(T,S)\ \text{ and }\ E(S,T) > E(T,T).$$

The first clause says $S$ is a strict best reply to itself; the second handles ties by asking that $S$ do better against the invader than the invader does against itself. Condition one alone is strict Nash, so **every ESS is a Nash equilibrium of the symmetric game, and the inclusion is proper**: rock–paper–scissors has a unique Nash equilibrium (uniform) which is not an ESS, because every alternative ties against it and does no worse against itself.

Hawk–Dove, checked. With hawk frequency $p$,

$$E(H)=p\frac{V-C}{2}+(1-p)V,\qquad E(D)=(1-p)\frac{V}{2},$$

and equating them gives $p^{*}=V/C$ for $V<C$.

The dynamic version replaces "cannot be invaded" with an ODE. Under the replicator equation $\dot{x}_i = x_i\left(f_i(x)-\bar{f}(x)\right)$, every Nash equilibrium is a rest point. The converse fails — every pure state is a rest point, however bad — but the good direction is enough: every ESS is an asymptotically stable rest point. Equilibrium without a single reasoning agent: the fixed point of a differential equation, reached by dying.

## Recall
type: mcq
Q: What does an ESS require that a Nash equilibrium does not?
- [x] That rare mutants be actively driven out — if a mutant ties against the incumbent, the incumbent must still beat it in mutant-versus-mutant play.
- [ ] That the strategy be pure rather than mixed — the Hawk–Dove ESS is a mixture, $V/C$ hawks.
- [ ] That players know each other's payoffs — evolutionary games work precisely because nobody knows anything.
- [ ] That the game be zero-sum — nothing in the definition constrains the payoff structure that way.
