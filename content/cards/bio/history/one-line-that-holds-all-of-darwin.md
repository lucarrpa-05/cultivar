---
id: bio.history.biology-and-math.one-line-that-holds-all-of-darwin
topic: bio.history.biology-and-math
topics: [bio.evolution.natural-selection]
format: series
difficulty: 3
language: en
weight: heavy
angles: [beautiful, human]
tags: [price-equation, covariance, multilevel-selection, george-price, identity]
hook: "An outsider with no training in genetics wrote one line that contains selection, transmission and Darwin's entire argument."
series: {id: bio.evolution.precisely, index: 5, total: 5, title: "Evolution, precisely"}
sources:
  - {title: "Selection and Covariance, Nature 227, 520–521", author: "George R. Price", year: 1970, type: paper, url: "https://doi.org/10.1038/227520a0"}
  - {title: "Price equation", type: wiki, url: "https://en.wikipedia.org/wiki/Price_equation"}
  - {title: "George R. Price", type: wiki, url: "https://en.wikipedia.org/wiki/George_R._Price"}
dates: {written: 2026-09-19, event: 1970-08-01}
author: author-bio-1
reviewed: {by: reviewer-bio-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Price did not sell his house; he moved on a thyroid-surgery insurance payout in November 1967. Corrected, which also makes the story sharper."}
---

# One line that holds all of Darwin

George Price came to London in November 1967 with no training in genetics. He was an American chemist who had worked on the Manhattan Project and then at IBM on early computer-aided design. Thyroid surgery in 1966 had left his shoulder partly paralysed; he took the medical insurance money, moved countries, and chased an idea about why anything is ever kind to anything else. University College gave him a desk. By 1970 he had a paper in *Nature* that reorganised how biologists argue about selection.

It is one line, and it assumes almost nothing — no genes, no diploidy, no particular way of reproducing. It splits the change in any average trait into two accounts: how much *selection* moved it, and how much *transmission* moved it.

His own story ends badly. Price converted to Christianity in 1970, gave away nearly everything he owned to homeless people in London, and took his own life in January 1975. The equation outlived him and is now the standard way to ask whether an apparent benefit to a group is really selection on groups.

## Rigor

Index individuals by $i$, with trait $z_i$ and fitness $w_i$ (number of offspring). Let $z_i'$ be the mean trait among $i$'s offspring and $\Delta z_i = z_i' - z_i$. Then, exactly,

$$\bar{w}\,\Delta\bar{z} \;=\; \operatorname{Cov}(w_i, z_i) \;+\; \mathbb{E}\!\left[w_i\,\Delta z_i\right].$$

This is an identity, not a model. It follows from the definitions of mean and covariance, so it cannot be false; it can only be uninformative. The first term is selection: the covariance between carrying the trait and leaving offspring. The second is transmission: mutation, meiotic drive, any way offspring fail to be copies.

Now read episode 1's three conditions off the right-hand side as three ways to make it vanish. If $z$ does not vary, the covariance is zero. If $w$ does not depend on $z$, the covariance is zero. If offspring do not resemble parents, the transmission term erases whatever selection did. Darwin's three facts and one conclusion are the claim that this right-hand side is not zero.

Apply it twice, nesting individuals inside groups, and the first term becomes the covariance between group fitness and group trait, the second the average within-group Price term. That is what multilevel selection means, written down.

## Recall
type: reveal
Q: Why can the Price equation never be wrong, and what makes it useful anyway?
A: It is an algebraic identity that follows from the definitions of mean, covariance and expectation, so no data can contradict it. Its use is bookkeeping: it forces you to say exactly how much of a change is covariance between fitness and trait (selection) and how much is imperfect transmission — and, nested, it defines what selection on groups actually means.
