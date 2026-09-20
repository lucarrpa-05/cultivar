---
id: ai.neural-nets.backprop.hebb-is-local-backprop-is-not
topic: ai.neural-nets.backprop
format: callback
difficulty: 2
language: en
weight: medium
angles: [connection, mistake]
tags: [hebbian-learning, backpropagation, locality, weight-transport, feedback-alignment]
callback: {from: bio.neuro.plasticity-memory, to: ai.neural-nets.backprop}
prerequisites: [bio.neuro.plasticity-memory, ai.neural-nets.perceptron-mlp]
hook: "Hebb's rule needs nothing but the two cells it joins. Backprop needs a number computed at the far end of the network."
sources:
  - {title: "Hebbian theory", type: wiki, url: "https://en.wikipedia.org/wiki/Hebbian_theory"}
  - {title: "Random feedback weights support learning in deep neural networks", author: "Timothy P. Lillicrap, Daniel Cownden, Douglas B. Tweed & Colin J. Akerman", year: 2014, type: paper, url: "https://arxiv.org/abs/1411.0247"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Named Siegrid Lowel (1992) as the source of the fire-together-wire-together paraphrase."}
---

# Remember Hebb's rule? Backprop has the same shape and the opposite politics

Hebb's 1949 postulate is famously local: "When an axon of cell A is near enough to excite a cell B and repeatedly or persistently takes part in firing it, some growth process or metabolic change takes place" that strengthens A's influence on B. Two cells, one synapse, no committee. (The slogan about cells firing and wiring together is not Hebb's — it is Siegrid Löwel's 1992 paraphrase.)

Backpropagation updates a weight by a product of exactly two terms as well: how active the sending unit was, and how much blame the receiving unit carries. Same shape.

The difference is where the second term comes from. Hebb's is the receiving cell's own activity, available right there. Backprop's is a quantity computed at the output of the network and passed back through every layer in between — it depends on the error at the end and on every weight along the way. A synapse cannot know it.

That is the whole biological-plausibility objection, and it has a name.

## Rigor

Both rules are outer products. Hebbian: $\Delta w_{ij} \propto a_i a_j$. Gradient descent: $\partial\mathcal{L}/\partial w_{ij} = \delta_j a_i$, with

$$\delta^{l} = \big((W^{l+1})^{\top}\delta^{l+1}\big)\odot\sigma'(z^{l}).$$

Look at $(W^{l+1})^{\top}$. To compute its own blame, a neuron needs the *transpose of the synaptic weights of the neurons it projects to* — the exact numbers, held elsewhere, in the forward direction. This is the **weight transport problem**, and as Lillicrap and colleagues put it, the required "precisely choreographed transport of synaptic weight information... is thought to be impossible in the brain."

Then comes the twist. Replace $(W^{l+1})^{\top}$ with a *fixed random matrix* $B$, never updated, and the network still learns — because the forward weights adapt until they align with $B$, so the random feedback starts delivering a signal within 90 degrees of the true gradient. Their word for it: "the network learns to learn."

So the locality objection is real and the impossibility claim was too strong. Exact transport is not required; a consistent, even arbitrary, backward channel will do.

## Recall
type: mcq
Q: What exactly makes backpropagation biologically implausible, in the standard objection?
- [ ] It requires a product of pre- and post-synaptic activity — that is Hebb's rule too; the form is shared.
- [x] A neuron's blame term needs the transpose of the weights of the neurons downstream of it, which no synapse has access to. — the weight transport problem.
- [ ] It requires negative weights, which synapses cannot have — inhibition handles sign perfectly well in real circuits.
