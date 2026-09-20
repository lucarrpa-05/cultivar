---
id: sports.football-analytics.expected-goals.reep-and-the-long-ball
topic: sports.football-analytics.expected-goals
format: story
difficulty: 1
language: en
weight: medium
angles: [history, mistake]
tags: [charles-reep, base-rates, direct-play, football-analytics-history, notation]
hook: "The first man to put football in a spreadsheet used it to argue against passing. His data said the opposite."
related: [sports.football-analytics.expected-goals.what-a-shot-is-worth]
sources:
  - {title: "Charles Reep", type: wiki, url: "https://en.wikipedia.org/wiki/Charles_Reep"}
  - {title: "Skill and Chance in Association Football", author: "Charles Reep and Bernard Benjamin", year: 1968, type: paper, url: "https://academic.oup.com/jrsssa/article/131/4/581/7104182"}
dates: {written: 2026-09-19, event: 1968-01-01}
rigor: none
rigorNote: "historical; the statistical point is carried in the body"
author: author-sports-niche-1
reviewed: {by: reviewer-sports-niche-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The accountant who proved passing was pointless, wrongly

Charles Reep (1904–2002) was an RAF wing commander who spent decades in English grandstands coding every pass by hand. In 1968 he and the statistician Bernard Benjamin published the result in the *Journal of the Royal Statistical Society*: the founding document of football analytics, with a textbook error for a conclusion.

Reep found that fewer than 80% of goals came from moves of three passes or fewer, and read it as proof that football should be played long and direct. Passing is waste.

Look at the denominator. In the same data, 91.5% of *all* moves were three passes or fewer. Short moves produced 80% of the goals while making up 91.5% of the chances — so the rare long moves converted at a *higher* rate, not a lower one. Reep counted where goals came from and forgot to ask how often each kind of move was attempted.

People acted on it. Reep advised Brentford in 1951, caught Stan Cullis's eye at Wolves, and his ideas still underpinned Egil Olsen's Norway in the 1990s. The correction — normalise by opportunities, then price each one — is what everything since has been about, xG included.

## Recall
type: reveal
Q: Reep saw that most goals came from short passing moves. What did he forget to divide by?
A: The number of moves of each length. Almost all moves were short (91.5%), so short moves scoring 80% of the goals means they converted *worse* per attempt than the rare long moves. Counting outcomes without counting opportunities is a base-rate error.
