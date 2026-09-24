---
id: econ.game-theory.social-choice.two-friends-two-restaurants
topic: econ.game-theory.social-choice
topics: [math.algebra.group-actions]
format: challenge
difficulty: 3
language: en
weight: medium
angles: [paradox, connection, practical]
tags: [anonymity, neutrality, tie-breaking, moulin, may-theorem, group-actions]
context: context:2026-09:abstract-algebra
hook: "Two people, two options, a rule that never ties and plays no favourites. Try to design one before reading on."
related: [econ.game-theory.social-choice.what-arrow-actually-forbids]
sources:
  - {title: "May's theorem", type: wiki, url: "https://en.wikipedia.org/wiki/May%27s_theorem"}
  - {title: "Breaking ties in collective decision making (states Moulin's 1983 condition)", author: "Daniela Bubboloni, Michele Gori", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.10165"}
dates: {written: 2026-09-23}
author: author-econ-1
reviewed: {by: reviewer-econ-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Moulin's condition verified via Bubboloni-Gori fn. 1. The claim that their proofs use Lagrange's and Cauchy's theorems is not in the cited paper; replaced with their actual criterion, a condition on profile stabilisers."}
---

# Two friends, two restaurants: design a fair rule that never ties

You and a friend choose dinner by a rule. The rule sees both preferences and must always name exactly one restaurant. It must be fair to people: swap who said what, and the outcome cannot change. It must be fair to restaurants: rename them on both ballots, and the outcome gets renamed too.

When you agree, it is easy. The case that matters is disagreement.

Before opening anything, write the rule down: an outcome for each of the four possible pairs of ballots.

If you get stuck, look at what the two conditions do to that single disagreeing pair of ballots. Every committee with an even number of members hits the same wall.

## Rigor

The two-person case is an orbit argument. Let $P$ be the disagreement profile: you rank $X>Y$, your friend $Y>X$. Let $\sigma$ swap the restaurants and $\pi$ swap the people. Renaming the restaurants on both ballots produces the same two ballots with the people exchanged: $\sigma P=\pi P$. Neutrality says $f(\sigma P)=\sigma f(P)$; anonymity says $f(\pi P)=f(P)$. Hence $\sigma f(P)=f(P)$: the winner is fixed by $\sigma$, which has no fixed points.

**Theorem (Moulin, 1983).** With $n$ voters and $m$ alternatives, a rule that always picks one winner and is anonymous, neutral and Pareto efficient exists iff $\gcd(n,m!)=1$, that is, iff no $d$ with $2\le d\le m$ divides $n$.

*Necessity.* Suppose $d\mid n$, $2\le d\le m$. Let $\sigma$ be a $d$-cycle on alternatives $a_1,\dots,a_d$ and $R$ a ranking with those $d$ on top. Split the voters into $d$ equal blocks; block $k$ reports $\sigma^kR$. Applying $\sigma$ to every ballot moves block $k$'s ballot to block $k+1$'s, a permutation of voters, so again $\sigma f(P)=f(P)$. Everyone ranks $a_1,\dots,a_d$ above the rest, so Pareto puts the winner among them, where $\sigma$ fixes nothing.

With $n=m=3$ this profile is Condorcet's cycle. Bubboloni and Gori extend such results to partial anonymity and neutrality, and their criterion is again a condition on the stabiliser of every profile, the object the dinner argument used.

## Recall
type: reveal
Q: Can the dinner rule exist? If not, what do real committees give up?
A: No. When you disagree, renaming the restaurants gives the same ballots with the people swapped, so the two fairness conditions force the winner to equal its own swap, and neither restaurant does. Real committees drop one condition: a chair's casting vote breaks fairness to people; "a tied motion fails" breaks fairness to options by favouring the status quo.
