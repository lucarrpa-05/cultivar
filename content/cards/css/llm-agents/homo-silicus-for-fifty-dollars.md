---
id: css.llm-agents.silicon-samples.homo-silicus-for-fifty-dollars
topic: css.llm-agents.silicon-samples
format: story
difficulty: 2
language: en
weight: medium
angles: [origin, human, numbers]
tags: [homo-silicus, horton-2023, llm-experiments, fairness, status-quo-bias]
hook: "An economist reran classic experiments on GPT-3 for about fifty dollars, then checked whether it was just reciting the papers."
related: [css.llm-agents.silicon-samples.a-sample-with-no-population]
sources:
  - {title: "Large Language Models as Simulated Economic Agents: What Can We Learn from Homo Silicus? (v1)", author: "John J. Horton", year: 2023, type: paper, url: "https://arxiv.org/abs/2301.07543v1"}
  - {title: "Understanding Social Preferences with Simple Tests", author: "Gary Charness, Matthew Rabin", year: 2002, type: paper, url: "https://doi.org/10.1162/003355302760193904"}
dates: {written: 2026-09-23, event: 2023-01-18}
author: author-css-1
reviewed: {by: reviewer-css-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Horton asked GPT-3 only for the Charness-Rabin results, not 'the original papers' results'; body reworded. All v1 figures verified."}
---

# Four experiments, one language model, about fifty dollars

In January 2023 John Horton of MIT posted a paper with a provocation in its title: *Homo silicus*. He took classic behavioural-economics experiments, among them Kahneman, Knetsch and Thaler's 1986 question about a hardware store that raises snow-shovel prices the morning after a storm, and put them to GPT-3 wearing personas: socialist, liberal, moderate, libertarian. The answers came back humanlike. Bigger price jumps were judged less fair, and right-leaning personas were more forgiving. The whole set of experiments cost about \$50 to run.

Horton admitted his prior had been that the model was simply repeating what it had read. So he asked it for the published results of one of them.

## Rigor

It did not know them. Asked what share of subjects chose *Left* in four of Charness and Rabin's dictator-game scenarios, GPT-3 answered 59%, 57%, 43% and 16%. The published figures are 31%, 78%, 100% and 52%. Whatever produced the humanlike behaviour, it was not recall of the result.

That separates two things an LLM experiment can be. **Replication by memory** tells you nothing, because the model has read the paper. **Simulation from priors** is Horton's claim: the model encodes how people talk about fairness, defaults and prices, and endowing it with a persona, a budget or a preference lets you explore behaviour the way a theorist explores *homo economicus*, by varying the setup.

The status-quo experiment shows the power. In Samuelson and Zeckhauser's budget-allocation problem, whichever option was framed as the status quo became the most common choice, including one that no agent picked under neutral framing, just as with people.

What it cannot give you is a population. One model plays every subject, so the spread across "respondents" is whatever the persona prompts put there. Horton pitched the method as a cheap way to pilot studies before running them on humans, not as a replacement for them.

## Recall
type: mcq
Q: Why did Horton ask GPT-3 for the published Charness–Rabin numbers?
- [x] To test whether its humanlike answers were memorised results — it got the numbers badly wrong, so recall was not the explanation.
- [ ] To calibrate the model's answers against the original data — no calibration was done; the question was a diagnostic.
- [ ] To show the model is a representative sample — one model plays every subject, which is exactly why it cannot be a population draw.
