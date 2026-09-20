---
id: sports.football-analytics.ratings-elo.fifa-switched-to-elo
topic: sports.football-analytics.ratings-elo
format: story
difficulty: 1
language: en
weight: medium
angles: [mistake, practical]
tags: [fifa-ranking, elo, incentives, goodhart, world-cup-seeding]
hook: "Romania hired a ranking consultant and then refused to play football. It worked."
sources:
  - {title: "FIFA Men's World Ranking", type: wiki, url: "https://en.wikipedia.org/wiki/FIFA_Men%27s_World_Ranking"}
  - {title: "Elo rating system", type: wiki, url: "https://en.wikipedia.org/wiki/Elo_rating_system"}
  - {title: "FIFA/Coca-Cola Men's World Ranking procedure", type: primary, url: "https://inside.fifa.com/fifa-world-ranking/procedure-men"}
dates: {written: 2026-09-19, event: 2018-08-16}
rigor: none
rigorNote: "the incentive story is the card; the Elo mathematics has its own card"
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The ranking you could climb by not playing

Between 2006 and 2018, FIFA ranked national teams on an average of points earned over four years. Average. Which means a win could cost you points — beat a weak side by less than your average, and your average falls.

Teams noticed. In the 2010s the ranking was openly gamed by *refusing fixtures*: since World Cup seeding depended on the December ranking, the optimal strategy before a draw was to play as little as possible, especially against weaker opponents. Romania went as far as appointing a ranking consultant and playing a single friendly in the year before a draw.

A metric that punishes participation is a metric nobody should have shipped. On 16 August 2018, after the World Cup in Russia, FIFA replaced it with an Elo system — the one Arpad Elo built for American chess in 1960 and FIDE adopted in 1970.

Elo has a property the old system lacked: it is a transfer. Points you win are points your opponent loses, so beating anyone is weakly positive and playing more games is never itself a penalty. The incentive to hide disappears because the arithmetic no longer rewards it.

## Recall
type: mcq
Q: Why could a national team's FIFA ranking fall after winning a match under the pre-2018 system?
- [x] Ratings were an average of points per match, so a win worth less than your current average pulls the average down — a classic Goodhart failure.
- [ ] Friendlies did not count at all — they counted, just at a low weight; the problem was averaging, not exclusion.
- [ ] Only goal difference mattered — goals scored were dropped from the formula in 2006.
