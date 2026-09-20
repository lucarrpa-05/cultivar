---
id: econ.behavioral.behavioral-finance.myopic-loss-aversion
topic: econ.behavioral.behavioral-finance
topics: [econ.behavioral.prospect-theory]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [paradox, numbers]
tags: [equity-premium, myopic-loss-aversion, benartzi-thaler, evaluation-period]
hook: "Stocks beat bonds by about six points a year for a century. No sane risk aversion explains a gap that big."
sources:
  - {title: "Equity premium puzzle", type: wiki, url: "https://en.wikipedia.org/wiki/Equity_premium_puzzle"}
  - {title: "Myopic loss aversion and the equity premium puzzle, Quarterly Journal of Economics 110(1)", author: "Benartzi & Thaler", year: 1995, type: paper, url: "https://doi.org/10.2307/2118511"}
dates: {written: 2026-09-19, event: 1995-02-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Stocks beat bonds so badly that holding bonds is the puzzle

Mehra and Prescott put the number on the table in 1985: US equities had beaten bonds by roughly six percentage points a year, and no plausible risk aversion inside a standard model can justify a gap that wide. To rationalise it you need investors so frightened of risk that they would pay ridiculous sums to avoid small gambles. That is the equity premium puzzle.

Benartzi and Thaler's 1995 answer changes the question being asked. Investors are not absurdly risk-averse over a lifetime. They are loss-averse over a *short* horizon, and they keep looking. Stocks almost certainly beat bonds over thirty years and are close to a coin flip over one — so if you check your portfolio annually, and losses hurt about twice as much as gains please, equities feel bad often enough that you demand a large premium to hold them.

On their historical calibration, the evaluation period that makes stocks and bonds equally attractive is about one year. Which is roughly how often people look.

## Rigor

Take the prospect-theory value function, $v(x)=x^{0.88}$ for gains and $-2.25(-x)^{0.88}$ for losses, and apply it to the return over an *evaluation period* of length $n$ rather than to terminal wealth. With $F_n$ the distribution of $n$-year real returns for an asset, define prospective utility

$$V(n)=\mathbb{E}_{F_n}\bigl[v(R)\bigr]$$

and look for the $n$ at which $V_{\text{stocks}}(n)=V_{\text{bonds}}(n)$.

Two forces move as $n$ grows. The probability that stocks show a loss over the window falls sharply — roughly one year in three at $n=1$, close to never at $n=20$. And the kink at zero only bites when a loss actually occurs. So $V_{\text{stocks}}$ climbs steeply with $n$ while $V_{\text{bonds}}$ barely moves, and the crossing sits near one year.

The sharp part is the prediction that follows: the premium an investor demands should depend on how often they *evaluate*, not on how long they hold. Loss aversion supplies the kink, myopia supplies the frequency, and the frequency is a dial that pension design can turn.

## Recall
type: mcq
Q: In myopic loss aversion, what does the "myopic" part refer to?
- [x] How often the investor evaluates the portfolio — annual checking makes a thirty-year holding feel like thirty one-year gambles.
- [ ] How long the investor intends to hold the asset — the model works precisely because holding period and evaluation period come apart.
- [ ] Short-sightedness about the long-run average return — investors in the model know the return distribution perfectly well.
