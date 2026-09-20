---
id: econ.game-theory.mixed-strategies.matching-pennies
topic: econ.game-theory.mixed-strategies
format: series
difficulty: 3
language: en
weight: medium
angles: [paradox, beautiful]
tags: [mixed-strategies, matching-pennies, indifference-principle, minimax]
series: {id: econ.game-theory.nash-and-after, index: 2, total: 4, title: "Nash and after"}
hook: "Your equilibrium mixture is not determined by your payoffs. It is determined by your opponent's."
sources:
  - {title: "Matching pennies", type: wiki, url: "https://en.wikipedia.org/wiki/Matching_pennies"}
  - {title: "Minimax theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Minimax_theorem"}
dates: {written: 2026-09-19}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The game with no answer until you agree to be unpredictable

Two players each slap down a coin. Faces match, I take both; faces differ, you do. Try to find a stable pair of choices. Heads–heads? You should have played tails. Heads–tails? I should have played tails. Walk round the four cells and you never stop moving.

Matching pennies has no equilibrium in the ordinary sense, and that failure is not a technicality. It is the defining feature of every game where one player wants to be guessed wrong. A goalkeeper with a favourite side is a goalkeeper who has been scouted.

Nash's repair is to widen what counts as a strategy: choose probabilities, not actions. Now an equilibrium exists — both randomise fifty-fifty, and neither can do better.

The strange part is *why* fifty-fifty is right. Not because it maximises your payoff. Because it makes your opponent indifferent.

## Rigor

In a mixed equilibrium every action a player uses with positive probability must earn exactly the same expected payoff; otherwise shifting weight onto the best of them would be an improvement. That is the **indifference principle**, and it is what you actually solve.

Matching pennies: I win 1 when the coins match, my opponent wins 1 when they differ. Let $q$ be the probability my opponent plays heads. My expected payoff from heads is $q-(1-q)=2q-1$; from tails it is $(1-q)-q=1-2q$. For me to be willing to mix at all these must be equal, so $q=1/2$. Symmetrically, my own probability $p$ must equal $1/2$ to keep my opponent willing to mix.

Read what just happened. My probability is pinned down by *my opponent's* indifference condition, not by my own payoffs. Double my prize for matching heads and my equilibrium mixture does not move; my opponent's does. In equilibrium your randomisation exists to kill their incentive to deviate, not to serve you.

The value of the game to me is $0$, and von Neumann's minimax theorem (1928) says every finite two-player zero-sum game has such a value, attained in mixed strategies. Nash generalised it past zero-sum.

Existence was the win. The bill arrives in episode 3: allow sequencing and games acquire *too many* equilibria, some of them plainly absurd.

## Recall
type: mcq
Q: In a mixed-strategy equilibrium, what pins down your probabilities?
- [x] Your opponent's indifference condition — you mix in exactly the way that leaves them with no reason to switch.
- [ ] Your own payoffs — change your prizes and your equilibrium mixture stays put; theirs is what moves.
- [ ] Nothing in particular, since any mixture works — only the indifference-inducing mixture is stable against deviation.
