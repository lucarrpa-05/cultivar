---
id: math.probability.brownian.a-path-with-no-direction-anywhere
topic: math.probability.brownian
topics: [math.analysis.differentiation]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [weird, beautiful, history]
tags: [brownian-motion, wiener-process, quadratic-variation, bachelier, nowhere-differentiable]
hook: "Bachelier modelled it for stock prices in 1900, five years before Einstein used it to argue that atoms are real. Both beat the mathematics."
sources:
  - {title: "Wiener process", type: wiki, url: "https://en.wikipedia.org/wiki/Wiener_process"}
  - {title: "Louis Bachelier", type: wiki, url: "https://en.wikipedia.org/wiki/Louis_Bachelier"}
  - {title: "Brownian motion", type: wiki, url: "https://en.wikipedia.org/wiki/Brownian_motion"}
dates: {written: 2026-09-19, event: 1905-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Brown watched the particles shaken out of pollen grains, not the grains; and Einstein modelled suspended particles, not pollen."}
---

# A path that goes everywhere and has a direction nowhere

Robert Brown watched the minute particles shaken out of pollen grains jitter in water in 1827 and could not explain it. Louis Bachelier wrote the mathematics of that jitter in his 1900 thesis, supervised by Poincaré, for a completely different purpose: predicting prices on the Paris Bourse. Einstein derived it independently in 1905 to argue that atoms are real, and Perrin's measurements of the effect won a Nobel Prize in 1926.

Nobody had yet proved the object they were all using exists. Wiener did that in 1923.

And what he built is genuinely strange. The path is continuous — you can draw it without lifting the pen — and yet at no point does it have a slope. Zoom in on any piece and it looks statistically identical to the whole: the jitter never resolves into a direction, at any magnification.

You have met a continuous nowhere-differentiable function before, as Weierstrass's hand-built monster. Brownian motion says the monster is not exotic. It is what a random path looks like with probability 1.

## Rigor

**Definition.** A standard Brownian motion $(W_t)_{t\ge0}$ has $W_0=0$, independent increments, $W_t-W_s\sim\mathcal{N}(0,t-s)$ for $s<t$, and almost surely continuous paths.

**Scaling.** $\left(c^{-1/2}W_{ct}\right)_{t\ge0}$ is again a standard Brownian motion. That is the self-similarity from the intuition, stated exactly: zooming in by $c$ in time and $\sqrt{c}$ in space returns the same law.

**Quadratic variation.** Over a partition of $[0,t]$ with mesh $\to 0$,
$$\sum_i\left(W_{t_{i+1}}-W_{t_i}\right)^2 \longrightarrow t \quad\text{in probability}.$$
For a differentiable function this sum tends to 0. A non-zero quadratic variation is therefore already a proof that $W$ is not differentiable — and it is the reason Itô calculus needs a second-order term, $dW^2=dt$, where ordinary calculus has none.

**Nowhere differentiable.** Paley, Wiener and Zygmund (1933): almost surely, $W$ is differentiable at no point whatsoever. The heuristic is the scaling law: over an interval of length $h$ the displacement is of order $\sqrt{h}$, so the difference quotient is of order $h^{-1/2}\to\infty$. Paths are Hölder continuous of every order $\alpha<\tfrac12$ and of no order $\alpha\ge\tfrac12$.

## Recall
type: mcq
Q: Why must Brownian paths fail to be differentiable?
- [x] Displacement over a time step $h$ scales like $\sqrt{h}$ — so the difference quotient behaves like $h^{-1/2}$ and blows up.
- [ ] Because the paths are discontinuous — they are continuous almost surely; that is what makes the result surprising.
- [ ] Because increments are independent — independence alone permits smooth paths in other models; the $\sqrt{h}$ scaling is the culprit.
- [ ] Only at countably many points, as with Weierstrass's function — Weierstrass's function is also nowhere differentiable, and so is almost every Brownian path.
