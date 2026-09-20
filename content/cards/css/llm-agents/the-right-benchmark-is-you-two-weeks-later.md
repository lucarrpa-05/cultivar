---
id: css.llm-agents.simulating-1000-people.the-right-benchmark-is-you-two-weeks-later
topic: css.llm-agents.simulating-1000-people
format: idea
difficulty: 2
language: en
weight: medium
angles: [numbers, tool, prediction]
tags: [park-2024, general-social-survey, test-retest, interviews, benchmark]
hook: "How good can a simulated person be? The ceiling is not truth. It is you, answering again two weeks later."
sources:
  - {title: "Generative Agent Simulations of 1,000 People (v1)", author: "Park, Zou, Shaw, Hill, Cai, Morris, Willer, Liang, Bernstein", year: 2024, type: paper, url: "https://arxiv.org/abs/2411.10109v1"}
  - {title: "General Social Survey", type: wiki, url: "https://en.wikipedia.org/wiki/General_Social_Survey"}
dates: {written: 2026-09-19, event: 2024-11-15}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Source repointed to arXiv v1: the unversioned link now serves the retitled June 2026 v3. v1's 1,052 participants, two-hour interviews and 85% figure all confirmed."}
author: author-css-1
---

# The benchmark isn't truth. It's you, two weeks later.

Ask someone their view on immigration today and again in a fortnight and you will not get identical answers. People misremember, re-read the question differently, are in a different mood. That inconsistency is measurable — it is called test–retest reliability — and it puts a hard ceiling on how well *anything* can predict a person, including the person.

Park and colleagues built their evaluation around that ceiling. They recruited 1,052 Americans on a stratified national sample, put each through a two-hour semi-structured interview about their life, and turned each transcript into an agent. Then they gave the agent the General Social Survey and compared it with what its human had answered.

The agents reproduced their humans' GSS responses at 85% of the rate the humans reproduced their own answers two weeks later. Not 85% correct: 85% of the achievable.

They also checked the failure that worries people most. Compared with agents built from demographics alone, interview-based agents were more accurate *and* more evenly accurate across political and racial groups.

## Rigor

Why the normalisation matters: raw accuracy on a survey is uninterpretable without knowing how noisy the target is. If a question has 70% test–retest agreement, a model scoring 70% has saturated it, and a model scoring 85% is fitting noise. Dividing by the human's own replication rate converts an accuracy into a fraction of the explainable variance — the same logic as comparing a classifier to the Bayes error rather than to 100%.

Two cautions travel with the number. First, an 85% figure is an average over a battery; a model can be at ceiling on stable demographics-correlated attitudes and much worse on the volatile items that actually decide elections. Second, a two-week test–retest window is itself a choice: shorter windows raise the human's score and lower the model's relative performance.

The paper has since been revised and expanded, and the current version reports the same architecture built from interviews, from structured surveys, and from both, with a demographics-only baseline underneath all of them. Which of those inputs is doing the work turns out to be the more interesting question.

## Recall
type: mcq
Q: Why divide an agent's survey accuracy by the participant's own two-week test–retest rate?
- [x] Because people are not self-consistent, so their replication rate is the ceiling — the ratio measures the fraction of explainable variance, like comparing to Bayes error.
- [ ] To correct for the agents having seen the GSS in training — leakage is a real worry, but normalising by human consistency does nothing about it.
- [ ] Because the GSS has no right answers — it has recorded answers; the issue is that the same person gives different ones.
