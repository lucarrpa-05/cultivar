---
id: ai.llm.next-token-pretraining.perplexity-is-entropy-in-disguise
topic: ai.llm.next-token-pretraining
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, numbers]
tags: [perplexity, cross-entropy, information-theory, kl-divergence, language-model-loss]
callback: {from: math.probability.information-entropy, to: ai.llm.next-token-pretraining}
prerequisites: [math.probability.information-entropy, ai.llm.next-token-pretraining]
hook: "A model's training loss is not an arbitrary score. It is measured in bits, and it has a floor nobody can go below."
sources:
  - {title: "Perplexity", type: wiki, url: "https://en.wikipedia.org/wiki/Perplexity"}
  - {title: "Cross-entropy", type: wiki, url: "https://en.wikipedia.org/wiki/Cross-entropy"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember entropy? It is the number on a model's report card

Entropy arrived as the average number of yes/no questions needed to pin down a draw from a distribution. A language model's training loss is that same quantity, with one twist: you are paying for your questions using the *wrong* distribution.

That is cross-entropy. Code the next token with the model's probabilities instead of the true ones, and the average cost in bits is what training minimises. Exponentiate it and you get **perplexity**, which converts bits back into a count: a model with perplexity 247 is as uncertain, per word, as someone choosing uniformly among 247 words. That number is not invented — it is roughly what a language model managed on the Brown Corpus in 1992, at 7.95 bits per word.

The part that makes this more than a rename: cross-entropy cannot go below the entropy of the text itself. There is a floor, it is a property of language rather than of engineering, and no amount of compute crosses it.

## Rigor

Let $p$ be the true conditional distribution of the next token and $q_\theta$ the model's. The loss is the cross-entropy

$$H(p,q_\theta) = -\sum_x p(x)\log q_\theta(x) = H(p) + D_{\mathrm{KL}}(p\,\|\,q_\theta),$$

and since $D_{\mathrm{KL}} \ge 0$ with equality only when $q_\theta = p$, the loss is $H(p)$ plus a non-negative penalty for being wrong. Training drives the KL term down; the $H(p)$ term is untouchable. That is the floor.

Perplexity is $\mathrm{PP} = b^{H(p,q)}$ with $b$ matching the log base — $e^{\mathcal{L}}$ for a loss in nats. The "effective number of choices" reading is exact: for a uniform distribution on $k$ symbols, $H = \log k$ and $\mathrm{PP} = k$.

Two things this buys you. Losses across models with different vocabularies are only comparable per character, not per token — a tokenizer that splits more finely gets a flattering per-token number. And a drop of $0.1$ nats is a multiplicative $e^{0.1} \approx 1.11$ change in perplexity, which is why loss curves are read on a log scale.

## Recall
type: mcq
Q: A model reports perplexity 8 on some text. What does that mean?
- [x] Per token, it is as uncertain as someone picking uniformly among 8 options. — perplexity is the exponential of the cross-entropy, so it converts bits back into an effective count.
- [ ] It gets one token in eight wrong — perplexity is about the probabilities assigned, not about a hard accuracy count.
- [ ] Its loss is 8 bits per token — 8 is the perplexity; the loss would be $\log_2 8 = 3$ bits.
- [ ] It could be driven to 1 with enough compute — that would require the text to be perfectly predictable; the entropy of the text is a hard floor.
