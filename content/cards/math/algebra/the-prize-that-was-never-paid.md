---
id: math.algebra.permutations.the-prize-that-was-never-paid
topic: math.algebra.permutations
format: story
difficulty: 2
language: en
weight: medium
angles: [history, mistake]
tags: [fifteen-puzzle, parity, sam-loyd, permutations, impossibility]
hook: "Loyd offered a thousand dollars for a puzzle position. Two mathematicians had already proved it unreachable — the year before the craze."
sources:
  - {title: "15 puzzle", type: wiki, url: "https://en.wikipedia.org/wiki/15_puzzle"}
  - {title: "Notes on the '15' Puzzle, American Journal of Mathematics 2(4), 397-404", author: "Wm. Woolsey Johnson and William E. Story", year: 1879, type: paper, url: "https://doi.org/10.2307/2369492"}
dates: {written: 2026-09-19, event: 1880-01-01}
related: [math.algebra.permutations.parity-is-not-a-convention]
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The thousand-dollar prize for a position that does not exist

In 1880 the United States lost several months to a four-by-four tray holding fifteen numbered tiles and one gap. The puzzle came from Noyes Palmer Chapman, a postmaster in Canastota, New York, who had shown a precursor to friends as early as 1874.

Sam Loyd, the country's most famous puzzle writer, had nothing to do with it. From 1891 until his death in 1911 he claimed he had invented the thing, and he advertised a \$1,000 prize to anyone who could take the finished board with the 14 and the 15 swapped and slide it back into order.

The money was never at risk. William Woolsey Johnson and William Story had published the reason in the *American Journal of Mathematics* in 1879 — the year *before* the craze. Every slide swaps the gap with one tile, and bringing the gap home takes an even number of slides, so only even rearrangements are reachable. Swapping two tiles is odd. Exactly half of the 20,922,789,888,000 arrangements are not in the puzzle at all.

Loyd's claim to the invention was finally dismantled by Jerry Slocum and Dic Sonneveld in *The 15 Puzzle* (2006).

## Recall
type: mcq
Q: Why can the 14–15 swap never be reached by sliding?
- [x] Each slide is one transposition, and returning the gap to its corner takes an even number of them — so only even permutations of the tiles occur, and a single swap is odd.
- [ ] Because the tray is too small to manoeuvre in — the constraint is arithmetic, not spatial; a five-by-five tray has the same obstruction.
- [ ] Because nobody has found the sequence yet — it is proved impossible, not merely unfound; the proof predates the puzzle craze.
