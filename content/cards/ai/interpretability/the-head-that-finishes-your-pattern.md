---
id: ai.interpretability.circuits.the-head-that-finishes-your-pattern
topic: ai.interpretability.circuits
format: idea
difficulty: 3
language: en
weight: medium
angles: [tool, beautiful]
tags: [induction-heads, in-context-learning, ablation, phase-change, attention]
hook: "Look back for the last time this token appeared, take whatever came next, predict that. A whole mechanism, located and verified."
sources:
  - {title: "In-context Learning and Induction Heads", author: "Olsson, Elhage, Nanda, Joseph et al.", year: 2022, type: article, url: "https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html"}
  - {title: "A Mathematical Framework for Transformer Circuits", author: "Elhage, Nanda, Olsson, Henighan et al.", year: 2021, type: article, url: "https://transformer-circuits.pub/2021/framework/index.html"}
  - {title: "Interpretability in the Wild: a Circuit for Indirect Object Identification in GPT-2 small", author: "Wang, Variengien, Conmy, Shlegeris & Steinhardt", year: 2022, type: paper, url: "https://arxiv.org/abs/2211.00593"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The two-head circuit that finishes a pattern you just showed it

Give a language model an invented name, use it once, then start it again — "Mr Dursleth … Mr Durs" — and it will finish the word. Nothing in its training data covers your particular invention. It is copying a pattern from earlier in the same context, and that ability is most of what people mean by in-context learning.

Olsson and colleagues located the mechanism in 2022 and named it the induction head. It is a circuit made of two attention heads in different layers. The first, at every position, writes into the residual stream a record of what the *previous* token was. The second searches back for a position whose record matches the current token, and copies forward whatever followed it. The rule it implements is literally [A][B] … [A] → [B].

Two things lift this above storytelling. It is testable by ablation: delete those heads and the copying goes. And it *forms* at a sharp phase change during training — a visible bump in the loss curve — at the same moment in-context learning appears.

## Rigor

In a transformer, head $h$ at position $i$ computes $\sum_j\alpha^{h}_{ij}\,W^{h}_{OV}x_j$ with $\alpha^{h}_{ij}\propto\exp\!\big(x_i^{\top}W^{h}_{QK}x_j\big)$, where $W_{QK}=W_Q^{\top}W_K$ and $W_{OV}=W_OW_V$ are the two bilinear forms that characterise a head (Elhage et al., 2021).

The induction circuit is a **K-composition** of two heads. A previous-token head in an early layer copies $x_{j-1}$ into the residual stream at position $j$. The induction head in a later layer then reads that as its key, so its query–key score at $(i,j)$ is effectively $x_i^{\top}W_{QK}\,x_{j-1}$ — it attends to positions whose *predecessor* matches the current token. Its $W_{OV}$ is approximately a copy map, so what comes out is $x_j$: the token that followed last time.

The evidence Olsson et al. assemble is causal, not narrative. Ablating the identified heads degrades in-context learning; the improvement in loss attributable to long context appears exactly when induction heads form; and the same heads generalise to literal copying, pattern completion and rough translation.

The honest limit: clean, verified circuits like this come from small attention-only models. At production scale the same analysis is far harder — which is the gap sparse dictionary methods were built to close.

## Recall
type: mcq
Q: What does an induction head do?
- [x] It finds an earlier occurrence of the current token and copies whatever followed it — the pattern [A][B] … [A] → [B].
- [ ] It memorises frequent bigrams from the training data — the striking part is that it works on sequences never seen in training, using context alone.
- [ ] It attends to the most semantically similar earlier token — the match is on the *previous-token* record, which is exactly what makes it a two-head composition.
