---
id: econ.game-theory.subgame-perfection.threats-you-would-never-carry-out
topic: econ.game-theory.subgame-perfection
format: series
difficulty: 3
language: en
weight: heavy
angles: [tool, paradox]
tags: [subgame-perfection, credible-threats, selten, entry-deterrence, refinement]
series: {id: econ.game-theory.nash-and-after, index: 3, total: 4, title: "Nash and after"}
hook: "\"Enter my market and I will destroy us both\" is a Nash equilibrium. That is a problem with Nash equilibrium."
sources:
  - {title: "Subgame perfect equilibrium", type: wiki, url: "https://en.wikipedia.org/wiki/Subgame_perfect_equilibrium"}
  - {title: "Reinhard Selten", type: wiki, url: "https://en.wikipedia.org/wiki/Reinhard_Selten"}
dates: {written: 2026-09-19, event: 1965-01-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The equilibrium where you threaten what you would never do

A new firm is thinking about entering your market. You announce that if they come in, you will cut prices until neither of you makes a peso. They stay out. Now check the definition: nobody can do better by changing their own strategy alone. This is a Nash equilibrium.

It is also nonsense. If they *did* enter, a price war would gut you too, and everyone in the room knows it. Your threat is not a plan. It is a sentence.

Nash equilibrium cannot see the difference, because it only asks whether a deviation would pay *given* what everyone has said they will do. It never checks whether the announcement would survive contact with an actual entrant. Reinhard Selten's fix, in 1965, was to insist that a profile be an equilibrium not only of the whole game but of every subgame — including the ones that equilibrium play never reaches.

That single requirement deletes the threat. It also deletes rather more than anyone expected.

## Rigor

Let $G$ be a finite extensive-form game. A **subgame** is a subtree rooted at a single node such that every information set of $G$ lies entirely inside it or entirely outside it. A profile is **subgame perfect** if its restriction to every subgame is a Nash equilibrium of that subgame.

The entry game. The entrant chooses In or Out; if In, the incumbent chooses Fight or Accommodate. Payoffs: Out gives $(0,2)$, (In, Accommodate) gives $(1,1)$, (In, Fight) gives $(-1,-1)$.

There are two Nash equilibria. In $(\text{Out},\text{Fight})$ the entrant prefers $0$ to $-1$ given Fight, and the incumbent's plan is never tested, so no deviation pays. The other is $(\text{In},\text{Accommodate})$.

Only the second survives. The subgame after In is a one-player choice between $1$ and $-1$, and Fight is not a Nash equilibrium of it. In games of perfect information, subgame perfection is exactly backward induction.

Two things to keep. It is a *refinement*: it never creates equilibria, only removes them, so existence comes free from Nash. And it is demanding in precisely the way the centipede exposed, since it insists on optimal play in subgames nobody ever visits.

Episode 4 removes the last comfortable assumption — that everyone knows which game they are in.

## Recall
type: mcq
Q: Why is "enter and I will fight" not subgame perfect?
- [x] In the subgame after entry, fighting is not optimal — so the plan is not a Nash equilibrium of that subgame, though it is one of the whole game.
- [ ] Because it is not a Nash equilibrium — it is one, which is exactly the problem subgame perfection was invented to fix.
- [ ] Because the entrant cannot observe the threat — the threat is announced and understood; what it lacks is credibility, not publicity.
