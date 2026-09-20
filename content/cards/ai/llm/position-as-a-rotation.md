---
id: ai.llm.positional-encoding.position-as-a-rotation
topic: ai.llm.positional-encoding
format: idea
difficulty: 4
language: en
weight: heavy
angles: [beautiful, tool]
tags: [rope, rotary-embedding, relative-position, orthogonal-matrix, attention]
prerequisites: [ai.llm.attention, math.linear-algebra.inner-products]
hook: "Don't add position to the vector. Turn the vector. Then only the angle between two tokens survives the dot product."
sources:
  - {title: "RoFormer: Enhanced Transformer with Rotary Position Embedding", author: "Jianlin Su, Yu Lu, Shengfeng Pan, Ahmed Murtadha, Bo Wen & Yunfeng Liu", year: 2021, type: paper, url: "https://arxiv.org/abs/2104.09864"}
  - {title: "Rotation matrix", type: wiki, url: "https://en.wikipedia.org/wiki/Rotation_matrix"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Added the missing prerequisites (attention, inner products) for a difficulty-4 card."}
---

# Position as a rotation, not an addition

Adding a position vector to a word vector has an obvious defect: the model receives one sum and has to disentangle *what this word is* from *where it is*. Nothing guarantees the two live in different directions, and if they overlap, position is contaminating meaning.

Su and colleagues' 2021 alternative refuses to add anything. Chop the query and key vectors into two-dimensional slices, and rotate slice $j$ of the vector at position $m$ by the angle $m\theta_j$. That is the entire method.

The payoff is a small miracle of orthogonality. When attention takes the inner product of a query at position $m$ against a key at position $n$, the two rotations meet and the absolute positions cancel: what survives is a rotation by $(n-m)\theta_j$. Position never enters the *content* of a vector — rotations preserve length — it enters only the *comparison*. Absolute in, relative out.

The cancellation is one line.

## Rigor

Let $R(\alpha) = \begin{pmatrix}\cos\alpha & -\sin\alpha\\ \sin\alpha & \cos\alpha\end{pmatrix}$ and define, on a 2D slice, $f(x,m) = R(m\theta)\,x$. Since $R$ is orthogonal and $R(a)^{\top}R(b) = R(b-a)$,

$$\langle f(q,m),\,f(k,n)\rangle = q^{\top}R(m\theta)^{\top}R(n\theta)\,k = q^{\top}R\big((n-m)\theta\big)\,k .$$

The full transform is block diagonal with $d/2$ blocks, using frequencies $\theta_j = 10000^{-2(j-1)/d}$ — the same geometric ladder as the sinusoidal encoding, redeployed as angles instead of coordinates.

Three consequences. First, $\|f(x,m)\| = \|x\|$: the norm of every token vector is untouched, unlike additive encodings. Second, the attention score is a genuine function of $n-m$ alone, so the same weights behave consistently wherever the pair sits in the sequence. Third, summing across blocks with incommensurate frequencies makes the score decay, on average, as $|n-m|$ grows — the authors list "decaying inter-token dependency with increasing relative distances" as a property of the scheme.

Note what is *not* claimed: this is applied to $Q$ and $K$ only, never to $V$. The values carry content; only the comparison is positional.

## Recall
type: reveal
Q: Why does rotating queries and keys by an angle proportional to position give *relative* position for free?
A: Because rotations are orthogonal and compose: $R(m\theta)^{\top}R(n\theta) = R((n-m)\theta)$. The absolute angles cancel inside the dot product, leaving only the offset $n-m$.
