---
id: niche.games.puzzles.take-twenty-one
topic: niche.games.puzzles
format: challenge
difficulty: 2
language: en
weight: light
angles: [tool, prediction]
tags: [take-away-game, strategy, multiples-of-four, nim]
hook: "In a pile of 21 stones, the first move can make every later move feel forced."
sources:
  - {title: "Subtraction game", type: wiki, url: "https://en.wikipedia.org/wiki/Subtraction_game"}
dates: {written: 2026-09-20}
author: content-author
reviewed: {by: reviewer-dayone-2026-09-20, at: 2026-09-20, verdict: approved}
---

# Twenty-one stones and a reply you can memorize

There are 21 stones in a pile. Two people alternate removing one, two, or three stones. Whoever takes the last stone wins. You play first. Can you force a win against any reply?

Try starting near the end: with four stones and your turn, every choice leaves your opponent a winning final move. So four is a bad number to receive. Eight is bad for the same reason if you can always return the pile to four. Work backwards by fours until you reach 20. Your opening should hand your opponent that number; after each move, take just enough stones to complete a group of four.

## Recall
type: reveal
Q: What first move forces a win from 21 stones?
A: Take one, leaving 20. If the opponent takes $k$ stones, take $4-k$. Together you remove four, leaving 16, then 12, 8, 4, and finally 0 after your move.
