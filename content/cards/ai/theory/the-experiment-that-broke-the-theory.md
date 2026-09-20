---
id: ai.theory.generalization-bounds-deep.the-experiment-that-broke-the-theory
topic: ai.theory.generalization-bounds-deep
format: series
difficulty: 3
language: en
weight: medium
angles: [paradox, mistake]
tags: [random-labels, capacity, uniform-convergence, zhang-2017, memorization]
prerequisites: [ai.ml-basics.overfitting-regularization, ai.ml-basics.bias-variance]
hook: "If a network can memorise pure noise, then nothing about its architecture can explain why it generalises."
series: {id: ai.theory.why-huge-models-generalize, index: 1, total: 6, title: "Why huge models generalize"}
sources:
  - {title: "Understanding deep learning requires rethinking generalization", author: "Zhang, Bengio, Hardt, Recht & Vinyals", year: 2017, type: paper, url: "https://arxiv.org/abs/1611.03530"}
  - {title: "Understanding deep learning (still) requires rethinking generalization", author: "Zhang, Bengio, Hardt, Recht & Vinyals", year: 2021, type: paper, url: "https://doi.org/10.1145/3446776"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# They replaced every label with a coin flip. The network learned it anyway.

In 2016 Chiyuan Zhang, Samy Bengio, Moritz Hardt, Benjamin Recht and Oriol Vinyals ran an experiment that ought to have been boring. Take CIFAR-10. Throw away the labels and replace them with random ones: this truck is now permanently a *frog*, with no pattern to discover. Train a standard convolutional network.

It fit them. Zero training error, every random label memorised. Then they pushed harder — replace the *images* with pure Gaussian noise. Still fit. Turn on weight decay, dropout, data augmentation, every regulariser in the box. Still fit, only slower.

That is a problem, and not a small one. Every classical account of why deep networks generalise is a claim about the *class of functions*: this architecture can only express well-behaved things, so fitting it to data is safe. A class that can fit any labelling of fifty thousand images expresses anything at all. Whatever is protecting the network on real data, it is not the architecture.

And the same network, on real labels, generalises beautifully. So the explanation lives somewhere else entirely.

## Rigor

The experiment kills a whole style of argument. A uniform-convergence bound has the form: with probability $1-\delta$, simultaneously for every $h$ in the class $\mathcal H$,

$$R(h)\ \le\ \hat R_S(h)+\mathcal C(\mathcal H,n,\delta),$$

where $\mathcal C$ depends on the class and the sample size, but not on which $h$ you got or what the labels were.

Fitting random labels says exactly this: for every labelling $y\in\{1,\dots,10\}^{n}$ there is an $h\in\mathcal H$ with $\hat R_S(h)=0$. So $\mathcal H$ shatters the sample, its VC dimension is at least $n$, and any $\mathcal C$ built from it exceeds $1$ — a guarantee reading "test error at most 400%".

Zhang et al. also nail the expressivity side: a two-layer ReLU network with $2n+d$ parameters can realise *any* labelling of $n$ points in $\mathbb R^{d}$. The capacity is not an artifact of depth or of convolutions; it arrives as soon as parameters outnumber data points, which they always do.

The conclusion is narrow and fatal. No bound depending only on the architecture can explain deep generalisation, because the architecture is equally happy with noise. The explanation has to depend on the data, or on the algorithm, or both.

Next: what the classical theory actually promised — and why it was so reasonable to believe.

## Recall
type: mcq
Q: Why does "a CNN can fit random labels" break capacity-based generalization bounds?
- [x] Such bounds charge for what the class *can* express, and a class fitting every labelling of the sample has capacity at least $n$ — the bound exceeds 1 and says nothing.
- [ ] It shows the network was trained badly — the same network is state of the art on the true labels; the memorisation is a capability, not a bug.
- [ ] It shows regularization does not work — regularizers still buy a few points; what fails is the claim that they are what makes generalization possible.
