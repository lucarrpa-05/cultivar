---
id: css.llm-agents.generative-agents.five-of-twelve-came-to-the-party
topic: css.llm-agents.generative-agents
format: idea
difficulty: 2
language: en
weight: medium
angles: [origin, numbers, weird]
tags: [generative-agents, smallville, park-2023, information-diffusion, emergence]
hook: "One agent was told she wanted to throw a party. Nobody told anyone else anything."
sources:
  - {title: "Generative Agents: Interactive Simulacra of Human Behavior", author: "Park, O'Brien, Cai, Morris, Liang, Bernstein", year: 2023, type: paper, url: "https://arxiv.org/abs/2304.03442"}
  - {title: "Generative Agents (code and data)", author: "Joon Sung Park", year: 2023, type: dataset, url: "https://github.com/joonspk-research/generative_agents"}
dates: {written: 2026-09-19, event: 2023-04-07}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Five of the twelve invited actually turned up

Twenty-five agents live in a small town called Smallville. Each is a language model with a name, a one-paragraph biography, a place to sleep and a record of everything it has perceived. They wake up, write themselves a plan for the day, walk around, and talk to whoever they run into.

The researchers seeded exactly one thing: Isabella Rodriguez wants to throw a Valentine's Day party at her café, 5 to 7 p.m. on the 14th. No other agent was told. There is no invitation mechanism in the code.

Over two simulated days the party spread by conversation. At the end, 13 of the 25 agents knew about it, up from one. Isabella had invited twelve of them. Five showed up at the café at five o'clock. A separate seed — Sam Moore is running for mayor — reached eight.

Three of the no-shows had a conflict. Four said they were interested and never made a plan. That is the detail worth staring at.

## Rigor

Why the no-shows matter more than the attendance: they are the first sign that the architecture produces a *distribution* of behaviour rather than a script. A simulation in which twelve of twelve attend has been told what to do. A simulation in which nobody attends has no mechanism. Somewhere in between is where a behavioural claim could live.

But five of twelve is one draw from one run, with $n=25$ agents and no control condition and no human benchmark for "how many people come to a party they were invited to two days ago". The paper does not claim otherwise — it evaluates *believability*, not calibration, and the diffusion numbers are reported as evidence that information moves, not that it moves at the right rate.

That gap is the whole research programme. Park and colleagues later attacked it head-on by building agents from real people and scoring them against those people's own answers. Everything in between — social simulation with invented agents, no ground truth — is a demonstration, and should be labelled one.

## Recall
type: mcq
Q: What did the Valentine's party result actually demonstrate?
- [x] That information and coordination can propagate through agent conversation with no mechanism for it in the code — a demonstration of diffusion, not a calibrated rate.
- [ ] That LLM agents reproduce real party attendance rates — there is no human benchmark in the study, and no control condition.
- [ ] That the agents were explicitly programmed to invite each other — the only seed was Isabella's intention; invitations were not implemented.
