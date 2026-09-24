---
id: math.open-problems.millennium.poincare-fell-in-other-dimensions-first
topic: math.open-problems.millennium
topics: [math.open-problems.solved-poincare, math.topology.manifolds]
format: idea
difficulty: 3
language: en
weight: medium
angles: [paradox, history]
tags: [poincare-conjecture, whitney-trick, h-cobordism, smale, freedman, dimension]
hook: "Poincaré asked about three dimensions. Dimensions five and up were settled by 1962, four in 1982, and three last."
related: [math.topology.manifolds.perelman-dijo-que-no, math.open-problems.millennium.seven-problems-in-paris]
sources:
  - {title: "Generalized Poincaré conjecture", type: wiki, url: "https://en.wikipedia.org/wiki/Generalized_Poincar%C3%A9_conjecture"}
  - {title: "h-cobordism", type: wiki, url: "https://en.wikipedia.org/wiki/H-cobordism"}
  - {title: "Whitney embedding theorem (the Whitney trick)", type: wiki, url: "https://en.wikipedia.org/wiki/Whitney_embedding_theorem"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved}
---

# Poincaré's question was answered in every dimension before his own

In 1904 Poincaré asked about three-dimensional spaces: if every loop can be shrunk to a point, must the space be a sphere? The same question makes sense in every dimension, and you would expect three to be the easy case.

It went the other way. Stephen Smale settled dimensions five and up in the early 1960s. Michael Freedman did four in 1982. Poincaré's own dimension waited for Grigori Perelman in 2002–2003.

The reason is room. The key move in high dimensions untangles two pieces of a space that cross each other, by sliding one across a small disc. From dimension five up, that disc can be laid down without crashing into itself. In three and four there is no room.

## Rigor

**Generalised Poincaré conjecture.** A closed $n$-manifold homotopy equivalent to $S^n$ is homeomorphic to $S^n$. Proved for $n\ge5$ (Smale; also Stallings and Zeeman), $n=4$ (Freedman, 1982), $n=3$ (Perelman, via Ricci flow with surgery).

**The Whitney trick.** Let $P^p$ and $Q^q$ be submanifolds of $M^n$ with $p+q=n$, meeting in two points of opposite sign. Arcs in $P$ and in $Q$ joining those points form a loop, and the loop bounds a map of a 2-disc $D$. If $D$ can be embedded, with interior missing $P$ and $Q$, then pushing $P$ across $D$ removes both intersection points. This is the "sliding across a disc".

**Why five.** By general position, two submanifolds of dimensions $a$ and $b$ in $M^n$ can be moved off each other when $a+b<n$. A 2-disc meets itself in general position only if $2+2\ge n$, so for $n\ge5$ the disc is embedded; with mild extra conditions it also avoids $P$ and $Q$. Smale's h-cobordism theorem runs on this trick and yields the conjecture almost immediately. In dimension 4, $2+2=4$: Whitney discs generically cross themselves, which is the whole difficulty. Freedman's topological substitute works; smoothly, the 4-dimensional h-cobordism theorem is false (Donaldson).

## Recall
type: mcq
Q: Why did the high-dimensional Poincaré conjecture fall before the three-dimensional one?
- [x] Room: from dimension 5 up, the 2-disc used to cancel crossings can be embedded without hitting itself — the Whitney trick works.
- [ ] Higher-dimensional spheres are simpler objects — they are not; Milnor found exotic smooth 7-spheres in 1956.
- [ ] Computers could check the high-dimensional cases — no computation was involved; it is a general-position argument.
