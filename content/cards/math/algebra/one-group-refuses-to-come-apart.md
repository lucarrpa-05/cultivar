---
id: math.algebra.galois.one-group-refuses-to-come-apart
topic: math.algebra.galois
format: series
difficulty: 4
language: en
weight: heavy
angles: [beautiful, paradox]
tags: [solvable-groups, alternating-group, simple-groups, quintic, composition-series]
hook: "There is no quintic formula because one 60-element group has no normal subgroups. That is the entire reason."
series: {id: math.algebra.why-you-cannot-solve-the-quintic, index: 4, total: 4, title: "Why you can't solve the quintic"}
sources:
  - {title: "Abel–Ruffini theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem"}
  - {title: "Solvable group", type: wiki, url: "https://en.wikipedia.org/wiki/Solvable_group"}
  - {title: "Alternating group", type: wiki, url: "https://en.wikipedia.org/wiki/Alternating_group"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# One group refuses to come apart, and that is the whole answer

Run episode 3's dictionary backwards. Each radical you adjoin corresponds to one abelian step down the group. So a polynomial is solvable by radicals exactly when its group can be dismantled in abelian steps — a chain of subgroups, each normal in the next, with abelian quotients. Groups with such a chain are called **solvable**, and the name means literally what it says.

$S_5$ has no such chain, and the obstruction is a single subgroup: $A_5$, the even permutations of five objects, 60 elements, simple. It has no normal subgroups except itself and the identity. You cannot break it, so you cannot break $S_5$ into abelian steps, so there is no formula. Not "no formula yet". None.

And now look back at Cardano. His formula existed because $S_3$ *does* come apart: $S_3\triangleright A_3\triangleright 1$, with quotients of order 2 and 3, both abelian. The nested square root inside a cube root is that chain, written as arithmetic. The cubic was solvable because its group was.

## Rigor

$G$ is **solvable** if there is a chain $1=G_0\trianglelefteq G_1\trianglelefteq\cdots\trianglelefteq G_n=G$ with each $G_{i+1}/G_i$ abelian.

**Galois's criterion.** $f\in F[x]$ (characteristic 0) is solvable by radicals iff $\operatorname{Gal}(f)$ is solvable. The forward direction is episode 2's observation made precise: adjoining an $n$-th root, with $\mu_n$ present, is a cyclic extension by Kummer theory, so a radical tower gives a chain with cyclic quotients.

**$A_5$ is simple.** Its conjugacy class sizes are $1,15,20,12,12$. A normal subgroup is a union of classes containing the identity, so its order is $1$ plus a sub-sum of $\{15,20,12,12\}$, and it must divide 60. Running through the possibilities — $16,21,13,25,28,33,36,40,45,48$ — none divides 60. Only $1$ and $60$ survive.

Hence $S_5\triangleright A_5\triangleright 1$ is the only composition series, and $A_5$ is non-abelian: $S_5$ is not solvable.

**A concrete unsolvable quintic.** $x^5-6x+3$ is irreducible by Eisenstein at 3. Calculus gives it exactly three real roots, so complex conjugation is a transposition in its group, and Cauchy's theorem gives an element of order 5. A transposition and a 5-cycle generate $S_5$.

## Recall
type: mcq
Q: What does "solvable group" actually mean, and why is that the right name?
- [x] It has a chain of subgroups with abelian quotients — and each abelian quotient is exactly what adjoining one radical achieves.
- [ ] It is a group you can write down explicitly — every finite group can be written down; solvability is about how it decomposes.
- [ ] It has a non-trivial centre — $p$-groups always do and are solvable, but $S_3$ has trivial centre and is solvable too.
