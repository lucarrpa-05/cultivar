---
id: physics.quantum.interpretations.the-honest-scoreboard
topic: physics.quantum.interpretations
format: series
difficulty: 2
language: en
weight: medium
angles: [open-problem, paradox]
tags: [interpretations, many-worlds, copenhagen, decoherence, measurement-problem]
hook: "What quantum mechanics means is genuinely unsettled. What it predicts is not. Keeping those apart is the whole trick."
series: {id: physics.quantum.no-mysticism-arc, index: 5, total: 5, title: "Quantum, no mysticism"}
sources:
  - {title: "Interpretations of quantum mechanics", type: wiki, url: "https://en.wikipedia.org/wiki/Interpretations_of_quantum_mechanics"}
  - {title: "Measurement in Quantum Theory (Stanford Encyclopedia of Philosophy)", type: encyclopedia, url: "https://plato.stanford.edu/entries/qt-measurement/"}
  - {title: "Quantum decoherence", type: wiki, url: "https://en.wikipedia.org/wiki/Quantum_decoherence"}
dates: {written: 2026-09-19}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Identical predictions now attributed to those three interpretations only, and objective collapse added in the rigor as the one family that is testable rather than argued."}
---

# The honest scoreboard on what any of it means

Settled, with no serious dissent: the formalism works. Predictions from those vectors and operators match experiment to twelve decimal places. No local hidden variables survive. Outcomes are, as far as anyone can test, individually unpredictable.

Also settled, and underrated: decoherence explains why you never see a cat in a superposition. A system entangles with its environment in microseconds or faster, the interference terms stop being observable, and the world looks classical. This is calculable and uncontroversial.

Unsettled: why you get *one* outcome. Decoherence tells you which states survive, not which one happens.

- **Copenhagen** — the state is a tool for predicting measurements; collapse is a rule, not a process. Stop asking.
- **Many-worlds** — there is no collapse; the observer entangles with the system and every branch continues. Probability is the hard part.
- **Pilot wave** — particles have definite positions, guided by a wave. Reproduces everything, at the cost of explicit nonlocality.

These three make identical predictions for every experiment performed to date. Planck introduced quanta as a bookkeeping trick he expected to dispose of. A century on, the trick has never once failed, and we still argue about what it is.

## Rigor

State the problem precisely, because vagueness is what keeps it alive. Quantum mechanics has two evolution rules, and they are inconsistent as a description of a single closed system.

1. **Unitary.** $i\hbar\,\partial_t|\psi\rangle = H|\psi\rangle$: deterministic, linear, reversible.
2. **Born.** On measurement, outcome $i$ with probability $\langle\psi|P_i|\psi\rangle$, state becoming $P_i|\psi\rangle/\|P_i|\psi\rangle\|$: stochastic, nonlinear, irreversible.

If the apparatus is itself quantum, rule 1 applied to system plus apparatus gives $\sum_i c_i|i\rangle|A_i\rangle$ — a superposition of pointer positions, never a single one. That is the measurement problem in one line.

Decoherence addresses part of it honestly. Coupling to an environment $E$ gives $\sum_i c_i|i\rangle|A_i\rangle|E_i\rangle$; tracing out $E$ leaves a reduced density matrix $\rho = \sum_i |c_i|^2 |i\rangle\langle i|$ whose off-diagonal terms decay on timescales of order $10^{-20}$ s for a dust grain. So the *improper mixture* is indistinguishable from ignorance about a definite outcome.

Indistinguishable is not the same as identical, and that gap is exactly where the interpretations live. Anyone who tells you it is closed is selling something.

One family is not merely interpretation: objective-collapse models (GRW, CSL) add a stochastic term to rule 1 so that collapse is a physical process with a rate. That changes the predictions, which makes it testable — and underground experiments and levitated-nanoparticle interferometry have been steadily cutting down the allowed parameter space for forty years. Nothing has been found; the models are constrained, not dead.

## Recall
type: mcq
Q: What does decoherence explain, and what does it leave open?
- [ ] It explains why outcomes are random, but not why they are definite. — randomness is not what it derives; the Born probabilities are put in, not obtained.
- [x] It explains why interference between macroscopic alternatives becomes unobservable, but not why a single outcome occurs. — the reduced state looks like a classical mixture without singling out a member of it.
- [ ] It explains everything; the measurement problem is solved. — it removes the puzzle of missing interference and leaves the definiteness puzzle untouched.
- [ ] It explains nothing, since it assumes the Born rule. — the suppression of off-diagonal terms is a straightforward unitary calculation, and it is real.
