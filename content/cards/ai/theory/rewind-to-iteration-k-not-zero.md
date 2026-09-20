---
id: ai.theory.lottery-ticket.rewind-to-iteration-k-not-zero
topic: ai.theory.lottery-ticket
format: series
difficulty: 3
language: en
weight: medium
angles: [tool, mistake]
tags: [rewinding, stability, linear-mode-connectivity, resnet, imagenet]
hook: "The lottery is not drawn at initialisation. It is drawn a few hundred steps in, once the run has chosen a basin."
series: {id: ai.theory.lottery-ticket-arc, index: 2, total: 3, title: "The lottery ticket"}
sources:
  - {title: "Stabilizing the Lottery Ticket Hypothesis", author: "Frankle, Dziugaite, Roy & Carbin", year: 2019, type: paper, url: "https://arxiv.org/abs/1903.01611"}
  - {title: "Linear Mode Connectivity and the Lottery Ticket Hypothesis", author: "Frankle, Dziugaite, Roy & Carbin", year: 2020, type: paper, url: "https://arxiv.org/abs/1912.05671"}
  - {title: "The Lottery Ticket Hypothesis: Finding Sparse, Trainable Neural Networks", author: "Jonathan Frankle & Michael Carbin", year: 2019, type: paper, url: "https://arxiv.org/abs/1803.03635"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The linear-interpolation error barrier is from Frankle et al. 2020 (arXiv:1912.05671), not the 2019 paper; source added and the stability claim corrected."}
---

# The one-line fix that made lottery tickets work on real networks

The original result had an awkward ceiling. It worked on small networks and small datasets, and fell apart on ResNet-50 and ImageNet: the tickets simply did not train to full accuracy. For a hypothesis about neural networks in general, that is a bad look, and for a year it was the standard objection.

Frankle, Dziugaite, Roy and Carbin found the repair in 2019, and it is one line of code. Do not rewind the surviving weights to iteration 0. Rewind them to iteration $k$ — a point very early in training, between 0.1% and 7% of the way through. Change nothing else.

With that, iterative magnitude pruning finds subnetworks at 80% sparsity in ResNet-50 that complete training and match the original accuracy on ImageNet.

The claim shifts, though. The lottery is not drawn at birth. It is drawn a few hundred steps in, after some training has already happened — and the authors tie this to a property they call stability, which has a sharp definition.

## Rigor

Rewinding to iteration $k$ replaces step 3 of IMP with $\theta\leftarrow m\odot\theta_k$, where $\theta_k$ is the weight vector saved at step $k$ of the first training run.

Their diagnostic is **instability to SGD noise**: in the 2019 paper, how far two runs from $\theta_k$ drift apart in weight space; sharpened a year later (Frankle, Dziugaite, Roy & Carbin, 2020) into an error barrier. Train the same subnetwork twice starting from $\theta_k$ with two different data orders, giving $\theta_T^{(1)}$ and $\theta_T^{(2)}$. Interpolate linearly, $\theta_\alpha=(1-\alpha)\theta_T^{(1)}+\alpha\theta_T^{(2)}$, and measure the worst error on the path:

$$\text{instability}=\max_{\alpha\in[0,1]} \hat R(\theta_\alpha)\;-\;\tfrac12\Big(\hat R\big(\theta_T^{(1)}\big)+\hat R\big(\theta_T^{(2)}\big)\Big).$$

A *stable* subnetwork has instability near zero: the two runs end up in the same linearly connected basin, with no error barrier between them. At $k=0$ large networks are unstable — two runs from the same initialisation land in basins separated by a ridge. Early in training they become stable (at initialisation already, for MNIST-scale problems), and that is exactly when IMP starts finding matching tickets.

So the mask is only meaningful relative to a basin. Before the run has chosen one, there is nothing for a mask to be right about.

Next: the version of the hypothesis that needs no training at all.

## Recall
type: mcq
Q: Rewinding to iteration $k$ rather than 0 fixed lottery tickets on ImageNet. What does that change about the claim?
- [x] The winning ticket is settled a little way into training, not at initialisation — the run must first become stable to SGD noise.
- [ ] It shows the mask does not matter — the mask is still essential; what moved is which weights it gets paired with.
- [ ] It shows pruning must happen before training — pruning still follows a full training run; only the rewind point changed.
