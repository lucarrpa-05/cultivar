---
id: ai.theory.generalization-bounds-deep.at-most-ninety-six-point-five-percent-wrong
topic: ai.theory.generalization-bounds-deep
format: fact
difficulty: 2
language: en
weight: light
angles: [numbers, weird]
tags: [compression-bound, occam-bound, pac-bayes, imagenet, non-vacuous]
prerequisites: [ai.theory.pac-learning]
hook: "It sounds like a joke until you learn that every earlier bound for networks like this one promised nothing at all."
related: [ai.theory.generalization-bounds-deep.a-bound-that-says-four-hundred-percent, ai.theory.mdl-kolmogorov.a-model-that-costs-more-than-the-data]
sources:
  - {title: "Non-Vacuous Generalization Bounds at the ImageNet Scale: A PAC-Bayesian Compression Approach", author: "Zhou, Veitch, Austern, Adams & Orbanz", year: 2019, type: paper, url: "https://arxiv.org/abs/1804.05862"}
  - {title: "Occam learning", type: wiki, url: "https://en.wikipedia.org/wiki/Occam_learning"}
dates: {written: 2026-09-23}
author: author-ai-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved}
---

# The first real guarantee for an ImageNet network: at most 96.5% wrong

In 2018 Wenda Zhou, Victor Veitch, Morgane Austern, Ryan Adams and Peter Orbanz proved the first non-vacuous generalisation bound for a realistic ImageNet network. With 95% confidence, its top-1 error was below 96.5%.

That sounds like a joke until you see the baseline. With 1,000 classes, blind guessing is wrong 99.9% of the time, and earlier bounds for such networks promised nothing at all. The network's measured error was around 40%. Their trick: compress it to 350 KiB first, then charge for bits instead of parameters.

## Rigor

"Charge for bits" is the Occam bound. Fix a prefix-free code in which hypothesis $h$ takes $|h|$ bits; Kraft's inequality gives $\sum_h 2^{-|h|}\le1$. For each $h$, Hoeffding gives $P\big(R(h)>\hat R(h)+t_h\big)\le e^{-2nt_h^2}$. Choose $t_h$ so that this equals $\delta\,2^{-|h|}$ and take a union bound: with probability at least $1-\delta$, simultaneously for every $h$,

$$R(h)\ \le\ \hat R(h)+\sqrt{\frac{|h|\ln 2+\ln(1/\delta)}{2n}} .$$

Parameter count never appears, only description length.

Now the arithmetic that makes 96.5% impressive rather than silly. $350$ KiB is about $2.9\times10^{6}$ bits, against $n\approx1.2\times10^{6}$ training images: a bit over two bits per image. Then $|h|\ln2/(2n)\approx0.8$, whose square root is about $0.9$. Their noisy compressed network gets about 65% of training images right, so $\hat R\approx0.35$, and this plain version of the bound gives roughly $1.25$: vacuous. The 350 KiB already includes a discount for the network's robustness to weight noise; the rest of the gap is closed by a sharper PAC-Bayes inequality (Catoni's) in place of Hoeffding's square root. The margin is that thin because the whole guarantee lives in one ratio: bits per training example.

## Recall
type: reveal
Q: In an Occam-style bound, what takes the place that parameter count holds in classical bounds?
A: Description length: the bits needed to write the trained network down, compared with the number of training examples. Compress the network and the bound tightens, however many parameters it started with.
