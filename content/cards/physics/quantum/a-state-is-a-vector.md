---
id: physics.quantum.superposition-measurement.a-state-is-a-vector
topic: physics.quantum.superposition-measurement
format: series
difficulty: 2
language: en
weight: medium
angles: [connection, tool]
tags: [born-rule, hilbert-space, superposition, measurement, basis]
hook: "Superposition sounds mystical until you notice it means \"not parallel to the basis you happened to pick\"."
series: {id: physics.quantum.no-mysticism-arc, index: 3, total: 5, title: "Quantum, no mysticism"}
sources:
  - {title: "Born rule", type: wiki, url: "https://en.wikipedia.org/wiki/Born_rule"}
  - {title: "Quantum superposition", type: wiki, url: "https://en.wikipedia.org/wiki/Quantum_superposition"}
  - {title: "Max Born", type: wiki, url: "https://en.wikipedia.org/wiki/Max_Born"}
dates: {written: 2026-09-19, event: 1926-06-25}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A state is a vector. A measurement is a choice of basis.

This is where popular accounts start saying that a particle is "in two places at once" and that consciousness collapses reality. None of that is in the theory. Here is what is.

The state of a quantum system is a vector of length one in a complex vector space. Not a wave in a medium, not a cloud of stuff: a vector.

Every measurement corresponds to a choice of orthonormal basis. The possible outcomes are the basis vectors. The probability of each outcome is the squared length of your state's component along it. Max Born wrote that rule down in 1926, in a footnote correcting his own main text, which had the probability as the amplitude rather than its square.

"Superposition" now reads as what it is: your state is not parallel to any single vector of the basis your apparatus imposes. A vector at 45° between $|{\uparrow}\rangle$ and $|{\downarrow}\rangle$ is not in two states at once. It is one perfectly definite vector, pointing somewhere your instrument does not have a name for.

Which is fine for one particle. Two is where it gets strange.

## Rigor

States live in a complex Hilbert space $\mathcal{H}$ with $\langle\psi|\psi\rangle = 1$. Observables are self-adjoint operators $A$; by the spectral theorem $A = \sum_i a_i P_i$ with real eigenvalues $a_i$ and orthogonal projectors $P_i$ summing to the identity. Measuring $A$ returns some $a_i$, and the Born rule gives

$$P(a_i) = \langle\psi|P_i|\psi\rangle = |c_i|^2, \qquad |\psi\rangle = \sum_i c_i|i\rangle,$$

with expectation $\langle A\rangle = \langle\psi|A|\psi\rangle$. Self-adjointness is doing two jobs: it makes the eigenvalues real (outcomes are numbers you can read off a dial) and it makes the eigenvectors orthogonal (outcomes are mutually exclusive).

Two points the popular version gets wrong. First, "superposition" is basis-dependent: $|{\uparrow}\rangle_x = \tfrac{1}{\sqrt2}(|{\uparrow}\rangle_z + |{\downarrow}\rangle_z)$ is a superposition in $z$ and an eigenstate in $x$, so it cannot be an objective property of the system. Second, the global phase is unphysical — $|\psi\rangle$ and $e^{i\theta}|\psi\rangle$ give identical predictions — so states really live in projective space. *Relative* phase between components is entirely physical, and it is exactly what produced the fringes in episode 2.

## Recall
type: mcq
Q: Is "being in a superposition" a property of a quantum system?
- [ ] Yes: some states are superpositions and others are not, independently of what you measure. — every nonzero vector is an eigenvector of *some* observable, so the label cannot be intrinsic.
- [x] No: it is a statement about the state relative to a chosen basis, and the same state is a superposition in one basis and an eigenstate in another. — the spin pointing along $x$ is a $z$-superposition and an $x$-eigenstate at the same time.
- [ ] Yes, but only for particles that have not yet been observed. — observation is not what defines it; the basis is.
- [ ] No, because superposition is only a calculational device with no physical consequences. — the relative phase between components produces interference you can measure.
