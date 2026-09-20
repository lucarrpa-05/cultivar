---
id: ai.llm.retrieval-rag.give-it-the-book
topic: ai.llm.retrieval-rag
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, practical]
tags: [rag, retrieval, nearest-neighbour, parametric-memory, embeddings]
hook: "A model's knowledge is smeared across billions of weights. You cannot look it up, cannot edit it, cannot cite it."
sources:
  - {title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", author: "Patrick Lewis, Ethan Perez, Aleksandra Piktus et al.", year: 2020, type: paper, url: "https://arxiv.org/abs/2005.11401"}
  - {title: "Nearest neighbor search", type: wiki, url: "https://en.wikipedia.org/wiki/Nearest_neighbor_search"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Stop making it memorise and hand it the book

Everything a pretrained model knows lives in its weights, distributed across billions of them with no index. You cannot look a fact up, you cannot correct one, and the model cannot tell you where it got it. Retraining to fix a date is absurd.

Lewis and colleagues' 2020 proposal was to carry two memories instead of one: the weights, and a searchable pile of documents. Before answering, turn the question into a vector, find the nearest passages in that pile, paste them into the prompt, and only then generate. Updating what the model knows becomes editing a database.

The catch is that "nearest" is not "relevant". Retrieval is a geometry problem — closeness in embedding space — and a question whose answer is phrased in completely different words will not pull up that answer. Worse, the model will answer from the wrong passages with exactly the same confidence.

So it pays to see precisely what is being computed.

## Rigor

Encode each passage $z$ and the query $x$ with encoders into $\mathbb{R}^{d}$, and retrieve the top $k$ by inner product — maximum inner-product search, the same geometry as the embedding card, run over millions of vectors with an approximate index.

Generation then marginalises over what came back:

$$p(y \mid x) = \sum_{z \in \text{top-}k(x)} p_\eta(z \mid x)\; p_\theta(y \mid x, z),$$

with $p_\eta(z\mid x) \propto \exp\langle q(x), e(z)\rangle$. Lewis et al. give two variants: commit to one passage for the whole answer, or re-marginalise at every token.

Two structural weaknesses fall straight out of that formula. The sum runs only over the top $k$; a passage ranked $k+1$ has probability exactly zero, not small. And $p_\eta$ is a similarity, not a relevance judgement — nothing in the objective makes "close in embedding space" mean "contains the answer". When the two come apart, the generator conditions on plausible-looking irrelevance, which is the worst input you can give it.

## Recall
type: mcq
Q: What does retrieval actually change about a language model?
- [x] It moves some knowledge out of the weights into an editable, citable store the model conditions on. — the model stops being the only place the fact lives.
- [ ] It teaches the model new facts by updating its parameters — no parameters change; the documents arrive as context.
- [ ] It guarantees the answer is grounded in a real source — only that some passages were retrieved; whether they are relevant, or used, is not guaranteed.
