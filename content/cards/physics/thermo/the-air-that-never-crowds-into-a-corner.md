---
id: physics.thermo.statistical-mechanics.the-air-that-never-crowds-into-a-corner
topic: physics.thermo.statistical-mechanics
format: idea
difficulty: 3
language: en
weight: heavy
angles: [numbers, paradox]
tags: [statistical-mechanics, fluctuations, large-numbers, second-law, ensembles]
hook: "Nothing in Newton's laws forbids all the air in your room moving into one corner. It is allowed. Here is how often it happens."
sources:
  - {title: "Statistical mechanics", type: wiki, url: "https://en.wikipedia.org/wiki/Statistical_mechanics"}
  - {title: "Poincaré recurrence theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Poincar%C3%A9_recurrence_theorem"}
  - {title: "Fluctuation theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Fluctuation_theorem"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Two arithmetic errors fixed: the exponent has 27 digits not 26, and the relative fluctuation at N=2.5e25 is 2e-13 not 6e-13. Recall reworded to match."}
---

# The air in your room is allowed to suffocate you

Write down the equations of motion for every air molecule in your bedroom. Nothing in them forbids the molecules from all drifting into the far corner and leaving you in vacuum. No conservation law is broken. Run the configuration backwards and it is a perfectly legal solution.

It never happens, and "never" here is not a figure of speech. Each molecule is in the left half or the right half, roughly independently. The chance that all of them are on one side is $2^{-N}$, and a bedroom holds about $10^{27}$ molecules. Written as a power of ten, that probability's exponent alone has twenty-seven digits. There is no unit of time long enough to make that number interesting — the age of the universe is a rounding error against it.

This is what statistical mechanics is for: not new laws, but the observation that when $N$ is huge, "overwhelmingly likely" and "certain" stop being distinguishable. Thermodynamics is what mechanics looks like after you take that limit.

Which raises the sharper question: how big does the wobble around "certain" actually get?

## Rigor

Take $N$ independent particles, each in the left half with probability $\tfrac12$. The number on the left is binomial: mean $N/2$, standard deviation $\tfrac12\sqrt{N}$. The quantity that matters is the *relative* fluctuation,

$$\frac{\sigma_n}{\langle n\rangle} = \frac{1}{\sqrt N}.$$

For one cubic metre of air at room conditions, $N \approx 2.5\times10^{25}$, so the density in half the room fluctuates by about $2\times10^{-13}$ of itself. That $1/\sqrt N$ is the entire reason thermodynamic variables look deterministic: they are sample means over Avogadro-scale samples, and the central limit theorem crushes them onto their expectations.

The suffocation configuration is not forbidden, only suppressed: $P = 2^{-N}$, i.e. $\ln P = -N\ln 2$, so $S$ would have to drop by $Nk_B\ln 2$ — macroscopic entropy decreases are exponentially unlikely in exactly the way the counting card says. Poincaré's recurrence theorem even guarantees the system returns arbitrarily close to any initial state, given enough time; the recurrence time for a room of air is around $e^{N}$ in any units you like.

And the honest caveat: for small $N$ or short times, the second law visibly fails. The fluctuation theorems quantify how often, and those violations have been measured in optically trapped beads.

## Recall
type: mcq
Q: Why do thermodynamic quantities look exactly deterministic when the underlying dynamics is statistical?
- [ ] Because molecular motion averages to zero. — it does not; molecules move at hundreds of metres per second at all times.
- [ ] Because the second law forbids fluctuations. — it does not forbid them; small systems violate it routinely and measurably.
- [x] Because relative fluctuations scale as $1/\sqrt{N}$, and $N$ is of order $10^{25}$. — that makes the wobble a couple of parts in ten trillion, far below anything a thermometer resolves.
- [ ] Because energy conservation pins each variable to a single value. — conservation constrains totals, not how they are distributed inside the box.
