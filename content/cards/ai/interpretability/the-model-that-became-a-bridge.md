---
id: ai.interpretability.sparse-autoencoders.the-model-that-became-a-bridge
topic: ai.interpretability.sparse-autoencoders
format: fact
difficulty: 2
language: en
weight: light
angles: [weird, practical]
tags: [feature-steering, clamping, golden-gate, causal-test]
hook: "They found the feature by watching what it responds to, and proved it by turning it up."
related: [ai.interpretability.sparse-autoencoders.build-a-dictionary-for-the-hidden-features]
sources:
  - {title: "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet", author: "Templeton, Conerly, Marcus, Lindsey et al.", year: 2024, type: article, url: "https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html"}
  - {title: "Mechanistic interpretability", type: wiki, url: "https://en.wikipedia.org/wiki/Mechanistic_interpretability"}
dates: {written: 2026-09-19, event: 2024-05-21}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# They turned one feature up and the model thought it was a bridge

Among 34 million features extracted from Claude 3 Sonnet, Anthropic's team found one that activates on mentions of the Golden Gate Bridge — across languages, and on images of it. Then they clamped that single feature to ten times its maximum natural value and let the model talk. It began to identify *as* the bridge. A feature discovered by watching what it responds to, and confirmed by what happens when you force it on.

## Recall
type: reveal
Q: Why does clamping a feature matter more than finding one?
A: Because activation patterns are only correlational — a feature that lights up on bridge text might be a bystander. Clamping it and watching behaviour change in the predicted way is a causal test of the interpretation.
