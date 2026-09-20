---
id: ai.llm.inference-sampling.the-most-likely-sentence-is-boring
topic: ai.llm.inference-sampling
format: idea
difficulty: 3
language: en
weight: medium
angles: [paradox, tool]
tags: [nucleus-sampling, beam-search, decoding, degeneration, top-p]
hook: "Train a model to put high probability on real text. Then ask it for the highest-probability text and you get a loop."
sources:
  - {title: "The Curious Case of Neural Text Degeneration", author: "Ari Holtzman, Jan Buys, Li Du, Maxwell Forbes & Yejin Choi", year: 2019, type: paper, url: "https://arxiv.org/abs/1904.09751"}
  - {title: "Beam search", type: wiki, url: "https://en.wikipedia.org/wiki/Beam_search"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The most likely sentence is one nobody would write

Holtzman and colleagues put the paradox in one sentence in 2019: "even though the use of likelihood as training objective leads to high quality models for a broad range of language understanding tasks, using likelihood as a decoding objective leads to text that is bland and strangely repetitive."

Chase the highest-probability continuation with beam search and models fall into loops — the same clause, again, forever. Which is baffling until you notice the assumption nobody checked: that human text is high-probability text. It is not. Real writers constantly pick words that were not the likeliest one, and a sequence of 200 individually-likely words is a sequence no person would ever produce.

So generation needs a deliberate refusal to take the best answer. Nucleus sampling is the standard one: keep the smallest set of tokens whose probabilities already add to $p$ (say 0.95), throw away the rest of the vocabulary, renormalise, sample.

The interesting question is why throwing the tail away matters so much.

## Rigor

Two different objects get confused. Greedy decoding maximises $p(x_t \mid x_{<t})$ at each step; beam search approximates $\arg\max_{x_{1:T}} p(x_{1:T})$. They are not the same, and Holtzman et al.'s point is that *even the second one* is the wrong target.

Nucleus (top-$p$) sampling defines, at each step, the smallest set $V^{(p)} \subseteq V$ with $\sum_{x \in V^{(p)}} p(x \mid x_{<t}) \ge p$, then samples from $p$ restricted to $V^{(p)}$ and renormalised. Unlike top-$k$, the size of $V^{(p)}$ adapts: it is small where the model is confident and large where many continuations are reasonable.

Why truncation is not a detail. A softmax over $|V| \approx 10^5$ tokens leaves a long tail carrying, say, 5% of the mass spread over tens of thousands of nonsense continuations. Sample 50 tokens and the probability of never once landing in the tail is $0.95^{50} \approx 0.08$. Over a paragraph, a rare event becomes a near-certainty — and one derailed token conditions everything after it.

That is the real asymmetry: the tail is individually negligible and collectively fatal.

## Recall
type: mcq
Q: Why does nucleus sampling cut the tail of the distribution rather than lowering the temperature?
- [ ] Because temperature is too slow to compute — both are trivial; the difference is in what they do to the tail.
- [x] Because a fixed small tail probability becomes near-certain over hundreds of draws, and one bad token poisons everything after it. — truncation removes the tail outright instead of merely shrinking it.
- [ ] Because temperature changes which token ranks highest — temperature preserves the ranking exactly; it only reshapes the gaps.
