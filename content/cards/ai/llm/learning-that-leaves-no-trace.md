---
id: ai.llm.in-context-learning.learning-that-leaves-no-trace
topic: ai.llm.in-context-learning
format: idea
difficulty: 2
language: en
weight: medium
angles: [weird, connection]
tags: [in-context-learning, few-shot, gpt-3, induction-heads, frozen-weights]
hook: "Show it three examples and it does the task. Clear the window and it has no idea it ever could."
sources:
  - {title: "Language Models are Few-Shot Learners", author: "Tom B. Brown et al.", year: 2020, type: paper, url: "https://arxiv.org/abs/2005.14165"}
  - {title: "In-context Learning and Induction Heads", author: "Catherine Olsson et al.", year: 2022, type: article, url: "https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Learning that leaves no trace

Write down three examples of a task nobody ever trained the model on — turn these product names into SKUs, say, in your company's peculiar format — and it will do the fourth. Nothing was stored. Not one weight moved.

That was the headline of the GPT-3 paper in 2020, and its authors were explicit about the setup: "For all tasks, GPT-3 is applied without any gradient updates or fine-tuning, with tasks and few-shot demonstrations specified purely via text interaction with the model."

The strangeness is worth sitting with. Every other sense of "learning" leaves a residue: a changed weight, a written note, a new habit. This one lives entirely inside a single forward pass and evaporates when the context window is cleared. Ask the same model tomorrow, without the examples, and it cannot do your task.

Which raises the question of where the work is being done, if not in the weights.

## Rigor

Formally there is no learning at all: with frozen $\theta$, the model computes $p_\theta(y \mid x_1,y_1,\dots,x_k,y_k,\,x)$. Conditioning, not fitting. Whatever "generalising from examples" means here, it has to be implemented by the forward pass itself — a fixed function of the prompt.

One concrete ingredient has been identified. Olsson and colleagues describe **induction heads**: pairs of attention heads that implement the pattern completion "… $[A][B]$ … $[A]$ → predict $[B]$". One head writes, into the token at each position, information about the token that preceded it; a second head then searches earlier positions for a match to the current token and copies forward what followed it last time. Composed across two layers, that is a learned copy-and-continue circuit, and it forms abruptly during training at the same moment in-context learning ability appears.

That is a mechanism for repeating structure, not a full account of few-shot learning; the general case is still open. The honest summary is that the prompt is being used as data by a program the weights encode, and we can read only parts of that program.

## Recall
type: mcq
Q: After a model solves your task from three examples in the prompt, what has changed inside it?
- [x] Nothing at all — the weights are frozen and the behaviour lives only in that forward pass. — clear the context and the ability is gone.
- [ ] A small number of weights were updated by a fast inner optimiser — no gradients are computed at inference; the update story is a metaphor, not the mechanism.
- [ ] The examples were added to a memory store the model queries later — plain models have no such store; retrieval systems add one deliberately.
