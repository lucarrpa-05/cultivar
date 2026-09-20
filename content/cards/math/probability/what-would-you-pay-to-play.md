---
id: math.probability.expectation-variance.what-would-you-pay-to-play
topic: math.probability.expectation-variance
format: challenge
difficulty: 2
language: en
weight: light
angles: [paradox, practical, history]
tags: [st-petersburg, expected-value, utility, daniel-bernoulli]
hook: "The expected payout is infinite. Name the largest amount you would actually hand over to play once."
sources:
  - {title: "St. Petersburg paradox", type: wiki, url: "https://en.wikipedia.org/wiki/St._Petersburg_paradox"}
  - {title: "Expected utility hypothesis", type: wiki, url: "https://en.wikipedia.org/wiki/Expected_utility_hypothesis"}
dates: {written: 2026-09-19, event: 1738-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The expected payout is infinite. What would you pay?

I flip a fair coin until it comes up heads. If the first head arrives on flip $n$, I pay you $2^{n}$ pesos. Heads immediately: 2. Tails then heads: 4. Two tails then heads: 8. And so on, with no ceiling.

Work out the expected value before reading on. Each outcome contributes $\tfrac{1}{2^{n}}\cdot 2^{n}=1$, and there are infinitely many outcomes, so the expectation is $1+1+1+\cdots$, which diverges.

Standard decision theory says you should hand over your house, your car and your future salary for one ticket.

Now the actual question, which is the one worth sitting with: what is the most you would really pay? Write down the number. Then ask yourself what your number is measuring, because it is clearly not the expected value — and whatever it is, Nicolas Bernoulli posed this in 1713 and it has been resisting a clean answer ever since.

## Recall
type: reveal
Q: What is wrong with paying an infinite price for an infinite expectation?
A: Nothing, formally — which is why the paradox is about the *model*, not the arithmetic. Daniel Bernoulli's 1738 answer was that people value utility, not money, and $\mathbb{E}[\log W]$ converges. Two other repairs bite just as hard: no casino can cover unbounded payouts, so the real game is truncated (at $2^{40}$ pesos the fair price is about 40), and a single play has infinite mean but median payout 2 — an expectation nobody will ever be paid.
