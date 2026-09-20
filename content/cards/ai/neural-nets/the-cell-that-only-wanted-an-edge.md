---
id: ai.neural-nets.cnn.the-cell-that-only-wanted-an-edge
topic: ai.neural-nets.cnn
format: story
difficulty: 1
language: en
weight: light
angles: [history, origin]
tags: [hubel-wiesel, receptive-field, orientation-selectivity, neocognitron, fukushima]
hook: "They spent hours showing a cat dots of light and got nothing. The cell woke up for the shadow of a glass slide."
sources:
  - {title: "Receptive fields of single neurones in the cat's striate cortex", author: "D. H. Hubel & T. N. Wiesel", year: 1959, type: paper, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1363130/"}
  - {title: "Neocognitron", type: wiki, url: "https://en.wikipedia.org/wiki/Neocognitron"}
dates: {written: 2026-09-19, event: 1959-10-01}
author: author-ai-llm-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The cell that ignored every dot and woke up for an edge

In the late 1950s at Johns Hopkins, David Hubel and Torsten Wiesel had a microelectrode in a single cell of a cat's visual cortex and a projector full of dots. They showed dots. The cell was indifferent. Hours of this.

Then, as Hubel told the story afterwards, they slid a glass slide into the projector and the cell fired — not at the dot on the slide, but at the faint shadow of the slide's own edge sweeping across the screen. The cell did not care about points of light at all. It cared about an edge, at one particular angle, in one particular patch of the visual field.

Their 1959 paper in the *Journal of Physiology* laid out receptive fields tuned to orientation, and a hierarchy: simple cells feeding complex cells, each level built from the one below.

Twenty-one years later Kunihiko Fukushima published the Neocognitron, explicitly modelled on that scheme — small local detectors, repeated across the image, stacked in layers. It is the convolutional network, with its sources named on the first page.

## Recall
type: reveal
Q: What did Hubel and Wiesel find that convolutional networks copied?
A: That a visual cell responds to a specific feature — an edge at a particular orientation — inside a small local patch of the field, and that these detectors are stacked into a hierarchy. Fukushima's 1980 Neocognitron built exactly that: small local filters repeated across the image, layered.
