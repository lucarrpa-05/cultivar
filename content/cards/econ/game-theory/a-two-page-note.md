---
id: econ.game-theory.dominance-nash.a-two-page-note
topic: econ.game-theory.dominance-nash
format: series
difficulty: 2
language: en
weight: medium
angles: [history, beautiful]
tags: [nash-equilibrium, existence, kakutani, best-response]
series: {id: econ.game-theory.nash-and-after, index: 1, total: 4, title: "Nash and after"}
hook: "Two pages, one definition, one theorem — and economists have been saying \"equilibrium\" about things with no prices ever since."
sources:
  - {title: "Nash equilibrium", type: wiki, url: "https://en.wikipedia.org/wiki/Nash_equilibrium"}
  - {title: "Equilibrium points in n-person games, PNAS 36(1)", author: "John F. Nash", year: 1950, type: paper, url: "https://doi.org/10.1073/pnas.36.1.48"}
  - {title: "Kakutani fixed-point theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Kakutani_fixed-point_theorem"}
dates: {written: 2026-09-19, event: 1950-01-15}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A two-page note that reorganised the social sciences

In 1950 the *Proceedings of the National Academy of Sciences* published a note by a 21-year-old Princeton graduate student. Two pages. One definition, one theorem.

The definition: a profile of strategies, one per player, such that nobody can do better by changing theirs alone. That is the whole thing. No claim that the outcome is good, or fair, or cooperative. The prisoner's dilemma has exactly one Nash equilibrium and both players hate it.

The theorem is what made the definition usable: *every* finite game has at least one, provided players may randomise. Before Nash, the honest response to any new model was "does a solution exist?" and often nobody knew. Afterwards you could assume one did and get on with the economics. That is why the concept escaped mathematics and ended up in antitrust cases, auction design and evolutionary biology.

The proof is a single paragraph, and it borrows a fixed-point theorem.

## Rigor

A finite game is $(N,(S_i),(u_i))$ with each $S_i$ finite. A **mixed strategy** for player $i$ is $\sigma_i\in\Delta(S_i)$, the simplex over $S_i$; payoffs extend by expectation.

**Definition.** $\sigma^{*}$ is a Nash equilibrium if for every player $i$ and every $\sigma_i\in\Delta(S_i)$,

$$u_i(\sigma_i^{*},\sigma_{-i}^{*})\ \ge\ u_i(\sigma_i,\sigma_{-i}^{*}).$$

**Theorem (Nash, 1950).** Every finite game has at least one Nash equilibrium in mixed strategies.

*Proof sketch.* Let $\Sigma=\prod_i\Delta(S_i)$ — a product of simplices, so non-empty, compact and convex. Define the best-response correspondence $B(\sigma)=\prod_i\arg\max_{\sigma_i}u_i(\sigma_i,\sigma_{-i})$. Each $B_i(\sigma)$ is non-empty, because a continuous function on a compact set attains its maximum; convex, because $u_i$ is linear in $\sigma_i$ so its maximisers form a face of the simplex; and $B$ has closed graph, because $u_i$ is continuous. Kakutani's fixed-point theorem gives $\sigma^{*}\in B(\sigma^{*})$, and a profile that is a best response to itself is precisely an equilibrium. $\square$

Nash credited David Gale for suggesting Kakutani; his 1951 *Annals* paper redoes it with Brouwer. Note what the theorem does not say: nothing about uniqueness. Matching pennies has exactly one equilibrium and it is strictly mixed — which is where episode 2 starts.

## Recall
type: mcq
Q: What exactly does Nash's theorem guarantee for every finite game?
- [x] At least one equilibrium exists once mixing is allowed — existence, not uniqueness and not efficiency.
- [ ] That rational players will reach the equilibrium — the theorem is pure existence and says nothing about how anyone arrives.
- [ ] That the equilibrium outcome is Pareto efficient — the prisoner's dilemma has one equilibrium and both players dislike it.
