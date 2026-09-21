---
id: math.history.rigor-19th-century.what-is-a-real-number-anyway
topic: math.history.rigor-19th-century
topics: [math.analysis.sequences-limits]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [history, beautiful, tool]
tags: [dedekind-cut, completeness, "1872", arithmetisation, irrational-numbers]
hook: "Dedekind turned a missing point among the rationals into a definition of a number."
diagram: {file: math/dedekind-cut.svg, caption: "Split the rationals at the place where the square of a positive number reaches 2. Neither side has an endpoint there; the cut defines the number.", alt: "Rational points split at the missing positive square root of 2, with the lower and upper sets on opposite sides"}
sources:
  - {title: "Dedekind cut", type: wiki, url: "https://en.wikipedia.org/wiki/Dedekind_cut"}
  - {title: "Construction of the real numbers", type: wiki, url: "https://en.wikipedia.org/wiki/Construction_of_the_real_numbers"}
  - {title: "Richard Dedekind biography", type: encyclopedia, url: "https://mathshistory.st-andrews.ac.uk/Biographies/Dedekind/"}
dates: {written: 2026-09-20, event: 1872-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-history-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Removed claim that nobody had defined reals or that Cauchy could prove nothing; clarified that Dedekind supplied one construction."}
---

# A missing point became a number

Calculus relied on the real line having no gaps, but nineteenth-century mathematicians wanted that claim grounded in arithmetic rather than a picture. While teaching in 1858, Dedekind found a startling way to do it; he published it in 1872.

Take every rational number and divide them into a lower group and an upper group. A cut at a rational can be marked by that rational. But a cut at the place we call the square root of 2 has no rational marker. Dedekind's move was to treat the cut itself as a number. Cantor published another construction that year, using convergent sequences. The two approaches made the line's apparent lack of gaps into something mathematicians could prove.

## Rigor

**Definition.** A *cut* is a pair $(A,B)$ partitioning $\mathbb{Q}$ with every $a\in A$ less than every $b\in B$ and $A$ having no greatest element. Define $\mathbb{R}$ to be the set of cuts, ordered by inclusion of the lower set. Each rational $q$ gives the cut $A=\{x: x<q\}$, embedding $\mathbb{Q}$.

**Completeness falls out.** Let $S$ be a non-empty set of cuts bounded above. Put $A^{*}=\bigcup_{\alpha\in S}A_{\alpha}$ and $B^{*}=\mathbb{Q}\setminus A^{*}$. One checks $(A^{*},B^{*})$ is a cut, that it dominates every element of $S$, and that any upper bound contains $A^{*}$. So $\sup S$ exists. The least-upper-bound property is not an axiom here; it is a one-line consequence of building the numbers this way.

**$\sqrt{2}$, concretely.** $A=\{x\in\mathbb{Q}: x\le 0 \text{ or } x^{2}<2\}$. Given $a\in A$ with $a>0$, the rational $a'=\frac{2a+2}{a+2}$ satisfies $a'>a$ and $a'^{2}<2$, so $A$ has no maximum; symmetrically $B$ has no minimum. The cut is genuinely irrational.

**Why 1872 matters.** Once $\mathbb{R}$ is constructed from $\mathbb{Q}$, and $\mathbb{Q}$ from $\mathbb{Z}$, analysis no longer appeals to geometry anywhere. That programme is what the century called the arithmetisation of analysis — and its final step is what forced set theory into existence.

## Recall
type: mcq
Q: What does the Dedekind construction actually buy you?
- [x] The least-upper-bound property as a theorem rather than an assumption — sups are built by taking unions of lower sets.
- [ ] A way to write every real number as a decimal — decimals already existed; what was missing was a definition of what they name.
- [ ] A proof that $\sqrt{2}$ is irrational — that was known to the Greeks; the issue was whether $\sqrt{2}$ denotes anything.
- [ ] A smaller set of axioms for arithmetic — the construction adds machinery; what it removes is the appeal to geometric intuition.
