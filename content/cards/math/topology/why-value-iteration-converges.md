---
id: math.analysis.metric-spaces.why-value-iteration-converges
topic: math.analysis.metric-spaces
topics: [ai.rl.mdp-bellman]
format: callback
difficulty: 4
language: en
weight: medium
angles: [connection, tool]
tags: [bellman-operator, value-iteration, sup-norm, discount-factor]
hook: "Remember that a contraction has exactly one fixed point and iterating finds it? That is the entire convergence proof of value iteration."
callback: {from: math.analysis.metric-spaces, to: ai.rl.mdp-bellman}
sources:
  - {title: "Bellman equation", type: wiki, url: "https://en.wikipedia.org/wiki/Bellman_equation"}
  - {title: "Markov decision process (value iteration)", type: wiki, url: "https://en.wikipedia.org/wiki/Markov_decision_process"}
  - {title: "Banach fixed-point theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Banach_fixed-point_theorem"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The Bellman operator contracts by at most gamma, not exactly; and the n-step bound carries a 1/(1-gamma) that the body had dropped."}
---

# Remember contractions? That is why value iteration works

Remember the calculator: press cos enough times and you land on the same number regardless of where you started, because cosine shrinks distances by a fixed factor and the space is complete.

Reinforcement learning runs that exact argument in a space of functions. An agent in a Markov decision process wants a value function $V$: for each state, the best total discounted reward achievable from it. The Bellman equation says $V$ equals its own one-step lookahead — take the best action now, add the discounted value of where you land. That is a fixed-point equation, not a formula, and nothing tells you a solution exists.

Then you notice the discount factor. Comparing two candidate value functions, one sweep of the Bellman update multiplies the worst-case gap between them by at most $\gamma$. That is a contraction, on a complete space, so Banach applies in full: there is exactly one optimal value function, starting from any guess converges to it, and the error after $n$ sweeps dies off like $\gamma^n$.

Value iteration is not a heuristic that happens to work. It is a contraction mapping being iterated.

## Rigor

Fix a finite state set $S$, actions $A$, rewards $r$, transitions $P$, and discount $\gamma \in [0,1)$. Let $\mathcal{V}=\mathbb{R}^{S}$ with the sup norm $\lVert V \rVert_\infty=\max_s|V(s)|$, a complete metric space. The **Bellman optimality operator** is
$$(TV)(s)=\max_{a \in A}\Big[r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\,V(s')\Big].$$

**$T$ is a $\gamma$-contraction.** For any $V,W$ and any $s$, using $|\max_a f(a)-\max_a g(a)|\le\max_a|f(a)-g(a)|$,
$$|(TV)(s)-(TW)(s)|\le\gamma\max_a\sum_{s'}P(s'\mid s,a)\,|V(s')-W(s')|\le\gamma\lVert V-W\rVert_\infty,$$
since the transition probabilities sum to $1$. Taking the max over $s$ gives $\lVert TV-TW\rVert_\infty\le\gamma\lVert V-W\rVert_\infty$.

Banach then delivers three things at once: a unique $V^{*}$ with $TV^{*}=V^{*}$, convergence of $V_{n+1}=TV_n$ from any $V_0$, and the bound $\lVert V_n-V^{*}\rVert_\infty\le\frac{\gamma^{n}}{1-\gamma}\lVert V_1-V_0\rVert_\infty$.

Everything hinges on $\gamma<1$. At $\gamma=1$ the operator is merely non-expansive, the contraction argument collapses, and undiscounted average-reward MDPs need a different theory.

## Recall
type: mcq
Q: Why does value iteration converge to a unique optimal value function?
- [x] The Bellman operator is a $\gamma$-contraction in the sup norm on a complete space — Banach gives uniqueness, convergence from any start, and a $\gamma^n$ error bound.
- [ ] Because the state space is finite, so the algorithm terminates — finiteness makes each sweep cheap, but the iteration is infinite and needs the contraction to converge.
- [ ] Because rewards are bounded — boundedness keeps the values finite; it is the discount factor that produces the contraction.
