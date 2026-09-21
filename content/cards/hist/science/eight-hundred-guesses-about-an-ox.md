---
id: hist.science.statistics.eight-hundred-guesses-about-an-ox
topic: hist.science.statistics
format: callback
difficulty: 2
language: en
weight: medium
angles: [connection, numbers]
tags: [galton, vox-populi, crowd, median, aggregation]
hook: "Galton's fairground median was startlingly close. Did that prove the law of large numbers?"
callback: {from: math.probability.lln, to: hist.science.statistics}
topics: [math.probability.lln]
sources:
  - {title: "Francis Galton", type: wiki, url: "https://en.wikipedia.org/wiki/Francis_Galton"}
  - {title: "Wisdom of the crowd", type: wiki, url: "https://en.wikipedia.org/wiki/Wisdom_of_the_crowd"}
  - {title: "Vox Populi", author: "Francis Galton", year: 1907, type: paper, url: "https://doi.org/10.1038/075450a0"}
  - {title: "Revisiting Francis Galton's Forecasting Competition", author: "Kenneth F. Wallis", year: 2014, type: paper, url: "https://doi.org/10.1214/14-STS468"}
dates: {written: 2026-09-20}
author: author-humanities-1
reviewed: {by: reviewer-history-w2-2026-09-20, at: 2026-09-20, verdict: approved, notes: "Distinguished published numbers from archival corrections and median from mean; added primary papers."}
---

# Remember the law of large numbers? Galton took it to a country fair

Remember the law of large numbers, where averages settle as independent observations accumulate? Francis Galton tried a messier version at a Plymouth livestock show in 1906. He collected 787 valid guesses of an ox's dressed weight. In his 1907 report, the *median* guess was 1,207 pounds; he gave the true weight as 1,198—less than one per cent apart.

Later archival work corrected those figures slightly to 1,208 and 1,197. More crucially, Galton reported a median, while the usual law of large numbers concerns a mean. A crowd is not automatically independent or unbiased. Its answer can be impressively close, but one fairground result does not prove a universal wisdom of crowds.

## Recall
type: mcq
Q: Why does Galton's ox result not directly prove the usual law of large numbers?
- [ ] Because the crowd was too small — 787 entries are ample for an illustration; the mathematical assumptions are the issue.
- [x] Because he highlighted a median from real people, while the usual theorem concerns means under probabilistic assumptions — a close result alone proves neither independence nor lack of bias.
- [ ] Because the ox's weight was unknown — it was measured after the competition.
