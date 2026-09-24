---
id: ai.theory.benign-overfitting.diffusion-models-overfit-malignly
topic: ai.theory.benign-overfitting
topics: [ai.theory.double-descent, ai.neural-nets.diffusion]
format: news
difficulty: 3
language: en
weight: medium
angles: [paradox, numbers]
tags: [benign-overfitting, double-descent, diffusion-models, memorization, random-features, preprint]
hook: "The overparameterisation that rescues classifiers pushes diffusion models toward copying their training set."
related: [ai.theory.benign-overfitting.fitting-the-noise-and-getting-away-with-it, ai.theory.double-descent.the-curve-that-shouldnt-exist]
sources:
  - {title: "Double Descent and Malign Overfitting in Diffusion Models", author: "Urfin, Bonnaire, Biroli & Mézard", year: 2026, type: paper, url: "https://arxiv.org/abs/2609.26392"}
  - {title: "Why Diffusion Models Don't Memorize: The Role of Implicit Dynamical Regularization in Training", author: "Bonnaire, Urfin, Biroli & Mézard", year: 2025, type: paper, url: "https://arxiv.org/abs/2505.17638"}
dates: {written: 2026-09-23, event: 2026-09-22, expires: 2026-11-06}
evergreen: false
author: author-news-1
reviewed: {by: reviewer-ai-2026-09-23, at: 2026-09-23, verdict: approved}
---

# The overfitting that helps classifiers makes diffusion models copy

On 22 September 2026, Raphaël Urfin, Tony Bonnaire, Giulio Biroli and Marc Mézard explained why diffusion models miss out on benign overfitting. Each image is trained with fresh noise many times, around a thousand in practice, so the double-descent peak moves from parameters equal to samples out to samples times that number. Test loss starts climbing much earlier, once parameters pass samples. Real models sit on that rising branch, fitting a score that reproduces the training images.

It is the same random-features maths behind double descent, with the opposite verdict: bigger is not automatically safer. Ridge penalties or early stopping beat every unregularised model.

Caveat: one small dataset, 32-by-32 CelebA faces, and models far below state-of-the-art size.
