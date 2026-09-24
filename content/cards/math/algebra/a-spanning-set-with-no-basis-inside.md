---
id: math.algebra.modules.a-spanning-set-with-no-basis-inside
topic: math.algebra.modules
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, mistake]
tags: [modules, free-module, basis, torsion, integers, linear-independence]
hook: "The numbers 2 and 3 span the integers. Drop either and you lose. Keep both and they are dependent."
related: [math.algebra.modules.two-theorems-one-proof]
sources:
  - {title: "Module (mathematics)", type: wiki, url: "https://en.wikipedia.org/wiki/Module_(mathematics)"}
  - {title: "Free module", type: wiki, url: "https://en.wikipedia.org/wiki/Free_module"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved}
---

# The integers have a spanning set with no basis inside it

In linear algebra, any spanning set can be trimmed down to a basis: throw out redundant vectors one at a time until none is left. That theorem dies the moment the scalars are integers.

Take the numbers 2 and 3 inside $\mathbb{Z}$. Together they span it, because $1=3-2$, so every integer is a combination. Drop either one and you only reach the even numbers, or the multiples of 3. Keep both and they are dependent: $3\cdot2-2\cdot3=0$. No subset is a basis.

A vector space whose scalars come from a ring is called a module, and this is its first shock. You cannot divide, so you cannot solve for the redundant vector and discard it.

## Rigor

Precisely: a **module** over a ring $R$ is an abelian group $M$ with a scalar multiplication $R\times M\to M$ obeying the vector-space axioms. A **basis** is a linearly independent spanning set, and $M$ is **free** if it has one.

**What fails.** In a vector space, a relation $a_1v_1+\dots+a_kv_k=0$ with $a_1\ne0$ gives $v_1=-a_1^{-1}(a_2v_2+\dots+a_kv_k)$, and $v_1$ can be discarded. Over $\mathbb{Z}$ the relation $3\cdot2-2\cdot3=0$ is real, but $3^{-1}$ does not exist, so neither element is a combination of the other: $\{2\}$ spans $2\mathbb{Z}$ and $\{3\}$ spans $3\mathbb{Z}$.

**Worse: modules with no basis at all.**
- $\mathbb{Z}/6$ as a $\mathbb{Z}$-module: $6x=0$ for every $x$, so no nonzero element is independent. This is **torsion**.
- $\mathbb{Q}$ as a $\mathbb{Z}$-module has no torsion and still no basis. Any two nonzero rationals $\tfrac ab,\tfrac cd$ satisfy $(bc)\tfrac ab-(ad)\tfrac cd=0$, so a basis would be a single $q$, and $\mathbb{Z}q$ misses $q/2$.

Over a field every module is free. Over $\mathbb{Z}$, the structure theorem says a *finitely generated* torsion-free module is free, so $\mathbb{Q}$ fails only because no finite set generates it.

## Recall
type: mcq
Q: In a vector space you can always trim a spanning set to a basis. Which step breaks over the integers?
- [x] Solving a dependence relation for one of the vectors — that needs dividing by a coefficient, and 3 has no inverse in $\mathbb{Z}$.
- [ ] Finding a dependence relation — those still exist; $3\cdot2-2\cdot3=0$ is one.
- [ ] Checking that the set spans — spanning works fine; $\{2,3\}$ spans $\mathbb{Z}$ because $1=3-2$.
