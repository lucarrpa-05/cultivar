---
id: bio.cells.energy-atp.the-proton-waterfall
topic: bio.cells.energy-atp
format: callback
difficulty: 2
language: en
weight: medium
angles: [connection, beautiful]
tags: [atp, chemiosmosis, mitchell, atp-synthase, proton-gradient]
prerequisites: [physics.thermo.laws, bio.cells.mitochondria-endosymbiosis]
hook: "You already know energy is conserved but not free. Your cells turn that into a dam, a waterfall and a spinning turbine."
callback: {from: physics.thermo.laws, to: bio.cells.energy-atp}
sources:
  - {title: "Chemiosmosis", type: wiki, url: "https://en.wikipedia.org/wiki/Chemiosmosis"}
  - {title: "ATP synthase", type: wiki, url: "https://en.wikipedia.org/wiki/ATP_synthase"}
  - {title: "Adenosine triphosphate", type: wiki, url: "https://en.wikipedia.org/wiki/Adenosine_triphosphate"}
  - {title: "Peter D. Mitchell", type: wiki, url: "https://en.wikipedia.org/wiki/Peter_D._Mitchell"}
dates: {written: 2026-09-19}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Cyanobacteria have no chloroplasts: the c14 ring is the plant chloroplast one. Named the ring sizes (8 and 14) that give the 2.7 and 4.7 ratios."}
---

# Remember that energy is conserved but not free? Cells built a dam

The first law says you cannot create energy; the second says you cannot use all of what you have. A cell lives inside both, and its solution is a hydroelectric plant, built to the same plan as the one in Guatapé.

Food gives up electrons. Those electrons fall down a chain of proteins in the inner mitochondrial membrane, and at three points along the fall the proteins use the released energy to shove protons to the far side. Now one side is crowded and positive: a reservoir behind a dam. The only way back is through a turbine. That turbine is ATP synthase, and it genuinely rotates — a stalk spinning inside a ring, driven by protons falling through it, screwing phosphate onto ADP at the top.

An adult recycles something like fifty kilograms of ATP a day, close to a body's worth, out of a standing stock measured in grams. Peter Mitchell proposed this in 1961 and was largely ridiculed for it. He took the Nobel in 1978.

## Rigor

The usable quantity is the proton-motive force, the free energy per mole of protons moved across the membrane:

$$\Delta p = \Delta\psi - \frac{2.303\,RT}{F}\,\Delta\mathrm{pH}$$

Two terms, because the gradient stores energy twice: as a voltage $\Delta\psi$ across the membrane and as a concentration difference $\Delta\mathrm{pH}$. The free energy available from moving $n$ moles of protons down it is $\Delta G = -nF\Delta p$, and that is what must exceed the roughly $50\ \mathrm{kJ\,mol^{-1}}$ needed to make ATP under cellular conditions.

The turbine is literal, and the gearing is integer. The rotor ring is built from $c$ subunits — between about 8 and 15, depending on the species — and one full turn makes three ATP. So protons per ATP is a ratio of two integers, $c/3$, and it is usually not a whole number: roughly 2.7 in mammals, whose ring has eight, and 4.7 in plant chloroplasts, whose ring has fourteen. The dam has a fixed gear ratio, and evolution chose different gears for different jobs.

## Recall
type: mcq
Q: What does the electron transport chain actually store before any ATP is made?
- [x] A proton gradient across a membrane — charge on one side and pH difference across it, exactly a reservoir held behind a dam.
- [ ] Heat, which is later converted to chemical bonds — heat is the one form the second law will not let you cash back in at full value.
- [ ] ATP itself, released in a burst at the end — ATP is made by the turbine at the bottom of the fall, not stored in the chain.
- [ ] Electrons parked on the final protein — the electrons end up on oxygen; what persists is the proton imbalance.
