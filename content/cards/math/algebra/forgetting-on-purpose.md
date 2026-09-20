---
id: math.algebra.homomorphisms-quotients.forgetting-on-purpose
topic: math.algebra.homomorphisms-quotients
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, beautiful]
tags: [quotient-group, normal-subgroup, cosets, modular-arithmetic, well-defined]
hook: "A clock forgets multiples of twelve on purpose. Normal subgroups are exactly the things a group is allowed to forget."
sources:
  - {title: "Quotient group", type: wiki, url: "https://en.wikipedia.org/wiki/Quotient_group"}
  - {title: "Normal subgroup", type: wiki, url: "https://en.wikipedia.org/wiki/Normal_subgroup"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Quotients are forgetting, on purpose

A clock face is a quotient group and nobody finds it alarming. You have decided that 15:00 and 3:00 are the same thing — that twelve hours is *nothing*. You have not lost information by accident; you declared a set of numbers to be zero and then asked what structure survives. The answer: addition still works, because if you shift two times by multiples of twelve, their sum shifts by a multiple of twelve too.

That is the whole construction. Pick a subgroup $N$ and call its elements nothing. The group splits into blocks (the cosets from Lagrange), and you try to multiply blocks by multiplying representatives.

And here is where it can fail. In a non-abelian group, picking a different representative can land you in a different block. The multiplication is only well defined when $N$ absorbs conjugation: $gNg^{-1}=N$. That condition has a name — normal — and it is not a technicality you check afterwards. It *is* the definition of "forgettable".

Watch the representatives.

## Rigor

Let $N\le G$ and define $(gN)(hN)=ghN$. Well-definedness means: if $gN=g'N$ and $hN=h'N$ then $ghN=g'h'N$.

Write $g'=gn_1$, $h'=hn_2$ with $n_i\in N$. Then
$$g'h'=g n_1 h n_2 = gh\,(h^{-1}n_1h)\,n_2 ,$$
so the product lands in $ghN$ precisely when $h^{-1}n_1h\in N$ for all $h\in G$, $n_1\in N$ — that is, when $N$ is **normal**. Conversely, if some conjugate escapes $N$ the recipe genuinely contradicts itself.

Two facts make normality the right notion rather than a convenient one. The kernel of any homomorphism $\varphi:G\to H$ is normal, since $\varphi(gng^{-1})=\varphi(g)e\varphi(g)^{-1}=e$. And every normal $N$ is a kernel, namely of the projection $G\to G/N$. So "subgroups you can forget" and "subgroups something already forgot" are the same list.

In an abelian group every subgroup is normal, which is why the clock never made you nervous.

## Recall
type: mcq
Q: Why do quotient groups need the subgroup to be normal?
- [x] Otherwise multiplying blocks depends on which representatives you pick — normality is exactly the condition that makes $(gN)(hN)=ghN$ well defined.
- [ ] Otherwise the blocks have different sizes — the cosets of *any* subgroup all have the same size; that is Lagrange, and it holds normal or not.
- [ ] Otherwise the subgroup is not closed under the operation — every subgroup is closed by definition; normality is about conjugation, not closure.
