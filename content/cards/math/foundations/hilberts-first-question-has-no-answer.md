---
id: math.foundations.axiomatics-zfc.hilberts-first-question-has-no-answer
topic: math.foundations.axiomatics-zfc
topics: [math.foundations.cardinality]
format: idea
difficulty: 5
language: en
weight: heavy
angles: [open-problem, paradox, history]
tags: [continuum-hypothesis, forcing, independence, constructible-universe]
hook: "Hilbert put it first on his list in 1900. The answer, delivered in two halves, is that the axioms decline to answer."
related: [math.foundations.cardinality.there-is-no-last-infinity]
sources:
  - {title: "Continuum hypothesis", type: wiki, url: "https://en.wikipedia.org/wiki/Continuum_hypothesis"}
  - {title: "The Continuum Hypothesis", type: encyclopedia, url: "https://plato.stanford.edu/entries/continuum-hypothesis/"}
  - {title: "Forcing (mathematics)", type: wiki, url: "https://en.wikipedia.org/wiki/Forcing_(mathematics)"}
dates: {written: 2026-09-19, event: 1963-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Difficulty 4→5: the rigor runs countable transitive models, ccc forcing and generic filters — the style guide's own example of level 5."}
---

# The first question on Hilbert's list has no answer

Is there a set of reals too big to be listed and too small to match all of $\mathbb{R}$? Cantor said no and could not prove it. Hilbert made it problem number one in Paris in 1900.

The answer arrived in two halves, thirty years apart, and neither half is a yes or a no.

Gödel, in 1940, built a minimal universe of sets — only the ones the axioms force you to admit — and showed the hypothesis holds there. So ZFC cannot refute it. Cohen, in 1963, invented a way to *add* sets to a model without breaking any axiom, and stuffed in so many reals that they overshoot $\aleph_1$. So ZFC cannot prove it either. He got the Fields Medal for it in 1966, and forcing became the standard tool of the subject.

This is not ignorance. It is a demonstration that the question, as asked, has no answer in the system where it was asked.

## Rigor

**CH.** $2^{\aleph_0}=\aleph_1$; equivalently, every infinite $S\subseteq\mathbb{R}$ has $|S|=\aleph_0$ or $|S|=2^{\aleph_0}$.

**Gödel, 1938–40.** The constructible universe $L$ is defined by transfinite recursion: $L_0=\varnothing$, $L_{\alpha+1}=\mathrm{Def}(L_\alpha)$, the subsets of $L_\alpha$ definable with parameters over it, with unions at limit stages. Then $L\models\mathrm{ZFC}+\mathrm{GCH}$, so $\mathrm{Con}(\mathrm{ZF})\Rightarrow\mathrm{Con}(\mathrm{ZFC}+\mathrm{CH})$.

**Cohen, 1963.** Start from a countable transitive model $M$ of ZFC. Take the poset of finite partial functions $\aleph_2^{M}\times\omega\to 2$, pick a filter $G$ generic over $M$, and form the smallest model $M[G]$ containing both. The forcing has the countable chain condition, so cardinals are preserved, and $G$ codes $\aleph_2^{M}$ distinct reals. Hence $M[G]\models\mathrm{ZFC}+\neg\mathrm{CH}$.

**Together.** CH is independent of ZFC. The tower of infinities is real; where $|\mathbb{R}|$ sits on it is not fixed by the axioms. Whether some further axiom should settle it — large cardinals, determinacy, Woodin's programme — is live research and genuinely contested.

## Recall
type: reveal
Q: What did Gödel and Cohen each contribute to the continuum hypothesis?
A: Gödel (1940) showed ZFC cannot refute CH, by exhibiting the constructible universe $L$, a model of ZFC in which CH holds. Cohen (1963) showed ZFC cannot prove CH, by inventing forcing and building a model with $\aleph_2$ reals. Together: CH is independent of ZFC.
