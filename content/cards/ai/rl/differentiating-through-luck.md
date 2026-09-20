---
id: ai.rl.policy-gradient.differentiating-through-luck
topic: ai.rl.policy-gradient
format: series
difficulty: 3
language: en
weight: heavy
angles: [beautiful, tool, connection]
series: {id: ai.rl.trial-and-error, index: 4, total: 4, title: "Learning by trial and error"}
tags: [reinforce, log-derivative-trick, score-function, baseline, williams-1992]
prerequisites: [ai.rl.mdp-bellman, ai.neural-nets.backprop]
hook: "You cannot differentiate a dice roll. The log-derivative trick moves the derivative onto the dice instead."
sources:
  - {title: "Policy gradient method", type: wiki, url: "https://en.wikipedia.org/wiki/Policy_gradient_method"}
  - {title: "Simple statistical gradient-following algorithms for connectionist reinforcement learning", author: "Ronald J. Williams", year: 1992, type: paper, url: "https://doi.org/10.1007/BF00992696"}
  - {title: "Reinforcement Learning: An Introduction, 2nd ed., ch. 13", author: "Sutton & Barto", year: 2018, type: book, url: "https://archive.org/details/reinforcementlea0000sutt"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Differentiating through luck

Episode 3 ended on a $\max$ over actions. Fine for "left, right, up, down"; useless for a steering angle. So stop learning what actions are worth and learn the *policy* itself: a knob-covered machine that outputs a probability for each action, and turn the knobs to make good outcomes likelier.

The obstacle looks fatal. The thing you want to improve is an average over everything that might happen — your own random choices, the world's random responses. You cannot differentiate through a coin flip. There is no smooth path from "this knob moved slightly" to "the dice fell differently".

The escape is one of the prettiest lines in applied mathematics, and it is barely a line. Do not differentiate the outcome. Differentiate the *probability of the outcome*, which is a smooth function of the knobs. Run the machine, see what happened, and if it went well, turn the knobs so that exactly what you just did becomes more likely. That is it. That is the algorithm.

## Rigor

Let $\tau$ be a trajectory, $R(\tau)$ its return, $\pi_\theta$ the policy, $J(\theta)=\mathbb{E}_{\tau\sim p_\theta}[R(\tau)]$. Then
$$\nabla_\theta J=\int R(\tau)\,\nabla_\theta p_\theta(\tau)\,d\tau
=\int R(\tau)\,p_\theta(\tau)\,\nabla_\theta\log p_\theta(\tau)\,d\tau
=\mathbb{E}\big[R(\tau)\,\nabla_\theta\log p_\theta(\tau)\big],$$
using $\nabla p = p\,\nabla\log p$ — the **log-derivative trick**. The expectation is now over the same distribution you can sample from, so a handful of rollouts gives an unbiased estimate.

The second gift: $\log p_\theta(\tau)=\log p(s_0)+\sum_t\big[\log P(s_{t+1}\mid s_t,a_t)+\log\pi_\theta(a_t\mid s_t)\big]$, and the environment terms carry no $\theta$. They vanish under the gradient. You never needed the transition model.

This is REINFORCE (Williams, 1992):
$$\nabla_\theta J=\mathbb{E}\Big[\sum_t \nabla_\theta\log\pi_\theta(a_t\mid s_t)\,\big(G_t-b(s_t)\big)\Big],$$
where $G_t$ is the return from $t$ onward. Any baseline $b(s_t)$ is free — $\mathbb{E}[\nabla_\theta\log\pi_\theta(a\mid s)]=\nabla_\theta\!\int\!\pi_\theta=\nabla_\theta 1=0$ — so subtracting one changes no bias and can slash the variance. Taking $b=V(s)$ gives the advantage, and actor–critic methods.

And look what closes the loop from episode 1. The randomness in $\pi_\theta$ *is* the exploration — the doctor's dilemma is no longer a bolt-on, it is a parameter being optimised.

## Recall
type: reveal
Q: Why can you estimate a policy gradient without knowing the environment's dynamics?
A: Because $\nabla_\theta\log p_\theta(\tau)$ splits into environment terms and policy terms, and the environment terms have no $\theta$, so they differentiate to zero. Only $\nabla_\theta\log\pi_\theta(a_t\mid s_t)$ survives.
