---
id: ai.history.dartmouth-symbolic.thirty-eight-theorems
topic: ai.history.dartmouth-symbolic
format: story
difficulty: 1
language: en
weight: light
angles: [human, history, weird]
tags: [logic-theorist, newell-simon, principia-mathematica, heuristic-search]
hook: "It found a proof shorter than Whitehead and Russell's, and a journal declined the paper because one author was a program."
sources:
  - {title: "Logic Theorist", type: wiki, url: "https://en.wikipedia.org/wiki/Logic_Theorist"}
  - {title: "Dartmouth workshop", type: wiki, url: "https://en.wikipedia.org/wiki/Dartmouth_workshop"}
dates: {written: 2026-09-19, event: 1956-06-01}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The program that proved 38 theorems and got rejected anyway

Everyone at Dartmouth in 1956 arrived with a plan. Allen Newell, Herbert Simon and Cliff Shaw arrived with something running.

Logic Theorist worked through the propositional logic of Whitehead and Russell's *Principia Mathematica* and proved 38 of the first 52 theorems of Chapter 2. For theorem 2.85 it found a proof shorter than the one in the book. Simon wrote to Russell about it; Russell wrote back delighted. Then, as Simon told the story, they sent a paper to the *Journal of Symbolic Logic* listing Logic Theorist as a co-author, and it was declined.

The method matters more than the score. Logic Theorist did not enumerate derivations — that space is far too big. It worked backwards from the goal and used rough rules to decide which branch looked promising. Search plus heuristics. For the next twenty years, that was what "artificial intelligence" meant.

## Recall
type: mcq
Q: What was the key idea in Logic Theorist?
- [ ] Enumerating every possible proof until one works — the space of derivations is astronomically large; brute force was exactly what it avoided.
- [x] Searching backwards from the goal with heuristics ranking which branch to try — search guided by rules of thumb became the template for symbolic AI.
- [ ] Learning proof strategies from a corpus of existing proofs — learning from data came much later; its knowledge was hand-written.
