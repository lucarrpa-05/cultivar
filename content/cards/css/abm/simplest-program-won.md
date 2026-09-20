---
id: css.abm.axelrod-cooperation.simplest-program-won
topic: css.abm.axelrod-cooperation
format: idea
difficulty: 2
language: en
weight: heavy
angles: [history, numbers, mistake]
tags: [axelrod, tit-for-tat, prisoners-dilemma, tournaments, rapoport]
hook: "Fourteen game theorists submitted programs. The shortest one beat all of them, twice."
sources:
  - {title: "Effective Choice in the Prisoner's Dilemma", author: "Robert Axelrod", year: 1980, type: paper, url: "https://doi.org/10.1177/002200278002400101"}
  - {title: "More Effective Choice in the Prisoner's Dilemma", author: "Robert Axelrod", year: 1980, type: paper, url: "https://doi.org/10.1177/002200278002400301"}
  - {title: "The Evolution of Cooperation", author: "Robert Axelrod and William D. Hamilton", year: 1981, type: paper, url: "https://doi.org/10.1126/science.7466396"}
  - {title: "The Evolution of Cooperation (book)", type: wiki, url: "https://en.wikipedia.org/wiki/The_Evolution_of_Cooperation"}
  - {title: "No pure strategy is evolutionarily stable in the repeated Prisoner's Dilemma game", author: "Robert Boyd and Jeffrey Lorberbaum", year: 1987, type: paper, url: "https://doi.org/10.1038/327058a0"}
dates: {written: 2026-09-19, event: 1980-03-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Cut 'three countries and five disciplines' (uncheckable); added an open source. Tournament tallies are Axelrod's own and internally consistent (15 rules x 120 pairings x 200 x 5 x 2 = 240,000)."}
author: author-css-1
---

# The shortest program in the room won, twice

In 1979 Robert Axelrod wrote to game theorists, economists, psychologists and sociologists and asked them to submit a program that would play the repeated prisoner's dilemma. Fourteen entries arrived, plus a RANDOM rule everyone knew would be in there. Round robin, every program against every program and against its own twin, exactly 200 moves a game, the whole thing run five times: 240,000 choices.

The winner, submitted by Anatol Rapoport of Toronto, was the simplest program anyone sent. Cooperate on move one. After that, copy whatever the other side just did. TIT FOR TAT averaged 504 points a game, where mutual cooperation throughout would score 600 and mutual defection 200.

Axelrod published the results, invited a second round, and got 62 entries from people who had read them. TIT FOR TAT won again.

The single property that separated the good programs from the bad was not cleverness. It was niceness.

## Rigor

The payoff matrix is the standard one: mutual cooperation 3 each, mutual defection 1 each, and a lone defector takes 5 while the sucker gets 0. So $T>R>P>S$ with $2R>T+S$, and defection strictly dominates in the one-shot game.

Call a rule **nice** if it is never the first to defect. Every one of the top eight entries was nice; none of the others was. Nice rules scored between 472 and 504 on average; the best non-nice rule managed 401. Because two nice rules cooperate all the way through, they each bank about 600 from the encounter, and that block of mutual 600s is where the whole ranking comes from.

Now the part usually left out. TIT FOR TAT never scores more than its partner in a single match — it only ever defects in reply, so it is always one defection behind. It won a *round robin*, not a duel. It collapses under noise, since one misread move locks two copies into alternating retaliation. And Boyd and Lorberbaum (1987) proved that in the repeated prisoner's dilemma no pure strategy is evolutionarily stable, TIT FOR TAT included.

What the tournaments showed is narrower and more useful than "nice guys finish first": in a population of strategies you did not choose, provokable generosity is hard to exploit.

## Recall
type: mcq
Q: What single property best separated the high scorers from the low scorers in Axelrod's first tournament?
- [x] Being nice — never defecting first. All eight top entries were nice and none of the rest were.
- [ ] Beating opponents head-to-head — TIT FOR TAT never scored more than its partner in any single match, and still won.
- [ ] Program complexity — Axelrod reports that neither brevity nor length accounts for a rule's success.
