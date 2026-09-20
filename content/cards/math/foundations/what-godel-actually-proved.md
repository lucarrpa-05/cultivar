---
id: math.foundations.godel.what-godel-actually-proved
topic: math.foundations.godel
format: idea
difficulty: 4
language: en
weight: heavy
angles: [paradox, beautiful, history]
tags: [incompleteness, consistency, self-reference, diagonal-lemma, peano-arithmetic]
hook: "He let it drop in a closing discussion, almost in passing, and the room moved on. Von Neumann did not."
sources:
  - {title: "Gödel's incompleteness theorems", type: wiki, url: "https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems"}
  - {title: "Kurt Gödel", type: encyclopedia, url: "https://plato.stanford.edu/entries/goedel/"}
  - {title: "Kurt Gödel", type: wiki, url: "https://en.wikipedia.org/wiki/Kurt_G%C3%B6del"}
dates: {written: 2026-09-19, event: 1930-09-07}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The Königsberg remark came in the closing discussion of 7 Sept 1930, not at the end of his own talk. Second theorem now states its content and that it needs more than Q."}
---

# What Gödel actually proved

At a conference in Königsberg in September 1930, a 24-year-old who had spoken the day before on a different theorem remarked, during the closing discussion, that arithmetic contains true statements it cannot prove. The room moved on. Von Neumann did not: within weeks he had worked out a corollary and wrote to Gödel about it, only to be told Gödel had it already.

The engine is a sentence that says, in the language of arithmetic itself, *I am not provable here*. If your system proves it, the system proves a falsehood. If your system refutes it, the system proves something false too. A consistent system can do neither.

That is the whole idea, and almost every popular version of it overreaches. Gödel did not show that some truths are forever unknowable, that no system is trustworthy, or that minds beat machines. He showed something sharper and more limited, and the limits are in the hypotheses.

## Rigor

**First theorem.** Let $T$ be a consistent, effectively axiomatised theory (its axioms are recognisable by an algorithm) that interprets a modest fragment of arithmetic — Robinson arithmetic $Q$ is enough. Then there is a sentence $G_T$ with $T\nvdash G_T$ and $T\nvdash\neg G_T$. (Gödel's 1931 version assumed $\omega$-consistency; Rosser's 1936 trick brings it down to plain consistency.)

**How $G_T$ is built.** Code formulas as numbers. Then "$x$ is the code of a $T$-proof of the formula coded by $y$" is a decidable relation, so it is expressible: write $\mathrm{Prov}_T(y)$ for $\exists x\,\mathrm{Prf}_T(x,y)$. The diagonal lemma gives, for any formula $\varphi(y)$, a sentence $\sigma$ with
$$T\vdash \sigma \leftrightarrow \varphi(\ulcorner\sigma\urcorner).$$
Apply it to $\neg\mathrm{Prov}_T$: the result is a sentence asserting its own unprovability. That is the "I am not provable here" of the intuition, made syntactic.

**Second theorem.** A consistent $T$ cannot prove its own consistency: $T\nvdash \mathrm{Con}(T)$, where $\mathrm{Con}(T):=\neg\mathrm{Prov}_T(\ulcorner 0=1\urcorner)$. This one wants more arithmetic than $Q$ — enough to verify the Hilbert–Bernays–Löb derivability conditions, so PA suffices. The first proof is then formalisable inside $T$, giving $T\vdash \mathrm{Con}(T)\to G_T$; if $T$ proved $\mathrm{Con}(T)$ it would prove $G_T$.

**What escapes.** Theories that do not interpret enough arithmetic can be complete and decidable: Presburger arithmetic, the theory of real closed fields, Euclidean geometry.

## Recall
type: mcq
Q: Which hypothesis can you drop and still get incompleteness?
- [x] None of the three — consistency, effective axiomatisation and enough arithmetic are all load-bearing; Presburger arithmetic is complete precisely because it lacks the third.
- [ ] Effective axiomatisation — take the set of all true arithmetic sentences as axioms: complete, consistent, and no algorithm can list it.
- [ ] Consistency — an inconsistent theory proves everything, including $G_T$, so it is trivially complete.
- [ ] Enough arithmetic — without it you cannot code proofs as numbers, and the diagonal lemma has nothing to bite on.
