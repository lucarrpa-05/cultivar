---
id: econ.behavioral.loss-aversion-endowment.the-mug-worth-twice-as-much
topic: econ.behavioral.loss-aversion-endowment
topics: [econ.behavioral.prospect-theory]
format: story
difficulty: 2
language: en
weight: medium
angles: [human, numbers]
tags: [loss-aversion, endowment-effect, prospect-theory, kahneman, mugs]
hook: "Half a Cornell class got a free mug. Minutes later the mug was worth more than twice what the other half would pay."
sources:
  - {title: "Endowment effect — covers Kahneman, Knetsch & Thaler (1990), Journal of Political Economy", author: "Kahneman, Knetsch & Thaler", year: 1990, type: wiki, url: "https://en.wikipedia.org/wiki/Endowment_effect"}
  - {title: "Prospect theory — covers Tversky & Kahneman (1992), cumulative prospect theory", author: "Tversky & Kahneman", year: 1992, type: wiki, url: "https://en.wikipedia.org/wiki/Prospect_theory"}
dates: {written: 2026-09-19, event: 1990-12-01}
author: lead
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Buyer valuation corrected from about 3.50 to about 3 dollars (KKT 1990 medians are roughly 7 vs 3); hook now says more than twice."}
---

# The mug that was worth twice as much once it was yours

In 1990 Kahneman, Knetsch and Thaler handed coffee mugs to half a class at random. Then they opened a market. Owners could sell, non-owners could buy, same mug, same room. Economics 101 predicts about half the mugs change hands, because ownership was random and tastes are not.

Almost none did. Sellers wanted about \$7. Buyers offered about \$3. The moment the mug was *yours*, giving it up registered as a loss, and losses hurt about twice as much as the equivalent gain feels good.

That is loss aversion, the load-bearing wall of prospect theory. It is why free trials work, why you hold losing stocks too long, and why "you'll lose \$50" moves people that "you'll save \$50" does not. The catch: the size of the effect depends on context and experience, and experienced traders show much less of it. The rigor is the function that produces the number.

## Rigor

Prospect theory replaces utility over wealth with a value function over *changes* from a reference point:

$$v(x)=\begin{cases} x^{\alpha} & x\ge 0\\ -\lambda(-x)^{\beta} & x<0\end{cases}$$

Tversky and Kahneman's 1992 fit gives $\alpha\approx\beta\approx0.88$ and $\lambda\approx2.25$. The exponent below one is diminishing sensitivity: the second lost dollar stings less than the first. The $\lambda$ is loss aversion — a kink at zero, where the loss arm is about 2.25 times steeper than the gain arm.

That kink is the mug. Own it, and the reference point moves to "mug in hand", so selling is coded as a loss and priced by the steep arm, while buying is coded as a gain and priced by the shallow one. Two curves, one ratio, and the gap between \$7 and \$3.

## Recall
type: mcq
Q: Why do owners price the mug higher than buyers, in prospect-theory terms?
- [x] Owning moves their reference point, so selling is coded as a loss and priced on the steeper arm of the value function — the $\lambda\approx2.25$ kink.
- [ ] Owners simply like mugs more — ownership was assigned at random, so tastes cannot explain the gap.
- [ ] Buyers cannot afford the mug — the sums are a few dollars, and the same gap appears with tokens redeemable for cash.
