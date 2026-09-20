---
id: ai.llm.next-token-pretraining.guess-the-next-token
topic: ai.llm.next-token-pretraining
format: series
difficulty: 2
language: en
weight: medium
angles: [connection, numbers]
tags: [next-token-prediction, cross-entropy, pretraining, log-loss]
hook: "The whole objective is: cover the next word, guess it, get told the answer. Repeat a few trillion times."
series: {id: ai.llm.how-a-model-thinks, index: 5, total: 6, title: "How a language model thinks"}
sources:
  - {title: "Language Models are Few-Shot Learners", author: "Tom B. Brown et al.", year: 2020, type: paper, url: "https://arxiv.org/abs/2005.14165"}
  - {title: "Cross-entropy", type: wiki, url: "https://en.wikipedia.org/wiki/Cross-entropy"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# One objective, repeated a few trillion times

Cover the next token. Guess it. Get told the answer. Nudge the weights so that next time you would have put more probability on the right one. There is no second objective, no grammar module, no fact database. Everything a pretrained model knows is a side effect of getting better at that one game.

The nudge is not "right or wrong". The model outputs a probability distribution over the whole vocabulary, and the penalty is the negative logarithm of the probability it put on the token that actually came. Truth at 0.5 costs about 0.69. At 0.01 it costs 4.6. Near zero the penalty runs off to infinity — which is why models are so reluctant to rule anything out.

That structure is why prediction accidentally forces understanding. To put good probability on the last word of "the murderer turned out to be the ___" you have to have tracked the plot. There is no cheaper way.

This gets you a model that continues text. It does not get you a model that answers you — those are genuinely different things. So what turns one into the other?

## Rigor

The model defines $p_\theta(x_t \mid x_{<t})$ and the training loss over a corpus is the average negative log-likelihood

$$\mathcal{L}(\theta) = -\frac{1}{T}\sum_{t=1}^{T} \log p_\theta(x_t \mid x_{<t}),$$

which is the cross-entropy between the one-hot empirical distribution and the model's. The final vector $h_t \in \mathbb{R}^d$ becomes scores $z = h_t E^{\top} \in \mathbb{R}^{V}$ and then $p = \text{softmax}(z)$.

Two facts make the gradient well behaved. First, for the softmax with cross-entropy the gradient with respect to the logits is simply $p - \text{one-hot}(x_t)$: predicted minus actual, so the update is proportional to how wrong you were. Second, by the chain rule of probability, $\sum_t \log p_\theta(x_t \mid x_{<t}) = \log p_\theta(x_1,\dots,x_T)$ — the sum of the per-token losses is the log-likelihood of the whole document. Minimising it is maximum likelihood on text, nothing more exotic.

The "penalty runs off to infinity" of the intuition is the pole of $-\log$ at $0$: assigning probability zero to something that happens costs infinitely much.

## Recall
type: reveal
Q: Why does the loss punish confident wrong answers so much harder than uncertain ones?
A: Because the penalty is $-\log p$ of the true token. At $p = 0.5$ it is 0.69; at $p = 0.01$ it is 4.6; as $p \to 0$ it diverges. Ruling out something that then happens is infinitely expensive.
