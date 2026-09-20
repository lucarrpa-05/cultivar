---
id: econ.finance.options-black-scholes.the-formula-that-does-not-need-your-forecast
topic: econ.finance.options-black-scholes
format: idea
difficulty: 4
language: en
weight: heavy
angles: [beautiful, mistake]
tags: [black-scholes, replication, delta-hedging, volatility-smile, no-arbitrage]
hook: "The price of a bet on a stock rising does not depend on whether it is expected to rise. That is the result, not a simplification."
sources:
  - {title: "The Pricing of Options and Corporate Liabilities", author: "Fischer Black & Myron Scholes", year: 1973, type: paper, url: "https://doi.org/10.1086/260062"}
  - {title: "Black–Scholes model", type: wiki, url: "https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model"}
  - {title: "Volatility smile", type: wiki, url: "https://en.wikipedia.org/wiki/Volatility_smile"}
dates: {written: 2026-09-19, event: 1973-05-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The option price that ignores your opinion about the stock

An option to buy a share at a fixed price next year is obviously a bet that the share will rise. So the price of that option should depend on how fast you expect the share to rise. Every trader in 1970 believed this, and it is false.

Here is the trick that kills it. Hold a little of the stock and a little cash, in a mixture you adjust continuously as the price moves. Black, Scholes and Merton showed you can choose the mixture so that this portfolio gains and loses exactly what the option does, in every state of the world, at every instant. If two things have identical payoffs, they must cost the same, or someone buys one and sells the other and is rich for free.

So the option's price is the cost of manufacturing it — and manufacturing costs depend on how much the stock *wobbles*, not on which way you think it is going. Expected return drops out of the formula entirely.

The gap between that argument and reality is where the interesting part lives.

## Rigor

Under the model's assumptions — a share following geometric Brownian motion with constant volatility $\sigma$, a constant riskless rate $r$, continuous frictionless trading — the European call is

$$C=S_0\,N(d_1)-Ke^{-rT}N(d_2),\qquad d_{1,2}=\frac{\ln(S_0/K)+\big(r\pm\tfrac{\sigma^{2}}{2}\big)T}{\sigma\sqrt{T}} .$$

The drift $\mu$ of the share appears nowhere. The replicating portfolio holds $\Delta=\partial C/\partial S=N(d_1)$ shares, rebalanced continuously, financed by borrowing; the no-arbitrage requirement that this self-financing portfolio match the option is what produces the equation, and it is why the answer is a risk-neutral expectation regardless of anyone's risk preferences.

Every assumption is false in a useful way. Volatility is neither constant nor known — implied volatility plotted against strike price should be flat and instead shows a **smile**, pronounced since the 1987 crash, which is the market pricing in fat tails and jumps the model excludes. Continuous rebalancing is impossible with transaction costs, and liquidity vanishes exactly when hedging matters most, as Long-Term Capital Management discovered in 1998 with Scholes and Merton on the board.

The formula survives as a language: quote a price, invert it, argue about volatility.

## Recall
type: mcq
Q: Why does the expected return of the underlying stock not appear in the Black–Scholes price?
- [x] Because the option is priced by replication — the cost of a hedging portfolio that matches its payoff in every state, which depends on volatility, not direction. — no-arbitrage pins the price without anyone's forecast.
- [ ] Because expected returns are too hard to estimate, so the model ignores them. — it is not an approximation; the drift cancels exactly in the argument.
- [ ] Because investors are assumed to be risk-neutral in reality. — risk-neutral valuation is a computational device, not a claim about investors.
- [ ] Because the stock's drift is already inside the volatility parameter. — drift and volatility are separate parameters of the process.
