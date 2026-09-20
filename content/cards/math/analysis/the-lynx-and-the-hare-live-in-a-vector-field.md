---
id: math.analysis.ode-dynamics.lynx-and-hare-in-a-vector-field
topic: math.analysis.ode-dynamics
topics: [bio.ecology.population-dynamics]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, prediction]
tags: [lotka-volterra, predator-prey, closed-orbits, volterra-principle, dancona]
hook: "Less fishing during the First World War produced proportionally more sharks. Volterra explained it with a picture of arrows."
callback: {from: math.analysis.ode-dynamics, to: bio.ecology.population-dynamics}
sources:
  - {title: "Lotka-Volterra equations", type: wiki, url: "https://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equations"}
  - {title: "Vito Volterra", type: wiki, url: "https://en.wikipedia.org/wiki/Vito_Volterra"}
  - {title: "Competitive Lotka-Volterra equations", type: wiki, url: "https://en.wikipedia.org/wiki/Competitive_Lotka%E2%80%93Volterra_equations"}
dates: {written: 2026-09-19, event: 1926-01-01}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved, notes: "'the previous card' replaced by naming the phase-portrait idea, since the engine does not guarantee feed order."}
---

# Remember the vector field? Predators and prey live in one

You met the phase portrait as a way to avoid solving equations: draw the arrows, find where they vanish, see where the curves go. Here is the case that made the method famous outside mathematics.

In the early 1920s the biologist Umberto D'Ancona noticed something odd in Adriatic fish-market records. During the First World War, when fishing collapsed, the *share* of predatory fish in the catch went up. Less fishing helped sharks more than it helped their prey. He asked his father-in-law, Vito Volterra, why.

Volterra wrote two arrows. Prey grow on their own and get eaten; predators starve on their own and grow by eating. The resulting field has one non-trivial point where both arrows vanish, and around it the trajectories are closed loops: populations cycle forever, predator peaks lagging prey peaks.

Then the punchline D'Ancona wanted. Fishing removes both species at the same rate — and that moves the centre of the loop, not the loop's existence.

## Rigor

$$\dot x=\alpha x-\beta xy,\qquad \dot y=-\gamma y+\delta xy .$$

The non-trivial fixed point is $(x^{*},y^{*})=(\gamma/\delta,\ \alpha/\beta)$. The quantity
$$V=\delta x-\gamma\ln x+\beta y-\alpha\ln y$$
satisfies $\dot V=0$, so the orbits are its level curves: closed, neutrally stable, and — the delicate case the phase-portrait picture warned about — a non-hyperbolic centre that the linearisation alone could not have settled.

**Volterra's principle.** Averaging $\frac{d}{dt}\ln x=\alpha-\beta y$ over one period gives $\bar y=\alpha/\beta=y^{*}$, and likewise $\bar x=\gamma/\delta=x^{*}$: the time averages are the fixed point. Now harvest both at rate $\varepsilon$, replacing $\alpha\to\alpha-\varepsilon$ and $\gamma\to\gamma+\varepsilon$. Average prey rises to $(\gamma+\varepsilon)/\delta$, average predator falls to $(\alpha-\varepsilon)/\beta$. Kill indiscriminately and you help the prey. Stop fishing and you help the sharks.

Honest caveat: neutral centres are structurally fragile — any carrying-capacity term turns them into spirals — and the famous Hudson's Bay lynx-and-hare series is a loose illustration, not a fit.

## Recall
type: mcq
Q: Why does uniform harvesting of both species favour the prey?
- [x] The time averages equal the fixed point — and harvesting moves that point toward more prey and fewer predators.
- [ ] Predators reproduce more slowly, so they recover worse — the model has no such asymmetry in it; the conclusion comes from where the equilibrium sits.
- [ ] Harvesting destroys the cycles — the orbits stay closed; only their centre moves.
