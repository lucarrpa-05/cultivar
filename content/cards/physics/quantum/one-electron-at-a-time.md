---
id: physics.quantum.wave-particle.one-electron-at-a-time
topic: physics.quantum.wave-particle
format: series
difficulty: 1
language: en
weight: medium
angles: [beautiful, paradox]
tags: [double-slit, interference, de-broglie, which-path, single-electron]
hook: "Send electrons through two slits one at a time. Each lands as a single dot. The dots assemble into stripes anyway."
series: {id: physics.quantum.no-mysticism-arc, index: 2, total: 5, title: "Quantum, no mysticism"}
sources:
  - {title: "Double-slit experiment", type: wiki, url: "https://en.wikipedia.org/wiki/Double-slit_experiment"}
  - {title: "Matter wave (de Broglie)", type: wiki, url: "https://en.wikipedia.org/wiki/Matter_wave"}
  - {title: "Electron diffraction", type: wiki, url: "https://en.wikipedia.org/wiki/Electron_diffraction"}
  - {title: "Controlled double-slit electron diffraction", author: "Bach, Pope, Liou & Batelaan", year: 2013, type: paper, url: "https://doi.org/10.1088/1367-2630/15/3/033018"}
dates: {written: 2026-09-19, event: 1989-01-01}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Merli and Tonomura used an electron biprism, not literal slits; added Bach et al 2013 with source. Electron wavelength is a twentieth of an atomic diameter, not a hundredth."}
---

# One electron at a time, and the stripes show up anyway

Light comes in lumps — that was episode 1, and it looked like the end of the wave picture. Then the wave picture came back, wearing the other coat.

Fire electrons at two narrow slits, with the source turned so low that only one electron is ever inside the apparatus. Each arrives as a single dot, in one place, like a particle should.

Wait. After a few dots, noise. After thousands, the dots are visibly not uniform. After hours, they have piled into sharp interference fringes — bright bands and dark bands, the signature of two waves adding and cancelling. Each electron had no companion to interfere with.

Merli's group in Bologna did this in 1974 and Tonomura's in Tokyo in 1989, both splitting the beam with an electron biprism rather than literal slits; *Physics World* readers voted it the most beautiful experiment in physics in 2002. Bach's group finally ran it with two real slits and a sliding mask in 2013.

Now put a detector at the slits to see which one each electron takes. It works — and the fringes disappear completely. Not "get fuzzy". Disappear.

So what exactly is interfering?

## Rigor

De Broglie's 1924 relation gives every particle a wavelength, $\lambda = h/p$. For a 50 keV electron that is about 5 pm, roughly a twentieth of an atomic diameter — small, but enough for a suitably fine grating.

The formalism says the electron has an *amplitude*, a complex number, for each way of reaching a point on the screen. Amplitudes add; probabilities do not:

$$P = |\psi_1 + \psi_2|^2 = |\psi_1|^2 + |\psi_2|^2 + 2\,\mathrm{Re}(\psi_1^{*}\psi_2).$$

The first two terms are the two single-slit patterns. The third, the cross term, is the entire interference phenomenon, and it depends on the relative *phase* of the two routes.

Which-path detection kills it for a reason that is not mysterious. Coupling to a detector replaces $\psi_1 + \psi_2$ with a joint state $\psi_1|D_1\rangle + \psi_2|D_2\rangle$; the cross term now carries the factor $\langle D_1|D_2\rangle$, which vanishes when the detector states are perfectly distinguishable. No consciousness, no observer, no collapse required — just entanglement with something else, and the cross term is gone.

Which raises the question the next episode has to answer: if $\psi$ is not a wave in water or air, what is it a wave *of*?

## Recall
type: mcq
Q: Why does detecting which slit the electron went through destroy the interference?
- [ ] Because the detector physically knocks the electron off course. — the effect persists for arbitrarily gentle detectors, provided the which-path information is available.
- [x] Because the electron becomes correlated with the detector, and the interference term picks up the overlap of two now-orthogonal detector states. — perfect distinguishability makes that overlap zero, and the cross term with it.
- [ ] Because observation collapses the wavefunction by conscious intervention. — nothing conscious is needed; an unread record is enough to erase the fringes.
- [ ] Because a measured electron travels through only one slit, while an unmeasured one splits in half. — the electron is never half anywhere; what changes is which amplitudes can still interfere.
