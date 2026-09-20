---
id: css.abm.cellular-automata.fifty-dollars-for-a-glider-gun
topic: css.abm.cellular-automata
format: idea
difficulty: 1
language: en
weight: medium
angles: [history, beautiful, weird]
tags: [game-of-life, cellular-automata, conway, gosper, turing-complete]
hook: "Conway bet fifty dollars that nothing in his game could grow forever. He lost within weeks."
sources:
  - {title: "Conway's Game of Life", type: wiki, url: "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"}
  - {title: "Gun (cellular automaton)", type: wiki, url: "https://en.wikipedia.org/wiki/Gun_(cellular_automaton)"}
  - {title: "Martin Gardner", type: wiki, url: "https://en.wikipedia.org/wiki/Martin_Gardner"}
dates: {written: 2026-09-19, event: 1970-10-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Hook said 'inside two months'; Gardner's column ran October 1970 and Gosper's gun arrived that November, so 'within weeks'."}
author: author-css-1
---

# Conway bet fifty dollars against his own game. He lost in a month.

Four rules, a square grid, cells that are alive or dead. A live cell with two or three live neighbours survives; with fewer it dies, with more it dies. A dead cell with exactly three live neighbours comes alive. John Conway worked the first patterns out by hand, moving stones on a Go board.

Martin Gardner put it in *Scientific American* in October 1970 and it escaped. Conway had publicly conjectured that no starting pattern could grow without limit, and offered fifty dollars to anyone who proved him wrong before the year ended. In November a group at MIT led by Bill Gosper found the glider gun: a small arrangement that fires off a glider every thirty generations, forever.

That was not just a lost bet. If a pattern can manufacture gliders on demand, gliders can carry signals, and signals can be made to compute. The Game of Life is Turing complete: anything a computer can do, four rules on graph paper can do.

Here is why that matters for modelling societies, not just for fun.

## Rigor

Formally the rules are **B3/S23**: a dead cell is born with exactly three live neighbours; a live cell survives with two or three, in the eight-cell Moore neighbourhood, updated synchronously everywhere.

Two facts make the toy serious. First, **irreducibility**: there is no shortcut. To know whether a given pattern ever dies out you generally have to run it, because the Game of Life can simulate a universal Turing machine and the halting problem is undecidable. No closed-form answer exists, not because nobody has been clever enough but as a theorem.

Second, **the glider as a moving object**: it translates one cell diagonally every four generations. Nothing in the rules mentions motion, direction or speed. "A glider travelling southeast at $c/4$" is a true, useful, predictive statement about a system whose entire specification is a rule about counting neighbours.

That is the licence agent-based social science takes. You are allowed to name and track objects — a jam, a cluster, a rumour, a coalition — that appear nowhere in your microspecification. And you are warned, by the same theorem, that you may have to simulate rather than solve.

## Recall
type: mcq
Q: What does the Game of Life's Turing completeness imply for anyone modelling with simple rules?
- [x] There is generally no shortcut — some questions about the long run can only be answered by running the thing, as a matter of undecidability.
- [ ] That simple rules can model any social system faithfully — computational power says nothing about empirical adequacy.
- [ ] That the rules must be complicated to be interesting — the rules are four lines, and that is the point.
