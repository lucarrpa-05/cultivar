---
id: ai.rl.policy-gradient.nine-hundred-yes-or-no-answers
topic: ai.rl.policy-gradient
topics: [ai.llm.rlhf-alignment-training, ai.alignment.problem]
format: story
difficulty: 2
language: en
weight: medium
angles: [tool, numbers, practical]
tags: [rlhf, preference-learning, christiano-2017, reward-model, backflip]
hook: "Nobody can write a reward function for 'do a backflip'. So they didn't, and asked a human 900 times which clip looked better."
sources:
  - {title: "Deep reinforcement learning from human preferences", author: "Christiano, Leike, Brown, Martic, Legg & Amodei", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03741"}
  - {title: "Learning from human preferences", author: "OpenAI", year: 2017, type: blog, url: "https://openai.com/index/learning-from-human-preferences/"}
  - {title: "Reinforcement learning from human feedback", type: wiki, url: "https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback"}
dates: {written: 2026-09-19, event: 2017-06-12}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Added OpenAI's write-up as a source: the 900 comparisons and the backflip are in the paper body and that post, not in the abstract."}
---

# It learned a backflip from 900 yes-or-no answers

Try to write down a reward function for "do a backflip". You will end up specifying joint angles and torques, and what you will get is a simulated figure having a seizure with excellent form. The objective is easy to recognise and nearly impossible to state.

Christiano, Leike, Brown, Martic, Legg and Amodei, June 2017: then don't state it. Show a person two one-second clips of the agent flailing and ask which looks more like a backflip. Fit a reward model to those answers. Run reinforcement learning against the reward model, not against the world. Use the improving agent to choose which clips to ask about next, so the questions stay near the frontier of what it is confused about.

Nine hundred comparisons. Under an hour of a human's time. A simulated hopper that backflips and lands. Across Atari games and simulated locomotion, feedback on less than one per cent of the agent's interactions was enough.

That is the template every chat model is trained with now. Note the shape of it: the human never states the objective, only judges samples — and what gets optimised is the judge.

## Recall
type: mcq
Q: In preference-based RL, what is the agent actually optimising?
- [ ] The human's true preferences — those are never written down; the human only ever labels pairs of samples.
- [x] A learned reward model fitted to human comparisons — a proxy, which the policy will then push into wherever it is wrong.
- [ ] The raw environment reward, with human labels as a regulariser — in this setup there is no environment reward at all; that was the point.
