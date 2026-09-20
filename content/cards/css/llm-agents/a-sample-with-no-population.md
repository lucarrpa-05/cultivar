---
id: css.llm-agents.silicon-samples.a-sample-with-no-population
topic: css.llm-agents.silicon-samples
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, connection, open-problem]
tags: [silicon-samples, argyle, algorithmic-fidelity, anes, conditioning]
hook: "Give a language model a stranger's biography and it will answer the survey as that stranger. Often correctly."
sources:
  - {title: "Out of One, Many: Using Language Models to Simulate Human Samples", author: "Argyle, Busby, Fulda, Gubler, Rytting, Wingate", year: 2023, type: paper, url: "https://doi.org/10.1017/pan.2023.2"}
  - {title: "Out of One, Many (preprint)", author: "Argyle et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2209.06899"}
  - {title: "American National Election Studies", type: wiki, url: "https://en.wikipedia.org/wiki/American_National_Election_Studies"}
dates: {written: 2026-09-19, event: 2023-02-21}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# A sample drawn from a population that doesn't exist

Take a real respondent from a national election study. Strip their answers, keep their backstory — age, race, state, party identification, church attendance, self-described ideology — and write it as a paragraph in the first person. Hand that paragraph to a language model and ask the question they were asked.

Argyle and colleagues did this at scale and found the model's answers tracked the real subgroups' answers closely enough to be interesting. Not "the model is unbiased" — the opposite. Their argument is that the model's biases are *fine-grained and demographically correlated*, so conditioning on a backstory selects a region of the model that resembles that group. They named the property **algorithmic fidelity**, and the artefact a **silicon sample**.

It is a genuinely new kind of object and a strange one, because a sample is normally a draw from a population. Here there is no population. There is a model trained on text produced by people, and a prompt that steers it.

Which makes "what is the standard error?" an unanswerable question as posed.

## Rigor

The honest framing is conditional distributions rather than sampling. Let $D$ be a demographic profile and $Y$ a survey response. A real survey estimates $P(Y\mid D)$ from respondents. A silicon sample gives you $P_{\text{LM}}(Y\mid \text{prompt}(D))$, a property of the model and the prompt. Algorithmic fidelity is the empirical claim that these two are close, for particular $D$, particular $Y$ and a particular model.

Three things follow. **It is not transferable.** Fidelity demonstrated on vote choice in one election says nothing about fidelity on a new issue, a new group, or a new model version. **Resampling is not sampling.** Running the prompt a thousand times gives you the model's output entropy, not the variability of a population; the confidence intervals it produces are meaningless as population inference. **The reference class is the training corpus.** Groups who write less on the internet are thinner in the model, so fidelity is systematically unequal in a way the numbers do not display.

Argyle et al. are explicit that this is a tool requiring validation against human data each time. The interesting question is what you do when the human data you would validate against is the thing you could not afford to collect.

## Recall
type: mcq
Q: What does "algorithmic fidelity" claim?
- [x] That a model's biases are fine-grained and demographically correlated, so conditioning on a backstory reproduces that subgroup's response pattern — for a given model, group and question.
- [ ] That language models are unbiased estimators of public opinion — the argument depends on the biases existing and being structured, not on their absence.
- [ ] That resampling the prompt yields valid confidence intervals — repeated draws measure the model's output variability, not a population's.
