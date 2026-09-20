---
id: physics.quantum.quantum-computing.not-a-parallel-computer
topic: physics.quantum.quantum-computing
format: idea
difficulty: 2
language: en
weight: heavy
angles: [mistake, tool]
tags: [quantum-computing, interference, grover, shor, amplitude-amplification]
hook: "\"It tries every answer at once\" is the wrong picture. If that were all it did, you would read out a random answer."
sources:
  - {title: "Quantum computing", type: wiki, url: "https://en.wikipedia.org/wiki/Quantum_computing"}
  - {title: "Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer", author: "Peter W. Shor", year: 1995, type: paper, url: "https://arxiv.org/abs/quant-ph/9508027"}
  - {title: "A fast quantum mechanical algorithm for database search", author: "Lov K. Grover", year: 1996, type: paper, url: "https://arxiv.org/abs/quant-ph/9605043"}
dates: {written: 2026-09-19, event: 1994-11-20}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A quantum computer is not a parallel computer

The sales pitch says a quantum computer tries every possible answer simultaneously. There is a grain of truth in it and the grain is the misleading part.

Yes: $n$ qubits carry $2^n$ amplitudes, and a single operation acts on all of them. No: you cannot read them. Measurement returns exactly one bit string, chosen randomly with probability the squared amplitude. A machine that merely "tried everything" and then measured would hand you a uniformly random guess, which your laptop can also do, instantly and for free.

The real resource is interference, the same phenomenon that made the fringes in the double slit. A quantum algorithm is a choreography in which the amplitudes of the wrong answers are steered to cancel each other and those of the right answers to add. All the difficulty is in the choreography, which is why there are so few good quantum algorithms rather than one universal speedup.

And the honest caveat: only a handful of problems have known exponential speedups. Most do not.

## Rigor

A register of $n$ qubits is a unit vector in $(\mathbb{C}^2)^{\otimes n} \cong \mathbb{C}^{2^n}$; computation is a unitary $U$; readout is a projective measurement. Unitarity is the constraint that makes "just try everything" useless: it preserves the norm, so amplitude given to one outcome must be taken from another.

**Grover.** Searching $N$ items with an oracle marking the good one, start from the uniform superposition and alternate two reflections: about the marked state, then about the initial state. Each pair is a rotation by $\theta$ with $\sin\theta = 1/\sqrt N$ in the two-dimensional plane spanned by "marked" and "unmarked", so after about $\tfrac{\pi}{4}\sqrt{N}$ iterations the state has rotated onto the answer. Quadratic, not exponential — and provably optimal, so no cleverer quantum search exists.

**Shor.** Factoring reduces to finding the period of $f(x)=a^x \bmod N$. The quantum Fourier transform turns a periodic superposition into one concentrated on multiples of the inverse period, which *is* interference doing the work: amplitudes at non-multiples cancel. Polynomial time, against the best known classical algorithm's $\exp\!\big(c(\log N)^{1/3}(\log\log N)^{2/3}\big)$.

Note what is not claimed. BQP is not known to contain NP, and nobody expects a quantum computer to solve NP-complete problems efficiently. The engineering bottleneck is error correction: physical qubits decohere, and a logical qubit currently costs a great many physical ones.

## Recall
type: mcq
Q: If a quantum register really does hold $2^n$ amplitudes at once, why isn't that an instant exponential speedup?
- [ ] Because $2^n$ amplitudes cannot physically fit in $n$ qubits. — they do; the state space really is that big.
- [x] Because measurement returns a single string sampled from those amplitudes, so the speedup must come from making wrong answers cancel. — without engineered interference you have drawn a random guess.
- [ ] Because decoherence destroys the state before you can use it. — decoherence is an engineering obstacle, not the reason the naive picture fails.
- [ ] Because unitary operations cannot act on all amplitudes simultaneously. — they act on all of them at once; that part of the pitch is accurate.
