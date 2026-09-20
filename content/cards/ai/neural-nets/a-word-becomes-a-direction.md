---
id: ai.neural-nets.embeddings.a-word-becomes-a-direction
topic: ai.neural-nets.embeddings
format: series
difficulty: 2
language: en
weight: medium
angles: [connection, beautiful]
tags: [embeddings, vector-space, lookup-table, cosine-similarity]
hook: "The only thing a model can do with the number 4842 is use it as a row index. That row is where meaning starts."
series: {id: ai.llm.how-a-model-thinks, index: 2, total: 6, title: "How a language model thinks"}
sources:
  - {title: "Attention Is All You Need", author: "Ashish Vaswani et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03762"}
  - {title: "Word embedding", type: wiki, url: "https://en.wikipedia.org/wiki/Word_embedding"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A word stops being a name and becomes a direction

The row number is useless, so the model immediately looks it up in a big table and keeps the row instead. Each row is a list of a few thousand numbers — a vector. Every token in the vocabulary gets one, and those vectors are learned, not designed.

The payoff is that a space has geometry and a list of names does not. Once a word is a direction in a few thousand dimensions you can ask how close two words are, you can average them, you can project one onto another. None of those questions even parse when a word is just entry number 4842.

The directions are not assigned by a linguist. They fall out of training: tokens that get used in similar places end up pointing in similar directions, because that is what makes the model's predictions good. Meaning here is entirely positional, in the social sense — you are where your neighbours put you.

One vector per token, sitting in a row, each ignorant of the others. But "bank" means different things in a river and in a loan. Who tells the vector which one it is?

## Rigor

The embedding layer is one matrix $E \in \mathbb{R}^{V \times d}$: $V$ rows for the vocabulary, $d$ columns for the model's width ($d = 512$ in the original transformer, tens of thousands in large models). Token $x_t$ becomes the row $E_{x_t}$, which is exactly $\text{one-hot}(x_t)^{\top} E$ — a lookup is a matrix product with a very sparse vector, so it is differentiable and $E$ is trained like everything else.

A sequence of $T$ tokens becomes $X \in \mathbb{R}^{T \times d}$: one row per position. Hold on to that shape; everything downstream preserves it.

Two facts worth noticing. First, $E$ is usually enormous — with $V \approx 10^5$ and $d \approx 10^4$ it is a billion parameters before any computation happens. Second, the same matrix is often reused transposed at the very end to turn a final vector back into scores over the vocabulary ($\,z = hE^{\top}$), which is called weight tying: the map from word to direction and the map from direction back to word are forced to be each other's transpose.

## Recall
type: reveal
Q: Why is a vector a better home for a word than an integer id?
A: Because a vector space has geometry — distance, angle, addition, projection. Ids only support equality. Training pushes tokens used in similar contexts into similar directions, so "close" starts to mean "similar".
