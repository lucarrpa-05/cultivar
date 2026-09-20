---
id: ai.theory.rademacher.fit-coin-flips-to-measure-yourself
topic: ai.theory.rademacher
format: idea
difficulty: 4
language: en
weight: heavy
angles: [connection, tool]
tags: [rademacher-complexity, data-dependent, margin-bounds, random-labels, norm-based]
prerequisites: [ai.theory.vc-dimension]
hook: "The random-label experiment, turned into a definition — and published fifteen years earlier."
related: [ai.theory.generalization-bounds-deep.the-experiment-that-broke-the-theory]
sources:
  - {title: "Rademacher and Gaussian Complexities: Risk Bounds and Structural Results", author: "Peter L. Bartlett & Shahar Mendelson", year: 2002, type: paper, url: "https://www.jmlr.org/papers/v3/bartlett02a.html"}
  - {title: "Rademacher complexity", type: wiki, url: "https://en.wikipedia.org/wiki/Rademacher_complexity"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Measure a model's capacity by asking it to fit coin flips

The random-label experiment has a formal ancestor, and knowing it makes the 2017 result sharper instead of stranger.

Rademacher complexity asks the same question, as a definition. Take your training inputs. Throw the labels away and replace them with independent coin flips. Now ask: at best, how well can your model class correlate with pure noise, averaged over the coin flips? A class that can match any noise pattern scores 1. A class too rigid to bend scores near 0.

That number bounds your generalization gap directly. And unlike VC dimension it depends on the data you actually have — a class can be wildly flexible in general and tame on your particular inputs, and Rademacher complexity sees the difference where VC dimension is blind.

It also says why the random-label result stung. What that experiment measured was a Rademacher complexity of essentially 1.

## Rigor

Given inputs $S=(x_1,\dots,x_n)$ and a class $\mathcal F$, draw $\sigma_i$ independent and uniform on $\{-1,+1\}$. The **empirical Rademacher complexity** is

$$\hat{\mathfrak R}_S(\mathcal F)=\mathbb E_{\sigma}\left[\ \sup_{f\in\mathcal F}\ \frac1n\sum_{i=1}^{n}\sigma_i\,f(x_i)\right],$$

literally "best achievable correlation with random labels".

**The bound (Bartlett & Mendelson, 2002).** For losses in $[0,1]$, with probability $1-\delta$, for all $f\in\mathcal F$,

$$R(f)\ \le\ \hat R_S(f)+2\,\hat{\mathfrak R}_S(\mathcal F)+3\sqrt{\frac{\ln(2/\delta)}{2n}} .$$

Two properties make it live where VC dimension dies. It is data-dependent, computed on your $x_i$. And it is scale-sensitive: for linear predictors with $\|w\|\le B$ and $\|x_i\|\le X$,

$$\hat{\mathfrak R}_S(\mathcal F)\ \le\ \frac{BX}{\sqrt n},$$

with no dimension anywhere — capacity controlled by norms rather than by counting. That is the shape every margin-based bound for deep networks tries to imitate.

And the connection back. If a class can fit *any* $\pm1$ labelling of $S$ exactly, the supremum simply picks the $f$ with $f(x_i)=\sigma_i$, giving $\hat{\mathfrak R}_S=1$ and a bound that reads $R\le\hat R+2$. Zhang and colleagues did not break this theory. They measured the quantity, and it was maximal.

## Recall
type: mcq
Q: What does empirical Rademacher complexity measure?
- [x] The best average correlation a class can achieve with random $\pm1$ labels on your actual inputs — flexibility measured against noise.
- [ ] The average error of the class on the training data — that is empirical risk; Rademacher complexity throws the true labels away.
- [ ] The parameter count rescaled by sample size — it is dimension-free for norm-bounded classes, which is exactly its advantage over VC dimension.
