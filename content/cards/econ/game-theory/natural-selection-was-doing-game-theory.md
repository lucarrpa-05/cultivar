---
id: econ.game-theory.evolutionary.natural-selection-was-doing-game-theory
topic: econ.game-theory.evolutionary
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [ess, maynard-smith, price, nash-refinement, animal-conflict]
prerequisites: [econ.game-theory.mixed-strategies, bio.evolution.natural-selection]
callback: {from: bio.evolution.natural-selection, to: econ.game-theory.evolutionary}
hook: "An evolutionarily stable strategy is a Nash equilibrium plus one extra inequality — and no rationality anywhere."
sources:
  - {title: "Evolutionarily stable strategy", type: wiki, url: "https://en.wikipedia.org/wiki/Evolutionarily_stable_strategy"}
  - {title: "The logic of animal conflict, Nature 246(5427)", author: "Maynard Smith & Price", year: 1973, type: paper, url: "https://doi.org/10.1038/246015a0"}
dates: {written: 2026-09-19, event: 1973-11-02}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember natural selection? It was doing game theory

Remember natural selection — differential reproduction of heritable variants, no foresight required? Here is what bothered biologists about it for a century. Fitness is not a number pinned to a trait. Being tall pays if everyone else is short. Being aggressive pays if everyone else backs down. The environment that selects you is mostly other members of your own species, and they are evolving too.

That is a game, and nobody wrote it down until John Maynard Smith and George Price did so in *Nature* in 1973. Their question was why animals fighting over a mate or a territory so rarely fight to the death, when a killer ought to out-reproduce everyone.

Their answer: a population of killers is invadable. Any strategy common enough to *be* the environment must also fend off mutants, and "kill everything" cannot. They called such a strategy evolutionarily stable, and its definition is a Nash equilibrium plus one extra line.

## Rigor

Let $E(X,Y)$ be the expected payoff — here, fitness — to an individual playing $X$ against an opponent playing $Y$.

**Definition (Maynard Smith and Price, 1973).** $S$ is an **evolutionarily stable strategy** if for every $T\ne S$, either

$$\text{(i)}\quad E(S,S)>E(T,S),\qquad\text{or}\qquad\text{(ii)}\quad E(S,S)=E(T,S)\ \text{ and }\ E(S,T)>E(T,T).$$

Condition (i) alone says $S$ is a best response to itself, which is exactly Nash equilibrium. So every ESS is a Nash equilibrium. Condition (ii) is the extra demand, and it is where the biology lives: if a mutant does *equally well* against the resident population, stability requires the resident to beat the mutant when the two meet. A rare mutant meets residents almost always and other mutants almost never, so (i) handles the common case and (ii) breaks the tie.

The converse fails. In matching pennies the mixed equilibrium has $E(S,S)=E(T,S)$ and $E(S,T)=E(T,T)$ for every $T$, so nothing there is evolutionarily stable — and Nash equilibria that are not ESS are precisely the ones a drifting population can wander away from.

Two things carry over from selection untouched. No rationality is assumed anywhere, only replication in proportion to payoff. And the equilibrium is a property of the *population*, which is the right way to read a mixed strategy here: thirty percent hawks in the field, not every animal tossing a coin.

## Recall
type: mcq
Q: What does the second ESS condition add on top of Nash equilibrium?
- [x] It breaks ties against mutants that do equally well — the resident must beat the mutant when the two meet each other.
- [ ] It forces the strategy to be pure — ESS mixtures are common, and hawk–dove has one.
- [ ] It requires the players to be rational — no rationality enters anywhere; only replication in proportion to payoff does.
