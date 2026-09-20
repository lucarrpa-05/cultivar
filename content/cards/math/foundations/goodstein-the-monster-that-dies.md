---
id: math.foundations.induction-recursion.goodstein-the-monster-that-dies
topic: math.foundations.induction-recursion
topics: [math.foundations.godel]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [paradox, beautiful, connection]
tags: [goodstein, ordinals, epsilon-zero, kirby-paris, peano-arithmetic]
hook: "A sequence that reaches 10^154 by its third term and still hits zero. Peano arithmetic cannot prove it does."
sources:
  - {title: "Goodstein's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Goodstein%27s_theorem"}
  - {title: "Accessible Independence Results for Peano Arithmetic", author: "Laurie Kirby and Jeff Paris", year: 1982, type: paper, url: "https://doi.org/10.1112/blms/14.4.285"}
  - {title: "Epsilon numbers", type: wiki, url: "https://en.wikipedia.org/wiki/Epsilon_number"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The sequence that explodes, and dies anyway

Take 19. Write it using only 2s: $19 = 2^{2^{2}} + 2 + 1$. Now bump every 2 to a 3 and subtract one. You get 7,625,597,484,990. Bump every 3 to a 4, subtract one: about $1.3\times10^{154}$. Keep going, base by base, forever.

Your instinct says this runs away. It does not. Every Goodstein sequence reaches zero. Reuben Goodstein proved it in 1944.

The trick is that while the numbers scream upward, something invisible goes *down*. Replace every base in the notation by the symbol $\omega$ instead of the next integer. Bumping the base does nothing to that object; subtracting one strictly shrinks it. And a decreasing sequence of ordinals cannot go on forever, so the game ends — and when the ordinal hits zero the number has too.

Now the twist. Kirby and Paris showed in 1982 that arithmetic itself cannot run this argument.

## Rigor

**Hereditary base-$n$ notation.** Write $m$ in base $n$, then write every exponent in base $n$, recursively. The Goodstein sequence $G_k(m)$ sets $G_2 = m$, and gets $G_{n+1}$ by replacing every $n$ in the hereditary base-$n$ form of $G_n$ with $n+1$ and subtracting 1.

**Theorem (Goodstein, 1944).** For every $m$ there is an $N$ with $G_N(m)=0$.

**Proof sketch.** Map the hereditary base-$n$ form to an ordinal below $\varepsilon_0=\sup\{\omega,\omega^\omega,\omega^{\omega^\omega},\dots\}$ by sending every occurrence of $n$ to $\omega$. Base-bumping leaves this ordinal unchanged — that is the point of *hereditary* notation, since the syntax is identical. Subtracting 1 strictly decreases it. So the ordinals form a strictly decreasing sequence in $\varepsilon_0$, which is well-ordered: no infinite descent. Hence the sequence terminates.

**Theorem (Kirby–Paris, 1982).** Goodstein's theorem is not provable in Peano arithmetic.

Because proving it is equivalent, over PA, to transfinite induction up to $\varepsilon_0$ — exactly the principle Gentzen used in 1936 to prove PA consistent, and exactly what PA cannot have by Gödel's second theorem. The "invisible thing going down" is the part PA cannot see.

## Recall
type: mcq
Q: Why does every Goodstein sequence terminate?
- [x] A matching sequence of ordinals below $\varepsilon_0$ strictly decreases, and ordinals cannot decrease forever — base-bumping leaves the ordinal fixed while the $-1$ shrinks it.
- [ ] The terms eventually stop growing because subtracting 1 overtakes the base change — the terms keep growing for astronomically many steps; growth is not the mechanism.
- [ ] It follows from ordinary induction on the size of the terms — if it did, Peano arithmetic could prove it, and Kirby and Paris showed it cannot.
- [ ] Only sequences starting below 4 terminate — every starting value terminates; the starting value only changes how absurdly long it takes.
