---
id: physics.relativity.general.remember-curvature-gravity-is-not-a-force
topic: physics.relativity.general
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [general-relativity, geodesics, riemann-tensor, equivalence-principle, tidal-forces]
callback: {from: math.geometry.curvature, to: physics.relativity.general}
hook: "You learned to detect curvature without leaving the surface. Einstein's move was to say gravity is exactly that, and nothing else."
sources:
  - {title: "General relativity", type: wiki, url: "https://en.wikipedia.org/wiki/General_relativity"}
  - {title: "Equivalence principle", type: wiki, url: "https://en.wikipedia.org/wiki/Equivalence_principle"}
  - {title: "Geodesic deviation", type: wiki, url: "https://en.wikipedia.org/wiki/Geodesic_deviation"}
dates: {written: 2026-09-19, event: 1915-11-25}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember curvature? That's all gravity ever was

When you met Gaussian curvature, the striking part was that it is *intrinsic*: an ant on a surface can measure it without ever stepping off, by comparing the angles of a triangle to 180°, or by carrying a vector around a loop and finding it comes back rotated.

Einstein's happiest thought, in 1907, was that a man falling off a roof feels no gravity. Not "feels less" — none. If gravity can be switched off by choosing to fall, it cannot be a force acting on you; forces do not vanish when you change frame. What survives is what the ant measures.

The dictionary is exact:

| your geometry course | general relativity |
|---|---|
| geodesic: the straightest available path | free fall: what you do when nothing pushes you |
| parallel transport around a loop rotates a vector | orbiting a mass shifts a gyroscope's axis |
| curvature cannot be removed by a change of chart | tides cannot be removed by any choice of frame |
| curvature is intrinsic to the metric | gravity is intrinsic to spacetime's metric |

Falling is not being pulled. It is going straight in a space where straight lines converge.

## Rigor

Spacetime is a Lorentzian 4-manifold $(M,g)$. Free particles follow geodesics of $g$,

$$\frac{d^2x^\mu}{d\tau^2} + \Gamma^\mu_{\ \alpha\beta}\frac{dx^\alpha}{d\tau}\frac{dx^\beta}{d\tau} = 0 .$$

The equivalence principle is the statement that $\Gamma$ can be made to vanish at any single point by choosing normal coordinates — so "the gravitational field" is not a tensor and has no invariant meaning. What cannot be transformed away is the Riemann tensor, and it shows up as *tidal* effects through geodesic deviation:

$$\frac{D^2\xi^\mu}{d\tau^2} = -R^\mu_{\ \alpha\nu\beta}\,u^\alpha \xi^\nu u^\beta .$$

Two nearby free-fallers drift apart at a rate given by curvature. That is the observable, and it is precisely the ant's holonomy.

Matter sources the curvature through $G_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}$, where $G_{\mu\nu} = R_{\mu\nu} - \tfrac12 R g_{\mu\nu}$ is the unique divergence-free combination linear in second derivatives of $g$ — which is why the equation looks inevitable once you decide curvature is the field.

The weak-field limit brings it home: $g_{00} \approx -(1+2\Phi/c^2)$ gives $\Delta t/t \approx gh/c^2$. Living in Bogotá at 2,640 m rather than at sea level ages you faster by about $3\times10^{-13}$ — roughly 0.7 milliseconds over a lifetime, and GPS satellites have to correct for the same effect or drift kilometres per day.

## Recall
type: mcq
Q: If an observer can always make gravity vanish locally by falling, what is left that is really there?
- [ ] Nothing: gravity is entirely an artefact of the coordinate system. — tides are frame-independent and measurable; something objective remains.
- [x] The curvature — tidal effects, the relative acceleration of nearby free-fallers, encoded in the Riemann tensor. — the connection can be zeroed at a point, the curvature cannot.
- [ ] The gravitational potential, which is the same for all observers. — the potential is not even a tensor, and it is not frame-independent.
- [ ] The force, which still acts but is hidden by the free fall. — if it were a force it could not be removed by choosing a frame at all.
