---
id: econ.behavioral.social-preferences.strangers-do-not-share-your-genes
topic: econ.behavioral.social-preferences
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, open-problem]
tags: [kin-selection, hamiltons-rule, inequity-aversion, fehr-schmidt, altruism]
prerequisites: [econ.game-theory.what-is-a-game, bio.evolution.kin-selection-altruism]
callback: {from: bio.evolution.kin-selection-altruism, to: econ.behavioral.social-preferences}
hook: "Hamilton's rule explains why you would die for two brothers. It predicts zero for an anonymous stranger. People give anyway."
sources:
  - {title: "Kin selection", type: wiki, url: "https://en.wikipedia.org/wiki/Kin_selection"}
  - {title: "Inequity aversion", type: wiki, url: "https://en.wikipedia.org/wiki/Inequity_aversion"}
  - {title: "A theory of fairness, competition, and cooperation, Quarterly Journal of Economics 114(3)", author: "Fehr & Schmidt", year: 1999, type: paper, url: "https://doi.org/10.1162/003355399556151"}
  - {title: "Ultimatum game", type: wiki, url: "https://en.wikipedia.org/wiki/Ultimatum_game"}
dates: {written: 2026-09-19}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Added Fehr and Schmidt (1999) as the source for the inequity-aversion function used in the rigor layer."}
---

# Remember Hamilton's rule? Strangers share none of your genes

Remember Hamilton's rule — altruism pays when $rB>C$, with $r$ the fraction of your genome the beneficiary carries? It handles a worker bee and a ground squirrel's alarm call beautifully. Now point it at somebody handing money to an anonymous stranger, in a one-shot laboratory game, with nobody watching and no chance of meeting again.

Here $r\approx 0$, the benefit lands on someone else, and the cost is real. Hamilton's rule says: give nothing. Across fifteen societies the mean offer was never nothing.

The explanations are genuinely in dispute. One camp says the machinery is misfiring — our instincts were shaped in small groups where nobody was ever truly anonymous or truly one-shot, so the laboratory is an evolutionary optical illusion. Another says the preference is real, built by culture and competition between groups, and that people simply value fairness.

Either way economics needs a utility function that does not maximise own money. The standard one has a shape worth knowing.

## Rigor

Hamilton's rule is a condition on inclusive fitness: a helping allele spreads when $rB>C$, with $r$ the relatedness coefficient, $B$ the recipient's fitness gain and $C$ the actor's cost. For anonymous strangers $r\to 0$ and the inequality fails for every $C>0$.

Economists instead fit **inequity aversion**. Fehr and Schmidt's two-player form is

$$U_i(x)=x_i-\alpha_i\max\{x_j-x_i,\,0\}-\beta_i\max\{x_i-x_j,\,0\},\qquad \beta_i\le\alpha_i,\ \ 0\le\beta_i<1,$$

where $\alpha_i$ measures how much you dislike having less than the other player and $\beta_i$ how much you dislike having more.

One function reproduces both halves of the ultimatum game. A responder offered 20 out of 100 compares $20-\alpha_i(80-20)$ with $0$, so anyone with $\alpha_i>1/3$ refuses. A proposer who anticipates that offers just enough to clear the threshold. And a proposer with $\beta_i>1/2$ hands over half even when refusal is impossible, which is what dictator games show.

Notice what the model does not do: it puts fairness in the preferences and says nothing about where the preferences came from. For kin, Hamilton's rule answers that. For strangers, the argument is open.

## Recall
type: mcq
Q: Why is Hamilton's rule not an explanation of giving in one-shot anonymous games?
- [x] Relatedness is essentially zero — so $rB>C$ fails for any positive cost and the rule predicts nothing is given.
- [ ] Hamilton's rule applies only to insects — it is a general condition on inclusive fitness, derived for any population.
- [ ] Laboratory stakes are too small to matter — the same pattern shows up when the stake is a day's or a week's wages.
