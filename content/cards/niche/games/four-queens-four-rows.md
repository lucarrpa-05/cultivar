---
id: niche.games.puzzles.four-queens-four-rows
topic: niche.games.puzzles
format: challenge
difficulty: 2
language: en
weight: light
angles: [beautiful, tool]
tags: [queens, chessboard, diagonals, placement]
hook: "Four queens fit on a four-by-four board, but one careless diagonal ruins everything."
sources:
  - {title: "Eight queens puzzle", type: wiki, url: "https://en.wikipedia.org/wiki/Eight_queens_puzzle"}
dates: {written: 2026-09-20}
author: content-author
reviewed: {by: reviewer-dayone-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Rewrote title and opening; clarified the diagonal check."}
---

# Sixteen squares, only two safe arrangements

Only two arrangements let four queens share a four-by-four board without attacking one another. A queen attacks along her row, column, and both diagonals. No other pieces block their lines of sight. Can you find one of the two?

One queen must occupy each row and each column, so you can record a candidate as four column numbers, one per row. That leaves only 24 arrangements to consider, but checking them blindly is no fun. Start with a queen in row one, column two. A diagonal now rules out more of row two than you might expect. See whether the remaining choices force the next two queens.

## Recall
type: reveal
Q: Give the column of a queen in each row, top to bottom, with no attacks.
A: Columns 2, 4, 1, 3 work. They are all different, so no column attack; no pair's column distance equals its row distance, so no pair shares a diagonal. Reflecting the board gives 3, 1, 4, 2.
