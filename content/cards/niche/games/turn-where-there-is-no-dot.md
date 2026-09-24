---
id: niche.games.puzzles.turn-where-there-is-no-dot
topic: niche.games.puzzles
format: idea
difficulty: 2
language: en
weight: medium
angles: [mistake, beautiful]
tags: [nine-dots, polygonal-path, counting, lower-bound, outside-the-box]
hook: "Leaving the square is not a mind hack. It is the only place you can turn without wasting a dot."
related: [niche.games.puzzles.nine-dots-no-box]
answersQuestion: q-2026-09-20-cse7
sources:
  - {title: "Nine dots puzzle", type: wiki, url: "https://en.wikipedia.org/wiki/Nine_dots_puzzle"}
  - {title: "Unicursal Polygonal Paths and Other Graphs on Point Lattices, Pi Mu Epsilon Journal 5(3), pp. 107-117", author: "Solomon W. Golomb and John L. Selfridge", year: 1970, type: paper, url: "https://www.pme-math.org/journal/issues/PMEJ.Vol.5.No.3.pdf"}
dates: {written: 2026-09-23}
diagram: {file: niche/nine-dots-four-lines.svg, caption: "The four strokes, numbered in order. Two of the three turns happen on empty paper outside the dashed square.", alt: "Nine dots in a dashed square. Four numbered strokes: along the top row and past it, diagonally down-left to below the square, up the left column, diagonally through the centre."}
author: author-niche-1
reviewed: {by: reviewer-niche-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Rigor gap closed: 'every turn inside' does not keep the two free ends inside, so the proof now trims them first. Added Golomb and Selfridge (1970) as primary support for the 6x6 claim (p. 110). Case analysis and diagram checked."}
---

# Nine dots: the real trick is turning where there is no dot

From the top-left dot, draw along the top row and one step past it. Turn diagonally down-left through two dots, to just below the bottom-left dot. Go up the left column. Finish diagonally down-right through the centre. Four strokes, nine dots.

Why must it leave the square? Inside, a stroke catches at most three dots, and the only three-dot strokes are rows, columns and diagonals, which end on dots. So you keep turning on dots, counting each one twice. Four strokes can't afford that waste; the one chain that breaks even runs around the edge and misses the centre. Outside, you turn on empty paper for free.

"Can't afford" is a count you can check in a few lines.

## Rigor

Here is the count. Put the dots at $\{0,1,2\}^2$ and suppose four segments cover them with every turn inside the square $[0,2]^2$. Trim the two free ends back to the square, which loses no dots. Then every segment stays inside the square, so each covers at most 3 dots, and a 3-dot segment is exactly a full row, column or diagonal, with dots at both ends. Consecutive segments share a turn; if the turn is a dot, that dot is counted twice. Hence

$$\#\text{dots covered} \le \sum_{i=1}^{4} \#(\text{dots on segment } i) - \#(\text{turns on dots}).$$

Every turn next to a 3-dot segment is on a dot. With $k$ three-dot segments:

- $k = 0$: sum at most 8.
- $k = 1$: sum at most $3+2+2+2 = 9$, and some turn is dotted. At most 8.
- $k = 2$: sum at most 10, at least two dotted turns. At most 8.
- $k = 3$: sum at most 11, all three turns dotted. At most 8.
- $k = 4$: sum 12, three dotted turns, exactly 9. But the middle row and column end at side midpoints where no other full line ends, so they cannot be chained. The side midpoints then force all four sides, and the sides miss the centre.

So some turn must lie outside. Three segments never work anywhere: they would need three disjoint 3-dot lines, which must be parallel, and parallel lines cannot be chained.

The box is a quirk of small grids: Golomb and Selfridge (1970) showed that from 6×6 up, a path with the fewest possible segments can stay inside it, and even close into a loop.

## Recall
type: mcq
Q: What actually forces a four-stroke solution out of the square?
- [ ] The puzzle's hidden "think outside the box" rule — the rules never mention a box; leaving it is forced by counting, not by instruction.
- [x] Inside, turns land on dots and count them twice, and four strokes cannot afford that — outside, a turn costs nothing.
- [ ] Only horizontal lines can hold three dots — diagonals hold three too, and the solution uses one.
