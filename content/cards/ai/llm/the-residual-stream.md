---
id: ai.llm.transformer.the-residual-stream
topic: ai.llm.transformer
format: series
difficulty: 3
language: en
weight: medium
angles: [beautiful, connection]
tags: [residual-stream, transformer-block, layer-norm, skip-connection]
hook: "Nothing in a transformer replaces anything. Every layer reads a running total and adds to it."
series: {id: ai.llm.how-a-model-thinks, index: 4, total: 6, title: "How a language model thinks"}
sources:
  - {title: "Attention Is All You Need", author: "Ashish Vaswani et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03762"}
  - {title: "A Mathematical Framework for Transformer Circuits", author: "Nelson Elhage et al.", year: 2021, type: article, url: "https://transformer-circuits.pub/2021/framework/index.html"}
  - {title: "Layer Normalization", author: "Jimmy Lei Ba, Jamie Ryan Kiros & Geoffrey E. Hinton", year: 2016, type: paper, url: "https://arxiv.org/abs/1607.06450"}
diagram: {file: ai/residual-stream.svg, caption: "Each sublayer reads the running total, computes something, and adds it back. The stream itself is never overwritten.", alt: "A vertical line labelled the residual stream, with attention blocks on the left and MLP blocks on the right, each drawing an arrow out of the line and returning into a plus sign on it"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Nothing gets replaced; everything gets added

Draw a vertical line for each token and let it run the whole depth of the network. The embedding puts the first vector on that line. After that, every single component — attention, then the per-token MLP, then the next attention, all the way down — does the same three things: read the line, compute something, **add** the result back.

Nothing overwrites. Elhage and colleagues named the line the *residual stream*, and it behaves like a shared workspace: a layer with nothing to say adds approximately zero, and a layer forty steps later can still find what layer three wrote.

Between the reading and the computing sits a layer norm, which rescales the vector to a standard size. Think of it as insisting everyone speak at the same volume before being listened to.

The picture explains the two halves of a block. Attention is the only part that moves information *between* tokens. The MLP never looks sideways — it works on one position at a time, and it holds most of the weights.

Every one of those weights was set by a single, almost insultingly simple objective. What was it?

## Rigor

One block, in the pre-norm form used by most modern models:

$$x \leftarrow x + \text{Attn}(\text{LN}(x)), \qquad x \leftarrow x + \text{MLP}(\text{LN}(x)).$$

The MLP is $\text{MLP}(u) = W_2\,\sigma(W_1 u + b_1) + b_2$ with $W_1 \in \mathbb{R}^{4d \times d}$ and $W_2 \in \mathbb{R}^{d \times 4d}$: out to four times the width, through a nonlinearity, and back.

Layer norm standardises across the $d$ features of a **single** token — subtract that vector's own mean, divide by its own standard deviation, then apply a learned gain and bias. No batch statistics, so it behaves identically at training and at inference (Ba, Kiros and Hinton 2016).

Why the addition matters: the Jacobian of $x \mapsto x + F(x)$ is $I + \partial F/\partial x$. Composing $L$ of those gives a product whose expansion contains the term $I$ — a clean path from the loss back to layer one that does not shrink with depth. The "running total" of the intuition is literally a sum of every sublayer's contribution, and differentiating a sum is what keeps a 100-layer network trainable.

## Recall
type: mcq
Q: Which part of a transformer block lets one token's information reach another token?
- [ ] The layer norm — it rescales each token's own vector and never mixes positions.
- [x] The attention sublayer — it is the only operation that averages across positions.
- [ ] The MLP — it applies the same function to each position separately, with no sideways view.
- [ ] The residual addition — it adds a vector to itself at the same position, nothing more.
