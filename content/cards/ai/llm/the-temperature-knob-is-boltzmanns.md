---
id: ai.llm.inference-sampling.the-temperature-knob-is-boltzmanns
topic: ai.llm.inference-sampling
format: idea
difficulty: 2
language: en
weight: medium
angles: [connection, practical]
tags: [temperature, softmax, boltzmann-distribution, sampling, decoding]
hook: "The temperature setting is not a metaphor borrowed from physics. It is the same formula, with the same letter."
sources:
  - {title: "Boltzmann distribution", type: wiki, url: "https://en.wikipedia.org/wiki/Boltzmann_distribution"}
  - {title: "Softmax function", type: wiki, url: "https://en.wikipedia.org/wiki/Softmax_function"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The temperature knob is Boltzmann's

At the end of every forward pass the model hands you a vector of scores, one per token in the vocabulary. Softmax turns those into probabilities. Temperature divides the scores before the softmax sees them, and that one division controls everything about how the text comes out.

Turn it toward zero and the largest score wins with probability one: the model becomes deterministic and always takes its top guess. Leave it at one and you sample from the model's own beliefs. Turn it up and the differences between scores shrink toward nothing, until every token in the vocabulary is equally likely and the output is noise.

The name is not borrowed loosely. Write the score as minus an energy and you have the Boltzmann distribution of statistical mechanics, letter for letter. Cold systems fall into their lowest-energy state; hot ones wander over all states.

Which is why calling it a creativity dial is wrong. It does not invent anything — it only decides how far down its own ranked list the model is willing to reach.

## Rigor

With logits $z \in \mathbb{R}^{V}$ and temperature $T > 0$,

$$p_i(T) = \frac{e^{z_i/T}}{\sum_{j} e^{z_j/T}},$$

which is exactly $\Pr(\text{state } i) \propto e^{-\varepsilon_i / k_BT}$ with $\varepsilon_i = -z_i$ and $k_B = 1$.

Three properties, all immediate. **Order is preserved:** $p_i > p_j \iff z_i > z_j$ for every $T$, so temperature never promotes a token past another — it only changes the gaps. **Limits:** as $T \to 0^{+}$ the distribution converges to a point mass on $\arg\max z$ (greedy decoding is the zero-temperature limit, not a separate algorithm); as $T \to \infty$ it converges to uniform on the vocabulary. **Monotone uncertainty:** the Shannon entropy $H(p(T))$ is non-decreasing in $T$, the same statement as $\mathrm{d}S/\mathrm{d}T = C/T \ge 0$ for a thermodynamic system with non-negative heat capacity.

The last one is the honest version of the intuition's warning. Raising $T$ buys exactly one thing, entropy, and entropy over a ranked list means reaching further into the tail.

## Recall
type: mcq
Q: What does raising the sampling temperature actually change?
- [ ] Which token the model thinks is best — the ranking of the logits is untouched; only the gaps between probabilities shrink.
- [x] How much probability mass sits away from the top of the list, and so how deep into the tail sampling reaches. — temperature is a monotone knob on the entropy of the output distribution.
- [ ] How many layers of computation the model spends on the token — temperature is applied after the forward pass has finished.
