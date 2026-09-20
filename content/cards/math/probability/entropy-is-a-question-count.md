---
id: math.probability.information-entropy.entropy-is-a-question-count
topic: math.probability.information-entropy
format: idea
difficulty: 3
language: en
weight: heavy
angles: [tool, beautiful, connection]
tags: [shannon, entropy, source-coding, huffman, bits]
hook: "Entropy is not disorder. It is the average number of yes/no questions you cannot avoid asking."
sources:
  - {title: "A Mathematical Theory of Communication", author: "Claude Shannon", year: 1948, type: paper, url: "https://doi.org/10.1002/j.1538-7305.1948.tb01338.x"}
  - {title: "Entropy (information theory)", type: wiki, url: "https://en.wikipedia.org/wiki/Entropy_(information_theory)"}
  - {title: "Shannon's source coding theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Shannon%27s_source_coding_theorem"}
dates: {written: 2026-09-19, event: 1948-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Entropy is a question count

I pick a number from 1 to 8 at random and you must find it with yes/no questions. Halve the range each time: three questions, always. Eight outcomes, three bits.

Now I rig the draw. Half the time I pick 1, a quarter of the time 2, and the rest is split between 3 and 4. Your old strategy still costs you two questions on average, but a better one exists: ask "is it 1?" first. Half the time you are done in one. The average drops to 1.75 questions.

That 1.75 is the entropy of the distribution, and it is not a strategy-dependent number. It is a floor. No cleverer set of questions gets below it, and some set of questions gets arbitrarily close.

This is what entropy measures: not disorder, not chaos, but *how much you have to be told*. A predictable source is cheap to describe. A fair coin costs a full bit per flip and cannot be compressed at all.

## Rigor

**Definition.** For a discrete $X$ with $P(X=x)=p(x)$,
$$H(X)=-\sum_{x}p(x)\log_2 p(x)\quad\text{bits}.$$
Uniform on $n$ outcomes gives $\log_2 n$; a point mass gives 0; and $H$ is maximised by the uniform distribution, by Jensen.

**Source coding theorem (Shannon, 1948).** Any uniquely decodable binary code for $X$ has expected length $L\ge H(X)$, and some prefix code has $L<H(X)+1$. Encoding blocks of $n$ symbols drives the per-symbol cost to $H(X)$.

*Lower bound in one line.* Kraft's inequality gives $\sum 2^{-\ell(x)}\le1$; then
$$L-H=\sum_x p(x)\log_2\frac{p(x)}{2^{-\ell(x)}}\ \ge\ 0$$
since it is a Kullback–Leibler divergence (up to the Kraft slack), and KL divergence is non-negative by Jensen.

**The rigged draw.** $p=(\tfrac12,\tfrac14,\tfrac18,\tfrac18)$ gives
$$H=\tfrac12(1)+\tfrac14(2)+\tfrac18(3)+\tfrac18(3)=1.75\ \text{bits},$$
and the code $0,\,10,\,110,\,111$ has expected length exactly $1.75$. The question sequence from the intuition *is* that code: each question is one bit, and an optimal question tree is an optimal prefix code. Huffman's algorithm builds it.

## Recall
type: mcq
Q: A source emits one of 4 symbols with probabilities $\tfrac12,\tfrac14,\tfrac18,\tfrac18$. What is the best possible average bits per symbol?
- [x] 1.75 — that is the entropy, and the code $0,10,110,111$ attains it exactly.
- [ ] 2 — that is $\log_2 4$, the cost of a fixed-length code that ignores the skew.
- [ ] 1 — below the entropy; no uniquely decodable code can go there.
- [ ] 4 — the number of symbols is not a cost in bits.
