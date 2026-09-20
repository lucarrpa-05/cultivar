---
id: poli.democracy.arrow.the-second-impossibility
topic: poli.democracy.arrow
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, paradox]
tags: [gibbard-satterthwaite, strategyproofness, manipulation, mechanism-design, social-choice]
hook: "Arrow killed the perfect voting rule. Gibbard and Satterthwaite killed the honest one."
callback: {from: econ.game-theory.social-choice, to: poli.democracy.arrow}
related: [poli.democracy.arrow.no-voting-rule-can-fix-it]
sources:
  - {title: "Gibbard–Satterthwaite theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Gibbard%E2%80%93Satterthwaite_theorem"}
  - {title: "Manipulation of Voting Schemes: A General Result", author: "Allan Gibbard", year: 1973, type: paper, url: "https://www.jstor.org/stable/1914083"}
  - {title: "Arrow's Theorem", type: encyclopedia, url: "https://plato.stanford.edu/entries/arrows-theorem/"}
dates: {written: 2026-09-19, event: 1973-01-01}
author: author-humanities-1
reviewed: {by: reviewer-humanities-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember social choice? There is a second impossibility

When you met social choice as an aggregation problem, the target was a rule turning individual preferences into a group ranking, and Arrow's theorem said no rule is at once universal, Pareto-respecting, independent and non-dictatorial. That was a statement about the *output*.

There is a twin result about the *input*. Even if you accept a flawed rule, you would still like voters to have no reason to lie to it. Allan Gibbard in 1973 and Mark Satterthwaite in 1975 proved you cannot have that either: any deterministic rule that can elect at least three different candidates, and is not a dictatorship, has situations where some voter does strictly better by submitting a ranking they do not hold.

So strategic voting is not a defect of bad rules or dishonest citizens. It is a theorem, and every electoral reform argument you will ever read is really an argument about which manipulations to tolerate.

## Rigor

Let $|X| \ge 3$ and let $f$ map profiles of strict orders to a single winner in $X$.

- $f$ is **onto** if every $x \in X$ wins for some profile.
- $f$ is **strategyproof** if no voter $i$ ever strictly prefers the outcome of a false report to the outcome of their true one, holding the other reports fixed.
- $f$ is **dictatorial** if some fixed $i$ always gets their top choice.

**Gibbard–Satterthwaite (1973, 1975).** If $f$ is onto and strategyproof, then $f$ is dictatorial.

The link to Arrow is a construction, not an analogy. From a strategyproof $f$ one builds a social welfare function satisfying unrestricted domain, weak Pareto and independence of irrelevant alternatives; Arrow then forces a dictator, and that dictator pulls back to $f$. Independence and strategyproofness are two faces of the same demand: nothing outside the pair $\{x,y\}$ — neither an irrelevant alternative nor a lie about one — may change how the rule ranks $x$ against $y$.

The escape hatches are where the subject becomes constructive: randomise the rule, restrict the domain to single-peaked preferences, where median rules are strategyproof, or allow transfers, which is where mechanism design starts.

## Recall
type: mcq
Q: What exactly does the Gibbard–Satterthwaite theorem rule out?
- [ ] Any voting rule producing a transitive group ranking — that is Arrow's theorem, about aggregation rather than manipulation.
- [x] A non-dictatorial deterministic rule with three or more possible winners in which honest voting is always safe — some profile always rewards a lie.
- [ ] Voting rules that look past first preferences — ranked rules are allowed; they are simply manipulable like everything else.
