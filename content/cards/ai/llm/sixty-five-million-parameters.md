---
id: ai.llm.transformer.sixty-five-million-parameters
topic: ai.llm.transformer
format: fact
difficulty: 1
language: en
weight: light
angles: [numbers, history]
tags: [transformer, parameter-count, training-cost, vaswani-2017, gpu-hours]
hook: "The architecture behind every large language model was introduced by a model small enough to fit on a phone."
sources:
  - {title: "Attention Is All You Need", author: "Ashish Vaswani et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03762"}
  - {title: "Transformer (deep learning architecture)", type: wiki, url: "https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)"}
dates: {written: 2026-09-19, event: 2017-06-12}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The original transformer trained in twelve hours

"Attention Is All You Need" reports two models: a base with 65 million parameters and a big one with 213 million. The base trained for 100,000 steps — twelve hours on a single machine with eight NVIDIA P100 GPUs. The big one took 3.5 days. Both beat the best translation systems of the day on English-to-German and English-to-French. Sixty-five million parameters is around 130 megabytes at half precision: the architecture that every large language model still uses arrived in something you could email.
