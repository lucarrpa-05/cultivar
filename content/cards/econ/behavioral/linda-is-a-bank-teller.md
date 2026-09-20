---
id: econ.behavioral.heuristics-biases.linda-is-a-bank-teller
topic: econ.behavioral.heuristics-biases
topics: [econ.behavioral.bounded-rationality]
format: story
difficulty: 2
language: en
weight: medium
angles: [paradox, numbers]
tags: [conjunction-fallacy, representativeness, tversky, linda-problem]
hook: "Adding a detail to a story can only make it less likely. About 85% of people bet the other way."
sources:
  - {title: "Conjunction fallacy", type: wiki, url: "https://en.wikipedia.org/wiki/Conjunction_fallacy"}
  - {title: "Extensional versus intuitive reasoning: the conjunction fallacy in probability judgment, Psychological Review 90(4)", author: "Tversky & Kahneman", year: 1983, type: paper, url: "https://doi.org/10.1037/0033-295X.90.4.293"}
dates: {written: 2026-09-19, event: 1983-10-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Linda is a bank teller, and 85% of people got it wrong

Linda is thirty-one, single, outspoken, very bright. She majored in philosophy, cared deeply about discrimination and social justice, and went on anti-nuclear demonstrations. Which is more probable: that Linda is a bank teller, or that Linda is a bank teller and active in the feminist movement?

About 85% of people pick the second. It cannot be right. Every feminist bank teller is a bank teller, so the second group sits *inside* the first — adding a detail can shrink a probability, never grow it. Tversky and Kahneman published this in 1983 and named it the conjunction fallacy: we judge by how well the story fits, not by how much room the story leaves.

The honest footnote: wording matters. Ask instead "out of 100 women like Linda, how many are bank tellers? how many are feminist bank tellers?" and the error rate drops to roughly 20%. Counting helps. It does not make the fallacy vanish, and the original version is the one your head runs by default.

## Rigor

Probability is monotone under inclusion. For events $A$ and $B$, write $A$ as the disjoint union $(A\cap B)\cup(A\cap B^{c})$. Since $\mathbb{P}$ is a measure,

$$\mathbb{P}(A)=\mathbb{P}(A\cap B)+\mathbb{P}(A\cap B^{c})\ \ge\ \mathbb{P}(A\cap B).$$

There is no distribution on any sample space under which "teller *and* feminist" beats "teller". The ranking people give is not a poor estimate of a probability; it is not a probability at all.

So what is it? Tversky and Kahneman's answer is **representativeness**: people substitute the similarity of Linda to a prototype for the probability of a category. Similarity is not monotone under conjunction — adding "feminist" makes the description fit *better*, so fit rises while measure falls. Judge by fit and you reproduce the observed order; judge by measure and you cannot.

The frequency rescue works because "how many out of 100" makes the nesting visible. The room the story leaves stops being an abstraction and becomes something you are literally counting.

## Recall
type: mcq
Q: Why can "bank teller and feminist" never be more probable than "bank teller"?
- [x] The conjunction is a subset, and probability is monotone — $\mathbb{P}(A\cap B)\le\mathbb{P}(A)$ always.
- [ ] Feminists are rare among bank tellers — the ranking would still be impossible even if almost every teller were a feminist.
- [ ] The description of Linda is irrelevant — it is highly relevant; it simply cannot reverse a set inclusion.
