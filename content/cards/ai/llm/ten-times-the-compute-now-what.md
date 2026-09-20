---
id: ai.llm.scaling-laws.ten-times-the-compute-now-what
topic: ai.llm.scaling-laws
format: challenge
difficulty: 2
language: en
weight: light
angles: [tool, numbers]
tags: [compute-budget, chinchilla, estimation, scaling-puzzle]
related: [ai.llm.scaling-laws.gopher-was-four-times-too-big]
hook: "Your compute budget just went up tenfold. Spend it wrong and you burn it on the wrong-shaped model."
sources:
  - {title: "Training Compute-Optimal Large Language Models", author: "Jordan Hoffmann et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2203.15556"}
  - {title: "Scaling Laws for Neural Language Models", author: "Jared Kaplan, Sam McCandlish et al.", year: 2020, type: paper, url: "https://arxiv.org/abs/2001.08361"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Cross-linked with the Chinchilla idea card in the same topic; this is its puzzle form."}
---

# Your budget just went up tenfold. What do you buy?

You have a 7-billion-parameter model trained on 140 billion tokens, and it is sitting at the compute-optimal point for the budget you had. Your grant comes through and your compute goes up by a factor of ten.

Three tempting answers. Train a 70-billion-parameter model on the same 140 billion tokens. Keep the 7-billion model and train it on 1.4 trillion tokens. Or split the difference somehow.

Before reading on: which one, and what is the arithmetic that decides it? The relevant facts are that training cost is roughly proportional to parameters times tokens, and that Hoffmann and colleagues found the two should grow in equal proportion.

## Recall
type: reveal
Q: Ten times the compute. What shape is the new model?
A: Roughly $\sqrt{10} \approx 3.2$ times bigger and trained on $3.2$ times the tokens: about 22 billion parameters on 450 billion tokens. Since cost $\approx 6ND$ and the optimum has $N \propto C^{1/2}$, $D \propto C^{1/2}$, multiplying either factor alone by 10 wastes most of the gain. The ratio stays near 20 tokens per parameter.
