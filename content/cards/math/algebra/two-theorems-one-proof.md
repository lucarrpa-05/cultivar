---
id: math.algebra.modules.two-theorems-one-proof
topic: math.algebra.modules
topics: [math.linear-algebra.jordan-form]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [connection, beautiful]
tags: [modules, principal-ideal-domain, structure-theorem, abelian-groups, jordan-form]
hook: "Finite abelian groups and the Jordan form are the same theorem. You just feed it a different ring."
sources:
  - {title: "Structure theorem for finitely generated modules over a principal ideal domain", type: wiki, url: "https://en.wikipedia.org/wiki/Structure_theorem_for_finitely_generated_modules_over_a_principal_ideal_domain"}
  - {title: "Module (mathematics)", type: wiki, url: "https://en.wikipedia.org/wiki/Module_(mathematics)"}
dates: {written: 2026-09-19}
related: [math.linear-algebra.jordan-form.when-diagonalisation-fails]
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Rewrote the definition-first opening to lead with the two-courses-one-proof hook; linked the Jordan-form card."}
---

# Two theorems from two different courses, proved once

You proved the classification of finite abelian groups in one course and the Jordan normal form in another, and nobody mentioned they were the same proof. They are. What joins them is the **module**: a vector space whose scalars come from a ring instead of a field. That weakening is not mild. You lose bases, well-defined dimension, and the guarantee that a submodule has a complement, and you gain **torsion** — elements annihilated by a non-zero scalar, like the element 1 of $\mathbb{Z}/2$ read as a $\mathbb{Z}$-module.

What you get in exchange is the merger. A module over $\mathbb{Z}$ is exactly an abelian group — multiplying by an integer is repeated addition, and you had no choice about it. A module over $k[x]$ is exactly a vector space with a chosen linear operator, because once you decide what $x$ does, every polynomial follows.

Both $\mathbb{Z}$ and $k[x]$ are principal ideal domains, and there is one structure theorem for finitely generated modules over any PID.

Feed it $\mathbb{Z}$: the classification of finite abelian groups. Feed it $k[x]$: the Jordan normal form.

## Rigor

**Structure theorem.** Let $R$ be a PID and $M$ a finitely generated $R$-module. Then
$$M\cong R^{r}\oplus R/(d_1)\oplus\cdots\oplus R/(d_s),\qquad d_1\mid d_2\mid\cdots\mid d_s,$$
uniquely up to units. Equivalently, splitting each $d_i$ into prime powers gives the **elementary divisor** form $M \cong R^r \oplus \bigoplus_j R/(p_j^{e_j})$.

**Take $R=\mathbb{Z}$, $M$ finite.** Then $r=0$ and $M\cong\bigoplus_j \mathbb{Z}/p_j^{e_j}$: every finite abelian group is a direct sum of cyclic groups of prime-power order, uniquely.

**Take $R=k[x]$**, $M=V$ a finite-dimensional $k$-vector space with $x$ acting as $T$. Then $r=0$ (since $V$ is finite-dimensional and $k[x]$ is not), so
$$V\cong\bigoplus_j k[x]/\big((x-\lambda_j)^{e_j}\big)$$
when $k$ is algebraically closed. On $k[x]/((x-\lambda)^{e})$, multiplication by $x$ in the basis $1,(x-\lambda),\dots,(x-\lambda)^{e-1}$ is exactly a Jordan block of size $e$ with eigenvalue $\lambda$. The elementary divisors *are* the Jordan blocks, and the invariant factor $d_s$ is the minimal polynomial.

## Recall
type: mcq
Q: Why does the same structure theorem produce both finite abelian groups and the Jordan form?
- [x] Both are finitely generated modules over a PID — over $\mathbb{Z}$ and over $k[x]$ respectively — and the theorem only ever used that hypothesis.
- [ ] Because $\mathbb{Z}$ and $k[x]$ are isomorphic rings — they are not; they merely share the property of being principal ideal domains.
- [ ] Because every abelian group carries a linear operator — it does not; the link is the ring of scalars, not extra structure on the group.
