---
id: ai.llm.emergence.the-jump-was-in-the-ruler
topic: ai.llm.emergence
format: idea
difficulty: 3
language: en
weight: heavy
angles: [paradox, mistake]
tags: [emergent-abilities, metrics, exact-match, scaling, mirage-debate]
hook: "Scores that sit at zero for three orders of magnitude and then leap. Either capability arrives suddenly, or the ruler has a cliff in it."
sources:
  - {title: "Emergent Abilities of Large Language Models", author: "Jason Wei, Yi Tay, Rishi Bommasani et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2206.07682"}
  - {title: "Are Emergent Abilities of Large Language Models a Mirage?", author: "Rylan Schaeffer, Brando Miranda & Sanmi Koyejo", year: 2023, type: paper, url: "https://arxiv.org/abs/2304.15004"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The jump might have been in the ruler

Wei and colleagues collected the graphs in 2022: tasks where the score sits at chance across three orders of magnitude of model size and then, past some threshold, takes off. Their definition of an emergent ability is one "not present in smaller models but present in larger models", and which "cannot be predicted simply by extrapolating the performance of smaller models".

A year later Schaeffer, Miranda and Koyejo asked whether the cliff was in the model or in the measurement. Their claim: "emergent abilities appear due to the researcher's choice of metric rather than due to fundamental changes in model behavior with scale."

Take five-digit addition graded by exact match. A model whose per-digit error is falling smoothly scores zero, zero, zero — one wrong digit is a zero — and then, when the error per digit drops below about a fifth, starts scoring. Same outputs, graded per digit: a smooth curve all the way.

They went further and manufactured never-before-seen "emergent" abilities in vision models by choosing the metric. The honest position is that the debate is not closed.

## Rigor

Model the claim. Suppose per-token error falls smoothly with scale as $\varepsilon(N) \propto N^{-\alpha}$, and the task needs $L$ tokens all correct. Under exact-match,

$$\text{Acc}(N) = \big(1-\varepsilon(N)\big)^{L} \approx \exp\big(-L\,\varepsilon(N)\big).$$

Nothing here is discontinuous in $N$. But $\exp(-L\varepsilon)$ stays pinned near zero while $L\varepsilon \gg 1$ and rises steeply once $L\varepsilon$ crosses 1, and with $\varepsilon$ decaying as a power law that crossing happens over a short stretch of $\log N$. The sharpness is manufactured by composing a smooth curve with a hard nonlinearity. Score the same runs with a linear metric — token accuracy $1-\varepsilon$, or edit distance — and the power law is visible directly.

Two things the argument does not establish. It does not show that no capability is genuinely discontinuous; it shows that the evidence offered is consistent with smoothness. And it does not make the cliff irrelevant: if your application needs the whole answer right, exact-match is the metric you actually live under, and for you the jump is real.

## Recall
type: mcq
Q: Why can a smoothly improving model produce a sharp jump on a benchmark?
- [x] Because a metric like exact match composes the smooth per-token error with a hard threshold, and $(1-\varepsilon)^L$ turns gradual into sudden. — the nonlinearity is in the scoring rule, not necessarily in the model.
- [ ] Because loss curves are plotted on log axes, which exaggerates changes — log axes straighten power laws; they do not create thresholds.
- [ ] Because larger models are evaluated on harder benchmarks — the mirage argument compares the same models on the same tasks, changing only the metric.
