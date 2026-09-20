---
id: physics.em.maxwell.the-number-that-fell-out-of-the-equations
topic: physics.em.maxwell
format: idea
difficulty: 3
language: en
weight: heavy
angles: [prediction, beautiful]
tags: [maxwell-equations, displacement-current, wave-equation, speed-of-light, electromagnetism]
related: [physics.history.faraday-maxwell.we-can-scarcely-avoid-the-inference]
hook: "Maxwell patched an inconsistency in four equations. A wave equation fell out, and its speed matched the measured speed of light."
sources:
  - {title: "Maxwell's equations", type: wiki, url: "https://en.wikipedia.org/wiki/Maxwell%27s_equations"}
  - {title: "Displacement current", type: wiki, url: "https://en.wikipedia.org/wiki/Displacement_current"}
  - {title: "Electromagnetic wave equation", type: wiki, url: "https://en.wikipedia.org/wiki/Electromagnetic_wave_equation"}
dates: {written: 2026-09-19, event: 1862-01-01}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Cross-linked with the Maxwell quote card through related, so the shared door is explicit rather than a hidden near-duplicate."}
---

# The speed of light fell out of an equation about magnets

By 1860 the laws of electricity and magnetism were four separate experimental facts, collected by Gauss, Ampère and Faraday from batteries, wires and compass needles. Nobody had used the word "light" in the derivation of any of them.

Maxwell noticed that one of the four was mathematically broken. Ampère's law, as written, contradicted conservation of charge whenever a current was not steady — charge a capacitor and the equation gives two different answers depending on which surface you choose. He added a term to fix it: a changing electric field acts like a current.

Then he took the curl of the repaired system. Out fell a wave equation, and waves have a speed. The speed was built from two constants measured in laboratories with coils and jars, with nothing whatsoever to do with optics. Weber and Kohlrausch had pinned down their ratio in 1856.

The number came out at the measured speed of light. Not close to it: at it.

## Rigor

In vacuum, with the displacement-current term in place:

$$\nabla\cdot\mathbf{E}=0,\quad \nabla\cdot\mathbf{B}=0,\quad \nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t},\quad \nabla\times\mathbf{B}=\mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}.$$

Take the curl of the third and substitute the fourth, using $\nabla\times(\nabla\times\mathbf{E}) = \nabla(\nabla\cdot\mathbf{E}) - \nabla^2\mathbf{E}$ and $\nabla\cdot\mathbf{E}=0$:

$$\nabla^2\mathbf{E} = \mu_0\varepsilon_0\frac{\partial^2\mathbf{E}}{\partial t^2}.$$

That is the wave equation with speed $c = 1/\sqrt{\mu_0\varepsilon_0} = 2.998\times10^{8}\ \mathrm{m/s}$. The same manipulation on $\mathbf{B}$ gives the identical equation: the two fields sustain each other, each one's change sourcing the other's curl.

Why the displacement current was forced, not chosen: take the divergence of Ampère's law without it and you get $\nabla\cdot\mathbf{J}=0$, which contradicts the continuity equation $\nabla\cdot\mathbf{J} + \partial\rho/\partial t = 0$ whenever charge accumulates. Adding $\mu_0\varepsilon_0\,\partial\mathbf{E}/\partial t$ and using $\nabla\cdot\mathbf{E}=\rho/\varepsilon_0$ makes the identity hold exactly. Consistency demanded the term; the term produced light.

Note what this costs. The speed $c$ appears in the equations with no reference to any observer, which is precisely the tension Einstein resolved forty-three years later.

## Recall
type: mcq
Q: Why did Maxwell have to add the displacement-current term to Ampère's law?
- [ ] To make the equations symmetric between $\mathbf{E}$ and $\mathbf{B}$, which he found elegant. — the symmetry is a bonus; the equations are not fully symmetric anyway, since there are no magnetic charges.
- [x] Because without it, taking the divergence gives $\nabla\cdot\mathbf{J}=0$, contradicting conservation of charge in any circuit where charge accumulates. — a capacitor being charged breaks the uncorrected law outright.
- [ ] Because experiments had measured a current in empty space. — no such current was measured; the term was demanded by consistency before anything confirmed it.
- [ ] To make the speed of the resulting waves come out equal to the speed of light. — that result was a consequence, not a target; the fix was required on purely mathematical grounds.
