---
id: css.methods.topic-models.the-model-that-reads-worse-when-it-fits-better
topic: css.methods.topic-models
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, tool, mistake]
tags: [lda, topic-models, perplexity, word-intrusion, interpretability]
hook: "Tune a topic model to predict text better and humans understand its topics less. That was measured."
sources:
  - {title: "Latent Dirichlet Allocation", author: "David M. Blei, Andrew Y. Ng, Michael I. Jordan", year: 2003, type: paper, url: "https://www.jmlr.org/papers/v3/blei03a.html"}
  - {title: "Reading Tea Leaves: How Humans Interpret Topic Models", author: "Chang, Boyd-Graber, Gerrish, Wang, Blei", year: 2009, type: paper, url: "https://papers.nips.cc/paper/3700-reading-tea-leaves-how-humans-interpret-topic-models"}
  - {title: "Latent Dirichlet allocation", type: wiki, url: "https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation"}
dates: {written: 2026-09-19, event: 2009-12-07}
reviewed: {by: reviewer-css-2026-09-19, at: 2026-09-19, verdict: approved}
author: author-css-1
---

# Fit the text better, understand the topics worse

A topic model is a story about how a document got written: pick a mixture of topics, then draw each word from one of them. Run it backwards on a corpus and you recover both the topics — lists of words that travel together — and each document's mixture. It is the standard first move for a pile of text nobody has read, and it produces something intoxicating: clusters that look like themes, with no labels supplied.

The intoxication is the danger. The model always returns topics. Feed it random text and it returns topics. Nothing in the output distinguishes a real theme from a stable artefact of word co-occurrence.

Chang and colleagues measured this in 2009 with a simple test. Take a topic's top words, swap one for an intruder from elsewhere, and ask a person to spot the odd one out. If the topic is coherent, the intruder is obvious. They found that the standard statistical score — held-out likelihood, the thing everyone was optimising — was often uncorrelated with human performance, and sometimes slightly *anti*-correlated.

Better prediction, worse topics.

## Rigor

In Latent Dirichlet Allocation, each document $d$ draws a topic mixture $\theta_d\sim\text{Dir}(\alpha)$ over $K$ topics; each topic $k$ is a word distribution $\beta_k\sim\text{Dir}(\eta)$; and each word $w_{dn}$ comes from first drawing $z_{dn}\sim\text{Mult}(\theta_d)$ then $w_{dn}\sim\text{Mult}(\beta_{z_{dn}})$. Inference recovers the posterior over $\theta$ and $\beta$.

Held-out likelihood — or its exponentiated inverse, perplexity — asks how well the fitted model predicts words in unseen documents. It is the natural score, and it is a score about *word prediction*, not about whether $\beta_k$ picks out a topic a human would name. Nothing connects the two, and Chang et al. showed empirically that they can pull apart.

Three practical consequences. $K$, the number of topics, is a choice, not an estimate: different $K$ give different themes from the same corpus, and likelihood will not pick the meaningful one. Reported topics should be validated by a human task — intrusion, or coding against a known scheme. And a topic model is an exploratory device: it generates hypotheses about a corpus and cannot test one.

## Recall
type: mcq
Q: What did "Reading Tea Leaves" find about held-out likelihood in topic models?
- [x] It does not track interpretability — held-out likelihood was often uncorrelated with human judgements of the topics, and sometimes slightly negatively correlated.
- [ ] It reliably identifies the right number of topics — $K$ remains a modelling choice that likelihood does not settle.
- [ ] It measures topic coherence directly — it measures prediction of unseen words, which is a different quantity.
