---
id: physics.thermo.temperature-heat.the-block-hiding-in-anything-warm
topic: physics.thermo.temperature-heat
format: series
difficulty: 1
language: en
weight: medium
angles: [history, numbers]
tags: [heat, caloric, joule, rumford, kinetic-theory]
hook: "Rumford bored cannon barrels for a living and noticed the brass stayed hot as long as the horses kept walking."
series: {id: physics.mechanics.energy-conservation-arc, index: 2, total: 4, title: "Energy, and why it's conserved"}
sources:
  - {title: "Mechanical equivalent of heat", type: wiki, url: "https://en.wikipedia.org/wiki/Mechanical_equivalent_of_heat"}
  - {title: "An Inquiry Concerning the Source of the Heat Which Is Excited by Friction", author: "Benjamin Thompson (Count Rumford)", year: 1798, type: paper, url: "https://en.wikipedia.org/wiki/Benjamin_Thompson"}
  - {title: "Kinetic theory of gases", type: wiki, url: "https://en.wikipedia.org/wiki/Kinetic_theory_of_gases"}
dates: {written: 2026-09-19, event: 1798-01-01}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The block that was hiding inside anything warm

For most of the 1700s heat was a substance. It was called caloric, an invisible fluid that flowed from hot things into cold things, and — this is the part that matters — it was itself conserved. You could move caloric around, never make it.

In 1798 Benjamin Thompson, supervising the boring of cannon barrels in Munich, noticed the obvious. The brass got hot. It kept getting hot for as long as the horses kept turning the borer. He boiled water with friction alone, with no fire anywhere, and asked how a conserved fluid could be produced without limit.

Joule finished the job in the 1840s with a weight on a string turning a paddle wheel inside insulated water. Drop the weight, the water warms, every time by the same amount: about 778 foot-pounds of work per degree Fahrenheit per pound of water. An exchange rate. Work goes in, heat comes out, at a fixed price.

So heat was never a fluid. It was the missing term — the toy box getting heavier.

## Rigor

Once you have an exchange rate, "heat" stops being a substance and becomes a *transfer*: energy moved by thermal contact rather than by a force acting through a distance. Joule's number in modern units is $1\ \mathrm{cal} = 4.186\ \mathrm{J}$.

Kinetic theory says what is actually moving. For an ideal monatomic gas the pressure of molecules bouncing off the walls gives $PV = \tfrac13 Nm\langle v^2\rangle$, and comparing with $PV = Nk_BT$:

$$\tfrac12 m\langle v^2\rangle = \tfrac32 k_B T .$$

Temperature *is* average kinetic energy per molecule, up to the factor $\tfrac32 k_B$. Put numbers in for nitrogen at room temperature ($m = 4.65\times10^{-26}$ kg, $T = 300$ K) and the root-mean-square speed is about $517\ \mathrm{m/s}$ — the air in your room is moving faster than sound, in every direction at once, and you call it "still".

Rumford's cannon makes sense now: the borer was not releasing a stored fluid, it was shoving molecules around. And once heat is energy, the ledger closes. Next: what the closed ledger forbids, and the industry it destroyed.

## Recall
type: mcq
Q: What did Rumford's cannon-boring observation actually rule out?
- [ ] That heat can flow from hot bodies to cold ones. — it does exactly that; nobody disputed the direction of flow.
- [x] That heat is a conserved substance, since friction produced it without limit as long as work was done. — an unlimited supply is incompatible with a fixed amount of fluid inside the metal.
- [ ] That temperature and heat are different quantities. — they are different, but that distinction came from calorimetry, not from the cannon.
- [ ] That energy is conserved. — the opposite: it opened the way to counting heat as one more form of energy in the ledger.
