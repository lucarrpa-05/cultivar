---
id: sports.football-analytics.expected-goals.what-a-shot-is-worth
topic: sports.football-analytics.expected-goals
format: series
difficulty: 2
language: en
weight: heavy
angles: [tool, numbers]
tags: [expected-goals, xg, logistic-regression, shot-quality, variance]
hook: "Every penalty in Opta's model is worth exactly 0.79 goals. Not this penalty — penalties."
series: {id: sports.football-analytics.counting-arc, index: 1, total: 4, title: "How football learned to count"}
sources:
  - {title: "What are expected goals (xG)?", type: article, url: "https://theanalyst.com/articles/what-is-expected-goals-xg"}
  - {title: "Expected goals", type: wiki, url: "https://en.wikipedia.org/wiki/Expected_goals"}
dates: {written: 2026-09-19}
diagram: {file: sports/xg-shot-map.svg, caption: "The same six shots, sized by what history says they are worth: value collapses with distance and with angle.", alt: "A plan view of a penalty area with six shot markers of different sizes, largest from the penalty spot and centre of the six-yard box, smallest from thirty metres and from a tight angle by the byline"}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Nobody has ever scored 0.79 of a goal

Opta gives every penalty the same value: 0.79 expected goals, the historical conversion rate. Not because *this* penalty is 79% likely, but because penalties as a class go in about four times in five. That is the whole trick of expected goals, and also the whole limitation.

An xG model looks at a shot and mostly ignores who took it. It sees distance, angle, body part, whether it came from a cross or a through ball, how much of the goal was visible, where the keeper was standing — Opta's version uses more than twenty such variables — and returns the fraction of historically similar shots that ended in the net. Add those fractions across a match and you have a sentence: *given the chances you created, this is what an average finisher would have scored.*

That number separates the two things a scoreline welds together: how many chances you made, and whether they went in. But an average is a property of a crowd, and no single shot is a crowd.

Here is what "the fraction of similar shots" is, as a model.

## Rigor

An xG model is a binary classifier fitted to hundreds of thousands of historical shots. Let $x_i$ collect the features of shot $i$ and fit

$$\Pr(\text{goal}\mid x)=\sigma(\beta^{\top}x),\qquad \sigma(z)=\frac{1}{1+e^{-z}}$$

by maximum likelihood — logistic regression, or a gradient-boosted tree doing the same job with interactions. A team's match xG is $\sum_i p_i$ with $p_i=\sigma(\beta^{\top}x_i)$.

Now make "an average is a property of a crowd" precise. Goals scored is a sum of Bernoulli draws, a Poisson-binomial variable, so

$$\operatorname{Var}\!\left(\sum_i G_i\right)=\sum_i p_i(1-p_i).$$

Twelve shots averaging $p=0.125$ give $\text{xG}=1.5$ and a standard deviation of $1.15$ goals. A team that "underperformed its xG by one" in a match has told you nothing at all. Run the same arithmetic over a season — 500 shots, $\text{xG}\approx 60$ — and the standard deviation is about 7. Only then does finishing skill poke above the noise.

One quiet assumption: that the draws are independent. A rebound is a shot conditioned on the shot before it. And a deeper problem is waiting — almost every minute of a football match contains no shot at all.

## Recall
type: mcq
Q: A striker's shots this season total 14 xG and he has scored 9. What is the most defensible reading?
- [ ] He is a bad finisher — one season of shots is far too few to separate finishing skill from variance.
- [x] Probably bad luck, possibly bad finishing, and the sample can't yet tell you which — the standard deviation on 14 xG is roughly 3 goals.
- [ ] The model is broken — xG is an average over similar shots, so individual deviations are expected, not evidence of a bug.
