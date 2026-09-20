---
id: physics.cosmos.neutrinos.dear-radioactive-ladies-and-gentlemen
topic: physics.cosmos.neutrinos
format: idea
difficulty: 1
language: en
weight: medium
angles: [history, prediction]
tags: [neutrinos, pauli, beta-decay, cowan-reines, oscillations]
hook: "Pauli invented a particle to save conservation of energy, admitted it might be undetectable, and skipped the meeting for a ball."
sources:
  - {title: "Pauli's letter of 4 December 1930 (English translation)", author: "Wolfgang Pauli", year: 1930, type: primary, url: "https://www.pp.rhul.ac.uk/~ptd/TEACHING/PH2510/pauli-letter.html"}
  - {title: "Neutrino", type: wiki, url: "https://en.wikipedia.org/wiki/Neutrino"}
  - {title: "The Nobel Prize in Physics 2015", year: 2015, type: primary, url: "https://www.nobelprize.org/prizes/physics/2015/summary/"}
dates: {written: 2026-09-19, event: 1930-12-04}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Dear radioactive ladies and gentlemen

Beta decay had a scandal. A nucleus emits an electron and turns into a different nucleus, and in a two-body split the electron's energy is fixed by arithmetic. Measured, it came out with a *range* of energies, nearly always less than the books demanded. Bohr was willing to abandon conservation of energy inside the nucleus.

On 4 December 1930 Pauli wrote to a meeting in Tübingen he was not attending — he was staying in Zurich for a ball — opening "Dear radioactive ladies and gentlemen". He proposed what he called a desperate remedy: a neutral, very light particle emitted alongside the electron, carrying off the missing energy unseen. He conceded that such a thing might never be detected, and that nothing ventured was nothing gained.

It took twenty-six years. Cowan and Reines caught neutrinos beside a nuclear reactor in 1956.

Right now, about 65 billion of them from the Sun are passing through every square centimetre of you, every second, and essentially none of them notice you are there.

## Rigor

The decay is $n \to p + e^- + \bar\nu_e$, a three-body final state, so the electron energy is distributed continuously between zero and the endpoint instead of taking a single value. That continuous spectrum was the anomaly; the third body is the explanation.

Neutrinos are hard to see because they feel only the weak interaction. A typical cross-section at MeV energies is around $10^{-44}\ \mathrm{cm^2}$, which for the solar flux gives a mean free path in lead measured in light years. Reines and Cowan won by brute force: a reactor flux of $\sim10^{13}$ per cm² per second, a target of several hundred litres, and a coincidence signature — inverse beta decay $\bar\nu_e + p \to n + e^+$ gives two annihilation photons promptly and a neutron capture microseconds later.

Then the second surprise. Solar neutrino detectors saw only a third of the predicted rate for thirty years. Super-Kamiokande (1998) and SNO (2001) showed why: neutrinos change flavour in flight. Oscillation requires the mass eigenstates to differ from the flavour eigenstates and to propagate with different phases, which requires nonzero mass — flatly contradicting the Standard Model as written. It remains the only laboratory evidence of physics beyond it.

## Recall
type: mcq
Q: What did the continuous energy spectrum of beta decay reveal?
- [ ] That energy is not conserved in nuclear processes. — Bohr's guess, and wrong; conservation survived intact.
- [x] That a third, unseen particle must be sharing the energy, making the decay a three-body process. — in a two-body decay the electron's energy would be a single fixed value.
- [ ] That electrons are emitted with random energies by an unknown mechanism. — "random" was the observation; the point is that it required an extra participant.
- [ ] That the nucleus contains electrons of varying energy. — nuclei contain no electrons; the electron is created in the decay.
