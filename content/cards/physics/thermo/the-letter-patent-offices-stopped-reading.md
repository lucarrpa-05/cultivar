---
id: physics.thermo.laws.the-letter-patent-offices-stopped-reading
topic: physics.thermo.laws
format: series
difficulty: 1
language: en
weight: medium
angles: [practical, paradox]
tags: [first-law, second-law, perpetual-motion, carnot, efficiency]
hook: "There is exactly one kind of invention the US patent office refuses to consider without a working model in the room."
series: {id: physics.mechanics.energy-conservation-arc, index: 3, total: 4, title: "Energy, and why it's conserved"}
sources:
  - {title: "Perpetual motion", type: wiki, url: "https://en.wikipedia.org/wiki/Perpetual_motion"}
  - {title: "Laws of thermodynamics", type: wiki, url: "https://en.wikipedia.org/wiki/Laws_of_thermodynamics"}
  - {title: "Carnot heat engine", type: wiki, url: "https://en.wikipedia.org/wiki/Carnot_heat_engine"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The one invention a patent office won't read about

Patent examiners normally work from drawings. There is one exception: claim a perpetual motion machine and the United States Patent and Trademark Office can demand you bring the thing in and run it. No other category of invention gets that treatment, because no other category has a two-hundred-year record of never once working.

Two laws do the refusing, and they refuse different machines.

The first law is the ledger from episode 1, made official: energy in equals energy out plus what you stored. A machine that delivers work from nothing violates it, and nobody has built one.

The second is sneakier, and it kills the clever designs. It says heat will not move from cold to hot on its own, and you can never turn a pile of heat entirely into work. A ship that cools the ocean by one degree and sails on the proceeds breaks no ledger at all. It is still impossible.

The first law says you cannot win. The second says you cannot even break even. Which leaves the question episode 1 asked and nobody has answered: why does the ledger balance at all?

## Rigor

First law: $dU = \delta Q - \delta W$. The notation is the content. $U$ is a state function, so $dU$ is an exact differential and $\oint dU = 0$ around any cycle; $Q$ and $W$ are not state functions, only transfers, so $\delta Q$ and $\delta W$ are inexact. Over a cycle the engine therefore obeys $\oint \delta Q = \oint \delta W$: whatever work you get out, you paid for in net heat.

Second law, Kelvin's form: no cyclic process takes heat from a single reservoir and converts it entirely to work. Carnot's bound follows for any engine between reservoirs at $T_h$ and $T_c$:

$$\eta = \frac{W}{Q_h} \le 1 - \frac{T_c}{T_h}.$$

A steam plant with $T_h = 800$ K and $T_c = 300$ K is capped at $62.5\%$ before a single real-world loss. Real plants run near $40\%$, and the missing efficiency is not sloppy engineering — most of it is this inequality.

Note what the second law is not: it is not a bookkeeping rule. The first law counts; the second says which direction the counting runs. That asymmetry needs its own explanation, and it will get one.

## Recall
type: mcq
Q: A ship that draws heat from the ocean, converts it entirely to work, and leaves colder water behind. Which law stops it?
- [ ] The first law, because the ship is creating energy from nothing. — it is not: the energy comes from the ocean's thermal store, and the ledger balances perfectly.
- [x] The second law, because no cyclic engine turns heat from a single reservoir entirely into work. — you need a cold reservoir to dump into; with only one temperature there is no engine.
- [ ] Neither: such a ship is allowed but would be very slow. — it is flatly forbidden, and this is the classic "perpetual motion machine of the second kind".
- [ ] The third law, which forbids reaching absolute zero. — the ship never approaches absolute zero; that law is about the unattainability of $T=0$.
