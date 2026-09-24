---
id: css.opinion-dynamics.degroot.same-spectrum-opposite-verdict
topic: css.opinion-dynamics.degroot
topics: [math.linear-algebra.eigen, css.llm-agents.multi-agent-systems]
format: news
difficulty: 3
language: en
weight: medium
angles: [paradox, connection]
tags: [collective-intelligence, communication, eigenvalues, singular-values, wisdom-of-crowds, preprint]
hook: "Two networks of agents share every eigenvalue and singular value. One makes the group smarter; the other makes it worse."
related: [css.opinion-dynamics.degroot.everyone-averages-someone-wins, css.opinion-dynamics.degroot.consensus-is-a-fixed-point]
sources:
  - {title: "When Does Communication Help? Beyond Spectral Descriptions of Collective Intelligence", author: "Xuening Wu", year: 2026, type: paper, url: "https://arxiv.org/abs/2609.23310"}
  - {title: "DeGroot learning", type: wiki, url: "https://en.wikipedia.org/wiki/DeGroot_learning"}
dates: {written: 2026-09-23, event: 2026-09-20, expires: 2026-11-04}
evergreen: false
author: author-news-1
reviewed: {by: reviewer-css-2026-09-23, at: 2026-09-23, verdict: approved, notes: "The 72.6/91.2/65.9 contrast is the paper's linear counterexample, not neural agents; accuracy is mean individual accuracy, not a vote; the rotated matrix is the message transform, not the averaging matrix. dates.event set to the arXiv date (2026-09-20, expires 2026-11-04)."}
---

# Same eigenvalues, same singular values, opposite verdict

On 20 September 2026, Xuening Wu posted a counterexample for anyone who judges talking agents by their network's spectrum. Agents with private evidence swap messages through a neighbour-averaging matrix, DeGroot's row-stochastic kind, then each answers yes or no. In a linear case, two setups share every eigenvalue and singular value; only the message transform is rotated 45 degrees. One lifts average accuracy from 72.6% to 91.2%. The other drops it to 65.9%.

Linear algebra bites back: the spectrum ignores the basis, the task does not. What counts is how the rotation steers shared noise into the coordinate each agent decides from. Agreement is not accuracy.

Caveat: single-author preprint; small agents, synthetic tasks and digits, three seeds per study.
