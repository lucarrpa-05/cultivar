---
id: physics.quantum.qft-glimpse.the-number-on-schwingers-tombstone
topic: physics.quantum.qft-glimpse
format: idea
difficulty: 3
language: en
weight: heavy
angles: [numbers, prediction]
tags: [qed, g-minus-2, schwinger, feynman-diagrams, vacuum-fluctuations]
hook: "Two physicists in this packet have equations on their gravestones. Schwinger's is the first correction to the electron's magnetism."
sources:
  - {title: "Anomalous magnetic dipole moment", type: wiki, url: "https://en.wikipedia.org/wiki/Anomalous_magnetic_dipole_moment"}
  - {title: "Quantum electrodynamics", type: wiki, url: "https://en.wikipedia.org/wiki/Quantum_electrodynamics"}
  - {title: "Measurement of the Electron Magnetic Moment", author: "Fan, Myers, Sukra & Gabrielse", year: 2023, type: paper, url: "https://doi.org/10.1103/PhysRevLett.130.071801"}
dates: {written: 2026-09-19, event: 1948-01-01}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "0.13 parts per trillion is the precision on g/2, not on the anomaly; restated as g/2 = 1.00115965218059(13) per Fan et al 2023."}
---

# The number carved on Schwinger's tombstone

Dirac's 1928 equation predicted that the electron's magnetic moment has $g = 2$, exactly. It was a triumph: the number had been measured, the theory produced it from nothing, done.

Then the measurements got better and $g$ came out at $2.00231930436\ldots$ — not 2. The excess is small and it is not noise, and explaining it required admitting that the electron is never alone. It is constantly emitting and reabsorbing photons, and those photons briefly become electron–positron pairs, which recombine. The "empty" space around a charge is a seething account of things borrowed and returned, and that activity changes how the electron responds to a magnetic field.

Julian Schwinger computed the leading correction in 1948 and got $\alpha/2\pi \approx 0.00116$, which accounts for almost all of the discrepancy. The formula is engraved on his gravestone in Mount Auburn Cemetery, two graves away in spirit from Boltzmann's $S = k\log W$.

That was the first term of a series. The series has now been pushed to five loops.

## Rigor

Define the anomaly $a = (g-2)/2$. QED gives it as a perturbative expansion in the fine-structure constant,

$$a = \frac{\alpha}{2\pi} - 0.328478\ldots\left(\frac{\alpha}{\pi}\right)^2 + 1.181\ldots\left(\frac{\alpha}{\pi}\right)^3 + \cdots,$$

where each term counts Feynman diagrams with one more loop: 1 diagram at order $\alpha$, 7 at $\alpha^2$, 72 at $\alpha^3$, 891 at $\alpha^4$. The 2023 Penning-trap measurement gives $g/2 = 1.00115965218059(13)$, a precision of 0.13 parts per trillion, and theory matches to more than ten significant figures.

The conceptual shift behind the arithmetic: in quantum field theory the fundamental object is not a particle but a field, an operator-valued distribution at every point of spacetime, and particles are its quantised excitations — the harmonic-oscillator story from the mechanics cards, one oscillator per mode. Loops are the field's own fluctuations feeding back on the electron.

One honesty note that matters. The series is asymptotic, not convergent: adding terms improves the answer for a while and then must diverge, with the optimal truncation estimated around order $1/\alpha \approx 137$. We are at loop five. The most precisely verified prediction in science rests on a series that does not converge, and everyone involved knows it.

## Recall
type: mcq
Q: Why is the electron's magnetic moment slightly larger than Dirac's $g=2$?
- [ ] Because the electron has internal structure, like a proton does. — the electron is pointlike to the limits of measurement; no substructure has ever been seen.
- [x] Because it continually interacts with its own quantised electromagnetic field, and those loop processes modify its response. — the leading loop gives Schwinger's $\alpha/2\pi$, which covers nearly all of the excess.
- [ ] Because relativistic corrections were left out of the Dirac equation. — the Dirac equation is already relativistic; what it omits is the quantised field.
- [ ] Because $g=2$ was an approximation Dirac knew to be rough. — it is the exact prediction of his equation, which is what made the discrepancy so interesting.
