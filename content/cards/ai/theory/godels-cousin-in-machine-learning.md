---
id: ai.theory.no-free-lunch.godels-cousin-in-machine-learning
topic: ai.theory.no-free-lunch
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, paradox]
tags: [godel, diagonal-argument, universality, inductive-bias, priors]
callback: {from: math.foundations.godel, to: ai.theory.no-free-lunch}
hook: "Two theorems that kill a universal object, and two fields that carried on by naming their assumptions instead."
related: [ai.theory.no-free-lunch.no-hay-almuerzo-gratis]
sources:
  - {title: "The Lack of A Priori Distinctions Between Learning Algorithms", author: "David H. Wolpert", year: 1996, type: paper, url: "https://doi.org/10.1162/neco.1996.8.7.1341"}
  - {title: "No free lunch theorem", type: wiki, url: "https://en.wikipedia.org/wiki/No_free_lunch_theorem"}
  - {title: "Gödel's incompleteness theorems", type: wiki, url: "https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Qualified no free lunch: all algorithms share the same expected off-training error, which is 1/2 for binary labels under 0-1 loss."}
---

# Remember Gödel? Learning theory has its own "no system does everything"

Remember what Gödel actually showed: not that mathematics is broken, but that no single consistent, effectively axiomatised system captures every arithmetical truth. Strengthen the axioms and you capture more, and there is still something outside. The limitation is about *universality*, not about difficulty.

No free lunch is the same species of result, one floor down. No learning algorithm beats any other averaged over all possible target functions — and not in the sense that the best one is hard to find. There is no best one, because being better on one world is exactly being worse on another.

The responses rhyme too. Incompleteness did not stop anyone doing mathematics; it moved the question from "the one true system" to "which axioms, and why those". No free lunch does not stop anyone doing machine learning; it moves the question from "the best algorithm" to "which inductive bias, and why that one".

The mechanisms differ in one way that actually matters.

## Rigor

Both results exhibit a symmetry of the problem space that forbids any single object from dominating. Neither says anything is unachievable *relative to a stated assumption*.

**Gödel (1931).** For any consistent, effectively axiomatised $T$ extending Robinson arithmetic there is a sentence $G_T$ with $T\nvdash G_T$ and $T\nvdash\neg G_T$. The construction diagonalises: $G_T$ asserts its own unprovability in $T$. It is relative, not absolute — $T'=T+G_T$ proves it, and comes with its own $G_{T'}$.

**No free lunch (Wolpert, 1996).** Averaged uniformly over target functions consistent with the sample, every algorithm has the same expected off-training error — $1/2$ for binary labels under 0–1 loss. The proof pairs $f$ with the $f'$ that agrees on the sample and is flipped everywhere else; the involution cancels each success against a failure.

The difference is the interesting part. Gödel's limit is *absolute for a fixed theory*: no amount of further data escapes it. No free lunch is a statement about a *measure*. Replace the uniform prior over functions by one favouring compressible ones and the theorem simply stops applying — which is exactly what Solomonoff induction and minimum description length do.

Which is the moral worth keeping. A uniform prior is not neutrality. It is a strong, and almost certainly false, claim about the world, and every learner that works has quietly replaced it.

## Recall
type: reveal
Q: Gödel and no free lunch both rule out something universal. What is the crucial difference?
A: Gödel's limit is absolute for a fixed theory — more data never escapes it. No free lunch is relative to a *uniform prior over problems*; assume instead that the world favours simple, compressible functions and the theorem no longer applies. Every working learner makes precisely that swap.
