---
id: ai.ml-basics.supervised-unsupervised.who-writes-the-labels
topic: ai.ml-basics.supervised-unsupervised
format: idea
difficulty: 1
language: en
weight: medium
angles: [practical, connection]
tags: [supervised, unsupervised, self-supervised, labels, next-token]
hook: "Photographs are free. Photographs labelled 'golden retriever' cost money — so the field learned to manufacture labels."
sources:
  - {title: "Self-supervised learning", type: wiki, url: "https://en.wikipedia.org/wiki/Self-supervised_learning"}
  - {title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", author: "Devlin, Chang, Lee & Toutanova", year: 2018, type: paper, url: "https://arxiv.org/abs/1810.04805"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Somebody had to write down the right answers

A photograph is free. A photograph labelled *golden retriever* is not: somebody looked at it and typed the word. Millions of those judgments are what a dataset like ImageNet actually is, and that human bill — not the algorithms — is what capped computer vision for years.

Split the field by where the answers come from. **Supervised**: you hold pairs, input and correct output, and learn the mapping. **Unsupervised**: you hold inputs only, so the most you can ask for is structure — groups, directions, a shorter description. **Self-supervised**: you hold inputs only, and you *manufacture* the answer by hiding part of each one. Cover a word, predict it. Cover a patch of an image, predict it. The answer was inside the data the whole time.

That third option is why models trained on raw internet text exist at all. Nobody labelled the internet. The label is the next word.

These are not three kinds of algorithm. They are three answers to one question: where does $y$ come from?

## Rigor

Write $D$ for the data distribution on $\mathcal X\times\mathcal Y$.

**Supervised.** You draw $(x_i,y_i)\sim D$ and minimise $\hat R_S(f)=\frac1n\sum_i\ell(f(x_i),y_i)$, an unbiased estimate of $\mathbb E_D[\ell(f(x),y)]$.

**Unsupervised.** You draw $x_i\sim D_{\mathcal X}$ only. There is no $\ell(f(x),y)$ to average, so the objective must be built from $x$ alone: log-likelihood $\frac1n\sum_i\log p_\theta(x_i)$, reconstruction error $\|x_i-g(f(x_i))\|^2$, within-cluster distance.

**Self-supervised.** Fix a corruption $c$ and a target extractor $t$, then do supervised learning on the pairs $\big(c(x_i),\,t(x_i)\big)$ — a genuine supervised problem on a distribution you built out of unlabelled data. Next-token prediction is $c(x)=x_{1:k}$, $t(x)=x_{k+1}$, with cross-entropy loss

$$\mathcal L=-\frac{1}{n}\sum_{i}\log p_\theta\big(x^{(i)}_{k+1}\mid x^{(i)}_{1:k}\big).$$

Averaged over positions, minimising that loss is estimating the entropy rate of the text — which is why "predict the next word" and "compress the text" turn out to be the same job.

## Recall
type: mcq
Q: What makes next-word prediction self-supervised rather than unsupervised?
- [x] The target is extracted from the input itself, so it is ordinary supervised learning on a task built out of unlabelled data — free pairs, definite right answers.
- [ ] There is no target at all, only structure found among the inputs — that describes unsupervised learning; next-word prediction has a definite correct token.
- [ ] A human labelled a small subset and the model extrapolated to the rest — that is semi-supervised learning, a different setup entirely.
