---
id: ai.theory.ntk.infinitely-wide-means-kernel
topic: ai.theory.ntk
format: idea
difficulty: 4
language: en
weight: heavy
angles: [beautiful, connection]
tags: [neural-tangent-kernel, lazy-training, infinite-width, linearization, jacot]
hook: "In the wide limit the weights barely move, the network becomes its own linearisation, and training turns into kernel regression."
sources:
  - {title: "Neural Tangent Kernel: Convergence and Generalization in Neural Networks", author: "Jacot, Gabriel & Hongler", year: 2018, type: paper, url: "https://arxiv.org/abs/1806.07572"}
  - {title: "Wide Neural Networks of Any Depth Evolve as Linear Models Under Gradient Descent", author: "Lee, Xiao, Schoenholz, Bahri, Novak, Sohl-Dickstein & Pennington", year: 2019, type: paper, url: "https://arxiv.org/abs/1902.06720"}
  - {title: "On Exact Computation with an Infinitely Wide Neural Net", author: "Arora, Du, Hu, Li, Salakhutdinov & Wang", year: 2019, type: paper, url: "https://arxiv.org/abs/1904.11955"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Make a network infinitely wide and it turns into a kernel machine

Here is a strange and exact fact. Take a neural network and widen its hidden layers without limit, keeping the standard initialisation scaling. In the limit, training with gradient descent stops being mysterious: the whole trajectory is governed by a fixed kernel, and the function you end with is ordinary kernel regression.

The reason is that in a very wide network no individual weight has far to travel. The output is a sum over enormously many units, so a tiny nudge to each is enough to move it — and the network's tangent, its derivative with respect to the parameters, stays essentially frozen at its initial value for the entire run. A model whose derivative never changes is a linear model in disguise, and gradient descent on a linear model with squared loss is a solved problem.

Jacot, Gabriel and Hongler named the object in 2018: the neural tangent kernel.

It is beautiful, it is exact, and it is not what real networks do.

## Rigor

For a network $f(x;\theta)$, define the **neural tangent kernel**

$$\Theta(x,x')=\big\langle\nabla_\theta f(x;\theta),\ \nabla_\theta f(x';\theta)\big\rangle .$$

**Jacot et al. (2018).** Under NTK parameterisation, as all hidden widths go to infinity: (i) at initialisation $\Theta$ converges to a deterministic kernel $\Theta_\infty$ depending only on the architecture and nonlinearity, and (ii) $\Theta$ stays constant throughout gradient-descent training.

Training is then linear. Under gradient flow with squared loss, the outputs on the training set obey

$$\frac{d f_t(X)}{dt}=-\Theta_\infty\big(f_t(X)-y\big)\ \Longrightarrow\ f_t(X)=y+e^{-\Theta_\infty t}\big(f_0(X)-y\big),$$

converging along the eigendirections of $\Theta_\infty$ at rates given by its eigenvalues, with the $t\to\infty$ predictor being kernel regression with $\Theta_\infty$. Lee et al. (2019) show finite-width networks follow this to $O(1/\sqrt{\text{width}})$.

Why it is not the end of the story. The regime is *lazy*: the features $\nabla_\theta f$ never change, so by construction the network learns no representations — and Chizat, Oyallon and Bach argue laziness is an artifact of the scaling rather than of width. Empirically, Arora et al. computed the convolutional NTK exactly on CIFAR-10 and landed about six points below the corresponding finite network. Whatever makes deep learning work lives in the gap the kernel cannot see.

## Recall
type: mcq
Q: In the infinite-width limit, why does training become a solved linear problem?
- [x] The tangent $\nabla_\theta f$ stops changing during training — a model with a constant derivative is linear in a fixed feature map, and descent on it is kernel regression.
- [ ] The loss becomes convex in the weights — it does not; what becomes linear is the model in a frozen feature map, which is a different statement.
- [ ] Infinite width lets the network reproduce the training data exactly — it does interpolate, but that is a consequence, not the reason the dynamics are solvable.
