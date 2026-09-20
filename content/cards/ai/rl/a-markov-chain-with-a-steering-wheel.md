---
id: ai.rl.mdp-bellman.a-markov-chain-with-a-steering-wheel
topic: ai.rl.mdp-bellman
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful, tool]
callback: {from: math.probability.markov-chains, to: ai.rl.mdp-bellman}
tags: [mdp, bellman-equation, contraction-mapping, value-iteration, banach]
prerequisites: [math.probability.markov-chains]
hook: "A Markov chain tells you where you will end up. Add one choice per state and it tells you where you can make yourself end up."
sources:
  - {title: "Markov decision process", type: wiki, url: "https://en.wikipedia.org/wiki/Markov_decision_process"}
  - {title: "Bellman equation", type: wiki, url: "https://en.wikipedia.org/wiki/Bellman_equation"}
  - {title: "Reinforcement Learning: An Introduction, 2nd ed., ch. 3–4", author: "Sutton & Barto", year: 2018, type: book, url: "https://archive.org/details/reinforcementlea0000sutt"}
diagram: {file: ai/markov-chain-vs-mdp.svg, caption: "Left: a chain's arrows are fixed. Right: each state offers a choice, and each choice carries its own arrows.", alt: "Two small diagrams of three states; on the left single labelled arrows between states, on the right each state has two action nodes, each fanning out to its own arrows"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A Markov chain with a steering wheel

Remember a Markov chain: a set of states and a matrix saying where you go next, with no memory of how you arrived. You could compute where it settles in the long run. What you could never do was change the answer. The chain is weather — you forecast it, you don't drive it.

Add one thing. At each state, before the dice are thrown, you pick an action; the action decides *which* transition matrix you are using this turn. Now it is driving.

Almost everything survives. The Markov property holds, the transitions are still a matrix, and if you commit to a fixed rule for choosing actions, you literally get an ordinary Markov chain back. What is new is that some ways of driving are better than others, so every state acquires a number: the best total reward you can still collect from here.

The question changes from "where does this end up?" to "where can I make it end up?" — and remarkably, that harder-sounding question has a clean, unique answer.

## Rigor

A chain is $(S,P)$ with $P(s'\mid s)$. An MDP is $(S,A,P,R,\gamma)$ with $P(s'\mid s,a)$, reward $R(s,a)$ and discount $\gamma\in[0,1)$. Fix a policy $\pi$ and you recover a chain: $P^{\pi}(s'\mid s)=\sum_a \pi(a\mid s)P(s'\mid s,a)$.

The Bellman optimality equation:
$$V^{*}(s)=\max_{a\in A}\Big[R(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\,V^{*}(s')\Big].$$

Write the right-hand side as an operator $T$ on bounded functions $V:S\to\mathbb{R}$. Then $T$ is a $\gamma$-contraction in the sup norm. Two lines: $\big|\max_a f(a)-\max_a g(a)\big|\le \max_a|f(a)-g(a)|$, and an expectation is an average, so
$$\|TV-TU\|_{\infty}\le \gamma\,\|V-U\|_{\infty}.$$
Banach's fixed-point theorem on the complete space $(\mathbb{R}^{S},\|\cdot\|_\infty)$ gives exactly one fixed point $V^{*}$, and value iteration $V_{k+1}=TV_k$ converges to it geometrically, with error shrinking by $\gamma$ per sweep.

The steering wheel is the $\max$. Delete it and $T$ becomes linear — the chain again, with its expected discounted reward. Keep it and $T$ is nonlinear but still a contraction, which is the whole reason planning is tractable.

## Recall
type: mcq
Q: What does a Markov chain gain when it becomes an MDP?
- [ ] Memory of past states — both are Markov; the future depends only on the current state in either case.
- [x] A choice of action in each state, which selects among different transition distributions — and with it, an optimal value per state.
- [ ] Stochastic rather than deterministic transitions — chains are already stochastic; the choice, not the randomness, is what is added.
