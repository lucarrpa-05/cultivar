---
id: math.analysis.ode-dynamics.stop-solving-look-at-the-picture
topic: math.analysis.ode-dynamics
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, history]
tags: [phase-portrait, fixed-points, linearization, poincare, qualitative-theory]
hook: "Almost no differential equation has a formula for its solution. Poincaré's answer was to stop asking for one."
sources:
  - {title: "Phase portrait", type: wiki, url: "https://en.wikipedia.org/wiki/Phase_portrait"}
  - {title: "Hartman-Grobman theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Hartman%E2%80%93Grobman_theorem"}
  - {title: "Poincare-Bendixson theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Poincar%C3%A9%E2%80%93Bendixson_theorem"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Stop solving it and look at the picture

Almost every differential equation you will meet outside a textbook has no closed-form solution. For most of the nineteenth century that counted as failure. In the 1880s Poincaré decided the question was wrong.

His move: an equation $\dot x=f(x)$ is a set of instructions attached to every point of space — here is the arrow you follow. That is a vector field, and you can draw it. Solutions are the curves that follow the arrows. Now ask the questions you actually care about. Where do the arrows vanish? Near those points, do nearby curves fall in or run away? Are there closed loops the system circles forever?

Nothing in that programme requires solving anything. You get the long-run behaviour — settles, oscillates, blows up — from the shape of the field.

The analogy is a river map. You do not track a molecule of water; you look at where the currents go. It breaks in the delicate cases, and the delicate cases are exactly where the interesting things happen.

## Rigor

For $\dot x=f(x)$ on $\mathbb{R}^{n}$, a fixed point $x^{*}$ has $f(x^{*})=0$. Near it, $f(x)\approx Df(x^{*})(x-x^{*})$, and the eigenvalues of the Jacobian classify the local picture: all real parts negative gives a sink, all positive a source, mixed signs a saddle, complex pairs a spiral.

**Hartman-Grobman.** If no eigenvalue of $Df(x^{*})$ has zero real part (the fixed point is *hyperbolic*), the flow near $x^{*}$ is topologically conjugate to the flow of its linearisation. The picture you drew from the eigenvalues is the true picture, up to a continuous change of coordinates.

That is where the analogy breaks. If the eigenvalues are purely imaginary, the linearisation predicts closed orbits and the nonlinear terms decide — the same linear part is compatible with a centre, an inward spiral or an outward one. Lotka-Volterra sits exactly there.

**Poincaré-Bendixson.** In the plane only, a trajectory that stays in a compact region containing no fixed point must converge to a periodic orbit. Two dimensions are too cramped for anything worse; from three up, you get chaos.

## Recall
type: mcq
Q: What does the Hartman-Grobman theorem let you do?
- [x] Read the local behaviour near a hyperbolic fixed point off the eigenvalues of the Jacobian — the nonlinear flow is a continuous distortion of the linear one.
- [ ] Solve the equation near the fixed point in closed form — it gives a topological conjugacy, not a formula.
- [ ] Classify every fixed point — it says nothing when an eigenvalue has zero real part, which is the borderline case.
