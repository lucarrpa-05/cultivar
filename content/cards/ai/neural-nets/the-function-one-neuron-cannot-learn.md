---
id: ai.neural-nets.perceptron-mlp.the-function-one-neuron-cannot-learn
topic: ai.neural-nets.perceptron-mlp
format: idea
difficulty: 2
language: en
weight: medium
angles: [history, mistake]
tags: [xor, perceptron, linear-separability, hidden-layer, minsky-papert]
related: [ai.history.perceptron-feud.what-minsky-and-papert-proved]
hook: "Four points, two labels, and no straight line that separates them. One hidden layer with two units settles it in a page."
sources:
  - {title: "Perceptrons (book)", type: wiki, url: "https://en.wikipedia.org/wiki/Perceptrons_(book)"}
  - {title: "Linear separability", type: wiki, url: "https://en.wikipedia.org/wiki/Linear_separability"}
dates: {written: 2026-09-19}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Cross-linked with the Perceptrons history card, which shares the XOR impossibility proof."}
---

# Four points that no straight line can separate

Put the four corners of a unit square on paper. Label $(0,0)$ and $(1,1)$ with zero, and $(0,1)$ and $(1,0)$ with one. That is exclusive-or, and no straight line puts the two ones on one side and the two zeros on the other. Try it; the labels sit on the diagonals.

A single unit draws exactly one line, so a single unit cannot compute it. This is the most repeated fact in the history of neural networks, usually attached to Minsky and Papert's 1969 book *Perceptrons* and the claim that it killed the field for a decade.

Both halves of that story deserve care. What the book proves is a family of precise results about perceptrons with limited connectivity — the order needed for parity, for connectedness — not a blanket verdict on networks, and it discusses multilayer machines. Whether it caused the funding winter is contested; the authors later argued the field stalled for its own reasons.

The mathematics, meanwhile, is small enough to do here in full.

## Rigor

**Impossibility.** Suppose $w_1x_1 + w_2x_2 + b > 0$ exactly on $\{(0,1),(1,0)\}$. From $(0,0)$: $b \le 0$. From $(0,1)$ and $(1,0)$: $w_2 + b > 0$ and $w_1 + b > 0$. Adding those two gives $w_1 + w_2 + 2b > 0$, hence $w_1 + w_2 + b > -b \ge 0$. But $(1,1)$ requires $w_1 + w_2 + b \le 0$. Contradiction.

**Construction.** Two hidden units, with $\sigma$ the step function:

$$h_1 = \sigma(x_1 + x_2 - 0.5) \ \ (\text{OR}), \qquad h_2 = \sigma(x_1 + x_2 - 1.5) \ \ (\text{AND}),$$
$$y = \sigma(h_1 - h_2 - 0.5).$$

Check all four corners: $(0,0) \to (0,0) \to 0$; $(0,1)$ and $(1,0) \to (1,0) \to 1$; $(1,1) \to (1,1) \to 0$. That is "or, but not and" — exactly XOR.

The hidden layer earns its name here. It re-coordinates the input so the classes become linearly separable in the new coordinates, and then one final line finishes the job. Every deep network is that trick, iterated.

## Recall
type: reveal
Q: Why can two hidden units do what one unit cannot?
A: One unit draws a single hyperplane, and XOR's classes are not linearly separable. Two units compute OR and AND, which move the four points to three positions in a new space where one line does separate them. The hidden layer changes the coordinates, not the classifier.
