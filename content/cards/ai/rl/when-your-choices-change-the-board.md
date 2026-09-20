---
id: ai.rl.mdp-bellman.when-your-choices-change-the-board
topic: ai.rl.mdp-bellman
format: series
difficulty: 2
language: en
weight: medium
angles: [tool, beautiful, connection]
series: {id: ai.rl.trial-and-error, index: 2, total: 4, title: "Learning by trial and error"}
tags: [principle-of-optimality, q-function, discounting, planning, greedy-policy]
related: [ai.rl.mdp-bellman.a-markov-chain-with-a-steering-wheel]
hook: "A slot machine forgets you. A chess board does not. The moment your action changes what you face next, the problem changes shape."
sources:
  - {title: "Markov decision process", type: wiki, url: "https://en.wikipedia.org/wiki/Markov_decision_process"}
  - {title: "Bellman equation", type: wiki, url: "https://en.wikipedia.org/wiki/Bellman_equation"}
  - {title: "Reinforcement Learning: An Introduction, 2nd ed.", author: "Sutton & Barto", year: 2018, type: book, url: "https://archive.org/details/reinforcementlea0000sutt"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# When your choices change the board

The doctor in episode 1 faced a world that forgets. Pull the arm, get the payout, and the machine resets to exactly what it was. Almost nothing real is like that. Move a piece and the position is different. Spend a month on a course and you are a different candidate.

So add a state. You are somewhere; you choose an action; you get a reward and land somewhere new, with probabilities that depend on where you were and what you did. That is a Markov decision process, and it is the whole of reinforcement learning's world model.

Now "which action is best" stops being answerable on its own, because a poor reward now can put you somewhere wonderful. What you need is a number per situation-and-action: the reward you get, *plus* everything you will be able to collect afterwards if you keep playing well.

That definition looks circular — the value of acting well depends on acting well later. It is circular. It is also, remarkably, an equation with exactly one solution.

## Rigor

An MDP is $(S,A,P,R,\gamma)$ with discount $\gamma\in[0,1)$. Define the optimal action-value
$$Q^{*}(s,a)=\mathbb{E}\Big[\sum_{t\ge 0}\gamma^{t}r_t \;\Big|\; s_0=s,\,a_0=a,\ \text{acting optimally after}\Big].$$
Bellman's principle of optimality — whatever you did first, the rest of the plan must be optimal from where you landed — turns that into a one-step recursion:
$$Q^{*}(s,a)=\mathbb{E}_{s'\sim P(\cdot\mid s,a)}\Big[R(s,a)+\gamma\max_{a'}Q^{*}(s',a')\Big].$$
Two corollaries do all the work. $V^{*}(s)=\max_a Q^{*}(s,a)$, and the optimal policy is just $\pi^{*}(s)=\arg\max_a Q^{*}(s,a)$ — greedy, deterministic, no lookahead needed once you hold $Q^{*}$. All the planning has been packed into the numbers.

Why $\gamma<1$? It makes the sum converge, bounding $|Q^{*}|\le R_{\max}/(1-\gamma)$, and it is also interpretable: discounting by $\gamma$ each step is exactly playing a game that ends with probability $1-\gamma$ per step, so $1/(1-\gamma)$ is your effective horizon. At $\gamma=0.99$ you are planning about a hundred steps out.

All of this assumes you know $P$ and $R$. Out in the world you know neither. Episode 3.

## Recall
type: mcq
Q: What does the discount factor $\gamma$ buy you?
- [ ] It makes distant rewards literally worth less to the agent, as a value judgement — it is a modelling device; the interpretation as impatience is optional.
- [x] Convergence of the infinite sum and the bound $R_{\max}/(1-\gamma)$ — plus an effective horizon of about $1/(1-\gamma)$ steps.
- [ ] It guarantees the optimal policy is stochastic — optimal policies in a finite MDP can always be taken deterministic and greedy in $Q^{*}$.
