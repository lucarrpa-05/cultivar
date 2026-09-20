---
id: ai.ml-basics.bias-variance.derive-it-then-watch-it-break
topic: ai.ml-basics.bias-variance
format: idea
difficulty: 3
language: en
weight: heavy
angles: [mistake, paradox]
tags: [decomposition, cross-term, overparameterization, network-width, folklore]
hook: "Four lines of algebra give bias² + variance + noise. Nothing in those lines says the two must trade off."
related: [ai.ml-basics.bias-variance.two-ways-to-be-wrong, ai.theory.double-descent.the-curve-that-shouldnt-exist]
sources:
  - {title: "Neural Networks and the Bias/Variance Dilemma", author: "Geman, Bienenstock & Doursat", year: 1992, type: paper, url: "https://doi.org/10.1162/neco.1992.4.1.1"}
  - {title: "A Modern Take on the Bias-Variance Tradeoff in Neural Networks", author: "Neal, Mittal, Baratin, Tantia, Scicluna, Lacoste-Julien & Mitliagkas", year: 2018, type: paper, url: "https://arxiv.org/abs/1810.08591"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Derive the tradeoff, then find where it stops being a law

That U-shaped curve is drawn on the first day of every statistics course and taught as though it were a theorem: more complexity, less bias, more variance, stop at the bottom. Half of it is a theorem. The other half is folklore that has been quietly false for a decade.

The theorem is the decomposition. Squared error splits, exactly and with no approximation, into three pieces: how far off you are on average, how much you jitter between samples, and noise you can never reach. Four lines of algebra, one cross-term that dies, done.

The folklore is the *tradeoff* — the claim that turning complexity up must push variance up. Geman, Bienenstock and Doursat made that case for neural networks in 1992, and it held as common sense for twenty-five years. Then in 2018 Neal and colleagues measured bias and variance directly in modern networks as width grew. Both fell.

So derive it, and watch exactly which line fails to say what everyone remembers it saying.

## Rigor

Fix $x$; write $\hat f=\hat f_S(x)$, $\bar f=\mathbb E_S[\hat f]$, $f=f(x)$, and $y=f+\varepsilon$ with $\mathbb E[\varepsilon]=0$, $\operatorname{Var}(\varepsilon)=\sigma^{2}$, $\varepsilon$ independent of $S$.

$$\mathbb E\big[(y-\hat f)^{2}\big]=\mathbb E\big[(f+\varepsilon-\hat f)^{2}\big]=\mathbb E\big[(f-\hat f)^{2}\big]+\sigma^{2},$$

since the cross-term is $2\,\mathbb E[\varepsilon]\,\mathbb E[f-\hat f]=0$. Now insert $\bar f$:

$$\mathbb E\big[(f-\hat f)^{2}\big]=\mathbb E\big[\big((f-\bar f)+(\bar f-\hat f)\big)^{2}\big]=(f-\bar f)^{2}+\mathbb E\big[(\hat f-\bar f)^{2}\big],$$

its cross-term vanishing because $\mathbb E[\bar f-\hat f]=0$ while $(f-\bar f)$ is a constant. Hence $\text{bias}^{2}+\text{variance}+\sigma^{2}$, exactly.

Every step is an identity. No symbol for "model size" appears anywhere in it. The *tradeoff* is a separate, empirical claim: that a complexity dial moves bias down and variance up, monotonically. True for polynomial degree in least squares. False for network width, where Neal et al. watch variance fall as parameters grow. And most dramatically false near the interpolation threshold, where variance spikes and then collapses — the second descent.

## Recall
type: mcq
Q: Which half of "the bias–variance tradeoff" is actually a theorem?
- [x] The decomposition — squared risk equals bias² plus variance plus noise, an algebraic identity that never once mentions model size.
- [ ] The claim that variance rises with complexity — an empirical pattern, true for polynomial degree and false for network width.
- [ ] The claim that the curve has one minimum — nothing guarantees the shape; double descent produces two.
