---
id: ai.llm.mixture-of-experts.a-trillion-parameters-mostly-asleep
topic: ai.llm.mixture-of-experts
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, numbers]
tags: [mixture-of-experts, sparsity, routing, switch-transformer, active-parameters]
hook: "Most networks run every parameter on every input. Nobody made them. Turn that off and capacity stops costing compute."
sources:
  - {title: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer", author: "Noam Shazeer, Azalia Mirhoseini, Krzysztof Maziarz et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1701.06538"}
  - {title: "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity", author: "William Fedus, Barret Zoph & Noam Shazeer", year: 2021, type: paper, url: "https://arxiv.org/abs/2101.03961"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A trillion parameters, most of them asleep

A dense network multiplies by every weight it owns, for every input, always. Shazeer and colleagues asked in 2017 why that should be compulsory. Replace one feed-forward layer with a thousand small ones — *experts* — plus a little router that reads each token and picks a couple of them. Add experts and the model's capacity grows; the arithmetic per token does not move.

Their 2017 language models reached 137 billion parameters, at a time when a large dense model had a thousand times fewer. Fedus, Zoph and Shazeer simplified it in 2021 to routing each token to exactly one expert, reported "up to 7x increases in pre-training speed with the same computational resources" against a dense baseline, and pre-trained models past a trillion parameters.

The catch is not compute, it is storage. Every sleeping expert still has to be somewhere fast enough to wake up in time. A sparse model's honest advertisement has two numbers: total parameters and active parameters.

## Rigor

A mixture-of-experts layer computes

$$y = \sum_{i=1}^{n} g_i(x)\, E_i(x), \qquad g(x) = \text{top-}k\big(\text{softmax}(W_g x)\big),$$

with all but $k$ entries of $g$ forced to zero. Parameters scale as $n$; FLOPs per token scale as $k$. With $n = 128$ and $k = 2$, capacity is up 64-fold and cost is roughly flat.

The hard part is that $\text{top-}k$ is discrete. An expert only receives gradient on tokens routed to it, so an expert that starts slightly better gets more tokens, improves faster, and attracts more — a rich-get-richer collapse where a handful of experts absorb everything and the rest never train. Both papers add an auxiliary load-balancing loss, penalising the product of the fraction of tokens sent to each expert and the router's mean probability for it, to push the assignment toward uniform.

So the "asleep" of the intuition is precise: a sleeping expert contributes nothing to this token's arithmetic, but it must sit in memory, and it must be woken often enough to have learned anything at all.

## Recall
type: mcq
Q: What does a sparse mixture-of-experts model buy you, and what does it not?
- [x] More parameters at roughly constant compute per token — but every expert still occupies memory. — capacity scales with the expert count while FLOPs scale with the number routed to.
- [ ] Less memory, because only a few experts are stored — all of them are stored; only a few are multiplied.
- [ ] Faster training per parameter with no new failure modes — routing collapse is a real failure mode, which is why load-balancing losses exist.
