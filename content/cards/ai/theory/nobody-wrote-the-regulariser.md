---
id: ai.theory.implicit-regularization.nobody-wrote-the-regulariser
topic: ai.theory.implicit-regularization
format: series
difficulty: 4
language: en
weight: heavy
angles: [connection, beautiful]
tags: [implicit-bias, max-margin, soudry-2018, logistic-loss, separable-data]
hook: "Keep training after the loss is already tiny and the classifier keeps moving — toward the maximum margin, logarithmically slowly."
series: {id: ai.theory.why-huge-models-generalize, index: 6, total: 6, title: "Why huge models generalize"}
related: [ai.ml-basics.kernels-svm.the-widest-street, ai.theory.generalization-bounds-deep.the-experiment-that-broke-the-theory]
sources:
  - {title: "The Implicit Bias of Gradient Descent on Separable Data", author: "Soudry, Hoffer, Nacson, Gunasekar & Srebro", year: 2018, type: paper, url: "https://arxiv.org/abs/1710.10345"}
  - {title: "In Search of the Real Inductive Bias: On the Role of Implicit Regularization in Deep Learning", author: "Neyshabur, Tomioka & Srebro", year: 2015, type: paper, url: "https://arxiv.org/abs/1412.6614"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Nobody wrote the regulariser. The optimiser is the regulariser.

Five episodes ago a network memorised random labels and left classical theory with nothing to say. The missing ingredient was never in the architecture. It is in the algorithm.

Soudry, Hoffer, Nacson, Gunasekar and Srebro proved the cleanest version in 2018. Take logistic regression with no regularisation at all, on linearly separable data. The loss can only be driven toward zero by sending the weights to infinity, so gradient descent never converges. But the *direction* does converge — and it converges to the maximum-margin separator, the same answer a hard-margin SVM computes by solving a quadratic program.

Nobody put a margin in the objective. Gradient descent chose it, because that is the direction in which the loss decays fastest.

That is the shape of the whole answer. Training error stops being informative the moment it hits zero, but the optimiser keeps working, drifting toward a preference nobody typed. The architecture is willing to memorise noise; where the drift goes is decided by the data.

## Rigor

Logistic loss $L(w)=\sum_i\log\!\big(1+e^{-y_iw^{\top}x_i}\big)$ on separable data, gradient descent with a small constant step.

**Theorem (Soudry et al., 2018).** $\|w(t)\|\to\infty$, and

$$\frac{w(t)}{\|w(t)\|}\ \longrightarrow\ \frac{\hat w}{\|\hat w\|},\qquad \hat w=\arg\min_{w}\|w\|^{2}\ \text{ s.t. }\ y_iw^{\top}x_i\ge1\ \forall i,$$

the hard-margin SVM solution. The rate is brutal: $w(t)=\hat w\log t+\rho(t)$ with $\rho$ bounded, so the margin approaches its optimum like $O(1/\log t)$. Multiplying your compute by $e$ buys one unit of $\log t$.

Why it happens: once every point is classified correctly, the loss is dominated by $e^{-y_iw^{\top}x_i}$ from the *closest* points, so almost the entire gradient is their contribution. Descent keeps pushing away from the nearest examples, which is what maximising a margin means.

Two consequences. Training loss can keep falling while validation loss *rises* and the classifier still improves — so early stopping on loss is not obviously right. And the bias is algorithm-specific: plain gradient descent gives $\ell_2$ max-margin, coordinate descent and AdaBoost give $\ell_1$, adaptive methods give something else again.

Episode 1's puzzle was that architecture cannot explain generalisation. It never could. The bias lives in the optimiser, and it is nowhere in your code.

## Recall
type: mcq
Q: Gradient descent on separable logistic regression never converges. So what does?
- [x] The direction of the weight vector, to the maximum-margin separator — the norm diverges but $w(t)/\|w(t)\|$ has a limit.
- [ ] The loss, to a positive constant — the loss goes to zero, which is exactly why the norm must diverge.
- [ ] Nothing at all; the run is unstable — it is perfectly stable, merely logarithmically slow.
