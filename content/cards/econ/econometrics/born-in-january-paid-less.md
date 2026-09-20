---
id: econ.econometrics.iv.born-in-january-paid-less
topic: econ.econometrics.iv
format: idea
difficulty: 3
language: en
weight: heavy
angles: [weird, mistake]
tags: [quarter-of-birth, angrist-krueger, weak-instruments, late, compulsory-schooling]
hook: "Two children, same street, same ability, born three months apart — and the law hands one of them less schooling."
sources:
  - {title: "Does Compulsory School Attendance Affect Schooling and Earnings?", author: "Joshua D. Angrist & Alan B. Krueger", year: 1991, type: paper, url: "https://doi.org/10.2307/2937954"}
  - {title: "Problems with Instrumental Variables Estimation When the Correlation Between the Instruments and the Endogenous Explanatory Variable is Weak", author: "John Bound, David A. Jaeger & Regina M. Baker", year: 1995, type: paper, url: "https://doi.org/10.1080/01621459.1995.10476536"}
  - {title: "Instrumental variables estimation — weak instruments and the first-stage F", type: wiki, url: "https://en.wikipedia.org/wiki/Instrumental_variables_estimation"}
dates: {written: 2026-09-19, event: 1991-11-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Title said three months less schooling; the first stage is a few weeks, as the card rigor already said. Retitled."}
---

# Born in January, out of school weeks sooner

American school districts enrol children by calendar year of birth, and compulsory attendance laws release them on their sixteenth birthday. Put those two rules together and something strange falls out: a child born in January starts school nearly a year older than one born in December, so when the law lets go of both of them, the January child has spent less time in a classroom. Nobody chose this. It is an accident of the calendar, and the calendar does not care about your ability.

Joshua Angrist and Alan Krueger built the 1991 paper of the credibility revolution on that accident, instrumenting years of schooling with quarter of birth across millions of census records. The estimated return came out near the ordinary regression's — which was itself the news, since everyone had assumed ability bias was inflating it badly.

Then the counterpunch. Bound, Jaeger and Baker showed in 1995 that quarter of birth explains so little of schooling that the machinery starts fabricating precision: swap in randomly generated birth quarters and the results look about as convincing. The weak-instrument literature was born from that demonstration.

## Rigor

With a binary instrument the IV estimate is a ratio of differences, the **Wald estimator**:

$$\hat\beta=\frac{\bar y_{z=1}-\bar y_{z=0}}{\bar x_{z=1}-\bar x_{z=0}},$$

the reduced-form gap divided by the first-stage gap. Both numerator and denominator here are tiny — a few weeks of schooling, a few dollars of earnings.

Two consequences. First, what is identified is not the average effect. Under monotonicity, IV recovers the **local average treatment effect**, the effect for *compliers*: those whose schooling actually responds to the calendar, who are concentrated at the legal dropout margin, not at the college one.

Second, the weakness itself biases. Two-stage least squares is biased toward OLS, roughly in proportion to $1/F$ where $F$ is the first-stage F statistic, and with many weak instruments the fitted first stage starts fitting noise that is correlated with the error. Hence the habit of reporting $F$ and the rough threshold $F\ge 10$: it is not a fussy diagnostic, it is the denominator of the estimator.

## Recall
type: mcq
Q: Quarter of birth is a valid but very weak instrument for schooling. What is the main danger?
- [x] Two-stage least squares drifts back toward the OLS estimate it was meant to correct, and conventional standard errors understate the trouble. — weakness biases, it does not merely add noise.
- [ ] The exclusion restriction fails automatically when an instrument is weak. — validity and strength are separate properties; a weak instrument can be perfectly exogenous.
- [ ] The estimate becomes unbiased but imprecise, so a larger sample fixes it. — sample size does not remove weak-instrument bias, as the randomly generated instruments showed.
- [ ] The local average treatment effect becomes the average treatment effect. — LATE stays local whatever the strength of the instrument.
