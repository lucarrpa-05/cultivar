---
id: math.foundations.axiomatics-zfc.one-ball-into-two-balls
topic: math.foundations.axiomatics-zfc
format: idea
difficulty: 4
language: en
weight: heavy
angles: [paradox, weird, beautiful]
tags: [banach-tarski, axiom-of-choice, non-measurable, free-group]
hook: "Five pieces, no stretching, and you end up with two balls the size of the one you started with."
sources:
  - {title: "Banach–Tarski paradox", type: wiki, url: "https://en.wikipedia.org/wiki/Banach%E2%80%93Tarski_paradox"}
  - {title: "The Axiom of Choice", type: encyclopedia, url: "https://plato.stanford.edu/entries/axiom-choice/"}
  - {title: "Vitali set", type: wiki, url: "https://en.wikipedia.org/wiki/Vitali_set"}
dates: {written: 2026-09-19, event: 1924-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Two rotations by an irrational angle need not generate a free group; replaced by the standard arccos(1/3) pair. Difficulty 3→4."}
---

# Cut a ball into five pieces, get two balls

Banach and Tarski proved in 1924 that a solid ball can be split into finitely many pieces which, moved around by nothing but rotations and translations, reassemble into two balls identical to the original. Five pieces suffice. No stretching, no duplication, no cheating.

Your reflex is that volume was created out of nothing, and the reflex is right — which is why the interesting question is not "how?" but "what had to be false?"

Volume is only conserved for pieces that *have* a volume. The Banach–Tarski pieces do not. They are infinite dusts of points, built by reaching into uncountably many sets at once and picking one element from each: the axiom of choice, at full strength. Nothing you could draw, cut, or simulate comes out of the construction.

So the theorem is not about balls. It is the price tag on an axiom, and the sticker is showing.

## Rigor

**Statement.** There is a partition $B=A_1\sqcup\cdots\sqcup A_5$ of the unit ball and isometries $g_1,\dots,g_5$ of $\mathbb{R}^3$ such that the images reassemble into two disjoint unit balls.

**Where it comes from.** $SO(3)$ contains a free group $F_2$ on two rotations: the standard witnesses are the rotations by $\arccos\tfrac13$ about two perpendicular axes, which satisfy no relation at all. A free group is paradoxical. Writing $W_a$ for the words starting with $a$, we have $F_2=\{e\}\sqcup W_a\sqcup W_{a^{-1}}\sqcup W_b\sqcup W_{b^{-1}}$, yet $W_a\sqcup aW_{a^{-1}}=F_2$: pieces of the group each rebuild the whole group. Let $F_2$ act on the sphere; choice picks one point from each orbit, and the paradox transfers from the group to the sphere, then to the ball.

**Why volume is not violated.** A finitely additive, rotation-invariant measure defined on *all* subsets of $\mathbb{R}^3$ would force $\mu(B)=2\mu(B)$. Lebesgue measure is defined only on measurable sets, and the pieces are not measurable — Vitali had already built such a set on the circle in 1905, by the same choice-on-orbits move.

**Dimension matters.** In $\mathbb{R}^1$ and $\mathbb{R}^2$ the isometry group is amenable, no free subgroup appears, and Banach showed invariant finitely additive measures on all subsets do exist. The paradox needs three dimensions.

## Recall
type: mcq
Q: What is the Banach–Tarski paradox actually a statement about?
- [x] Sets so pathological that "volume" is undefined for them — choice produces non-measurable pieces, and conservation of volume never applied to them.
- [ ] A flaw in ZFC that mathematicians tolerate — the result is a theorem, not a contradiction; ZFC is no less consistent for it.
- [ ] Stretching, so it does not really preserve shape — only rigid rotations and translations are used; nothing is stretched.
- [ ] Something special about spheres — it holds for any bounded set with non-empty interior in $\mathbb{R}^3$; the sphere is just convenient.
