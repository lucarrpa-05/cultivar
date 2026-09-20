---
id: math.analysis.fourier.the-overshoot-that-never-leaves
topic: math.analysis.fourier
topics: [math.analysis.uniform-convergence]
format: idea
difficulty: 3
language: en
weight: medium
angles: [weird, numbers]
tags: [gibbs-phenomenon, square-wave, overshoot, wilbraham, partial-sums]
hook: "Add a thousand terms to the Fourier series of a square wave and the little spike near the jump is still exactly 8.95% too tall."
sources:
  - {title: "Gibbs phenomenon", type: wiki, url: "https://en.wikipedia.org/wiki/Gibbs_phenomenon"}
  - {title: "Sine integral", type: wiki, url: "https://en.wikipedia.org/wiki/Trigonometric_integral"}
  - {title: "Josiah Willard Gibbs", type: wiki, url: "https://en.wikipedia.org/wiki/Josiah_Willard_Gibbs"}
dates: {written: 2026-09-19, event: 1899-01-01}
diagram: {file: math/gibbs-overshoot.svg, caption: "Partial sums with 5, 21 and 101 terms: the spike gets thinner and slides toward the jump, but its height does not move.", alt: "Three oscillating curves approximating a flat line of height one, each with a spike near the left edge; all three spikes reach the same height of about 1.18"}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Dirichlet kernel: the log N growth is the Lebesgue constant, not the total variation. Also fixed a distractor: 1.1790 is the peak for the plus/minus 1 square wave, not a unit jump."}
---

# The overshoot that refuses to shrink

Build the Fourier series of a square wave and plot the partial sums. Near the jump, the approximation shoots past the target, comes back, wobbles, settles. Add more terms and the wobble narrows — but the first spike does not get shorter. It stays about 9% above the top of the jump, forever.

Not a numerical artefact and not a convergence failure. The series does converge at every point: fix an $x$ away from the jump and the values do go to the right number. The spike keeps up by *moving*, sliding toward the discontinuity as the terms accumulate, so it is never sitting at any fixed $x$ long enough to break pointwise convergence.

That is what non-uniform convergence looks like when you draw it. The sup norm of the error never goes to zero, which is precisely why it does not.

Henry Wilbraham described it in 1848 and was ignored. Gibbs published it in 1899 after an exchange in *Nature* about Michelson's harmonic analyser, and Bôcher gave it the name in 1906. The constant is not round.

## Rigor

For the odd square wave of height $\pm1$, $\;s_N(x)=\frac{4}{\pi}\sum_{k\ \mathrm{odd}}^{N}\frac{\sin kx}{k}$. The first maximum sits at $x_N\approx\pi/(N+1)$ and
$$\lim_{N\to\infty}s_N(x_N)=\frac{2}{\pi}\int_0^{\pi}\frac{\sin t}{t}\,dt=\frac{2}{\pi}\,\mathrm{Si}(\pi)=1.178979\ldots$$

The excess over $1$ is $0.17898$, and since the jump has size $2$ the overshoot is
$$\frac{\mathrm{Si}(\pi)}{\pi}-\frac12=0.0894898\ldots\ \ (8.949\%)$$
of the jump — the Wilbraham-Gibbs constant, the same for every jump discontinuity of every piecewise-smooth function.

The mechanism, in one sentence: the partial sum is the convolution of the wave with the Dirichlet kernel, the kernel has an integral of $1$ but an absolute integral (the Lebesgue constant) that grows like $\log N$, and its first side lobe contributes a fixed excess no matter how tight it gets. Cesàro averaging the partial sums (Fejér) replaces the Dirichlet kernel with a positive one and the overshoot vanishes.

## Recall
type: mcq
Q: Why does the Gibbs spike not contradict pointwise convergence?
- [x] The spike moves toward the jump as $N$ grows — no fixed $x$ keeps a large error, so every point converges while the sup of the error does not.
- [ ] The spike does shrink, just very slowly — its height tends to a fixed constant, about $1.1790$ for the square wave running between $\pm1$.
- [ ] The series diverges at the jump itself — it converges there too, to the midpoint of the two one-sided values.
