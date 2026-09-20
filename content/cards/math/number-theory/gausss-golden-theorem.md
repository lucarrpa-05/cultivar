---
id: math.number-theory.quadratic-reciprocity.gausss-golden-theorem
topic: math.number-theory.quadratic-reciprocity
format: idea
difficulty: 3
language: en
weight: heavy
angles: [beautiful, tool, history]
tags: [quadratic-reciprocity, legendre-symbol, gauss, theorema-aureum]
hook: "Whether 5 is a square mod 17 secretly depends on whether 17 is a square mod 5. Nothing in the setup suggests it should."
sources:
  - {title: "Quadratic reciprocity", type: wiki, url: "https://en.wikipedia.org/wiki/Quadratic_reciprocity"}
  - {title: "Disquisitiones Arithmeticae", author: "Carl Friedrich Gauss", year: 1801, type: book, url: "https://en.wikipedia.org/wiki/Disquisitiones_Arithmeticae"}
  - {title: "Legendre symbol", type: wiki, url: "https://en.wikipedia.org/wiki/Legendre_symbol"}
dates: {written: 2026-09-19, event: 1801-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Gauss called it golden and proved it eight times

Is 5 a square modulo 17? The honest way to find out is to square everything: $1,4,9,16,8,2,15,13$. No 5. It is not.

Now the strange part. That answer was already determined by a completely different question — is 17 a square modulo 5? — living in a world of five elements that knows nothing about 17. Reduce: $17\equiv 2 \pmod 5$, and the squares mod 5 are 1 and 4. No. Same answer, one line, no search.

Two prime moduli have no business talking to each other. Nothing about arithmetic mod 17 is built out of arithmetic mod 5. And yet the two questions have linked answers, always, with one tidy exception when both primes are $3 \bmod 4$, in which case the answers flip.

Gauss found a proof in 1796, before he turned twenty, and published it in the *Disquisitiones* in 1801. He called it privately his *theorema aureum*, the golden theorem, and went on to prove it eight separate times. Over 240 proofs are known now. That is not obsession, it is a signal.

## Rigor

For an odd prime $p$ and $a$ coprime to $p$, the Legendre symbol is $\left(\frac{a}{p}\right)=+1$ if $a$ is a quadratic residue mod $p$ and $-1$ otherwise; Euler's criterion gives $\left(\frac{a}{p}\right)\equiv a^{(p-1)/2}\pmod p$.

**Law of quadratic reciprocity.** For distinct odd primes $p,q$,
$$\left(\frac{p}{q}\right)\left(\frac{q}{p}\right)=(-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}} .$$
So the two symbols agree unless $p\equiv q\equiv 3 \pmod 4$, where they differ.

**Supplements.** $\left(\frac{-1}{p}\right)=1 \iff p\equiv 1 \pmod 4$, and $\left(\frac{2}{p}\right)=1 \iff p\equiv \pm 1\pmod 8$.

**The worked example.** $5\equiv 1\pmod 4$, so the sign is $+1$ and $\left(\frac{5}{17}\right)=\left(\frac{17}{5}\right)=\left(\frac{2}{5}\right)=-1$, since $5\not\equiv\pm1\pmod 8$. That is the one-line answer from the intuition.

**Why it is true (Eisenstein's proof).** Gauss's lemma turns $\left(\frac{q}{p}\right)$ into $(-1)^{\mu}$, where $\mu$ counts residues of $q,2q,\dots,\frac{p-1}{2}q$ landing in the upper half mod $p$. That count equals the number of lattice points under the line $y=\frac{q}{p}x$ inside a rectangle. Doing the same for $\left(\frac{p}{q}\right)$ gives the lattice points on the other side of the same line, and the two counts together fill the rectangle: $\frac{p-1}{2}\cdot\frac{q-1}{2}$ points. The exponent on the right is literally an area.

## Recall
type: mcq
Q: When do $\left(\frac{p}{q}\right)$ and $\left(\frac{q}{p}\right)$ disagree?
- [x] Exactly when both $p$ and $q$ are $3$ mod $4$ — then the exponent $\frac{p-1}{2}\cdot\frac{q-1}{2}$ is odd and the sign is $-1$.
- [ ] Whenever $p\neq q$ — they agree for three of the four residue-class combinations.
- [ ] When one of them is 2 — the law is stated for odd primes; 2 gets its own supplement.
- [ ] When both are $1$ mod $4$ — that is precisely a case where they agree.
