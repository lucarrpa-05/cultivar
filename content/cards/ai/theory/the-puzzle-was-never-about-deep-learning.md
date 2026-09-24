---
id: ai.theory.benign-overfitting.the-puzzle-was-never-about-deep-learning
topic: ai.theory.benign-overfitting
format: story
difficulty: 3
language: en
weight: medium
angles: [mistake, paradox]
tags: [kernel-machines, rkhs-norm, label-noise, belkin-2018, norm-bounds]
prerequisites: [ai.ml-basics.kernels-svm, ai.ml-basics.overfitting-regularization]
hook: "Everyone searched deep networks for the secret of harmless overfitting. It was sitting in a method with decades of theory behind it."
related: [ai.theory.generalization-bounds-deep.the-experiment-that-broke-the-theory]
sources:
  - {title: "To understand deep learning we need to understand kernel learning", author: "Mikhail Belkin, Siyuan Ma & Soumik Mandal", year: 2018, type: paper, url: "https://arxiv.org/abs/1802.01396"}
  - {title: "Understanding deep learning requires rethinking generalization", author: "Zhang, Bengio, Hardt, Recht & Vinyals", year: 2017, type: paper, url: "https://arxiv.org/abs/1611.03530"}
dates: {written: 2026-09-23}
author: author-ai-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Glossed fat-shattering dimension in the proof idea, since the listed prerequisites do not cover it."}
---

# The overfitting puzzle was never about deep learning

By 2017 the puzzle had a suspect. Deep networks could fit pure-noise labels yet generalised on real data, and theory had no explanation. The search focused on what made deep learning special: depth, stochastic gradients, architecture.

In February 2018 Mikhail Belkin, Siyuan Ma and Soumik Mandal ran the test on kernel machines instead, a shallow method with decades of theory behind it. Trained to zero error on deliberately corrupted labels, they still scored close to the best achievable. The mystery had been sitting in a method everyone thought they understood. Their title: *To understand deep learning we need to understand kernel learning*.

The textbook bound breaks for a reason you can compute.

## Rigor

The computation is about a norm. The textbook guarantee for a kernel classifier charges for its norm in the reproducing-kernel Hilbert space $\mathcal H$; for a bounded kernel and $\|f\|_{\mathcal H}\le R$, margin bounds read, schematically,

$$\text{test error}\ \le\ \text{training loss}+O\!\Big(\frac{R}{\sqrt n}\Big).$$

The minimum-norm interpolant is $f=\sum_i\alpha_iK(x_i,\cdot)$ with $\alpha=\mathbf K^{-1}y$, where $\mathbf K_{ij}=K(x_i,x_j)$, and $\|f\|^2_{\mathcal H}=y^{\top}\mathbf K^{-1}y$. Label noise $\varepsilon$ with variance $\sigma^2$, independent across points, spreads over every eigenvector of $\mathbf K$, including those with tiny eigenvalues: $\mathbb E\,\varepsilon^{\top}\mathbf K^{-1}\varepsilon=\sigma^2\operatorname{tr}\mathbf K^{-1}$, which is huge for a smooth kernel.

**Theorem (Belkin, Ma, Mandal).** If $y$ is not a deterministic function of $x$ on a set of positive measure, then with high probability every Gaussian-kernel classifier that fits the training set, with margin $t$ on a fixed fraction of it, satisfies

$$\|h\|_{\mathcal H}>A\,e^{B\,n^{1/d}}\qquad(A,B>0).$$

Proof idea: a ball of radius $R$ in this $\mathcal H$ has fat-shattering dimension (VC dimension with a margin) only $O(\log^d R)$, while fitting noisy labels with a margin needs dimension of order $n$. So $\log^d R\gtrsim n$.

Put that $R$ into any bound polynomial in the norm and the right side diverges as $n$ grows, while measured test error sits near the noise level. In their experiments, adding just 1% label noise raised the norm by more than an order of magnitude. The bound is not merely loose. It is measuring the wrong thing.

## Recall
type: mcq
Q: What did Belkin, Ma and Mandal's kernel experiments reveal about the overfitting puzzle?
- [x] It is not special to deep learning — kernel machines fitted exactly to noisy labels also generalise well, and their textbook norm bounds blow up all the same.
- [ ] Kernels overfit catastrophically, unlike networks — test error stayed near the noise level, the same benign-looking behaviour.
- [ ] The bounds were fine and the experiments flawed — the norms provably grow nearly exponentially with $n$, so the bounds say nothing while test error stays low.
