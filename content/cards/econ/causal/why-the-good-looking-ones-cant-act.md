---
id: econ.causal.selection-bias.why-the-good-looking-ones-cant-act
topic: econ.causal.selection-bias
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, weird]
tags: [collider, berkson, conditioning, bad-controls, correlation]
hook: "Looks and talent can be unrelated in the world and still be negatively related among people who got cast."
diagram: {file: econ/collider-vs-confounder.svg, caption: "Same two arrows, opposite advice: adjust for a fork, never for a collider.", alt: "Left: wealth with arrows to water and cholera. Right: looks and talent with arrows into a boxed node labelled cast, and a dashed link appearing between them"}
sources:
  - {title: "Berkson's paradox", type: wiki, url: "https://en.wikipedia.org/wiki/Berkson%27s_paradox"}
  - {title: "Limitations of the Application of Fourfold Table Analysis to Hospital Data", author: "Joseph Berkson", year: 1946, type: paper, url: "https://doi.org/10.2307/3002000"}
  - {title: "Collider (statistics) — conditioning on a common effect", type: wiki, url: "https://en.wikipedia.org/wiki/Collider_(statistics)"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Removed an Ellenberg essay attribution the cited source does not support; replaced that source with the collider article."}
---

# Why the good-looking ones can't act

Take a population of aspiring actors where looks and talent have nothing to do with each other. Casting directors want either: enough talent, or enough looks to sell a ticket. Now watch a film. Among the people who got cast, the beautiful ones are visibly worse actors — not because beauty rots your craft, but because a beautiful actor needed less talent to get through the door.

No causation, no confounder, no bad data. The correlation was manufactured by *who you are looking at*. Joseph Berkson found this in 1946 in hospital records: two unrelated diseases show up as correlated among inpatients, because having either is a reason to be admitted. The same machinery explains why the people you have dated seem to prove that the charming ones are unreliable.

This is the one that should scare you, because it inverts the usual advice. Adding a control variable is not a safe move. If that variable is caused by both things you are studying, controlling for it *creates* the bias. Every sample is a selection; every "we restricted to X" is a control you did not think you were adding.

## Rigor

A **collider** on a path is a variable with two arrows pointing into it: $X \to C \leftarrow Y$. Marginally $X \perp\!\!\!\perp Y$; conditioning on $C$ (or on a descendant of $C$, including sample membership) opens the path and makes them dependent.

The cheapest example: $X, Y$ independent standard normals, $C = X+Y$. Then $\operatorname{Cov}(X,Y)=0$, but given $C=c$ we have $Y = c - X$ exactly, so

$$\operatorname{Corr}(X,Y \mid C=c) = -1 .$$

With a noisier collider $C = X + Y + \varepsilon$ the induced correlation is negative but weaker — $\operatorname{Cov}(X,Y\mid C)=-\sigma_X^2\sigma_Y^2/(\sigma_X^2+\sigma_Y^2+\sigma_\varepsilon^2)$.

Compare the fork $X \leftarrow U \rightarrow Y$, where $X$ and $Y$ are dependent until you condition on $U$, which makes them independent. Same picture, reversed arrows, opposite instruction — and nothing in your data tells you which one you have. That is why the arrows have to be drawn before the regression is run.

## Recall
type: mcq
Q: Among hospital inpatients, two unrelated diseases appear correlated. What went wrong?
- [x] Being admitted is a common effect of both diseases, and restricting to inpatients conditions on that collider. — selection into the sample is itself a control variable.
- [ ] Hospitals attract sicker people, so everything is correlated with everything. — that would predict a positive correlation between all traits; the collider bias is specifically induced by the selection rule.
- [ ] The sample is too small to detect the true zero correlation. — the bias survives at any sample size; it is not sampling noise.
- [ ] There is an unmeasured confounder causing both diseases. — possible in general, but here the association appears even when the diseases are genuinely independent.
