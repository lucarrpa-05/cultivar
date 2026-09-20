---
id: physics.quantum.spin-pauli.why-you-dont-sink-through-the-floor
topic: physics.quantum.spin-pauli
format: idea
difficulty: 2
language: en
weight: heavy
angles: [connection, numbers]
tags: [pauli-exclusion, fermions, antisymmetry, degeneracy-pressure, chandrasekhar]
hook: "Solidity is not electrical repulsion. It is a bookkeeping rule about which states exist, and it holds up white dwarfs too."
sources:
  - {title: "Pauli exclusion principle", type: wiki, url: "https://en.wikipedia.org/wiki/Pauli_exclusion_principle"}
  - {title: "Spin–statistics theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Spin%E2%80%93statistics_theorem"}
  - {title: "Chandrasekhar limit", type: wiki, url: "https://en.wikipedia.org/wiki/Chandrasekhar_limit"}
dates: {written: 2026-09-19, event: 1925-01-01}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Chandrasekhar's 1930 shipboard work began the calculation; the 1.4 solar-mass value needs the corrected mean molecular weight. Reworded."}
---

# Why you don't sink through the floor

The usual answer is that the electrons in your shoes repel the electrons in the floor. That is true and it is not enough. Electrical repulsion is matched by attraction between those same electrons and the nuclei; if that were the whole story, matter would collapse to a far denser state than it does.

What keeps matter fluffy is a rule Pauli wrote down in 1925: no two electrons can occupy the same quantum state. Not "they push each other away" — there is no force in the statement. The states simply do not exist.

Stack electrons into an atom and they fill levels one at a time, because the low ones are taken. That is the entire structure of the periodic table: shells, valence, chemistry, why sodium is violent and neon is not. Push two atoms together and their electrons would have to share states already occupied, so they refuse. That refusal is what you feel when you knock on a table.

The same rule holds up dead stars, until it doesn't.

## Rigor

Identical particles mean the state must be an eigenvector of the exchange operator: $\Psi(1,2) = \pm\Psi(2,1)$. Fermions take the minus sign, and an antisymmetric two-particle state is a determinant,

$$\Psi(1,2) = \frac{1}{\sqrt2}\begin{vmatrix}\psi_a(1) & \psi_b(1)\\ \psi_a(2) & \psi_b(2)\end{vmatrix},$$

which vanishes identically when $\psi_a = \psi_b$ — two rows equal, determinant zero. Exclusion is a linear-algebra fact about antisymmetric tensors, not a force law. Pauli's 1940 spin–statistics theorem then shows that half-integer spin *requires* the minus sign in any relativistic quantum field theory.

The consequence at scale: a gas of $N$ fermions in volume $V$ cannot all sit in the ground state, so it exerts pressure even at zero temperature,

$$P \propto n^{5/3}, \qquad n = N/V,$$

for the non-relativistic case. This *degeneracy pressure* holds up white dwarfs. But as the star is compressed the electrons turn relativistic, the exponent softens to $4/3$, and pressure then scales exactly like gravity — so the balance becomes marginal and there is a maximum mass. Chandrasekhar began that calculation in 1930, aged 19, on the boat from Madras to England; worked through with the right composition it gives about $1.4\,M_\odot$. Above it, nothing made of electrons can hold the star up.

Proving that ordinary matter is stable at all — that $N$ atoms occupy volume proportional to $N$ — took until Dyson and Lenard in 1967, and exclusion is indispensable to the proof.

## Recall
type: mcq
Q: Why is the Pauli exclusion principle not a force?
- [ ] Because it is far too weak to be called a force. — it is strong enough to hold up a white dwarf against its own gravity.
- [x] Because it is a constraint on which states exist: antisymmetric wavefunctions vanish when two fermions share a state. — no interaction term appears anywhere in the statement.
- [ ] Because it applies only to electrons, and forces apply to everything. — it applies to every fermion: protons, neutrons, quarks, neutrinos.
- [ ] Because it acts instantaneously, and forces propagate at finite speed. — it is not a propagating influence at all, which is precisely why the question of speed does not arise.
