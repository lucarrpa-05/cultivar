---
id: math.algebra.group-actions.the-group-leaves-home
topic: math.algebra.group-actions
format: series
difficulty: 3
language: en
weight: medium
angles: [connection, tool]
tags: [group-actions, orbit-stabiliser, cosets, cayley-theorem, symmetry]
hook: "Orbit times stabiliser equals the size of the group — and the proof is the coset tiling from last episode, reused without a single change."
series: {id: math.algebra.symmetry-made-precise, index: 3, total: 5, title: "Symmetry, made precise"}
sources:
  - {title: "Group action", type: wiki, url: "https://en.wikipedia.org/wiki/Group_action"}
  - {title: "Cayley's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Cayley%27s_theorem"}
dates: {written: 2026-09-19}
diagram: {file: math/orbit-stabilizer-square.svg, caption: "One corner of the square can reach all four positions, and exactly two moves leave it alone: 4 times 2 is 8.", alt: "A square with one corner marked, curved arrows showing it can reach the other three corners, and a dashed diagonal mirror that fixes it"}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The group stops being a list and starts doing something

A group on its own is a closed catalogue of moves. An **action** is that catalogue actually moving something: the square's eight symmetries shuffling its four corners, the integers sliding a line along, a rotation group spinning a molecule in place.

Pick one corner of the square and ask two questions. Where can it be sent? To all four corners — that is its orbit. Which moves leave it exactly where it is? Doing nothing, and the flip through its own diagonal — two moves, its stabiliser. Four times two is eight, the size of the whole group.

That is not a coincidence, and it is not new mathematics either. The stabiliser is a subgroup; the orbit is its set of cosets; the tiling picture from episode 2 is doing all the work again, unchanged.

The practical payoff: you can now count a set by letting a group act on it. And the richest set for a group to act on turns out to be the group itself.

## Rigor

An **action** of $G$ on a set $X$ is a map $G\times X\to X$ with $e\cdot x=x$ and $g\cdot(h\cdot x)=(gh)\cdot x$. For $x\in X$ put
$$\operatorname{Orb}(x)=\{g\cdot x: g\in G\},\qquad G_x=\{g\in G: g\cdot x=x\} .$$

**Orbit–stabiliser.** $G_x\le G$, and $gG_x\mapsto g\cdot x$ is a well-defined bijection from the left cosets of $G_x$ onto $\operatorname{Orb}(x)$: it is well defined and injective because $g\cdot x=h\cdot x \iff h^{-1}g\in G_x$, and surjective by definition. Hence
$$|\operatorname{Orb}(x)|=[G:G_x]=\frac{|G|}{|G_x|}.$$
For the square's corner: $[D_4:G_x]=8/2=4$, the four corners.

Two immediate consequences. Orbits partition $X$, so $|X|=\sum|\operatorname{Orb}(x_i)|$ over orbit representatives — the counting tool of the next two episodes. And **Cayley's theorem**: $G$ acting on itself by left multiplication is faithful, so every group of order $n$ embeds in $S_n$. Every group is a permutation group; there is nothing else.

## Recall
type: mcq
Q: A group of order 24 acts on a set, and one point has an orbit of size 6. How big is its stabiliser?
- [x] 4 — orbit times stabiliser is the order of the group, so the stabiliser has index 6 and order 24/6.
- [ ] 6 — that is the orbit size again; the stabiliser is the *complementary* factor.
- [ ] 18 — subtraction is the wrong operation here; orbit and stabiliser multiply, they do not add.
