---
id: econ.behavioral.prospect-theory.lottery-tickets-and-insurance
topic: econ.behavioral.prospect-theory
format: series
difficulty: 3
language: en
weight: heavy
angles: [paradox, beautiful]
tags: [probability-weighting, inverse-s, certainty-effect, cumulative-prospect-theory]
series: {id: econ.behavioral.prospect-theory-properly, index: 3, total: 4, title: "Prospect theory, properly"}
hook: "Buying insurance makes you risk-averse. Buying a lottery ticket makes you risk-seeking. Millions of people do both before lunch."
diagram: {file: econ/probability-weighting.svg, caption: "The weighting function sits above the diagonal for small probabilities and below it for large ones.", alt: "An inverse-S curve from (0,0) to (1,1) crossing a dashed diagonal line near p equals 0.34"}
sources:
  - {title: "Cumulative prospect theory", type: wiki, url: "https://en.wikipedia.org/wiki/Cumulative_prospect_theory"}
  - {title: "Advances in prospect theory: cumulative representation of uncertainty, Journal of Risk and Uncertainty 5(4)", author: "Tversky & Kahneman", year: 1992, type: paper, url: "https://doi.org/10.1007/BF00122574"}
dates: {written: 2026-09-19, event: 1992-10-01}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# Why one person buys lottery tickets and insurance

An expected-utility maximiser who buys insurance is risk-averse. An expected-utility maximiser who buys lottery tickets is risk-seeking. Millions of people do both on the same afternoon, and they are not confused.

Prospect theory's second move explains it: probabilities enter a decision bent. A 1% chance gets treated as bigger than 1%, which is what makes both the jackpot and the house fire feel live enough to pay for. A 99% chance gets treated as smaller than 99%, which is why a near-certain good outcome still feels worth insuring, and why certainty itself commands a premium.

The bend is not an arithmetic mistake. Ask people to *estimate* a 1% risk and they do fine. Ask them to *act* on it and the weight it carries is visibly larger. The gap between the stated probability and the decision weight is the entire function.

Its shape is an inverse S, and the 1992 paper fitted it.

## Rigor

In cumulative prospect theory the weight on an outcome comes from applying a function to *cumulative* probabilities, which is what keeps the model from violating stochastic dominance. Tversky and Kahneman's one-parameter form is

$$w(p)=\frac{p^{\gamma}}{\bigl(p^{\gamma}+(1-p)^{\gamma}\bigr)^{1/\gamma}},$$

with their 1992 estimates $\gamma=0.61$ for gains and $\delta=0.69$ for losses.

Read the shape off the formula. $w(0)=0$, $w(1)=1$, and in between the curve crosses the diagonal exactly once, near $p\approx 0.34$. Below the crossing $w(p)>p$: at $\gamma=0.61$ a 1% chance carries a weight of about $0.055$. Above it $w(p)<p$: a 99% chance carries about $0.91$. The function is steepest at both endpoints, which is the formal version of "certainty gets a bonus".

That endpoint steepness is precisely what episode 1 needed. Moving from 100% to 99% destroys more weight than moving from 11% to 10%, so a shared branch refuses to cancel. Bend the probabilities and the Allais contradiction turns into an ordinary preference.

One thing is still missing: how to combine bent probabilities with a kinked value function without the model predicting nonsense.

## Recall
type: mcq
Q: What does an inverse-S weighting function say about a 1% chance?
- [x] It gets a decision weight larger than 1% — small probabilities are overweighted, which is why lotteries and insurance both sell.
- [ ] It gets a weight of exactly 1% — that is expected utility, the model these data reject.
- [ ] It gets a weight smaller than 1% — underweighting happens at the top of the range, not the bottom.
