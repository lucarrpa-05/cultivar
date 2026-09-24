---
id: css.llm-agents.memory-planning.worse-than-no-documents
topic: css.llm-agents.memory-planning
format: fact
difficulty: 2
language: en
weight: medium
angles: [numbers, weird, practical]
tags: [lost-in-the-middle, long-context, retrieval, position-bias, agent-memory]
hook: "GPT-3.5 answered 56.1% of questions from memory alone. Give it 20 documents with the answer buried mid-pile and it did worse."
related: [css.llm-agents.memory-planning.three-numbers-decide-what-you-remember]
sources:
  - {title: "Lost in the Middle: How Language Models Use Long Contexts", author: "Liu, Lin, Hewitt, Paranjape, Bevilacqua, Petroni, Liang", year: 2023, type: paper, url: "https://arxiv.org/abs/2307.03172"}
  - {title: "Lost in the Middle (TACL version)", author: "Liu et al.", year: 2024, type: paper, url: "https://doi.org/10.1162/tacl_a_00638"}
dates: {written: 2026-09-23, event: 2023-07-06}
author: author-css-1
reviewed: {by: reviewer-css-2026-09-23, at: 2026-09-23, verdict: approved}
---

# Bury the answer mid-context and the model does worse than with nothing

In 2023 Nelson Liu and colleagues gave GPT-3.5-Turbo a question plus 20 or 30 retrieved documents, exactly one containing the answer, and moved that one document around. With the answer first or last, accuracy was high. With it in the middle, accuracy fell below the model's closed-book score of 56.1%, its accuracy when given no documents at all.

A long context window is not a memory. Where a fact sits decides whether the model can use it.

## Rigor

The claim is about position, so the design holds everything else fixed. Each prompt has one gold document and $k-1$ distractors retrieved for the same question, $k\in\{10,20,30\}$; only the gold document's index $i$ varies. Accuracy as a function of $i$ is U-shaped: primacy at the start, recency at the end, a trough between.

For GPT-3.5-Turbo the reference lines are 56.1% closed-book and 88.3% with the gold document alone. At $k=20$ and $k=30$ the trough sits under the closed-book line, a drop the authors put at more than 20%. The 16K-context version behaved almost identically to the 4K one wherever both fit, so a bigger window did not fix it.

For agent memory this is the case for retrieval over stuffing. Dump a simulated day into the prompt and most memories land in the trough. Ranking the few that matter and placing them at the edges decides what the agent can act on.

## Recall
type: mcq
Q: An agent's whole day of memories fits in its context window. Why retrieve a handful instead of including everything?
- [x] Models use the middle of a long context poorly — a relevant memory buried mid-prompt can be used worse than if it were absent.
- [ ] To save money — cost matters, but the finding is about accuracy even when everything fits.
- [ ] Because long prompts get truncated at the start — everything fit; the problem was position, and the 16K model behaved like the 4K one.
