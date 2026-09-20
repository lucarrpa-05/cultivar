---
id: econ.game-theory.signaling.the-degree-that-teaches-nothing
topic: econ.game-theory.signaling
topics: [econ.micro.information-asymmetry]
format: idea
difficulty: 3
language: en
weight: medium
angles: [connection, practical]
tags: [signaling, spence, single-crossing, separating-equilibrium, education]
hook: "Spence's model assumes education adds nothing to productivity — and concludes that buying it is still rational."
sources:
  - {title: "Signalling (economics)", type: wiki, url: "https://en.wikipedia.org/wiki/Signalling_(economics)"}
  - {title: "Job market signaling, Quarterly Journal of Economics 87(3)", author: "Michael Spence", year: 1973, type: paper, url: "https://doi.org/10.2307/1882010"}
dates: {written: 2026-09-19, event: 1973-08-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A degree worth paying for even if it teaches you nothing

Suppose university taught you nothing whatsoever. Would going still be rational? Michael Spence's 1973 answer is yes, and it leans on no hidden benefit at all.

Employers cannot see how productive you are. You can. If a degree is *cheaper* for productive people than for unproductive ones — less effort, fewer repeats, less misery — then it can carry information while carrying no skill. High types buy it; low types decide the price is not worth the wage it unlocks; employers read the certificate and pay accordingly; and the beliefs that made them pay turn out to be correct.

That is a separating equilibrium, and the unsettling part is how stable it is. Nobody is deceived. Everybody behaves optimally. And a great deal of money has been spent to transmit roughly one bit of information.

Spence shared the 2001 Nobel for it. What makes it work is a single inequality about costs.

## Rigor

Two worker types $\theta\in\{\theta_L,\theta_H\}$ with $\theta_H>\theta_L$. Education $e\ge 0$ costs the worker $c(e,\theta)$ and adds nothing to output, so a worker of type $\theta$ produces $\theta$ whatever they study. Competitive employers pay expected productivity given the observed signal.

The **single-crossing** condition is

$$\frac{\partial}{\partial\theta}\!\left(\frac{\partial c}{\partial e}\right)<0,$$

the marginal cost of education falls as type rises. The textbook choice $c(e,\theta)=e/\theta$ satisfies it.

A separating equilibrium is a threshold $e^{*}$: employers pay $\theta_H$ when $e\ge e^{*}$ and $\theta_L$ otherwise. It survives when neither type wants to switch,

$$\theta_H-\frac{e^{*}}{\theta_H}\ \ge\ \theta_L \qquad\text{and}\qquad \theta_L\ \ge\ \theta_H-\frac{e^{*}}{\theta_L},$$

which forces $e^{*}\in\bigl[\theta_L(\theta_H-\theta_L),\ \theta_H(\theta_H-\theta_L)\bigr]$ — a continuum of equilibria, one per admissible threshold.

Two things to carry away. The outcome is inefficient: total output is unchanged and $e^{*}>0$ is pure deadweight spent on sorting. And the multiplicity is not a modelling defect but a fact about signals: beliefs are self-confirming, so every threshold in that interval is held up by beliefs that make it true.

## Recall
type: mcq
Q: What must hold for education to work as a signal even when it teaches nothing?
- [x] It is cheaper for high-productivity workers — single crossing is what stops low types buying the same certificate.
- [ ] It is expensive for everybody — a uniformly high cost separates nobody; the cost has to differ by type.
- [ ] Employers cannot observe education — they must observe it. What they cannot observe is productivity.
