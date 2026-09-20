---
id: physics.quantum.schrodinger.energy-levels-are-eigenvalues
topic: physics.quantum.schrodinger
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [schrodinger-equation, eigenvalues, spectrum, hydrogen, self-adjoint]
callback: {from: math.linear-algebra.eigen, to: physics.quantum.schrodinger}
hook: "Why is the light from hydrogen a set of sharp lines instead of a smear? Because you are looking at a spectrum in the linear-algebra sense."
sources:
  - {title: "Schrödinger equation", type: wiki, url: "https://en.wikipedia.org/wiki/Schr%C3%B6dinger_equation"}
  - {title: "Hydrogen atom", type: wiki, url: "https://en.wikipedia.org/wiki/Hydrogen_atom"}
  - {title: "Self-adjoint operator", type: wiki, url: "https://en.wikipedia.org/wiki/Self-adjoint_operator"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Hydrogen's colours are eigenvalues you can photograph

An eigenvector is a direction an operator does not turn, only scales, and the eigenvalue is the scale factor. You met the word "spectrum" for the set of those numbers, and it probably seemed like an odd choice of word.

It is not a metaphor. It is the original meaning, borrowed back.

Heat hydrogen and it emits light at a few precise wavelengths — a red line at 656 nm, a blue-green at 486 nm, and so on — with nothing in between. Every element has its own list, and that list is how we know what stars are made of. Where do the gaps come from?

Because the equation governing the electron is an eigenvalue problem. There is a linear operator, the Hamiltonian, representing energy. The states an atom can sit in are its eigenvectors, the allowed energies are its eigenvalues, and light is emitted when the atom drops from one to another, carrying the difference. The gaps in the spectrum are the gaps between eigenvalues.

A clamped guitar string does the same thing for the same reason: boundary conditions leave only a discrete set of solutions.

## Rigor

The time-independent Schrödinger equation is exactly $H\psi = E\psi$:

$$-\frac{\hbar^2}{2m}\nabla^2\psi(\mathbf{r}) + V(\mathbf{r})\psi(\mathbf{r}) = E\,\psi(\mathbf{r}),$$

an eigenvalue problem for an unbounded self-adjoint operator on $L^2(\mathbb{R}^3)$. Everything you know from the finite-dimensional case carries over where it can: self-adjointness makes $E$ real, eigenfunctions with distinct eigenvalues are orthogonal, and the spectral theorem gives a decomposition of the state.

What is new is that the spectrum need not be a finite list. For the Coulomb potential $V = -e^2/4\pi\varepsilon_0 r$ the spectrum splits in two: a discrete part

$$E_n = -\frac{13.6\ \mathrm{eV}}{n^2}, \qquad n = 1,2,3,\dots$$

for the bound states, and a continuous part $E>0$ for the ionised electron. The discreteness is not imposed; it is forced by demanding $\psi \in L^2$, i.e. normalisability. Solutions exist for every $E<0$, but they blow up at infinity unless $E$ takes one of the $E_n$ — the boundary condition at infinity is the clamp on the guitar string.

Time evolution then follows from the eigenbasis exactly as in the finite-dimensional case: $\psi(t) = \sum_n c_n e^{-iE_nt/\hbar}\psi_n$. Diagonalise the operator and you have solved the dynamics. That is the whole game, and it is the game you already know.

## Recall
type: mcq
Q: Why are the bound-state energies of a hydrogen atom discrete?
- [ ] Because electrons can only travel in circles of certain radii. — Bohr's 1913 picture; the actual eigenfunctions are not orbits at all.
- [x] Because only certain values of $E$ admit a normalisable solution of $H\psi = E\psi$ — the boundary condition at infinity selects a discrete set. — the same mechanism as the fixed ends of a vibrating string.
- [ ] Because energy is quantised as a fundamental postulate of quantum mechanics. — quantisation is a *result* here; the postulates never mention discrete energies.
- [ ] Because the Hamiltonian is a finite-dimensional matrix with finitely many eigenvalues. — it acts on an infinite-dimensional space and has a continuous part above the ionisation threshold.
