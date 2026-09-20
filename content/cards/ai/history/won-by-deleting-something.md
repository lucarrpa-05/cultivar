---
id: ai.history.attention-2017-gpt.won-by-deleting-something
topic: ai.history.attention-2017-gpt
topics: [ai.neural-nets.rnn-lstm]
format: idea
difficulty: 2
language: en
weight: heavy
angles: [connection, tool, history]
tags: [transformer, recurrence, parallelism, path-length, attention-2017]
hook: "The most consequential architecture of the decade was defined by what its authors threw out."
sources:
  - {title: "Attention Is All You Need", author: "Vaswani et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03762"}
  - {title: "Transformer (deep learning architecture)", type: wiki, url: "https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)"}
dates: {written: 2026-09-19, event: 2017-06-12}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The architecture that won by deleting something

A recurrent network reads a sentence the way you do: one word, then the next, carrying a memory forward. That sounds like a virtue. It is a scheduling disaster. Word 500 cannot be computed until words 1 through 499 have been, one at a time, while a chip with thousands of arithmetic units stands in a queue.

The 2017 move was subtraction. Delete recurrence. Let every position look at every other position simultaneously, in one matrix operation, and let the model work out which of them matter.

Two things change at once. The sequence stops being a sequence as far as the hardware is concerned — the whole sentence is processed in parallel. And any two words become one step apart, however far apart they sit, so the signal connecting "the animal" to "it" forty words later no longer has to survive forty hops.

It bought all that with a cost, and the cost is what makes long context expensive. Here is the ledger.

## Rigor

From the paper's own comparison table, for sequence length $n$ and representation width $d$:

| layer | work per layer | sequential steps | max path length |
|---|---|---|---|
| self-attention | $O(n^2 d)$ | $O(1)$ | $O(1)$ |
| recurrent | $O(n d^2)$ | $O(n)$ | $O(n)$ |
| convolutional, kernel $k$ | $O(k n d^2)$ | $O(1)$ | $O(\log_k n)$ |

Two columns are the argument. **Sequential steps** is what the GPU cannot parallelise: $O(1)$ versus $O(n)$. **Maximum path length** is the number of layers a gradient must travel between two positions; at $O(1)$, the vanishing-gradient problem over long ranges — the reason LSTM gates were invented — stops being an architectural problem and becomes an optimisation detail.

The price is the first column. Attention is quadratic in $n$ because every position attends to every position: doubling the context quadruples the work and the memory for the score matrix. In 2017, with sentences where $n < d$, self-attention was also *cheaper* per layer than recurrence. The moment contexts grew past a few thousand tokens, that $n^2$ became the central engineering problem of the field.

## Recall
type: mcq
Q: What did removing recurrence buy?
- [ ] Fewer parameters for the same quality — transformers are not generally smaller; the gain was in how the computation is scheduled.
- [x] A constant number of sequential steps and a constant path between any two positions — the sequence becomes parallel and long-range gradients stop decaying.
- [ ] Linear rather than quadratic cost in sequence length — the opposite: attention costs $O(n^2)$, which is why context length is expensive.
