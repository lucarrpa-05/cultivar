---
id: css.llm-agents.memory-planning.it-learns-if-someone-says-it-failed
topic: css.llm-agents.memory-planning
format: idea
difficulty: 3
language: en
weight: medium
angles: [mistake, tool, numbers]
tags: [reflexion, self-reflection, verbal-rl, self-correction, evaluator]
hook: "An agent that writes itself notes after each failure hit 91% on a coding benchmark. Take away the outside grader and the notes stop helping."
related: [css.llm-agents.memory-planning.three-numbers-decide-what-you-remember]
sources:
  - {title: "Reflexion: Language Agents with Verbal Reinforcement Learning", author: "Shinn, Cassano, Berman, Gopinath, Narasimhan, Yao", year: 2023, type: paper, url: "https://arxiv.org/abs/2303.11366"}
  - {title: "Large Language Models Cannot Self-Correct Reasoning Yet", author: "Huang, Chen, Mishra, Zheng, Yu, Song, Zhou", year: 2023, type: paper, url: "https://arxiv.org/abs/2310.01798"}
dates: {written: 2026-09-23, event: 2023-03-20}
author: author-css-1
reviewed: {by: reviewer-css-2026-09-23, at: 2026-09-23, verdict: approved}
---

# The agent learns from its mistakes, if someone tells it which ones

In March 2023 Noah Shinn and colleagues gave a language-model agent a notebook. After each failure it wrote itself a short lesson, like *find the desk lamp before the mug*, and reread its notes before the next try. No weights changed. They called it verbal reinforcement learning, and the numbers were loud: 130 of 134 household tasks solved in a text game, and 91% on the HumanEval coding benchmark against 80% for GPT-4 alone.

Every useful lesson, though, began with a verdict from outside: the game saying *failed*, a unit test going red. When Huang and colleagues removed that verdict and let models critique their own reasoning, accuracy stayed flat or fell.

So where was the learning happening?

## Rigor

In the evaluator. Reflexion writes the policy as $\pi(a\mid s;\theta,\text{mem})$ with the model's weights $\theta$ frozen. After trial $t$ an evaluator returns a score $r_t$, a reflection model turns the trajectory and $r_t$ into a sentence $sr_t$, and the only update is

$$\text{mem}\leftarrow\big(\text{mem}\cup\{sr_t\}\big)_{\text{last }\Omega},$$

a sliding window with $\Omega$ usually 1 to 3.

That is gradient-free policy search, and policy search is exactly as good as its reward. With a real signal (an environment, a compiler) each note carries information the model did not have. With the model grading itself, $r_t$ is a function of what the model already believes, so the loop can only rearrange that belief.

The paper's own weak spot shows the mechanism. Its coding agent wrote its own unit tests. On HumanEval, tests passed a wrong solution 1.4% of the time; on MBPP Python, 16.3%, and there Reflexion fell behind plain GPT-4. A leaky grader teaches the wrong lesson with full confidence.

Now reread Smallville's reflection with this in mind: agents summarise memories into higher-level beliefs with no evaluator at all. That is elaboration, not learning, and it is worth knowing which one your simulated voters are doing.

## Recall
type: mcq
Q: Why did self-written notes help Reflexion but not models critiquing themselves with no outside signal?
- [x] The information enters through the evaluator — a real verdict (tests, environment) adds something new, while self-grading only rearranges what the model already believes.
- [ ] Reflexion's notes updated the model's weights — no weights change; the text memory is the only thing updated.
- [ ] The memory window was too short for reasoning tasks — window size limits how many lessons fit, but the failure Huang et al. report is the missing external feedback.
