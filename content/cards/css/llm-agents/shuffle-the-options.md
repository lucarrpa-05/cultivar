---
id: css.llm-agents.silicon-samples.shuffle-the-options
topic: css.llm-agents.silicon-samples
topics: [css.llm-agents.validity]
format: idea
difficulty: 3
language: en
weight: medium
angles: [mistake, weird, tool]
tags: [a-bias, answer-ordering, american-community-survey, kl-divergence, survey-alignment]
hook: "Put the US census questions to 43 language models. What looks like a population is mostly a taste for option A."
related: [css.llm-agents.validity.whose-opinions-does-it-reflect]
sources:
  - {title: "Questioning the Survey Responses of Large Language Models (NeurIPS 2024)", author: "Ricardo Dominguez-Olmedo, Moritz Hardt, Celestine Mendler-Dünner", year: 2024, type: paper, url: "https://arxiv.org/abs/2306.07951v4"}
  - {title: "American Community Survey", type: wiki, url: "https://en.wikipedia.org/wiki/American_Community_Survey"}
dates: {written: 2026-09-23, event: 2023-06-13}
author: author-css-1
reviewed: {by: reviewer-css-2026-09-23, at: 2026-09-23, verdict: approved, notes: "'Undermines every whose-opinions ranking' overclaimed (the paper says such measures often permit the uniform explanation); now 'the usual'. v4 figures verified."}
---

# Shuffle the answers and the model's population turns into dice

Ricardo Dominguez-Olmedo, Moritz Hardt and Celestine Mendler-Dünner took 25 questions from the 2019 American Community Survey, the Census Bureau survey with answers from about 3.2 million people, and put them to 43 language models, recording each model's probabilities over the options.

The raw answers looked like a population with character. Mostly they were position: every model leaned towards whatever was labelled A. Reverse the options on the sex question and GPT-2 flips from over-representing one sex to the other.

So they averaged over every ordering of the options, and the character vanished. Answers moved towards uniform, closer to a fair die than to the US or to any single state.

Which quietly undermines the usual "whose opinions" ranking.

## Rigor

Here is why the ranking inherits the artefact. Alignment with a group $g$ is typically scored as an average divergence between the model's answer distribution $R_q$ and the group's $C_{g,q}$:

$$D(g)=\frac1{|Q|}\sum_{q\in Q}\mathrm{KL}\big(R_q\,\|\,C_{g,q}\big).$$

Suppose the adjusted model is exactly uniform on the $k_q$ options, $R_q=U_q$. Then

$$\mathrm{KL}\big(U_q\,\|\,C_{g,q}\big)=-\log k_q-\frac1{k_q}\sum_{j=1}^{k_q}\log C_{g,q}(j),$$

which is smallest when $C_{g,q}$ is itself close to uniform. The group the model "best represents" is simply the group whose answers are most evenly spread, and no demographic signal in the model is needed to produce the ranking. That is the paper's conclusion about survey-derived alignment scores.

The A-bias is defined just as plainly. Under randomised ordering an unbiased model picks A with probability $1/k_q$; the bias is the excess $P(\text{A})-1/k_q$. All 43 models showed it, and the smallest ones tended towards answering A almost every time.

The practical rule for a silicon sample: randomise option order and average over orderings, or you may be measuring typography.

## Recall
type: mcq
Q: After averaging over answer orderings, a model scores as best aligned with group X. What is the cheapest explanation?
- [x] Group X's answers are the most evenly spread, and a near-uniform model is automatically closest to them — no demographic signal required.
- [ ] The training data over-represents group X — possible in principle, but the uniform-closeness explanation already suffices.
- [ ] Group X tends to answer "A" — the averaging over orderings is exactly what removed the A-bias.
