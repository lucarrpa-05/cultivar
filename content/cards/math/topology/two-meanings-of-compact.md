---
id: math.topology.compactness.two-meanings-of-compact
topic: math.topology.compactness
topics: [math.analysis.sequences-limits]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [mistake, connection]
tags: [sequential-compactness, limit-point-compact, bolzano-weierstrass, metrizable]
hook: "Analysis and topology teach two different definitions of compact and never mention it, because in metric spaces they agree."
sources:
  - {title: "Sequentially compact space", type: wiki, url: "https://en.wikipedia.org/wiki/Sequentially_compact_space"}
  - {title: "Compact space", type: wiki, url: "https://en.wikipedia.org/wiki/Compact_space"}
  - {title: "Topology, 2nd ed., §28", author: "James Munkres", year: 2000, type: book, url: "https://en.wikipedia.org/wiki/James_Munkres"}
dates: {written: 2026-09-19}
author: author-math-topology-1
reviewed: {by: reviewer-math-topology-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Two meanings of compact that stopped agreeing

You met compactness twice and nobody told you. In analysis it is Bolzano–Weierstrass: every sequence has a convergent subsequence. In topology it is covers: every open cover has a finite subcover. One is about sequences, the other about coverings, and there is no obvious reason they should describe the same spaces.

In metric spaces they do, exactly, which is why the switch passes unnoticed. Outside metric spaces they come apart in both directions, and the examples are not pathological curiosities — they are the spaces you meet as soon as you take an infinite product or an uncountable ordinal.

The moral is worth carrying: "every sequence has a convergent subsequence" is not the definition of compactness, it is a theorem about metric spaces. Sequences are a countable tool, and a general space can be too wide for countably many steps to explore.

## Rigor

**In metric spaces** the three conditions — compact, limit point compact, sequentially compact — are equivalent (Munkres §28). Compact $\Rightarrow$ limit point compact holds in general; the converses use a countable local basis.

**Compact but not sequentially compact.** $X=[0,1]^{[0,1]}$ with the product topology is compact by Tychonoff. Let $f_n(x)$ be the $n$th digit of the binary expansion of $x$. Any subsequence $f_{n_k}$ fails to converge: pick $x$ whose $n_k$th digit is $0$ for even $k$ and $1$ for odd $k$; then $f_{n_k}(x)$ oscillates, and convergence in a product is coordinatewise.

**Sequentially compact but not compact.** The ordinal space $[0,\omega_1)$ with the order topology. Any sequence has a countable supremum $\alpha<\omega_1$, so it lives in the compact $[0,\alpha]$ and has a convergent subsequence. But the cover $\{[0,\alpha) : \alpha<\omega_1\}$ has no finite subcover, since a finite union of them is bounded.

Both counterexamples share a cause: neither space is metrizable, and sequences cannot see far enough in either.

## Recall
type: mcq
Q: "Every sequence has a convergent subsequence" — what is that, exactly?
- [x] A theorem about metric spaces, not the definition of compactness — outside metric spaces it is neither implied by nor equivalent to the open cover condition.
- [ ] The definition of compactness in any topological space — the definition is the finite subcover one; the sequence version is strictly a metric-space fact.
- [ ] Equivalent to compactness whenever the space is Hausdorff — $[0,1]^{[0,1]}$ is compact Hausdorff and not sequentially compact.
