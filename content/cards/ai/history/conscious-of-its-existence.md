---
id: ai.history.perceptron-feud.conscious-of-its-existence
topic: ai.history.perceptron-feud
format: story
difficulty: 1
language: en
weight: light
angles: [history, numbers, human]
tags: [rosenblatt, perceptron, mark-i, hype, cornell]
hook: "In 1958 the US Navy told reporters it had the embryo of a computer that would one day be conscious of its existence."
sources:
  - {title: "Perceptron", type: wiki, url: "https://en.wikipedia.org/wiki/Perceptron"}
  - {title: "The perceptron: a probabilistic model for information storage and organization in the brain", author: "Frank Rosenblatt", year: 1958, type: paper, url: "https://doi.org/10.1037/h0042519"}
  - {title: "Frank Rosenblatt", type: wiki, url: "https://en.wikipedia.org/wiki/Frank_Rosenblatt"}
dates: {written: 2026-09-19, event: 1958-07-08}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "The convergence theorem was proved in 1962 (Rosenblatt's book, Novikoff independently), not before the 1958 press release. Dated it."}
---

# The Navy announced a machine that would be conscious of its existence

The first AI hype cycle ran in 1958, and the *New York Times* did the honours. The Navy, it reported, had revealed the embryo of an electronic computer that it expected would "be able to walk, talk, see, write, reproduce itself and be conscious of its existence."

The actual machine, Frank Rosenblatt's Mark I Perceptron, was a room of hardware wired to 400 cadmium-sulfide photocells in a 20×20 grid. Its adjustable weights were potentiometers, physically turned by little electric motors as it learned. It could be trained to tell simple shapes apart. That is all it could do.

But underneath the press release sat a genuine theorem, proved in Rosenblatt's 1962 book and independently by Novikoff the same year: if the categories can be separated by a straight cut through the input space, his learning rule finds such a cut, in a finite number of corrections, from any starting point. A machine that provably learns. No wonder people lost their heads.

The trouble was the word *if*.

## Recall
type: reveal
Q: What did Rosenblatt's convergence theorem actually promise?
A: That if the two classes are linearly separable, the perceptron learning rule reaches a separating boundary after finitely many mistakes. It promises nothing at all when they are not.
