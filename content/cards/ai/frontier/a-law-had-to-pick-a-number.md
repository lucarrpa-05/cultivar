---
id: ai.frontier.policy.a-law-had-to-pick-a-number
topic: ai.frontier.policy
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, practical, connection]
tags: [compute-threshold, eu-ai-act, effective-compute, algorithmic-progress, systemic-risk]
hook: "How do you legislate a technology you cannot define? You regulate the electricity bill instead."
sources:
  - {title: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)", year: 2024, type: primary, url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"}
  - {title: "Artificial Intelligence Act", type: wiki, url: "https://en.wikipedia.org/wiki/Artificial_Intelligence_Act"}
  - {title: "Algorithmic progress in language models", author: "Ho et al.", year: 2024, type: paper, url: "https://arxiv.org/abs/2403.05812"}
dates: {written: 2026-09-19, event: 2024-08-01}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Regulation had to pick a number, so it picked a big one

Writing a law about "AI" runs into a definitional swamp immediately: a spam filter, a credit model and a chatbot are all the same technology on paper. The instrument that emerged instead sidesteps definitions entirely. Do not regulate the capability. Regulate anything whose training consumed more than a stated number of arithmetic operations.

The EU's AI Act — Regulation 2024/1689, in force from 1 August 2024 — presumes a general-purpose model carries systemic risk when its training used more than $10^{25}$ floating-point operations.

The appeal is real. Compute is countable, auditable, bought from a handful of suppliers, hard to conceal, and correlated with capability. Compared to everything else on offer, that is a miracle of tractability.

The problem is that the correlation moves under your feet, and it moves in one direction.

## Rigor

Write capability as a function of **effective compute** $C_{\text{eff}} = A(t)\cdot C$, where $C$ is the raw operation count and $A(t)$ is an algorithmic-efficiency multiplier rising over time. Ho et al. (2024), over 200 language-model evaluations from 2012–2023, estimate that the compute needed to reach a fixed performance level halves roughly every 8 months (95% interval 5 to 14 months).

A statute fixes $C^{\star}$. It therefore gates the capability level $A(t)\,C^{\star}$, which drifts upward on that same clock. After $k$ doublings of $A$, a model trained with only $C^{\star}/2^{k}$ operations matches what $C^{\star}$ bought when the law was drafted — and sits legally below the line. Thresholds **loosen** automatically. A fixed number in a statute is a snapshot of an exchange rate between compute and capability, and the rate is not fixed.

The fixes are all awkward: index the threshold, revise it periodically, or pair it with capability evaluations that reintroduce the definitional problem you were escaping.

The counter-argument survives anyway, and it is the honest one: of every input to the pipeline, $C$ is the only one that is physically countable, concentrated in few hands, and hard to hide. Expect the numbers to change and the *structure* — pick a measurable proxy, attach duties above it — to stay.

## Recall
type: mcq
Q: What happens to a fixed compute threshold as algorithms improve?
- [ ] It catches more models over time, since models keep getting bigger — some grow, but the threshold's meaning is about capability per unit of compute.
- [x] It gates a steadily higher capability level — so equally capable models slip below the line and escape it.
- [ ] Nothing — it is a fixed physical quantity, so it stays constant in meaning — the quantity is fixed; what it buys in capability is not.
