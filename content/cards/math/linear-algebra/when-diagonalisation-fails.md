---
id: math.linear-algebra.jordan-form.when-diagonalisation-fails
topic: math.linear-algebra.jordan-form
format: callback
difficulty: 3
language: en
weight: medium
angles: [tool, connection]
tags: [jordan-form, eigenvectors, generalised-eigenvectors, nilpotent, resonance]
hook: "Not every matrix has enough eigenvectors. The 1s just off the diagonal are not a blemish — they are the missing information."
callback: {from: math.linear-algebra.eigen, to: math.linear-algebra.jordan-form}
sources:
  - {title: "Jordan normal form", type: wiki, url: "https://en.wikipedia.org/wiki/Jordan_normal_form"}
  - {title: "Generalized eigenvector", type: wiki, url: "https://en.wikipedia.org/wiki/Generalized_eigenvector"}
dates: {written: 2026-09-19}
author: author-math-algebra-1
reviewed: {by: reviewer-math-algebra-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember diagonalising? Here is what happens when it fails

Remember the promise of eigenvectors: find enough of them, change basis, and your matrix becomes diagonal — powers, exponentials and long-run behaviour all turn trivial. The promise has a hole in it, and the smallest example is two by two.

The matrix with 1s on the diagonal and a single 1 above it has one eigenvalue, 1, and only a one-dimensional eigenspace. There is no basis of eigenvectors. Diagonalisation is simply not available, and no cleverness recovers it.

Jordan's answer is to ask for the next best thing and prove you can always get it. Every complex square matrix is similar to a block-diagonal matrix whose blocks carry one eigenvalue down the diagonal and 1s directly above. Diagonal where you are lucky, one step off where you are not.

Those extra 1s are information, not damage. A block of size $k$ says there is a vector that needs $k$ applications of $A-\lambda I$ before it dies. That is exactly why a repeated eigenvalue in a differential equation produces $te^{\lambda t}$ and not only $e^{\lambda t}$.

## Rigor

For $A\in M_n(\mathbb{C})$ and an eigenvalue $\lambda$, the **generalised eigenspace** is $\ker(A-\lambda I)^{n}$. These spaces decompose $\mathbb{C}^n$, and on each one $N=A-\lambda I$ is nilpotent. Choosing a basis adapted to the chain $\ker N\subset\ker N^2\subset\cdots$ puts $N$ into blocks
$$J_k(0)=\begin{pmatrix}0&1&&\\&0&\ddots&\\&&\ddots&1\\&&&0\end{pmatrix},$$
so $A$ becomes a direct sum of $J_k(\lambda)=\lambda I+J_k(0)$, unique up to the order of the blocks.

Reading the blocks off: the number of blocks with eigenvalue $\lambda$ is $\dim\ker(A-\lambda I)$, the geometric multiplicity; the *largest* block is the exponent of $(x-\lambda)$ in the minimal polynomial; the total size is the algebraic multiplicity. Diagonalisable means every block has size 1, i.e. the minimal polynomial has no repeated factor.

And the missing eigenvectors show up in solutions: $e^{tJ_k(\lambda)}=e^{\lambda t}\big(I+tN+\tfrac{t^2}{2}N^2+\cdots\big)$, a polynomial in $t$ of degree $k-1$ times $e^{\lambda t}$.

## Recall
type: mcq
Q: What does a Jordan block of size 3 with eigenvalue $\lambda$ tell you that the eigenvalue alone does not?
- [x] There is a vector killed only by the third power of $A-\lambda I$ — so the minimal polynomial contains $(x-\lambda)^3$ and solutions pick up a $t^2 e^{\lambda t}$ term.
- [ ] That $\lambda$ has algebraic multiplicity exactly 3 — the block contributes 3, but other blocks with the same $\lambda$ may add more.
- [ ] That the matrix is not invertible — invertibility depends only on whether $\lambda = 0$ is an eigenvalue, not on block sizes.
