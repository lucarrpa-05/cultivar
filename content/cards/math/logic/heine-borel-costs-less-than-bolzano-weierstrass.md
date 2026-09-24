---
id: math.logic.proof-theory.heine-borel-costs-less-than-bolzano-weierstrass
topic: math.logic.proof-theory
topics: [math.topology.compactness, math.analysis.metric-spaces, math.foundations.computability]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [connection, paradox]
tags: [reverse-mathematics, heine-borel, bolzano-weierstrass, weak-konigs-lemma, second-order-arithmetic, computability]
prerequisites: [math.topology.compactness, math.analysis.metric-spaces]
hook: "In a metric space the two compactness theorems are equivalent. Ask what each one costs in axioms, and they come apart."
related: [math.topology.compactness.two-meanings-of-compact, math.topology.compactness.finitely-many-checks]
sources:
  - {title: "From foundations to applications: reverse mathematics and philosophy", author: "Benedict Eastaugh", year: 2026, type: paper, url: "https://arxiv.org/abs/2609.25183"}
  - {title: "Reverse Mathematics", type: encyclopedia, url: "https://plato.stanford.edu/entries/reverse-mathematics/"}
dates: {written: 2026-09-23}
author: author-news-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "Eastaugh's essay (arXiv 2609.25183, v1 21 Sep 2026) exists; reworded his 'lesson' to match what it says ('reversals show which set existence principles are needed'). 'Smallest model' made precise as minimum ω-model. The HB/WKL and BW/ACA equivalences, Kleene tree, singular cover and the low-model separation checked against SEP."}
---

# Heine–Borel costs less than Bolzano–Weierstrass

In a metric space, "every open cover has a finite subcover" and "every sequence has a convergent subsequence" describe the same spaces. Reverse mathematics asks a different question: what is the least you must assume to prove each one? Start from a weak base where only computable sets are guaranteed to exist. Heine–Borel for [0, 1] then needs one extra axiom about infinite binary trees. Bolzano–Weierstrass needs strictly more: the power to form any set defined by a formula about numbers.

Picture two travellers who reach the same city on different fares. Benedict Eastaugh's new essay makes this the field's lesson: a reversal shows which set-existence principles a theorem needs.

Here is the fare table.

## Rigor

The fares are subsystems of second-order arithmetic. The base theory $\mathsf{RCA}_0$ has comprehension only for computable ($\Delta^0_1$) sets plus $\Sigma^0_1$ induction; its minimum $\omega$-model, REC, contains exactly the computable sets.

- $\mathsf{WKL}_0 = \mathsf{RCA}_0$ + **weak König's lemma**: every infinite tree $T \subseteq 2^{<\mathbb N}$ has an infinite path.
- $\mathsf{ACA}_0 = \mathsf{RCA}_0$ + comprehension for every arithmetical formula.

**Equivalences over $\mathsf{RCA}_0$.** Heine–Borel for countable open covers of $[0,1]$ $\iff$ WKL. Bolzano–Weierstrass $\iff$ ACA, as do the monotone convergence theorem and König's lemma for finitely branching trees.

**Why Heine–Borel is not free.** Kleene built a computable infinite binary tree with no computable path, so WKL fails in REC. Its analytic twin is a *singular cover*: a computable sequence of open intervals that covers every computable real in $[0,1]$ yet has total length $<1$. In REC it covers the whole interval, but no finitely many of its intervals can. The "finitely many checks" breaks when only computable points exist.

**Why it is strictly cheaper.** Some computable finitely branching trees have only paths that compute the halting set $K$, so every $\omega$-model of $\mathsf{ACA}_0$ contains $K$. Some $\omega$-models of $\mathsf{WKL}_0$ do not. So $\mathsf{WKL}_0$ proves Heine–Borel but not Bolzano–Weierstrass.

So the textbook step from "compact" to "sequentially compact" cannot be carried out on the cheaper fare: $\mathsf{WKL}_0$ proves the hypothesis but not the conclusion.

## Recall
type: mcq
Q: Over the weak base theory RCA₀, how do Heine–Borel for [0, 1] and Bolzano–Weierstrass compare?
- [x] Heine–Borel is equivalent to weak König's lemma; Bolzano–Weierstrass needs the strictly stronger arithmetical comprehension — same spaces in metric topology, different fares in axioms.
- [ ] Both are equivalent to weak König's lemma — true for Heine–Borel only; Bolzano–Weierstrass sits a level higher, alongside König's lemma for finitely branching trees.
- [ ] Both are provable in RCA₀ alone — Kleene's tree and the singular cover show Heine–Borel already fails when only computable sets exist.
