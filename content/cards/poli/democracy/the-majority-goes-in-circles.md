---
id: poli.democracy.condorcet-paradoxes.the-majority-goes-in-circles
topic: poli.democracy.condorcet-paradoxes
format: series
difficulty: 2
language: en
weight: heavy
angles: [paradox, history]
tags: [condorcet, voting-cycle, majority-rule, agenda-setting, pairwise-votes]
hook: "Three voters, three options, and the majority prefers A to B, B to C, and C to A."
series: {id: poli.democracy.hard-to-define, index: 2, total: 4, title: "Why democracy is hard to define"}
sources:
  - {title: "Condorcet paradox", type: wiki, url: "https://en.wikipedia.org/wiki/Condorcet_paradox"}
  - {title: "Essai sur l'application de l'analyse à la probabilité des décisions rendues à la pluralité des voix", author: "Nicolas de Condorcet", year: 1785, type: book, url: "https://en.wikipedia.org/wiki/Marquis_de_Condorcet"}
  - {title: "Condorcet method", type: wiki, url: "https://en.wikipedia.org/wiki/Condorcet_method"}
diagram: {file: poli/condorcet-cycle.svg, caption: "Three rankings, three pairwise votes, and the winners close a loop.", alt: "Three voters' rankings beside a triangle whose arrows run A to B, B to C and C back to A, each labelled 'beats 2-1'"}
dates: {written: 2026-09-19, event: 1785-01-01}
author: author-humanities-1
reviewed: {by: reviewer-humanities-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Episode pointed forward to episode 4 and skipped episode 3; gap rewritten to hand off to the repair attempt."}
---

# The majority can want A over B, B over C, and C over A

Ana ranks A, B, C. Beto ranks B, C, A. Caro ranks C, A, B. Now vote on pairs. A beats B two to one. B beats C two to one. And C beats A two to one.

Nobody was irrational. Every voter has a perfectly ordinary, transitive ranking. The cycle appears only when you add them up: majority rule takes three sensible orders and returns a loop. Which means "what the majority wants" can simply fail to exist, and whoever controls the order of the votes controls the outcome. Put your favourite last and it wins, because it only has to survive one round.

The Marquis de Condorcet found this in 1785, in an essay mostly about whether juries get verdicts right. He died in a revolutionary prison in 1794 and the paradox was more or less forgotten until the 1940s.

Here is what the cycle looks like written out.

## Rigor

Write $x \succ_M y$ for "a strict majority ranks $x$ above $y$". In the profile above,
$$A \succ_M B, \quad B \succ_M C, \quad C \succ_M A,$$
so $\succ_M$ is complete but not transitive, even though each $\succ_i$ is a complete transitive order.

A **Condorcet winner** is an alternative that beats every other in a pairwise majority vote. This profile has none. That is the content of the paradox: the "beats" relation induced by majority rule need not have a maximal element.

How common is it? Under the *impartial culture* assumption — each voter independently draws one of the $3! = 6$ strict orders uniformly — the probability that three alternatives produce a cycle rises with the electorate and tends to about $8.77\%$. Impartial culture is a deliberately pessimistic model: real electorates cluster, and clustering is exactly what kills cycles — which episode 4 will cash in. The first instinct, though, is to blame the instrument: majority rule is crude, so build a better rule. Episode 3 is about why nobody can.

## Recall
type: mcq
Q: In a Condorcet cycle, who is behaving irrationally?
- [ ] The voters, since their rankings contradict each other — each voter's own ranking is perfectly transitive.
- [x] Nobody — the intransitivity is created by the aggregation rule, not by any individual.
- [ ] The agenda-setter, who breaks the tie arbitrarily — the agenda-setter is exploiting the cycle, not causing it.
