---
id: math.analysis.chaos.why-chaos-does-not-win-everywhere
topic: math.analysis.chaos
topics: [math.analysis.ode-dynamics]
format: idea
difficulty: 5
language: en
weight: heavy
angles: [open-problem, beautiful]
tags: [kam-theory, small-divisors, invariant-tori, diophantine, solar-system]
hook: "Poincaré showed a nudge can wreck an orbit. Kolmogorov showed which ones survive: those with the most irrational frequencies."
sources:
  - {title: "Kolmogorov-Arnold-Moser theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Arnold%E2%80%93Moser_theorem"}
  - {title: "Diophantine approximation", type: wiki, url: "https://en.wikipedia.org/wiki/Diophantine_approximation"}
  - {title: "Stability of the Solar System", type: wiki, url: "https://en.wikipedia.org/wiki/Stability_of_the_Solar_System"}
dates: {written: 2026-09-19, event: 1954-01-01}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Why chaos does not win everywhere

Poincaré's work on three bodies delivered the bad news first: perturb a clean, solvable system and the orbits can tangle into something no picture can hold. The obvious conclusion is that order is a knife-edge and any nudge destroys it.

At the 1954 congress in Amsterdam, Kolmogorov said the obvious conclusion is false. Under a small perturbation, *most* of the orderly motions survive. Not all — and which ones survive is decided by a number-theoretic property of their frequencies.

The mechanism is a collision between resonance and irrationality. If two frequencies in the system are in a simple ratio, the perturbation pushes in the same direction every cycle and the pushes accumulate. If their ratio is badly approximated by fractions, the pushes fall out of step and cancel. So the tori that survive are the ones spinning at frequencies that are, in a precise sense, as irrational as possible.

Number theory decides which orbits are destroyed. That is not an analogy.

## Rigor

Write an integrable Hamiltonian in action-angle variables, $H_0(I)$, whose orbits wind around invariant tori with frequencies $\omega(I)=\nabla H_0$. Perturb: $H=H_0(I)+\varepsilon H_1(I,\theta)$. The classical perturbation series produces terms with denominators $k\cdot\omega$, $k\in\mathbb{Z}^{n}\setminus\{0\}$ — the **small divisors**. Near a resonance $k\cdot\omega=0$ the series diverges.

**KAM.** If $H_0$ is non-degenerate and $\omega$ satisfies a Diophantine condition
$$|k\cdot\omega|\ \ge\ \frac{\gamma}{|k|^{\tau}}\qquad\text{for all }k\ne0,$$
then for $\varepsilon$ small enough the torus with frequency $\omega$ persists, slightly deformed. The Diophantine frequencies have full measure, so almost every torus survives; the destroyed ones form a set of small but positive measure, densely interwoven — Arnold's web. Kolmogorov sketched it in 1954, Moser proved a version for smooth twist maps in 1962, Arnold the analytic Hamiltonian case in 1963. The proof needs a Newton-type iteration that squares the error each step, fast enough to beat the divisors.

The honest caveat: this covers small perturbations and, in the celestial application, essentially the three-body problem. Whether the actual Solar System is stable over its remaining lifetime is still open.

## Recall
type: mcq
Q: Which orbits does KAM theory say survive a small perturbation?
- [x] Those whose frequency vector is Diophantine — badly approximable by rationals, so resonant kicks never line up.
- [ ] Those with the lowest energy — energy level plays no role in the condition; the arithmetic of the frequencies does.
- [ ] All of them, since the perturbation is small — resonant tori are destroyed at any perturbation size, which is what small divisors mean.
