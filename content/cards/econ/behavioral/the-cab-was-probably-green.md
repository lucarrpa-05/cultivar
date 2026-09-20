---
id: econ.behavioral.heuristics-biases.the-cab-was-probably-green
topic: econ.behavioral.heuristics-biases
format: callback
difficulty: 2
language: en
weight: medium
angles: [connection, paradox]
tags: [base-rate-neglect, bayes, taxicab-problem, posterior-odds]
prerequisites: [econ.behavioral.bounded-rationality, math.probability.conditional-bayes]
callback: {from: math.probability.conditional-bayes, to: econ.behavioral.heuristics-biases}
hook: "A witness who is right 80% of the time says the cab was blue. The cab was probably green."
sources:
  - {title: "Base rate fallacy", type: wiki, url: "https://en.wikipedia.org/wiki/Base_rate_fallacy"}
  - {title: "Representativeness heuristic", type: wiki, url: "https://en.wikipedia.org/wiki/Representativeness_heuristic"}
dates: {written: 2026-09-19}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Remember Bayes? Watch what happens when the base rate goes

Remember Bayes' rule — the one that says evidence *updates* a prior instead of replacing it? Tversky and Kahneman built the cleanest demonstration that people know the rule and do not use it.

A cab hits someone at night. In that city 85% of the cabs are green and 15% are blue. A witness says the cab was blue, and tested under the same night conditions this witness gets the colour right 80% of the time. How likely is it that the cab really was blue?

Most people answer 80%. They have reported the witness's reliability and quietly dropped the fact that blue cabs are rare. The Bayesian answer is 41%: the cab was probably green, even though a reliable witness is telling you otherwise.

A base rate is not a technicality you may discard once real evidence arrives. It is half of the calculation, and here it is the bigger half. Three lines of arithmetic show why.

## Rigor

Let $B$ be "the cab was blue" and $W$ "the witness says blue". The prior is $\mathbb{P}(B)=0.15$; the likelihoods are $\mathbb{P}(W\mid B)=0.8$ and $\mathbb{P}(W\mid B^{c})=0.2$. Then

$$\mathbb{P}(B\mid W)=\frac{0.8\times 0.15}{0.8\times 0.15+0.2\times 0.85}=\frac{0.12}{0.12+0.17}\approx 0.41.$$

Read the denominator rather than the answer. Out of 100 such accidents, 12 are blue cabs correctly identified and 17 are green cabs misidentified. There are simply more green cabs available to be mistaken for blue, so an 80%-reliable witness saying "blue" is wrong more often than right.

The odds form makes the missing half visible. Prior odds $15:85$, likelihood ratio $0.8/0.2=4$, posterior odds $60:85$, which is $0.41$. The likelihood ratio is everything the evidence contributes; the prior odds are the base rate. People report the first factor and never multiply by the second — exactly the substitution the story described.

## Recall
type: mcq
Q: The witness is right 80% of the time, yet the answer is 41%. Why?
- [x] There are simply more green cabs available to be mistaken — 17 green misidentifications per 100 accidents against 12 correct blue ones.
- [ ] The witness is unreliable at night — the 80% figure already is the night-time accuracy.
- [ ] Bayes' rule does not apply to eyewitnesses — it applies to any evidence with a known likelihood ratio.
