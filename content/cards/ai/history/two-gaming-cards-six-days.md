---
id: ai.history.deep-learning-2012.two-gaming-cards-six-days
topic: ai.history.deep-learning-2012
format: story
difficulty: 1
language: en
weight: light
angles: [numbers, history, connection]
tags: [alexnet, imagenet-challenge, krizhevsky, gpu, convolutional-nets]
hook: "Eleven percentage points is not an improvement. It is a change of era, and it arrived on two consumer graphics cards."
sources:
  - {title: "AlexNet", type: wiki, url: "https://en.wikipedia.org/wiki/AlexNet"}
  - {title: "ImageNet Classification with Deep Convolutional Neural Networks", author: "Krizhevsky, Sutskever & Hinton", year: 2012, type: paper, url: "https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf"}
dates: {written: 2026-09-19, event: 2012-09-30}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Swapped the NeurIPS abstract page for the PDF: only the PDF carries the 15.3%/26.2% sentence. Hook and body now agree on the 10.9-point gap."}
---

# Two gaming cards, six days, and vision fell over

The ImageNet competition results went up on 30 September 2012. AlexNet's top-5 error: 15.3%. The runner-up, built on decades of carefully hand-designed image features: 26.2%.

Competitions are usually won by a fraction of a point. Almost eleven means the second-place method was not a rival, it was a previous era.

The hardware is the part people forget. Alex Krizhevsky trained 60 million parameters on two NVIDIA GTX 580 cards — gaming hardware, 3 GB of memory each — for five to six days, ninety passes over 1.2 million photographs. No supercomputer, no cluster.

Nothing in the design was new in principle. Convolution came from LeCun in the late 1980s, the training algorithm from 1986 or 1970 depending on who you credit. What was new was that all of it ran at once, on a dataset large enough to reward it. Within two years essentially every serious entry in the competition was a deep network.

## Recall
type: reveal
Q: What was actually new about AlexNet?
A: Almost none of the ingredients. Convolution, backpropagation and the GPU all predate it. What was new was the combination running at scale on a dataset of over a million labelled images.
