---
id: ai.ml-basics.what-is-learning.the-lookup-table-test
topic: ai.ml-basics.what-is-learning
format: idea
difficulty: 1
language: en
weight: medium
angles: [tool, connection]
tags: [generalization, memorization, empirical-risk, lookup-table]
hook: "Store every answer you have ever seen and you score 100% on the past and nothing at all on the future."
sources:
  - {title: "Machine Learning", author: "Tom M. Mitchell", year: 1997, type: book, url: "https://www.cs.cmu.edu/~tom/mlbook.html"}
  - {title: "Statistical learning theory", type: wiki, url: "https://en.wikipedia.org/wiki/Statistical_learning_theory"}
  - {title: "Empirical risk minimization", type: wiki, url: "https://en.wikipedia.org/wiki/Empirical_risk_minimization"}
dates: {written: 2026-09-19}
author: author-ai-theory-1
reviewed: {by: reviewer-ai-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Mitchell 1997 now links to the book's own page rather than the author's Wikipedia entry."}
---

# A lookup table is not learning, and that gap is the whole subject

Write a program that stores every example it has ever been shown and answers by looking them up. On that data it is perfect — zero mistakes, forever. On anything else it has nothing to say. Nobody would call it smart, and the reason is where the entire field lives: what matters is the rows that are *not* in the table.

So the target was never "get the training examples right". It is: do well on examples from the same world that you have never seen. You cannot measure that — the future has not happened — so you hide some data, measure on it, and spend the rest of your life worrying about the difference between the two numbers.

A student who memorised ten years of past exams and a student who understood the material look identical on the past exams. The new question is what separates them.

That difference has a name and a formula.

## Rigor

Fix a distribution $D$ over pairs $(x,y)$ and a loss $\ell$. What you care about is the **risk**

$$R(f)=\mathbb{E}_{(x,y)\sim D}\big[\ell(f(x),y)\big],$$

and what you can compute is the **empirical risk** on a sample $S=\{(x_i,y_i)\}_{i=1}^{n}$,

$$\hat R_S(f)=\frac1n\sum_{i=1}^{n}\ell(f(x_i),y_i).$$

Learning is choosing $f$ from a class $\mathcal H$ using only $\hat R_S$, and hoping $R$ follows. The lookup table is the extreme case: it drives $\hat R_S$ to $0$ and leaves $R$ exactly where it was. The quantity between them, $R(f)-\hat R_S(f)$, is the **generalization gap**, and essentially every theorem in learning theory is a bound on it.

Notice what such a bound must charge you for. For a *fixed* $f$, $\hat R_S(f)$ is an average of $n$ independent terms, so it concentrates around $R(f)$ all by itself. The trouble is that you choose $f$ *after* seeing $S$. The bound therefore has to pay for the whole class you searched — which is why "how big is $\mathcal H$" becomes the central question of the next forty years.

## Recall
type: mcq
Q: Why is a perfect score on the training data not evidence that anything was learned?
- [x] What matters is error on fresh data from the same distribution, and a lookup table drives training error to zero while leaving that untouched — the gap between the two is the whole problem.
- [ ] Because training error is measured with the wrong loss function — the loss can be identical on both sets; what differs is which data it is measured on.
- [ ] Because no real model can reach zero training error — plenty can, including a table and any sufficiently large network.
