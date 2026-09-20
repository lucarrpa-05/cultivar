---
id: ai.frontier.open-vs-closed.open-weights-is-not-open-source
topic: ai.frontier.open-vs-closed
format: idea
difficulty: 2
language: en
weight: medium
angles: [connection, practical, tool]
tags: [open-weights, open-source-ai, reproducibility, fine-tuning, osi-definition]
hook: "Weights are the output of the build, not the build. You can run the model and change it; you can never check how it was made."
sources:
  - {title: "The Open Source AI Definition 1.0", author: "Open Source Initiative", year: 2024, type: primary, url: "https://opensource.org/ai/open-source-ai-definition"}
  - {title: "Fine-tuning Aligned Language Models Compromises Safety, Even When Users Do Not Intend To!", author: "Qi et al.", year: 2023, type: paper, url: "https://arxiv.org/abs/2310.03693"}
  - {title: "Foundation model", type: wiki, url: "https://en.wikipedia.org/wiki/Foundation_model"}
dates: {written: 2026-09-19}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Open weights is not open source, and the gap is enormous

Publishing a model's weights sounds like publishing source code. It is closer to publishing a compiled binary.

Weights are what the training process *produced*. Release them and someone can run the model, fine-tune it, take it apart and study what it has learned. What they cannot do is rebuild it: no training data, no filtering rules, no training code, and no way to afford the compute even if they had all three. So nobody outside can check a claim about how the thing was made — what it was trained on, what was filtered out, whether the benchmark was in the training set.

The Open Source Initiative made the distinction official in October 2024. To qualify as open-source AI under its definition you need three things: information about the data detailed enough that a skilled person could build a substantially equivalent system, the complete training and inference code, and the parameters. Most "open" releases publish the third.

"Open weights" is the accurate name, and it is not an insult — it is most of what a researcher actually wants. It is just not reproducibility, and the difference has teeth.

## Rigor

Write the artifacts as weights $\theta$, data $D$, code $C$, compute budget $F$.

With $\theta$ alone you get everything *downstream* of the trained function: inference, fine-tuning, distillation, interpretability, evaluation. Reproduction needs $(D,C,F)$; verifying a provenance or contamination claim needs $D$. So the asymmetry is sharp — **auditing how a model was made is impossible from $\theta$, while changing what it does is cheap from $\theta$.**

How cheap: Qi et al. (2023) removed the safety training from a deployed commercial model by fine-tuning on ten adversarial examples for under twenty cents of API credit. Alignment behaviour is a thin layer over the base model, and fine-tuning access is enough to peel it. With published weights, even the API gatekeeper is gone.

And release is irreversible. There is no recall for $\theta$: once it is on a torrent, every future decision has already been made. So a release is not a bet on the average use of a model, it is a bet on the worst use anyone will find for it over its entire life — which is a much harder quantity to be confident about.

## Recall
type: mcq
Q: What can you not do with a model's published weights?
- [ ] Fine-tune it for a new task — that is one of the main things weights are good for, and it is cheap.
- [x] Verify claims about how it was trained — reproduction and provenance checks need the data and the training code, which weights do not contain.
- [ ] Inspect its internal activations — interpretability work runs directly on weights; it needs nothing else.
