---
id: econ.finance.expected-utility.the-bet-with-infinite-value
topic: econ.finance.expected-utility
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, history]
tags: [st-petersburg, expected-utility, risk-aversion, daniel-bernoulli, bounded-utility]
hook: "A coin game worth infinite ducats in expectation, which nobody would pay twenty for. The fix became modern decision theory."
sources:
  - {title: "St. Petersburg paradox", type: wiki, url: "https://en.wikipedia.org/wiki/St._Petersburg_paradox"}
  - {title: "Exposition of a New Theory on the Measurement of Risk — the 1954 Econometrica translation of Bernoulli (1738)", author: "Daniel Bernoulli", year: 1954, type: paper, url: "https://doi.org/10.2307/1909829"}
  - {title: "Risk aversion", type: wiki, url: "https://en.wikipedia.org/wiki/Risk_aversion"}
dates: {written: 2026-09-19, event: 1738-01-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The bet worth infinity that nobody would buy

Here is the game. I flip a fair coin until it comes up heads. If that happens on the first flip you get 2 ducats, on the second 4, on the third 8, doubling each time. What should you pay to play?

The expected payoff is one half times two, plus a quarter times four, plus an eighth times eight — one ducat per term, forever. Infinite. So you should hand over your house, your city and your future earnings for one round.

Nobody would pay twenty. Nicolas Bernoulli posed the puzzle in 1713; his cousin Daniel published the resolution in 1738 in the journal of the St Petersburg Academy, which is why the city's name is attached to a game nobody ever played there.

Daniel's move was to distinguish the money from what the money *does for you*. The millionth ducat matters less than the first, so you should not average ducats — you should average satisfaction. Put a logarithm on the payoff and the infinite sum collapses to a finite, sensible number.

That sentence is the whole foundation of the economics of risk.

## Rigor

With wealth-independent log utility $u(x)=\ln x$, the expected utility of the game is finite:

$$\sum_{n=1}^{\infty}2^{-n}\ln\!\left(2^{n}\right)=\ln 2\sum_{n=1}^{\infty}n\,2^{-n}=2\ln 2=\ln 4,$$

so the certainty equivalent is exactly 4 ducats. Concavity of $u$ *is* risk aversion: Jensen's inequality gives $\mathbb{E}[u(X)]\le u(\mathbb{E}[X])$, with the gap being the risk premium, and the Arrow–Pratt coefficient $-u''/u'$ measures it locally.

The honest coda is that logarithms do not solve the paradox, they postpone it. Karl Menger pointed out in 1934 that a game paying $e^{2^{n}}$ restores an infinite expected *utility* under $\ln$. Only a **bounded** utility function makes every such game finite — which is a real constraint on what preferences can look like, not a technicality.

The von Neumann–Morgenstern axioms come later and say something different: *if* your preferences over lotteries are complete, transitive, continuous and independent, *then* they are represented by the expectation of some utility function. Bernoulli guessed the form; the axioms explain why it must exist.

## Recall
type: mcq
Q: What does the St Petersburg paradox actually establish?
- [x] That expected *money* is the wrong objective — averaging a concave function of money gives finite, sensible valuations. — this is the origin of expected utility and of risk aversion as concavity.
- [ ] That infinite expected values are impossible in real games. — the expectation really is infinite; the game is well defined.
- [ ] That people are irrational when facing small probabilities. — the resolution needs no irrationality at all, only diminishing marginal utility.
- [ ] That the coin must be biased for the sum to converge. — a fair coin is assumed throughout; the convergence comes from the utility function.
