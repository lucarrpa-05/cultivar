---
id: math.probability.conditional-bayes.bayes-is-a-rule-for-changing-your-mind
topic: math.probability.conditional-bayes
format: idea
difficulty: 2
language: en
weight: medium
angles: [tool, practical, beautiful]
tags: [bayes, odds-form, likelihood-ratio, base-rate, log-odds]
hook: "Written in odds, Bayes' theorem stops being a formula to memorise and becomes one multiplication."
sources:
  - {title: "Bayes' theorem", type: wiki, url: "https://en.wikipedia.org/wiki/Bayes%27_theorem"}
  - {title: "Likelihood ratios in diagnostic testing", type: wiki, url: "https://en.wikipedia.org/wiki/Likelihood_ratios_in_diagnostic_testing"}
  - {title: "Base rate fallacy", type: wiki, url: "https://en.wikipedia.org/wiki/Base_rate_fallacy"}
dates: {written: 2026-09-19}
author: author-math-fnp-1
reviewed: {by: reviewer-math-fnp-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Bayes is a rule for changing your mind

A disease affects 1 person in 1000. The test catches 99% of cases and gives a false positive 5% of the time. You test positive. How worried should you be?

Most people, including most doctors asked in surveys, say something near 95%. The answer is about 2%.

Here is the version that makes it obvious. Before the test, the odds you are ill are 1 to 999. The test is evidence, and evidence has a strength: positives are $0.99/0.05 \approx 20$ times more likely from a sick person than a healthy one. So multiply. Your odds go from 1:999 to about 20:999 — still roughly 1 in 50.

That is the whole theorem. **New odds = old odds × strength of evidence.** Nothing gets replaced; something gets multiplied. A test cannot tell you what to believe, only how much to move.

And because it multiplies, where you started never stops mattering.

## Rigor

**Odds form.** For hypothesis $H$ and evidence $E$,
$$\underbrace{\frac{P(H\mid E)}{P(\neg H\mid E)}}_{\text{posterior odds}}=\underbrace{\frac{P(H)}{P(\neg H)}}_{\text{prior odds}}\times\underbrace{\frac{P(E\mid H)}{P(E\mid \neg H)}}_{\text{likelihood ratio}} .$$
It follows by writing Bayes' theorem twice and dividing: the $P(E)$ terms cancel, which is why this form needs no normalising constant.

**The worked case.** Prior odds $1/999$; $\mathrm{LR}^{+}=0.99/0.05=19.8$; posterior odds $=19.8/999=0.0198$, so $P=0.0198/1.0198=1.94\%$.

**Why intuition fails.** The 99% is $P(E\mid H)$ and the intuition reports it as $P(H\mid E)$. Those differ by exactly the prior odds — the base rate. Ignoring it is the prosecutor's fallacy.

**Evidence adds.** Take logs:
$$\log\text{-odds}(H\mid E)=\log\text{-odds}(H)+\log \mathrm{LR}(E).$$
Independent pieces of evidence contribute additively, in bits. This is why "extraordinary claims require extraordinary evidence" is a theorem and not a slogan: a prior of $10^{-6}$ is 20 bits down, and you need 20 bits of evidence just to reach even money.

## Recall
type: mcq
Q: A second, independent test also comes back positive, with the same likelihood ratio of 20. What are your odds now?
- [x] About 400 to 999, so roughly 29% — independent evidence multiplies the odds again, or adds in log-odds.
- [ ] About 40 to 999 — that adds the likelihood ratios instead of multiplying them.
- [ ] About 99%, since two positives are conclusive — nothing is conclusive; the prior of 1 in 1000 is still doing work.
- [ ] Unchanged, because the disease is still rare — the base rate sets where you start, not whether evidence moves you.
