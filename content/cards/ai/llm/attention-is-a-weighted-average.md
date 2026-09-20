---
id: ai.llm.attention.attention-is-a-weighted-average
topic: ai.llm.attention
format: series
difficulty: 2
language: en
weight: medium
angles: [connection, tool]
tags: [attention, softmax, weighted-average, query-key-value]
hook: "Attention has a reputation for being mysterious. It is an average — the model just gets to pick the weights."
series: {id: ai.llm.how-a-model-thinks, index: 3, total: 6, title: "How a language model thinks"}
sources:
  - {title: "Attention Is All You Need", author: "Ashish Vaswani et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03762"}
  - {title: "Attention (machine learning)", type: wiki, url: "https://en.wikipedia.org/wiki/Attention_(machine_learning)"}
diagram: {file: ai/attention-weighted-average.svg, caption: "The word 'it' is rebuilt as a weighted average of the words before it, and the weights add up to one.", alt: "Five word vectors with weights 0.03, 0.71, 0.08, 0.05 and 0.13 feeding arrows of matching thickness into a single output vector, most of it coming from the word cat"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Attention is an average where the model picks the weights

"The cat sat on the mat because **it** was tired." You resolved *it* without noticing. The model has a vector for *it* that knows nothing about cats, and one layer to fix that.

Here is the whole move. Every token emits a **query**: what it wants to know. Every token also emits a **key**: what it can offer. Score each query against each key with a dot product — big when the two point the same way. Push that row of scores through a softmax and it becomes weights that are positive and add up to one. Rebuild the token as that weighted average of the other tokens' **value** vectors.

That is it. The vector for *it* comes back out mostly made of *cat*. No routing logic, no rules about pronouns; just an average, over and over, until the pronoun carries the cat.

The analogy has a leak: the thing being averaged is not the word's meaning but a learned projection of it, and there are many such averages running side by side.

One round of averaging is not thinking. So what is the other two thirds of the machine doing?

## Rigor

Write the sequence as $X \in \mathbb{R}^{T \times d}$, one row per token. Three learned matrices $W_Q, W_K \in \mathbb{R}^{d \times d_k}$ and $W_V \in \mathbb{R}^{d \times d_v}$ give

$$Q = XW_Q \;(T \times d_k), \quad K = XW_K \;(T \times d_k), \quad V = XW_V \;(T \times d_v).$$

Then $QK^{\top}$ is $T \times T$: entry $(i,j)$ is the inner product of query $i$ with key $j$. Vaswani et al. (2017) write

$$\text{Attention}(Q,K,V) = \text{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right)V.$$

Read the shapes and the intuition falls out. The softmax is applied **row-wise**, so each row is a probability vector of length $T$ — the weights in the picture. Multiplying a $T \times T$ row-stochastic matrix by $V \in \mathbb{R}^{T \times d_v}$ is exactly "replace each row of $V$ by a convex combination of all rows of $V$". Attention is a data-dependent averaging operator.

Why $\sqrt{d_k}$? If query and key entries are roughly independent with variance 1, their dot product has variance $d_k$. Without the scaling, the logits grow like $\sqrt{d_k}$, the softmax saturates, and the gradient dies.

## Recall
type: mcq
Q: What does a single row of the matrix after the softmax contain?
- [x] Non-negative weights over all positions, summing to 1 — one token's recipe for averaging the others. — that is precisely what softmax produces, row by row.
- [ ] The similarity of two words in the model's vocabulary — those are fixed embeddings; the attention weights depend on the whole sentence.
- [ ] The probabilities of the next token — those only appear at the very end of the network, after every layer.
