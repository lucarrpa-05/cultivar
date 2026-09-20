---
id: physics.quantum.uncertainty.you-already-know-the-uncertainty-principle
topic: physics.quantum.uncertainty
format: callback
difficulty: 2
language: en
weight: heavy
angles: [connection, mistake]
tags: [uncertainty-principle, fourier-transform, conjugate-variables, kennard, wave-packets]
callback: {from: math.analysis.fourier, to: physics.quantum.uncertainty}
hook: "A click contains every frequency; a pure tone lasts forever. You met the uncertainty principle in analysis, before anyone mentioned physics."
sources:
  - {title: "Uncertainty principle", type: wiki, url: "https://en.wikipedia.org/wiki/Uncertainty_principle"}
  - {title: "Fourier transform", type: wiki, url: "https://en.wikipedia.org/wiki/Fourier_transform"}
  - {title: "Matter wave (de Broglie relation)", type: wiki, url: "https://en.wikipedia.org/wiki/Matter_wave"}
dates: {written: 2026-09-19, event: 1927-01-01}
author: author-physics-1
reviewed: {by: reviewer-physics-2026-09-19, at: 2026-09-19, verdict: approved}
---

# You met the uncertainty principle in your analysis course

You already know this theorem, from Fourier analysis. A pure sine wave has one exact frequency and no beginning or end. A click is sharp in time and contains every frequency at once. Squeeze a function in time and its transform spreads in frequency; there is no function that is narrow in both. That is a fact about functions, provable in a page, with no physics anywhere in it.

Now add one physical input, de Broglie's: a particle's momentum *is* its spatial frequency, $p = \hbar k$. The wavefunction in position and the wavefunction in momentum are Fourier transforms of each other.

Everything follows. A particle with a sharply defined momentum is a pure tone: spread over all space. A particle at a definite point is a click: containing every momentum. Neither is mystical, and neither has anything to do with clumsy instruments.

Which kills the popular version. Heisenberg's 1927 microscope story — you disturb what you measure — describes a real effect, but it is not this. The inequality is a property of the state itself, true before anyone looks.

## Rigor

For $f\in L^2(\mathbb{R})$ with $\|f\|_2=1$, the classical Fourier uncertainty is

$$\left(\int x^2|f(x)|^2dx\right)\left(\int \xi^2|\hat f(\xi)|^2 d\xi\right) \ge \frac{1}{16\pi^2},$$

with equality precisely for Gaussians. Substituting $\hat\psi(p)$ for the momentum representation, $p = \hbar k$, gives Kennard's 1927 form

$$\sigma_x\,\sigma_p \ge \frac{\hbar}{2}.$$

Robertson's 1929 generalisation shows where it really comes from: for any observables, $\sigma_A\sigma_B \ge \tfrac12|\langle[A,B]\rangle|$, and $[\hat x,\hat p]=i\hbar$ delivers the constant. So "conjugate variables" means "non-commuting operators", and the Fourier pairing is the special case in which one is the generator of translations of the other.

The consequence you can see: put an electron in a box of atomic size, $\Delta x \approx 10^{-10}$ m. Then $\Delta p \ge \hbar/2\Delta x \approx 5\times10^{-25}$ kg m/s, giving a kinetic energy of order a few eV. Confining the electron *costs* energy, and that cost, balanced against the Coulomb attraction, is what sets the size of every atom. Matter has a volume because clicks are expensive.

## Recall
type: mcq
Q: What is wrong with explaining the uncertainty principle as "measuring a particle disturbs it"?
- [ ] Nothing — that is exactly what the inequality states. — measurement disturbance is a real and separate effect, with its own (different) inequalities.
- [x] The bound is a property of the state's Fourier structure and holds whether or not anyone measures. — position and momentum amplitudes are transforms of each other; no apparatus appears in the derivation.
- [ ] Because measurement in quantum mechanics is perfectly gentle. — measurements certainly can disturb; the point is that the inequality does not depend on it.
- [ ] Because the principle only applies to light, not matter. — it applies to any pair of non-commuting observables, for any system.
