---
id: ai.theory.generalization-bounds-deep.a-bound-that-says-four-hundred-percent
topic: ai.theory.generalization-bounds-deep
format: series
difficulty: 4
language: en
weight: heavy
angles: [paradox, numbers]
tags: [vacuous-bounds, pac-bayes, vc-dimension, dziugaite-roy, margin-bounds]
hook: "Plug a real network's parameter count into the classical theorem and it guarantees nothing. Not approximately nothing."
series: {id: ai.theory.why-huge-models-generalize, index: 3, total: 6, title: "Why huge models generalize"}
sources:
  - {title: "Nearly-tight VC-dimension and pseudodimension bounds for piecewise linear neural networks", author: "Bartlett, Harvey, Liaw & Mehrabian", year: 2019, type: paper, url: "https://arxiv.org/abs/1703.02930"}
  - {title: "Computing Nonvacuous Generalization Bounds for Deep (Stochastic) Neural Networks with Many More Parameters than Training Data", author: "Gintare Karolina Dziugaite & Daniel M. Roy", year: 2017, type: paper, url: "https://arxiv.org/abs/1703.11008"}
  - {title: "Fantastic Generalization Measures and Where to Find Them", author: "Jiang, Neyshabur, Mobahi, Krishnan & Bengio", year: 2019, type: paper, url: "https://arxiv.org/abs/1912.02178"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Numbers now match the title and episode 1: 10^6 weights on 5x10^4 images gives ~4.5, 14 at 10^7; added the Bartlett et al. lower bound."}
---

# The honest bound for a real network says "error at most 400%"

Take last episode's bound, extend it to infinite classes the standard way, and feed it a network. The capacity term scales with the number of weights — a million for a modest convolutional network. The number of training images is fifty thousand. The ratio goes under a square root, and the theorem announces: test error is at most training error, plus about four.

Test error is a probability. It cannot exceed 1. The bound is *vacuous* — true, useless, and not marginally so. It is off by a factor of four here, and of fourteen for a ten-million-weight network: not a bound that needs tightening, but one that is measuring the wrong thing.

This is the honest position of classical theory applied to deep learning. Nothing it says is false. It charges you for a class so enormous that the guarantee dissolves, and the random-label experiment confirmed the class really is that enormous.

Not everyone gave up. In 2017 Dziugaite and Roy got the first non-vacuous numbers for networks with millions of parameters, and *how* they did it points at the missing ingredient.

## Rigor

For infinite classes, $\ln|\mathcal H|$ is replaced by a combinatorial capacity. With VC dimension $d$, with probability $1-\delta$, for all $h\in\mathcal H$:

$$R(h)\ \le\ \hat R_S(h)+O\!\left(\sqrt{\frac{d\log(n/d)+\log(1/\delta)}{n}}\right).$$

Bartlett, Harvey, Liaw and Mehrabian proved that a ReLU network with $W$ weights and $L$ layers has $d=O(WL\log W)$, with a lower bound $\Omega(WL\log(W/L))$ — so this is not slack in the analysis. Put $W=10^{6}$ and $n=5\times10^{4}$: even ignoring the $L\log W$ factor, the square root is already of order $\sqrt{10^{6}/5\!\times\!10^{4}}\approx 4.5$, and at $W=10^{7}$ it is $14$.

Norm- and margin-based bounds replace $W$ by quantities like $\prod_{l}\|W_l\|/\gamma$. Sharper in principle, still typically vacuous at scale, and Jiang et al. found that many such measures correlate poorly with measured generalisation across thousands of trained models.

The exception is instructive. Dziugaite and Roy optimised a **PAC-Bayes** bound,

$$\mathbb E_{w\sim Q}[R(w)]\ \le\ \mathbb E_{w\sim Q}[\hat R_S(w)]+\sqrt{\frac{\mathrm{KL}(Q\,\|\,P)+\ln\frac{2\sqrt n}{\delta}}{2(n-1)}},$$

directly over a distribution $Q$ concentrated around the weights SGD found. It became non-vacuous only once it was allowed to depend on *that particular solution* rather than on the architecture.

Which is the clue. Something about the solution, not the class.

Next: a curve that no U-shape can produce.

## Recall
type: mcq
Q: What made Dziugaite and Roy's PAC-Bayes bound non-vacuous where VC bounds are not?
- [x] It depends on the particular solution found by SGD, through a KL term measuring how far those weights sit from the prior — not on what the architecture could have expressed.
- [ ] It uses a much larger training set — same data; what changed is what the bound is allowed to look at.
- [ ] It abandons the probabilistic guarantee — it is still a genuine high-probability bound, just a data- and algorithm-dependent one.
