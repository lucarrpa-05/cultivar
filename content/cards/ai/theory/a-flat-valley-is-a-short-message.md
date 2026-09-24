---
id: ai.theory.loss-landscapes.a-flat-valley-is-a-short-message
topic: ai.theory.loss-landscapes
format: story
difficulty: 3
language: en
weight: medium
angles: [origin, human]
tags: [flat-minima, minimum-description-length, hessian, hochreiter-schmidhuber, reparametrization]
prerequisites: [math.optimization.gradient-descent, math.linear-algebra.eigen, ai.neural-nets.perceptron-mlp]
hook: "The pair who gave us LSTM spent the same year arguing that good networks are the ones you can write down in few digits."
related: [ai.theory.loss-landscapes.local-minima-are-not-the-problem, ai.theory.mdl-kolmogorov.a-model-that-costs-more-than-the-data]
sources:
  - {title: "Flat Minima", author: "Sepp Hochreiter & Jürgen Schmidhuber", year: 1997, type: paper, url: "https://www.bioinf.jku.at/publications/older/3304.pdf"}
  - {title: "Flat Minima (Neural Computation 9(1):1–42)", author: "Sepp Hochreiter & Jürgen Schmidhuber", year: 1997, type: paper, url: "https://doi.org/10.1162/neco.1997.9.1.1"}
  - {title: "Sharp Minima Can Generalize For Deep Nets", author: "Dinh, Pascanu, Bengio & Bengio", year: 2017, type: paper, url: "https://arxiv.org/abs/1703.04933"}
  - {title: "Long short-term memory", type: wiki, url: "https://en.wikipedia.org/wiki/Long_short-term_memory"}
dates: {written: 2026-09-23}
author: author-ai-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved, notes: "The ReLU rescaling loophole needs layers and weight matrices; added ai.neural-nets.perceptron-mlp to the prerequisites."}
---

# In 1997 the LSTM inventors argued that a flat valley is a short message

In 1997 Sepp Hochreiter and Jürgen Schmidhuber published LSTM, the memory cell that later powered Google's speech recognition and Translate. The same year, in the same journal, they published a stranger paper: *Flat Minima*.

Its argument was about digits. At a sharp minimum the weights must be written down precisely, or the error shoots up. In a flat valley a nudge changes nothing, so each weight needs only a few digits. A network with a short description is a simple one, and by the minimum-description-length principle simple networks should generalise. They even tried it on stock-market prediction, where it beat weight decay.

Twenty years later, four researchers found the loophole.

## Rigor

First the bit count, then the loophole. Near a minimum $w^*$, to second order,

$$L(w^*+\Delta)\approx L(w^*)+\tfrac12\,\Delta^{\top}H\,\Delta,$$

with $H$ the Hessian, eigenvalues $\lambda_1,\dots,\lambda_p>0$. Tolerate a loss increase of $\varepsilon$ and, along eigenvector $i$, you may move $|\Delta_i|\le\sqrt{2\varepsilon/\lambda_i}$. Writing a number from a range of width $A$ to precision $\delta$ costs about $\log_2(A/\delta)$ bits, so the minimum costs

$$\sum_{i=1}^{p}\log_2\frac{A}{\sqrt{2\varepsilon/\lambda_i}}=\text{const}+\tfrac12\log_2\det H$$

bits. Flat means small curvature, small $\det H$, short description. (Their actual algorithm uses a box-volume criterion; this is the idea behind it.)

**The loophole** (Dinh, Pascanu, Bengio, Bengio, 2017). In a ReLU network, replace $(W_1,W_2)$ by $(\alpha W_1,\alpha^{-1}W_2)$ with $\alpha>0$. Since $\mathrm{ReLU}(\alpha z)=\alpha\,\mathrm{ReLU}(z)$, the function computed is identical. But the Hessian block for $W_1$ scales by $\alpha^{-2}$ and the block for $W_2$ by $\alpha^{2}$, so a suitable $\alpha$ makes some directions as sharp as you like. One function, flat or sharp depending on the coordinates. A bit count in raw weight space cannot by itself be what makes it generalise; any flatness that explains generalisation has to respect symmetries like this one.

## Recall
type: mcq
Q: In Hochreiter and Schmidhuber's argument, why should a flat minimum generalise?
- [x] Its weights can be stated with low precision, so the network has a short description — and a short description is what minimum description length calls simple.
- [ ] Gradient descent moves fastest there — speed plays no role; the argument is about how many bits the weights need.
- [ ] Flatness is the same in every parametrisation — Dinh et al. showed the opposite: rescaling ReLU layers changes flatness without changing the function.
