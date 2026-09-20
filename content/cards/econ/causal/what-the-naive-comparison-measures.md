---
id: econ.causal.selection-bias.what-the-naive-comparison-measures
topic: econ.causal.selection-bias
format: series
difficulty: 3
language: en
weight: medium
angles: [tool, mistake]
tags: [selection-bias, decomposition, randomization, att, hospitals]
hook: "Sick people go to hospital and hospital patients die more often. The arithmetic of that mistake is two terms long."
series: {id: econ.causal.correlation-to-causation, index: 3, total: 5, title: "Correlation to causation"}
sources:
  - {title: "Mostly Harmless Econometrics, ch. 2", author: "Joshua Angrist & Jörn-Steffen Pischke", year: 2009, type: book, url: "https://press.princeton.edu/books/paperback/9780691120355/mostly-harmless-econometrics"}
  - {title: "Selection bias", type: wiki, url: "https://en.wikipedia.org/wiki/Selection_bias"}
  - {title: "The Design of Experiments", author: "Ronald A. Fisher", year: 1935, type: book, url: "https://en.wikipedia.org/wiki/The_Design_of_Experiments"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# People who go to hospital die more. Subtract carefully.

Take the difference in average outcomes between the treated and the untreated — the number every dataset hands you for free. It is not a causal effect plus noise. It is a causal effect plus a second, entirely systematic thing, and the second thing does not shrink when you collect more data.

Hospital patients die at higher rates than people who stayed home. Both numbers are correct. The comparison is garbage, because the people who went to hospital were already sicker: they would have done worse *even untreated*. That gap — how the two groups would have differed in a world with no treatment at all — is selection bias, and it has an exact place in the algebra.

Randomisation is famous for one reason only: it kills that second term by construction. Fisher's insight in 1935 was not that random assignment is fair, it is that random assignment makes the untreated group an unbiased stand-in for the treated group's missing half.

But nobody randomises a minimum wage.

## Rigor

With potential outcomes $Y_i(1),Y_i(0)$ and treatment $D_i$, add and subtract $\mathbb{E}[Y(0)\mid D=1]$:

$$\underbrace{\mathbb{E}[Y\mid D=1]-\mathbb{E}[Y\mid D=0]}_{\text{what you compute}}=\underbrace{\mathbb{E}[Y(1)-Y(0)\mid D=1]}_{\mathrm{ATT}}+\underbrace{\mathbb{E}[Y(0)\mid D=1]-\mathbb{E}[Y(0)\mid D=0]}_{\text{selection bias}}.$$

The second term compares the *same* quantity — untreated outcomes — across the two groups. In the hospital example it is large and negative for survival: the admitted were sicker to begin with.

Random assignment makes $D\perp\!\!\!\perp (Y(1),Y(0))$, so $\mathbb{E}[Y(0)\mid D=1]=\mathbb{E}[Y(0)\mid D=0]$ and the bias term is exactly zero — the difference in means estimates ATE, with no functional form assumed anywhere. Note what randomisation does *not* buy: small samples still give noisy estimates, and the estimate applies to whoever was in the experiment.

Every quasi-experimental design in econometrics is an argument that the second term is zero, or zero after some transformation. Snow argued it with pipes.

## Recall
type: mcq
Q: A job-training programme's participants earn less afterwards than non-participants. What does the raw difference measure?
- [x] The effect on the treated plus a selection-bias term, because people who sign up for training would have earned less anyway. — the bias term compares untreated outcomes across groups and can easily swamp the effect.
- [ ] The causal effect, measured with more noise than an experiment would give. — the problem is bias, not noise: more participants will not fix it.
- [ ] Nothing at all, since observational data can never say anything. — it says plenty once you can argue the selection term away, which is what designs do.
- [ ] The effect on the untreated, since they are the majority. — the decomposition gives the effect on the treated, not the untreated.
