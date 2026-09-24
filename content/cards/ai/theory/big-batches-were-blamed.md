---
id: ai.theory.loss-landscapes.big-batches-were-blamed
topic: ai.theory.loss-landscapes
format: story
difficulty: 2
language: en
weight: medium
angles: [mistake, numbers]
tags: [large-batch, sharp-minima, linear-scaling-rule, warmup, imagenet-in-an-hour]
prerequisites: [ai.ml-basics.gradient-training]
hook: "In 2016 the diagnosis was geometry: big batches find sharp valleys. In 2017 a change to the step size closed the gap on ImageNet."
related: [ai.ml-basics.gradient-training.a-gradient-from-32-examples]
sources:
  - {title: "On Large-Batch Training for Deep Learning: Generalization Gap and Sharp Minima", author: "Keskar, Mudigere, Nocedal, Smelyanskiy & Tang", year: 2017, type: paper, url: "https://arxiv.org/abs/1609.04836"}
  - {title: "Accurate, Large Minibatch SGD: Training ImageNet in 1 Hour", author: "Goyal, Dollár, Girshick, Noordhuis, Wesolowski, Kyrola, Tulloch, Jia & He", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.02677"}
  - {title: "A Bayesian Perspective on Generalization and Stochastic Gradient Descent", author: "Samuel L. Smith & Quoc V. Le", year: 2018, type: paper, url: "https://arxiv.org/abs/1710.06451"}
dates: {written: 2026-09-23}
author: author-ai-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved}
---

# Big batches got blamed for sharp minima. The learning rate was the culprit

In 2016 Nitish Keskar and colleagues diagnosed a real problem. Train with much bigger batches and test accuracy drops. Their explanation was geometric and appealing: big batches settle into sharp minima, small noisy batches into flat ones, and flat generalises better.

Nine months later a Facebook team trained ResNet-50 on ImageNet with batches of 8,192 images, on 256 GPUs, in one hour, and matched small-batch accuracy: 23.74% top-1 error against 23.60%. The fix was almost embarrassing. Multiply the learning rate by the same factor as the batch, and ramp up to it over the first five epochs.

Their verdict: the trouble was optimisation, not generalisation, at least up to about 8,000. Why the fix works takes two lines of algebra.

## Rigor

Here are the two lines, in Goyal et al.'s own form. Run SGD with learning rate $\eta$ for $k$ steps on batches $B_j$ of size $n$:

$$w_{t+k}=w_t-\frac{\eta}{n}\sum_{j<k}\sum_{x\in B_j}\nabla\ell(x,w_{t+j}).$$

One step on the union of those batches (size $kn$) with learning rate $\hat\eta$:

$$\hat w_{t+1}=w_t-\frac{\hat\eta}{kn}\sum_{j<k}\sum_{x\in B_j}\nabla\ell(x,w_t).$$

If the gradients barely change over those $k$ steps, $\nabla\ell(x,w_{t+j})\approx\nabla\ell(x,w_t)$, the two agree exactly when $\hat\eta=k\eta$. The assumption fails early in training, when the weights move fast, hence the warm-up. It also fails once one big step must cover ground that $k$ small steps would curve around, which is where the rule breaks: beyond about 8k images on ImageNet.

The noise view says the same. A mini-batch gradient has covariance about $\Sigma/B$, so a step injects noise of covariance $\eta^2\Sigma/B$; over a stretch of training "time" $\eta\cdot\#\text{steps}$, that is noise $\propto\eta/B$ per unit time. Smith and Le call $\eta N/B$ the noise scale. Scale $B$ without scaling $\eta$ and you quietly turn down the jitter that was being credited with finding flat minima.

## Recall
type: mcq
Q: Goyal et al. matched small-batch accuracy on ImageNet with batches of 8,192. What was the key change?
- [x] Scale the learning rate in proportion to the batch, with a gradual warm-up — $k$ small steps are roughly one big step at $k$ times the rate.
- [ ] An optimiser that hunts for flat minima — they used ordinary momentum SGD; the change was the step size.
- [ ] More epochs for the big batches — every run used 90 epochs; the big-batch runs simply took fewer, larger steps.
