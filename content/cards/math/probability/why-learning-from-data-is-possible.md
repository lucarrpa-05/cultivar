---
id: math.probability.concentration.why-learning-from-data-is-possible
topic: math.probability.concentration
topics: [ai.theory.pac-learning]
format: callback
difficulty: 4
language: en
weight: medium
angles: [connection, beautiful, tool]
tags: [pac-learning, union-bound, generalisation-bound, vc-dimension, valiant]
hook: "You pay for the number of hypotheses you considered — logarithmically. That logarithm is the whole reason learning works."
callback: {from: math.probability.concentration, to: ai.theory.pac-learning}
sources:
  - {title: "Probably approximately correct learning", type: wiki, url: "https://en.wikipedia.org/wiki/Probably_approximately_correct_learning"}
  - {title: "A Theory of the Learnable", author: "Leslie Valiant", year: 1984, type: paper, url: "https://doi.org/10.1145/1968.1972"}
  - {title: "Vapnik–Chervonenkis dimension", type: wiki, url: "https://en.wikipedia.org/wiki/Vapnik%E2%80%93Chervonenkis_dimension"}
dates: {written: 2026-09-19, event: 1984-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "\"log|H| extra samples\" had the wrong units — the logarithm is paid in the exponent, i.e. log|H|/2ε² samples."}
---

# Remember the exponential tail? It is why learning is possible at all

Hoeffding told you that the average of $n$ bounded independent samples sits near its mean with failure probability $e^{-2n\varepsilon^2}$. Here is what that buys.

Train a classifier and measure its error on the training set. You want that number to mean something about *future* data. For one fixed rule, Hoeffding settles it: training error and true error agree to within $\varepsilon$, with exponentially small failure probability.

But you did not pick one rule. You searched a whole family and kept the one that scored best on the data — which is precisely the situation where a low training error might be luck. So take a union bound: if any rule in the family could be the lucky one, add up their failure probabilities.

Now the exponential earns its keep. The union bound multiplies the failure probability by the number of hypotheses, and cancelling a factor of $|\mathcal{H}|$ against $e^{-2n\varepsilon^2}$ costs only $\ln|\mathcal{H}|$ in the exponent. Going from one rule to a billion adds about 21 there. Not a billion.

## Rigor

**Uniform deviation bound.** For a finite hypothesis class $\mathcal{H}$ and i.i.d. data,
$$P\left(\exists h\in\mathcal{H}: \left|\widehat{R}(h)-R(h)\right|>\varepsilon\right)\ \le\ 2|\mathcal{H}|\,e^{-2n\varepsilon^{2}},$$
by Hoeffding for each $h$ and a union bound over $\mathcal{H}$. Setting the right side to $\delta$ and solving:
$$n\ \ge\ \frac{1}{2\varepsilon^{2}}\left(\ln|\mathcal{H}|+\ln\frac{2}{\delta}\right).$$
This is the finite-class PAC sample complexity, and $\ln|\mathcal{H}|$ is the price of search. The exponent is doing all the work: with a polynomial tail, you would need $|\mathcal{H}|$ samples rather than $\log|\mathcal{H}|$, and nothing would be learnable.

**Valiant's framing (1984).** $\mathcal{H}$ is PAC-learnable if there is an algorithm that, for all $\varepsilon,\delta$ and all data distributions, returns $h$ with $R(h)\le\varepsilon$ with probability $\ge1-\delta$, using samples polynomial in $1/\varepsilon$ and $1/\delta$.

**Infinite classes.** A linear classifier family is uncountable, so $\ln|\mathcal{H}|$ is useless. Vapnik and Chervonenkis replace the count by the growth function — how many labellings of $n$ points the class can realise — which Sauer's lemma bounds by $O(n^{d})$ for VC dimension $d$. The logarithm then gives $d\log n$ in place of $\log|\mathcal{H}|$, and finite VC dimension becomes the criterion for learnability.

## Recall
type: reveal
Q: Why is the cost of searching a large hypothesis class only logarithmic?
A: Because the failure probability for each hypothesis decays exponentially in $n$ while the union bound only multiplies it by $|\mathcal{H}|$. Cancelling $|\mathcal{H}|$ against $e^{-2n\varepsilon^{2}}$ needs $n\approx \ln|\mathcal{H}|/(2\varepsilon^2)$. With a merely polynomial tail, the same cancellation would cost samples proportional to $|\mathcal{H}|$ and learning would be hopeless.
