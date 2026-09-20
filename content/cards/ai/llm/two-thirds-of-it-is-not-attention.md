---
id: ai.llm.transformer.two-thirds-of-it-is-not-attention
topic: ai.llm.transformer
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, numbers]
tags: [mlp, feed-forward, key-value-memory, parameter-count, transformer-block]
hook: "The paper was called Attention Is All You Need. Two thirds of the weights are in the part that never looks at another word."
sources:
  - {title: "Transformer Feed-Forward Layers Are Key-Value Memories", author: "Mor Geva, Roei Schuster, Jonathan Berant & Omer Levy", year: 2021, type: paper, url: "https://arxiv.org/abs/2012.14913"}
  - {title: "Attention Is All You Need", author: "Ashish Vaswani et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03762"}
diagram: {file: ai/transformer-block.svg, caption: "A block is two rounds of normalise-compute-add; the four attention matrices hold 4d² weights and the two MLP matrices hold 8d².", alt: "A left-to-right diagram of a transformer block with layer norm, multi-head attention, an addition, then layer norm, an MLP and another addition, with dashed skip lines and parameter counts underneath"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The famous part is the small part

Geva, Schuster, Berant and Levy open their 2021 paper with a line that ought to be better known: feed-forward layers constitute two-thirds of a transformer model's parameters. Attention gets the name on the door and one third of the weights.

The other two thirds go to a plain two-layer network applied to each position separately, out to four times the width and back. It never looks at another token. Whatever it does, it does alone.

What does it do? Their answer is lovely. Read the first matrix by rows: each row is a pattern detector, firing when the incoming vector looks a certain way. Read the second matrix by columns: each column is a contribution to push into the residual stream. Row $i$ fires, column $i$ gets added. The MLP is a lookup table of learned associations — the paper's word is *memories* — and lower layers hold shallow, surface patterns while upper layers hold semantic ones.

Which makes the arithmetic worth doing.

## Rigor

Per block with width $d$: attention needs $W_Q, W_K, W_V, W^O$, each $d\times d$, so $4d^2$. The MLP needs $W_1 \in \mathbb{R}^{4d\times d}$ and $W_2 \in \mathbb{R}^{d\times 4d}$, so $8d^2$. Total $12d^2$, of which the MLP is $8/12 = 2/3$. That is where the headline number comes from, and it holds at every width.

Now the memory reading. Write the rows of $W_1$ as $k_1,\dots,k_{4d}$ and the columns of $W_2$ as $v_1,\dots,v_{4d}$. Then

$$\text{MLP}(u) = W_2\,\sigma(W_1 u) = \sum_{i=1}^{4d} \sigma\big(\langle k_i, u\rangle\big)\, v_i .$$

Compare that with the attention card. Attention is $\sum_j \alpha_j v_j$ with $\alpha = \text{softmax}$ of inner products against the *other tokens*. The MLP is $\sum_i \sigma(\langle k_i,u\rangle)v_i$: inner products against a *fixed, learned* set of keys, with $\sigma$ in place of softmax so the coefficients need not sum to one.

Same shape of computation. Attention queries the sentence; the MLP queries the weights.

## Recall
type: mcq
Q: In one transformer block of width $d$, where do the parameters actually sit?
- [ ] Mostly in attention, since it is the expensive part at long context — long context makes attention's *compute* blow up, but its parameter count stays at $4d^2$.
- [x] About $4d^2$ in attention and $8d^2$ in the MLP, so two thirds are in the per-token MLP. — the MLP goes out to width $4d$ and back, which costs two rectangles instead of four squares.
- [ ] Mostly in the layer norms, which have a gain and bias per feature — those are $O(d)$ parameters, utterly negligible.
