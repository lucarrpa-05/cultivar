---
id: css.networks.network-games.who-do-you-arrest-first
topic: css.networks.network-games
format: idea
difficulty: 4
language: en
weight: heavy
angles: [tool, connection, beautiful]
tags: [key-player, bonacich-centrality, network-games, nash-equilibrium, spillovers]
hook: "If crime is contagious along friendships, the person to remove is not the busiest criminal."
sources:
  - {title: "Who's Who in Networks. Wanted: The Key Player", author: "Coralio Ballester, Antoni Calvó-Armengol, Yves Zenou", year: 2006, type: paper, url: "https://doi.org/10.1111/j.1468-0262.2006.00709.x"}
  - {title: "Katz centrality", type: wiki, url: "https://en.wikipedia.org/wiki/Katz_centrality"}
  - {title: "Network formation", type: wiki, url: "https://en.wikipedia.org/wiki/Network_formation"}
dates: {written: 2026-09-19, event: 2006-09-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Who do you take out of the network first?

Suppose effort is contagious. Studying harder is easier when your friends study; so is offending, and so is joining a strike. Each person picks how much effort to put in, and the return depends on what their neighbours chose. That is a game played on a graph, with one equilibrium to find and a policy question attached: if you can remove exactly one player, which removal does the most damage to total effort?

The obvious answers are wrong. Not the person with the highest effort, and not the one with the most friends. Removing somebody matters through everybody they influence, and everybody *those* people influence, discounted by how far away the influence travels — the same infinite sum that defines eigenvector-style centrality.

Ballester, Calvó-Armengol and Zenou proved the connection exactly in 2006: at the unique equilibrium, each player's effort is proportional to their Bonacich centrality, and the key player is the one whose removal costs the network most, computed from the same matrix.

## Rigor

Payoffs are linear-quadratic with local complementarities:
$$u_i(x)=\alpha x_i-\tfrac12 x_i^2+\lambda\sum_{j}g_{ij}x_ix_j ,$$
with $x_i\ge 0$ the effort, $G=(g_{ij})$ the adjacency matrix and $\lambda>0$ the strength of the spillover. The best response $x_i=\alpha+\lambda\sum_j g_{ij}x_j$ gives the equilibrium condition $(I-\lambda G)x=\alpha\mathbf{1}$, so
$$x^\ast=\alpha(I-\lambda G)^{-1}\mathbf{1}=\alpha\sum_{k\ge0}\lambda^{k}G^{k}\mathbf{1},$$
which exists, is unique and is interior provided $\lambda\rho(G)<1$, with $\rho$ the largest eigenvalue. The vector $\sum_k \lambda^k G^k\mathbf{1}$ is exactly **Bonacich centrality**: walks of every length, discounted by $\lambda^k$. Equilibrium effort *is* a centrality.

Now delete player $i$ and recompute. The drop in aggregate effort is
$$\Delta_i \;\propto\; \frac{b_i(G,\lambda)^2}{m_{ii}(G,\lambda)},\qquad M=(I-\lambda G)^{-1},$$
where $b_i$ is $i$'s Bonacich centrality and $m_{ii}$ the self-loop term that strips out $i$'s own feedback. Maximising this **intercentrality** picks the key player, and it generally is not the largest $b_i$: someone with high centrality that mostly loops back on themselves is cheap to remove.

The lesson carries beyond crime. Equilibrium behaviour on a network is a centrality measure, so the right target is defined by the game, not by the picture.

## Recall
type: mcq
Q: In this game, why isn't the key player simply the one exerting the most effort?
- [x] Removing a player also removes their influence on everyone else — the right index divides centrality by the part that loops back on the player themselves.
- [ ] Because effort is unobservable — the result is about which removal matters most, not about what a planner can measure.
- [ ] Because equilibrium effort is unrelated to centrality — it is exactly proportional to Bonacich centrality, which is the theorem.
