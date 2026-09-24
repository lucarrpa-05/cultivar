---
id: ai.theory.benign-overfitting.a-freshmans-map-trick-overfits-optimally
topic: ai.theory.benign-overfitting
format: idea
difficulty: 3
language: en
weight: medium
angles: [paradox, history]
tags: [interpolation, singular-kernel, nadaraya-watson, shepard-1968, minimax-rate]
prerequisites: [ai.ml-basics.overfitting-regularization]
hook: "It passes exactly through every noisy point, and no method homes in on the truth faster. The picture is a field of needles."
related: [ai.theory.benign-overfitting.fitting-the-noise-and-getting-away-with-it]
sources:
  - {title: "Does data interpolation contradict statistical optimality?", author: "Mikhail Belkin, Alexander Rakhlin & Alexandre B. Tsybakov", year: 2018, type: paper, url: "https://arxiv.org/abs/1806.09471"}
  - {title: "A two-dimensional interpolation function for irregularly-spaced data", author: "Donald Shepard", year: 1968, type: paper, url: "https://doi.org/10.1145/800186.810616"}
  - {title: "Inverse distance weighting", type: wiki, url: "https://en.wikipedia.org/wiki/Inverse_distance_weighting"}
dates: {written: 2026-09-23}
author: author-ai-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Shepard was a freshman when he started the SYMAP work, not necessarily in 1968; reworded the first sentence so the date attaches to the paper."}
---

# A freshman's 1968 map trick fits every noisy point and is still optimal

As a Harvard freshman, Donald Shepard rewrote the interpolation in a map-drawing program, and published it in 1968: estimate each spot as an average of the measured points, weighted by one over distance to a power. Near a measurement that weight explodes, so the map passes exactly through every point, errors included.

Fifty years later Mikhail Belkin, Alexander Rakhlin and Alexandre Tsybakov proved that a local version of this rule is optimal: in the worst case, nothing homes in on the truth faster. Picture a smooth surface with a needle rising to each noisy point. The needles are so thin that a new point almost never lands on one.

How thin is thin enough is one integral.

## Rigor

That integral is the spikes' energy; first, the estimator. Take data $Y_i=f(X_i)+\varepsilon_i$ with $X_i\in\mathbb R^d$ and the Nadaraya–Watson estimator with a singular kernel:

$$\hat f_n(x)=\frac{\sum_{i} Y_i\,K\!\big(\frac{x-X_i}{h}\big)}{\sum_{i} K\!\big(\frac{x-X_i}{h}\big)},\qquad K(u)=\|u\|^{-a}\,\mathbf 1\{\|u\|\le 1\}.$$

As $x\to X_i$ the $i$-th weight tends to infinity while the others stay bounded, so $\hat f_n(X_i)=Y_i$: exact interpolation, noise included.

**Theorem (Belkin, Rakhlin, Tsybakov).** Let $f$ be $\beta$-Hölder with $\beta\in(0,1]$, the density of $X$ bounded above and below on its support, and $\operatorname{Var}(\varepsilon\mid X)\le\sigma^2$. If $0<a<d/2$ and $h=n^{-1/(2\beta+d)}$, then at any $x_0$ in the support

$$\mathbb E\big(\hat f_n(x_0)-f(x_0)\big)^2\le C\,n^{-2\beta/(2\beta+d)},$$

the classical minimax rate for this class. (They extend it to $\beta\in(1,2]$ with a smoothness assumption on the density.)

**Where the needles enter.** Roughly, the variance of a kernel average is governed by $\int K^2$, and in polar coordinates

$$\int_{\|u\|\le1}\|u\|^{-2a}\,du=|S^{d-1}|\int_0^1 r^{\,d-1-2a}\,dr<\infty\iff a<\tfrac d2 .$$

Each spike is infinitely tall yet has finite energy: tall enough to reach every noisy $Y_i$, too thin to move the average error. The picture breaks in one place: the needles are not separate objects bolted onto a smooth fit, only what the weights do near each data point.

## Recall
type: mcq
Q: An estimator passes exactly through every noisy training point, yet converges as fast as the best smoothers. How?
- [x] Its spikes toward the noisy points are extremely narrow — fresh points almost never fall on them, so the noise is fitted in a region of almost no volume.
- [ ] It quietly skips the noisy points — no: at every training input it returns the noisy value exactly.
- [ ] The noise cancels out at the data points — there is nothing to cancel against; at a data point the fitted value is the observed one.
