---
id: ai.llm.in-context-learning.the-examples-can-be-wrong
topic: ai.llm.in-context-learning
format: idea
difficulty: 3
language: en
weight: medium
angles: [paradox, mistake]
tags: [in-context-learning, demonstrations, random-labels, prompt-format, min-2022]
hook: "Replace every label in your examples with a random one. Performance barely moves. So what were the examples doing?"
sources:
  - {title: "Rethinking the Role of Demonstrations: What Makes In-Context Learning Work?", author: "Sewon Min, Xinxi Lyu, Ari Holtzman et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2202.12837"}
  - {title: "Language Models are Few-Shot Learners", author: "Tom B. Brown et al.", year: 2020, type: paper, url: "https://arxiv.org/abs/2005.14165"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The examples in your prompt can be wrong and it hardly matters

Sewon Min and colleagues ran an experiment in 2022 that reads like sabotage. Take a few-shot prompt — input, correct label, input, correct label — and scramble the labels. "Terrible movie → positive." "Loved it → negative." Then measure.

Their finding: "Ground truth demonstrations are in fact not required — randomly replacing labels in the demonstrations barely hurts performance on a range of classification and multi-choice tasks." Across twelve models, including GPT-3.

So the demonstrations are not teaching the input-to-output mapping. What they are doing, the paper says, is providing "(1) the label space, (2) the distribution of the input text, and (3) the overall format of the sequence" — here are the words I may answer with, here is the kind of thing you will be asked, here is the shape of a reply.

That is a much more deflating description of few-shot prompting, and a much more useful one.

## Rigor

The result is less mysterious once you write down what conditioning can do. The model computes $p_\theta(y \mid \text{prompt})$; the demonstrations enter only as tokens. They can shift the distribution in two quite different ways: by **locating** a behaviour the pretrained model already has (a prior over $y$'s vocabulary, a register, a format), or by **specifying** a mapping $x \mapsto y$ that the model must infer.

Min et al. separate these by ablation. Corrupting the labels destroys the mapping information while leaving the label set, the input distribution and the format intact. Performance holds, so the mapping channel was carrying little of the weight.

Two honest limits. The effect was measured on classification and multiple-choice tasks with familiar label spaces, where the pretrained prior is strong; for a genuinely novel mapping there is less prior to locate. And later work finds larger models *do* use the labels more, especially when the mapping contradicts their prior — so "labels do not matter" is a statement about a regime, not a law.

The practical corollary stands: if your few-shot prompt underperforms, fix the format and the label space before you polish the examples.

## Recall
type: mcq
Q: Randomising the labels in a few-shot prompt barely hurts. What does that suggest the demonstrations mainly supply?
- [ ] The correct input-to-output mapping — that is exactly the channel the randomisation destroys, and performance survived it.
- [x] The label space, the kind of input to expect, and the format of a reply. — they locate a behaviour the model already has rather than teaching a new one.
- [ ] Extra training signal that updates the model's weights — no weights change at inference; the prompt is only conditioning.
