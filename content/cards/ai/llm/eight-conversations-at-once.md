---
id: ai.llm.attention.eight-conversations-at-once
topic: ai.llm.attention
format: idea
difficulty: 3
language: en
weight: heavy
angles: [tool, beautiful]
tags: [multi-head-attention, causal-mask, matrix-shapes, parallel-heads]
hook: "One average per layer would be a poor machine. The 2017 model ran eight at once, and it cost nothing extra."
sources:
  - {title: "Attention Is All You Need", author: "Ashish Vaswani et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03762"}
  - {title: "A Mathematical Framework for Transformer Circuits", author: "Nelson Elhage et al.", year: 2021, type: article, url: "https://transformer-circuits.pub/2021/framework/index.html"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# One average was not enough, so they ran eight

A single attention layer computes one weighted average per token. But a sentence has several things going on at once — who the pronoun points at, which verb governs which noun, whether we are still inside a quotation — and one set of weights has to pick.

So don't pick. Slice the 512-dimensional vector into eight strips of 64, run a completely separate attention on each strip, and glue the results back together. Eight sets of weights, eight opinions about what matters, one pass. Because each head works on a narrower slice, the total arithmetic is about the same as one head at full width. The parallelism is free.

There is one more rule, and it is the rule that makes training possible at all: a token may only average over tokens at or before its own position. Let it peek right and the exercise collapses, because the answer to "what comes next" is sitting in the input.

Both of these are one line of matrix algebra each.

## Rigor

Take $X \in \mathbb{R}^{T\times d}$. For head $i$, learn $W_Q^i, W_K^i, W_V^i \in \mathbb{R}^{d\times d_k}$ with $d_k = d/h$, and set $\text{head}_i = \text{Attention}(XW_Q^i, XW_K^i, XW_V^i) \in \mathbb{R}^{T\times d_k}$. Then

$$\text{MultiHead}(X) = \big[\text{head}_1 \,\|\, \cdots \,\|\, \text{head}_h\big]\,W^O, \qquad W^O \in \mathbb{R}^{d\times d}.$$

The concatenation is $T \times h\,d_k = T\times d$, so the block's input and output shapes match — which is what lets you stack it into the residual stream. In the 2017 base model $d = 512$, $h = 8$, $d_k = d_v = 64$. Parameters per attention block: $4d^2$, whatever $h$ is.

Causality is a mask $M \in \mathbb{R}^{T\times T}$ with $M_{ij} = 0$ for $j\le i$ and $-\infty$ otherwise, added before the softmax:

$$\text{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}} + M\right)V.$$

Since $e^{-\infty}=0$, every weight above the diagonal vanishes and each row still sums to one. The averaging matrix becomes lower triangular and row-stochastic — and now all $T$ positions can be trained in a single parallel pass, because position $t$ has provably not seen its own answer.

## Recall
type: mcq
Q: Splitting $d = 512$ into 8 heads of 64 instead of one head of 512 costs roughly the same arithmetic. Why?
- [x] Each head does its dot products in 64 dimensions instead of 512, and there are 8 of them — the widths multiply back out to the same total. — the projections still map $d$ to $d$ overall.
- [ ] Heads share their weight matrices, so there is nothing extra to compute — they are separate matrices; only the total width is conserved.
- [ ] The softmax dominates the cost, and there is only one of them — there are $h$ separate $T\times T$ softmaxes, and they are not the dominant cost anyway.
