---
id: econ.causal.structural-vs-reduced.the-equation-moves-when-you-use-it
topic: econ.causal.structural-vs-reduced
topics: [econ.macro.unemployment-cycles]
format: idea
difficulty: 4
language: en
weight: heavy
angles: [mistake, prediction]
tags: [lucas-critique, structural-estimation, deep-parameters, policy-evaluation, heckman]
hook: "Your coefficients summarise how people behaved under the old rules. Change the rules and you have invalidated your own regression."
sources:
  - {title: "Econometric Policy Evaluation: A Critique", author: "Robert E. Lucas Jr.", year: 1976, type: paper, url: "https://doi.org/10.1016/S0167-2231(76)80003-6"}
  - {title: "Lucas critique", type: wiki, url: "https://en.wikipedia.org/wiki/Lucas_critique"}
  - {title: "Building Bridges between Structural and Program Evaluation Approaches to Evaluating Policy", author: "James J. Heckman", year: 2010, type: paper, url: "https://doi.org/10.1257/jel.48.2.356"}
dates: {written: 2026-09-19, event: 1976-01-01}
author: author-econ-metrics-1
reviewed: {by: reviewer-econ-a-2026-09-19, at: 2026-09-19, verdict: approved}
---

# The equation stops being true the moment you use it

In the 1960s the Phillips curve was sold as a menu. The historical data traced a stable trade-off between inflation and unemployment, so a government could pick a point: tolerate a little more inflation, buy a little less unemployment. Governments picked. The curve fell apart in the 1970s.

Robert Lucas explained why in 1976, in the single most annoying paragraph in macroeconomics: "any change in policy will systematically alter the structure of econometric models." The coefficients you estimated are not laws of nature. They are a compressed description of how households and firms solved their own problems *given the policy rule they expected*. Announce a new rule and you have changed the thing your coefficients were summarising.

This cuts at the credibility revolution too. A beautifully identified effect of a programme, measured at the scale of a pilot, tells you about the world where that programme is rare. James Heckman's version of the objection is that if you want to predict a policy nobody has tried, you need parameters that do not move: preferences, technology, constraints.

## Rigor

Let the reduced-form coefficient you estimate be $\theta$ and the policy rule be $p$. Estimation under $p_0$ gives $\hat\theta\to\theta(p_0)$. Forecasting the effect of $p_1$ with $\hat\theta$ is legitimate only if $\partial\theta/\partial p=0$ — which is exactly what optimisation denies.

A worked case. Under the permanent-income hypothesis with interest rate $r$ and income following $y_t=\rho y_{t-1}+\varepsilon_t$, the consumption response to an income innovation is

$$\frac{\partial c_t}{\partial \varepsilon_t}=\frac{r}{1+r-\rho}.$$

The "marginal propensity to consume" — the coefficient in every 1960s consumption function — is a *function of* $\rho$, a property of the income process. A tax policy that makes income shocks more persistent raises $\rho$, and the estimated MPC changes even though preferences did not.

Structural econometrics answers by estimating the parameters that do not move ($r$, preferences, the process) and simulating the new rule. The bill is that those parameters are identified by functional-form and equilibrium assumptions you cannot test — which is where the design people came in.

## Recall
type: mcq
Q: Why did the estimated Phillips curve break when governments tried to exploit it?
- [x] The trade-off was a by-product of what people expected policy to do, so acting on it changed expectations and moved the relationship. — the parameters were not structural.
- [ ] The data were mismeasured, and better inflation statistics restored the curve. — measurement was not the issue; the relation genuinely shifted.
- [ ] The sample was too short for the estimates to be reliable. — the historical fit was excellent; stability out of sample was the problem.
- [ ] Unemployment and inflation are unrelated, so the fit was spurious from the start. — there is a short-run relation; what fails is treating it as a fixed menu.
