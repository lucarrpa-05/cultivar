---
id: math.linear-algebra.tensors-multilinear.seven-multiplications-not-eight
topic: math.linear-algebra.tensors-multilinear
format: fact
difficulty: 3
language: en
weight: light
angles: [numbers, practical]
tags: [strassen, tensor-rank, matrix-multiplication, complexity, bilinear-maps]
hook: "Matrix multiplication is a tensor, and the fewest multiplications you need is that tensor's rank."
sources:
  - {title: "Strassen algorithm", type: wiki, url: "https://en.wikipedia.org/wiki/Strassen_algorithm"}
  - {title: "Tensor rank decomposition", type: wiki, url: "https://en.wikipedia.org/wiki/Tensor_rank_decomposition"}
dates: {written: 2026-09-19, event: 1969-01-01}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Multiplying two 2x2 matrices takes seven multiplications, not eight

The obvious method uses eight. In 1969 Volker Strassen published a way to do it with seven, under the title "Gaussian elimination is not optimal", and recursion turns that one saved multiplication into an exponent: $n^{\log_2 7}\approx n^{2.807}$ instead of $n^{3}$. The reason the answer is a whole number at all is multilinear algebra. Matrix multiplication is a bilinear map, hence a tensor, and the fewest multiplications any algorithm needs is that tensor's rank.
