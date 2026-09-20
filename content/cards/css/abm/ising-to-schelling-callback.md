---
id: css.abm.emergence.ising-to-schelling-callback
topic: css.abm.emergence
topics: [css.abm.schelling]
format: callback
difficulty: 4
language: en
weight: heavy
angles: [connection, beautiful]
tags: [ising-model, phase-transition, schelling, potential-function, physics-of-society]
hook: "Magnets and neighbourhoods obey the same equation. One of them has a temperature; the other has tolerance."
callback: {from: physics.thermo.phase-transitions, to: css.abm.emergence}
sources:
  - {title: "Ising model", type: wiki, url: "https://en.wikipedia.org/wiki/Ising_model"}
  - {title: "Schelling's model of segregation", type: wiki, url: "https://en.wikipedia.org/wiki/Schelling%27s_model_of_segregation"}
  - {title: "A physical analogue of the Schelling model", author: "Dejan Vinković and Alan Kirman", year: 2006, type: paper, url: "https://doi.org/10.1073/pnas.0609371103"}
dates: {written: 2026-09-19}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Rigor used $u_i$ for both utility and unlike-neighbour count; rewritten with separate like/unlike counts."}
author: author-css-1
---

# Remember the Ising model? You have already seen Schelling's board

A ferromagnet is a lattice of spins that each want to agree with their neighbours. Nothing in a single spin knows what "magnetised" means, yet below a critical temperature the whole lattice commits to one direction. That is the cleanest phase transition in physics, and you met it as a story about heat.

Now reread Schelling. A lattice of agents that each want to agree with their neighbours. Nothing in a single coin knows what a ghetto is. Below a critical tolerance the whole board commits. Same lattice, same local rule, same abrupt global change.

The mapping is not a metaphor. Vinković and Kirman (2006) showed Schelling's dynamics is a physical system of clustering particles with an interaction energy, and that the large blobs on the equilibrium board are the social equivalent of surface tension: clusters coarsen because boundaries are expensive.

What physics gives you here is not a new fact about cities. It is a warning: the sharpness of the transition is a property of the lattice, not of anybody's prejudice.

## Rigor

Ising on a lattice: spins $s_i\in\{-1,+1\}$, energy $H=-J\sum_{\langle i,j\rangle}s_is_j$, and a spin flips with a probability set by the energy change and the temperature $T$. In two dimensions there is a critical $T_c$ below which spontaneous magnetisation appears.

Schelling's rule is the zero-temperature limit of the same object with one twist. Write $\ell_i$ and $d_i$ for the like and unlike neighbours of agent $i$, so the agent is content iff $\ell_i\ge\tau(\ell_i+d_i)$; a move that raises $\sum_i \ell_i$ — twice the number of like-neighbour pairs — is exactly a move that lowers $-\sum_{\langle i,j\rangle}s_is_j$. That sum is an Ising energy, and for symmetric rules it is a Lyapunov function: the dynamics is greedy descent on $H$ with conserved numbers of each spin, so it halts.

Two real differences. Schelling's agents *move* rather than flip, so each species' count is conserved — the physics analogue is Kawasaki (conserved) rather than Glauber (non-conserved) dynamics, and conserved dynamics is what produces coarsening blobs instead of one uniform domain. And the tolerance $\tau$ plays the role of $-1/T$: raising tolerance is heating the board.

So "a phase transition in segregation" is a literal claim, not a figure of speech.

## Recall
type: mcq
Q: What plays the role of temperature in the Ising reading of Schelling's model?
- [x] Tolerance — a higher demand for like neighbours behaves like cooling the lattice, and the board orders below a critical value.
- [ ] The number of empty squares — vacancies set how fast the dynamics runs, not whether the ordered phase exists.
- [ ] The size of the board — finite size rounds off the transition, but it is not the control parameter.
