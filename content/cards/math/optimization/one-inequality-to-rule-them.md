---
id: math.optimization.convexity.one-inequality-to-rule-them
topic: math.optimization.convexity
topics: [math.probability.expectation-variance]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [tool, connection]
tags: [jensen-inequality, am-gm, entropy, supporting-hyperplane, expectation]
hook: "AM-GM, the non-negativity of variance, the Gibbs inequality and half the bounds in information theory are the same inequality wearing hats."
sources:
  - {title: "Jensen's inequality", type: wiki, url: "https://en.wikipedia.org/wiki/Jensen%27s_inequality"}
  - {title: "AM-GM inequality", type: wiki, url: "https://en.wikipedia.org/wiki/AM%E2%80%93GM_inequality"}
  - {title: "Gibbs' inequality", type: wiki, url: "https://en.wikipedia.org/wiki/Gibbs%27_inequality"}
dates: {written: 2026-09-19}
author: author-math-analysis-1
reviewed: {by: reviewer-math-analysis-2026-09-19, at: 2026-09-19, verdict: approved}
---

# One inequality wearing several hats

Convexity has a second job besides making optimization safe, and it is the one you will use more often: it produces inequalities almost for free.

The statement is a sentence. For a convex function, averaging inside is never worse than averaging outside. Take any bunch of points, average them, then apply the function — you get at most what you get by applying the function first and then averaging.

The picture is a chord. Between two points on a convex graph, the straight line sits above the curve. Jensen says that holds for a weighted average of any number of points, and for random variables.

Now watch it pay out. Choose the convex function to be minus the logarithm and you get the arithmetic-geometric mean inequality. Choose $x^{2}$ and you get that variance is non-negative. Choose $x\log x$ and you get the inequality that makes entropy maximal for the uniform distribution and makes relative entropy non-negative.

Same theorem, four famous names, and the proof is one tangent line.

## Rigor

**Jensen.** If $\varphi$ is convex and $X$ is integrable, then $\varphi(\mathbb{E}X)\le\mathbb{E}\varphi(X)$.

*Proof.* Convexity gives a supporting line at $m=\mathbb{E}X$: there is $c$ with $\varphi(x)\ge\varphi(m)+c(x-m)$ for all $x$. Take expectations; the linear term dies because $\mathbb{E}[X-m]=0$. $\square$

**AM-GM.** Apply it to $\varphi=-\ln$ and weights $p_i$:
$$\ln\left(\sum p_ix_i\right)\ \ge\ \sum p_i\ln x_i\ \Longrightarrow\ \sum p_ix_i\ \ge\ \prod x_i^{\,p_i},$$
and $p_i=1/n$ is the schoolbook version.

**Gibbs / non-negative relative entropy.** With $\varphi(t)=-\ln t$ and $X=q_i/p_i$ under $p$:
$$D(p\,\|\,q)=\sum_i p_i\ln\frac{p_i}{q_i}=\mathbb{E}_p\left[-\ln\frac{q}{p}\right]\ \ge\ -\ln\mathbb{E}_p\left[\frac{q}{p}\right]=-\ln 1=0 .$$

Equality holds in each case exactly when the argument is almost surely constant, or where $\varphi$ is affine. The chord from the picture is the supporting line in the proof.

## Recall
type: mcq
Q: What is the one-line proof of Jensen's inequality?
- [x] Take the supporting line at the mean and integrate — the linear part has expectation zero, leaving the inequality.
- [ ] Induct on the number of points from the two-point definition — that proves the finite case but not the version for general random variables.
- [ ] Differentiate twice and use $\varphi''\ge0$ — that characterises convexity but does not by itself produce the inequality, and it assumes smoothness.
