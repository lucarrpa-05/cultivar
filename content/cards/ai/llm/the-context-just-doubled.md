---
id: ai.llm.context-kv-cache.the-context-just-doubled
topic: ai.llm.context-kv-cache
format: challenge
difficulty: 2
language: en
weight: light
angles: [tool, numbers]
tags: [kv-cache, context-window, estimation, quadratic-cost]
related: [ai.llm.context-kv-cache.why-the-second-token-is-cheap]
hook: "Your context window goes from 8k to 16k tokens. Two resources change, and they do not change by the same factor."
sources:
  - {title: "Attention Is All You Need", author: "Ashish Vaswani et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03762"}
  - {title: "Transformer (deep learning architecture)", type: wiki, url: "https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Cross-linked with the KV-cache idea card in the same topic; this is its puzzle form."}
---

# Your context window just doubled. What did that cost?

A product manager walks in: we are going from 8,000 tokens of context to 16,000. The model is unchanged — 32 layers, width 4,096, half precision.

Two things get more expensive, and confusing them is how capacity planning goes wrong. One is the memory held per conversation while the model reads: the stored keys and values for every token at every layer. The other is the arithmetic of reading the prompt in the first place, where each token attends to every other one.

Before reading on: by what factor does each grow? And which of the two is the one that actually decides how many users fit on a GPU?

## Recall
type: reveal
Q: Doubling the context: what happens to the KV cache and to the prefill compute?
A: The cache grows linearly — $2Ldnb$ goes from about 4 GB to about 8 GB per conversation. Prefill compute grows quadratically: attention on $n$ tokens has an $n \times n$ score matrix, so it roughly quadruples. Memory is usually the binding constraint on how many users share a GPU, because the cache must stay resident for the whole conversation while the prefill cost is paid once.
