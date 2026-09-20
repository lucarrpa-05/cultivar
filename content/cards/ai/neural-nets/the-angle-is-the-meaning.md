---
id: ai.neural-nets.embeddings.the-angle-is-the-meaning
topic: ai.neural-nets.embeddings
format: callback
difficulty: 2
language: en
weight: medium
angles: [connection, tool]
tags: [cosine-similarity, inner-product, embeddings, high-dimensional, orthogonality]
callback: {from: math.linear-algebra.inner-products, to: ai.neural-nets.embeddings}
prerequisites: [math.linear-algebra.inner-products]
hook: "Two random directions in a thousand dimensions are almost exactly perpendicular. That is why a cosine of 0.3 means something."
sources:
  - {title: "Cosine similarity", type: wiki, url: "https://en.wikipedia.org/wiki/Cosine_similarity"}
  - {title: "Concentration of measure", type: wiki, url: "https://en.wikipedia.org/wiki/Concentration_of_measure"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember the angle between vectors? It became the definition of "similar"

When you met $\langle u,v\rangle = \|u\|\,\|v\|\cos\theta$ it was probably a lemma on the way to something else. In an embedding space it is not a lemma. It is the operational definition of meaning: two tokens are similar when the angle between their vectors is small, and every semantic search box you have ever used is computing that cosine.

Why the angle rather than the distance? Because the *length* of an embedding carries something else entirely — roughly, how often the token occurs and how strongly the model commits to it. You do not want "frequent" to register as "similar". Dividing by the norms throws that away and keeps only direction.

Here is the part that makes the whole thing work, and it is a fact about high dimensions rather than about language: in a thousand dimensions, two directions picked at random are nearly perpendicular. Almost nothing is close to anything. So when two words come out at cosine 0.3, that is not a mild coincidence — it is astronomically far from chance.

## Rigor

Normalise: $\hat u = u/\|u\|$. Then $\cos\theta = \langle \hat u, \hat v\rangle$ and

$$\|\hat u - \hat v\|^2 = 2 - 2\langle \hat u, \hat v\rangle,$$

so on the unit sphere cosine similarity and Euclidean distance are monotonically related — ranking by one ranks by the other, which is why nearest-neighbour search and cosine search return the same list.

Now the concentration. Let $u, v$ be independent and uniform on $S^{d-1}$. Then $\mathbb{E}\langle u,v\rangle = 0$ and $\operatorname{Var}\langle u,v\rangle = 1/d$, with the tail bound $\Pr\big(|\langle u,v\rangle| \ge t\big) \le 2e^{-dt^2/2}$.

Put $d = 1000$ and $t = 0.3$: the bound is $2e^{-45}$, under $10^{-19}$. Two unrelated tokens land near orthogonal with overwhelming probability, so the space is almost all "far apart" and a genuine alignment is unmistakable. It is also why a model can pack an enormous number of near-independent directions into a merely thousand-dimensional space.

One caveat carried from the intuition: cosine measures alignment in whatever geometry training produced, which is a proxy for relevance, not relevance itself.

## Recall
type: mcq
Q: Why do embedding systems compare vectors by angle rather than by raw inner product?
- [x] Because the norm encodes something else (roughly frequency and confidence), and normalising keeps only direction. — otherwise common tokens would look similar to everything.
- [ ] Because the inner product can be negative and probabilities cannot — cosine is negative too; sign is not the issue.
- [ ] Because angles are cheaper to compute — the cosine is an inner product plus two norms, so it is strictly more work.
