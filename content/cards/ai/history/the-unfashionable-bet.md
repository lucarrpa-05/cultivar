---
id: ai.history.deep-learning-2012.the-unfashionable-bet
topic: ai.history.deep-learning-2012
format: story
difficulty: 2
language: en
weight: medium
angles: [human, numbers, mistake]
tags: [imagenet, fei-fei-li, mechanical-turk, datasets, wordnet]
hook: "The paper that cracked computer vision was a poster. What made it possible was years of paying strangers to label photographs."
sources:
  - {title: "ImageNet", type: wiki, url: "https://en.wikipedia.org/wiki/ImageNet"}
  - {title: "ImageNet: A large-scale hierarchical image database", author: "Deng, Dong, Socher, Li, Li & Fei-Fei", year: 2009, type: paper, url: "https://doi.org/10.1109/CVPR.2009.5206848"}
dates: {written: 2026-09-19, event: 2009-06-20}
author: author-ai-history-1
reviewed: {by: reviewer-ai-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The unfashionable idea that made deep learning work

In 2006 the fashionable move in computer vision was a cleverer algorithm on a few thousand images. Fei-Fei Li bet the other way: the models were not starving for cleverness, they were starving for examples.

So ImageNet was not research, it was logistics. Categories borrowed from WordNet's hierarchy of English nouns. Labelling farmed out on Amazon Mechanical Turk: 49,000 workers across 167 countries, filtering and labelling over 160 million candidate images between July 2008 and April 2010, each surviving image checked by several people. The result was more than 14 million labelled photographs across 20,000-plus categories.

The 2009 paper announcing it was a poster at CVPR. The competition that ran on a 1,000-category slice — about 1.28 million training images — started in 2010 and was won twice by hand-designed features before a neural network turned up in 2012.

Datasets are infrastructure. Infrastructure is invisible until the thing it carries arrives.

## Recall
type: mcq
Q: What was Fei-Fei Li's bet in starting ImageNet?
- [ ] That better architectures would emerge if researchers had a standard benchmark — standardised evaluation helped, but the bet was about scale.
- [x] That the limiting factor was the number of labelled examples, not the sophistication of the algorithm — so she spent years on data instead of models.
- [ ] That hand-designed features would beat learned ones given enough images — the opposite; learned features won the moment the data was big enough.
