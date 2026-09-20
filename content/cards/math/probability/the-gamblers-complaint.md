---
id: math.probability.basics.the-gamblers-complaint
topic: math.probability.basics
format: story
difficulty: 1
language: en
weight: light
angles: [origin, history, numbers]
tags: [de-mere, pascal, fermat, dice, problem-of-points]
hook: "A French gambler lost money on a bet he had reasoned out carefully, and declared that arithmetic was broken."
sources:
  - {title: "Antoine Gombaud", type: wiki, url: "https://en.wikipedia.org/wiki/Antoine_Gombaud"}
  - {title: "Problem of points", type: wiki, url: "https://en.wikipedia.org/wiki/Problem_of_points"}
  - {title: "Fermat and Pascal on Probability", type: primary, url: "https://www.york.ac.uk/depts/maths/histstat/pascal.pdf"}
dates: {written: 2026-09-19, event: 1654-01-01}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The gambler's complaint that started probability

Antoine Gombaud, who styled himself the chevalier de Méré, made money for years betting that a six would show up in four rolls of one die. So he tried the analogous bet with two dice: a double six within 24 rolls. One die has 6 faces and he used 4 rolls; two dice have 36 combinations, so 24 rolls should be the same bet, since 4 is to 6 as 24 is to 36.

He lost. Steadily. In 1654 he told Pascal that the theorems were inconsistent and that arithmetic was demented.

Pascal wrote to Fermat. In the letter of 29 July 1654 he reports de Méré's grievance and the odds on the first bet as 671 to 625. That correspondence, on this and a related problem about splitting stakes, is where probability as a subject begins — invented, essentially, because a gambler's proportion did not match his ledger.

The proportion was the mistake. Probabilities of "at least once" do not scale; the probabilities of *nothing happening* multiply.

## Recall
type: reveal
Q: Why isn't 24 rolls of two dice the same bet as 4 rolls of one?
A: Because you must multiply the chances of failure, not scale the chances of success. One die: $1-(5/6)^4 = 671/1296 \approx 0.518$, a winning bet. Two dice: $1-(35/36)^{24}\approx 0.491$, a losing one. De Méré's ratio $4:6 = 24:36$ compares the wrong quantities.
