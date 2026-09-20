---
id: css.abm.epidemics-sir.one-number-decides-the-epidemic
topic: css.abm.epidemics-sir
topics: [math.analysis.ode-dynamics]
format: idea
difficulty: 2
language: en
weight: heavy
angles: [tool, numbers, connection]
tags: [sir-model, r-zero, threshold-theorem, herd-immunity, kermack-mckendrick]
hook: "An epidemic does not stop when the virus runs out of people. It stops earlier, and you can say exactly when."
sources:
  - {title: "A contribution to the mathematical theory of epidemics", author: "W. O. Kermack and A. G. McKendrick", year: 1927, type: paper, url: "https://doi.org/10.1098/rspa.1927.0118"}
  - {title: "Compartmental models in epidemiology", type: wiki, url: "https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology"}
  - {title: "Basic reproduction number", type: wiki, url: "https://en.wikipedia.org/wiki/Basic_reproduction_number"}
dates: {written: 2026-09-19, event: 1927-08-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# An epidemic stops long before it runs out of people

Three boxes: people who can catch it, people who have it, people who are done with it. Infection moves the first box into the second at a rate that depends on how often those two groups meet. Recovery moves the second into the third at a rate that depends on how long you stay sick. That is the whole model, written down by Kermack and McKendrick in 1927.

Out of those two rates comes one number: how many people the average infected person infects in a population where nobody is immune. Above one, the thing takes off. Below one, it fizzles. Exactly one is the knife edge, and that threshold — not the formula for the curve — is what the 1927 paper is remembered for.

The counter-intuitive part is the ending. Cases start falling while most people are still susceptible, because the epidemic only needs the *effective* reproduction number to drop below one. And even after it turns over, it keeps burning: the final toll always overshoots the herd-immunity line.

Here is the threshold, exactly.

## Rigor

With fractions $s+i+r=1$:
$$\dot s=-\beta s i,\qquad \dot i=\beta s i-\gamma i,\qquad \dot r=\gamma i .$$
Then $\dot i = i(\beta s-\gamma)$, so $i$ grows iff $s>\gamma/\beta$. Define
$$R_0=\frac{\beta}{\gamma},$$
the transmission rate times the mean infectious period $1/\gamma$. An epidemic starting from $s\approx 1$ takes off iff $R_0>1$: the **threshold theorem**.

Incidence peaks when $s=1/R_0$, so the herd-immunity threshold is $1-1/R_0$ — the fraction that must be immune for growth to stop. For $R_0=3$ that is two-thirds.

It does not stop there. Dividing $\dot s$ by $\dot r$ gives $ds/dr=-R_0 s$, hence $s=e^{-R_0 r}$ and, letting $t\to\infty$, the **final size equation**
$$r_\infty = 1-e^{-R_0 r_\infty},$$
whose positive root exceeds $1-1/R_0$. For $R_0=3$, herd immunity arrives at 67% infected but the epidemic burns through about 94%. That gap is the overshoot, and it is the argument for slowing an epidemic even when you cannot prevent it.

Where the three boxes lie: everybody meets everybody at the same rate. Put the same people on a network and $R_0$ stops being one number.

## Recall
type: mcq
Q: In the SIR model with $R_0=3$, roughly what fraction of the population is eventually infected if nothing is done?
- [x] About 94% — the final-size equation overshoots the herd-immunity threshold, because infections in flight keep spreading after the peak.
- [ ] About 67% — that is where the peak occurs, $1-1/R_0$, not where the epidemic ends.
- [ ] 100% — the susceptible fraction decays to $e^{-R_0 r_\infty}$, which stays strictly positive.
