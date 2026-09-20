---
id: sports.football-analytics.poisson-models.goals-are-poisson-until-they-are-not
topic: sports.football-analytics.poisson-models
format: idea
difficulty: 2
language: en
weight: heavy
angles: [tool, numbers]
tags: [poisson, dixon-coles, scorelines, maximum-likelihood, time-decay]
hook: "Model goals as two independent Poisson counts and you predict almost every scoreline correctly — except the ones that decide seasons."
prerequisites: [math.probability.random-variables]
sources:
  - {title: "Modelling Association Football Scores and Inefficiencies in the Football Betting Market", author: "Mark J. Dixon and Stuart G. Coles", year: 1997, type: paper, url: "https://academic.oup.com/jrsssc/article-abstract/46/2/265/6990546"}
  - {title: "Predicting football results with statistical modelling: Dixon-Coles and time-weighting", type: blog, url: "https://dashee87.github.io/football/python/predicting-football-results-with-statistical-modelling-dixon-coles-and-time-weighting/"}
dates: {written: 2026-09-19, event: 1997-01-01}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Corrected which scorelines independent Poissons misfit (0-0 and 1-1 are under-predicted, not 1-0/0-1); added the negative sign of rho; repaired broken KaTeX cases rows."}
---

# Two Poissons get football almost exactly right, and fail at 0–0

Goals are rare and scattered through ninety minutes, which is the situation Poisson was invented for. So the simplest serious model of a football match is two Poisson counts: one for the home side with rate $\lambda$, one for the away side with rate $\mu$, drawn independently. Give every club an attack parameter and a defence parameter, add one constant for playing at home, fit by maximum likelihood, and you can price every scoreline in the league.

It is almost embarrassingly good. Almost — because the *independence* is a lie exactly where it matters. Count real results and the low-scoring draws — 0–0 and 1–1 — show up more often than two independent Poissons say, while 1–0 and 0–1 show up less. Low-scoring matches are not two separate stories; a tight game makes both teams cagey.

Dixon and Coles fixed it in 1997 with the minimum possible violence: one extra parameter that nudges only those four scorelines, plus a rule that last month counts more than last year.

## Rigor

Home and away rates for the match between $i$ and $j$:

$$\lambda=\exp(\alpha_i+\beta_j+\gamma),\qquad \mu=\exp(\alpha_j+\beta_i),$$

with $\alpha$ attack, $\beta$ defence, $\gamma$ home advantage. The Dixon–Coles likelihood for a result $(x,y)$ is the independent-Poisson product multiplied by

$$\tau_{\lambda,\mu}(x,y)=\begin{cases}1-\lambda\mu\rho & x=y=0\\ 1+\lambda\rho & x=0,\,y=1\\ 1+\mu\rho & x=1,\,y=0\\ 1-\rho & x=y=1\\ 1 & \text{otherwise.}\end{cases}$$

Setting $\rho=0$ recovers plain independent Poissons, so $\rho$ is a single, testable departure from independence, and the correction vanishes above one goal each. Fitted on real leagues $\hat\rho$ comes out negative, around $-0.13$: probability moves into 0–0 and 1–1 and out of 1–0 and 0–1, which is the cagey-game story in one number.

Their second idea matters just as much: weight each past match by $\phi(t)=e^{-\xi t}$, $t$ being how long ago it was played, so that the likelihood is a *local* one. Team strength is not a constant to be estimated; it is a slowly moving target, and $\xi$ says how fast you think it moves.

Their own test was a betting strategy on 1995–96 odds, and it returned a profit — the strongest thing you can say about a model of anything.

## Recall
type: mcq
Q: What does the Dixon–Coles parameter $\rho$ do?
- [ ] It makes goals arrive non-uniformly through the match — the Poisson rate is already constant by assumption; $\rho$ does not touch timing.
- [x] It adjusts the four scorelines with at most one goal each — exactly where independent Poissons misfit the data, and setting it to zero recovers plain independent Poissons.
- [ ] It down-weights older matches — that is the separate time-decay term $\phi(t)=e^{-\xi t}$.
- [ ] It measures home advantage — that is $\gamma$, which sits inside the home rate.
