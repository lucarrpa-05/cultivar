---
id: econ.econometrics.bayesian.the-prior-you-already-had
topic: econ.econometrics.bayesian
format: callback
difficulty: 4
language: en
weight: heavy
angles: [connection, tool]
tags: [bayesian-econometrics, priors, shrinkage, posterior, identification]
callback: {from: math.probability.conditional-bayes, to: econ.econometrics.bayesian}
hook: "Point the rule for changing your mind at a coefficient, and a shrunken estimate stops being a compromise and becomes a posterior."
sources:
  - {title: "Bayesian econometrics", type: wiki, url: "https://en.wikipedia.org/wiki/Bayesian_econometrics"}
  - {title: "Bayesian linear regression", type: wiki, url: "https://en.wikipedia.org/wiki/Bayesian_linear_regression"}
  - {title: "Forecasting and Conditional Projection Using Realistic Prior Distributions", author: "Thomas Doan, Robert B. Litterman & Christopher A. Sims", year: 1984, type: paper, url: "https://doi.org/10.1080/07474938408800053"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Minnesota-prior source authors corrected to Doan, Litterman and Sims (1984) per Crossref."}
---

# Remember Bayes as a rule for changing your mind? Now do it to a coefficient

When you met Bayes it was about hypotheses: a prior, some evidence, a posterior that is neither. Point it at a regression coefficient and the whole logic of estimation shifts under you.

A frequentist estimate answers "what value of $\beta$ makes this data least surprising?" A Bayesian one answers "given what I believed before, what should I believe now?" — and the answer is a distribution, not a number with an interval bolted on. The practical difference shows up in three places economists care about.

Small samples: you have 40 quarters of data and 60 parameters in a vector autoregression. Least squares gives you noise with confidence. A prior that says "coefficients are probably near zero and last quarter matters more than eight quarters ago" produces forecasts that actually work — this is the Minnesota prior, and it beat the big structural models in the 1980s.

Weak identification: when the data barely pin a parameter down, the posterior simply stays close to the prior and *tells you so*, instead of reporting a confident nonsense estimate.

And the cost is stated out loud, which is the point.

## Rigor

With $y=X\beta+\varepsilon$, $\varepsilon\sim N(0,\sigma^2 I)$ and prior $\beta\sim N(b_0,\Sigma_0)$, the posterior is normal with

$$\bar\Sigma=\Big(\Sigma_0^{-1}+\tfrac{1}{\sigma^{2}}X'X\Big)^{-1},\qquad \bar b=\bar\Sigma\Big(\Sigma_0^{-1}b_0+\tfrac{1}{\sigma^{2}}X'y\Big),$$

a precision-weighted average of prior mean and OLS. Two limits worth holding: as $\Sigma_0^{-1}\to 0$ (a flat prior) you recover OLS, and with $b_0=0$, $\Sigma_0=\tau^2 I$ you recover ridge with $\lambda=\sigma^2/\tau^2$. Shrinkage is not a hack; it is what a posterior does.

The sharp point is identification. If a parameter is not identified, the likelihood is flat in that direction and $X'X$ contributes nothing there — so the posterior in that direction equals the prior, exactly. Bayesian machinery always returns an answer; whether the answer came from the data or from you is a question the marginal posterior can be made to reveal, by refitting under a deliberately different prior.

## Recall
type: mcq
Q: A parameter is not identified by the data. What does its Bayesian posterior look like?
- [x] Identical to its prior in that direction — the likelihood is flat there, so the data move nothing. — you still get an answer, which is why prior sensitivity has to be reported.
- [ ] Flat and uninformative, signalling that estimation failed. — the posterior stays perfectly proper if the prior was; nothing visibly breaks.
- [ ] Centred on the OLS estimate with very wide intervals. — there is no unique OLS estimate to centre on when the direction is unidentified.
- [ ] Undefined, because Bayes needs identification. — Bayesian updating is well defined without identification, which is both its strength and its trap.
