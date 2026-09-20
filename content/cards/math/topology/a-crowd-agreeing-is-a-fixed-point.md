---
id: math.topology.fixed-points.a-crowd-agreeing-is-a-fixed-point
topic: math.topology.fixed-points
topics: [css.opinion-dynamics.degroot]
format: callback
difficulty: 3
language: en
weight: medium
angles: [connection, practical]
tags: [degroot, consensus, stochastic-matrix, eigenvector-centrality]
hook: "Remember fixed points? A room full of people talking until they agree is converging to one, and you can name whose opinion wins."
callback: {from: math.topology.fixed-points, to: css.opinion-dynamics.degroot}
sources:
  - {title: "DeGroot learning", type: wiki, url: "https://en.wikipedia.org/wiki/DeGroot_learning"}
  - {title: "Perron–Frobenius theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem"}
  - {title: "Reaching a Consensus", author: "Morris H. DeGroot", year: 1974, type: paper, url: "https://doi.org/10.1080/01621459.1974.10480137"}
dates: {written: 2026-09-19, event: 1974-01-01}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Softened 'exactly eigenvector centrality' to the recursion s_i = sum_j s_j T_ji (Wikipedia states the recursion, not the term); fixed-point wording; varied the opener."}
---

# Remember fixed points? A crowd agreeing is one

Remember the crumpled map lying somewhere over the city it names: a continuous map of a compact convex set into itself has to fix some point. Here is that theorem as a model of gossip.

Morris DeGroot's 1974 rule is as simple as social science gets. Everyone starts with an opinion — a number between 0 and 1, how likely you think it is to rain. Each round, you replace it by a weighted average of the opinions of the people you listen to, yourself included. Repeat.

Consensus means everybody ends up at the same number. In the model, the update is a map on the set of opinion vectors, and consensus is a fixed point: a configuration where one round of listening changes nobody's mind.

That such a fixed point exists is almost free — the set of opinion vectors is compact and convex and the map is continuous, so Brouwer applies. What is not free is *which* fixed point you land on. The answer is an eigenvector, and it names whose opinion the group ends up holding.

## Rigor

Let $T$ be an $n\times n$ row-stochastic **trust matrix**: $T_{ij}\ge0$ is the weight $i$ puts on $j$, and each row sums to $1$. Opinions update by $p(t+1)=Tp(t)$, so $p(t)=T^t p(0)$.

Fixed points of $p \mapsto Tp$ are the solutions of $Tp=p$: eigenvectors for eigenvalue $1$. The all-ones vector is always one, so every consensus vector $(c,c,\dots,c)$ is fixed: agreement is always *possible*.

Convergence is Perron–Frobenius, not Brouwer. If the trust graph is strongly connected and aperiodic, then
$$T^t \longrightarrow \mathbf{1}s^{\top},$$
where $s$ is the unique left eigenvector of $T$ with eigenvalue $1$, normalised so $\sum_i s_i = 1$. Every $p_i(\infty)=s\cdot p(0)$: the group converges, and the limit is a weighted average of the starting opinions with weights $s$.

So $s_i$ is agent $i$'s **social influence**, and it obeys the eigenvector-centrality recursion $s_i=\sum_j s_j T_{ji}$: your weight is the trust-weighted sum of the weights of everyone who listens to you. Being listened to by people who are themselves listened to is what puts weight on your initial belief. Without strong connectivity the population can split into groups that converge separately; with periodicity it can oscillate forever.

## Recall
type: mcq
Q: In DeGroot's model, who determines the consensus opinion?
- [x] Each person in proportion to their entry in the left eigenvector of the trust matrix — your weight is the trust-weighted sum of the weights of everyone who listens to you.
- [ ] Whoever is most confident at the start — confidence plays no role; only the weights others place on you do.
- [ ] Everyone equally, since it is an average — it is a weighted average, and the weights are the stationary distribution, which is rarely uniform.
