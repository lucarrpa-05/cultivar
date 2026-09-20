---
id: css.llm-agents.simulating-1000-people.two-hours-of-interview-versus-a-form
topic: css.llm-agents.simulating-1000-people
format: idea
difficulty: 3
language: en
weight: medium
angles: [numbers, practical, mistake]
tags: [park-2024, interviews, surveys, asymptote, data-value]
hook: "Two hours of life story, or a filled-in questionnaire. The gap between them is four points."
sources:
  - {title: "LLM Agents Grounded in Self-Reports Enable General-Purpose Simulation of Individuals (rev. of Generative Agent Simulations of 1,000 People)", author: "Park, Zou, Kamphorst, Egan, Shaw, Hill, Cai, Morris, Liang, Willer, Bernstein", year: 2026, type: paper, url: "https://arxiv.org/abs/2411.10109"}
  - {title: "Out of One, Many: Using Language Models to Simulate Human Samples", author: "Argyle, Busby, Fulda, Gubler, Rytting, Wingate", year: 2023, type: paper, url: "https://doi.org/10.1017/pan.2023.2"}
dates: {written: 2026-09-19}
related: [css.llm-agents.simulating-1000-people.the-right-benchmark-is-you-two-weeks-later]
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Marked the 100x interview-cost figure as an estimate. 83/82/86 vs 74% and the asymptote wording confirmed verbatim against arXiv:2411.10109v3 (28 June 2026)."}
author: author-css-1
---

# Two hours of life story, or a questionnaire. Four points apart.

The obvious reading of the 1,000-people study is that qualitative depth is what makes a simulated person work — that the two-hour interview, with its digressions and its childhood, is carrying the signal. It is an attractive story for anyone who has ever defended interviews to a quantitative referee.

The revised version of the paper tests it. Same architecture, same participants, three kinds of input: the interview transcript alone, a structured survey alone, or both. Against a demographics-only baseline at 74% accuracy, interviews reach 83%, surveys 82%, and both together 86%.

So almost the entire gain comes from having *any* self-report at all rather than a demographic sketch. The interview's advantage over a form is roughly one point, and combining them adds three more. The authors put it as an asymptote: once the model has seen enough evidence within a domain, further data stops buying much.

For anyone planning a study, that reshapes the budget entirely.

## Rigor

Take the numbers as marginal products. Demographics → any self-report: +8 or +9 points. Survey → interview: +1. Either → both: +3 or +4.

A two-hour recorded and transcribed interview plausibly costs on the order of a hundred times what a survey response costs. At those prices, 1,000 interviews and 100,000 survey responses cost about the same, and the second buys you a hundred times the statistical power for one point of per-person fidelity. Unless your quantity of interest lives in the part of the person a questionnaire cannot reach, the form wins.

Where interviews should still win, on this logic, is precisely where the asymptote has not been reached: rare populations, unusual attitudes, domains with no validated instrument, anything where you do not already know which questions to ask. That is the classic argument for qualitative work, now with a price tag attached.

And note the direction of the whole finding. It is deflationary about the architecture and inflationary about the data: what makes an agent resemble a person is mostly that the person told you about themselves, in any format.

## Recall
type: mcq
Q: What does the interview-versus-survey comparison imply for research design?
- [x] Collect self-reports from many people rather than long interviews from few — nearly all the gain is having any self-report at all, and interviews beat surveys by about a point.
- [ ] Interviews are not worth doing — they still win where no validated instrument exists or the population is unusual, which is where the asymptote has not been reached.
- [ ] Demographics are enough — the demographics-only baseline sits roughly eight or nine points below every self-report condition.
