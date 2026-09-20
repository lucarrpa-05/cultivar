---
id: ai.ml-basics.supervised-unsupervised.labels-for-free
topic: ai.ml-basics.supervised-unsupervised
format: fact
difficulty: 2
language: en
weight: light
angles: [weird, practical]
tags: [self-supervised, masked-language-modeling, bert, pretraining]
hook: "Nobody labelled the internet — so the objective quietly stole its labels from the text itself."
related: [ai.ml-basics.supervised-unsupervised.who-writes-the-labels]
sources:
  - {title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", author: "Devlin, Chang, Lee & Toutanova", year: 2018, type: paper, url: "https://arxiv.org/abs/1810.04805"}
  - {title: "Self-supervised learning", type: wiki, url: "https://en.wikipedia.org/wiki/Self-supervised_learning"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The unsupervised revolution was supervised all along

Language models get filed under "unsupervised" because nobody annotated the internet. But the training objective is a textbook supervised one: input, correct answer, cross-entropy loss. The trick is that the answer is stolen from the input. BERT did it in 2018 by masking 15% of the tokens in each sentence at random and asking the model to guess them back. The sentence grades itself, and the labels are free at internet scale.

## Recall
type: reveal
Q: Where do the labels in self-supervised learning come from?
A: From the input. You corrupt each example in a fixed way — mask a token, hide the next word, cut out a patch — and the hidden piece *is* the label. No annotator, and as much data as you can download.
