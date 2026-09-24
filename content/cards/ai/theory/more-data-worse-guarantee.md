---
id: ai.theory.generalization-bounds-deep.more-data-worse-guarantee
topic: ai.theory.generalization-bounds-deep
format: story
difficulty: 3
language: en
weight: medium
angles: [mistake, paradox]
tags: [uniform-convergence, nagarajan-kolter, norm-bounds, sample-size, neurips-2019]
prerequisites: [ai.theory.pac-learning]
hook: "A generalisation bound has one job it cannot skip: shrink as the data grows. In 2019 the field's favourites were caught growing."
related: [ai.theory.generalization-bounds-deep.a-bound-that-says-four-hundred-percent]
sources:
  - {title: "Uniform convergence may be unable to explain generalization in deep learning", author: "Vaishnavh Nagarajan & J. Zico Kolter", year: 2019, type: paper, url: "https://arxiv.org/abs/1902.04742"}
  - {title: "Bosch AI research paper honored at 2019 NeurIPS Conference", type: article, url: "https://www.bosch-presse.de/pressportal/de/en/bosch-ai-research-paper-honored-at-2019-neurips-conference-204608.html"}
  - {title: "In Defense of Uniform Convergence: Generalization via derandomization with an application to interpolating predictors", author: "Jeffrey Negrea, Gintare Karolina Dziugaite & Daniel M. Roy", year: 2019, type: paper, url: "https://arxiv.org/abs/1912.04265"}
dates: {written: 2026-09-23}
author: author-ai-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved}
---

# They gave the bounds more data, and the guarantees got worse

A generalisation bound can be loose, but it has one job it cannot skip: shrink as the training set grows. Even crude parameter-counting bounds manage that.

In February 2019 Vaishnavh Nagarajan and Zico Kolter checked the newer norm-based bounds. They trained networks on ever larger slices of MNIST. Test error fell steadily. The bounds rose. More data, worse guarantee.

Then they proved something harsher. In simple settings where gradient descent generalises well, every classic uniform-convergence bound is nearly vacuous, even one restricted to the solutions the algorithm actually produces. The paper won an Outstanding New Directions award at NeurIPS that December. The same week, a reply appeared: *In Defense of Uniform Convergence*.

## Rigor

"Harsher" has a concrete mechanism, visible in a linear classifier (their §3.1). Inputs are $x=(x_1,x_2)$: a low-dimensional signal $x_1=2y\,u$ with $\|u\|^2=1/m$, and noise $x_2\sim\mathcal N\big(0,\tfrac{32}{D}I_D\big)$ with $D\gg m$. One gradient step from zero on $m$ examples gives

$$w_1=2m\,u,\qquad w_2=\sum_{i}y_i\,x_2^{(i)}.$$

Margins $y\,(w_1^{\top}x_1+w_2^{\top}x_2)$:

- fresh test point: $4$ plus a noise term of size $O\big(32\sqrt{m/D}\big)$, so about $4$. Correct.
- training point $i$: $4+\|x_2^{(i)}\|^2+\text{small}\approx4+32$. Correct, the noise memorised.
- the same point with its noise negated, $(x_1,-x_2)$: $4-32<0$. Wrong.

Negating Gaussian noise preserves its distribution, so the mirrored set $S'=\{((x_1,-x_2),y)\}$ is exactly as likely a training set as $S$. A two-sided uniform-convergence bound must control $\sup_{S\in\mathcal S}\sup_{h\in\mathcal H}\big|L_D(h)-\hat L_S(h)\big|$ over a set $\mathcal S$ of probability $1-\delta$ and the classifiers $\mathcal H$ the algorithm outputs on it. Whatever $\mathcal S$ you pick, some $S$ has both $S$ and $S'$ inside it with $h_S$ still accurate on test data, and that pair $(h_S,S')$ forces the bound up to $|\varepsilon-1|=1-\varepsilon$.

One honest caveat on the experiment: the bounds rose with $m$ at batch size 1; at batch size 32 they fell, but more slowly than the test error.

## Recall
type: mcq
Q: What did Nagarajan and Kolter prove about uniform-convergence bounds?
- [x] In some settings where gradient descent generalises well, even the tightest two-sided uniform-convergence bound over its outputs is nearly 1 — vacuous.
- [ ] That the networks secretly generalise badly — test error really was small; the failure is in the bound, not the model.
- [ ] That the bounds just need better constants — the problem is structural: a mirrored training set the classifier gets entirely wrong is as likely as the real one.
