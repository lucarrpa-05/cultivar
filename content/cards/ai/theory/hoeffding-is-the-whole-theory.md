---
id: ai.theory.pac-learning.hoeffding-is-the-whole-theory
topic: ai.theory.pac-learning
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [hoeffding, union-bound, concentration, agnostic-pac, generalization-gap]
callback: {from: math.probability.concentration, to: ai.theory.pac-learning}
hook: "An inequality about coin flips, plus one counting trick, is most of the reason machine learning works."
related: [ai.theory.pac-learning.what-the-theory-promised]
sources:
  - {title: "Hoeffding's inequality", type: wiki, url: "https://en.wikipedia.org/wiki/Hoeffding%27s_inequality"}
  - {title: "Probably approximately correct learning", type: wiki, url: "https://en.wikipedia.org/wiki/Probably_approximately_correct_learning"}
  - {title: "A theory of the learnable", author: "Leslie Valiant", year: 1984, type: paper, url: "https://doi.org/10.1145/1968.1972"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember Hoeffding? That inequality is the whole theory of learning

Remember the concentration inequalities: an average of $n$ independent bounded variables sits within $t$ of its mean except with probability $2e^{-2nt^{2}}$. Exponentially small in $n$, and indifferent to the underlying distribution. You almost certainly met it as a statement about coin flips.

It is also, very nearly, the reason machine learning works at all.

The translation is short. A fixed hypothesis $h$ has a true error rate — the probability it is wrong on a fresh example. Its training error is the average of $n$ independent 0/1 variables with exactly that mean. So Hoeffding says your training error is close to the truth, with a failure probability that collapses exponentially in the size of your dataset.

That would end the subject, except for one thing. You never evaluate a fixed hypothesis. You report the one that looked best *after* you saw the data, and Hoeffding has nothing to say about the winner of a search.

Repairing that costs exactly one union bound.

## Rigor

**Hoeffding.** For independent $Z_1,\dots,Z_n\in[0,1]$ with mean $\mu$,

$$\Pr\left[\Big|\tfrac1n\textstyle\sum_i Z_i-\mu\Big|\ \ge\ t\right]\ \le\ 2e^{-2nt^{2}} .$$

Take $Z_i=\mathbb 1[h(x_i)\neq y_i]$ for a hypothesis fixed in advance: then $\mu=R(h)$, the average is $\hat R_S(h)$, and training error tracks true error to within $t$.

**The union bound is the entire difficulty.** A learner returns $\hat h=\arg\min_{h\in\mathcal H}\hat R_S(h)$, which is a random function of $S$, so the statement above does not apply to it. Bound all hypotheses simultaneously instead: for finite $\mathcal H$,

$$\Pr\Big[\exists h\in\mathcal H:\ \big|\hat R_S(h)-R(h)\big|\ge t\Big]\ \le\ 2|\mathcal H|\,e^{-2nt^{2}} .$$

Set the right-hand side to $\delta$ and invert for $t$: with probability $1-\delta$, for every $h\in\mathcal H$ at once,

$$R(h)\ \le\ \hat R_S(h)+\sqrt{\frac{\ln|\mathcal H|+\ln(2/\delta)}{2n}} .$$

That is the agnostic PAC bound. Hoeffding, plus counting. Everything that comes afterwards — VC dimension, Rademacher complexity, PAC-Bayes — is a cleverer way of paying for $|\mathcal H|$ when the class is infinite and the naive count gives $\infty$.

## Recall
type: reveal
Q: Hoeffding already bounds the gap between training and true error. Why isn't learning theory finished there?
A: Because it applies to a hypothesis fixed *before* the data, and a learner returns the winner of a search over the whole class. Covering every hypothesis at once costs a union bound — and paying for that term when the class is infinite is what VC dimension, Rademacher complexity and PAC-Bayes are all for.
