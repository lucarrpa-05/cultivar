---
id: physics.mechanics.rotation.the-cat-that-turns-over-with-zero-spin
topic: physics.mechanics.rotation
format: idea
difficulty: 2
language: en
weight: heavy
angles: [paradox, connection]
tags: [angular-momentum, falling-cat, deformable-body, holonomy, geometric-phase]
hook: "Drop a cat upside down with no spin at all. Conservation of angular momentum says it can never start spinning. It lands on its feet anyway."
sources:
  - {title: "Falling cat problem", type: wiki, url: "https://en.wikipedia.org/wiki/Falling_cat_problem"}
  - {title: "Angular momentum", type: wiki, url: "https://en.wikipedia.org/wiki/Angular_momentum"}
  - {title: "Geometric phase", type: wiki, url: "https://en.wikipedia.org/wiki/Geometric_phase"}
dates: {written: 2026-09-19, event: 1894-01-01}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Dropped the unverifiable sixty frames a second; kept 1894 and the Academy's Comptes Rendus, added the documented objection that the cat pushed off the handler's hand."}
---

# The cat that turns over without ever starting to spin

In 1894 Étienne-Jules Marey chronophotographed a cat, held upside down and released, and published the sequence in the French Academy's *Comptes Rendus*. It caused an argument: the frames looked like a violation, and several physicists insisted the cat must be cheating by pushing off the handler's hand. The cat is dropped with no rotation. Nothing torques it — gravity pulls on its centre of mass and cannot twist it. It still arrives feet-down.

Angular momentum really is conserved here, and it really is zero the whole way down. The catch is that "zero angular momentum" only means "no turning" for a *rigid* body. A cat is not rigid. It bends at the waist, pulls the front legs in and stretches the back legs out, rotates the light half one way and the heavy half the other, then swaps which half is light. Each half-cycle leaves it a little more upright while the total stays exactly zero.

Astronauts do the same thing with one arm swung in a cone. Where the picture breaks: a rigid cat, however clever, is stuck forever.

## Rigor

For a rigid body $\mathbf{L} = I\boldsymbol\omega$, so $\mathbf{L}=0 \Rightarrow \boldsymbol\omega = 0$ and the orientation never changes. For a body that changes shape, the moment of inertia is a function of the shape $s(t)$, and zero angular momentum reads

$$I(s)\,\boldsymbol\omega_{\text{body}} + \mathbf{L}_{\text{shape}}(s,\dot s) = 0 ,$$

an equation that fixes the instantaneous rotation *in terms of how the shape is changing* — not at zero.

The clean statement: configuration space fibres over shape space with group $SO(3)$, and $\mathbf{L}=0$ defines a connection on that bundle. A closed loop in shape space (tuck, twist, untuck, untwist) has a holonomy, and the holonomy is the net rotation. The cat cannot choose its angular momentum; it chooses a path in shape space and the geometry hands it the turn. Richard Montgomery wrote this as a gauge theory in 1993; Kane and Scher's 1969 two-cylinder model computes the same turn by hand. It is the structure behind every geometric phase: the loop closes, the transport around it does not.

## Recall
type: mcq
Q: The falling cat has zero angular momentum the whole way down. How does it turn over?
- [ ] It pushes against the air with its tail. — tailless cats manage it, and the manoeuvre works in vacuum; air is not doing the work.
- [ ] Its angular momentum goes briefly nonzero and then cancels out. — nothing exerts a torque, so it is exactly zero at every instant.
- [x] It walks a closed loop in shape space, and zero-momentum transport around that loop leaves a net rotation. — that is holonomy: the shape returns, the orientation does not.
- [ ] Conservation of angular momentum simply fails for living animals. — it holds exactly; the loophole is deformability, not biology.
