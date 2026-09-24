---
id: css.llm-agents.memory-planning.cut-memory-at-the-seams
topic: css.llm-agents.memory-planning
format: news
difficulty: 2
language: en
weight: medium
angles: [tool, practical]
tags: [agent-memory, retrieval, chunking, provenance, tool-use, preprint]
hook: "Slice an agent's history into equal windows and the evidence scatters. Cut it at the agent's own actions instead."
related: [css.llm-agents.memory-planning.three-numbers-decide-what-you-remember]
sources:
  - {title: "When Does Execution Provenance Help Agent Memory Retrieval?", author: "Wang, Ju, Zhang, Sun, Duan, Zheng & Cai", year: 2026, type: paper, url: "https://arxiv.org/abs/2609.25913"}
  - {title: "Generative Agents: Interactive Simulacra of Human Behavior", author: "Park, O'Brien, Cai, Morris, Liang & Bernstein", year: 2023, type: paper, url: "https://arxiv.org/abs/2304.03442"}
dates: {written: 2026-09-23, event: 2026-09-22, expires: 2026-11-06}
evergreen: false
author: author-news-1
reviewed: {by: reviewer-css-2026-09-23, at: 2026-09-23, verdict: approved, notes: "dates.event set to the arXiv date (2026-09-22, expires 2026-11-06). Caveat said the questions were human-checked; only a 500-query sample was audited."}
---

# Where you cut an agent's memory matters more than how you search it

On 22 September 2026, Yiqi Wang and six coauthors tested how an LLM agent should store its history for retrieval. Instead of slicing the log into equal 512-token windows, they cut it at the agent's actions: each tool call's arguments and its output became one unit. With a 2,048-token budget, the share of questions whose full evidence was retrieved rose by 19 points. A graph linking the units added only 4.5 more.

Remember Smallville, where every observation became one sentence in a memory stream? The unit of memory turns out to be the bigger lever, and the search on top the smaller one.

Caveat: synthetic operating-system logs; the questions were LLM-written, and humans audited only a 500-question sample.
