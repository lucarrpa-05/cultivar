---
id: ai.theory.mdl-kolmogorov.a-model-that-costs-more-than-the-data
topic: ai.theory.mdl-kolmogorov
format: idea
difficulty: 3
language: en
weight: heavy
angles: [connection, tool]
tags: [mdl, two-part-code, bic, compression, arithmetic-coding]
prerequisites: [math.probability.information-entropy, ai.ml-basics.overfitting-regularization]
hook: "Compression is not a metaphor for learning. Under a fixed code, they are literally the same optimisation."
related: [ai.theory.mdl-kolmogorov.the-shortest-program-nobody-can-find]
sources:
  - {title: "Modeling by shortest data description", author: "Jorma Rissanen", year: 1978, type: paper, url: "https://doi.org/10.1016/0005-1098(78)90005-5"}
  - {title: "Minimum description length", type: wiki, url: "https://en.wikipedia.org/wiki/Minimum_description_length"}
  - {title: "Language Modeling Is Compression", author: "Delétang, Ruoss, Duquenne, Catt, Genewein et al.", year: 2023, type: paper, url: "https://arxiv.org/abs/2309.10668"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# A theory costing more bits than the data explains nothing

Ask what makes a model a good explanation and you usually get a circular answer about fit and parsimony traded off by judgement. Rissanen's 1978 answer is not circular: count bits.

You want to transmit your data to someone who has nothing. You may first send a model, then send the data *as corrections to what that model predicts*. A model that predicts well makes the corrections cheap. A complicated model is expensive to send. The best explanation is the one minimising the total — and "overfitting" becomes a precise accusation: you spent more bits on the model than you saved on the residuals.

That puts a real floor under Occam's razor, which otherwise sounds like an aesthetic preference. It also says something concrete about language models: since the optimal code length for a symbol is $-\log_2 p$, a model that predicts the next token well *is* a compressor of text, exactly and quantitatively.

## Rigor

**Two-part MDL.** Over a family $\mathcal M$, choose

$$\hat M=\arg\min_{M\in\mathcal M}\ \big[\,L(M)+L(D\mid M)\,\big],$$

with $L(\cdot)$ code lengths in bits. Shannon makes the second term concrete: the optimal code for data under a probabilistic model has length $-\log_2 P(D\mid M)$ to within one bit, so

$$\hat M=\arg\min_{M}\ \big[-\log_2 P(D\mid M)+L(M)\big],$$

which is MAP estimation with prior $P(M)\propto2^{-L(M)}$. The Bayesian and the compression readings are one statement taken in two directions.

A worked case: fitting a degree-$d$ polynomial to $n$ points, the residual term falls as $d$ grows while $L(M)$ grows like $\tfrac{d}{2}\log_2 n$ bits to specify the coefficients to useful precision — the familiar $\tfrac k2\log n$ of BIC, which is the two-part code done carefully. The sum has a minimum, and past it each new coefficient costs more than it saves.

**The language-model corollary.** A model assigning probability $p$ to the observed token encodes it in $-\log_2 p$ bits by arithmetic coding, so cross-entropy loss and compression rate are the same number up to $\ln 2$. Delétang et al. (2023) ran this literally: a general-purpose language model, used as an arithmetic coder, compresses text — and even images — below the specialised codecs. Training a predictor and building a compressor are one job.

## Recall
type: mcq
Q: Under MDL, what exactly is the accusation "you have overfitted"?
- [x] The bits spent describing the extra model complexity exceed the bits saved on the residuals — the total code length went up.
- [ ] The training error is too low — low training error is fine if the model was cheap to describe; MDL charges for description, not for fit.
- [ ] There are more parameters than data points — parameter count is a proxy; MDL counts code length, which can be short even for many parameters.
