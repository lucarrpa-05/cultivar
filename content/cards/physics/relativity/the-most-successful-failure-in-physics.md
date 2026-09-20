---
id: physics.relativity.special.the-most-successful-failure-in-physics
topic: physics.relativity.special
format: idea
difficulty: 2
language: en
weight: heavy
angles: [mistake, prediction]
tags: [michelson-morley, aether, lorentz-transformation, time-dilation, muons]
hook: "They floated a five-foot slab of sandstone on mercury to measure Earth's motion through the aether. They measured nothing, twice."
sources:
  - {title: "Michelson–Morley experiment", type: wiki, url: "https://en.wikipedia.org/wiki/Michelson%E2%80%93Morley_experiment"}
  - {title: "On the Electrodynamics of Moving Bodies (1905)", author: "Albert Einstein", year: 1905, type: paper, url: "https://en.wikipedia.org/wiki/Annus_Mirabilis_papers"}
  - {title: "Muon", type: wiki, url: "https://en.wikipedia.org/wiki/Muon"}
dates: {written: 2026-09-19, event: 1887-07-01}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The most successful failed experiment ever run

Light was a wave, and waves wave in something, so there had to be an aether. The Earth ploughs through it at 30 km/s, so light should run slightly faster downwind than across.

In July 1887, in a basement in Cleveland, Michelson and Morley set out to see it. They mounted their interferometer on a slab of sandstone five feet square, floated it in a trough of mercury so it could rotate without a shudder, and folded the light path with mirrors until each arm was 11 metres long. Rotating the slab should have slid the interference fringes by about 0.4 of a fringe.

The maximum displacement they saw was 0.02, and the average much less than 0.01. Nothing.

For eighteen years, physics tried to explain the failure — FitzGerald and Lorentz proposed that moving objects contract by exactly the amount needed to hide the effect. Einstein's move in 1905 was to stop explaining it. He promoted the failure to a postulate: light has the same speed for everyone, full stop. Then he followed the consequences.

## Rigor

Two postulates: the laws of physics take the same form in all inertial frames, and $c$ is frame-independent. Demanding that $c^2t^2 - x^2$ be preserved forces the Lorentz transformation,

$$t' = \gamma\left(t - \frac{vx}{c^2}\right), \qquad x' = \gamma(x - vt), \qquad \gamma = \frac{1}{\sqrt{1-v^2/c^2}},$$

which reduces to Galileo's $x' = x - vt$ exactly when $v \ll c$ — so the ship's-cabin argument survives as the low-speed limit, and the mysteriousness is all in the $vx/c^2$ term that mixes time with position.

Time dilation is not an illusion of signalling delays; it is measured daily. A muon has mean lifetime $\tau = 2.197\ \mu\mathrm{s}$, so at nearly $c$ it should cover $c\tau \approx 659$ m before decaying. Cosmic-ray muons are created about 15 km up, which is more than twenty lifetimes of travel — essentially none should reach the ground. They arrive in quantity. At $\gamma \approx 22$, the trip takes about one lifetime *in the muon's own frame*, because the 15 km is contracted to under 700 m. Rossi and Hall measured exactly this in 1941, on a mountain.

The aether was not hiding. It was not there.

## Recall
type: mcq
Q: What was Einstein's decisive move with respect to the Michelson–Morley result?
- [ ] He found the experimental error that had hidden the aether wind. — there was no error; the null result was correct and has been confirmed to ever greater precision.
- [ ] He proposed that objects contract when moving through the aether. — that was FitzGerald and Lorentz, rescuing the aether rather than dropping it.
- [x] He stopped treating the null result as something to explain and made the constancy of $c$ a starting assumption. — everything strange in relativity is downstream of that promotion.
- [ ] He showed that light does not really travel at a fixed speed. — the opposite: its fixed speed for every observer is the whole postulate.
