---
id: math.probability.concentration.chebyshev-is-polite-hoeffding-is-not
topic: math.probability.concentration
format: idea
difficulty: 4
language: en
weight: heavy
angles: [tool, numbers, beautiful]
tags: [hoeffding, chernoff, chebyshev, concentration, sample-size]
hook: "Chebyshev says you need 250,000 samples. Hoeffding says 27,000. Same question, same data, one extra assumption."
sources:
  - {title: "Hoeffding's inequality", type: wiki, url: "https://en.wikipedia.org/wiki/Hoeffding%27s_inequality"}
  - {title: "Chernoff bound", type: wiki, url: "https://en.wikipedia.org/wiki/Chernoff_bound"}
  - {title: "Concentration inequality", type: wiki, url: "https://en.wikipedia.org/wiki/Concentration_inequality"}
dates: {written: 2026-09-19, event: 1963-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Chebyshev is polite. Hoeffding is not.

You want to estimate the fraction of a population that will vote yes, to within one percentage point, and be wrong less than 1% of the time. How many people must you ask?

Chebyshev's inequality — the one you can prove in two lines from Markov — answers 250,000. That is a perfectly correct bound and it is useless: no poll has ever had that sample size.

Hoeffding's inequality, from 1963, answers about 27,000. For the same guarantee, from the same data, with one extra piece of information that costs nothing: the answers are bounded, each between 0 and 1.

The difference is not a constant factor, it is the shape of the decay. Chebyshev's failure probability falls like $1/n$. Hoeffding's falls like $e^{-n}$. Once you know the exponential is available, sample sizes stop being terrifying, and a large chunk of statistics, randomised algorithms and learning theory becomes possible.

The trick that unlocks the exponential is worth knowing on its own.

## Rigor

**Chebyshev.** $P\left(|\bar{X}_n-\mu|\ge\varepsilon\right)\le \sigma^2/(n\varepsilon^2)$. With $\sigma^2\le 1/4$, $\varepsilon=0.01$, $\delta=0.01$: $n\ge 250{,}000$.

**Hoeffding (1963).** If $X_i$ are independent with $a_i\le X_i\le b_i$, then
$$P\left(\left|\bar{X}_n-\mathbb{E}\bar{X}_n\right|\ge\varepsilon\right)\ \le\ 2\exp\!\left(-\frac{2n^2\varepsilon^{2}}{\sum_i (b_i-a_i)^2}\right),$$
which for $X_i\in[0,1]$ is $2e^{-2n\varepsilon^{2}}$. Setting that to $\delta$ gives
$$n\ \ge\ \frac{\ln(2/\delta)}{2\varepsilon^{2}}=\frac{\ln 200}{2(0.01)^2}\approx 26{,}500 .$$

**The Chernoff method.** Do not bound $|\bar X-\mu|$ directly; bound its exponential. For any $\lambda>0$, Markov gives
$$P\left(S_n-\mathbb{E}S_n\ge t\right)\le e^{-\lambda t}\,\mathbb{E}\,e^{\lambda(S_n-\mathbb{E}S_n)}=e^{-\lambda t}\prod_i \mathbb{E}\,e^{\lambda(X_i-\mathbb{E}X_i)},$$
using independence to factorise. Hoeffding's lemma bounds each factor by $e^{\lambda^{2}(b_i-a_i)^{2}/8}$, and optimising over $\lambda$ yields the result. Chebyshev is the same argument with the second moment instead of the whole moment generating function — which is precisely the information it throws away.

**When the variance is small.** Hoeffding only sees the range, so for rare events it is loose; Bernstein's and Bennett's inequalities keep the variance and do much better.

## Recall
type: mcq
Q: Where does the exponential in Hoeffding's bound come from?
- [x] Applying Markov's inequality to $e^{\lambda S_n}$ and factorising the expectation over independent terms — the moment generating function carries all the moments, not just the second.
- [ ] From the central limit theorem's Gaussian tail — the CLT is asymptotic and gives no bound at finite $n$; Hoeffding is non-asymptotic.
- [ ] From assuming the variables are Gaussian — only boundedness is assumed; the variables can be arbitrary.
- [ ] From the law of large numbers — the LLN gives convergence with no rate at all.
