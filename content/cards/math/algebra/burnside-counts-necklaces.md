---
id: math.algebra.group-actions.burnside-counts-necklaces
topic: math.algebra.group-actions
topics: [math.combinatorics.counting]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, tool]
tags: [burnside-lemma, orbit-counting, necklaces, symmetry, enumeration]
hook: "You cannot divide 64 colourings by 6 rotations. Average the fixed points instead and the answer comes out exactly."
callback: {from: math.algebra.group-actions, to: math.combinatorics.counting}
sources:
  - {title: "Burnside's lemma", type: wiki, url: "https://en.wikipedia.org/wiki/Burnside%27s_lemma"}
  - {title: "Group action", type: wiki, url: "https://en.wikipedia.org/wiki/Group_action"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "These are necklaces, not bracelets — 14 counts rotations only. Added the dihedral average (13) so the words match the group."}
---

# Remember orbits? That is how you count necklaces

Remember orbit and stabiliser. Here is the counting problem they were built for. Six beads on a loop, each red or blue. Turning the loop does not make it a new necklace. How many necklaces?

There are $2^6=64$ colourings. Six rotations. The tempting move is $64/6$, which is not even an integer — and the reason is that the orbits are not all the same size. The all-red necklace sits alone in its orbit; a necklace with one blue bead has an orbit of six.

So stop counting orbits and count *fixed points* instead. For each rotation, ask how many colourings it leaves unchanged. Doing nothing fixes all 64. Rotating by one bead fixes only the two monochrome ones. By two beads: 4. By three: 8. By four: 4. By five: 2. Add them up: 84. Divide by the six group elements: **14 necklaces**.

That is Burnside's lemma, and its name is a small scandal. Burnside stated it in 1897 and credited Frobenius (1887); Cauchy had it in 1845. Combinatorialists call it "the lemma that is not Burnside's".

## Rigor

**Lemma.** For a finite group $G$ acting on a finite set $X$,
$$|X/G|=\frac{1}{|G|}\sum_{g\in G}|X^{g}|,\qquad X^{g}=\{x: g\cdot x=x\}.$$

*Proof.* Double-count the pairs $\{(g,x): g\cdot x=x\}$. Summing over $g$ gives $\sum_g |X^g|$. Summing over $x$ gives $\sum_x |G_x|$. Group the second sum by orbits: on one orbit $O$, every stabiliser has order $|G|/|O|$ by orbit–stabiliser, so that orbit contributes $|O|\cdot|G|/|O|=|G|$. Hence $\sum_g|X^g|=|G|\cdot|X/G|$. $\square$

For the necklace, $G=\mathbb{Z}/6$ acting by rotation on $X=\{\text{red},\text{blue}\}^6$. A rotation by $k$ fixes exactly the colourings constant on each cycle of the rotation, and it has $\gcd(k,6)$ cycles, so $|X^{r^k}|=2^{\gcd(k,6)}$:
$$\tfrac{1}{6}\left(2^6+2^1+2^2+2^3+2^2+2^1\right)=\tfrac{84}{6}=14 .$$

Let the loop be turned over too and the group becomes dihedral of order 12. The three reflections through opposite beads fix $2^4$ colourings each, the three through opposite gaps fix $2^3$, so the average becomes $(84+3\cdot16+3\cdot8)/12=13$. Those are the *bracelets*: one fewer, because turning over merges two mirror-image necklaces into one.

The "orbits are not all the same size" complaint is exactly what orbit–stabiliser fixes, and the lemma is that fix, averaged.

## Recall
type: mcq
Q: Why can you not just divide the number of colourings by the number of rotations?
- [x] Orbits have different sizes — symmetric colourings are fixed by some rotations, so they sit in short orbits, and plain division over-counts them away.
- [ ] Because the rotations do not form a group — they do: the six rotations of a hexagon are a cyclic group of order 6.
- [ ] Because some colourings are not reachable from others — that is true and is precisely what "different orbits" means; it is not what makes the division fail.
