---
id: math.algebra.permutations.abel-printed-it-himself
topic: math.algebra.permutations
topics: [math.algebra.galois]
format: series
difficulty: 3
language: en
weight: medium
angles: [human, connection]
tags: [abel-ruffini, quintic, symmetric-functions, radicals, symmetric-group]
hook: "Abel cut his proof to six pages because he was paying the printer. The idea inside it moved the question from formulas to permutations."
series: {id: math.algebra.why-you-cannot-solve-the-quintic, index: 2, total: 4, title: "Why you can't solve the quintic"}
sources:
  - {title: "Niels Henrik Abel", type: wiki, url: "https://en.wikipedia.org/wiki/Niels_Henrik_Abel"}
  - {title: "Abel–Ruffini theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem"}
  - {title: "Paolo Ruffini", type: wiki, url: "https://en.wikipedia.org/wiki/Paolo_Ruffini"}
dates: {written: 2026-09-19, event: 1824-01-01}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Six pages, self-printed, because he was paying

Paolo Ruffini published an argument in 1799 that the general quintic has no solution in radicals. It ran to hundreds of pages, nobody finished it, and it had a gap.

Niels Henrik Abel proved it properly by 1823, at twenty-one, with no money. He printed it as a pamphlet in 1824 and squeezed it down to six pages to keep the printing bill down, which made it so compressed that it too was barely readable. He wrote a fuller version for Crelle's journal in 1826. He died of tuberculosis in 1829, aged 26.

What Abel saw is the hinge of the whole story. A formula for the roots is built from the coefficients, and the coefficients cannot tell the roots apart — swap two roots and every coefficient is unchanged. So any formula has to survive being permuted, and every square root or cube root you adjoin can only relax that symmetry by a small, very specific amount.

The question stops being "find the formula" and becomes "which groups of permutations can a tower of radicals take apart?" That question has an exact answer, and the answer is a dictionary.

## Rigor

Write $f(x)=x^5+a_4x^4+\cdots+a_0$ with roots $r_1,\dots,r_5$. Each coefficient is, up to sign, an elementary symmetric polynomial:
$$a_4=-\sum_i r_i,\qquad a_3=\sum_{i<j}r_ir_j,\ \dots,\qquad a_0=-r_1r_2r_3r_4r_5 .$$
So $S_5$ permutes the roots while fixing $F_0=\mathbb{Q}(a_0,\dots,a_4)$ pointwise: the coefficient field genuinely cannot distinguish the roots.

**Solvable by radicals** means there is a tower
$$F_0\subseteq F_1\subseteq\cdots\subseteq F_k,\qquad F_{i+1}=F_i\!\left(\sqrt[n_i]{\alpha_i}\right),\ \alpha_i\in F_i,$$
with all the roots inside $F_k$. Adjoining an $n$-th root (with the relevant roots of unity present) cuts the symmetry down by a *cyclic* group of order dividing $n$ — one small, abelian step.

So solving by radicals demands that the full symmetry $S_5$ be dismantled in abelian steps. Episode 4 shows $S_5$ has no such dismantling, because of one stubborn simple group sitting inside it. First, episode 3: how "symmetry of the roots" became a precise object you can compute with.

## Recall
type: mcq
Q: Why does a formula in radicals have to respect permutations of the roots?
- [x] It is assembled from the coefficients, and the coefficients are symmetric functions of the roots — they cannot tell $r_1$ from $r_2$.
- [ ] Because radicals are multivalued — they are, and that matters later, but the symmetry constraint comes from the coefficients, not from the ambiguity of roots.
- [ ] Because the roots are always conjugate to each other — not in general; a quintic can factor, and then its roots are not all in one orbit.
