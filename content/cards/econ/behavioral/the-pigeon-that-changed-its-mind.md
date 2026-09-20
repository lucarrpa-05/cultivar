---
id: econ.behavioral.time-discounting.the-pigeon-that-changed-its-mind
topic: econ.behavioral.time-discounting
format: idea
difficulty: 2
language: en
weight: medium
angles: [paradox, numbers]
tags: [hyperbolic-discounting, present-bias, preference-reversal, beta-delta]
hook: "Same six-month wait, moved three months into the future, and the answer flips. Pigeons do it too."
sources:
  - {title: "Hyperbolic discounting", type: wiki, url: "https://en.wikipedia.org/wiki/Hyperbolic_discounting"}
  - {title: "Golden eggs and hyperbolic discounting, Quarterly Journal of Economics 112(2)", author: "David Laibson", year: 1997, type: paper, url: "https://doi.org/10.1162/003355397555253"}
dates: {written: 2026-09-19}
author: author-econ-behavioral-1
reviewed: {by: reviewer-econ-b-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The choice you make for next year is not the one you will make

Would you rather have 50 today or 100 in six months? Plenty of people take the 50. Now: 50 in three months, or 100 in nine months? Same six-month wait, pushed three months into the future — and most of the people who took the 50 now take the 100.

Nothing about the trade-off changed except its distance from you. That is a preference reversal, and it is fatal to exponential discounting, where a constant per-period rate makes the two questions literally the same question. Pigeons reverse too, which was Ainslie's point in the 1970s: this is the shape of the discount curve, not a quirk of human culture.

Thaler's 1981 study put numbers on the slope. Subjects indifferent between \$15 now, \$30 in three months, \$60 in a year and \$100 in three years are implying annual discount rates of 277%, then 139%, then 63%. Your future self is patient. Your present self is not, and it is the one holding the pen.

One extra parameter is enough to model it.

## Rigor

Exponential discounting values a payoff $x$ at delay $t$ as $\delta^{t}x$. The ratio between two delayed payoffs then depends only on the gap between the dates: $\delta^{t_2}/\delta^{t_1}=\delta^{t_2-t_1}$. Shift both dates by the same amount and nothing moves, so reversal is impossible. That is exactly the property the data kill.

Laibson's 1997 quasi-hyperbolic form keeps the algebra and adds one number:

$$D(t)=\begin{cases}1 & t=0\\ \beta\delta^{t} & t\ge 1\end{cases}\qquad 0<\beta\le 1.$$

Everything that is not now takes an extra flat haircut $\beta$. Comparing today with tomorrow you face $\beta\delta$; comparing day $t$ with day $t+1$ from a distance you face $\delta$. One rate at the now/not-now boundary, another everywhere else.

The reversal drops out. Taking 50 today over 100 in six months means $50>100\beta\delta^{6}$; taking 100 in nine months over 50 in three means $100\delta^{6}>50$. Both hold at once exactly when

$$100\beta\delta^{6}<50<100\delta^{6},$$

which has solutions if and only if $\beta<1$. The patient future self is $\delta$. The impatient present self is $\beta$.

## Recall
type: mcq
Q: Why can exponential discounting never produce a preference reversal?
- [x] Its discount ratio depends only on the gap between dates — shifting both dates equally leaves every comparison unchanged.
- [ ] It assumes people are patient — it allows any level of impatience; what it forbids is impatience that changes with distance.
- [ ] It ignores the size of the payoffs — payoffs enter normally; the constraint is on how time enters.
