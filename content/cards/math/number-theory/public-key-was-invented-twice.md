---
id: math.number-theory.cryptography.public-key-was-invented-twice
topic: math.number-theory.cryptography
format: idea
difficulty: 2
language: en
weight: medium
angles: [history, practical, tool]
tags: [rsa, clifford-cocks, gchq, fermats-little-theorem, public-key]
hook: "A GCHQ mathematician wrote down RSA in 1973. He could not tell anyone for twenty-four years."
sources:
  - {title: "Clifford Cocks", type: wiki, url: "https://en.wikipedia.org/wiki/Clifford_Cocks"}
  - {title: "RSA cryptosystem", type: wiki, url: "https://en.wikipedia.org/wiki/RSA_cryptosystem"}
  - {title: "Public-key cryptography", type: wiki, url: "https://en.wikipedia.org/wiki/Public-key_cryptography"}
dates: {written: 2026-09-19, event: 1997-12-18}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Fermat's 1640 letter is three centuries before Cocks, not one."}
---

# Public-key cryptography was invented twice, secretly first

For most of history, a coded message needed a key both sides already shared, which meant the key had to travel — and could be stolen on the way. James Ellis at GCHQ argued in 1969 that this was not logically necessary: you could publish the lock and keep only the key.

Clifford Cocks joined GCHQ in September 1973 and, within weeks, found how. Use a product of two large primes. Anyone can encrypt with it; only someone who knows the two factors can decrypt. Then it was classified, and stayed classified.

Rivest, Shamir and Adleman published the same idea in 1977 and got the name, the patent, and the company. GCHQ declassified its history on 18 December 1997. Ellis had died three weeks earlier.

The mathematics is three centuries older than either of them: a theorem Fermat wrote down in a letter of 18 October 1640.

## Rigor

**Setup.** Pick distinct large primes $p,q$; let $N=pq$ and $\lambda=\mathrm{lcm}(p-1,q-1)$. Pick $e$ coprime to $\lambda$ and set $d\equiv e^{-1}\pmod{\lambda}$. Publish $(N,e)$; keep $d$, $p$, $q$.

**Encrypt / decrypt.** $c\equiv m^{e}\pmod N$, and $m\equiv c^{d}\pmod N$.

**Why decryption works.** $ed=1+k\lambda$, so $c^{d}\equiv m^{1+k\lambda}$. Work modulo $p$: if $p\nmid m$, Fermat's little theorem gives $m^{p-1}\equiv 1$, and $(p-1)\mid\lambda$, so $m^{k\lambda}\equiv1$ and $m^{ed}\equiv m \pmod p$; if $p\mid m$ both sides are $0$. Same modulo $q$. The Chinese remainder theorem glues the two congruences into $m^{ed}\equiv m \pmod{N}$.

**Where the security is.** Knowing $\lambda$ is as good as factoring $N$, so recovering $d$ from $(N,e)$ is at least as hard as splitting $N$ — but the converse is unproven, and "RSA is as hard as factoring" is a conjecture, not a theorem. No efficient classical factoring algorithm is known; Shor's quantum algorithm does it in polynomial time, which is why the standards bodies are already migrating.

## Recall
type: mcq
Q: What makes RSA decryption work?
- [x] The two exponents are inverse modulo $\lambda(N)$ — so $m^{ed}\equiv m$ by Fermat's little theorem modulo $p$ and modulo $q$, glued by the Chinese remainder theorem.
- [ ] $N$ is too large to search — brute force is irrelevant; the exponent identity is what recovers the message.
- [ ] The exponent $e$ is kept secret — $e$ is published; only $d$ and the factors are secret.
- [ ] Factoring is proven to be hard — no such proof exists; RSA rests on a conjecture nobody has broken.
