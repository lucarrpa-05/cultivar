---
id: ai.history.backprop-connectionism.invented-at-least-three-times
topic: ai.history.backprop-connectionism
format: story
difficulty: 2
language: en
weight: medium
angles: [feud, origin, mistake]
tags: [backpropagation, linnainmaa, werbos, rumelhart-hinton-williams, credit-assignment]
hook: "The algorithm behind every neural network was published in 1970, in Finnish, in a thesis about rounding errors."
sources:
  - {title: "Seppo Linnainmaa", type: wiki, url: "https://en.wikipedia.org/wiki/Seppo_Linnainmaa"}
  - {title: "Backpropagation", type: wiki, url: "https://en.wikipedia.org/wiki/Backpropagation"}
  - {title: "Learning representations by back-propagating errors", author: "Rumelhart, Hinton & Williams", year: 1986, type: paper, url: "https://doi.org/10.1038/323533a0"}
  - {title: "Paul Werbos", type: wiki, url: "https://en.wikipedia.org/wiki/Paul_Werbos"}
dates: {written: 2026-09-19, event: 1986-10-09}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Backprop was invented at least three times before 1986

Seppo Linnainmaa, master's thesis, University of Helsinki, 1970: *the representation of the cumulative rounding error of an algorithm as a Taylor expansion of the local rounding errors*. It contains the reverse mode of automatic differentiation — backpropagation, in full generality, on arbitrary sparsely connected computation graphs. It does not mention neural networks. He was worried about floating-point error.

Paul Werbos, Harvard PhD thesis, 1974, did apply it to neural networks, and spent years being told it was not interesting. Go back further and the continuous-time version is standard optimal control: Kelley in 1960, Bryson in 1961, Pontryagin's adjoint method underneath both.

Then on 9 October 1986, Rumelhart, Hinton and Williams published "Learning representations by back-propagating errors" in *Nature*, and the field woke up.

Read their title again. The claim is not the algorithm — it is *representations*. What they showed was that the hidden units, trained this way, invent useful features nobody specified. An algorithm becomes an invention on the day somebody shows what it is for.

## Recall
type: mcq
Q: What did the 1986 Nature paper contribute?
- [ ] The backpropagation algorithm itself — reverse-mode differentiation was published by Linnainmaa in 1970 and applied to nets by Werbos in 1974.
- [x] The demonstration that hidden layers trained this way learn useful internal representations — that is what made the old algorithm matter.
- [ ] A proof that gradient descent finds the global optimum — no such proof exists; deep networks are famously non-convex.
