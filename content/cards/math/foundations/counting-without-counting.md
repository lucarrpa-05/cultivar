---
id: math.foundations.cardinality.counting-without-counting
topic: math.foundations.cardinality
format: series
difficulty: 2
language: en
weight: medium
angles: [beautiful, connection]
tags: [bijection, countable, rationals, hilbert-hotel]
hook: "A shepherd with no numbers can still tell whether the flock came home. That trick is all of cardinality."
series: {id: math.foundations.infinity-three-sizes, index: 1, total: 3, title: "Infinity, three sizes"}
sources:
  - {title: "Countable set", type: wiki, url: "https://en.wikipedia.org/wiki/Countable_set"}
  - {title: "Hilbert's paradox of the Grand Hotel", type: wiki, url: "https://en.wikipedia.org/wiki/Hilbert%27s_paradox_of_the_Grand_Hotel"}
  - {title: "Cardinality", type: wiki, url: "https://en.wikipedia.org/wiki/Cardinality"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The grid walk only listed positive rationals; 0 and the negatives now folded in. Dedekind-infinite relabelled a definition, with the choice caveat."}
---

# Counting without counting

A shepherd who cannot count can still check the flock: one pebble per sheep at dawn, one pebble back per sheep at dusk. Pebbles left over means sheep missing. No numbers required — just a pairing.

That pairing is the only tool that survives contact with infinity. Two sets have the same size when you can match their elements one to one, with nothing left over on either side.

Now the consequences get rude. The even numbers match the counting numbers ($n \mapsto 2n$), so a set can be the same size as a proper part of itself. The integers match them too, zig-zagging $0,1,-1,2,-2,\dots$. And the rationals — dense, packed infinitely tightly into every interval — match them as well, once you lay them out in a grid and walk the diagonals.

Everything infinite you have ever handled is starting to look like one size. Cantor thought so too, until one December week in 1873.

## Rigor

Write $|A|=|B|$ when a bijection $A\to B$ exists. $A$ is **countable** when $|A|\le|\mathbb{N}|$.

**$\mathbb{Z}$ is countable.** $f(0)=0$, $f(2k-1)=k$, $f(2k)=-k$ is a bijection $\mathbb{N}\to\mathbb{Z}$: the pebbles-and-sheep matching, with no leftovers.

**$\mathbb{Q}$ is countable.** Place $p/q$ with $p,q\ge 1$ at grid point $(p,q)$ and enumerate the grid along finite anti-diagonals $p+q=2,3,4,\dots$, skipping any fraction not in lowest terms. That lists the positive rationals exactly once; interleave $0$ and the negatives by the zig-zag used for $\mathbb{Z}$ and $|\mathbb{Q}|=|\mathbb{N}|=\aleph_0$.

**Countable unions.** If $A_1,A_2,\dots$ are each countable, so is $\bigcup_n A_n$: the same anti-diagonal walk on the array $a_{n,k}$ works. (This one quietly uses countable choice to pick an enumeration of each $A_n$.)

**Dedekind's characterisation.** Dedekind *defined* a set to be infinite when it admits a bijection with a proper subset. The "paradox" of the evens is therefore not a bug but the definition — which is why Hilbert's hotel can always take one more guest. (That this coincides with "not finite" again needs countable choice.)

## Recall
type: mcq
Q: What does it take for two infinite sets to have the same size?
- [x] A bijection between them — one-to-one, onto, nothing left over on either side.
- [ ] One being contained in the other — containment says nothing: the evens sit inside $\mathbb{N}$ and have the same size as it.
- [ ] Both being unbounded — $\mathbb{Q}$ and $\mathbb{R}$ are both unbounded and, as episode 2 shows, are not the same size.
- [ ] Both being dense in $\mathbb{R}$ — density is a topological property; $\mathbb{Q}$ is dense and countable, the irrationals are dense and not.
