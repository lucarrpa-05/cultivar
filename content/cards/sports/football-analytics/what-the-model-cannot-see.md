---
id: sports.football-analytics.pressing-tactics-data.what-the-model-cannot-see
topic: sports.football-analytics.pressing-tactics-data
format: series
difficulty: 2
language: en
weight: medium
angles: [mistake, tool]
tags: [ppda, pressing, model-limits, measurement, counter-pressing]
hook: "PPDA measures a press with a ratio anyone can compute. That is exactly why it gets misread."
series: {id: sports.football-analytics.counting-arc, index: 4, total: 4, title: "How football learned to count"}
prerequisites: [sports.football-analytics.expected-goals]
sources:
  - {title: "Defensive Metrics: Measuring the Intensity of a High Press", type: blog, url: "https://blogarchive.statsbomb.com/articles/soccer/defensive-metrics-measuring-the-intensity-of-a-high-press/"}
  - {title: "Expected goals", type: wiki, url: "https://en.wikipedia.org/wiki/Expected_goals"}
dates: {written: 2026-09-19}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved, notes: "PPDA dated to Colin Trainor's StatsBomb article of July 2014, not 'around 2013'."}
---

# A number that goes down when you press harder

Pressing is the hardest thing in football to count, because a successful press produces *nothing*: no tackle, no interception, no event at all. The opponent simply declines to play the pass.

The workaround, Colin Trainor's on StatsBomb in July 2014, is PPDA — passes allowed per defensive action. Count the opponent's passes in the attacking sixty per cent of the pitch, divide by your tackles, interceptions, fouls and challenges there. Let them pass eight times per intervention and you are hounding them; fourteen and you are sitting off. Note the direction: a *lower* PPDA means a *more* aggressive press. Half the bad analysis in football comes from that inverted sign.

And the metric has a hole in the middle of it. A team so intimidating that the opponent never plays forward at all records almost no defensive actions and almost no opponent passes, and PPDA shrugs.

Every number in this series has the same shape of flaw. Here is the ledger.

## Rigor

$$\mathrm{PPDA}=\frac{\#\{\text{opponent passes in the attacking } 60\%\}}{\#\{\text{tackles}+\text{interceptions}+\text{challenges}+\text{fouls there}\}}$$

The denominator is the problem: it counts *attempts to intervene*, which is a proxy for pressure and not pressure itself. Deterrence is invisible to it, and so is a press that works by shaping passes rather than stopping them.

Run the same audit back through the series. Episode 1: xG is an average over a crowd of similar shots, so per-match deviations are mostly variance, and the model does not know that this striker is Haaland. Episode 2: expected threat and VAEP price actions using only ball-state, so an identical pass into an identical zone scores identically whether it broke a line or not. Episode 3: pitch control knows where the players are, never why — a defender holding a deliberate trap looks exactly like a defender out of position.

The honest summary is that these models measure *how much a situation is worth on average*, and football is played one situation at a time. That is not a reason to ignore them. It is the reason nobody has ever scored 0.79 of a goal, and the reason you still want to know which shots are worth 0.79.

## Recall
type: mcq
Q: A side switches to an aggressive high press. What should happen to its PPDA?
- [x] It should fall — PPDA counts opponent passes per defensive action, so more intervention per pass makes the ratio smaller.
- [ ] It should rise — that is the common misreading; the metric is a ratio of passes allowed, not of pressure applied.
- [ ] It should stay flat — pressing changes both parts of the ratio, but not by the same factor.
