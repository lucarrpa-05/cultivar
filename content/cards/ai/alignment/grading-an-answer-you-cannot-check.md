---
id: ai.alignment.scalable-oversight.grading-an-answer-you-cannot-check
topic: ai.alignment.scalable-oversight
topics: [econ.micro.information-asymmetry]
format: callback
difficulty: 3
language: en
weight: heavy
angles: [open-problem, connection, paradox]
callback: {from: econ.micro.information-asymmetry, to: ai.alignment.scalable-oversight}
tags: [scalable-oversight, principal-agent, sandwiching, debate, amplification]
hook: "Economics has a century of theory for hiring someone who knows more than you. All of it assumes you can eventually check the work."
sources:
  - {title: "Measuring Progress on Scalable Oversight for Large Language Models", author: "Bowman et al.", year: 2022, type: paper, url: "https://arxiv.org/abs/2211.03540"}
  - {title: "AI safety via debate", author: "Irving, Christiano & Amodei", year: 2018, type: paper, url: "https://arxiv.org/abs/1805.00899"}
  - {title: "Supervising strong learners by amplifying weak experts", author: "Christiano, Shlegeris & Amodei", year: 2018, type: paper, url: "https://arxiv.org/abs/1810.08575"}
  - {title: "AI alignment", type: wiki, url: "https://en.wikipedia.org/wiki/AI_alignment"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# How do you grade an answer you cannot check?

Remember the principal–agent problem: you hire someone *because* they know something you do not, and then you cannot distinguish a good job from a job that looks good. Economics has a hundred years of machinery for this — screening, signalling, contracts that make honesty pay. Every piece of it assumes that something correlated with quality eventually becomes observable. Sales figures arrive. The bridge stands or falls.

Scalable oversight is that problem with the assumption removed.

Suppose a model writes ten thousand lines of code, or a proof, or a summary of a patient's history, and it is better at the task than the person reviewing it. Then human approval is no longer evidence about quality. It is evidence about persuasiveness. And since approval is exactly what these systems are trained on, training optimises for the thing that is still measurable: convincing the reviewer.

The problem has a clean statement and no solution. What it has instead is four serious proposals, and knowing what each assumes is the useful part.

## Rigor

**Sandwiching** (Bowman et al., 2022) is the empirical handle. Pick tasks where a domain expert succeeds but both a non-expert and the model fail. Then test whether non-expert plus model reaches the expert's level. It gives a measurable proxy for the capability gap *today*, with today's models, rather than waiting for superhuman ones.

**Debate** (Irving, Christiano and Amodei, 2018) has two copies of the model argue and a human judge the exchange. The bet is asymmetry: in a zero-sum debate game, exposing a false claim is easier than defending one, so the equilibrium favours truth. They note that debate with a polynomial-time judge reaches questions in PSPACE, which is the formal version of the hope.

**Iterated amplification** (Christiano, Shlegeris and Amodei, 2018) builds the supervisor out of many calls to a weaker supervisor plus the model, so oversight strength grows alongside capability instead of being fixed.

**Task decomposition** reduces an uncheckable task to sub-tasks that are individually checkable, and bets that errors do not hide in the seams.

Each is a conjecture. What is established is only the failure mode: approval is a proxy whose error grows with the capability gap, and optimising a proxy is the previous card.

## Recall
type: mcq
Q: What breaks when a model is more capable than its human supervisor?
- [ ] The model stops following instructions — capability and obedience are separate; the issue is evaluating the output, not producing it.
- [x] Human approval stops tracking quality and starts tracking persuasiveness — and approval is exactly what the training signal is made of.
- [ ] The training signal becomes too sparse to learn from — there is plenty of signal; the problem is what the signal is actually measuring.
