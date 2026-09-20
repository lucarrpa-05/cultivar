---
id: ai.interpretability.features-superposition.almost-orthogonal-is-good-enough
topic: ai.interpretability.features-superposition
format: callback
difficulty: 4
language: en
weight: heavy
angles: [connection, numbers]
tags: [johnson-lindenstrauss, inner-products, interference, sparse-coding, capacity]
callback: {from: math.linear-algebra.inner-products, to: ai.interpretability.features-superposition}
hook: "Exactly perpendicular gives you n directions. Nearly perpendicular gives you exponentially many."
related: [ai.interpretability.features-superposition.one-neuron-many-meanings]
sources:
  - {title: "Johnson–Lindenstrauss lemma", type: wiki, url: "https://en.wikipedia.org/wiki/Johnson%E2%80%93Lindenstrauss_lemma"}
  - {title: "Toy Models of Superposition", author: "Elhage, Hume, Olsson, Schiefer et al.", year: 2022, type: article, url: "https://transformer-circuits.pub/2022/toy_model/index.html"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember inner products? Almost-perpendicular is nearly as good

Remember that the inner product of two unit vectors is the cosine of the angle between them, and that orthogonality — inner product exactly zero — is what lets you read off one coordinate without any of the others leaking in. In $n$ dimensions you get exactly $n$ mutually orthogonal directions. Not one more, ever.

Now relax the demand. Instead of exactly zero, ask only that $|\langle u,v\rangle|\le\varepsilon$: almost perpendicular. How many directions fit then?

Far more, and the growth is exponential in the dimension. Allow a cosine of up to 0.3 and $\mathbb R^{512}$ holds on the order of a hundred thousand directions rather than 512. Orthogonality turns out to be a knife-edge condition; the moment you permit a little slack, the capacity of the space explodes.

That is the mathematical fact underneath superposition. A 512-neuron layer is not limited to 512 features. It is limited to 512 *exactly independent* ones, and it would rather have thousands of nearly independent ones.

## Rigor

**Johnson–Lindenstrauss.** For $0<\varepsilon<1$ and any $m$ points in $\mathbb R^{N}$ there is a map into $\mathbb R^{n}$ with $n=O(\varepsilon^{-2}\log m)$ preserving all pairwise distances within a factor $1\pm\varepsilon$. Read it backwards: $m=e^{\Theta(\varepsilon^{2}n)}$ points fit in $n$ dimensions with near-preserved geometry.

For angles directly: draw $m$ independent uniform unit vectors in $\mathbb R^{n}$. For fixed $i\neq j$, $\langle\mathbf d_i,\mathbf d_j\rangle$ concentrates at $0$ with

$$\Pr\big[\,|\langle\mathbf d_i,\mathbf d_j\rangle|>\varepsilon\,\big]\ \le\ 2e^{-n\varepsilon^{2}/2},$$

so a union bound over $\binom m2$ pairs keeps *every* pair within $\varepsilon$ provided $m\lesssim e^{n\varepsilon^{2}/4}$. At $n=512$, $\varepsilon=0.3$ that is about $10^{5}$; at $\varepsilon=0.5$ it is astronomically larger.

What the network pays. Reading feature $i$ gives

$$\mathbf d_i^{\top}h=f_i+\sum_{j\neq i}f_j\,\mathbf d_i^{\top}\mathbf d_j ,$$

and with $m$ features each active with probability $S$, the error term has about $mS$ contributors of size $O(1/\sqrt n)$, hence magnitude $O\!\big(\sqrt{mS/n}\big)$. Features sparse enough that $mS\lesssim n$ keep it under the ReLU threshold, where it is simply clipped.

The cost is not zero: that residual interference is where adversarial directions and feature-splitting artifacts come from, and it is why reading one neuron tells you so little.

## Recall
type: mcq
Q: How many directions in $\mathbb R^{512}$ can have pairwise cosine below 0.3?
- [x] On the order of $10^{5}$ — the count of almost-orthogonal directions grows like $e^{n\varepsilon^{2}/4}$, exponentially in the dimension.
- [ ] Exactly 512 — that is the count of *exactly* orthogonal directions; relaxing the requirement changes the answer by orders of magnitude.
- [ ] Unboundedly many, for any $\varepsilon>0$ — the number is finite for each $\varepsilon$, just exponentially large in $n$.
