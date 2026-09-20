---
id: math.probability.clt.why-the-bell-curve-keeps-showing-up
topic: math.probability.clt
format: idea
difficulty: 3
language: en
weight: heavy
angles: [beautiful, tool, mistake]
tags: [central-limit-theorem, berry-esseen, heavy-tails, stable-laws, galton]
hook: "The bell curve is not a law of nature. It is what a sum looks like when no single term matters much."
sources:
  - {title: "Central limit theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Central_limit_theorem"}
  - {title: "Berry–Esseen theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Berry%E2%80%93Esseen_theorem"}
  - {title: "Stable distribution", type: wiki, url: "https://en.wikipedia.org/wiki/Stable_distribution"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Why the bell curve keeps showing up, and when it doesn't

Drop a ball into Galton's board of pegs. At each row it bounces left or right; at the bottom, the balls pile into a bell. Nothing about a peg is bell-shaped. The shape comes from adding.

That is the whole content of the central limit theorem, and it explains why the normal distribution is everywhere measurement errors, heights, or test scores are. Each is a sum of many small independent nudges, and the sum forgets what the nudges looked like. Skewed, discrete, bimodal — it does not matter. Add enough and rescale, and you get the same curve.

The forgetting is the useful part and also the dangerous part. The theorem promises the middle of the distribution, not the edges, and it quietly requires that no single term dominates the sum.

Take away either condition and you do not get a wider bell. You get a different animal entirely.

## Rigor

**Theorem.** If $X_1,X_2,\dots$ are i.i.d. with mean $\mu$ and finite variance $\sigma^2>0$, then
$$\frac{\sum_{i=1}^{n}X_i-n\mu}{\sigma\sqrt{n}}\ \xrightarrow{\ d\ }\ \mathcal{N}(0,1).$$
Convergence is in distribution — of the *rescaled* sum, not the sum.

**How fast.** Berry–Esseen: if $\rho=\mathbb{E}|X_1-\mu|^{3}<\infty$, then
$$\sup_{x}\left|F_n(x)-\Phi(x)\right|\le \frac{C\rho}{\sigma^{3}\sqrt{n}},$$
with $C<0.5$. Note this is an *absolute* error on the CDF. At $x=5$ the true tail is about $3\times10^{-7}$, so a uniform error of $10^{-3}$ says nothing at all about it. Normal approximations in the far tail are guesses wearing a theorem's clothes.

**Failure mode one: infinite variance.** With tails like $x^{-\alpha}$, $\alpha<2$, the limit is an $\alpha$-stable law, not a Gaussian. Cauchy is the case $\alpha=1$: the rescaled sum is Cauchy again, forever.

**Failure mode two: one term dominating.** Lindeberg's condition is the honest hypothesis — no single summand may carry a non-vanishing share of the variance. Independence can also be relaxed (martingale and mixing versions exist), but dominance cannot: a sum of one big thing and many small ones looks like the big thing.

## Recall
type: mcq
Q: Financial returns are often modelled as normal, and crashes keep being "twenty-sigma events". Which CLT assumption is the suspect?
- [x] Finite variance with no dominant term — heavy-tailed returns converge to stable laws instead, and those have fat tails by construction.
- [ ] Independence alone — dependence matters, but martingale versions of the CLT still give a Gaussian; tail weight is the sharper problem.
- [ ] That $n$ was too small — decades of daily returns is an enormous $n$; more data does not fix the wrong limit law.
- [ ] That returns are not centred — centring is trivial to fix and changes nothing about the shape of the tails.
