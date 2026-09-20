---
id: math.probability.conditional-bayes.what-a-forecast-is-actually-doing
topic: math.probability.conditional-bayes
topics: [poli.democracy.forecasting-polls]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, practical, numbers]
tags: [election-forecasting, correlated-errors, house-effects, poll-aggregation]
hook: "Two forecasters read the same polls and say 1% and 29%. The gap is not the data. It is one assumption."
callback: {from: math.probability.conditional-bayes, to: poli.democracy.forecasting-polls}
sources:
  - {title: "Nate Silver", type: wiki, url: "https://en.wikipedia.org/wiki/Nate_Silver"}
  - {title: "Margin of error", type: wiki, url: "https://en.wikipedia.org/wiki/Margin_of_error"}
  - {title: "Opinion poll", type: wiki, url: "https://en.wikipedia.org/wiki/Opinion_poll"}
dates: {written: 2026-09-19, event: 2016-11-08}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Removed an unsourced \"standard deviation closer to 4 points\" figure; the contrast now rests on what does and does not shrink with n."}
---

# Remember the prior? An election forecast is one, plus polls

Bayes told you that evidence multiplies your odds and never replaces them. An election model is that sentence, industrialised.

The prior comes from things that are known before anyone is polled: how the region voted last time, incumbency, the economy. Each poll is then evidence, with a strength that depends on its sample size, its age, and its house effect — the systematic lean a pollster has shown historically, estimated and subtracted.

So far, so mechanical. The part that decides everything is the error model. If polling misses are independent across states, then twenty states missing in the same direction is astronomically unlikely, and any lead looks safe. If misses are correlated — because pollsters everywhere share the same response-rate problem, or the same turnout model — then one national mistake moves every state at once, and a modest lead is genuinely fragile.

In 2016 the published probabilities for a Trump win ranged from about 1% to FiveThirtyEight's 29%. The polls were the same polls.

## Rigor

Let $Y_s$ be the true margin in state $s$ and $\hat{Y}_s$ the poll average. Model
$$\hat{Y}_s = Y_s + \underbrace{\eta}_{\text{national}} + \underbrace{\varepsilon_s}_{\text{state}},\qquad \eta\sim\mathcal{N}(0,\tau^2),\ \varepsilon_s\sim\mathcal{N}(0,\sigma^2).$$
The correlation between two states' errors is $\rho=\tau^2/(\tau^2+\sigma^2)$.

Take a candidate trailing by $d$ standard deviations in each of $k$ tipping-point states. With $\tau=0$ (independent errors) the chance of flipping all of them decays like $\Phi(-d)^k$ — vanishing. With $\sigma=0$ (perfectly correlated) it is $\Phi(-d)$, no matter how many states. Real models sit between, and the answer is far closer to the second than to the first.

**Sampling error is the small term.** A poll of $n=1000$ has a margin of error of about $\pm3$ points from sampling alone, and that part does shrink like $1/\sqrt{n}$ as you stack polls up. The part $\tau$ captures — a shared turnout model, a shared response-rate problem, house effects that move together — does not shrink at all, and it is what sets the floor.

Which is the Bayesian moral again: piling up evidence only sharpens a belief if the pieces are independent. Correlated evidence is one piece wearing many hats.

## Recall
type: mcq
Q: Why does averaging more polls not drive a forecast's uncertainty toward zero?
- [x] Because polls share systematic errors — the correlated component $\tau$ survives averaging, so the floor on uncertainty is set by bias, not sample size.
- [ ] Because each poll has a large margin of error — sampling error does shrink like $1/\sqrt{n}$; it is not the binding constraint.
- [ ] Because voters change their minds — that is real but separate; even a frozen electorate would leave the correlated error in place.
- [ ] Because the prior dominates once there are many polls — evidence swamps a reasonable prior quickly; the problem is that the evidence repeats itself.
