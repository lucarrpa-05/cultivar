---
id: css.llm-agents.generative-agents.the-agents-beat-the-humans
topic: css.llm-agents.generative-agents
format: idea
difficulty: 3
language: en
weight: medium
angles: [numbers, mistake, weird]
tags: [believability, ablation, trueskill, crowdworkers, failure-modes]
hook: "In the believability ranking, the full architecture beat the human-written baseline. That is more troubling than it sounds."
sources:
  - {title: "Generative Agents: Interactive Simulacra of Human Behavior", author: "Park, O'Brien, Cai, Morris, Liang, Bernstein", year: 2023, type: paper, url: "https://arxiv.org/abs/2304.03442"}
  - {title: "TrueSkill", type: wiki, url: "https://en.wikipedia.org/wiki/TrueSkill"}
dates: {written: 2026-09-19, event: 2023-04-07}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# The agents outranked the humans, and that is the problem

To test whether the architecture was doing anything, Park and colleagues interviewed the agents — asked them about their plans, their memories, their opinions — and had human raters compare the answers across five conditions, ranked with TrueSkill.

Full architecture first, at 29.89. Strip out reflection: 26.88. Strip out reflection and planning: 25.64. Strip out memory too: 21.21. Each component was earning its place. Good.

The fifth condition is the interesting one. A human crowdworker, given the same agent's identity and history, wrote what that agent would say — and scored 22.95, behind every version with memory. The gap between the crowdworker and the *fully ablated* agent was the only pairwise difference that was not significant.

Read that carefully. "More believable than a paid stranger role-playing for a few minutes" is a low bar, and clearing it says a great deal about the bar and little about the agent. Believability is a judgement by a rater, not a match to a person.

## Rigor

The failure modes the paper reports are more diagnostic than the scores, and two of them matter for anyone building social simulations.

**Memory retrieval degrades with scale.** As the memory stream grows, the agent increasingly picks implausible locations for its actions, because retrieval surfaces the wrong context. The architecture's central mechanism gets worse as the simulation gets longer — the opposite of what a model of a life should do.

**Instruction tuning leaks into the sociology.** The authors observe dialogue that is overly formal and behaviour that is overly cooperative: agents adopt each other's interests even where that clashes with their assigned character. RLHF trained the base model to be agreeable, and agreeableness is not a neutral prior when the thing you are measuring is conformity, polarisation, or whether a norm takes hold.

That second one is a systematic bias with a known sign. If you simulate an opinion dynamic with instruction-tuned agents, you should expect too much consensus, and you cannot fix it by adding agents.

## Recall
type: mcq
Q: Why should an LLM social simulation be treated as biased toward consensus?
- [x] Instruction tuning rewards agreeableness — the paper reports agents behaving overly cooperatively and adopting each other's interests against their own characters.
- [ ] Because agents share one underlying model, so they must agree — distinct memories and personas do produce genuine disagreement; the bias is in the direction, not absolute.
- [ ] Because memory retrieval favours recent events — recency bias affects what is recalled, not how agreeable the agent is.
