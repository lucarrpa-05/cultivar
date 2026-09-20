---
id: econ.behavioral.prospect-theory.you-do-not-feel-wealth
topic: econ.behavioral.prospect-theory
topics: [econ.behavioral.loss-aversion-endowment]
format: series
difficulty: 3
language: en
weight: heavy
angles: [beautiful, numbers]
tags: [value-function, reference-point, diminishing-sensitivity, loss-aversion]
series: {id: econ.behavioral.prospect-theory-properly, index: 2, total: 4, title: "Prospect theory, properly"}
related: [econ.behavioral.loss-aversion-endowment.the-mug-worth-twice-as-much]
hook: "Your bank balance cannot tell you whether you are happy about your salary. Prospect theory puts that in the arithmetic."
diagram: {file: econ/prospect-value-function.svg, caption: "The value function: flat in both tails, mirrored, and kinked exactly where you are standing.", alt: "An S-shaped curve through the origin, gentle above the axis for gains and much steeper below it for losses"}
sources:
  - {title: "Prospect theory", type: wiki, url: "https://en.wikipedia.org/wiki/Prospect_theory"}
  - {title: "Advances in prospect theory: cumulative representation of uncertainty, Journal of Risk and Uncertainty 5(4)", author: "Tversky & Kahneman", year: 1992, type: paper, url: "https://doi.org/10.1007/BF00122574"}
dates: {written: 2026-09-19, event: 1979-03-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# You do not feel wealth. You feel the change.

Here is something your bank balance cannot tell you: are you happy about your salary? To answer you need what you expected, what you had last year, what the person beside you earns. Prospect theory builds that into the arithmetic. What carries value is not final wealth but the *change* from a reference point.

Two things fall out. First, the same outcome can be a gain or a loss depending on where zero sits — which is why "a 5% raise" and "a 5% raise when everyone else got 10%" are different experiences of the same payslip. Second, the curve through the origin has a kink: losses drop away steeply, gains climb gently. The Cornell mugs are that kink made visible.

Away from zero the curve flattens in both directions. Losing 200 rather than 100 stings less than losing 100 rather than nothing. Steep at the origin, flat in the tails, mirrored — that shape is the whole story, and it has numbers.

## Rigor

$$v(x)=\begin{cases} x^{\alpha} & x\ge 0\\[2pt] -\lambda(-x)^{\beta} & x<0\end{cases}$$

where $x$ is measured as a deviation from the reference point. Tversky and Kahneman's 1992 median fit gives $\alpha=\beta=0.88$ and $\lambda=2.25$.

Three properties, each doing work. **Reference dependence**: $v(0)=0$ by construction, so the zero is a modelling choice about the decision-maker's situation, not a fact about the world. **Diminishing sensitivity**: $\alpha,\beta<1$ makes $v$ concave over gains and convex over losses, so an extra unit matters less the further you are from zero — those are the flat tails. **Loss aversion**: $\lambda>1$ tilts the left arm, and at the origin the left derivative is $\lambda$ times the right one. That ratio, about $2.25$, is the kink.

Convexity over losses has a consequence people dislike hearing: it predicts risk *seeking* once you are already behind. Offered a sure loss of 800 or an 85% chance of losing 1000, most people gamble, even though the gamble is worse in expectation. Same curve, other side.

None of this has yet touched the probabilities that multiply $v$. Those turn out to be bent too.

## Recall
type: mcq
Q: In prospect theory, what does the exponent $\alpha<1$ on the gain side produce?
- [x] Diminishing sensitivity — each extra unit of gain adds less value, so the curve is concave away from the reference point.
- [ ] Loss aversion — that is $\lambda$, the ratio between the slopes on the two sides of zero.
- [ ] Probability weighting — that lives in a separate function applied to probabilities, not to outcomes.
