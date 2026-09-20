---
id: math.algebra.subgroups-lagrange.fermat-was-doing-group-theory
topic: math.algebra.subgroups-lagrange
topics: [math.number-theory.modular]
format: idea
difficulty: 3
language: en
weight: medium
angles: [connection, tool]
tags: [fermat-little-theorem, lagrange-theorem, element-order, euler-theorem, modular-arithmetic]
hook: "Fermat's little theorem is not a fact about primes. It is Lagrange's theorem applied to a group that happens to have p-1 elements."
sources:
  - {title: "Fermat's little theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Fermat%27s_little_theorem"}
  - {title: "Lagrange's theorem (group theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Lagrange%27s_theorem_(group_theory)"}
dates: {written: 2026-09-19, event: 1640-10-18}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Fermat's little theorem is Lagrange's theorem in disguise

Fermat wrote to Frénicle de Bessy in October 1640 that $a^{p-1}-1$ is divisible by $p$ whenever $p$ is prime and does not divide $a$, and added that he would send the proof if it were not too long. He never did. Euler published one in 1736.

Once you know about groups the whole thing takes one line. The non-zero residues modulo a prime $p$ form a group under multiplication, and it has exactly $p-1$ elements. Lagrange says the order of any element divides the order of the group. So raise anything to the $p-1$ and you are back at 1. There is nothing about primality in the argument; primality only enters when you check that every non-zero residue is invertible.

Drop primality and the same line still works: you just have to count how many residues are invertible. That count is Euler's $\varphi$, and the resulting theorem is what makes RSA decryption undo RSA encryption.

Here is the one line.

## Rigor

**Corollary of Lagrange.** If $G$ is finite and $g\in G$, then $\langle g\rangle$ is a subgroup of order $\operatorname{ord}(g)$, so $\operatorname{ord}(g)$ divides $|G|$, and therefore $g^{|G|}=e$.

Take $G=(\mathbb{Z}/p)^{\times}$. Since $p$ is prime, every non-zero residue is a unit, so $|G|=p-1$ and
$$a^{p-1}\equiv 1 \pmod p \quad\text{for } p\nmid a .$$

Take $G=(\mathbb{Z}/n)^{\times}$ for any $n$. Its order is $\varphi(n)$, the count of residues coprime to $n$, giving Euler's theorem $a^{\varphi(n)}\equiv 1 \pmod n$ for $\gcd(a,n)=1$.

That is the tiling picture again: $\langle a \rangle$ is the tile, the group of units is the floor, and "back to 1" is just going round the tile a whole number of times.

## Recall
type: reveal
Q: In one sentence, why is $a^{p-1}\equiv 1 \pmod p$ a statement about a group?
A: The non-zero residues mod $p$ form a multiplicative group of order $p-1$, and Lagrange's theorem forces every element's order to divide the group's order, so raising to the $p-1$ returns the identity.
