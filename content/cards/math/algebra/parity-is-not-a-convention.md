---
id: math.algebra.permutations.parity-is-not-a-convention
topic: math.algebra.permutations
format: idea
difficulty: 3
language: en
weight: heavy
angles: [tool, beautiful]
tags: [sign-of-permutation, alternating-group, transpositions, vandermonde, well-defined]
hook: "The same shuffle is 3 swaps or 17, your choice. Whether the count is odd or even is not your choice, and proving that takes a polynomial."
sources:
  - {title: "Parity of a permutation", type: wiki, url: "https://en.wikipedia.org/wiki/Parity_of_a_permutation"}
  - {title: "Alternating group", type: wiki, url: "https://en.wikipedia.org/wiki/Alternating_group"}
dates: {written: 2026-09-19}
related: [math.algebra.permutations.the-prize-that-was-never-paid]
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# "Even permutation" is a theorem, not a convention

Write a shuffle as a sequence of swaps and the number of swaps is up to you: three, or five, or seventeen. What is *not* up to you is the parity. No permutation is both a product of three transpositions and a product of four.

That deserves more suspicion than it usually gets. Nothing in the definition of a permutation mentions counting, and the obvious proofs by induction on cycle structure are fiddly enough that it is easy to smuggle in the thing you are proving.

The clean argument uses a polynomial as a referee. Take the product of all the differences $x_i-x_j$ for $i<j$. A permutation acts on it by relabelling the variables. A single swap flips exactly one sign overall. So every permutation multiplies this one fixed polynomial by $+1$ or $-1$, and that number was computed without ever factoring the permutation.

Parity being well defined is the whole reason the 15 puzzle has an unreachable half, and the reason the alternating group exists at all.

## Rigor

Let $\Delta=\prod_{1\le i<j\le n}(x_i-x_j)$ and for $\sigma\in S_n$ define $\sigma\cdot\Delta=\prod_{i<j}(x_{\sigma(i)}-x_{\sigma(j)})$. Each factor of $\Delta$ reappears up to sign, so
$$\sigma\cdot\Delta=\operatorname{sgn}(\sigma)\,\Delta,\qquad \operatorname{sgn}(\sigma)\in\{\pm1\},$$
and $\operatorname{sgn}$ is defined without reference to any factorisation.

It is a homomorphism: $(\sigma\tau)\cdot\Delta=\sigma\cdot(\tau\cdot\Delta)$ gives $\operatorname{sgn}(\sigma\tau)=\operatorname{sgn}(\sigma)\operatorname{sgn}(\tau)$. And a transposition $(k\,\ell)$ has $\operatorname{sgn}=-1$: it fixes or swaps factors in pairs except for the single factor $(x_k-x_\ell)$, which changes sign. Hence a product of $r$ transpositions has sign $(-1)^r$, so $r$'s parity is forced.

The kernel is the **alternating group** $A_n$, of index 2 and order $n!/2$. For the 15 puzzle, the reachable configurations are exactly the even ones, which is $16!/2=10{,}461{,}394{,}944{,}000$ of them. And $A_n$ is simple for $n\ge5$ — the fact that eventually kills the quintic.

## Recall
type: mcq
Q: What does the polynomial $\prod_{i<j}(x_i-x_j)$ contribute to the proof that parity is well defined?
- [x] It gives a value $\pm 1$ attached to each permutation without choosing any factorisation into swaps — so the parity cannot depend on the factorisation.
- [ ] It counts the number of transpositions directly — it does not; it only records whether that number is odd or even.
- [ ] It shows every permutation is a product of transpositions — that is a separate, easy fact; the hard part is that the count's parity is unique.
