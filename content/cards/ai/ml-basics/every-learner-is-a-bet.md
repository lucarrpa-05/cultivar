---
id: ai.ml-basics.what-is-learning.every-learner-is-a-bet
topic: ai.ml-basics.what-is-learning
format: idea
difficulty: 2
language: en
weight: medium
angles: [connection, beautiful]
tags: [inductive-bias, hypothesis-class, smoothness, priors]
prerequisites: [ai.ml-basics.what-is-learning]
hook: "Two models fit your data perfectly and disagree everywhere else. Something other than the data breaks the tie."
related: [ai.ml-basics.what-is-learning.the-lookup-table-test]
sources:
  - {title: "Inductive bias", type: wiki, url: "https://en.wikipedia.org/wiki/Inductive_bias"}
  - {title: "Machine Learning", author: "Tom M. Mitchell", year: 1997, type: book, url: "https://www.cs.cmu.edu/~tom/mlbook.html"}
  - {title: "Occam's razor", type: wiki, url: "https://en.wikipedia.org/wiki/Occam%27s_razor"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Mitchell 1997 now links to the book's own page rather than the author's Wikipedia entry."}
---

# Every learner is a bet about what the world looks like

Ten points on a page. A straight line passes through them. So does a degree-nine polynomial. So does a curve that thrashes wildly between every pair and happens to hit all ten. The three fit the data equally exactly, and disagree about everything you have not measured.

Nothing in the data breaks the tie. What breaks it is a preference installed before the data arrived: prefer smooth, prefer few parameters, prefer small weights, prefer short programs. That preference is the *inductive bias*, and it is not a flaw to be engineered away — without one, ten points say nothing whatsoever about the eleventh.

Which makes the honest description of any learning algorithm a bet. Convolutions bet that nearby pixels belong together and that a cat two pixels to the left is still a cat. Ridge regression bets that no single feature dominates. When a model works, its bet matched the world; when it fails on your problem, often the bet was wrong, not the training.

You can write the bet down precisely.

## Rigor

Let $\mathcal H$ be the hypothesis class and $S$ the sample. If $h_1,h_2\in\mathcal H$ agree on all of $S$ but differ at some $x$, the data cannot rank them; the algorithm does. Mitchell's definition makes this exact: the **inductive bias** of a learner $L$ is a minimal set of assumptions $B$ such that for every sample $S$ and instance $x$,

$$B \wedge S \wedge x \;\vdash\; L(S,x),$$

that is, the prediction follows *deductively* once you add $B$. A learner with $B=\varnothing$ predicts nothing off-sample: it is the lookup table again.

Two ways to place the bet. **Hard bias**: shrink $\mathcal H$ (only linear functions, only depth-3 trees). **Soft bias**: keep $\mathcal H$ enormous and rank it with a penalty,

$$\hat h=\arg\min_{h\in\mathcal H}\ \hat R_S(h)+\lambda\,\Omega(h),$$

with $\Omega$ measuring roughness, weight size, or description length. The data chooses within the bet; you choose the bet.

Then the obvious question: is some bet best in general? No — that is exactly what the no-free-lunch theorem rules out.

## Recall
type: reveal
Q: Your data cannot say which of two perfectly-fitting models to prefer. What does?
A: The inductive bias — the preference (smoothness, few parameters, small weights, short programs) built into the algorithm before any data arrives. Remove it and generalization is not harder, it is impossible.
