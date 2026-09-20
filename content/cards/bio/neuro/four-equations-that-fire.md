---
id: bio.neuro.neurons.four-equations-that-fire
topic: bio.neuro.neurons
format: idea
difficulty: 3
language: en
weight: heavy
angles: [beautiful, prediction]
tags: [hodgkin-huxley, action-potential, gating-variables, excitability, nonlinear-ode]
related: [bio.neuro.neurons.everything-we-know-came-from-a-squid]
prerequisites: [bio.neuro.neurons, bio.cells.membranes-transport, math.analysis.ode-dynamics]
hook: "Four coupled nonlinear ODEs, fitted in 1952, predicted the shape and the speed of a nerve impulse before anyone knew channels were proteins."
sources:
  - {title: "Hodgkin–Huxley model", type: wiki, url: "https://en.wikipedia.org/wiki/Hodgkin%E2%80%93Huxley_model"}
  - {title: "A quantitative description of membrane current and its application to conduction and excitation in nerve, Journal of Physiology 117, 500–544", author: "A. L. Hodgkin and A. F. Huxley", year: 1952, type: paper, url: "https://doi.org/10.1113/jphysiol.1952.sp004764"}
  - {title: "Action potential", type: wiki, url: "https://en.wikipedia.org/wiki/Action_potential"}
dates: {written: 2026-09-19, event: 1952-08-28}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved, notes: "HH's rest state is globally attracting, so the \"threshold\" is not a basin boundary. Replaced with FitzHugh's quasi-threshold, in the rigor and in the recall distractor."}
---

# Four equations that make a nerve fire

A nerve impulse is not electricity running down a wire. It is a chain reaction of gates, and the chain reaction is what makes it regenerate itself instead of fading out like a signal in a cable.

Raise the voltage across the membrane a little and sodium gates open. Sodium ions pour in, which raises the voltage further, which opens more gates. That positive feedback is the upstroke, and it is why the spike is all-or-nothing: once it starts it runs to completion. Then two slower processes catch up. The sodium gates inactivate — a separate mechanism from the one that opened them — and potassium gates open and let positive charge leave. The voltage overshoots downward, and the cell sits briefly refractory before it can do it again.

Hodgkin and Huxley measured those conductances in the squid axon under voltage clamp, fitted curves to them, and turned the whole story into a system of differential equations that reproduced the spike, and its conduction velocity, on a hand calculator.

## Rigor

One equation for the membrane and three for the gates:

$$C_m\frac{dV}{dt}=I-\bar{g}_{\mathrm{K}}n^{4}(V-V_{\mathrm{K}})-\bar{g}_{\mathrm{Na}}m^{3}h(V-V_{\mathrm{Na}})-\bar{g}_{L}(V-V_{L}),$$

$$\frac{dx}{dt}=\alpha_x(V)\,(1-x)-\beta_x(V)\,x,\qquad x\in\{n,m,h\}.$$

Each gating variable is a probability in $[0,1]$, relaxing towards a voltage-dependent target. The exponents encode a guess: $n^{4}$ says a potassium channel conducts only when four independent particles are all in place; $m^{3}h$ says sodium needs three activating particles *and* one non-inactivating one. Hodgkin and Huxley chose those powers to fit curves. Decades later, structural work found potassium channels really are tetramers.

The nonlinearity lives in $\alpha_x,\beta_x$, which depend on $V$, so the equations feed back on themselves. The rest state is stable: small perturbations decay. Large ones do not — they escape into a stereotyped excursion and return. That is **excitability**, and the "threshold" is neither a bifurcation nor a true separatrix: with no applied current every trajectory eventually returns to rest, so what looks like a threshold is a very steep but continuous transition — FitzHugh's *quasi-threshold*. Which is why reduced two-variable versions like FitzHugh–Nagumo reproduce the whole behaviour with a cubic nullcline and nothing else.

Add a spatial term, $C_m\partial_t V = \frac{a}{2R}\partial^2_x V - \sum I_{\text{ion}}$, and the system supports a travelling wave whose speed the 1952 paper predicted correctly. Nobel Prize, 1963.

## Recall
type: mcq
Q: What makes the action potential all-or-nothing rather than proportional to the stimulus?
- [x] Sodium entry raises the voltage, which opens more sodium gates — positive feedback that runs to completion once the rest state's basin is escaped.
- [ ] A hard voltage threshold built into the membrane — there is no sharp threshold anywhere in the equations, only a very steep continuous transition.
- [ ] The potassium current, which sets the spike amplitude — potassium ends the spike; it does not create the all-or-nothing upstroke.
- [ ] The refractory period, which prevents partial spikes — the refractory period limits the *rate* of firing, not the size of an individual spike.
