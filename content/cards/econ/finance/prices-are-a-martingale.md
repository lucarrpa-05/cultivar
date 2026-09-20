---
id: econ.finance.efficient-markets.prices-are-a-martingale
topic: econ.finance.efficient-markets
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, paradox]
tags: [efficient-markets, martingale, samuelson, joint-hypothesis, bachelier]
callback: {from: math.probability.martingales, to: econ.finance.efficient-markets}
hook: "Tomorrow's expected value is today's value. You met that as a fair game; finance calls it the efficient market hypothesis."
sources:
  - {title: "Proof That Properly Anticipated Prices Fluctuate Randomly", author: "Paul A. Samuelson", year: 1965, type: paper, url: "https://www.ifa.com/media/images/pdf%20files/samuelson-proof.pdf"}
  - {title: "Efficient-market hypothesis — martingale formulation and the joint hypothesis problem", type: wiki, url: "https://en.wikipedia.org/wiki/Efficient-market_hypothesis"}
  - {title: "Efficient Capital Markets: A Review of Theory and Empirical Work", author: "Eugene F. Fama", year: 1970, type: paper, url: "https://doi.org/10.2307/2325486"}
dates: {written: 2026-09-19, event: 1965-01-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember martingales? That is what "efficient markets" means

A martingale was the formalisation of a fair game: given everything you know up to now, the expected value of the next step is exactly where you stand. No strategy of stopping, doubling or waiting changes that — the optional stopping theorem says the gambler cannot outsmart a fair coin by being clever about when to quit.

Paul Samuelson's 1965 paper carried that object into finance with a title that is also its proof sketch: properly anticipated prices fluctuate randomly. The argument is not that markets are wise. It is that any *predictable* movement is an opportunity, and acting on an opportunity moves the price until the predictability is gone. What survives is the unforecastable part.

So "the market is efficient" is not a claim that prices are right. It is a claim that the information you have is already in the price, which is a much weaker and much stranger statement — a market can be efficient in this sense and wildly wrong.

The trouble starts when you try to test it.

## Rigor

$(X_t)$ is a **martingale** with respect to a filtration $(\mathcal F_t)$ if $\mathbb{E}[X_{t+1}\mid\mathcal F_t]=X_t$. Take $\mathcal F_t$ to be publicly available information and the raw price cannot be a martingale, because holding a risky asset must earn a premium. The honest statement adjusts for it:

$$\mathbb{E}\big[R_{t+1}-\mathbb{E}_t[R_{t+1}]\ \big|\ \mathcal F_t\big]=0,$$

so the *excess* return is a martingale difference sequence — unforecastable around whatever the equilibrium expected return happens to be. Equivalently, the discounted price is a martingale under a risk-neutral measure.

Which is exactly the difficulty Fama named in 1970: the **joint hypothesis problem**. Every test of efficiency is a simultaneous test of efficiency and of the model of expected returns you subtracted. Find predictable excess returns and you cannot tell whether the market is exploitable or your risk model is wrong — momentum and value have been argued both ways for thirty years.

And the deep tension, due to Grossman and Stiglitz: if prices were perfectly informative, nobody would pay to gather information, and then prices would not be informative.

## Recall
type: mcq
Q: A study finds that stocks with high book-to-market earn higher returns. What has it shown?
- [x] Either a market inefficiency or a missing risk factor — the joint hypothesis problem means the data cannot separate them. — every efficiency test is also a test of the asset-pricing model used.
- [ ] That markets are inefficient, since returns were predictable. — predictable compensation for risk is perfectly consistent with efficiency.
- [ ] That the efficient market hypothesis is confirmed. — a predictable pattern is what the hypothesis rules out, absent a risk explanation.
- [ ] Nothing, since past returns never predict future returns. — they sometimes do; the question is always what is being compensated.
