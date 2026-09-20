---
id: ai.llm.attention.the-dot-product-that-is-not-symmetric
topic: ai.llm.attention
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [inner-product, bilinear-form, attention, asymmetry, gram-matrix]
callback: {from: math.linear-algebra.inner-products, to: ai.llm.attention}
prerequisites: [math.linear-algebra.inner-products, ai.neural-nets.embeddings]
hook: "An inner product is symmetric by axiom. Attention uses one that is not — and the asymmetry is the whole point."
sources:
  - {title: "Attention Is All You Need", author: "Ashish Vaswani et al.", year: 2017, type: paper, url: "https://arxiv.org/abs/1706.03762"}
  - {title: "Bilinear form", type: wiki, url: "https://en.wikipedia.org/wiki/Bilinear_form"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember inner products? Attention drops the symmetry axiom

You learned $\langle u,v\rangle$ as three axioms: bilinear, symmetric, positive definite. The symmetry felt free. In attention it is the one axiom that had to go.

Here is why. If "how much does token $i$ want token $j$" were a genuine inner product, it would equal "how much does $j$ want $i$". But a pronoun needs its antecedent far more than the antecedent needs the pronoun. Language is full of one-way dependencies, and a symmetric score cannot represent one.

So attention keeps the bilinearity and drops the rest: each token is projected twice, once as a *query* and once as a *key*, by two different learned matrices, and the score is the ordinary dot product of the two projections. Same machinery, two different copies of the vector.

You already know the object this produces. It is a Gram matrix — except built from two different sets of vectors, so it is not even square-symmetric. Softmax each row and you have the averaging weights from the attention card.

## Rigor

Let $x_i, x_j \in \mathbb{R}^{d}$ be two token vectors and $W_Q, W_K \in \mathbb{R}^{d \times d_k}$. The score is

$$s(i,j) = \frac{\langle W_Q^{\top}x_i,\; W_K^{\top}x_j\rangle}{\sqrt{d_k}} = \frac{x_i^{\top} \big(W_Q W_K^{\top}\big) x_j}{\sqrt{d_k}}.$$

So $s$ is the bilinear form with matrix $M = W_Q W_K^{\top} \in \mathbb{R}^{d \times d}$, and $s(i,j) = s(j,i)$ for all inputs exactly when $M = M^{\top}$. Nothing in training asks for that, and trained models do not deliver it.

Two structural consequences. First, $\operatorname{rank}(M) \le d_k$, and typically $d_k = d/h \ll d$ (64 against 512 in the 2017 model): the form is deeply degenerate, and only a $d_k$-dimensional slice of each vector participates. Second, decompose $M = \tfrac12(M+M^{\top}) + \tfrac12(M-M^{\top})$. The symmetric part scores mutual similarity — the inner product you know. The skew part contributes $x_i^{\top}Ax_j = -x_j^{\top}Ax_i$: a pure direction of flow, positive one way and negative the other. That antisymmetric piece is where "points back to" lives, and a real inner product has none of it.

## Recall
type: mcq
Q: Attention scores $x_i^{\top}(W_QW_K^{\top})x_j$. What breaks if you force $W_Q = W_K$?
- [ ] Nothing — the softmax would fix it — softmax is applied row-wise and cannot undo a symmetry in the score matrix.
- [x] The score becomes symmetric and positive semidefinite, so "$i$ needs $j$" and "$j$ needs $i$" can no longer differ. — directed relations like pronoun-to-antecedent become inexpressible.
- [ ] The matrix becomes full rank and the model gets stronger — the rank is still capped by $d_k$; it is the symmetry, not the rank, that changes.
