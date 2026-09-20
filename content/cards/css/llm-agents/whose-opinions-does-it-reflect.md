---
id: css.llm-agents.validity.whose-opinions-does-it-reflect
topic: css.llm-agents.validity
format: idea
difficulty: 3
language: en
weight: medium
angles: [mistake, numbers, practical]
tags: [santurkar, opinionqa, representation, rlhf, steering]
hook: "Sixty US demographic groups, one benchmark. The gap between the model and some of them is the size of a partisan divide."
sources:
  - {title: "Whose Opinions Do Language Models Reflect?", author: "Santurkar, Durmus, Ladhak, Lee, Liang, Hashimoto", year: 2023, type: paper, url: "https://arxiv.org/abs/2303.17548"}
  - {title: "Pew Research Center (the American Trends Panel surveys behind OpinionQA)", type: wiki, url: "https://en.wikipedia.org/wiki/Pew_Research_Center"}
dates: {written: 2026-09-19, event: 2023-03-30}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Source titled 'American Trends Panel' pointed at the Pew Research Center page; retitled to match."}
author: author-css-1
---

# Whose opinions does the model reflect?

Santurkar and colleagues built OpinionQA by taking real Pew survey questions — abortion, automation, guns, the lot — where the human answer distributions are known for 60 US demographic groups, and asking language models the same questions.

Two findings, and the second is the one that should worry anyone doing silicon samples.

First: current models are substantially misaligned with most groups, and the size of that misalignment is comparable to the gap between Democrats and Republicans on climate policy. Some groups are badly under-represented — people over 65 and widowed respondents among them. Models tuned with human feedback lean noticeably left, which is the finding that got the attention, but it is the *unevenness* that does the damage, because it varies by question and by group in ways you cannot predict from the average.

Second: telling the model who to be does not fix it. Explicitly steering toward a demographic group reduces the gap but does not close it. The model can describe a group better than it can be one.

## Rigor

The measurement is distributional, not accuracy-based. For a multiple-choice opinion item, let $h$ be the human group's answer distribution and $m$ the model's — obtained from next-token probabilities over the option letters. Representativeness is $1$ minus a distance between $h$ and $m$, summed across questions, which lets a model be wrong about the modal answer yet still representative about the spread, and vice versa.

That choice matters for practice. A model that always outputs the majority opinion scores well on accuracy and terribly on representativeness, and a simulated electorate built from it will show far too little disagreement — the same collapse of variance that has been measured directly in synthetic survey work.

The steering result is the operational one. If conditioning on a persona closed the gap, silicon samples would be a matter of writing good prompts. It does not close it, so persona conditioning is a partial correction of unknown size that differs by group. Any design that relies on it needs a held-out human comparison for the specific groups and questions involved, which is exactly the cost the method was supposed to save.

## Recall
type: mcq
Q: What does the OpinionQA steering result imply for simulating a population with prompts?
- [x] Persona prompts narrow the gap without closing it — the residual varies by group and question, so each use needs its own human comparison.
- [ ] Persona prompts fix misalignment, so careful prompting is enough — steering reduced but did not eliminate the mismatch.
- [ ] Misalignment is uniform, so one global correction works — under-representation is concentrated in particular groups, including people over 65.
