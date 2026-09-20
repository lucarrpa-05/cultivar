---
id: math.analysis.fourier.the-conjecture-everyone-tried-to-break
topic: math.analysis.fourier
topics: [math.analysis.measure-lebesgue]
format: idea
difficulty: 5
language: en
weight: heavy
angles: [history, beautiful]
tags: [carleson-theorem, luzin-conjecture, kolmogorov, almost-everywhere, maximal-operator]
hook: "Everyone expected the counterexample. Carleson spent years hunting one, failed, and in 1966 proved the theorem instead."
sources:
  - {title: "Carleson's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Carleson%27s_theorem"}
  - {title: "On convergence and growth of partial sums of Fourier series, Acta Mathematica 116", author: "Lennart Carleson", year: 1966, type: paper, url: "https://doi.org/10.1007/BF02392815"}
  - {title: "Lennart Carleson", type: wiki, url: "https://en.wikipedia.org/wiki/Lennart_Carleson"}
dates: {written: 2026-09-19, event: 1966-01-01}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The conjecture everyone was trying to demolish

In 1915 Luzin conjectured that the Fourier series of a square-integrable function converges to it at almost every point. A weak-looking claim: not everywhere, just off a set of measure zero.

Eight years later Kolmogorov, a student, built an integrable function whose Fourier series diverges almost everywhere, and by 1926 he had one that diverges at every single point. That set the mood. The field read Kolmogorov as a direction of travel, assumed $L^{2}$ would fall next, and treated the open problem as a construction exercise.

Lennart Carleson tried to do the construction. He kept failing in an instructive way, and eventually turned around and proved the conjecture. The paper appeared in *Acta Mathematica* in 1966, fifty-one years after Luzin, and it is still considered one of the hardest arguments in analysis. Richard Hunt extended it to $L^{p}$ for every $p>1$ two years later, which pins the truth exactly: it holds above $L^{1}$ and fails at $L^{1}$.

The community had the right question and the wrong expectation for half a century.

## Rigor

**Carleson (1966).** If $f\in L^{2}(\mathbb{T})$ then $S_Nf(x)=\sum_{|n|\le N}\hat f(n)e^{inx}\to f(x)$ for almost every $x$.

Almost-everywhere convergence statements are not proved one point at a time; they are proved by bounding a **maximal operator**. Here it is the Carleson operator
$$Cf(x)=\sup_{N}\left|S_Nf(x)\right|,$$
and the theorem reduces to the weak-type estimate $\left|\{x:Cf(x)>\lambda\}\right|\le C\lambda^{-2}\|f\|_2^{2}$. Given that bound, a.e. convergence follows by the standard density argument: trigonometric polynomials are dense in $L^2$ and converge everywhere, and the maximal bound transfers the convergence to the closure.

Sharpness has two halves. Kolmogorov's $L^{1}$ example shows the hypothesis cannot be relaxed to integrability. Hunt's $L^{p}$ extension ($p>1$) shows nothing between is lost. Fefferman gave a different proof in 1973 by time-frequency decomposition, the ancestor of the "wave packet" arguments now standard in harmonic analysis.

## Recall
type: mcq
Q: What does Kolmogorov's 1926 example establish about Carleson's theorem?
- [x] That $L^{1}$ is genuinely too big — there is an integrable function whose Fourier series diverges everywhere, so integrability alone cannot suffice.
- [ ] That Carleson's theorem is false — the two live in different spaces; $L^2 \subset L^1$ on the circle, and the example is not square-integrable.
- [ ] That Fourier series never converge pointwise — they converge a.e. for every $L^p$ with $p>1$, which is most functions anyone uses.
