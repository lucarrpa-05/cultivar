---
id: math.topology.knots.three-colours-prove-a-knot
topic: math.topology.knots
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, beautiful]
tags: [tricolorability, reidemeister-moves, trefoil, knot-invariant]
hook: "You cannot prove a knot is knotted by trying to untie it. You can prove it with three crayons."
sources:
  - {title: "Tricolorability", type: wiki, url: "https://en.wikipedia.org/wiki/Tricolorability"}
  - {title: "Reidemeister move", type: wiki, url: "https://en.wikipedia.org/wiki/Reidemeister_move"}
  - {title: "Fox n-coloring", type: wiki, url: "https://en.wikipedia.org/wiki/Fox_n-coloring"}
dates: {written: 2026-09-19, event: 1927-01-01}
diagram: {file: math/trefoil-tricolouring.svg, caption: "The trefoil, with its three strands drawn solid, dashed and dotted: at every crossing all three styles meet.", alt: "A trefoil knot diagram whose three arcs are drawn in three different line styles, with the three styles meeting at each of the three crossings"}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Credited Alexander and Briggs (1926) alongside Reidemeister, and tightened the knot-group statement to surjections sending meridians to transpositions."}
---

# Three colours are enough to prove a knot

How do you prove a tangled loop genuinely cannot be untangled? Not by trying. There are infinitely many ways to move a piece of string, and failing at all the ones you thought of proves nothing.

Reidemeister closed that gap in 1927 — Alexander and Briggs got there independently a year earlier: any two diagrams of the same knot differ by a finite sequence of three local moves. So the strategy becomes finite. Find a property of diagrams that survives all three moves, then compute it once on each diagram, and if the answers differ the knots differ.

Here is the cheapest such property. Colour each strand — each piece of the drawing running from one undercrossing to the next — with one of three colours, so that at every crossing the three strands meeting there are either all the same colour or all different. If you can do it using more than one colour, call the diagram tricolourable.

The trefoil is. The unknot, drawn as a circle, has a single strand and can only be monochrome. So the trefoil is knotted, and you proved it with crayons.

## Rigor

A **tricolouring** of a diagram assigns to each arc an element of $\mathbb{Z}/3$ so that at each crossing the over-arc $a$ and the two under-arcs $b,c$ satisfy $b+c \equiv 2a \pmod 3$ — equivalently all equal or all distinct. A tricolouring is *nontrivial* if it uses at least two values.

**Invariance.** Check the three Reidemeister moves. Move I creates a kink whose two arcs merge, forcing one colour and changing nothing. Move II slides one strand over another, adding two crossings whose colour conditions are automatically satisfiable and forced. Move III moves a strand past a crossing, and the six colour equations before and after have the same solution set. So the number of tricolourings is an invariant of the knot, not just of the diagram.

The trefoil admits $9$ tricolourings ($3$ trivial, $6$ nontrivial); the unknot admits only the $3$ trivial ones. Hence trefoil $\ne$ unknot.

Where it breaks: the figure-eight knot is not tricolourable either, so this invariant cannot tell it from the unknot. The fix is Fox $n$-colouring for other $n$, and behind all of them sits the knot group $\pi_1(\mathbb{R}^3\setminus K)$ — a nontrivial tricolouring is exactly a surjection from it onto $S_3$ sending every meridian to a transposition.

## Recall
type: mcq
Q: Why does a tricolouring prove the trefoil is knotted?
- [x] Tricolourability survives all three Reidemeister moves, and the unknot has none that is nontrivial — so no sequence of moves can turn one into the other.
- [ ] Because the trefoil has three crossings and three is odd — crossing number is not preserved by the moves; a diagram can always be made messier.
- [ ] Because you tried every way of untying it and failed — no finite search proves this; the whole point of Reidemeister's theorem is to replace the search.
