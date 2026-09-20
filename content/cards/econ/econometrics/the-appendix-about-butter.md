---
id: econ.econometrics.iv.the-appendix-about-butter
topic: econ.econometrics.iv
topics: [econ.micro.supply-demand]
format: idea
difficulty: 3
language: en
weight: heavy
angles: [history, tool]
tags: [instrumental-variables, philip-wright, identification-problem, supply-demand, flaxseed]
hook: "Fit a line through price and quantity and you get neither supply nor demand. The fix was printed in 1928, in an appendix, and ignored."
sources:
  - {title: "Philip Green Wright — the 1928 Tariff on Animal and Vegetable Oils and its Appendix B", type: wiki, url: "https://en.wikipedia.org/wiki/Philip_Green_Wright"}
  - {title: "Instrumental variables estimation", type: wiki, url: "https://en.wikipedia.org/wiki/Instrumental_variables_estimation"}
  - {title: "Retrospectives: Who Invented Instrumental Variable Regression?", author: "James H. Stock & Francesco Trebbi", year: 2003, type: paper, url: "https://doi.org/10.1257/089533003769204416"}
dates: {written: 2026-09-19, event: 1928-01-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved, notes: "Ignored until the 1970s was wrong: IV was reinvented at the Cowles Commission in the 1940s, and Wright authorship was still disputed in 2003 (Stock-Trebbi)."}
---

# The best idea in econometrics was hiding in an appendix about butter

Plot twenty years of butter prices against butter quantities and fit a line. What curve did you just estimate? Not demand. Not supply. Both curves were shifting, and every dot is a point where they happened to cross. This is the identification problem, and it sat unsolved at the centre of the field.

Philip Green Wright — economist, poet, the man whose basement press printed Carl Sandburg's first book — buried the answer in Appendix B of a 1928 monograph on vegetable oil tariffs. Find something that shifts *one* curve only. Rainfall changes how much grass grows, so how much milk, so how much butter reaches the market; nobody's appetite for butter depends on last spring's rain. Let the weather do the wiggling, and watch what happens to price and quantity together. Wright ran it on flaxseed and butter and drew arrow diagrams uncannily like today's causal graphs. He got no credit: the estimator was reinvented at the Cowles Commission in the 1940s, and in 2003 economists were still arguing over whether the appendix was even his.

The estimator is a ratio, and its weakness is in the denominator.

## Rigor

Write demand as $q=\alpha+\beta p+u$. OLS is inconsistent because equilibrium makes $p$ move with $u$: $\operatorname{Cov}(p,u)\neq 0$. An **instrument** $z$ needs two properties — relevance, $\operatorname{Cov}(z,p)\neq 0$, and exclusion, $\operatorname{Cov}(z,u)=0$: rain shifts supply, and enters demand through no other door. Then

$$\beta_{\text{IV}}=\frac{\operatorname{Cov}(z,q)}{\operatorname{Cov}(z,p)},$$

since $\operatorname{Cov}(z,q)=\beta\operatorname{Cov}(z,p)+\operatorname{Cov}(z,u)$ and the last term vanishes. Two-stage least squares is the same object with several instruments: project $p$ on $z$, then regress $q$ on the projection — the part of the price that the weather explains.

The price you pay is visible in the asymptotic variance,

$$\operatorname{Var}(\hat\beta_{\text{IV}})\approx\frac{\sigma_u^{2}}{n\,\rho_{zp}^{2}\,\operatorname{Var}(p)},$$

with $\rho_{zp}$ the correlation between instrument and regressor. You are dividing by the square of how hard the lever pulls. A weak instrument does not just give wide intervals; it makes the estimator misbehave in ways the intervals do not advertise.

## Recall
type: mcq
Q: Rainfall is used as an instrument for the price of butter in a demand equation. Which assumption is the untestable one?
- [x] That rainfall affects butter demand through no channel except price. — exclusion cannot be checked in the data; it is an argument about the world.
- [ ] That rainfall is correlated with the price of butter. — relevance is testable: look at the first-stage regression.
- [ ] That rainfall is randomly assigned. — not required; what is required is that it be unrelated to the demand error.
- [ ] That the demand curve is linear. — a functional-form choice, not the identifying assumption.
