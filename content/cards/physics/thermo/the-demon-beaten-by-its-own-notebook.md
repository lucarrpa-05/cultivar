---
id: physics.thermo.maxwell-demon.the-demon-beaten-by-its-own-notebook
topic: physics.thermo.maxwell-demon
format: idea
difficulty: 2
language: en
weight: heavy
angles: [paradox, connection]
tags: [maxwells-demon, landauer-principle, erasure, szilard-engine, information-physics]
hook: "Maxwell's demon sorts molecules and breaks the second law. It took 115 years to find the flaw, and the flaw was its memory."
sources:
  - {title: "Maxwell's demon", type: wiki, url: "https://en.wikipedia.org/wiki/Maxwell%27s_demon"}
  - {title: "Landauer's principle", type: wiki, url: "https://en.wikipedia.org/wiki/Landauer%27s_principle"}
  - {title: "Experimental verification of Landauer's principle linking information and thermodynamics", author: "Bérut, Arakelyan, Petrosyan, Ciliberto, Dillenschneider & Lutz", year: 2012, type: paper, url: "https://doi.org/10.1038/nature10872"}
dates: {written: 2026-09-19, event: 2012-03-08}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The demon was beaten by its own notebook

Maxwell invented it in 1867 to annoy his friends. Two chambers of gas at the same temperature, a tiny door between them, and a tiny being watching the molecules. When a fast one approaches from the left it opens the door; when a slow one approaches from the right it opens the door. The door is frictionless, so the demon does no work on the gas. After a while one side is hot and the other is cold, and you can run an engine off the difference. Free energy, forever, out of nothing but attentiveness.

For over a century people tried to find the cheat. Szilárd noticed in 1929 that the demon has to *measure* which molecule is coming. Then Landauer, in 1961, found the real bill: measuring can in principle be free, but the demon's notes accumulate, and *erasing* a bit of memory always costs energy. Bennett closed the argument in 1982.

The demon works fine — until its notebook fills up. Then it must forget, and forgetting is where it pays for everything.

## Rigor

**Landauer's bound.** Erasing one bit of information in contact with a bath at temperature $T$ dissipates at least

$$W_{\min} = k_B T \ln 2 \approx 2.9\times10^{-21}\ \mathrm{J}\ \ (0.018\ \mathrm{eV}) \text{ at } 300\ \mathrm{K}.$$

The reason is the counting card again: erasure maps two memory states onto one, halving the number of accessible microstates of the memory, so the memory's entropy falls by $k_B\ln 2$ and that much must appear in the environment.

**Exact cancellation.** Szilárd's one-molecule engine extracts precisely $k_BT\ln 2$ per cycle: learn which half the molecule is in, insert a piston, let the single-molecule "gas" expand isothermally from $V/2$ to $V$, collect $\int P\,dV = k_BT\ln 2$. The engine's yield and the erasure cost are the same number, to the last symbol. Run the demon as a closed cycle — including resetting the memory — and the net work is zero. Not "approximately zero": zero.

Bérut and colleagues measured it in 2012 with a single colloidal bead in a double-well optical trap, and found the dissipated heat approaching the $k_BT\ln 2$ floor as erasure was made slower.

The moral is the one the information card set up: information is not an abstraction sitting above physics. A bit has a thermodynamic price, and the second law collects it.

## Recall
type: mcq
Q: Where exactly does Maxwell's demon pay for the order it creates?
- [ ] In the work needed to open and close the door. — the thought experiment stipulates a frictionless door, and that assumption can be met arbitrarily well.
- [ ] In the act of measuring which molecule is coming. — measurement can in principle be done reversibly, at no minimum cost.
- [x] In erasing its memory: resetting one bit dissipates at least $k_BT\ln 2$, exactly what the engine extracted. — the cycle only closes when the notebook is cleared, and that is where the bill lands.
- [ ] Nowhere: the demon really does violate the second law, which is only statistical. — the second law is statistical, but the demon does not beat it; the accounting closes exactly.
