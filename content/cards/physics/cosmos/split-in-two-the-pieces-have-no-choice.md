---
id: physics.cosmos.standard-model.split-in-two-the-pieces-have-no-choice
topic: physics.cosmos.standard-model
topics: [physics.cosmos.neutrinos]
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, prediction]
tags: [beta-decay, two-body-decay, conservation-of-momentum, energy-spectrum, neutrino]
hook: "Break something into two pieces and their energies are fixed by arithmetic. Beta decay broke that rule, unless a piece was missing."
related: [physics.cosmos.neutrinos.dear-radioactive-ladies-and-gentlemen, physics.cosmos.standard-model.two-prisoners-and-a-thermometer]
sources:
  - {title: "Beta decay: history and emission spectrum", type: wiki, url: "https://en.wikipedia.org/wiki/Beta_decay"}
  - {title: "Particle decay: two-body decay", type: wiki, url: "https://en.wikipedia.org/wiki/Particle_decay"}
  - {title: "Free neutron decay", type: wiki, url: "https://en.wikipedia.org/wiki/Free_neutron_decay"}
  - {title: "James Chadwick: ahead of his time", author: "Gerhard Ecker", year: 2020, type: paper, url: "https://arxiv.org/abs/2007.06926"}
dates: {written: 2026-09-23}
diagram: {file: physics/beta-spectrum-two-vs-three.svg, caption: "Two pieces would put every electron at the ceiling; what is measured is a smear from zero up to it.", alt: "Graph of electron count against energy: a dashed spike at the maximum, marked as the two-piece prediction, and a measured hump rising from zero and falling to nothing at that maximum."}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Alpha line now says 'from a given decay' (alpha fine structure gives several sharp lines per nucleus); rigor states E = sqrt(m^2+p^2) instead of assuming relativity; Bohr distractor's why now teaches the endpoint argument. Diagram checked in light and dark: correct and legible."}
---

# Split in two, the pieces have no choice

If a break-up always launches a given fragment at the same speed, there were two pieces. If the speeds smear, there were more, seen or not.

Take a cannon. Ball one way, cannon recoiling the other: their momenta must cancel, and the energy released is fixed, so there is exactly one way to share it. Every two-piece decay works like this, which is why alpha particles from a given decay share one energy.

Beta electrons come out with any energy from nearly zero up to a ceiling. With three pieces, momentum can balance in endlessly many ways, so energy splits endlessly many ways. The cannon is slow and electrons are not, but relativity changes the arithmetic, not the count.

## Rigor

The count, made exact. Use units with $c=1$. A particle of mass $M$ at rest decays into masses $m_1, m_2$. Momentum conservation forces $\vec p_1 = -\vec p_2$, so both have the same $|\vec p| = p$. A piece of mass $m$ carries energy $\sqrt{m^2+p^2}$, so energy conservation reads

$$M = \sqrt{m_1^2+p^2} + \sqrt{m_2^2+p^2}.$$

The right side is strictly increasing in $p$, equals $m_1+m_2 < M$ at $p=0$ and grows without bound, so by the intermediate value theorem there is exactly one $p$. Since $E_1^2-E_2^2 = m_1^2-m_2^2$ and $E_1+E_2 = M$, dividing gives $E_1-E_2$, hence

$$E_1 = \frac{M^2+m_1^2-m_2^2}{2M}.$$

One number: a spike. That is the cannon's single speed.

With three bodies, $\vec p_1+\vec p_2+\vec p_3 = 0$ only says three vectors close a triangle, and energy adds one more equation. A continuum of solutions remains. The electron's energy runs from $m_e$ (at rest, the other two back to back) to a maximum reached when the other two fly off together, with invariant mass $m_2+m_3$:

$$E_{\max} = \frac{M^2+m_e^2-(m_2+m_3)^2}{2M}.$$

For the free neutron the measured kinetic-energy ceiling is $0.782$ MeV, and the smear fills everything below it.

## Recall
type: mcq
Q: Why does a smear of electron energies point to an unseen third particle?
- [ ] Because energy is only conserved on average in nuclei. — that was Bohr's fallback, but the smear stops at a sharp ceiling equal to the full energy released, exactly where strict conservation says it must.
- [x] Because two pieces must share the energy one fixed way; only three or more can share it in a continuum of ways. — momentum balance plus fixed energy leaves one solution for two bodies and a whole family for three.
- [ ] Because electrons lose different amounts of energy on the way out of the atom. — calorimeter experiments in 1927 and 1930 ruled this out: the missing energy never showed up as heat.
