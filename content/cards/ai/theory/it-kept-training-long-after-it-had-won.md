---
id: ai.theory.grokking.it-kept-training-long-after-it-had-won
topic: ai.theory.grokking
format: story
difficulty: 2
language: en
weight: light
angles: [weird, paradox]
tags: [grokking, modular-arithmetic, delayed-generalization, power-2022]
hook: "Training accuracy hit 100% and validation stayed at chance. They left it running. Two orders of magnitude later it understood."
diagram: {file: ai/grokking-two-curves.svg, caption: "Training accuracy saturates early; validation accuracy sits at chance for a very long time, then jumps to near-perfect.", alt: "Two curves against log-scaled optimisation steps: a solid one rising to 100% early and staying, a dashed one flat near the bottom for most of the plot before rising sharply to meet it"}
sources:
  - {title: "Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets", author: "Power, Burda, Edwards, Babuschkin & Misra", year: 2022, type: paper, url: "https://arxiv.org/abs/2201.02177"}
  - {title: "Grokking (machine learning)", type: wiki, url: "https://en.wikipedia.org/wiki/Grokking_(machine_learning)"}
dates: {written: 2026-09-19, event: 2022-01-06}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The network memorised the answer, then understood it much later

A small transformer is trained on modular arithmetic: a table of $a\circ b$ for some operation on the integers mod $p$, with a fraction of the entries held out. Within a few thousand optimisation steps it has fitted the training half perfectly. Validation accuracy is at chance. That is textbook overfitting, and any sensible person kills the run.

Alethea Power, Yuri Burda, Harri Edwards, Igor Babuschkin and Vedant Misra did not kill it. They kept going, far past the point where anything should still be happening — and eventually validation accuracy climbed off the floor and went to essentially perfect. The network had memorised the table, sat on that memorisation for something like two orders of magnitude of extra training, and then generalised.

They published it in 2022 and called it grokking. The unsettling part is not that generalisation can follow overfitting. It is that nothing in the training loss announced it was coming.

## Recall
type: reveal
Q: What exactly is grokking?
A: Generalisation that arrives long after the training loss has flatlined near zero. In Power et al.'s algorithmic tasks, validation accuracy jumps from chance to near-perfect roughly two orders of magnitude of optimisation steps after the network had already memorised its training set.
