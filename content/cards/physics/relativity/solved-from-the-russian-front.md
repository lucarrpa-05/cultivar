---
id: physics.relativity.black-holes.solved-from-the-russian-front
topic: physics.relativity.black-holes
format: idea
difficulty: 1
language: en
weight: medium
angles: [human, history]
tags: [schwarzschild, event-horizon, black-holes, escape-velocity, tidal-forces]
hook: "Weeks after Einstein published general relativity, a 42-year-old artillery lieutenant on the Russian front sent him the exact solution."
sources:
  - {title: "Karl Schwarzschild", type: wiki, url: "https://en.wikipedia.org/wiki/Karl_Schwarzschild"}
  - {title: "Schwarzschild metric", type: wiki, url: "https://en.wikipedia.org/wiki/Schwarzschild_metric"}
  - {title: "Event horizon", type: wiki, url: "https://en.wikipedia.org/wiki/Event_horizon"}
dates: {written: 2026-09-19, event: 1915-12-22}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The black hole was solved in a trench

Einstein presented the field equations of general relativity in November 1915 and did not expect anyone to solve them exactly. They are ten coupled nonlinear partial differential equations; he had made do with an approximation.

On 22 December 1915 he received a letter from Karl Schwarzschild, a 42-year-old astronomer who had volunteered for the German army and was serving in the artillery on the Russian front. It contained the exact solution for the spacetime outside a spherical mass. Einstein wrote back that he had not expected the problem could be solved so simply. Schwarzschild had contracted pemphigus, a brutal autoimmune skin disease, in the trenches. He was dead by 11 May 1916.

His solution has a radius where the equations misbehave. It took decades to establish that nothing is wrong with spacetime there: it is the point of no return, not a place where physics breaks. Cross it and every future path leads inward, not because something pulls harder, but because the geometry has tilted.

## Rigor

The Schwarzschild radius is

$$r_s = \frac{2GM}{c^2}.$$

For the Sun that is 2.95 km; for the Earth, 8.9 mm. Both objects are far larger than their $r_s$, so the horizon lies inside the matter and does not exist as a surface.

A historical coincidence worth noticing: set the Newtonian escape velocity to $c$, $\tfrac12 mv^2 = GMm/r$, and you get the same $2GM/c^2$. John Michell did this in 1783 and predicted "dark stars". The agreement is luck — the correct derivation has nothing to do with a ball thrown upward — but it gives the right number.

The horizon is a coordinate singularity, not a physical one: the Schwarzschild coordinates fail there, while Eddington–Finkelstein coordinates cross it smoothly. Curvature invariants stay finite at $r_s$ and blow up only at $r = 0$.

And the counterintuitive scaling. Tidal stretching goes as $GM/r^3$, so evaluated at the horizon it is $\propto M/r_s^3 \propto 1/M^2$. Falling through a stellar-mass horizon would tear you apart long before you arrived; falling through a supermassive one — millions of solar masses — you would cross without feeling anything at all. The point of no return can be entirely uneventful.

## Recall
type: mcq
Q: What happens to an astronaut crossing the event horizon of a very massive black hole?
- [ ] She is crushed at the horizon, where curvature becomes infinite. — curvature is finite at the horizon; the infinity sits at the centre.
- [x] Locally, nothing notable — tidal forces at the horizon fall as $1/M^2$, so for a supermassive hole the crossing is unremarkable. — the horizon is defined by where paths lead, not by what you feel.
- [ ] She stops, since nothing can move past the horizon. — she crosses in finite proper time; it is the distant observer who never sees it happen.
- [ ] She is instantly converted into radiation. — Hawking radiation is a property of the horizon seen from far away, not something that cooks infalling observers.
