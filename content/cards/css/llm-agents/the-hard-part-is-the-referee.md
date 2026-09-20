---
id: css.llm-agents.multi-agent-systems.the-hard-part-is-the-referee
topic: css.llm-agents.multi-agent-systems
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, connection, open-problem]
tags: [concordia, game-master, grounding, multi-agent, simulation-design]
hook: "Dungeons & Dragons solved a problem that multi-agent AI keeps rediscovering: somebody has to say what actually happened."
sources:
  - {title: "Generative agent-based modeling with actions grounded in physical, social, or digital space using Concordia", author: "Vezhnevets, Agapiou, Aharon, Ziv, Matyas, Duéñez-Guzmán, Cunningham, Osindero, Karmon, Leibo", year: 2023, type: paper, url: "https://arxiv.org/abs/2312.03664"}
  - {title: "Generative Agents: Interactive Simulacra of Human Behavior", author: "Park, O'Brien, Cai, Morris, Liang, Bernstein", year: 2023, type: paper, url: "https://arxiv.org/abs/2304.03442"}
dates: {written: 2026-09-19, event: 2023-12-06}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# The hard part of a multi-agent simulation is the referee

An agent says "I go to the bar and buy Marta a drink." Now what? Is there a bar? Is Marta there? Does he have the money? Did she notice? In a classic agent-based model none of these questions exist, because an agent's action *is* a state update — move to cell, set wealth minus one. In natural language, an action is a sentence, and somebody has to turn the sentence into a fact.

DeepMind's Concordia library borrows the answer from tabletop role-playing games: a **Game Master**. A separate LLM sits outside the agents, receives their attempted actions, decides what really happens, updates the world, and tells each agent what it perceives. It can also call real software — an API, a market, a database — so an action in the story becomes an action in a system.

That design is clean and it relocates the problem rather than removing it. The Game Master is now the single most consequential component, and it is a language model with opinions.

## Rigor

Formally the Game Master supplies what a rule-based model gets for free: a transition function. Agents emit attempted actions $a_i$; the GM computes the next world state $s' = T(s, a_1,\dots,a_n)$ and the observations $o_i$ each agent receives. In Schelling's model $T$ is three lines of code you can read. Here $T$ is a prompt.

Three consequences for anyone using this for social science.

**The GM carries the model's social assumptions.** Whether a request is refused, whether a rumour is overheard, whether a threat is credible — these are adjudications, and they are the sociology. Publishing your agents' prompts without the GM's prompt publishes half the model.

**Errors are correlated, not independent.** Agents and Game Master usually come from the same base model, so a systematic bias — say, the agreeableness that instruction tuning installs — is applied both to what agents attempt and to how outcomes are judged. Averaging over runs does not cancel it.

**It is expensive in a way that shapes findings.** Every tick costs calls proportional to the number of agents plus the GM's adjudication, so simulations stay small and short. Most published LLM societies have tens of agents and days of simulated time, which rules out precisely the slow, large-$n$ phenomena — norm change, polarisation, cascades — that the method is advertised for.

## Recall
type: mcq
Q: What does a Game Master supply that a classical agent-based model gets for free?
- [x] The transition function — in a rule-based model an action *is* a state update, while a sentence has to be adjudicated into one.
- [ ] The agents' memories — memory is inside each agent; the Game Master handles the world, not the minds.
- [ ] Randomness — stochasticity is available in both; the missing piece is who decides what an attempted action actually does.
