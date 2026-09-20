---
id: math.analysis.fourier.short-pulse-many-frequencies
topic: math.analysis.fourier
topics: [physics.quantum.uncertainty]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, beautiful]
tags: [uncertainty-principle, fourier-transform, gaussian, conjugate-variables, heisenberg]
hook: "Heisenberg's uncertainty principle is a theorem about Fourier transforms. The physics only supplies the exchange rate."
callback: {from: math.analysis.fourier, to: physics.quantum.uncertainty}
sources:
  - {title: "Uncertainty principle: the Fourier-analytic statement", type: wiki, url: "https://en.wikipedia.org/wiki/Uncertainty_principle"}
  - {title: "Fourier transform", type: wiki, url: "https://en.wikipedia.org/wiki/Fourier_transform"}
  - {title: "Gabor limit and time-frequency analysis", type: wiki, url: "https://en.wikipedia.org/wiki/Time%E2%80%93frequency_analysis"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember that a short pulse needs many frequencies?

You met it in Fourier analysis, probably while wondering why a sharp click sounds like a hiss. A signal concentrated in a tiny window of time cannot be built from a narrow band of frequencies: squeezing a function makes its transform spread. Squeeze it to a point and the transform is spread over everything.

That statement has no physics in it. It is a fact about a function and its transform, true of sound, of radar and of anything you can write down.

Now put a quantum particle in it. The wavefunction $\psi(x)$ is the signal; the momentum wavefunction is its Fourier transform, with the substitution $p=\hbar k$ turning frequency into momentum. Feed those two into the same inequality and you get $\sigma_x\sigma_p\ge\hbar/2$.

So the uncertainty principle is not about clumsy measurement disturbing the particle. It is the shape of $\psi$ itself, before anyone looks. Planck's constant is the exchange rate between "frequency" and "momentum" — the physics contributes the units and nothing else.

## Rigor

**Fourier form.** With $\hat f(\xi)=\int f(x)e^{-2\pi i x\xi}dx$ and $\|f\|_2=1$,
$$\left(\int (x-x_0)^2|f(x)|^2dx\right)\left(\int(\xi-\xi_0)^2|\hat f(\xi)|^2d\xi\right)\ \ge\ \frac{1}{16\pi^{2}},$$
with equality exactly for Gaussians. The proof is Cauchy-Schwarz applied to $xf$ and $f'$, plus one integration by parts using $\int (xf)\overline{f'}+\overline{(xf)}f'=-\|f\|_2^2$, and Plancherel to turn $\|f'\|_2$ into the frequency spread.

**Quantum form.** Set $\hat x\psi=x\psi$ and $\hat p\psi=-i\hbar\,\partial_x\psi$, so $[\hat x,\hat p]=i\hbar$. Robertson's inequality $\sigma_A\sigma_B\ge\frac12|\langle[\hat A,\hat B]\rangle|$ gives
$$\sigma_x\sigma_p\ \ge\ \frac{\hbar}{2},$$
saturated by Gaussian wave packets — the same extremal functions as above, because it is the same inequality.

The "short pulse, many frequencies" intuition is literally the theorem: position spread times momentum spread is bounded below, and $\hbar$ is the conversion factor.

## Recall
type: mcq
Q: What does the uncertainty principle actually say about measurement?
- [x] Nothing directly — it constrains the wavefunction's shape, and the measurement-disturbance story is a separate (also true) effect.
- [ ] That any measurement of position kicks the particle and spoils the momentum — Heisenberg's microscope is a heuristic, not this inequality.
- [ ] That our instruments are not yet precise enough — the bound is a theorem about functions and does not improve with technology.
