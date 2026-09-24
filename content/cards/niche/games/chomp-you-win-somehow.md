---
id: niche.games.puzzles.chomp-you-win-somehow
topic: niche.games.puzzles
format: challenge
difficulty: 2
language: en
weight: medium
angles: [paradox, beautiful]
tags: [chomp, strategy-stealing, existence-proof, combinatorial-games, david-gale]
hook: "On every rectangular bar, the first player has a winning strategy. For most bars, nobody knows what it is."
related: [niche.games.puzzles.take-twenty-one, econ.game-theory.extensive-form.chess-was-decided-in-1913, math.foundations.logic-proofs.a-proof-with-no-example]
sources:
  - {title: "Chomp", type: wiki, url: "https://en.wikipedia.org/wiki/Chomp"}
  - {title: "Strategy-stealing argument", type: wiki, url: "https://en.wikipedia.org/wiki/Strategy-stealing_argument"}
  - {title: "A Curious Nim-Type Game", author: "David Gale", year: 1974, type: paper, url: "https://doi.org/10.1080/00029890.1974.11993683"}
dates: {written: 2026-09-23}
author: author-niche-1
reviewed: {by: reviewer-niche-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Gale gave the game its chocolate form in 1974; an equivalent divisor game by Frederik Schuh came first, so 'published the game' became 'gave it this chocolate form'. Strategy-stealing proof checked."}
---

# You win this chocolate game, and nobody can tell you how

A chocolate bar, some rows by some columns, with the top-left square poisoned. Players take turns choosing a square and eating it together with every square below it and to its right. Whoever is left with only the poison must eat it, and loses. David Gale gave it this chocolate form in 1974.

Your challenge: prove that on any bar bigger than 1×1, the first player can force a win. Not by finding the strategy. For most bar sizes, nobody knows the winning first bite.

One clue: the bottom-right square disappears with every possible bite. Open by nibbling just that square, then let the second player do your thinking.

## Rigor

Here is how the thinking gets stolen. Chomp is finite, has perfect information and cannot end in a draw, so by backward induction exactly one player has a winning strategy. Suppose it were the second player.

Let the first player open by eating only the bottom-right square $c$. The second player's winning strategy answers with some bite at a square $r$. Every bite removes everything below and to the right of the chosen square, and $c$ is below and to the right of every square. So the position after "$c$, then $r$" is exactly the position after "$r$" alone.

Then the first player could have opened with $r$. That position is, by assumption, lost for whoever must move next, and now that is the second player. The first player has stolen the strategy, so the second player never had a winning one, and the first player does.

The argument never says what $r$ is. That is why it is called non-constructive, and why explicit winning openings are known only for special shapes. On a square bar: bite at the square diagonally below-right of the poison, leaving an L with two equal arms, then copy every move of your opponent on the other arm.

## Recall
type: reveal
Q: What single fact about the bottom-right square makes the steal work?
A: Every bite eats it anyway. So opening with it changes nothing that the second player's reply would not have done, and the first player can play that reply as his own opening instead.
