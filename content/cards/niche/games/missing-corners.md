---
id: niche.games.puzzles.missing-corners
topic: niche.games.puzzles
format: challenge
difficulty: 2
language: en
weight: light
angles: [paradox, beautiful]
tags: [chessboard, dominoes, coloring, impossibility]
hook: "Sixty-two squares, thirty-one dominoes. The arithmetic fits; the tiling does not."
sources:
  - {title: "Mutilated chessboard problem", type: wiki, url: "https://en.wikipedia.org/wiki/Mutilated_chessboard_problem"}
dates: {written: 2026-09-20}
author: content-author
reviewed: {by: reviewer-dayone-2026-09-20, at: 2026-09-20, verdict: approved}
---

# The chessboard that refuses thirty-one dominoes

Take an 8-by-8 chessboard and remove two diagonally opposite corner squares. You have 62 squares left. Each domino covers exactly two neighboring squares, so 31 dominoes seem perfect. Can you cover the board without gaps or overlaps?

Try a few placements and the obstruction stays hidden. Before moving a single tile, color the board the usual black and white. Every domino, whether vertical or horizontal, must cover one square of each color. What color are the two corners you removed? The answer is a tiny proof of impossibility, and it survives every clever arrangement you might try.

## Recall
type: reveal
Q: Why can no 31 dominoes cover the board with opposite corners removed?
A: Opposite corners have the same color. Removing them leaves 30 squares of that color and 32 of the other. Every domino covers one of each, so 31 dominoes would require 31 of each color.
