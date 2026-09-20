---
id: ai.llm.context-kv-cache.why-the-second-token-is-cheap
topic: ai.llm.context-kv-cache
format: idea
difficulty: 3
language: en
weight: heavy
angles: [tool, numbers]
tags: [kv-cache, prefill, decoding, memory-bandwidth, context-window]
related: [ai.llm.context-kv-cache.the-context-just-doubled]
hook: "The pause before the first word and the smooth stream afterwards are two different computations, and one is quadratic."
sources:
  - {title: "Attention Is All You Need", author: "Ashish Vaswani et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03762"}
  - {title: "Transformer (deep learning architecture)", type: wiki, url: "https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Cross-linked with the KV-cache challenge card in the same topic."}
---

# Why the first token is slow and the rest just stream

You have watched this happen. You send a long prompt, nothing happens for a second, and then text pours out at a steady rate. Those are two different computations wearing one interface.

Generating a token means attending over everything before it — which sounds like redoing the whole sequence every time. It is not, and the reason is causal masking. Position $j$'s key and value vectors are computed from tokens up to $j$ and can never be affected by anything that comes later. They are final the moment they are made. So you compute them once and keep them.

That is the KV cache. The pause is the *prefill*: every token of your prompt attending to every other, work that grows with the square of the prompt length. Then each new token is one query against a stack of stored keys — linear, and small.

The bill does not disappear, though. It moves to memory, and it is larger than people expect.

## Rigor

Let $L$ be the number of layers, $d$ the width, $n$ the current sequence length, $b$ bytes per number. Each layer stores one key and one value vector of size $d$ per token, so

$$\text{cache} = 2\,L\,d\,n\,b \ \text{bytes}.$$

Take $L = 32$, $d = 4096$, $n = 8192$, $b = 2$ (half precision): $2 \cdot 32 \cdot 4096 \cdot 8192 \cdot 2 = 4.29\times 10^{9}$ — about 4 GB of cache, per conversation, on top of the weights. Double the context and it doubles.

Compute splits the same way. Prefill on $n$ prompt tokens costs $\Theta(n^2 d)$ in the attention terms, since the score matrix is $n\times n$. Each decode step costs $\Theta(n d)$ per layer: one query against $n$ cached keys. Generating $m$ tokens therefore costs about $n^2 d + n m d + m^2 d$ — quadratic in the prompt, and quadratic again in the length of the answer.

Which is why long context is sold by the token, and why the engineering effort goes into shrinking that $2Ldnb$ rather than into the arithmetic.

## Recall
type: mcq
Q: Why can a model cache the keys and values of earlier tokens but not their attention outputs?
- [x] Causal masking fixes each token's key and value forever, while its attention output depends on which query is asking. — keys and values are functions of the past only; outputs are functions of a query too.
- [ ] Attention outputs are too large to store — they are the same size as the values; the problem is that they change.
- [ ] The cache would break the positional encoding — positions are baked into the keys when they are computed, which is exactly why caching works.
