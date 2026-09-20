---
id: ai.frontier.compute-hardware.the-chip-is-waiting-for-memory
topic: ai.frontier.compute-hardware
format: idea
difficulty: 3
language: en
weight: heavy
angles: [paradox, tool, numbers]
tags: [memory-bandwidth, roofline, arithmetic-intensity, inference, batching]
hook: "While a model writes you a sentence, the fastest chip in the building is mostly idle, waiting for numbers to arrive."
sources:
  - {title: "Roofline model", type: wiki, url: "https://en.wikipedia.org/wiki/Roofline_model"}
  - {title: "High Bandwidth Memory", type: wiki, url: "https://en.wikipedia.org/wiki/High_Bandwidth_Memory"}
  - {title: "Random-access memory (the memory wall)", type: wiki, url: "https://en.wikipedia.org/wiki/Random-access_memory"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Why a model is slow even on a very fast chip

A modern accelerator performs hundreds of trillions of arithmetic operations a second. While it generates text for you, one word at a time, it spends most of its life doing nothing at all.

The reason is embarrassingly simple. To produce a single token, the chip must read *every weight in the model* out of memory — all of them, once. Arithmetic is fast and memory is slow, so the multipliers sit idle waiting for numbers to arrive, then consume them in a flash, then wait again.

Once you see it, a lot of otherwise disconnected facts line up. Generation speed falls roughly in proportion to model size. Serving many users at once is nearly free per user, because the weights get read once and used for everybody. Quantising to fewer bits per weight speeds things up even though the arithmetic has not changed. And when policy documents talk about "chips", memory bandwidth matters as much as the headline operation count.

Here is the bound, which is a one-line division.

## Rigor

For autoregressive decoding at batch size 1, the time per token is bounded below by the time to move the parameters:
$$t \;\ge\; \frac{N\,b}{B},$$
$N$ parameters, $b$ bytes each, $B$ the memory bandwidth. Take $N=7\times10^{10}$, $b=2$ (16-bit), $B=3\times10^{12}$ bytes/s:
$$t \ge \frac{1.4\times10^{11}}{3\times10^{12}} = 46.7\ \text{ms} \approx 21\ \text{tokens/s},$$
and no amount of arithmetic throughput improves it.

The roofline framing: **arithmetic intensity** is FLOPs per byte moved. Decoding does about $2N$ FLOPs per token per sequence while moving $Nb$ bytes once for the whole batch, so
$$I \approx \frac{2N\cdot\text{batch}}{Nb} = \frac{2\,\text{batch}}{b}.$$
At batch 1 in 16-bit that is 1 FLOP per byte, against a machine balance point of several hundred — you are two orders of magnitude below the roof, squarely memory-bound. Raise the batch and $I$ rises proportionally until you finally hit the compute ceiling. That is the entire reason inference is sold in batches.

Training is the other regime: every token in the sequence contributes gradients while the weights are read once, so intensity is high and training really is compute-bound. The $6ND$ count is the right model there. For generation, it is not.

## Recall
type: mcq
Q: Why does batching make inference so much cheaper per user?
- [ ] Because the model runs fewer layers when the batch is larger — the computation per sequence is identical; only the scheduling changes.
- [x] The weights are read from memory once and reused across the whole batch — arithmetic intensity rises until the chip is compute-bound.
- [ ] Because the sequences share a cache of each other's results — different users' sequences share nothing; what is shared is the weight traffic.
