---
id: physics.thermo.arrow-of-time.the-equations-dont-know-which-way-time-runs
topic: physics.thermo.arrow-of-time
format: idea
difficulty: 1
language: en
weight: medium
angles: [paradox, open-problem]
tags: [arrow-of-time, loschmidt-paradox, past-hypothesis, reversibility, coarse-graining]
hook: "Film a pendulum and run it backwards: fine. Film an egg and run it backwards: absurd. The underlying equations cannot tell the difference."
sources:
  - {title: "Loschmidt's paradox", type: wiki, url: "https://en.wikipedia.org/wiki/Loschmidt%27s_paradox"}
  - {title: "Arrow of time", type: wiki, url: "https://en.wikipedia.org/wiki/Arrow_of_time"}
  - {title: "Thermodynamic Asymmetry in Time (Stanford Encyclopedia of Philosophy)", type: encyclopedia, url: "https://plato.stanford.edu/entries/time-thermo/"}
dates: {written: 2026-09-19, event: 1876-01-01}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The equations don't know which way time runs. Your coffee does.

Film a pendulum and play it backwards: nothing looks wrong. Film billiard balls colliding, play it backwards: still a legal shot. Film an egg hitting the floor and play it backwards and the whole room laughs.

Yet the microscopic laws governing the egg are the same laws governing the billiard balls, and they are time-symmetric. Reverse every molecule's velocity and the shattered egg would reassemble, the yolk would climb back into the shell, and not one equation would object.

Loschmidt threw this at Boltzmann in 1876, and it is still the sharpest objection in the subject: if the molecular dynamics is reversible, where does irreversibility come from?

Not from the dynamics. From the starting point. There are astronomically more ways to be a splattered egg than an intact one, so a randomly chosen future is messier. That argument runs identically toward the past, predicting the egg was *also* messier yesterday. The only escape is to assume the universe began in an extraordinarily unlikely, low-entropy state.

The assumption has a name — the past hypothesis — and no agreed explanation. A live problem, not a settled one.

## Rigor

Time reversal $T : t\mapsto -t,\ \mathbf{v}\mapsto-\mathbf{v}$ maps solutions of Newton's (and Maxwell's, and Schrödinger's) equations to solutions. So for every entropy-increasing trajectory there is an entropy-decreasing one with exactly the same dynamics. Any derivation of the second law from the dynamics alone is therefore doomed: **Loschmidt's paradox**.

Where does Boltzmann's $H$-theorem smuggle the arrow in? In the *Stosszahlansatz* — the assumption that the velocities of two molecules are uncorrelated immediately *before* they collide. After a collision they are correlated. Imposing "no correlations before, correlations after" is precisely a time-asymmetric assumption, so the theorem's conclusion was in its premise.

The modern accounting separates two entropies. The fine-grained Gibbs entropy $S = -k_B\int \rho\ln\rho$ is exactly constant under Liouville's equation, since the phase-space flow is volume-preserving — a Hamiltonian flow is a measure-preserving diffeomorphism and cannot change $\rho$'s distribution. What grows is the *coarse-grained* entropy: the fine filaments $\rho$ develops are invisible at finite resolution, so the smeared distribution spreads.

So irreversibility needs two ingredients, neither dynamical: a coarse-graining, and a low-entropy boundary condition at one end of time.

## Recall
type: mcq
Q: If the microscopic laws are time-reversible, where does the arrow of time come from?
- [ ] From friction, which is irreversible at the molecular level. — friction is itself made of reversible molecular collisions; it inherits the arrow, it does not create it.
- [ ] From the second law, which is a fundamental law like $F=ma$. — the second law is statistical and has to be derived; Loschmidt's paradox shows it cannot come from dynamics alone.
- [x] From a low-entropy boundary condition in the past, plus the fact that we only track coarse-grained states. — neither ingredient is in the equations of motion, which is exactly the point.
- [ ] From quantum measurement, which is irreversible. — classical systems show the same arrow, and the problem long predates quantum mechanics.
