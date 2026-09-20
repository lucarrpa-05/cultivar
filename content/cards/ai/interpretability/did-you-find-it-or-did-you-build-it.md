---
id: ai.interpretability.probing.did-you-find-it-or-did-you-build-it
topic: ai.interpretability.probing
format: idea
difficulty: 3
language: en
weight: medium
angles: [mistake, tool]
tags: [probing, control-tasks, selectivity, othello-gpt, causal-intervention]
hook: "A probe that recovers verb tense from the activations will also recover a property you invented at random."
sources:
  - {title: "Designing and Interpreting Probes with Control Tasks", author: "John Hewitt & Percy Liang", year: 2019, type: paper, url: "https://arxiv.org/abs/1909.03368"}
  - {title: "Emergent World Representations: Exploring a Sequence Model Trained on a Synthetic Task", author: "Li, Hopkins, Bau, Viégas, Pfister & Wattenberg", year: 2023, type: paper, url: "https://arxiv.org/abs/2210.13382"}
  - {title: "Understanding intermediate layers using linear classifier probes", author: "Guillaume Alain & Yoshua Bengio", year: 2016, type: paper, url: "https://arxiv.org/abs/1610.01644"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# If a probe finds a concept, did the network have it or did you build it?

The recipe is simple and seductive. Freeze a model, take its internal activations, and train a small classifier to predict some property from them — part of speech, sentiment, whether a chess position is winning. High accuracy, and you announce that the network "represents" that property.

Hewitt and Liang exposed the hole in 2019 with one devastating control. Invent a property with no linguistic content whatsoever: assign each word type a label at random, once, and stick to it. Now probe for *that*. A sufficiently expressive probe finds it, at high accuracy, because the representation identifies which word you are looking at and the probe can memorise a lookup table. The probe did not discover structure. It built it.

Their fix is *selectivity*: report accuracy on the real task minus accuracy on the random control. A probe scoring high on both has told you nothing at all.

Done carefully, probing still delivers — and the best version of it does not stop at reading.

## Rigor

Setup: a frozen model supplies representations $h(x)\in\mathbb R^{n}$, a probe $g_\phi$ is fitted to predict a property $y$ from $h(x)$, and probe accuracy is offered as evidence about $h$.

The confound is that $\max_\phi\ \mathrm{acc}\big(g_\phi\circ h\big)$ conflates two things: how much information about $y$ sits in $h$, and how much computation $g$ is permitted to do. With $g$ unrestricted, all you have measured is whether $h$ separates inputs at all.

**Control tasks (Hewitt & Liang, 2019).** Define $y_{\text{ctrl}}$ by drawing an independent random output for each word type — a property that is by construction not linguistic. Then

$$\text{selectivity}=\mathrm{acc}_{\text{task}}-\mathrm{acc}_{\text{control}},$$

and a representational claim needs this to be large. In practice that means restricting the probe — linear, or low capacity — and tuning it to maximise the gap rather than raw accuracy.

**The positive case.** Li et al. (2023) train a GPT variant purely on Othello move sequences, never on boards. A nonlinear probe recovers the board state; more tellingly, an *intervention* that edits the probed state changes the model's subsequent legal-move predictions in the way the edited board implies. Causal intervention, not correlation, is what upgrades a probe from a curiosity into a claim.

## Recall
type: mcq
Q: Your linear probe recovers verb tense from a model's activations at 90%. What must you check before claiming the model represents tense?
- [x] How well the same probe recovers a randomly assigned per-word-type label — if that is high too, the probe is memorising rather than reading.
- [ ] Whether the model saw tense-annotated data in pretraining — data matters for other reasons, but it does not separate reading from building.
- [ ] Whether probe accuracy exceeds the model's own task performance — the two measure different things and there is no reason to compare them.
