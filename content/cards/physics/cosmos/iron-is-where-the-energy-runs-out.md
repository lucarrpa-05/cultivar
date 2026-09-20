---
id: physics.cosmos.nuclear.iron-is-where-the-energy-runs-out
topic: physics.cosmos.nuclear
format: idea
difficulty: 2
language: en
weight: medium
angles: [connection, numbers]
tags: [binding-energy, fusion, fission, iron-56, mass-defect]
hook: "Fusion and fission release energy for the same reason, and they run in opposite directions. The turning point is iron."
sources:
  - {title: "Nuclear binding energy", type: wiki, url: "https://en.wikipedia.org/wiki/Nuclear_binding_energy"}
  - {title: "Nuclear fusion", type: wiki, url: "https://en.wikipedia.org/wiki/Nuclear_fusion"}
  - {title: "Nuclear fission", type: wiki, url: "https://en.wikipedia.org/wiki/Nuclear_fission"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Iron is where the energy runs out

A helium nucleus weighs less than the two protons and two neutrons it is made of. Not slightly less by accident — reliably less, by about 0.7% of the total. The missing mass left as energy when the pieces bound together, and $E=mc^2$ converts the shortfall into the number.

Plot that shortfall per nucleon against the size of the nucleus and you get one of the most consequential curves in science. It rises steeply from hydrogen, peaks around iron and nickel, and declines slowly toward uranium.

Everything follows from the shape. Below the peak, joining light nuclei moves you uphill and releases energy: that is fusion, and it is what the Sun does. Above the peak, splitting heavy nuclei also moves you uphill: that is fission, and it is what a reactor does. Two opposite processes, one explanation.

The peak is why stars die. A star fusing its way up the curve reaches iron and finds no further energy available — the fire has nothing left to burn, and the core collapses in about a second.

## Rigor

Binding energy is the mass defect, $B = (Zm_p + Nm_n - m_{\text{nucleus}})c^2$, and the curve plots $B/A$ against mass number $A$. It peaks near $^{56}\mathrm{Fe}$ and $^{62}\mathrm{Ni}$ at about 8.8 MeV per nucleon.

Why a peak at all? Two effects fight. The strong force is short-ranged, so each nucleon binds only to its neighbours and $B/A$ saturates; the electrostatic repulsion between protons is long-ranged and grows like $Z^2/A^{1/3}$. Small nuclei lose to surface effects, large ones lose to Coulomb repulsion, and the optimum lands near $A\approx56$.

Now the numbers that matter. Hydrogen fusion converts about $0.7\%$ of the input mass to energy; uranium fission about $0.09\%$. Per kilogram, fusion wins by roughly a factor of eight — and both beat chemistry by a factor of ten million, because nuclear binding energies are measured in MeV and chemical bonds in eV.

The price is the barrier. Two nuclei must reach $\sim10^{-15}$ m against a Coulomb repulsion that needs hundreds of keV, while the Sun's core sits at only about 1.3 keV. Fusion proceeds anyway, by quantum tunnelling through the barrier, in the exponentially rare tail of the Boltzmann distribution. The Sun runs on the fact that rare is not never.

## Recall
type: mcq
Q: Why do both fusion of light nuclei and fission of heavy nuclei release energy?
- [ ] Because both split atoms into smaller pieces. — fusion does the opposite; it merges them.
- [x] Because binding energy per nucleon peaks near iron, so moving toward the peak from either side releases the difference. — one curve, two directions, same rule.
- [ ] Because heavy nuclei are unstable and light nuclei are stable. — stability is not the criterion; iron is stable and yields nothing either way.
- [ ] Because fission releases neutrons and fusion absorbs them. — neutron bookkeeping matters for chain reactions, not for where the energy comes from.
