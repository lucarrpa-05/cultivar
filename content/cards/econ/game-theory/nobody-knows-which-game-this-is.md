---
id: econ.game-theory.bayesian-games.nobody-knows-which-game-this-is
topic: econ.game-theory.bayesian-games
format: series
difficulty: 3
language: en
weight: medium
angles: [connection, beautiful]
tags: [harsanyi, types, common-prior, bayesian-nash, incomplete-information]
series: {id: econ.game-theory.nash-and-after, index: 4, total: 4, title: "Nash and after"}
related: [econ.game-theory.dominance-nash.a-two-page-note]
hook: "Harsanyi's trick: if you do not know your opponent's payoffs, pretend nature dealt them, and the game becomes finite again."
sources:
  - {title: "Bayesian game", type: wiki, url: "https://en.wikipedia.org/wiki/Bayesian_game"}
  - {title: "John Harsanyi", type: wiki, url: "https://en.wikipedia.org/wiki/John_Harsanyi"}
dates: {written: 2026-09-19, event: 1967-11-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# When nobody is sure what game they are actually in

Every game so far has assumed something outrageous: that all players know all the payoffs. Real bargaining, real auctions, real hiring are the opposite. I do not know how much you value the thing. You do not know my costs. Worse, I do not know what you believe about my costs, and you do not know what I believe about your beliefs, and that regress has no obvious floor.

For fifteen years after Nash this looked like a wall. John Harsanyi walked through it between 1967 and 1968 with one move: replace "player with unknown payoffs" by "player of unknown *type*", and let a fictional prior move of nature draw everyone's type from a distribution that is common knowledge.

The infinite regress collapses. Beliefs about beliefs about beliefs all become conditional probabilities computed from one shared prior, and an incomplete-information game becomes an ordinary game of imperfect information — which Nash's theorem already covers.

The trick is so clean that it hides how strong its assumption is.

## Rigor

A **Bayesian game** is $(N,(A_i),(T_i),(u_i),p)$: actions $A_i$, types $T_i$, payoffs $u_i(a,t)$ depending on the whole type profile, and a common prior $p\in\Delta(\prod_i T_i)$. Player $i$ learns only $t_i$ and forms beliefs $p(t_{-i}\mid t_i)$ by Bayes' rule.

A strategy is a map $\sigma_i:T_i\to\Delta(A_i)$ — a plan for each version of yourself. A **Bayesian Nash equilibrium** satisfies, for every $i$ and every $t_i$ with $p(t_i)>0$,

$$\sigma_i(t_i)\in\arg\max_{a_i\in A_i}\ \sum_{t_{-i}}p(t_{-i}\mid t_i)\,u_i\bigl(a_i,\sigma_{-i}(t_{-i}),t_i,t_{-i}\bigr).$$

Since a finite Bayesian game is just a finite game whose players are the type-copies, existence follows from episode 1's theorem: the same product of simplices, the same best-response correspondence, the same fixed point.

The strong assumption is the **common prior**. Harsanyi's construction requires everyone's beliefs to come from one distribution that everyone knows. It buys tractability and it is not innocent — Aumann showed that with a common prior and common knowledge of posteriors, rational people cannot agree to disagree, which is a strange thing to conclude about the human race.

Nash gave existence, mixing gave unpredictability, subgame perfection gave credibility, Harsanyi gave ignorance. The two-page note from episode 1 still sits underneath all four.

## Recall
type: mcq
Q: What does Harsanyi's type construction buy you?
- [x] It turns an infinite regress of beliefs into one common prior — so an incomplete-information game becomes an ordinary finite game Nash's theorem covers.
- [ ] It removes uncertainty about payoffs — the uncertainty stays; it is repackaged as uncertainty about which type you face.
- [ ] It guarantees a unique equilibrium — Bayesian games routinely have many, exactly as complete-information games do.
