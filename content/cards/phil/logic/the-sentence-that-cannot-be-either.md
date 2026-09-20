---
id: phil.logic.paradoxes.the-sentence-that-cannot-be-either
topic: phil.logic.paradoxes
format: idea
difficulty: 3
language: en
weight: heavy
angles: [paradox, beautiful]
tags: [liar-paradox, tarski, undefinability, self-reference, dialetheism]
hook: "Nine words that no consistent theory of truth can survive: this sentence is not true."
sources:
  - {title: "Liar Paradox", type: encyclopedia, url: "https://plato.stanford.edu/entries/liar-paradox/"}
  - {title: "Tarski's undefinability theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Tarski%27s_undefinability_theorem"}
  - {title: "Outline of a Theory of Truth", author: "Saul Kripke", year: 1975, type: paper, url: "https://www.jstor.org/stable/2024634"}
dates: {written: 2026-09-19}
author: author-humanities-1
reviewed: {by: reviewer-humanities-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Difficulty 2 to 3: the rigor is the diagonal lemma plus Tarski undefinability with Godel numbering."}
---

# The sentence that cannot be either

*This sentence is not true.*

If it is true, then what it says holds, so it is not true. If it is not true, then what it says holds, so it is true. Eubulides of Miletus was playing with this in the fourth century BCE, and for two thousand years it looked like a parlour trick.

It is not a trick. Take three assumptions that every ordinary account of truth makes: sentences can refer to themselves, every sentence is either true or not, and "S is true" holds exactly when S. The liar shows these three cannot all stand together. So the damage is not to one odd sentence; it is to the concept of truth as a predicate of a language that can talk about itself.

The repairs are all painful. Ban self-reference, and you lose harmless and useful sentences. Ban the middle, and you must explain what the liar is instead. Keep everything and accept that some sentences are both true and false — which is what dialetheists like Graham Priest actually propose.

Here is the sharpest version, where the paradox becomes a theorem.

## Rigor

Fix a theory $T$ in a language $L$, strong enough to represent its own syntax (arithmetic suffices, via Gödel numbering, with $\ulcorner S \urcorner$ the code of $S$).

**Diagonal lemma.** For any formula $\varphi(x)$ of $L$ with one free variable, there is a sentence $S$ with
$$T \vdash S \leftrightarrow \varphi(\ulcorner S \urcorner).$$

**Tarski's undefinability theorem (1933).** There is no formula $\mathrm{True}(x)$ of $L$ such that $T \vdash \mathrm{True}(\ulcorner S\urcorner) \leftrightarrow S$ for every sentence $S$, unless $T$ is inconsistent.

*Proof sketch.* Suppose such a $\mathrm{True}$ exists. Apply the diagonal lemma to $\neg\mathrm{True}(x)$ to get $L^{*}$ with $T \vdash L^{*} \leftrightarrow \neg \mathrm{True}(\ulcorner L^{*}\urcorner)$. Combine with the truth schema for $L^{*}$ and you derive $L^{*} \leftrightarrow \neg L^{*}$.

That is the liar, promoted from a puzzle to a proof: truth for $L$ is not definable inside $L$. Tarski's own response is a hierarchy — define truth for $L$ in a stronger metalanguage, then truth for that in a stronger one still. Saul Kripke's 1975 alternative builds truth as a least fixed point of a monotone operator, leaving the liar simply ungrounded: it never receives a value at any stage. Neither is free. The hierarchy cannot express "everything Jones says is false"; the fixed point cannot express "the liar is ungrounded" without a new liar appearing one level up.

## Recall
type: mcq
Q: What does Tarski's undefinability theorem show about the liar?
- [ ] That self-referential sentences are meaningless — Tarski proves a limit on definability, not a theory of meaning.
- [x] That a sufficiently strong consistent language cannot contain its own truth predicate — so the liar is a theorem about expressive limits.
- [ ] That arithmetic is inconsistent — the theorem is conditional on consistency and gives no reason to doubt it.
