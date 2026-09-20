---
id: sports.stats.betting-markets.remember-efficient-markets
topic: sports.stats.betting-markets
format: callback
difficulty: 2
language: en
weight: medium
angles: [connection, practical]
tags: [efficient-markets, overround, favourite-longshot-bias, odds, prediction-markets]
hook: "A bookmaker's odds are a probability forecast with money behind it — and they add up to more than one on purpose."
callback: {from: econ.finance.efficient-markets, to: sports.stats.betting-markets}
prerequisites: [econ.finance.efficient-markets]
sources:
  - {title: "Overround", type: wiki, url: "https://en.wikipedia.org/wiki/Overround"}
  - {title: "Favourite-longshot bias", type: wiki, url: "https://en.wikipedia.org/wiki/Favourite-longshot_bias"}
  - {title: "Explaining the Favorite-Longshot Bias: Is it Risk-Love or Misperceptions?", author: "Erik Snowberg and Justin Wolfers", year: 2010, type: paper, url: "https://ideas.repec.org/p/ces/ceswps/_3029.html"}
dates: {written: 2026-09-19}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember efficient markets? Football odds are the cleanest test ever built.

Efficient markets are hard to test on stocks, because nobody knows what a stock is "really" worth. Betting markets do not have that problem. Every contract expires at full time, and the truth is printed on the scoreboard. If prices aggregate information, this is where it should show.

Mostly, they do. Bookmakers' implied probabilities track outcomes closely enough that beating them consistently is very hard, and public models that look brilliant on paper usually lose money once you subtract the spread.

Two structural facts spoil the purity. First, the prices are not probabilities: invert the odds on every outcome and they sum to more than one. The excess is the *overround*, the bookmaker's margin, and it is the reason a merely-as-good-as-the-market forecast loses steadily. Second, there is a real, decades-old anomaly — the favourite–longshot bias, in which long shots are systematically overbet and favourites underbet. Snowberg and Wolfers argued in 2010 that it looks less like risk-loving preferences and more like people misperceiving small probabilities.

The arithmetic of that margin decides whether any edge is usable.

## Rigor

For decimal odds $o_i$ on mutually exclusive outcomes, the implied (unnormalised) probabilities are $1/o_i$ and

$$\text{overround}=\sum_i \frac{1}{o_i}-1 .$$

A three-way football market quoted at $2.10 / 3.40 / 3.80$ gives $0.476+0.294+0.263=1.033$: a 3.3% margin. Normalising, $\hat{p}_i=(1/o_i)/\sum_j(1/o_j)$, recovers the bookmaker's implied probabilities.

Your expected return staking on outcome $i$ at true probability $p_i$ is $p_i o_i-1$. Break-even needs $p_i>1/o_i$, so you must beat the *quoted* probability, which already exceeds the bookmaker's own belief by the margin. With a 3% overround spread over three outcomes, a forecast one percentage point better than the market on a near-even chance still loses.

That is the sharp form of the efficiency claim here: not "the market is right", but "the market is right to within the spread", which is all that efficiency ever meant and exactly what makes it so exhausting to exploit.

## Recall
type: reveal
Q: Odds of 2.10, 3.40 and 3.80 are offered on the three results of a match. Do the implied probabilities sum to one, and what is the difference called?
A: No — $1/2.10+1/3.40+1/3.80\approx 1.033$. The 3.3% excess is the overround, the bookmaker's margin. It is why a forecast that merely matches the market's accuracy still loses money.
