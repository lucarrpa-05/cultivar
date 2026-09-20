---
id: physics.quantum.quanta-photons.planck-called-it-an-act-of-desperation
topic: physics.quantum.quanta-photons
format: series
difficulty: 1
language: en
weight: medium
angles: [history, paradox]
tags: [planck, quantisation, blackbody, photoelectric-effect, photons]
hook: "Planck did not believe in quanta. He introduced them to make a formula work and spent years trying to get rid of them."
series: {id: physics.quantum.no-mysticism-arc, index: 1, total: 5, title: "Quantum, no mysticism"}
sources:
  - {title: "Max Planck", type: wiki, url: "https://en.wikipedia.org/wiki/Max_Planck"}
  - {title: "Planck's law", type: wiki, url: "https://en.wikipedia.org/wiki/Planck%27s_law"}
  - {title: "Photoelectric effect", type: wiki, url: "https://en.wikipedia.org/wiki/Photoelectric_effect"}
dates: {written: 2026-09-19, event: 1900-12-14}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Planck called it an act of despair

By 1900 there was an embarrassment in the physics of hot objects. Every furnace glows, and classical theory said how bright it should glow at each colour. The prediction worked beautifully for red, drifted at blue, and at short wavelengths went to infinity. A fireplace, the theory said, should kill you with ultraviolet.

Planck had the correct formula by October 1900 — he fitted it to data first. The trouble was deriving it. In the end he assumed that the oscillators in the walls could only take up or give out energy in discrete lumps proportional to frequency, $E = hf$, and the infinity vanished. He described the move afterwards as an act of despair, saying he was ready to sacrifice any of his previous convictions about physics.

He did not think the lumps were real. It took Einstein, in 1905, to say that light itself arrives in packets — and the photoelectric effect, not relativity, is what his Nobel Prize was for.

So light is grainy. Which is awkward, because a century of experiments had proved it was a wave.

## Rigor

Classical equipartition gives each electromagnetic mode $k_BT$ of energy. Counting modes in a cavity gives the Rayleigh–Jeans law $u(\nu) \propto \nu^2 k_BT$, which diverges as $\int \nu^2 d\nu$: the ultraviolet catastrophe.

Planck's fix: let a mode of frequency $\nu$ hold only energies $nh\nu$. Its mean energy is then a geometric series rather than an integral,

$$\langle E\rangle = \frac{\sum_n nh\nu\, e^{-nh\nu/k_BT}}{\sum_n e^{-nh\nu/k_BT}} = \frac{h\nu}{e^{h\nu/k_BT}-1},$$

which is $k_BT$ when $h\nu \ll k_BT$ — recovering the classical result where it worked — and exponentially suppressed when $h\nu \gg k_BT$. The Boltzmann factor from the thermodynamics cards does the killing: high-frequency modes cost too much to excite.

Einstein's 1905 reading makes it physical. If light of frequency $\nu$ arrives as quanta of energy $h\nu$, the maximum kinetic energy of an ejected electron is

$$K_{\max} = h\nu - \phi,$$

with $\phi$ the material's work function. The predictions that broke the wave picture: below a threshold frequency *nothing* is emitted no matter how bright the light, and above it the electron energy depends on colour, not intensity. Millikan spent a decade trying to disprove this and ended up measuring $h$ to three digits.

## Recall
type: mcq
Q: What does quantisation fix about the classical theory of a glowing object?
- [ ] It makes the object radiate more at high frequencies, matching the data. — the opposite: it suppresses the high-frequency modes that classical theory over-counted.
- [x] It makes high-frequency modes too expensive to excite, so their contribution dies exponentially instead of diverging. — a mode of frequency $\nu$ needs a whole lump $h\nu$, and the Boltzmann factor makes that rare.
- [ ] It removes the dependence on temperature. — the spectrum still depends strongly on temperature; that is why colour tells you how hot something is.
- [ ] It replaces waves with particles everywhere. — Planck quantised the exchange of energy, not light itself; Einstein took that further five years later.
