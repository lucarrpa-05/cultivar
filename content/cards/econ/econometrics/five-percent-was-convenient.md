---
id: econ.econometrics.inference.five-percent-was-convenient
topic: econ.econometrics.inference
format: fact
difficulty: 1
language: en
weight: light
angles: [origin, mistake]
tags: [p-value, fisher, significance, asa-statement, thresholds]
hook: "The line between a discovery and a nothing has been 0.05 for a century because one statistician found it handy."
sources:
  - {title: "p-value — Fisher's threshold and its history", type: wiki, url: "https://en.wikipedia.org/wiki/P-value"}
  - {title: "The ASA Statement on p-Values: Context, Process, and Purpose", author: "Ronald L. Wasserstein & Nicole A. Lazar", year: 2016, type: paper, url: "https://doi.org/10.1080/00031305.2016.1154108"}
  - {title: "The Design of Experiments — where the 5 per cent level is called \"usual and convenient\"", author: "Ronald A. Fisher", year: 1935, type: book, url: "https://en.wikipedia.org/wiki/The_Design_of_Experiments"}
dates: {written: 2026-09-19}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Usual and convenient is from The Design of Experiments (1935), not the 1920s; Fisher drew the 5 per cent line in 1925. Quote, dates and sources fixed."}
---

# Five percent was a convenience, not a discovery

Ronald Fisher drew the line at 5 per cent in 1925 and never gave a reason for it. A decade later, in *The Design of Experiments*, he put it plainly: it is "usual and convenient", and experimenters are "prepared to ignore all results which fail to reach this standard". That is the whole argument.

In 2016 the American Statistical Association had to state what a p-value is not: not the probability the hypothesis is true, not a measure of how big anything is.

## Recall
type: reveal
Q: What does a p-value of 0.03 actually tell you?
A: How surprising your data would be *if* the null hypothesis and every other modelling assumption were true. It is not the probability that the null is false, and it says nothing about the size or importance of the effect.
