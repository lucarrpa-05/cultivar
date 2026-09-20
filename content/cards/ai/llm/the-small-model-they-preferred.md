---
id: ai.llm.rlhf-alignment-training.the-small-model-they-preferred
topic: ai.llm.rlhf-alignment-training
format: fact
difficulty: 1
language: en
weight: light
angles: [numbers, practical]
tags: [instructgpt, rlhf, human-evaluation, model-size, ouyang-2022]
hook: "A hundredfold difference in size, and the small one won the human vote."
sources:
  - {title: "Training language models to follow instructions with human feedback", author: "Long Ouyang et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2203.02155"}
  - {title: "Reinforcement learning from human feedback", type: wiki, url: "https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback"}
dates: {written: 2026-09-19, event: 2022-03-04}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A hundred times smaller and better company

Ouyang and colleagues took a 1.3-billion-parameter model, fine-tuned it on human-written answers and human preference comparisons, and put its output next to GPT-3's. From the abstract: "outputs from the 1.3B parameter InstructGPT model are preferred to outputs from the 175B GPT-3, despite having 100x fewer parameters." Not a better base model — the same recipe, pointed at what people actually wanted. Size buys capability; it does not buy cooperation.
