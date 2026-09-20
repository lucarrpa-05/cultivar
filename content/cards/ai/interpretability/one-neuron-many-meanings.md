---
id: ai.interpretability.features-superposition.one-neuron-many-meanings
topic: ai.interpretability.features-superposition
format: idea
difficulty: 3
language: en
weight: medium
angles: [weird, connection]
tags: [polysemanticity, superposition, features, phase-change, toy-models]
hook: "A neuron that fires for Arabic script, DNA and base64 is not confused. It is sharing."
diagram: {file: ai/superposition-almost-orthogonal.svg, caption: "A plane holds two perpendicular directions, or five that are 72° apart and interfere slightly.", alt: "Two circles: on the left, two arrows at right angles; on the right, five arrows evenly spaced around the circle."}
sources:
  - {title: "Toy Models of Superposition", author: "Elhage, Hume, Olsson, Schiefer et al.", year: 2022, type: article, url: "https://transformer-circuits.pub/2022/toy_model/index.html"}
  - {title: "Towards Monosemanticity: Decomposing Language Models With Dictionary Learning", author: "Bricken, Templeton, Batson, Chen, Jermyn et al.", year: 2023, type: article, url: "https://transformer-circuits.pub/2023/monosemantic-features/index.html"}
  - {title: "Zoom In: An Introduction to Circuits", author: "Olah, Cammarata, Schubert, Goh, Petrov & Carter", year: 2020, type: article, url: "https://distill.pub/2020/circuits/zoom-in/"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# One neuron for cat faces and car fronts, and that is not a bug

Open a vision model and go looking for the neuron that detects curves. You will find one. Then look at what else it fires for and the tidy story collapses: in Inception v1, a single neuron responds to cat faces *and* the fronts of cars. In a small language model, Anthropic's team found one neuron responding to academic citations, English dialogue, HTTP requests and Korean text.

The name is polysemanticity, and the natural reaction is that the model is muddled. The better hypothesis is that it is economising. A layer has, say, 512 neurons. The world it models has far more than 512 things worth tracking. If most of those things are *rare* — and they are, since "Korean text" is absent from almost every input — the model can give each one its own direction in the 512-dimensional space rather than its own neuron, buying thousands of features at the price of a little interference.

Elhage and colleagues named this superposition and built a toy model where you can watch it switch on.

## Rigor

The **linear representation** picture: a layer's activation is

$$h\ \approx\ \sum_{i=1}^{m} f_i(x)\,\mathbf d_i ,$$

with $f_i(x)\ge0$ the activity of feature $i$ and $\mathbf d_i\in\mathbb R^{n}$ its direction. If the $\mathbf d_i$ formed an orthonormal basis, $n$ neurons would carry exactly $n$ features and each neuron would *be* a feature. Superposition is the case $m\gg n$: more directions than dimensions, so they cannot be orthogonal, and reading feature $i$ as $\mathbf d_i^{\top}h$ picks up interference $\sum_{j\neq i}f_j\,\mathbf d_i^{\top}\mathbf d_j$.

Two conditions make the trade worth taking, and Elhage et al. (2022) exhibit them as a **phase change** in a toy autoencoder reconstructing sparse inputs through a bottleneck:

- **sparsity** — if few $f_j$ are nonzero at once, the interference terms are usually zero anyway;
- **importance** — features that cost more loss get cleaner, more nearly orthogonal directions.

At low sparsity the model stores an orthogonal basis of its most important features and discards the rest, behaving essentially like PCA. As sparsity rises it crosses the boundary and starts packing extra features in, arranging them into regular geometry: digons, triangles, pentagons, tetrahedra. The leftover interference is not tolerated noise — the ReLU that follows filters it.

Which is why the neuron is the wrong unit of analysis. Features are directions, and they do not line up with the axes.

## Recall
type: mcq
Q: Why would a network represent more features than it has neurons?
- [x] Because features are sparse — few are active at once, so nearly-orthogonal directions rarely collide and the nonlinearity clips what leaks through.
- [ ] Because a neuron can output more than one value — its activation is a single number either way; the trick is in the choice of directions.
- [ ] Because the network is undertrained and neurons have not specialised — superposition persists at convergence and shows up in a toy model trained to optimality.
