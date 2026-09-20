---
id: math.number-theory.divisibility-primes.euclid-did-not-argue-by-contradiction
topic: math.number-theory.divisibility-primes
format: idea
difficulty: 2
language: en
weight: medium
angles: [mistake, history, beautiful]
tags: [euclid, infinitude-of-primes, direct-proof, elements-ix-20]
hook: "Everyone reports that Euclid assumed finitely many primes and found a contradiction. He did no such thing."
sources:
  - {title: "Euclid's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Euclid%27s_theorem"}
  - {title: "Elements, Book IX, Proposition 20", author: "Euclid", type: primary, url: "https://mathcs.clarku.edu/~djoyce/elements/bookIX/propIX20.html"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "\"Nothing was contradicted\" overstated it: the proof does carry a one-line reductio (q∤1). The point survives — no list of all primes is assumed."}
---

# Euclid never argued by contradiction

The proof you were taught: suppose there are finitely many primes $p_1,\dots,p_n$; form $N=p_1p_2\cdots p_n+1$; it is divisible by none of them; contradiction.

Euclid's Proposition IX.20 says something else entirely: "Prime numbers are more than any assigned multitude of prime numbers." Hand him any finite list of primes — not *all* the primes, just any list. He multiplies them, adds one, and shows the result must have a prime factor outside your list. No assumption, no contradiction, and at the end you hold a brand-new prime.

The difference is not pedantry. The contradiction version assumes something false and then discards everything; Euclid's version is a machine. Feed it $\{2\}$ and it returns 3. Feed it $\{2,3\}$ and it returns 7. It never stops giving.

There is one trap in it that the textbook telling hides, and it is worth seeing.

## Rigor

**Proposition (Elements IX.20).** For any finite set of primes $S=\{p_1,\dots,p_n\}$ there is a prime $q\notin S$.

**Proof.** Let $N=p_1p_2\cdots p_n+1$. Since $N>1$ it has a least divisor $q>1$, and $q$ is prime. If $q=p_i$ for some $i$, then $q\mid N$ and $q\mid N-1$, so $q\mid 1$ — impossible. Hence $q\notin S$. $\square$

No list of *all* the primes is ever assumed. There is a one-line reductio buried in it — $q\mid 1$ is impossible — but what it refutes is $q\in S$, not a hypothetical finite universe of primes, and you walk away holding $q$ either way.

**The trap.** $N$ itself need not be prime. With $S=\{2,3,5,7,11,13\}$,
$$N = 30030+1 = 30031 = 59\times 509,$$
and neither 59 nor 509 is on the list — the proof promised a new prime *factor*, not a new prime. Euclid's sequence is not a prime-generating formula, and whether infinitely many of the $N$ are themselves prime is open.

**Euler's version, for contrast.** $\sum_p 1/p$ diverges, which gives infinitude again and says far more: the primes are not merely unending, they are dense enough for their reciprocals to add up without bound.

## Recall
type: mcq
Q: Euclid's construction, applied to $\{2,3,5,7,11,13\}$, gives $N=30031$. What does the proof guarantee about it?
- [x] It has a prime factor outside the list — indeed $30031 = 59\times 509$, and both are new primes.
- [ ] It is prime — $N$ often is not; the theorem is about its factors, not about $N$.
- [ ] It is divisible by 7 — $N$ leaves remainder 1 on division by every prime in the list.
- [ ] It is the next prime after 13 — the construction jumps wildly; it enumerates nothing in order.
