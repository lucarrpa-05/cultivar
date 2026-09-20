---
id: math.probability.lln.the-law-of-averages-is-a-lie
topic: math.probability.lln
format: idea
difficulty: 3
language: en
weight: medium
angles: [paradox, mistake, tool]
tags: [law-of-large-numbers, gamblers-fallacy, chebyshev, cauchy, borel]
hook: "A million coin flips will leave you about 400 heads ahead or behind. The average converges; the gap grows."
sources:
  - {title: "Law of large numbers", type: wiki, url: "https://en.wikipedia.org/wiki/Law_of_large_numbers"}
  - {title: "Gambler's fallacy", type: wiki, url: "https://en.wikipedia.org/wiki/Gambler%27s_fallacy"}
  - {title: "Cauchy distribution", type: wiki, url: "https://en.wikipedia.org/wiki/Cauchy_distribution"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The law of averages is a lie, and the true version is stranger

Flip a fair coin a thousand times and get 550 heads. "It will even out," says everyone. What exactly is supposed to even out?

Not the count. Nothing in the universe remembers those fifty extra heads, and no future flip is biased to repay them. The excess of heads over tails does not shrink with more flipping — it *grows*, typically like the square root of the number of flips. After a million flips you should expect to be roughly 400 ahead or behind, not roughly zero.

What converges is the ratio, and only because the denominator outruns the numerator. $550/1000$ is 5 points off; $500{,}400/1{,}000{,}000$ is 0.04 points off, with a bigger absolute gap. The law of large numbers is a statement about division, not about justice.

This is also why the law can fail outright, which most people never hear.

## Rigor

**Weak LLN.** If $X_1,X_2,\dots$ are i.i.d. with mean $\mu$ and variance $\sigma^{2}$, Chebyshev gives
$$P\left(\left|\bar{X}_n-\mu\right|\ge\varepsilon\right)\le\frac{\sigma^{2}}{n\varepsilon^{2}}\longrightarrow 0 .$$

**Strong LLN (Borel 1909; Kolmogorov).** With only $\mathbb{E}|X_1|<\infty$, $\bar{X}_n\to\mu$ almost surely.

**The growing gap.** For a fair coin, $S_n-\tfrac{n}{2}$ has standard deviation $\sqrt{n}/2$, and
$$\mathbb{E}\left|S_n-\tfrac{n}{2}\right|\approx\sqrt{\frac{n}{2\pi}}\approx 0.4\sqrt{n},$$
which for $n=10^{6}$ is about 400. Dividing by $n$ sends it to zero; that division is the entire content of the theorem.

**When it fails.** The Cauchy distribution has no mean, and its sample average is a catastrophe: if $X_i$ are i.i.d. standard Cauchy then $\bar{X}_n$ is *again* standard Cauchy, for every $n$. Averaging a million observations tells you exactly as much as one. Any statistic that assumes averaging helps — a mean, a standard error, a $t$-test — silently assumes a finite mean, and heavy-tailed data does not supply one.

## Recall
type: mcq
Q: After a long run of heads, what does the law of large numbers predict?
- [x] Nothing about the count — the proportion drifts toward $1/2$ because $n$ grows, while the absolute excess typically grows like $\sqrt{n}$.
- [ ] More tails than heads in the near future, to compensate — that is the gambler's fallacy; the coin has no memory.
- [ ] The excess of heads will shrink back toward zero — it does not shrink; only the excess *divided by n* does.
- [ ] Nothing at all, since any sequence is possible — the theorem is a genuine almost-sure statement about the average, just not about the difference.
