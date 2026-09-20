---
id: ai.frontier.open-vs-closed.would-you-publish-the-weights
topic: ai.frontier.open-vs-closed
format: challenge
difficulty: 1
language: en
weight: light
angles: [practical, paradox, tool]
tags: [marginal-risk, dual-use, release-decisions, irreversibility, auditability]
hook: "The release decision that actually gets made is not \"is this dangerous?\". Everything is dangerous. Here is the question that replaces it."
sources:
  - {title: "The Open Source AI Definition 1.0", author: "Open Source Initiative", year: 2024, type: primary, url: "https://opensource.org/ai/open-source-ai-definition"}
  - {title: "Fine-tuning Aligned Language Models Compromises Safety, Even When Users Do Not Intend To!", author: "Qi et al.", year: 2023, type: paper, url: "https://arxiv.org/abs/2310.03693"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# You run the lab. Do you publish the weights?

Your lab has trained a model that is clearly better than anything public at one narrow thing: reading a large codebase and finding exploitable bugs.

Defenders would use it to fix software that has been quietly broken for a decade. Attackers would use it to find the same bugs faster than anyone can patch them. Publishing is irreversible — no recall, and whatever restriction you fine-tuned in can be fine-tuned out for the price of a coffee. Keeping it closed means the only people who can audit it for bias, or study how it works, are the ones on your payroll.

Before you decide: what is the question you would actually want answered? And why is "is this model dangerous?" the wrong one?

## Recall
type: reveal
Q: What is the question that replaces "is it dangerous?"
A: **Marginal risk.** How much does *this* release change what a determined attacker could already achieve with public tools, already-released models and a few weeks of work? A capability that three other open models already have adds little; a genuinely novel one adds a lot. It converts an unanswerable question — everything is dangerous — into a comparative one you can investigate, and it makes the answer depend on the state of the world at the moment of release. That is why the same model can be reasonable to release this year and not last.
