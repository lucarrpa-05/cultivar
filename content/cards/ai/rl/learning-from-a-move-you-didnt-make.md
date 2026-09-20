---
id: ai.rl.q-learning.learning-from-a-move-you-didnt-make
topic: ai.rl.q-learning
format: series
difficulty: 2
language: en
weight: medium
angles: [tool, beautiful, connection]
series: {id: ai.rl.trial-and-error, index: 3, total: 4, title: "Learning by trial and error"}
tags: [q-learning, off-policy, temporal-difference, watkins, robbins-monro]
hook: "You can behave badly on purpose and still learn what the best behaviour is worth. That is the strangest property in reinforcement learning."
sources:
  - {title: "Q-learning", type: wiki, url: "https://en.wikipedia.org/wiki/Q-learning"}
  - {title: "Q-learning", author: "Christopher J. C. H. Watkins & Peter Dayan", year: 1992, type: paper, url: "https://doi.org/10.1007/BF00992698"}
  - {title: "Temporal difference learning", type: wiki, url: "https://en.wikipedia.org/wiki/Temporal_difference_learning"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Learning the value of a move you didn't make

Episode 2 left you with a clean recursion for $Q^{*}$ and a fatal catch: computing it needs the transition probabilities, and nobody hands those out.

Chris Watkins's 1989 thesis took the catch seriously. Do not model the world. Act in it, and each time you act, use the one sample you got to nudge your estimate a little towards what the recursion says it should be.

Take a step, see a reward and a next state, and compare two numbers: what you *thought* this action was worth, and what you now believe — the reward you got, plus your current estimate of the best you can do from where you landed. The difference is a surprise, and you move your estimate a fraction of the way towards it.

The startling part is that word *best*. You update towards the value of the best next action even when you are about to do something else: a random step, a bad step, a curious one. Your behaviour can be as reckless as you like, and what you are learning is still the optimal policy's value. Exploration stops costing you accuracy.

## Rigor

After observing $(s,a,r,s')$:
$$Q(s,a)\;\leftarrow\;Q(s,a)+\alpha\Big[\underbrace{r+\gamma\max_{a'}Q(s',a')-Q(s,a)}_{\text{temporal-difference error}}\Big].$$
The bracket is a sampled version of the Bellman residual from episode 2. Because the target uses $\max_{a'}$ rather than the action you will actually take, the algorithm is **off-policy**: it estimates $Q^{*}$ while following any behaviour policy you like.

Watkins and Dayan (1992) proved convergence to $Q^{*}$ with probability 1 in a finite MDP, under two conditions:

- every state–action pair is visited infinitely often — which is why you must keep exploring, exactly as episode 1 insisted;
- the step sizes satisfy the Robbins–Monro conditions $\sum_t\alpha_t=\infty$ and $\sum_t\alpha_t^{2}<\infty$ — large enough in total to travel anywhere, small enough in square to damp the noise.

Both are the same demand in different clothing: keep sampling forever, but trust each sample less over time.

One thing that $\max$ is hiding, though. It needs you to be able to sweep over all actions. What if the action is a steering angle, or a torque — a continuum? Episode 4.

## Recall
type: mcq
Q: What makes Q-learning "off-policy"?
- [ ] It learns from a stored dataset rather than from interaction — replay buffers are optional; the term is about which policy the target assumes.
- [x] Its target uses the best next action, not the one it will take — so it estimates optimal values while behaving however it likes.
- [ ] It updates the policy directly instead of the values — that describes policy gradients; Q-learning never represents a policy explicitly.
