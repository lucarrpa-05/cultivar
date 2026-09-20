---
id: ai.llm.scaling-laws.a-straight-line-over-seven-orders-of-magnitude
topic: ai.llm.scaling-laws
format: idea
difficulty: 2
language: en
weight: medium
angles: [prediction, numbers]
tags: [scaling-laws, power-law, kaplan-2020, compute-budget, loss-curve]
hook: "Almost nothing in science stays on the same straight line for seven orders of magnitude. The loss of a language model does."
sources:
  - {title: "Scaling Laws for Neural Language Models", author: "Jared Kaplan, Sam McCandlish et al.", year: 2020, type: paper, url: "https://arxiv.org/abs/2001.08361"}
  - {title: "Power law", type: wiki, url: "https://en.wikipedia.org/wiki/Power_law"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The graph that turned model-building into budgeting

Kaplan and colleagues at OpenAI trained a great many language models of different sizes on different amounts of data, plotted the loss against each, and got a straight line on log-log axes. Their abstract puts it flatly: the loss scales as a power law with model size, dataset size and compute, "with some trends spanning more than seven orders of magnitude."

Seven orders of magnitude is an unreasonable amount of obedience. Most empirical regularities bend long before that.

What that straight line bought is the thing that reshaped the industry: extrapolation. Train a handful of small models, fit two constants, and you can state — before signing for the compute — roughly what loss a model a thousand times bigger will reach. Building the largest model ever built stopped being a gamble and became a purchase order.

Two cautions travel with it. The line is about *loss*, which is not the same as whether the thing can do your task. And the exponents are tiny, which is exactly what makes it so expensive.

## Rigor

Kaplan et al. report, when the other factors are not bottlenecks,

$$L(N) = \left(\frac{N_c}{N}\right)^{\alpha_N}, \quad \alpha_N \sim 0.076, \qquad L(D) = \left(\frac{D_c}{D}\right)^{\alpha_D}, \quad \alpha_D \sim 0.095,$$

with $N$ the non-embedding parameter count and $D$ the number of tokens. Taking logs, $\log L = \text{const} - \alpha \log N$: the straight line.

Feel the exponent. Ten times the parameters multiplies the loss by $10^{-0.076} \approx 0.84$ — a 16% cut for an order of magnitude. To halve the loss you need $2^{1/0.076} \approx 10^{4}$ times the parameters. The line is beautifully straight and brutally shallow, and that single number is why the bills are what they are.

The paper's other headline, verbatim: "Larger models are significantly more sample-efficient, such that optimally compute-efficient training involves training very large models on a relatively modest amount of data and stopping significantly before convergence." That conclusion was corrected two years later — which is the next card.

## Recall
type: mcq
Q: The fitted exponent for model size is about 0.076. What does that tell you?
- [x] Returns are real but shallow: ten times the parameters cuts the loss by roughly 16%. — a small exponent means you buy improvement in orders of magnitude, not in percentages of budget.
- [ ] The loss falls by 7.6% for every extra parameter — the law is multiplicative in $N$, not additive; single parameters do nothing.
- [ ] The loss reaches zero at around $10^{13}$ parameters — a power law approaches zero only as $N \to \infty$, and real text has an entropy floor anyway.
