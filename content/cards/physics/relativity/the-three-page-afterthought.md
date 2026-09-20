---
id: physics.relativity.e-mc2.the-three-page-afterthought
topic: physics.relativity.e-mc2
format: idea
difficulty: 2
language: en
weight: heavy
angles: [history, connection]
tags: [mass-energy, einstein-1905, doppler, rest-energy, inertia]
hook: "The most famous equation in physics was a three-page footnote Einstein sent in three months after the paper everyone remembers."
sources:
  - {title: "Mass–energy equivalence", type: wiki, url: "https://en.wikipedia.org/wiki/Mass%E2%80%93energy_equivalence"}
  - {title: "Annus Mirabilis papers (1905)", author: "Albert Einstein", year: 1905, type: paper, url: "https://en.wikipedia.org/wiki/Annus_Mirabilis_papers"}
  - {title: "Energy–momentum relation", type: wiki, url: "https://en.wikipedia.org/wiki/Energy%E2%80%93momentum_relation"}
dates: {written: 2026-09-19, event: 1905-09-27}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "June 1905 was the submission of the relativity paper, not its appearance; reworded."}
---

# The most famous equation in physics was an afterthought

Einstein's relativity paper went to *Annalen der Physik* in June 1905 and does not contain $E=mc^2$. The equation arrived in September, in a three-page follow-up with a question for a title: does the inertia of a body depend on its energy content?

The argument is almost embarrassingly simple, and you can follow all of it. Take a body sitting still. Let it emit two identical flashes of light in exactly opposite directions. Its momentum has not changed — the flashes cancel — so it is still at rest, and it has clearly lost energy.

Now watch the same event from a frame moving past. In that frame the two flashes are Doppler-shifted by different amounts, so they carry away a net *momentum*, and the body's kinetic energy must drop to pay for it. But its speed has not changed. If kinetic energy went down at constant speed, the only thing left to change is mass.

Mass, it turns out, is not a measure of how much stuff is in something. It is a measure of how much energy is locked inside it.

## Rigor

Work in the rest frame: the body emits total light energy $E$ as two pulses of $E/2$ along $\pm x$. In a frame moving at $-v$, each pulse is Doppler-shifted by $\gamma(1 \pm v/c)$, so the total energy carried off is

$$E' = \frac{E}{2}\gamma\left(1+\frac{v}{c}\right) + \frac{E}{2}\gamma\left(1-\frac{v}{c}\right) = \gamma E .$$

The extra $(\gamma - 1)E \approx \tfrac12 (E/c^2)v^2$ can only have come from kinetic energy. Since the velocity is unchanged, the mass must have dropped by $\Delta m = E/c^2$.

The modern statement is cleaner. Energy and momentum form a four-vector $p^\mu = (E/c, \mathbf{p})$, and its Minkowski length is invariant:

$$E^2 = (pc)^2 + (mc^2)^2 .$$

Read the cases off. At rest, $p=0$ and $E = mc^2$: rest energy. For a photon, $m=0$ and $E = pc$: massless but not energyless. For slow motion, expanding the square root gives $E \approx mc^2 + \tfrac12 mv^2$, with Newtonian kinetic energy as the first correction to a constant nobody had noticed.

So $m$ is the Lorentz-invariant length of the energy–momentum vector — which is why it is frame-independent, and why "relativistic mass" is a phrase best retired.

## Recall
type: mcq
Q: In the energy–momentum relation $E^2=(pc)^2+(mc^2)^2$, what is the mass $m$?
- [ ] The amount of matter in the object, measured in kilograms. — "amount of matter" is not defined here; a hot object has more mass than the same object cold.
- [x] The Lorentz-invariant length of the energy–momentum four-vector, so every observer agrees on it. — that invariance is exactly why mass is a property of the object rather than of your frame.
- [ ] A quantity that grows as the object speeds up. — energy grows; the invariant mass does not, which is why "relativistic mass" causes so much confusion.
- [ ] Zero for any object in motion. — only massless particles like photons have $m=0$, at any speed.
