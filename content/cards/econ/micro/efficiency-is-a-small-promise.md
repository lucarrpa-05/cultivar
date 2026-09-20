---
id: econ.micro.general-equilibrium.efficiency-is-a-small-promise
topic: econ.micro.general-equilibrium
related: [econ.micro.general-equilibrium.prices-that-clear-every-market-at-once]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [tool, mistake]
tags: [welfare-theorems, pareto-efficiency, lump-sum-transfers, local-nonsatiation, separating-hyperplane]
hook: "The theorem says a competitive equilibrium wastes nothing. It says nothing whatsoever about who gets what, and the proof shows why."
sources:
  - {title: "Fundamental theorems of welfare economics", type: wiki, url: "https://en.wikipedia.org/wiki/Fundamental_theorems_of_welfare_economics"}
  - {title: "Gérard Debreu — Theory of Value (1959) and the axiomatic treatment of equilibrium", type: wiki, url: "https://en.wikipedia.org/wiki/G%C3%A9rard_Debreu"}
  - {title: "Pareto efficiency", type: wiki, url: "https://en.wikipedia.org/wiki/Pareto_efficiency"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# "Markets are efficient" is a theorem, and a much smaller one than it sounds

Two results carry most of the ideological weight in economics, and both are more modest than their reputations.

The first says: a competitive equilibrium is Pareto efficient. There is no rearrangement of goods that makes someone better off without making someone else worse off. That is all. An allocation where one household owns the entire economy and everyone else starves can be Pareto efficient, because feeding the starving requires taking from the owner. Efficiency is a statement about waste, never about justice.

The second says the converse, and it is the one with political content: *any* Pareto-efficient allocation you like can be achieved as a competitive equilibrium, provided you first redistribute the initial endowments. Choose the distribution you consider fair, hand out the wealth, then let markets run.

Which sounds like a clean division of labour between ethics and economics — until you ask how the redistribution happens. The theorem requires lump-sum transfers: amounts that do not depend on anything anyone does. Tax income and people work less; tax wealth and people hide it. Taxing a person for *being who they are* is precisely what is unavailable.

## Rigor

**First theorem.** If preferences are locally non-satiated, every competitive equilibrium allocation $x^*$ with prices $p$ is Pareto efficient. Proof in one move: suppose $x'$ is feasible and Pareto-dominates $x^*$. Anyone strictly better off must have $p\cdot x_i' > p\cdot x_i^*$ (else they could have afforded it), and anyone no worse off must have $p\cdot x_i'\ge p\cdot x_i^*$ — local non-satiation rules out getting the same utility more cheaply. Summing, $p\cdot\sum_i x_i' > p\cdot\sum_i x_i^*=p\cdot\bar\omega$, so $x'$ is infeasible. Contradiction.

Notice the assumptions that never appear: no convexity, no continuity, no smoothness. Only local non-satiation and the fact that everyone faces the same prices — which is why externalities, market power and missing markets break it.

**Second theorem** needs much more: convex preferences, continuity, and a separating hyperplane between the aggregate "better than $x^*$" set and the feasible set. That hyperplane *is* the price vector. Convexity is doing the work, and it is exactly what fails with indivisibilities or increasing returns.

## Recall
type: mcq
Q: An allocation gives one household everything. Is it Pareto efficient?
- [x] It can be — no reallocation helps anyone without hurting that household, so nothing is wasted in the technical sense. — which is the point: efficiency is silent about distribution.
- [ ] No, because it is obviously unfair. — fairness is a separate criterion; Pareto efficiency does not encode it.
- [ ] No, because the other households have zero utility. — low utility is not inefficiency; only an unexploited mutual gain is.
- [ ] Only if the household's preferences are convex. — convexity matters for the second theorem, not for whether an allocation is efficient.
