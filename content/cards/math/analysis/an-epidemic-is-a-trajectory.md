---
id: math.analysis.ode-dynamics.an-epidemic-is-a-trajectory
topic: math.analysis.ode-dynamics
topics: [css.abm.epidemics-sir]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, tool]
tags: [sir-model, kermack-mckendrick, r-zero, threshold, final-size]
hook: "An epidemic does not end because the virus runs out of people. It ends because the susceptible pool crosses a line."
callback: {from: math.analysis.ode-dynamics, to: css.abm.epidemics-sir}
sources:
  - {title: "Compartmental models in epidemiology", type: wiki, url: "https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology"}
  - {title: "A Contribution to the Mathematical Theory of Epidemics", author: "W. O. Kermack and A. G. McKendrick", year: 1927, type: paper, url: "https://doi.org/10.1098/rspa.1927.0118"}
  - {title: "Basic reproduction number", type: wiki, url: "https://en.wikipedia.org/wiki/Basic_reproduction_number"}
dates: {written: 2026-09-19, event: 1927-01-01}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember the arrows? An epidemic is one trajectory through them

Same move as the lynx and the hare: write down how each quantity changes, draw the field, read the behaviour off the geometry instead of solving.

Kermack and McKendrick did it for disease in 1927. Split a population into susceptible, infectious and removed. Susceptibles become infectious on contact; infectious people recover at a constant rate. Two parameters, three compartments, one of the most consequential models ever written.

The field has a line in it. Infections grow only while the susceptible fraction sits above a threshold set by the ratio of the transmission rate to the recovery rate. Cross below the line and the outbreak shrinks, even though there are still plenty of susceptible people left and plenty of infectious ones.

That is the part worth carrying: epidemics do not end from exhaustion. They end from a change of sign, and a fraction of the population always escapes without ever being infected.

The model also tells you where it is lying, which is what the agent-based versions exist to fix.

## Rigor

$$\dot S=-\frac{\beta SI}{N},\qquad \dot I=\frac{\beta SI}{N}-\gamma I,\qquad \dot R=\gamma I .$$

$\dot I>0$ exactly when $S/N>\gamma/\beta$. Writing $R_0=\beta/\gamma$, the outbreak grows iff $R_0\,S/N>1$; the peak occurs at $S/N=1/R_0$, not when the susceptibles are gone.

Dividing $\dot S$ by $\dot R$ gives $\frac{dS}{dR}=-R_0S/N$, hence $S=S_0e^{-R_0R/N}$, and letting $t\to\infty$ with $I_\infty=0$:
$$\ln\!\frac{S_\infty}{S_0}=-R_0\left(1-\frac{S_\infty}{N}\right).$$
This **final-size equation** has a root with $S_\infty>0$ for every finite $R_0$. With $R_0=2$, about $80\%$ are eventually infected; with $R_0=3$, about $94\%$; never $100\%$.

The lie is in the term $\beta SI/N$, which assumes every person is equally likely to meet every other — homogeneous mixing, no households, no schools, no superspreaders. Networks and agent-based models keep the compartments and replace that one product with who actually meets whom.

## Recall
type: mcq
Q: Why does an epidemic in the SIR model stop before everyone is infected?
- [x] The susceptible share drops below $1/R_0$ — infections shrink from that moment, and it happens while plenty of susceptibles remain.
- [ ] Because the virus mutates to a milder form — the model has no mutation; the threshold alone produces the turnaround.
- [ ] Because recovered people eventually become susceptible again — that is a different model (SIRS); basic SIR has permanent immunity and still stops early.
