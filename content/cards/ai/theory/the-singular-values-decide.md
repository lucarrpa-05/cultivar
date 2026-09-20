---
id: ai.theory.benign-overfitting.the-singular-values-decide
topic: ai.theory.benign-overfitting
format: callback
difficulty: 4
language: en
weight: heavy
angles: [connection, tool]
tags: [pseudoinverse, spectrum, effective-rank, noise-amplification, conditioning]
callback: {from: math.linear-algebra.svd, to: ai.theory.benign-overfitting}
hook: "Inverting a matrix with one tiny singular value destroys a computation. It also explains the whole double-descent peak."
related: [ai.theory.benign-overfitting.fitting-the-noise-and-getting-away-with-it]
sources:
  - {title: "Benign Overfitting in Linear Regression", author: "Bartlett, Long, Lugosi & Tsigler", year: 2020, type: paper, url: "https://arxiv.org/abs/1906.11300"}
  - {title: "Moore–Penrose inverse", type: wiki, url: "https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse"}
  - {title: "Surprises in High-Dimensional Ridgeless Least Squares Interpolation", author: "Hastie, Montanari, Rosset & Tibshirani", year: 2019, type: paper, url: "https://arxiv.org/abs/1903.08560"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember singular values? They decide whether overfitting kills you

Remember that the singular values of a matrix are the stretch factors of its action, and that the smallest one measures how close the matrix comes to flattening a direction into nothing. Inverting a matrix with a tiny singular value is the classic way to wreck a numerical computation: the inverse multiplies by $1/s$, so whatever noise you had gets multiplied by the same enormous factor.

That is the entire story of whether a model can interpolate noisy data and survive it.

Fit $n$ points with $p>n$ features and the minimum-norm solution is $X^{+}y$, built out of the *reciprocals* of the singular values. If one of them sits near zero, the noise in $y$ is amplified in one direction and the fit explodes there. That is the double-descent peak, and it arrives exactly when $p=n$ makes the matrix square.

But a spectrum with a long flat tail of many small, comparable singular values does something else entirely: it spreads the noise instead of magnifying it.

## Rigor

Write $X=U\Sigma V^{\top}$ with $\Sigma=\operatorname{diag}(s_1\ge\cdots\ge s_n)$ for $p>n$. Then $X^{+}=V\Sigma^{+}U^{\top}$ with $\Sigma^{+}=\operatorname{diag}(1/s_1,\dots,1/s_n)$, and the min-norm interpolant of $y=X\beta^{*}+\varepsilon$ absorbs the noise as

$$X^{+}\varepsilon=\sum_{i=1}^{n}\frac{u_i^{\top}\varepsilon}{s_i}\,v_i,\qquad \mathbb E\big\|X^{+}\varepsilon\big\|^{2}=\sigma^{2}\sum_{i=1}^{n}\frac{1}{s_i^{2}} .$$

Everything follows from that one sum. Near $p=n$ the matrix is nearly square and $s_{\min}\to0$: a single term blows up, which is the interpolation peak. For $p\gg n$ with an isotropic design the singular values concentrate near $\sqrt p$, so $\sum_i s_i^{-2}\approx n/p\to0$ — the second descent.

Bartlett, Long, Lugosi and Tsigler state the condition on the population covariance instead of the sample. With eigenvalues $\lambda_1\ge\lambda_2\ge\cdots$, benign overfitting requires the effective ranks

$$r_k=\frac{\sum_{i>k}\lambda_i}{\lambda_{k+1}},\qquad R_k=\frac{\big(\sum_{i>k}\lambda_i\big)^{2}}{\sum_{i>k}\lambda_i^{2}}$$

to satisfy $r_k\gtrsim n$ and $R_k\gg n$ for some $k=o(n)$. In singular-value language: a long, flat tail. A spectrum decaying too fast, say $\lambda_i\sim i^{-2}$, has no tail to hide noise in, and there interpolation is fatal.

## Recall
type: mcq
Q: In terms of singular values, what makes interpolation benign rather than fatal?
- [x] A long tail of many small but comparable singular values — the absorbed noise is $\sigma^{2}\sum_i s_i^{-2}$, which stays small when no single $s_i$ is tiny next to the rest.
- [ ] One dominant singular value far above the others — that concentrates the fit in a single direction rather than spreading the noise.
- [ ] Nearly all singular values equal to zero — that is a low-rank design, which cannot interpolate $n$ generic points at all.
