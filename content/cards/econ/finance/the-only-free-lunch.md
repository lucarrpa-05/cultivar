---
id: econ.finance.portfolio.the-only-free-lunch
topic: econ.finance.portfolio
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, beautiful]
tags: [markowitz, diversification, covariance, efficient-frontier, systematic-risk]
hook: "Combine two risky assets and you can end up with less risk than either of them alone. The ingredient is correlation, not returns."
sources:
  - {title: "Portfolio Selection", author: "Harry Markowitz", year: 1952, type: paper, url: "https://doi.org/10.2307/2975974"}
  - {title: "Modern portfolio theory", type: wiki, url: "https://en.wikipedia.org/wiki/Modern_portfolio_theory"}
  - {title: "Diversification (finance)", type: wiki, url: "https://en.wikipedia.org/wiki/Diversification_(finance)"}
dates: {written: 2026-09-19, event: 1952-03-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The only free lunch in finance is a covariance term

Before 1952, choosing investments meant choosing good investments: study each company, rank them, buy the best ones. Harry Markowitz, then a graduate student, pointed out that this is the wrong object entirely. You do not hold a security, you hold a portfolio, and the risk of a portfolio is not the average of the risks of its parts.

The reason is that the pieces move against each other. When one asset falls, another sometimes rises, and their fluctuations partially cancel. Expected return is an average and cannot be improved by rearranging; risk is not an average and can be. That asymmetry is the free lunch, and it is the only one in the field that survives scrutiny.

Then comes the part everyone forgets. The cancellation only works on the part of the risk that is specific to each asset. The part everything shares — the recession, the devaluation, the rate hike — does not cancel, however many names you hold.

So diversification has a floor, and the floor has a formula.

## Rigor

For weights $w$, expected returns $\mu$ and covariance matrix $\Sigma$, the portfolio has mean $w'\mu$ and variance $w'\Sigma w$. The efficient frontier solves

$$\min_{w}\ w'\Sigma w\quad\text{subject to}\quad w'\mu=\bar\mu,\ \ w'\mathbf{1}=1,$$

a quadratic programme whose solution traces a hyperbola in mean–standard-deviation space.

The floor shows up in the symmetric case: $n$ assets, each with variance $\sigma^2$, every pair correlated $\rho$, equal weights. Then

$$\operatorname{Var}(R_p)=\frac{\sigma^{2}}{n}+\Big(1-\frac{1}{n}\Big)\rho\sigma^{2}\ \xrightarrow[n\to\infty]{}\ \rho\sigma^{2}.$$

The first term — idiosyncratic risk — vanishes at rate $1/n$. The second does not vanish at all. With $\rho=0.3$ you can never get portfolio volatility below about $55\%$ of a single asset's, no matter how many stocks you buy. Only $\rho=0$ gives the textbook picture of risk going to zero.

That residual $\rho\sigma^2$ is systematic risk, and because it cannot be diversified away, it is the only risk a competitive market should pay you to bear. The capital asset pricing model is that sentence turned into an equation.

## Recall
type: mcq
Q: You hold 500 stocks instead of 50. What happens to portfolio risk?
- [x] The idiosyncratic part shrinks roughly like $1/n$ and is already tiny at 50; the shared component $\rho\sigma^2$ is untouched. — most of the benefit of diversification arrives early, and the floor is set by correlation.
- [ ] Risk falls by a factor of ten, since variance scales with $1/n$. — only the first term scales that way; the covariance term does not.
- [ ] Risk goes to zero in the limit of many stocks. — that requires zero correlation between them, which markets do not offer.
- [ ] Risk rises, because you are forced into worse companies. — expected return may fall, but the variance argument does not depend on quality.
