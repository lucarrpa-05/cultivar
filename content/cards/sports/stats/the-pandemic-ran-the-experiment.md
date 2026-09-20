---
id: sports.stats.home-advantage.the-pandemic-ran-the-experiment
topic: sports.stats.home-advantage
format: idea
difficulty: 2
language: en
weight: medium
angles: [numbers, connection]
tags: [home-advantage, ghost-games, bundesliga, yellow-cards, covid-natural-experiment]
hook: "In 2020 football played 83 Bundesliga matches with nobody watching. Home advantage went negative."
related: [sports.stats.home-advantage.empty-stadiums-in-sicily]
sources:
  - {title: "Covid-19 Has Turned Home Advantage Into Home Disadvantage in the German Soccer Bundesliga", author: "Markus Tilp and Sigrid Thaller", year: 2020, type: paper, url: "https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2020.593499/full"}
  - {title: "Home advantage", type: wiki, url: "https://en.wikipedia.org/wiki/Home_advantage"}
dates: {written: 2026-09-19, event: 2020-05-16}
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The best experiment in sports science was an accident

The Sicilian closures of 2007 gave economists a few dozen silent matches. In 2020 a pandemic gave them entire leagues.

Tilp and Thaller took the 2019/20 Bundesliga, split it at the shutdown, and measured home advantage as the share of all points that went to home teams. With crowds, across 223 matches: 54.35%. In the 83 "ghost games" after the restart: 44.1%. Home teams went from taking more than half the points on offer to taking less than half. The advantage did not shrink. It inverted.

The referees' side of the ledger is sharper still. With spectators, home sides collected 44.85% of yellow cards and away sides 55.15% — a visible tilt. Without spectators: 51.1% and 48.9%, statistically indistinguishable from even.

One league, one season, small samples, and other things changed too (no travel fatigue for anyone, matches rescheduled, substitutions expanded). But the direction replicates across leagues, and it lines up with the Italian result.

The arithmetic of what "44.1%" is measuring is worth doing slowly.

## Rigor

Home advantage here is $\text{HA}=P_{\text{home}}/(P_{\text{home}}+P_{\text{away}})$, the fraction of all league points taken by home sides. Under perfect symmetry $\text{HA}=0.5$; the 2018/19 benchmark was 57.63%.

Two cautions an econometrician should raise. First, this is a before/after comparison within one season, not a randomised assignment: the shutdown coincides with a fixture pile-up, a long layoff and five-substitution rules, all of which plausibly move outcomes. The Italian 2007 design is cleaner precisely because closed-door and open matches ran *in parallel*.

Second, sample size. With 83 matches and roughly $3\times 83$ points at stake, the standard error on a proportion near $0.5$ is about $\sqrt{0.25/249}\approx 0.032$ — three percentage points. A 10-point swing clears that, but only just, and a single league-season is one draw from the distribution, not the distribution.

The right reading: crowds move referees, robustly; how much of *home advantage* that explains is still being argued.

## Recall
type: mcq
Q: Why is the Italian 2007 closed-door study a cleaner design than the 2020 Bundesliga comparison?
- [x] Closed-door and normal matches ran during the same period, so season-wide changes cannot explain the difference — the 2020 split coincides with a layoff, new substitution rules and a congested calendar.
- [ ] It used more matches — it used far fewer; the strength is in the comparison group, not the sample size.
- [ ] It measured cards rather than points — both studies looked at cards; the metric is not what separates the designs.
