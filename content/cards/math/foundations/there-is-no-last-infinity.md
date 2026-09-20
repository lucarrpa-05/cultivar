---
id: math.foundations.cardinality.there-is-no-last-infinity
topic: math.foundations.cardinality
topics: [math.foundations.axiomatics-zfc]
format: series
difficulty: 3
language: en
weight: heavy
angles: [beautiful, open-problem]
tags: [cantor-theorem, power-set, beth-numbers, continuum-hypothesis]
hook: "Every infinity you can name has a bigger one above it, built from it in one move. There is no top."
series: {id: math.foundations.infinity-three-sizes, index: 3, total: 3, title: "Infinity, three sizes"}
sources:
  - {title: "Cantor's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Cantor%27s_theorem"}
  - {title: "Beth number", type: wiki, url: "https://en.wikipedia.org/wiki/Beth_number"}
  - {title: "Continuum hypothesis", type: wiki, url: "https://en.wikipedia.org/wiki/Continuum_hypothesis"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# There is no last infinity

Two sizes so far: the countable one, and the reals. Third question: is the second one the top?

Take any set at all and form the set of its subsets. Cantor's theorem says this is always strictly bigger — and the proof is the heckle from episode 2, stripped of decimals. Suppose someone matches each element $x$ to a subset $f(x)$. Ask about the set of all $x$ that are *not* in the subset they were matched with. Whichever element was supposed to be matched with that set, ask whether it belongs to it. Both answers are wrong.

So the subsets of $\mathbb{R}$ outnumber $\mathbb{R}$, their subsets outnumber them, and so on with no ceiling. Infinity is not one thing, or two; it is a tower with no top floor.

Which leaves the gap. Is there a size strictly between the counting numbers and the reals? Cantor believed not, and spent decades failing to prove it. He had good reason to fail: the question has no answer inside the usual axioms.

Still, the shepherd's pebbles got you all the way here.

## Rigor

**Cantor's theorem.** For any set $X$, there is no surjection $f:X\to\mathcal{P}(X)$.

**Proof.** Let $D=\{x\in X: x\notin f(x)\}$. If $D=f(d)$ for some $d\in X$, then $d\in D \iff d\notin f(d)=D$: a contradiction. So $D$ is not in the image, and $|X|<|\mathcal{P}(X)|$. $\square$

Notice the shape: $D$ is the diagonal, exactly as in episode 2, and exactly as in Russell's paradox — the same one-line trick three times.

**The tower.** Define $\beth_0=\aleph_0$ and $\beth_{n+1}=2^{\beth_n}$. Then $\beth_1=2^{\aleph_0}=|\mathbb{R}|$, and $\beth_0<\beth_1<\beth_2<\cdots$, with $\beth_\omega$ above all of them, and the climb never stops.

**The gap.** The continuum hypothesis says $2^{\aleph_0}=\aleph_1$: nothing strictly between $|\mathbb{N}|$ and $|\mathbb{R}|$. Gödel (1940) showed ZFC cannot refute it; Cohen (1963) showed ZFC cannot prove it. So the very first question you would ask about the tower is one the axioms decline to answer — a card of its own.

## Recall
type: reveal
Q: In one move, how do you get an infinity strictly bigger than the one you have?
A: Take the power set. For any $X$, no map $X\to\mathcal{P}(X)$ is onto — the set $\{x : x\notin f(x)\}$ is always missed — so $|X|<|\mathcal{P}(X)|$, and the tower $\aleph_0 < 2^{\aleph_0} < 2^{2^{\aleph_0}} < \cdots$ never terminates.
