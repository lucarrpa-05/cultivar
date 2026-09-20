---
id: ai.ml-basics.dimensionality-reduction.pca-is-the-svd
topic: ai.ml-basics.dimensionality-reduction
format: callback
difficulty: 3
language: en
weight: heavy
angles: [connection, beautiful]
tags: [pca, svd, eckart-young, variance-explained, centring]
callback: {from: math.linear-algebra.svd, to: ai.ml-basics.dimensionality-reduction}
hook: "You already proved the theorem. PCA is what it looks like when the matrix happens to be a data table."
sources:
  - {title: "Principal component analysis", type: wiki, url: "https://en.wikipedia.org/wiki/Principal_component_analysis"}
  - {title: "Singular value decomposition", type: wiki, url: "https://en.wikipedia.org/wiki/Singular_value_decomposition"}
  - {title: "Low-rank approximation", type: wiki, url: "https://en.wikipedia.org/wiki/Low-rank_approximation"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember the SVD? PCA is the SVD wearing a lab coat

Remember the singular value decomposition: every matrix factors as $U\Sigma V^{\top}$ — orthonormal directions in, orthonormal directions out, and a list of non-negative numbers saying how much each direction gets stretched. And you proved that the best rank-$k$ approximation is the one keeping the $k$ largest of them.

Principal component analysis is that theorem, applied to a table whose rows are people and whose columns are measurements. Subtract each column's mean so the cloud sits on the origin, then take the SVD. The right singular vectors are the directions along which the cloud is most spread out. The squared singular values say how much spread lies along each. Truncating to the top $k$ is the best $k$-dimensional summary there is, in the least-squares sense — which is the theorem you already have, verbatim.

Nothing new is happening here. Only the interpretation of the matrix changed.

Here is the dictionary between the two vocabularies.

## Rigor

Let $X\in\mathbb R^{n\times p}$ have zero column means and write $X=U\Sigma V^{\top}$ with $\Sigma=\operatorname{diag}(s_1\ge\cdots\ge s_r>0)$. The sample covariance is

$$C=\frac{1}{n-1}X^{\top}X=\frac{1}{n-1}V\Sigma^{2}V^{\top},$$

so the eigenvectors of $C$ *are* the right singular vectors and its eigenvalues are $s_j^{2}/(n-1)$. The dictionary: principal direction $j$ is $v_j$; the $j$-th score vector is $Xv_j=s_ju_j$; the variance explained by component $j$ is $s_j^{2}/\sum_i s_i^{2}$.

Optimality is Eckart–Young, unchanged: among all $B$ with $\operatorname{rank}(B)\le k$,

$$\min_{B}\ \|X-B\|_F^{2}=\sum_{j>k}s_j^{2},$$

attained at $B=U_k\Sigma_kV_k^{\top}$. Projecting onto the top $k$ principal directions is not *a* good summary; it is the minimiser.

Two things the lab coat hides. Centring is not optional — skip it and the first component points at the cloud's mean instead of its spread. And units matter: measure one column in metres and another in millimetres and the millimetre column swamps every singular value, which makes standardising columns a modelling decision rather than housekeeping.

## Recall
type: mcq
Q: In the SVD $X=U\Sigma V^{\top}$ of a centred data matrix, which part gives the principal directions?
- [x] The right singular vectors, the columns of $V$ — they are the eigenvectors of $X^{\top}X$, hence of the covariance matrix.
- [ ] The left singular vectors, the columns of $U$ — those give the scores, the coordinates of each data point along the directions.
- [ ] The singular values in $\Sigma$ — those are magnitudes; squared, they give the variance along each direction, not the direction itself.
