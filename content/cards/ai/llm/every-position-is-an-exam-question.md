---
id: ai.llm.next-token-pretraining.every-position-is-an-exam-question
topic: ai.llm.next-token-pretraining
format: fact
difficulty: 1
language: en
weight: light
angles: [numbers, tool]
tags: [self-supervision, causal-mask, parallel-training, labels, pretraining]
hook: "A thousand-word document is not one training example. It is a thousand."
sources:
  - {title: "Attention Is All You Need", author: "Ashish Vaswani et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03762"}
  - {title: "Self-supervised learning", type: wiki, url: "https://en.wikipedia.org/wiki/Self-supervised_learning"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Every position in the document is its own exam question

Because a token may only attend to the ones before it, a single pass over a 1,000-token document produces 1,000 separate predictions — token 2 from token 1, token 3 from tokens 1 and 2, and so on — each with its own loss, all computed simultaneously. Nobody labelled anything. The answer to every question was already sitting one position to the right, which is the whole reason the internet could serve as a training set.
