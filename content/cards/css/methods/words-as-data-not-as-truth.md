---
id: css.methods.text-as-data.words-as-data-not-as-truth
topic: css.methods.text-as-data
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, mistake, practical]
tags: [text-as-data, grimmer-stewart, validation, bag-of-words, content-analysis]
hook: "Every quantitative model of language is wrong. The useful question is which wrongness you can live with."
sources:
  - {title: "Text as Data: The Promise and Pitfalls of Automatic Content Analysis Methods for Political Texts", author: "Justin Grimmer and Brandon M. Stewart", year: 2013, type: paper, url: "https://doi.org/10.1093/pan/mps028"}
  - {title: "Text as Data (book)", author: "Justin Grimmer, Margaret E. Roberts, Brandon M. Stewart", year: 2022, type: book, url: "https://press.princeton.edu/books/paperback/9780691207551/text-as-data"}
dates: {written: 2026-09-19, event: 2013-07-01}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Every model of language is wrong, and some of them are cheap

A political scientist wants to know how parties' positions on immigration have moved over thirty years. The evidence is a few hundred thousand pages of speeches and manifestos. Reading them takes a decade; sampling them throws away the variation you came for.

So you represent each document as counts of words and forget the order, the grammar and the irony. This is obviously a mutilation. A bag of words cannot tell "I would never vote for that" from "never would I vote for that", let alone catch sarcasm. Grimmer and Stewart's framing in 2013 is that the mutilation is fine *as a measurement device* and disastrous as a description of meaning — you are not modelling language, you are building an instrument.

Which leaves the question their paper is really about: how do you know the instrument reads correctly? Their answer is unglamorous and non-negotiable. Automated methods amplify human reading; they do not replace it, and every application needs its own validation against hand-coded examples.

## Rigor

Concretely: a corpus of $D$ documents becomes a matrix $X\in\mathbb{N}^{D\times V}$ of counts over a $V$-word vocabulary, usually reweighted. The standard weighting is
$$\text{tf-idf}(d,w)=\text{tf}(d,w)\cdot\log\frac{D}{|\{d: w\in d\}|},$$
which downweights words that appear everywhere. Embeddings replace counts with dense vectors; the modelling logic below does not change.

Validation differs by task, and conflating them is the common error.

**Supervised** (you know the categories): hold out hand-coded documents and report out-of-sample accuracy, per class, on the actual population of interest. A classifier trained on tweets and applied to parliamentary speech is an untested instrument.

**Unsupervised** (you are discovering categories): there is no held-out accuracy, because there is no ground truth. Validation means human tasks — do readers agree the clusters cohere? — plus checking the result against something external the model never saw.

The pitfall Grimmer and Stewart name most sharply is silent drift: a method validated once, then reused on a new corpus, a new period or a new language, where the words mean something else and nothing complains.

## Recall
type: mcq
Q: Why can't you validate an unsupervised text model the way you validate a classifier?
- [x] There is no ground truth to hold out — the categories are the output, so validation has to come from human judgement and external checks.
- [ ] Unsupervised models have no parameters to tune — they have plenty, starting with the number of topics.
- [ ] Held-out likelihood is sufficient — it measures prediction of word counts, which is not the same as the categories being meaningful.
