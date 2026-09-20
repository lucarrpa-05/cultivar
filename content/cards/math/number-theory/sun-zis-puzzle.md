---
id: math.number-theory.modular.sun-zis-puzzle
topic: math.number-theory.modular
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, origin, beautiful]
tags: [chinese-remainder-theorem, congruences, sunzi, ring-isomorphism]
hook: "Counted by threes, two left over. By fives, three. By sevens, two. A fourth-century puzzle that is now in your phone."
sources:
  - {title: "Chinese remainder theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Chinese_remainder_theorem"}
  - {title: "Sunzi Suanjing", type: wiki, url: "https://en.wikipedia.org/wiki/Sunzi_Suanjing"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "\"Your compiler\" does not do multi-modular arithmetic; computer-algebra systems do."}
---

# Counted by threes, two left over

A Chinese arithmetic manual, written somewhere between the third and fifth centuries, poses this: "There are certain things whose number is unknown. If we count them by threes, we have two left over; by fives, we have three left over; and by sevens, two are left over. How many things are there?"

Answer: 23. And 128. And 233. All the numbers congruent to 23 modulo 105.

The reason that works is worth more than the trick. Knowing a number modulo 3, modulo 5 and modulo 7 is *exactly* the same information as knowing it modulo 105 — no more, no less, provided the moduli share no factors. You can chop a hard calculation into small independent ones, do them separately, and glue.

That is why the theorem is still in production code. RSA decryption runs about four times faster by working modulo $p$ and modulo $q$ separately, and computer-algebra systems multiply enormous integers and polynomials by the same move.

## Rigor

**Theorem.** Let $n_1,\dots,n_k$ be pairwise coprime, $N=\prod n_i$. For any $a_1,\dots,a_k$ the system $x\equiv a_i \pmod{n_i}$ has a solution, unique modulo $N$.

**Construction.** Put $N_i=N/n_i$. Since $\gcd(N_i,n_i)=1$, Bézout gives $M_i$ with $M_iN_i\equiv 1\pmod{n_i}$. Then
$$x=\sum_{i=1}^{k} a_i M_i N_i$$
works: modulo $n_j$ every term with $i\neq j$ vanishes (because $n_j\mid N_i$) and the $j$-th reduces to $a_j$.

**The structural statement.** The map $x\mapsto(x \bmod n_1,\dots,x \bmod n_k)$ is a ring isomorphism
$$\mathbb{Z}/N\mathbb{Z}\;\cong\;\mathbb{Z}/n_1\mathbb{Z}\times\cdots\times\mathbb{Z}/n_k\mathbb{Z},$$
which is the precise sense in which "the pieces carry exactly the same information as the whole". Counting units on both sides gives $\varphi(N)=\prod\varphi(n_i)$ for free.

**Sun Zi's instance.** $N=105$, $N_1=35$, $N_2=21$, $N_3=15$; inverses $2, 1, 1$ modulo $3,5,7$; so $x = 2\cdot2\cdot35 + 3\cdot1\cdot21 + 2\cdot1\cdot15 = 233 \equiv 23 \pmod{105}$.

## Recall
type: mcq
Q: Why does the Chinese remainder theorem need the moduli to be pairwise coprime?
- [x] Otherwise the residues carry overlapping information and can contradict each other — $x\equiv 1\ (4)$ and $x\equiv 2\ (6)$ has no solution, since both fix $x$ modulo 2 differently.
- [ ] Otherwise the solution stops being unique but still exists — existence is what fails first; when a solution does exist it is unique modulo the lcm.
- [ ] Because the proof needs the moduli to be prime — coprime is enough; 105 splits as $3\cdot5\cdot7$ but $4$ and $9$ work just as well.
- [ ] Because otherwise the product exceeds the modulus — no size constraint is involved anywhere.
