---
id: econ.game-theory.extensive-form.the-centipede
topic: econ.game-theory.extensive-form
topics: [econ.behavioral.behavioral-game-theory]
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, numbers]
tags: [centipede-game, backward-induction, common-knowledge, rosenthal]
diagram: {file: econ/centipede-game.svg, caption: "Take and the game ends; pass and the pot doubles. The equilibrium is the first move.", alt: "A game tree with four decision nodes in a row, each with a downward take branch to payoffs and a rightward pass branch, ending in the largest payoff"}
hook: "Backward induction says take the money and run on move one. Out of 662 games, that happened 37 times."
sources:
  - {title: "Centipede game", type: wiki, url: "https://en.wikipedia.org/wiki/Centipede_game"}
  - {title: "An experimental study of the centipede game, Econometrica 60(4)", author: "McKelvey & Palfrey", year: 1992, type: paper, url: "https://doi.org/10.2307/2951567"}
dates: {written: 2026-09-19, event: 1992-07-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Take the money on move one. Almost nobody does.

Two players and a growing pile of money. At your turn you either take the larger share and end everything, or pass — which doubles the pot and hands the decision across the table. Robert Rosenthal drew this in 1981; the branches fan out like legs, so it is called the centipede.

Solve it from the end. At the last node taking beats passing, so the last mover takes. Knowing that, the player before takes. Roll the argument all the way back and the unique subgame-perfect equilibrium is: player one takes immediately, on move one, collecting the smallest payoff anywhere in the tree.

McKelvey and Palfrey ran the experiment in 1992. Across 662 games, only 37 ended with player one taking at the first move, and 23 ran the whole way to the end. Almost everyone passed for a while and then somebody took.

The question worth asking is not why people are irrational. It is what the backward-induction argument quietly assumed.

## Rigor

**Backward induction.** In a finite extensive-form game of perfect information, solve from the terminal nodes upward: at each decision node the mover is assumed to choose optimally given the already-solved continuation. Zermelo's 1913 argument shows this yields a strategy profile, subgame perfect by construction, and unique when payoffs are generic.

In the doubling centipede, let the mover at node $k$ collect $L_k$ by taking, and collect $S_{k+1}<L_k$ if the opponent takes immediately after a pass. Doubling gives $L_{k+2}=2L_k$: passing pays handsomely *if the game continues*, and costs you if it stops. At the last node taking dominates. Induct: if the player at $k+1$ takes, the player at $k$ compares $L_k$ with $S_{k+1}<L_k$ and takes. The induction runs back to node 1 without a scratch.

Now the hidden premise. The argument needs common knowledge of rationality *at every node* — including nodes that are reached only if somebody has already played irrationally. When player 2 is asked to move, she has just watched player 1 fail to take. Backward induction requires her to go on believing player 1 is rational. That is not a theorem about rationality; it is a stipulation about beliefs off the equilibrium path, and it is the hole that reputation models, trembling-hand refinements and level-k models all climb into.

## Recall
type: mcq
Q: What does the backward-induction solution of the centipede quietly assume?
- [x] Rationality stays common knowledge at nodes reached only by an irrational move — a belief that survives being contradicted.
- [ ] That players cannot communicate — communication is excluded anyway, and the argument would be identical if they could.
- [ ] That the pot stops growing — the pot doubles at every pass, which is exactly what makes the equilibrium so unattractive.
