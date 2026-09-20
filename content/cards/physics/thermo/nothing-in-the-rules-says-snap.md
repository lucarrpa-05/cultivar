---
id: physics.thermo.phase-transitions.nothing-in-the-rules-says-snap
topic: physics.thermo.phase-transitions
format: idea
difficulty: 2
language: en
weight: heavy
angles: [paradox, beautiful]
tags: [phase-transition, ising-model, onsager, critical-temperature, thermodynamic-limit]
hook: "Each atom obeys a smooth rule and talks only to its neighbours. Somehow the whole sheet of them changes state at one exact temperature."
sources:
  - {title: "Ising model", type: wiki, url: "https://en.wikipedia.org/wiki/Ising_model"}
  - {title: "Square lattice Ising model", type: wiki, url: "https://en.wikipedia.org/wiki/Square_lattice_Ising_model"}
  - {title: "Crystal Statistics. I. A Two-Dimensional Model with an Order-Disorder Transition", author: "Lars Onsager", year: 1944, type: paper, url: "https://doi.org/10.1103/PhysRev.65.117"}
dates: {written: 2026-09-19, event: 1944-02-01}
diagram: {file: physics/ising-lattice.svg, caption: "A sheet of spins: ordered on the left, noise-dominated on the right. Each arrow only feels its four neighbours.", alt: "A square grid of small up and down arrows, nearly all pointing up on the left half and randomly mixed on the right half"}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Nobody told the atoms to do it all at once

Heat a bar magnet and it loses its magnetism. Not gradually — iron holds on until 770 °C and then gives up, and the magnetisation goes to zero at that point and stays there. Water does the same thing at 100 °C. Sharp corners, at exact temperatures.

That should bother you. Every atom follows a smooth rule and only feels its immediate neighbours. Nobody is coordinating. Where does a *sharp* change come from, when every ingredient is smooth and local?

The toy model is embarrassingly simple: a grid of arrows, each pointing up or down. Neighbours prefer to agree; temperature knocks arrows over at random. Ernst Ising solved the one-dimensional chain for his 1925 thesis, found no transition at all, and concluded — wrongly — that the model never has one. Nineteen years later Lars Onsager solved the two-dimensional square lattice exactly, and there it is: a genuine sharp transition.

The resolution of the paradox is one word, and it is *infinity*.

## Rigor

The model is

$$H(\sigma) = -J\sum_{\langle ij\rangle}\sigma_i\sigma_j - h\sum_i\sigma_i, \qquad \sigma_i\in\{-1,+1\},$$

and everything thermodynamic comes from the free energy $F = -k_BT\ln Z$, $Z = \sum_\sigma e^{-\beta H(\sigma)}$.

Here is why finite systems cannot have phase transitions. For finite $N$, $Z$ is a finite sum of exponentials in $\beta$ — an analytic function, and strictly positive, so $\ln Z$ is analytic too. Analytic functions have no kinks. A sharp transition is a non-analyticity in $F$, so it can only appear in the limit $N\to\infty$, where a sequence of analytic functions converges to something that is not. Sharpness is an emergent property of the limit, not of any atom.

In 1D the transfer matrix gives $Z = \lambda_+^N + \lambda_-^N$ with $\lambda_\pm$ analytic and $\lambda_+ > \lambda_- > 0$ for all $T>0$: no transition, as Ising found. In 2D, Onsager's exact solution puts the critical point at

$$\frac{k_BT_c}{J} = \frac{2}{\ln(1+\sqrt2)} \approx 2.269,$$

with the magnetisation vanishing as $(T_c-T)^{1/8}$. That exponent $1/8$ is shared by wildly different physical systems — the beginning of universality, and the reason a lattice of arrows says anything at all about real magnets.

## Recall
type: mcq
Q: Why can a finite lattice never show a truly sharp phase transition?
- [ ] Because finite lattices are always too small to order. — finite lattices order perfectly well; they just do it smoothly.
- [x] Because $Z$ is a finite sum of exponentials, so $\ln Z$ is analytic and has no kinks — non-analyticity needs the infinite-volume limit. — the sharpness is a property of the limit, not of any finite sample.
- [ ] Because boundary atoms have fewer neighbours. — boundaries matter, but even with periodic boundaries and no edge at all the argument holds.
- [ ] Because temperature is not well defined for finite systems. — it is perfectly well defined; the issue is analyticity, not thermometry.
