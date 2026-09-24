---
id: econ.behavioral.behavioral-development.the-fertilizer-they-meant-to-buy
topic: econ.behavioral.behavioral-development
topics: [econ.behavioral.time-discounting]
format: idea
difficulty: 3
language: en
weight: medium
angles: [numbers, practical, mistake]
tags: [present-bias, fertilizer, kenya, commitment, procrastination, duflo-kremer-robinson]
hook: "97.7% of Kenyan farmers said they would use fertilizer next season. 36.8% did. A free delivery at harvest did as much as halving the price."
related: [econ.behavioral.time-discounting.save-more-tomorrow]
sources:
  - {title: "Nudging Farmers to Use Fertilizer: Theory and Experimental Evidence from Kenya (NBER WP 15131)", author: "Esther Duflo, Michael Kremer, Jonathan Robinson", year: 2009, type: paper, url: "https://www.nber.org/papers/w15131"}
  - {title: "Nudging Farmers to Use Fertilizer, American Economic Review 101(6)", author: "Duflo, Kremer, Robinson", year: 2011, type: paper, url: "https://doi.org/10.1257/aer.101.6.2350"}
dates: {written: 2026-09-23}
author: author-econ-1
reviewed: {by: reviewer-econ-2026-09-23, at: 2026-09-23, verdict: approved}
---

# Nearly every farmer planned to buy fertilizer. About a third did

In western Kenya, Esther Duflo, Michael Kremer and Jonathan Robinson found that a little top-dressing fertilizer on maize returned roughly 70% a year. Yet only 29% of farmers had used it in either of the two previous seasons. Most said they had no money.

Odd, since right after harvest everyone has money. And 97.7% of farmers in a demonstration programme said they would use fertilizer next season. Only 36.8% did.

So the researchers offered one small thing at the right moment: free delivery, sold as a voucher immediately after harvest. Fertilizer use rose about as much as with a 50% price cut later in the season.

The explanation is a farmer who keeps meaning to.

## Rigor

The model is procrastination in the style of O'Donoghue and Rabin, with random impatience. Each period a present-biased farmer is either patient or impatient; when impatient she weighs today at $1$ and every later period at $\beta<1$. Buying fertilizer carries a small utility cost $f$: a trip to town, a decision. Crucially, she is partly naive: when patient, she overestimates the chance she will still be patient later.

At harvest the patient farmer postpones, because she expects to buy later at the same price and cash in hand is useful now. Later she turns out impatient, consumption today beats a return discounted by $\beta$, the cash is spent, and she never buys. Each postponement looks reasonable from where she stands; the sequence does not.

A discount available only at harvest changes the comparison where it bites. It need only cover $f$ plus the option value of waiting, so it can be of the order of the psychic cost. A later subsidy has to beat the full pull of impatience, so it must be of the order of the price itself.

The calibration fits 71% of farmers as stochastically present-biased, 16% as always patient and 13% as always impatient, and predicts that about 55% never use fertilizer over three seasons; in the comparison group, 52% never did. It also ranks heavy subsidies below the small early discount, because they push time-consistent farmers into overuse.

## Recall
type: mcq
Q: Why does a small discount offered right at harvest work about as well as a large subsidy later?
- [x] It catches present-biased farmers while they have cash and are patient, so they commit before impatience wins — it only needs to cover the small hassle cost.
- [ ] Because farmers are more price-sensitive at harvest — the effect is about timing and commitment, not a steeper demand curve.
- [ ] Because the free delivery saved a long, expensive trip — the trip mattered, but late free delivery had less than half the effect.
