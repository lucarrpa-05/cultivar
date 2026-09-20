---
id: sports.football-analytics.ratings-elo.remember-bayes
topic: sports.football-analytics.ratings-elo
format: callback
difficulty: 2
language: en
weight: heavy
angles: [connection, tool]
tags: [elo, bayesian-updating, logistic-model, gradient-ascent, glicko]
hook: "New rating = old rating + K × (what happened − what you expected). That is Bayes with the variance nailed shut."
callback: {from: math.probability.conditional-bayes, to: sports.football-analytics.ratings-elo}
prerequisites: [math.probability.conditional-bayes]
sources:
  - {title: "Elo rating system", type: wiki, url: "https://en.wikipedia.org/wiki/Elo_rating_system"}
  - {title: "Glicko rating system", type: wiki, url: "https://en.wikipedia.org/wiki/Glicko_rating_system"}
dates: {written: 2026-09-19}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Elo's own model used a normal curve; the logistic form came later. Corrected."}
---

# Remember Bayes? Every Elo rating is a posterior that forgot its error bars.

Bayes told you how to change your mind: start with a belief, see evidence, move in proportion to how surprising the evidence was. Elo ratings do exactly that, in one line, and have done since 1960.

A rating is a belief about strength. Before a match, the ratings imply an expected score $E$ — Elo's own model used a normal curve; the logistic version everyone now uses is calibrated so that 400 points of gap means ten-to-one odds. After the match you observed $S$: 1, 0.5 or 0. The update is

$$R' = R + K\,(S-E).$$

Old belief, plus a step proportional to the surprise. If the result was exactly what you expected, $S=E$ and nothing moves — a Bayesian update with zero information content.

What Elo throws away is the *uncertainty*. A real posterior narrows as evidence accumulates; Elo's $K$ is a constant, so a player with 800 games and a player with 8 move by the same amount. Mark Glickman's Glicko system restores it by tracking a rating deviation alongside the rating, which is the Kalman-filter version of the same idea.

And there is a second reading of that one line.

## Rigor

Write $p=\Pr(A\text{ wins})=\sigma\!\left(\frac{\ln 10}{400}(R_A-R_B)\right)$, which is Elo's $E_A=\left(1+10^{(R_B-R_A)/400}\right)^{-1}$ in logistic form.

Treat the result $S\in\{0,1\}$ as Bernoulli and take the log-likelihood $\ell=S\ln p+(1-S)\ln(1-p)$. Differentiating a logistic log-likelihood with respect to its linear predictor gives the residual, so

$$\frac{\partial \ell}{\partial R_A}=\frac{\ln 10}{400}\,(S-p).$$

A gradient-ascent step of size $\eta$ is therefore $\Delta R_A=\eta\frac{\ln 10}{400}(S-E)$ — which is Elo's rule with $K=\eta\ln 10/400$.

So the same three symbols are three things at once: a Bayesian update with fixed gain, one step of stochastic gradient ascent on a Bradley–Terry logistic model, and a bookkeeping rule a physics professor designed for chess clubs to run by hand. $K$ is simultaneously the prior's stubbornness and the learning rate, which is why every league argues about it: small $K$ trusts history, large $K$ trusts last Sunday.

## Recall
type: mcq
Q: In $R'=R+K(S-E)$, what is $K$ doing?
- [ ] Converting between points and goals — Elo's inputs are results, not margins; $K$ has nothing to do with goals.
- [x] Setting how much one result moves your belief — it is simultaneously the fixed gain of a Bayesian update and the learning rate of a gradient step, which is why it is a tuning choice, not a fact.
- [ ] Normalising the ratings so they sum to a constant — ratings are already a zero-sum transfer; $K$ scales the transfer, it does not enforce it.
