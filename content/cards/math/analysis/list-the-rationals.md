---
id: math.analysis.sequences-limits.list-the-rationals
topic: math.analysis.sequences-limits
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, paradox]
tags: [subsequential-limits, enumeration, rationals, density, construction]
hook: "You asked for the answer and the method. The sequence is a list of fractions, and the method is three steps you can redo on paper."
answersQuestion: q-2026-09-20-i20i
related: [math.analysis.sequences-limits.every-number-is-a-limit]
sources:
  - {title: "Subsequential limit", type: wiki, url: "https://en.wikipedia.org/wiki/Subsequential_limit"}
  - {title: "Countable set (the rationals are countable)", type: wiki, url: "https://en.wikipedia.org/wiki/Countable_set"}
  - {title: "Dense set", type: wiki, url: "https://en.wikipedia.org/wiki/Dense_set"}
dates: {written: 2026-09-23}
author: author-math-1
reviewed: {by: reviewer-math-2026-09-23, at: 2026-09-23, verdict: approved, notes: "title said every real number but the list only covers [0,1]; narrowed it. Construction, lemma and closed-set recipe checked line by line."}
---

# Yes: list the fractions, and every number in [0,1] becomes a limit

Yes, such a sequence exists: write every fraction in $[0,1]$ in one list. Here is how to build it and use it yourself.

**Step 1.** List by denominator: $0, 1, \tfrac12, \tfrac13, \tfrac23, \tfrac14, \tfrac34, \tfrac15,\dots$ Every fraction lands at some finite position.

**Step 2.** Pick any target $x$ in $[0,1]$, say $1/\sqrt2$.

**Step 3.** Walk down the list. Grab a term within $1$ of $x$, then a *later* term within $\tfrac12$, then a later one within $\tfrac13$, and so on. You never get stuck: every window around $x$ holds infinitely many fractions, and only finitely many sit behind you.

The grabbed terms converge to $x$. Here is the same walk with the quantifiers written in.

## Rigor

**Claim.** Let $(q_n)$ enumerate $\mathbb{Q}\cap[0,1]$. The set of subsequential limits of $(q_n)$ is exactly $[0,1]$.

**Lemma.** $x$ is a subsequential limit of $(a_n)$ iff for every $\varepsilon>0$ the index set $\{n: |a_n-x|<\varepsilon\}$ is infinite.

($\Leftarrow$ is Step 3.) Choose $n_1$ with $|a_{n_1}-x|<1$. Given $n_k$, the set $\{n:|a_n-x|<\tfrac1{k+1}\}$ is infinite, so it contains some $n_{k+1}>n_k$. Then $|a_{n_k}-x|<\tfrac1k\to0$. ($\Rightarrow$: a convergent subsequence puts infinitely many indices in every window.)

**Every $x\in[0,1]$ qualifies.** For $\varepsilon>0$, the set $(x-\varepsilon,x+\varepsilon)\cap[0,1]$ is an interval of positive length, so it contains infinitely many rationals (density), and each sits at a different index.

**Nothing else qualifies.** If $x\notin[0,1]$, then $d=\operatorname{dist}(x,[0,1])>0$ and no term is within $d$ of $x$.

**The general recipe.** For any nonempty closed $F\subseteq\mathbb{R}$, list a countable dense subset of $F$, repeating each element infinitely often. The subsequential limits are exactly $F$. Closed is forced: the set of subsequential limits of any sequence is closed.

## Recall
type: reveal
Q: Build a sequence whose subsequential limits are exactly $[0,1]\cup\{5\}$.
A: Interleave two lists: odd positions run through the fractions in $[0,1]$, even positions are all $5$. Each half contributes its own limits, and any convergent subsequence has infinitely many terms from one half, so nothing else appears.
